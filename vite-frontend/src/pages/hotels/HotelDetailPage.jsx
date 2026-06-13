import { useParams, useNavigate } from 'react-router-dom';
import { useGetHotelByIdQuery } from '@/redux/api/hotelApi';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

import HotelGallery from '@/components/hotels/details/HotelGallery';
import HotelInfo from '@/components/hotels/details/HotelInfo';
import BookingWidget from '@/components/hotels/details/BookingWidget';
import HotelReviews from '@/components/hotels/details/HotelReviews';

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetHotelByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
              <BookingWidget pricePerNight={hotel.price} />
            </div>
          </div>

          <HotelReviews hotelId={hotel._id} />
        </motion.div>

      </div>
    </div>
  );
};

export default HotelDetailPage;
