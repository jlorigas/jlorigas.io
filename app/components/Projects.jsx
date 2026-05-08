"use client";

import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";
import AnimatedShowcase from "./ui/animated-showcase";
import codeExplainerImage from "../../public/Projects/code-explainer-workspace.svg";
import guysAndGalsImage from "../../public/Projects/Guys and Gals proj.png";
import sentraImage from "../../public/Projects/Sentra.png";

const projects = [
  {
    id: "PROJECT-03",
    eyebrow: "PHASE_1_ACCESS",
    status: "LIVE",
    statusClassName: "border-green-500/20 bg-green-500/10 text-green-300",
    title: "Code Explainer Workspace",
    subtitle: "Next.js, TypeScript, Supabase",
    description:
      "A project I built to help users upload code and get clearer explanations, while also helping me practice full-stack features and AI integration.",
    image: codeExplainerImage,
    tags: ["Next.js", "TypeScript", "Code Analysis"],
    details: [
      { label: "Focus", value: "Easy-to-read code explanations" },
      { label: "Practice", value: "Auth, uploads, and saved history" },
      { label: "Outcome", value: "A helpful learning workspace" },
    ],
    primaryAction: {
      label: "Launch Site",
      href: "https://ai-code-reader.vercel.app/",
    },
    secondaryAction: {
      label: "Open Demo",
      href: "https://ai-code-reader.vercel.app/",
    },
  },
  {
    id: "PROJECT-01",
    eyebrow: "PROJECT_DEPLOYMENT_01",
    status: "LIVE",
    statusClassName: "border-green-500/20 bg-green-500/10 text-green-300",
    title: "Guys and Gals Salon Booking Website",
    subtitle: "Booking Platform, Responsive UX",
    description:
      "A booking website project focused on making the salon experience easier to use, especially for mobile users and first-time visitors.",
    image: guysAndGalsImage,
    tags: ["Next.js", "Scheduling", "UI/UX"],
    details: [
      { label: "Goal", value: "Make booking simpler and clearer" },
      { label: "Design", value: "Mobile-first layout and flow" },
      { label: "Value", value: "A smoother reservation experience" },
    ],
    primaryAction: {
      label: "Launch Site",
      href: "https://guys-gals-salon.vercel.app/",
    },
    secondaryAction: {
      label: "Open Demo",
      href: "https://guys-gals-salon.vercel.app/",
    },
  },
  {
    id: "PROJECT-02",
    eyebrow: "PROJECT_DEPLOYMENT_02",
    status: "PRIVATE",
    statusClassName: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    title: "Sentra - Head Monitoring System",
    subtitle: "AI Monitoring, Computer Vision Concept",
    description:
      "A concept project exploring how head-position tracking could help support online assessment monitoring and exam review.",
    image: sentraImage,
    tags: ["AI", "Monitoring System"],
    details: [
      { label: "Signal", value: "Head orientation tracking" },
      { label: "Use Case", value: "Online assessment support" },
      { label: "Status", value: "Private concept project" },
    ],
    primaryAction: {
      label: "Private Build",
      href: "",
    },
    secondaryAction: {
      label: "Case Study Preview",
      href: "",
    },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="space-y-3">
          <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-blue-300">
            <FolderKanban size={14} />
            <span>Active_Project_Archive</span>
            
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
          A collection of projects I built to practice my skills, solve real
          problems, and keep learning through hands-on experience.
        </p>
      </motion.div>

      <AnimatedShowcase items={projects} thumbnailGridClassName="md:grid-cols-2 xl:grid-cols-3" />
    </section>
  );
}
