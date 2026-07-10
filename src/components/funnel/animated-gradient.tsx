export function AnimatedGradient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_-12%,oklch(0.28_0.075_153/0.38),transparent_46%),linear-gradient(165deg,oklch(0.105_0.024_158),oklch(0.125_0.03_166)_58%,oklch(0.095_0.022_155))]" />
      <div className="ambient-breathe absolute left-[8%] top-[-9rem] h-[44rem] w-px bg-bamboo/14">
        {[18, 38, 61, 79].map((top) => (
          <span key={top} className="absolute left-[-5px] h-px w-3 bg-bamboo/22" style={{ top: `${top}%` }} />
        ))}
      </div>
      <div className="ambient-breathe absolute right-[10%] top-[-5rem] h-[36rem] w-px bg-cyan-soft/10 [animation-delay:-5s]">
        {[24, 53, 76].map((top) => (
          <span key={top} className="absolute left-[-5px] h-px w-3 bg-cyan-soft/16" style={{ top: `${top}%` }} />
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.85_0.205_141/0.48),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(to_top,var(--background),transparent)]" />
    </div>
  );
}
