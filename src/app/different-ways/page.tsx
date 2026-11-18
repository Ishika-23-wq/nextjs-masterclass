import Link from "next/link";
import { Layers, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { differentWaysMatrix } from "@/data/different-ways";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

export const metadata = {
  title: "Different Ways Feature Matrix",
  description: "Explore multiple valid approaches for data fetching, mutations, and state in Next.js.",
};

export default function DifferentWaysPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-2xl relative">
        <div className="flex flex-wrap items-center gap-2">
          <StickerBadge emoji="🗂️" label="Comparison Grid" color="lavender" />
          <StickerBadge emoji="✨" label="Architectural Matrix" color="matcha" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          "<MildlinerText color="lavender">Different Ways to Do It</MildlinerText>" Matrix
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed font-sans">
          In modern Next.js, there are often multiple valid ways to solve the same problem (e.g. fetching data in Server Components vs Client Components vs Route Handlers vs Server Actions). Here is how they compare in advantages, disadvantages, and when to use each.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {differentWaysMatrix.map((category) => (
          <div key={category.id} className="space-y-6">
            <div className="border-b border-[#e8e2d8] pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">{category.taskTitle}</h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">{category.shortDescription}</p>
              </div>
              <StickerBadge emoji="💡" label="Alternative Ways" color="honey" size="sm" />
            </div>

            <div className="grid gap-6">
              {category.approaches.map((app, idx) => (
                <div
                  key={idx}
                  className="relative p-6 pt-7 rounded-3xl bg-white border border-[#e8e2d8] space-y-4 shadow-2xs hover:shadow-sm transition-shadow"
                >
                  <WashiTape
                    color={app.isRecommended ? "matcha" : idx % 2 === 0 ? "sky" : "latte"}
                    width="w-28"
                    tilt={idx % 2 === 0 ? "-rotate-1" : "rotate-1"}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-stone-900">{app.name}</h3>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full font-bold ${
                      app.isRecommended
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-stone-100 text-stone-700 border border-stone-200"
                    }`}>
                      {app.badge}
                    </span>
                  </div>

                  <CodeBlock code={app.codeExample} language="jsx" />

                  <p className="text-xs text-zinc-700 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200 leading-relaxed font-sans">
                    <strong>How it works: </strong>{app.howItWorks}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                    <div className="space-y-1.5 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                      <span className="font-mono text-emerald-800 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Advantages:
                      </span>
                      <ul className="list-disc list-inside text-zinc-700 space-y-1">
                        {app.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
                      </ul>
                    </div>

                    <div className="space-y-1.5 p-4 bg-rose-50/60 rounded-2xl border border-rose-200">
                      <span className="font-mono text-rose-800 font-bold flex items-center gap-1.5">
                        <XCircle className="h-4 w-4 text-rose-600" /> Disadvantages:
                      </span>
                      <ul className="list-disc list-inside text-zinc-700 space-y-1">
                        {app.disadvantages.map((dis, i) => <li key={i}>{dis}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950">
                    <strong className="font-mono font-bold text-amber-900">When to use: </strong>
                    {app.whenToUse}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
