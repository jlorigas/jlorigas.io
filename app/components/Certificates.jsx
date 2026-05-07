"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import AnimatedShowcase from "./ui/animated-showcase";
import { withBasePath } from "../lib/base-path";

const certificates = [
  {
    id: "CERT-SQL-882",
    eyebrow: "VERIFIED_CREDENTIAL",
    status: "ACTIVE",
    statusClassName: "border-green-500/20 bg-green-500/10 text-green-300",
    title: "Introduction to SQL",
    subtitle: "Simplilearn Credential",
    description:
      "A beginner-friendly SQL certificate that helped me strengthen my understanding of queries, tables, and relational databases.",
    image: withBasePath("/Certificates/sqlcert.jpg"),
    tags: ["SQL", "Databases", "Queries"],
    details: [
      { label: "Issuer", value: "Simplilearn" },
      { label: "Credential", value: "CERT-SQL-882" },
      { label: "Coverage", value: "Queries, tables, and SQL basics" },
    ],
    primaryAction: {
      label: "Open Certificate",
      href: withBasePath("/Certificates/Sql Cert.pdf"),
    },
    secondaryAction: {
      label: "View PDF",
      href: withBasePath("/Certificates/Sql Cert.pdf"),
    },
  },
  {
    id: "CERT-PHP-441",
    eyebrow: "VERIFIED_CREDENTIAL",
    status: "ACTIVE",
    statusClassName: "border-green-500/20 bg-green-500/10 text-green-300",
    title: "Build CMS Blog using PHP & MySQL",
    subtitle: "Udemy Credential",
    description:
      "A practical course certificate where I learned more about PHP, MySQL, CRUD features, and simple CMS-style development.",
    image: withBasePath("/Certificates/PHP.jpg"),
    tags: ["PHP", "MySQL", "CMS"],
    details: [
      { label: "Issuer", value: "Udemy" },
      { label: "Credential", value: "CERT-PHP-441" },
      { label: "Coverage", value: "PHP, MySQL, CRUD, and admin flow" },
    ],
    primaryAction: {
      label: "Open Certificate",
      href: withBasePath("/Certificates/IMcert.pdf"),
    },
    secondaryAction: {
      label: "View PDF",
      href: withBasePath("/Certificates/IMcert.pdf"),
    },
  },
];

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-28"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 mb-16 text-center lg:text-left"
      >
        <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-400 font-mono text-[10px] mb-3 uppercase tracking-[0.4em]">
          <ShieldCheck size={14} />
          <span>Learning_Certificates</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
          Certifi<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">cations</span>
        </h2>
      </motion.div>

      <div className="relative z-10">
        <AnimatedShowcase
          items={certificates}
          autoPlay={false}
          thumbnailGridClassName="md:grid-cols-2"
        />
      </div>

      {/* Vault Footer Info */}
      <div className="mt-12 text-center">
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
          Learning Progress:{" "}
          <span className="text-green-500/50">Ongoing</span>
          <span className="text-gray-600"> | More to come</span>
        </p>
      </div>
    </section>
  );
}
