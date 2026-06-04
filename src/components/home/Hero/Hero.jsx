"use client";
import { motion } from "framer-motion";

import Container from "@/components/ui/Container/Container";
import Image from "next/image";
import SearchBox from "../SearchBox/SearchBox";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          width={100}
          height={100}
          loading="eager"
          alt="Luxury Hotel"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />
      </div>

      <Container className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-4xl space-y-8 text-center"
        >
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
              Discover Your Perfect Luxury Stay
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-slate-200 md:text-xl">
              Book premium hotels, resorts, and unforgettable travel experiences
              around the world.
            </p>
          </div>

          <SearchBox />
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
