"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { CardStack } from "@/components/SocialSharing";
import { withBasePath } from "../lib/base-path";
import SectionDivider from "./ui/section-divider";
import { SectionReveal } from "./ui/section-reveal";
import sqlCertificateImage from "../../public/Certificates/sqlcert.jpg";
import phpCertificateImage from "../../public/Certificates/PHP.jpg";

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
    image: sqlCertificateImage,
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
    image: phpCertificateImage,
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

function useCertificateStackSize() {
  const [size, setSize] = useState({
    cardWidth: 520,
    cardHeight: 340,
    maxVisible: 3,
    overlap: 0.52,
    spreadDeg: 34,
  });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setSize({
          cardWidth: Math.max(280, Math.min(340, width - 48)),
          cardHeight: 390,
          maxVisible: 1,
          overlap: 0.56,
          spreadDeg: 0,
        });
        return;
      }

      if (width < 1024) {
        setSize({
          cardWidth: Math.min(460, width - 96),
          cardHeight: 340,
          maxVisible: 3,
          overlap: 0.68,
          spreadDeg: 24,
        });
        return;
      }

      setSize({
        cardWidth: 520,
        cardHeight: 340,
        maxVisible: 3,
        overlap: 0.52,
        spreadDeg: 34,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

function CertificateStackCard({ certificate, active }) {
  const action = certificate.primaryAction;

  return (
    <article className="group relative h-full w-full overflow-hidden bg-[#05070d]">
      <Image
        src={certificate.image}
        alt={certificate.title}
        fill
        sizes="(max-width: 640px) 340px, 520px"
        className="object-cover object-center transition duration-700 group-hover:scale-105"
        priority={active}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030408] via-[#030408]/50 to-[#030408]/10" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.16),transparent_38%,rgba(99,102,241,0.14))]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="max-w-[72%] rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-sm">
            {certificate.eyebrow}
          </span>
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] backdrop-blur-sm ${certificate.statusClassName}`}
          >
            {certificate.status}
          </span>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {certificate.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
            {certificate.title}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/85">
            {certificate.subtitle}
          </p>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-300">
            {certificate.description}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="min-w-0 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
              {certificate.id}
            </div>
            <a
              href={action.href}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
            >
              <ExternalLink size={14} />
              {action.label}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Certificates() {
  const stackSize = useCertificateStackSize();
  const stackItems = useMemo(
    () =>
      certificates.map((certificate) => ({
        id: certificate.id,
        title: certificate.title,
        description: certificate.description,
        imageSrc: certificate.image.src,
        href: certificate.primaryAction.href,
        tag: certificate.status,
        certificate,
      })),
    []
  );

  return (
    <section
      id="certificates"
      className="relative mx-auto max-w-[1600px] overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32 xl:px-16"
    >
      <SectionDivider className="via-blue-400/30" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[140px]" />

      <SectionReveal
        className="relative z-10 mb-16 text-center lg:text-left"
        y={30}
        amount={0.24}
      >
        <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-400 font-mono text-[10px] mb-3 uppercase tracking-[0.4em]">
          <ShieldCheck size={14} />
          <span>Learning_Certificates</span>
        </div>
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase sm:text-4xl md:text-6xl">
          Certifi<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">cations</span>
        </h2>
      </SectionReveal>

      <SectionReveal className="relative z-10" delay={0.06} y={38} scale={0.985} amount={0.14}>
        <CardStack
          items={stackItems}
          {...stackSize}
          activeLiftPx={28}
          activeScale={1.02}
          inactiveScale={0.92}
          depthPx={110}
          tiltXDeg={8}
          autoAdvance={false}
          renderCard={(item, state) => (
            <CertificateStackCard
              certificate={item.certificate}
              active={state.active}
            />
          )}
        />
      </SectionReveal>

      {/* Vault Footer Info */}
      <SectionReveal className="mt-12 text-center" delay={0.1} y={18} amount={0.4}>
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
          Learning Progress:{" "}
          <span className="text-green-500/50">Ongoing</span>
          <span className="text-gray-600"> | More to come</span>
        </p>
      </SectionReveal>
    </section>
  );
}
