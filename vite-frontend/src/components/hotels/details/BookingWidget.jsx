import { useState, useMemo } from 'react';
import { IndianRupee, Calendar, Users, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const BookingWidget = ({ pricePerNight }) => {
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

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates.');
      return;
    }
    if (nightsCount <= 0) {
      toast.error('Check-out date must be after check-in date.');
      return;
    }

    toast.success('Reservation request sent successfully!');
  };

  return (
    <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl sticky top-24 shadow-2xl">
      <div className="flex items-end gap-1 mb-6">
        <IndianRupee className="w-5 h-5 text-emerald-400 mb-1" />
        <span className="text-3xl font-bold text-white">{pricePerNight.toLocaleString('en-IN')}</span>
        <span className="text-slate-500 mb-1">/night</span>
      </div>

      <div className="border border-white/10 rounded-2xl overflow-hidden mb-6 bg-slate-950">
        <div className="flex flex-col sm:flex-row border-b border-white/10">
          <div className="flex-1 p-3 border-b sm:border-b-0 sm:border-r border-white/10">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check-in</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent border-none outline-none text-white text-sm w-full [color-scheme:dark]"
              />
            </div>
          </div>
          <div className="flex-1 p-3">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check-out</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent border-none outline-none text-white text-sm w-full [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
        <div className="p-3">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Guests</label>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="bg-transparent border-none outline-none text-white text-sm w-full"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleReserve}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform active:scale-[0.98]"
      >
        Reserve
      </button>

      {nightsCount > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-slate-300">
            <span className="underline decoration-slate-600 underline-offset-4 decoration-dashed">
              ₹{pricePerNight.toLocaleString('en-IN')} x {nightsCount} nights
            </span>
            <span>₹{totalBeforeTaxes.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span className="underline decoration-slate-600 underline-offset-4 decoration-dashed">
              SpanStay service fee
            </span>
            <span>₹{serviceFee.toLocaleString('en-IN')}</span>
          </div>
          <hr className="border-white/10" />
          <div className="flex justify-between text-white font-bold text-lg">
            <span>Total</span>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4" />
              <span>{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-start gap-2 p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
        <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-300 leading-relaxed">
          You won't be charged yet. This is an early demo reservation system.
        </p>
      </div>
    </div>
  );
};

export default BookingWidget;
