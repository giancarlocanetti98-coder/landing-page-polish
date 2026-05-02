import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const StakesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Heat map data: rows = subjects, cols = universities
  // Values: 2 = strong, 1 = average, 0 = underperforming, -1 = no data
  const subjects = ["Medicine", "Law", "Engineering", "Economics", "Natural Sci.", "English", "History"];
  const universities = ["Oxford", "Cambridge", "Imperial", "LSE", "UCL", "Durham", "Warwick", "Bristol"];
  const heatData: number[][] = [
    [2, 1, 2, -1, 1, 2, 1, 2],
    [0, 1, -1, 2, 1, 2, 1, 0],
    [1, 2, 2, -1, 2, 1, 2, 1],
    [1, 0, -1, 0, 1, 1, 2, 1],
    [2, 2, 1, -1, 1, 1, 0, 1],
    [1, 2, -1, -1, 2, 1, 1, 0],
    [2, 1, -1, -1, 1, 2, 1, 1],
  ];

  const cellClass = (v: number) => {
    if (v === 2) return "bg-emerald-600/85 text-white";
    if (v === 1) return "bg-gold/70 text-foreground";
    if (v === 0) return "bg-red-600/80 text-white";
    return "bg-muted/60 text-muted-foreground/50";
  };
  const cellLabel = (v: number) => {
    if (v === 2) return "Strong";
    if (v === 1) return "Avg";
    if (v === 0) return "Under";
    return "—";
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
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                  Offer Performance · Subject × University
                </div>
                <div className="hidden md:flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-600/85" />Strong</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gold/70" />Average</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-600/80" />Under</span>
                </div>
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

                {/* Data rows */}
                {subjects.map((subject, rowIdx) => (
                  <div
                    key={subject}
                    className="grid gap-1 mb-1"
                    style={{ gridTemplateColumns: `110px repeat(${universities.length}, minmax(60px, 1fr))` }}
                  >
                    <div className="text-xs md:text-sm font-medium text-foreground flex items-center pr-2">
                      {subject}
                    </div>
                    {heatData[rowIdx].map((v, colIdx) => (
                      <motion.div
                        key={colIdx}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.35,
                          delay: 0.6 + (rowIdx * universities.length + colIdx) * 0.015,
                        }}
                        title={`${subject} · ${universities[colIdx]}: ${cellLabel(v)}`}
                        className={`aspect-square rounded-sm ${cellClass(v)} flex items-center justify-center text-[9px] md:text-[10px] font-semibold tracking-tight transition-transform hover:scale-110 hover:z-10 cursor-default`}
                      >
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Mobile legend */}
              <div className="flex md:hidden items-center gap-3 text-[10px] text-muted-foreground mt-3">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-600/85" />Strong</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gold/70" />Average</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-600/80" />Under</span>
              </div>

              <div className="mt-3 text-[11px] text-muted-foreground/80 italic">
                Sample visualisation · 5–10 years of UCAS outcome data per cell
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};