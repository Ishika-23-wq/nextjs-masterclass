"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Mic,
  Code2,
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Copy,
  Check,
  Flame,
  ArrowRight,
  Layers,
  FileCode2,
  Gamepad2,
  Lightbulb,
} from "lucide-react";
import { bootcampCurriculum, BootcampHour, BootcampSection } from "@/data/bootcamp-script";

type FilterMode = "all" | "speaker" | "code" | "analogies" | "quizzes";

export function BootcampViewer() {
  const [selectedHour, setSelectedHour] = useState<number | "all">("all");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  // Toggle reveal state for check-in questions
  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Copy code to clipboard
  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Filter sections by search and hour
  const filteredCurriculum = useMemo(() => {
    return bootcampCurriculum
      .filter((hour) => selectedHour === "all" || hour.hourNumber === selectedHour)
      .map((hour) => {
        const filteredSections = hour.sections.filter((section) => {
          if (!searchQuery.trim()) return true;
          const q = searchQuery.toLowerCase();
          const matchesTitle = section.title.toLowerCase().includes(q);
          const matchesSpeech = section.spokenScript.toLowerCase().includes(q);
          const matchesAnalogies = section.analogies.some(
            (a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
          );
          const matchesCode = section.codeBlocks.some(
            (c) => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
          );
          return matchesTitle || matchesSpeech || matchesAnalogies || matchesCode;
        });

        return {
          ...hour,
          sections: filteredSections,
        };
      })
      .filter((hour) => hour.sections.length > 0);
  }, [selectedHour, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
        {/* Row 1: Search & Hour Navigation */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Hour Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-2xl border border-zinc-200/80">
            <button
              onClick={() => setSelectedHour("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedHour === "all"
                  ? "bg-white text-zinc-900 shadow-xs border border-zinc-200/80"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              All 4 Hours
            </button>
            {bootcampCurriculum.map((hour) => (
              <button
                key={hour.hourNumber}
                onClick={() => setSelectedHour(hour.hourNumber)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedHour === hour.hourNumber
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <span>Hour {hour.hourNumber}</span>
                <span className="text-[10px] opacity-75 font-mono">({hour.timeRange.split("–")[0].trim()})</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, analogies, or code..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Filter Mode Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100">
          <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold mr-1">Focus Filter:</span>
          
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterMode === "all"
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Full Lecture Script</span>
          </button>

          <button
            onClick={() => setFilterMode("speaker")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterMode === "speaker"
                ? "bg-purple-700 text-white"
                : "bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100"
            }`}
          >
            <Mic className="h-3.5 w-3.5" />
            <span>🎤 Speech Script Only</span>
          </button>

          <button
            onClick={() => setFilterMode("code")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterMode === "code"
                ? "bg-emerald-700 text-white"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>💻 JavaScript Code Only</span>
          </button>

          <button
            onClick={() => setFilterMode("analogies")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterMode === "analogies"
                ? "bg-amber-700 text-white"
                : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>🧠 10-Yr-Old Analogies</span>
          </button>

          <button
            onClick={() => setFilterMode("quizzes")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterMode === "quizzes"
                ? "bg-blue-700 text-white"
                : "bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100"
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>✅ Check-in Arena</span>
          </button>
        </div>
      </div>

      {/* Script Content List */}
      <div className="space-y-12">
        {filteredCurriculum.map((hour) => (
          <div key={hour.hourNumber} className="space-y-6">
            {/* Hour Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white shadow-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {hour.badge}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {hour.timeRange}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{hour.title}</h2>
                <p className="text-xs sm:text-sm text-zinc-300">{hour.subtitle}</p>
              </div>
            </div>

            {/* Sections in this Hour */}
            <div className="space-y-8">
              {hour.sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs space-y-0 transition-all hover:border-zinc-300"
                >
                  {/* Section Title Header */}
                  <div className="p-5 sm:p-6 bg-zinc-50/80 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-white border border-zinc-200 text-zinc-700 shadow-2xs">
                        ⏱️ {section.timeRange}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-900">{section.title}</h3>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">
                      Budget: <strong>{section.durationMinutes} min</strong>
                    </span>
                  </div>

                  {/* Section Content Area */}
                  <div className="p-5 sm:p-6 space-y-6">
                    {/* 1. Spoken Script Card (🎤) */}
                    {(filterMode === "all" || filterMode === "speaker") && (
                      <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
                        <div className="flex items-center gap-2 text-purple-900 font-bold text-xs font-mono uppercase tracking-wider">
                          <Mic className="h-4 w-4 text-purple-600 animate-pulse" />
                          <span>🎤 What to say out loud (Speech Script)</span>
                        </div>
                        <blockquote className="text-sm sm:text-base text-purple-950 font-sans leading-relaxed pl-1 italic">
                          &ldquo;{section.spokenScript}&rdquo;
                        </blockquote>
                      </div>
                    )}

                    {/* 2. Kid-Friendly Analogies (🧠) */}
                    {(filterMode === "all" || filterMode === "analogies") &&
                      section.analogies.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs font-mono uppercase tracking-wider">
                            <Lightbulb className="h-4 w-4 text-amber-600" />
                            <span>🧠 10-Year-Old Analogies (Mental Models)</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {section.analogies.map((analogy, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5"
                              >
                                <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                                  <span className="text-lg">{analogy.emoji}</span>
                                  <span>{analogy.title}</span>
                                </div>
                                <p className="text-xs text-amber-900 leading-relaxed font-sans">
                                  {analogy.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* 3. Live Code Snippets (💻 Plain JavaScript / JSX) */}
                    {(filterMode === "all" || filterMode === "code") &&
                      section.codeBlocks.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs font-mono uppercase tracking-wider">
                            <Code2 className="h-4 w-4 text-emerald-600" />
                            <span>💻 Live Code to Type (Plain JavaScript & JSX)</span>
                          </div>
                          {section.codeBlocks.map((block, i) => {
                            const copyId = `${section.id}-code-${i}`;
                            const isCopied = copiedCodeIndex === copyId;

                            return (
                              <div
                                key={i}
                                className="rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden shadow-sm"
                              >
                                <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <FileCode2 className="h-3.5 w-3.5 text-emerald-400" />
                                    <span className="text-xs font-mono text-zinc-300 font-semibold">
                                      {block.filename || block.title}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => handleCopy(block.code, copyId)}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[11px] font-mono text-zinc-300 transition-colors"
                                  >
                                    {isCopied ? (
                                      <>
                                        <Check className="h-3 w-3 text-emerald-400" />
                                        <span className="text-emerald-400 font-bold">Copied!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="h-3 w-3" />
                                        <span>Copy Code</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                                  <code>{block.code}</code>
                                </pre>
                                {block.explanation && (
                                  <div className="px-4 py-2.5 bg-zinc-900/50 border-t border-zinc-800/80 text-xs text-zinc-400 font-sans">
                                    💡 <strong>Note:</strong> {block.explanation}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                    {/* 4. Interactive Live Check-in Questions (✅) */}
                    {(filterMode === "all" || filterMode === "quizzes") &&
                      section.checkInQuestions.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs font-mono uppercase tracking-wider">
                            <HelpCircle className="h-4 w-4 text-blue-600" />
                            <span>✅ Quick Check-in Questions (Ask the Room)</span>
                          </div>
                          <div className="space-y-2">
                            {section.checkInQuestions.map((quiz, i) => {
                              const qKey = `${section.id}-quiz-${i}`;
                              const isRevealed = revealedAnswers[qKey];

                              return (
                                <div
                                  key={i}
                                  className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-3 transition-all"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-2">
                                      <span className="text-sm font-black text-blue-700 font-mono">Q{i + 1}:</span>
                                      <p className="font-bold text-xs sm:text-sm text-blue-950 font-sans">
                                        {quiz.question}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => toggleAnswer(qKey)}
                                      className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shrink-0 shadow-2xs flex items-center gap-1"
                                    >
                                      <span>{isRevealed ? "Hide Answer" : "Reveal Answer ✨"}</span>
                                    </button>
                                  </div>

                                  {isRevealed && (
                                    <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs space-y-1 animate-in fade-in duration-200">
                                      <div className="font-bold text-emerald-700 flex items-center gap-1">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span>Answer: {quiz.answer}</span>
                                      </div>
                                      <p className="text-zinc-600 pl-4">{quiz.why}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    {/* 5. Mini Interactive Live Coding Challenge */}
                    {section.interactiveExercise && (
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs font-mono uppercase">
                            <Gamepad2 className="h-4 w-4 text-emerald-700" />
                            <span>{section.interactiveExercise.title}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                            ⏱️ {section.interactiveExercise.duration}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-950">{section.interactiveExercise.prompt}</p>
                      </div>
                    )}

                    {/* 6. Key Takeaways Pills */}
                    {section.keyTakeaways.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {section.keyTakeaways.map((takeaway, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-sans px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center gap-1"
                          >
                            <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                            <span>{takeaway}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
