import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const StakesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ---- Two contrasting funnels ----
  type Funnel = {
    id: string;
    label: string;
    sublabel: string;
    stages: { label: string; count: number }[]; // Applied → Interview → Offer → Place
    bottleneckIndex: number; // gap AFTER this index is the biggest drop
    insight: string;
  };

  const maxCount = 12; // shared scale so the two funnels are visually comparable

  const funnels: Funnel[] = [
    {
      id: "medicine",
      label: "Medicine",
      sublabel: "lots of interviews, few convert to offers",
      stages: [
        { label: "Applied", count: 8 },
        { label: "Interview", count: 6 },
        { label: "Offer", count: 1 },
        { label: "Place secured", count: 1 },
      ],
      bottleneckIndex: 1, // Interview → Offer
      insight: "Fix: interview-to-offer coaching.",
    },
    {
      id: "law",
      label: "Law",
      sublabel: "few interviews, but every one converts",
      stages: [
        { label: "Applied", count: 12 },
        { label: "Interview", count: 4 },
        { label: "Offer", count: 4 },
        { label: "Place secured", count: 4 },
      ],
      bottleneckIndex: 0, // Applied → Interview
      insight: "Fix: stronger applications & personal statements.",
    },
  ];

  const renderFunnel = (funnel: Funnel, funnelIdx: number) => {
    const baseDelay = 0.4 + funnelIdx * 0.15;
    return (
      <div className="flex-1 min-w-0">
        {/* Funnel header */}
        <div className="mb-4">
          <div className="font-serif text-xl font-semibold text-foreground">
            {funnel.label}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {funnel.sublabel}
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-2.5">
          {funnel.stages.map((stage, i) => {
            const widthPct = (stage.count / maxCount) * 100;
            const prev = i > 0 ? funnel.stages[i - 1].count : null;
            const lost = prev !== null ? prev - stage.count : 0;
            const isBottleneckGap = i === funnel.bottleneckIndex + 1;
            const isFinal = i === funnel.stages.length - 1;
            return (
              <div key={stage.label}>
                {prev !== null && lost > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: baseDelay + i * 0.35 }}
                    className={`flex items-center gap-1.5 pl-[88px] -mt-0.5 mb-0.5 text-[11px] ${
                      isBottleneckGap ? "text-red-500 font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    <span>↓</span>
                    <span>−{lost}</span>
                    {isBottleneckGap && (
                      <span className="uppercase tracking-wider text-[9px] bg-red-500/15 text-red-500 px-1.5 py-0.5 rounded">
                        Biggest drop
                      </span>
                    )}
                  </motion.div>
                )}

                <div className="flex items-center gap-2">
                  <div className="w-[80px] text-xs font-medium text-foreground text-right pr-1 shrink-0">
                    {stage.label}
                  </div>
                  <div className="relative flex-1 h-7">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${widthPct}%` } : {}}
                      transition={{ duration: 0.5, delay: baseDelay + i * 0.35, ease: "easeOut" }}
                      className={`h-full rounded-md flex items-center justify-end pr-2.5 text-xs font-semibold ${
                        isFinal
                          ? "bg-emerald-600/85 text-white"
                          : "bg-foreground/80 text-background"
                      }`}
                    >
                      {stage.count}
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: baseDelay + 1.8 }}
          className="mt-4 text-xs text-foreground/80 italic"
        >
          {funnel.insight}
        </motion.p>
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
