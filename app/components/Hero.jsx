"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiCss,
  SiJavascript,
  SiFirebase,
  SiHtml5,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import BackgroundLines from "./ui/background-lines";
import CyberDefense from "./CyberDefense";
import useSafeReducedMotion from "../hooks/use-safe-reduced-motion";
import { SectionReveal, StaggerItem, StaggerReveal } from "./ui/section-reveal";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

const codeStack = [
  { name: "JavaScript", icon: <SiJavascript className="text-[#f7df1e]" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178c6]" /> },
  { name: "Python", icon: <SiPython className="text-[#ffd43b]" /> },
  { name: "PHP", icon: <SiPhp className="text-[#aeb2d5]" /> },
  { name: "HTML", icon: <SiHtml5 className="text-[#f97316]" /> },
  { name: "CSS", icon: <SiCss className="text-[#38bdf8]" /> },
  { name: "React", icon: <FaReact className="text-[#61dafb]" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-[#63e27d]" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#60a5fa]" /> },
  { name: "Firebase", icon: <SiFirebase className="text-[#fbbf24]" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-[#22d3ee]" /> },
];

const marqueeStack = [...codeStack, ...codeStack];

const heroWords = [
  "projects I am proud of",
  "skills I keep improving",
  "websites I can keep building",
  "a journey I am still growing in",
];

const heroHighlights = [
  {
    label: "Responsive first",
    text: "I design for mobile screens first, then scale layouts up cleanly for larger devices.",
  },
  {
    label: "Current stack",
    text: "Next.js, Tailwind, Framer Motion, and backend practice for practical builds.",
  },
  {
    label: "What I want",
    text: "Junior opportunities where I can keep learning, contribute, and grow fast.",
  },
];

export default function Hero() {
  const [isGameActive, setGameActive] = useState(false);
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-5 pt-0 sm:px-6 md:px-10 xl:px-16">
      <BackgroundLines className="flex min-h-screen w-full items-center justify-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_10%,#000_65%,transparent_110%)]" />
          <motion.div
            className="absolute left-[-10%] top-[-12%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]"
            animate={shouldReduceMotion ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { repeat: Infinity, duration: 10, ease: "easeInOut" }
            }
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]"
            animate={shouldReduceMotion ? undefined : { x: [0, -35, 0], y: [0, -25, 0] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { repeat: Infinity, duration: 9, ease: "easeInOut" }
            }
          />
          <div className="absolute inset-x-[12%] bottom-[-8%] h-64 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.16),transparent_65%)] blur-[90px]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center py-20 text-center sm:py-24 md:py-28">
          <SectionReveal className="relative z-20 w-full" y={24}>
            <StaggerReveal className="space-y-0" staggerChildren={0.1}>
              <StaggerItem>
                <div className="mb-8 flex justify-center">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0b1120]/85 px-5 py-2.5 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:border-cyan-300/35"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200">
                      Portfolio update
                    </span>
                    <span className="hidden text-white/60 sm:inline">
                      Featured builds, certificates, and frontend practice
                    </span>
                    <ArrowRight className="h-4 w-4 text-cyan-200" />
                  </a>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mx-auto grid w-full max-w-6xl gap-10 text-center lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:text-left">
                  <div className="max-w-3xl lg:max-w-none">
                    <h1 className="relative z-30 text-4xl font-black leading-[0.95] tracking-[-0.07em] text-white sm:text-5xl md:text-6xl xl:text-[5.8rem]">
                      <span className="block">Building my path as</span>
                      <LayoutTextFlip
                        words={heroWords}
                        className="mt-2 justify-center gap-x-0 lg:justify-start"
                        wordClassName="min-w-0 text-center opacity-80 lg:text-left"
                      />
                    </h1>

                    <p className="mt-8 text-base leading-7 text-gray-300 md:text-lg md:leading-9">
                      I&apos;m Jomar Lorigas, a junior developer and IT graduate
                      who is still learning, building projects, and improving my
                      skills in frontend and full-stack development one step at a
                      time.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                      <a
                        href="#projects"
                        className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-[0_18px_50px_rgba(255,255,255,0.12)] transition hover:translate-y-[-1px] hover:bg-slate-100 dark:bg-white dark:text-black"
                      >
                        View Projects
                      </a>
                      <a
                        href="#skills"
                        className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white transition hover:border-cyan-300/30 hover:bg-white/[0.08]"
                      >
                        Explore Skills
                      </a>
                      <button
                        type="button"
                        onClick={() => setGameActive(true)}
                        className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fuchsia-100 transition hover:border-fuchsia-200/40 hover:bg-fuchsia-300/16"
                      >
                        <Sparkles size={14} />
                        Launch Mini Defense
                      </button>
                    </div>
                  </div>

                  <motion.div
                    className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1120]/85 p-5 text-left shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_35%)]" />
                    <div className="relative z-10 space-y-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200">
                            Build status
                          </p>
                          <p className="mt-2 text-sm text-gray-300">
                            A responsive portfolio in motion
                          </p>
                        </div>
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100">
                          Active
                        </span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {heroHighlights.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4"
                          >
                            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-300/80">
                              {item.label}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-gray-300">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mx-auto mt-14 w-full max-w-5xl overflow-hidden">
                  <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                    Stack I build with
                  </p>
                  <div className="relative overflow-hidden">
                    <motion.div
                      animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
                      transition={
                        shouldReduceMotion
                          ? undefined
                          : { repeat: Infinity, duration: 22, ease: "linear" }
                      }
                      className="flex w-max gap-3"
                    >
                      {marqueeStack.map((tech, index) => (
                        <div
                          key={`${tech.name}-${index}`}
                          className="group flex min-w-max items-center gap-3 rounded-full border border-white/10 bg-[#0b1220]/80 px-4 py-3 backdrop-blur-md transition-colors hover:border-cyan-300/30 hover:bg-[#111a2a]"
                        >
                          <span className="text-xl opacity-90 transition-transform duration-300 group-hover:scale-110">
                            {tech.icon}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </motion.div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030408] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030408] to-transparent" />
                  </div>
                </div>
              </StaggerItem>
            </StaggerReveal>
          </SectionReveal>
        </div>
      </BackgroundLines>

      <AnimatePresence>
        {isGameActive && <CyberDefense onClose={() => setGameActive(false)} />}
      </AnimatePresence>
    </section>
  );
}
