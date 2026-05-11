"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import useSafeReducedMotion from "../hooks/use-safe-reduced-motion";

export default function SmoothScroll() {
  const shouldReduceMotion = useSafeReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      window.__lenis = undefined;
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
    });
    window.__lenis = lenis;

    let frameId = 0;

    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return null;
}
