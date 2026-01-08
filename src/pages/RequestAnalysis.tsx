import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RequestAnalysis = () => {
  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(26, 32, 44, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(26, 32, 44, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cream/50 pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back arrow */}
        <Link 
          to="/" 
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-oxford/5 text-oxford/70 hover:bg-oxford/10 hover:text-oxford transition-all duration-300 mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oxford leading-tight">
              See Your School's Oxbridge Position Compared with Similar Schools
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RequestAnalysis;
