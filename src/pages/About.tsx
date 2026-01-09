import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d4d4d4 1px, transparent 1px),
            linear-gradient(to bottom, #d4d4d4 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(245,245,245,0.8) 70%)'
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-oxford-blue/20 text-oxford-blue hover:bg-oxford-blue hover:text-cream transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Main content */}
        <div className="flex items-center justify-center min-h-[70vh]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-oxford-blue text-center max-w-5xl leading-tight"
          >
            A Data-Driven System That Allows Schools to Measure and Improve Their Oxbridge Performance
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default About;
