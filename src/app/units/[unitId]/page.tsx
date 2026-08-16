import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, ChevronLeft } from "lucide-react";
import { syllabusUnits } from "@/data/syllabus";
import { getTopicsByUnit } from "@/data/topics";

interface UnitPageProps {
  params: Promise<{ unitId: string }>;
}

export default async function UnitOverviewPage({ params }: UnitPageProps) {
  const { unitId } = await params;
  const unit = syllabusUnits.find((u) => u.id === unitId);

  if (!unit) {
    notFound();
  }

  const unitTopics = getTopicsByUnit(unit.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Back Link */}
      <Link
        href="/units"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-emerald-700 font-bold transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to All Units</span>
      </Link>

      {/* Unit Header Banner */}
      <div className="p-8 rounded-3xl bg-white border border-zinc-200 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            {unit.badge}
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700">{unit.tagline}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          {unit.title}
        </h1>
        <p className="text-sm text-zinc-600 max-w-3xl leading-relaxed">
          {unit.description}
        </p>

        <div className="pt-4 border-t border-zinc-200">
          <h4 className="text-xs font-mono uppercase text-zinc-700 font-bold mb-2">
            Unit Core Competencies:
          </h4>
          <div className="flex flex-wrap gap-2">
            {unit.coreConcepts.map((concept, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono font-medium"
              >
                ✓ {concept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Lessons in this Unit ({unitTopics.length})</h2>

        <div className="grid gap-4">
          {unitTopics.map((topic, index) => (
            <Link
              key={topic.id}
              href={`/units/${unit.id}/${topic.id}`}
              className="p-5 rounded-3xl bg-white hover:bg-emerald-50/40 border border-zinc-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group shadow-xs hover:shadow-sm"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-zinc-100 text-zinc-800 font-mono text-xs flex items-center justify-center font-bold border border-zinc-200">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-base text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed pl-8 font-sans">
                  {topic.shortSummary}
                </p>
                <div className="flex items-center gap-2 pl-8 pt-1">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {topic.order * 3 + 10} min
                </span>
                <span className="px-4 py-2 bg-zinc-100 group-hover:bg-emerald-600 text-zinc-800 group-hover:text-white rounded-2xl text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs">
                  <span>Start Lesson</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
