"use client";

import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Code2, Layers3, Sparkles, Terminal, Zap } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiCss3,
  SiFigma,
  SiNextdotjs,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiPhp,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiTypescript,
} from "react-icons/si";
import BackgroundLines from "./ui/background-lines";
import CyberDefense from "./CyberDefense";
import SpotlightCard from "./ui/spotlight-card";
import useSafeReducedMotion from "../hooks/use-safe-reduced-motion";
import { SectionReveal, StaggerItem, StaggerReveal } from "./ui/section-reveal";
import profileImage from "../../public/profile.png";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

const codeStack = [
  { name: "JavaScript", icon: <SiJavascript className="text-[#f7df1e]" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178c6]" /> },
  { name: "Python", icon: <SiPython className="text-[#ffd43b]" /> },
  { name: "PHP", icon: <SiPhp className="text-[#aeb2d5]" /> },
  { name: "HTML", icon: <SiHtml5 className="text-[#f97316]" /> },
  { name: "CSS", icon: <SiCss3 className="text-[#38bdf8]" /> },
  { name: "React", icon: <FaReact className="text-[#61dafb]" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-[#63e27d]" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#60a5fa]" /> },
  { name: "Firebase", icon: <SiFirebase className="text-[#fbbf24]" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-[#22d3ee]" /> },
];

const marqueeStack = [...codeStack, ...codeStack];

const heroWords = [
  "frontend experiences",
  "backend systems",
  "full-stack builds",
  "cleaner interfaces",
];

const signalCards = [
  {
    label: "Current Focus",
    value: "Learning Rest APIs and Databases",
    icon: <Layers3 size={16} />,
  },
  {
    label: "Practice Mode",
    value: "Frontend + full stack",
    icon: <Zap size={16} />,
  },
  {
    label: "Design Rhythm",
    value: "UI polish",
    icon: <SiFigma className="text-[16px]" />,
  },
];

export default function Hero() {
  const [isGameActive, setGameActive] = useState(false);
  const photoRef = useRef(null);
  const shouldReduceMotion = useSafeReducedMotion();

  useEffect(() => {
    const tiltNode = photoRef.current;
    const canUseTilt =
      tiltNode &&
      !shouldReduceMotion &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (canUseTilt) {
      VanillaTilt.init(tiltNode, {
        max: 8,
        speed: 300,
        glare: false,
        scale: 1.015,
        gyroscope: false,
      });
    }

    return () => tiltNode?.vanillaTilt?.destroy();
  }, [shouldReduceMotion]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-8 pt-0 md:px-10 xl:px-16">
      <BackgroundLines className="flex min-h-screen w-full items-center justify-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)]" />
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
        </div>

        <div className="relative z-10 grid w-full max-w-[1600px] items-center gap-16 xl:gap-20 lg:grid-cols-12">
          <SectionReveal className="relative z-20 lg:col-span-7" x={-30}>
            <StaggerReveal className="space-y-0" staggerChildren={0.1}>
              <StaggerItem>
                <div className="mb-7 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.14)]">
                    <Code2 size={14} />
                    IT Graduate
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-gray-300">
                    <Terminal size={14} />
                    Building in public
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="max-w-4xl">
                  <h1 className="relative z-30 text-5xl font-black leading-[0.88] tracking-tight text-white md:text-7xl xl:text-[5.2rem]">
                    <span className="block text-white">Crafting clean code for</span>
                    <LayoutTextFlip
                      words={heroWords}
                      className="mt-2 justify-start gap-x-0"
                      wordClassName="min-w-0 text-left"
                    />
                    <span className="mt-2 block text-white/92">and beyond.</span>
                  </h1>

                  <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
                    I&apos;m <span className="font-semibold text-white">Jomar Lorigas</span>,
                    an Information Technology graduate exploring modern web
                    interfaces, connected systems, and cleaner product
                    experiences through real builds.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/12 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/55 hover:bg-cyan-300/18"
                  >
                    View Projects
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#skills"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  >
                    Explore Skills
                  </a>
                  <button
                    type="button"
                    onClick={() => setGameActive(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fuchsia-100 transition hover:border-fuchsia-200/40 hover:bg-fuchsia-300/16"
                  >
                    <Sparkles size={14} />
                    Launch Mini Defense
                  </button>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {signalCards.map((card, index) => (
                    <motion.div
                      key={card.label}
                      animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
                      transition={
                        shouldReduceMotion
                          ? undefined
                          : {
                              repeat: Infinity,
                              duration: 3.6 + index * 0.35,
                              ease: "easeInOut",
                            }
                      }
                      className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2 text-cyan-200">
                        {card.icon}
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/80">
                          {card.label}
                        </p>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">
                        {card.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-9 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-200/80">
                      Code Languages + Tools
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Scrolls through the stack I build with
                    </p>
                  </div>

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

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#060b13] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#060b13] to-transparent" />
                  </div>
                </div>
              </StaggerItem>
            </StaggerReveal>
          </SectionReveal>

          <SectionReveal
            className="relative z-10 flex justify-center lg:-mt-10 lg:col-span-5 xl:-mt-14"
            delay={0.12}
            scale={0.98}
          >
            <div className="relative w-full max-w-[470px]">
              <SpotlightCard className="overflow-hidden p-4">
                <div className="relative rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,10,18,0.96),rgba(8,12,21,0.92))] p-4">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.12),transparent_28%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:30px_30px]" />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/80">
                          Live Build
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          Portfolio interface system
                        </p>
                      </div>
                      <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200">
                        Active
                      </div>
                    </div>

                    <div
                      ref={photoRef}
                      className="relative aspect-[0.9] w-full overflow-hidden rounded-[1.55rem] border border-white/10 bg-gradient-to-br from-blue-500/20 to-fuchsia-500/20 p-1"
                    >
                      <div className="absolute inset-0 rounded-[1.55rem] bg-[#0a0d14]/84" />
                      <div className="relative z-10 h-full w-full overflow-hidden rounded-[1.25rem]">
                        <Image
                          src={profileImage}
                          alt="Jomar Lorigas"
                          fill
                          priority
                          sizes="(min-width: 1024px) 470px, 90vw"
                          className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02050a] via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </SectionReveal>
        </div>
      </BackgroundLines>

      <AnimatePresence>
        {isGameActive && <CyberDefense onClose={() => setGameActive(false)} />}
      </AnimatePresence>
    </section>
  );
}
