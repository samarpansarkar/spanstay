import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

const SearchWidget = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.append('location', location.trim());
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);

    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-24 sm:-mt-28">
      <div className="bg-surface-container/40 backdrop-blur-xl border border-glass-border p-2 sm:p-4 rounded-lg shadow-2xl">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center gap-2 bg-deep-charcoal rounded-md p-2"
        >
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-high/50 rounded-sm transition-colors cursor-text">
            <MapPin className="w-5 h-5 text-warm-gold" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider font-body">Location</label>
              <input
                type="text"
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border-none outline-none text-on-surface placeholder-on-surface-variant/50 text-sm w-full font-body"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-glass-border"></div>
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-high/50 rounded-sm transition-colors cursor-pointer">
            <Calendar className="w-5 h-5 text-warm-gold" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider font-body">Check in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent border-none outline-none text-on-surface text-sm w-full [color-scheme:dark] font-body"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-glass-border"></div>
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-high/50 rounded-sm transition-colors cursor-pointer">
            <Calendar className="w-5 h-5 text-warm-gold" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider font-body">Check out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent border-none outline-none text-on-surface text-sm w-full [color-scheme:dark] font-body"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-glass-border"></div>
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-high/50 rounded-sm transition-colors cursor-pointer">
            <Users className="w-5 h-5 text-warm-gold" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider font-body">Guests</label>
              <input
                type="number"
                min="1"
                placeholder="Add guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent border-none outline-none text-on-surface placeholder-on-surface-variant/50 text-sm w-full font-body"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto mt-2 md:mt-0 bg-warm-gold hover:bg-primary text-on-primary py-4 px-8 rounded-sm flex items-center justify-center gap-2 font-semibold transition-colors font-body"
          >
            <Search className="w-5 h-5" />
            <span className="md:hidden">Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchWidget;
