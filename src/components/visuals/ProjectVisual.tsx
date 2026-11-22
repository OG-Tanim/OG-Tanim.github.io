import type { Visual } from "@/data/content";

/** Every visual is code (HTML or SVG), sized with container-query units,
 *  so it stays sharp in a deck card and in a full-width case-study hero. */
export function ProjectVisual({ visual }: { visual: Visual }) {
  switch (visual) {
    case "admission":
      return <AdmissionMock />;
    case "fraud":
      return <FraudDiagram />;
    case "rag":
      return <RagDiagram />;
    case "visdrone":
      return <VisDronePlaceholder />;
    case "crm":
      return <CrmMock />;
    case "slm":
      return <SlmDiagram />;
    case "doomsday":
      return <DoomsdayGraph />;
  }
}

function Tag({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "amber" }) {
  return (
    <span
      className={`absolute right-[2.2cqw] top-[2.2cqw] z-10 rounded-[0.8cqw] px-[1.3cqw] py-[0.5cqw] font-mono text-[max(9px,1.45cqw)] uppercase tracking-[0.12em] ${
        tone === "amber" ? "bg-amber text-black" : "bg-black/60 text-muted ring-1 ring-line"
      }`}
    >
      {children}
    </span>
  );
}

/* ───────────── School Admission: recreated UI ───────────── */
const classes = [
  { name: "Class 6 — Morning Shift", total: 120, held: 4, confirmed: 86 },
  { name: "Class 6 — Day Shift", total: 120, held: 0, confirmed: 120 },
  { name: "Class 7 — Morning Shift", total: 110, held: 6, confirmed: 71 },
  { name: "Class 8 — Day Shift", total: 100, held: 1, confirmed: 64 },
  { name: "Class 9 — Science", total: 80, held: 3, confirmed: 57 },
  { name: "Class 9 — Commerce", total: 60, held: 0, confirmed: 41 },
];

function AdmissionMock() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#eef0f4] text-[#0f172a]">
      <Tag>Recreated UI</Tag>
      <div className="absolute inset-x-[5cqw] top-[4.5cqw] text-[1.6cqw] leading-[1.35]">
        <div className="font-sans text-[3.6cqw] font-bold tracking-[-0.02em]">School Admission System</div>
        <div className="mt-[1.4cqw] flex gap-[1.2cqw]">
          <span className="rounded-full bg-[#e6e8fb] px-[1.4cqw] py-[0.4cqw] font-semibold text-[#3730a3]">Student</span>
          <span className="rounded-full bg-[#e6e8fb] px-[1.4cqw] py-[0.4cqw] font-semibold text-[#3730a3]">Home / change role</span>
        </div>

        <div className="mt-[2.4cqw] grid grid-cols-[1.4fr_1fr] gap-[2cqw]">
          <div className="rounded-[1cqw] border border-[#dfe3ea] bg-white p-[1.8cqw]">
            <div className="text-[1.25cqw] uppercase tracking-[0.08em] text-[#64748b]">Birth-registration number (17 digits)</div>
            <div className="mt-[0.9cqw] rounded-[0.7cqw] border-[0.25cqw] border-[#2563eb] px-[1.2cqw] py-[0.7cqw] font-mono tracking-[0.06em]">
              20081 •••• •••• 4521
            </div>
          </div>
          <div className="rounded-[1cqw] border border-[#fde68a] bg-[#fffbeb] p-[1.8cqw]">
            <div className="text-[1.25cqw] uppercase tracking-[0.08em] text-[#92400e]">Seat held</div>
            <div className="mt-[0.6cqw] font-semibold">Class 7 — Morning</div>
            <div className="mt-[0.3cqw] text-[#92400e]">
              expires in <span className="font-mono font-semibold">04:32</span>
            </div>
          </div>
        </div>

        <div className="mt-[2cqw] rounded-[1.2cqw] border border-[#dfe3ea] bg-white px-[2cqw] pb-[1cqw] pt-[1.6cqw]">
          <div className="flex items-center justify-between">
            <div className="text-[2.4cqw] font-bold">Classes</div>
            <span className="rounded-full bg-[#e6e8fb] px-[1.4cqw] py-[0.4cqw] font-semibold text-[#3730a3]">My applications</span>
          </div>
          <table className="mt-[1cqw] w-full border-collapse">
            <thead>
              <tr className="text-left text-[#64748b]">
                {["Class", "Total", "Held", "Confirmed", "Available", ""].map((h) => (
                  <th key={h} className="border-b border-[#e5e7eb] py-[0.8cqw] font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => {
                const available = c.total - c.held - c.confirmed;
                return (
                  <tr key={c.name} className="border-b border-[#f1f5f9]">
                    <td className="py-[0.9cqw]">{c.name}</td>
                    <td className="tabular-nums">{c.total}</td>
                    <td className="tabular-nums">{c.held}</td>
                    <td className="tabular-nums">{c.confirmed}</td>
                    <td className={`tabular-nums ${available === 0 ? "text-[#b91c1c]" : ""}`}>{available}</td>
                    <td className="text-right">
                      <span
                        className={`inline-block rounded-[0.6cqw] px-[1.3cqw] py-[0.35cqw] text-white ${
                          available === 0 ? "bg-[#94a3b8]" : "bg-[#0f172a]"
                        }`}
                      >
                        {available === 0 ? "Full" : "Apply"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ───────────── BIAI CRM: recreated pipeline board ───────────── */
const crmCols = [
  { name: "New", cards: [["Rafiq H.", "WhatsApp", "2h"], ["Sadia K.", "Website", "5h"], ["Imran C.", "Phone", "1d"]] },
  { name: "Contacted", cards: [["Nusrat J.", "Facebook", "52h"], ["Arif M.", "WhatsApp", "8h"]] },
  { name: "Interested", cards: [["Tahmid R.", "Website", "1d"], ["Farzana A.", "Phone", "3d"]] },
  { name: "Paid", cards: [["Mehedi S.", "WhatsApp", "—"]] },
  { name: "Lost", cards: [["Shuvo D.", "Facebook", "—"]] },
];

function CrmMock() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0c0d10] text-[1.55cqw] text-[#d4d4d8]">
      <Tag>Recreated UI</Tag>
      <div className="flex items-center gap-[1.6cqw] border-b border-white/8 px-[3cqw] py-[2.2cqw]">
        <span className="font-sans text-[2.4cqw] font-semibold text-white">BIAI CRM</span>
        {["Capture", "Pipeline", "Follow-ups", "List", "Summary"].map((t) => (
          <span
            key={t}
            className={`rounded-[0.6cqw] px-[1cqw] py-[0.3cqw] ${t === "Pipeline" ? "bg-white/10 text-white" : "text-[#71717a]"}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-[1.4cqw] p-[2.4cqw]">
        {crmCols.map((col) => (
          <div key={col.name} className="rounded-[1cqw] bg-white/[0.03] p-[1.1cqw]">
            <div className="mb-[1cqw] flex items-center justify-between text-[1.35cqw] uppercase tracking-[0.08em] text-[#a1a1aa]">
              {col.name}
              <span className="font-mono text-[#52525b]">{col.cards.length}</span>
            </div>
            <div className="space-y-[0.9cqw]">
              {col.cards.map(([who, ch, wait]) => {
                const stale = wait === "52h";
                return (
                  <div
                    key={who}
                    className={`rounded-[0.8cqw] border bg-[#141519] p-[1cqw] ${stale ? "border-[#ffb020]/60" : "border-white/8"}`}
                  >
                    <div className="font-medium text-white">{who}</div>
                    <div className="mt-[0.5cqw] flex items-center justify-between text-[1.25cqw]">
                      <span className="rounded-[0.4cqw] bg-white/8 px-[0.6cqw]">{ch}</span>
                      <span className={`font-mono ${stale ? "text-[#ffb020]" : "text-[#71717a]"}`}>{wait}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── VisDrone: placeholder until real frames exist ───────────── */
const boxes = [
  { x: 14, y: 22, w: 7, h: 13, k: "human", s: "0.91" },
  { x: 24, y: 27, w: 6, h: 12, k: "human", s: "0.84" },
  { x: 47, y: 52, w: 15, h: 10, k: "car", s: "0.95" },
  { x: 66, y: 38, w: 14, h: 9, k: "car", s: "0.89" },
  { x: 71, y: 64, w: 6, h: 12, k: "human", s: "0.77" },
  { x: 33, y: 70, w: 15, h: 10, k: "car", s: "0.92" },
];

function VisDronePlaceholder() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d0f0e]">
      {/* stylised aerial scene: roads + blocks */}
      <svg viewBox="0 0 100 62.5" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="vd-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M4 0H0V4" className="fill-none stroke-white/[0.04]" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="62.5" fill="url(#vd-grid)" />
        <path d="M-5 40 L105 18" className="stroke-white/[0.07]" strokeWidth="9" />
        <path d="M-5 40 L105 18" className="stroke-white/[0.12]" strokeWidth="0.25" strokeDasharray="2 2" />
        <path d="M40 -5 L58 70" className="stroke-white/[0.06]" strokeWidth="7" />
        {[
          [4, 4, 22, 11], [70, 2, 26, 9], [6, 48, 20, 12], [76, 44, 22, 16], [62, 30, 8, 6],
        ].map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="0.6" className="fill-white/[0.035] stroke-white/[0.06]" strokeWidth="0.2" />
        ))}
      </svg>
      {boxes.map((b) => (
        <div
          key={`${b.x}-${b.y}`}
          className={`absolute border ${b.k === "car" ? "border-ice/80" : "border-amber/90"}`}
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
        >
          <span
            className={`absolute -top-[2.4cqw] left-[-1px] whitespace-nowrap px-[0.6cqw] font-mono text-[max(8px,1.3cqw)] leading-[2.2cqw] text-black ${
              b.k === "car" ? "bg-ice" : "bg-amber"
            }`}
          >
            {b.k} {b.s}
          </span>
        </div>
      ))}
      <div className="absolute bottom-[2.6cqw] left-[2.6cqw] flex gap-[1cqw] font-mono text-[max(9px,1.5cqw)]">
        <span className="rounded-[0.6cqw] bg-black/70 px-[1.2cqw] py-[0.5cqw] text-fg ring-1 ring-line">
          human <span className="text-amber">4</span> · car <span className="text-ice">3</span>
        </span>
        <span className="rounded-[0.6cqw] bg-black/70 px-[1.2cqw] py-[0.5cqw] text-muted ring-1 ring-line">
          mAP@0.5 <span className="text-fg">0.654</span>
        </span>
      </div>
    </div>
  );
}

/* ───────────── SVG diagrams ───────────── */
function Box({
  x, y, w, h, label, sub, tone = "base",
}: {
  x: number; y: number; w: number; h: number; label: string; sub?: string; tone?: "base" | "amber" | "ice";
}) {
  const stroke = tone === "amber" ? "stroke-amber" : tone === "ice" ? "stroke-ice/70" : "stroke-white/15";
  const fill = tone === "amber" ? "fill-amber/10" : "fill-white/[0.03]";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" className={`${fill} ${stroke}`} strokeWidth="1" />
      <text
        x={x + w / 2}
        y={y + h / 2 + (sub ? -3 : 4)}
        textAnchor="middle"
        className={tone === "amber" ? "fill-amber" : "fill-fg"}
        style={{ font: "500 12px var(--font-inter-tight), system-ui, sans-serif" }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 13}
          textAnchor="middle"
          className="fill-muted"
          style={{ font: "9.5px var(--font-jetbrains), ui-monospace, monospace" }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ d, tone = "base", dashed }: { d: string; tone?: "base" | "amber" | "ice"; dashed?: boolean }) {
  const cls = tone === "amber" ? "stroke-amber" : tone === "ice" ? "stroke-ice" : "stroke-white/25";
  const id = tone === "amber" ? "ah-amber" : tone === "ice" ? "ah-ice" : "ah-base";
  return (
    <path d={d} className={`fill-none ${cls}`} strokeWidth="1" strokeDasharray={dashed ? "4 4" : undefined} markerEnd={`url(#${id})`} />
  );
}

function Defs() {
  return (
    <defs>
      {[
        ["ah-base", "fill-white/40"],
        ["ah-amber", "fill-amber"],
        ["ah-ice", "fill-ice"],
      ].map(([id, cls]) => (
        <marker key={id} id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 8 4 0 8z" className={cls} />
        </marker>
      ))}
      <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" className="fill-white/[0.06]" />
      </pattern>
    </defs>
  );
}

function SvgFrame({ children, viewBox = "0 0 720 450", tag }: { children: React.ReactNode; viewBox?: string; tag: string }) {
  return (
    <div className="absolute inset-0 bg-[#0b0b0b]">
      <Tag>{tag}</Tag>
      <svg viewBox={viewBox} className="absolute inset-0 h-full w-full" role="img" aria-label={tag}>
        <Defs />
        <rect width="100%" height="100%" fill="url(#dots)" />
        {children}
      </svg>
    </div>
  );
}

function FraudDiagram() {
  const signals = ["Transactions", "GPS", "SMS", "Email", "Profiles"];
  const agents = [
    ["Transaction", "isolation forest"],
    ["Behavior", "per-user baseline"],
    ["Geospatial", "impossible travel"],
    ["Graph", "mule rings"],
    ["Temporal", "burst · shifts"],
    ["Comms", "LLM phishing"],
  ];
  return (
    <SvgFrame tag="Architecture">
      {signals.map((s, i) => (
        <g key={s}>
          <text x="34" y={108 + i * 58} className="fill-muted" style={{ font: "11px var(--font-jetbrains), monospace" }}>
            {s}
          </text>
          <Arrow d={`M128 ${104 + i * 58} H156`} />
        </g>
      ))}
      <rect x="160" y="78" width="22" height="270" rx="6" className="fill-ice/10 stroke-ice/50" />
      <text x="171" y="213" textAnchor="middle" transform="rotate(-90 171 213)" className="fill-ice" style={{ font: "10px var(--font-jetbrains), monospace", letterSpacing: "0.12em" }}>
        FEATURES
      </text>
      {agents.map(([a, sub], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 212 + col * 138;
        const y = 80 + row * 96;
        return (
          <g key={a}>
            <Arrow d={`M184 ${y + 27} H${x - 4}`} />
            <Box x={x} y={y} w={124} h={56} label={a} sub={sub} />
            <Arrow d={`M${x + 124} ${y + 28} C ${x + 160} ${y + 28}, 488 213, 512 213`} />
          </g>
        );
      })}
      <Box x={516} y={176} w={168} h={74} label="Meta-orchestrator" sub="cost-aware voting" tone="amber" />
      <Arrow d="M600 252 V318" tone="amber" />
      <Box x={540} y={322} w={120} h={46} label="fraud IDs" />
      <Arrow d="M600 174 C 600 40, 360 40, 290 74" tone="ice" dashed />
      <text x="452" y="52" textAnchor="middle" className="fill-ice" style={{ font: "10.5px var(--font-jetbrains), monospace" }}>
        drift detected → retrain agent
      </text>
    </SvgFrame>
  );
}

function RagDiagram() {
  return (
    <SvgFrame tag="Pipeline">
      <Box x={22} y={196} w={84} h={56} label="Query" />
      <Arrow d="M108 224 H128" />
      <Box x={132} y={196} w={96} h={56} label="HyDE" sub="draft answer" tone="ice" />
      <Arrow d="M230 214 C 250 214, 250 140, 270 140" />
      <Arrow d="M230 234 C 250 234, 250 308, 270 308" />
      <Box x={274} y={112} w={146} h={56} label="Semantic" sub="ChromaDB · MiniLM" />
      <Box x={274} y={280} w={146} h={56} label="Keyword" sub="BM25" />
      <Arrow d="M422 140 C 446 140, 446 214, 464 214" />
      <Arrow d="M422 308 C 446 308, 446 234, 464 234" />
      <Box x={468} y={196} w={66} h={56} label="RRF" tone="amber" />
      <Arrow d="M536 224 H552" />
      <Box x={556} y={196} w={78} h={56} label="Rerank" sub="cross-enc." />
      <Arrow d="M636 224 H650" />
      <Box x={654} y={196} w={52} h={56} label="LLM" />
      {/* index */}
      <rect x="274" y="378" width="146" height="44" rx="8" className="fill-white/[0.02] stroke-white/10" strokeDasharray="3 3" />
      <text x="347" y="397" textAnchor="middle" className="fill-muted" style={{ font: "10px var(--font-jetbrains), monospace" }}>
        structure-aware chunks
      </text>
      <text x="347" y="412" textAnchor="middle" className="fill-dim" style={{ font: "10px var(--font-jetbrains), monospace" }}>
        + LLM situational context
      </text>
      <Arrow d="M347 376 V340" dashed />
      <text x="40" y="70" className="fill-muted" style={{ font: "11px var(--font-jetbrains), monospace", letterSpacing: "0.1em" }}>
        RETRIEVE TWO WAYS · FUSE · RERANK
      </text>
    </SvgFrame>
  );
}

function SlmDiagram() {
  return (
    <SvgFrame tag="Architecture">
      <Box x={24} y={196} w={88} h={56} label="Tokens" sub="char-level" />
      <Arrow d="M114 224 H132" />
      <Box x={136} y={196} w={92} h={56} label="Embedding" sub="tied weights" />
      <Arrow d="M230 224 H252" />
      <rect x="256" y="110" width="262" height="230" rx="14" className="fill-white/[0.02] stroke-amber/50" strokeDasharray="5 4" />
      <text x="500" y="134" textAnchor="end" className="fill-amber" style={{ font: "600 15px var(--font-michroma), sans-serif" }}>
        ×4
      </text>
      <text x="274" y="134" className="fill-muted" style={{ font: "10px var(--font-jetbrains), monospace", letterSpacing: "0.12em" }}>
        TRANSFORMER BLOCK
      </text>
      <Box x={274} y={154} w={96} h={50} label="RMSNorm" />
      <Arrow d="M372 179 H390" />
      <Box x={394} y={154} w={106} h={50} label="GQA" sub="+ RoPE" tone="ice" />
      <Box x={274} y={262} w={96} h={50} label="RMSNorm" />
      <Arrow d="M372 287 H390" />
      <Box x={394} y={262} w={106} h={50} label="SwiGLU" tone="ice" />
      <Arrow d="M447 206 C 447 234, 322 234, 322 258" />
      <Arrow d="M520 224 H540" />
      <Box x={544} y={196} w={78} h={56} label="RMSNorm" />
      <Arrow d="M624 224 H640" />
      <Box x={644} y={196} w={56} h={56} label="Head" />
      <text x="40" y="70" className="fill-muted" style={{ font: "11px var(--font-jetbrains), monospace", letterSpacing: "0.1em" }}>
        ~1.9M PARAMETERS · PYTORCH
      </text>
    </SvgFrame>
  );
}

function DoomsdayGraph() {
  const n = {
    im: [70, 120, "Iron Man"],
    ca: [70, 220, "Captain America"],
    th: [70, 320, "Thor"],
    av: [250, 220, "The Avengers"],
    cw: [410, 150, "Civil War"],
    iw: [410, 290, "Infinity War"],
    eg: [560, 220, "Endgame"],
  } as const;
  const edges: [keyof typeof n, keyof typeof n][] = [
    ["im", "av"], ["ca", "av"], ["th", "av"], ["av", "cw"], ["av", "iw"], ["cw", "iw"], ["iw", "eg"], ["cw", "eg"],
  ];
  return (
    <SvgFrame tag="Watch order">
      {edges.map(([a, b]) => (
        <Arrow
          key={`${a}${b}`}
          d={
            n[a][0] === n[b][0]
              ? `M${n[a][0]} ${n[a][1] + 21} V${n[b][1] - 23}`
              : `M${n[a][0] + 58} ${n[a][1]} L${n[b][0] - 62} ${n[b][1]}`
          }
        />
      ))}
      {Object.entries(n).map(([k, [x, y, label]]) => (
        <g key={k}>
          <rect x={x - 58} y={y - 19} width="116" height="38" rx="19" className="fill-white/[0.04] stroke-white/15" />
          <text x={x} y={y + 4} textAnchor="middle" className="fill-fg" style={{ font: "500 11.5px var(--font-inter-tight), sans-serif" }}>
            {label}
          </text>
        </g>
      ))}
      <Arrow d="M620 220 H644" tone="amber" />
      <rect x="648" y="200" width="62" height="40" rx="20" className="fill-amber/15 stroke-amber" />
      <text x="679" y="224" textAnchor="middle" className="fill-amber" style={{ font: "600 10px var(--font-jetbrains), monospace" }}>
        DOOMSDAY
      </text>
      <text x="40" y="404" className="fill-muted" style={{ font: "11px var(--font-jetbrains), monospace" }}>
        group of 44 · bundles 6 / 9 / 20 →
      </text>
      {["20", "9", "9", "6"].map((b, i) => (
        <g key={i}>
          <rect x={300 + i * 54} y="386" width="46" height="26" rx="6" className="fill-ice/10 stroke-ice/60" />
          <text x={323 + i * 54} y="403" textAnchor="middle" className="fill-ice" style={{ font: "600 11px var(--font-jetbrains), monospace" }}>
            {b}
          </text>
        </g>
      ))}
      <text x="524" y="404" className="fill-fg" style={{ font: "11px var(--font-jetbrains), monospace" }}>
        = 4 bundles
      </text>
    </SvgFrame>
  );
}
