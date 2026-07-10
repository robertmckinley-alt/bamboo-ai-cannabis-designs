import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex size-9 shrink-0 items-end justify-center gap-[3px] overflow-hidden rounded-md bg-bamboo text-background",
        className
      )}
    >
      <Stem height="h-4" />
      <Stem height="h-6" />
      <Stem height="h-5" />
    </span>
  );
}

function Stem({ height }: { height: string }) {
  return (
    <span className={cn("relative mb-1 w-[3px] bg-background", height)}>
      <span className="absolute inset-x-[-2px] top-1/3 h-px bg-background" />
      <span className="absolute inset-x-[-2px] top-2/3 h-px bg-background" />
    </span>
  );
}
