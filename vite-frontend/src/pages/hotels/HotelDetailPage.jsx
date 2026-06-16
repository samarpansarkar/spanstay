import { useParams, useNavigate } from 'react-router-dom';
import { useGetHotelByIdQuery } from '@/redux/api/hotelApi';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { HotelDetailSkeleton } from '@/components/ui/Skeleton/Skeleton';
import SEO from '@/components/shared/SEO';
import useAuth from '@/hooks/useAuth';

import HotelGallery from '@/components/hotels/details/HotelGallery';
import HotelInfo from '@/components/hotels/details/HotelInfo';
import BookingWidget from '@/components/hotels/details/BookingWidget';
import HotelReviews from '@/components/hotels/details/HotelReviews';

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetHotelByIdQuery(id);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'hotelAdmin';

  if (isLoading) {
    return <HotelDetailSkeleton />;
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-midnight-navy flex flex-col items-center justify-center text-on-surface px-4">
        <h2 className="text-3xl font-bold mb-3 font-display">Property Not Found</h2>
        <p className="text-on-surface-variant mb-8 font-body">The luxury property you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/hotels')}
          className="bg-warm-gold hover:bg-primary text-on-primary px-8 py-3 rounded-sm font-semibold uppercase tracking-wider text-sm transition-colors font-body"
        >
          Explore Stays
        </button>
      </div>
    );
  }

  const hotel = data.data;

  return (
    <div className="min-h-screen bg-midnight-navy pb-24">
      <SEO 
        title={hotel.title} 
        description={hotel.description} 
        image={hotel.images?.[0]?.url}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-warm-gold transition-colors mb-8 group w-fit font-body uppercase tracking-wider text-sm font-semibold"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >

          <HotelGallery images={hotel.images} />

          <div className="flex flex-col lg:flex-row gap-16 mt-12">

            <div className="lg:w-2/3">
              <HotelInfo hotel={hotel} />
            </div>

            <div className="lg:w-1/3">
              {isAdmin ? (
                <div className="bg-deep-charcoal border border-glass-border p-8 rounded-sm sticky top-28 shadow-sm flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-6 border border-glass-border">
                    <span className="material-symbols-outlined text-warm-gold text-3xl">admin_panel_settings</span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-3 font-display">Administrator View</h3>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                    You are viewing this property as an administrator. Reservations are restricted to guest accounts.
                  </p>
                </div>
              ) : hotel.isAvailable ? (
                <BookingWidget pricePerNight={hotel.price} />
              ) : (
                <div className="bg-deep-charcoal border border-glass-border p-8 rounded-sm sticky top-28 shadow-sm flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl opacity-50">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-3 font-display">Currently Unavailable</h3>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                    This exclusive property is currently not accepting new reservations. Please explore other amazing stays.
                  </p>
                  <button
                    onClick={() => navigate('/hotels')}
                    className="mt-8 w-full bg-surface-container hover:bg-surface-container-high border border-glass-border text-on-surface font-semibold py-4 rounded-sm transition-colors uppercase tracking-wider text-xs font-body"
                  >
                    Find Other Properties
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
