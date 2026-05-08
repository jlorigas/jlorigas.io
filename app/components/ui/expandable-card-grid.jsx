"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { ShinyButton } from "@/components/ui/shiny-button";

function renderContent(content) {
  return typeof content === "function" ? content() : content;
}

const modalSectionTransition = {
  duration: 0.28,
  ease: "easeOut",
};

function ExpandableCardGrid({
  items,
  columns = "md:grid-cols-2",
  imageHeightClassName = "h-64",
}) {
  const [activeItem, setActiveItem] = useState(null);
  const modalRef = useRef(null);
  const layoutId = useId();

  useOutsideClick(modalRef, () => setActiveItem(null));

  useEffect(() => {
    if (!activeItem) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  return (
    <>
      <AnimatePresence>
        {activeItem ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 z-[90] bg-[#02040a]/80 backdrop-blur-md"
            />

            <div className="fixed inset-0 z-[100] grid place-items-center p-4 md:p-6">
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18 }}
                onClick={() => setActiveItem(null)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-lg transition hover:bg-black/80 md:right-6 md:top-6"
                aria-label="Close expanded card"
              >
                <X size={18} />
              </motion.button>

              <motion.div
                ref={modalRef}
                layoutId={`card-${activeItem.id}-${layoutId}`}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b12]/95 shadow-[0_24px_120px_rgba(0,0,0,0.6)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_30%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

                <motion.div
                  layoutId={`image-${activeItem.id}-${layoutId}`}
                  className="relative h-72 overflow-hidden border-b border-white/10 md:h-80"
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 960px"
                    className={itemImageClassNames(activeItem.modalImageClassName)}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/18 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px] opacity-[0.16]" />
                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between md:left-6 md:right-6">
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-blue-200">
                      {activeItem.eyebrow}
                    </span>
                    <span className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] ${activeItem.statusClassName}`}>
                      {activeItem.status}
                    </span>
                  </div>
                </motion.div>

                <div className="overflow-y-auto px-5 pb-6 pt-5 md:px-8 md:pb-8 md:pt-6">
                  <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={modalSectionTransition}
                      className="space-y-3"
                    >
                      <motion.h3
                        layoutId={`title-${activeItem.id}-${layoutId}`}
                        className="text-3xl font-black tracking-tight text-white md:text-4xl"
                      >
                        {activeItem.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${activeItem.id}-${layoutId}`}
                        className="max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base"
                      >
                        {activeItem.description}
                      </motion.p>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-blue-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...modalSectionTransition, delay: 0.06 }}
                      className="flex flex-wrap gap-3"
                    >
                      {activeItem.primaryAction ? (
                        activeItem.primaryAction.href ? (
                          <ShinyButton asChild>
                            <a
                              href={activeItem.primaryAction.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {activeItem.primaryAction.label}
                              <ArrowUpRight size={16} />
                            </a>
                          </ShinyButton>
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-500">
                            {activeItem.primaryAction.label}
                          </span>
                        )
                      ) : null}

                      {activeItem.secondaryAction ? (
                        activeItem.secondaryAction.href ? (
                          <ShinyButton asChild className="border-white/10 bg-transparent text-white/85">
                            <a
                              href={activeItem.secondaryAction.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {activeItem.secondaryAction.label}
                              <ArrowUpRight size={16} />
                            </a>
                          </ShinyButton>
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-500">
                            {activeItem.secondaryAction.label}
                          </span>
                        )
                      ) : null}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.26, delay: 0.12 }}
                    className="space-y-6 pt-6 text-sm leading-relaxed text-gray-300 md:text-base"
                  >
                    {renderContent(activeItem.content)}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>

      <div className={`grid gap-8 ${columns}`}>
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            layoutId={`card-${item.id}-${layoutId}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{
              opacity: { duration: 0.4, delay: index * 0.08 },
              y: { duration: 0.4, delay: index * 0.08 },
              scale: { duration: 0.2 },
            }}
            viewport={{ once: true, amount: 0.25 }}
            onClick={() => setActiveItem(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveItem(item);
              }
            }}
            role="button"
            tabIndex={0}
            whileTap={{ scale: 0.995 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070b12]/80 text-left shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition-colors hover:border-blue-400/30"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_30%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-[-20%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/75 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[25%] group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 md:px-5">
              <span>{item.eyebrow}</span>
              <span className={`rounded-full border px-2 py-1 tracking-[0.22em] ${item.statusClassName}`}>
                {item.status}
              </span>
            </div>

            <motion.div
              layoutId={`image-${item.id}-${layoutId}`}
              className={`relative ${imageHeightClassName} overflow-hidden`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={itemImageClassNames(item.cardImageClassName)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/12 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070b12]/95 to-transparent" />
            </motion.div>

            <div className="relative z-10 flex flex-1 flex-col space-y-4 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <motion.h3
                    layoutId={`title-${item.id}-${layoutId}`}
                    className="text-xl font-black leading-tight tracking-tight text-white transition-colors group-hover:text-blue-200 md:text-[1.7rem]"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${item.id}-${layoutId}`}
                    className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-400"
                  >
                    {item.description}
                  </motion.p>
                </div>

                <div className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition group-hover:border-blue-300/30 group-hover:bg-blue-500/10 group-hover:text-blue-100">
                  {item.primaryAction?.label ?? "Expand"}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                <span className="min-w-0 flex-1 truncate font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                  {item.footer}
                </span>
                <span className="inline-flex shrink-0 items-center whitespace-nowrap text-sm font-semibold text-blue-200">
                  Expand
                  <ArrowUpRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}

function itemImageClassNames(customClassName = "") {
  return `object-cover object-center transition duration-700 group-hover:scale-105 ${customClassName}`.trim();
}

export default ExpandableCardGrid;
