import { AlertOctagon, Check, X } from "lucide-react";
import { CommonMistake } from "@/types";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface MistakesBoxProps {
  mistakes: CommonMistake[];
}

export function MistakesBox({ mistakes }: MistakesBoxProps) {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-6 shadow-xs">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
        <AlertOctagon className="h-5 w-5 text-rose-600" />
        <h3 className="font-bold text-base text-zinc-900">Common Pitfalls & Gotchas</h3>
      </div>

      <div className="space-y-6">
        {mistakes.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-4">
            <h4 className="text-sm font-bold text-zinc-900">{m.mistakeTitle}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad Code */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-rose-700 font-mono font-bold">
                  <X className="h-4 w-4" />
                  <span>Incorrect / Broken</span>
                </div>
                <CodeBlock code={m.badCode} language="tsx" showLineNumbers={false} />
              </div>

              {/* Good Code */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-mono font-bold">
                  <Check className="h-4 w-4" />
                  <span>Correct Next.js Pattern</span>
                </div>
                <CodeBlock code={m.goodCode} language="tsx" showLineNumbers={false} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900">
                <strong>Why it breaks: </strong>{m.whyItBreaks}
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <strong>How to fix: </strong>{m.howToFix}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
