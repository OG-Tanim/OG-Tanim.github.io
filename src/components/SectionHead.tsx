export function SectionHead({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="reveal flex items-end justify-between gap-6 border-b border-line pb-5">
      <h2 className="font-title text-[34px] font-semibold leading-none tracking-[-0.015em] md:text-[40px]">{title}</h2>
      {eyebrow && <p className="label shrink-0 pb-1">{eyebrow}</p>}
    </div>
  );
}
