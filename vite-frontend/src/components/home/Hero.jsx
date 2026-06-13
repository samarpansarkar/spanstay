import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/animations/variants';
import heroBg from '@/assets/hero.png';

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Luxury Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-6">
            Discover Your Next Adventure
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Find the perfect stay, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              anywhere in India
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Book premium hotels at the best prices. Experience luxury, comfort, and seamless booking with SpanStay.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
