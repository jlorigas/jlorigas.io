"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type LayoutTextFlipProps = {
  text?: string;
  words: string[];
  className?: string;
  textClassName?: string;
  wordClassName?: string;
  interval?: number;
};

export function LayoutTextFlip({
  text = "",
  words,
  className,
  textClassName,
  wordClassName,
  interval = 2400,
}: LayoutTextFlipProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, words]);

  if (words.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2", className)}>
      {text ? <span className={cn("text-white", textClassName)}>{text}</span> : null}
      <span className="relative inline-flex min-h-[1.2em] min-w-[12ch] items-center justify-start overflow-hidden text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "inline-block bg-gradient-to-r from-cyan-200 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent",
              wordClassName
            )}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
