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
  Mic,
} from "lucide-react";
import { syllabusUnits } from "@/data/syllabus";
import { SupabaseRunner } from "@/components/classroom/SupabaseRunner";
import {
  WashiTape,
  StickerBadge,
  MildlinerText,
  StudyBuddyMascot,
} from "@/components/ui/StudyStickers";
import { TopicFlowDiagram } from "@/components/classroom/TopicFlowDiagram";
import { getTopicDiagram } from "@/data/topic-diagrams";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with Study To Success / Aesthetic Stationery Theme */}
      <section className="relative pt-10 sm:pt-16 pb-6 overflow-hidden">
        {/* Soft pastel matcha & sakura aura */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-[#edf6ee] rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-[#fdf0f4] rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Floating Aesthetic Stickers Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pb-1">
            <StickerBadge emoji="🧸" label="Study Buddy" color="sakura" tilt="rotate-[-2.5deg]" />
            <StickerBadge emoji="🍵" label="Studyblr Mode" color="matcha" tilt="rotate-[1.5deg]" />
            <StickerBadge emoji="✏️" label="Pure JavaScript" color="honey" tilt="rotate-[-1.5deg]" />
            <StickerBadge emoji="🌸" label="Zero Types • 100% Beginner" color="lavender" tilt="rotate-[2deg]" />
          </div>

          {/* Eyebrow code tag with washi feel */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#e5ded6] text-xs text-stone-700 font-mono shadow-2xs">
            <span className="text-[#2e5939] font-bold flex items-center gap-1">
              <span>📌</span> &lt;int257-syllabus/&gt;
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-[#8a2d48] font-bold">4-Hr Live Bootcamp Script (JS)</span>
          </div>

          {/* Main Headline with Mildliner Highlighting */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900 max-w-4xl mx-auto leading-tight sm:leading-tight">
            Learn <span className="mildliner-green">Next.js App Router</span> in a cozy, aesthetic study space.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
            A complete, aesthetic study companion for students learning JavaScript &amp; Next.js: understand architecture through <strong>visual flowcharts</strong>, explore <strong>bite-sized Q&amp;A cards</strong>, and master concepts through <strong>hands-on implementation questions with complete solutions</strong>.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/units/unit-1/intro-and-project-structure"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#5b9669] hover:bg-[#4a8057] text-white rounded-2xl font-bold text-sm shadow-[0_4px_14px_rgba(91,150,105,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#4a8057]"
            >
              <BookOpen className="h-4 w-4" />
              <span>📚 Start Lessons (Pure JS)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/practice"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#8b65bc] hover:bg-[#7853a8] text-white rounded-2xl font-bold text-sm shadow-[0_4px_14px_rgba(139,101,188,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#7853a8]"
            >
              <Trophy className="h-4 w-4 text-purple-200" />
              <span>💻 Practice Arena (Problems &amp; Solutions)</span>
            </Link>

            <Link
              href="/playground"
              className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-[#fef9e8] border border-[#e5ded6] hover:border-[#fce29d] text-stone-800 rounded-2xl font-bold text-sm shadow-2xs transition-all"
            >
              <Code2 className="h-4 w-4 text-[#d99723]" />
              <span>⚡ Live Sandbox</span>
            </Link>
          </div>

          {/* Hero Statistics Bar with Studyblr Stationery Aesthetic */}
          <div className="pt-8 border-t border-[#e8e2d8] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="relative p-4 bg-white/90 rounded-3xl border border-[#e5ded6] shadow-2xs hover:shadow-sm transition-shadow">
              <WashiTape color="matcha" width="w-20" tilt="-rotate-2" />
              <div className="text-2xl font-black text-stone-900 font-mono">6 Units</div>
              <div className="text-xs text-stone-500 font-sans flex items-center gap-1">
                <span>📖</span> Full INT257 Syllabus
              </div>
            </div>
            <div className="relative p-4 bg-white/90 rounded-3xl border border-[#bfe0c6] shadow-2xs bg-[#edf6ee]/30 hover:shadow-sm transition-shadow">
              <WashiTape color="sakura" width="w-20" tilt="rotate-1" />
              <div className="text-2xl font-black text-[#2e5939] font-mono">25 Topics</div>
              <div className="text-xs text-stone-500 font-sans flex items-center gap-1">
                <span>✏️</span> 14-Part Deep Lessons
              </div>
            </div>
            <div className="relative p-4 bg-white/90 rounded-3xl border border-[#fce29d] shadow-2xs bg-[#fef9e8]/30 hover:shadow-sm transition-shadow">
              <WashiTape color="honey" width="w-20" tilt="-rotate-1" />
              <div className="text-2xl font-black text-[#7a5005] font-mono">5 Projects</div>
              <div className="text-xs text-stone-500 font-sans flex items-center gap-1">
                <span>🎒</span> Guided Portfolios
              </div>
            </div>
            <div className="relative p-4 bg-white/90 rounded-3xl border border-[#ddc8f6] shadow-2xs bg-[#f6f1fc]/30 hover:shadow-sm transition-shadow">
              <WashiTape color="lavender" width="w-20" tilt="rotate-2" />
              <div className="text-2xl font-black text-[#54337d] font-mono">Live</div>
              <div className="text-xs text-stone-500 font-sans flex items-center gap-1">
                <span>⚡</span> Runner + Supabase DB
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bite-Sized Q&A Sample Cards on Home (Aesthetic Sticky Note Feel) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="font-mono text-xs text-[#7a5005] font-bold px-3 py-1 rounded-full bg-[#fef9e8] border border-[#fce29d] shadow-2xs">
            &lt;quick-faq/&gt;
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Next.js Core Concepts in <span className="mildliner-yellow">Bite-Sized Q&amp;A</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            No dense textbook paragraphs. Short, punchy answers designed like colorful study flashcards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="relative p-6 rounded-3xl bg-white border border-[#bfe0c6] space-y-3 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5">
            <WashiTape color="matcha" width="w-24" tilt="-rotate-1" />
            <div className="flex items-center gap-2 pt-1">
              <span className="w-7 h-7 rounded-xl bg-[#edf6ee] text-[#2e5939] font-mono font-bold text-xs flex items-center justify-center border border-[#bfe0c6] shadow-2xs">
                Q1
              </span>
              <h3 className="font-bold text-sm text-stone-900">What is a Server Component?</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              A component that runs <strong>only on the server</strong> and sends <strong>0 KB JavaScript</strong> to the client browser.
            </p>
            <div className="text-[11px] font-mono text-[#2e5939] pt-1 font-bold flex items-center gap-1">
              <span>🌿</span> Fast mobile performance
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative p-6 rounded-3xl bg-white border border-[#fce29d] space-y-3 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5">
            <WashiTape color="honey" width="w-24" tilt="rotate-1" />
            <div className="flex items-center gap-2 pt-1">
              <span className="w-7 h-7 rounded-xl bg-[#fef9e8] text-[#7a5005] font-mono font-bold text-xs flex items-center justify-center border border-[#fce29d] shadow-2xs">
                Q2
              </span>
              <h3 className="font-bold text-sm text-stone-900">When do I need &apos;use client&apos;?</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Only when you need browser state (`useState`), effects (`useEffect`), or user clicks (`onClick`, `onChange`).
            </p>
            <div className="text-[11px] font-mono text-[#7a5005] pt-1 font-bold flex items-center gap-1">
              <span>⭐</span> Keeps client bundles tiny
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative p-6 rounded-3xl bg-white border border-[#ddc8f6] space-y-3 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5">
            <WashiTape color="lavender" width="w-24" tilt="-rotate-2" />
            <div className="flex items-center gap-2 pt-1">
              <span className="w-7 h-7 rounded-xl bg-[#f6f1fc] text-[#54337d] font-mono font-bold text-xs flex items-center justify-center border border-[#ddc8f6] shadow-2xs">
                Q3
              </span>
              <h3 className="font-bold text-sm text-stone-900">What is a Server Action?</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              An async backend function marked with `&apos;use server&apos;` that handles database mutations directly from forms with zero API routes.
            </p>
            <div className="text-[11px] font-mono text-[#54337d] pt-1 font-bold flex items-center gap-1">
              <span>🪄</span> Direct database integration
            </div>
          </div>
        </div>
      </section>

      {/* Visual Flowcharts & Diagrams Interactive Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <StickerBadge emoji="📊" label="Visual Architecture" color="matcha" />
            <StickerBadge emoji="🗺️" label="Flowcharts First" color="sky" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Learn Through <MildlinerText color="matcha">Flowcharts &amp; Diagrams</MildlinerText>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans">
            Rather than reading walls of text, see how requests move across the browser, Next.js server, and database with interactive visual pipelines.
          </p>
        </div>

        <TopicFlowDiagram diagram={getTopicDiagram("intro-and-project-structure")} />
      </section>

      {/* Hands-on Implementation & Practice Arena Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1a2f23] via-[#244231] to-[#16271c] text-white shadow-xl overflow-hidden space-y-6 border-2 border-white/10">
          <WashiTape color="matcha" width="w-40" tilt="-rotate-1" />

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#edf6ee]/20 text-[#bfe0c6] border border-[#bfe0c6]/30 flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-emerald-300" />
              <span>💻 Hands-on Implementation Studio</span>
            </span>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#fef9e8]/20 text-[#fce29d] border border-[#fce29d]/30 flex items-center gap-1">
              <span>✨</span> Pure JavaScript Solutions
            </span>
            <span className="text-xs font-sans font-bold px-3 py-1 rounded-full bg-white/10 text-stone-200 border border-white/20 hidden sm:inline-flex items-center gap-1">
              <span>⚡</span> Step-by-Step Explanations
            </span>
          </div>

          <div className="space-y-3 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Sample Implementation Questions &amp; Full Solutions
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
              Learn Next.js by building real code, not memorizing theory. Every topic includes hands-on coding challenges with starter templates, pure JavaScript solutions, expected outputs, and line-by-line breakdown explanations!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
              <div className="text-lg font-bold text-emerald-200 font-mono">50+</div>
              <div className="text-xs text-stone-300">Practical Coding Tasks</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
              <div className="text-lg font-bold text-amber-200 font-mono">100%</div>
              <div className="text-xs text-stone-300">Pure JavaScript</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
              <div className="text-lg font-bold text-sky-200 font-mono">Live</div>
              <div className="text-xs text-stone-300">Browser Code Sandbox</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs">
              <div className="text-lg font-bold text-pink-200 font-mono">Detailed</div>
              <div className="text-xs text-stone-300">Step Explanations</div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-[#FAF8F5] text-stone-900 rounded-2xl font-black text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] border border-stone-200"
            >
              <span>🚀 Launch Practice Arena</span>
              <ArrowRight className="h-4 w-4 text-emerald-700" />
            </Link>
          </div>
        </div>
      </section>

      {/* Complete Syllabus Units Grid (Units 1 to 6) with Pastel Mildliner Notebook Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="font-mono text-xs text-[#2e5939] font-bold px-3 py-1 rounded-full bg-[#edf6ee] border border-[#bfe0c6]">
              &lt;curriculum/&gt;
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
              All 6 <span className="mildliner-green">Academic Units</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Cozy, structured lessons with interactive run sandboxes, cute flashcards, and quizzes.
            </p>
          </div>
          <Link
            href="/units"
            className="text-xs font-mono text-[#2e5939] font-bold hover:text-[#1c4026] flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-[#e5ded6] shadow-2xs"
          >
            <span>📖 View Full Syllabus</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {syllabusUnits.map((unit, uIdx) => {
            const washiColors: Array<"matcha" | "sky" | "honey" | "sakura" | "lavender" | "latte"> = [
              "matcha",
              "sky",
              "honey",
              "sakura",
              "lavender",
              "latte",
            ];
            const washiColor = washiColors[uIdx % washiColors.length];

            const unitPillStyles = [
              "bg-[#edf6ee] text-[#2e5939] border-[#bfe0c6]",
              "bg-[#eef6fd] text-[#1c4b78] border-[#bcdcfa]",
              "bg-[#fef9e8] text-[#7a5005] border-[#fce29d]",
              "bg-[#fdf0f4] text-[#8a2d48] border-[#f7c2d1]",
              "bg-[#f6f1fc] text-[#54337d] border-[#ddc8f6]",
              "bg-[#f7f2ea] text-[#59422a] border-[#dfceba]",
            ];
            const pillStyle = unitPillStyles[uIdx % unitPillStyles.length];

            return (
              <div
                key={unit.id}
                className="relative p-6 rounded-3xl bg-white border border-[#e5ded6] hover:border-stone-400 transition-all flex flex-col justify-between space-y-6 group shadow-2xs hover:shadow-md hover:-translate-y-0.5"
              >
                <WashiTape color={washiColor} width="w-24" tilt={uIdx % 2 === 0 ? "-rotate-1" : "rotate-1"} />

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border shadow-2xs ${pillStyle}`}>
                      {unit.badge}
                    </span>
                    <span className="text-xs text-stone-500 font-mono font-medium flex items-center gap-1">
                      <span>✏️</span> {unit.topics.length} Lessons
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#2e5939] transition-colors leading-snug">
                    {unit.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 font-sans">
                    {unit.description}
                  </p>

                  {/* Topic Pill Previews */}
                  <div className="space-y-1.5 pt-2">
                    {unit.topics.slice(0, 3).map((topic) => (
                      <Link
                        key={topic.id}
                        href={`/units/${unit.id}/${topic.id}`}
                        className="block p-2.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#edf6ee] border border-[#e8e2d8] hover:border-[#bfe0c6] text-xs text-stone-700 transition-all truncate font-medium hover:text-[#2e5939]"
                      >
                        • {topic.title}
                      </Link>
                    ))}
                    {unit.topics.length > 3 && (
                      <span className="text-[11px] text-stone-400 font-mono pl-1">
                        + {unit.topics.length - 3} more lessons...
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/units/${unit.id}`}
                  className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#5b9669] text-stone-800 hover:text-white rounded-2xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 border border-[#e5ded6] hover:border-[#5b9669] shadow-2xs group-hover:bg-[#5b9669] group-hover:text-white"
                >
                  <span>Enter Unit {unit.unitNumber}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
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
