import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section ref={ref} className="py-24 bg-gradient-section md:py-[20px]">
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
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8 leading-tight">
            And Most Elite Schools Leave{" "}
            <span className="text-gold">8 to 10 Oxbridge Offers</span>
            {" "}on the Table Every Single Year...
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground">
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
      }} className="mt-16 space-y-4">
          <p className="text-lg md:text-xl text-muted-foreground">
            Those offers don't disappear.
          </p>
          <p className="text-xl md:text-2xl text-foreground font-medium">
            They go to other schools.
          </p>

          <div className="w-24 h-px bg-gold/40 mx-auto my-10" />

          <p className="text-lg md:text-xl text-muted-foreground">
            This is how reputations drift quietly.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground">
            And the more they drift, the harder it is to recover.
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
        delay: 0.4
      }} className="mt-16">
          <p className="text-lg md:text-xl text-foreground font-medium max-w-2xl mx-auto">
            Every year your school operates without a reliable, offer-generating system,
          </p>
          <p className="text-lg md:text-xl text-destructive font-medium mt-2">
            those Oxbridge offers are gone for good.
          </p>
        </motion.div>
      </div>
    </section>;
};