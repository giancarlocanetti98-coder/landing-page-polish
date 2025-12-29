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
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            And most elite schools are
          </p>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
            leaving{" "}
            <span className="text-gold">8 to 10 Oxbridge offers</span>
            <br />
            on the table every single year...
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12">
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
      }} className="bg-card rounded-3xl p-10 md:p-14 shadow-elegant border border-border">
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground">
            <p>Those offers don't disappear.</p>
            <p className="text-foreground font-medium text-xl md:text-2xl">They go to other schools.</p>
            <div className="w-24 h-px bg-gold/40 mx-auto my-8" />
            <p>This is how reputations drift quietly.</p>
            <p>And the more they drift, the harder it is to recover.</p>
          </div>
        </motion.div>

        <motion.p initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7,
        delay: 0.4
      }} className="mt-12 text-lg md:text-xl text-foreground font-medium max-w-2xl mx-auto">
          Every year your school operates without a reliable, offer-generating system,
          <br />
          <span className="text-destructive">those Oxbridge offers are gone for good.</span>
        </motion.p>
      </div>
    </section>;
};