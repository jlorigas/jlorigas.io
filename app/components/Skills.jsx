"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { FaReact } from "react-icons/fa";
import {
  SiCss3,
  SiJavascript,
  SiFirebase,
  SiHtml5,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiRuby,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { ShinyButton } from "@/components/ui/shiny-button";
import useSafeReducedMotion from "../hooks/use-safe-reduced-motion";
import { SectionReveal } from "./ui/section-reveal";
import SectionDivider from "./ui/section-divider";

const timelineData = [
  {
    id: 1,
    title: "Next.js",
    date: "Core",
    content:
      "My main framework for building portfolio pages, deployed apps, and full-stack learning projects.",
    category: "Frontend",
    icon: SiNextdotjs,
    relatedIds: [2, 3, 4],
    status: "completed",
    energy: 88,
  },
  {
    id: 2,
    title: "React",
    date: "UI",
    content:
      "Reusable components, stateful interactions, and smoother user flows for web interfaces.",
    category: "Frontend",
    icon: FaReact,
    relatedIds: [1, 3, 5],
    status: "completed",
    energy: 84,
  },
  {
    id: 3,
    title: "Tailwind CSS",
    date: "Style",
    content:
      "Fast styling workflow for responsive layouts, polished sections, and consistent visual systems.",
    category: "Design",
    icon: SiTailwindcss,
    relatedIds: [1, 2, 5],
    status: "completed",
    energy: 86,
  },
  {
    id: 4,
    title: "TypeScript",
    date: "Structure",
    content:
      "Safer code structure for props, app logic, and larger projects that need clearer contracts.",
    category: "Language",
    icon: SiTypescript,
    relatedIds: [1, 2, 6],
    status: "in-progress",
    energy: 72,
  },
  {
    id: 5,
    title: "Firebase",
    date: "Cloud",
    content:
      "Authentication and cloud tooling practice for student projects and backend-connected apps.",
    category: "Cloud",
    icon: SiFirebase,
    relatedIds: [1, 2, 6],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 6,
    title: "Node.js",
    date: "Backend",
    content:
      "Backend practice for APIs, server logic, and connecting frontend screens to data workflows.",
    category: "Backend",
    icon: SiNodedotjs,
    relatedIds: [4, 5, 7],
    status: "in-progress",
    energy: 76,
  },
  {
    id: 7,
    title: "PostgreSQL",
    date: "Data",
    content:
      "Relational database learning for tables, queries, and application data models.",
    category: "Database",
    icon: SiPostgresql,
    relatedIds: [4, 6],
    status: "pending",
    energy: 64,
  },
];

const floatingLanguages = [
  {
    name: "PHP",
    icon: SiPhp,
    className: "text-[#c7d2fe]",
    radius: 410,
    startAngle: 212,
    duration: "42s",
    spinClassName: "skills-orbit",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    className: "text-[#f7df1e]",
    radius: 485,
    startAngle: 322,
    duration: "48s",
    spinClassName: "skills-orbit-reverse",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    className: "text-[#60a5fa]",
    radius: 460,
    startAngle: 164,
    duration: "54s",
    spinClassName: "skills-orbit",
  },
  {
    name: "Python",
    icon: SiPython,
    className: "text-[#fde68a]",
    radius: 525,
    startAngle: 118,
    duration: "58s",
    spinClassName: "skills-orbit-reverse",
  },
  {
    name: "HTML",
    icon: SiHtml5,
    className: "text-[#fb923c]",
    radius: 325,
    startAngle: 206,
    duration: "36s",
    spinClassName: "skills-orbit",
  },
  {
    name: "CSS",
    icon: SiCss3,
    className: "text-[#38bdf8]",
    radius: 350,
    startAngle: 32,
    duration: "39s",
    spinClassName: "skills-orbit-reverse",
  },
  {
    name: "React",
    icon: FaReact,
    className: "text-[#61dafb]",
    radius: 385,
    startAngle: 78,
    duration: "40s",
    spinClassName: "skills-orbit",
  },
  {
    name: "Ruby",
    icon: SiRuby,
    className: "text-[#f87171]",
    radius: 438,
    startAngle: 24,
    duration: "46s",
    spinClassName: "skills-orbit-reverse",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    className: "text-[#86efac]",
    radius: 405,
    startAngle: 268,
    duration: "43s",
    spinClassName: "skills-orbit",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    className: "text-white",
    radius: 300,
    startAngle: 356,
    duration: "34s",
    spinClassName: "skills-orbit-reverse",
  },
  {
    name: "REST API",
    icon: Link,
    className: "text-cyan-200",
    radius: 330,
    startAngle: 132,
    duration: "38s",
    spinClassName: "skills-orbit",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    className: "text-[#fbbf24]",
    radius: 360,
    startAngle: 188,
    duration: "41s",
    spinClassName: "skills-orbit-reverse",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    className: "text-[#93c5fd]",
    radius: 495,
    startAngle: 286,
    duration: "56s",
    spinClassName: "skills-orbit",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    className: "text-[#67e8f9]",
    radius: 290,
    startAngle: 104,
    duration: "32s",
    spinClassName: "skills-orbit-reverse",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getStatusStyles(status) {
  switch (status) {
    case "completed":
      return "border-emerald-300/40 bg-emerald-400/15 text-emerald-100";
    case "in-progress":
      return "border-cyan-300/40 bg-cyan-400/15 text-cyan-100";
    case "pending":
      return "border-white/20 bg-white/5 text-white/65";
    default:
      return "border-white/20 bg-white/5 text-white/65";
  }
}

function getStatusLabel(status) {
  switch (status) {
    case "completed":
      return "Complete";
    case "in-progress":
      return "In Progress";
    case "pending":
      return "Pending";
    default:
      return status;
  }
}

function MatrixBackdrop() {
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <>
      <style jsx global>{`
        @keyframes skills-orbit {
          from {
            transform: rotate(var(--orbit-start, 0deg));
          }
          to {
            transform: rotate(calc(var(--orbit-start, 0deg) + 360deg));
          }
        }

        @keyframes skills-icon-bob {
          from {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          to {
            transform: translateY(-3px) scale(1.04) rotate(5deg);
          }
        }

        .skills-orbit {
          animation: skills-orbit var(--orbit-duration, 24s) linear infinite;
        }

        .skills-orbit-reverse {
          animation: skills-orbit var(--orbit-duration, 24s) linear infinite reverse;
        }

        .skills-icon-bob {
          animation: skills-icon-bob 5.8s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#04070d]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_6%,rgba(34,211,238,0.16),transparent_20%),radial-gradient(circle_at_52%_18%,rgba(56,189,248,0.12),transparent_18%),radial-gradient(circle_at_72%_10%,rgba(217,70,239,0.12),transparent_18%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.05),transparent_26%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.16)_1px,transparent_1.5px)] bg-[size:22px_22px] opacity-[0.28]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:110px_110px] opacity-35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05111a]/70 via-[#05111a]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#03050a]/75 via-[#03050a]/45 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#04111a]/55 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#03050a]/55 to-transparent" />

        <div className="absolute inset-0 hidden sm:block">
          {floatingLanguages.map((language) => {
          const Icon = language.icon;

          return (
            <div
              key={language.name}
              className={cn(
                "absolute left-1/2 top-[58%] z-[1]",
                shouldReduceMotion ? "" : language.spinClassName
              )}
              style={{
                "--orbit-start": `${language.startAngle}deg`,
                "--orbit-duration": language.duration,
              }}
            >
              <div
                className="absolute left-0 top-0"
                style={{ transform: `translateX(${language.radius}px) translateY(-50%)` }}
              >
                <div className="flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/12 bg-[#09111d]/82 shadow-[0_20px_60px_rgba(0,0,0,0.34)] backdrop-blur-md">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30">
                    <Icon
                      className={cn(
                        "text-[18px]",
                        language.className,
                        shouldReduceMotion ? "" : "skills-icon-bob"
                      )}
                    />
                  </span>
                </div>
              </div>
            </div>
          );
          })}
        </div>

        <div className="absolute left-1/2 top-[58%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6" />
        <div className="absolute left-1/2 top-[58%] h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/8" />
        <div className="absolute left-1/2 top-[58%] h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6" />
        <div className="absolute left-1/2 top-[58%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_66%)] blur-2xl" />
      </div>
    </>
  );
}

function RadialOrbitalTimeline({ timelineData: items }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});
  const shouldReduceMotion = useSafeReducedMotion();

  const getRelatedItems = (itemId) => {
    const currentItem = items.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) {
      return false;
    }

    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const centerViewOnNode = (nodeId) => {
    if (!nodeRefs.current[nodeId]) {
      return;
    }

    const nodeIndex = items.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / items.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id) => {
    setExpandedItems((previous) => {
      const isOpening = !previous[id];
      const nextState = {};

      items.forEach((item) => {
        nextState[item.id] = item.id === id ? isOpening : false;
      });

      if (isOpening) {
        setActiveNodeId(id);
        setAutoRotate(false);
        setPulseEffect(
          getRelatedItems(id).reduce((related, relatedId) => {
            related[relatedId] = true;
            return related;
          }, {})
        );
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return nextState;
    });
  };

  const handleContainerClick = (event) => {
    if (event.target === containerRef.current || event.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  useEffect(() => {
    if (!autoRotate || shouldReduceMotion) {
      return undefined;
    }

    const rotationTimer = window.setInterval(() => {
      setRotationAngle((previous) => Number(((previous + 0.28) % 360).toFixed(3)));
    }, 50);

    return () => window.clearInterval(rotationTimer);
  }, [autoRotate, shouldReduceMotion]);

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 190;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.45,
      Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, zIndex, opacity };
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative h-[760px] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] opacity-70" />

      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 shadow-[0_0_48px_rgba(34,211,238,0.42)]">
          <div className="absolute h-28 w-28 animate-ping rounded-full border border-cyan-200/20" />
          <div
            className="absolute h-36 w-36 animate-ping rounded-full border border-fuchsia-200/10"
            style={{ animationDelay: "0.5s" }}
          />
          <div className="h-9 w-9 rounded-full bg-white/85 backdrop-blur-md" />
        </div>

        <div className="absolute h-[24rem] w-[24rem] rounded-full border border-white/10" />
        <div className="absolute h-[17rem] w-[17rem] rounded-full border border-cyan-300/10" />

        {items.map((item, index) => {
          const position = calculateNodePosition(index, items.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              ref={(element) => {
                nodeRefs.current[item.id] = element;
              }}
              className="absolute transition-all duration-700"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleItem(item.id);
                }}
                className="group relative flex flex-col items-center"
                aria-expanded={Boolean(isExpanded)}
              >
                <span
                  className={cn(
                    "absolute -inset-2 rounded-full",
                    isPulsing ? "animate-pulse" : ""
                  )}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.45 + 44}px`,
                    height: `${item.energy * 0.45 + 44}px`,
                    left: `-${(item.energy * 0.45 + 44 - 40) / 2}px`,
                    top: `-${(item.energy * 0.45 + 44 - 40) / 2}px`,
                  }}
                />

                <span
                  className={cn(
                    "relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isExpanded
                      ? "scale-150 border-white bg-white text-black shadow-[0_0_34px_rgba(255,255,255,0.35)]"
                      : isRelated
                      ? "border-cyan-200 bg-cyan-200/70 text-black"
                      : "border-white/35 bg-black text-white group-hover:border-cyan-200/70"
                  )}
                >
                  <Icon size={18} />
                </span>

                <span
                  className={cn(
                    "absolute top-14 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300",
                    isExpanded ? "scale-110 text-white" : "text-white/65"
                  )}
                >
                  {item.title}
                </span>
              </button>

              {isExpanded && (
                <div className="absolute left-1/2 top-24 w-72 -translate-x-1/2 overflow-visible rounded-[1.35rem] border border-white/20 bg-black/90 p-4 text-white shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  <div className="absolute -top-4 left-1/2 h-4 w-px -translate-x-1/2 bg-white/40" />

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
                        getStatusStyles(item.status)
                      )}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                    <span className="font-mono text-xs text-white/45">{item.date}</span>
                  </div>

                  <h3 className="mt-4 text-base font-black tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-white/75">{item.content}</p>

                  <div className="mt-4 border-t border-white/10 pt-3">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="flex items-center text-white/75">
                        <Zap size={11} className="mr-1" />
                        Energy Level
                      </span>
                      <span className="font-mono text-cyan-200">{item.energy}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
                        style={{ width: `${item.energy}%` }}
                      />
                    </div>
                  </div>

                  {item.relatedIds.length > 0 && (
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <div className="mb-2 flex items-center">
                        <Link size={11} className="mr-1 text-white/65" />
                        <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/65">
                          Connected Nodes
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.relatedIds.map((relatedId) => {
                          const relatedItem = items.find((entry) => entry.id === relatedId);

                          return (
                            <ShinyButton
                              key={relatedId}
                              className="rounded-md px-2 py-1 text-[10px] normal-case tracking-normal"
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleItem(relatedId);
                              }}
                            >
                              {relatedItem?.title}
                              <ArrowRight size={10} />
                            </ShinyButton>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TechSkills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-[1600px] overflow-hidden px-8 py-32 md:px-10 md:py-36 xl:px-16"
    >
      <SectionDivider className="via-cyan-300/30" />
      <MatrixBackdrop />

      <SectionReveal className="relative z-10 mb-12">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.32em] text-cyan-100">
            <Zap size={14} />
            Orbital_Tech_Stack
          </div>

          <div className="space-y-4">
            <h2 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-[-0.06em] text-white md:text-6xl">
              Technical{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
                Orbit
              </span>
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
              Click a node to inspect a tool, pause the orbit, and reveal the
              related skills that connect with it.
            </p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="relative z-10" delay={0.08} y={38} scale={0.985} amount={0.14}>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </SectionReveal>
    </section>
  );
}
