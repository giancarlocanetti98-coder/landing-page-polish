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
            Being Responsible for University Places You Can't Control Is{" "}
            <span className="text-gold">Draining.</span>
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
            <p>You are expected to improve outcomes.</p>
            <p>Year after year.</p>
            <p>You put things in place.</p>
            <p>You push for higher standards.</p>
            <p>You ask more of your staff.</p>
            <p>You support your students.</p>
            <p className="text-foreground font-medium">But when university decisions come back, they don't always reflect the effort.</p>
            <p>One year looks strong.</p>
            <p>The next falls short.</p>
            <p className="text-foreground font-medium">And you are left asking the same question again:</p>
            <p className="text-gold font-semibold italic">What actually made the difference?</p>
            <p>Too much still depends on the individual students.</p>
            <p>On one or two members of staff.</p>
            <p>On how competitive the universities were that year.</p>
            <p>On factors you can't see or control.</p>
            <p>You know there are students who could have gone further.</p>
            <p>Applications that could have been stronger.</p>
            <p>Outcomes that should have been better.</p>
            <p className="text-foreground font-medium">But once the admissions cycle is over, it's hard to see exactly where university places were lost.</p>
            <p>And that's the most frustrating part.</p>
            <p>Not just that outcomes could be better —</p>
            <p className="text-foreground font-medium">but that improvement still feels unpredictable.</p>
            <p>You carry the pressure for results that are visible to everyone.</p>
            <p>But the process behind those results still feels unclear.</p>
            <p className="text-gold font-semibold">What you want is simple.</p>
            <p>To be able to see what is working.</p>
            <p>To understand where outcomes are being lost.</p>
            <p>To know that if you put something in place, it will reliably improve results.</p>
            <p>To feel like progress is real — and repeatable.</p>
            <p className="text-foreground font-medium">And to be able to say, with confidence:</p>
            <p className="text-gold font-semibold italic">We know what we're doing.</p>
            <p className="text-gold font-semibold italic">And it's working.</p>
          </div>
        </motion.div>
      </div>
    </section>;
};