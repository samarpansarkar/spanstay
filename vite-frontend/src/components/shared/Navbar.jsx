import { useLogoutMutation } from '@/redux/api/authApi';
import { clearCredential } from '@/redux/features/auth/authSlice';
import useAuth from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  CalendarDays,
  Hotel,
  LogOut,
  Menu,
  User,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const NAV_ITEMS = [
  { label: 'Hotels', path: '/hotels', icon: Hotel },
  { label: 'My Bookings', path: '/my-bookings', icon: CalendarDays },
];

const ADMIN_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: Building2 },
];

const NavItem = ({ path, label, icon: Icon, onClose }) => (
  <NavLink
    to={path}
    onClick={onClose}
    className={({ isActive }) =>
      `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
      }`
    }
  >
    <Icon className="w-4 h-4" />
    {label}
  </NavLink>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const isAdmin = user?.role === 'admin' || user?.role === 'hotelAdmin';

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredential());
      toast.success('Logged out successfully');
      navigate('/signin');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDropdownOpen(false);
    }
  };

  const visibleItems = [
    ...NAV_ITEMS,
    ...(isAdmin ? ADMIN_ITEMS : []),
  ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            <Link to="/" className="text-xl font-bold text-white tracking-tight">
              Span<span className="text-indigo-400">Stay</span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {visibleItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div ref={dropdownRef} className="relative hidden md:block">
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/40 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                    <span className="text-sm font-medium text-slate-200 max-w-[120px] truncate">
                      {user?.name}
                    </span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-xs text-slate-500">Signed in as</p>
                          <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                        </div>
                        <div className="p-1.5">
                          <Link
                            to="/profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>
                          <Link
                            to="/my-bookings"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <CalendarDays className="w-4 h-4" />
                            My Bookings
                          </Link>
                          <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                          >
                            {isLoading ? (
                              <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full" />
                            ) : (
                              <LogOut className="w-4 h-4" />
                            )}
                            {isLoading ? 'Logging out…' : 'Logout'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to="/signin"
                    className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-xl transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed right-0 top-0 z-50 h-full w-72 bg-slate-900 border-l border-white/10 p-6 md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-white">
                  Span<span className="text-indigo-400">Stay</span>
                </span>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 mb-8">
                {visibleItems.map((item) => (
                  <NavItem key={item.path} {...item} onClose={() => setMobileOpen(false)} />
                ))}
              </nav>

              {isAuthenticated ? (
                <div className="border-t border-white/10 pt-6 space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    to="/my-bookings"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    <CalendarDays className="w-4 h-4" />
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-6 flex flex-col gap-2">
                  <Link
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 rounded-xl border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
