import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { Footer, MobileStickyCTA, Navbar } from "@/components/funnel/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mybamboo.ai"),
  title: {
    default: "Bamboo AI | Turn Every Visitor into a Qualified Next Step",
    template: "%s | Bamboo AI",
  },
  description:
    "Build a no-code agent that answers questions, qualifies intent, books the right action, and hands your team the context. First blueprint in under five minutes.",
  openGraph: {
    title: "Bamboo AI | Turn Every Visitor into a Qualified Next Step",
    description:
      "Build a no-code agent that answers questions, qualifies intent, books the right action, and hands your team the context.",
    url: "https://mybamboo.ai",
    siteName: "Bamboo AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-bamboo focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <TooltipProvider>
          <PageViewTracker />
          <Navbar />
          {children}
          <Footer />
          <MobileStickyCTA />
        </TooltipProvider>
      </body>
    </html>
  );
}
