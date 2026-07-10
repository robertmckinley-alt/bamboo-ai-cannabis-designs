import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { AnimatedGradient } from "@/components/funnel/animated-gradient";
import { ExitIntentModal, Footer, Navbar } from "@/components/funnel/navigation";
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
        <TooltipProvider>
          <AnimatedGradient />
          <PageViewTracker />
          <Navbar />
          {children}
          <Footer />
          <ExitIntentModal />
        </TooltipProvider>
      </body>
    </html>
  );
}
