import { 
  Luggage, 
  Heart, 
  Settings2, 
  CreditCard, 
  UserCog, 
  Headphones,
  Building2,
  CalendarDays,
  Users,
  CheckSquare,
  LifeBuoy,
  Terminal,
  LogOut
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCredential } from '@/redux/features/auth/authSlice';
import { useLogoutMutation } from '@/redux/api/authApi';
import { toast } from 'sonner';

export const USER_LINKS = [
  { id: 'profile', label: 'My Profile', icon: UserCog },
  { id: 'trips', label: 'My Trips', icon: Luggage, href: '/my-bookings' },
  { id: 'saved', label: 'Saved Villas', icon: Heart, href: '/hotels' },
  { id: 'preferences', label: 'Preferences', icon: Settings2, isComingSoon: true },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard, isComingSoon: true },
  { id: 'support', label: 'Support Tickets', icon: LifeBuoy, isComingSoon: true },
];

export const HOTEL_ADMIN_LINKS = [
  { id: 'profile', label: 'Concierge Desk', icon: UserCog },
  { id: 'hotels', label: 'Manage Properties', icon: Building2 },
  { id: 'bookings', label: 'Reservations', icon: CalendarDays },
  { id: 'my-approvals', label: 'My Requests', icon: CheckSquare },
];

export const SUPER_ADMIN_LINKS = [
  { id: 'profile', label: 'Platform Stats', icon: UserCog },
  { id: 'approvals', label: 'Property Approvals', icon: CheckSquare },
  { id: 'users', label: 'Manage Users', icon: Users },
  { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy },
  { id: 'logs', label: 'Audit Logs', icon: Terminal },
];

const DashboardSidebar = ({ activeTab, onTabChange }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let links = USER_LINKS;
  let title = 'Elite Member';
  let subtitle = 'Managing your luxury escapes';

  if (user?.role === 'admin') {
    links = SUPER_ADMIN_LINKS;
    title = 'Platform Admin';
    subtitle = 'System management console';
  } else if (user?.role === 'hotelAdmin') {
    links = HOTEL_ADMIN_LINKS;
    title = 'Concierge Desk';
    subtitle = 'Managing luxury properties';
  }

  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(clearCredential());
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleTabChange = (link) => {
    if (link.isComingSoon) {
      toast.info(`${link.label} feature is coming soon!`);
      return;
    }
    const id = link.id;
    if (window.location.pathname !== '/dashboard') {
      navigate('/dashboard', { state: { tab: id } });
    } else if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <aside className="hidden md:flex flex-col h-[calc(100vh-72px)] w-80 py-8 px-6 gap-y-6 bg-surface-container-low border-r border-glass-border sticky top-[72px] shrink-0">
      <div>
        <h3 className="font-display-lg text-headline-md text-warm-gold">{title}</h3>
        <p className="text-on-surface-variant text-sm mt-1">{subtitle}</p>
      </div>
      <nav className="flex flex-col gap-2 overflow-y-auto pr-2 pb-4 flex-1">
        {links.map((link) => (
          link.href ? (
            <button
              key={link.id}
              onClick={() => navigate(link.href)}
              className="flex items-center gap-4 px-4 py-3 rounded-sm transition-colors w-full text-left text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
            >
              <link.icon className="w-5 h-5" />
              <span className="font-body-md text-sm font-medium">{link.label}</span>
            </button>
          ) : (
            <button
              key={link.id}
              onClick={() => handleTabChange(link)}
              className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-colors w-full text-left ${
                activeTab === link.id
                  ? 'text-primary font-bold bg-surface-container-high border-l-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-body-md text-sm font-medium">{link.label}</span>
            </button>
          )
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-glass-border flex flex-col gap-3">
        <button 
          onClick={() => navigate('/concierge')}
          className="w-full flex items-center justify-center gap-2 border border-warm-gold text-warm-gold py-3 hover:bg-warm-gold/10 transition-all font-label-caps tracking-[0.1em]"
        >
          <Headphones className="w-4 h-4" />
          <span>Contact Concierge</span>
        </button>
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 border border-error/50 text-error py-3 hover:bg-error/10 transition-all font-label-caps tracking-[0.1em]">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
