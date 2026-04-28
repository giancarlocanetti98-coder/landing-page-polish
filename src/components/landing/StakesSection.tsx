import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

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
          A Clear Path to More{" "}
          <span className="text-gold">Top-University</span> Offers
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          <p>You already have support in place for your students.</p>
          <p>Personal statement help. Mock interviews. Academic preparation.</p>
          <p>We make that support more strategic, as well as adding specialist help where it has the <span className="font-semibold text-foreground">greatest impact on Russell Group offers</span>.</p>
          <p>We do not just add generic support across the board.</p>
          <p>Instead, we identify precisely where offers are being lost, and add targeted support where it matters most.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start text-left bg-card/50 border border-border rounded-lg p-6 md:p-8 shadow-elegant"
        >
          <div className="flex-shrink-0">
            <div className="font-serif text-4xl md:text-5xl font-semibold text-gold">
              01
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Step 1 — Analysis
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We analyse your last 5-10 years of UCAS data to see exactly where offers are being won and lost.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              For each subject, university, and stage of the application process, we identify the year-on-year patterns behind stronger and weaker outcomes.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-2">
              {["Application", "Interview", "Offer", "Secured Place"].map((step, i, arr) => (
                <div key={step} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
                  <div className="px-4 py-3 rounded-md border border-gold/40 bg-background/60 text-foreground font-medium text-sm md:text-base whitespace-nowrap shadow-sm">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-gold rotate-90 sm:rotate-0 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We examine every application to see where things went well, what went wrong, and where the biggest opportunities for improvement are.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};