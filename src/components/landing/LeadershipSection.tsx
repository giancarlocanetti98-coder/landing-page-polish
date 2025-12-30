import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Yearly data - inconsistent shows volatile results, consistent shows steady high results
const inconsistentData = [
  { year: '2019', value: 85 },
  { year: '2020', value: 35 },
  { year: '2021', value: 55 },  // Lowered to yellow range
  { year: '2022', value: 25 },
  { year: '2023', value: 55 },
  { year: '2024', value: 40 },
];

const consistentData = [
  { year: '2019', value: 88 },
  { year: '2020', value: 92 },
  { year: '2021', value: 85 },
  { year: '2022', value: 90 },
  { year: '2023', value: 87 },
  { year: '2024', value: 91 },
];

// Timing constants for synchronization
const BAR_INTERVAL = 0.6; // seconds between each bar spawn
const TOTAL_BARS = 6;
const INCONSISTENT_DURATION = BAR_INTERVAL * TOTAL_BARS; // Total time for inconsistent bars

const OffersBarChart = ({ isStable, startAnimation }: { isStable: boolean; startAnimation: boolean }) => {
  const data = isStable ? consistentData : inconsistentData;
  const maxValue = 100;
  
  return (
    <div className="w-full max-w-[220px] mx-auto">
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          // Slower rate, consistent starts after all inconsistent bars are done
          const delayBase = isStable ? INCONSISTENT_DURATION + 0.5 : 0;
          const delay = delayBase + index * BAR_INTERVAL;
          
          // Green for consistent, color-coded for inconsistent
          const getBarColor = () => {
            if (isStable) return "hsl(142, 50%, 45%)";
            if (item.value >= 70) return "hsl(142, 50%, 45%)";
            if (item.value >= 50) return "hsl(45, 70%, 55%)";
            return "hsl(0, 60%, 55%)";
          };
          
          return (
            <div key={item.year} className="flex flex-col items-center flex-1">
              <div className="relative w-full h-28 flex items-end justify-center">
                <motion.div
                  className="w-full max-w-[28px] rounded-t-sm"
                  initial={{ height: 0, opacity: 0 }}
                  animate={startAnimation ? { 
                    height: `${heightPercent}%`, 
                    opacity: 1 
                  } : {}}
                  transition={{
                    duration: 0.5,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  style={{ 
                    backgroundColor: getBarColor(),
                    boxShadow: `0 0 12px ${getBarColor()}30`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CredibilityBar = ({ isStable, startAnimation }: { isStable: boolean; startAnimation: boolean }) => {
  const [progress, setProgress] = useState(isStable ? 100 : 100);
  const [isFlashing, setIsFlashing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Create motion value and update it when progress changes
  const progressValue = useMotionValue(progress);
  
  useEffect(() => {
    progressValue.set(progress);
  }, [progress, progressValue]);

  // Start the credibility decrease when animation starts (for inconsistent)
  useEffect(() => {
    if (startAnimation && !isStable && !hasStarted) {
      setHasStarted(true);
    }
  }, [startAnimation, isStable, hasStarted]);

  useEffect(() => {
    if (isStable) {
      // Stable: always full with tiny fluctuations
      const interval = setInterval(() => {
        setProgress(97 + Math.random() * 3);
      }, 2000);
      return () => clearInterval(interval);
    } else if (hasStarted) {
      // Unstable: decrease in sync with bars spawning
      // First bar spawns at 100%, then 5 decrements for remaining 5 bars
      const CREDIBILITY_STEPS = 5;
      const decreasePerBar = 100 / CREDIBILITY_STEPS;
      let currentStep = 0;
      
      // Start decreasing after first bar (delay matches second bar spawn)
      const initialDelay = setTimeout(() => {
        const interval = setInterval(() => {
          currentStep++;
          if (currentStep >= CREDIBILITY_STEPS) {
            setProgress(0);
            setIsFlashing(true);
            clearInterval(interval);
          } else {
            setProgress(100 - (currentStep * decreasePerBar));
          }
        }, BAR_INTERVAL * 1000);
        
        return () => clearInterval(interval);
      }, BAR_INTERVAL * 1000);
      
      return () => clearTimeout(initialDelay);
    }
  }, [isStable, hasStarted]);

  // Keep flashing indefinitely when empty (no reset)
  // No reset effect needed - just keep flashing

  const progressSpring = useSpring(progressValue, {
    stiffness: 80,
    damping: 20,
  });

  const width = useTransform(progressSpring, (v) => `${v}%`);
  
  // Color transitions from green to yellow to red as it decreases
  const barColor = isStable 
    ? "hsl(142, 50%, 45%)" // Green for stable
    : progress > 60 
      ? "hsl(142, 50%, 45%)" 
      : progress > 30 
        ? "hsl(45, 70%, 55%)" 
        : "hsl(0, 60%, 55%)";

  // Glow effect for stable bar
  const stableGlow = isStable ? "0 0 12px hsl(142, 50%, 45%, 0.5), 0 0 20px hsl(142, 50%, 45%, 0.3)" : "";

  return (
    <div className="w-full max-w-[200px] mx-auto mt-4">
      <p className="text-xs text-muted-foreground mb-2 text-center font-medium tracking-wide uppercase">
        Leadership Credibility
      </p>
      <motion.div 
        className="relative h-3 bg-muted/30 rounded-full overflow-hidden border border-border/50"
        animate={isFlashing ? { 
          opacity: [1, 0.3, 1],
          borderColor: ["hsl(0, 60%, 55%)", "hsl(0, 80%, 40%)", "hsl(0, 60%, 55%)"]
        } : {}}
        transition={isFlashing ? { 
          duration: 0.5, 
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        style={isStable ? { boxShadow: stableGlow } : {}}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full transition-colors duration-300"
          style={{ 
            width,
            backgroundColor: barColor,
            boxShadow: isStable ? stableGlow : `0 0 8px ${barColor}40`
          }}
        />
      </motion.div>
    </div>
  );
};
export const LeadershipSection = () => {
  const chartRef = useRef(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-50px" });
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section ref={ref} className="py-24 bg-background">
      <div className="container px-6">
        {/* Centered text content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8 leading-tight">
            School Leadership is Judged on{" "}
            <span className="text-gold">Oxbridge Offers</span>
          </h2>

          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
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

        {/* Visual comparison - now below text */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border max-w-2xl mx-auto"
        >
          {/* Confidence meters with credibility bars */}
          <div className="grid grid-cols-2 gap-8">
            {/* Unstable chart + decreasing credibility */}
            <div ref={chartRef} className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4 font-medium">Inconsistent Oxbridge Offers</p>
              <OffersBarChart isStable={false} startAnimation={chartInView} />
              <CredibilityBar isStable={false} startAnimation={chartInView} />
            </div>
            
            {/* Stable chart + full credibility */}
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4 font-medium">Consistent Oxbridge Offers</p>
              <OffersBarChart isStable={true} startAnimation={chartInView} />
              <CredibilityBar isStable={true} startAnimation={chartInView} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};