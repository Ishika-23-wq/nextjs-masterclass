import Link from "next/link";
import { ShieldCheck, Zap, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-[#e8e2d8] bg-white mt-20 pb-20 lg:pb-12 pt-12">
      {/* Decorative Washi Tape on Footer */}
      <div
        className="h-5 w-48 -rotate-1 absolute -top-2.5 left-1/2 -translate-x-1/2 pointer-events-none rounded-xs opacity-90 shadow-xs"
        style={{
          backgroundColor: "rgba(163, 214, 175, 0.7)",
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs font-mono shadow-xs border-2 border-white">
                &lt;N/&gt;
              </div>
              <span className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                NextMastery • INT257
                <span className="text-xs">🌸</span>
              </span>
            </div>
            <p className="text-xs text-stone-600 max-w-md leading-relaxed font-sans">
              A cozy, aesthetic, beginner-first Next.js learning companion for students who know JavaScript. Built with simple explanations, live code runners, and cute stationery motivation!
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf6ee] text-xs text-[#2e5939] border border-[#bfe0c6] font-mono shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-[#5b9669]" />
              <span>100% Free • No Signups • Studyblr Aesthetic 🍵</span>
            </div>
          </div>

          {/* Quick Syllabus Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-zinc-900 font-bold tracking-wider">
              Course Syllabus
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/units/unit-1" className="hover:text-emerald-700 transition-colors">
                  Unit 1: Fundamentals & App Router
                </Link>
              </li>
              <li>
                <Link href="/units/unit-2" className="hover:text-emerald-700 transition-colors">
                  Unit 2: Rendering & Data Fetching
                </Link>
              </li>
              <li>
                <Link href="/units/unit-3" className="hover:text-emerald-700 transition-colors">
                  Unit 3: Route Handlers & Server Actions
                </Link>
              </li>
              <li>
                <Link href="/units/unit-4" className="hover:text-emerald-700 transition-colors">
                  Unit 4: Supabase CRUD & Auth Concepts
                </Link>
              </li>
              <li>
                <Link href="/units/unit-5" className="hover:text-emerald-700 transition-colors">
                  Unit 5: SEO, Images & Deployment
                </Link>
              </li>
              <li>
                <Link href="/units/unit-6" className="hover:text-emerald-700 transition-colors">
                  Unit 6: Advanced Architecture & Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Practical Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-zinc-900 font-bold tracking-wider">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/practice" className="hover:text-emerald-700 transition-colors">
                  Practice Arena (Exercises)
                </Link>
              </li>
              <li>
                <Link href="/cheatsheet" className="hover:text-emerald-700 transition-colors">
                  Master Cheatsheet &amp; Boilerplates
                </Link>
              </li>
              <li>
                <Link href="/reference" className="hover:text-emerald-700 transition-colors">
                  Next.js Tag & API Reference
                </Link>
              </li>
              <li>
                <Link href="/react-vs-next" className="hover:text-emerald-700 transition-colors">
                  Next.js Architecture Matrix
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-emerald-700 transition-colors">
                  5 Guided Full-Stack Projects
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-emerald-700 transition-colors">
                  Live Code Playground Sandbox
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>© 2026 NextMastery • Developed for INT257 Full-Stack Curriculum</p>
          <p>Zero Personal Data Stored on Server</p>
        </div>
      </div>
    </footer>
  );
}
