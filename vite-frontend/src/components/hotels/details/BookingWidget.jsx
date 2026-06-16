import { useState, useMemo } from 'react';
import { IndianRupee, Calendar, Users, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCreateBookingMutation } from '@/redux/api/bookingApi';
import { useCreateCheckoutSessionMutation } from '@/redux/api/paymentApi';

const BookingWidget = ({ pricePerNight }) => {
  const { id: hotelId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const [createCheckout, { isLoading: isCheckingOut }] = useCreateCheckoutSessionMutation();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [checkIn, checkOut]);

  const totalBeforeTaxes = nightsCount * pricePerNight;
  const serviceFee = totalBeforeTaxes > 0 ? Math.floor(totalBeforeTaxes * 0.1) : 0;
  const total = totalBeforeTaxes + serviceFee;

  const handleReserve = async () => {
    if (!user) {
      toast.error('Please sign in to reserve this exclusive property');
      navigate('/signin');
      return;
    }
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates.');
      return;
    }
    if (nightsCount <= 0) {
      toast.error('Check-out date must be after check-in date.');
      return;
    }

    try {
      const bookingRes = await createBooking({
        hotelId,
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString(),
        guests: Number(guests)
      }).unwrap();

      const sessionRes = await createCheckout(bookingRes.data._id).unwrap();

      if (sessionRes.data?.url) {
        window.location.href = sessionRes.data.url;
      }
    } catch (error) {
      toast.error(error.data?.message || 'Failed to initialize checkout');
    }
  };

  return (
    <div className="bg-deep-charcoal border border-glass-border p-8 rounded-sm sticky top-28 shadow-sm">
      <div className="flex items-end gap-1 mb-8">
        <IndianRupee className="w-5 h-5 text-warm-gold mb-1.5" />
        <span className="text-4xl font-bold text-on-surface font-display">{pricePerNight.toLocaleString('en-IN')}</span>
        <span className="text-on-surface-variant font-body mb-1.5 ml-1">/night</span>
      </div>

      <div className="border border-glass-border rounded-sm overflow-hidden mb-8 bg-surface-container">
        <div className="flex flex-col sm:flex-row border-b border-glass-border">
          <div className="flex-1 p-4 border-b sm:border-b-0 sm:border-r border-glass-border">
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-body">Check-in</label>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-warm-gold/80" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent border-none outline-none text-on-surface text-sm w-full font-body [color-scheme:dark]"
              />
            </div>
          </div>
          <div className="flex-1 p-4">
            <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-body">Check-out</label>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-warm-gold/80" />
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent border-none outline-none text-on-surface text-sm w-full font-body [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-body">Guests</label>
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-warm-gold/80" />
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="bg-transparent border-none outline-none text-on-surface text-sm w-full font-body"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleReserve}
        disabled={isBooking || isCheckingOut}
        className="w-full bg-warm-gold hover:bg-primary text-on-primary font-semibold py-4 rounded-sm transition-colors duration-300 transform active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 uppercase tracking-wider text-sm font-body"
      >
        {isBooking || isCheckingOut ? 'Processing...' : 'Reserve'}
      </button>

      {nightsCount > 0 && (
        <div className="mt-8 space-y-4 font-body text-[15px]">
          <div className="flex justify-between text-on-surface-variant">
            <span className="underline decoration-glass-border underline-offset-4 decoration-dashed">
              ₹{pricePerNight.toLocaleString('en-IN')} x {nightsCount} nights
            </span>
            <span>₹{totalBeforeTaxes.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span className="underline decoration-glass-border underline-offset-4 decoration-dashed">
              SpanStay elite fee
            </span>
            <span>₹{serviceFee.toLocaleString('en-IN')}</span>
          </div>
          <hr className="border-glass-border my-4" />
          <div className="flex justify-between text-on-surface font-bold text-lg font-display tracking-wide">
            <span>Total</span>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4" />
              <span>{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-start gap-3 p-4 bg-warm-gold/10 rounded-sm border border-warm-gold/20">
        <AlertCircle className="w-4 h-4 text-warm-gold shrink-0 mt-0.5" />
        <p className="text-xs text-on-surface font-body leading-relaxed">
          You won't be charged yet. This is an early luxury demo reservation system.
        </p>
      </div>
    </div>
  );
};

export default BookingWidget;
