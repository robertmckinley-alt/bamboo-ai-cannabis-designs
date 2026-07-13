import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Oswald } from "next/font/google";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { AnimatedGradient } from "@/components/funnel/animated-gradient";
import { ExitIntentModal, Footer, MobileStickyCTA, Navbar } from "@/components/funnel/navigation";
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
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mybamboo.ai"),
  title: {
    default: "Bamboo AI | Build Your First AI Agent",
    template: "%s | Bamboo AI",
  },
  description:
    "Create AI agents that capture leads, answer questions, book appointments, and support customers without code.",
  openGraph: {
    title: "Bamboo AI | Build AI Agents for Your Business",
    description:
      "Create AI agents that capture leads, answer questions, book appointments, and support customers without code.",
    url: "https://mybamboo.ai",
    siteName: "Bamboo AI",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#07110d",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${oswald.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider>
          <AnimatedGradient />
          <PageViewTracker />
          <a
            href="#main-content"
            className="fixed left-4 top-3 z-[70] -translate-y-20 rounded-md bg-bamboo px-4 py-3 text-sm font-semibold text-background transition focus:translate-y-0"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
          <ExitIntentModal />
          <MobileStickyCTA />
        </TooltipProvider>
      </body>
    </html>
  );
}
