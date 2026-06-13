import { useGetProfileQuery, useLogoutMutation } from '@/redux/api/authApi';
import { clearCredential } from '@/redux/features/auth/authSlice';
import UserSupportTickets from './components/UserSupportTickets';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { motion } from 'framer-motion';
import {
  Building2,
  CalendarDays,
  CreditCard,
  Hotel,
  LogOut,
  Mail,
  Settings,
  Shield,
  ShieldCheck,
  Star,
  User,
} from 'lucide-react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ROLE_META = {
  user: {
    label: 'Guest',
    icon: User,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
  hotelAdmin: {
    label: 'Hotel Admin',
    icon: Building2,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  admin: {
    label: 'Platform Admin',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
    <div className={`p-2.5 rounded-xl ${color} bg-white/5`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-white font-semibold text-lg">{value}</p>
    </div>
  </div>
);

const FeatureRow = ({ icon: Icon, title, description, badge, available }) => (
  <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${available ? 'bg-white/5 border-white/10' : 'bg-white/[0.02] border-white/5 opacity-60'}`}>
    <div className={`p-2 rounded-lg mt-0.5 ${available ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-slate-500'}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <p className={`font-medium text-sm ${available ? 'text-white' : 'text-slate-500'}`}>{title}</p>
        {badge && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${available ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-500'}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-slate-500 text-xs mt-0.5">{description}</p>
    </div>
  </div>
);

const UsersProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data, isLoading, isError } = useGetProfileQuery();

  const user = data?.data;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredential());
      toast.success('Logged out successfully');
      navigate('/signin');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Failed to load profile.</p>
      </div>
    );
  }

  const roleMeta = ROLE_META[user.role] ?? ROLE_META.user;
  const RoleIcon = roleMeta.icon;
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const isHotelAdmin = user.role === 'hotelAdmin' || user.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-10 space-y-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-400 text-sm">{user.email}</span>
                </div>
                <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full border text-xs font-medium ${roleMeta.bg} ${roleMeta.color}`}>
                  <RoleIcon className="w-3 h-3" />
                  {roleMeta.label}
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleLogout}
              disabled={isLoggingOut}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoggingOut ? (
                <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              {isLoggingOut ? 'Logging out…' : 'Logout'}
            </motion.button>
          </div>

          {user.createdAt && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
              <CalendarDays className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 text-xs">
                Member since {format(new Date(user.createdAt), 'MMMM yyyy')}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <StatCard icon={CalendarDays} label="Bookings" value="—" color="text-indigo-400" />
          <StatCard icon={Star} label="Reviews" value="—" color="text-amber-400" />
          <StatCard icon={CreditCard} label="Payments" value="—" color="text-emerald-400" />
          {isHotelAdmin && (
            <StatCard icon={Hotel} label="Hotels" value="—" color="text-violet-400" />
          )}
          {!isHotelAdmin && (
            <StatCard icon={Shield} label="Role" value={roleMeta.label} color="text-slate-400" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            Account Details
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Full Name', value: user.name },
              { label: 'Email Address', value: user.email },
              { label: 'Role', value: roleMeta.label },
              { label: 'Account ID', value: user._id ?? user.id },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <span className="text-slate-500 text-sm">{label}</span>
                <span className="text-slate-200 text-sm font-medium truncate max-w-[60%] text-right">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-400" />
            Features & Capabilities
          </h2>
          <div className="space-y-2">
            <FeatureRow
              icon={Hotel}
              title="Browse Hotels"
              description="Search and filter hotels by location, price, and amenities"
              badge="Live"
              available
            />
            <FeatureRow
              icon={CalendarDays}
              title="Make Bookings"
              description="Book hotels with automatic conflict detection and pricing"
              badge="Live"
              available
            />
            <FeatureRow
              icon={CreditCard}
              title="Stripe Payments"
              description="Secure checkout via Stripe with webhook confirmation"
              badge="Live"
              available
            />
            <FeatureRow
              icon={CalendarDays}
              title="My Bookings"
              description="View and cancel your active and past reservations"
              badge="Coming Soon"
              available={false}
            />
            <FeatureRow
              icon={Star}
              title="Reviews & Ratings"
              description="Leave reviews and star ratings for hotels you've stayed at"
              badge="Coming Soon"
              available={false}
            />
            <FeatureRow
              icon={Settings}
              title="Edit Profile"
              description="Update your name, email, and profile picture"
              badge="Coming Soon"
              available={false}
            />
            {isHotelAdmin && (
              <>
                <FeatureRow
                  icon={Building2}
                  title="Register Hotel"
                  description="List your property with images, amenities, and pricing"
                  badge="Live"
                  available
                />
                <FeatureRow
                  icon={Shield}
                  title="Manage Bookings"
                  description="Confirm or cancel bookings for your properties"
                  badge="Live"
                  available
                />
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
        >
          <UserSupportTickets />
        </motion.div>

      </div>
    </div>
  );
};

export default UsersProfilePage;
