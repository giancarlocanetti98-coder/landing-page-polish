import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ConfidenceMeter = ({ isStable }: { isStable: boolean }) => {
  // Rotation: 0 = pointing right (GREEN/HIGH), 180 = pointing left (RED/LOW)
  const [rotation, setRotation] = useState(isStable ? 15 : 140);
  
  useEffect(() => {
    if (isStable) {
      // Stable meter: quicker fluctuations in the green zone (3-35 degrees = right side)
      const interval = setInterval(() => {
        setRotation(3 + Math.random() * 32);
      }, 1200 + Math.random() * 800);
      return () => clearInterval(interval);
    } else {
      // Unstable meter: sporadic movements across full range (red to green)
      const interval = setInterval(() => {
        // Full range: 15-165 degrees (covers green through middle to red)
        setRotation(15 + Math.random() * 150);
      }, 500 + Math.random() * 500);
      return () => clearInterval(interval);
    }
  }, [isStable]);

  const needleLength = 55;

  // Animate the ANGLE (not the x2/y2 point) so the tip follows a true arc
  const angle = useMotionValue(rotation);
  useEffect(() => {
    angle.set(rotation);
  }, [angle, rotation]);

  const angleSpring = useSpring(angle, {
    stiffness: isStable ? 100 : 70,
    damping: isStable ? 18 : 12,
    mass: 0.4,
  });

  const radians = useTransform(angleSpring, (deg) => (deg * Math.PI) / 180);
  const x2 = useTransform(radians, (rad) => 100 + needleLength * Math.cos(rad));
  const y2 = useTransform(radians, (rad) => 100 - needleLength * Math.sin(rad));

  return (
    <div className="relative w-full max-w-[200px] mx-auto">
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        {/* Outer arc border */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="hsl(var(--gold) / 0.3)"
          strokeWidth="2"
        />
        
        {/* Inner gradient arc - background */}
        <defs>
          <linearGradient id={`gaugeGradient-${isStable ? 'stable' : 'unstable'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0, 60%, 55%)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(45, 70%, 55%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(142, 50%, 45%)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        <path
          d="M 30 100 A 70 70 0 0 1 170 100"
          fill="none"
          stroke={`url(#gaugeGradient-${isStable ? 'stable' : 'unstable'})`}
          strokeWidth="14"
          strokeLinecap="round"
        />
        
        {/* Tick marks - full arc from left to right */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180].map((angle, i) => {
          const tickRad = (angle * Math.PI) / 180;
          const x1 = 100 + 75 * Math.cos(tickRad);
          const y1 = 100 - 75 * Math.sin(tickRad);
          const x2 = 100 + 66 * Math.cos(tickRad);
          const y2 = 100 - 66 * Math.sin(tickRad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--gold) / 0.6)"
              strokeWidth="1.5"
            />
          );
        })}
        
        {/* Needle - base locked at (100,100), tip moves on an arc */}
        <motion.line
          x1={100}
          y1={100}
          x2={x2}
          y2={y2}
          stroke="hsl(var(--gold))"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.24))" }}
        />

        {/* Center pivot point - on top so the needle looks attached */}
        <circle cx="100" cy="100" r="12" fill="hsl(var(--gold))" />
        <circle
          cx="100"
          cy="100"
          r="8"
          fill="hsl(var(--gold))"
          style={{ filter: "brightness(1.2)" }}
        />
        <circle
          cx="100"
          cy="100"
          r="4"
          fill="hsl(var(--gold))"
          style={{ filter: "brightness(1.4)" }}
        />
        <circle cx="100" cy="100" r="2" fill="hsl(var(--background))" />
      </svg>
    </div>
  );
};

const CredibilityBar = ({ isStable }: { isStable: boolean }) => {
  const [progress, setProgress] = useState(isStable ? 100 : 50);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (isStable) {
      // Stable: always full with tiny fluctuations
      const interval = setInterval(() => {
        setProgress(97 + Math.random() * 3);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      // Unstable: slowly decrease from 50 to 0
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev - (1 + Math.random() * 2);
          if (next <= 0) {
            setIsFlashing(true);
            return 0;
          }
          return next;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isStable]);

  // Reset after reaching zero and flashing for a bit
  useEffect(() => {
    if (isFlashing && !isStable) {
      const timeout = setTimeout(() => {
        setIsFlashing(false);
        setProgress(50); // Reset to half
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isFlashing, isStable]);

  const progressSpring = useSpring(progress, {
    stiffness: 60,
    damping: 20,
  });

  const width = useTransform(progressSpring, (v) => `${v}%`);
  
  // Color based on progress level
  const barColor = isStable 
    ? "hsl(142, 50%, 45%)" // Green for stable
    : "hsl(0, 60%, 55%)";   // Red for unstable

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
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ 
            width,
            backgroundColor: barColor,
            boxShadow: `0 0 8px ${barColor}40`
          }}
        />
      </motion.div>
    </div>
  );
};
export const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section ref={ref} className="py-24 bg-background md:py-0">
      <div className="container px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div initial={{
          opacity: 0,
          x: -40
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.7
        }}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8 leading-tight">
              School Leadership is Judged on{" "}
              <span className="text-gold">Oxbridge Offers</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
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

          {/* Visual comparison */}
          <motion.div initial={{
          opacity: 0,
          x: 40
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border">
            {/* Confidence meters with credibility bars */}
            <div className="grid grid-cols-2 gap-8">
              {/* Unstable meter + decreasing credibility */}
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground mb-3 font-medium">Volatility</p>
                <ConfidenceMeter isStable={false} />
                <CredibilityBar isStable={false} />
              </div>
              
              {/* Stable meter + full credibility */}
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground mb-3 font-medium">Stability</p>
                <ConfidenceMeter isStable={true} />
                <CredibilityBar isStable={true} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};