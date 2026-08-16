import { TopicContent } from "@/types";

export const unit2Topics: TopicContent[] = [
  {
    id: "rendering-paradigms",
    unitId: "unit-2",
    title: "Rendering Strategies: SSR, SSG, ISR & CSR",
    shortSummary: "Understand the 4 rendering strategies in web development, when HTML is generated, and how Next.js unifies them.",
    order: 1,
    tags: ["SSR", "SSG", "ISR", "CSR", "Rendering"],

    simpleExplanation:
      "When a browser asks for a webpage, there are 4 main ways to build it: (1) **CSR (Client-Side Rendering)**: The browser downloads a blank HTML file and empty JavaScript, then builds the page on your laptop. (2) **SSG (Static Site Generation)**: The server builds the HTML pages ONCE during `npm run build`, and hands out the exact same fast files to everyone. (3) **SSR (Server-Side Rendering)**: The server builds fresh custom HTML every single time a user makes a request. (4) **ISR (Incremental Static Regeneration)**: Next.js serves static pages at blazing speed, but quietly rebuilds them in the background every X seconds so data is always fresh!",

    whyNeeded:
      "Different pages have completely different performance and freshness needs. An 'About Us' page never changes and should be SSG (zero compute cost). A real-time stock dashboard must be SSR (100% fresh data). A blog with 50,000 articles should be ISR (instant cache + periodic background update). Next.js allows you to mix and match all 4 rendering strategies in the SAME application.",

    reactVsNext: {
      concept: "Page Rendering Strategy",
      reactWay: {
        title: "Vanilla React (CSR Only)",
        code: `// Vanilla React is 100% Client-Side Rendered (CSR)
// The server only sends: <div id="root"></div>
function ProductList() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // Fetches in user's browser AFTER JavaScript loads:
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return <div>{items.map(item => <p key={item.id}>{item.name}</p>)}</div>;
}`,
        explanation:
          "React by itself only runs in the user's browser. It cannot pre-render static HTML or render on a Node.js server without complicated custom server pipelines.",
        drawbacks: [
          "Zero pre-rendered HTML (blank screen on initial request)",
          "Requires users to download the entire React runtime before seeing content",
          "Cannot do SSG or ISR",
        ],
      },
      nextjsWay: {
        title: "Next.js Hybrid Rendering Engine",
        code: `// 1. SSG (Default for static pages):
export default function AboutPage() {
  return <h1>About Us (Built once at build time)</h1>;
}

// 2. SSR (Dynamic on every request):
export const dynamic = 'force-dynamic';
export default async function LiveDashboard() {
  const data = await fetch('https://api.example.com/stocks', { cache: 'no-store' });
  const stocks = await data.json();
  return <div>Live Stock: {stocks.price}</div>;
}

// 3. ISR (Static + Regenerated every 60 seconds):
export default async function BlogPage() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // Automatically regenerates static cache every 60s!
  });
  const posts = await res.json();
  return <div>{posts.map(p => <h2 key={p.id}>{p.title}</h2>)}</div>;
}`,
        explanation:
          "In Next.js, you configure caching and dynamic export options per page or per `fetch()` call. Next.js automatically selects SSG, SSR, or ISR.",
        benefits: [
          "Sub-millisecond static page delivery from Edge CDN",
          "Fresh data when required without sacrificing SEO",
          "Incremental builds: update 1 page without rebuilding the whole website",
        ],
      },
      whyDifferent:
        "Next.js unifies CSR, SSR, SSG, and ISR into a single framework. You don't have to choose between a static site generator or a dynamic server; you get both simultaneously.",
      mentalShiftSummary:
        "Don't default to client fetching. Decide: 'Is this data static (SSG), periodic (ISR), or real-time unique (SSR)?'",
    },

    basicExample: {
      title: "Configuring ISR (Incremental Static Regeneration)",
      description: "Fetching posts with time-based revalidation to achieve static speed with live updates.",
      language: "tsx",
      filename: "src/app/posts/page.tsx",
      code: `// src/app/posts/page.tsx
interface Post {
  id: number;
  title: string;
  views: number;
}

export default async function PostsPage() {
  // Revalidates in the background every 60 seconds (ISR):
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 60 }
  });
  const posts: Post[] = await res.json();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-100">Latest Articles</h1>
        <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-md font-mono">
          ISR: 60s Cache
        </span>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="font-semibold text-zinc-200">{post.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      explanation:
        "The first visitor gets instant cached HTML. After 60 seconds, Next.js triggers a background regeneration to fetch fresh posts.",
      outputPreview: "List of posts with ISR 60s badge, loading with zero client waterfall delay.",
    },

    moreExamples: [
      {
        title: "Dynamic Server Rendering (SSR) with force-dynamic",
        description: "Forcing a page to compute on the server on every single HTTP request.",
        language: "tsx",
        filename: "src/app/admin/live-stats/page.tsx",
        code: `// Force dynamic rendering on every request (SSR):
export const dynamic = "force-dynamic";

export default async function LiveStatsPage() {
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
      <span className="text-xs font-mono text-emerald-400 uppercase">⚡ Server Rendered (SSR)</span>
      <h1 className="text-xl font-bold text-zinc-100">Live Server Clock: {timestamp}</h1>
      <p className="text-zinc-400 text-sm">
        This value is calculated on the server every time you refresh this page.
      </p>
    </div>
  );
}`,
        explanation:
          "`export const dynamic = 'force-dynamic'` instructs Next.js to bypass static generation and evaluate this component on the server for each request.",
      },
    ],

    multipleWays: [
      {
        name: "Static Site Generation (SSG)",
        syntax: "default in App Router (or fetch cache: 'force-cache')",
        codeSnippet: `const res = await fetch('https://api.com/data'); // Cached indefinitely by default`,
        howItWorks: "HTML is generated at build time (`npm run build`) and served via global CDN.",
        pros: ["Fastest possible response time (0ms TTFB)", "Cheapest hosting cost"],
        cons: ["Data can become stale until next project deployment"],
        whenToUse: "Marketing pages, blogs, help documentation, terms of service.",
        isRecommended: true,
      },
      {
        name: "Incremental Static Regeneration (ISR)",
        syntax: "fetch(url, { next: { revalidate: 60 } })",
        codeSnippet: `const res = await fetch('https://api.com/posts', { next: { revalidate: 300 } });`,
        howItWorks: "Serves cached static page, then regenerates cache in the background after expiry.",
        pros: ["Static speed + automated fresh data", "Never slows down for end users"],
        cons: ["First visitor after expiry may see stale content for one hit while background updates"],
        whenToUse: "E-commerce product catalogs, news feeds, forum post listings.",
        isRecommended: true,
      },
      {
        name: "Server-Side Rendering (SSR)",
        syntax: "export const dynamic = 'force-dynamic' or fetch cache: 'no-store'",
        codeSnippet: `const res = await fetch('https://api.com/user', { cache: 'no-store' });`,
        howItWorks: "Renders fresh HTML on the server for every single incoming HTTP request.",
        pros: ["100% guaranteed real-time data", "Can inspect user cookies and headers"],
        cons: ["Slightly higher server response time (TTFB)", "More server compute load"],
        whenToUse: "User account dashboards, checkout pages, real-time analytics.",
      },
      {
        name: "Client-Side Rendering (CSR)",
        syntax: "'use client' + useEffect / SWR",
        codeSnippet: `"use client";
useEffect(() => { fetch('/api/data').then(...) }, []);`,
        howItWorks: "Browser downloads empty skeleton and fetches data via JavaScript.",
        pros: ["Interactive widgets, canvas animations, browser-only APIs"],
        cons: ["Worst SEO, causes loading spinners and layout shift"],
        whenToUse: "Browser games, video editors, interactive canvas tools.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use SSG for static pages, ISR for dynamic catalogs, SSR for private user data, and CSR only for client interactivity.",
      scenarios: [
        {
          scenario: "University syllabus and course outlines",
          recommendedApproach: "SSG (or ISR with 24-hour revalidation)",
          reason: "Syllabus rarely changes, so static caching gives instant 0ms load speed.",
        },
        {
          scenario: "Live examination timer or student grade report",
          recommendedApproach: "SSR (`cache: 'no-store'`) or Server Action",
          reason: "Must reflect instant, tamper-free real-time database state.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using cache: 'no-store' on content that rarely changes",
        badCode: `// ❌ BAD: Forcing SSR on static blog posts
const res = await fetch("https://api.com/blog", { cache: "no-store" });`,
        goodCode: `// ✅ GOOD: Use ISR or default static caching
const res = await fetch("https://api.com/blog", { next: { revalidate: 3600 } });`,
        whyItBreaks: "Makes your database handle a query on every single page view unnecessarily, slowing down page loads.",
        howToFix: "Use `next: { revalidate: seconds }` to cache responses.",
      },
    ],

    bestPractices: [
      {
        title: "Default to Static First",
        rule: "Keep pages static by default, and only introduce dynamic rendering where strictly necessary.",
        explanation: "Static pages delivered via CDN offer the highest speed and lowest server costs.",
      },
    ],

    exercises: [
      {
        id: "u2-ex-1",
        title: "Configure an ISR Course Feed",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a Server Component for `src/app/feed/page.tsx` that fetches from `https://api.example.com/feed` with an ISR revalidation time of 120 seconds.",
        initialCode: `export default async function FeedPage() {
  // TODO: Fetch feed data with 120 second ISR revalidation
  return (
    <div>
      {/* Render feed */}
    </div>
  );
}`,
        expectedOutput: "A server-rendered feed component using next: { revalidate: 120 }.",
        hints: ["Pass `{ next: { revalidate: 120 } }` to the `fetch` options object"],
        solutionCode: `export default async function FeedPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3", {
    next: { revalidate: 120 },
  });
  const items = await res.json();

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100">Live Campus Feed</h1>
        <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-md font-mono">
          Revalidates every 120s
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item: any) => (
          <li key={item.id} className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-300 text-sm">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
        solutionExplanation:
          "This page renders statically with sub-millisecond response time while updating its data cache every 2 minutes automatically.",
      },
    ],

    quizzes: [
      {
        id: "u2-q1",
        question: "What is Incremental Static Regeneration (ISR)?",
        syllabusTopic: "Next.js ISR",
        options: [
          { id: "a", text: "A tool that deletes your database every hour", isCorrect: false, explanation: "ISR is a page rendering caching strategy." },
          { id: "b", text: "A method that allows updating static pages in the background without rebuilding the entire website", isCorrect: true, explanation: "Correct! ISR serves fast cached static pages and periodically regenerates them in the background." },
          { id: "c", text: "A way to run JavaScript exclusively in Internet Explorer", isCorrect: false, explanation: "ISR is modern web architecture." },
          { id: "d", text: "A React hook for client-side forms", isCorrect: false, explanation: "ISR is a server-side caching feature." },
        ],
        conceptualExplanation:
          "ISR gives you the best of both worlds: static page CDN performance and automatic background updates based on time or on-demand triggers.",
      },
    ],

    realWorldExample: {
      domain: "Global E-Commerce Store (100,000 Products)",
      description: "How Amazon or Shopify-style sites serve instant static product pages while keeping prices and inventory updated via ISR.",
      code: {
        title: "Product Detail Page with 5-minute ISR",
        description: "Fast static catalog with background inventory refreshes.",
        language: "tsx",
        filename: "src/app/products/[id]/page.tsx",
        code: `export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(\`https://api.store.com/products/\${id}\`, {
    next: { revalidate: 300 } // Regenerates every 5 minutes
  });
  const product = await res.json();

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-emerald-400 font-mono text-xl">\${product.price}</p>
      <p className="text-zinc-400 text-sm">Stock remaining: {product.inventory}</p>
    </div>
  );
}`,
      },
      keyTakeaway: "ISR avoids overloading database servers with 100,000 queries per second while keeping product information fresh.",
    },

    combinedExample: {
      combinedTopics: ["ISR", "Dynamic Routes", "Error Boundary"],
      title: "Resilient ISR Dynamic Catalog",
      description: "Combining dynamic route params with time-based revalidation and safe fallbacks.",
      code: {
        title: "Production ISR Page with Graceful Fallback",
        description: "Dynamic route fetching external API with ISR caching.",
        language: "tsx",
        filename: "src/app/catalog/[id]/page.tsx",
        code: `interface CatalogProps {
  params: Promise<{ id: string }>;
}

export default async function CatalogItemPage({ params }: CatalogProps) {
  const { id } = await params;

  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("Item not found");
    const item = await res.json();

    return (
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
          Cached Item #{id}
        </span>
        <h1 className="text-xl font-bold text-zinc-100">{item.title}</h1>
        <p className="text-zinc-400 text-sm">{item.body}</p>
      </div>
    );
  } catch (err) {
    return <div className="p-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">Unable to load catalog item.</div>;
  }
}`,
      },
      stepByStepFlow: [
        "User visits `/catalog/1`",
        "Next.js serves cached static version in 5 milliseconds",
        "If 60 seconds have passed, Next.js triggers background fetch",
        "Next visitor gets the updated content seamlessly",
      ],
    },
  },

  {
    id: "server-vs-client-components",
    unitId: "unit-2",
    title: "Server Components vs Client Components",
    shortSummary: "Master React Server Components (RSC), when to add 'use client', the component boundary pattern, and how to interleave them.",
    order: 2,
    tags: ["Server Components", "Client Components", "use client", "Hydration", "Bundle Size"],

    simpleExplanation:
      "In Next.js App Router, every component you create is a **Server Component** by default. A Server Component runs EXCLUSIVELY on the server. Its JavaScript code is NEVER sent to the user's browser, resulting in 0 KB bundle size! However, because Server Components live on the server, they cannot listen to button clicks (`onClick`) or use state (`useState`). When you need browser interactivity (like a toggle switch, search modal, or click listener), you add `'use client'` at the very top of that specific file to make it a **Client Component**.",

    whyNeeded:
      "In standard React apps, 100% of your code is shipped to every mobile user, leading to 10MB+ bundle sizes that take 8 seconds to parse. By keeping 80% of your app as Server Components, Next.js drastically cuts mobile data usage, speeds up CPU execution, and protects secret database keys from leaking to the client.",

    reactVsNext: {
      concept: "Component Execution Environment",
      reactWay: {
        title: "All Components are Client Components",
        code: `// In traditional React, every component is bundled and sent to browser:
import { useState } from "react";

export function HeavyDashboard() {
  // Even if this component just shows static text, its 50KB code
  // is downloaded by every single mobile visitor!
  return <div>Static Dashboard</div>;
}`,
        explanation:
          "In vanilla React, all components are client-side. Secret API tokens or heavy Markdown parsers are accidentally exposed to the client bundle.",
        drawbacks: [
          "Heavy JavaScript bundle size slows down mobile phones",
          "Cannot access database or filesystem directly inside components",
          "API keys can leak if included in frontend code",
        ],
      },
      nextjsWay: {
        title: "Next.js Default Server Components (RSC)",
        code: `// File 1: Server Component (Default - 0 KB client JS sent!)
// src/app/dashboard/page.tsx
import { InteractiveCounter } from "@/components/InteractiveCounter";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  // Directly query database on the server!
  const stats = await db.query("SELECT COUNT(*) FROM students");

  return (
    <div className="space-y-4">
      <h1>Total Students: {stats.count}</h1>
      {/* Embed interactive client island: */}
      <InteractiveCounter />
    </div>
  );
}

// File 2: Client Component (Only downloaded where interactivity is needed)
// src/components/InteractiveCounter.tsx
"use client";

import { useState } from "react";

export function InteractiveCounter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-emerald-600 rounded">
      Clicked: {count} times
    </button>
  );
}`,
        explanation:
          "Next.js separates components into Server Components (data fetching, zero client bundle) and Client Components (interactivity islands).",
        benefits: [
          "Zero JavaScript bundle impact for server components",
          "Direct secure access to databases, secrets, and server environment variables",
          "Client interactivity isolated to small, lightweight leaf components",
        ],
      },
      whyDifferent:
        "Next.js splits your component tree: Server Components render to HTML on the server, while Client Components hydrate in the browser.",
      mentalShiftSummary:
        "Default to Server Components. Only add `'use client'` to small interactive buttons, inputs, and modals.",
    },

    basicExample: {
      title: "Interactive Bookmark Toggle (Client Component Island)",
      description: "A small interactive Client Component embedded inside a fast Server Component.",
      language: "tsx",
      filename: "src/components/BookmarkButton.tsx",
      code: `"use client"; // Marked as Client Component for browser click event & state!

import { useState } from "react";

export function BookmarkButton({ topicId }: { topicId: string }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <button
      onClick={() => setIsSaved(!isSaved)}
      className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all \${
        isSaved
          ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
          : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200"
      }\`}
    >
      <span>{isSaved ? "★ Saved" : "☆ Bookmark Topic"}</span>
    </button>
  );
}`,
      explanation:
        "Because it has `'use client'`, React hydrates this component in the browser, enabling `onClick` and `useState`.",
      outputPreview: "Interactive button toggling between '☆ Bookmark Topic' and highlighted '★ Saved'.",
    },

    moreExamples: [
      {
        title: "Passing Server Components as Children to Client Components",
        description: "The Interleaving Pattern: Rendering heavy Server Components inside an interactive modal shell without turning them into client components.",
        language: "tsx",
        filename: "src/components/ModalShell.tsx",
        code: `// src/components/ModalShell.tsx (Client Component)
"use client";

import { useState } from "react";

export function ModalShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
        Open Syllabus Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-lg w-full">
            {/* The {children} here remains a pure Server Component! */}
            {children}
            <button onClick={() => setIsOpen(false)} className="mt-4 px-3 py-1 bg-zinc-800 text-zinc-300 rounded text-xs">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`,
        explanation:
          "By passing Server Components as `{children}` prop to a Client Component, the children remain 100% server-rendered and zero client bundle size!",
      },
    ],

    multipleWays: [
      {
        name: "Server Component (Default)",
        syntax: "No directive needed",
        codeSnippet: `// Server Component
export default async function Page() {
  const data = await fetch('...');
  return <div>{data.title}</div>;
}`,
        howItWorks: "Executes only on the server, produces HTML + React Server Component (RSC) payload.",
        pros: ["0 KB client bundle size", "Direct database access", "Automatic security for API tokens"],
        cons: ["Cannot use useState, useEffect, onClick, or browser APIs (window/localStorage)"],
        whenToUse: "For 80%+ of your pages, layouts, data-heavy tables, and static cards.",
        isRecommended: true,
      },
      {
        name: "Client Component ('use client')",
        syntax: "'use client' at line 1",
        codeSnippet: `"use client";
import { useState } from "react";
export function Counter() { ... }`,
        howItWorks: "Pre-rendered on server for initial HTML, then hydrated with JavaScript in browser.",
        pros: ["Can use all React hooks (useState, useEffect, useContext)", "Handles browser events (onClick, onScroll)"],
        cons: ["Increases client JavaScript bundle size"],
        whenToUse: "For form inputs, buttons, sliders, modals, interactive charts, and animations.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Keep parent pages and layouts as Server Components. Push `'use client'` down to the leaves of your component tree.",
      scenarios: [
        {
          scenario: "You need to fetch student records from Supabase and show a table",
          recommendedApproach: "Server Component (no 'use client')",
          reason: "Database query runs securely on server; table HTML is delivered with 0 KB client JS.",
        },
        {
          scenario: "You need a search input box that filters table rows as the user types",
          recommendedApproach: "Client Component for the search input box only",
          reason: "Input typing requires `onChange` and client state.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Placing 'use client' at the root layout or top of every page",
        badCode: `// ❌ BAD: src/app/layout.tsx
"use client"; // Turns the entire application into client-rendered React!
export default function RootLayout({ children }: { children: React.ReactNode }) { ... }`,
        goodCode: `// ✅ GOOD: Keep layout as Server Component; make only interactive widgets client components
export default function RootLayout({ children }: { children: React.ReactNode }) { ... }`,
        whyItBreaks: "Marking a parent component with `'use client'` turns ALL imported child components into Client Components, forfeiting the performance benefits of Next.js.",
        howToFix: "Only put `'use client'` on specific interactive components inside `src/components/`.",
      },
    ],

    bestPractices: [
      {
        title: "Move Client Interactivity to the Leaves",
        rule: "Keep data fetching in Server Components and pass data as props to small Client Component buttons.",
        explanation: "Maintains minimal JavaScript payload and maximum page load speed.",
      },
    ],

    exercises: [
      {
        id: "u2-ex-2",
        title: "Build an Interactive Like Counter Component",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Create a Client Component `LikeButton.tsx` with `'use client'` that maintains a click counter and displays the total likes.",
        initialCode: `// TODO: Create a Client Component
import { useState } from "react";

export function LikeButton({ initialLikes = 0 }: { initialLikes?: number }) {
  // TODO: Add state and button onClick
  return (
    <button>
      ❤️ Likes: 0
    </button>
  );
}`,
        expectedOutput: "A functional client component button incrementing its like count on click.",
        hints: ["Add `\"use client\";` on the very first line", "Use `const [likes, setLikes] = useState(initialLikes);`"],
        solutionCode: `"use client";

import { useState } from "react";

export function LikeButton({ initialLikes = 0 }: { initialLikes?: number }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-xl text-sm font-medium transition-all active:scale-95"
    >
      <span>❤️</span>
      <span>{likes} Helpful</span>
    </button>
  );
}`,
        solutionExplanation:
          "Because this component has `'use client'`, React attaches browser event listeners to handle `onClick` without requiring the whole page to be client-side.",
      },
    ],

    quizzes: [
      {
        id: "u2-q2",
        question: "What happens when you import a Server Component directly into a Client Component?",
        syllabusTopic: "Server vs Client Component Boundaries",
        options: [
          { id: "a", text: "It remains a Server Component with 0 KB bundle", isCorrect: false, explanation: "Direct static imports in client files become client components." },
          { id: "b", text: "It is automatically converted into a Client Component and bundled into the client JavaScript", isCorrect: true, explanation: "Correct! If a Client Component statically imports a component, that child becomes part of the client bundle unless passed as children." },
          { id: "c", text: "The Next.js compiler crashes with a fatal syntax error", isCorrect: false, explanation: "It compiles, but converts it to a client component." },
          { id: "d", text: "It only works on iOS Safari", isCorrect: false, explanation: "Platform is unrelated." },
        ],
        conceptualExplanation:
          "To render a Server Component inside a Client Component while preserving its 0-bundle server nature, pass it via the `{children}` prop (the Interleaving Pattern).",
      },
    ],

    realWorldExample: {
      domain: "Media Streaming & Video Player Platform",
      description: "How YouTube/Netflix-style platforms render video descriptions, comments, and recommendations on the server while keeping the interactive video player as a client component.",
      code: {
        title: "Video Watch Page Composition",
        description: "Server page embedding client video player.",
        language: "tsx",
        filename: "src/app/watch/[id]/page.tsx",
        code: `import { VideoPlayer } from "@/components/VideoPlayer"; // 'use client'
import { CommentsList } from "@/components/CommentsList"; // Server Component

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await getVideoDetails(id);

  return (
    <div className="space-y-6">
      {/* Interactive Player with controls (Client Component) */}
      <VideoPlayer src={video.streamUrl} />

      {/* Heavy Server-Rendered Metadata & Comments (0 KB client bundle!) */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-zinc-400">{video.description}</p>
      </div>
      <CommentsList videoId={id} />
    </div>
  );
}`,
      },
      keyTakeaway: "Combine heavy server components for content and light client components for media controls to achieve maximum performance.",
    },

    combinedExample: {
      combinedTopics: ["Server Components", "Client Components", "Data Fetching"],
      title: "Course Lesson with Interactive Progress Tracker",
      description: "Fetching course syllabus on the server and passing progress handlers to client checkboxes.",
      code: {
        title: "Hybrid Course Unit Viewer",
        description: "Server Component fetching data and passing items to interactive Client Component.",
        language: "tsx",
        filename: "src/app/units/[unitId]/page.tsx",
        code: `// Server Component: Fetches syllabus data
import { syllabusUnits } from "@/data/syllabus";
import { TopicCheckbox } from "@/components/TopicCheckbox"; // 'use client'

export default async function UnitPage({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  const unit = syllabusUnits.find(u => u.id === unitId);

  if (!unit) return <div>Unit not found</div>;

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">{unit.title}</h1>
      <div className="space-y-2">
        {unit.topics.map((topic) => (
          <div key={topic.id} className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
            <span className="text-sm font-medium text-zinc-200">{topic.title}</span>
            {/* Client Island */}
            <TopicCheckbox topicId={topic.id} />
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Server queries unit data from memory/database",
        "Generates initial HTML structure",
        "Browser receives fast pre-rendered HTML",
        "React hydrates only the small `<TopicCheckbox />` buttons for instant clicking",
      ],
    },
  },

  {
    id: "data-fetching-strategies",
    unitId: "unit-2",
    title: "Data Fetching in Server & Client Components",
    shortSummary: "Fetch data directly inside async Server Components without useEffect, and learn client-side data fetching with SWR/TanStack.",
    order: 3,
    tags: ["Data Fetching", "async/await", "Server Fetch", "Parallel Fetching", "SWR"],

    simpleExplanation:
      "In standard React, fetching data is annoying: you have to write `useState`, create a `useEffect` hook, handle loading booleans, and deal with cleanup functions. In Next.js Server Components, fetching data is as simple as writing `const data = await fetch(...)` directly inside your component function! No `useEffect`, no state variables, and no flash of empty content.",

    whyNeeded:
      "Server-side data fetching eliminates client network latency (waterfalls), reduces the amount of JavaScript sent to mobile phones, and keeps database connections fast and secure on the backend.",

    reactVsNext: {
      concept: "Data Fetching Flow",
      reactWay: {
        title: "React Client-Side useEffect Fetching",
        code: `// Traditional React Data Fetching (Boilerplate heavy)
import { useState, useEffect } from "react";

export function StudentRoster() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/students")
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setStudents(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <ul>{students.map(s => <li key={s.id}>{s.name}</li>)}</ul>;
}`,
        explanation:
          "In plain React, you must handle mount states, cancel tokens, loading spinners, and error objects manually.",
        drawbacks: [
          "25+ lines of code just to fetch a simple list",
          "Waterfall: page loads -> downloads JS -> starts fetch -> shows spinner -> renders data",
          "SEO crawler sees empty loading state",
        ],
      },
      nextjsWay: {
        title: "Next.js Async Server Component Fetching",
        code: `// Next.js App Router: Simple, direct async/await!
export default async function StudentRoster() {
  // Direct fetch inside the component body:
  const res = await fetch("https://api.university.com/students");
  const students = await res.json();

  return (
    <ul className="space-y-2">
      {students.map((s: any) => (
        <li key={s.id} className="p-3 bg-zinc-900 rounded-lg">
          {s.name}
        </li>
      ))}
    </ul>
  );
}`,
        explanation:
          "In Next.js, component functions can be `async`. Data is fetched on the server before HTML is sent to the client.",
        benefits: [
          "Under 10 lines of clean, readable code",
          "HTML arrives fully populated with data (instant paint, 100% SEO friendly)",
          "Zero client JavaScript required for data fetching",
        ],
      },
      whyDifferent:
        "React Server Components execute in an asynchronous Node.js/Edge environment where `await` is natively supported inside React component trees.",
      mentalShiftSummary:
        "Delete `useEffect` and `useState` for data loading. Just write `async function Component()` and `await fetch()`.",
    },

    basicExample: {
      title: "Direct Server Fetching with Error Handling",
      description: "Fetching dynamic data inside an async Next.js Server Component.",
      language: "tsx",
      filename: "src/app/students/page.tsx",
      code: `// src/app/students/page.tsx
interface Student {
  id: number;
  name: string;
  course: string;
}

export default async function StudentsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=4");
  
  if (!res.ok) {
    throw new Error("Failed to fetch students from university API");
  }

  const students: Array<{ id: number; name: string; email: string }> = await res.json();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Enrolled Students</h1>
      <div className="grid gap-3">
        {students.map((student) => (
          <div key={student.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-zinc-200">{student.name}</h2>
              <p className="text-xs text-zinc-500">{student.email}</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono">
              INT257
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      explanation:
        "The data is fetched directly on the server. The user receives pre-rendered HTML without seeing any client loading spinners.",
      outputPreview: "List of enrolled students with styled email subtext and green INT257 course badge.",
    },

    moreExamples: [
      {
        title: "Parallel Data Fetching with Promise.all",
        description: "Avoid sequential waterfalls by fetching multiple independent resources at the exact same time.",
        language: "tsx",
        filename: "src/app/dashboard/page.tsx",
        code: `// Parallel fetching: Both API calls run concurrently!
export default async function DashboardPage() {
  const [coursesRes, announcementsRes] = await Promise.all([
    fetch("https://api.school.com/courses"),
    fetch("https://api.school.com/announcements"),
  ]);

  const courses = await coursesRes.json();
  const announcements = await announcementsRes.json();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <section><h2>Courses ({courses.length})</h2></section>
      <section><h2>Announcements ({announcements.length})</h2></section>
    </div>
  );
}`,
        explanation:
          "`Promise.all` executes both requests in parallel, cutting total loading time in half compared to sequential `await` statements.",
      },
    ],

    multipleWays: [
      {
        name: "Async Server Component (Recommended)",
        syntax: "async function Page() { await fetch(...) }",
        codeSnippet: `export default async function Page() {
  const data = await getDatabaseData();
  return <div>{data.title}</div>;
}`,
        howItWorks: "Runs on the server before sending HTML.",
        pros: ["Direct DB access", "0 KB client bundle", "Instant SEO"],
        cons: ["Cannot respond to live client mouse events without re-fetching"],
        whenToUse: "For all standard initial page data.",
        isRecommended: true,
      },
      {
        name: "Client Fetch with SWR / TanStack Query",
        syntax: "const { data, error } = useSWR('/api/data', fetcher)",
        codeSnippet: `"use client";
import useSWR from "swr";
export function LiveChat() {
  const { data } = useSWR('/api/chat', fetcher, { refreshInterval: 1000 });
  return <div>{data?.messages}</div>;
}`,
        howItWorks: "Fetches on the client and periodically polls or synchronizes with WebSockets.",
        pros: ["Auto-revalidation on window focus", "Real-time intervals"],
        cons: ["Requires extra npm library and client JS"],
        whenToUse: "For real-time chats, live stock notifications, or user polling.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Fetch data in async Server Components for page rendering. Use Client fetch only for real-time polling.",
      scenarios: [
        {
          scenario: "Loading a blog post or student report card",
          recommendedApproach: "Async Server Component with `fetch()`",
          reason: "Best performance and complete pre-rendered HTML.",
        },
        {
          scenario: "Auto-refreshing live cryptocurrency ticker every 2 seconds",
          recommendedApproach: "Client Component with `useSWR` interval polling or WebSocket",
          reason: "Needs periodic client-side re-fetching without whole-page reloads.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Creating sequential waterfalls with sequential await statements",
        badCode: `// ❌ SLOW: Waits for user, THEN waits for posts (2x duration)
const user = await fetchUser();
const posts = await fetchPosts();`,
        goodCode: `// ✅ FAST: Initiates both fetches simultaneously
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);`,
        whyItBreaks: "Sequential requests take Time(A) + Time(B) instead of Max(Time(A), Time(B)).",
        howToFix: "Use `Promise.all()` when requests do not depend on each other.",
      },
    ],

    bestPractices: [
      {
        title: "Colocate Data Fetching Where Data is Used",
        rule: "Fetch data inside the specific component that renders it rather than passing props through 10 parent layers.",
        explanation: "Next.js automatically deduplicates identical `fetch()` requests across the component tree.",
      },
    ],

    exercises: [
      {
        id: "u2-ex-3",
        title: "Implement Parallel Server Fetching",
        difficulty: "medium",
        estimatedMinutes: 10,
        prompt:
          "Write an async Server Component that uses `Promise.all` to fetch both `/users` and `/todos` concurrently, then renders their counts.",
        initialCode: `export default async function ParallelDashboard() {
  // TODO: Fetch users and todos concurrently using Promise.all
  return (
    <div>
      {/* Show counts */}
    </div>
  );
}`,
        expectedOutput: "A dashboard displaying counts for both datasets fetched in parallel.",
        hints: ["Use `const [usersRes, todosRes] = await Promise.all([...])`"],
        solutionCode: `export default async function ParallelDashboard() {
  const [usersRes, todosRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5"),
  ]);

  const users = await usersRes.json();
  const todos = await todosRes.json();

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
      <h1 className="text-xl font-bold text-zinc-100">Parallel Fetching Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
          <span className="text-2xl font-bold text-emerald-400">{users.length}</span>
          <p className="text-xs text-zinc-400">Total Users</p>
        </div>
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
          <span className="text-2xl font-bold text-amber-400">{todos.length}</span>
          <p className="text-xs text-zinc-400">Active Tasks</p>
        </div>
      </div>
    </div>
  );
}`,
        solutionExplanation:
          "Both HTTP requests execute at the exact same moment on the server, drastically reducing total response time.",
      },
    ],

    quizzes: [
      {
        id: "u2-q3",
        question: "Why is async/await data fetching inside Server Components faster on mobile devices than useEffect in React?",
        syllabusTopic: "Server Data Fetching Performance",
        options: [
          { id: "a", text: "Because mobile phones do not support JSON", isCorrect: false, explanation: "All modern devices support JSON." },
          { id: "b", text: "Because the server runs close to the database and sends complete HTML, eliminating client network waterfalls", isCorrect: true, explanation: "Correct! Server-side data fetching avoids client roundtrips and sends ready-to-display HTML." },
          { id: "c", text: "Because useEffect is disabled by Google", isCorrect: false, explanation: "useEffect is a core React hook." },
          { id: "d", text: "Because async functions use less battery", isCorrect: false, explanation: "The main reason is architecture and network roundtrips." },
        ],
        conceptualExplanation:
          "Server data fetching executes directly in the cloud data center near your database, sending pure HTML to the user with zero client-side waterfall latency.",
      },
    ],

    realWorldExample: {
      domain: "Analytics SaaS Platform",
      description: "How high-traffic analytics platforms query databases server-side and render charts without exposing database credentials.",
      code: {
        title: "Secure Server Metric Aggregator",
        description: "Direct server database queries.",
        language: "tsx",
        filename: "src/app/analytics/page.tsx",
        code: `export default async function AnalyticsPage() {
  const metrics = await fetch("https://api.internal-metrics.corp/summary", {
    headers: { Authorization: \`Bearer \${process.env.INTERNAL_METRICS_KEY}\` }
  }).then(r => r.json());

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
      <h1 className="text-xl font-bold">Monthly Active Users: {metrics.mau.toLocaleString()}</h1>
    </div>
  );
}`,
      },
      keyTakeaway: "Server components can safely use secret environment variables (like `INTERNAL_METRICS_KEY`) without them ever leaking to the browser.",
    },

    combinedExample: {
      combinedTopics: ["Server Fetch", "Suspense", "TypeScript"],
      title: "Streaming Server Data Fetcher with Suspense Boundary",
      description: "Combining async data fetching with React Suspense for smooth progressive loading.",
      code: {
        title: "Async Data Component with Suspense Fallback",
        description: "Suspense boundary wrapping slow server component.",
        language: "tsx",
        filename: "src/app/courses/page.tsx",
        code: `import { Suspense } from "react";

async function CourseList() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
  const courses = await res.json();
  return (
    <div className="space-y-2">
      {courses.map((c: any) => (
        <div key={c.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200">
          {c.title}
        </div>
      ))}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Available Courses</h1>
      <Suspense fallback={<div className="h-24 bg-zinc-900 animate-pulse rounded-xl" />}>
        <CourseList />
      </Suspense>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "User visits `/courses`",
        "Heading renders instantly",
        "Suspense shows smooth animated skeleton placeholder",
        "`CourseList` completes fetch on server and streams into place",
      ],
    },
  },

  {
    id: "caching-and-revalidation",
    unitId: "unit-2",
    title: "Caching Architecture & Revalidation",
    shortSummary: "Understand the 4 caching layers in Next.js, time-based revalidation, and on-demand cache purges with revalidatePath and revalidateTag.",
    order: 4,
    tags: ["Caching", "Revalidation", "revalidatePath", "revalidateTag", "Data Cache"],

    simpleExplanation:
      "Imagine every time someone asks for your website, your server had to recalculate everything from scratch—it would be slow and expensive. Caching means saving a completed copy of data or HTML so the next visitor gets it instantly in 1 millisecond. **Revalidation** is the process of updating that cached copy when new data is added (for example, when a teacher publishes a new assignment).",

    whyNeeded:
      "Without caching, high-traffic websites crash under database overload. Next.js provides a multi-layer caching architecture that makes sites blisteringly fast while giving you surgical tools (`revalidatePath` and `revalidateTag`) to purge outdated data on demand.",

    reactVsNext: {
      concept: "Caching & Revalidation Model",
      reactWay: {
        title: "Manual Client Cache (TanStack / React Query)",
        code: `// In React, you must install TanStack Query and manage cache keys manually:
import { useQuery, useQueryClient } from "@tanstack/react-query";

function PostList() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(r => r.json()),
    staleTime: 60000, // 1 minute client cache
  });

  const handleUpdate = async () => {
    await fetch('/api/posts', { method: 'POST', body: ... });
    // Invalidate client cache:
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };
}`,
        explanation:
          "In vanilla React, caching only lives inside the individual user's browser memory. If a new user opens the website, they start with an empty cache.",
        drawbacks: [
          "Every individual visitor hits the database independently",
          "Cache is lost if the user refreshes or closes the tab",
          "Requires heavy third-party client libraries",
        ],
      },
      nextjsWay: {
        title: "Next.js Built-in Server & CDN Caching",
        code: `// 1. Tagging a fetch request on the server:
export async function getPosts() {
  const res = await fetch("https://api.example.com/posts", {
    next: { tags: ["posts-list"] } // Assign a cache tag
  });
  return res.json();
}

// 2. On-demand Purge inside a Server Action:
"use server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData) {
  await savePostToDatabase(formData);

  // Instantly purges cache globally for all visitors:
  revalidateTag("posts-list");
  // Or purge a specific route path:
  revalidatePath("/blog");
}`,
        explanation:
          "Next.js caches data on the server and CDN globally. Calling `revalidateTag()` updates the cache for ALL users worldwide in real time.",
        benefits: [
          "Zero client library dependencies",
          "Shared global cache (one visitor's request warms the cache for everyone)",
          "Instant surgical cache purge on database mutations",
        ],
      },
      whyDifferent:
        "Next.js caches at the server and edge network level, so thousands of users share the same blazing fast cached data.",
      mentalShiftSummary:
        "Tag your fetches with `next: { tags: ['my-tag'] }`. Purge them in Server Actions with `revalidateTag('my-tag')`.",
    },

    basicExample: {
      title: "On-Demand Cache Revalidation with revalidatePath",
      description: "Purging the cache of a route immediately after adding a new item.",
      language: "tsx",
      filename: "src/actions/todo.ts",
      code: `"use server"; // Server Action

import { revalidatePath } from "next/cache";

export async function addTodoAction(formData: FormData) {
  const title = formData.get("title") as string;

  // Insert todo into database:
  await db.insert({ title, completed: false });

  // Instantly invalidate the cache for /todos so the page shows the new item:
  revalidatePath("/todos");
}`,
      explanation:
        "When `revalidatePath('/todos')` runs, Next.js marks the cached HTML for `/todos` as stale and regenerates it with the latest database records.",
      outputPreview: "Form submission triggers immediate cache purge and updates the page without full reload.",
    },

    moreExamples: [
      {
        title: "Tag-Based Revalidation (revalidateTag)",
        description: "Targeting specific datasets across multiple different pages using semantic cache tags.",
        language: "tsx",
        filename: "src/actions/courses.ts",
        code: `"use server";

import { revalidateTag } from "next/cache";

export async function updateCourseSyllabus(courseId: string) {
  await updateCourseInDatabase(courseId);

  // Purges every page in the app that fetched data tagged with 'courses':
  revalidateTag("courses");
}`,
        explanation:
          "`revalidateTag` is more flexible than `revalidatePath` because one tag can update the homepage, course list, and sidebar simultaneously.",
      },
    ],

    multipleWays: [
      {
        name: "Time-Based Revalidation",
        syntax: "fetch(url, { next: { revalidate: 60 } })",
        codeSnippet: `const res = await fetch('https://api.com/news', { next: { revalidate: 300 } });`,
        howItWorks: "Cache expires automatically after the specified number of seconds.",
        pros: ["Completely automated", "No webhook or mutation wiring needed"],
        cons: ["May serve stale data for up to X seconds after an update"],
        whenToUse: "For content that updates periodically (weather, news, aggregate stats).",
      },
      {
        name: "On-Demand Revalidation (revalidatePath / revalidateTag)",
        syntax: "revalidateTag('tag-name') / revalidatePath('/path')",
        codeSnippet: `revalidateTag('products');
revalidatePath('/shop');`,
        howItWorks: "Cache is kept indefinitely until explicitly purged by a Server Action or Route Handler.",
        pros: ["100% fresh data immediately after mutations", "Maximum cache hit ratio (fastest speed)"],
        cons: ["Must remember to call revalidate in mutation handlers"],
        whenToUse: "For user-driven data: forms, comments, product edits, inventory updates.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use On-Demand `revalidateTag` for user CRUD actions; use Time-Based `revalidate` for external API feeds.",
      scenarios: [
        {
          scenario: "A student submits an assignment or a teacher edits a grade",
          recommendedApproach: "On-Demand `revalidatePath('/grades')` inside the Server Action",
          reason: "The teacher and student must see the updated grade immediately.",
        },
        {
          scenario: "Fetching external weather data or public GitHub repository star counts",
          recommendedApproach: "Time-Based `revalidate: 3600` (1 hour)",
          reason: "External counts don't need real-time precision and shouldn't overload third-party rate limits.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Calling revalidatePath inside a Client Component",
        badCode: `// ❌ BAD: 'revalidatePath' only works on the server!
"use client";
import { revalidatePath } from "next/cache"; // Compile Error!`,
        goodCode: `// ✅ GOOD: Call revalidatePath inside a Server Action or Route Handler
"use server";
import { revalidatePath } from "next/cache";`,
        whyItBreaks: "`revalidatePath` and `revalidateTag` are server-only APIs that manipulate server-side caches.",
        howToFix: "Wrap cache invalidation logic inside Server Actions or Route Handlers.",
      },
    ],

    bestPractices: [
      {
        title: "Use Descriptive, Granular Cache Tags",
        rule: "Tag fetches with entity-specific tags like `courses` or `course-101`.",
        explanation: "Allows invalidating just one specific entity without clearing the cache for unrelated pages.",
      },
    ],

    exercises: [
      {
        id: "u2-ex-4",
        title: "Write a Server Action with Tag Invalidation",
        difficulty: "medium",
        estimatedMinutes: 8,
        prompt:
          "Write a Server Action `publishAnnouncementAction` that logs an announcement and invalidates the cache tag `'campus-announcements'` using `revalidateTag`.",
        initialCode: `// Define a Server Action with cache invalidation
export async function publishAnnouncementAction(formData: FormData) {
  // TODO: Add 'use server', extract title, and revalidate tag
}`,
        expectedOutput: "A Server Action calling revalidateTag('campus-announcements').",
        hints: ["Include `\"use server\";` at top of function or file", "Import `revalidateTag` from `next/cache`"],
        solutionCode: `"use server";

import { revalidateTag } from "next/cache";

export async function publishAnnouncementAction(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  console.log("Publishing announcement:", { title, content });

  // Invalidate all pages tagged with 'campus-announcements':
  revalidateTag("campus-announcements");
}`,
        solutionExplanation:
          "When this Server Action runs, Next.js instantly purges cached HTML and data for every page displaying campus announcements.",
      },
    ],

    quizzes: [
      {
        id: "u2-q4",
        question: "What is the key advantage of revalidateTag over revalidatePath?",
        syllabusTopic: "Next.js Revalidation",
        options: [
          { id: "a", text: "revalidateTag only works in Google Chrome", isCorrect: false, explanation: "Revalidation is browser-independent." },
          { id: "b", text: "revalidateTag can purge data across multiple different routes at once by referencing a shared semantic tag", isCorrect: true, explanation: "Correct! One tag can invalidate multiple pages that share the same data query." },
          { id: "c", text: "revalidateTag is 100 times slower", isCorrect: false, explanation: "Both are near instantaneous." },
          { id: "d", text: "revalidateTag requires a payment subscription", isCorrect: false, explanation: "It is a free built-in Next.js feature." },
        ],
        conceptualExplanation:
          "`revalidateTag` allows decoupling cache invalidation from URL path structures, making multi-page data updates clean and maintainable.",
      },
    ],

    realWorldExample: {
      domain: "Publishing & Media News Portal",
      description: "How major newspapers deploy breaking news instantly by triggering tag invalidations via webhooks.",
      code: {
        title: "CMS Webhook Revalidation Endpoint",
        description: "Route handler receiving headless CMS webhooks.",
        language: "tsx",
        filename: "src/app/api/revalidate/route.ts",
        code: `import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // Purge news cache immediately:
  revalidateTag("breaking-news");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}`,
      },
      keyTakeaway: "Headless CMS platforms call this webhook when a journalist clicks 'Publish', updating the static news site in under 50 milliseconds.",
    },

    combinedExample: {
      combinedTopics: ["Tagged Fetching", "Server Actions", "revalidateTag"],
      title: "End-to-End Tagged Data Mutation Pipeline",
      description: "Fetching tagged data on a page and invalidating it through a Server Action form submission.",
      code: {
        title: "Complete Tagged Fetch & Invalidation Pattern",
        description: "Server Component fetching tagged data and Server Action form.",
        language: "tsx",
        filename: "src/app/announcements/page.tsx",
        code: `import { revalidateTag } from "next/cache";

async function addNotice(formData: FormData) {
  "use server";
  const notice = formData.get("notice");
  // Save to db...
  revalidateTag("notices");
}

export default async function NoticesPage() {
  const res = await fetch("https://api.school.com/notices", {
    next: { tags: ["notices"] }
  });
  const notices = await res.json();

  return (
    <div className="p-6 space-y-6">
      <form action={addNotice} className="flex gap-2">
        <input name="notice" placeholder="Add notice..." className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100" />
        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">Post</button>
      </form>

      <ul className="space-y-2">
        {notices.map((n: any) => <li key={n.id} className="p-3 bg-zinc-900 rounded-lg">{n.text}</li>)}
      </ul>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Page loads cached notices with tag `notices`",
        "Admin submits form -> `addNotice` Server Action runs",
        "`revalidateTag('notices')` invalidates cache",
        "Next.js seamlessly re-fetches and streams fresh notices to the screen",
      ],
    },
  },
];
