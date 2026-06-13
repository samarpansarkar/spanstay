import { useGetHotelAdminBookingsQuery, useConfirmBookingMutation, useCancelBookingMutation } from '@/redux/api/bookingApi';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, MapPin, Calendar, IndianRupee, User } from 'lucide-react';
import { toast } from 'sonner';

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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const bookings = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Hotel Bookings</h1>
        <p className="text-slate-400">Manage reservations for your properties</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
          <p className="text-slate-400">No bookings found for your properties.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10"
            >
              <div className="flex flex-col xl:flex-row justify-between gap-6">
                
                {/* User & Hotel Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{booking.hotel?.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {booking.hotel?.location}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                      booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                      booking.status === 'cancelled' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-white/5 w-fit">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{booking.user?.name || 'Unknown User'}</p>
                      <p className="text-xs text-slate-400">{booking.user?.email || 'No email provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Details & Actions */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-500 font-semibold mb-1 uppercase">Check-in</p>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-500 font-semibold mb-1 uppercase">Check-out</p>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <IndianRupee className="w-5 h-5" />
                      <span className="text-lg">{booking.totalPrice?.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-normal text-slate-500 ml-1 bg-white/5 px-2 py-0.5 rounded-full capitalize">{booking.paymentStatus}</span>
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
