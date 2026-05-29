import { Outlet } from "react-router-dom";

import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-[300px_1fr] bg-slate-100">
      <AdminSidebar />

      <main className="overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
