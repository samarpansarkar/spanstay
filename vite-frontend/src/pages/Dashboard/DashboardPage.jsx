import DashboardStats from "@/components/dashboard/DashboardStats";

const DashboardPage = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="mt-3 text-slate-500">Welcome back to StayFinder</p>
      </div>

      <DashboardStats />
    </div>
  );
};

export default DashboardPage;
