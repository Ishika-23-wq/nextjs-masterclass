import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Sparkles,
  HelpCircle,
  Code2,
  Layers,
  Compass,
  AlertOctagon,
  Award,
  Globe,
  GitMerge,
  BookOpen,
  CheckCircle,
  Database,
  ArrowRight,
} from "lucide-react";
import { getTopicById, getAdjacentTopics } from "@/data/topics";
import { syllabusUnits } from "@/data/syllabus";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ReactVsNextBox } from "@/components/classroom/ReactVsNextBox";
import { MistakesBox } from "@/components/classroom/MistakesBox";
import { DecisionGuideBox } from "@/components/classroom/DecisionGuideBox";
import { CodeSandbox } from "@/components/classroom/CodeSandbox";
import { TopicNavigation } from "@/components/classroom/TopicNavigation";
import { SupabaseRunner } from "@/components/classroom/SupabaseRunner";
import { EasyTopicExplainer } from "@/components/classroom/EasyTopicExplainer";
import { AuthVisualRoadmap } from "@/components/classroom/AuthVisualRoadmap";
import { TutorialSidebar } from "@/components/classroom/TutorialSidebar";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";
import { getTopicDiagram } from "@/data/topic-diagrams";
import { TopicFlowDiagram } from "@/components/classroom/TopicFlowDiagram";

interface TopicClassroomProps {
  params: Promise<{ unitId: string; topicId: string }>;
}

export async function generateMetadata({ params }: TopicClassroomProps) {
  const { unitId, topicId } = await params;
  const topic = getTopicById(unitId, topicId);
  if (!topic) return { title: "Topic Not Found" };

  return {
    title: `${topic.title} | INT257 NextMastery`,
    description: topic.shortSummary,
  };
}

export default async function TopicClassroomPage({ params }: TopicClassroomProps) {
  const { unitId, topicId } = await params;
  const topic = getTopicById(unitId, topicId);
  const unit = syllabusUnits.find((u) => u.id === unitId);

  if (!topic || !unit) {
    notFound();
  }

  const { prevTopic, nextTopic } = getAdjacentTopics(unitId, topicId);
  const isDatabaseRelated =
    topic.tags.includes("Supabase") ||
    topic.tags.includes("CRUD") ||
    topic.tags.includes("Databases");

  const diagram = getTopicDiagram(topic.id, topic.title, topic.shortSummary);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* 2-Column Tutorial Layout: Sidebar + Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sticky Sidebar Navigation */}
        <TutorialSidebar currentUnitId={unitId} currentTopicId={topicId} />

        {/* Right Main Classroom Content */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Top Breadcrumb & Eyebrow with Study Stickers */}
          <div className="space-y-3 border-b border-[#e8e2d8] pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <StickerBadge emoji="📖" label={unit.badge} color="matcha" size="sm" tilt="rotate-[-1deg]" />
              <StickerBadge emoji="✏️" label={`Lesson ${String(topic.order).padStart(2, "0")}`} color="honey" size="sm" tilt="rotate-1" />
              <span className="text-[11px] font-mono font-bold text-[#8a2d48] px-2.5 py-0.5 rounded-full bg-[#fdf0f4] border border-[#f7c2d1] hidden sm:inline-flex items-center gap-1">
                <span>🧸</span> Studyblr Mode
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {topic.title}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              {topic.shortSummary}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-3 py-1 rounded-full bg-white border border-[#e5ded6] text-stone-600 font-semibold shadow-2xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* EASY VISUAL GUIDE: 3-Step Intuitive Breakdown (Zero Q&A Form) */}
          <section id="easy-guide" className="space-y-4">
            <EasyTopicExplainer
              title={topic.title}
              simpleExplanation={topic.simpleExplanation}
              whyNeeded={topic.whyNeeded}
              tags={topic.tags}
            />
          </section>

          {/* VISUAL ARCHITECTURE & FLOWCHART SECTION */}
          <section id="visual-flowchart" className="space-y-4">
            <TopicFlowDiagram diagram={diagram} />
          </section>

          {/* SECTIONS 3 & 4: Next.js Core Pattern & Architecture */}
          <section id="nextjs-pattern" className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#2e5939] font-bold px-3 py-1 rounded-full bg-[#edf6ee] border border-[#bfe0c6]">
                &lt;nextjs-pattern/&gt;
              </span>
              <h2 className="text-lg font-bold text-stone-900">3 &amp; 4. Next.js Core Architecture &amp; Pattern</h2>
            </div>
            <ReactVsNextBox comparison={topic.reactVsNext} />
          </section>

          {/* SECTION 5: Basic Code Example */}
          <section id="basic-example" className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-800 font-bold px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200">
                &lt;code/&gt;
              </span>
              <h2 className="text-lg font-bold text-zinc-900">5. Basic Code Example</h2>
            </div>
            <CodeBlock
              code={topic.basicExample.code}
              language={topic.basicExample.language}
              filename={topic.basicExample.filename}
            />
            {topic.basicExample.explanation && (
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
                <strong>Breakdown:</strong> {topic.basicExample.explanation}
              </p>
            )}
          </section>

          {/* SECTION 7: Multiple Ways */}
          {topic.multipleWays && topic.multipleWays.length > 0 && (
            <section id="multiple-ways" className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-800 font-bold px-2 py-0.5 rounded-md bg-amber-100 border border-amber-200">
                  &lt;alternatives/&gt;
                </span>
                <h2 className="text-lg font-bold text-zinc-900">7. Multiple Ways to Perform This Task</h2>
              </div>

              <div className="grid gap-4">
                {topic.multipleWays.map((way, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-zinc-900">{way.name}</h3>
                      {way.isRecommended && (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                          Recommended
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-700 font-mono bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                      {way.syntax}
                    </p>

                    <CodeBlock code={way.codeSnippet} language="jsx" showLineNumbers={false} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="space-y-1 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <span className="font-mono text-emerald-800 font-bold">Pros:</span>
                        <ul className="list-disc list-inside text-zinc-700 space-y-0.5">
                          {way.pros.map((pro, pIdx) => (
                            <li key={pIdx}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-1 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                        <span className="font-mono text-rose-800 font-bold">Cons:</span>
                        <ul className="list-disc list-inside text-zinc-700 space-y-0.5">
                          {way.cons.map((con, cIdx) => (
                            <li key={cIdx}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 8: Decision Guide */}
          {topic.decisionGuide && (
            <section id="decision-guide">
              <DecisionGuideBox guide={topic.decisionGuide} />
            </section>
          )}

          {/* SECTION 9: Common Mistakes */}
          {topic.commonMistakes && topic.commonMistakes.length > 0 && (
            <section id="common-mistakes">
              <MistakesBox mistakes={topic.commonMistakes} />
            </section>
          )}

          {/* SECTION 11: Hands-On Implementation Labs & Solutions */}
          <section id="exercises" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e8e2d8] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#2e5939] font-bold px-3 py-1 rounded-full bg-[#edf6ee] border border-[#bfe0c6]">
                    &lt;hands-on-labs/&gt;
                  </span>
                  <StickerBadge emoji="💻" label="Implementation Lab" color="matcha" size="sm" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  Hands-On Implementation Labs &amp; Solutions
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans">
                  Learn by building real code. Every lab includes an interactive runnable sandbox, complete pure JavaScript solution, and step-by-step breakdown explanation!
                </p>
              </div>
            </div>

            {topic.exercises.map((ex, idx) => (
              <div
                key={ex.id}
                className="relative p-6 sm:p-7 rounded-3xl bg-white border border-[#e5ded6] space-y-5 shadow-2xs hover:shadow-sm transition-shadow"
              >
                <WashiTape color={idx % 2 === 0 ? "matcha" : "honey"} width="w-28" tilt={idx % 2 === 0 ? "-rotate-1" : "rotate-1"} />

                {/* Lab Header & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e8e2d8] pb-3 pt-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-xl bg-[#edf6ee] text-[#2e5939] font-mono font-bold text-xs flex items-center justify-center border border-[#bfe0c6] shadow-2xs">
                      Lab {idx + 1}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-stone-900">{ex.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#fef9e8] text-[#7a5005] border border-[#fce29d] font-bold">
                      {ex.difficulty} • ~{ex.estimatedMinutes} min
                    </span>
                  </div>
                </div>

                {/* Task Objective */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#e8e2d8] space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-stone-500 flex items-center gap-1">
                    <span>📝</span> Building Objective:
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans font-medium">
                    {ex.prompt}
                  </p>
                  {ex.expectedOutput && (
                    <div className="text-xs text-[#2e5939] font-mono bg-[#edf6ee]/70 p-2.5 rounded-xl border border-[#bfe0c6] flex items-center gap-1.5">
                      <span>🎯</span> <strong>Expected Output:</strong> {ex.expectedOutput}
                    </div>
                  )}
                </div>

                {/* Live In-Browser Code Sandbox */}
                <CodeSandbox
                  initialCode={ex.initialCode}
                  solutionCode={ex.solutionCode}
                  hints={ex.hints}
                  expectedOutput={ex.expectedOutput}
                  explanation={ex.solutionExplanation}
                  title={`Lab ${idx + 1}: ${ex.title}`}
                />

                {/* Complete Solution & Step-by-Step Explanation */}
                <div className="p-5 rounded-2xl bg-[#edf6ee]/40 border border-[#bfe0c6] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">💡</span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#2e5939] font-mono uppercase tracking-wide">
                        Verified Pure JavaScript Solution
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-[#2e5939] border border-[#bfe0c6]">
                      Pure JS (ES6+)
                    </span>
                  </div>

                  <CodeBlock
                    code={ex.solutionCode}
                    language="jsx"
                    filename="solution.js"
                    showLineNumbers={false}
                  />

                  <div className="p-3.5 bg-white rounded-xl border border-[#bfe0c6] text-xs text-stone-800 leading-relaxed font-sans space-y-1">
                    <strong className="text-[#2e5939] font-mono block">Why &amp; How This Works:</strong>
                    <p>{ex.solutionExplanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Database Query Simulator */}
          {isDatabaseRelated && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-800 font-bold px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200">
                  &lt;database/&gt;
                </span>
                <h2 className="text-lg font-bold text-zinc-900">Interactive Supabase Sandbox</h2>
              </div>
              <SupabaseRunner />
            </section>
          )}

          {/* SECTION 13: Real-World Architecture */}
          {topic.realWorldExample && (
            <section className="relative p-6 sm:p-7 rounded-3xl bg-white border border-[#e8e2d8] space-y-5 shadow-2xs hover:shadow-sm transition-shadow">
              <WashiTape color="latte" width="w-28" tilt="-rotate-1" />
              <div className="flex items-center justify-between border-b border-[#e8e2d8] pb-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-emerald-800 font-bold px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200">
                    &lt;real-world-architecture/&gt;
                  </span>
                  <h2 className="text-lg font-bold text-stone-900">13. Real-World Visual Architecture</h2>
                </div>
                <StickerBadge emoji="🏢" label={topic.realWorldExample.domain} color="honey" size="sm" />
              </div>

              {/* 3-Stage Visual Architecture Pipeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-sky-800 flex items-center gap-1">
                    <span>🏢</span> 1. Business Domain
                  </span>
                  <p className="text-xs text-stone-800 font-semibold">{topic.realWorldExample.domain}</p>
                </div>
                <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 flex items-center gap-1">
                    <span>⚡</span> 2. Next.js Pattern
                  </span>
                  <p className="text-xs text-stone-800 font-semibold">Pure JS App Router</p>
                </div>
                <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-800 flex items-center gap-1">
                    <span>🚀</span> 3. Production Goal
                  </span>
                  <p className="text-xs text-stone-800 font-semibold">Zero-Latency HTML Stream</p>
                </div>
              </div>

              <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-[#e8e2d8]">
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  {topic.realWorldExample.description}
                </p>
              </div>

              <CodeBlock
                code={topic.realWorldExample.code.code}
                language={topic.realWorldExample.code.language}
                filename={topic.realWorldExample.code.filename}
              />

              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2">
                <span className="text-base">💡</span>
                <span><strong>Key Takeaway:</strong> {topic.realWorldExample.keyTakeaway}</span>
              </div>
            </section>
          )}

          {/* Topic Navigation */}
          <TopicNavigation
            currentTopicId={topic.id}
            currentUnitId={unit.id}
            currentTitle={topic.title}
            prevTopic={prevTopic}
            nextTopic={nextTopic}
          />
        </div>
      </div>
    </div>
  );
}
