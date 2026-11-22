import Link from "next/link";
import { ViewTransition } from "react";
import { projects } from "@/data/content";
import { ProjectVisual } from "./visuals/ProjectVisual";
import { SectionHead } from "./SectionHead";

/** Sticky stacking deck. Each card pins under the previous one; a CSS
 *  scroll-driven timeline on the deck shrinks and dims the card being
 *  covered. The visual carries a shared view-transition name so it morphs
 *  into the case-study hero. */
export function ProjectDeck() {
  return (
    <section id="work" className="relative pt-28 pb-24 md:pt-36">
      <SectionHead title="Selected work" />
      <div className="deck mt-12 md:mt-16">
        {projects.map((p, i) => (
          <article key={p.slug} className="deck-card" style={{ ["--i" as string]: i }}>
            <Link
              href={`/work/${p.slug}`}
              transitionTypes={["nav-forward"]}
              className="group grid h-full grid-rows-[auto_1fr] gap-5 rounded-[18px] border border-line bg-surface p-4 shadow-[0_-18px_40px_-24px_rgb(0_0_0/0.9)] transition-colors duration-300 hover:border-line-strong md:grid-cols-[1.12fr_1fr] md:grid-rows-1 md:gap-7 md:p-5"
            >
              <ViewTransition name={`work-${p.slug}`} share="morph" default="none">
                <div className="@container relative aspect-[16/10] w-full self-center overflow-hidden rounded-xl ring-1 ring-line">
                  <ProjectVisual visual={p.visual} />
                </div>
              </ViewTransition>

              <div className="flex min-w-0 flex-col py-1 md:py-2">
                <p className="label">
                  {String(i + 1).padStart(2, "0")}
                  <span className="ml-3 text-dim">{p.role}</span>
                </p>
                <h3 className="mt-3 font-title text-[26px] font-semibold leading-tight tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-fg/70">{p.subtitle}</p>
                <p className="mt-4 line-clamp-3 text-[14.5px] leading-relaxed text-muted">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="mt-auto pt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-fg/80">
                  Case study{" "}
                  <span className="inline-block text-amber transition-transform duration-300 ease-[var(--ease)] group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
            <div className="deck-dim" />
          </article>
        ))}
      </div>
    </section>
  );
}
