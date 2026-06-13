import { useGetHotelsQuery } from '@/redux/api/hotelApi';
import { HotelCard, HotelCardSkeleton } from '@/components/hotels/HotelCard';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/animations/variants';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedHotels = () => {
  // Fetch latest 4 hotels
  const { data, isLoading } = useGetHotelsQuery({
    limit: 4,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const hotels = data?.data?.hotels ?? [];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Featured Stays</h2>
          <p className="text-slate-400">Discover our most popular and newly added properties.</p>
        </div>
        <Link 
          to="/hotels" 
          className="hidden sm:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
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
          className="flex justify-center items-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
        >
          View all properties
        </Link>
      </div>
    </section>
  );
};

export default FeaturedHotels;
