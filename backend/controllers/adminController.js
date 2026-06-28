const db = require("../config/mysql");

exports.getDashboardStats = async (req, res) => {
    try {
        const countBooksQuery = "SELECT COUNT(*) AS total_books FROM books";
        const sumStockQuery = "SELECT SUM(stock) AS total_stock FROM books";
        const countUsersQuery = "SELECT COUNT(*) AS total_users FROM users WHERE role = 'member'";
        const countLoansQuery = "SELECT COUNT(*) AS active_loans FROM borrowings WHERE status = 'borrowed'";

        const [
            [booksResult],
            [stockResult],
            [usersResult],
            [loansResult]
        ] = await Promise.all([
            db.query(countBooksQuery),
            db.query(sumStockQuery),
            db.query(countUsersQuery),
            db.query(countLoansQuery)
        ]);

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        return res.status(200).json({
            totalBooks: booksResult[0].total_books,
            totalStock: stockResult[0].total_stock || 0,
            totalUsers: usersResult[0].total_users,
            activeLoans: loansResult[0].active_loans
        });

    } catch (error) {
        console.error("Error pada sistem statistik dashboard:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.addBook = async (req, res) => {
    const { isbn, title, author, category, stock, cover_image } = req.body;

    if (!isbn || !title || !author) {
        return res.status(400).json({ message: "ISBN, Judul, dan Penulis wajib diisi!" });
    }

    try {
        const queryStr = `
            INSERT INTO books (isbn, title, author, category, stock, cover_image) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [isbn, title, author, category || 'General', stock || 0, cover_image || ''];

        const [result] = await db.query(queryStr, values);
        return res.status(201).json({ message: "Buku berhasil ditambahkan!", bookId: result.insertId });
    } catch (err) {
        console.error("Gagal menambah buku ke MySQL:", err);
        return res.status(500).json({ message: "Database Error", error: err.message });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params; 
    const { isbn, title, author, category, stock, cover_image } = req.body;

    try {
        const queryStr = `
            UPDATE books 
            SET isbn = ?, title = ?, author = ?, category = ?, stock = ?, cover_image = ? 
            WHERE id = ?
        `;
        const values = [isbn, title, author, category, stock, cover_image, id];

        const [result] = await db.query(queryStr, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Buku tidak ditemukan di database" });
        }
        return res.status(200).json({ message: "Buku berhasil diperbarui!" });
    } catch (err) {
        console.error("Gagal mengupdate buku:", err);
        return res.status(500).json({ message: "Database Error", error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const queryStr = "DELETE FROM books WHERE id = ?";
        const [result] = await db.query(queryStr, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Buku tidak ditemukan" });
        }
        return res.status(200).json({ message: "Buku berhasil dihapus dari sistem!" });
    } catch (err) {
        console.error("Gagal menghapus buku:", err);
        return res.status(500).json({ message: "Database Error", error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const queryStr = "SELECT id, name, email, role, status, created_at FROM users WHERE role = 'member' ORDER BY created_at DESC";
        const [results] = await db.query(queryStr);
        return res.status(200).json(results);
    } catch (err) {
        console.error("Gagal mengambil data users:", err);
        return res.status(500).json({ message: "Database Error saat memuat user.", error: err.message });
    }
};

exports.toggleUserStatus = async (req, res) => {
    const { id } = req.params;
    const { currentStatus } = req.body; 

    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';

    try {
        const queryStr = "UPDATE users SET status = ? WHERE id = ?";
        const [result] = await db.query(queryStr, [newStatus, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        return res.status(200).json({ message: `Status user berhasil diubah menjadi ${newStatus}!`, newStatus });
    } catch (err) {
        console.error("Gagal mengubah status user:", err);
        return res.status(500).json({ message: "Database Error saat update status.", error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const queryStr = "DELETE FROM users WHERE id = ? AND role = 'member'";
        const [result] = await db.query(queryStr, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User tidak ditemukan atau Anda tidak memiliki akses." });
        }
        return res.status(200).json({ message: "Akun user berhasil dihapus dari database!" });
    } catch (err) {
        console.error("Gagal menghapus user:", err);
        return res.status(500).json({ message: "Database Error saat menghapus akun.", error: err.message });
    }
};


exports.getAllLoans = async (req, res) => {
    try {
        const queryStr = `
            SELECT 
                b.id AS loan_id,
                u.name AS user_name,
                bk.title AS book_title,
                bk.id AS book_id,
                b.borrow_date,
                b.due_date,
                b.return_date,
                b.status,
                b.fine
            FROM borrowings b
            JOIN users u ON b.user_id = u.id
            JOIN books bk ON b.book_id = bk.id
            ORDER BY b.borrow_date DESC
        `;

        const [results] = await db.query(queryStr);
        const FINE_PER_DAY = 2000; 

        const integratedResults = results.map((loan) => {
            let computedFine = loan.fine || 0;

            if (loan.status === 'borrowed' && loan.due_date) {
                const today = new Date();
                const dueDate = new Date(loan.due_date);

                if (today > dueDate) {
                    const timeDiff = today.getTime() - dueDate.getTime();
                    const daysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    computedFine = daysLate * FINE_PER_DAY;
                }
            }

            return {
                ...loan,
                fine: computedFine
            };
        });

        return res.status(200).json(integratedResults);
    } catch (err) {
        console.error("Gagal mengambil data peminjaman:", err);
        return res.status(500).json({ message: "Database Error saat memuat data transaksi.", error: err.message });
    }
};

exports.returnBook = async (req, res) => {
    const { id } = req.params; 
    const { bookId } = req.body; 
    const FINE_PER_DAY = 2000;

    try {
        const checkQuery = "SELECT due_date, status FROM borrowings WHERE id = ?";
        const [[loan]] = await db.query(checkQuery, [id]);

        if (!loan) {
            return res.status(404).json({ message: "Data peminjaman tidak ditemukan." });
        }

        if (loan.status === 'returned') {
            return res.status(400).json({ message: "Buku ini sudah dikembalikan sebelumnya." });
        }

        let finalFine = 0;
        if (loan.due_date) {
            const today = new Date();
            const dueDate = new Date(loan.due_date);
            if (today > dueDate) {
                const timeDiff = today.getTime() - dueDate.getTime();
                const daysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
                finalFine = daysLate * FINE_PER_DAY;
            }
        }

        const updateLoanQuery = "UPDATE borrowings SET status = 'returned', return_date = NOW(), fine = ? WHERE id = ?";
        await db.query(updateLoanQuery, [finalFine, id]);

        const updateStockQuery = "UPDATE books SET stock = stock + 1 WHERE id = ?";
        await db.query(updateStockQuery, [bookId]);
        
        return res.status(200).json({ message: "Buku berhasil dikembalikan dan stok telah ditambahkan kembali!" });
    } catch (err) {
        console.error("Gagal memproses pengembalian:", err);
        return res.status(500).json({ message: "Database Error saat memproses pengembalian.", error: err.message });
    }
};