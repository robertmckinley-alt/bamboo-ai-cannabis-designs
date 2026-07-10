import Link from "next/link";
import { ArrowLeft, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main-content" className="page-shell section-space flex min-h-[70svh] items-center">
      <div className="max-w-3xl border-y border-white/12 py-10">
        <Route aria-hidden className="size-8 text-bamboo" />
        <p className="mt-5 font-mono text-sm text-cyan-soft">ROUTE NOT FOUND</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight tracking-[-0.025em] text-white md:text-6xl">This signal has nowhere to go.</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-white/66">Return to Bamboo AI or open the builder to map a useful next step.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-12 rounded-md bg-bamboo font-semibold text-background hover:bg-bamboo/90"><Link href="/"><ArrowLeft aria-hidden className="size-4" />Return Home</Link></Button>
          <Button asChild variant="outline" className="h-12 rounded-md border-white/14 bg-transparent text-white hover:bg-white/8 hover:text-white"><Link href="/free-agent-builder">Build My Free Agent</Link></Button>
        </div>
      </div>
    </main>
  );
}
