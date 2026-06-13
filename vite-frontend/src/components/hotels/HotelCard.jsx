import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/animations/variants';
import { IndianRupee, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HotelCard = ({ hotel }) => (
  <motion.div variants={fadeUpVariant}>
    <Link
      to={`/hotels/${hotel._id}`}
      className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:bg-white/[0.07] transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-slate-800">
        {hotel.images?.[0]?.url ? (
          <img
            src={hotel.images[0].url}
            alt={hotel.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-600 text-sm">No image</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-white text-xs font-medium">4.5</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-base truncate group-hover:text-indigo-300 transition-colors">
          {hotel.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <span className="text-slate-400 text-sm truncate">{hotel.location}</span>
        </div>

        {hotel.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
              >
                {a}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500">
                +{hotel.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-0.5">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold text-lg">
              {hotel.price?.toLocaleString('en-IN')}
            </span>
            <span className="text-slate-500 text-xs ml-1">/night</span>
          </div>
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export const HotelCardSkeleton = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-48 bg-white/10" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-white/10 rounded-lg w-3/4" />
      <div className="h-3 bg-white/10 rounded-lg w-1/2" />
      <div className="flex gap-2 mt-3">
        <div className="h-5 w-16 bg-white/10 rounded-full" />
        <div className="h-5 w-14 bg-white/10 rounded-full" />
      </div>
      <div className="h-px bg-white/10 mt-4" />
      <div className="flex justify-between">
        <div className="h-5 w-24 bg-white/10 rounded-lg" />
        <div className="h-6 w-20 bg-white/10 rounded-lg" />
      </div>
    </div>
  </div>
);
