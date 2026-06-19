import AdminLayout from "../../components/admin/AdminLayout";

export default function Loans() {
  return (
    <AdminLayout>
      <h1 className="text-5xl text-[#3E2F26] mb-2"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        Loan Management
      </h1>

      <p className="text-[#6B5B4D] mb-6">
        Track borrowing activity
      </p>

      <div className="bg-[#FFFDF9] border border-[#E7DDD0] rounded-2xl p-6">
        <div className="grid grid-cols-4 font-semibold text-[#3E2F26] mb-4">
          <span>User</span>
          <span>Book</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        <div className="grid grid-cols-4 py-3 text-[#6B5B4D] border-t border-[#F2EBE1]">
          <span>Kafka</span>
          <span>Laskar Pelangi</span>
          <span className="text-yellow-700">Borrowed</span>
          <button className="bg-[#6B4F3A] text-white px-4 py-2 rounded-full w-fit">
            Return
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}