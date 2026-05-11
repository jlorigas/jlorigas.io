"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const springConfig = {
  mass: 0.12,
  stiffness: 160,
  damping: 14,
};

export function FloatingDock({
  items,
  desktopClassName,
  mobileClassName,
}) {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
}

function FloatingDockDesktop({ items, className }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-20 items-end gap-3 rounded-[2rem] border border-white/10 bg-black/70 px-4 pb-3 pt-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:flex",
        className
      )}
    >
      {items.map((item) => (
        <DockItem key={item.title} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}

function DockItem({ item, mouseX }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds) {
      return 0;
    }

    return value - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-180, 0, 180], [48, 76, 48]),
    springConfig
  );
  const height = useSpring(
    useTransform(distance, [-180, 0, 180], [48, 76, 48]),
    springConfig
  );
  const scale = useSpring(
    useTransform(distance, [-180, 0, 180], [1, 1.25, 1]),
    springConfig
  );

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className="relative flex items-center justify-center"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-white/80 backdrop-blur-xl"
          >
            {item.title}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <DockAction item={item}>
        <motion.div
          style={{ scale }}
          className={cn(
            "flex h-full w-full items-center justify-center rounded-2xl border transition-colors duration-200",
            item.isActive
              ? "border-sky-400/60 bg-sky-500/20 text-white shadow-[0_0_30px_rgba(14,165,233,0.18)]"
              : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
          )}
        >
          <div className="flex h-5 w-5 items-center justify-center">
            {item.icon}
          </div>
        </motion.div>
      </DockAction>
    </motion.div>
  );
}

function FloatingDockMobile({ items, className }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative flex items-center justify-center md:hidden", className)}>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-[1.5rem] border border-white/10 bg-black/80 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          >
            {items.map((item) => (
              <DockAction
                key={item.title}
                item={item}
                onActivate={() => setOpen(false)}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-200",
                    item.isActive
                      ? "border-sky-400/60 bg-sky-500/20 text-white"
                      : "border-white/10 bg-white/5 text-white/70"
                  )}
                >
                  <div className="flex h-5 w-5 items-center justify-center">
                    {item.icon}
                  </div>
                </div>
              </DockAction>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition hover:bg-black/90"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
}

function DockAction({ item, children, onActivate }) {
  const className = "block h-full w-full";

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.target}
        rel={item.target === "_blank" ? "noreferrer" : undefined}
        aria-label={item.title}
        className={className}
        onClick={(event) => {
          item.onClick?.(event);
          onActivate?.();
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={item.title}
      className={className}
      onClick={(event) => {
        item.onClick?.(event);
        onActivate?.();
      }}
    >
      {children}
    </button>
  );
}
