"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { industries, navLinks } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { CTAButton } from "@/components/funnel/cta-button";

export function BambooMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 22"
      width="20"
      height="22"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <rect x="1.5" y="6" width="3.4" height="7" rx="1.7" />
      <rect x="1.5" y="14.5" width="3.4" height="6" rx="1.7" />
      <rect x="8.3" y="1.5" width="3.4" height="9" rx="1.7" />
      <rect x="8.3" y="12" width="3.4" height="8.5" rx="1.7" />
      <rect x="15.1" y="4" width="3.4" height="5.5" rx="1.7" />
      <rect x="15.1" y="11" width="3.4" height="7" rx="1.7" />
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <BambooMark className="text-bamboo" />
      <span className="font-heading text-lg font-semibold tracking-[-0.02em] text-ink-1">
        Bamboo AI
      </span>
    </span>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg-0/95 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:px-8"
      >
        <Link
          href="/"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Wordmark />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-2 transition-colors duration-150 hover:bg-surface-1 hover:text-ink-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="none" payload={{ source: "header" }}>
            Book a Strategy Call
          </CTAButton>
          <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="none" payload={{ source: "header" }}>
            Build My Free Agent
          </CTAButton>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="text-ink-1 lg:hidden" aria-label="Open menu">
              <Menu aria-hidden className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex h-full flex-col border-line bg-bg-1 text-ink-1">
            <SheetHeader>
              <SheetTitle className="font-heading">
                <Wordmark />
              </SheetTitle>
              <SheetDescription className="text-ink-3">
                The fastest path from a website visitor to a qualified next step.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-1 px-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-3 py-3 text-sm font-medium text-ink-2 hover:bg-surface-1 hover:text-ink-1"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="mt-auto grid gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <SheetClose asChild>
                <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="none" payload={{ source: "mobile_menu" }}>
                  Build My Free Agent
                </CTAButton>
              </SheetClose>
              <SheetClose asChild>
                <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="none" payload={{ source: "mobile_menu" }}>
                  Book a Strategy Call
                </CTAButton>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-3">
            The fastest path from an anonymous website visitor to a business-specific agent
            blueprint and a qualified next step.
          </p>
        </div>
        <FooterColumn
          title="Product"
          links={[
            ["Free Agent Builder", "/free-agent-builder"],
            ["Pricing", "/pricing"],
            ["Book a Strategy Call", "/book-demo"],
            ["How It Works", "/#how-it-works"],
          ]}
        />
        <FooterColumn
          title="Industries"
          links={industries.slice(0, 6).map((industry): [string, string] => [industry.name, `/industries/${industry.slug}`])}
        />
        <FooterColumn
          title="More Industries"
          links={industries.slice(6).map((industry): [string, string] => [industry.name, `/industries/${industry.slug}`])}
        />
      </div>
      <div className="mx-auto mt-10 max-w-[1240px] border-t border-line pt-6 text-xs text-ink-3">
        © 2026 Bamboo AI.
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
      <h3 className="font-heading text-sm font-semibold tracking-[-0.01em] text-ink-1">{title}</h3>
      <div className="mt-4 grid gap-2.5">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="rounded-sm text-sm text-ink-3 transition-colors duration-150 hover:text-bamboo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Sticky mobile CTA: homepage and industry pages only, appears after the
 * hero CTA has scrolled out of view, respects the safe-area inset.
 */
export function MobileStickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const eligible = pathname === "/" || pathname.startsWith("/industries/");

  useEffect(() => {
    if (!eligible) return;
    function onScroll() {
      setVisible(window.scrollY > 640);
    }
    const initial = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(initial);
      window.removeEventListener("scroll", onScroll);
    };
  }, [eligible]);

  if (!eligible || !visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg-0/97 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <Button
        asChild
        className="h-12 w-full rounded-md bg-bamboo font-semibold text-primary-foreground hover:bg-bamboo/90"
        onClick={() => trackEvent("mobile_sticky_cta_clicked", { cta: "build_my_free_agent", route: pathname })}
      >
        <Link href="/free-agent-builder">Build My Free Agent</Link>
      </Button>
    </div>
  );
}
