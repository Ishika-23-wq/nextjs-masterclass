import Link from "next/link";
import { Sparkles, ArrowRight, Check, X, AlertTriangle } from "lucide-react";
import { detailedReactComparisons } from "@/data/react-comparisons";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata = {
  title: "React vs Next.js Comparison Matrix",
  description: "Direct side-by-side comparison: React Way → Next.js Way → Why Next.js Does It Differently.",
};

export default function ReactVsNextPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="font-mono text-xs text-amber-800 font-bold px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200">
          &lt;mental-model-shift/&gt;
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          React Way vs Next.js Way
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Students transitioning from vanilla JavaScript often ask: <em>"Why do we need Next.js if React already exists?"</em> Here is the comprehensive breakdown of how Next.js solves React's biggest limitations.
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="space-y-10">
        {detailedReactComparisons.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="rounded-3xl border border-zinc-200 bg-white overflow-hidden space-y-0 shadow-xs"
          >
            {/* Category Header */}
            <div className="p-5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-600" />
                <h2 className="font-bold text-base sm:text-lg text-zinc-900">{item.category}</h2>
              </div>
              <span className="text-xs font-mono uppercase text-zinc-500 font-bold">INT257 Comparison</span>
            </div>

            {/* Side-by-side Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
              {/* React Way */}
              <div className="p-6 space-y-4 bg-rose-50/20">
                <span className="text-xs font-mono font-bold uppercase text-rose-800 px-2.5 py-1 rounded-full bg-rose-100 border border-rose-200">
                  Vanilla React
                </span>
                <h3 className="font-bold text-sm text-zinc-900">{item.reactWay.title}</h3>
                <CodeBlock code={item.reactWay.code} language="tsx" filename="React (CSR)" />
                <p className="text-xs text-zinc-700 leading-relaxed">{item.reactWay.description}</p>
                <div className="space-y-1 pt-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-600 font-bold">Drawbacks:</span>
                  <ul className="space-y-1">
                    {item.reactWay.drawbacks.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next.js Way */}
              <div className="p-6 space-y-4 bg-emerald-50/30">
                <span className="text-xs font-mono font-bold uppercase text-emerald-800 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
                  Next.js App Router
                </span>
                <h3 className="font-bold text-sm text-zinc-900">{item.nextjsWay.title}</h3>
                <CodeBlock code={item.nextjsWay.code} language="tsx" filename="Next.js (App Router)" />
                <p className="text-xs text-zinc-700 leading-relaxed">{item.nextjsWay.description}</p>
                <div className="space-y-1 pt-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-600 font-bold">Advantages:</span>
                  <ul className="space-y-1">
                    {item.nextjsWay.advantages.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Why Different Summary */}
            <div className="p-5 bg-amber-50/60 border-t border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-900">
                <ArrowRight className="h-4 w-4 text-emerald-700" />
                <span>Why Next.js Does It Differently</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">{item.whyDifferent}</p>
              <p className="text-xs text-emerald-800 font-mono pt-1 font-bold">
                💡 <strong>Key Takeaway:</strong> {item.keyTakeaway}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
