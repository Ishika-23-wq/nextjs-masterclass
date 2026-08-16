import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Layers,
  FolderGit2,
  Code2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Terminal,
  Database,
  HelpCircle,
  Trophy,
} from "lucide-react";
import { syllabusUnits } from "@/data/syllabus";
import { SupabaseRunner } from "@/components/classroom/SupabaseRunner";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section inspired by Dr. Puneet Thapar's learning portal */}
      <section className="relative pt-12 sm:pt-20 pb-8 overflow-hidden">
        {/* Subtle light emerald glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Eyebrow code tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-700 font-mono shadow-xs">
            <span className="text-emerald-700 font-bold">&lt;int257-syllabus/&gt;</span>
            <span className="text-zinc-300">•</span>
            <span className="text-amber-800 font-bold">100% Free • No Signups</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 max-w-4xl mx-auto leading-tight sm:leading-tight">
            Learn <span className="text-emerald-700">Next.js App Router</span> the way modern servers render it.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            A complete, classroom-ready platform for students who know JavaScript: read concepts in <strong>simple Q&A format</strong>, edit real code in a live runner, and build full-stack Supabase applications.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/units/unit-1/intro-and-project-structure"
              className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Learning Tutorials</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/practice"
              className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-2xl font-bold text-sm shadow-xs transition-all hover:border-zinc-300"
            >
              <Trophy className="h-4 w-4 text-amber-600" />
              <span>Practice Arena</span>
            </Link>

            <Link
              href="/playground"
              className="flex items-center gap-2 px-5 py-3.5 bg-white/80 hover:bg-white border border-zinc-200 text-zinc-700 rounded-2xl font-semibold text-sm transition-all shadow-2xs"
            >
              <Code2 className="h-4 w-4 text-emerald-600" />
              <span>Live Playground</span>
            </Link>
          </div>

          {/* Hero Statistics Bar */}
          <div className="pt-8 border-t border-zinc-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 bg-white rounded-3xl border border-zinc-200 shadow-xs">
              <div className="text-2xl font-black text-zinc-900 font-mono">6 Units</div>
              <div className="text-xs text-zinc-500 font-sans">Full INT257 Syllabus</div>
            </div>
            <div className="p-4 bg-white rounded-3xl border border-emerald-200 shadow-xs bg-emerald-50/20">
              <div className="text-2xl font-black text-emerald-700 font-mono">25 Topics</div>
              <div className="text-xs text-zinc-500 font-sans">14-Part Deep Lessons</div>
            </div>
            <div className="p-4 bg-white rounded-3xl border border-amber-200 shadow-xs bg-amber-50/20">
              <div className="text-2xl font-black text-amber-700 font-mono">5 Projects</div>
              <div className="text-xs text-zinc-500 font-sans">Guided Portfolios</div>
            </div>
            <div className="p-4 bg-white rounded-3xl border border-purple-200 shadow-xs bg-purple-50/20">
              <div className="text-2xl font-black text-purple-700 font-mono">Live</div>
              <div className="text-xs text-zinc-500 font-sans">Runner + Supabase DB</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bite-Sized Q&A Sample Cards on Home (Less Content, Maximum Clarity) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="font-mono text-xs text-amber-800 font-bold px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200">
            &lt;quick-faq/&gt;
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
            Next.js Core Concepts in Bite-Sized Q&A
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            No dense textbook paragraphs. Short, punchy answers designed for quick understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center border border-emerald-200">Q1</span>
              <h3 className="font-bold text-sm text-zinc-900">What is a Server Component?</h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              A React component that runs <strong>only on the server</strong> and sends <strong>0 KB JavaScript</strong> to the client browser.
            </p>
            <div className="text-[11px] font-mono text-emerald-700 pt-1 font-bold">
              ✓ Fast mobile performance
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-mono font-bold text-xs flex items-center justify-center border border-amber-200">Q2</span>
              <h3 className="font-bold text-sm text-zinc-900">When do I need 'use client'?</h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Only when you need browser state (`useState`), effects (`useEffect`), or user clicks (`onClick`, `onChange`).
            </p>
            <div className="text-[11px] font-mono text-amber-700 pt-1 font-bold">
              ✓ Keep client bundles tiny
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono font-bold text-xs flex items-center justify-center border border-purple-200">Q3</span>
              <h3 className="font-bold text-sm text-zinc-900">What is a Server Action?</h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              An async backend function marked with `'use server'` that handles database mutations directly from forms with zero API routes.
            </p>
            <div className="text-[11px] font-mono text-purple-700 pt-1 font-bold">
              ✓ Direct database integration
            </div>
          </div>
        </div>
      </section>

      {/* Complete Syllabus Units Grid (Units 1 to 6) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="font-mono text-xs text-emerald-800 font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
              &lt;curriculum/&gt;
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-2">All 6 Academic Units</h2>
            <p className="text-xs sm:text-sm text-zinc-600">Structured lessons with interactive run sandboxes and quizzes.</p>
          </div>
          <Link
            href="/units"
            className="text-xs font-mono text-emerald-700 font-bold hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View Full Syllabus</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {syllabusUnits.map((unit) => (
            <div
              key={unit.id}
              className="p-6 rounded-3xl bg-white border border-zinc-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-6 group shadow-xs hover:shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {unit.badge}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono font-medium">{unit.topics.length} Lessons</span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                  {unit.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                  {unit.description}
                </p>

                {/* Topic Pill Previews */}
                <div className="space-y-1.5 pt-2">
                  {unit.topics.slice(0, 3).map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/units/${unit.id}/${topic.id}`}
                      className="block p-2.5 rounded-2xl bg-zinc-50 hover:bg-emerald-50 border border-zinc-200/80 hover:border-emerald-200 text-xs text-zinc-700 transition-all truncate font-medium"
                    >
                      • {topic.title}
                    </Link>
                  ))}
                  {unit.topics.length > 3 && (
                    <span className="text-[11px] text-zinc-400 font-mono pl-1">
                      + {unit.topics.length - 3} more lessons...
                    </span>
                  )}
                </div>
              </div>

              <Link
                href={`/units/${unit.id}`}
                className="w-full py-2.5 bg-zinc-100 hover:bg-emerald-600 text-zinc-800 hover:text-white rounded-2xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enter Unit {unit.unitNumber}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Live Interactive Supabase Simulator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="space-y-1">
          <span className="font-mono text-xs text-emerald-800 font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
            &lt;live-database/&gt;
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 mt-2">Live Supabase Database Runner</h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            Write JavaScript queries and inspect simulated PostgreSQL responses directly in your browser.
          </p>
        </div>
        <SupabaseRunner />
      </section>
    </div>
  );
}
