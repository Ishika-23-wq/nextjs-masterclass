"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";
import { ReactComparison } from "@/types";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface ReactVsNextBoxProps {
  comparison: ReactComparison;
}

export function ReactVsNextBox({ comparison }: ReactVsNextBoxProps) {
  const [activeTab, setActiveTab] = useState<"side-by-side" | "react" | "next">("side-by-side");

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden space-y-0 shadow-xs">
      {/* Header */}
      <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-600" />
          <h3 className="font-bold text-sm sm:text-base text-zinc-900">
            React Way → Next.js Way: {comparison.concept}
          </h3>
        </div>

        {/* View Switcher on mobile */}
        <div className="flex sm:hidden items-center bg-zinc-200/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("react")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "react" ? "bg-white text-zinc-900 shadow-2xs" : "text-zinc-600"}`}
          >
            React
          </button>
          <button
            onClick={() => setActiveTab("next")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "next" ? "bg-white text-emerald-800 shadow-2xs" : "text-zinc-600"}`}
          >
            Next.js
          </button>
        </div>
      </div>

      {/* Side-by-side or Tabbed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
        {/* React Way */}
        <div className={`p-6 space-y-4 bg-rose-50/30 ${activeTab === "next" ? "hidden sm:block" : "block"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-800 px-2.5 py-1 rounded-full bg-rose-100 border border-rose-200">
              Vanilla React Approach
            </span>
          </div>

          <h4 className="text-sm font-bold text-zinc-900">{comparison.reactWay.title}</h4>

          <CodeBlock
            code={comparison.reactWay.code}
            language="tsx"
            filename="Traditional React"
          />

          <p className="text-xs text-zinc-700 leading-relaxed">{comparison.reactWay.explanation}</p>

          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-mono uppercase text-zinc-600 font-bold">Drawbacks in React:</span>
            <ul className="space-y-1">
              {comparison.reactWay.drawbacks.map((drawback, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{drawback}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next.js Way */}
        <div className={`p-6 space-y-4 bg-emerald-50/40 ${activeTab === "react" ? "hidden sm:block" : "block"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
              Modern Next.js Approach
            </span>
          </div>

          <h4 className="text-sm font-bold text-zinc-900">{comparison.nextjsWay.title}</h4>

          <CodeBlock
            code={comparison.nextjsWay.code}
            language="tsx"
            filename="Next.js App Router"
          />

          <p className="text-xs text-zinc-700 leading-relaxed">{comparison.nextjsWay.explanation}</p>

          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-mono uppercase text-zinc-600 font-bold">Superpowers in Next.js:</span>
            <ul className="space-y-1">
              {comparison.nextjsWay.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Why Next.js Does It Differently Banner */}
      <div className="p-5 bg-amber-50/60 border-t border-zinc-200 space-y-2">
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-emerald-700" />
          <span className="text-xs font-mono uppercase font-bold text-amber-900">Why Next.js Does It Differently</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">{comparison.whyDifferent}</p>
        <div className="p-3 rounded-2xl bg-white border border-amber-200/80 text-xs text-emerald-900 font-mono shadow-2xs">
          💡 <strong>Mental Shift:</strong> {comparison.mentalShiftSummary}
        </div>
      </div>
    </div>
  );
}
