import { memo } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/animations/variants';
import { IndianRupee, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HotelCard = memo(({ hotel }) => (
  <motion.div variants={fadeUpVariant}>
    <Link
      to={`/hotels/${hotel._id}`}
      aria-label={`View details for ${hotel.title}`}
      className={`group block bg-surface-container-lowest border border-glass-border rounded-sm overflow-hidden hover:border-warm-gold/40 transition-all duration-300 shadow-sm hover:shadow-warm-gold/5 ${!hotel.isAvailable ? 'opacity-60 grayscale-[0.5]' : ''}`}
    >
      <div className="relative h-56 overflow-hidden bg-deep-charcoal">
        {hotel.images?.[0]?.url ? (
          <img
            src={hotel.images[0].url.replace('w=2000', 'w=600').replace('q=80', 'q=60')}
            alt={hotel.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-on-surface-variant text-sm font-body">No image</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-surface-dim/80 backdrop-blur-md border border-glass-border rounded px-2.5 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-warm-gold fill-warm-gold" />
          <span className="text-on-surface text-xs font-semibold font-body">{hotel.averageRating || 'New'}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-on-surface font-semibold text-lg truncate group-hover:text-warm-gold transition-colors font-display tracking-wide">
          {hotel.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-2">
          <MapPin className="w-3.5 h-3.5 text-warm-gold/70 flex-shrink-0" />
          <span className="text-on-surface-variant text-sm truncate font-body">{hotel.location}</span>
        </div>

        {hotel.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {hotel.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-[10px] px-2 py-0.5 rounded border border-glass-border text-on-surface bg-surface-container font-body uppercase tracking-wider"
              >
                {a}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded border border-glass-border text-on-surface-variant bg-surface-container font-body">
                +{hotel.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-glass-border">
          <div className="flex items-center gap-0.5">
            <IndianRupee className="w-4 h-4 text-warm-gold" />
            <span className="text-on-surface font-bold text-xl font-display">
              {hotel.price?.toLocaleString('en-IN')}
            </span>
            <span className="text-on-surface-variant text-xs ml-1 font-body">/night</span>
          </div>
          {hotel.isAvailable ? (
            <span className="text-[10px] font-bold text-on-primary bg-warm-gold hover:bg-primary uppercase tracking-wider px-4 py-2 rounded-sm transition-colors font-body">
              Book Now
            </span>
          ) : (
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container border border-glass-border uppercase tracking-wider px-4 py-2 rounded-sm font-body">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </Link>
  </motion.div>
));

HotelCard.displayName = 'HotelCard';

export const HotelCardSkeleton = memo(() => (
  <div className="bg-surface-container-lowest border border-glass-border rounded-sm overflow-hidden animate-pulse">
    <div className="h-56 bg-surface-container" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-surface-container rounded w-3/4" />
      <div className="h-3 bg-surface-container rounded w-1/2" />
      <div className="flex gap-2 mt-4">
        <div className="h-5 w-16 bg-surface-container rounded" />
        <div className="h-5 w-14 bg-surface-container rounded" />
      </div>
      <div className="h-px bg-glass-border mt-5" />
      <div className="flex justify-between mt-4">
        <div className="h-6 w-24 bg-surface-container rounded" />
        <div className="h-8 w-24 bg-surface-container rounded" />
      </div>
    </div>
  </div>
));

HotelCardSkeleton.displayName = 'HotelCardSkeleton';
