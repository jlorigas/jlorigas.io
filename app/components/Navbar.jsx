"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Code2,
  FolderKanban,
  House,
  Mail,
  UserRound,
} from "lucide-react";

import { FloatingDock } from "@/components/ui/floating-dock";

const navLinks = [
  {
    name: "About",
    id: "about",
    icon: <UserRound className="h-full w-full" />,
  },
  {
    name: "Skills",
    id: "skills",
    icon: <Code2 className="h-full w-full" />,
  },
  {
    name: "Projects",
    id: "projects",
    icon: <FolderKanban className="h-full w-full" />,
  },
  {
    name: "Certificates",
    id: "certificates",
    icon: <Award className="h-full w-full" />,
  },
  {
    name: "Contact",
    id: "contact",
    icon: <Mail className="h-full w-full" />,
  },
];

const NAV_SCROLL_OFFSET = 32;
const ACTIVE_TRACK_OFFSET = 160;

function scrollPage(targetTop) {
  const nextTop = Math.max(0, targetTop);

  if (window.__lenis) {
    window.__lenis.scrollTo(nextTop, {
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    return;
  }

  window.scrollTo({ top: nextTop, behavior: "smooth" });
}

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const updateNavbarState = () => {
      const scrollPosition = window.scrollY + ACTIVE_TRACK_OFFSET;
      let nextActive = "home";

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          nextActive = section.id;
        }
      });

      setActive(nextActive);
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateNavbarState();
        ticking = false;
      });
    };

    updateNavbarState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateNavbarState);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateNavbarState);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      const targetId = window.location.hash.replace("#", "");
      const section = document.getElementById(targetId);

      if (!section) {
        return;
      }

      const targetTop =
        section.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;

      scrollPage(targetTop);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const scrollToSection = (targetId) => {
    const section = document.getElementById(targetId);

    if (!section) {
      return;
    }

    const targetTop =
      section.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;

    window.history.replaceState(null, "", `#${targetId}`);
    scrollPage(targetTop);
    setActive(targetId);
  };

  const scrollToTop = () => {
    window.history.replaceState(null, "", "#");
    scrollPage(0);
    setActive("home");
  };

  const items = [
    {
      title: "Home",
      icon: <House className="h-full w-full" />,
      onClick: scrollToTop,
      isActive: active === "home",
    },
    ...navLinks.map((link) => ({
      title: link.name,
      icon: link.icon,
      onClick: () => scrollToSection(link.id),
      isActive: active === link.id,
    })),
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4">
      <div className="pointer-events-auto">
        <FloatingDock
          items={items}
          desktopClassName="w-fit"
          mobileClassName="w-fit"
        />
      </div>
    </div>
  );
}
