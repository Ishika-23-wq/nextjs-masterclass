"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, Lightbulb } from "lucide-react";
import { QnAItem } from "@/data/qna-data";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface QnACardsProps {
  items: QnAItem[];
  topicTitle?: string;
}

export function QnACards({ items }: QnACardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-amber-800 font-bold px-2 py-0.5 rounded-md bg-amber-100 border border-amber-200">
            &lt;q-and-a/&gt;
          </span>
          <h3 className="font-bold text-base text-zinc-900">
            Quick Q&A Fast-Track ({items.length} Questions)
          </h3>
        </div>
        <span className="text-xs text-zinc-500 font-mono hidden sm:inline">Bite-Sized Answers</span>
      </div>

      <div className="grid gap-3">
        {items.map((item, index) => {
          const isOpen = expandedIndex === index || expandedIndex === -1;

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-white border-emerald-300 shadow-md ring-1 ring-emerald-200"
                  : "bg-white border-zinc-200/90 hover:border-emerald-200 hover:shadow-xs"
              }`}
            >
              {/* Question Header Button */}
              <button
                onClick={() => setExpandedIndex(isOpen ? null : index)}
                className="w-full p-4 text-left flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    Q{index + 1}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {item.question}
                  </h4>
                </div>
                <div className="p-1 rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-emerald-50 group-hover:text-emerald-800 shrink-0 mt-0.5 transition-colors">
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {/* Collapsible Answer Body */}
              {isOpen && (
                <div className="px-4 pb-5 space-y-4 pt-1 border-t border-zinc-100 animate-fadeIn">
                  {/* Short Punchy Answer */}
                  <div className="space-y-1.5 pl-9">
                    <span className="text-[11px] font-mono uppercase text-emerald-700 font-bold tracking-wider">
                      Answer:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line font-sans">
                      {item.shortAnswer}
                    </p>
                  </div>

                  {/* React Contrast Pill */}
                  {item.reactContrast && (
                    <div className="ml-9 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] uppercase text-amber-800">
                        <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                        <span>How React did it before:</span>
                      </div>
                      <p className="text-zinc-700 leading-relaxed">{item.reactContrast}</p>
                    </div>
                  )}

                  {/* Code snippet */}
                  {item.codeSnippet && (
                    <div className="ml-9">
                      <CodeBlock code={item.codeSnippet} language="tsx" showLineNumbers={false} />
                    </div>
                  )}

                  {/* Pro Tip */}
                  {item.tip && (
                    <div className="ml-9 flex items-start gap-2 p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 font-mono">
                      <Lightbulb className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                      <span><strong>Key Rule:</strong> {item.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
