import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("digly_token");
      const response = await axios.get("https://digly-project.sevalla.app/api/admin/loans", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setLoans(response.data);

    } catch (err) {
      console.error("Gagal memuat sirkulasi peminjaman:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturnBook = async (loanId, bookId, bookTitle, userName) => {
    if (window.confirm(`Konfirmasi pengembalian buku "${bookTitle}" yang dipinjam oleh ${userName}?`)) {
      try {
        const token = localStorage.getItem("digly_token");
        await axios.put(
          `https://digly-project.sevalla.app/api/admin/loans/return/${loanId}`,
          { bookId }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Buku sukses dikembalikan, stok otomatis bertambah!");
        fetchLoans(); 
      } catch (err) {
        alert("Gagal memproses pengembalian buku.");
      }
    }
  };

  // Fungsi pembantu untuk memformat angka denda ke dalam Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number || 0);
  };

  return (
    <AdminLayout>
      <h1 className="text-5xl text-[#3E2F26] mb-2" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        Loan Management
      </h1>
      <p className="text-[#6B5B4D] mb-6">Track borrowing activity</p>

      <div className="bg-[#FFFDF9] border border-[#E7DDD0] rounded-2xl p-6 shadow-sm">
        {/* Mengubah grid-cols-4 menjadi grid-cols-5 */}
        <div className="grid grid-cols-5 font-semibold text-[#3E2F26] mb-4 pb-2 border-b border-[#E7DDD0]">
          <span>User</span>
          <span>Book Title</span>
          <span>Status</span>
          <span>Fine / Denda</span>
          <span>Action</span>
        </div>

        {loading ? (
          <div className="text-center py-6 text-[#6B5B4D]">Memuat data sirkulasi perpustakaan...</div>
        ) : loans.length === 0 ? (
          <div className="text-center py-6 text-[#6B5B4D]">Belum ada riwayat aktivitas peminjaman buku.</div>
        ) : (
          loans.map((loan) => (
            /* Mengubah kelas pembungkus data dari grid-cols-4 menjadi grid-cols-5 */
            <div key={loan.loan_id} className="grid grid-cols-5 py-3 text-[#6B5B4D] border-t border-[#F2EBE1] items-center">
              <span className="font-medium text-[#3E2F26]">{loan.user_name}</span>
              <span className="italic">"{loan.book_title}"</span>
              
              <span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${loan.status === "borrowed" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"}`}>
                  {loan.status === "borrowed" ? "Borrowed" : "Returned"}
                </span>
              </span>

              {/* Kolom Baru: Menampilkan Denda */}
              <span className={`font-medium ${loan.fine > 0 ? "text-red-600 font-semibold" : "text-gray-500"}`}>
                {formatRupiah(loan.fine)}
              </span>

              <div>
                {loan.status === "borrowed" ? (
                  <button 
                    onClick={() => handleReturnBook(loan.loan_id, loan.book_id, loan.book_title, loan.user_name)}
                    className="bg-[#6B4F3A] hover:bg-[#533D2D] text-white text-xs px-4 py-2 rounded-full font-medium transition shadow-sm w-fit"
                  >
                    Return Book
                  </button>
                ) : (
                  <span className="text-xs text-gray-400 font-medium">Selesai</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}