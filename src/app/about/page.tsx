import Link from "next/link";
import { BookOpen, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Laptop, Award } from "lucide-react";

export const metadata = {
  title: "About INT257 Next.js Learning Platform",
  description: "Official educational syllabus overview and design philosophy for the INT257 Next.js course.",
};

export default function AboutCoursePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="font-mono text-xs text-amber-800 font-bold px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200">
          &lt;course-background/&gt;
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          About NextMastery & INT257
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          The official interactive companion platform for the INT257 Full-Stack Web Technologies curriculum.
        </p>
      </div>

      {/* Mission & Audience Card */}
      <div className="p-8 rounded-3xl bg-white border border-zinc-200 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
          <Sparkles className="h-5 w-5" />
          <span>Core Educational Goal</span>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">
          Bridging JavaScript Developers into Full-Stack Next.js Architects
        </h2>
        <p className="text-sm text-zinc-700 leading-relaxed font-sans">
          Most modern web frameworks assume students have already built multiple applications in React. This creates an enormous barrier for undergraduates who are comfortable with JavaScript but haven't learned React yet.
        </p>
        <p className="text-sm text-zinc-700 leading-relaxed font-sans">
          NextMastery takes a <strong>foundation-first teaching style</strong>: we teach React fundamentals (JSX, components, props, state) only when necessary, then constantly illustrate the <strong>"React Way vs Next.js Way"</strong> to explain <em>why</em> Next.js does things differently.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>Zero Barrier & Privacy First</span>
          </div>
          <h3 className="font-bold text-base text-zinc-900">No Signups, Accounts, or Logins</h3>
          <p className="text-xs text-zinc-600 leading-relaxed font-sans">
            Students can access 100% of lessons, practice sandboxes, and quizzes immediately. All personal bookmarks and notes are stored strictly in local browser memory (`localStorage`).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <Laptop className="h-5 w-5 text-amber-600" />
            <span>Classroom Ready</span>
          </div>
          <h3 className="font-bold text-base text-zinc-900">Interactive Coding in Every Lesson</h3>
          <p className="text-xs text-zinc-600 leading-relaxed font-sans">
            Every topic includes interactive code playgrounds, instant quiz grading with celebratory confetti, and 5 progressively harder full-stack projects.
          </p>
        </div>
      </div>

      {/* Syllabus Structure Summary */}
      <div className="p-8 rounded-3xl bg-white border border-zinc-200 space-y-6 shadow-xs">
        <h2 className="text-xl font-bold text-zinc-900">The 6 INT257 Units at a Glance</h2>

        <div className="grid gap-3">
          {[
            { unit: "Unit 1", title: "Next.js Fundamentals & App Router", desc: "Project structure, dynamic routes ([slug]), layouts, navigation, and streaming loading UI." },
            { unit: "Unit 2", title: "Rendering Paradigms & Data Fetching", desc: "SSR, SSG, ISR, Server Components (0 KB bundle), Client Components ('use client'), and caching." },
            { unit: "Unit 3", title: "Route Handlers, Server Actions & Forms", desc: "RESTful APIs, Server Actions ('use server'), forms, Zod validation, and Optimistic UI." },
            { unit: "Unit 4", title: "Auth Concepts, Databases & Supabase CRUD", desc: "Sessions, cookies, middleware guards, PostgreSQL schema, Supabase CRUD, and environment secrets." },
            { unit: "Unit 5", title: "SEO, Performance, Images & Deployment", desc: "next/image, dynamic metadata, Core Web Vitals, code splitting, Docker standalone, and Vercel." },
            { unit: "Unit 6", title: "Advanced Architecture, Security & Testing", desc: "Parallel routes (@slots), Intercepting routes ((.)photo), Edge runtime, i18n, CSP, and Playwright." },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-800">{item.unit}:</span>
                  <span className="text-sm font-bold text-zinc-900">{item.title}</span>
                </div>
                <p className="text-xs text-zinc-600 font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-zinc-200 flex justify-center">
          <Link
            href="/units"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
          >
            <span>Explore All 6 Units Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
