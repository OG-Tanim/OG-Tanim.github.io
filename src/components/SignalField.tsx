"use client";

import { useEffect, useRef } from "react";

/** Deterministic PRNG so the field is stable and lint-pure. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type P = { bx: number; by: number; x: number; y: number; ph: number; sp: number; r: number; a: number };


/** Hero background: a field of drifting points that part around the cursor.
 *  Per-frame values live in refs/closures, never React state. */
export function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry32(20261122);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let pts: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(260, Math.round((w * h) / 5200));
      pts = Array.from({ length: n }, () => {
        const bx = rand() * w;
        const by = rand() * h;
        return { bx, by, x: bx, y: by, ph: rand() * Math.PI * 2, sp: 0.15 + rand() * 0.35, r: 0.6 + rand() * 1.1, a: 0.12 + rand() * 0.4 };
      });
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const s = t / 1000;
      for (const p of pts) {
        let tx = p.bx + Math.sin(s * p.sp + p.ph) * 14;
        let ty = p.by + Math.cos(s * p.sp * 0.8 + p.ph) * 10;
        const dx = tx - mouse.x;
        const dy = ty - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110) {
          const f = (1 - dist / 110) * 26;
          tx += (dx / (dist || 1)) * f;
          ty += (dy / (dist || 1)) * f;
        }
        p.x += (tx - p.x) * 0.08;
        p.y += (ty - p.y) * 0.08;
        ctx.fillStyle = `rgba(143,216,255,${p.a})`;
        ctx.fillRect(p.x, p.y, p.r, p.r);
      }
    };

    build();
    let raf = 0;
    let visible = true;
    const loop = (t: number) => {
      frame(t);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const start = () => {
      if (!raf && !reduced) raf = requestAnimationFrame(loop);
    };

    if (reduced) frame(0);
    else start();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const onVis = () => !document.hidden && visible && start();
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => {
      build();
      if (reduced) frame(0);
    });
    ro.observe(canvas);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
