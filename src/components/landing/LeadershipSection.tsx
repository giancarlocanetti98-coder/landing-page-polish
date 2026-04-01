import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Line graph data - stagnating vs upward trajectory
const stagnatingData = [
  { year: '2019', value: 35 },
  { year: '2020', value: 30 },
  { year: '2021', value: 40 },
  { year: '2022', value: 28 },
  { year: '2023', value: 38 },
  { year: '2024', value: 32 },
];

const upwardData = [
  { year: '2019', value: 30 },
  { year: '2020', value: 40 },
  { year: '2021', value: 48 },
  { year: '2022', value: 58 },
  { year: '2023', value: 70 },
  { year: '2024', value: 85 },
];

const ANIMATION_DURATION = 3; // seconds for full line draw

const LineGraph = ({
  data,
  isUpward,
  startAnimation,
  animationKey,
}: {
  data: typeof stagnatingData;
  isUpward: boolean;
  startAnimation: boolean;
  animationKey: number;
}) => {
  const maxValue = 100;
  const width = 220;
  const height = 128;
  const padding = { top: 8, right: 8, bottom: 4, left: 8 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * plotWidth,
    y: padding.top + plotHeight - (d.value / maxValue) * plotHeight,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const lineColor = isUpward ? "hsl(142, 50%, 45%)" : "hsl(30, 80%, 55%)";

  return (
    <div className="w-full max-w-[220px] mx-auto">
      <svg
        key={animationKey}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = padding.top + plotHeight - (v / maxValue) * plotHeight;
          return (
            <line
              key={v}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="hsl(var(--border))"
              strokeOpacity={0.3}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Animated line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            startAnimation
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: ANIMATION_DURATION, ease: "easeInOut", delay: isUpward ? ANIMATION_DURATION + 0.3 : 0 },
            opacity: { duration: 0.3, delay: isUpward ? ANIMATION_DURATION + 0.3 : 0 },
          }}
        />

        {/* Animated dots */}
        {points.map((p, i) => (
          <motion.circle
            key={`${i}-${animationKey}`}
            cx={p.x}
            cy={p.y}
            r={3}
            fill={lineColor}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              startAnimation
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 0.3,
              delay: startAnimation
                ? (isUpward ? ANIMATION_DURATION + 0.3 : 0) +
                  (i / (points.length - 1)) * ANIMATION_DURATION
                : 0,
            }}
          />
        ))}

        {/* Glow effect for upward line */}
        {isUpward && (
          <motion.path
            d={pathD}
            fill="none"
            stroke={lineColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.15}
            filter="blur(4px)"
            initial={{ pathLength: 0 }}
            animate={startAnimation ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              pathLength: { duration: ANIMATION_DURATION, ease: "easeInOut", delay: ANIMATION_DURATION + 0.3 },
            }}
          />
        )}
      </svg>
    </div>
  );
};

const PublicPerceptionBar = ({
  isUpward,
  startAnimation,
  animationKey,
}: {
  isUpward: boolean;
  startAnimation: boolean;
  animationKey: number;
}) => {
  const [progress, setProgress] = useState(isUpward ? 20 : 50);
  const [isGlowing, setIsGlowing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const progressValue = useMotionValue(progress);
  useEffect(() => {
    progressValue.set(progress);
  }, [progress, progressValue]);

  useEffect(() => {
    setProgress(isUpward ? 20 : 50);
    setIsGlowing(false);
    setHasStarted(false);
  }, [animationKey, isUpward]);

  useEffect(() => {
    if (startAnimation && !hasStarted) {
      setHasStarted(true);
    }
  }, [startAnimation, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    if (isUpward) {
      // Upward: starts after stagnating line finishes, grows to ~90%
      const delay = (ANIMATION_DURATION + 0.3) * 1000;
      const steps = 6;
      const targetProgress = 90;
      const increasePerStep = (targetProgress - 20) / steps;
      let currentStep = 0;

      const initialDelay = setTimeout(() => {
        currentStep++;
        setProgress(20 + currentStep * increasePerStep);

        const interval = setInterval(() => {
          currentStep++;
          if (currentStep >= steps) {
            setProgress(targetProgress);
            setIsGlowing(true);
            clearInterval(interval);
          } else {
            setProgress(20 + currentStep * increasePerStep);
          }
        }, (ANIMATION_DURATION / steps) * 1000);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(initialDelay);
    } else {
      // Stagnating: hovers around 35-45% (low-mid, orange)
      const steps = 6;
      const values = [50, 40, 45, 35, 42, 38];
      let currentStep = 0;

      const stepDuration = (ANIMATION_DURATION / steps) * 1000;

      const interval = setInterval(() => {
        if (currentStep < values.length) {
          setProgress(values[currentStep]);
          currentStep++;
        } else {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isUpward, hasStarted]);

  const progressSpring = useSpring(progressValue, {
    stiffness: 80,
    damping: 20,
  });
  const width = useTransform(progressSpring, (v) => `${v}%`);

  const barColor = isUpward ? "hsl(142, 50%, 45%)" : "hsl(30, 80%, 55%)";

  return (
    <div className="w-full max-w-[200px] mx-auto mt-4">
      <p className="text-xs text-muted-foreground mb-2 text-center font-medium tracking-wide uppercase">
        Public Perception
      </p>
      <motion.div className="relative h-3 bg-muted/30 rounded-full overflow-hidden border border-border/50">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width,
            backgroundColor: barColor,
            opacity: 1,
          }}
        />

        {isGlowing && (
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ width }}
          >
            <motion.div
              className="absolute inset-y-0 w-[50%]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsla(142, 70%, 75%, 0.15) 45%, hsla(0, 0%, 100%, 0.25) 50%, hsla(142, 70%, 75%, 0.15) 55%, transparent 100%)",
              }}
              animate={{ x: ["-100%", "300%"] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const LeadershipSection = () => {
  const chartRef = useRef(null);
  const chartInView = useInView(chartRef, { margin: "-50px" });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [animationKey, setAnimationKey] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const outOfViewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasAnimatedOnce = useRef(false);

  useEffect(() => {
    if (chartInView) {
      if (outOfViewTimerRef.current) {
        clearTimeout(outOfViewTimerRef.current);
        outOfViewTimerRef.current = null;
      }
      if (!shouldAnimate || !hasAnimatedOnce.current) {
        setShouldAnimate(true);
        hasAnimatedOnce.current = true;
      }
    } else if (hasAnimatedOnce.current) {
      outOfViewTimerRef.current = setTimeout(() => {
        setShouldAnimate(false);
        setAnimationKey((prev) => prev + 1);
        hasAnimatedOnce.current = false;
      }, 2000);
    }
    return () => {
      if (outOfViewTimerRef.current) {
        clearTimeout(outOfViewTimerRef.current);
      }
    };
  }, [chartInView]);

  return (
    <section ref={ref} className="bg-background py-[50px]">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-2 gap-8">
            <div ref={chartRef} className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4 font-medium">Stagnating Outcomes</p>
              <LineGraph data={stagnatingData} isUpward={false} startAnimation={shouldAnimate} animationKey={animationKey} />
              <PublicPerceptionBar isUpward={false} startAnimation={shouldAnimate} animationKey={animationKey} />
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4 font-medium">Growing Outcomes</p>
              <LineGraph data={upwardData} isUpward={true} startAnimation={shouldAnimate} animationKey={animationKey} />
              <PublicPerceptionBar isUpward={true} startAnimation={shouldAnimate} animationKey={animationKey} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};