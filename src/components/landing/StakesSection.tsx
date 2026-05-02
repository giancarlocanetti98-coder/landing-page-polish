import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const StakesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ---- Funnel data ----
  type SubjectId = "medicine" | "law";
  type Subject = {
    id: SubjectId;
    label: string;
    stages: { label: string; count: number }[]; // Applied → Interview → Offer → Place secured
    bottleneckIndex: number; // index of the stage BEFORE the biggest drop (gap is between i and i+1)
    fix: { label: string; recovered: number };
  };

  const subjectsData: Subject[] = [
    {
      id: "medicine",
      label: "Medicine",
      stages: [
        { label: "Applied", count: 100 },
        { label: "Interview", count: 82 },
        { label: "Offer", count: 41 },
        { label: "Place secured", count: 38 },
      ],
      bottleneckIndex: 1, // Interview → Offer is the biggest drop
      fix: { label: "Interview-to-offer coaching", recovered: 14 },
    },
    {
      id: "law",
      label: "Law",
      stages: [
        { label: "Applied", count: 100 },
        { label: "Interview", count: 38 },
        { label: "Offer", count: 31 },
        { label: "Place secured", count: 29 },
      ],
      bottleneckIndex: 0, // Applied → Interview is the biggest drop
      fix: { label: "Application & personal-statement strategy", recovered: 18 },
    },
  ];

  const [activeSubject, setActiveSubject] = useState<SubjectId>("medicine");
  const subject = subjectsData.find((s) => s.id === activeSubject)!;
  const maxCount = subject.stages[0].count;
  const bottleneck = subject.bottleneckIndex;
  const recoveredCount = subject.stages[bottleneck + 1].count + subject.fix.recovered;

  // Animated count-up for "+N recovered"
  const recoveredMV = useMotionValue(0);
  const recoveredDisplay = useTransform(recoveredMV, (v) => Math.round(v).toString());
  useEffect(() => {
    if (!isInView) return;
    recoveredMV.set(0);
    const controls = animate(recoveredMV, subject.fix.recovered, {
      duration: 1.2,
      delay: 3.2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, activeSubject, subject.fix.recovered, recoveredMV]);

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

            {/* Funnel diagram */}
            <div className="mt-8 rounded-md border border-border bg-background/60 p-5 md:p-6 shadow-sm">
              {/* Subject toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                  Example · {subject.label} · top universities
                </div>
                <div className="flex items-center gap-2">
                  {subjectsData.map((s) => {
                    const active = s.id === activeSubject;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSubject(s.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          active
                            ? "bg-gold text-foreground border-gold shadow-sm"
                            : "bg-background/60 text-muted-foreground border-border hover:border-gold/60 hover:text-foreground"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Funnel — re-keyed on subject change so animations replay */}
              <div key={activeSubject} className="space-y-3">
                {subject.stages.map((stage, i) => {
                  const widthPct = (stage.count / maxCount) * 100;
                  const prev = i > 0 ? subject.stages[i - 1].count : null;
                  const lost = prev !== null ? prev - stage.count : 0;
                  const isBottleneckGap = i === bottleneck + 1;
                  const isFinal = i === subject.stages.length - 1;
                  return (
                    <div key={stage.label}>
                      {/* Loss marker between bars */}
                      {prev !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.5 }}
                          className={`flex items-center gap-2 pl-[140px] -mt-1 mb-1 text-xs ${
                            isBottleneckGap ? "text-red-500 font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          <span className={`inline-block ${isBottleneckGap ? "text-base" : ""}`}>↓</span>
                          <span>
                            −{lost} lost
                            {isBottleneckGap && (
                              <span className="ml-2 uppercase tracking-wider text-[10px] bg-red-500/15 text-red-500 px-1.5 py-0.5 rounded">
                                Biggest drop
                              </span>
                            )}
                          </span>
                        </motion.div>
                      )}

                      {/* Stage row */}
                      <div className="flex items-center gap-3">
                        <div className="w-[128px] text-sm font-medium text-foreground text-right pr-1 shrink-0">
                          {stage.label}
                        </div>
                        <div className="relative flex-1 h-9">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${widthPct}%` } : {}}
                            transition={{ duration: 0.55, delay: 0.2 + i * 0.5, ease: "easeOut" }}
                            className={`h-full rounded-md flex items-center justify-end pr-3 text-sm font-semibold ${
                              isFinal
                                ? "bg-emerald-600/85 text-white"
                                : "bg-foreground/80 text-background"
                            }`}
                          >
                            {stage.count}
                          </motion.div>
                        </div>
                      </div>

                      {/* "After fix" recovered bar appears after the bottleneck stage */}
                      {i === bottleneck + 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.4, delay: 3.0 }}
                          className="mt-2 flex items-center gap-3"
                        >
                          <div className="w-[128px] text-xs font-medium text-gold text-right pr-1 shrink-0">
                            With our fix
                          </div>
                          <div className="relative flex-1 h-9">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${(recoveredCount / maxCount) * 100}%` } : {}}
                              transition={{ duration: 1.2, delay: 3.2, ease: "easeOut" }}
                              className="h-full rounded-md bg-gold flex items-center justify-end pr-3 text-sm font-semibold text-foreground"
                            >
                              {recoveredCount}{" "}
                              <span className="ml-1 text-xs font-bold">
                                (+<motion.span>{recoveredDisplay}</motion.span>)
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Fix callout */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 2.7 }}
                className="mt-5 ml-[140px] inline-flex items-start gap-3 rounded-md border-l-2 border-gold bg-gold/10 px-4 py-3"
              >
                <div className="text-gold font-semibold text-xs uppercase tracking-wider mt-0.5">
                  Targeted fix
                </div>
                <div className="text-sm text-foreground">
                  {subject.fix.label}
                  <span className="text-muted-foreground"> — recovers ~{subject.fix.recovered} offers per cohort.</span>
                </div>
              </motion.div>

              <p className="mt-5 text-sm text-muted-foreground text-center">
                <span className="font-semibold text-foreground">We find your school's biggest drop-off, and fix exactly that.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};