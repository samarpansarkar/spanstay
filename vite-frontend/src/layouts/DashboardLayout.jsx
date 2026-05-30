import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-[280px_1fr] bg-slate-50">
      <DashboardSidebar />

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
