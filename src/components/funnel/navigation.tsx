"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandMark } from "@/components/funnel/brand-mark";
import { CTAButton } from "@/components/funnel/cta-button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#industries", label: "Industries" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/94 backdrop-blur-md">
      <nav aria-label="Primary" className="page-shell flex h-17 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Bamboo AI home">
          <BrandMark />
          <span className="font-heading text-lg font-semibold tracking-[-0.01em] text-white">Bamboo AI</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = link.href === "/pricing" && pathname === "/pricing";
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring rounded-md px-3 py-2 text-sm font-medium text-white/72 transition hover:bg-white/8 hover:text-white",
                  active && "bg-white/8 text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="calendar">
            Strategy Call
          </CTAButton>
          <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
            Build My Agent
          </CTAButton>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="focus-ring text-white md:hidden" aria-label="Open menu">
              <Menu aria-hidden className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-white/10 bg-background text-white">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3 font-heading text-white">
                <BrandMark /> Bamboo AI
              </SheetTitle>
              <SheetDescription className="text-white/70">
                Turn visitor intent into a qualified next step.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-1 px-4">
              {links.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring rounded-md px-3 py-3 text-base font-medium text-white/78 hover:bg-white/8 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="mt-auto grid gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
                Build My Free Agent
              </CTAButton>
              <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="calendar">
                Book a Strategy Call
              </CTAButton>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/10">
      <div className="page-shell grid gap-12 py-14 md:grid-cols-[1.35fr_0.85fr_0.85fr]">
        <div>
          <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-md" aria-label="Bamboo AI home">
            <BrandMark />
            <span className="font-heading text-lg font-semibold text-white">Bamboo AI</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
            Build agents that answer, qualify, book, and hand useful context to your team.
          </p>
        </div>
        <FooterColumn
          title="Product"
          links={[
            ["Free Agent Builder", "/free-agent-builder"],
            ["Pricing", "/pricing"],
            ["Strategy Call", "/book-demo"],
          ]}
        />
        <FooterColumn
          title="Use cases"
          links={[
            ["Sales", "/industries/sales"],
            ["Customer Service", "/industries/customer-service"],
            ["Real Estate", "/industries/real-estate"],
            ["Medical", "/industries/medical"],
          ]}
        />
      </div>
      <div className="page-shell flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/58 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Bamboo AI. All rights reserved.</span>
        <span>Built for approved knowledge, clear routing, and human control.</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links: items }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="font-heading text-sm font-semibold text-white">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="focus-ring w-fit rounded-sm text-sm text-white/64 transition hover:text-bamboo">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileStickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const allowed = pathname === "/" || pathname.startsWith("/industries/");

  useEffect(() => {
    if (!allowed) return;
    const onScroll = () => setVisible(window.scrollY > Math.min(680, window.innerHeight * 0.78));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [allowed]);

  if (!allowed || !visible) return null;

  return (
    <>
      <div aria-hidden className="h-20 md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/96 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <Button
          asChild
          className="h-12 w-full rounded-md bg-bamboo font-semibold text-background hover:bg-bamboo/90"
          onClick={() => trackEvent("mobile_sticky_cta_clicked", { cta: "build_my_agent" })}
        >
          <Link href="/free-agent-builder">
            <Sparkles aria-hidden className="size-4" />
            Build My Free Agent
          </Link>
        </Button>
      </div>
    </>
  );
}

export function ExitIntentModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const allowed = pathname === "/" || pathname.startsWith("/industries/");

  useEffect(() => {
    if (!allowed) return;
    let armed = false;
    const timer = window.setTimeout(() => { armed = true; }, 30000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setEngaged(max > 0 && window.scrollY / max >= 0.5);
    };
    const onLeave = (event: MouseEvent) => {
      if (!armed || !engaged || event.clientY > 0 || sessionStorage.getItem("bamboo-exit-intent")) return;
      sessionStorage.setItem("bamboo-exit-intent", "shown");
      setOpen(true);
      trackEvent("exit_intent_shown", { offer: "save_builder_link" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [allowed, engaged]);

  if (!allowed) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="border-white/12 bg-popover text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Keep the blueprint within reach.</DialogTitle>
          <DialogDescription className="text-white/68">
            Save the builder link on this device and return when you have the workflow details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Button asChild className="h-12 rounded-md bg-bamboo font-semibold text-background hover:bg-bamboo/90" onClick={() => { trackEvent("exit_intent_submitted", { offer: "continue_builder" }); setOpen(false); }}>
            <Link href="/free-agent-builder"><Sparkles aria-hidden className="size-4" />Continue to the Builder</Link>
          </Button>
          <Button type="button" variant="ghost" className="h-11 text-white/60 hover:bg-white/8 hover:text-white" onClick={() => setOpen(false)}>Keep Reading</Button>
        </div>
        <Button
          variant="ghost"
          className="absolute right-3 top-3 size-10 p-0 text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Close dialog"
          onClick={() => setOpen(false)}
        >
          <X aria-hidden className="size-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
