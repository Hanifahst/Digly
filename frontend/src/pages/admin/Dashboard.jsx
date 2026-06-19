import AdminLayout from "../../components/admin/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-5xl text-[#3E2F26] mb-2"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        Dashboard
      </h1>

      <p className="text-[#6B5B4D] mb-8">
        Overview of Digly library system
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Total Books" value="120" />
        <Card title="Total Users" value="45" />
        <Card title="Active Loans" value="18" />
      </div>
    </AdminLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[#FFFDF9] border border-[#E7DDD0] rounded-2xl p-6">
      <p className="text-[#6B5B4D]">{title}</p>
      <h2 className="text-3xl text-[#3E2F26] mt-2">{value}</h2>
    </div>
  );
}