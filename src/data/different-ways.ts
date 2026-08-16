export interface DifferentWaysCategory {
  id: string;
  taskTitle: string;
  shortDescription: string;
  approaches: Array<{
    name: string;
    badge: string;
    codeExample: string;
    howItWorks: string;
    advantages: string[];
    disadvantages: string[];
    whenToUse: string;
    isRecommended?: boolean;
  }>;
}

export const differentWaysMatrix: DifferentWaysCategory[] = [
  {
    id: "data-fetching",
    taskTitle: "Fetching Data in Next.js",
    shortDescription: "There are 4 main ways to fetch data in Next.js. Here is how they compare in performance, complexity, and use cases.",
    approaches: [
      {
        name: "1. Server Component (Direct async/await)",
        badge: "Recommended Standard",
        isRecommended: true,
        codeExample: `// src/app/courses/page.tsx
export default async function CoursesPage() {
  const res = await fetch("https://api.university.com/courses", {
    next: { revalidate: 3600 } // ISR caching
  });
  const courses = await res.json();

  return <ul>{courses.map((c: any) => <li key={c.id}>{c.title}</li>)}</ul>;
}`,
        howItWorks:
          "Runs on the server before HTML is sent to the client. Uses native Web `fetch` with Next.js caching extensions.",
        advantages: [
          "0 KB client JavaScript bundle impact",
          "Direct access to backend databases and environment secrets",
          "HTML arrives fully rendered with 100% SEO indexability",
          "No useEffect, useState, or loading spinners needed",
        ],
        disadvantages: [
          "Cannot respond directly to live client mouse events without re-fetching or Server Action triggers",
          "Cannot use React hooks (useState, useEffect)",
        ],
        whenToUse: "For 90% of your data needs: initial page loads, blog posts, product catalogs, tables, and dashboards.",
      },
      {
        name: "2. Client Component with SWR / TanStack Query",
        badge: "Real-Time / Polling",
        codeExample: `"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function LiveStockTicker() {
  const { data, error, isLoading } = useSWR("/api/stocks", fetcher, {
    refreshInterval: 2000 // Polls every 2 seconds!
  });

  if (isLoading) return <p>Loading live price...</p>;
  return <div>Current Price: \${data?.price}</div>;
}`,
        howItWorks:
          "Pre-renders initial HTML, then continuously synchronizes and updates data directly in the browser via client-side fetch calls.",
        advantages: [
          "Auto-revalidation on window focus and reconnect",
          "Built-in periodic interval polling",
          "Great for live updating chat feeds and stock tickers",
        ],
        disadvantages: [
          "Adds client JavaScript bundle weight (~12KB for SWR)",
          "Requires client loading state handling",
        ],
        whenToUse: "For real-time data that changes every few seconds: live chat, stock tickers, notifications drawer.",
      },
      {
        name: "3. Route Handler (REST API Endpoint)",
        badge: "External Clients & Webhooks",
        codeExample: `// src/app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const courses = await db.courses.findMany();
  return NextResponse.json(courses);
}`,
        howItWorks:
          "Creates a traditional HTTP REST endpoint returning raw JSON data callable by any HTTP client.",
        advantages: [
          "Accessible by external clients (iOS/Android mobile apps, third-party integrations)",
          "Full control over HTTP headers, cookies, and status codes",
        ],
        disadvantages: [
          "Requires writing client-side fetch code to consume it inside your own UI",
          "Adds unnecessary network roundtrips if called only by your own Server Components",
        ],
        whenToUse: "When you are building public APIs for mobile apps, external partners, or webhook endpoints.",
      },
      {
        name: "4. Server Action (On-Demand Data Queries)",
        badge: "User Gestures & Filters",
        codeExample: `"use server";

export async function filterCoursesAction(category: string) {
  return await db.courses.findMany({ where: { category } });
}`,
        howItWorks:
          "Executes as an RPC function on the server called directly from client event handlers (e.g. search filter dropdown).",
        advantages: [
          "No API route needed",
          "Full end-to-end TypeScript autocomplete",
          "Executes securely on the server with direct DB access",
        ],
        disadvantages: [
          "Not intended for initial page load data (use Server Components instead)",
        ],
        whenToUse: "When client user interactions (e.g. dynamic search, filters, pagination) need to query server data without a full page refresh.",
      },
    ],
  },

  {
    id: "form-mutations",
    taskTitle: "Submitting Forms & Mutating Data",
    shortDescription: "Comparing different ways to handle user form submissions and save data to the backend.",
    approaches: [
      {
        name: "1. Server Actions with Native <form action={...}>",
        badge: "Recommended Standard",
        isRecommended: true,
        codeExample: `// Server Action form in Server Component
import { revalidatePath } from "next/cache";

export default function AddStudentPage() {
  async function addStudent(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    await db.students.create({ name });
    revalidatePath("/students");
  }

  return (
    <form action={addStudent}>
      <input name="name" required />
      <button type="submit">Add Student</button>
    </form>
  );
}`,
        howItWorks:
          "The HTML `<form>` invokes the Server Action directly. Next.js handles POST serialization and cache invalidation.",
        advantages: [
          "Works even before JavaScript downloads on mobile (Progressive Enhancement)",
          "0 KB client JavaScript bundle overhead",
          "Direct integration with `revalidatePath` and `revalidateTag`",
        ],
        disadvantages: [
          "Harder to display field-specific dynamic validation messages without useActionState",
        ],
        whenToUse: "For simple forms, delete buttons, search bars, and standard mutations.",
      },
      {
        name: "2. Server Actions with useActionState & useFormStatus",
        badge: "Interactive Feedback & Validation",
        isRecommended: true,
        codeExample: `"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerAction } from "@/actions/register";

function Submit() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Saving..." : "Save"}</button>;
}

export function Form() {
  const [state, formAction] = useActionState(registerAction, null);
  return (
    <form action={formAction}>
      <input name="email" />
      {state?.error && <p className="text-rose-400">{state.error}</p>}
      <Submit />
    </form>
  );
}`,
        howItWorks:
          "React 19 hooks manage server validation responses and automatic pending states within the component.",
        advantages: [
          "Instant loading spinners on submit buttons via `useFormStatus`",
          "Displays validation error messages directly next to invalid input fields",
          "Clean React 19 standard pattern",
        ],
        disadvantages: [
          "Requires `'use client'` wrapper",
        ],
        whenToUse: "For all full-featured registration forms, checkout flows, and complex input wizards.",
      },
      {
        name: "3. Route Handler + Client fetch() (Legacy Pattern)",
        badge: "Old / Manual Way",
        codeExample: `"use client";
export function OldForm() {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify({ name })
    });
  };
  return <form onSubmit={handleSubmit}><input value={name} onChange={e => setName(e.target.value)} /></form>;
}`,
        howItWorks:
          "Client intercepts form submit with `e.preventDefault()` and sends a manual JSON fetch request to `/api/students`.",
        advantages: [
          "Familiar to developers coming from traditional React + Express",
        ],
        disadvantages: [
          "Requires 3x more code (Route Handler + state + fetch + error handling)",
          "Does not work if client JavaScript is still downloading",
          "No automatic cache revalidation",
        ],
        whenToUse: "Only when maintaining legacy codebases or when an external API contract requires standard REST.",
      },
    ],
  },

  {
    id: "state-management",
    taskTitle: "State Management in Next.js",
    shortDescription: "Deciding where state should live: URL Search Parameters, Server State, React State, or Global Store.",
    approaches: [
      {
        name: "1. URL Search Parameters (?query=nextjs&page=2)",
        badge: "Recommended for Shareable UI",
        isRecommended: true,
        codeExample: `// Reading in Server Component:
export default async function Page({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams;
  const filtered = await searchDb(query);
  return <div>Results for: {query}</div>;
}`,
        howItWorks:
          "State is stored in the browser's URL query string (`?page=2&sort=asc`).",
        advantages: [
          "Shareable URLs: users can bookmark or send link to a friend with exact filters applied",
          "Accessible directly inside Server Components without client hooks",
          "Survives browser refresh and Back/Forward navigation",
        ],
        disadvantages: [
          "Only suitable for serializable strings and numbers, not complex nested objects",
        ],
        whenToUse: "For search filters, pagination, active tab selection, and modal IDs.",
      },
      {
        name: "2. React Local State (useState / useReducer)",
        badge: "Ephemeral UI State",
        codeExample: `"use client";
import { useState } from "react";

export function Accordion() {
  const [isOpen, setIsOpen] = useState(false);
  return <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>;
}`,
        howItWorks:
          "State is held in component memory in the browser.",
        advantages: [
          "Simple, fast, and isolated to a single component",
        ],
        disadvantages: [
          "State resets when navigating away from the page",
          "Cannot be shared across distant components without prop drilling",
        ],
        whenToUse: "For temporary UI toggles: dropdown open/close, hover effects, interactive sliders.",
      },
    ],
  },
];
