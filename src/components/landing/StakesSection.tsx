import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const StakesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ---- Heat map data: subject × university × stage ----
  type Perf = "strong" | "avg" | "under" | "none";
  type Stage = "application" | "interview" | "offer";

  const universities = ["Oxford", "Cambridge", "Imperial", "LSE", "UCL", "Durham", "Warwick"];

  const subjectGroups: { name: string; subjects: string[] }[] = [
    { name: "STEM", subjects: ["Medicine", "Biosciences", "Engineering", "Maths & CS"] },
    { name: "Humanities", subjects: ["Law", "Economics", "English", "History"] },
  ];

  // For each subject row: 7 cells, each with {application, interview, offer}.
  // Designed so the funnel story is legible:
  //  - Medicine · Cambridge: strong app + interview, UNDER at offer (interview-to-offer bottleneck)
  //  - Law · Oxford: UNDER at app (few interviews), strong interview + offer (those who get through convert)
  type Cell = Record<Stage, Perf>;
  const heatData: Record<string, Cell[]> = {
    // ---- STEM ----
    Medicine: [
      // Oxford
      { application: "strong", interview: "avg", offer: "under" },
      // Cambridge — bottleneck story
      { application: "strong", interview: "strong", offer: "under" },
      // Imperial
      { application: "strong", interview: "strong", offer: "avg" },
      // LSE
      { application: "none", interview: "none", offer: "none" },
      // UCL
      { application: "avg", interview: "avg", offer: "under" },
      // Durham
      { application: "strong", interview: "avg", offer: "avg" },
      // Warwick
      { application: "avg", interview: "strong", offer: "avg" },
    ],
    Biosciences: [
      { application: "avg", interview: "avg", offer: "strong" },
      { application: "strong", interview: "avg", offer: "avg" },
      { application: "strong", interview: "strong", offer: "strong" },
      { application: "none", interview: "none", offer: "none" },
      { application: "strong", interview: "avg", offer: "strong" },
      { application: "avg", interview: "strong", offer: "strong" },
      { application: "strong", interview: "strong", offer: "avg" },
    ],
    Engineering: [
      { application: "avg", interview: "strong", offer: "strong" },
      { application: "strong", interview: "avg", offer: "avg" },
      { application: "strong", interview: "strong", offer: "strong" },
      { application: "none", interview: "none", offer: "none" },
      { application: "avg", interview: "avg", offer: "avg" },
      { application: "strong", interview: "avg", offer: "strong" },
      { application: "strong", interview: "strong", offer: "avg" },
    ],
    "Maths & CS": [
      { application: "avg", interview: "under", offer: "avg" },
      { application: "strong", interview: "avg", offer: "under" },
      { application: "strong", interview: "strong", offer: "avg" },
      { application: "avg", interview: "avg", offer: "strong" },
      { application: "strong", interview: "avg", offer: "avg" },
      { application: "avg", interview: "avg", offer: "avg" },
      { application: "strong", interview: "strong", offer: "strong" },
    ],
    // ---- Humanities ----
    Law: [
      // Oxford — application bottleneck story
      { application: "under", interview: "strong", offer: "strong" },
      { application: "under", interview: "strong", offer: "strong" },
      { application: "none", interview: "none", offer: "none" },
      { application: "strong", interview: "strong", offer: "avg" },
      { application: "avg", interview: "strong", offer: "strong" },
      { application: "avg", interview: "avg", offer: "strong" },
      { application: "strong", interview: "avg", offer: "strong" },
    ],
    Economics: [
      { application: "avg", interview: "avg", offer: "under" },
      { application: "strong", interview: "avg", offer: "avg" },
      { application: "none", interview: "none", offer: "none" },
      { application: "under", interview: "avg", offer: "avg" },
      { application: "avg", interview: "strong", offer: "avg" },
      { application: "strong", interview: "avg", offer: "strong" },
      { application: "strong", interview: "strong", offer: "strong" },
    ],
    English: [
      { application: "strong", interview: "avg", offer: "avg" },
      { application: "strong", interview: "strong", offer: "strong" },
      { application: "none", interview: "none", offer: "none" },
      { application: "none", interview: "none", offer: "none" },
      { application: "strong", interview: "avg", offer: "strong" },
      { application: "avg", interview: "strong", offer: "avg" },
      { application: "avg", interview: "avg", offer: "avg" },
    ],
    History: [
      { application: "strong", interview: "strong", offer: "avg" },
      { application: "avg", interview: "strong", offer: "strong" },
      { application: "none", interview: "none", offer: "none" },
      { application: "none", interview: "none", offer: "none" },
      { application: "strong", interview: "avg", offer: "avg" },
      { application: "strong", interview: "strong", offer: "strong" },
      { application: "avg", interview: "avg", offer: "strong" },
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
  const stages: { id: Stage; label: string; caption: string }[] = [
    { id: "application", label: "Application", caption: "Where students are getting their applications through." },
    { id: "interview", label: "Interview", caption: "Where students are converting to interviews." },
    { id: "offer", label: "Offer", caption: "Where interviews are converting to offers." },
  ];

  const [activeStage, setActiveStage] = useState<Stage>("application");
  const [userInteracted, setUserInteracted] = useState(false);

  // Auto-cycle once when in view: application → interview → offer, then settle.
  useEffect(() => {
    if (!isInView || userInteracted) return;
    const order: Stage[] = ["application", "interview", "offer"];
    let i = 0;
    const tick = () => {
      i += 1;
      if (i >= order.length) return; // settle on "offer"
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

  const activeCaption = stages.find((s) => s.id === activeStage)!.caption;

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
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                  Performance · Subject × University
                </div>
                <div className="hidden md:flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-600/85" />Strong</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gold/70" />Average</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-600/80" />Under</span>
                </div>
              </div>

              {/* Stage selector */}
              <div
                className="flex flex-wrap items-center gap-2 mb-4"
                onMouseEnter={() => setUserInteracted(true)}
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium mr-1">
                  Stage
                </span>
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

              <div className="inline-block min-w-full">
                {/* Header row */}
                <div
                  className="grid gap-1 mb-1"
                  style={{ gridTemplateColumns: `110px repeat(${universities.length}, minmax(60px, 1fr))` }}
                >
                  <div />
                  {universities.map((u) => (
                    <div
                      key={u}
                      className="text-[10px] md:text-[11px] font-medium text-muted-foreground text-center pb-1 border-b border-border/60"
                    >
                      {u}
                    </div>
                  ))}
                </div>

                {/* Grouped data rows */}
                {subjectGroups.map((group, gIdx) => {
                  // global row offset for stagger across the whole table
                  const previousRows = subjectGroups
                    .slice(0, gIdx)
                    .reduce((acc, g) => acc + g.subjects.length, 0);
                  return (
                    <div key={group.name} className={gIdx > 0 ? "mt-3 pt-3 border-t border-border/60" : ""}>
                      <div
                        className="grid gap-1 mb-1"
                        style={{ gridTemplateColumns: `110px repeat(${universities.length}, minmax(60px, 1fr))` }}
                      >
                        <div className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold flex items-center">
                          {group.name}
                        </div>
                      </div>
                      {group.subjects.map((subject, rowIdx) => {
                        const cells = heatData[subject];
                        const globalRow = previousRows + rowIdx;
                        return (
                          <div
                            key={subject}
                            className="grid gap-1 mb-1"
                            style={{ gridTemplateColumns: `110px repeat(${universities.length}, minmax(60px, 1fr))` }}
                          >
                            <div className="text-xs md:text-sm font-medium text-foreground flex items-center pr-2">
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
                                    duration: 0.35,
                                    delay: 0.6 + (globalRow * universities.length + colIdx) * 0.015,
                                  }}
                                  title={`${subject} · ${universities[colIdx]} · ${
                                    stages.find((s) => s.id === activeStage)!.label
                                  }: ${cellLabel(perf)}`}
                                  className="aspect-square rounded-sm overflow-hidden hover:scale-110 hover:z-10 transition-transform cursor-default"
                                >
                                  <motion.div
                                    key={`${activeStage}-${perf}`}
                                    initial={{ opacity: 0.4 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                      duration: 0.25,
                                      delay: (globalRow * universities.length + colIdx) * 0.01,
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
                  );
                })}
              </div>

              {/* Mobile legend */}
              <div className="flex md:hidden items-center gap-3 text-[10px] text-muted-foreground mt-3">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-600/85" />Strong</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gold/70" />Average</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-600/80" />Under</span>
              </div>

              <div className="mt-4 space-y-1">
                <motion.p
                  key={activeStage}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-foreground"
                >
                  {activeCaption}
                </motion.p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Different drop-off points need different fixes.</span>
                </p>
                <p className="text-[11px] text-muted-foreground/70 italic mt-2">
                  Sample visualisation · 5–10 years of UCAS outcome data per cell
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};