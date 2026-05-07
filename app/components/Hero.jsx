"use client";

import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Mail, Code2, Terminal, Sparkles } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
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
import { withBasePath } from "../lib/base-path";

const floatingBadges = [
  "Student developer",
  "Still learning",
  "Building real projects",
];

const techStack = [
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "React Native", icon: <FaReact className="text-blue-400" /> },
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

        <div className="absolute left-10 top-24 hidden flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-500/40 lg:flex">
          <span>
            <Terminal size={10} className="mr-2 inline" />
            INIT_SEQUENCE_START
          </span>
          <span>LOADING_MODULES... OK</span>
        </div>

        <div className="relative z-10 grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12">
          <SectionReveal className="relative z-20 lg:col-span-7" x={-30}>
            <StaggerReveal className="space-y-0" staggerChildren={0.1}>
              <StaggerItem>
                <div className="mb-6 flex items-center gap-2 font-mono text-xs text-blue-400 md:text-sm">
                  <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
                    <Code2 size={14} className="mr-2 inline" />
                    <span className="tracking-widest uppercase">
                      IT_Graduate
                    </span>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mb-6 flex flex-wrap gap-3">
                  {floatingBadges.map((badge, index) => (
                    <motion.div
                      key={badge}
                      animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
                      transition={
                        shouldReduceMotion
                          ? undefined
                          : { repeat: Infinity, duration: 3 + index * 0.5, ease: "easeInOut" }
                      }
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-300"
                    >
                      {badge}
                    </motion.div>
                  ))}
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="relative z-30 mb-6 text-5xl font-black leading-[0.9] tracking-tighter text-white md:text-7xl">
                  Building <br />
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      setGameActive(true);
                    }}
                    className="group relative z-[100] inline-block cursor-pointer select-none transition-transform active:scale-95"
                  >
                    <span
                      className={`bg-gradient-to-r from-blue-300 via-cyan-300 to-fuchsia-500 bg-clip-text text-transparent transition-all duration-300 ${
                        isGameActive
                          ? "bg-none text-red-500 brightness-150"
                          : "group-hover:brightness-125"
                      }`}
                    >
                      {isGameActive ? "SYSTEM_BREACH_DETECTED" : "My Skills Step by Step"}
                    </span>

                    <span className="absolute -top-6 left-0 whitespace-nowrap rounded border border-red-500/30 bg-black/90 px-2 py-0.5 font-mono text-[10px] text-red-500 opacity-0 transition-opacity group-hover:opacity-100">
                      WARNING CLICK_TO_INIT_DEFENSE
                    </span>
                  </span>
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="max-w-2xl border-l-2 border-white/10 pl-6 text-lg font-light leading-relaxed text-gray-400 md:text-xl">
                  I&apos;m <span className="font-medium text-white">Jomar Lorigas</span>.
                  I&apos;m a fresh Information Technology graduate who enjoys
                  learning by building websites, exploring full-stack tools,
                  and improving my skills through real projects.
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-10 flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -4 }}
                      className="group flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all hover:border-blue-500/50 hover:bg-white/10"
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

              <StaggerItem>
                <div className="relative z-40 mt-12 flex flex-wrap items-center gap-5">
                  <a
                    href={withBasePath("/Resume.pdf")}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Terminal size={18} /> Initialize CV
                      
                    </span>
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                  </a>

                  <div className="flex gap-3">
                    <a
                      href="https://github.com/jomarlopezlorigas-arch"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 p-4 transition-all hover:border-blue-500/50 hover:text-blue-400"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="mailto:jomarlopezlorigas@gmail.com"
                      className="rounded-full border border-white/10 bg-white/5 p-4 transition-all hover:border-blue-500/50 hover:text-blue-400"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            </StaggerReveal>
          </SectionReveal>

          <SectionReveal className="relative z-10 flex justify-center lg:col-span-5" delay={0.12} scale={0.98}>
            <div className="relative w-full max-w-[420px]">
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { repeat: Infinity, duration: 4.6, ease: "easeInOut" }
                }
                className="absolute -left-6 top-10 hidden rounded-2xl border border-cyan-400/15 bg-cyan-400/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.2)] md:block"
              >
                <Sparkles size={14} className="mb-2" />
                Learning by building
              </motion.div>

              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.5 }
                }
                className="absolute -right-4 bottom-10 hidden rounded-2xl border border-fuchsia-400/15 bg-fuchsia-400/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.2)] md:block"
              >
                Growing one project at a time
              </motion.div>

              <SpotlightCard className="p-4">
                <div className="absolute inset-0 -z-10 hidden opacity-30 lg:block">
                  <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <path d="M 200 200 L 400 50" stroke="#3b82f6" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                    <path d="M 200 200 L 400 350" stroke="#a855f7" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                  </svg>
                </div>

                <div
                  ref={photoRef}
                  className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-500/30 to-purple-500/30 p-1 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 z-0 rounded-[1.5rem] bg-[#0a0a0a]/80" />
                  <div className="relative z-10 h-full w-full overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                    <Image
                      src={profileImage}
                      alt="Jomar Lorigas"
                      fill
                      priority
                      sizes="(min-width: 1024px) 420px, 90vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
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
