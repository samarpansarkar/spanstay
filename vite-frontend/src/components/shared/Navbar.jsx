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
  Headphones,
} from 'lucide-react';
import { NotificationBell } from '../notifications/NotificationBell';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const NAV_ITEMS = [
  { label: 'Properties', path: '/hotels', icon: Hotel },
  { label: 'My Reservations', path: '/my-bookings', icon: CalendarDays },
  { label: 'Concierge', path: '/concierge', icon: Headphones },
];

const ADMIN_ITEMS = [
  { label: 'Concierge Dashboard', path: '/dashboard', icon: Building2 },
];

const NavItem = ({ path, label, icon: Icon, onClose }) => (
  <NavLink
    to={path}
    onClick={onClose}
    className={({ isActive }) =>
      `flex items-center gap-2 text-sm font-medium transition-colors font-body uppercase tracking-wider ${isActive ? 'text-warm-gold' : 'text-on-surface-variant hover:text-on-surface'
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
    ...NAV_ITEMS.filter(item => !isAdmin || item.path !== '/my-bookings'),
    ...(isAdmin ? ADMIN_ITEMS : []),
  ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-glass-border bg-surface-container-lowest/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            <Link to="/" className="text-2xl font-bold text-on-surface tracking-tight font-display">
              Span<span className="text-warm-gold">Stay</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {visibleItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <NotificationBell />
                  <div ref={dropdownRef} className="relative hidden md:block">
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      className="flex items-center gap-2.5 rounded-sm border border-glass-border bg-surface-container px-3 py-1.5 hover:bg-surface-container-high transition-colors"
                    >
                    <div className="w-7 h-7 rounded-sm bg-warm-gold/20 border border-warm-gold/30 flex items-center justify-center text-xs font-bold text-warm-gold">
                      {initials}
                    </div>
                    <span className="text-sm font-semibold font-body text-on-surface max-w-[120px] truncate">
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
                        className="absolute right-0 mt-2 w-56 bg-deep-charcoal border border-glass-border rounded-sm shadow-sm overflow-hidden"
                      >
                        <div className="px-4 py-4 border-b border-glass-border">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant font-body">Signed in as</p>
                          <p className="text-sm font-semibold text-on-surface font-body truncate mt-1">{user?.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-body"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>
                          {!isAdmin && (
                            <Link
                              to="/my-bookings"
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-body"
                            >
                              <CalendarDays className="w-4 h-4" />
                              My Reservations
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-sm text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50 font-body mt-1"
                          >
                            {isLoading ? (
                              <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
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
                </>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    to="/signin"
                    className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors px-3 py-1.5 font-body"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-semibold uppercase tracking-wider bg-warm-gold hover:bg-primary text-on-primary px-5 py-2 rounded-sm transition-colors font-body"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              <button
                aria-label="Toggle navigation menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 text-on-surface-variant hover:text-on-surface transition-colors"
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
              className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed right-0 top-0 z-50 h-full w-72 bg-surface-container-low border-l border-glass-border p-6 md:hidden shadow-lg"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-2xl font-bold text-on-surface font-display">
                  Span<span className="text-warm-gold">Stay</span>
                </span>
                <button aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 mb-8">
                {visibleItems.map((item) => (
                  <NavItem key={item.path} {...item} onClose={() => setMobileOpen(false)} />
                ))}
              </nav>

              {isAuthenticated ? (
                <div className="border-t border-glass-border pt-8 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-sm text-sm text-on-surface-variant hover:bg-surface-container font-body transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  {!isAdmin && (
                    <Link
                      to="/my-bookings"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-sm text-sm text-on-surface-variant hover:bg-surface-container font-body transition-colors"
                    >
                      <CalendarDays className="w-4 h-4" />
                      My Reservations
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-sm text-sm text-red-400 hover:bg-red-400/10 transition-colors font-body"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-glass-border pt-8 flex flex-col gap-3">
                  <Link
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-3 rounded-sm border border-glass-border text-sm text-on-surface font-semibold uppercase tracking-wider hover:bg-surface-container transition-colors font-body"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-3 rounded-sm bg-warm-gold hover:bg-primary text-sm font-semibold uppercase tracking-wider text-on-primary transition-colors font-body"
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
