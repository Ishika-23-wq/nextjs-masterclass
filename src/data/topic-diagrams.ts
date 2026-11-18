export interface DiagramStep {
  stepNumber: number;
  title: string;
  actor: "Browser 🌐" | "Next.js Server ⚡" | "Edge CDN ☁️" | "Database 🗄️" | "React Client ⚛️";
  actorType: "browser" | "server" | "edge" | "database" | "client";
  description: string;
  icon: string;
  badge: string;
  codeSnippet?: string;
}

export interface ArchitectureLane {
  name: string;
  emoji: string;
  color: "matcha" | "sky" | "honey" | "sakura" | "lavender" | "latte";
  items: Array<{
    name: string;
    role: string;
    badge?: string;
  }>;
}

export interface TopicDiagramData {
  topicId: string;
  title: string;
  subtitle: string;
  category: string;
  washiColor: "matcha" | "sky" | "honey" | "sakura" | "lavender" | "latte";
  ruleOfThumb: string;
  steps: DiagramStep[];
  lanes: ArchitectureLane[];
  comparison?: {
    badTitle: string;
    badFlow: string[];
    goodTitle: string;
    goodFlow: string[];
  };
}

export const topicDiagramsDatabase: Record<string, TopicDiagramData> = {
  // UNIT 1
  "intro-and-project-structure": {
    topicId: "intro-and-project-structure",
    title: "Next.js App Router Request & Pre-Rendering Flowchart",
    subtitle: "Visual journey of how folders turn into HTML pages before reaching the browser",
    category: "Request Lifecycle",
    washiColor: "matcha",
    ruleOfThumb: "Every folder inside app/ with a page.js becomes a real URL route automatically!",
    steps: [
      {
        stepNumber: 1,
        title: "User Enters URL in Browser",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Student enters 'http://localhost:3000/about' into the browser address bar.",
        icon: "🌐",
        badge: "HTTP GET /about",
      },
      {
        stepNumber: 2,
        title: "Next.js App Router Traverses Folder Tree",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Next.js matches the URL path '/about' to the folder 'app/about/page.js'.",
        icon: "📁",
        badge: "Folder Routing",
      },
      {
        stepNumber: 3,
        title: "Server Pre-Renders Root Layout + Page",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Next.js executes 'app/layout.js' and embeds 'app/about/page.js' inside {children}.",
        icon: "🍳",
        badge: "Server Execution",
        codeSnippet: "<RootLayout><AboutPage /></RootLayout>",
      },
      {
        stepNumber: 4,
        title: "Streams Ready HTML to the Visitor",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "The browser receives pure HTML immediately. The screen appears instantly without waiting for React to boot!",
        icon: "🚀",
        badge: "0ms Blank Screen",
      },
    ],
    lanes: [
      {
        name: "Client Browser",
        emoji: "💻",
        color: "sky",
        items: [
          { name: "Address Bar", role: "Triggers URL navigation" },
          { name: "DOM Display", role: "Instantly renders pre-baked HTML" },
          { name: "Interactive Hydration", role: "Attaches event listeners" },
        ],
      },
      {
        name: "Next.js App Router (Server)",
        emoji: "⚡",
        color: "matcha",
        items: [
          { name: "app/layout.js", role: "Wraps global HTML, header & footer" },
          { name: "app/about/page.js", role: "Pre-renders page content" },
          { name: "Fast Refresh Engine", role: "Instant rebuild on code save" },
        ],
      },
    ],
    comparison: {
      badTitle: "Traditional Client-Side Routing",
      badFlow: ["1. User visits /about", "2. Server sends empty <div id='root'>", "3. Screen stays blank while huge JS downloads", "4. Browser runs React & finally paints"],
      goodTitle: "Next.js Server Pre-Rendering",
      goodFlow: ["1. User visits /about", "2. Server pre-bakes full HTML in milliseconds", "3. Browser displays page content immediately", "4. Zero blank white screen for visitors"],
    },
  },

  "file-based-routing": {
    topicId: "file-based-routing",
    title: "Dynamic Route Parameter Matching Flowchart",
    subtitle: "How Next.js turns bracket folders [name]/[id] into live JavaScript variables",
    category: "Dynamic Routing",
    washiColor: "honey",
    ruleOfThumb: "Square brackets [param] act as URL wildcards; unpack them using 'await params' in Next.js!",
    steps: [
      {
        stepNumber: 1,
        title: "Visitor Requests URL with Dynamic Segments",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Browser navigates to '/profile/ishika/101/ishika@gmail.com'.",
        icon: "🔗",
        badge: "Dynamic Path",
      },
      {
        stepNumber: 2,
        title: "Next.js Pattern Matches Nested Wildcard Folders",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Matches: app/profile/[name]/[id]/[email]/page.js.",
        icon: "🎯",
        badge: "Pattern Match",
        codeSnippet: "[name] -> 'ishika'\n[id] -> '101'\n[email] -> 'ishika@gmail.com'",
      },
      {
        stepNumber: 3,
        title: "Async Function Unpacks 'await params'",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "The Server Component awaits params and extracts values cleanly.",
        icon: "📦",
        badge: "await params",
        codeSnippet: "const { name, id, email } = await params;",
      },
      {
        stepNumber: 4,
        title: "Renders Personalized Profile HTML",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Returns ready-to-view HTML with the student's name, ID, and email populated.",
        icon: "✨",
        badge: "Rendered View",
      },
    ],
    lanes: [
      {
        name: "URL in Browser",
        emoji: "🌐",
        color: "sky",
        items: [
          { name: "/profile", role: "Static parent segment" },
          { name: "/ishika", role: "Matches [name]" },
          { name: "/101", role: "Matches [id]" },
          { name: "/ishika@gmail.com", role: "Matches [email]" },
        ],
      },
      {
        name: "File System Structure",
        emoji: "📂",
        color: "honey",
        items: [
          { name: "app/profile/", role: "Parent folder" },
          { name: "[name]/[id]/[email]/", role: "Wildcard parameters" },
          { name: "page.js", role: "Async Server Component" },
        ],
      },
    ],
  },

  "layouts-and-nested-routes": {
    topicId: "layouts-and-nested-routes",
    title: "Nested Layouts & Component Preservation Flowchart",
    subtitle: "Why parent layouts NEVER re-render when switching between child pages",
    category: "Layout Architecture",
    washiColor: "lavender",
    ruleOfThumb: "Layouts preserve their state and DOM across navigations; only {children} swaps!",
    steps: [
      {
        stepNumber: 1,
        title: "Initial Page Load at /dashboard/analytics",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Root Layout mounts Navbar; Dashboard Layout mounts Sidebar; Analytics Page mounts inside {children}.",
        icon: "🏛️",
        badge: "Full Tree Mount",
      },
      {
        stepNumber: 2,
        title: "User Clicks Link to /dashboard/settings",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User clicks sidebar navigation link to settings.",
        icon: "🖱️",
        badge: "Soft Navigation",
      },
      {
        stepNumber: 3,
        title: "Root & Dashboard Layouts STAY ALIVE",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "Navbar audio player, sidebar scroll position, and inputs retain 100% of their state with zero flicker!",
        icon: "🛡️",
        badge: "State Preserved",
      },
      {
        stepNumber: 4,
        title: "Only the {children} Slot Swaps Out",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "Next.js smoothly swaps Analytics content for Settings content.",
        icon: "🔄",
        badge: "Partial Re-render",
      },
    ],
    lanes: [
      {
        name: "Persistent Outer Shell (No Re-render)",
        emoji: "🧱",
        color: "lavender",
        items: [
          { name: "app/layout.js", role: "Navbar, Footer, Global Theme" },
          { name: "app/dashboard/layout.js", role: "Dashboard Sidebar, Active Tabs" },
        ],
      },
      {
        name: "Dynamic Child Slot ({children})",
        emoji: "📄",
        color: "sakura",
        items: [
          { name: "analytics/page.js", role: "Swapped out when navigating" },
          { name: "settings/page.js", role: "Swapped in seamlessly" },
        ],
      },
    ],
  },

  "navigation-and-redirects": {
    topicId: "navigation-and-redirects",
    title: "Next.js Link Pre-Fetching & Instant Transition Flowchart",
    subtitle: "How <Link> predicts user clicks and pre-downloads pages in background",
    category: "Client Navigation",
    washiColor: "sky",
    ruleOfThumb: "Use <Link> for visual links; use useRouter().push() inside functions or event handlers!",
    steps: [
      {
        stepNumber: 1,
        title: "<Link> Enters the User Viewport",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "As the user scrolls, a '<Link href=\"/courses\">' element scrolls onto the screen.",
        icon: "👀",
        badge: "Intersection Observer",
      },
      {
        stepNumber: 2,
        title: "Next.js Silently Pre-fetches in Background",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Next.js downloads the route payload quietly without slowing down current interactions.",
        icon: "📥",
        badge: "Background Pre-fetch",
      },
      {
        stepNumber: 3,
        title: "User Clicks the Link",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User decides to click the link to visit the courses page.",
        icon: "👆",
        badge: "Click Event",
      },
      {
        stepNumber: 4,
        title: "Instant 0ms Transition Without Page Reload",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "Since the page data was already pre-fetched in memory, the screen changes in 0ms without a spinning browser tab!",
        icon: "⚡",
        badge: "0ms Latency",
      },
    ],
    lanes: [
      {
        name: "Next.js Smart Pre-fetch",
        emoji: "⚡",
        color: "sky",
        items: [
          { name: "<Link href='/courses'>", role: "Automatic viewport detection" },
          { name: "In-Memory Route Cache", role: "Stores pre-fetched JSON payloads" },
        ],
      },
      {
        name: "Programmatic Navigation",
        emoji: "🧭",
        color: "honey",
        items: [
          { name: "useRouter().push('/url')", role: "Use inside buttons or async functions" },
          { name: "redirect('/login')", role: "Use inside Server Components & Actions" },
        ],
      },
    ],
  },

  "loading-and-error-ui": {
    topicId: "loading-and-error-ui",
    title: "Streaming HTML & Error Boundary Isolation Flowchart",
    subtitle: "How loading.js and error.js protect your application from slow APIs and crashes",
    category: "Streaming & Resilience",
    washiColor: "sakura",
    ruleOfThumb: "loading.js streams instant skeletons; error.js isolates crashes so the rest of the site stays working!",
    steps: [
      {
        stepNumber: 1,
        title: "Visitor Requests Data-Heavy Page",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User navigates to a dashboard page with a slow 3-second database query.",
        icon: "⏳",
        badge: "Incoming Request",
      },
      {
        stepNumber: 2,
        title: "Server Immediately Sends loading.js Skeleton",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Next.js sends the skeleton UI in 15ms so the user sees progress immediately.",
        icon: "🦴",
        badge: "loading.js Stream",
      },
      {
        stepNumber: 3,
        title: "Slow Database Query Finishes in Background",
        actor: "Database 🗄️",
        actorType: "database",
        description: "Database completes data fetching. React Suspense replaces the skeleton with real data.",
        icon: "📦",
        badge: "Suspense Resolve",
      },
      {
        stepNumber: 4,
        title: "Error Isolation with error.js",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "If an error occurs, error.js catches it. The Navbar and Sidebar remain clickable, and a 'Retry' button is shown.",
        icon: "🚨",
        badge: "error.js Boundary",
      },
    ],
    lanes: [
      {
        name: "Streaming Pipeline",
        emoji: "🌊",
        color: "sakura",
        items: [
          { name: "loading.js", role: "Wrapped in React <Suspense fallback={...}>" },
          { name: "Page Content", role: "Streams in as soon as promises resolve" },
        ],
      },
      {
        name: "Crash Protection",
        emoji: "🛡️",
        color: "matcha",
        items: [
          { name: "error.js", role: "'use client' boundary with reset() function" },
          { name: "not-found.js", role: "Triggered by notFound() function" },
        ],
      },
    ],
  },

  // UNIT 2
  "rendering-paradigms": {
    topicId: "rendering-paradigms",
    title: "Next.js Rendering Strategy Decision Flowchart",
    subtitle: "How to choose between Static Site Generation (SSG), SSR, ISR, and Client-Side Rendering",
    category: "Rendering Paradigms",
    washiColor: "honey",
    ruleOfThumb: "Static (SSG/ISR) by default for speed; SSR only when data is personalized per request!",
    steps: [
      {
        stepNumber: 1,
        title: "Question: Does data change on EVERY single user click?",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Evaluate your page requirements: Is it public content or private user profile?",
        icon: "❓",
        badge: "Decision Point 1",
      },
      {
        stepNumber: 2,
        title: "No (Public Content) -> Use Static Site Generation (SSG)",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "HTML is generated once at build time and cached on worldwide CDNs for instant 0ms delivery.",
        icon: "📦",
        badge: "SSG (Default)",
      },
      {
        stepNumber: 3,
        title: "Content Updates Occasionally -> Use ISR (export const revalidate = 60)",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "Cached globally; automatically rebuilds in the background after 60 seconds when visited.",
        icon: "🔄",
        badge: "ISR (Incremental)",
      },
      {
        stepNumber: 4,
        title: "Yes (Live User Data) -> Use Server-Side Rendering (SSR)",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Server fetches live cookies/database on every single request and renders fresh HTML.",
        icon: "🍳",
        badge: "Dynamic SSR",
      },
    ],
    lanes: [
      {
        name: "Static Rendering (Fastest)",
        emoji: "⚡",
        color: "matcha",
        items: [
          { name: "SSG", role: "Pre-rendered at build time; 0ms server time" },
          { name: "ISR", role: "Background revalidation every N seconds" },
        ],
      },
      {
        name: "Dynamic Rendering (Freshest)",
        emoji: "🔄",
        color: "honey",
        items: [
          { name: "SSR", role: "Renders on demand on every request" },
          { name: "CSR", role: "Fetches from browser inside useEffect" },
        ],
      },
    ],
  },

  "server-vs-client-components": {
    topicId: "server-vs-client-components",
    title: "Server vs Client Component Boundary Flowchart",
    subtitle: "The Kitchen (Server) vs Dining Table (Client) Architecture",
    category: "Component Architecture",
    washiColor: "matcha",
    ruleOfThumb: "Keep components on the Server by default; only add 'use client' when you need interactivity!",
    steps: [
      {
        stepNumber: 1,
        title: "Server Component: Secure Kitchen Execution",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Accesses secret API keys, connects directly to database, zero JavaScript sent to client browser.",
        icon: "👨‍🍳",
        badge: "Server Default",
        codeSnippet: "// app/products/page.js\n// Direct database query without API route!",
      },
      {
        stepNumber: 2,
        title: "The 'use client' Boundary Line",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Separates the server from the browser. Next.js creates a client component bundle manifest.",
        icon: "🚧",
        badge: "'use client' Directive",
      },
      {
        stepNumber: 3,
        title: "Client Component: Interactive Dining Table",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "Contains interactive features like useState, onClick, audio players, modals, and form inputs.",
        icon: "🍽️",
        badge: "Interactive Island",
        codeSnippet: "'use client';\nimport { useState } from 'react';",
      },
      {
        stepNumber: 4,
        title: "Composition Pattern: Pass Server Components as {children}",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "A Client Component modal can wrap a Server Component passed as children without turning it into a client component!",
        icon: "🎁",
        badge: "{children} Slot",
      },
    ],
    lanes: [
      {
        name: "Server Realm (Kitchen 🍳)",
        emoji: "🔒",
        color: "matcha",
        items: [
          { name: "Database Queries", role: "Direct SQL & Supabase calls" },
          { name: "API Keys & Secrets", role: "Never exposed to client browser" },
          { name: "Zero Client JS Bloat", role: "Keeps mobile bundle tiny" },
        ],
      },
      {
        name: "Client Realm (Dining Table 🍽️)",
        emoji: "🖱️",
        color: "sky",
        items: [
          { name: "useState / useEffect", role: "React hooks for UI state" },
          { name: "onClick / onChange", role: "Browser event handlers" },
          { name: "Browser APIs", role: "window, localStorage, geolocation" },
        ],
      },
    ],
  },

  "data-fetching-patterns": {
    topicId: "data-fetching-patterns",
    title: "Server Component Direct Data Fetching Flowchart",
    subtitle: "How async Server Components eliminate the need for useEffect and loading states",
    category: "Data Fetching",
    washiColor: "sky",
    ruleOfThumb: "Make your Server Component async and call await fetch() directly inside it!",
    steps: [
      {
        stepNumber: 1,
        title: "Async Server Component Starts Rendering",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Next.js invokes: export default async function UsersPage().",
        icon: "⚡",
        badge: "async Component",
      },
      {
        stepNumber: 2,
        title: "Direct 'await fetch()' Without Client Overhead",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Fetches data directly on the server network. No CORS errors, no exposed tokens.",
        icon: "🌐",
        badge: "Direct Fetch",
        codeSnippet: "const res = await fetch('https://api.example.com/users');\nconst users = await res.json();",
      },
      {
        stepNumber: 3,
        title: "Next.js Data Cache Checks for Existing Cache",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "Checks if the fetch request was cached or needs fresh network revalidation.",
        icon: "💾",
        badge: "Data Cache",
      },
      {
        stepNumber: 4,
        title: "Pre-Populated HTML Delivered to Browser",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "The browser receives the full table of users already rendered. Zero 'isLoading === true' spinners required!",
        icon: "🎉",
        badge: "Zero Spinners",
      },
    ],
    lanes: [
      {
        name: "Next.js Server Component Fetch",
        emoji: "⚡",
        color: "matcha",
        items: [
          { name: "Zero Client Waterfall", role: "Fetches before browser receives HTML" },
          { name: "No CORS Restrictions", role: "Server-to-server communication" },
        ],
      },
      {
        name: "Legacy React Fetch (Drawbacks)",
        emoji: "⚠️",
        color: "latte",
        items: [
          { name: "Requires useEffect", role: "Only fetches AFTER browser boots JS" },
          { name: "Layout Shift", role: "Causes jarring spinner-to-content jumps" },
        ],
      },
    ],
  },

  "caching-and-revalidation": {
    topicId: "caching-and-revalidation",
    title: "Next.js 4-Tier Caching Architecture Flowchart",
    subtitle: "Understanding Request Memoization, Data Cache, Full Route Cache, and Router Cache",
    category: "Caching System",
    washiColor: "lavender",
    ruleOfThumb: "Use revalidatePath('/route') or revalidateTag('tag') to purge cache on mutations!",
    steps: [
      {
        stepNumber: 1,
        title: "Level 1: Request Memoization",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Multiple fetch() calls to the same URL in the same render cycle only execute ONCE.",
        icon: "🧠",
        badge: "Single Render Cycle",
      },
      {
        stepNumber: 2,
        title: "Level 2: Next.js Data Cache",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Stores fetch responses across multiple incoming requests and user sessions.",
        icon: "🗄️",
        badge: "Cross-Request Cache",
        codeSnippet: "fetch(url, { next: { revalidate: 60 } })",
      },
      {
        stepNumber: 3,
        title: "Level 3: Full Route Cache",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "Caches the entire static HTML and RSC payload at build time.",
        icon: "🌐",
        badge: "Static Page Cache",
      },
      {
        stepNumber: 4,
        title: "Level 4: Client Router Cache",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "Stores visited routes inside user's browser tab for instant back/forward navigation.",
        icon: "💾",
        badge: "In-Browser Tab",
      },
    ],
    lanes: [
      {
        name: "Server & CDN Layers",
        emoji: "🖥️",
        color: "lavender",
        items: [
          { name: "Request Memoization", role: "Deduplicates duplicate fetch calls" },
          { name: "Data Cache", role: "Persists fetch() data on disk/memory" },
          { name: "Full Route Cache", role: "Stores pre-baked HTML output" },
        ],
      },
      {
        name: "Client Layer",
        emoji: "💻",
        color: "sky",
        items: [
          { name: "Router Cache", role: "Stores visited route segments in browser memory" },
        ],
      },
    ],
  },

  // UNIT 3
  "route-handlers-and-apis": {
    topicId: "route-handlers-and-apis",
    title: "Route Handler (route.js) REST API Flowchart",
    subtitle: "How Next.js handles GET, POST, PUT, DELETE HTTP methods without Express.js",
    category: "API Architecture",
    washiColor: "honey",
    ruleOfThumb: "Use route.js for public webhooks & mobile apps; use Server Actions for website UI forms!",
    steps: [
      {
        stepNumber: 1,
        title: "External Client Sends HTTP Request",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "A mobile app or webhook sends: POST /api/students with JSON payload.",
        icon: "📤",
        badge: "HTTP POST",
      },
      {
        stepNumber: 2,
        title: "Next.js Routes to app/api/students/route.js",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Matches the URL and invokes the exported function POST(request).",
        icon: "🎯",
        badge: "HTTP Handler",
      },
      {
        stepNumber: 3,
        title: "Reads Payload & Interacts with Database",
        actor: "Database 🗄️",
        actorType: "database",
        description: "Parses await request.json() and inserts record into PostgreSQL / Supabase.",
        icon: "💾",
        badge: "DB Mutation",
        codeSnippet: "const body = await request.json();\nawait db.insert(body);",
      },
      {
        stepNumber: 4,
        title: "Returns NextResponse.json()",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Sends JSON response with status 201 Created and custom headers.",
        icon: "📥",
        badge: "HTTP 201 JSON",
      },
    ],
    lanes: [
      {
        name: "Supported HTTP Methods",
        emoji: "📡",
        color: "honey",
        items: [
          { name: "export async function GET(request)", role: "Fetch / query records" },
          { name: "export async function POST(request)", role: "Create new record" },
          { name: "export async function DELETE(request)", role: "Remove record" },
        ],
      },
      {
        name: "Response Helpers",
        emoji: "📦",
        color: "matcha",
        items: [
          { name: "NextResponse.json({ success: true })", role: "Return JSON payload" },
          { name: "NextResponse.redirect(url)", role: "Redirect external client" },
        ],
      },
    ],
  },

  "server-actions-and-mutations": {
    topicId: "server-actions-and-mutations",
    title: "Server Actions Form Mutation Flowchart",
    subtitle: "Mutating database records directly from forms with zero API boilerplate",
    category: "Data Mutations",
    washiColor: "matcha",
    ruleOfThumb: "Add 'use server' inside your action; call revalidatePath() to update UI instantly!",
    steps: [
      {
        stepNumber: 1,
        title: "Student Submits Form: <form action={addStudent}>",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User fills student name & course and clicks Submit. Works even if JavaScript is disabled!",
        icon: "📝",
        badge: "Form Submit",
      },
      {
        stepNumber: 2,
        title: "Next.js Encrypted Remote Procedure Call",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Next.js sends a secure POST request directly to the 'use server' action function.",
        icon: "🔒",
        badge: "use server RPC",
      },
      {
        stepNumber: 3,
        title: "Server Action Inserts into Database",
        actor: "Database 🗄️",
        actorType: "database",
        description: "Reads formData.get('name') and securely inserts row into the database.",
        icon: "🗄️",
        badge: "Database Write",
      },
      {
        stepNumber: 4,
        title: "revalidatePath() Triggers Automatic Refresh",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Next.js purges cached page HTML and sends updated component list to browser in one roundtrip!",
        icon: "✨",
        badge: "revalidatePath()",
      },
    ],
    lanes: [
      {
        name: "Client Form",
        emoji: "📝",
        color: "sky",
        items: [
          { name: "<form action={myAction}>", role: "Native HTML form binding" },
          { name: "Progressive Enhancement", role: "Functions even before JS loads" },
        ],
      },
      {
        name: "Server Action Execution",
        emoji: "⚡",
        color: "matcha",
        items: [
          { name: "'use server' directive", role: "Marks server-only function" },
          { name: "revalidatePath('/students')", role: "Purges cache & refreshes UI" },
        ],
      },
    ],
  },

  "form-handling-and-validation": {
    topicId: "form-handling-and-validation",
    title: "Form Validation & File Upload Flowchart",
    subtitle: "Validating inputs with useActionState and handling multi-part file uploads",
    category: "Form Architecture",
    washiColor: "sakura",
    ruleOfThumb: "useActionState gives you pending state and server validation errors automatically!",
    steps: [
      {
        stepNumber: 1,
        title: "User Selects File & Fills Input",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Student attaches a PDF document and types their student ID.",
        icon: "📎",
        badge: "Form Input",
      },
      {
        stepNumber: 2,
        title: "useActionState Triggers Server Action",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "Sets isPending = true so the submit button shows a loading spinner.",
        icon: "⏳",
        badge: "isPending: true",
      },
      {
        stepNumber: 3,
        title: "Server Validates Size, Type & Rules",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Checks: file.size < 5MB and file.type === 'application/pdf'.",
        icon: "🛡️",
        badge: "Server Validation",
      },
      {
        stepNumber: 4,
        title: "Returns Validation Error or Success State",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "If invalid: returns { error: 'File too large' }; if valid: uploads to storage bucket.",
        icon: "✅",
        badge: "State Update",
      },
    ],
    lanes: [
      {
        name: "Client State (useActionState)",
        emoji: "⚛️",
        color: "sakura",
        items: [
          { name: "const [state, formAction, isPending]", role: "Tracks errors & pending status" },
          { name: "Display state.error", role: "Renders red error alert" },
        ],
      },
      {
        name: "Server Action Validator",
        emoji: "🔒",
        color: "honey",
        items: [
          { name: "formData.get('file')", role: "Extracts File object" },
          { name: "Zod / Custom Rules", role: "Guarantees safe server input" },
        ],
      },
    ],
  },

  "optimistic-ui-and-transitions": {
    topicId: "optimistic-ui-and-transitions",
    title: "Optimistic UI Updates (useOptimistic) Flowchart",
    subtitle: "0ms instant UI feedback with automatic error rollback",
    category: "Optimistic UI",
    washiColor: "honey",
    ruleOfThumb: "Show the update at 0ms; sync to database in the background; rollback if it fails!",
    steps: [
      {
        stepNumber: 1,
        title: "User Clicks 'Like' or 'Upvote' Button",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User clicks like button on a post.",
        icon: "👍",
        badge: "User Interaction",
      },
      {
        stepNumber: 2,
        title: "0ms: useOptimistic Instantly Bumps Counter",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "The UI updates immediately on screen (0ms delay!). User feels zero lag.",
        icon: "⚡",
        badge: "0ms Instant UI",
      },
      {
        stepNumber: 3,
        title: "Background: startTransition Sends Server Mutation",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Server takes 1,000ms over mobile 4G network to write like to PostgreSQL.",
        icon: "📡",
        badge: "Background Sync",
      },
      {
        stepNumber: 4,
        title: "Resolution: Commit or Automatic Rollback",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "If server succeeds: counter stays permanent. If network fails: counter automatically rolls back to original number!",
        icon: "🛡️",
        badge: "Auto Rollback",
      },
    ],
    lanes: [
      {
        name: "Optimistic Timeline (useOptimistic)",
        emoji: "⚡",
        color: "honey",
        items: [
          { name: "t = 0ms", role: "UI counter updates instantly (+1)" },
          { name: "t = 800ms", role: "Server writes to database" },
          { name: "t = 801ms", role: "Server state confirms value" },
        ],
      },
      {
        name: "Traditional Timeline (Laggy)",
        emoji: "🐢",
        color: "latte",
        items: [
          { name: "t = 0ms", role: "Button clicked; spinner begins" },
          { name: "t = 800ms", role: "User waits for network roundtrip" },
          { name: "t = 801ms", role: "UI finally updates (jarring delay)" },
        ],
      },
    ],
  },

  // UNIT 4
  "authentication-concepts": {
    topicId: "authentication-concepts",
    title: "Secure Session Cookie Authentication Flowchart",
    subtitle: "How HttpOnly cookies prevent XSS attacks while keeping users logged in",
    category: "Authentication",
    washiColor: "lavender",
    ruleOfThumb: "Store tokens in HttpOnly cookies, NEVER in localStorage where JavaScript scripts can steal them!",
    steps: [
      {
        stepNumber: 1,
        title: "User Submits Login Credentials",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User submits email and password via login form.",
        icon: "🔑",
        badge: "POST /login",
      },
      {
        stepNumber: 2,
        title: "Server Verifies Password & Issues Session Cookie",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Compares bcrypt password hash. Issues an encrypted cookie with HttpOnly; SameSite=Lax; Secure.",
        icon: "🍪",
        badge: "HttpOnly Cookie",
      },
      {
        stepNumber: 3,
        title: "Browser Automatically Attaches Cookie on Requests",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Browser securely includes cookie in every request header without client JS touching it.",
        icon: "🔒",
        badge: "Cookie Header",
      },
      {
        stepNumber: 4,
        title: "Server Component Reads User Session",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Server Component calls cookies().get('session') and renders personalized profile.",
        icon: "👤",
        badge: "Authorized View",
      },
    ],
    lanes: [
      {
        name: "HttpOnly Cookie (Secure)",
        emoji: "🛡️",
        color: "matcha",
        items: [
          { name: "Hidden from JavaScript", role: "Immune to XSS cookie theft" },
          { name: "Automatic Header Attachment", role: "Managed natively by browser" },
        ],
      },
      {
        name: "localStorage (Insecure)",
        emoji: "⚠️",
        color: "sakura",
        items: [
          { name: "Readable by any JS snippet", role: "Vulnerable to malicious npm packages" },
          { name: "Unavailable on Server", role: "Causes server hydration mismatch" },
        ],
      },
    ],
  },

  "middleware-and-route-protection": {
    topicId: "middleware-and-route-protection",
    title: "Edge Middleware Route Protection Flowchart",
    subtitle: "How middleware.js guards protected routes in under 5ms before pages render",
    category: "Edge Protection",
    washiColor: "matcha",
    ruleOfThumb: "Run middleware.js at repo root; check auth cookie and redirect unauthorized users before page renders!",
    steps: [
      {
        stepNumber: 1,
        title: "Incoming Request to Protected Route",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User requests '/dashboard' or '/admin'.",
        icon: "🚪",
        badge: "GET /dashboard",
      },
      {
        stepNumber: 2,
        title: "Edge Middleware Intercepts Request (<5ms)",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "middleware.js runs at the edge checkpoint before database or page layout loads.",
        icon: "🛂",
        badge: "Airport Security",
      },
      {
        stepNumber: 3,
        title: "Auth Token Check: Has Valid Cookie?",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "Checks: request.cookies.get('auth-token').",
        icon: "🔍",
        badge: "Cookie Check",
      },
      {
        stepNumber: 4,
        title: "Decision: Allow Through or Redirect",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "If valid: NextResponse.next(). If missing: NextResponse.redirect('/login') immediately!",
        icon: "🚦",
        badge: "NextResponse",
      },
    ],
    lanes: [
      {
        name: "Middleware Checkpoint",
        emoji: "🛂",
        color: "matcha",
        items: [
          { name: "middleware.js", role: "Runs at project root before page" },
          { name: "config.matcher", role: "['/dashboard/:path*', '/admin/:path*']" },
        ],
      },
      {
        name: "Outcomes",
        emoji: "🚦",
        color: "honey",
        items: [
          { name: "NextResponse.next()", role: "Permits request to proceed" },
          { name: "NextResponse.redirect()", role: "Bounces unauthorized traffic" },
        ],
      },
    ],
  },

  "rbac-and-security": {
    topicId: "rbac-and-security",
    title: "Role-Based Access Control (RBAC) Flowchart",
    subtitle: "Enforcing Student vs Teacher vs Admin permissions across pages and actions",
    category: "Security & RBAC",
    washiColor: "honey",
    ruleOfThumb: "Verify role permissions on the server; never trust user role data passed from the client!",
    steps: [
      {
        stepNumber: 1,
        title: "User Authenticates with Server",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User logs in with verified credentials.",
        icon: "👤",
        badge: "User Session",
      },
      {
        stepNumber: 2,
        title: "Server Reads Role from Database / JWT",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Extracts role: 'student' | 'teacher' | 'admin'.",
        icon: "📜",
        badge: "Role Extraction",
      },
      {
        stepNumber: 3,
        title: "Server Action / Page Checks Permission",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "if (user.role !== 'admin') throw new Error('Unauthorized');",
        icon: "🛡️",
        badge: "Role Guard",
      },
      {
        stepNumber: 4,
        title: "Grants or Denies Access",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Admins receive management panel; students see restricted classroom view.",
        icon: "👑",
        badge: "Access Enforced",
      },
    ],
    lanes: [
      {
        name: "Role Hierarchy",
        emoji: "👑",
        color: "honey",
        items: [
          { name: "Admin", role: "Full create, read, update, delete across all records" },
          { name: "Teacher", role: "Grade submissions, post announcements" },
          { name: "Student", role: "Read assignments, submit quizzes" },
        ],
      },
    ],
  },

  "oauth-and-nextauth": {
    topicId: "oauth-and-nextauth",
    title: "OAuth 2.0 Social Login (Google / GitHub) Flowchart",
    subtitle: "How authorization code exchange works securely without sharing passwords",
    category: "OAuth Authentication",
    washiColor: "sky",
    ruleOfThumb: "The authorization code is exchanged server-side for access tokens, never in client JS!",
    steps: [
      {
        stepNumber: 1,
        title: "User Clicks 'Sign in with GitHub'",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Browser redirects to github.com/login/oauth/authorize with Client ID.",
        icon: "🐙",
        badge: "Redirect to Provider",
      },
      {
        stepNumber: 2,
        title: "User Consents on Provider Page",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "User approves requested profile and email access.",
        icon: "🤝",
        badge: "User Consent",
      },
      {
        stepNumber: 3,
        title: "Provider Redirects Back with Temporary Code",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "GitHub sends user back to: /api/auth/callback/github?code=XYZ123.",
        icon: "🎟️",
        badge: "Auth Code",
      },
      {
        stepNumber: 4,
        title: "Server Exchanges Code for Access Token",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Server exchanges code + client secret for user email, creates session cookie.",
        icon: "🔑",
        badge: "Session Created",
      },
    ],
    lanes: [
      {
        name: "OAuth Handshake",
        emoji: "🤝",
        color: "sky",
        items: [
          { name: "Client ID", role: "Public identifier of your application" },
          { name: "Client Secret", role: "Server-only private key (never leaked)" },
          { name: "Callback URL", role: "Registered route handler destination" },
        ],
      },
    ],
  },

  // UNIT 5
  "image-and-font-optimization": {
    topicId: "image-and-font-optimization",
    title: "Next.js Image & Font Optimization Pipeline Flowchart",
    subtitle: "How next/image transforms a 5MB raw image into an instant 45KB WebP asset",
    category: "Asset Optimization",
    washiColor: "matcha",
    ruleOfThumb: "Always use <Image> with width/height to eliminate Cumulative Layout Shift (CLS)!",
    steps: [
      {
        stepNumber: 1,
        title: "Developer Places Raw 5MB PNG in public/",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "High-resolution 4000x3000px camera photo added to the codebase.",
        icon: "📸",
        badge: "5MB Raw PNG",
      },
      {
        stepNumber: 2,
        title: "User Visits from Mobile Device (390px Screen)",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Browser requests the image inside <Image src='/photo.png' />.",
        icon: "📱",
        badge: "Device Detection",
      },
      {
        stepNumber: 3,
        title: "Next.js Sharp Engine Optimizes on Demand",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Next.js resizes to 390px, converts to modern AVIF/WebP, and compresses to 45KB.",
        icon: "⚙️",
        badge: "Sharp Compression",
      },
      {
        stepNumber: 4,
        title: "Lazy Loaded When Scrolled into View",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Images below the fold only download when the user scrolls near them, saving 90% mobile data!",
        icon: "🚀",
        badge: "45KB Delivered",
      },
    ],
    lanes: [
      {
        name: "Next.js Image Optimizer",
        emoji: "🖼️",
        color: "matcha",
        items: [
          { name: "Automatic WebP/AVIF", role: "Modern format conversion" },
          { name: "Responsive Srcset", role: "Serves smaller files to mobile phones" },
          { name: "Zero Layout Shift", role: "Reserves space before image loads" },
        ],
      },
      {
        name: "Next.js Font Optimizer",
        emoji: "🔤",
        color: "honey",
        items: [
          { name: "next/font/google", role: "Downloads font at build time" },
          { name: "Zero Google Requests", role: "Hosted locally; privacy-friendly" },
        ],
      },
    ],
  },

  "metadata-and-seo": {
    topicId: "metadata-and-seo",
    title: "Next.js Dynamic Metadata & Social Sharing Flowchart",
    subtitle: "How search bots and WhatsApp / Twitter generate rich link previews",
    category: "SEO Architecture",
    washiColor: "honey",
    ruleOfThumb: "Export generateMetadata({ params }) for dynamic product and article SEO tags!",
    steps: [
      {
        stepNumber: 1,
        title: "Web Crawler Visits Page URL",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Googlebot or WhatsApp link previewer requests '/courses/nextjs'.",
        icon: "🤖",
        badge: "Search Bot",
      },
      {
        stepNumber: 2,
        title: "generateMetadata() Fetches Course Details",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Server generates title, description, and OpenGraph preview image URL.",
        icon: "🏷️",
        badge: "Metadata Hook",
        codeSnippet: "export async function generateMetadata({ params }) {\n  return { title: '...', openGraph: { ... } };\n}",
      },
      {
        stepNumber: 3,
        title: "Injects <meta> Tags Directly into Initial HTML",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "The tags live inside the very first HTML chunk returned to the crawler.",
        icon: "📄",
        badge: "HTML <head>",
      },
      {
        stepNumber: 4,
        title: "Social Platforms Display Rich Card Preview",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "WhatsApp, Twitter, and LinkedIn immediately show beautiful thumbnail image, title, and synopsis.",
        icon: "🌟",
        badge: "Rich OpenGraph Card",
      },
    ],
    lanes: [
      {
        name: "Metadata API",
        emoji: "🏷️",
        color: "honey",
        items: [
          { name: "export const metadata", role: "Static metadata for standard pages" },
          { name: "export async function generateMetadata", role: "Dynamic metadata based on route params" },
        ],
      },
    ],
  },

  "scripts-and-third-party-libraries": {
    topicId: "scripts-and-third-party-libraries",
    title: "Third-Party Script Loading Strategy Flowchart",
    subtitle: "Preventing Google Analytics and Chat Widgets from freezing user interaction",
    category: "Script Loading",
    washiColor: "lavender",
    ruleOfThumb: "Use strategy='afterInteractive' for analytics; use 'lazyOnload' for chat widgets!",
    steps: [
      {
        stepNumber: 1,
        title: "Critical Page HTML & CSS Load",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User sees primary page text and buttons immediately.",
        icon: "⚡",
        badge: "Critical Path",
      },
      {
        stepNumber: 2,
        title: "Hydration Completes for Main Application",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "Interactive components become responsive to clicks.",
        icon: "⚛️",
        badge: "Hydration Done",
      },
      {
        stepNumber: 3,
        title: "<Script strategy='afterInteractive' /> Executes",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Google Analytics / Tag Manager loads quietly after user interaction is safe.",
        icon: "📊",
        badge: "afterInteractive",
      },
      {
        stepNumber: 4,
        title: "<Script strategy='lazyOnload' /> Defers Heavy Widgets",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Heavy live chat widgets and support bots only download during browser idle time.",
        icon: "💬",
        badge: "lazyOnload",
      },
    ],
    lanes: [
      {
        name: "Next.js Script Strategies",
        emoji: "📜",
        color: "lavender",
        items: [
          { name: "beforeInteractive", role: "Critical scripts needed before page boots (e.g. polyfills)" },
          { name: "afterInteractive (Default)", role: "Analytics, tag managers loaded after page interactive" },
          { name: "lazyOnload", role: "Chat widgets, social embeds loaded during idle time" },
        ],
      },
    ],
  },

  "core-web-vitals-and-performance": {
    topicId: "core-web-vitals-and-performance",
    title: "Core Web Vitals Metric Optimization Pipeline",
    subtitle: "Mastering Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and CLS",
    category: "Performance Metrics",
    washiColor: "matcha",
    ruleOfThumb: "Target LCP < 2.5s, INP < 200ms, and CLS < 0.1 for a green Lighthouse 100 score!",
    steps: [
      {
        stepNumber: 1,
        title: "Largest Contentful Paint (LCP < 2.5s)",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "How fast the main hero content or headline becomes visible.",
        icon: "⏱️",
        badge: "LCP Target < 2.5s",
      },
      {
        stepNumber: 2,
        title: "Interaction to Next Paint (INP < 200ms)",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "How fast the webpage responds when a user taps a button or types in an input.",
        icon: "⚡",
        badge: "INP Target < 200ms",
      },
      {
        stepNumber: 3,
        title: "Cumulative Layout Shift (CLS < 0.1)",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Ensures content doesn't jump around abruptly while images and ads load.",
        icon: "📐",
        badge: "CLS Target < 0.1",
      },
      {
        stepNumber: 4,
        title: "Next.js Built-In Boosts Ensure High Scores",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Server pre-rendering boosts LCP; next/image eliminates CLS; code splitting boosts INP.",
        icon: "🏆",
        badge: "100 Lighthouse",
      },
    ],
    lanes: [
      {
        name: "Google Web Vitals Targets",
        emoji: "🎯",
        color: "matcha",
        items: [
          { name: "LCP: Green < 2.5s", role: "Fast server response + image priority" },
          { name: "INP: Green < 200ms", role: "Lightweight client JS + transitions" },
          { name: "CLS: Green < 0.1", role: "Explicit width/height on media" },
        ],
      },
    ],
  },

  // UNIT 6
  "database-integration": {
    topicId: "database-integration",
    title: "Full-Stack Supabase PostgreSQL Integration Flowchart",
    subtitle: "Direct database access from Server Components and Server Actions",
    category: "Fullstack Database",
    washiColor: "matcha",
    ruleOfThumb: "Query Supabase directly in Server Components; keep SUPABASE_SERVICE_ROLE_KEY private on server!",
    steps: [
      {
        stepNumber: 1,
        title: "Student Navigates to /students Page",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Browser initiates page request.",
        icon: "🌐",
        badge: "Page Request",
      },
      {
        stepNumber: 2,
        title: "Server Component Connects to Supabase",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Direct connection over HTTPS to Supabase PostgreSQL using server credentials.",
        icon: "⚡",
        badge: "Server Connection",
        codeSnippet: "const { data: students } = await supabase.from('students').select('*');",
      },
      {
        stepNumber: 3,
        title: "PostgreSQL Executes Query & Row-Level Security",
        actor: "Database 🗄️",
        actorType: "database",
        description: "Applies database RLS policies and returns student records in under 30ms.",
        icon: "🗄️",
        badge: "PostgreSQL Query",
      },
      {
        stepNumber: 4,
        title: "Server Pre-Renders Table and Returns HTML",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Complete table HTML delivered to student browser. No API routes or CORS needed!",
        icon: "🎉",
        badge: "Pre-Rendered Table",
      },
    ],
    lanes: [
      {
        name: "Next.js Server Layer",
        emoji: "⚡",
        color: "matcha",
        items: [
          { name: "createClient(url, key)", role: "Server-side Supabase client" },
          { name: "Server Actions", role: "Perform insert/update/delete mutations" },
        ],
      },
      {
        name: "Supabase Backend",
        emoji: "🗄️",
        color: "honey",
        items: [
          { name: "PostgreSQL Database", role: "Relational tables and foreign keys" },
          { name: "Row Level Security (RLS)", role: "Database-level user data protection" },
        ],
      },
    ],
  },

  "deployment-and-ci-cd": {
    topicId: "deployment-and-ci-cd",
    title: "Git Push to Global Edge CDN Deployment Pipeline",
    subtitle: "How code moves from your local computer to 300+ Edge cities worldwide",
    category: "Deployment Pipeline",
    washiColor: "sky",
    ruleOfThumb: "Push to main branch; Vercel automatically runs builds and provisions preview URLs!",
    steps: [
      {
        stepNumber: 1,
        title: "Developer Runs 'git push origin main'",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Commits code to GitHub repository.",
        icon: "💻",
        badge: "Git Push",
      },
      {
        stepNumber: 2,
        title: "GitHub Webhook Triggers Vercel CI Build",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "Vercel spins up build container, installs dependencies, runs TypeScript check.",
        icon: "⚙️",
        badge: "CI Container",
      },
      {
        stepNumber: 3,
        title: "Next.js Turbopack Compiles Static & Serverless Assets",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Pre-renders static pages into static assets; packages Server Actions into Serverless Functions.",
        icon: "📦",
        badge: "next build",
      },
      {
        stepNumber: 4,
        title: "Distributed Across 300+ Global Edge Locations",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "Assets deployed to worldwide edge nodes. Custom domain and SSL certificates updated instantly with zero downtime!",
        icon: "🌍",
        badge: "Live Globally",
      },
    ],
    lanes: [
      {
        name: "CI/CD Pipeline",
        emoji: "🚀",
        color: "sky",
        items: [
          { name: "Preview Deployments", role: "Automatic URL for every Git branch/PR" },
          { name: "Production Deployment", role: "Zero-downtime instant traffic switch" },
        ],
      },
      {
        name: "Edge Network",
        emoji: "🌍",
        color: "matcha",
        items: [
          { name: "Global CDN", role: "Static assets served from closest physical city" },
          { name: "Edge Middleware", role: "Runs authentication in <5ms worldwide" },
        ],
      },
    ],
  },

  "monitoring-and-logging": {
    topicId: "monitoring-and-logging",
    title: "Production Observability & Error Logging Pipeline",
    subtitle: "Tracking unhandled errors, latency spikes, and server logs in real time",
    category: "Production Health",
    washiColor: "lavender",
    ruleOfThumb: "Use global-error.js for root failures; stream structured logs with unique request IDs!",
    steps: [
      {
        stepNumber: 1,
        title: "An Unexpected Server Failure Occurs",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "A database timeout or 500 internal error occurs during user request.",
        icon: "💥",
        badge: "Exception Thrown",
      },
      {
        stepNumber: 2,
        title: "Next.js Error Boundary Catches Error",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "error.js captures the error stack, user session ID, and route path.",
        icon: "🛡️",
        badge: "Error Captured",
      },
      {
        stepNumber: 3,
        title: "Dispatches Structured JSON Log to Observability Platform",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "Streams telemetry to Datadog, Sentry, or Axiom with contextual tags.",
        icon: "📡",
        badge: "Telemetry Stream",
      },
      {
        stepNumber: 4,
        title: "Visitor Sees Polite Recovery Screen",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "Visitor sees friendly 'Something went wrong, our team has been notified' screen with a Try Again button.",
        icon: "🧸",
        badge: "Polite Recovery",
      },
    ],
    lanes: [
      {
        name: "Observability Stack",
        emoji: "📊",
        color: "lavender",
        items: [
          { name: "Structured JSON Logs", role: "timestamp, level, route, requestId" },
          { name: "Real User Monitoring (RUM)", role: "Live Core Web Vitals telemetry" },
        ],
      },
    ],
  },

  "advanced-patterns-and-best-practices": {
    topicId: "advanced-patterns-and-best-practices",
    title: "Modern Next.js Production Architecture Flowchart",
    subtitle: "Complete synthesis: Route Handlers + Server Actions + Server Components + Supabase",
    category: "Fullstack Architecture",
    washiColor: "matcha",
    ruleOfThumb: "Keep data reads in Server Components, UI mutations in Server Actions, and webhooks in Route Handlers!",
    steps: [
      {
        stepNumber: 1,
        title: "Data Reads: Server Components",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Fetch and pre-render read-only content directly on the server without client JS.",
        icon: "📖",
        badge: "Read Path",
      },
      {
        stepNumber: 2,
        title: "Internal UI Mutations: Server Actions",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Handle form submissions, button clicks, and optimistic UI updates directly from components.",
        icon: "⚡",
        badge: "Mutation Path",
      },
      {
        stepNumber: 3,
        title: "External Webhooks & Public APIs: Route Handlers",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "Expose app/api/*/route.js endpoints for Stripe webhooks and mobile application clients.",
        icon: "🌐",
        badge: "API Path",
      },
      {
        stepNumber: 4,
        title: "Interactive Islands: Client Components",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "Sprinkle 'use client' only where interactive widgets, animations, and inputs live.",
        icon: "🏝️",
        badge: "Interactive Islands",
      },
    ],
    lanes: [
      {
        name: "The 4 Architecture Pillars",
        emoji: "🏛️",
        color: "matcha",
        items: [
          { name: "Server Components", role: "Default for data fetching & layouts" },
          { name: "Server Actions", role: "Default for forms & database mutations" },
          { name: "Route Handlers", role: "For external APIs & Stripe webhooks" },
          { name: "Client Components", role: "For useState, onClick & browser APIs" },
        ],
      },
    ],
  },
};

// Map all syllabus topic IDs to their rich diagrams
topicDiagramsDatabase["auth-and-protected-routes-concepts"] = {
  ...topicDiagramsDatabase["authentication-concepts"],
  topicId: "auth-and-protected-routes-concepts",
  title: "8-Level Authentication & Protected Routes Flowchart",
  subtitle: "Visual journey from simple login to HttpOnly session cookies, protected routes, and RBAC",
  ruleOfThumb: "Server Components inspect session cookies before rendering — unauthorized visitors are redirected with 0 private HTML leaked!",
};

topicDiagramsDatabase["data-fetching-strategies"] = {
  ...topicDiagramsDatabase["data-fetching-patterns"],
  topicId: "data-fetching-strategies",
};

topicDiagramsDatabase["route-handlers-rest-apis"] = {
  ...topicDiagramsDatabase["route-handlers-and-apis"],
  topicId: "route-handlers-rest-apis",
};

topicDiagramsDatabase["server-actions-mutations"] = {
  ...topicDiagramsDatabase["server-actions-and-mutations"],
  topicId: "server-actions-mutations",
};

topicDiagramsDatabase["forms-validation-uploads"] = {
  ...topicDiagramsDatabase["form-handling-and-validation"],
  topicId: "forms-validation-uploads",
};

topicDiagramsDatabase["optimistic-ui-mutations"] = {
  ...topicDiagramsDatabase["optimistic-ui-and-transitions"],
  topicId: "optimistic-ui-mutations",
};

topicDiagramsDatabase["database-and-orm-concepts"] = {
  ...topicDiagramsDatabase["database-integration"],
  topicId: "database-and-orm-concepts",
};

topicDiagramsDatabase["production-build-deployment"] = {
  ...topicDiagramsDatabase["deployment-and-ci-cd"],
  topicId: "production-build-deployment",
};

topicDiagramsDatabase["advanced-patterns-best-practices"] = {
  ...topicDiagramsDatabase["advanced-patterns-and-best-practices"],
  topicId: "advanced-patterns-best-practices",
};

export function getTopicDiagram(
  topicId: string,
  topicTitle?: string,
  topicSummary?: string
): TopicDiagramData {
  if (topicDiagramsDatabase[topicId]) {
    return topicDiagramsDatabase[topicId];
  }

  // Guaranteed fallback diagram so no topic ever misses visual flowcharts
  return {
    topicId,
    title: `${topicTitle || "Next.js"} Visual Architecture Flowchart`,
    subtitle: topicSummary || "Step-by-step visual request lifecycle and execution pipeline",
    category: "Architecture Pipeline",
    washiColor: "matcha",
    ruleOfThumb: "Next.js executes Server Components on the server and delivers ready HTML to the browser!",
    steps: [
      {
        stepNumber: 1,
        title: "Client Requests Resource",
        actor: "Browser 🌐",
        actorType: "browser",
        description: "User navigates to the page or triggers an interaction.",
        icon: "🌐",
        badge: "Incoming Request",
      },
      {
        stepNumber: 2,
        title: "Next.js Server Processes Route",
        actor: "Next.js Server ⚡",
        actorType: "server",
        description: "App Router resolves the route segments and executes the async Server Component.",
        icon: "⚡",
        badge: "Server Execution",
      },
      {
        stepNumber: 3,
        title: "Data Resolution & Cache Check",
        actor: "Edge CDN ☁️",
        actorType: "edge",
        description: "Fetches required data or retrieves pre-baked payload from Next.js Data Cache.",
        icon: "💾",
        badge: "Cache Check",
      },
      {
        stepNumber: 4,
        title: "Streams Ready View to Client",
        actor: "React Client ⚛️",
        actorType: "client",
        description: "The browser receives ready HTML, hydrates interactive islands, and paints without delay.",
        icon: "🚀",
        badge: "Instant Render",
      },
    ],
    lanes: [
      {
        name: "Client Realm (Browser)",
        emoji: "💻",
        color: "sky",
        items: [
          { name: "User Viewport", role: "Renders UI without layout shift" },
          { name: "React Hydration", role: "Enables event listeners for interactive islands" },
        ],
      },
      {
        name: "Next.js Server Realm",
        emoji: "⚡",
        color: "matcha",
        items: [
          { name: "Server Component", role: "Runs on server with private secrets" },
          { name: "HTML Streaming", role: "Sends instant HTML stream over HTTP" },
        ],
      },
    ],
    comparison: {
      badTitle: "Without Next.js Architecture",
      badFlow: ["1. Empty HTML shell sent to browser", "2. Huge JS bundle downloads slowly", "3. Client makes multiple sequential API requests", "4. Page flickers and shifts layout"],
      goodTitle: "With Next.js App Router",
      goodFlow: ["1. Full HTML pre-rendered on server", "2. Zero client JS needed for static text", "3. Single fast stream directly to viewport", "4. Smooth 60fps instant user experience"],
    },
  };
}
