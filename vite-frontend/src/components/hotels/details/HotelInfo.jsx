import { MapPin, Star, Check } from 'lucide-react';

const HotelInfo = ({ hotel }) => {
  return (
    <div className="flex-1 space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-warm-gold/10 border border-warm-gold/20 text-warm-gold text-[10px] font-semibold px-3 py-1.5 rounded-sm uppercase tracking-widest font-body">
            Exclusive Property
          </span>
          <div className="flex items-center gap-1.5 text-warm-gold">
            <Star className="w-4 h-4 fill-warm-gold" />
            <span className="font-semibold text-sm text-on-surface font-body">
              {hotel.averageRating ? `${hotel.averageRating} (${hotel.totalReviews} review${hotel.totalReviews === 1 ? '' : 's'})` : 'No reviews'}
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4 font-display tracking-wide leading-tight">{hotel.title}</h1>

        <div className="flex items-center gap-2 text-on-surface-variant font-body">
          <MapPin className="w-4 h-4 text-warm-gold/80" />
          <span className="text-sm">{hotel.location}</span>
        </div>
      </div>

      <hr className="border-glass-border" />

      <div>
        <h2 className="text-2xl font-semibold text-on-surface mb-5 font-display">About this space</h2>
        <div className="text-on-surface-variant leading-relaxed space-y-5 font-body text-[15px]">
          {hotel.description.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <hr className="border-glass-border" />

      <div>
        <h2 className="text-2xl font-semibold text-on-surface mb-6 font-display">What this place offers</h2>
        {hotel.amenities?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {hotel.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-4 text-on-surface-variant font-body text-sm">
                <div className="w-8 h-8 rounded-full border border-glass-border bg-surface-container flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-warm-gold" />
                </div>
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-on-surface-variant text-sm font-body">No amenities listed.</p>
        )}
      </div>
    </div>
  );
};

export default HotelInfo;
