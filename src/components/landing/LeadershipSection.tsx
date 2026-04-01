import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Yearly data - inconsistent shows volatile results, consistent shows steady high results
const inconsistentData = [{
  year: '2019',
  value: 85
}, {
  year: '2020',
  value: 35
}, {
  year: '2021',
  value: 55
},
// Lowered to yellow range
{
  year: '2022',
  value: 25
}, {
  year: '2023',
  value: 55
}, {
  year: '2024',
  value: 40
}];
const consistentData = [{
  year: '2019',
  value: 88
}, {
  year: '2020',
  value: 92
}, {
  year: '2021',
  value: 85
}, {
  year: '2022',
  value: 90
}, {
  year: '2023',
  value: 87
}, {
  year: '2024',
  value: 91
}];

// Timing constants for synchronization
const BAR_INTERVAL = 0.6; // seconds between each bar spawn
const TOTAL_BARS = 6;
const INCONSISTENT_DURATION = BAR_INTERVAL * TOTAL_BARS; // Total time for inconsistent bars

const OffersBarChart = ({
  isStable,
  startAnimation,
  animationKey
}: {
  isStable: boolean;
  startAnimation: boolean;
  animationKey: number;
}) => {
  const data = isStable ? consistentData : inconsistentData;
  const maxValue = 100;
  return <div className="w-full max-w-[220px] mx-auto">
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((item, index) => {
        const heightPercent = item.value / maxValue * 100;
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
        return <div key={`${item.year}-${animationKey}`} className="flex flex-col items-center flex-1">
              <div className="relative w-full h-28 flex items-end justify-center">
                <motion.div className="w-full max-w-[28px] rounded-t-sm" initial={{
              height: 0,
              opacity: 0
            }} animate={startAnimation ? {
              height: `${heightPercent}%`,
              opacity: 1
            } : {
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.5,
              delay: startAnimation ? delay : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }} style={{
              backgroundColor: getBarColor(),
              boxShadow: `0 0 12px ${getBarColor()}30`
            }} />
              </div>
            </div>;
      })}
      </div>
    </div>;
};
const CredibilityBar = ({
  isStable,
  startAnimation,
  animationKey
}: {
  isStable: boolean;
  startAnimation: boolean;
  animationKey: number;
}) => {
  const [progress, setProgress] = useState(isStable ? 50 : 100);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Create motion value and update it when progress changes
  const progressValue = useMotionValue(progress);
  useEffect(() => {
    progressValue.set(progress);
  }, [progress, progressValue]);

  // Reset when animationKey changes
  useEffect(() => {
    setProgress(isStable ? 50 : 100);
    setIsFlashing(false);
    setIsGlowing(false);
    setHasStarted(false);
  }, [animationKey, isStable]);

  // Start the credibility animation when bars start animating
  useEffect(() => {
    if (startAnimation && !hasStarted) {
      setHasStarted(true);
    }
  }, [startAnimation, hasStarted]);
  useEffect(() => {
    if (!hasStarted) return;
    if (isStable) {
      // Stable: start at 50%, increase with each of the 6 bar spawns
      const STABLE_STEPS = 6;
      const increasePerBar = 50 / STABLE_STEPS;
      let currentStep = 0;

      // Delay to match when consistent bars start (after inconsistent bars finish)
      const initialDelay = setTimeout(() => {
        // First increment happens immediately with first bar
        currentStep++;
        setProgress(50 + currentStep * increasePerBar);
        const interval = setInterval(() => {
          currentStep++;
          if (currentStep >= STABLE_STEPS) {
            setProgress(100);
            setIsGlowing(true);
            clearInterval(interval);
          } else {
            setProgress(50 + currentStep * increasePerBar);
          }
        }, BAR_INTERVAL * 1000);
        return () => clearInterval(interval);
      }, (INCONSISTENT_DURATION + 0.5) * 1000);
      return () => clearTimeout(initialDelay);
    } else {
      // Unstable: decrease exactly when each bar spawns (starting from bar 2)
      const UNSTABLE_STEPS = 5;
      const decreasePerBar = 100 / UNSTABLE_STEPS;
      let currentStep = 0;

      // First bar spawns immediately at 100%, decrease starts exactly with bar 2
      const initialDelay = setTimeout(() => {
        // First decrement happens immediately with bar 2
        currentStep++;
        setProgress(100 - currentStep * decreasePerBar);
        const interval = setInterval(() => {
          currentStep++;
          if (currentStep >= UNSTABLE_STEPS) {
            setProgress(0);
            setIsFlashing(true);
            clearInterval(interval);
          } else {
            setProgress(100 - currentStep * decreasePerBar);
          }
        }, BAR_INTERVAL * 1000);
        return () => clearInterval(interval);
      }, BAR_INTERVAL * 1000);
      return () => clearTimeout(initialDelay);
    }
  }, [isStable, hasStarted]);
  const progressSpring = useSpring(progressValue, {
    stiffness: 80,
    damping: 20
  });
  const width = useTransform(progressSpring, v => `${v}%`);

  // Color transitions from green to yellow to red as it decreases
  const barColor = isStable ? "hsl(142, 50%, 45%)" // Green for stable
  : progress > 60 ? "hsl(142, 50%, 45%)" : progress > 30 ? "hsl(45, 70%, 55%)" : "hsl(0, 60%, 55%)";
  return <div className="w-full max-w-[200px] mx-auto mt-4">
      <p className="text-xs text-muted-foreground mb-2 text-center font-medium tracking-wide uppercase">
        Leadership Credibility
      </p>
      <motion.div className="relative h-3 bg-muted/30 rounded-full overflow-hidden border border-border/50" animate={isFlashing ? {
      opacity: [1, 0.3, 1],
      borderColor: ["hsl(0, 60%, 55%)", "hsl(0, 80%, 40%)", "hsl(0, 60%, 55%)"]
    } : {}} transition={isFlashing ? {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    } : {}}>
        <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{
        width,
        backgroundColor: barColor,
        opacity: 1
      }} />
        
        {/* Shimmer overlay for completed stable bar */}
        {isGlowing && <motion.div className="absolute inset-0 rounded-full overflow-hidden" style={{
        width
      }}>
            <motion.div className="absolute inset-y-0 w-[50%]" style={{
          background: "linear-gradient(90deg, transparent 0%, hsla(142, 70%, 75%, 0.15) 45%, hsla(0, 0%, 100%, 0.25) 50%, hsla(142, 70%, 75%, 0.15) 55%, transparent 100%)"
        }} animate={{
          x: ["-100%", "300%"]
        }} transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1
        }} />
          </motion.div>}
      </motion.div>
    </div>;
};
export const LeadershipSection = () => {
  const chartRef = useRef(null);
  const chartInView = useInView(chartRef, {
    margin: "-50px"
  }); // Removed once: true
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  // Track animation state with reset capability
  const [animationKey, setAnimationKey] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const outOfViewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAnimatedOnce = useRef(false);
  useEffect(() => {
    if (chartInView) {
      // Clear any pending reset timer
      if (outOfViewTimerRef.current) {
        clearTimeout(outOfViewTimerRef.current);
        outOfViewTimerRef.current = null;
      }

      // Start animation if not already running
      if (!shouldAnimate || !hasAnimatedOnce.current) {
        setShouldAnimate(true);
        hasAnimatedOnce.current = true;
      }
    } else if (hasAnimatedOnce.current) {
      // Element left view - start 2 second timer
      outOfViewTimerRef.current = setTimeout(() => {
        // Reset animation state
        setShouldAnimate(false);
        setAnimationKey(prev => prev + 1);
        hasAnimatedOnce.current = false;
      }, 2000);
    }
    return () => {
      if (outOfViewTimerRef.current) {
        clearTimeout(outOfViewTimerRef.current);
      }
    };
  }, [chartInView]);
  return <section ref={ref} className="bg-background py-[50px]">
      <div className="container px-6">
        {/* Centered text content */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7
      }} className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8 leading-tight">
            School Leadership is Judged on{" "}
            <span className="text-gold">Top-University Offers</span>
          </h2>

          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>Every year, your university results are on display.</p>
            <p>To governors. To other schools. To the public.</p>
            <p className="text-foreground font-medium">These results shape your institution's reputation.</p>
            <p>There is no league table for having the brightest students.</p>
            <p>Or for the best teaching.</p>
            <p>Or even for how many students reach interview.</p>
            <p>You do exceptional work.</p>
            <p className="text-foreground font-medium">
              But unless it converts into offers, it goes unrecognised.
            </p>
            <p className="text-gold font-semibold text-xl">Only your university outcomes are published.</p>
          </div>
        </motion.div>

        {/* Visual comparison - now below text */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7,
        delay: 0.2
      }} className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border max-w-2xl mx-auto">
          {/* Confidence meters with credibility bars */}
          <div className="grid grid-cols-2 gap-8">
            {/* Unstable chart + decreasing credibility */}
            <div ref={chartRef} className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4 font-medium">Inconsistent Oxbridge Offers</p>
              <OffersBarChart isStable={false} startAnimation={shouldAnimate} animationKey={animationKey} />
              <CredibilityBar isStable={false} startAnimation={shouldAnimate} animationKey={animationKey} />
            </div>
            
            {/* Stable chart + full credibility */}
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4 font-medium">Consistent Oxbridge Offers</p>
              <OffersBarChart isStable={true} startAnimation={shouldAnimate} animationKey={animationKey} />
              <CredibilityBar isStable={true} startAnimation={shouldAnimate} animationKey={animationKey} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};