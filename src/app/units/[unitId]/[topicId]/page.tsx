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
import { topicQnADatabase } from "@/data/qna-data";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ReactVsNextBox } from "@/components/classroom/ReactVsNextBox";
import { MistakesBox } from "@/components/classroom/MistakesBox";
import { DecisionGuideBox } from "@/components/classroom/DecisionGuideBox";
import { CodeSandbox } from "@/components/classroom/CodeSandbox";
import { QuizWidget } from "@/components/classroom/QuizWidget";
import { TopicNavigation } from "@/components/classroom/TopicNavigation";
import { SupabaseRunner } from "@/components/classroom/SupabaseRunner";
import { QnACards } from "@/components/classroom/QnACards";
import { TutorialSidebar } from "@/components/classroom/TutorialSidebar";

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

  const qnaList = topicQnADatabase[topic.id] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* 2-Column Tutorial Layout: Sidebar + Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sticky Sidebar Navigation */}
        <TutorialSidebar currentUnitId={unitId} currentTopicId={topicId} />

        {/* Right Main Classroom Content */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Top Breadcrumb & Eyebrow */}
          <div className="space-y-3 border-b border-zinc-200 pb-5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-800 font-bold px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200">
                &lt;{unit.badge.toLowerCase().replace(" ", "-")}/&gt;
              </span>
              <span className="text-zinc-300">•</span>
              <span className="font-mono text-xs text-amber-800 font-bold px-2 py-0.5 rounded-md bg-amber-100 border border-amber-200">
                &lt;lesson-{String(topic.order).padStart(2, "0")}/&gt;
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {topic.title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans">
              {topic.shortSummary}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-600 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Q&A FAST-TRACK SECTION (Bite-sized answers, low content density, high clarity) */}
          {qnaList.length > 0 && (
            <section className="space-y-4">
              <QnACards items={qnaList} topicTitle={topic.title} />
            </section>
          )}

          {/* SECTION 1: Simple Explanation */}
          <section id="simple-explanation" className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-800 font-bold px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200">
                &lt;concept/&gt;
              </span>
              <h2 className="text-lg font-bold text-zinc-900">1. Simple Explanation</h2>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed font-sans">
              {topic.simpleExplanation}
            </p>
          </section>

          {/* SECTION 2: Why it is needed */}
          <section id="why-needed" className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-amber-800 font-bold px-2 py-0.5 rounded-md bg-amber-100 border border-amber-200">
                &lt;why-needed/&gt;
              </span>
              <h2 className="text-lg font-bold text-zinc-900">2. Why Is This Needed?</h2>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed font-sans">
              {topic.whyNeeded}
            </p>
          </section>

          {/* SECTIONS 3 & 4: React vs Next.js Approach */}
          <section id="react-vs-next" className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-purple-800 font-bold px-2 py-0.5 rounded-md bg-purple-100 border border-purple-200">
                &lt;react-vs-next/&gt;
              </span>
              <h2 className="text-lg font-bold text-zinc-900">3 & 4. React Way vs Next.js Way</h2>
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

                    <CodeBlock code={way.codeSnippet} language="tsx" showLineNumbers={false} />

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

          {/* SECTION 11: Practice Arena */}
          <section id="exercises" className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-800 font-bold px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200">
                  &lt;practice/&gt;
                </span>
                <h2 className="text-lg font-bold text-zinc-900">11. Hands-on Practice Sandbox</h2>
              </div>
              <span className="text-xs font-mono text-zinc-500">Run in Browser</span>
            </div>

            {topic.exercises.map((ex) => (
              <div key={ex.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">{ex.title}</h3>
                  <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                    {ex.difficulty} • ~{ex.estimatedMinutes} min
                  </span>
                </div>
                <p className="text-xs text-zinc-600">{ex.prompt}</p>

                <CodeSandbox
                  initialCode={ex.initialCode}
                  solutionCode={ex.solutionCode}
                  hints={ex.hints}
                  expectedOutput={ex.expectedOutput}
                  explanation={ex.solutionExplanation}
                  title={ex.title}
                />
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

          {/* SECTION 12: Quiz Questions */}
          {topic.quizzes && topic.quizzes.length > 0 && (
            <section id="quizzes" className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-800 font-bold px-2 py-0.5 rounded-md bg-amber-100 border border-amber-200">
                  &lt;quiz/&gt;
                </span>
                <h2 className="text-lg font-bold text-zinc-900">12. Knowledge Check Quiz</h2>
              </div>
              <QuizWidget questions={topic.quizzes} topicTitle={`${topic.title} Quiz`} />
            </section>
          )}

          {/* SECTION 13: Real-World Example */}
          {topic.realWorldExample && (
            <section className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
                <span className="font-mono text-xs text-emerald-800 font-bold px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200">
                  &lt;real-world/&gt;
                </span>
                <h2 className="text-lg font-bold text-zinc-900">13. Real-World Architecture</h2>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-amber-800 font-bold">
                  Domain: {topic.realWorldExample.domain}
                </span>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {topic.realWorldExample.description}
                </p>
              </div>
              <CodeBlock
                code={topic.realWorldExample.code.code}
                language={topic.realWorldExample.code.language}
                filename={topic.realWorldExample.code.filename}
              />
              <p className="text-xs text-emerald-800 font-mono font-bold">
                💡 <strong>Key Takeaway:</strong> {topic.realWorldExample.keyTakeaway}
              </p>
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
