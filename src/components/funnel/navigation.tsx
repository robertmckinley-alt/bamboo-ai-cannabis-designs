"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { CTAButton } from "@/components/funnel/cta-button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/76 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo/70"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-bamboo text-black">
            <Bot aria-hidden className="size-5" />
          </span>
          <span className="text-base font-semibold text-white">Bamboo AI</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/62 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo/70"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="calendar">
            Book Demo
          </CTAButton>
          <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
            Build Free
          </CTAButton>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="text-white md:hidden" aria-label="Open menu">
              <Menu aria-hidden className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-white/10 bg-[#07100d] text-white">
            <SheetHeader>
              <SheetTitle>Bamboo AI</SheetTitle>
              <SheetDescription>Build your AI agent funnel.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-2 px-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-3 py-3 text-sm font-medium text-white/72 hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="mt-auto grid gap-3 p-4">
              <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
                Build Your Free AI Agent
              </CTAButton>
              <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="calendar">
                Book a Demo
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
    <footer className="border-t border-white/10 px-5 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-bamboo text-black">
              <Bot aria-hidden className="size-5" />
            </span>
            <span className="font-semibold text-white">Bamboo AI</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/54">
            Build agents that answer questions, capture leads, book appointments, and support customers without code.
          </p>
        </div>
        <FooterColumn
          title="Product"
          links={[
            ["Free Builder", "/free-agent-builder"],
            ["Pricing", "/pricing"],
            ["Book Demo", "/book-demo"],
            ["Agent Created", "/agent-created"],
          ]}
        />
        <FooterColumn
          title="Industries"
          links={[
            ["Customer Service", "/industries/customer-service"],
            ["Sales", "/industries/sales"],
            ["Real Estate", "/industries/real-estate"],
            ["Medical", "/industries/medical"],
          ]}
        />
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Bamboo AI. Front-end funnel prototype.</span>
        <span>No code required. Launch fast. Upgrade when ready.</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="text-sm text-white/52 transition hover:text-bamboo">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-30 hidden flex-col gap-2 md:flex">
      <CTAButton
        href="/free-agent-builder"
        event="hero_cta_clicked"
        icon="sparkles"
        className="shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
      >
        Build Free
      </CTAButton>
      <CTAButton
        href="/book-demo"
        event="book_demo_clicked"
        tone="secondary"
        icon="calendar"
        className="bg-black/45 backdrop-blur"
      >
        Demo
      </CTAButton>
    </div>
  );
}

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/78 p-3 backdrop-blur-xl md:hidden">
      <Button
        asChild
        className="h-12 w-full rounded-lg bg-bamboo text-black hover:bg-bamboo/90"
        onClick={() => trackEvent("mobile_sticky_cta_clicked", { cta: "build_free_agent" })}
      >
        <Link href="/free-agent-builder">
          <Sparkles aria-hidden className="size-4" />
          Build Your Free AI Agent
        </Link>
      </Button>
    </div>
  );
}

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    let armed = false;
    const timer = window.setTimeout(() => {
      armed = true;
    }, 8000);

    function handleMouseLeave(event: MouseEvent) {
      if (!armed || event.clientY > 0 || sessionStorage.getItem("bamboo-exit-intent")) {
        return;
      }
      sessionStorage.setItem("bamboo-exit-intent", "shown");
      setOpen(true);
      trackEvent("exit_intent_shown", { offer: "free_agent_builder" });
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="border-white/10 bg-[#07100d] text-white sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Take the agent draft with you.</DialogTitle>
          <DialogDescription className="text-white/58">
            Save the free builder link and get the launch checklist for your first Bamboo agent.
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="rounded-lg border border-bamboo/25 bg-bamboo/10 p-4 text-sm text-white/72">
            Saved. Your next step is waiting in the free builder.
          </div>
        ) : (
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.includes("@")) {
                return;
              }
              localStorage.setItem("bamboo-exit-intent-email", email);
              trackEvent("exit_intent_submitted", { email_domain: email.split("@")[1] ?? "" });
              setSubmitted(true);
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="exit-email" className="text-white/70">
                Work email
              </Label>
              <Input
                id="exit-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
                placeholder="you@company.com"
              />
            </div>
            <Button className="h-12 rounded-lg bg-bamboo text-black hover:bg-bamboo/90">
              <Sparkles aria-hidden className="size-4" />
              Save Builder Link
            </Button>
          </form>
        )}
        <Button
          variant="ghost"
          className="absolute right-3 top-3 size-8 p-0 text-white/50 hover:bg-white/10 hover:text-white"
          aria-label="Close exit intent modal"
          onClick={() => setOpen(false)}
        >
          <X aria-hidden className="size-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
