"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, Lightbulb } from "lucide-react";
import { QnAItem } from "@/data/qna-data";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

interface QnACardsProps {
  items: QnAItem[];
  topicTitle?: string;
}

export function QnACards({ items }: QnACardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#e8e2d8] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#7a5005] font-bold px-2.5 py-0.5 rounded-full bg-[#fef9e8] border border-[#fce29d] shadow-2xs">
            &lt;study-flashcards/&gt;
          </span>
          <h3 className="font-bold text-base text-stone-900 flex items-center gap-1.5">
            <span>✨</span> Quick Q&amp;A Fast-Track ({items.length} Questions)
          </h3>
        </div>
        <span className="text-xs text-stone-500 font-mono hidden sm:inline flex items-center gap-1">
          <span>🏷️</span> Bite-Sized Cards
        </span>
      </div>

      <div className="grid gap-3.5">
        {items.map((item, index) => {
          const isOpen = expandedIndex === index || expandedIndex === -1;

          return (
            <div
              key={index}
              className={`relative rounded-3xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-white border-[#bfe0c6] shadow-md ring-2 ring-[#bfe0c6]/40"
                  : "bg-white border-[#e5ded6] hover:border-[#bfe0c6] hover:shadow-xs"
              }`}
            >
              {isOpen && <WashiTape color="honey" width="w-20" tilt="-rotate-1" />}

              {/* Question Header Button */}
              <button
                onClick={() => setExpandedIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#fef9e8] text-[#7a5005] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#fce29d] shadow-2xs">
                    Q{index + 1}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#2e5939] transition-colors leading-snug">
                    {item.question}
                  </h4>
                </div>
                <div className="p-1.5 rounded-xl bg-[#FAF8F5] text-stone-500 group-hover:bg-[#edf6ee] group-hover:text-[#2e5939] shrink-0 mt-0.5 transition-colors border border-[#e8e2d8]">
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {/* Collapsible Answer Body */}
              {isOpen && (
                <div className="px-5 pb-6 space-y-4 pt-1 border-t border-[#f2ede4] animate-fadeIn">
                  {/* Short Punchy Answer */}
                  <div className="space-y-1.5 pl-10">
                    <span className="text-[11px] font-mono uppercase text-[#2e5939] font-bold tracking-wider flex items-center gap-1">
                      <span>🌸</span> Answer:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line font-sans">
                      {item.shortAnswer}
                    </p>
                  </div>

                  {/* Code snippet */}
                  {item.codeSnippet && (
                    <div className="ml-10">
                      <CodeBlock code={item.codeSnippet} language="jsx" showLineNumbers={false} />
                    </div>
                  )}

                  {/* Pro Tip */}
                  {item.tip && (
                    <div className="ml-10 flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#fef9e8] border border-[#fce29d] text-xs text-[#7a5005] font-sans shadow-2xs">
                      <span className="text-base shrink-0 leading-none">⭐</span>
                      <span><strong className="font-bold text-stone-900">Study Note:</strong> {item.tip}</span>
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
