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
            className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border"
          >
            {/* Graph visualization */}
            <div className="relative">
              <svg
                viewBox="0 0 600 200"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Volatile declining red line (left side) */}
                <path
                  d="M 20 80 L 50 50 L 80 90 L 110 40 L 140 70 L 170 55 L 200 100 L 230 75 L 260 120 L 280 150"
                  fill="none"
                  stroke="hsl(0, 70%, 60%)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-80"
                />
                
                {/* Baseline */}
                <line
                  x1="20"
                  y1="170"
                  x2="580"
                  y2="170"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
                
                {/* Dotted divider */}
                <line
                  x1="300"
                  y1="30"
                  x2="300"
                  y2="170"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-40"
                />
                
                {/* Stable green line (right side) */}
                <path
                  d="M 320 60 L 360 55 L 400 62 L 440 58 L 480 63 L 520 57 L 560 60 L 580 58"
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                />
              </svg>
              
              {/* Labels */}
              <div className="grid grid-cols-2 gap-8 mt-8 pt-6 border-t border-border">
                {/* Red side labels */}
                <div className="text-center space-y-2">
                  <p className="font-serif text-lg md:text-xl text-destructive/80">
                    Quiet worry about Oxbridge offers
                  </p>
                  <p className="font-serif text-base md:text-lg text-muted-foreground">
                    Leadership called into question
                  </p>
                </div>
                
                {/* Green side labels */}
                <div className="text-center space-y-2">
                  <p className="font-serif text-lg md:text-xl text-gold">
                    Trust from governors and parents
                  </p>
                  <p className="font-serif text-base md:text-lg text-muted-foreground">
                    Clear public success
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
