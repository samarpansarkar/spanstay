import Hero from '@/components/home/Hero';
import SearchWidget from '@/components/home/SearchWidget';
import FeaturedHotels from '@/components/home/FeaturedHotels';
import WhyChooseUs from '@/components/home/WhyChooseUs';

const HomePage = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Hero />
      <SearchWidget />
      <FeaturedHotels />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
