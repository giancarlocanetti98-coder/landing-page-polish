import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const StakesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ---- Heat map data: subject × university × stage ----
  type Perf = "strong" | "avg" | "under" | "none";
  type Stage = "interview" | "offer" | "grades";

  // ---- Curated 4×4 grid ----
  const universities = ["Oxford", "Cambridge", "Imperial", "LSE"];
  const subjects = ["Medicine", "Engineering", "Law", "Economics"];

  // Each row: 4 cells with {interview, offer, grades}.
  // Stories baked in:
  //  - Medicine · Cambridge: strong interviews → UNDER offers (interview-to-offer bottleneck)
  //  - Law · Oxford: strong offers → UNDER grades (offer-to-grades bottleneck)
  type Cell = Record<Stage, Perf>;
  const heatData: Record<string, Cell[]> = {
    Medicine: [
      { interview: "avg", offer: "avg", grades: "strong" },          // Oxford
      { interview: "strong", offer: "under", grades: "avg" },        // Cambridge — bottleneck
      { interview: "strong", offer: "avg", grades: "strong" },       // Imperial
      { interview: "avg", offer: "avg", grades: "avg" },             // LSE
    ],
    Engineering: [
      { interview: "strong", offer: "strong", grades: "avg" },
      { interview: "avg", offer: "avg", grades: "strong" },
      { interview: "strong", offer: "strong", grades: "strong" },
      { interview: "avg", offer: "avg", grades: "avg" },
    ],
    Law: [
      { interview: "strong", offer: "strong", grades: "under" },     // Oxford — grades bottleneck
      { interview: "strong", offer: "strong", grades: "avg" },
      { interview: "avg", offer: "avg", grades: "avg" },
      { interview: "strong", offer: "avg", grades: "strong" },
    ],
    Economics: [
      { interview: "avg", offer: "avg", grades: "strong" },
      { interview: "avg", offer: "avg", grades: "avg" },
      { interview: "strong", offer: "avg", grades: "avg" },
      { interview: "strong", offer: "strong", grades: "strong" },
    ],
  };

  const cellClass = (p: Perf) => {
    if (p === "strong") return "bg-emerald-600/85";
    if (p === "avg") return "bg-gold/70";
    if (p === "under") return "bg-red-600/80";
    return "bg-muted/60";
  };
  const cellLabel = (p: Perf) => {
    if (p === "strong") return "Strong";
    if (p === "avg") return "Average";
    if (p === "under") return "Under";
    return "No data";
  };

  // ---- Stage selector ----
  const stages: { id: Stage; label: string }[] = [
    { id: "interview", label: "Interview" },
    { id: "offer", label: "Offer" },
    { id: "grades", label: "Grades Attained" },
  ];

  const [activeStage, setActiveStage] = useState<Stage>("interview");
  const [userInteracted, setUserInteracted] = useState(false);

  // Auto-cycle once when in view: interview → offer → grades, then settle.
  useEffect(() => {
    if (!isInView || userInteracted) return;
    const order: Stage[] = ["interview", "offer", "grades"];
    let i = 0;
    const tick = () => {
      i += 1;
      if (i >= order.length) return; // settle on "grades"
      setActiveStage(order[i]);
      timer = window.setTimeout(tick, 2500);
    };
    let timer = window.setTimeout(tick, 2500);
    return () => window.clearTimeout(timer);
  }, [isInView, userInteracted]);

  const handleStageSelect = (s: Stage) => {
    setUserInteracted(true);
    setActiveStage(s);
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

            {/* Heat map */}
            <div className="mt-8 rounded-md border border-border bg-background/60 p-4 md:p-5 shadow-sm overflow-x-auto">
              {/* Header: stage pills + legend on one tidy line */}
              <div
                className="flex flex-wrap items-center justify-between gap-3 mb-4"
                onMouseEnter={() => setUserInteracted(true)}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {stages.map((s) => {
                    const active = s.id === activeStage;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleStageSelect(s.id)}
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
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-600/85" />Strong</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gold/70" />Average</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-600/80" />Under</span>
                </div>
              </div>

              <div className="inline-block min-w-full">
                {/* Header row */}
                <div
                  className="grid gap-2 mb-2"
                  style={{ gridTemplateColumns: `120px repeat(${universities.length}, minmax(56px, 1fr))` }}
                >
                  <div />
                  {universities.map((u) => (
                    <div
                      key={u}
                      className="text-[11px] md:text-xs font-medium text-muted-foreground text-center pb-2 border-b border-border/60"
                    >
                      {u}
                    </div>
                  ))}
                </div>

                {/* Data rows */}
                {subjects.map((subject, rowIdx) => {
                  const cells = heatData[subject];
                  return (
                    <div
                      key={subject}
                      className="grid gap-1.5 mb-1.5"
                      style={{ gridTemplateColumns: `120px repeat(${universities.length}, minmax(48px, 1fr))` }}
                    >
                      <div className="text-sm md:text-base font-medium text-foreground flex items-center pr-2">
                        {subject}
                      </div>
                      {cells.map((cell, colIdx) => {
                        const perf = cell[activeStage];
                        return (
                          <motion.div
                            key={colIdx}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: 0.5 + (rowIdx * universities.length + colIdx) * 0.04,
                            }}
                            title={`${subject} · ${universities[colIdx]} · ${
                              stages.find((s) => s.id === activeStage)!.label
                            }: ${cellLabel(perf)}`}
                            className="h-8 md:h-9 rounded-md overflow-hidden cursor-default"
                          >
                            <motion.div
                              key={`${activeStage}-${perf}`}
                              initial={{ opacity: 0.4 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: (rowIdx * universities.length + colIdx) * 0.02,
                              }}
                              className={`w-full h-full ${cellClass(perf)}`}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <p className="mt-5 text-sm text-muted-foreground text-center">
                <span className="font-semibold text-foreground">Different stages, different fixes.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};