"use client";

import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Code2, Layers3, Sparkles, Terminal, Zap } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiFigma,
  SiNextdotjs,
  SiFirebase,
  SiTailwindcss,
  SiPostgresql,
} from "react-icons/si";
import BackgroundLines from "./ui/background-lines";
import CyberDefense from "./CyberDefense";
import SpotlightCard from "./ui/spotlight-card";
import useSafeReducedMotion from "../hooks/use-safe-reduced-motion";
import { SectionReveal, StaggerItem, StaggerReveal } from "./ui/section-reveal";
import profileImage from "../../public/profile.png";

const techStack = [
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "React Native", icon: <FaReact className="text-blue-400" /> },
];

const signalCards = [
  {
    label: "Current Focus",
    value: "Portfolio systems",
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-6 pt-24">
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

        <div className="relative z-10 grid w-full max-w-7xl items-center gap-14 lg:grid-cols-12">
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
                    Interface-first
                    <span className="block bg-gradient-to-r from-cyan-200 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                      projects for a growing
                    </span>
                    <span className="block text-white/92">frontend journey.</span>
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
                <div className="mt-8 flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -4 }}
                      className="group flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition-all hover:border-blue-500/50 hover:bg-white/10"
                    >
                      <span className="text-lg opacity-70 transition-opacity group-hover:opacity-100">
                        {tech.icon}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-blue-200">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </StaggerItem>
            </StaggerReveal>
          </SectionReveal>

          <SectionReveal className="relative z-10 flex justify-center lg:col-span-5" delay={0.12} scale={0.98}>
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

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/80">
                          Workflow
                        </p>
                        <p className="mt-3 text-sm leading-6 text-gray-300">
                          Designing sections, refining motion, and turning ideas
                          into real portfolio pages.
                        </p>
                      </div>

                      <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/80">
                          Learning Mode
                          </p>
                        <p className="mt-3 text-sm leading-6 text-gray-300">
                          Improving component structure, frontend polish, and
                          full-stack confidence step by step.
                        </p>
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
