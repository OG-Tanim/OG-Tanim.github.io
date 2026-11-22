"use client";

import Link from "next/link";

export const SCROLL_TARGET_KEY = "scroll-target";

/** "← All work": returns to the home page and lands on the Work section
 *  without putting #work in the URL, so a later reload starts at the hero. */
export function BackToWork({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <Link
      href="/"
      transitionTypes={["nav-back"]}
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem(SCROLL_TARGET_KEY, "work");
        } catch {
          /* storage blocked: we just land at the top */
        }
      }}
    >
      {children}
    </Link>
  );
}
