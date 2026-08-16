"use client";

import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface ReferenceItem {
  id: string;
  name: string;
  category: "Conventions" | "Directives" | "Hooks" | "Components" | "Functions" | "Supabase SDK";
  type: string;
  summary: string;
  syntax: string;
  example: string;
  whenToUse: string;
}

const REFERENCE_DATA: ReferenceItem[] = [
  {
    id: "page-tsx",
    name: "page.tsx",
    category: "Conventions",
    type: "Reserved File",
    summary: "Defines the unique user interface and publicly accessible route for a folder.",
    syntax: "export default function Page({ params, searchParams })",
    example: `export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <h1>Product #{id}</h1>;
}`,
    whenToUse: "Required in every folder you want to turn into a public URL.",
  },
  {
    id: "layout-tsx",
    name: "layout.tsx",
    category: "Conventions",
    type: "Reserved File",
    summary: "Shared UI shell (Navbars, Sidebars) that preserves state and does not re-render across route changes.",
    syntax: "export default function Layout({ children })",
    example: `export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="shell"><Navbar />{children}<Footer /></div>;
}`,
    whenToUse: "Use for shared wrappers, navigation bars, and persistent layout templates.",
  },
  {
    id: "loading-tsx",
    name: "loading.tsx",
    category: "Conventions",
    type: "Reserved File",
    summary: "Instant streaming skeleton fallback displayed while server data is preparing.",
    syntax: "export default function Loading()",
    example: `export default function Loading() {
  return <div className="animate-pulse h-32 bg-zinc-800 rounded-xl" />;
}`,
    whenToUse: "Create alongside page.tsx to give instant visual feedback on mobile clicks.",
  },
  {
    id: "error-tsx",
    name: "error.tsx",
    category: "Conventions",
    type: "Reserved File ('use client')",
    summary: "React Error Boundary fallback that isolates crashes and provides retry actions.",
    syntax: "'use client'; export default function Error({ error, reset })",
    example: `"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <div><p>{error.message}</p><button onClick={() => reset()}>Retry</button></div>;
}`,
    whenToUse: "Must be a Client Component. Used for graceful error recovery.",
  },
  {
    id: "use-server",
    name: "'use server'",
    category: "Directives",
    type: "Directive",
    summary: "Marks an asynchronous function or entire file as a secure server-side RPC entry point (Server Action).",
    syntax: "'use server';",
    example: `"use server";
export async function createStudentAction(formData: FormData) {
  const name = formData.get("name");
  await db.students.create({ name });
  revalidatePath("/students");
}`,
    whenToUse: "Used on functions passed to <form action={...}> or called from buttons for backend mutations.",
  },
  {
    id: "use-client",
    name: "'use client'",
    category: "Directives",
    type: "Directive",
    summary: "Designates a component as a Client Component island, allowing browser state and event handlers.",
    syntax: "'use client';",
    example: `"use client";
import { useState } from "react";
export function Toggle() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(!open)}>Toggle</button>;
}`,
    whenToUse: "Add at line 1 of files requiring useState, useEffect, onClick, or browser APIs.",
  },
  {
    id: "use-optimistic",
    name: "useOptimistic()",
    category: "Hooks",
    type: "React 19 Hook",
    summary: "Updates the user interface in 0ms before the server finishes responding, with auto-rollback on failure.",
    syntax: "const [optState, setOptState] = useOptimistic(state, updateFn)",
    example: `const [optLikes, addOptLike] = useOptimistic(likes, (current, inc: number) => current + inc);
const handleLike = () => {
  addOptLike(1); // 0ms instant!
  await serverLikeAction();
};`,
    whenToUse: "For high-frequency user actions: likes, task checkboxes, comments, and upvotes.",
  },
  {
    id: "use-form-status",
    name: "useFormStatus()",
    category: "Hooks",
    type: "React DOM Hook",
    summary: "Returns the pending status of the parent <form> without needing manual state flags.",
    syntax: "const { pending, data, method, action } = useFormStatus()",
    example: `function Submit() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Saving..." : "Submit"}</button>;
}`,
    whenToUse: "Call inside a child component within a <form> to render loading spinners and disable buttons.",
  },
  {
    id: "next-image",
    name: "<Image />",
    category: "Components",
    type: "next/image",
    summary: "Optimizes images with automatic WebP conversion, responsive sizing, and zero layout shift.",
    syntax: "import Image from 'next/image'; <Image src='...' width={...} height={...} alt='...' />",
    example: `<Image
  src="/hero.jpg"
  width={800}
  height={400}
  priority
  placeholder="blur"
  alt="Hero banner"
/>`,
    whenToUse: "Always use instead of HTML <img> tags for images across the entire website.",
  },
  {
    id: "next-link",
    name: "<Link />",
    category: "Components",
    type: "next/link",
    summary: "Client-side navigation component with automatic background viewport prefetching.",
    syntax: "import Link from 'next/link'; <Link href='/courses'>Courses</Link>",
    example: `<Link href="/units/unit-1" className="text-emerald-700">
  Start Unit 1
</Link>`,
    whenToUse: "Always use for internal page transitions instead of HTML <a href='...'>.",
  },
  {
    id: "revalidate-path",
    name: "revalidatePath()",
    category: "Functions",
    type: "next/cache",
    summary: "Purges the cached HTML and data for a specific route on-demand inside a Server Action.",
    syntax: "revalidatePath(path, type?)",
    example: `"use server";
import { revalidatePath } from "next/cache";

export async function deletePost(id: number) {
  await db.posts.delete(id);
  revalidatePath("/blog");
}`,
    whenToUse: "Call in Server Actions after adding, editing, or deleting database records.",
  },
  {
    id: "supabase-from",
    name: "supabase.from()",
    category: "Supabase SDK",
    type: "@supabase/supabase-js",
    summary: "Selects a PostgreSQL database table to perform query or mutation operations.",
    syntax: "supabase.from('tableName').select/insert/update/delete",
    example: `// Query rows:
const { data, error } = await supabase.from('students').select('*').order('name');

// Insert row:
await supabase.from('students').insert([{ name: 'Ishika', course: 'INT257' }]);`,
    whenToUse: "For querying and mutating Supabase PostgreSQL tables in Server Components and Server Actions.",
  },
];

export default function ReferencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Conventions", "Directives", "Hooks", "Components", "Functions", "Supabase SDK"];

  const filteredItems = REFERENCE_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.syntax.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-xs font-mono font-bold text-emerald-800">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Quick Lookup Reference</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Next.js & App Router API Reference
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Searchable reference dictionary for App Router special files, React 19 directives, hooks, components, caching functions, and Supabase queries.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search APIs (e.g. useOptimistic, page.tsx, revalidatePath)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-2xl text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                  : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reference Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-4 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-zinc-900 font-mono">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  {item.type}
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                {item.summary}
              </p>

              <div className="p-2.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 font-mono text-xs text-amber-900 overflow-x-auto">
                {item.syntax}
              </div>

              <CodeBlock code={item.example} language="tsx" showLineNumbers={false} />
            </div>

            <div className="pt-2 border-t border-zinc-100 text-xs text-zinc-500">
              <strong className="text-zinc-800">When to use: </strong> {item.whenToUse}
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="p-12 text-center text-zinc-500 text-sm">
          No reference APIs found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
}
