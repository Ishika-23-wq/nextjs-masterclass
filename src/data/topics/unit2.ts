import { TopicContent } from "@/types";

export const unit2Topics: TopicContent[] = [
  {
    id: "rendering-paradigms",
    unitId: "unit-2",
    title: "Rendering Strategies: SSR, SSG, ISR & CSR",
    shortSummary: "Understand the 4 rendering strategies in web development using the bakery analogy, when HTML is generated, and how Next.js unifies them.",
    order: 1,
    tags: ["SSR", "SSG", "ISR", "CSR", "Rendering"],

    simpleExplanation:
      "Imagine you run a bakery. There are 4 different ways to serve your customers:\n\n1. **SSG (Static Site Generation) - Morning Bread!**\nYou bake 100 loaves of bread once at 6:00 AM (during `npm run build`). When a customer walks in at 2:00 PM, you hand them a loaf in 1 second flat. It is blazing fast, but the bread was baked earlier in the morning.\n\n2. **SSR (Server-Side Rendering) - Fresh Hot Pizza!**\nEvery time a customer places an order, the chef fires up the oven and bakes a fresh pizza with custom toppings right then and there. It takes a few extra seconds, but the food is 100% fresh and made-to-order.\n\n3. **ISR (Incremental Static Regeneration) - Fresh Cookie Batches!**\nYou keep warm cookies on the counter. Every 60 seconds, your kitchen quietly bakes a fresh batch in the background. Customers get cookies instantly, and the cookies are never older than 60 seconds!\n\n4. **CSR (Client-Side Rendering) - DIY Meal Kit!**\nYou hand the customer raw flour, yeast, and a mini oven to take to their table and bake the bread themselves on their own laptop.",

    whyNeeded:
      "Different pages have different freshness needs. An 'About Us' page never changes, so SSG gives visitors 0ms instant loading. A real-time stock ticker or bank balance must be SSR so numbers are 100% up-to-the-second fresh. A blog or e-commerce shop with thousands of items uses ISR so pages load with static speed but quietly update in the background. Next.js lets you mix and match all 4 rendering styles in the SAME website!",

    reactVsNext: {
      concept: "Page Rendering Strategy",
      reactWay: {
        title: "Client-Side Only Rendering (CSR)",
        code: `// Pure Client-Side Rendering (CSR)
// The server only sends a blank page: <div id="root"></div>
import { useState, useEffect } from "react";

export default function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // The browser has to download React first,
    // THEN start downloading this data:
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div>
      {items.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}`,
        explanation:
          "React by itself only runs in the user's browser. It cannot pre-render static HTML on a server without complicated custom build pipelines.",
        drawbacks: [
          "Zero pre-rendered HTML (users see a blank white screen while downloading JavaScript)",
          "Search engines like Google struggle to index dynamic client-rendered content",
          "Cannot do SSG or ISR out of the box",
        ],
      },
      nextjsWay: {
        title: "Next.js Hybrid Rendering Engine (Bakery)",
        code: `// 1. SSG: Static Site Generation (Default for static pages)
export default function AboutPage() {
  return <h1>About Us (Baked once during npm run build!)</h1>;
}

// 2. SSR: Server-Side Rendering (Fresh pizza on every request)
export const dynamic = "force-dynamic";

export default async function LiveDashboard() {
  const res = await fetch("https://api.example.com/stocks", { cache: "no-store" });
  const stocks = await res.json();
  return <div>Live Stock Price: \${stocks.price}</div>;
}

// 3. ISR: Incremental Static Regeneration (Fresh batches every 60s)
export default async function BlogPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 } // Next.js quietly bakes a fresh batch every 60 seconds!
  });
  const posts = await res.json();
  return <div>{posts.map(p => <h2 key={p.id}>{p.title}</h2>)}</div>;
}`,
        explanation:
          "In Next.js, you choose how fresh you want your data with simple settings like `next: { revalidate: 60 }`. Next.js handles the caching and background regeneration automatically.",
        benefits: [
          "Instant static delivery from Edge CDN servers worldwide",
          "Fresh data whenever you need it without sacrificing SEO or mobile speed",
          "Incremental updates: update one single post without rebuilding the entire website",
        ],
      },
      whyDifferent:
        "Next.js unifies CSR, SSR, SSG, and ISR into a single framework. You don't have to choose between a static generator or a server; you get both simultaneously.",
      mentalShiftSummary:
        "Don't fetch data on the client by default. Ask: 'Is this data static (SSG), periodic (ISR), or real-time unique (SSR)?'",
    },

    basicExample: {
      title: "Configuring ISR with JSONPlaceholder in Plain JavaScript",
      description: "Fetching posts with time-based revalidation to achieve instant static speed with automated updates every 60 seconds.",
      language: "jsx",
      filename: "src/app/posts/page.js",
      code: `// src/app/posts/page.js
// 1. This is an async Server Component written in plain JavaScript:
export default async function PostsPage() {
  // 2. Fetch data from JSONPlaceholder with a 60-second ISR timer:
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 60 },
  });

  // 3. Convert the response to a plain JavaScript array:
  const posts = await res.json();

  // 4. Return JSX to render the posts:
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-100">Latest Articles</h1>
        <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-md font-mono">
          ISR: 60s Freshness
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
        "Line-by-line explanation:\n- Line 2: export default async function PostsPage() defines an asynchronous Server Component. Because it is on the server, we can use await directly inside it!\n- Line 4: fetch(..., { next: { revalidate: 60 } }) tells Next.js: 'Cache this response for 60 seconds. When 60 seconds pass, quietly fetch a new copy in the background.'\n- Line 9: await res.json() parses the data into a normal JavaScript array of post objects.\n- Line 12-28: Next.js renders the full HTML with the posts already filled in and sends it to the browser.\n\nWhat happens in the browser?\n1. Visitor 1 arrives: Next.js serves the cached static HTML in under 10ms. No loading spinner!\n2. Visitor 2 arrives at 30 seconds: Still within the 60s window, gets the instant cached page.\n3. Visitor 3 arrives at 65 seconds: Next.js still shows the fast cached page, but in the background it quietly makes a new fetch to JSONPlaceholder and stores the fresh data.\n4. Visitor 4 arrives: Now receives the freshly updated batch of articles!",
      outputPreview: "List of 5 articles with an ISR badge, delivered as pre-rendered HTML in milliseconds.",
    },

    moreExamples: [
      {
        title: "Dynamic Server Rendering (SSR) with force-dynamic",
        description: "Forcing a page to compute on the server on every single HTTP request in plain JavaScript.",
        language: "jsx",
        filename: "src/app/admin/live-stats/page.js",
        code: `// Force dynamic rendering on every single visit (SSR):
export const dynamic = "force-dynamic";

export default async function LiveStatsPage() {
  // Calculated fresh on the server every time someone refreshes:
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
      <span className="text-xs font-mono text-emerald-400 uppercase">⚡ Server Rendered (SSR)</span>
      <h1 className="text-xl font-bold text-zinc-100">Live Server Clock: {timestamp}</h1>
      <p className="text-zinc-400 text-sm">
        This time is generated by the server on every page refresh!
      </p>
    </div>
  );
}`,
        explanation:
          "export const dynamic = 'force-dynamic' tells Next.js: 'Do not save a static copy of this page. Run this function on the server every time a user visits!'",
      },
    ],

    multipleWays: [
      {
        name: "Static Site Generation (SSG)",
        syntax: "default in App Router",
        codeSnippet: "const res = await fetch('https://api.com/data'); // Cached statically at build time",
        howItWorks: "HTML is generated once during npm run build (morning bread) and served instantly via global CDN.",
        pros: ["Fastest possible response time (0ms TTFB)", "Cheapest hosting cost"],
        cons: ["Data remains the same until you redeploy the site"],
        whenToUse: "Marketing pages, portfolios, help documentation, terms of service.",
        isRecommended: true,
      },
      {
        name: "Incremental Static Regeneration (ISR)",
        syntax: "fetch(url, { next: { revalidate: 60 } })",
        codeSnippet: "const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 60 } });",
        howItWorks: "Serves fast cached static pages, then quietly updates the cache in the background after expiry (fresh cookie batches).",
        pros: ["Static speed + automated fresh data", "Users never wait for slow database queries"],
        cons: ["The first visitor after the timer expires sees the older version once while the background rebuild finishes"],
        whenToUse: "E-commerce catalogs, news sites, blogs, student course listings.",
        isRecommended: true,
      },
      {
        name: "Server-Side Rendering (SSR)",
        syntax: "export const dynamic = 'force-dynamic' or fetch(url, { cache: 'no-store' })",
        codeSnippet: "const res = await fetch('https://api.com/account', { cache: 'no-store' });",
        howItWorks: "Generates fresh HTML on the server for every single visitor request (hot pizza baked on order).",
        pros: ["100% guaranteed real-time data", "Can inspect user cookies, headers, and permissions"],
        cons: ["Slightly slower initial response because the server has to work before sending HTML"],
        whenToUse: "Personal account dashboards, checkout screens, real-time banking or stock portals.",
      },
      {
        name: "Client-Side Rendering (CSR)",
        syntax: "'use client' + useEffect / useState",
        codeSnippet: `"use client";
import { useState, useEffect } from "react";
// Data downloaded by the browser after page loads`,
        howItWorks: "Browser downloads an empty skeleton and fills it in using browser JavaScript (DIY kit).",
        pros: ["Great for interactive widgets, drawing canvases, browser video games"],
        cons: ["Slower for mobile devices, empty HTML for SEO crawlers, causes loading spinners"],
        whenToUse: "Interactive drawing tools, audio editors, games.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use SSG for static content, ISR for data that changes occasionally (like blogs and shops), SSR for private user accounts, and CSR only for client interactivity.",
      scenarios: [
        {
          scenario: "University syllabus and course descriptions",
          recommendedApproach: "SSG (or ISR with 24-hour revalidation)",
          reason: "Course outlines rarely change during a semester, so static caching gives instant 0ms speed.",
        },
        {
          scenario: "Live examination countdown timer or student grade report",
          recommendedApproach: "SSR (cache: 'no-store') or Server Action",
          reason: "Grades and exam timers must be 100% accurate and reflect real-time database state.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using cache: 'no-store' on content that rarely changes",
        badCode: `// ❌ BAD: Forcing the server to rebuild static blog articles on every click
const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: "no-store" });`,
        goodCode: `// ✅ GOOD: Use ISR to cache articles with periodic background updates
const res = await fetch("https://jsonplaceholder.typicode.com/posts", { next: { revalidate: 60 } });`,
        whyItBreaks: "Forces your database to handle a heavy query on every single page view unnecessarily, slowing down page loads for all users.",
        howToFix: "Use next: { revalidate: seconds } to cache responses.",
      },
    ],

    bestPractices: [
      {
        title: "Default to Static First",
        rule: "Keep pages static by default, and only introduce dynamic rendering where strictly necessary.",
        explanation: "Static pages delivered via global CDN offer the fastest possible speed and lowest server costs.",
      },
    ],

    exercises: [
      {
        id: "u2-ex-1",
        title: "Configure an ISR Course Feed",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a Server Component for src/app/feed/page.js in plain JavaScript that fetches from https://jsonplaceholder.typicode.com/posts?_limit=3 with an ISR revalidation time of 120 seconds.",
        initialCode: `// src/app/feed/page.js
export default async function FeedPage() {
  // TODO: Fetch feed data with 120 second ISR revalidation
  return (
    <div>
      {/* Render feed */}
    </div>
  );
}`,
        expectedOutput: "A server-rendered feed component using next: { revalidate: 120 } in plain JavaScript.",
        hints: ["Pass { next: { revalidate: 120 } } to the fetch options object"],
        solutionCode: `// src/app/feed/page.js
export default async function FeedPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3", {
    next: { revalidate: 120 },
  });
  const items = await res.json();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-zinc-100">Course Feed (120s ISR)</h1>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            <h2 className="font-medium text-zinc-200">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        solutionExplanation: "Using next: { revalidate: 120 } instructs Next.js to serve static HTML from the cache, while refreshing it in the background every 120 seconds.",
      },
    ],

    quizzes: [
      {
        id: "u2-q1",
        syllabusTopic: "Rendering Paradigms (SSR, SSG, ISR, CSR)",
        question: "What does ISR (Incremental Static Regeneration) do in Next.js?",
        conceptualExplanation: "ISR lets you keep static CDN speeds while Next.js quietly regenerates pages in the background when the timer expires.",
        options: [
          { id: "a", text: "It deletes your database every hour", isCorrect: false, explanation: "ISR is a page caching and regeneration strategy, not a database tool." },
          { id: "b", text: "It serves fast cached static pages and quietly rebuilds them in the background after a set number of seconds", isCorrect: true, explanation: "Correct! Like baking fresh cookie batches, visitors get instant cached pages while Next.js updates them in the background." },
          { id: "c", text: "It forces the user's phone to recompile the whole website", isCorrect: false, explanation: "ISR runs on the server/CDN, not on the user's phone." },
          { id: "d", text: "It is only available in Python web apps", isCorrect: false, explanation: "ISR is a core Next.js feature." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Global E-Commerce Store (100,000 Products)",
      description: "How Amazon or Shopify-style sites serve instant static product pages while keeping prices and inventory updated via ISR in plain JavaScript.",
      code: {
        title: "Product Detail Page with 5-minute ISR",
        description: "Fast static catalog with background inventory refreshes in plain JavaScript.",
        language: "jsx",
        filename: "src/app/products/[id]/page.js",
        code: `export default async function ProductPage({ params }) {
  const { id } = await params;
  const res = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
    next: { revalidate: 300 } // Regenerates every 5 minutes (300 seconds)
  });
  const product = await res.json();

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
      <span className="text-xs text-amber-400 font-mono">Product ID: {id}</span>
      <h1 className="text-2xl font-bold text-zinc-100">{product.title}</h1>
      <p className="text-zinc-400 text-sm">{product.body}</p>
    </div>
  );
}`,
      },
      keyTakeaway: "ISR avoids overloading database servers with 100,000 queries per second while keeping product information fresh.",
    },

    combinedExample: {
      combinedTopics: ["ISR", "Dynamic Routes", "Error Boundary"],
      title: "Resilient ISR Dynamic Catalog",
      description: "Combining dynamic route params with time-based revalidation and safe fallbacks in plain JavaScript.",
      code: {
        title: "Production ISR Page with Graceful Fallback",
        description: "Dynamic route fetching external API with ISR caching.",
        language: "jsx",
        filename: "src/app/catalog/[id]/page.js",
        code: `export default async function CatalogItemPage({ params }) {
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
    return (
      <div className="p-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
        Unable to load catalog item.
      </div>
    );
  }
}`,
      },
      stepByStepFlow: [
        "User visits /catalog/1",
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
    shortSummary: "Master React Server Components using the Restaurant analogy: Kitchen (Server) vs Dining Table (Client), and why useState is a memory box.",
    order: 2,
    tags: ["Server Components", "Client Components", "use client", "Hydration", "useState"],

    simpleExplanation:
      "Think of a restaurant:\n\n1. **The Kitchen (Server Component)**:\nBehind swinging doors, the chef prepares the dishes. Heavy gas ovens, big refrigerators, and secret sauce recipes (database passwords and secret API keys) stay strictly in the kitchen. The customer at the dining table NEVER enters the kitchen, and heavy cooking appliances are NEVER hauled to the customer's table. In Next.js, EVERY component is in the Kitchen by default! Its JavaScript code is NEVER sent to the user's browser, meaning 0 KB bundle size!\n\n2. **The Dining Table (Client Component)**:\nThe dining table is where the customer sits. It has interactive things: a salt shaker they can shake, a menu they can open, or a napkin they can unfold. When you need browser interactivity (like a button click onClick or a search input onChange), you place 'use client' at the very top of that specific file!\n\n3. **What is useState?**\nuseState is like a little **memory box** that remembers a value (such as click count or text input) across clicks. Server Components run once on the server, create HTML, and finish. They don't stay alive in the browser, so they don't have this memory box. Only Client Components have useState!",

    whyNeeded:
      "In standard React apps, 100% of your code is shipped to every mobile user, leading to giant download sizes that take seconds to load. By keeping 80% of your app as Server Components in the Kitchen, Next.js drastically cuts mobile data usage, speeds up performance, and keeps secret database keys completely safe from hackers.",

    reactVsNext: {
      concept: "Component Execution Environment",
      reactWay: {
        title: "All Components are Client Components (Everything on the Table)",
        code: `// In client-only execution, every component is bundled and sent to the browser:
import { useState } from "react";

export function HeavyDashboard() {
  // Even if this component just shows static text and has no buttons,
  // its entire code is downloaded by every single mobile phone!
  return <div>Static University Dashboard</div>;
}`,
        explanation:
          "In client-only execution, all components run in the browser. Heavy libraries and secret database passwords can easily leak into client bundles.",
        drawbacks: [
          "Heavy JavaScript bundle size slows down phones on 4G/5G connections",
          "Cannot talk to the database directly inside components",
          "Secret API keys will leak if included in frontend code",
        ],
      },
      nextjsWay: {
        title: "Next.js Kitchen & Dining Table Architecture",
        code: `// File 1: Server Component (Default - The Kitchen! 0 KB sent to browser!)
// src/app/dashboard/page.js
import { LikeButton } from "@/components/LikeButton";

export default async function DashboardPage() {
  // Directly query database or fetch securely on the server!
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">University Portal</h1>
      <p>Prepared securely in the server kitchen.</p>

      {/* Embed the interactive dining table widget: */}
      <LikeButton />
    </div>
  );
}

// File 2: Client Component (The Dining Table - interactive!)
// src/components/LikeButton.js
"use client";

import { useState } from "react";

export function LikeButton() {
  // useState is our memory box:
  const [likes, setLikes] = useState(10);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
    >
      👍 Likes: {likes}
    </button>
  );
}`,
        explanation:
          "Next.js cleanly separates components: Server Components do the heavy lifting in the kitchen (0 KB client bundle), while Client Components handle small interactive moments at the dining table.",
        benefits: [
          "Zero JavaScript bundle overhead for server components",
          "Direct secure access to databases, secrets, and server environment variables",
          "Client interactivity isolated to tiny, lightweight components",
        ],
      },
      whyDifferent:
        "Next.js splits your component tree: Server Components render to HTML on the server, while Client Components hydrate in the browser.",
      mentalShiftSummary:
        "Keep components as Server Components by default. Only add 'use client' to small interactive buttons, inputs, and modals.",
    },

    basicExample: {
      title: "Interactive Like Button (useState Memory Box)",
      description: "A small interactive Client Component embedded inside a fast Server Component in plain JavaScript.",
      language: "jsx",
      filename: "src/components/LikeButton.js",
      code: `// src/components/LikeButton.js
"use client"; // 1. Tells Next.js: "This belongs at the Dining Table (browser interactivity!)"

import { useState } from "react";

export function LikeButton() {
  // 2. useState is a little memory box initialized to 10:
  const [likes, setLikes] = useState(10);

  // 3. When clicked, we open the box and put (current value + 1) inside:
  function handleLikeClick() {
    setLikes(likes + 1);
  }

  return (
    <button
      onClick={handleLikeClick}
      className="px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 text-zinc-100 rounded-xl transition-colors flex items-center gap-2"
    >
      <span>❤️</span>
      <span>{likes} Likes</span>
    </button>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: 'use client'; must be at the very top of the file! It tells Next.js to package this file for the browser so users can click buttons.\n- Line 4: import { useState } from 'react'; imports React's memory box tool.\n- Line 7: const [likes, setLikes] = useState(10); creates a variable likes with initial value 10, and a function setLikes to change it.\n- Line 10-12: handleLikeClick() runs when the user taps the button, increasing the counter.\n- Line 15-21: The JSX button with an onClick listener.\n\nWhat happens in the browser?\n1. The page arrives with the button displaying '❤️ 10 Likes'.\n2. The user taps the button.\n3. The browser triggers handleLikeClick().\n4. setLikes(11) updates the memory box, and React instantly re-renders the button showing '❤️ 11 Likes' without reloading the page!",
      outputPreview: "A clickable like button that increments from 10 to 11, 12, etc. on each tap.",
    },

    moreExamples: [
      {
        title: "Embedding Client Components inside Server Components",
        description: "How a Server Component page imports and uses an interactive Client Component without converting the whole page to client-side in plain JavaScript.",
        language: "jsx",
        filename: "src/app/blog/page.js",
        code: `// src/app/blog/page.js
// This page is a SERVER COMPONENT (Default - Kitchen! 0 KB client JS!)
import { LikeButton } from "@/components/LikeButton";

export default function BlogArticlePage() {
  return (
    <article className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-zinc-100">Why Next.js App Router is Amazing</h1>
      <p className="text-zinc-400 leading-relaxed">
        Server Components render directly on the server into pure, fast HTML.
        This entire article text adds zero bytes of JavaScript to your phone!
      </p>

      {/* Only this button is interactive: */}
      <div className="pt-4 border-t border-zinc-800">
        <LikeButton />
      </div>
    </article>
  );
}`,
        explanation:
          "The article page remains a fast, lightweight Server Component. Only the small <LikeButton /> component downloads client JavaScript to the user's device.",
      },
    ],

    multipleWays: [
      {
        name: "Server Component (Default - The Kitchen)",
        syntax: "Standard component (no 'use client' directive)",
        codeSnippet: `// Server Component (0 KB client bundle)
export default async function Page() {
  const data = await fetch('https://api.com');
  return <div>{/* Pure HTML */}</div>;
}`,
        howItWorks: "Runs exclusively on the server. Never sends its JavaScript code to the user's browser.",
        pros: ["0 KB bundle size", "Secure access to databases & secret keys", "Direct async/await support"],
        cons: ["Cannot use useState, useEffect, or onClick event listeners"],
        whenToUse: "Pages, layouts, data fetching, static banners, markdown content.",
        isRecommended: true,
      },
      {
        name: "Client Component (The Dining Table)",
        syntax: "'use client' at top of file",
        codeSnippet: `"use client";
import { useState } from "react";
export function Modal() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(true)}>Open</button>;
}`,
        howItWorks: "Pre-rendered to HTML on the server, then hydrated with JavaScript in the user's browser.",
        pros: ["Full browser interactivity: onClick, onChange, useState, useEffect, browser APIs"],
        cons: ["Increases the JavaScript bundle size downloaded by the visitor's device"],
        whenToUse: "Buttons, dropdown menus, search inputs, modal dialogs, audio/video players.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Always start with a Server Component. Only add 'use client' when you need onClick, onChange, or useState.",
      scenarios: [
        {
          scenario: "Displaying a list of student records from a database",
          recommendedApproach: "Server Component",
          reason: "Needs database access and has zero client interactivity.",
        },
        {
          scenario: "A search bar that filters items as the user types",
          recommendedApproach: "Client Component ('use client')",
          reason: "Needs an onChange listener and useState to track user keystrokes.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Adding 'use client' to the entire page or layout",
        badCode: `// ❌ BAD: src/app/layout.js
"use client"; // Turns your entire website into a client-side app!

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}`,
        goodCode: `// ✅ GOOD: Keep layout as Server Component, extract interactive parts
// src/app/layout.js remains Server Component
// Only add 'use client' to small components like src/components/ThemeToggle.js`,
        whyItBreaks: "Putting 'use client' at the root layout forces every child component to download client JavaScript, defeating the purpose of Next.js.",
        howToFix: "Push 'use client' down to the smallest leaf components that actually need interactivity.",
      },
    ],

    bestPractices: [
      {
        title: "Keep the Dining Table Small",
        rule: "Only put 'use client' on the specific interactive button or form input, not the whole page.",
        explanation: "This keeps 85%+ of your website code in the server kitchen with zero client JavaScript penalty.",
      },
    ],

    exercises: [
      {
        id: "u2-ex-2",
        title: "Create an Interactive Counter Component",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Create a Client Component in src/components/Counter.js in plain JavaScript with 'use client' that uses useState to increment a count when clicked.",
        initialCode: `// src/components/Counter.js
// TODO: Add directive and build counter
import { useState } from "react";

export function Counter() {
  return (
    <button>
      {/* Show count and handle click */}
    </button>
  );
}`,
        expectedOutput: "A working Client Component that increments a counter on every click.",
        hints: ["Remember to put 'use client'; at the very first line of the file!"],
        solutionCode: `// src/components/Counter.js
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
    >
      Clicks: {count}
    </button>
  );
}`,
        solutionExplanation: "The 'use client' directive marks this component as an interactive client component, allowing it to use React's useState memory box.",
      },
    ],

    quizzes: [
      {
        id: "u2-q2",
        syllabusTopic: "Server vs Client Components ('use client')",
        question: "Why can't you use useState inside a default Next.js Server Component?",
        conceptualExplanation: "Server Components run once on the server to create HTML and do not run in the browser to maintain interactive state.",
        options: [
          { id: "a", text: "Because Server Components run on the server, create HTML, and do not stay alive in the browser to track clicks", isCorrect: true, explanation: "Correct! Server Components run once on the server and send pure HTML. They do not have the browser memory box (useState)." },
          { id: "b", text: "Because useState was removed in modern JavaScript", isCorrect: false, explanation: "useState is still a core React hook." },
          { id: "c", text: "Because the computer runs out of RAM", isCorrect: false, explanation: "RAM is unrelated." },
          { id: "d", text: "Because useState only works in Python", isCorrect: false, explanation: "useState is React." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Media Streaming Portal",
      description: "How a streaming platform keeps video metadata as Server Components while isolating video playback controls to Client Components.",
      code: {
        title: "Video Detail Page with Interactive Player",
        description: "Server Component wrapper with isolated Client Component video player.",
        language: "jsx",
        filename: "src/app/watch/[id]/page.js",
        code: `import { VideoPlayer } from "@/components/VideoPlayer";

export default async function WatchPage({ params }) {
  const { id } = await params;
  const res = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);
  const video = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">{video.title}</h1>
      <VideoPlayer videoId={id} />
      <p className="text-zinc-400 text-sm">{video.body}</p>
    </div>
  );
}`,
      },
      keyTakeaway: "Zero JavaScript bundle impact for video metadata, while playback controls remain fluid and interactive.",
    },

    combinedExample: {
      combinedTopics: ["Server Components", "Client Components", "Props Interleaving"],
      title: "Interactive Course Card with Server Content",
      description: "Passing server-rendered children through an interactive client shell.",
      code: {
        title: "Course Card with Client Expand Toggle",
        description: "Interactive accordion holding pure server-rendered syllabus text.",
        language: "jsx",
        filename: "src/components/CourseAccordion.js",
        code: `"use client";

import { useState } from "react";

export function CourseAccordion({ title, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex justify-between items-center bg-zinc-900 text-zinc-100 font-medium"
      >
        <span>{title}</span>
        <span>{expanded ? "−" : "+"}</span>
      </button>
      {expanded && <div className="p-4 bg-zinc-950 text-zinc-300">{children}</div>}
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Server renders children syllabus text into HTML",
        "Client component manages the open/close accordion state",
        "Children content stays 0 KB client JavaScript bundle overhead",
      ],
    },
  },

  {
    id: "data-fetching-strategies",
    unitId: "unit-2",
    title: "Fetch API: Server-side & Client-side Data Fetching",
    shortSummary: "Fetch data directly inside async Server Components without useEffect, and explore real-world JSONPlaceholder examples in plain JavaScript.",
    order: 3,
    tags: ["Data Fetching", "async/await", "Server Fetch", "JSONPlaceholder", "TechnologyBlog"],

    simpleExplanation:
      "In standard React, fetching data is annoying: you have to create a state variable (useState), create a useEffect hook, create loading flags (isLoading = true), and handle cleanup functions. If you forget one step, your app breaks or flickers.\n\nIn Next.js Server Components, fetching data is as simple as writing:\nconst res = await fetch(\"https://...\");\nconst data = await res.json();\n\nDirectly inside your component function! No useEffect, no useState, and no loading flickers. Your server fetches the data first, puts it into the HTML, and sends a complete page straight to the visitor.",

    whyNeeded:
      "Server-side data fetching eliminates slow client waterfalls (where the phone has to download React before even starting to fetch data). It keeps database passwords completely private and delivers complete HTML so search engines like Google can instantly read your content.",

    reactVsNext: {
      concept: "Data Fetching Flow",
      reactWay: {
        title: "React Client-Side useEffect Fetching (Slow & Annoying)",
        code: `// Client-Side useEffect Data Fetching (manual boilerplate)
import { useState, useEffect } from "react";

export default function StudentRoster() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading students...</p>;
  return <ul>{students.map((s) => <li key={s.id}>{s.name}</li>)}</ul>;
}`,
        explanation:
          "In client-side data fetching, you must manually track loading states, handle component unmounting, and deal with empty loading spinners on every page visit.",
        drawbacks: [
          "20+ lines of code just to fetch a simple list of names",
          "Waterfall: page loads -> phone downloads JS -> starts fetch -> shows spinner -> renders data",
          "Google search crawler only sees 'Loading students...' instead of your real content",
        ],
      },
      nextjsWay: {
        title: "Next.js Async Server Component (Clean, Direct JavaScript)",
        code: `// Next.js App Router: Simple, direct async/await in plain JavaScript!
export default async function StudentRoster() {
  // Direct fetch inside the component body:
  const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=4");
  const students = await res.json();

  return (
    <ul className="space-y-2">
      {students.map((s) => (
        <li key={s.id} className="p-3 bg-zinc-900 rounded-lg">
          {s.name}
        </li>
      ))}
    </ul>
  );
}`,
        explanation:
          "In Next.js, your component can be an async function. Data is fetched on the server before HTML is sent to the client.",
        benefits: [
          "Under 10 lines of clean, readable JavaScript code",
          "HTML arrives fully populated with data (instant display, 100% SEO friendly)",
          "Zero client JavaScript required for data fetching",
        ],
      },
      whyDifferent:
        "React Server Components run in Node.js on the server where await is natively supported directly inside component bodies.",
      mentalShiftSummary:
        "Delete useEffect and useState for loading data. Just write async function Component() and await fetch().",
    },

    basicExample: {
      title: "Technology Blog Post Fetcher (JSONPlaceholder Example)",
      description: "Fetching blog posts from JSONPlaceholder and rendering ID, title, and body in plain JavaScript with full line-by-line breakdown.",
      language: "jsx",
      filename: "src/app/blog/technology/page.js",
      code: `// src/app/blog/technology/page.js
// 1. Define an async Server Component:
export default async function TechnologyBlog() {
  // 2. Fetch tech posts from JSONPlaceholder directly on the server:
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");

  // 3. Check if the fetch succeeded:
  if (!res.ok) {
    throw new Error("Failed to fetch blog posts from JSONPlaceholder");
  }

  // 4. Parse the JSON response into a plain JavaScript array:
  const posts = await res.json();

  // 5. Render the list of posts into HTML:
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-extrabold text-zinc-100">Technology Articles</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Fetched directly from JSONPlaceholder using Server Components in plain JavaScript.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Post #{post.id}
              </span>
            </div>
            <h2 className="text-lg font-bold text-zinc-100 capitalize">{post.title}</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: export default async function TechnologyBlog() creates an async Server Component. Notice how easy it is — no TypeScript interfaces or type annotations required!\n- Line 4: const res = await fetch(...) sends an HTTP GET request to JSONPlaceholder directly from our backend server.\n- Line 7-9: if (!res.ok) checks if the status code was 200 OK. If not, it throws an error that our error.js file can catch.\n- Line 12: const posts = await res.json() parses the data into a standard JavaScript array of objects.\n- Line 15-40: We map over the array with posts.map((post) => ...) and render the post's id, title, and body.\n\nWhat happens in the browser?\n1. A student navigates to /blog/technology.\n2. The Next.js server runs the TechnologyBlog function and fetches the articles from JSONPlaceholder.\n3. The server generates the complete HTML with all article titles and bodies filled in.\n4. The browser receives the finished HTML page and paints it instantly in milliseconds with zero loading spinners!",
      outputPreview: "A clean feed of technology posts showing Post ID badge, bold title, and body text.",
    },

    moreExamples: [
      {
        title: "Parallel Data Fetching with Promise.all",
        description: "Fetching two different data sources at the exact same time so neither has to wait for the other in plain JavaScript.",
        language: "jsx",
        filename: "src/app/dashboard/page.js",
        code: `// Fetching students and courses in parallel:
export default async function DashboardPage() {
  // Fire both fetches at the exact same second:
  const [studentsRes, coursesRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users?_limit=3"),
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=3"),
  ]);

  const students = await studentsRes.json();
  const courses = await coursesRes.json();

  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-bold text-zinc-100">Students ({students.length})</h2>
        {students.map((s) => <p key={s.id} className="text-zinc-300">{s.name}</p>)}
      </div>
      <div>
        <h2 className="text-lg font-bold text-zinc-100">Recent Posts ({courses.length})</h2>
        {courses.map((c) => <p key={c.id} className="text-zinc-300">{c.title}</p>)}
      </div>
    </div>
  );
}`,
        explanation:
          "Promise.all runs both network requests concurrently. If each takes 1 second, the total wait time is only 1 second instead of 2 seconds!",
      },
    ],

    multipleWays: [
      {
        name: "Async Server Component fetch (Recommended)",
        syntax: "await fetch('url') inside async Server Component",
        codeSnippet: `export default async function Page() {
  const data = await (await fetch('https://api.com/items')).json();
  return <div>{data.length} items</div>;
}`,
        howItWorks: "Runs directly on the server before HTML is sent to the user.",
        pros: ["Cleanest code", "Best performance and SEO", "Keeps API keys private"],
        cons: ["Runs on the server, so you cannot fetch in response to a user button click here"],
        whenToUse: "Initial page loading, blogs, news feeds, dashboards.",
        isRecommended: true,
      },
      {
        name: "Client Fetching (For user-triggered actions)",
        syntax: "'use client' + fetch inside an event handler",
        codeSnippet: `"use client";
function SearchButton() {
  async function handleSearch() {
    const res = await fetch('/api/search?q=react');
    const results = await res.json();
  }
  return <button onClick={handleSearch}>Search</button>;
}`,
        howItWorks: "Runs in the user's browser when they click a button or type in a box.",
        pros: ["Great for live search suggestions, filtering on click"],
        cons: ["Requires client JavaScript download"],
        whenToUse: "Live search autocomplete, infinite scrolling, client-only modals.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Fetch on the server by default. Only fetch on the client when responding to user actions like clicking a 'Load More' button.",
      scenarios: [
        {
          scenario: "Loading a blog post or student profile page",
          recommendedApproach: "Server Component fetch",
          reason: "The page content is known when the URL loads, so pre-rendering delivers instant speed and great SEO.",
        },
        {
          scenario: "A live filter dropdown where selecting an option fetches new data",
          recommendedApproach: "Client Component or URL searchParams navigation",
          reason: "Depends on user interaction inside the browser.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using useEffect for data fetching in Next.js Server Components",
        badCode: `// ❌ BAD: Trying to use useEffect in a Server Component
export default function Page() {
  useEffect(() => { /* fetch */ }, []);
  return <div>Data</div>;
}`,
        goodCode: `// ✅ GOOD: Use async/await directly in the Server Component!
export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return <div>{posts.length} posts</div>;
}`,
        whyItBreaks: "Server Components do not run in the browser, so React hooks like useEffect and useState will throw an error.",
        howToFix: "Make your component async and use await fetch() directly.",
      },
    ],

    bestPractices: [
      {
        title: "Use Parallel Fetching for Multiple Requests",
        rule: "Use Promise.all() when fetching two independent datasets.",
        explanation: "Running independent requests at the same time cuts your server loading time in half.",
      },
    ],

    exercises: [
      {
        id: "u2-ex-3",
        title: "Fetch Users from JSONPlaceholder",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write an async Server Component for src/app/users/page.js in plain JavaScript that fetches users from https://jsonplaceholder.typicode.com/users?_limit=3 and renders their names and emails.",
        initialCode: `// src/app/users/page.js
// TODO: Make this an async function and fetch users
export default function UsersPage() {
  return (
    <div>
      <h1>University Users</h1>
    </div>
  );
}`,
        expectedOutput: "A server-rendered list of users showing names and emails.",
        hints: ["Change function UsersPage to async function UsersPage and use await fetch(...)"],
        solutionCode: `// src/app/users/page.js
export default async function UsersPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3");
  const users = await res.json();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">University Users</h1>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            <h2 className="font-semibold text-zinc-100">{user.name}</h2>
            <p className="text-xs text-zinc-400">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        solutionExplanation: "Server Components can be declared as async, allowing direct await fetch() calls without React hooks or client waterfalls.",
      },
    ],

    quizzes: [
      {
        id: "u2-q3",
        syllabusTopic: "Data Fetching in Server Components",
        question: "Why is fetching data in an async Server Component better than using useEffect in React?",
        conceptualExplanation: "Server Components fetch data on the backend before HTML is transmitted, providing instant initial render and optimal SEO.",
        options: [
          { id: "a", text: "Because mobile phones do not support JSON", isCorrect: false, explanation: "All modern phones support JSON." },
          { id: "b", text: "Because data is fetched on the server before sending HTML, eliminating blank loading screens and improving SEO", isCorrect: true, explanation: "Correct! The browser receives ready-to-display HTML with zero client waterfall delay." },
          { id: "c", text: "Because useEffect is illegal in Next.js", isCorrect: false, explanation: "useEffect works fine in Client Components with 'use client'." },
          { id: "d", text: "Because async functions save device battery", isCorrect: false, explanation: "The main benefit is architecture, speed, and SEO." },
        ],
      },
    ],

    realWorldExample: {
      domain: "EdTech University Portal",
      description: "How a university course directory queries department data directly on the server without client spinners.",
      code: {
        title: "Department Course Directory",
        description: "Direct server fetch of course modules in plain JavaScript.",
        language: "jsx",
        filename: "src/app/courses/page.js",
        code: `export default async function CoursesPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
  const courses = await res.json();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Available Courses</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <div key={course.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="font-semibold text-zinc-200 capitalize">{course.title}</h2>
            <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{course.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      keyTakeaway: "Pre-rendering course data on the server ensures instant navigation and perfect SEO indexing.",
    },

    combinedExample: {
      combinedTopics: ["Data Fetching", "Dynamic Routes", "Error Boundary"],
      title: "Resilient Post Reader with Error Handling",
      description: "Fetching dynamic post data with try/catch fallback in plain JavaScript.",
      code: {
        title: "Dynamic Post Viewer",
        description: "Server Component fetching single post with route parameter.",
        language: "jsx",
        filename: "src/app/posts/[id]/page.js",
        code: `export default async function PostDetail({ params }) {
  const { id } = await params;
  const res = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);
  
  if (!res.ok) {
    throw new Error(\`Post #\${id} could not be loaded\`);
  }

  const post = await res.json();

  return (
    <article className="p-6 max-w-xl mx-auto space-y-3">
      <h1 className="text-2xl font-bold text-zinc-100">{post.title}</h1>
      <p className="text-zinc-400 leading-relaxed">{post.body}</p>
    </article>
  );
}`,
      },
      stepByStepFlow: [
        "User visits /posts/5",
        "Server extracts id 5 from params",
        "Server fetches JSONPlaceholder post 5",
        "Server returns ready-to-read article HTML",
      ],
    },
  },

  {
    id: "caching-and-revalidation",
    unitId: "unit-2",
    title: "Caching and Revalidation",
    shortSummary: "Understand caching using the cheat sheet analogy, time-based revalidation, and on-demand cache purges with revalidatePath.",
    order: 4,
    tags: ["Caching", "Revalidation", "revalidatePath", "revalidateTag", "Data Cache"],

    simpleExplanation:
      "Imagine your teacher asks you: 'What is 487 × 629?'\n\nThe first time, you have to sit down with a pencil and work it out (takes 2 minutes). The answer is 306,323.\n\nNow, instead of throwing away your work, you write the answer down on a **cheat sheet** (this is **Caching**!).\n\nThe next 100 times someone asks you 'What is 487 × 629?', you don't calculate it again. You glance at your cheat sheet and answer in 1 millisecond!\n\n**What is Revalidation?**\nRevalidation is updating that cheat sheet when the facts change. For example, if a teacher adds a new assignment to the course board, we want to erase the old cheat sheet and write down the fresh list of assignments!",

    whyNeeded:
      "Without caching, if 10,000 students visit your website at 9:00 AM, your database server will crash under the load. Caching saves a completed copy so all 10,000 students get instant answers without melting your server.",

    reactVsNext: {
      concept: "Caching & Revalidation Model",
      reactWay: {
        title: "Manual Client Cache (TanStack Query / SWR)",
        code: `// Browser-only caching lives strictly inside each single user's tab:
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function StudentList() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => fetch('/api/students').then(r => r.json()),
  });

  const handleAdd = async () => {
    await fetch('/api/students', { method: 'POST' });
    // Invalidate only in THIS student's browser tab:
    queryClient.invalidateQueries({ queryKey: ['students'] });
  };
}`,
        explanation:
          "In client-only architecture, caching only exists inside a single user's browser memory. If another user opens the website, they must fetch everything from scratch.",
        drawbacks: [
          "Every single visitor hits the database independently",
          "Cache disappears if the user refreshes or closes their tab",
          "Requires heavy third-party client libraries",
        ],
      },
      nextjsWay: {
        title: "Next.js Built-in Server & CDN Caching",
        code: `// 1. Tagging a fetch request on the server (Shared cheat sheet!):
export async function getStudents() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { tags: ["students-list"] } // Assign a cache tag
  });
  return res.json();
}

// 2. On-demand cache purge in a Server Action (plain JavaScript):
"use server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function addStudentAction(formData) {
  // Save new student to database...
  
  // Instantly updates the cheat sheet for EVERY visitor worldwide!
  revalidatePath("/students");
  // Or purge by tag:
  revalidateTag("students-list");
}`,
        explanation:
          "Next.js caches data on the server and CDN globally. When you call revalidatePath(), the cache is refreshed for all students worldwide simultaneously.",
        benefits: [
          "Zero third-party client library required",
          "Shared global cache: one student's request warms the cache for all others",
          "Instant surgical cache purge whenever new data is saved",
        ],
      },
      whyDifferent:
        "Next.js caches at the server and edge network level, so thousands of users share the same blazing fast cached data.",
      mentalShiftSummary:
        "Cache data on the server. Purge the cache inside Server Actions using revalidatePath('/my-page') when data changes.",
    },

    basicExample: {
      title: "On-Demand Cache Revalidation with revalidatePath",
      description: "Purging the cache of a route immediately after adding a new item in plain JavaScript.",
      language: "jsx",
      filename: "src/actions/todoActions.js",
      code: `// src/actions/todoActions.js
"use server"; // 1. Tells Next.js this file runs on the backend server

import { revalidatePath } from "next/cache";

// Simple in-memory tasks list:
let tasks = [
  { id: 1, title: "Study Unit 2 Rendering Strategies" },
];

export async function addTodoAction(formData) {
  // 2. Extract title from the submitted form:
  const title = formData.get("title");
  if (!title || title.trim() === "") return;

  // 3. Add the new item to our data store:
  tasks.push({ id: Date.now(), title: title.trim() });

  // 4. THE MAGIC STEP: revalidatePath tells Next.js:
  // "Hey! The data for /todos has changed! Erase the old cached page and rebuild it fresh!"
  revalidatePath("/todos");
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: 'use server'; marks every function in this file as a backend Server Action.\n- Line 4: import { revalidatePath } from 'next/cache'; imports the built-in Next.js cache-clearing function.\n- Line 12: const title = formData.get('title'); gets the user's input from the form.\n- Line 16: tasks.push(...) stores the new task.\n- Line 20: revalidatePath('/todos') tells Next.js to purge the cached HTML for /todos. The very next time the screen updates, the new task is already there without a full browser reload!\n\nWhat happens in the browser?\n1. A student types 'Complete Assignment 2' in the input box and clicks 'Add'.\n2. The browser sends the form to addTodoAction on the server.\n3. The server updates the data and runs revalidatePath('/todos').\n4. Next.js rebuilds the /todos page with the new task and smoothly updates the user's screen in milliseconds!",
      outputPreview: "Submitting a form instantly adds an item and refreshes the page list without flickering.",
    },

    moreExamples: [
      {
        title: "Tag-Based Revalidation with revalidateTag",
        description: "Targeting specific datasets across multiple pages using semantic cache tags in plain JavaScript.",
        language: "jsx",
        filename: "src/actions/courseActions.js",
        code: `// src/actions/courseActions.js
"use server";

import { revalidateTag } from "next/cache";

export async function updateCourseSyllabus(courseId) {
  // Update database...

  // Purges any page that fetched data tagged with 'courses':
  revalidateTag("courses");
}`,
        explanation:
          "revalidateTag('courses') purges the cache across every page in your app that used next: { tags: ['courses'] }. One function call updates multiple pages at once!",
      },
    ],

    multipleWays: [
      {
        name: "Time-Based Revalidation (ISR)",
        syntax: "fetch(url, { next: { revalidate: 60 } })",
        codeSnippet: "const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 60 } });",
        howItWorks: "Next.js automatically refreshes the cache after 60 seconds have passed.",
        pros: ["Completely automated", "No manual cache purging code required"],
        cons: ["Data may be up to 60 seconds old"],
        whenToUse: "Blog posts, course listings, news feeds.",
        isRecommended: true,
      },
      {
        name: "On-Demand Path Revalidation",
        syntax: "revalidatePath('/path')",
        codeSnippet: `"use server";
import { revalidatePath } from "next/cache";
revalidatePath("/inventory");`,
        howItWorks: "Purges the cache for a specific URL path immediately when a Server Action runs.",
        pros: ["Instant update: users see changes immediately after clicking Save"],
        cons: ["Only clears that specific URL path"],
        whenToUse: "Todo lists, comment sections, profile updates.",
        isRecommended: true,
      },
      {
        name: "On-Demand Tag Revalidation",
        syntax: "revalidateTag('tag-name')",
        codeSnippet: `"use server";
import { revalidateTag } from "next/cache";
revalidateTag("products");`,
        howItWorks: "Purges all cached data marked with the tag 'products' across your entire website.",
        pros: ["Clears multiple pages at once with a single command"],
        cons: ["Requires tagging your fetch calls beforehand"],
        whenToUse: "E-commerce inventory where a product appears on the home page, search page, and category page.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use time-based revalidate for read-only feeds. Use revalidatePath inside Server Actions whenever a user creates, edits, or deletes an item.",
      scenarios: [
        {
          scenario: "A student posts a new comment on a discussion forum",
          recommendedApproach: "revalidatePath('/discussions')",
          reason: "The comment must appear on the discussion page immediately for all students.",
        },
        {
          scenario: "A university campus weather widget",
          recommendedApproach: "fetch(url, { next: { revalidate: 300 } })",
          reason: "Weather only changes every few minutes, so 5-minute time-based caching is ideal.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Calling revalidatePath in a Client Component",
        badCode: `// ❌ BAD: src/components/TodoButton.js
"use client";
import { revalidatePath } from "next/cache"; // 💥 Error!

export function TodoButton() {
  return <button onClick={() => revalidatePath("/todos")}>Refresh</button>;
}`,
        goodCode: `// ✅ GOOD: Call revalidatePath inside a Server Action ('use server')
// src/actions/todoActions.js
"use server";
import { revalidatePath } from "next/cache";

export async function refreshTodos() {
  revalidatePath("/todos");
}`,
        whyItBreaks: "revalidatePath and revalidateTag are server-only functions. The browser cannot purge the server's cache directly.",
        howToFix: "Always call revalidatePath inside a Server Action with 'use server'.",
      },
    ],

    bestPractices: [
      {
        title: "Revalidate Immediately After Mutations",
        rule: "Whenever your code writes to a database, call revalidatePath right below the database write.",
        explanation: "This guarantees that users immediately see their new data without having to manually refresh their browser.",
      },
    ],

    exercises: [
      {
        id: "u2-ex-4",
        title: "Purge Student Cache After Adding a Student",
        difficulty: "medium",
        estimatedMinutes: 8,
        prompt:
          "Write a Server Action in src/actions/studentActions.js in plain JavaScript that extracts a student's name from formData, saves it, and purges the cache for /students using revalidatePath.",
        initialCode: `// src/actions/studentActions.js
// TODO: Add 'use server' and revalidatePath
export async function addStudent(formData) {
  // Extract name and revalidate /students
}`,
        expectedOutput: "A Server Action that invalidates the /students cache path.",
        hints: ["Import revalidatePath from 'next/cache' and call revalidatePath('/students')"],
        solutionCode: `// src/actions/studentActions.js
"use server";

import { revalidatePath } from "next/cache";

export async function addStudent(formData) {
  const name = formData.get("name");
  if (!name || name.trim() === "") return;

  // Simulate saving to database...
  // Invalidate cache so the /students page refreshes:
  revalidatePath("/students");
}`,
        solutionExplanation: "revalidatePath('/students') instructs Next.js to purge the cached static HTML and data for /students so the next request gets the new student record.",
      },
    ],

    quizzes: [
      {
        id: "u2-q4",
        syllabusTopic: "Caching Architecture & Revalidation",
        question: "What is the main advantage of revalidateTag over revalidatePath?",
        conceptualExplanation: "revalidateTag purges data across multiple routes that share a cache tag, whereas revalidatePath purges a single URL path.",
        options: [
          { id: "a", text: "revalidateTag only works in Google Chrome", isCorrect: false, explanation: "Revalidation is completely server-side and browser-independent." },
          { id: "b", text: "revalidateTag can purge data across multiple different pages at once if they share the same tag", isCorrect: true, explanation: "Correct! If 5 different pages show products, one revalidateTag('products') updates all 5 pages simultaneously." },
          { id: "c", text: "revalidateTag is 100 times slower", isCorrect: false, explanation: "Both revalidation methods are near instantaneous." },
          { id: "d", text: "revalidateTag requires a paid subscription", isCorrect: false, explanation: "It is a free, built-in feature of Next.js." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Campus Noticeboard",
      description: "How a university noticeboard invalidates announcements in real time across the portal using revalidateTag.",
      code: {
        title: "Campus Announcement Publisher",
        description: "Server Action updating notices and purging shared cache tag in plain JavaScript.",
        language: "jsx",
        filename: "src/actions/noticeActions.js",
        code: `"use server";

import { revalidateTag } from "next/cache";

export async function publishNotice(formData) {
  const noticeText = formData.get("notice");
  // Save to database...
  
  // Purges every widget, page, and feed displaying notices:
  revalidateTag("campus-notices");
}`,
      },
      keyTakeaway: "One call to revalidateTag updates student dashboard, public home page, and mobile feed at the same second.",
    },

    combinedExample: {
      combinedTopics: ["Caching", "Server Actions", "Optimistic Revalidation"],
      title: "Real-Time Notice Board with Instant Refresh",
      description: "Combining Server Actions and cache tagging for zero-downtime updates.",
      code: {
        title: "Live Notice Feed Component",
        description: "Async Server Component with tagged fetch.",
        language: "jsx",
        filename: "src/app/notices/page.js",
        code: `export default async function NoticesPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4", {
    next: { tags: ["campus-notices"] }
  });
  const notices = await res.json();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-zinc-100">Live Campus Notices</h1>
      <div className="space-y-2">
        {notices.map((n) => (
          <div key={n.id} className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h2 className="font-semibold text-zinc-200">{n.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Page loads cached notices with tag campus-notices",
        "Admin submits form -> publishNotice Server Action runs",
        "revalidateTag('campus-notices') invalidates cache",
        "Next.js seamlessly re-fetches and streams fresh notices to all students",
      ],
    },
  },
];
