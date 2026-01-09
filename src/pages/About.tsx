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
      <div className="relative z-10 container mx-auto px-6 flex items-center justify-center min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-cream text-center max-w-5xl leading-tight"
        >
          A Data-Driven System That Allows Schools to Measure and Improve Their Oxbridge Performance
        </motion.h1>
      </div>
    </div>
  );
};

export default About;
