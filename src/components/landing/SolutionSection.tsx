import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp } from "lucide-react";
export const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section ref={ref} className="py-24 bg-gradient-hero relative overflow-hidden md:py-[50px]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-6 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7
      }} className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6 leading-tight">
            <span className="block">If Your School Doesn't <span className="text-gold">Move Ahead of Peer Schools</span></span>
            <span className="block">for Oxbridge Offers,</span>
            <span className="block text-gold">You Don't Pay</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors duration-300">
            <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-gold" />
            </div>
            <p className="text-primary-foreground text-lg font-semibold">
              You see exactly which schools you compete with for Oxbridge offers - and how to pull ahead.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.7,
          delay: 0.3
        }} className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors duration-300">
            <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-gold" />
            </div>
            <p className="text-primary-foreground text-lg font-semibold">
              We begin improving your Oxbridge position immediately.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center text-primary-foreground text-xl md:text-2xl font-semibold mt-10"
        >
          You only pay if your Oxbridge position improves.
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7,
        delay: 0.5
      }} className="text-center mt-16">
          <Link to="/request-analysis">
            <Button variant="hero" size="lg" className="text-lg px-10 py-7 mb-6">
              Check Your School's Oxbridge Position
            </Button>
          </Link>
          <p className="text-primary-foreground/60 italic">
            We only work with a small number of schools at any one time.
          </p>
        </motion.div>
      </div>
    </section>;
};