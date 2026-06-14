import { cn } from '@/lib/cn';
import { NavLink } from 'react-router-dom';

const navItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Hotels',
    path: '/hotels',
  },
  {
    label: 'My Bookings',
    path: '/my-bookings',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    adminOnly: true,
  },
];

const NavLinks = ({ mobile, onClose }) => {
  return (
    <section
      className={cn('flex gap-8', mobile && 'flex-col items-start gap-6')}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive ? 'text-primary' : 'text-slate-700'
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </section>
  );
};

export default NavLinks;
