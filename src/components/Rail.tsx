"use client";

import { useEffect, useState } from "react";
import { sections } from "@/data/content";

/** Tracks which section straddles the viewport's center line
 *  (height-independent, unlike intersectionRatio). */
function useActiveSection() {
  const [active, setActive] = useState<string>(sections[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return active;
}

export function Rail() {
  const active = useActiveSection();
  return (
    <>
      {/* Desktop: fixed vertical rail */}
      <nav
        aria-label="Sections"
        className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col gap-3.5">
          {sections.map((s) => {
            const on = s.id === active;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className="group flex items-center gap-3"
                >
                  <span
                    className={`block w-[5px] rounded-full transition-all duration-500 ease-[var(--ease)] ${
                      on ? "h-8 bg-amber" : "h-5 bg-white/12 group-hover:bg-white/30"
                    }`}
                  />
                  <span className="relative block h-4 overflow-hidden font-mono text-[11px] font-bold uppercase leading-4 tracking-[0.12em]">
                    <span
                      className={`block transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-y-4 ${
                        on ? "text-fg" : "text-white/25"
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="absolute left-0 top-4 block text-ice transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-y-4">
                      {s.label}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile / tablet: slim top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-bg/95 px-4 lg:hidden">
        <a href="#intro" className="font-display text-[13px] tracking-wide">
          TA<span className="text-amber">.</span>
        </a>
        <span className="label" aria-live="polite">
          <span className="text-amber">/</span> {sections.find((s) => s.id === active)?.label}
        </span>
      </header>
    </>
  );
}
