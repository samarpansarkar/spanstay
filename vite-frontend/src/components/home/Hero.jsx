import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/animations/variants';
import heroBg from '@/assets/hero.png';

const Hero = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-midnight-navy">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Luxury Villa"
          fetchpriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dim/70 via-surface-dim/40 to-surface-dim"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <span className="inline-block py-1 px-4 rounded-sm border border-warm-gold/50 text-warm-gold text-xs font-semibold tracking-widest uppercase mb-6 bg-surface-container-low/50 backdrop-blur-sm">
            Curated Experiences & Heritage
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-on-surface mb-6 tracking-tight font-display">
            Discover Your Next <br className="hidden md:block" />
            <span className="text-warm-gold italic">Luxury Stay</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-body">
            Experience exclusive villas and heritage properties with seamless booking and personalized concierge service.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
