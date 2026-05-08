"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [isHydrated, setIsHydrated] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.35,
  });
  const canAnimateProgress = isHydrated && !shouldReduceMotion;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[130] h-1.5">
      <div className="absolute inset-x-0 top-0 h-px bg-white/8" />
      <motion.div
        className="h-full origin-left bg-[linear-gradient(90deg,rgba(103,232,249,0.95)_0%,rgba(59,130,246,0.95)_50%,rgba(217,70,239,0.92)_100%)] shadow-[0_0_24px_rgba(34,211,238,0.42)]"
        style={canAnimateProgress ? { scaleX: progressScale } : { scaleX: 0 }}
        initial={false}
      />
    </div>
  );
}
