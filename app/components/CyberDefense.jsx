"use client";

import { motion } from "framer-motion";
import { Shield, X } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

const defenseSteps = [
  "Scanning anomalous inputs",
  "Locking session boundaries",
  "Restoring trusted system state",
];

export default function CyberDefense({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#02040a]/80 p-6 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#07101b]/95 shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_30%)]" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white transition hover:bg-black/70"
          aria-label="Close cyber defense panel"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200">
            <Shield size={16} />
            Defense Protocol Online
          </div>

          <h3 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
            Threat contained. System integrity preserved.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base">
            This is a small interactive easter egg panel for the hero section.
            It reinforces the cyber-inspired UI direction without pulling users
            away from the portfolio flow.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {defenseSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.1 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300">
                  Phase 0{index + 1}
                </p>
                <p className="mt-3 text-sm text-gray-200">{step}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.div
              animate={{ backgroundPositionX: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="h-2 flex-1 rounded-full border border-white/10 bg-[linear-gradient(90deg,rgba(34,211,238,0.2),rgba(59,130,246,0.7),rgba(168,85,247,0.2))] bg-[length:200%_100%]"
            />
            <ShinyButton onClick={onClose}>
              Return to Portfolio
            </ShinyButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
