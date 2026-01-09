import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Decorative floating blurs - positioned differently from hero */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Static concentric circles - different from hero's rotating ones */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="absolute w-[900px] h-[900px] border border-gold/10 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute w-[700px] h-[700px] border border-gold/15 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] border border-gold/20 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute w-[300px] h-[300px] border border-gold/25 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Header navigation */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 py-6">
        <nav className="container mx-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-cream/20 text-cream hover:bg-cream hover:text-oxford-blue transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 md:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-cream text-center max-w-5xl mx-auto leading-tight"
        >
          A Data-Driven System That Allows Schools to Measure and Improve Their Oxbridge Performance
        </motion.h1>

        {/* Looping Flowchart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-24 flex justify-center"
        >
          <div className="relative">
            {/* The circular flow */}
            <div className="flex flex-col items-center gap-4 md:gap-6">
              {/* Top row */}
              <div className="flex items-center gap-3 md:gap-6">
                <div className="bg-cream/10 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-3 md:px-6 md:py-4">
                  <span className="text-cream font-medium text-sm md:text-base">Gather Data</span>
                </div>
                <div className="text-gold text-xl md:text-2xl">→</div>
                <div className="bg-cream/10 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-3 md:px-6 md:py-4">
                  <span className="text-cream font-medium text-sm md:text-base">Determine Oxbridge Position</span>
                </div>
              </div>

              {/* Right arrow down */}
              <div className="self-end mr-8 md:mr-12 text-gold text-xl md:text-2xl">↓</div>

              {/* Bottom row */}
              <div className="flex items-center gap-3 md:gap-6">
                <div className="bg-cream/10 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-3 md:px-6 md:py-4">
                  <span className="text-cream font-medium text-sm md:text-base">Improve Oxbridge Position</span>
                </div>
                <div className="text-gold text-xl md:text-2xl">←</div>
                <div className="bg-cream/10 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-3 md:px-6 md:py-4">
                  <span className="text-cream font-medium text-sm md:text-base whitespace-nowrap">Identify Where Offers Are Being Lost</span>
                </div>
              </div>

              {/* Left arrow up - completing the loop */}
              <div className="self-start ml-8 md:ml-12 text-gold text-xl md:text-2xl">↑</div>
            </div>

            {/* Loop indicator text */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 -translate-x-full hidden lg:block">
              <div className="text-gold/60 text-sm italic">Continuous improvement cycle</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
