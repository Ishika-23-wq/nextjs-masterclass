import { TopicContent } from "@/types";

export const unit6Topics: TopicContent[] = [
  {
    id: "parallel-and-intercepting-routes",
    unitId: "unit-6",
    title: "Parallel & Intercepting Routes",
    shortSummary: "Build multi-slot dashboards with Parallel Routes (@slots) and Instagram-style shareable modal feeds with Intercepting Routes ((.)photo).",
    order: 1,
    tags: ["Parallel Routes", "Intercepting Routes", "Slots", "Modal Feeds", "default.tsx"],

    simpleExplanation:
      "Have you ever browsed Instagram or Pinterest, clicked on a photo, and saw it open in a smooth popup modal with a shareable URL (like `/photos/42`), but when you refreshed the browser, it rendered the full dedicated photo page instead of a popup? This is called **Intercepting Routes** (`(.)photo`). **Parallel Routes** (`@analytics`, `@team`) allow you to render multiple independent sub-pages simultaneously inside the SAME layout, each with its own independent loading and error states!",

    whyNeeded:
      "Building complex multi-widget analytics dashboards or modal feeds previously required messy global state, hacky URL sync hooks, and broken browser Back-button behavior. Parallel and Intercepting Routes make these advanced UX patterns native to the file system.",

    reactVsNext: {
      concept: "Modals & Multi-Pane Layouts",
      reactWay: {
        title: "React Global Modal State",
        code: `// Traditional React Modal (Hacky URL Sync):
function Feed() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Does not update browser URL naturally.
  // If user clicks 'Share Link' or refreshes page, modal state is lost!
  return (
    <div>
      <Gallery onSelect={photo => setSelectedPhoto(photo)} />
      {selectedPhoto && <Modal photo={selectedPhoto} />}
    </div>
  );
}`,
        explanation:
          "In vanilla React, modals are typically managed with local `useState` or Redux. They don't support deep-linking, browser history navigation, or Server Components without manual synchronization.",
        drawbacks: [
          "Cannot copy-paste URL to share the open modal with a classmate",
          "Clicking browser 'Back' button leaves the website instead of just closing the modal",
          "SSR cannot pre-render modal content on page refresh",
        ],
      },
      nextjsWay: {
        title: "Next.js Intercepting & Parallel Routes",
        code: `// File Structure:
// src/app/feed/layout.tsx
// src/app/feed/@modal/(.)photo/[id]/page.tsx   <- Intercepts client navigation to show Modal!
// src/app/feed/photo/[id]/page.tsx             <- Full standalone page on direct URL visit or refresh!

// src/app/feed/layout.tsx:
export default function FeedLayout({
  children,
  modal, // Parallel slot received as prop!
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}`,
        explanation:
          "Next.js intercepts client-side navigation to display the photo inside the `@modal` slot. When directly visited or refreshed, Next.js renders the full `/photo/[id]` page.",
        benefits: [
          "Shareable URLs for modal popups",
          "Browser Back button cleanly closes the modal without page reload",
          "Full standalone fallback page on hard refresh or search engine crawl",
          "Independent error and loading boundaries per slot",
        ],
      },
      whyDifferent:
        "Next.js handles routing context at the file-system level, intercepting client navigation while preserving standard server rendering paths.",
      mentalShiftSummary:
        "Folder `@slotName` creates a parallel slot prop in `layout.tsx`. Folder `(.)target` intercepts client transitions to that route.",
    },

    basicExample: {
      title: "Multi-Widget Parallel Dashboard",
      description: "Rendering analytics and notifications simultaneously in parallel slots.",
      language: "tsx",
      filename: "src/app/dashboard/layout.tsx",
      code: `// src/app/dashboard/layout.tsx
// Receives @analytics and @notifications slots as props:

export default function DashboardLayout({
  children,
  analytics,
  notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="p-6 space-y-6">
      <div>{children}</div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">{analytics}</div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">{notifications}</div>
      </div>
    </div>
  );
}`,
      explanation:
        "The `@analytics` and `@notifications` folders run in parallel. If analytics takes 2 seconds to load, it streams independently without blocking notifications.",
      outputPreview: "Two-column dashboard with parallel streaming widgets.",
    },

    moreExamples: [
      {
        title: "Intercepting Route Matcher Syntax",
        description: "Understanding the convention symbols for intercepting routes at different folder depths.",
        language: "typescript",
        filename: "Intercepting Symbols Reference",
        code: `// (.) matches segments on the SAME level
// Example: src/app/feed/(.)photo/[id]/page.tsx intercepts /feed/photo/[id]

// (..) matches segments ONE level above
// Example: src/app/feed/@modal/(..)photo/[id]/page.tsx intercepts /photo/[id]

// (..)(..) matches segments TWO levels above

// (...) matches segments from the ROOT app/ directory`,
        explanation:
          "Similar to relative file paths (`./` and `../`), intercepting syntax allows you to target routes across different folder levels.",
      },
    ],

    multipleWays: [
      {
        name: "Parallel Routes (@slotName)",
        syntax: "src/app/dashboard/@analytics/page.tsx",
        codeSnippet: `export default function Layout({ children, analytics }) { return <div>{children}{analytics}</div>; }`,
        howItWorks: "Passes named folder slots as props to the parent layout.",
        pros: ["Independent streaming & Suspense per slot", "Conditional slot rendering"],
        cons: ["Requires default.tsx for unmatched slots on hard refresh"],
        whenToUse: "For complex dashboards, split-screen interfaces, and multi-tab layouts.",
        isRecommended: true,
      },
      {
        name: "Intercepting Routes ((.)target)",
        syntax: "src/app/@modal/(.)login/page.tsx",
        codeSnippet: `// Intercepts navigation to /login from current page`,
        howItWorks: "Intercepts client-side link clicks to display content in an overlay while preserving direct URL access.",
        pros: ["Shareable URLs for modal dialogs", "Preserves underlying page context"],
        cons: ["Requires understanding folder depth matching"],
        whenToUse: "For photo galleries, login dialog overlays, and quick-preview drawers.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use Parallel Routes for multi-widget dashboards. Use Intercepting Routes for shareable modal popups.",
      scenarios: [
        {
          scenario: "You want a photo gallery where clicking a thumbnail opens an Instagram-like modal",
          recommendedApproach: "Intercepting route `src/app/feed/@modal/(.)photo/[id]/page.tsx`",
          reason: "Provides shareable link and closes cleanly on browser Back button.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Forgetting to create default.tsx in parallel route slots",
        badCode: `// ❌ BAD: Missing default.tsx in @analytics slot
// On hard page refresh of an unrelated sub-route, Next.js throws a 404 error for the slot!`,
        goodCode: `// ✅ GOOD: Always add src/app/dashboard/@analytics/default.tsx
export default function DefaultAnalytics() {
  return <p>Default Analytics View</p>;
}`,
        whyItBreaks: "When a user refreshes the page, Next.js needs to know what fallback UI to render in parallel slots that don't match the current URL.",
        howToFix: "Always create a `default.tsx` file inside every parallel `@slot` folder.",
      },
    ],

    bestPractices: [
      {
        title: "Combine Parallel Routes with useRouter().back() for Modal Close",
        rule: "In your modal close button, call `router.back()` to dismiss the overlay.",
        explanation: "Restores the previous URL cleanly and unmounts the intercepted slot.",
      },
    ],

    exercises: [
      {
        id: "u6-ex-1",
        title: "Build a Parallel Dashboard Layout Component",
        difficulty: "medium",
        estimatedMinutes: 8,
        prompt:
          "Write a `DashboardLayout` component for `src/app/dashboard/layout.tsx` that accepts `children`, `stats`, and `activity` slots and arranges them in a responsive layout.",
        initialCode: `// src/app/dashboard/layout.tsx
// TODO: Define layout receiving children, stats, and activity slots
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}`,
        expectedOutput: "A multi-slot dashboard layout with responsive grid styling.",
        hints: ["Accept `{ children, stats, activity }: { children: React.ReactNode; stats: React.ReactNode; activity: React.ReactNode; }`"],
        solutionCode: `export default function DashboardLayout({
  children,
  stats,
  activity,
}: {
  children: React.ReactNode;
  stats: React.ReactNode;
  activity: React.ReactNode;
}) {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>{children}</div>
      <div className="grid md:grid-cols-[1fr_2fr] gap-6">
        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-xs uppercase font-mono text-amber-400 mb-3 font-semibold">Stats Slot</h3>
          {stats}
        </div>
        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-xs uppercase font-mono text-emerald-400 mb-3 font-semibold">Live Activity Slot</h3>
          {activity}
        </div>
      </div>
    </div>
  );
}`,
        solutionExplanation:
          "Parallel slots `@stats` and `@activity` stream their HTML independently, keeping page response times ultra-fast.",
      },
    ],

    quizzes: [
      {
        id: "u6-q1",
        question: "What is the purpose of default.tsx in Next.js Parallel Routes?",
        syllabusTopic: "Parallel Routes default.tsx",
        options: [
          { id: "a", text: "It resets the user's password", isCorrect: false, explanation: "No." },
          { id: "b", text: "It serves as a fallback UI for a parallel slot when Next.js cannot recover the slot state during a hard page refresh", isCorrect: true, explanation: "Correct! default.tsx provides the fallback component for unmatched slots on direct page loads." },
          { id: "c", text: "It converts TypeScript into CSS", isCorrect: false, explanation: "No." },
          { id: "d", text: "It only works on Android", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "During full page reloads, Next.js renders `default.tsx` for parallel slots that do not have an active route match for the current URL.",
      },
    ],

    realWorldExample: {
      domain: "Photo Sharing Social App (Instagram / Unsplash Feed)",
      description: "How clicking a photo opens an interactive modal with its own shareable URL, while direct visits render the full page.",
      code: {
        title: "Photo Modal Intercept Component",
        description: "Intercepted photo viewer with router.back().",
        language: "tsx",
        filename: "src/app/@modal/(.)photo/[id]/page.tsx",
        code: `"use client";

import { useRouter } from "next/navigation";

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-lg w-full space-y-4">
        <h2 className="text-lg font-bold text-zinc-100">Photo #{params.id} (Modal View)</h2>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
        >
          Close Modal
        </button>
      </div>
    </div>
  );
}`,
      },
      keyTakeaway: "Intercepting routes combined with `router.back()` provide fluid native-app modal navigation.",
    },

    combinedExample: {
      combinedTopics: ["Parallel Routes", "Intercepting Routes", "Layouts"],
      title: "Complete Social Feed Modal Architecture",
      description: "Combining parallel slots with intercepting routes for seamless modal dialogs.",
      code: {
        title: "Modal Feed File Tree",
        description: "Folder structure of intercepted modal architecture.",
        language: "typescript",
        filename: "Architecture Tree",
        code: `src/app/
├── layout.tsx                # Defines { children, modal } props
├── page.tsx                  # Main feed list of photos
├── photo/[id]/page.tsx       # Standalone photo page (direct URL / refresh)
└── @modal/
    ├── default.tsx           # Returns null when modal is closed
    └── (.)photo/[id]/
        └── page.tsx          # Renders modal overlay on client link click`,
      },
      stepByStepFlow: [
        "User browses `/` feed",
        "Clicks `<Link href='/photo/42'>`",
        "Next.js intercepts click and renders `@modal/(.)photo/[id]/page.tsx` as an overlay",
        "URL bar changes to `/photo/42`",
        "If user sends link to a friend -> Friend opens `/photo/42` and sees full standalone page",
      ],
    },
  },

  {
    id: "middleware-proxy-edge",
    unitId: "unit-6",
    title: "Middleware, URL Proxy & Edge Runtime",
    shortSummary: "Intercept incoming requests, perform URL rewriting and reverse proxying, and execute ultra-fast compute at the global Edge.",
    order: 2,
    tags: ["Middleware", "Proxy", "URL Rewrite", "Edge Runtime", "Geolocation"],

    simpleExplanation:
      "Imagine an airport security checkpoint: before any passenger boards an airplane, security checks their passport, verifies their ticket, or redirects them to another gate. **Middleware** in Next.js is that airport checkpoint for your website! It runs at the **Edge** (in 300+ data centers worldwide) in under 5 milliseconds *before* any request reaches your page. Middleware can rewrite URLs (Reverse Proxy), inspect incoming headers, check geolocation (e.g. detect if the user is in India or the US), and redirect bot traffic.",

    whyNeeded:
      "Running authorization or URL rewrites on a centralized server adds latency for global users. Running middleware at the Edge delivers instant routing decisions in under 10 milliseconds anywhere in the world.",

    reactVsNext: {
      concept: "Request Interception & Reverse Proxy",
      reactWay: {
        title: "Nginx / Apache Server Configuration",
        code: `# In traditional React, you must configure Nginx reverse proxy files:
server {
  listen 80;
  server_name example.com;

  location /api/backend/ {
    proxy_pass https://external-api.corp.internal/;
    proxy_set_header X-Custom-Header "proxy-val";
  }
}`,
        explanation:
          "In vanilla React, developers have to configure complex Nginx reverse proxy configurations or Cloudflare worker scripts manually.",
        drawbacks: [
          "Requires DevOps server management (Nginx/Apache)",
          "Cannot write proxy logic in standard TypeScript",
          "Hard to test locally in development",
        ],
      },
      nextjsWay: {
        title: "Next.js TypeScript middleware.ts & NextResponse.rewrite",
        code: `// File: src/middleware.ts (Runs at the Edge in TypeScript!)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Inspect Geolocation (Country):
  const country = request.geo?.country || "US";

  // 2. Reverse Proxy / URL Rewrite:
  // Rewrites URL internally without changing the browser's address bar!
  if (request.nextUrl.pathname.startsWith("/old-path")) {
    return NextResponse.rewrite(new URL("/new-target", request.url));
  }

  // 3. Set Custom Response Headers:
  const response = NextResponse.next();
  response.headers.set("x-user-country", country);
  return response;
}`,
        explanation:
          "Next.js middleware provides programmatic Edge routing, proxying, and header manipulation using standard Web APIs in pure TypeScript.",
        benefits: [
          "Written in standard TypeScript with full autocomplete",
          "Executes globally at Edge nodes (<10ms latency)",
          "Reverse proxying with `NextResponse.rewrite()`",
        ],
      },
      whyDifferent:
        "Next.js executes `middleware.ts` in the V8 Edge Runtime prior to routing, unifying proxy configuration directly in application code.",
      mentalShiftSummary:
        "Don't manage Nginx configs. Write `src/middleware.ts` with `NextResponse.rewrite()` and `NextResponse.redirect()`.",
    },

    basicExample: {
      title: "URL Rewrite & Geolocation Header Injection",
      description: "Detecting user location and adding custom headers in middleware.",
      language: "typescript",
      filename: "src/middleware.ts",
      code: `// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Read request details:
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "unknown";

  console.log(\`Edge Intercept: \${request.method} \${pathname}\`);

  // Create response and set custom security headers:
  const response = NextResponse.next();
  response.headers.set("x-powered-by-int257", "NextMastery");
  response.headers.set("x-client-device", userAgent.includes("Mobile") ? "mobile" : "desktop");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};`,
      explanation:
        "This middleware runs for all incoming page requests, injecting custom headers before HTML rendering begins.",
      outputPreview: "HTTP responses enriched with x-powered-by-int257 and x-client-device headers.",
    },

    moreExamples: [
      {
        title: "Edge Runtime vs Node.js Runtime",
        description: "Configuring individual route handlers or pages to run at the Edge.",
        language: "typescript",
        filename: "src/app/api/edge-geo/route.ts",
        code: `// Export runtime to run this API on global Edge compute:
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Computed at the Edge in <5ms",
    ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
    timestamp: Date.now(),
  });
}`,
        explanation:
          "`export const runtime = 'edge'` shifts execution from Node.js serverless functions to ultra-lightweight V8 Edge isolates with near-zero cold starts.",
      },
    ],

    multipleWays: [
      {
        name: "NextResponse.rewrite (Reverse Proxy)",
        syntax: "return NextResponse.rewrite(new URL('/target', req.url))",
        codeSnippet: `// Shows content from /target without changing browser URL`,
        howItWorks: "Internally routes to a different page while keeping original URL in the browser address bar.",
        pros: ["Seamless A/B testing and multi-tenant subdomains", "Invisible proxying"],
        cons: ["Can cause caching confusion if headers are not set correctly"],
        whenToUse: "For subdomains (tenant.app.com -> app.com/tenants/tenant) and URL aliasing.",
        isRecommended: true,
      },
      {
        name: "NextResponse.redirect (HTTP 307/308)",
        syntax: "return NextResponse.redirect(new URL('/new-url', req.url))",
        codeSnippet: `// Redirects browser to /new-url`,
        howItWorks: "Sends an HTTP redirect response instructing the browser to change URLs.",
        pros: ["Browser address bar updates", "Standard SEO redirect"],
        cons: ["Causes an extra network roundtrip"],
        whenToUse: "For unauthorized access redirects, maintenance pages, or migrated URLs.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `rewrite()` when you want the browser URL to stay the same. Use `redirect()` when you want the browser URL to change.",
      scenarios: [
        {
          scenario: "A user visits `ishika.platform.com` and you want to render `/profiles/ishika` internally",
          recommendedApproach: "`NextResponse.rewrite(new URL('/profiles/ishika', req.url))`",
          reason: "Preserves custom vanity domain in browser bar while serving internal route.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using unsupported Node.js APIs (e.g. fs or crypto.createHash) in Edge Middleware",
        badCode: `// ❌ BAD in middleware.ts:
import fs from "fs"; // Runtime Error: 'fs' module not found in Edge Runtime!`,
        goodCode: `// ✅ GOOD: Use standard Web APIs (fetch, crypto.subtle, TextEncoder)
const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("data"));`,
        whyItBreaks: "Middleware runs on the V8 Edge Runtime which supports Web standards (fetch, Request, Response), not Node.js native filesystem modules.",
        howToFix: "Use standard Web APIs inside `middleware.ts`.",
      },
    ],

    bestPractices: [
      {
        title: "Use Negative Regex Matchers to Skip Static Assets",
        rule: "Configure `matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']` in middleware.",
        explanation: "Prevents middleware from running unnecessarily on static CSS, JS, and image assets, saving compute costs.",
      },
    ],

    exercises: [
      {
        id: "u6-ex-2",
        title: "Build an Edge Security Header Middleware",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a middleware function that adds `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff` headers to every response.",
        initialCode: `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TODO: Add security headers to response
  return NextResponse.next();
}`,
        expectedOutput: "A middleware function applying HTTP security headers.",
        hints: ["`const response = NextResponse.next();`", "`response.headers.set('X-Frame-Options', 'DENY');`"],
        solutionCode: `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};`,
        solutionExplanation:
          "Applying security headers at the Edge protects the application against clickjacking and MIME-type sniffing attacks.",
      },
    ],

    quizzes: [
      {
        id: "u6-q2",
        question: "What is the difference between NextResponse.rewrite() and NextResponse.redirect()?",
        syllabusTopic: "Middleware Rewrite vs Redirect",
        options: [
          { id: "a", text: "rewrite() changes the rendered content internally without modifying the browser URL; redirect() instructs the browser to navigate to a new URL", isCorrect: true, explanation: "Correct! rewrite is a reverse proxy (URL stays same); redirect sends a 307/308 status (URL changes)." },
          { id: "b", text: "rewrite() is only for CSS files", isCorrect: false, explanation: "No." },
          { id: "c", text: "redirect() deletes the user's cookies", isCorrect: false, explanation: "No." },
          { id: "d", text: "They are 100% identical", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "`NextResponse.rewrite()` performs a server-side reverse proxy without altering the browser address bar. `NextResponse.redirect()` sends an HTTP redirect header that updates the client URL.",
      },
    ],

    realWorldExample: {
      domain: "Global Multi-Region SaaS Multi-Tenancy",
      description: "How platforms map custom subdomains (`acme.saas.com` -> `/tenants/acme`) using Edge rewrites.",
      code: {
        title: "Subdomain Multi-Tenant Rewriter",
        description: "Dynamic subdomain proxying in middleware.",
        language: "typescript",
        filename: "src/middleware.ts",
        code: `export function middleware(req: any) {
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  if (subdomain && subdomain !== "www" && subdomain !== "localhost:3000") {
    return NextResponse.rewrite(new URL(\`/tenants/\${subdomain}\${req.nextUrl.pathname}\`, req.url));
  }
  return NextResponse.next();
}`,
      },
      keyTakeaway: "Subdomain rewrites allow building multi-tenant SaaS platforms on a single unified Next.js codebase.",
    },

    combinedExample: {
      combinedTopics: ["Middleware", "Edge Runtime", "Security Headers"],
      title: "Edge Gateway Architecture",
      description: "How Edge Middleware serves as the single secure entry point for all application traffic.",
      code: {
        title: "Edge Gateway Flow",
        description: "Architectural overview.",
        language: "typescript",
        filename: "Edge Gateway",
        code: `// Client Browser Request -> [Edge Middleware (5ms)]
// 1. Verifies Auth Cookies
// 2. Injects Security Headers
// 3. Performs Subdomain / Path Rewrites
// -> Dispatches to Server Components / Route Handlers`,
      },
      stepByStepFlow: [
        "Client sends request to `app.com/dashboard`",
        "Edge Middleware intercepts in nearest data center (<10ms)",
        "Applies security headers and checks session validity",
        "Passes to Server Component for HTML generation",
      ],
    },
  },

  {
    id: "i18n-and-architecture",
    unitId: "unit-6",
    title: "Internationalization (i18n) & Project Architecture",
    shortSummary: "Master multi-language routing with dictionaries (/[lang]/page.tsx) and scalable feature-driven folder architecture.",
    order: 3,
    tags: ["i18n", "Localization", "Architecture", "Folder Organization", "Clean Code"],

    simpleExplanation:
      "If you want your website to be used by students in India, Japan, France, and Germany, you need **Internationalization (i18n)**. In Next.js App Router, you do this by creating a dynamic route folder named `[lang]`. When someone visits `/en/units`, they see English; when they visit `/es/units`, they see Spanish! You load lightweight JSON translation dictionaries on the server without shipping megabytes of client translation packages. **Scalable Architecture** means organizing your codebase by features (`features/courses`, `features/quizzes`) so your project stays clean as it grows to 50,000 lines of code.",

    whyNeeded:
      "Unstructured spaghetti codebases slow down team development and make refactoring terrifying. Proper architecture and native i18n support make web applications world-ready and maintainable.",

    reactVsNext: {
      concept: "Multi-Language Localization",
      reactWay: {
        title: "React i18next (Heavy Client Bundle)",
        code: `// Traditional React i18next:
import i18n from "i18next";
import { useTranslation } from "react-i18next";

// Downloads ALL translation dictionaries for all languages to user's browser:
function Header() {
  const { t } = useTranslation();
  return <h1>{t("welcome_message")}</h1>;
}`,
        explanation:
          "In vanilla React, localization libraries often bundle all language JSON files into the client bundle, increasing download size for every user.",
        drawbacks: [
          "Wasted mobile bandwidth downloading unused languages",
          "URL does not reflect language (/about instead of /en/about or /es/about)",
          "Search engines cannot crawl language variants properly",
        ],
      },
      nextjsWay: {
        title: "Next.js Server-Side Dictionary i18n",
        code: `// File: src/app/[lang]/page.tsx
// Zero client bundle impact! Loads ONLY the requested language dictionary on the server.

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
};

export default async function HomePage({ params }: { params: Promise<{ lang: "en" | "es" }> }) {
  const { lang } = await params;
  const dict = await dictionaries[lang]();

  return <h1>{dict.welcomeMessage}</h1>;
}`,
        explanation:
          "Next.js loads only the dictionary for the active language on the server, sending translated HTML to the browser with zero client i18n library overhead.",
        benefits: [
          "0 KB client localization bundle size",
          "Clean subpath routing (`/en`, `/es`, `/hi`) for top SEO indexability",
          "Instant server-rendered translations",
        ],
      },
      whyDifferent:
        "Next.js combines dynamic route segments (`[lang]`) with dynamic server imports, eliminating client-side translation overhead.",
      mentalShiftSummary:
        "Use `app/[lang]/` folder and load language JSON files server-side with `import('@/dictionaries/' + lang)`.",
    },

    basicExample: {
      title: "Dictionary-Based Multi-Language Component",
      description: "Loading localized copy server-side with TypeScript dictionaries.",
      language: "tsx",
      filename: "src/app/[lang]/units/page.tsx",
      code: `// src/app/[lang]/units/page.tsx
interface PageProps {
  params: Promise<{ lang: "en" | "es" | "hi" }>;
}

const mockDict = {
  en: { title: "INT257 Syllabus", subtitle: "Learn Next.js App Router" },
  es: { title: "Programa INT257", subtitle: "Aprende Next.js App Router" },
  hi: { title: "INT257 पाठ्यक्रम", subtitle: "Next.js ऐप राउटर सीखें" },
};

export default async function UnitsI18nPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = mockDict[lang] || mockDict.en;

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
        Locale: {lang.toUpperCase()}
      </span>
      <h1 className="text-2xl font-bold text-zinc-100">{dict.title}</h1>
      <p className="text-zinc-400 text-sm">{dict.subtitle}</p>
    </div>
  );
}`,
      explanation:
        "When visiting `/hi/units`, the server renders Hindi headings; when visiting `/en/units`, it renders English, all from the same page component.",
      outputPreview: "Localized syllabus card rendered dynamically based on URL language prefix.",
    },

    moreExamples: [
      {
        title: "Enterprise Project Folder Architecture",
        description: "Best practice folder structure for large-scale Next.js full-stack applications.",
        language: "typescript",
        filename: "Scalable Project Architecture",
        code: `src/
├── app/                  # Routing & Layouts ONLY (Keep thin!)
│   ├── (marketing)/      # Route Group for public pages
│   ├── (dashboard)/      # Route Group for app pages
│   └── api/              # Route Handlers
├── components/           # Reusable UI Design System
│   ├── ui/               # Atomic buttons, inputs, modals, cards
│   └── layout/           # Header, Footer, Sidebar, Navigation
├── features/             # Feature-Driven Modules (Clean Code!)
│   ├── courses/          # Course components, hooks, types, actions
│   ├── quizzes/          # Quiz widgets, state machines, quiz actions
│   └── auth/             # Session helpers, guards, permission models
├── lib/                  # Shared utilities, database client, Supabase
├── types/                # Core TypeScript interfaces
└── actions/              # Server Actions (Mutations)`,
        explanation:
          "Organizing code into `features/` isolates related components, Server Actions, and types together, making codebases easy to scale.",
      },
    ],

    multipleWays: [
      {
        name: "Subpath Routing (/[lang]/... - Recommended)",
        syntax: "src/app/[lang]/page.tsx",
        codeSnippet: `export default async function Page({ params }) { ... }`,
        howItWorks: "Embeds locale directly into URL path.",
        pros: ["Best for SEO", "Shareable localized links", "Server Component friendly"],
        cons: ["Requires wrapping top-level routes in [lang] folder"],
        whenToUse: "For all multi-language public websites and portals.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `[lang]` subpath routing with server-side dictionary loading for modern multilingual web applications.",
      scenarios: [
        {
          scenario: "You need to support English and Hindi for university students",
          recommendedApproach: "Subpath `src/app/[lang]/` with dictionary imports",
          reason: "Delivers pre-rendered HTML in the student's chosen language with zero client bundle penalty.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Putting all business logic and database queries directly in page.tsx",
        badCode: `// ❌ BAD: 500 lines of SQL, form handling, and UI jammed in page.tsx`,
        goodCode: `// ✅ GOOD: Keep page.tsx thin; extract logic to actions/ and components/`,
        whyItBreaks: "Monolithic page files are difficult to test, impossible to reuse, and hard to maintain.",
        howToFix: "Delegate data mutations to `src/actions/` and reusable UI to `src/components/`.",
      },
    ],

    bestPractices: [
      {
        title: "Use Route Groups (parentheses) to Organize Without Affecting URLs",
        rule: "Use `(marketing)` and `(dashboard)` folders to group layouts without adding `/marketing` to the URL.",
        explanation: "Keeps your folder structure organized while maintaining clean public URLs.",
      },
    ],

    exercises: [
      {
        id: "u6-ex-3",
        title: "Create a Language Switcher Component",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Create a Client Component `LanguageSwitcher` that replaces the current `[lang]` segment in the URL using `usePathname()` and `<Link>`.",
        initialCode: `// TODO: Create LanguageSwitcher component
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();

  // TODO: Render links for EN, ES, HI
  return <div className="flex gap-2">{/* Add links */}</div>;
}`,
        expectedOutput: "A pill selector switching language prefixes in the URL.",
        hints: ["Replace the first segment of `pathname` with the new locale"],
        solutionCode: `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();

  const getLocalizedPath = (targetLang: string) => {
    if (!pathname) return \`/\${targetLang}\`;
    const segments = pathname.split("/");
    segments[1] = targetLang; // Replace locale segment
    return segments.join("/") || \`/\${targetLang}\`;
  };

  return (
    <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
      {["en", "es", "hi"].map((lang) => (
        <Link
          key={lang}
          href={getLocalizedPath(lang)}
          className="px-2.5 py-1 text-xs font-mono uppercase rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
        >
          {lang}
        </Link>
      ))}
    </div>
  );
}`,
        solutionExplanation:
          "This component updates the locale prefix in the URL dynamically, triggering Next.js server-side re-rendering with the new language dictionary.",
      },
    ],

    quizzes: [
      {
        id: "u6-q3",
        question: "Why is server-side dictionary localization better than client-side i18next in Next.js?",
        syllabusTopic: "Next.js i18n Architecture",
        options: [
          { id: "a", text: "It only downloads the active language on the server, resulting in 0 KB client i18n bundle size and complete SEO indexing", isCorrect: true, explanation: "Correct! Next.js loads the exact translation dictionary on the server and delivers pre-rendered HTML." },
          { id: "b", text: "Because English is the only language permitted on the web", isCorrect: false, explanation: "No." },
          { id: "c", text: "Because JSON files are encrypted by the browser", isCorrect: false, explanation: "No." },
          { id: "d", text: "To turn off the database", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "Server-side dictionary loading eliminates client localization libraries and sends ready-to-display localized HTML for maximum speed and SEO crawlability.",
      },
    ],

    realWorldExample: {
      domain: "Global University Online Education",
      description: "How international course platforms serve course outlines in 12 languages with zero latency.",
      code: {
        title: "Localized Course Module",
        description: "Dynamic dictionary loader.",
        language: "typescript",
        filename: "src/lib/getDictionary.ts",
        code: `export async function getDictionary(locale: string) {
  switch (locale) {
    case "es": return import("@/dictionaries/es.json").then(m => m.default);
    case "hi": return import("@/dictionaries/hi.json").then(m => m.default);
    default: return import("@/dictionaries/en.json").then(m => m.default);
  }
}`,
      },
      keyTakeaway: "Dynamic module imports allow bundling each language dictionary into its own tiny independent chunk.",
    },

    combinedExample: {
      combinedTopics: ["i18n Subpaths", "Route Groups", "Feature Architecture"],
      title: "Full Internationalized Enterprise Directory",
      description: "Combining clean feature folders with multi-language routing.",
      code: {
        title: "Architectural Layout",
        description: "Full directory tree.",
        language: "typescript",
        filename: "Enterprise Architecture",
        code: `src/
├── app/
│   └── [lang]/
│       ├── layout.tsx         # Injects <html lang={params.lang}>
│       ├── page.tsx           # Home view in selected language
│       └── units/
│           └── [unitId]/
│               └── page.tsx   # Localized lesson content
├── dictionaries/
│   ├── en.json
│   ├── es.json
│   └── hi.json`,
      },
      stepByStepFlow: [
        "User navigates to `/hi/units/unit-1`",
        "Root layout sets `<html lang='hi'>`",
        "`getDictionary('hi')` loads Hindi string mappings on server",
        "User receives fast, fully translated HTML with zero client overhead",
      ],
    },
  },

  {
    id: "security-and-testing",
    unitId: "unit-6",
    title: "Security Hardening & Testing Strategies",
    shortSummary: "Master web security (XSS, CSRF, CSP headers, rate limiting) and testing overview (Unit testing with Vitest, Component testing, and E2E with Playwright).",
    order: 4,
    tags: ["Security", "Testing", "XSS", "CSRF", "CSP", "Vitest", "Playwright", "Rate Limiting"],

    simpleExplanation:
      "Building a web application is only half the battle; ensuring it is secure against hackers and doesn't break when you release new code is the other half! **Web Security** involves protecting your app against Cross-Site Scripting (XSS), SQL Injection, and Cross-Site Request Forgery (CSRF). Next.js provides built-in protections like JSX auto-escaping, Server Actions CSRF tokens, and Content Security Policy (CSP) headers. **Testing** ensures confidence: **Unit Tests** test single functions (like a price calculator), **Component Tests** test UI buttons and forms (React Testing Library), and **End-to-End (E2E) Tests** (Playwright) automate a robot browser that clicks through your entire website to verify everything works before deployment!",

    whyNeeded:
      "Security vulnerabilities lead to leaked student records and compromised databases. Untested applications crash in production when edge cases occur. Security hardening and automated testing are essential engineering practices.",

    reactVsNext: {
      concept: "Security & Testing Pipeline",
      reactWay: {
        title: "Manual Frontend CSRF & Vitest Setup",
        code: `// Traditional React requires manual CSRF token management:
// Must fetch CSRF token from backend and inject into every fetch header!
fetch('/api/submit', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getCsrfTokenFromCookie(),
  },
  body: JSON.stringify(data)
});`,
        explanation:
          "In traditional client-only React, developers must manually coordinate anti-CSRF tokens with an Express server and configure complex mock servers for testing.",
        drawbacks: [
          "Manual CSRF token synchronization",
          "Difficult to test Server-Side Rendering output in standard client test runners",
        ],
      },
      nextjsWay: {
        title: "Next.js Built-in Security & Unified Testing",
        code: `// 1. Built-in Server Action CSRF Protection:
// Next.js automatically verifies Origin and Host headers for all Server Actions!
// Zero manual CSRF token code needed!

// 2. Playwright End-to-End (E2E) Test:
// tests/syllabus.spec.ts
import { test, expect } from "@playwright/test";

test("should navigate to Unit 1 and display syllabus heading", async ({ page }) => {
  await page.goto("http://localhost:3000/units");
  await page.click("text=Unit 1");
  await expect(page.locator("h1")).toContainText("Next.js Fundamentals");
});`,
        explanation:
          "Next.js provides automatic CSRF defense for Server Actions, built-in XSS JSX escaping, and seamless integration with Playwright for full-stack E2E testing.",
        benefits: [
          "Automatic CSRF protection for Server Actions",
          "Automated Content Security Policy (CSP) header support",
          "Test real server-rendered HTML and client interactions in Playwright",
        ],
      },
      whyDifferent:
        "Next.js enforces security checks at both the Edge and Node.js layers, and allows end-to-end testing of complete server-rendered flows.",
      mentalShiftSummary:
        "Rely on Server Actions for automatic CSRF protection. Write Playwright E2E tests to verify full user journeys.",
    },

    basicExample: {
      title: "Content Security Policy (CSP) Configuration in Middleware",
      description: "Restricting external script execution to prevent XSS attacks.",
      language: "typescript",
      filename: "src/middleware.ts",
      code: `// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Define strict Content Security Policy:
  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://images.unsplash.com https://*.supabase.co;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  \`.replace(/\\s{2,}/g, " ").trim();

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}`,
      explanation:
        "CSP headers instruct the student's browser to reject any unauthorized third-party scripts or injected malicious iframe objects.",
      outputPreview: "HTTP responses fortified with strict Content Security Policy headers.",
    },

    moreExamples: [
      {
        title: "Unit Testing a Helper with Vitest",
        description: "Testing a utility function for calculating student grade averages.",
        language: "typescript",
        filename: "src/lib/gradeCalculator.test.ts",
        code: `import { describe, it, expect } from "vitest";
import { calculateCourseGrade } from "./gradeCalculator";

describe("calculateCourseGrade", () => {
  it("should return 'A+' for score >= 90", () => {
    const grade = calculateCourseGrade(94);
    expect(grade).toBe("A+");
  });

  it("should return 'F' for score < 50", () => {
    const grade = calculateCourseGrade(42);
    expect(grade).toBe("F");
  });
});`,
        explanation:
          "Unit tests execute in milliseconds, validating core algorithmic calculations before deploying.",
      },
      {
        title: "Rate Limiting with Token Bucket Algorithm",
        description: "Preventing brute-force attacks and API abuse in Route Handlers.",
        language: "typescript",
        filename: "src/lib/rateLimit.ts",
        code: `// Simple in-memory rate limiter for demo:
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function isRateLimited(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - entry.lastReset > windowMs) {
    entry.count = 1;
    entry.lastReset = now;
  } else {
    entry.count += 1;
  }

  rateLimitMap.set(ip, entry);
  return entry.count > limit;
}`,
        explanation:
          "Rate limiting prevents malicious bots from hammering your API endpoints with thousands of requests per second.",
      },
    ],

    multipleWays: [
      {
        name: "Playwright E2E Testing (Recommended for Next.js)",
        syntax: "npx playwright test",
        codeSnippet: `test('homepage loads', async ({ page }) => { await page.goto('/'); });`,
        howItWorks: "Launches real headless browsers (Chromium, Firefox, WebKit) and clicks through pages.",
        pros: ["Tests real server rendering, database queries, and client hydration", "Catches real-world user bugs"],
        cons: ["Slightly slower than unit tests"],
        whenToUse: "For all critical user journeys: authentication, checkout, form submissions.",
        isRecommended: true,
      },
      {
        name: "Vitest / Jest Unit Testing",
        syntax: "npm run test",
        codeSnippet: `expect(formatDate('2026-08-16')).toBe('Aug 16, 2026');`,
        howItWorks: "Runs isolated JavaScript functions in Node.js.",
        pros: ["Blazing fast execution (milliseconds)", "Ideal for pure math, formatting, and validation logic"],
        cons: ["Does not test browser DOM rendering"],
        whenToUse: "For utility libraries, data mappers, and validation schemas.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use Vitest for helper utilities and validation schemas. Use Playwright for full page flows and form submissions.",
      scenarios: [
        {
          scenario: "You want to ensure clicking 'Enroll' submits the form and updates the course list",
          recommendedApproach: "Playwright E2E Test",
          reason: "Verifies the entire Server Action + UI revalidation flow end-to-end.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using dangerouslySetInnerHTML with unsanitized user inputs",
        badCode: `// ❌ CRITICAL XSS VULNERABILITY:
<div dangerouslySetInnerHTML={{ __html: userComment }} /> // Executes malicious <script> tags!`,
        goodCode: `// ✅ GOOD: Render plain text (React auto-escapes HTML!) or sanitize with DOMPurify
<p>{userComment}</p>`,
        whyItBreaks: "Injecting unescaped user-generated HTML allows attackers to execute arbitrary JavaScript in victim browsers.",
        howToFix: "Avoid `dangerouslySetInnerHTML` or sanitize strings with a trusted library like `isomorphic-dompurify`.",
      },
    ],

    bestPractices: [
      {
        title: "Sanitize and Validate All Server Action Arguments",
        rule: "Treat every piece of data coming from the client as untrusted.",
        explanation: "Always parse inputs with Zod schemas before interacting with database tables.",
      },
    ],

    exercises: [
      {
        id: "u6-ex-4",
        title: "Write a Rate-Limited Route Handler",
        difficulty: "medium",
        estimatedMinutes: 8,
        prompt:
          "Write a `POST` handler for `src/app/api/feedback/route.ts` that checks if the client IP is rate-limited. If so, return HTTP 429 Too Many Requests; otherwise return 200 OK.",
        initialCode: `import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: Check rate limit and return 429 or 200
}`,
        expectedOutput: "A Route Handler enforcing HTTP 429 rate limiting.",
        hints: ["Check client IP using `request.headers.get('x-forwarded-for')`", "Return `NextResponse.json({ error: 'Too many requests' }, { status: 429 })`"],
        solutionCode: `import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  if (isRateLimited(ip, 5, 60000)) {
    return NextResponse.json(
      { error: "Too many feedback submissions. Please wait 1 minute." },
      { status: 429 }
    );
  }

  const body = await request.json();
  return NextResponse.json({ success: true, received: body }, { status: 200 });
}`,
        solutionExplanation:
          "Returning HTTP 429 Too Many Requests protects backend services from abuse and spam.",
      },
    ],

    quizzes: [
      {
        id: "u6-q4",
        question: "How does React in Next.js automatically prevent Cross-Site Scripting (XSS) when rendering variables?",
        syllabusTopic: "React XSS Protection",
        options: [
          { id: "a", text: "By auto-escaping strings rendered in JSX (e.g. converting '<script>' into '&lt;script&gt;') before inserting into the DOM", isCorrect: true, explanation: "Correct! React safely escapes all variable values rendered inside JSX curly braces." },
          { id: "b", text: "By turning off JavaScript on user laptops", isCorrect: false, explanation: "No." },
          { id: "c", text: "By requiring an antivirus subscription", isCorrect: false, explanation: "No." },
          { id: "d", text: "It does not protect against XSS", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "React automatically treats everything rendered inside JSX `{variable}` as plain strings and escapes HTML entities, making accidental script execution impossible.",
      },
    ],

    realWorldExample: {
      domain: "FinTech Banking & Payment Security",
      description: "How financial platforms implement strict CSP, rate limiting, and automated E2E testing for compliance.",
      code: {
        title: "Secure Transfer Route Handler with Rate Limiting",
        description: "Rate-limited financial operation.",
        language: "typescript",
        filename: "src/app/api/transfer/route.ts",
        code: `export async function POST(req: any) {
  // 1. Rate limit verification
  // 2. Strict Zod schema parsing
  // 3. Audit log recording
  return NextResponse.json({ status: "processed" });
}`,
      },
      keyTakeaway: "Multi-layered defense (CSP, Rate Limiting, Schema Validation, E2E Testing) ensures high system reliability.",
    },

    combinedExample: {
      combinedTopics: ["Security Headers", "Rate Limiting", "Testing", "Server Actions"],
      title: "Production Security & Testing Architecture",
      description: "The complete security shield protecting modern Next.js applications.",
      code: {
        title: "Complete Security Shield",
        description: "Overview of security layers.",
        language: "typescript",
        filename: "Security Defense in Depth",
        code: `// Layer 1: Edge Middleware (CSP Headers, Bot Filtering, Rate Limiting)
// Layer 2: Next.js Compiler (JSX XSS auto-escaping, Server Action CSRF validation)
// Layer 3: Server Actions (Zod schema validation, RLS database enforcement)
// Layer 4: Playwright CI Pipeline (Automated testing before production merge)`,
      },
      stepByStepFlow: [
        "Incoming traffic is inspected and filtered by Edge Middleware",
        "Requests pass through Server Actions with automatic CSRF defense",
        "Data is strictly validated with Zod before touching database",
        "Continuous Integration runs Playwright tests to ensure 100% test pass rate",
      ],
    },
  },
];
