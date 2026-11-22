// A pure-CSS "compile" preloader. It plays once on a hard load (while
// <html data-intro> is present) and slides away on its own, so it never
// depends on hydration finishing.
const lines = [
  "resolving modules",
  "linking routes",
  "warming caches",
  "separating signal from noise",
];

export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 md:inset-x-10 md:bottom-10">
        <div className="space-y-1 font-mono text-[11px] leading-5 text-dim">
          {lines.map((l, i) => (
            <div
              key={l}
              className="preloader-line"
              style={{ animationDelay: `${i * 0.24}s` }}
            >
              <span className="text-amber">›</span> {l}
              <span className="text-ice">{i === lines.length - 1 ? " ✓" : " …"}</span>
            </div>
          ))}
        </div>
        <div className="preloader-count font-display text-[22vw] leading-[0.8] tabular-nums text-fg md:text-[11vw]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-line">
        <div className="preloader-bar h-full bg-amber" />
      </div>
    </div>
  );
}
