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

        {/* Pillars supporting Offers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-24 flex justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Offers at the top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-gold/20 backdrop-blur-sm border-2 border-gold rounded-lg px-8 py-4 md:px-12 md:py-5"
            >
              <span className="text-gold font-serif font-bold text-xl md:text-2xl">Offers</span>
            </motion.div>

            {/* Arrows pointing up */}
            <div className="flex items-center justify-center gap-16 md:gap-24 lg:gap-32 text-gold text-2xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >↑</motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >↑</motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >↑</motion.span>
            </div>

            {/* Three pillars */}
            <div className="flex items-stretch justify-center gap-4 md:gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-cream/10 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-6 md:px-6 md:py-8 text-center"
              >
                <span className="text-cream font-medium text-sm md:text-base">Number of<br />Applicants</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-cream/10 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-6 md:px-6 md:py-8 text-center"
              >
                <span className="text-cream font-medium text-sm md:text-base">Conversion<br />Rate</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="bg-cream/10 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-6 md:px-6 md:py-8 text-center"
              >
                <span className="text-cream font-medium text-sm md:text-base">Stability</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
