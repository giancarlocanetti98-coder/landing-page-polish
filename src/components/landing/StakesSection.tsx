import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const StakesSection = () => {
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
          University Outcomes are{" "}
          <span className="text-gold">Too Important</span> to<br />Leave to Chance
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          That's why we give you a <span className="font-semibold text-foreground">clear, reliable path</span> to get more Russell Group offers.
        </motion.p>
      </div>
    </section>
  );
};