import {
  Building2,
  CalendarCheck,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const items = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    path: "/admin",
  },

  {
    label: "Hotels",
    icon: Building2,
    path: "/admin/hotels",
  },

  {
    label: "Bookings",
    icon: CalendarCheck,
    path: "/admin/bookings",
  },

  {
    label: "Users",
    icon: Users,
    path: "/admin/users",
  },

  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const AdminSidebar = () => {
  return (
    <aside className="border-r border-slate-200 bg-white p-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-primary">StayFinder</h1>

        <p className="mt-2 text-sm text-slate-500">Admin Panel</p>
      </div>

      <div className="space-y-3">
        {items.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all ${
                isActive ? "bg-primary text-white" : "hover:bg-slate-100"
              }`
            }
          >
            <Icon className="h-5 w-5" />

            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;
