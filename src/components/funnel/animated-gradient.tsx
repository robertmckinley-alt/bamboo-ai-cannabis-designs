export function AnimatedGradient() {
  const culms = [
    "left-[4%] top-[-7rem] h-[46rem] w-16 rotate-[-9deg]",
    "left-[13%] top-[-10rem] h-[52rem] w-12 rotate-[-7deg]",
    "right-[8%] top-[-8rem] h-[44rem] w-14 rotate-[8deg]",
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(150deg,oklch(0.105_0.024_155)_0%,oklch(0.145_0.034_158)_48%,oklch(0.105_0.028_176)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.84_0.18_143/0.58),transparent)]" />
      <div className="animate-bamboo-shift absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(115deg,oklch(0.84_0.18_143/0.16),oklch(0.78_0.11_203/0.08)_42%,transparent_78%)]" />
      {culms.map((className) => (
        <div
          key={className}
          className={`absolute ${className} rounded-[999px] border border-bamboo/10 bg-[linear-gradient(90deg,oklch(0.84_0.18_143/0.04),oklch(0.84_0.18_143/0.18),oklch(0.84_0.18_143/0.04))] opacity-80`}
        >
          <span className="absolute left-0 right-0 top-[28%] h-px bg-bamboo/18" />
          <span className="absolute left-0 right-0 top-[57%] h-px bg-bamboo/14" />
          <span className="absolute left-0 right-0 top-[76%] h-px bg-bamboo/10" />
        </div>
      ))}
      <div className="absolute left-1/2 top-16 h-[26rem] w-[min(72rem,92vw)] -translate-x-1/2 rounded-[2rem] border border-white/[0.045] bg-[linear-gradient(135deg,oklch(0.98_0.01_145/0.045),transparent_48%)] [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-[linear-gradient(to_top,var(--background),transparent)]" />
    </div>
  );
}
