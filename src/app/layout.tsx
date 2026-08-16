import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NextMastery INT257",
    default: "NextMastery • INT257 Interactive Next.js Masterclass",
  },
  description:
    "A complete, free, mobile-first interactive Next.js learning platform for students who already know JavaScript but are learning modern React & Next.js App Router for the first time.",
  keywords: [
    "Next.js",
    "INT257",
    "App Router",
    "Server Components",
    "Server Actions",
    "Supabase",
    "TypeScript",
    "Tailwind CSS",
    "Interactive Tutorial",
  ],
  authors: [{ name: "NextMastery Education Team" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "NextMastery • INT257 Interactive Next.js Masterclass",
    description:
      "Master Next.js App Router from JavaScript basics to full-stack Supabase applications. Zero signup, zero accounts.",
    siteName: "NextMastery INT257",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#faf9f6] text-zinc-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950 font-sans">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
