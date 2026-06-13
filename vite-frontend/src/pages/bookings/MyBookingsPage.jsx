import { useGetMyBookingsQuery, useCancelBookingMutation } from '@/redux/api/bookingApi';
import { motion } from 'framer-motion';
import { Calendar, MapPin, IndianRupee, Loader2, Home, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="text-rose-400 mb-4">Failed to load bookings.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const bookings = data?.data || [];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-slate-400">Manage and view your upcoming and past reservations.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
            <Home className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">No bookings yet</h2>
            <p className="text-slate-400 mb-8">It's time to pack your bags and plan your next adventure.</p>
            <Link
              to="/hotels"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-xl transition-all"
            >
              Explore Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-6 transition-colors hover:bg-white/10"
              >
                <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0 bg-slate-900">
                  {booking.hotel?.images?.[0]?.url ? (
                    <img
                      src={booking.hotel.images[0].url}
                      alt={booking.hotel.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="w-8 h-8 text-slate-700" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-semibold text-white">
                        {booking.hotel?.title || 'Unknown Hotel'}
                      </h3>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                            booking.status === 'cancelled' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20' :
                              'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                          }`}>
                          {booking.status}
                        </span>
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            disabled={isCanceling}
                            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2 py-1 rounded-md transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 mb-6">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{booking.hotel?.location || 'Unknown Location'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950/50 rounded-xl p-3 border border-white/5">
                        <span className="block text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Check-in</span>
                        <div className="flex items-center gap-2 text-slate-200">
                          <Calendar className="w-4 h-4 text-indigo-400" />
                          <span>{new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      <div className="bg-slate-950/50 rounded-xl p-3 border border-white/5">
                        <span className="block text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Check-out</span>
                        <div className="flex items-center gap-2 text-slate-200">
                          <Calendar className="w-4 h-4 text-indigo-400" />
                          <span>{new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-6 pt-6 border-t border-white/10">
                    <div>
                      <span className="block text-sm text-slate-400 mb-1">Payment Status</span>
                      <span className={`text-sm font-semibold capitalize ${booking.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm text-slate-400 mb-1">Total Amount</span>
                      <div className="flex items-center text-xl font-bold text-white">
                        <IndianRupee className="w-5 h-5 mr-0.5" />
                        <span>{booking.totalPrice?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
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
