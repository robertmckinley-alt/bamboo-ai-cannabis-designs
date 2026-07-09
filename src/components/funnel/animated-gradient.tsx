export function AnimatedGradient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#060806_0%,#0b1210_45%,#071415_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[42rem] bg-[linear-gradient(120deg,rgba(89,255,139,0.18),rgba(62,220,255,0.08),transparent_65%)] blur-2xl animate-bamboo-shift" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(to_top,rgba(6,8,6,0.95),transparent)]" />
    </div>
  );
}
