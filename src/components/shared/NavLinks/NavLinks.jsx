"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../../../lib/cn";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Hotels",
    path: "/hotels",
  },
  {
    label: "My Bookings",
    path: "/bookings",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
  },
];

const NavLinks = ({ mobile, onClose }) => {
  const pathname = usePathname();

  return (
    <section
      className={cn("flex gap-8", mobile && "flex-col items-start gap-6")}
    >
      {navItems.map((item) => {
        const isActive =
          item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            href={item.path}
            onClick={onClose}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-slate-700",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </section>
  );
};

export default NavLinks;
