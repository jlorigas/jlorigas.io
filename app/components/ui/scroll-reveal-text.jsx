"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function splitWords(text) {
  return text.trim().split(/\s+/);
}

export default function ScrollRevealText({
  as: Component = "p",
  text,
  className,
  wordClassName,
  activeWordClassName,
  delay = 0,
  amount = 0.45,
}) {
  const words = splitWords(text);

  return (
    <Component className={cn("text-pretty", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-top">
          <motion.span
            initial={{ opacity: 0.16, y: "0.8em", filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
            viewport={{ once: false, amount }}
            transition={{
              duration: 0.62,
              delay: delay + index * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn("mr-[0.28em] inline-block will-change-transform", wordClassName, activeWordClassName)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
