import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const StakesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ---- Two contrasting funnels ----
  // Same start (everyone applies = 1.0) — shape difference shows where students drop off.
  type Funnel = {
    id: string;
    label: string;
    // Proportions relative to "Applied" (always 1). Order: Applied, Interview, Offer, Place secured.
    ratios: number[];
  };

  const stageLabels = ["Applied", "Interview", "Offer", "Place secured"];

  const funnels: Funnel[] = [
    {
      id: "stem",
      label: "STEM",
      // Lots of interviews, few convert to offers
      ratios: [1, 0.75, 0.15, 0.15],
    },
    {
      id: "humanities",
      label: "Humanities",
      // Few interviews, but every one converts
      ratios: [1, 0.35, 0.35, 0.35],
    },
  ];

  const renderFunnel = (funnel: Funnel, funnelIdx: number) => {
    const baseDelay = 0.4 + funnelIdx * 0.15;
    return (
      <div className="flex-1 min-w-0">
        <div className="font-serif text-xl font-semibold text-foreground mb-4">
          {funnel.label}
        </div>

        <div className="space-y-2.5">
          {funnel.ratios.map((ratio, i) => {
            const widthPct = ratio * 100;
            const isFinal = i === funnel.ratios.length - 1;
            return (
              <div key={stageLabels[i]} className="flex items-center gap-2">
                <div className="w-[100px] text-xs font-medium text-muted-foreground text-right pr-1 shrink-0">
                  {stageLabels[i]}
                </div>
                <div className="relative flex-1 h-7">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${widthPct}%` } : {}}
                    transition={{ duration: 0.55, delay: baseDelay + i * 0.35, ease: "easeOut" }}
                    className={`h-full rounded-md ${
                      isFinal ? "bg-emerald-600/85" : "bg-foreground/80"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
              We analyse your last 5-10 years of UCAS data to find year-on-year patterns for every subject and university. This reveals exactly where offers are being won and lost, and where we can have the greatest impact.
            </p>

            {/* Side-by-side funnels */}
            <div className="mt-8 rounded-md border border-border bg-background/60 p-5 md:p-6 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium mb-5">
                Two subjects · two very different drop-offs
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                {funnels.map((f, i) => (
                  <div key={f.id} className="flex-1 min-w-0 flex">
                    {renderFunnel(f, i)}
                    {i === 0 && (
                      <div className="hidden md:block w-px bg-border ml-8" />
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-muted-foreground text-center">
                <span className="font-semibold text-foreground">Different drop-offs need different fixes — we find yours.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
