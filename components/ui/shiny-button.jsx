"use client";

import { cloneElement, isValidElement } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ShinyButton({
  children,
  className = "",
  disabled = false,
  asChild = false,
  ...props
}) {
  const baseClassName = cn(
    "group/shiny relative inline-flex items-center justify-center overflow-hidden rounded-full border border-cyan-300/25 bg-[linear-gradient(110deg,rgba(14,165,233,0.22),rgba(255,255,255,0.06),rgba(34,211,238,0.18))] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-50 shadow-[0_0_26px_rgba(34,211,238,0.14)] transition duration-300 hover:border-cyan-200/45 hover:bg-cyan-400/15 hover:shadow-[0_0_34px_rgba(34,211,238,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50",
    className
  );

  const shine = (
    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] transition-transform duration-1000 group-hover/shiny:translate-x-full" />
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      className: cn(baseClassName, children.props.className),
      children: (
        <>
          {shine}
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {children.props.children}
          </span>
        </>
      ),
    });
  }

  return (
    <button type="button" className={baseClassName} disabled={disabled} {...props}>
      {shine}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
