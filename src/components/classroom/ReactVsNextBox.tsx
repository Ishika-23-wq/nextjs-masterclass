"use client";

import { Sparkles, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { ReactComparison } from "@/types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

interface ReactVsNextBoxProps {
  comparison: ReactComparison;
}

export function ReactVsNextBox({ comparison }: ReactVsNextBoxProps) {
  return (
    <div className="relative rounded-3xl border border-[#e5ded6] bg-white overflow-hidden space-y-0 shadow-2xs hover:shadow-sm transition-shadow">
      {/* Top Washi Tape */}
      <WashiTape color="matcha" width="w-32" tilt="-rotate-1" />

      {/* Header */}
      <div className="p-5 bg-[#FAF8F5] border-b border-[#e8e2d8] flex flex-wrap items-center justify-between gap-3 pt-6">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🌱</span>
          <h3 className="font-bold text-sm sm:text-base text-stone-900">
            Next.js Core Architecture: <span className="mildliner-green">{comparison.concept}</span>
          </h3>
        </div>
        <StickerBadge emoji="✨" label="App Router" color="matcha" size="sm" tilt="rotate-1" />
      </div>

      {/* Main Next.js Implementation Block */}
      <div className="p-6 sm:p-7 space-y-4 bg-[#edf6ee]/25">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2e5939] px-3 py-1 rounded-full bg-[#edf6ee] border border-[#bfe0c6] shadow-2xs flex items-center gap-1.5">
            <span>✏️</span> Standard Next.js Pattern (Pure JS)
          </span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-stone-900">{comparison.nextjsWay.title}</h4>

        {/* Visual Flow Diagram Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 bg-white rounded-2xl border border-[#bfe0c6] shadow-2xs space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#2e5939] flex items-center gap-1">
              <span>📁</span> 1. File Structure
            </span>
            <p className="text-xs text-stone-800 font-semibold">Automatic Route Segment</p>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-[#bfe0c6] shadow-2xs space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#2e5939] flex items-center gap-1">
              <span>⚡</span> 2. Server Pipeline
            </span>
            <p className="text-xs text-stone-800 font-semibold">Pre-renders on Server</p>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-[#bfe0c6] shadow-2xs space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#2e5939] flex items-center gap-1">
              <span>🚀</span> 3. Client Stream
            </span>
            <p className="text-xs text-stone-800 font-semibold">0 KB JS Static Payload</p>
          </div>
        </div>

        <CodeBlock
          code={comparison.nextjsWay.code}
          language="jsx"
          filename="Next.js App Router (Pure JavaScript)"
        />

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">{comparison.nextjsWay.explanation}</p>

        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-mono uppercase text-stone-600 font-bold flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[#5b9669]" /> Next.js Architectural Advantages:
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {comparison.nextjsWay.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 p-3 rounded-2xl bg-white border border-[#bfe0c6]/80 shadow-2xs">
                <CheckCircle className="h-4 w-4 text-[#5b9669] shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How Next.js Works Behind the Scenes / Sticky Note Takeaway */}
      <div className="relative p-6 bg-[#fef9e8]/60 border-t border-[#e8e2d8] space-y-3">
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-[#7a5005]" />
          <span className="text-xs font-mono uppercase font-bold text-[#7a5005] flex items-center gap-1">
            <span>🔍</span> Under the Hood Deep Dive
          </span>
        </div>
        <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">{comparison.whyDifferent}</p>
        <div className="relative p-4 rounded-2xl bg-white border border-[#fce29d] text-xs text-[#7a5005] font-sans shadow-2xs">
          <div className="flex items-start gap-2">
            <span className="text-base leading-none">💡</span>
            <div>
              <strong className="font-bold text-stone-900">Key Study Takeaway:</strong>{" "}
              <span className="text-stone-700 font-medium">{comparison.mentalShiftSummary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
