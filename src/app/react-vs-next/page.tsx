import Link from "next/link";
import { Sparkles, ArrowRight, Check, Zap } from "lucide-react";
import { detailedReactComparisons } from "@/data/react-comparisons";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

export const metadata = {
  title: "Next.js Architectural Solutions Matrix",
  description: "Comprehensive Next.js architectural patterns, best practices, and App Router implementation guide.",
};

export default function ReactVsNextPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header with Cute Study Aesthetic */}
      <div className="space-y-4 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <StickerBadge emoji="🏛️" label="Architecture Matrix" color="matcha" size="sm" tilt="rotate-[-1deg]" />
          <StickerBadge emoji="✨" label="App Router" color="honey" size="sm" tilt="rotate-[1deg]" />
          <StickerBadge emoji="🧸" label="Studyblr Guide" color="lavender" size="sm" tilt="rotate-[-2deg]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Next.js Architecture &amp; <span className="mildliner-green">Solutions Matrix</span>
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed font-sans">
          A deep dive into how Next.js App Router solves modern web development challenges with built-in routing, server rendering, native data caching, and server actions.
        </p>
      </div>

      {/* Solutions Cards with Washi Tape */}
      <div className="space-y-10">
        {detailedReactComparisons.map((item, idx) => {
          const washiColors: Array<"matcha" | "sky" | "honey" | "sakura" | "lavender" | "latte"> = [
            "matcha",
            "sky",
            "honey",
            "sakura",
            "lavender",
            "latte",
          ];
          const washiColor = washiColors[idx % washiColors.length];

          return (
            <div
              key={item.id}
              id={item.id}
              className="relative rounded-3xl border border-[#e5ded6] bg-white overflow-hidden space-y-0 shadow-2xs hover:shadow-sm transition-shadow"
            >
              <WashiTape color={washiColor} width="w-32" tilt={idx % 2 === 0 ? "-rotate-1" : "rotate-1"} />

              {/* Category Header */}
              <div className="p-5 bg-[#FAF8F5] border-b border-[#e8e2d8] flex items-center justify-between pt-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🌱</span>
                  <h2 className="font-bold text-base sm:text-lg text-stone-900">{item.category}</h2>
                </div>
                <StickerBadge emoji="✨" label="Next.js Pattern" color="matcha" size="sm" />
              </div>

            {/* Next.js Implementation */}
            <div className="p-6 space-y-4 bg-emerald-50/20">
              <h3 className="font-bold text-sm sm:text-base text-zinc-900">{item.nextjsWay.title}</h3>
              <CodeBlock code={item.nextjsWay.code} language="jsx" filename="Next.js App Router (Pure JavaScript)" />
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">{item.nextjsWay.description}</p>
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono uppercase text-zinc-600 font-bold flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-emerald-600" /> Next.js Architectural Advantages:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.nextjsWay.advantages.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Behind the Scenes Summary */}
            <div className="p-5 bg-amber-50/60 border-t border-zinc-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-900">
                <ArrowRight className="h-4 w-4 text-emerald-700" />
                <span>How Next.js Solves This Under the Hood</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans">{item.whyDifferent}</p>
              <p className="text-xs text-emerald-800 font-mono pt-1 font-bold">
                💡 <strong>Key Takeaway:</strong> {item.keyTakeaway}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}
