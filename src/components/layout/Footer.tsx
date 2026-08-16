import Link from "next/link";
import { ShieldCheck, Zap, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white mt-20 pb-20 lg:pb-12 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xs font-mono">
                &lt;N/&gt;
              </div>
              <span className="font-extrabold text-zinc-900 text-sm">NextMastery • INT257 Syllabus</span>
            </div>
            <p className="text-xs text-zinc-600 max-w-md leading-relaxed">
              A complete, free, mobile-first interactive Next.js learning platform designed for students who already know JavaScript but are learning modern React and Next.js App Router for the first time.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-xs text-emerald-800 border border-emerald-200 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>100% Free • No Signups • No Login • Privacy First</span>
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
                <Link href="/quiz-arena" className="hover:text-emerald-700 transition-colors">
                  Interactive Quiz Arena
                </Link>
              </li>
              <li>
                <Link href="/reference" className="hover:text-emerald-700 transition-colors">
                  Next.js Tag & API Reference
                </Link>
              </li>
              <li>
                <Link href="/react-vs-next" className="hover:text-emerald-700 transition-colors">
                  React vs Next.js Matrix
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
