import AdminStats from "@/components/admin/AdminStats";
import HotelManagementTable from "@/components/admin/HotelManagementTable";
import RevenueChart from "@/components/admin/RevenueChart";

const AdminPage = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <p className="mt-3 text-slate-500">
          Manage your platform analytics and operations
        </p>
      </div>

      <AdminStats />

      <RevenueChart />

      <HotelManagementTable />
    </div>
  );
};

export default AdminPage;
