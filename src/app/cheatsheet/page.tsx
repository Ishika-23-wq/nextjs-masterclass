import Link from "next/link";
import { cheatsheetData } from "@/data/cheatsheet";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata = {
  title: "Next.js Master Cheatsheet & Boilerplates",
  description: "Quick-reference boilerplate code snippets for Next.js App Router and INT257.",
};

export default function CheatsheetPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="font-mono text-xs text-emerald-800 font-bold px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
          &lt;quick-reference/&gt;
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Next.js Master Cheatsheet
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Copy-paste production snippets for App Router files, Server Actions, Supabase queries, and SEO metadata.
        </p>
      </div>

      {/* Cheatsheet Categories */}
      <div className="space-y-10">
        {cheatsheetData.map((category, idx) => (
          <div key={idx} className="space-y-6">
            <div className="border-b border-zinc-200 pb-3">
              <span className="text-xs font-mono uppercase text-amber-800 font-bold">
                Category: {category.category}
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 mt-1">{category.title}</h2>
            </div>

            <div className="grid gap-6">
              {category.snippets.map((snippet, sIdx) => (
                <div key={sIdx} className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-zinc-900">{snippet.title}</h3>
                    <span className="text-xs font-mono font-bold text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                      {snippet.language}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans">{snippet.description}</p>
                  <CodeBlock code={snippet.code} language={snippet.language} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
