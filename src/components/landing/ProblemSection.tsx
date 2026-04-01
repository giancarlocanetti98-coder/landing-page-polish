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
            And many ambitious schools are closer than they realise to{" "}
            <span className="text-gold">stronger university outcomes</span>
            {" "}— without ever seeing clearly what is holding them back.
          </h2>
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
      }} className="mt-8">
          <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>Strong students are there.</p>
            <p>Ambition is there.</p>
            <p>Effort is there.</p>
            <p className="text-foreground font-medium">But outcomes remain unpredictable.</p>
            <p>One year, a cohort performs strongly.</p>
            <p>The next, results fall back.</p>
            <p>Not always because the students are less capable.</p>
            <p>But because success is still too dependent on individual staff, changing cohorts, and an increasingly competitive admissions landscape.</p>
            <p className="text-foreground font-medium">Without a reliable system, too much potential is lost.</p>
            <p>And while your institution works hard to improve, other schools move ahead faster.</p>
            <p className="text-gold font-semibold">
              That is how progress stalls — even when the intent to improve is there.
            </p>
          </div>
        </motion.div>
      </div>
    </section>;
};