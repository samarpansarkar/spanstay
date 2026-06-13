import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

const SearchWidget = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/hotels?location=${encodeURIComponent(location.trim())}`);
    } else {
      navigate('/hotels');
    }
  };

  return (
    <div className="relative z-20 max-w-4xl mx-auto px-4 -mt-16 sm:-mt-24">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-4 rounded-3xl shadow-2xl">
        <form 
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center gap-2 bg-slate-900 rounded-2xl p-2"
        >
          {/* Location */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors cursor-text">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</label>
              <input 
                type="text" 
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-slate-600 text-sm w-full"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-white/10"></div>

          {/* Check In - Dummy for now */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Check in</label>
              <span className="text-slate-500 text-sm">Add dates</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-white/10"></div>

          {/* Check Out - Dummy for now */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Check out</label>
              <span className="text-slate-500 text-sm">Add dates</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-white/10"></div>

          {/* Guests - Dummy for now */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
            <Users className="w-5 h-5 text-indigo-400" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guests</label>
              <span className="text-slate-500 text-sm">Add guests</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full md:w-auto mt-2 md:mt-0 bg-indigo-600 hover:bg-indigo-500 text-white p-4 md:px-8 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors"
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
