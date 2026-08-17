import Link from "next/link";
import { Mic, Sparkles, Clock, BookOpen, Layers, ArrowRight, Award, Trophy, Code2 } from "lucide-react";
import { BootcampViewer } from "@/components/classroom/BootcampViewer";

export const metadata = {
  title: "4-Hour Live Bootcamp Lecture Script (JS & ELI10 Edition) | INT257",
  description:
    "Complete 4-hour live lecture script for Next.js Module 1 & 2: spoken script (🎤), live JavaScript code (💻), 10-year-old analogies (🧠), and room check-in questions (✅).",
};

export default function BootcampScriptPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-purple-800 font-bold px-3 py-1 rounded-full bg-purple-100 border border-purple-200 flex items-center gap-1.5 shadow-2xs">
            <Mic className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
            <span>&lt;live-bootcamp-script/&gt;</span>
          </span>
          <span className="font-mono text-xs text-emerald-800 font-bold px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
            Plain JavaScript • Zero TypeScript Bloat
          </span>
          <span className="font-mono text-xs text-amber-800 font-bold px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200">
            ELI10 Level (Kid-Friendly)
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
          Next.js 4-Hour <span className="text-emerald-700">Bootcamp Lecture Script</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans">
          <strong>Module 1: Fundamentals of Next.js</strong> and <strong>Module 2: Routing &amp; Navigation</strong>. Includes the 4 Lego rules of React, the blank screen problem, magic folder routing, <code>await params</code> gift unwrapping, unbreakable layout frames, and instant <code>&lt;Link&gt;</code> teleportation.
        </p>

        {/* Quick Legend Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 flex items-center gap-2">
            <span className="text-base">🎤</span>
            <div>
              <strong>Spoken Script</strong>
              <div className="text-[10px] text-purple-700">Read out loud</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2">
            <span className="text-base">💻</span>
            <div>
              <strong>Live JS Code</strong>
              <div className="text-[10px] text-emerald-700">Type on screen</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2">
            <span className="text-base">🧠</span>
            <div>
              <strong>Fun Analogies</strong>
              <div className="text-[10px] text-amber-700">Cookie cutters &amp; toys</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center gap-2">
            <span className="text-base">✅</span>
            <div>
              <strong>Check-In Quizzes</strong>
              <div className="text-[10px] text-blue-700">Ask the room</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Bootcamp Viewer */}
      <BootcampViewer />

      {/* Footer Navigation CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-lg text-white">Ready to test your skills in the Practice Arena?</h3>
          <p className="text-xs text-zinc-400">Put what you learned into action with interactive coding exercises and quizzes.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/units/unit-1/intro-and-project-structure"
            className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
          >
            Unit 1 Classroom →
          </Link>
          <Link
            href="/practice"
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
          >
            Practice Arena →
          </Link>
        </div>
      </div>
    </div>
  );
}
