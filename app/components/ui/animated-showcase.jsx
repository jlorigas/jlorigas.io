"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Lock } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ActionButton({ action, primary = false }) {
  if (!action?.href) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
        <Lock size={14} />
        {action?.label || "Unavailable"}
      </span>
    );
  }

  return (
    <ShinyButton
      asChild
      className={primary ? "" : "border-white/10 bg-transparent text-white/85"}
    >
      <a href={action.href} target="_blank" rel="noreferrer">
        <ExternalLink size={14} />
        {action.label}
      </a>
    </ShinyButton>
  );
}

export default function AnimatedShowcase({
  items,
  autoPlay = true,
  interval = 6000,
  className = "",
  thumbnailGridClassName = "md:grid-cols-3",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeItem = items[activeIndex];

  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [autoPlay, interval, isPaused, items.length]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#06090f]/90 p-4 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-6",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/5" />
      <div className="pointer-events-none absolute inset-4 rounded-[1.6rem] border border-white/6 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/40 p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 1.06, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.96, rotate: 2 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/15 to-transparent" />
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100">
                {activeItem.eyebrow}
              </span>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em]",
                  activeItem.statusClassName
                )}
              >
                {activeItem.status}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {activeItem.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-cyan-300/80">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </p>
                <h3 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                  {activeItem.title}
                </h3>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-200/80">
                  {activeItem.subtitle}
                </p>
              </div>

              <p className="max-w-xl text-sm leading-7 text-gray-300 md:text-base">
                {activeItem.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <ActionButton action={activeItem.primaryAction} primary />
                <ActionButton action={activeItem.secondaryAction} />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {activeItem.details?.map((detail) => (
                  <div
                    key={detail.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300/75">
                      {detail.label}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/90">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/30 hover:bg-cyan-500/10"
                aria-label="Show previous item"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/30 hover:bg-cyan-500/10"
                aria-label="Show next item"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-12 bg-cyan-300"
                      : "w-6 bg-white/15 hover:bg-white/30"
                  )}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 mt-6 grid gap-3",
          thumbnailGridClassName
        )}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "flex items-center gap-3 rounded-[1.4rem] border p-3 text-left transition",
              index === activeIndex
                ? "border-cyan-300/30 bg-cyan-500/10"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
            )}
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="64px"
                className="object-cover object-center"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {item.title}
              </p>
              <p className="truncate text-xs uppercase tracking-[0.2em] text-gray-400">
                {item.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
