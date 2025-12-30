import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ConfidenceMeter = ({ isStable }: { isStable: boolean }) => {
  const [rotation, setRotation] = useState(isStable ? 65 : 20);
  
  useEffect(() => {
    if (isStable) {
      // Stable meter: small fluctuations near the top (60-70 degrees)
      const interval = setInterval(() => {
        setRotation(62 + Math.random() * 8);
      }, 2000 + Math.random() * 1000);
      return () => clearInterval(interval);
    } else {
      // Unstable meter: unpredictable fluctuations across range
      const interval = setInterval(() => {
        setRotation(15 + Math.random() * 50);
      }, 800 + Math.random() * 600);
      return () => clearInterval(interval);
    }
  }, [isStable]);

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
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
            <stop offset="0%" stopColor="hsl(0, 60%, 55%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(40, 60%, 55%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(142, 50%, 45%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <path
          d="M 30 100 A 70 70 0 0 1 170 100"
          fill="none"
          stroke={`url(#gaugeGradient-${isStable ? 'stable' : 'unstable'})`}
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Tick marks */}
        {[0, 22.5, 45, 67.5, 90].map((angle, i) => {
          const rad = ((180 - angle) * Math.PI) / 180;
          const x1 = 100 + 75 * Math.cos(rad);
          const y1 = 100 - 75 * Math.sin(rad);
          const x2 = 100 + 68 * Math.cos(rad);
          const y2 = 100 - 68 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--gold) / 0.5)"
              strokeWidth="1.5"
            />
          );
        })}
        
        {/* Center pivot point - elegant gold circle */}
        <circle cx="100" cy="100" r="8" fill="hsl(var(--gold))" />
        <circle cx="100" cy="100" r="5" fill="hsl(var(--gold))" style={{ filter: 'brightness(1.2)' }} />
        <circle cx="100" cy="100" r="2" fill="hsl(var(--background))" />
        
        {/* Needle */}
        <motion.g
          animate={{ rotate: rotation }}
          transition={{ 
            type: "spring", 
            stiffness: isStable ? 80 : 40, 
            damping: isStable ? 15 : 8,
            mass: isStable ? 0.5 : 0.8
          }}
          style={{ transformOrigin: '100px 100px' }}
        >
          <path
            d="M 100 100 L 98 95 L 100 35 L 102 95 Z"
            fill="hsl(var(--gold))"
            style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' }}
          />
        </motion.g>
      </svg>
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
            {/* Confidence meters */}
            <div className="grid grid-cols-2 gap-8">
              {/* Unstable meter */}
              <div className="flex flex-col items-center">
                <ConfidenceMeter isStable={false} />
              </div>
              
              {/* Stable meter */}
              <div className="flex flex-col items-center">
                <ConfidenceMeter isStable={true} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};