import { MapPin, Star, Check } from 'lucide-react';

const HotelInfo = ({ hotel }) => {
  return (
    <div className="flex-1 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-lg">
            Entire Property
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-medium text-sm text-slate-300">
              {hotel.averageRating ? `${hotel.averageRating} (${hotel.totalReviews} review${hotel.totalReviews === 1 ? '' : 's'})` : 'No reviews'}
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{hotel.title}</h1>

        <div className="flex items-center gap-1.5 text-slate-400">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{hotel.location}</span>
        </div>
      </div>

      <hr className="border-white/10" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-4">About this space</h2>
        <div className="text-slate-400 leading-relaxed space-y-4">
          {hotel.description.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <hr className="border-white/10" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-4">What this place offers</h2>
        {hotel.amenities?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hotel.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No amenities listed.</p>
        )}
      </div>
    </div>
  );
};

export default HotelInfo;
