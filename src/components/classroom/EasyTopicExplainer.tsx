"use client";

import { Sparkles, ArrowRight, CheckCircle2, Zap, Lightbulb, BookOpen, Layers, Shield, Cpu, Flame } from "lucide-react";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

interface EasyTopicExplainerProps {
  title: string;
  simpleExplanation: string;
  whyNeeded: string;
  tags: string[];
}

export function EasyTopicExplainer({
  title,
  simpleExplanation,
  whyNeeded,
  tags,
}: EasyTopicExplainerProps) {
  // Extract concise sentences for the visual step cards
  const sentences = simpleExplanation.split(". ").filter(Boolean);
  const coreDefinition = sentences[0] ? sentences[0] + "." : simpleExplanation;
  const practicalUsage = sentences.slice(1, 3).join(". ") || "Next.js executes Server Components on the backend and streams instant HTML to the browser.";

  return (
    <div className="relative rounded-3xl border border-[#bfe0c6] bg-white p-6 sm:p-7 space-y-6 shadow-2xs hover:shadow-sm transition-shadow overflow-hidden">
      {/* Top Washi Tape */}
      <WashiTape color="matcha" width="w-32" tilt="-rotate-1" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#bfe0c6]/60 pb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-2xl bg-[#edf6ee] text-[#2e5939] flex items-center justify-center text-base border border-[#bfe0c6] shadow-2xs">
            🌱
          </span>
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2e5939]">
              Visual Study Guide
            </div>
            <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
              Easy Way to Understand: <span className="mildliner-green">{title}</span>
            </h2>
          </div>
        </div>
        <StickerBadge emoji="✨" label="Visual Diagrams" color="matcha" size="sm" tilt="rotate-1" />
      </div>

      {/* 3 Simple Steps Flow: Concept -> Engine Action -> Student Win */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Step 1: The Intuition */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#e8e2d8] space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#edf6ee] text-[#2e5939] border border-[#bfe0c6]">
              Step 1 • The Concept
            </span>
            <span className="text-sm">💡</span>
          </div>
          <h3 className="font-bold text-xs sm:text-sm text-stone-900">What is this in Plain English?</h3>
          <p className="text-xs text-stone-700 leading-relaxed font-sans font-medium">
            {coreDefinition}
          </p>
        </div>

        {/* Step 2: The Engine Action */}
        <div className="p-4 rounded-2xl bg-[#fef9e8] border border-[#fce29d] space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#fef9e8] text-[#7a5005] border border-[#fce29d]">
              Step 2 • The Engine
            </span>
            <span className="text-sm">⚡</span>
          </div>
          <h3 className="font-bold text-xs sm:text-sm text-stone-900">How Next.js Automates It</h3>
          <p className="text-xs text-stone-700 leading-relaxed font-sans font-medium">
            {practicalUsage}
          </p>
        </div>

        {/* Step 3: The Student Win */}
        <div className="p-4 rounded-2xl bg-[#edf6ee] border border-[#bfe0c6] space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#edf6ee] text-[#2e5939] border border-[#bfe0c6]">
              Step 3 • The Result
            </span>
            <span className="text-sm">🎯</span>
          </div>
          <h3 className="font-bold text-xs sm:text-sm text-stone-900">Your Developer Advantage</h3>
          <p className="text-xs text-stone-700 leading-relaxed font-sans font-medium">
            Pre-rendered on the server, zero manual configuration, and 100% compatible with modern JavaScript.
          </p>
        </div>
      </div>

      {/* VISUAL ANALOGY FLOWCHART DIAGRAM */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF8F5] via-[#fdfcf9] to-[#FAF8F5] border border-[#e5ded4] space-y-3.5">
        <div className="flex items-center justify-between border-b border-[#e5ded4] pb-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🍱</span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7a5005]">
              Visual Analogy &amp; Request Flowchart:
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#fef9e8] text-[#7a5005] border border-[#fce29d]">
            Everyday Mental Model
          </span>
        </div>

        {/* Visual 3-Node Connected Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          <div className="p-3.5 bg-white rounded-2xl border border-[#bfe0c6] shadow-2xs space-y-1 text-center">
            <span className="text-2xl block mb-1">🚗</span>
            <div className="text-[10px] font-mono font-bold uppercase text-[#2e5939]">1. The Real-World Parallel</div>
            <p className="text-xs text-stone-800 font-semibold leading-tight">Pre-Assembled Lego Kit</p>
            <p className="text-[11px] text-stone-500 font-sans">Parts connected &amp; ready to roll</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-mono font-bold text-[#2e5939] bg-[#edf6ee] px-2.5 py-0.5 rounded-full border border-[#bfe0c6]">
              Next.js Automation ➔
            </span>
            <div className="hidden sm:block h-0.5 w-16 bg-[#bfe0c6] relative">
              <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-[#2e5939] rotate-45" />
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-[#bfe0c6] shadow-2xs space-y-1 text-center">
            <span className="text-2xl block mb-1">⚡</span>
            <div className="text-[10px] font-mono font-bold uppercase text-[#2e5939]">2. Instant Browser Output</div>
            <p className="text-xs text-stone-800 font-semibold leading-tight">Zero-Config Page Delivery</p>
            <p className="text-[11px] text-stone-500 font-sans">Full HTML streamed to user</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans font-medium pt-1">
          {simpleExplanation}
        </p>
      </div>

      {/* VISUAL PROBLEM VS SOLUTION FLOWCHART */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-mono uppercase font-bold text-stone-700 flex items-center gap-1.5">
          <span>⚖️</span> Architecture Flow Comparison:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Bottleneck Flow */}
          <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-rose-800 flex items-center gap-1">
                <span>❌</span> The Hard Old Way (Plain React)
              </span>
              <span className="text-xs">⚠️</span>
            </div>
            
            {/* Visual Mini Flow Pipeline */}
            <div className="flex items-center gap-1 text-[11px] font-mono text-rose-900 bg-white/80 p-2 rounded-xl border border-rose-200">
              <span className="p-1 rounded bg-rose-100 font-bold">Client</span>
              <span>➔</span>
              <span className="p-1 rounded bg-rose-100 font-bold">Spinners</span>
              <span>➔</span>
              <span className="p-1 rounded bg-rose-100 font-bold">Late HTML</span>
            </div>

            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              Manual routing setup, client-side loading spinners, waterfall network requests, and massive JavaScript downloads.
            </p>
          </div>

          {/* Solution Flow */}
          <div className="p-4 bg-[#edf6ee] rounded-2xl border border-[#bfe0c6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-[#2e5939] flex items-center gap-1">
                <span>✨</span> The Easy Next.js Way
              </span>
              <span className="text-xs">🚀</span>
            </div>

            {/* Visual Mini Flow Pipeline */}
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#2e5939] bg-white/80 p-2 rounded-xl border border-[#bfe0c6]">
              <span className="p-1 rounded bg-[#edf6ee] font-bold">Server</span>
              <span>➔</span>
              <span className="p-1 rounded bg-[#edf6ee] font-bold">Pre-Render</span>
              <span>➔</span>
              <span className="p-1 rounded bg-[#edf6ee] font-bold">Instant 60fps</span>
            </div>

            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              {whyNeeded}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
