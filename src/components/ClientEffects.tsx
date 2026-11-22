"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { SCROLL_TARGET_KEY } from "./BackToWork";

/** Clears <html data-intro> after the first-load preloader, so later
 *  client navigations back to "/" don't wait for it again. */
export function IntroDone() {
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.removeAttribute("data-intro"), 2600);
    return () => clearTimeout(t);
  }, []);
  return null;
}

/** Lenis smooth scroll with animated in-page anchor links. Off for
 *  reduced-motion users; touch scrolling stays native. */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true, syncTouch: false });
    lenisRef.current = lenis;
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      const href = a?.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector<HTMLElement>(href);
      if (!el) return;
      e.preventDefault();
      // Scroll only; don't write the #hash into the URL, or a reload would
      // reopen the page at that section instead of the hero.
      lenis.scrollTo(el, { offset: -8, duration: 1.2, easing: (x) => 1 - Math.pow(1 - x, 4) });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On route change, jump (not glide) to the top or to the #hash target,
  // so Lenis' interpolated position can't drag the new page off its start.
  // Then drop the #hash (e.g. from "← All work" → /#work) so a later reload
  // starts at the hero. history.state is kept because the router uses it.
  // A section to land on can come from "← All work" (via sessionStorage) or
  // from a shared /#section link; a shared hash is cleared after a short
  // delay (once the browser has scrolled to it).
  useEffect(() => {
    let target: string | null = null;
    try {
      target = sessionStorage.getItem(SCROLL_TARGET_KEY);
      sessionStorage.removeItem(SCROLL_TARGET_KEY);
    } catch {
      /* storage blocked */
    }
    const el = target
      ? document.getElementById(target)
      : location.hash
        ? document.querySelector<HTMLElement>(location.hash)
        : null;
    const jump = () => {
      if (lenisRef.current) lenisRef.current.scrollTo(el ?? 0, { immediate: true, force: true });
      else if (el) el.scrollIntoView();
    };
    jump();
    // Next may run its own scroll-to-top after this commit; re-assert once.
    const raf = requestAnimationFrame(() => el && jump());
    if (!location.hash) return () => cancelAnimationFrame(raf);
    const t = setTimeout(() => {
      history.replaceState(history.state, "", location.pathname + location.search);
    }, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
