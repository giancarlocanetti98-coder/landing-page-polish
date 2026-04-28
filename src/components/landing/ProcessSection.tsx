import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Analysis",
    description:
      "We analyse your last five years of UCAS data to see what's working well and where offers are being lost.",
  },
];

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container px-6 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-center"
        >
          How We Create <span className="text-gold">This Path</span>
        </motion.h2>

        <div className="mt-16 space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start bg-card/50 border border-border rounded-lg p-6 md:p-8 shadow-elegant"
            >
              <div className="flex-shrink-0">
                <div className="font-serif text-4xl md:text-5xl font-semibold text-gold">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  Step {parseInt(step.number, 10)} — {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};