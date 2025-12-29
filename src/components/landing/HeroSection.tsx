import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full" />
      </div>

      <div className="container relative z-10 px-6 py-16 text-center">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block text-gold text-5xl md:text-6xl font-serif font-bold">O</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-cream mb-4 md:mb-6 leading-tight"
        >
          The Oxbridge Method
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gold-light mb-8 md:mb-10 leading-snug"
        >
          Consistent Oxford and Cambridge Offers,
          <br className="hidden sm:block" />
          <span className="italic">Year After Year</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-8 md:mb-10"
        >
          <p className="text-base md:text-lg lg:text-xl text-cream/80 mb-2">
            The pressure to deliver Oxbridge results is relentless.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-cream/90">
            Take control of the numbers that{" "}
            <span className="text-gold font-semibold">shape your reputation.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button variant="hero" size="lg" className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7">
            Request a Free Oxbridge Performance Analysis
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 md:mt-8 text-cream/70 italic max-w-xl mx-auto text-sm md:text-base"
        >
          Developed at{" "}
          <span className="text-gold not-italic font-medium">The University of Oxford</span>
          , our data-driven analysis uncovers exactly why your students are losing offers; and how to fix it.
        </motion.p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
