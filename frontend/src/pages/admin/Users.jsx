import AdminLayout from "../../components/admin/AdminLayout";

export default function Users() {
  return (
    <AdminLayout>
      <h1 className="text-5xl text-[#3E2F26] mb-2"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        Users Management
      </h1>

      <p className="text-[#6B5B4D] mb-6">
        Manage registered users
      </p>

      <input
        placeholder="Search users..."
        className="px-5 py-3 rounded-full border border-[#D8CDBF] bg-white w-[420px] mb-6 outline-none"
      />

      <div className="bg-[#FFFDF9] border border-[#E7DDD0] rounded-2xl p-6">
        <div className="grid grid-cols-4 font-semibold text-[#3E2F26] mb-4">
          <span>Name</span>
          <span>Email</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        <div className="grid grid-cols-4 py-3 text-[#6B5B4D] border-t border-[#F2EBE1]">
          <span>Kafka</span>
          <span>kafka@mail.com</span>
          <span className="text-green-700">Active</span>
          <span className="space-x-3">
            <button className="text-[#8B6F47]">Block</button>
            <button className="text-[#B45309]">Delete</button>
          </span>
        </div>
      </div>
    </AdminLayout>
  );
}