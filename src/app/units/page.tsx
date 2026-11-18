import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { syllabusUnits } from "@/data/syllabus";
import { getTopicsByUnit } from "@/data/topics";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

export const metadata = {
  title: "Next.js Syllabus & Tutorials Directory",
  description: "Comprehensive INT257 syllabus lessons with 14 deep sections, live runners, and quizzes.",
};

export default function UnitsIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <StickerBadge emoji="📖" label="Full Curriculum" color="matcha" size="sm" tilt="rotate-[-1deg]" />
          <StickerBadge emoji="✨" label="INT257 Approved" color="honey" size="sm" tilt="rotate-[1deg]" />
          <StickerBadge emoji="🍵" label="Studyblr Mode" color="lavender" size="sm" tilt="rotate-[-2deg]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Comprehensive Next.js <span className="mildliner-green">Curriculum</span>
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed font-sans">
          Master every single topic in the INT257 syllabus with simple explanations, everyday analogies, interactive code runners, quizzes, and real-world architectures.
        </p>
      </div>

      {/* Units List */}
      <div className="space-y-10">
        {syllabusUnits.map((unit, uIdx) => {
          const unitTopics = getTopicsByUnit(unit.id);
          const washiColors: Array<"matcha" | "sky" | "honey" | "sakura" | "lavender" | "latte"> = [
            "matcha",
            "sky",
            "honey",
            "sakura",
            "lavender",
            "latte",
          ];
          const washiColor = washiColors[uIdx % washiColors.length];

          return (
            <div
              key={unit.id}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#e5ded6] space-y-6 shadow-2xs hover:shadow-sm transition-shadow"
            >
              <WashiTape color={washiColor} width="w-32" tilt={uIdx % 2 === 0 ? "-rotate-1" : "rotate-1"} />

              {/* Unit Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#e8e2d8] pb-5 pt-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#fef9e8] text-[#7a5005] border border-[#fce29d] shadow-2xs">
                      Unit {unit.unitNumber}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">{unit.tagline}</span>
                  </div>
                  <h2 className="text-2xl font-black text-stone-900">{unit.title}</h2>
                </div>

                <Link
                  href={`/units/${unit.id}`}
                  className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#5b9669] text-stone-800 hover:text-white rounded-2xl text-xs font-bold transition-all shrink-0 border border-[#e5ded6] hover:border-[#5b9669] shadow-2xs"
                >
                  View Unit Overview →
                </Link>
              </div>

              {/* Core Concepts Badges */}
              <div className="flex flex-wrap gap-2">
                {unit.coreConcepts.map((concept, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-emerald-50/70 border border-emerald-200 text-emerald-900 font-mono font-medium"
                  >
                    ✓ {concept}
                  </span>
                ))}
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unit.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/units/${unit.id}/${topic.id}`}
                    className="p-5 rounded-2xl bg-zinc-50/70 hover:bg-emerald-50/50 border border-zinc-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3 group shadow-2xs hover:shadow-xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-600 font-bold">
                          {topic.level}
                        </span>
                        <span className="text-xs text-zinc-500 flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3" />
                          {topic.estimatedReadTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-zinc-900 group-hover:text-emerald-700 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                      <span>Open Classroom</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
