import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero';
import SearchWidget from '@/components/home/SearchWidget';
import FeaturedHotels from '@/components/home/FeaturedHotels';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SEO from '@/components/shared/SEO';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Home" 
        description="Book your next luxury stay across India with SpanStay."
      />
      <Hero />
      <SearchWidget />
      <FeaturedHotels />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
