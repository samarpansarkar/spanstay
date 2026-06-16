import { useGetProfileQuery, useLogoutMutation } from '@/redux/api/authApi';
import { clearCredential } from '@/redux/features/auth/authSlice';
import UserSupportTickets from '@/components/users/UserSupportTickets';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { motion } from 'framer-motion';
import { ProfileSkeleton } from '@/components/ui/Skeleton/Skeleton';
import SEO from '@/components/shared/SEO';
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
    color: 'text-warm-gold',
    bg: 'bg-warm-gold/10 border-warm-gold/20',
  },
  hotelAdmin: {
    label: 'Concierge',
    icon: Building2,
    color: 'text-warm-gold',
    bg: 'bg-warm-gold/10 border-warm-gold/20',
  },
  admin: {
    label: 'Platform Admin',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-surface-container border border-glass-border rounded-sm p-5 flex items-center gap-4 shadow-sm">
    <div className={`p-2.5 rounded-sm ${color} bg-deep-charcoal border border-glass-border`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest font-body">{label}</p>
      <p className="text-on-surface font-display text-lg">{value}</p>
    </div>
  </div>
);

const FeatureRow = ({ icon: Icon, title, description, badge, available }) => (
  <div className={`flex items-start gap-4 p-5 rounded-sm border transition-all duration-200 ${available ? 'bg-surface-container border-glass-border shadow-sm' : 'bg-surface-container/50 border-glass-border/50 opacity-60'}`}>
    <div className={`p-2 rounded-sm mt-0.5 ${available ? 'bg-warm-gold/10 text-warm-gold border border-warm-gold/20' : 'bg-deep-charcoal border border-glass-border text-on-surface-variant'}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <p className={`font-semibold text-sm font-body tracking-wide ${available ? 'text-on-surface' : 'text-on-surface-variant'}`}>{title}</p>
        {badge && (
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${available ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-surface-container-high border-glass-border text-on-surface-variant'}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-on-surface-variant text-xs mt-1 font-body">{description}</p>
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
    return <ProfileSkeleton />;
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center">
        <p className="text-on-surface-variant font-body">Failed to load profile.</p>
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
    <div className="min-h-screen bg-surface-container-lowest">
      <SEO title="My Profile" noindex={true} />

      <div className="relative max-w-4xl mx-auto px-4 pt-28 pb-16 space-y-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-surface-container border border-glass-border rounded-sm p-8 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-sm bg-warm-gold/20 border border-warm-gold/30 flex items-center justify-center text-2xl font-bold font-display text-warm-gold flex-shrink-0">
                {initials}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-on-surface font-display tracking-wide">{user.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-4 h-4 text-on-surface-variant" />
                  <span className="text-on-surface-variant text-sm font-body">{user.email}</span>
                </div>
                <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-sm border text-[10px] font-bold uppercase tracking-widest ${roleMeta.bg} ${roleMeta.color}`}>
                  <RoleIcon className="w-3.5 h-3.5" />
                  {roleMeta.label}
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleLogout}
              disabled={isLoggingOut}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-xs uppercase tracking-wider font-bold disabled:opacity-50 disabled:pointer-events-none font-body mt-2 sm:mt-0"
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
            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-glass-border">
              <CalendarDays className="w-4 h-4 text-on-surface-variant" />
              <span className="text-on-surface-variant text-xs font-body uppercase tracking-wider font-semibold">
                Member since {format(new Date(user.createdAt), 'MMMM yyyy')}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <StatCard icon={CalendarDays} label="Bookings" value="—" color="text-warm-gold" />
          <StatCard icon={Star} label="Reviews" value="—" color="text-emerald-400" />
          <StatCard icon={CreditCard} label="Payments" value="—" color="text-violet-400" />
          {isHotelAdmin && (
            <StatCard icon={Hotel} label="Properties" value="—" color="text-indigo-400" />
          )}
          {!isHotelAdmin && (
            <StatCard icon={Shield} label="Role" value={roleMeta.label} color="text-on-surface-variant" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="bg-surface-container border border-glass-border rounded-sm p-8 shadow-sm"
        >
          <h2 className="text-on-surface font-display text-xl mb-6 flex items-center gap-3">
            <User className="w-5 h-5 text-warm-gold" />
            Account Details
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Full Name', value: user.name },
              { label: 'Email Address', value: user.email },
              { label: 'Role', value: roleMeta.label },
              { label: 'Account ID', value: user._id ?? user.id },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center pb-4 border-b border-glass-border last:border-0 last:pb-0">
                <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider font-body">{label}</span>
                <span className="text-on-surface text-sm font-medium font-body truncate max-w-[60%] text-right">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="bg-surface-container border border-glass-border rounded-sm p-8 shadow-sm"
        >
          <h2 className="text-on-surface font-display text-xl mb-6 flex items-center gap-3">
            <Settings className="w-5 h-5 text-warm-gold" />
            Features & Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureRow
              icon={Hotel}
              title="Browse Properties"
              description="Search and filter hotels by location, price, and amenities"
              badge="Live"
              available
            />
            <FeatureRow
              icon={CalendarDays}
              title="Make Reservations"
              description="Book hotels with automatic conflict detection and pricing"
              badge="Live"
              available
            />
            <FeatureRow
              icon={CreditCard}
              title="Secure Payments"
              description="Secure checkout via Stripe with webhook confirmation"
              badge="Live"
              available
            />
            <FeatureRow
              icon={CalendarDays}
              title="My Reservations"
              description="View and cancel your active and past reservations"
              badge="Live"
              available
            />
            <FeatureRow
              icon={Star}
              title="Reviews & Ratings"
              description="Leave reviews and star ratings for properties you've visited"
              badge="Live"
              available
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
                  title="Register Property"
                  description="List your property with images, amenities, and pricing"
                  badge="Live"
                  available
                />
                <FeatureRow
                  icon={Shield}
                  title="Manage Reservations"
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
