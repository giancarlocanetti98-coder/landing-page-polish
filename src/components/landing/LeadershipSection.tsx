import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8 leading-tight">
              School Leadership is Judged on{" "}
              <span className="text-gold">Oxbridge Offers</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>Every year, your Oxbridge results are on display.</p>
              <p>To governors. To other elite schools. To the public.</p>
              <p className="text-foreground font-medium">These results shape your reputation.</p>
              <p>
                There is no league table for having the brightest students.
                Or for the best teaching.
                Or even for how many students reach interview.
              </p>
              <p>You do exceptional work.</p>
              <p className="text-foreground font-medium">
                But unless it converts into offers, it goes unrecognised.
              </p>
              <p className="text-gold font-semibold text-xl">Only your offers are published.</p>
            </div>
          </motion.div>

          {/* Visual comparison */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Red path */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border relative overflow-hidden group hover:shadow-elegant transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
              <div className="pl-4">
                <p className="text-destructive font-semibold mb-3 text-lg">Leadership called into question</p>
                <p className="text-muted-foreground">Quiet worry about Oxbridge offers</p>
              </div>
            </div>

            {/* Green path */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border relative overflow-hidden group hover:shadow-elegant transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
              <div className="pl-4">
                <p className="text-gold font-semibold mb-3 text-lg">Trust from governors and parents</p>
                <p className="text-muted-foreground">Clear public success</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
