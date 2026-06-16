import { useGetMyBookingsQuery, useCancelBookingMutation } from '@/redux/api/bookingApi';
import { motion } from 'framer-motion';
import { Calendar, MapPin, IndianRupee, Home, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { CardSkeleton } from '@/components/ui/Skeleton/Skeleton';
import { BookingReviewSection } from '@/components/bookings/BookingReviewSection';

const MyBookingsPage = () => {
  const { data, isLoading, error } = useGetMyBookingsQuery();
  const [cancelBooking, { isLoading: isCanceling }] = useCancelBookingMutation();

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId).unwrap();
        toast.success('Booking cancelled successfully');
      } catch (err) {
        toast.error(err.data?.message || 'Failed to cancel booking');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-container-lowest pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-on-surface mb-3 font-display tracking-wide">My Reservations</h1>
            <p className="text-on-surface-variant font-body">Manage and view your upcoming and past exclusive stays.</p>
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest">
        <div className="text-center bg-surface-container p-8 rounded-sm border border-glass-border shadow-sm">
          <p className="text-red-400 mb-5 font-body">Failed to load reservations.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-warm-gold hover:text-primary underline font-body font-semibold uppercase tracking-wider text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const bookings = data?.data || [];

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-on-surface mb-3 font-display tracking-wide">My Reservations</h1>
          <p className="text-on-surface-variant font-body">Manage and view your upcoming and past exclusive stays.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-surface-container border border-glass-border rounded-sm p-16 text-center shadow-sm">
            <Home className="w-16 h-16 text-surface-container-high mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-on-surface mb-3 font-display">No reservations yet</h2>
            <p className="text-on-surface-variant mb-10 font-body">It's time to pack your bags and plan your next luxury adventure.</p>
            <Link
              to="/hotels"
              className="bg-warm-gold hover:bg-primary text-on-primary font-semibold py-3 px-8 rounded-sm transition-colors uppercase tracking-wider text-sm font-body"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container border border-glass-border rounded-sm p-8 flex flex-col md:flex-row gap-8 transition-colors hover:bg-surface-container-high shadow-sm"
              >
                <div className="w-full md:w-64 h-52 rounded-sm overflow-hidden shrink-0 bg-deep-charcoal border border-glass-border">
                  {booking.hotel?.images?.[0]?.url ? (
                    <img
                      src={booking.hotel.images[0].url.replace('w=2000', 'w=600').replace('q=80', 'q=60')}
                      alt={booking.hotel.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-8 h-8 text-on-surface-variant/50" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-on-surface font-display">
                        {booking.hotel?.title || 'Unknown Property'}
                      </h3>
                      <div className="flex flex-col items-end gap-3">
                        <span className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          booking.status === 'cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                          {booking.status}
                        </span>
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            disabled={isCanceling}
                            className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2 py-1.5 rounded-sm transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-on-surface-variant mb-6 font-body text-sm">
                      <MapPin className="w-4 h-4 text-warm-gold/80" />
                      <span>{booking.hotel?.location || 'Unknown Location'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-deep-charcoal rounded-sm p-4 border border-glass-border">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-2 font-body">Check-in</span>
                        <div className="flex items-center gap-2.5 text-on-surface font-body text-sm">
                          <Calendar className="w-4 h-4 text-warm-gold/80" />
                          <span>{new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      <div className="bg-deep-charcoal rounded-sm p-4 border border-glass-border">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-2 font-body">Check-out</span>
                        <div className="flex items-center gap-2.5 text-on-surface font-body text-sm">
                          <Calendar className="w-4 h-4 text-warm-gold/80" />
                          <span>{new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-8 pt-6 border-t border-glass-border">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 font-body">Payment Status</span>
                      <span className={`text-sm font-semibold uppercase tracking-wider font-body ${booking.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 font-body">Total Amount</span>
                      <div className="flex items-center text-2xl font-bold text-on-surface font-display">
                        <IndianRupee className="w-5 h-5 mr-0.5 text-warm-gold" />
                        <span>{booking.totalPrice?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <BookingReviewSection booking={booking} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
