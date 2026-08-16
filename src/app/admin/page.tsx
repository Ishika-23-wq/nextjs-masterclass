"use client";

import { useState, useEffect } from "react";
import {
  ShieldAlert,
  Plus,
  Save,
  BookOpen,
  HelpCircle,
  Trash2,
  Database,
  Check,
  Lock,
  KeyRound,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { syllabusUnits } from "@/data/syllabus";
import { allTopics } from "@/data/topics";
import { QnAItem } from "@/data/qna-data";
import {
  getCustomTopics,
  saveCustomTopic,
  deleteCustomTopic,
  saveCustomQnAItem,
} from "@/lib/content-store";
import { TopicContent } from "@/types";
import { CodeBlock } from "@/components/ui/CodeBlock";

const ADMIN_SESSION_KEY = "nextmastery_admin_auth_token";
// Default instructor master passkey (can also be customized via NEXT_PUBLIC_ADMIN_PASSKEY)
const MASTER_PASSKEY = process.env.NEXT_PUBLIC_ADMIN_PASSKEY || "int257admin";

export default function AdminContentStudio() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPasskey, setInputPasskey] = useState("");
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<"create-topic" | "add-qna" | "manage-topics" | "supabase-sync">("create-topic");
  const [customTopicsList, setCustomTopicsList] = useState<TopicContent[]>([]);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Topic Creator Form State
  const [selectedUnitId, setSelectedUnitId] = useState("unit-1");
  const [topicId, setTopicId] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [shortSummary, setShortSummary] = useState("");
  const [tags, setTags] = useState("App Router, Server Components");
  const [simpleExplanation, setSimpleExplanation] = useState("");
  const [whyNeeded, setWhyNeeded] = useState("");
  
  // React vs Next.js Diff
  const [reactCode, setReactCode] = useState(`// Traditional React\nimport { useState, useEffect } from 'react';\n\nexport function Component() {\n  // Client state...\n}`);
  const [nextCode, setNextCode] = useState(`// Modern Next.js Server Component\nexport default async function Component() {\n  // Server computation with 0 KB JS...\n}`);
  const [whyDifferent, setWhyDifferent] = useState("");
  const [mentalShift, setMentalShift] = useState("");

  // Code Example
  const [basicCode, setBasicCode] = useState(`export default function Lesson() {\n  return <div>Next.js Masterclass</div>;\n}`);
  
  // Practice Exercise
  const [exercisePrompt, setExercisePrompt] = useState("Write a server component that renders...");
  const [exerciseInitialCode, setExerciseInitialCode] = useState("// Write your solution here\n");
  const [exerciseSolutionCode, setExerciseSolutionCode] = useState("// Solution\n");

  // Q&A Creator State
  const [qnaTargetTopicId, setQnaTargetTopicId] = useState(allTopics[0]?.id || "intro-and-project-structure");
  const [qnaQuestion, setQnaQuestion] = useState("");
  const [qnaAnswer, setQnaAnswer] = useState("");
  const [qnaReactContrast, setQnaReactContrast] = useState("");
  const [qnaTip, setQnaTip] = useState("");

  useEffect(() => {
    // Check if admin is already logged in for this browser session
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (token === "authenticated") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const refresh = () => setCustomTopicsList(getCustomTopics());
      refresh();
      window.addEventListener("admin_content_updated", refresh);
      return () => window.removeEventListener("admin_content_updated", refresh);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPasskey.trim() === MASTER_PASSKEY) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "authenticated");
      }
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
    setIsAuthenticated(false);
    setInputPasskey("");
  };

  const handleSaveTopic = () => {
    if (!topicId || !topicTitle || !simpleExplanation) {
      alert("Please fill in at least Topic ID, Title, and Simple Explanation.");
      return;
    }

    const newTopic: TopicContent = {
      id: topicId.trim().toLowerCase().replace(/\s+/g, "-"),
      unitId: selectedUnitId,
      order: allTopics.filter((t) => t.unitId === selectedUnitId).length + 1,
      title: topicTitle.trim(),
      shortSummary: shortSummary.trim() || topicTitle.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      simpleExplanation: simpleExplanation.trim(),
      whyNeeded: whyNeeded.trim() || simpleExplanation.trim(),
      reactVsNext: {
        concept: topicTitle.trim(),
        reactWay: {
          title: "Traditional React Approach",
          code: reactCode,
          explanation: "In React, execution happens on client.",
          drawbacks: ["Client-side bundle overhead", "Extra useEffect boilerplate"],
        },
        nextjsWay: {
          title: "Next.js App Router Approach",
          code: nextCode,
          explanation: "In Next.js, code executes directly on server.",
          benefits: ["0 KB client bundle", "Instant pre-rendering"],
        },
        whyDifferent: whyDifferent || "Next.js optimizes for server rendering and low latency.",
        mentalShiftSummary: mentalShift || "Shift from client-side useEffect fetching to direct async Server Components.",
      },
      basicExample: {
        title: "Basic Implementation",
        description: "Standard Next.js implementation.",
        code: basicCode,
        language: "tsx",
        filename: "src/app/example/page.tsx",
        explanation: "Simple and robust implementation.",
      },
      moreExamples: [],
      multipleWays: [],
      decisionGuide: {
        recommendationSummary: "Use Server Components for data display, Client Components for interactivity.",
        scenarios: [
          { scenario: "Static data display", recommendedApproach: "Server Component", reason: "Zero JS bundle" },
        ],
      },
      commonMistakes: [],
      bestPractices: [
        { title: "Default to Server Components", rule: "Only add 'use client' when needed", explanation: "Keeps client bundle minimal." },
      ],
      exercises: [
        {
          id: `ex-${topicId}`,
          title: `Practice: ${topicTitle}`,
          difficulty: "easy",
          estimatedMinutes: 10,
          prompt: exercisePrompt,
          initialCode: exerciseInitialCode,
          expectedOutput: "Component compiles and renders server markup.",
          hints: ["Use default exported async function", "Return valid JSX"],
          solutionCode: exerciseSolutionCode,
          solutionExplanation: "Follows Next.js App Router conventions.",
        },
      ],
      quizzes: [
        {
          id: `q1-${topicId}`,
          syllabusTopic: topicTitle.trim(),
          question: `What is the core benefit of ${topicTitle}?`,
          options: [
            { id: "A", text: "Runs directly on the server with zero client overhead", isCorrect: true, explanation: "Correct! Eliminates client JS." },
            { id: "B", text: "Requires manual Webpack configuration", isCorrect: false, explanation: "Next.js manages configuration automatically." },
            { id: "C", text: "Only works with class components", isCorrect: false, explanation: "Next.js uses standard modern functions." },
            { id: "D", text: "Disables HTML rendering", isCorrect: false, explanation: "Next.js produces pre-rendered HTML." },
          ],
          conceptualExplanation: "Server-side execution eliminates client JavaScript overhead.",
        },
      ],
      realWorldExample: {
        domain: "Full-Stack Web App",
        description: "Used in production SaaS applications for fast content delivery.",
        code: { title: "Production Setup", description: "Real-world module", code: basicCode, language: "tsx", filename: "production-app.tsx" },
        keyTakeaway: "Server-first architecture minimizes client-side complexity.",
      },
      combinedExample: {
        combinedTopics: ["App Router", "Server Actions"],
        title: "Combined Implementation",
        description: "Integrates with existing Next.js patterns.",
        code: { title: "Combined Pipeline", description: "Multi-feature pipeline", code: basicCode, language: "tsx", filename: "combined.tsx" },
        stepByStepFlow: ["1. Fetch data on server", "2. Pass to UI component"],
      },
    };

    saveCustomTopic(newTopic);
    setSaveStatus(`✓ Lesson "${topicTitle}" published successfully!`);
    setTimeout(() => setSaveStatus(null), 3000);

    // Reset fields
    setTopicId("");
    setTopicTitle("");
    setShortSummary("");
    setSimpleExplanation("");
    setWhyNeeded("");
  };

  const handleSaveQnA = () => {
    if (!qnaQuestion || !qnaAnswer) {
      alert("Please enter both question and answer.");
      return;
    }

    const item: QnAItem = {
      question: qnaQuestion.trim(),
      shortAnswer: qnaAnswer.trim(),
      reactContrast: qnaReactContrast.trim() || undefined,
      tip: qnaTip.trim() || undefined,
    };

    saveCustomQnAItem(qnaTargetTopicId, item);
    setSaveStatus(`✓ Q&A added to topic "${qnaTargetTopicId}"!`);
    setTimeout(() => setSaveStatus(null), 3000);

    setQnaQuestion("");
    setQnaAnswer("");
    setQnaReactContrast("");
    setQnaTip("");
  };

  // RESTRICTED ACCESS SCREEN (If not authenticated as admin)
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="p-8 bg-white border border-zinc-200 rounded-3xl shadow-lg space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 mx-auto">
            <Lock className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold text-zinc-900">Admin Author Studio</h1>
            <p className="text-xs text-zinc-500">
              Restricted area for course instructors to manage and publish curriculum content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-zinc-700">Admin Passkey</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="password"
                  value={inputPasskey}
                  onChange={(e) => setInputPasskey(e.target.value)}
                  placeholder="Enter instructor passkey..."
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-600 font-bold">
                Invalid passkey. Access restricted to curriculum authors.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Unlock Admin Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <p className="text-[11px] text-zinc-400 font-mono border-t border-zinc-100 pt-3">
            NextMastery INT257 • Secure Runtime Gate
          </p>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN STUDIO
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-xs font-mono font-bold text-emerald-800">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Author Mode Active • Only Visible to You</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            NextMastery Content Studio
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600">
            Create, edit, and publish new syllabus lessons, bite-sized Q&A cards, and database schemas.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-rose-50 hover:text-rose-700 text-zinc-700 border border-zinc-200 self-start transition-colors"
          title="Lock admin studio"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Lock Studio</span>
        </button>
      </div>

      {/* Save Alert Status */}
      {saveStatus && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="h-4 w-4 text-emerald-700" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
        {[
          { id: "create-topic", label: "Create New Lesson", icon: Plus },
          { id: "add-qna", label: "Add Q&A Question", icon: HelpCircle },
          { id: "manage-topics", label: `Manage Custom Lessons (${customTopicsList.length})`, icon: BookOpen },
          { id: "supabase-sync", label: "Supabase DB Schema", icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                  : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CREATE NEW TOPIC */}
      {activeTab === "create-topic" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 space-y-6 shadow-xs">
          <div className="border-b border-zinc-200 pb-3">
            <h2 className="text-xl font-bold text-zinc-900">Publish a New Syllabus Topic</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Fills all 14 structured educational sections automatically.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 font-mono">Target Unit</label>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 font-sans"
              >
                {syllabusUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.badge}: {u.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 font-mono">Topic URL Slug (e.g. server-actions-deep-dive)</label>
              <input
                type="text"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                placeholder="my-new-topic-slug"
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">Topic Title</label>
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              placeholder="e.g. Master React 19 useActionState in Next.js"
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">Short Summary (1-2 sentences)</label>
            <input
              type="text"
              value={shortSummary}
              onChange={(e) => setShortSummary(e.target.value)}
              placeholder="e.g. Learn how useActionState handles server form status and pending indicators."
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">1. Simple Explanation (Easy English for JS Devs)</label>
            <textarea
              value={simpleExplanation}
              onChange={(e) => setSimpleExplanation(e.target.value)}
              placeholder="Explain what this concept is in plain, friendly English without unnecessary jargon..."
              rows={3}
              className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-zinc-900 leading-relaxed font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">2. Why Is This Needed?</label>
            <textarea
              value={whyNeeded}
              onChange={(e) => setWhyNeeded(e.target.value)}
              placeholder="Explain the real problem this solves..."
              rows={2}
              className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-zinc-900 leading-relaxed font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-rose-800 font-mono">React Approach (Before Next.js)</label>
              <textarea
                value={reactCode}
                onChange={(e) => setReactCode(e.target.value)}
                rows={5}
                className="w-full p-3 bg-[#211F2E] border border-[#333045] rounded-2xl font-mono text-xs text-rose-300 leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-emerald-800 font-mono">Next.js App Router Approach</label>
              <textarea
                value={nextCode}
                onChange={(e) => setNextCode(e.target.value)}
                rows={5}
                className="w-full p-3 bg-[#211F2E] border border-[#333045] rounded-2xl font-mono text-xs text-emerald-300 leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">5. Basic Code Example</label>
            <textarea
              value={basicCode}
              onChange={(e) => setBasicCode(e.target.value)}
              rows={6}
              className="w-full p-3 bg-[#211F2E] border border-[#333045] rounded-2xl font-mono text-xs text-emerald-300 leading-relaxed"
            />
          </div>

          <button
            onClick={handleSaveTopic}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Save className="h-4 w-4" />
            <span>Publish Lesson into Curriculum</span>
          </button>
        </div>
      )}

      {/* TAB 2: ADD BITE-SIZED Q&A */}
      {activeTab === "add-qna" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 space-y-6 shadow-xs">
          <div className="border-b border-zinc-200 pb-3">
            <h2 className="text-xl font-bold text-zinc-900">Add a Bite-Sized Q&A Question</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Enhance topic classrooms with instant, punchy Q&A cards.</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">Target Lesson Topic</label>
            <select
              value={qnaTargetTopicId}
              onChange={(e) => setQnaTargetTopicId(e.target.value)}
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 font-sans"
            >
              {allTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.unitId.toUpperCase()}: {t.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">Question Title</label>
            <input
              type="text"
              value={qnaQuestion}
              onChange={(e) => setQnaQuestion(e.target.value)}
              placeholder="e.g. How do I pass data from Server Component to Client Component?"
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 font-mono">Short Punchy Answer (1-3 sentences)</label>
            <textarea
              value={qnaAnswer}
              onChange={(e) => setQnaAnswer(e.target.value)}
              placeholder="Pass the data as standard React props! Server Components can pass serializable props (objects, strings, arrays) directly to Client Components."
              rows={3}
              className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs text-zinc-900 leading-relaxed font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-amber-800 font-mono">React Contrast (Optional)</label>
            <input
              type="text"
              value={qnaReactContrast}
              onChange={(e) => setQnaReactContrast(e.target.value)}
              placeholder="e.g. In React, you had to fetch via useEffect on the client."
              className="w-full p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-zinc-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-purple-800 font-mono">Pro-Tip / Key Rule (Optional)</label>
            <input
              type="text"
              value={qnaTip}
              onChange={(e) => setQnaTip(e.target.value)}
              placeholder="e.g. Functions cannot be passed as props across the Server/Client boundary."
              className="w-full p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-zinc-900"
            />
          </div>

          <button
            onClick={handleSaveQnA}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Save Q&A to Lesson</span>
          </button>
        </div>
      )}

      {/* TAB 3: MANAGE CUSTOM TOPICS */}
      {activeTab === "manage-topics" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 space-y-6 shadow-xs">
          <div className="border-b border-zinc-200 pb-3">
            <h2 className="text-xl font-bold text-zinc-900">Custom Published Lessons ({customTopicsList.length})</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Review, export, or delete admin-created topics.</p>
          </div>

          {customTopicsList.length > 0 ? (
            <div className="space-y-4">
              {customTopicsList.map((t) => (
                <div
                  key={t.id}
                  className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {t.unitId.toUpperCase()}
                      </span>
                      <h3 className="font-bold text-sm text-zinc-900">{t.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-600 font-mono">Path: /units/{t.unitId}/{t.id}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteCustomTopic(t.unitId, t.id)}
                      className="p-2 text-zinc-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Delete topic"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <a
                      href={`/units/${t.unitId}/${t.id}`}
                      target="_blank"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                    >
                      Preview Lesson →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-zinc-500 space-y-2">
              <BookOpen className="h-8 w-8 text-zinc-300 mx-auto" />
              <p className="text-sm font-bold text-zinc-700">No Custom Topics Yet</p>
              <p className="text-xs text-zinc-500">Use the 'Create New Lesson' tab above to publish your first topic.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SUPABASE DB SCHEMA & SYNC */}
      {activeTab === "supabase-sync" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 space-y-6 shadow-xs">
          <div className="border-b border-zinc-200 pb-3">
            <h2 className="text-xl font-bold text-zinc-900">Supabase Database Schema & Sync</h2>
            <p className="text-xs text-zinc-500 mt-0.5">PostgreSQL SQL scripts to store course content in Supabase tables.</p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-zinc-700">Run in Supabase SQL Editor:</span>
            <CodeBlock
              language="sql"
              code={`-- 1. Create Topics Table
CREATE TABLE IF NOT EXISTS public.curriculum_topics (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL,
  order_index INT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.curriculum_topics ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Policy (Anyone can read lessons without login)
CREATE POLICY "Public Read Topics" 
ON public.curriculum_topics 
FOR SELECT 
USING (true);

-- 4. Admin Mutation Policy
CREATE POLICY "Admin Write Topics" 
ON public.curriculum_topics 
FOR ALL 
USING (auth.role() = 'service_role');`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
