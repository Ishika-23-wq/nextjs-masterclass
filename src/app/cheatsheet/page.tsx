import Link from "next/link";
import { cheatsheetData } from "@/data/cheatsheet";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

export const metadata = {
  title: "Next.js Master Cheatsheet & Boilerplates",
  description: "Quick-reference boilerplate code snippets for Next.js App Router and INT257.",
};

export default function CheatsheetPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-2xl relative">
        <div className="flex flex-wrap items-center gap-2">
          <StickerBadge emoji="📋" label="Desk Cheatsheet" color="honey" />
          <StickerBadge emoji="⚡" label="Pure JavaScript" color="matcha" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Next.js <MildlinerText color="honey">Master Cheatsheet</MildlinerText>
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed font-sans">
          Copy-paste production snippets for App Router files, Server Actions, Supabase queries, and SEO metadata.
        </p>
      </div>

      {/* Cheatsheet Categories */}
      <div className="space-y-12">
        {cheatsheetData.map((category, idx) => {
          const colors: Array<"matcha" | "sky" | "honey" | "sakura" | "lavender" | "latte"> = [
            "honey", "matcha", "sky", "sakura", "lavender", "latte"
          ];
          const tapeColor = colors[idx % colors.length];

          return (
            <div key={idx} className="space-y-6">
              <div className="border-b border-[#e8e2d8] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 font-bold">
                    Category: {category.category}
                  </span>
                  <h2 className="text-2xl font-bold text-stone-900 mt-1">{category.title}</h2>
                </div>
                <StickerBadge emoji="📎" label="Quick Boilerplate" color={tapeColor} size="sm" />
              </div>

              <div className="grid gap-6">
                {category.snippets.map((snippet, sIdx) => (
                  <div
                    key={sIdx}
                    className="relative p-6 pt-7 bg-white border border-[#e8e2d8] rounded-3xl space-y-3 shadow-2xs hover:shadow-sm transition-shadow"
                  >
                    <WashiTape
                      color={tapeColor}
                      width="w-28"
                      tilt={sIdx % 2 === 0 ? "-rotate-1" : "rotate-1"}
                    />
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-stone-900">{snippet.title}</h3>
                      <span className="text-xs font-mono font-bold text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        {snippet.language}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-sans">{snippet.description}</p>
                    <CodeBlock code={snippet.code} language={snippet.language} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
