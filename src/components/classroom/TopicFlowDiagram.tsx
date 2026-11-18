"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Database,
  Server,
  Monitor,
  ChevronRight,
  Zap,
} from "lucide-react";
import { TopicDiagramData } from "@/data/topic-diagrams";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

interface TopicFlowDiagramProps {
  diagram: TopicDiagramData;
}

export function TopicFlowDiagram({ diagram }: TopicFlowDiagramProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"flowchart" | "lanes" | "comparison">("flowchart");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeStep = diagram.steps[activeStepIndex] || diagram.steps[0];

  function handleNext() {
    if (activeStepIndex < diagram.steps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    } else {
      setActiveStepIndex(0);
    }
  }

  function handlePrev() {
    if (activeStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1);
    }
  }

  function handlePlayCycle() {
    setIsPlaying(true);
    let current = 0;
    setActiveStepIndex(0);
    const interval = setInterval(() => {
      current++;
      if (current >= diagram.steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setActiveStepIndex(current);
      }
    }, 1800);
  }

  const getActorBg = (actorType: string) => {
    switch (actorType) {
      case "browser":
      case "client":
        return "bg-sky-50 text-sky-800 border-sky-200";
      case "server":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "edge":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "database":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-stone-50 text-stone-800 border-stone-200";
    }
  };

  return (
    <section className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#e5ded6] shadow-2xs hover:shadow-sm transition-all space-y-6">
      <WashiTape color={diagram.washiColor} width="w-36" tilt="-rotate-1" />

      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-b border-[#e8e2d8] pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-[#edf6ee] text-[#2e5939] font-mono font-bold text-xs flex items-center justify-center border border-[#bfe0c6] shadow-2xs">
              📊
            </span>
            <span className="text-xs font-mono font-bold uppercase text-stone-500 tracking-wider">
              Visual Architecture &amp; Flowchart
            </span>
            <StickerBadge emoji="✨" label="Diagram Mode" color={diagram.washiColor} size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {diagram.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans">
            {diagram.subtitle}
          </p>
        </div>

        {/* View Mode Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-2xl border border-[#e8e2d8] self-start sm:self-auto shadow-2xs">
          <button
            onClick={() => setViewMode("flowchart")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "flowchart"
                ? "bg-white text-stone-900 shadow-2xs border border-[#e0d8ce]"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span>🗺️</span>
            <span>Flowchart</span>
          </button>
          <button
            onClick={() => setViewMode("lanes")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "lanes"
                ? "bg-white text-stone-900 shadow-2xs border border-[#e0d8ce]"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span>📐</span>
            <span>Blueprint</span>
          </button>
          {diagram.comparison && (
            <button
              onClick={() => setViewMode("comparison")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "comparison"
                  ? "bg-white text-stone-900 shadow-2xs border border-[#e0d8ce]"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <span>⚖️</span>
              <span>Compare</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE STEP-BY-STEP FLOWCHART */}
      {viewMode === "flowchart" && (
        <div className="space-y-6">
          {/* Visual Step Sequence Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {diagram.steps.map((step, idx) => {
              const isCurrent = idx === activeStepIndex;
              const isCompleted = idx < activeStepIndex;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all relative flex flex-col justify-between space-y-3 ${
                    isCurrent
                      ? "bg-[#fcfaf7] border-emerald-500 shadow-xs ring-2 ring-emerald-500/20 scale-[1.01]"
                      : isCompleted
                      ? "bg-white border-emerald-200 hover:border-emerald-300"
                      : "bg-[#FAF8F5]/80 border-[#e8e2d8] hover:border-stone-400 opacity-80"
                  }`}
                >
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-6 h-6 rounded-full text-[11px] font-mono font-bold flex items-center justify-center transition-colors ${
                        isCurrent
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <span className="text-base">{step.icon}</span>
                  </div>

                  {/* Title & Actor */}
                  <div>
                    <span
                      className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border mb-1.5 ${getActorBg(
                        step.actorType
                      )}`}
                    >
                      {step.actor}
                    </span>
                    <h3
                      className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isCurrent ? "text-stone-900 font-extrabold" : "text-stone-700"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Active Indicator Arrow */}
                  {isCurrent && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 font-mono pt-1">
                      <span>Active Stage</span>
                      <ArrowRight className="h-3 w-3 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Focus Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF8F5] border border-[#e8e2d8] space-y-4 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-2xl bg-white border border-[#e0d8ce] flex items-center justify-center text-lg shadow-2xs">
                  {activeStep.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                      Stage {activeStep.stepNumber} of {diagram.steps.length}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${getActorBg(activeStep.actorType)}`}>
                      {activeStep.actor}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900">
                    {activeStep.title}
                  </h3>
                </div>
              </div>

              {/* Step Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeStepIndex === 0}
                  className="px-3 py-1.5 bg-white border border-[#e5ded6] hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none rounded-xl text-xs font-bold text-stone-700 transition-colors shadow-2xs"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center gap-1"
                >
                  <span>{activeStepIndex === diagram.steps.length - 1 ? "Replay ↺" : "Next →"}</span>
                </button>
                <button
                  onClick={handlePlayCycle}
                  disabled={isPlaying}
                  className="p-1.5 bg-white border border-[#e5ded6] hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-bold transition-colors shadow-2xs"
                  title="Play flow step-by-step"
                >
                  <Play className={`h-4 w-4 ${isPlaying ? "text-emerald-600 animate-pulse" : ""}`} />
                </button>
              </div>
            </div>

            {/* Step Explanation */}
            <p className="text-sm text-stone-800 leading-relaxed font-sans">
              {activeStep.description}
            </p>

            {/* Optional Code Snippet inside Step */}
            {activeStep.codeSnippet && (
              <div className="p-3.5 rounded-2xl bg-[#FCFBF9] border border-[#e5ded4] font-mono text-xs overflow-x-auto shadow-2xs">
                <div className="text-[10px] text-stone-500 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-emerald-600" />
                  <span>Code Execution in this Stage:</span>
                </div>
                <pre className="!bg-transparent text-stone-800 leading-relaxed font-mono whitespace-pre">{activeStep.codeSnippet}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: ARCHITECTURE BLUEPRINT & LANES */}
      {viewMode === "lanes" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diagram.lanes.map((lane, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-[#FAF8F5] border border-[#e8e2d8] space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-[#e0d8ce] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{lane.emoji}</span>
                    <h3 className="font-bold text-sm sm:text-base text-stone-900">
                      {lane.name}
                    </h3>
                  </div>
                  <StickerBadge emoji="📌" label="Realm" color={lane.color} size="sm" />
                </div>

                <div className="space-y-2">
                  {lane.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3 bg-white rounded-2xl border border-[#e8e2d8] flex items-start gap-2.5 shadow-2xs"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-stone-900 font-mono">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-stone-600 leading-relaxed font-sans mt-0.5">
                          {item.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: BEFORE VS AFTER COMPARISON */}
      {viewMode === "comparison" && diagram.comparison && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Legacy / Slow Flow */}
          <div className="p-5 rounded-3xl bg-rose-50/50 border border-rose-200 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-rose-200 pb-2.5">
              <span className="text-xs font-mono font-bold text-rose-800 uppercase flex items-center gap-1.5">
                <span>⚠️</span> {diagram.comparison.badTitle}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
                Legacy / Slow
              </span>
            </div>
            <div className="space-y-2">
              {diagram.comparison.badFlow.map((step, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white rounded-xl border border-rose-100 text-xs text-stone-700 flex items-center gap-2 shadow-2xs"
                >
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next.js Optimized Flow */}
          <div className="p-5 rounded-3xl bg-emerald-50/50 border border-emerald-200 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                <span>⚡</span> {diagram.comparison.goodTitle}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Next.js App Router
              </span>
            </div>
            <div className="space-y-2">
              {diagram.comparison.goodFlow.map((step, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white rounded-xl border border-emerald-100 text-xs text-stone-800 flex items-center gap-2 shadow-2xs font-medium"
                >
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Rule-of-Thumb Callout */}
      <div className="p-4 rounded-2xl bg-[#fef9e8] border border-[#fce29d] flex items-start gap-3 shadow-2xs">
        <span className="text-xl shrink-0">💡</span>
        <div className="space-y-0.5 text-xs">
          <span className="font-mono font-bold uppercase text-[#7a5005] tracking-wide">
            Visual Rule of Thumb:
          </span>
          <p className="text-stone-800 font-sans leading-relaxed">
            {diagram.ruleOfThumb}
          </p>
        </div>
      </div>
    </section>
  );
}
