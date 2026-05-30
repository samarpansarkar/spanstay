import { Heart, LayoutDashboard, Settings, User } from "lucide-react";

import { NavLink } from "react-router-dom";

import Logo from "@/components/shared/Logo";

const items = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    label: "Saved Hotels",
    icon: Heart,
    path: "/dashboard/saved",
  },

  {
    label: "Profile",
    icon: User,
    path: "/dashboard/profile",
  },

  {
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="border-r border-slate-200 bg-white p-8">
      <div className="mb-12">
        <Logo />
      </div>

      <div className="space-y-3">
        {items.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-2xl px-4 py-4 transition-all ${
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

export default DashboardSidebar;
