import { codeforces, competencies, education, experience, lab, profile, skills } from "@/data/content";
import { SectionHead } from "./SectionHead";

export function Experience() {
  return (
    <section id="experience" className="pt-28 pb-24">
      <SectionHead title="Experience" />
      <ol className="mt-12 space-y-14">
        {experience.map((e, i) => (
          <li key={e.title} className="reveal grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-10">
            <div className="relative pl-7">
              <span className="absolute left-0 top-1.5 flex size-3 items-center justify-center rounded-full border border-line-strong bg-bg">
                {e.current && <span className="size-1.5 rounded-full bg-amber" />}
              </span>
              {i < experience.length - 1 && (
                <span className="absolute left-[5.5px] top-6 -bottom-14 w-px bg-line" />
              )}
              <p className="label">
                {e.when}
                {e.current && <span className="ml-3 text-amber">Current role</span>}
              </p>
              <h3 className="mt-2.5 text-xl font-medium leading-snug text-fg">{e.title}</h3>
              <p className="mt-1 text-sm text-fg/70">
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noopener" className="border-b border-line-strong transition-colors hover:border-amber hover:text-fg">
                    {e.org} ↗
                  </a>
                ) : (
                  e.org
                )}
              </p>
              <p className="mt-0.5 text-sm text-dim">{e.place}</p>
            </div>
            <div>
              <ul className="space-y-3">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span className="mt-[11px] h-px w-3 shrink-0 bg-dim" />
                    {pt}
                  </li>
                ))}
              </ul>
              {e.stack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 pl-6">
                  {e.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="pt-28 pb-24">
      <SectionHead title="Skills" />
      <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map((g) => (
          <div key={g.group} className="reveal">
            <p className="text-sm text-fg/85">{g.group}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Lab() {
  return (
    <section id="lab" className="pt-28 pb-24">
      <SectionHead eyebrow="Experiments & smaller builds" title="Lab" />
      <ul className="mt-6">
        {lab.map((l, i) => (
          <li key={l.name} className="reveal border-b border-line">
            <a
              href={l.href}
              target="_blank"
              rel="noopener"
              className="group grid grid-cols-[2.2rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-5 md:grid-cols-[2.6rem_minmax(0,1.1fr)_minmax(0,1.4fr)_auto]"
            >
              <span className="font-mono text-xs text-dim transition-colors group-hover:text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[17px] text-fg transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-1.5">
                  {l.name}
                </span>
                <span className="mt-1 block text-sm text-muted md:hidden">{l.note}</span>
              </span>
              <span className="hidden text-sm text-muted md:block">{l.note}</span>
              <span className="flex items-center gap-4">
                <span className="hidden font-mono text-[11px] text-dim lg:inline">{l.stack}</span>
                <span className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg">
                  ↗
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 320;
  const h = 96;
  const min = Math.min(...data) - 40;
  const max = Math.max(...data) + 40;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / (max - min)) * h] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const peak = data.indexOf(Math.max(...data));
  const [px, py] = pts[peak];
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg viewBox={`-6 -10 ${w + 12} ${h + 20}`} className="h-auto w-full" role="img" aria-label={`Rating history across ${data.length} contests, peak ${data[peak]}`}>
      <path d={`${d} L${w} ${h} L0 ${h}Z`} className="fill-amber/[0.07]" />
      <path d={d} className="fill-none stroke-amber" strokeWidth="1.5" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" className="fill-bg stroke-amber/70" strokeWidth="1" />
      ))}
      <circle cx={px} cy={py} r="3.5" className="fill-amber" />
      <circle cx={lx} cy={ly} r="3.5" className="fill-ice" />
    </svg>
  );
}

export function Contests() {
  const stats = [
    { v: codeforces.max, l: "Max rating" },
    { v: codeforces.current, l: "Current" },
    { v: codeforces.history.length, l: "Rated contests" },
  ];
  return (
    <section id="contests" className="pt-28 pb-24">
      <SectionHead eyebrow="Codeforces" title="Contests" />
      <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
          {stats.map((s) => (
            <div key={s.l} className="reveal rounded-2xl border border-line bg-surface p-5">
              <p className="font-display text-[clamp(1.4rem,4vw,2.25rem)] leading-none tabular-nums">{s.v}</p>
              <p className="label mt-3">{s.l}</p>
            </div>
          ))}
        </div>
        <a
          href={codeforces.href}
          target="_blank"
          rel="noopener"
          className="reveal group flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-fg">{codeforces.handle}</p>
              <p className="mt-1 text-sm text-muted">
                {codeforces.rank} · 388 → {codeforces.max} in {codeforces.history.length} contests
              </p>
            </div>
            <span className="text-dim transition-colors group-hover:text-fg">↗</span>
          </div>
          <div className="mt-8">
            <Sparkline data={codeforces.history} />
            <div className="mt-3 flex gap-5 font-mono text-[11px] text-dim">
              <span>
                <span className="mr-1.5 inline-block size-2 rounded-full bg-amber align-middle" />
                peak
              </span>
              <span>
                <span className="mr-1.5 inline-block size-2 rounded-full bg-ice align-middle" />
                latest
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export function Connect() {
  return (
    <section id="connect" className="pt-28 pb-16">
      <SectionHead title="Let’s connect" />
      <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="reveal">
          <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted">
            I’m looking for new and exciting opportunities in full-stack development, AI
            engineering, machine learning and DevOps — roles where I can own real systems and keep
            learning fast.
          </p>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted">
            Outside of work, I’m always up for a conversation about tech, software, hardware, hard
            problems and the solutions behind them.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-block font-display text-[clamp(0.95rem,1.9vw,1.55rem)] leading-snug"
          >
            <span className="bg-[linear-gradient(var(--amber),var(--amber))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[var(--ease)] group-hover:bg-[length:100%_1px]">
              {profile.email.split("@")[0]}
              <wbr />@{profile.email.split("@")[1]}
            </span>
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-amber"
            >
              Send an email
            </a>
          </div>
        </div>
        <div className="reveal">
          <p className="label">Elsewhere</p>
          <ul className="mt-4">
            {profile.links.map((l) => (
              <li key={l.label} className="border-b border-line">
                <a href={l.href} target="_blank" rel="noopener" className="group flex items-center justify-between py-3.5">
                  <span className="text-fg/90">{l.label}</span>
                  <span className="flex items-center gap-3 font-mono text-xs text-muted">
                    {l.handle}
                    <span className="text-dim transition-colors group-hover:text-amber">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="mt-24 border-t border-line pt-6 text-center font-mono text-[11px] text-dim">
        © 2026 Tanim Ahmed
      </footer>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="pt-28 pb-24">
      <SectionHead title="Education" />
      <div className="reveal mt-12 grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-10">
        <div>
          <p className="label">{education.when}</p>
          <h3 className="mt-2.5 text-xl font-medium leading-snug text-fg">{education.degree}</h3>
          <p className="mt-1 text-sm text-fg/70">
            {education.school}, {education.place}
          </p>
        </div>
        <div>
          <p className="label">Relevant coursework</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {education.coursework.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <article className="reveal mt-10 rounded-2xl border border-line bg-surface p-6 md:p-7">
        <p className="label">
          <span className="text-amber">Undergraduate thesis</span>
        </p>
        <h3 className="mt-3 font-title text-[22px] font-semibold leading-snug">{education.thesis.title}</h3>
        <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted">{education.thesis.body}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {education.thesis.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}

export function Strengths() {
  return (
    <section id="strengths" className="pt-28 pb-24">
      <SectionHead title="Core competencies" />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {competencies.map((c, i) => (
          <li key={c.title} className="reveal rounded-2xl border border-line bg-surface p-6">
            <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-[17px] font-medium leading-snug text-fg">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
