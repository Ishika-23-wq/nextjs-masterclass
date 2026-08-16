"use client";

import { useState } from "react";
import { allUnitQuizzes } from "@/data/quizzes";
import { QuizWidget } from "@/components/classroom/QuizWidget";
import { syllabusUnits } from "@/data/syllabus";

export default function QuizArenaPage() {
  const [activeUnitId, setActiveUnitId] = useState("unit-1");

  const currentQuestions = allUnitQuizzes[activeUnitId] || [];
  const currentUnit = syllabusUnits.find((u) => u.id === activeUnitId);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="font-mono text-xs text-amber-800 font-bold px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200">
          &lt;examination-practice/&gt;
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          INT257 Quiz Arena
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Test your conceptual understanding across all 6 units with immediate explanations, score tracking, and instant feedback.
        </p>
      </div>

      {/* Unit Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
        {syllabusUnits.map((unit) => (
          <button
            key={unit.id}
            onClick={() => setActiveUnitId(unit.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              activeUnitId === unit.id
                ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            {unit.badge}: {unit.title.split("&")[0]}
          </button>
        ))}
      </div>

      {/* Active Quiz Widget */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900">
            {currentUnit?.badge}: {currentUnit?.title}
          </h2>
          <span className="text-xs font-mono text-zinc-500 font-medium">
            {currentQuestions.length} Questions
          </span>
        </div>

        <QuizWidget
          key={activeUnitId}
          questions={currentQuestions}
          topicTitle={`${currentUnit?.title} Assessment`}
        />
      </div>
    </div>
  );
}
