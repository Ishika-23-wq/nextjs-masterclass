export interface CheatsheetSection {
  title: string;
  category: string;
  snippets: Array<{
    title: string;
    description: string;
    code: string;
    language: string;
  }>;
}

export const cheatsheetData: CheatsheetSection[] = [
  {
    title: "1. App Router Special Files",
    category: "Routing & Project Structure",
    snippets: [
      {
        title: "page.tsx (Route UI)",
        description: "Defines the unique user interface for a route.",
        language: "tsx",
        code: `export default function Page() {
  return <h1>Hello Next.js App Router!</h1>;
}`,
      },
      {
        title: "layout.tsx (Shared Shell)",
        description: "Persistent shared UI shell that does not re-mount across route changes.",
        language: "tsx",
        code: `export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-shell">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}`,
      },
      {
        title: "loading.tsx (Suspense Skeleton)",
        description: "Instant loading UI displayed immediately on page transition.",
        language: "tsx",
        code: `export default function Loading() {
  return <div className="animate-pulse h-32 bg-zinc-800 rounded-xl" />;
}`,
      },
      {
        title: "error.tsx (Error Boundary)",
        description: "Catches runtime errors; MUST be a Client Component.",
        language: "tsx",
        code: `"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
      <p className="text-rose-400">{error.message}</p>
      <button onClick={() => reset()} className="mt-2 px-3 py-1 bg-rose-600 rounded text-xs text-white">
        Try Again
      </button>
    </div>
  );
}`,
      },
      {
        title: "not-found.tsx (404 Screen)",
        description: "Custom 404 screen triggered on missing URLs or notFound() calls.",
        language: "tsx",
        code: `import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center p-10 space-y-4">
      <h1 className="text-4xl font-bold text-amber-500">404</h1>
      <p className="text-zinc-400">Page not found.</p>
      <Link href="/" className="text-emerald-400 underline">Return Home</Link>
    </div>
  );
}`,
      },
    ],
  },

  {
    title: "2. Data Fetching & Caching",
    category: "Rendering & Fetch",
    snippets: [
      {
        title: "Server Component Direct Fetch (SSG / Static)",
        description: "Fetches data on the server with default static caching.",
        language: "tsx",
        code: `export default async function Page() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  return <div>{data.title}</div>;
}`,
      },
      {
        title: "Time-Based Revalidation (ISR)",
        description: "Revalidates static data cache in background every X seconds.",
        language: "tsx",
        code: `const res = await fetch("https://api.example.com/posts", {
  next: { revalidate: 60 } // 60 seconds ISR
});`,
      },
      {
        title: "Dynamic Server Rendering (SSR)",
        description: "Forces fresh data computation on every request.",
        language: "tsx",
        code: `const res = await fetch("https://api.example.com/live", {
  cache: "no-store"
});
// Or export: export const dynamic = 'force-dynamic';`,
      },
      {
        title: "Tagged Cache Invalidation",
        description: "Tag a fetch and invalidate on-demand via Server Action.",
        language: "tsx",
        code: `// 1. Fetch with tag:
const res = await fetch(url, { next: { tags: ["courses"] } });

// 2. Invalidate in Server Action:
"use server";
import { revalidateTag } from "next/cache";
revalidateTag("courses");`,
      },
    ],
  },

  {
    title: "3. Server Actions & Mutations",
    category: "Forms & Backend",
    snippets: [
      {
        title: "Server Action Form Handler",
        description: "Backend mutation attached directly to native HTML form.",
        language: "tsx",
        code: `import { revalidatePath } from "next/cache";

async function createItemAction(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  await db.insert({ name });
  revalidatePath("/items");
}

export default function Form() {
  return (
    <form action={createItemAction}>
      <input name="name" required />
      <button type="submit">Create</button>
    </form>
  );
}`,
      },
      {
        title: "Pending State Indicator with useFormStatus",
        description: "Disable submit button while form is processing.",
        language: "tsx",
        code: `"use client";
import { useFormStatus } from "react-dom";

export function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </button>
  );
}`,
      },
    ],
  },

  {
    title: "4. Supabase Client & CRUD",
    category: "Databases",
    snippets: [
      {
        title: "Supabase Client Initialization",
        description: "Configuring Supabase client with public environment variables.",
        language: "typescript",
        code: `import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);`,
      },
      {
        title: "Full CRUD Query Operations",
        description: "Select, Insert, Update, and Delete rows.",
        language: "typescript",
        code: `// SELECT
const { data } = await supabase.from('posts').select('*').eq('published', true);

// INSERT
const { error } = await supabase.from('posts').insert([{ title: 'Next.js 16' }]);

// UPDATE
const { error } = await supabase.from('posts').update({ views: 100 }).eq('id', 1);

// DELETE
const { error } = await supabase.from('posts').delete().eq('id', 1);`,
      },
    ],
  },

  {
    title: "5. SEO & Metadata",
    category: "SEO",
    snippets: [
      {
        title: "Static Metadata Export",
        description: "Static title and OpenGraph tags.",
        language: "typescript",
        code: `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Course Platform",
  description: "Learn Next.js App Router.",
  openGraph: {
    title: "My Course Platform",
    images: ["/og.png"],
  },
};`,
      },
      {
        title: "Dynamic generateMetadata()",
        description: "Generate metadata from dynamic route parameters.",
        language: "typescript",
        code: `export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: \`Item #\${id} | Store\` };
}`,
      },
    ],
  },
];
