import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section ref={ref} className="py-24 bg-gradient-section md:py-[50px]">
      <div className="container px-6 max-w-4xl mx-auto text-center">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7
      }}>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            And Most Elite Schools Leave{" "}
            <span className="text-gold">8 to 10 Oxbridge Offers</span>
            {" "}on the Table Every Single Year...
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mt-6">
            without ever seeing why they are lost.
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7,
        delay: 0.2
      }} className="mt-4">
          <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>Those offers don't disappear. They move other schools up the Oxbridge table.</p>
            <p>This is how reputations drift - one place at a time.</p>
            <p>And the more they drift, the harder it is to recover.</p>
            <p>
              Every year your school operates without a reliable, offer-generating system,
            </p>
            <p className="text-foreground font-semibold">
              other schools move ahead of you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>;
};