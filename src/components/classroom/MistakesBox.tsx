import { AlertOctagon, Check, X } from "lucide-react";
import { CommonMistake } from "@/types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { WashiTape, StickerBadge } from "@/components/ui/StudyStickers";

interface MistakesBoxProps {
  mistakes: CommonMistake[];
}

export function MistakesBox({ mistakes }: MistakesBoxProps) {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <div className="relative rounded-3xl border border-[#f7c2d1] bg-white p-6 sm:p-7 space-y-6 shadow-2xs hover:shadow-sm transition-shadow">
      <WashiTape color="sakura" width="w-32" tilt="rotate-1" />

      <div className="flex items-center justify-between border-b border-[#f7c2d1]/60 pb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">⚠️</span>
          <h3 className="font-bold text-base text-stone-900">Common Pitfalls &amp; Gotchas</h3>
        </div>
        <StickerBadge emoji="🚨" label="Watch Out!" color="sakura" size="sm" tilt="rotate-[-1deg]" />
      </div>

      <div className="space-y-6">
        {mistakes.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#e8e2d8] space-y-4">
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#fdf0f4] text-[#8a2d48] border border-[#f7c2d1] text-xs font-mono font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <span>{m.mistakeTitle}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad Code */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#8a2d48] font-mono font-bold">
                  <X className="h-4 w-4" />
                  <span>Broken / Deprecated</span>
                </div>
                <CodeBlock code={m.badCode} language="jsx" showLineNumbers={false} />
              </div>

              {/* Good Code */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#2e5939] font-mono font-bold">
                  <Check className="h-4 w-4" />
                  <span>Correct Next.js Pattern</span>
                </div>
                <CodeBlock code={m.goodCode} language="jsx" showLineNumbers={false} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 bg-[#fdf0f4] border border-[#f7c2d1] rounded-2xl text-[#8a2d48]">
                <strong>Why it breaks: </strong>{m.whyItBreaks}
              </div>
              <div className="p-3 bg-[#edf6ee] border border-[#bfe0c6] rounded-2xl text-[#2e5939]">
                <strong>How to fix: </strong>{m.howToFix}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
