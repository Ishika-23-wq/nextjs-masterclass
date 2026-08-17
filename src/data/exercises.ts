import { PracticeExercise } from "@/types";

export const allCodingChallenges: PracticeExercise[] = [
  {
    id: "ch-1-basic-page",
    title: "1. Create a Basic Server Page (JavaScript)",
    difficulty: "very-easy",
    estimatedMinutes: 5,
    prompt:
      "Write a default-exported Next.js Server Component for `app/welcome/page.js` in plain JavaScript displaying a friendly welcome heading and current year.",
    initialCode: `// Write your Next.js Page component in plain JavaScript
export default function WelcomePage() {
  // TODO: Add heading and current year
  return (
    <div>
      {/* Your JSX */}
    </div>
  );
}`,
    expectedOutput: "A server page with welcome heading and current year badge.",
    hints: ["Use `export default function`", "Use `new Date().getFullYear()`"],
    solutionCode: `export default function WelcomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ padding: "24px", background: "#18181b", color: "#fff", borderRadius: "12px" }}>
      <h1>👋 Welcome to NextMastery!</h1>
      <p style={{ color: "#34d399" }}>Current Year: {currentYear}</p>
    </div>
  );
}`,
    solutionExplanation:
      "Server Components render HTML on the server and transmit 0 KB client JavaScript overhead.",
  },

  {
    id: "ch-2-dynamic-slug",
    title: "2. Dynamic Route Slug Extractor (JavaScript)",
    difficulty: "easy",
    estimatedMinutes: 8,
    prompt:
      "Create an async Server Component for `app/lessons/[slug]/page.js` that extracts `slug` from the `params` Promise using `await params` and displays it in a heading.",
    initialCode: `// app/lessons/[slug]/page.js (Pure JavaScript)
export default async function LessonPage({ params }) {
  // TODO: Await params and format heading
  return (
    <div>
      {/* Show formatted slug */}
    </div>
  );
}`,
    expectedOutput: "A lesson page displaying the formatted route parameter.",
    hints: ["Use `const { slug } = await params;`", "Use `.toUpperCase()` or replace hyphens with spaces"],
    solutionCode: `export default async function LessonPage({ params }) {
  const { slug } = await params;
  const formattedTitle = slug.replace(/-/g, " ").toUpperCase();

  return (
    <div style={{ padding: "24px", background: "#18181b", color: "#fff", borderRadius: "12px" }}>
      <span style={{ fontSize: "12px", background: "#fef3c7", color: "#92400e", padding: "4px 8px", borderRadius: "4px" }}>
        Lesson Slug: {slug}
      </span>
      <h1 style={{ marginTop: "8px" }}>{formattedTitle}</h1>
    </div>
  );
}`,
    solutionExplanation:
      "In modern Next.js, `params` is an asynchronous Promise that must be awaited inside your async page component.",
  },

  {
    id: "ch-3-server-action",
    title: "3. Server Action with Form Revalidation",
    difficulty: "medium",
    estimatedMinutes: 10,
    prompt:
      "Write a Server Action `createNoteAction` that extracts a `note` string from `FormData`, validates that it has at least 5 characters, and revalidates `/notes`.",
    initialCode: `// actions/notes.js
export async function createNoteAction(formData) {
  // TODO: Add 'use server', validate note, and revalidatePath
}`,
    expectedOutput: "A validated Server Action returning a success status.",
    hints: ["Add `'use server';` at the top", "Import `revalidatePath` from `'next/cache'`"],
    solutionCode: `"use server";
import { revalidatePath } from "next/cache";

export async function createNoteAction(formData) {
  const note = formData.get("note");

  if (!note || note.trim().length < 5) {
    return { success: false, error: "Note must be at least 5 characters long." };
  }

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
      "Build a Client Component `OptimisticLikeWidget` in plain JavaScript using `useOptimistic` and `useTransition` that increments the like counter instantly in 0ms when clicked.",
    initialCode: `"use client";
import { useOptimistic } from "react";

export function OptimisticLikeWidget({ initialLikes = 0 }) {
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

export function OptimisticLikeWidget({ initialLikes = 0 }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (current, amount) => current + amount
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
      style={{ padding: "8px 16px", background: "#18181b", color: "#fff", border: "1px solid #3f3f46", borderRadius: "8px", cursor: "pointer" }}
    >
      <span>❤️ {optimisticLikes} Helpful</span>
      {isPending && <span style={{ marginLeft: "8px", color: "#fbbf24" }}>(Syncing...)</span>}
    </button>
  );
}`,
    solutionExplanation:
      "`useOptimistic` provides instant 0ms feedback to the student while the network synchronization takes place in the background.",
  },

  {
    id: "ch-5-combined-pipeline",
    title: "5. Combined: Dynamic Routes + Server Actions + Metadata",
    difficulty: "combined",
    estimatedMinutes: 18,
    prompt:
      "Build a comprehensive product review module in plain JavaScript that generates dynamic SEO metadata and provides an inline Server Action form to post reviews.",
    initialCode: `// Combined Full-Stack Challenge in Pure JavaScript
// Combine: generateMetadata + Server Component + Server Action
`,
    expectedOutput: "A complete production-ready Server Component combining metadata and Server Actions.",
    hints: ["Export `generateMetadata`", "Define inline Server Action or import from actions"],
    solutionCode: `import { revalidatePath } from "next/cache";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: \`Product #\${id} Overview | Store\`,
    description: "Full-stack server-rendered product specifications.",
  };
}

export default async function ProductOverviewPage({ params }) {
  const { id } = await params;

  async function postReviewAction(formData) {
    "use server";
    const comment = formData.get("comment");
    console.log(\`Review for product #\${id}:\`, comment);
    revalidatePath(\`/products/\${id}\`);
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "24px", background: "#18181b", color: "#fff", borderRadius: "12px" }}>
      <span>Database Record #{id}</span>
      <h1>Product Specifications</h1>

      <form action={postReviewAction} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3>Leave a Review</h3>
        <textarea
          name="comment"
          required
          placeholder="Share your thoughts on this item..."
          style={{ padding: "8px", borderRadius: "6px", background: "#27272a", color: "#fff", border: "1px solid #3f3f46" }}
        />
        <button type="submit" style={{ padding: "10px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          Submit Review
        </button>
      </form>
    </div>
  );
}`,
    solutionExplanation:
      "This pattern represents real-world Next.js development: server pre-rendering, dynamic SEO metadata, and server mutations in one clean file.",
  },
];
