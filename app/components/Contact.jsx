"use client";

import {
  FileText,
  FolderOpen,
  Github,
  Mail,
  Send,
} from "lucide-react";
import { withBasePath } from "../lib/base-path";
import SectionDivider from "./ui/section-divider";
import { SectionReveal } from "./ui/section-reveal";

const contactLinks = [
  {
    id: "email",
    label: "Email",
    href: "mailto:jomarlopezlorigas@gmail.com",
    icon: Mail,
    hoverClassName:
      "group-hover:border-cyan-300/60 group-hover:bg-cyan-400 group-hover:text-black group-hover:shadow-[0_0_32px_rgba(34,211,238,0.42)]",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/jomarlopezlorigas-arch",
    icon: Github,
    hoverClassName:
      "group-hover:border-white/60 group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_28px_rgba(255,255,255,0.35)]",
  },
  {
    id: "resume",
    label: "Resume",
    href: withBasePath("/Resume.pdf"),
    icon: FileText,
    hoverClassName:
      "group-hover:border-fuchsia-300/60 group-hover:bg-fuchsia-400 group-hover:text-black group-hover:shadow-[0_0_32px_rgba(217,70,239,0.38)]",
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: FolderOpen,
    hoverClassName:
      "group-hover:border-blue-300/60 group-hover:bg-blue-400 group-hover:text-black group-hover:shadow-[0_0_32px_rgba(96,165,250,0.38)]",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-28"
    >
      <SectionDivider className="via-fuchsia-300/25" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(56,189,248,0.12),transparent_20%),radial-gradient(circle_at_80%_15%,rgba(217,70,239,0.12),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.1),transparent_26%)]" />

      <SectionReveal className="relative z-10 mb-16 text-center" y={28} amount={0.24}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-100">
            <Send size={14} />
            Contact_Channel
          </div>

          <h2 className="mb-6 text-5xl font-black tracking-tight text-white md:text-7xl">
            Connect{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400 bg-clip-text text-transparent">
              With Me
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300">
            Reach out for junior opportunities, collaborations, or just to talk
            about projects, frontend work, and full-stack learning.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="relative z-10 mx-auto w-full max-w-4xl" delay={0.06} y={36} scale={0.985} amount={0.16}>
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,24,0.82),rgba(4,7,16,0.94))] p-6 shadow-[0_0_50px_rgba(59,130,246,0.18),0_0_90px_rgba(217,70,239,0.12)] backdrop-blur-2xl md:p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noreferrer" : undefined}
                  className="group flex flex-col items-center text-center"
                >
                  <span
                    className={[
                      "flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white shadow-[0_10px_30px_rgba(0,0,0,0.34)] backdrop-blur-sm transition duration-300",
                      "group-hover:-translate-y-2 group-hover:scale-105",
                      item.hoverClassName,
                    ].join(" ")}
                  >
                    <Icon size={30} />
                  </span>
                  <span className="mt-4 text-sm font-semibold text-white/80 transition group-hover:text-white">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
