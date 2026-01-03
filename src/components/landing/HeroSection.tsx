import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Decorative floating blurs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Centered rotating circles */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute w-[800px] h-[800px] border border-gold/20 rounded-full"
          animate={{ 
            rotate: 360,
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] border border-gold/20 rounded-full"
          animate={{ 
            rotate: -360,
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] border border-gold/15 rounded-full"
          animate={{ 
            rotate: 360,
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />
      </motion.div>

      <div className="container relative z-10 px-6 py-16 text-center">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-cream mb-8 md:mb-10 leading-tight whitespace-nowrap"
        >
          <span className="block">Be One of the Schools Known for</span>
          <span className="block">Consistent Oxford and Cambridge Offers,</span>
          <span className="block">Year After Year.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-8 md:mb-10"
        >
          <p className="text-base md:text-lg lg:text-xl text-cream/80 mb-2">
            Every year, your Oxbridge results are compared against peer schools.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-cream/90">
            Take control of the numbers that{" "}
            <span className="text-gold font-semibold">decide your school's reputation.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/request-analysis">
            <Button variant="hero" size="lg" className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7">
              Request a Free Oxbridge Performance Analysis
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 md:mt-8 text-cream/70 italic max-w-xl mx-auto text-sm md:text-base"
        >
          Developed at{" "}
          <span className="text-gold not-italic font-medium">The University of Oxford</span>
          , our data-driven analysis shows which schools you're competing with for Oxbridge offers - and how to move ahead.
        </motion.p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
};
