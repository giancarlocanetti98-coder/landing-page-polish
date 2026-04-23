import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const ReputationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-section">
      <div className="container px-6 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight"
        >
          Build a Reputation for Sending Students to{" "}
          <span className="text-gold">Top Universities</span>
        </motion.h2>
      </div>
    </section>
  );
};