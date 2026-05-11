"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  FileText,
  Github,
  Mail,
  Send,
  X,
} from "lucide-react";
import { withBasePath } from "../lib/base-path";
import { useOutsideClick } from "../hooks/use-outside-click";
import SectionDivider from "./ui/section-divider";
import { SectionReveal } from "./ui/section-reveal";

const EMAIL_ADDRESS = "jomarlopezlorigas@gmail.com";
const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "Cxo8ShMswU_JhFOKe";
const EMAILJS_SERVICE_ID = 
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_fb31ivp";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_sdxop6h";

const contactLinks = [
  {
    id: "email",
    label: "Email",
    icon: Mail,
    action: "overlay",
    hoverClassName:
      "group-hover:border-cyan-300/60 group-hover:bg-cyan-400 group-hover:text-black group-hover:shadow-[0_0_32px_rgba(34,211,238,0.42)]",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/jlorigas",
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
];

const initialEmailForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "JV";
}

function getMessageTimeLabel() {
  return new Date().toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Contact() {
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [emailForm, setEmailForm] = useState(initialEmailForm);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: "idle",
    message: "",
  });
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const isEmailServiceConfigured = Boolean(
    EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID
  );
  const messageLength = emailForm.message.trim().length;
  const canSubmit =
    emailForm.name.trim() &&
    emailForm.email.trim() &&
    emailForm.subject.trim() &&
    emailForm.message.trim() &&
    !isSubmitting;

  useOutsideClick(modalRef, () => {
    if (isEmailModalOpen) {
      setEmailModalOpen(false);
    }
  });

  useEffect(() => {
    if (!isEmailModalOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setEmailModalOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isEmailModalOpen]);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!isEmailModalOpen || submitStatus.type === "success") {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      firstInputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isEmailModalOpen, submitStatus.type]);

  const openEmailModal = () => {
    setEmailForm(initialEmailForm);
    setCopied(false);
    setSubmitStatus({ type: "idle", message: "" });
    setEmailModalOpen(true);
  };

  const updateEmailForm = (field) => (event) => {
    if (submitStatus.type !== "idle") {
      setSubmitStatus({ type: "idle", message: "" });
    }

    setEmailForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailServiceConfigured) {
      setSubmitStatus({
        type: "error",
        message:
          "Email sending still needs your EmailJS public key to be added.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "idle", message: "" });

    try {
      const response = await fetch(EMAILJS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: EMAIL_ADDRESS,
            from_name: emailForm.name.trim() || "Portfolio Visitor",
            from_email: emailForm.email.trim(),
            title: emailForm.subject.trim() || "Portfolio inquiry",
            name: emailForm.name.trim() || "Portfolio Visitor",
            initials: getInitials(emailForm.name),
            time: getMessageTimeLabel(),
            subject: emailForm.subject.trim() || "Portfolio inquiry",
            message: emailForm.message.trim(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Email service rejected the request.");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully. I will see it in my inbox.",
      });
      setEmailForm(initialEmailForm);
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "Message could not be sent right now. Please try again in a moment or use the copy email button.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;
                const buttonContent = (
                  <>
                    <span
                      className={[
                        "flex h-18 w-18 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white shadow-[0_10px_30px_rgba(0,0,0,0.34)] backdrop-blur-sm transition duration-300 md:h-20 md:w-20",
                        "group-hover:-translate-y-2 group-hover:scale-105",
                        item.hoverClassName,
                      ].join(" ")}
                    >
                      <Icon size={28} strokeWidth={1.9} />
                    </span>
                    <span className="mt-4 text-sm font-semibold text-white/80 transition group-hover:text-white">
                      {item.label}
                    </span>
                  </>
                );

                if (item.action === "overlay") {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={openEmailModal}
                      className="group flex flex-col items-center text-center"
                    >
                      {buttonContent}
                    </button>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noreferrer" : undefined}
                    className="group flex flex-col items-center text-center"
                  >
                    {buttonContent}
                  </a>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </section>

      <AnimatePresence>
        {isEmailModalOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-[#02040a]/82 backdrop-blur-md"
            />

            <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 md:p-6">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,24,0.96),rgba(4,7,16,0.98))] shadow-[0_24px_120px_rgba(0,0,0,0.58)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.16),transparent_30%)]" />
                <div className="relative z-10 border-b border-white/10 px-6 py-5 md:px-8">
                  <button
                    type="button"
                    onClick={() => setEmailModalOpen(false)}
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                    aria-label="Close email overlay"
                  >
                    <X size={18} />
                  </button>

                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/80">
                    Direct_Message
                  </p>
                  <h3 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                    Send me an email
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300 md:text-base">
                    Fill this out to send a message directly from the site.
                  </p>
                </div>

                <div className="relative z-10 grid min-h-0 flex-1 xl:grid-cols-[0.72fr_1.28fr]">
                  <div className="border-b border-white/10 bg-white/[0.03] p-5 xl:border-b-0 xl:border-r xl:p-6">
                    <div className="rounded-[1.3rem] border border-cyan-300/15 bg-cyan-300/[0.08] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/85">
                        Delivery Route
                      </p>
                      <p className="mt-3 text-sm font-semibold text-white">
                        Direct to my inbox
                      </p>
                      <p className="mt-2 break-all font-mono text-xs text-cyan-100/80">
                        {EMAIL_ADDRESS}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-sm font-semibold text-white/85 transition hover:border-cyan-300/40 hover:text-white"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "Copied" : "Copy email"}
                      </button>
                    </div>
                  </div>

                  <div className="min-h-0 overflow-y-auto">
                    {submitStatus.type === "success" ? (
                      <div className="flex h-full min-h-[420px] flex-col justify-center px-6 py-8 md:px-8">
                        <div className="mx-auto max-w-md rounded-[1.8rem] border border-emerald-300/20 bg-emerald-400/10 p-6 text-center shadow-[0_0_40px_rgba(16,185,129,0.12)]">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/15 text-emerald-200">
                            <Check size={24} />
                          </div>
                          <h4 className="mt-5 text-2xl font-black tracking-tight text-white">
                            Message sent
                          </h4>
                          <p className="mt-3 text-sm leading-6 text-gray-300">
                            {submitStatus.message}
                          </p>
                          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                              type="button"
                              onClick={openEmailModal}
                              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:text-cyan-100"
                            >
                              Send another message
                            </button>
                            <button
                              type="button"
                              onClick={() => setEmailModalOpen(false)}
                              className="inline-flex items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/12 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/55 hover:bg-cyan-300/18"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleEmailSubmit}
                        className="grid gap-5 px-6 py-6 md:px-8 md:py-7"
                      >
                        {submitStatus.type === "error" ? (
                          <div className="rounded-[1.3rem] border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-200">
                            {submitStatus.message}
                          </div>
                        ) : null}

                        <div className="grid gap-4 xl:grid-cols-2">
                          <label className="grid min-w-0 content-start gap-2">
                            <span className="text-sm font-semibold text-white/90">
                              Your name
                            </span>
                            <input
                              ref={firstInputRef}
                              type="text"
                              required
                              autoComplete="name"
                              value={emailForm.name}
                              onChange={updateEmailForm("name")}
                              placeholder="Name"
                              className="h-12 min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/50 focus:bg-white/[0.06]"
                            />
                          </label>

                          <label className="grid min-w-0 content-start gap-2">
                            <span className="text-sm font-semibold text-white/90">
                              Your email
                            </span>
                            <input
                              type="email"
                              required
                              autoComplete="email"
                              value={emailForm.email}
                              onChange={updateEmailForm("email")}
                              placeholder="Gmail"
                              className="h-12 min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/50 focus:bg-white/[0.06]"
                            />
                          </label>
                        </div>

                        <label className="grid gap-2">
                          <span className="text-sm font-semibold text-white/90">
                            Subject
                          </span>
                          <input
                            type="text"
                            required
                            value={emailForm.subject}
                            onChange={updateEmailForm("subject")}
                            placeholder="Project inquiry, collaboration, or job opportunity"
                            className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/50 focus:bg-white/[0.06]"
                          />
                        </label>

                        <label className="grid gap-2">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-white/90">
                              Message
                            </span>
                            <span className="text-xs text-gray-500">
                              {messageLength}/1200
                            </span>
                          </div>
                          <textarea
                            required
                            maxLength={1200}
                            value={emailForm.message}
                            onChange={updateEmailForm("message")}
                            placeholder="Tell me a bit about your project, role, or question..."
                            rows={7}
                            className="resize-none rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/50 focus:bg-white/[0.06]"
                          />
                        </label>


                        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs leading-5 text-gray-500">
                            Required fields help keep replies fast and organized.
                          </p>
                          <button
                            type="submit"
                            disabled={!canSubmit}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/12 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/55 hover:bg-cyan-300/18 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Mail size={16} />
                            {isSubmitting ? "Sending..." : "Send message"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
