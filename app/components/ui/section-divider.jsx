"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionDivider({ className = "" }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0.4 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.7 }}
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent",
        className,
      )}
    />
  );
}
