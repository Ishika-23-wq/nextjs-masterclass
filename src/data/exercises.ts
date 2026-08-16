import { PracticeExercise } from "@/types";

export const allCodingChallenges: PracticeExercise[] = [
  {
    id: "ch-1-basic-page",
    title: "1. Create a Basic Server Page",
    difficulty: "very-easy",
    estimatedMinutes: 5,
    prompt:
      "Write a default-exported Next.js Server Component for `src/app/welcome/page.tsx` displaying a welcome heading and a current date string.",
    initialCode: `// Write your Next.js Page component
export default function WelcomePage() {
  // TODO: Add heading and date
  return (
    <div>
      {/* Your JSX */}
    </div>
  );
}`,
    expectedOutput: "A server page with welcome heading and current date.",
    hints: ["Use `export default function`", "Use `new Date().toDateString()`"],
    solutionCode: `export default function WelcomePage() {
  const today = new Date().toDateString();

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
      <h1 className="text-2xl font-bold text-zinc-100">Welcome to INT257</h1>
      <p className="text-emerald-400 text-sm font-mono">Today: {today}</p>
    </div>
  );
}`,
    solutionExplanation:
      "Server Components render HTML on the server and transmit 0 KB client JavaScript overhead.",
  },

  {
    id: "ch-2-dynamic-slug",
    title: "2. Dynamic Route Slug Extractor",
    difficulty: "easy",
    estimatedMinutes: 8,
    prompt:
      "Create an async Server Component for `src/app/lessons/[slug]/page.tsx` that extracts `slug` from the `params` Promise and capitalizes it in a heading.",
    initialCode: `interface LessonProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonProps) {
  // TODO: Await params and format heading
  return (
    <div>
      {/* Show formatted slug */}
    </div>
  );
}`,
    expectedOutput: "A lesson page displaying the formatted route parameter.",
    hints: ["Use `const { slug } = await params;`", "Use `.toUpperCase()` or replace hyphens with spaces"],
    solutionCode: `interface LessonProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonProps) {
  const { slug } = await params;
  const formattedTitle = slug.replace(/-/g, " ").toUpperCase();

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
        Lesson Parameter: {slug}
      </span>
      <h1 className="text-xl font-bold text-zinc-100">{formattedTitle}</h1>
    </div>
  );
}`,
    solutionExplanation:
      "In Next.js 15+, `params` is an asynchronous Promise that must be awaited inside your async page component.",
  },

  {
    id: "ch-3-server-action",
    title: "3. Server Action with Form Revalidation",
    difficulty: "medium",
    estimatedMinutes: 10,
    prompt:
      "Write a Server Action `createNoteAction` that extracts a `note` string from `FormData`, validates that it has at least 5 characters, and revalidates `/notes`.",
    initialCode: `// src/actions/notes.ts
export async function createNoteAction(formData: FormData) {
  // TODO: Add 'use server', validate note, and revalidatePath
}`,
    expectedOutput: "A validated Server Action returning a success status.",
    hints: ["Add `'use server';`", "Import `revalidatePath` from `'next/cache'`"],
    solutionCode: `"use server";

import { revalidatePath } from "next/cache";

export async function createNoteAction(formData: FormData) {
  const note = formData.get("note") as string;

  if (!note || note.trim().length < 5) {
    return { success: false, error: "Note must be at least 5 characters long." };
  }

  // Simulated save...
  console.log("Saved note:", note.trim());

  revalidatePath("/notes");
  return { success: true };
}`,
    solutionExplanation:
      "Server Actions handle data mutations securely on the server with direct cache invalidation.",
  },

  {
    id: "ch-4-optimistic-widget",
    title: "4. Optimistic Like Counter Hook",
    difficulty: "hard",
    estimatedMinutes: 12,
    prompt:
      "Build a Client Component `OptimisticLikeWidget` using `useOptimistic` and `useTransition` that increments the like counter instantly in 0ms when clicked.",
    initialCode: `"use client";

import { useOptimistic } from "react";

export function OptimisticLikeWidget({ initialLikes }: { initialLikes: number }) {
  // TODO: Implement useOptimistic with simulated transition
  return (
    <button>
      ❤️ Likes: 0
    </button>
  );
}`,
    expectedOutput: "An interactive button that updates its like count instantly in 0ms.",
    hints: ["Use `useTransition` to wrap the optimistic update and async delay"],
    solutionCode: `"use client";

import { useOptimistic, useTransition } from "react";

export function OptimisticLikeWidget({ initialLikes = 0 }: { initialLikes?: number }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (current, amount: number) => current + amount
  );

  const handleClick = () => {
    startTransition(async () => {
      addOptimisticLike(1); // 0ms Instant UI update!
      await new Promise((resolve) => setTimeout(resolve, 600)); // Simulated server call
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-xl text-sm font-medium transition-all active:scale-95"
    >
      <span className="text-emerald-400">❤️</span>
      <span>{optimisticLikes} Helpful</span>
      {isPending && <span className="text-xs text-amber-400 animate-pulse">(Syncing...)</span>}
    </button>
  );
}`,
    solutionExplanation:
      "`useOptimistic` provides instant 0ms feedback to the student while the network synchronization takes place in the background.",
  },

  {
    id: "ch-5-combined-pipeline",
    title: "5. Combined: Dynamic Routes + Supabase + Server Actions + SEO",
    difficulty: "combined",
    estimatedMinutes: 18,
    prompt:
      "Build a comprehensive product review module that generates dynamic SEO metadata, queries product details from Supabase on the server, and provides an inline Server Action form to post reviews.",
    initialCode: `// Combined Full-Stack Challenge
// Combine: generateMetadata + Supabase Query + Server Action
`,
    expectedOutput: "A complete production-ready Server Component combining metadata, queries, and Server Actions.",
    hints: ["Export `generateMetadata`", "Query Supabase table in main component", "Define inline Server Action or import from actions"],
    solutionCode: `import type { Metadata } from "next";
import { supabase, initialMockDb } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

interface ProductProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: \`Product #\${id} Overview | INT257 Store\`,
    description: "Full-stack server-rendered product specifications.",
  };
}

export default async function ProductOverviewPage({ params }: ProductProps) {
  const { id } = await params;

  async function postReviewAction(formData: FormData) {
    "use server";
    const comment = formData.get("comment") as string;
    console.log(\`Review for product #\${id}:\`, comment);
    revalidatePath(\`/products/\${id}\`);
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-mono text-emerald-400">Database Record #{id}</span>
        <h1 className="text-2xl font-bold text-zinc-100">Product Specifications</h1>
      </div>

      <form action={postReviewAction} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
        <h3 className="text-sm font-semibold text-zinc-200">Leave a Review</h3>
        <textarea
          name="comment"
          required
          placeholder="Share your thoughts on this item..."
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
        />
        <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium">
          Submit Review
        </button>
      </form>
    </div>
  );
}`,
    solutionExplanation:
      "This pattern represents real-world Next.js development: server pre-rendering, dynamic SEO metadata, direct database querying, and server mutations in one clean file.",
  },
];
