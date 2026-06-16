import { useGetHotelsQuery } from '@/redux/api/hotelApi';
import { HotelCard, HotelCardSkeleton } from '@/components/hotels/HotelCard';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/animations/variants';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedHotels = () => {

  const { data, isLoading } = useGetHotelsQuery({
    limit: 4,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const hotels = data?.data?.hotels ?? [];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10 border-b border-glass-border pb-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-2 font-display">Featured Stays</h2>
          <p className="text-on-surface-variant font-body text-sm md:text-base">Discover our most popular and newly added properties.</p>
        </div>
        <Link
          to="/hotels"
          className="hidden sm:flex items-center gap-2 text-warm-gold hover:text-primary font-semibold transition-colors font-body uppercase tracking-wider text-xs"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <HotelCardSkeleton key={i} />)}
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {hotels.map(hotel => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </motion.div>
      )}

      <div className="mt-8 sm:hidden">
        <Link
          to="/hotels"
          className="flex justify-center items-center gap-2 w-full py-4 rounded-sm border border-warm-gold text-warm-gold font-semibold uppercase tracking-wider text-xs hover:bg-warm-gold/10 transition-colors font-body"
        >
          View all properties
        </Link>
      </div>
    </section>
  );
};

export default FeaturedHotels;
