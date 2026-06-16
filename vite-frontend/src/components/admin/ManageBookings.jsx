import { useGetHotelAdminBookingsQuery, useConfirmBookingMutation, useCancelBookingMutation } from '@/redux/api/bookingApi';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, MapPin, Calendar, IndianRupee, User } from 'lucide-react';
import { toast } from 'sonner';
import { CardSkeleton } from '@/components/ui/Skeleton/Skeleton';

const ManageBookings = () => {
  const { data, isLoading } = useGetHotelAdminBookingsQuery();
  const [confirmBooking] = useConfirmBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();

  const handleConfirm = async (id) => {
    try {
      await confirmBooking(id).unwrap();
      toast.success('Booking confirmed');
    } catch (err) {
      toast.error('Failed to confirm booking');
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(id).unwrap();
        toast.success('Booking cancelled');
      } catch (err) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-on-surface">Hotel Bookings</h1>
          <p className="text-on-surface-variant">Manage reservations for your properties</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  const bookings = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-on-surface">Hotel Bookings</h1>
        <p className="text-on-surface-variant">Manage reservations for your properties</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-surface-container border border-glass-border rounded-3xl p-12 text-center">
          <p className="text-on-surface-variant">No bookings found for your properties.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container border border-glass-border rounded-2xl p-6 transition-all hover:bg-surface-container-high"
            >
              <div className="flex flex-col xl:flex-row justify-between gap-6">

                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-on-surface">{booking.hotel?.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-on-surface-variant mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {booking.hotel?.location}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                        booking.status === 'cancelled' ? 'bg-rose-500/20 text-rose-400' :
                          'bg-amber-500/20 text-amber-400'
                      }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-deep-charcoal/50 border border-glass-border w-fit">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-warm-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{booking.user?.name || 'Unknown User'}</p>
                      <p className="text-xs text-on-surface-variant">{booking.user?.email || 'No email provided'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-deep-charcoal/50 p-3 rounded-xl border border-glass-border">
                      <p className="text-xs text-on-surface-variant font-semibold mb-1 uppercase">Check-in</p>
                      <div className="flex items-center gap-2 text-on-surface text-sm">
                        <Calendar className="w-4 h-4 text-warm-gold" />
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-deep-charcoal/50 p-3 rounded-xl border border-glass-border">
                      <p className="text-xs text-on-surface-variant font-semibold mb-1 uppercase">Check-out</p>
                      <div className="flex items-center gap-2 text-on-surface text-sm">
                        <Calendar className="w-4 h-4 text-warm-gold" />
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-glass-border pt-4">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <IndianRupee className="w-5 h-5" />
                      <span className="text-lg">{booking.totalPrice?.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-normal text-on-surface-variant ml-1 bg-surface-container px-2 py-0.5 rounded-full capitalize">{booking.paymentStatus}</span>
                    </div>

                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleConfirm(booking._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-sm font-semibold"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Confirm
                        </button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors text-sm font-semibold"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
