import { useParams, useNavigate } from 'react-router-dom';
import { useGetHotelByIdQuery } from '@/redux/api/hotelApi';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { HotelDetailSkeleton } from '@/components/ui/Skeleton/Skeleton';
import SEO from '@/components/shared/SEO';

import HotelGallery from '@/components/hotels/details/HotelGallery';
import HotelInfo from '@/components/hotels/details/HotelInfo';
import BookingWidget from '@/components/hotels/details/BookingWidget';
import HotelReviews from '@/components/hotels/details/HotelReviews';

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetHotelByIdQuery(id);

  if (isLoading) {
    return <HotelDetailSkeleton />;
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-2xl font-bold mb-2">Hotel Not Found</h2>
        <p className="text-slate-400 mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/hotels')}
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl transition-colors"
        >
          Back to Hotels
        </button>
      </div>
    );
  }

  const hotel = data.data;

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <SEO 
        title={hotel.title} 
        description={hotel.description} 
        image={hotel.images?.[0]?.url}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group w-fit"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >

          <HotelGallery images={hotel.images} />

          <div className="flex flex-col lg:flex-row gap-12 mt-10">

            <div className="lg:w-2/3">
              <HotelInfo hotel={hotel} />
            </div>

            <div className="lg:w-1/3">
              {hotel.isAvailable ? (
                <BookingWidget pricePerNight={hotel.price} />
              ) : (
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl sticky top-24 shadow-2xl flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🏨</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Currently Offline</h3>
                  <p className="text-slate-400 text-sm">
                    This property is currently not accepting new reservations. Please check back later or explore other amazing stays.
                  </p>
                  <button
                    onClick={() => navigate('/hotels')}
                    className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    Find Other Hotels
                  </button>
                </div>
              )}
            </div>
          </div>

          <HotelReviews hotelId={hotel._id} />
        </motion.div>

      </div>
    </div>
  );
};

export default HotelDetailPage;
