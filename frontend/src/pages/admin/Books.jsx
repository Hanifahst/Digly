import AdminLayout from "../../components/admin/AdminLayout";

export default function Books() {
  return (
    <AdminLayout>
      <h1 className="text-5xl text-[#3E2F26] mb-2"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        Books Management
      </h1>

      <p className="text-[#6B5B4D] mb-6">
        Manage library book collection
      </p>

      <div className="flex justify-between mb-6">
        <input
          placeholder="Search books..."
          className="px-5 py-3 rounded-full border border-[#D8CDBF] bg-white w-[420px] outline-none"
        />

        <button className="bg-[#6B4F3A] text-white px-6 py-3 rounded-full">
          + Add Book
        </button>
      </div>

      <div className="bg-[#FFFDF9] border border-[#E7DDD0] rounded-2xl p-6">
        <div className="grid grid-cols-4 font-semibold text-[#3E2F26] mb-4">
          <span>Title</span>
          <span>Author</span>
          <span>Stock</span>
          <span>Action</span>
        </div>

        <div className="grid grid-cols-4 py-3 text-[#6B5B4D] border-t border-[#F2EBE1]">
          <span>Laskar Pelangi</span>
          <span>Andrea Hirata</span>
          <span>5</span>
          <span className="space-x-3">
            <button className="text-[#8B6F47]">Edit</button>
            <button className="text-[#B45309]">Delete</button>
          </span>
        </div>
      </div>
    </AdminLayout>
  );
}