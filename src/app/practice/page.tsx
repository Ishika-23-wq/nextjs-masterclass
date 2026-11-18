"use client";

import { useState } from "react";
import { Code2, Trophy, Filter, CheckCircle2, Clock, Play, Lightbulb, Sparkles } from "lucide-react";
import { allCodingChallenges } from "@/data/exercises";
import { CodeSandbox } from "@/components/classroom/CodeSandbox";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

export default function PracticeArenaPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [activeChallengeId, setActiveChallengeId] = useState<string>(allCodingChallenges[0]?.id || "");

  const filteredChallenges = selectedDifficulty === "all"
    ? allCodingChallenges
    : allCodingChallenges.filter((ch) => ch.difficulty === selectedDifficulty);

  const activeChallenge = allCodingChallenges.find((ch) => ch.id === activeChallengeId) || allCodingChallenges[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header with Cute Study Aesthetic */}
      <div className="space-y-4 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <StickerBadge emoji="🎯" label="Practice Arena" color="honey" size="sm" tilt="rotate-[-1deg]" />
          <StickerBadge emoji="💻" label="Pure JS Runners" color="matcha" size="sm" tilt="rotate-[1deg]" />
          <StickerBadge emoji="🧸" label="Self-Paced Study" color="sakura" size="sm" tilt="rotate-[-2deg]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Next.js Practice <span className="mildliner-green">Exercises</span>
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed font-sans">
          Sharpen your skills with progressive coding challenges from Very Easy to Hard &amp; Combined tasks. Edit the code, run it live in your browser, and verify solutions with zero setup.
        </p>
      </div>

      {/* Difficulty Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4">
        <span className="text-xs font-mono text-zinc-500 flex items-center gap-1 mr-2">
          <Filter className="h-3.5 w-3.5" /> Filter:
        </span>
        {[
          { id: "all", label: "All Challenges" },
          { id: "very-easy", label: "Very Easy" },
          { id: "easy", label: "Easy" },
          { id: "medium", label: "Medium" },
          { id: "hard", label: "Hard" },
          { id: "combined", label: "Combined" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedDifficulty(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
              selectedDifficulty === tab.id
                ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Practice Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        {/* Left Challenges Sidebar */}
        <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
          <span className="text-xs font-mono uppercase text-zinc-500 font-bold pl-1">
            Available Exercises ({filteredChallenges.length})
          </span>
          <div className="space-y-2">
            {filteredChallenges.map((ch) => {
              const isActive = activeChallenge?.id === ch.id;

              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChallengeId(ch.id)}
                  className={`w-full text-left p-4 rounded-3xl border transition-all space-y-2 ${
                    isActive
                      ? "bg-emerald-50/70 border-emerald-400 shadow-sm"
                      : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                      ch.difficulty === "very-easy" || ch.difficulty === "easy"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : ch.difficulty === "medium"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-purple-100 text-purple-800 border border-purple-200"
                    }`}>
                      {ch.difficulty}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {ch.estimatedMinutes}m
                    </span>
                  </div>

                  <h3 className={`font-bold text-xs sm:text-sm line-clamp-1 ${isActive ? "text-emerald-950" : "text-zinc-900"}`}>
                    {ch.title}
                  </h3>

                  <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed font-sans">
                    {ch.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Challenge Workspace */}
        {activeChallenge ? (
          <div className="space-y-6">
            {/* Challenge Info Header Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                  {activeChallenge.difficulty.toUpperCase()} LEVEL
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Estimated Time: ~{activeChallenge.estimatedMinutes} minutes
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
                {activeChallenge.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                <strong>Challenge Task:</strong> {activeChallenge.prompt}
              </p>

              {activeChallenge.expectedOutput && (
                <div className="text-xs text-zinc-600 font-mono flex items-center gap-2">
                  <span className="text-emerald-700 font-bold">Expected Output:</span>
                  <span>{activeChallenge.expectedOutput}</span>
                </div>
              )}
            </div>

            {/* Interactive Sandbox for this Challenge */}
            <CodeSandbox
              key={activeChallenge.id}
              initialCode={activeChallenge.initialCode}
              solutionCode={activeChallenge.solutionCode}
              hints={activeChallenge.hints}
              expectedOutput={activeChallenge.expectedOutput}
              explanation={activeChallenge.solutionExplanation}
              title={`Workspace: ${activeChallenge.title}`}
            />

            {/* Dedicated Solution & Explanation Card */}
            <div className="p-6 rounded-3xl bg-[#edf6ee]/40 border border-[#bfe0c6] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">💡</span>
                  <h3 className="font-bold text-xs sm:text-sm text-[#2e5939] font-mono uppercase tracking-wide">
                    Complete Pure JavaScript Solution
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-[#2e5939] border border-[#bfe0c6]">
                  100% Pure JS
                </span>
              </div>

              <CodeBlock
                code={activeChallenge.solutionCode}
                language="jsx"
                filename="solution.js"
                showLineNumbers={false}
              />

              <div className="p-4 bg-white rounded-2xl border border-[#bfe0c6] text-xs text-stone-800 leading-relaxed font-sans space-y-1 shadow-2xs">
                <strong className="text-[#2e5939] font-mono block">Why &amp; How This Solution Works:</strong>
                <p>{activeChallenge.solutionExplanation}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-500">No challenges found.</div>
        )}
      </div>
    </div>
  );
}
