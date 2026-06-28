const db = require("../config/mysql");
// const ActivityLog = require("../models/ActivityLog");

exports.getMyHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const queryStr = `
            SELECT 
                b.id AS borrowing_id, 
                b.user_id, 
                b.book_id, 
                b.borrow_date, 
                b.due_date, 
                b.return_date, 
                b.status, 
                bk.title, 
                bk.author, 
                bk.cover_image,
                bk.stock,
                bk.id AS real_book_id
            FROM borrowings b
            INNER JOIN books bk ON b.book_id = bk.id 
            WHERE b.user_id = ? 
            ORDER BY b.borrow_date DESC
        `;

        console.log("=== MEMANGGIL RIWAYAT USER ID:", userId, "===");

        const [result] = await db.query(queryStr, [userId]);

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        console.log(" Berhasil memuat", result.length, "data riwayat.");
        return res.status(200).json(result);

    } catch (error) {
        console.error(" ERROR SISTEM HISTORY:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.borrowBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { book_id } = req.body; 

        console.log("=== PROSES VERIFIKASI DIGLYDB ===");
        
        // 1. Cek keberadaan buku
        const [bookResult] = await db.query("SELECT id, stock, title FROM books WHERE isbn = ?", [book_id]);

        if (bookResult.length === 0) {
            return res.status(404).json({ message: "Buku tidak ditemukan di database" });
        }

        const book = bookResult[0];
        const realBookIdInt = book.id;

        // 2. Cek apakah buku sedang dipinjam (duplikat)
        const checkDuplicateQuery = "SELECT id FROM borrowings WHERE user_id = ? AND book_id = ? AND status = 'borrowed'";
        const [duplicateResult] = await db.query(checkDuplicateQuery, [userId, realBookIdInt]);

        if (duplicateResult.length > 0) {
            return res.status(400).json({ 
                message: "Anda sudah meminjam buku ini sebelumnya dan belum mengembalikannya!",
                alreadyBorrowed: true 
            });
        }

        // 3. Cek ketersediaan stok buku
        if (book.stock <= 0) {
            return res.status(400).json({ message: "Maaf, stok buku sudah habis!" });
        }

        // 4. Kurangi stok buku
        await db.query("UPDATE books SET stock = stock - 1 WHERE id = ?", [realBookIdInt]);

        // 5. Kalkulasi tanggal pinjam dan jatuh tempo
        const now = new Date();
        const borrowDate = now.toISOString().split('T')[0];
        const due = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const dueDate = due.toISOString().split('T')[0];

        // 6. Masukkan data peminjaman baru
        const insertQuery = `
            INSERT INTO borrowings (user_id, book_id, borrow_date, due_date, status) 
            VALUES (?, ?, ?, ?, 'borrowed')
        `;
        const [insertResult] = await db.query(insertQuery, [userId, realBookIdInt, borrowDate, dueDate]);

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        return res.status(201).json({
            message: "Buku berhasil dipinjam!",
            borrowId: insertResult.insertId
        });

    } catch (error) {
        console.error(" ERROR SISTEM BORROW BOOK:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { borrowing_id } = req.body;
        const returnDate = new Date().toISOString().split('T')[0];

        // 1. Cek validasi data peminjaman
        const [borrowResult] = await db.query("SELECT * FROM borrowings WHERE id = ? AND user_id = ?", [borrowing_id, userId]);

        if (borrowResult.length === 0) {
            return res.status(404).json({ message: "Data peminjaman tidak valid" });
        }

        const borrowData = borrowResult[0];

        // 2. Cek apakah sudah dikembalikan sebelumnya
        if (borrowData.status === "returned") {
            return res.status(400).json({ message: "Buku ini sudah dikembalikan sebelumnya" });
        }

        // 3. Tambahkan kembali stok buku
        await db.query("UPDATE books SET stock = stock + 1 WHERE id = ?", [borrowData.book_id]);

        // 4. Perbarui status peminjaman menjadi 'returned'
        const updateQuery = `
            UPDATE borrowings
            SET status = 'returned', return_date = ? 
            WHERE id = ?
        `;
        await db.query(updateQuery, [returnDate, borrowing_id]);

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        return res.status(200).json({ message: "Buku berhasil dikembalikan!" });

    } catch (error) {
        console.error(" ERROR SISTEM RETURN BOOK:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};