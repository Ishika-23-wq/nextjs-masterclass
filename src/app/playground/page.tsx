"use client";

import { useState } from "react";
import { Code2, Database } from "lucide-react";
import { CodeSandbox } from "@/components/classroom/CodeSandbox";
import { SupabaseRunner } from "@/components/classroom/SupabaseRunner";

const SNIPPET_PRESETS = [
  {
    id: "server-comp",
    title: "Server Component + Fetch",
    code: `export default async function CampusNewsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3", {
    next: { revalidate: 60 } // ISR Caching
  });
  const articles = await res.json();

  return (
    <div className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-4 shadow-xs">
      <h1 className="text-xl font-bold text-zinc-900">Live Campus Feed</h1>
      <div className="space-y-2">
        {articles.map((item: any) => (
          <div key={item.id} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-sm text-zinc-800">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  {
    id: "server-action",
    title: "Server Action Mutation",
    code: `// Server Action Form Handler
import { revalidatePath } from "next/cache";

export default function StudentRegistration() {
  async function registerStudentAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    console.log("Saving student to Supabase PostgreSQL:", { name, email });
    revalidatePath("/students");
  }

  return (
    <form action={registerStudentAction} className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-3 shadow-xs">
      <h2 className="text-base font-bold text-zinc-900">Register Student</h2>
      <input name="name" placeholder="Full Name" required className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900" />
      <input name="email" placeholder="Student Email" required className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900" />
      <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs">
        Submit to Server Action
      </button>
    </form>
  );
}`,
  },
  {
    id: "optimistic",
    title: "React 19 useOptimistic",
    code: `"use client";

import { useOptimistic, useTransition } from "react";

export function OptimisticLikeCounter({ initialLikes = 42 }: { initialLikes?: number }) {
  const [isPending, startTransition] = useTransition();
  const [likes, addLike] = useOptimistic(
    initialLikes,
    (current, amount: number) => current + amount
  );

  const handleLike = () => {
    startTransition(async () => {
      addLike(1); // 0ms UI update!
      await new Promise(r => setTimeout(r, 600)); // Server sync
    });
  };

  return (
    <div className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-3 shadow-xs">
      <h3 className="text-base font-bold text-zinc-900">Optimistic UI Counter</h3>
      <button
        onClick={handleLike}
        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-2xl text-xs font-bold"
      >
        ❤️ {likes} Likes {isPending ? "(Saving...)" : ""}
      </button>
    </div>
  );
}`,
  },
];

export default function PlaygroundPage() {
  const [selectedSnippet, setSelectedSnippet] = useState(SNIPPET_PRESETS[0]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="font-mono text-xs text-emerald-800 font-bold px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
          &lt;developer-sandbox/&gt;
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Next.js Live Code Sandbox
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Write, edit, and compile Next.js Server Components, Server Actions, and Supabase client calls directly in your browser with real-time feedback.
        </p>
      </div>

      {/* Snippet Preset Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-zinc-500 font-medium">Preset Templates:</span>
        {SNIPPET_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setSelectedSnippet(preset)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
              selectedSnippet.id === preset.id
                ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Standalone Code Sandbox */}
      <CodeSandbox
        key={selectedSnippet.id}
        initialCode={selectedSnippet.code}
        title={`Sandbox: ${selectedSnippet.title}`}
      />

      {/* Supabase Sandbox */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-emerald-600" />
          <h2 className="text-2xl font-bold text-zinc-900">Live Supabase Database Explorer</h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600">
          Query simulated student records and test database mutations in real time.
        </p>
        <SupabaseRunner />
      </div>
    </div>
  );
}
