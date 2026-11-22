import { profile } from "@/data/content";
import { SignalField } from "./SignalField";

/** Vertical role ticker. Keyframes are generated for the exact number of
 *  roles and scoped by name; transform-only, so it stays on the compositor. */
function RoleTicker({ roles }: { roles: string[] }) {
  const n = roles.length;
  const steps: string[] = [];
  for (let i = 0; i < n; i++) {
    const hold = ((i + 0.78) / n) * 100;
    const next = ((i + 1) / n) * 100;
    steps.push(`${((i / n) * 100).toFixed(3)}%,${hold.toFixed(3)}%{transform:translateY(${-i * 1.5}em)}`);
    steps.push(`${next.toFixed(3)}%{transform:translateY(${-(i + 1) * 1.5}em)}`);
  }
  return (
    <span className="roles relative inline-block align-bottom">
      <span className="sr-only">{roles.slice(0, 3).join(", ")}</span>
      <style>{`@keyframes roles{${steps.join("")}}`}</style>
      <span aria-hidden="true" className="roles-track block" style={{ ["--roles-dur" as string]: `${n * 2.2}s` }}>
        {[...roles, roles[0]].map((r, i) => (
          <span key={`${r}-${i}`}>{r}</span>
        ))}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="intro"
      className="hero-scroll intro-delay relative isolate flex min-h-[100svh] items-center overflow-hidden pt-20 pb-16 lg:pt-0"
    >
      <div className="hero-field pointer-events-none absolute inset-0 -z-10">
        <SignalField />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_30%_45%,rgba(8,8,8,0.92),transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto grid w-full max-w-[1120px] gap-14 px-5 md:px-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10 lg:pl-60 xl:pl-64 2xl:max-w-[1240px]">
        {/* Left: identity */}
        <div className="hero-near min-w-0">
          <p className="label rise" style={{ ["--delay" as string]: "0s" }}>
            Portfolio <span className="text-amber">/</span> 2026
          </p>

          <h1 className="glitch-wrap mt-6 font-display text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[1.02] tracking-[-0.03em]">
            <span className="glitch" data-text={profile.first}>
              {profile.first}
            </span>
            <span
              className="glitch text-muted"
              data-text={profile.last}
              style={{ ["--delay" as string]: "0.28s" }}
            >
              {profile.last}
            </span>
          </h1>

          <p
            className="rise mt-6 font-mono text-[15px] text-fg/90 md:text-base"
            style={{ ["--delay" as string]: "0.55s" }}
          >
            <span className="text-amber">/</span> <RoleTicker roles={profile.roles} />
          </p>

          <p
            className="rise mt-8 max-w-[46ch] text-[15px] leading-relaxed text-muted"
            style={{ ["--delay" as string]: "0.7s" }}
          >
            {profile.bio}
          </p>

          <div
            className="rise mt-7 flex flex-col gap-2.5 text-sm text-fg/85"
            style={{ ["--delay" as string]: "0.8s" }}
          >
            <a href={`mailto:${profile.email}`} className="group inline-flex w-fit items-center gap-2.5">
              <MailIcon />
              <span className="border-b border-transparent transition-colors group-hover:border-amber">
                {profile.email}
              </span>
            </a>
            <span className="inline-flex items-center gap-2.5 text-muted">
              <PinIcon />
              {profile.location}
            </span>
          </div>

          <div className="rise mt-9 flex flex-wrap gap-3" style={{ ["--delay" as string]: "0.9s" }}>
            <a
              href="#work"
              className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-amber"
            >
              See the work
            </a>
            <a
              href={profile.links[0].href}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg/90 transition-colors hover:border-fg"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Right: portrait + status */}
        <div className="hero-far flex min-w-0 flex-col gap-9 lg:pt-10">
          <div className="rise relative w-fit" style={{ ["--delay" as string]: "0.45s" }}>
            <div className="absolute -inset-5 rounded-full bg-[radial-gradient(closest-side,rgba(255,176,32,0.16),transparent)]" />
            {/* Plain <img>: the site is a static export, so there is no image-optimization server. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/avatar.jpg"
              alt="Tanim Ahmed's avatar"
              width={176}
              height={176}
              fetchPriority="high"
              decoding="async"
              className="relative size-36 rounded-full object-cover ring-1 ring-line-strong md:size-44"
            />
            <span className="absolute bottom-3 right-3 flex size-3.5 items-center justify-center">
              <span className="absolute size-full animate-ping rounded-full bg-amber/60" />
              <span className="relative size-2.5 rounded-full bg-amber" />
            </span>
          </div>

          <div className="rise" style={{ ["--delay" as string]: "0.85s" }}>
            <p className="label">Currently</p>
            <div className="mt-3">
              <p className="text-[15px] text-fg">{profile.currently.title}</p>
              <p className="mt-1 text-sm text-fg/75">@ {profile.currently.org}</p>
              <p className="mt-1 text-sm text-muted">{profile.currently.detail}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                {profile.currently.since}
              </p>
            </div>
          </div>

          <div className="rise" style={{ ["--delay" as string]: "0.95s" }}>
            <p className="label">Focus</p>
            <div className="mt-3 flex max-w-xs flex-wrap gap-1.5">
              {profile.focus.map((f) => (
                <span key={f} className="chip">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-fg md:block"
      >
        scroll ↓
      </a>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
