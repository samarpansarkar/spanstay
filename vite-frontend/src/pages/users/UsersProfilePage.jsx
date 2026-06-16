import { useGetProfileQuery } from '@/redux/api/authApi';
import { useGetMyBookingsQuery } from '@/redux/api/bookingApi';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { motion } from 'framer-motion';
import SEO from '@/components/shared/SEO';
import DashboardSidebar from '@/components/shared/DashboardSidebar';
import UserSupportTickets from '@/components/users/UserSupportTickets';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ProfileSkeleton } from '@/components/ui/Skeleton/Skeleton';

const UsersProfilePage = () => {
  const { data: profileData, isLoading: isLoadingProfile, isError } = useGetProfileQuery();
  const { data: bookingsData } = useGetMyBookingsQuery();
  const navigate = useNavigate();

  const user = profileData?.data;
  const bookings = bookingsData?.data || [];
  const upcomingBooking = bookings.find(b => new Date(b.checkInDate) > new Date() && b.status === 'CONFIRMED');

  if (isLoadingProfile) return <ProfileSkeleton />;
  if (isError || !user) return <div className="min-h-screen flex items-center justify-center text-on-surface-variant">Failed to load profile.</div>;

  return (
    <div className="flex min-h-screen pt-[72px] bg-surface-container-lowest">
      <SEO title="Elite Dashboard" noindex={true} />
      
      <DashboardSidebar activeTab="profile" onTabChange={() => {}} />

      <main className="flex-1 px-6 md:px-margin-desktop py-12 max-w-container-max mx-auto overflow-x-hidden">
        {/* Hero Section Dashboard */}
        <section className="mb-12 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label-caps text-warm-gold mb-2 block tracking-[0.2em] uppercase">WELCOME BACK, {user.name.split(' ')[0]}</span>
              <h1 className="font-display-lg text-headline-lg md:text-display-lg leading-tight">Your upcoming <span className="italic text-warm-gold">Elite Journey</span></h1>
            </div>
            <div className="flex gap-4">
              <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border px-6 py-4 rounded-lg shadow-sm">
                <span className="block text-xs font-label-caps text-on-surface-variant mb-1">MEMBERSHIP STATUS</span>
                <span className="text-warm-gold font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">diamond</span> {user.role === 'admin' ? 'PLATINUM ELITE' : 'GOLD ELITE'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Trip Focus Card */}
        {upcomingBooking ? (
          <section className="mb-16 transition-all duration-700 ease-out opacity-100 translate-y-0">
            <div className="relative group overflow-hidden rounded-xl h-[450px] flex items-end">
              <div className="absolute inset-0 z-0">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={upcomingBooking.hotel?.title} 
                  src={upcomingBooking.hotel?.images?.[0]?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
              </div>
              <div className="relative z-10 bg-surface-container/40 backdrop-blur-3xl m-6 md:m-12 p-8 w-full max-w-3xl flex flex-col md:flex-row gap-8 items-center border-l-4 border-l-warm-gold shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-warm-gold mb-3">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span className="font-label-caps uppercase">{format(new Date(upcomingBooking.checkInDate), 'MMMM dd')} - {format(new Date(upcomingBooking.checkOutDate), 'MMMM dd')}</span>
                  </div>
                  <h2 className="font-display-lg text-headline-lg mb-2">{upcomingBooking.hotel?.title}</h2>
                  <p className="text-on-surface-variant line-clamp-2">Exclusive access to your reserved suites with premium dedicated concierge service.</p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <button onClick={() => navigate(`/hotel/${upcomingBooking.hotel?._id}`)} className="bg-primary text-on-primary px-8 py-3 font-bold whitespace-nowrap hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all rounded-sm">View Details</button>
                  <button onClick={() => navigate('/my-bookings')} className="text-on-surface border border-glass-border px-8 py-3 font-bold hover:bg-white/5 transition-all rounded-sm">Manage Trip</button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="mb-16 transition-all duration-700 ease-out opacity-100 translate-y-0">
             <div className="bg-surface-container/40 border border-glass-border rounded-xl p-12 text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-warm-gold text-4xl mb-4">luggage</span>
                <h3 className="font-display-lg text-headline-md mb-2">No Upcoming Journeys</h3>
                <p className="text-on-surface-variant mb-6">Discover your next luxury escape.</p>
                <button onClick={() => navigate('/hotels')} className="bg-primary text-on-primary px-8 py-3 font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all rounded-sm">Explore Villas</button>
             </div>
          </section>
        )}

        {/* Grid: Saved & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* User Support Tickets (mapped to Concierge Services layout) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
             <h3 className="font-display-lg text-headline-md">Concierge Services</h3>
             <UserSupportTickets />
          </div>

          <div className="flex flex-col gap-6">
            {/* Quick Contacts */}
            <div className="bg-surface-container-high p-8 flex flex-col gap-6 border-t-2 border-warm-gold shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-warm-gold">verified_user</span>
                </div>
                <div>
                  <p className="font-bold text-soft-cream">Personal Curator</p>
                  <p className="text-xs text-on-surface-variant">Available 24/7 for requests</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-surface-container-highest hover:bg-surface-variant transition-colors group rounded-sm">
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-warm-gold">flight_takeoff</span>
                    <span className="font-medium text-sm">Private Jet Booking</span>
                  </span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-surface-container-highest hover:bg-surface-variant transition-colors group rounded-sm">
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-warm-gold">restaurant</span>
                    <span className="font-medium text-sm">Michelin Reservations</span>
                  </span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </button>
              </div>
              <div className="mt-4 p-4 border border-warm-gold/20 bg-warm-gold/5 rounded-sm">
                <p className="text-xs text-on-surface-variant leading-relaxed italic">
                  "Our mission is to curate the impossible. From last-minute villa upgrades to exclusive cultural access, your curator is one message away."
                </p>
              </div>
            </div>

            {/* Rewards Card */}
            <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border p-6 overflow-hidden relative shadow-sm rounded-sm">
              <div className="relative z-10">
                <h4 className="font-label-caps text-warm-gold mb-2">ELITE REWARDS</h4>
                <p className="text-xl font-display-lg mb-4">42,500 <span className="text-sm font-body-md text-on-surface-variant">POINTS</span></p>
                <div className="w-full bg-white/10 h-1 rounded-full mb-4">
                  <div className="bg-warm-gold h-full w-3/4 rounded-full"></div>
                </div>
                <p className="text-xs text-on-surface-variant">7,500 points until Platinum tier</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersProfilePage;
