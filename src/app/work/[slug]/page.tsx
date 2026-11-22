import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { projects } from "@/data/content";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { BackToWork } from "@/components/BackToWork";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — Tanim Ahmed`, description: p.blurb } : {};
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="intro-delay mx-auto w-full max-w-[1180px] px-5 pb-20 md:px-10">
      {/* Top bar */}
      <header className="flex items-center justify-between py-6">
        <BackToWork className="group font-mono text-[12px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg">
          <span className="mr-2 inline-block text-amber transition-transform duration-300 group-hover:-translate-x-1">←</span>
          All work
        </BackToWork>
        <span className="label">{String(index + 1).padStart(2, "0")}</span>
      </header>

      {/* Title card */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-16">
        <p className="label rise">{p.role} · {p.year}</p>
        <h1 className="rise mt-5 max-w-[16ch] font-title text-[clamp(2.4rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.025em]" style={{ ["--delay" as string]: "0.06s" }}>
          {p.title}
        </h1>
        <p className="rise mt-5 max-w-[52ch] text-lg leading-relaxed text-muted" style={{ ["--delay" as string]: "0.12s" }}>
          {p.subtitle}. {p.blurb}
        </p>
        <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ ["--delay" as string]: "0.18s" }}>
          <a
            href={p.repo}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-amber"
          >
            View on GitHub ↗
          </a>
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg/90 transition-colors hover:border-fg"
            >
              Live site ↗
            </a>
          )}
        </div>
      </section>

      {/* Hero visual — same view-transition name as the deck card */}
      <ViewTransition name={`work-${p.slug}`} share="morph" default="none">
        <div className="@container relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-line">
          <ProjectVisual visual={p.visual} />
        </div>
      </ViewTransition>

      {/* Metrics */}
      {p.metrics && (
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="reveal rounded-2xl border border-line bg-surface p-6">
              <p className="font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-none tabular-nums text-amber">{m.value}</p>
              <p className="mt-3 text-sm text-muted">{m.label}</p>
            </div>
          ))}
        </section>
      )}

      {/* Narrative */}
      <section className="mt-24 grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:gap-16">
        <div className="md:sticky md:top-10 md:self-start">
          <p className="label">The problem</p>
          <div className="mt-6 hidden md:block">
            <p className="label">Stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="reveal text-[clamp(1.2rem,2.4vw,1.6rem)] leading-snug text-fg/90">{p.problem}</p>
          <div className="mt-6 flex flex-wrap gap-1.5 md:hidden">
            {p.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <ol className="mt-16 space-y-12">
            {p.approach.map((a, i) => (
              <li key={a.title} className="reveal grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2">
                <span className="font-mono text-xs leading-7 text-amber">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-title text-xl font-semibold">{a.title}</h2>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{a.body}</p>
                </div>
              </li>
            ))}
          </ol>
          {p.highlights.length > 0 && (
            <div className="reveal mt-16 rounded-2xl border border-line bg-surface p-6">
              <p className="label">Also in the box</p>
              <ul className="mt-4 space-y-2.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] text-fg/85">
                    <span className="mt-[10px] h-px w-3 shrink-0 bg-amber" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Next project */}
      <section className="mt-32 border-t border-line pt-10">
        <p className="label">Next project</p>
        <Link
          href={`/work/${next.slug}`}
          transitionTypes={["nav-forward"]}
          className="group mt-6 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div>
            <h2 className="font-title text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.02em] transition-colors group-hover:text-amber">
              {next.title}
            </h2>
            <p className="mt-3 text-muted">{next.subtitle}</p>
          </div>
          <ViewTransition name={`work-${next.slug}`} share="morph" default="none">
            <div className="@container relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-line transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-y-1">
              <ProjectVisual visual={next.visual} />
            </div>
          </ViewTransition>
        </Link>
      </section>
    </main>
  );
}
