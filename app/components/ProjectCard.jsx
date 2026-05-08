"use client";

import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import Image from "next/image";
import { Github, Terminal, Activity } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function ProjectCard({
  title,
  description,
  repo,
  image,
  tech = [],
}) {
  const tiltRef = useRef(null);
  const deploymentId = (title.length % 9) + 1;

  useEffect(() => {
    const tiltNode = tiltRef.current;

    if (!tiltNode) return;

    VanillaTilt.init(tiltNode, {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.02,
    });

    return () => tiltNode?.vanillaTilt?.destroy();
  }, []);

  return (
    <div
      ref={tiltRef}
      className="group relative overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl transition-all hover:border-blue-500/50"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/30" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/30" />
          <div className="h-2 w-2 rounded-full bg-green-500/30" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-gray-500">
          <Terminal size={10} />
          <span>Project_Deployment_0{deploymentId}</span>
        </div>
      </div>

      <div className="relative h-52 overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0">
        <Image
          src={image || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-blue-600/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <ShinyButton asChild className="px-6 py-2 text-sm font-bold">
            <a href={repo} target="_blank" rel="noreferrer">
              <Github size={16} /> Project Link
            </a>
          </ShinyButton>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
            {title}
          </h3>
          <div className="flex items-center gap-1 rounded border border-green-500/20 bg-green-500/10 px-2 py-0.5 font-mono text-[10px] text-green-500">
            <Activity size={8} className="animate-pulse" />
            LIVE
          </div>
        </div>

        <p className="line-clamp-2 text-xs font-light leading-relaxed text-gray-400">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 border-t border-white/5 pt-2">
          {tech.map((t) => (
            <span
              key={t}
              className="border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9px] uppercase tracking-tighter text-blue-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 font-mono text-[8px] text-gray-600">
          <span>ROOT://REPOSITORIES/{title.replace(/\s+/g, "_").toUpperCase()}</span>
          <span>&copy;2026</span>
        </div>
      </div>
    </div>
  );
}
