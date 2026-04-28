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
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight"
        >
          <span className="block whitespace-nowrap">Build a Reputation for Sending Students to</span>
          <span className="block text-gold">Top Universities</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          <p>
            Sending more students to Russell Group universities makes your school an ambitious, high-achieving environment that parents want for their children.
          </p>
          <p>
            This strengthens your reputation, builds <span className="font-semibold text-foreground">confidence in your leadership</span> and positions your institution as a competitive and academic choice for prospective students.
          </p>
        </motion.div>

        {/* Animated growth graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 mx-auto max-w-md"
        >
          <div className="relative bg-card/50 border border-border rounded-lg p-4 md:p-6 shadow-elegant">
            <svg
              viewBox="0 0 400 260"
              className="w-full h-auto"
              role="img"
              aria-label="Graph showing public perception rising with university outcomes"
            >
              {/* Y-axis */}
              <line x1="60" y1="20" x2="60" y2="220" stroke="hsl(var(--border))" strokeWidth="1.5" />
              {/* X-axis */}
              <line x1="60" y1="220" x2="380" y2="220" stroke="hsl(var(--border))" strokeWidth="1.5" />

              {/* Y-axis label */}
              <text
                x="-120"
                y="22"
                transform="rotate(-90)"
                className="fill-muted-foreground"
                fontSize="12"
                fontFamily="inherit"
                textAnchor="middle"
              >
                Public Perception
              </text>

              {/* X-axis label */}
              <text
                x="220"
                y="252"
                className="fill-muted-foreground"
                fontSize="12"
                fontFamily="inherit"
                textAnchor="middle"
              >
                University Outcomes
              </text>

              {/* Animated rising line */}
              <motion.path
                d="M 70 205 C 140 195, 200 150, 260 100 S 350 40, 375 30"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
              />

              {/* End point dot */}
              <motion.circle
                cx="375"
                cy="30"
                r="5"
                fill="hsl(var(--gold))"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 2.4 }}
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          <p>
            When your school becomes known for sending students to top universities, it attracts more ambitious and academically-driven students.
          </p>
          <p>
            This creates momentum, helping you to build <span className="font-semibold text-foreground">stronger results and a stronger reputation</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};