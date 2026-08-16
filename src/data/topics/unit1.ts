import { TopicContent } from "@/types";

export const unit1Topics: TopicContent[] = [
  {
    id: "intro-and-project-structure",
    unitId: "unit-1",
    title: "Next.js Introduction & Project Structure",
    shortSummary: "What is Next.js, why JavaScript developers need it, and how the App Router folder structure works.",
    order: 1,
    tags: ["Basics", "App Router", "Folder Structure", "TypeScript"],

    simpleExplanation:
      "Imagine you know JavaScript, and you want to build a website. In plain JavaScript or React, you have to manually configure routing, build a separate Express backend server, setup image loaders, figure out SEO, and bundle everything. Next.js is a full-stack React framework that gives you everything in one box. When you create a folder inside the `app` directory, Next.js automatically turns that folder into a webpage route without you having to write any server or router code.",

    whyNeeded:
      "When building React apps with tools like Vite or Create React App, you only get Client-Side Rendering (CSR). This means your browser receives an empty HTML file (`<div id='root'></div>`) and has to download megabytes of JavaScript before anything shows on screen. Search engines (like Google) struggle to index it, and users on slow mobile phones see a blank screen for several seconds. Next.js solves this by rendering HTML directly on the server (Server-Side Rendering and Static Site Generation) and combining frontend UI and backend API routes in a single codebase.",

    reactVsNext: {
      concept: "Project Setup & Page Creation",
      reactWay: {
        title: "Raw React with React Router",
        code: `// In React (Vite / CRA), you must install react-router-dom,
// setup a BrowserRouter in main.jsx, and manually map paths:
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        explanation:
          "In vanilla React, routing is entirely client-side. You have to install third-party libraries (`react-router-dom`), wrap your entire app in context providers, and manually maintain a route configuration list.",
        drawbacks: [
          "HTML sent to the browser is completely empty (`<div id='root'></div>`)",
          "Poor SEO and slow initial load on mobile networks",
          "Routing code grows into a massive, error-prone file as the app scales",
          "Requires a completely separate Node.js/Express server for backend logic",
        ],
      },
      nextjsWay: {
        title: "Next.js App Router Convention",
        code: `// In Next.js App Router, you don't write routing configurations!
// Simply create folders inside the 'app' directory:

// File: src/app/page.tsx  -> Available at URL: http://localhost:3000/
export default function HomePage() {
  return <main><h1>Welcome to Next.js!</h1></main>;
}

// File: src/app/about/page.tsx -> Available at URL: http://localhost:3000/about
export default function AboutPage() {
  return <main><h1>About Our Platform</h1></main>;
}`,
        explanation:
          "In Next.js, folders determine routes automatically. Every folder with a `page.tsx` file instantly becomes a publicly accessible URL.",
        benefits: [
          "Zero router configuration needed",
          "HTML is rendered on the server for instant mobile loading and perfect SEO",
          "Frontend and backend live harmoniously in one single repository",
          "Automatic code splitting: users only download the code for the page they visit",
        ],
      },
      whyDifferent:
        "Next.js eliminates boilerplate routing code and moves rendering to the server where data lives, giving you the fastest possible First Contentful Paint (FCP) and automatic SEO.",
      mentalShiftSummary:
        "Stop thinking: 'I need to install a router and wire up switch statements.' Think: 'I will create a folder and drop a page.tsx inside it.'",
    },

    basicExample: {
      title: "Creating Your First Next.js Page",
      description: "A standard Server Component in Next.js representing the home page.",
      language: "tsx",
      filename: "src/app/page.tsx",
      code: `// src/app/page.tsx
export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Welcome to INT257 Next.js
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        This is a server-rendered page. It was generated on the server before reaching your browser!
      </p>
      <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
        🚀 Current Academic Year: <strong>{currentYear}</strong>
      </div>
    </div>
  );
}`,
      explanation:
        "This component is a Server Component by default. It runs on the server, calculates `currentYear`, and sends fully generated HTML to the browser.",
      outputPreview: "Welcome to INT257 Next.js (with styled Emerald badge showing current year)",
    },

    moreExamples: [
      {
        title: "Next.js Folder Hierarchy & Special Files",
        description: "Understanding how Next.js recognizes special reserved filenames in the app/ directory.",
        language: "typescript",
        filename: "Directory Structure Overview",
        code: `my-next-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Shared wrapper for all pages (Root Layout)
│   │   ├── page.tsx           # Home page UI (/)
│   │   ├── loading.tsx        # Instant loading skeleton
│   │   ├── error.tsx          # Error boundary fallback
│   │   ├── not-found.tsx      # Custom 404 page
│   │   ├── globals.css        # Global Tailwind CSS styles
│   │   ├── about/
│   │   │   └── page.tsx       # About page UI (/about)
│   │   └── api/
│   │       └── hello/
│   │           └── route.ts   # Backend API Endpoint (/api/hello)
│   ├── components/            # Reusable UI components (buttons, cards)
│   └── lib/                   # Utility helpers and database clients
├── public/                    # Static assets (images, svg, fonts)
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript compiler settings`,
        explanation:
          "Special reserved filenames like `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, and `route.ts` have specific built-in superpowers in Next.js.",
      },
      {
        title: "Exporting Custom Components vs Pages",
        description: "How to organize non-page components inside or outside the app directory without accidentally creating routes.",
        language: "tsx",
        filename: "src/components/Header.tsx",
        code: `// src/components/Header.tsx
// Components that are NOT named 'page.tsx' do NOT become routes!
export function Header({ title }: { title: string }) {
  return (
    <header className="border-b border-zinc-800 pb-4 mb-6">
      <span className="text-xs uppercase tracking-widest text-amber-500 font-mono">INT257 Course</span>
      <h2 className="text-xl font-semibold text-zinc-100">{title}</h2>
    </header>
  );
}`,
        explanation:
          "Only files specifically named `page.tsx` (or `route.ts` for APIs) create public URLs. You can freely place helper components anywhere.",
      },
    ],

    multipleWays: [
      {
        name: "App Router (Modern & Recommended)",
        syntax: "src/app/about/page.tsx",
        codeSnippet: `// Modern App Router (Next.js 13, 14, 15, 16)
export default function Page() {
  return <h1>App Router Page</h1>;
}`,
        howItWorks: "Uses the `app/` directory with React Server Components by default, nested layouts, and streaming.",
        pros: ["Server Components by default (zero client JS)", "Nested layouts that preserve state", "Built-in streaming & Suspense support"],
        cons: ["Requires understanding Server vs Client component boundary"],
        whenToUse: "Always use for all new projects and assignments.",
        isRecommended: true,
      },
      {
        name: "Pages Router (Legacy / Older Next.js)",
        syntax: "pages/about.tsx",
        codeSnippet: `// Legacy Pages Router (Next.js 12 and older)
// export async function getServerSideProps() { ... }
export default function About() {
  return <h1>Pages Router Page</h1>;
}`,
        howItWorks: "Uses the `pages/` directory where every file directly mapped to a route and used `getServerSideProps` or `getStaticProps`.",
        pros: ["Older tutorials and legacy codebases use it"],
        cons: ["No React Server Components", "Layouts require custom workarounds", "Larger client JavaScript bundles"],
        whenToUse: "Only when maintaining legacy systems built before 2023.",
        isRecommended: false,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Always choose modern App Router (`src/app`) for all new Next.js development.",
      scenarios: [
        {
          scenario: "You are starting a new project in INT257",
          recommendedApproach: "App Router (`src/app`) with TypeScript",
          reason: "It provides full access to Server Components, Server Actions, streaming layouts, and best performance.",
        },
        {
          scenario: "You are reading an old tutorial mentioning `getServerSideProps`",
          recommendedApproach: "Translate to App Router `async function Page()`",
          reason: "`getServerSideProps` is deprecated in modern App Router; you simply write `async` Server Components now.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Naming the page file index.tsx or About.tsx in App Router",
        badCode: `// ❌ BAD: src/app/about/About.tsx or src/app/about/index.tsx
export default function About() {
  return <h1>About</h1>;
}`,
        goodCode: `// ✅ GOOD: src/app/about/page.tsx
export default function AboutPage() {
  return <h1>About</h1>;
}`,
        whyItBreaks: "In App Router, Next.js only exposes routes for files explicitly named `page.tsx` (or `page.jsx`/`page.js`).",
        howToFix: "Always name your route file `page.tsx` inside its folder.",
      },
      {
        mistakeTitle: "Forgetting the 'default export'",
        badCode: `// ❌ BAD: Named export only
export function HomePage() {
  return <h1>Home</h1>;
}`,
        goodCode: `// ✅ GOOD: Default export is required for page.tsx
export default function HomePage() {
  return <h1>Home</h1>;
}`,
        whyItBreaks: "Next.js expects the default export from `page.tsx` as the React component to render for that URL.",
        howToFix: "Ensure `export default function ...` is present on every `page.tsx` and `layout.tsx`.",
      },
    ],

    bestPractices: [
      {
        title: "Keep Components in a Dedicated Folder",
        rule: "Place shared UI inside `src/components/` and business logic in `src/lib/`.",
        explanation: "This keeps your `app/` directory clean and strictly focused on routing and page layouts.",
      },
      {
        title: "Use Descriptive Component Names",
        rule: "Even though the file is named `page.tsx`, name the function `export default function ContactPage()`.",
        explanation: "This helps React DevTools display readable component names in the debugger rather than generic `Page`.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-1",
        title: "Create a Student Profile Server Page",
        difficulty: "very-easy",
        estimatedMinutes: 5,
        prompt:
          "Write a default-exported React Server Component for `src/app/student/page.tsx` that displays a student name, roll number, and course badge.",
        initialCode: `// Write your Next.js Page component below
export default function StudentPage() {
  // TODO: Return a JSX container with student details
  return (
    <div>
      {/* Add your heading and info here */}
    </div>
  );
}`,
        expectedOutput: "A styled profile card displaying student name, course 'INT257', and academic status.",
        hints: ["Use `export default function`", "Return valid JSX elements like `<h1>` and `<p>`"],
        solutionCode: `export default function StudentPage() {
  const student = {
    name: "Alex Johnson",
    rollNumber: "INT257-2026-089",
    course: "Next.js Fullstack Masterclass",
    status: "Active Student"
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-zinc-100">{student.name}</h1>
        <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-md font-mono">
          {student.status}
        </span>
      </div>
      <p className="text-sm text-zinc-400">Roll No: {student.rollNumber}</p>
      <p className="text-sm text-zinc-300 font-medium">{student.course}</p>
    </div>
  );
}`,
        solutionExplanation:
          "Because this is a Server Component, it renders on the server and sends clean HTML to the client with zero extra JavaScript overhead.",
      },
    ],

    quizzes: [
      {
        id: "u1-q1",
        question: "In Next.js App Router, which filename is required inside a folder to make it accessible as a webpage route?",
        syllabusTopic: "App Router File-Based Routing",
        options: [
          { id: "a", text: "index.tsx", isCorrect: false, explanation: "index.tsx was used in Pages Router, but App Router requires page.tsx." },
          { id: "b", text: "page.tsx", isCorrect: true, explanation: "Correct! Only folders containing a page.tsx file become publicly reachable routes." },
          { id: "c", text: "route.tsx", isCorrect: false, explanation: "route.ts is used for backend API Route Handlers, not UI pages." },
          { id: "d", text: "view.tsx", isCorrect: false, explanation: "view.tsx is not a reserved Next.js filename." },
        ],
        conceptualExplanation:
          "In Next.js App Router, `page.tsx` defines the unique UI for a route. Other reserved filenames include `layout.tsx` (shared UI), `loading.tsx` (Suspense fallback), and `error.tsx` (error boundary).",
      },
      {
        id: "u1-q2",
        question: "Why does Next.js render HTML on the server compared to standard Create React App (CSR)?",
        syllabusTopic: "SSR vs CSR Mental Model",
        options: [
          { id: "a", text: "To prevent JavaScript from ever running in the browser", isCorrect: false, explanation: "JavaScript still runs on the client for interactivity (hydration)." },
          { id: "b", text: "To give instant First Contentful Paint and allow search engines to read the content", isCorrect: true, explanation: "Correct! Pre-rendered HTML is ready immediately for users and Google crawlers." },
          { id: "c", text: "Because React does not support HTML", isCorrect: false, explanation: "React always outputs DOM elements." },
          { id: "d", text: "To make CSS files mandatory", isCorrect: false, explanation: "CSS styling is independent of rendering method." },
        ],
        conceptualExplanation:
          "Server-side rendering ensures that when a user requests a URL, the server sends complete HTML markup immediately, improving mobile performance and search engine indexing.",
      },
    ],

    realWorldExample: {
      domain: "Modern E-Learning Platform",
      description: "How a university portal structures its course directory using Next.js App Router.",
      code: {
        title: "Course Catalog Landing Page",
        description: "Server Component fetching semester courses and displaying them in a grid.",
        language: "tsx",
        filename: "src/app/courses/page.tsx",
        code: `// src/app/courses/page.tsx
interface Course {
  code: string;
  name: string;
  credits: number;
}

const COURSES: Course[] = [
  { code: "INT257", name: "Next.js Fullstack Web Development", credits: 4 },
  { code: "INT219", name: "Modern Front-End Frameworks", credits: 3 },
  { code: "CSE320", name: "Distributed Cloud Systems", credits: 4 },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Academic Course Catalog</h1>
        <p className="text-zinc-400 text-sm">Browse approved university modules for the current semester.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course) => (
          <div key={course.code} className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/50 transition-colors">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
              {course.code}
            </span>
            <h2 className="mt-2 font-medium text-zinc-200">{course.name}</h2>
            <p className="mt-1 text-xs text-zinc-500">{course.credits} Credits • Core Curriculum</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      keyTakeaway: "By using Next.js App Router, the entire course catalog is rendered into fast HTML on the server before reaching the student's browser.",
    },

    combinedExample: {
      combinedTopics: ["App Router Structure", "TypeScript Interfaces", "Server Components"],
      title: "Full Course Overview Card with Dynamic Stats",
      description: "Combining clean folder convention with TypeScript props and server-rendered status badges.",
      code: {
        title: "Complete Server Page Component",
        description: "A production-ready Next.js page component with clean styling and TypeScript types.",
        language: "tsx",
        filename: "src/app/int257/page.tsx",
        code: `export default function INT257OverviewPage() {
  const unitsCount = 6;
  const practicalProjects = 5;

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-mono uppercase text-emerald-400">Live Syllabus</span>
      </div>
      <h1 className="text-2xl font-bold text-zinc-100">INT257: Next.js Comprehensive Syllabus</h1>
      <p className="text-zinc-400 text-sm leading-relaxed">
        Master modern Next.js from foundational App Router routing to full-stack Supabase integration and production deployment.
      </p>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50">
          <span className="text-2xl font-bold text-amber-400">{unitsCount}</span>
          <p className="text-xs text-zinc-400">Core Units</p>
        </div>
        <div className="p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50">
          <span className="text-2xl font-bold text-emerald-400">{practicalProjects}</span>
          <p className="text-xs text-zinc-400">Hands-on Projects</p>
        </div>
      </div>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Create folder `src/app/int257/`",
        "Add `page.tsx` with a default exported component",
        "Run `npm run dev` and navigate to `http://localhost:3000/int257`",
        "Observe instant server-rendered HTML delivery",
      ],
    },
  },

  {
    id: "file-based-routing",
    unitId: "unit-1",
    title: "File-Based & Dynamic Routing",
    shortSummary: "Learn how folder names map to URLs, dynamic route parameters ([slug]), catch-all routes ([...all]), and optional catch-all routes.",
    order: 2,
    tags: ["Dynamic Routes", "Slug Parameters", "Catch-All", "URL Mapping"],

    simpleExplanation:
      "In JavaScript and regular web development, if you have 1,000 blog posts, you don't create 1,000 separate HTML files. Instead, you create ONE template that reads the post ID from the URL. In Next.js, you do this by naming a folder with square brackets like `[slug]` or `[id]`. When a user visits `/blog/nextjs-tutorial`, Next.js passes `nextjs-tutorial` as a parameter to your `page.tsx` component automatically!",

    whyNeeded:
      "Real-world web apps (e-commerce, blogs, social networks, university student records) need dynamic URLs (e.g. `/products/iphone-16` or `/students/1042`). Without dynamic routing, you would have to write complex regular expressions or manual URL parsing logic.",

    reactVsNext: {
      concept: "Dynamic URL Parameters",
      reactWay: {
        title: "React Router useParams() Hook",
        code: `// React Router (Client-side only)
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams(); // Reads parameter on the client browser

  // Requires useEffect to fetch data after page loads:
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(\`/api/products/\${id}\`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading product...</p>;
  return <h1>{product.name}</h1>;
}`,
        explanation:
          "In vanilla React, dynamic parameters are only available on the client through hooks (`useParams()`). You have to display a loading spinner while fetching data in `useEffect`.",
        drawbacks: [
          "Waterfall loading: component mounts -> shows spinner -> fetches data -> re-renders",
          "SEO crawler sees 'Loading product...' instead of the actual product",
          "Requires client-side state management for simple URL parameters",
        ],
      },
      nextjsWay: {
        title: "Next.js Dynamic Route Props (Server Component)",
        code: `// Next.js App Router: src/app/products/[id]/page.tsx
// The folder name [id] automatically injects params into the page props!

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params; // In Next.js 15+, params is an async Promise

  // Direct server data fetch - NO useEffect, NO loading spinners!
  const product = await getProductFromDatabase(id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-zinc-400">{product.description}</p>
    </main>
  );
}`,
        explanation:
          "In Next.js, `params` is passed directly as a prop to your page component on the server. You can fetch data directly with `await` before rendering.",
        benefits: [
          "Zero waterfall loading spinners: complete HTML with data is sent instantly",
          "Direct access to database or external APIs right inside the component",
          "Automatic type safety with TypeScript",
        ],
      },
      whyDifferent:
        "Next.js resolves dynamic route parameters on the server before rendering the page, allowing immediate server-side data fetching without client-side waterfalls.",
      mentalShiftSummary:
        "Folder name `[id]` = URL segment. The page component receives `{ params }` prop directly.",
    },

    basicExample: {
      title: "Dynamic Student Profile Route",
      description: "Extracting a dynamic student ID from the URL and rendering student information.",
      language: "tsx",
      filename: "src/app/students/[id]/page.tsx",
      code: `// File path: src/app/students/[id]/page.tsx
// Matches URLs like: /students/101, /students/102, /students/abc

interface StudentPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailPage({ params }: StudentPageProps) {
  const { id } = await params;

  return (
    <div className="p-6 max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
      <span className="text-xs font-mono px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded">
        Route Param: [id]
      </span>
      <h1 className="text-2xl font-bold text-zinc-100">Student Profile #{id}</h1>
      <p className="text-zinc-400 text-sm">
        Next.js extracted the parameter <strong>"{id}"</strong> from the URL path.
      </p>
    </div>
  );
}`,
      explanation:
        "When a user visits `/students/42`, Next.js routes to this file and assigns `{ id: '42' }` inside `params`.",
      outputPreview: "Student Profile #42 with highlighted parameter badge.",
    },

    moreExamples: [
      {
        title: "Catch-All Routes ([...slug])",
        description: "Matching multiple nested URL segments (e.g., /docs/routing/dynamic-routes/catch-all).",
        language: "tsx",
        filename: "src/app/docs/[...slug]/page.tsx",
        code: `// File path: src/app/docs/[...slug]/page.tsx
// Matches: /docs/a, /docs/a/b, /docs/a/b/c

interface DocsProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: DocsProps) {
  const { slug } = await params; // slug is an array of strings! e.g. ["routing", "dynamic-routes"]

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Documentation Reader</h1>
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <span>Path Breadcrumb:</span>
        {slug.map((segment, index) => (
          <span key={index} className="px-2 py-0.5 bg-zinc-800 rounded text-emerald-400 font-mono">
            /{segment}
          </span>
        ))}
      </div>
    </div>
  );
}`,
        explanation:
          "Adding three dots `[...slug]` creates a Catch-All route. `slug` becomes an array containing all subsequent URL segments.",
      },
      {
        title: "Optional Catch-All Routes ([[...slug]])",
        description: "Matching both the root URL (/shop) AND any sub-paths (/shop/clothes/shirts).",
        language: "tsx",
        filename: "src/app/shop/[[...categories]]/page.tsx",
        code: `// File path: src/app/shop/[[...categories]]/page.tsx
// Matches: /shop (categories is undefined), /shop/shoes, /shop/shoes/nike

interface ShopProps {
  params: Promise<{ categories?: string[] }>;
}

export default async function ShopPage({ params }: ShopProps) {
  const { categories } = await params;

  if (!categories || categories.length === 0) {
    return <h1>All Products Catalog</h1>;
  }

  return <h1>Browsing Category: {categories.join(" > ")}</h1>;
}`,
        explanation:
          "Double brackets `[[...categories]]` make the catch-all optional, so the base `/shop` route also renders this same component without needing a separate `page.tsx`.",
      },
    ],

    multipleWays: [
      {
        name: "Standard Dynamic Segment ([slug])",
        syntax: "app/blog/[slug]/page.tsx",
        codeSnippet: `// Matches /blog/hello-world
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div>Post: {slug}</div>;
}`,
        howItWorks: "Captures a single URL segment.",
        pros: ["Simple and explicit", "Most common pattern for blogs, products, and user IDs"],
        cons: ["Does not match nested paths like /blog/2026/08/hello"],
        whenToUse: "Use for standard single-parameter dynamic pages.",
        isRecommended: true,
      },
      {
        name: "Catch-All Segment ([...slug])",
        syntax: "app/docs/[...slug]/page.tsx",
        codeSnippet: `// Matches /docs/intro/getting-started
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <div>Deep Path: {slug.join("/")}</div>;
}`,
        howItWorks: "Captures one or more trailing URL segments as an array.",
        pros: ["Handles arbitrary nested hierarchies like documentation or file trees"],
        cons: ["Does not match the parent URL /docs unless using optional catch-all"],
        whenToUse: "Use for CMS hierarchies, wikis, and multi-level category trees.",
      },
      {
        name: "Optional Catch-All ([[...slug]])",
        syntax: "app/docs/[[...slug]]/page.tsx",
        codeSnippet: `// Matches BOTH /docs AND /docs/a/b
export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  return <div>Docs Root or Section: {slug?.join("/") ?? "Home"}</div>;
}`,
        howItWorks: "Captures zero, one, or multiple URL segments.",
        pros: ["Single file handles both the index landing page and all sub-routes"],
        cons: ["Requires conditional logic to handle empty array/undefined state"],
        whenToUse: "When index page and detail pages share the same template.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `[id]` for single entities, `[...slug]` for deep docs, and `[[...slug]]` for unified catalogs.",
      scenarios: [
        {
          scenario: "Showing a single blog post: `/posts/how-to-learn-nextjs`",
          recommendedApproach: "Standard Dynamic Route `app/posts/[slug]/page.tsx`",
          reason: "Each post has exactly one slug identifier.",
        },
        {
          scenario: "Building a documentation viewer with nested folders: `/docs/getting-started/installation/macos`",
          recommendedApproach: "Catch-All Route `app/docs/[...slug]/page.tsx`",
          reason: "The depth of the path is unknown and can be 1, 2, 3, or more levels deep.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Forgetting that 'params' is an asynchronous Promise in Next.js 15+",
        badCode: `// ❌ BAD in Next.js 15/16: Accessing params directly synchronously
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>{params.slug}</h1>; // Generates runtime warning or error!
}`,
        goodCode: `// ✅ GOOD in Next.js 15/16: Await the params Promise
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}`,
        whyItBreaks: "In modern Next.js, `params` and `searchParams` are asynchronous Promises to support upcoming streaming compiler optimizations.",
        howToFix: "Make your page component `async` and `await params`.",
      },
    ],

    bestPractices: [
      {
        title: "Strongly Type Your Route Parameters",
        rule: "Always create a TypeScript interface for `PageProps` with `Promise<{ paramName: string }>`.",
        explanation: "Prevents runtime bugs and enables auto-completion across your codebase.",
      },
      {
        title: "Validate Params and Trigger notFound()",
        rule: "If a user requests an ID that does not exist in your database, call `notFound()` from `next/navigation`.",
        explanation: "This automatically displays your custom `not-found.tsx` page and sends a proper 404 HTTP status code.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-2",
        title: "Build a Dynamic Unit Lesson Viewer",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write an async Server Component for `src/app/units/[unitId]/lessons/[lessonId]/page.tsx` that extracts both `unitId` and `lessonId` from params and displays them.",
        initialCode: `// src/app/units/[unitId]/lessons/[lessonId]/page.tsx
interface LessonPageProps {
  // TODO: Define TypeScript interface for async params
}

export default async function LessonPage({ params }: LessonPageProps) {
  // TODO: Await params and return styled JSX
  return (
    <div>
      {/* Show unit and lesson info */}
    </div>
  );
}`,
        expectedOutput: "A lesson viewer card displaying Unit ID and Lesson ID formatted cleanly.",
        hints: ["Define `params: Promise<{ unitId: string; lessonId: string }>`", "Use `const { unitId, lessonId } = await params;`"],
        solutionCode: `interface LessonPageProps {
  params: Promise<{ unitId: string; lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { unitId, lessonId } = await params;

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
      <div className="flex gap-2">
        <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono">
          Unit: {unitId}
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
          Lesson: {lessonId}
        </span>
      </div>
      <h1 className="text-xl font-bold text-zinc-100">
        Active Lesson: {lessonId.replace(/-/g, " ").toUpperCase()}
      </h1>
      <p className="text-zinc-400 text-sm">
        Currently studying syllabus unit {unitId}.
      </p>
    </div>
  );
}`,
        solutionExplanation:
          "Next.js allows nesting multiple dynamic folders (e.g. `[unitId]` and `[lessonId]`). Both parameters are combined into the single `params` object.",
      },
    ],

    quizzes: [
      {
        id: "u1-q3",
        question: "Which folder name creates a Catch-All route that matches `/shop/shoes/running/nike`?",
        syllabusTopic: "Catch-All Routing",
        options: [
          { id: "a", text: "src/app/shop/[slug]/page.tsx", isCorrect: false, explanation: "[slug] only matches a single segment like /shop/shoes." },
          { id: "b", text: "src/app/shop/[...slug]/page.tsx", isCorrect: true, explanation: "Correct! The spread syntax [...slug] captures all subsequent nested path segments as an array." },
          { id: "c", text: "src/app/shop/*slug/page.tsx", isCorrect: false, explanation: "Asterisk is not valid Next.js syntax." },
          { id: "d", text: "src/app/shop/(slug)/page.tsx", isCorrect: false, explanation: "(slug) with parentheses creates a Route Group, not a dynamic segment." },
        ],
        conceptualExplanation:
          "`[...slug]` captures all trailing path segments as an array of strings: `['shoes', 'running', 'nike']`.",
      },
    ],

    realWorldExample: {
      domain: "SaaS Multi-Tenant Organization Workspace",
      description: "How modern platforms route users into isolated workspaces (e.g. `acme.app.com/dashboard/projects/p-98`).",
      code: {
        title: "Workspace Project Viewer",
        description: "Dynamic route extracting team slug and project ID.",
        language: "tsx",
        filename: "src/app/orgs/[orgSlug]/projects/[projectId]/page.tsx",
        code: `interface OrgProjectProps {
  params: Promise<{ orgSlug: string; projectId: string }>;
}

export default async function OrgProjectPage({ params }: OrgProjectProps) {
  const { orgSlug, projectId } = await params;

  return (
    <div className="p-6 border border-zinc-800 bg-zinc-900 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-zinc-500 uppercase tracking-wide">Organization</span>
          <h2 className="text-lg font-bold text-emerald-400">{orgSlug}</h2>
        </div>
        <div className="text-right">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">Project ID</span>
          <h2 className="text-lg font-bold text-amber-400">#{projectId}</h2>
        </div>
      </div>
      <p className="text-sm text-zinc-400">
        Loading isolated tenant configuration and team permissions for {orgSlug}.
      </p>
    </div>
  );
}`,
      },
      keyTakeaway: "Nested dynamic parameters allow building multi-tenant SaaS dashboards with zero configuration routing.",
    },

    combinedExample: {
      combinedTopics: ["Dynamic Routes", "Error Handling", "TypeScript"],
      title: "Dynamic Product Route with 404 Guard",
      description: "Validating parameter existence and triggering notFound() when an ID is invalid.",
      code: {
        title: "Safe Dynamic Route with notFound()",
        description: "Handling missing records gracefully with Next.js built-in notFound function.",
        language: "tsx",
        filename: "src/app/products/[id]/page.tsx",
        code: `import { notFound } from "next/navigation";

const VALID_PRODUCT_IDS = ["1", "2", "3"];

interface ProductProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductProps) {
  const { id } = await params;

  // If the product ID is not found in database, trigger 404 immediately
  if (!VALID_PRODUCT_IDS.includes(id)) {
    notFound(); // Next.js will render the nearest not-found.tsx file!
  }

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
      <h1 className="text-xl font-bold text-zinc-100">Product Details: #{id}</h1>
      <p className="text-emerald-400 text-sm mt-1">✓ Product is in stock and available.</p>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "User navigates to `/products/999`",
        "Page component checks database/array",
        "Calls `notFound()`",
        "Next.js renders `not-found.tsx` with HTTP 404 status",
      ],
    },
  },

  {
    id: "layouts-and-nested-routes",
    unitId: "unit-1",
    title: "Layouts, Templates & Nested Routes",
    shortSummary: "Master shared UI with layout.tsx, understand root vs nested layouts, and learn the critical difference between layout.tsx and template.tsx.",
    order: 3,
    tags: ["Layouts", "Nested Routes", "Templates", "State Preservation"],

    simpleExplanation:
      "Imagine every page on your website needs the exact same navigation bar at the top and footer at the bottom. In plain HTML or basic React, you would have to copy and paste the `<Navbar />` on every single page, causing it to re-render and lose its state whenever you switch pages. In Next.js, you create a `layout.tsx` file. Next.js wraps all your pages inside this layout automatically, and when a user clicks between pages, the layout NEVER re-renders or unmounts!",

    whyNeeded:
      "Without layouts, navigating between pages destroys DOM state (such as an open search input, audio player, or scroll position). Next.js layouts preserve state and only re-render the changing inner page, drastically improving speed and user experience.",

    reactVsNext: {
      concept: "Shared Navigation & Layout Shell",
      reactWay: {
        title: "React Manual Layout Wrapping",
        code: `// In React Router, you create an Outlet or manually wrap pages:
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

// Every route must be nested under this layout in JSX:
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Route>`,
        explanation:
          "In vanilla React, you must configure layout nesting inside your router file. Adding a sub-layout (e.g. a Dashboard sidebar) requires complex nested route definitions.",
        drawbacks: [
          "Manual router JSX maintenance",
          "Hard to isolate nested sub-layouts for specific sections of the site",
          "Re-renders can occur easily if router context changes",
        ],
      },
      nextjsWay: {
        title: "Next.js Automatic File-Based Layouts",
        code: `// Root Layout: src/app/layout.tsx (Applies to EVERY page)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// Nested Sub-Layout: src/app/dashboard/layout.tsx (Applies ONLY to /dashboard/*)
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}`,
        explanation:
          "In Next.js, simply placing a `layout.tsx` file in ANY folder automatically creates a shared UI shell for that folder and all its subfolders.",
        benefits: [
          "Zero router configuration",
          "True nested layouts: RootLayout -> DashboardLayout -> Page",
          "Preserves state (e.g. an ongoing video playback or sidebar collapse state does NOT reset)",
          "Performs partial rendering (only the `{children}` changes on navigation)",
        ],
      },
      whyDifferent:
        "Next.js treats layouts as persistent UI boundaries that never unmount during page transitions within the same layout subtree.",
      mentalShiftSummary:
        "Put persistent UI (Navbars, Sidebars, Footers) in `layout.tsx`. The page content goes into `{children}`.",
    },

    basicExample: {
      title: "Creating a Nested Dashboard Layout",
      description: "A dashboard sub-layout providing a persistent sidebar for all dashboard sub-pages.",
      language: "tsx",
      filename: "src/app/dashboard/layout.tsx",
      code: `// src/app/dashboard/layout.tsx
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-[400px] border border-zinc-800 rounded-xl overflow-hidden">
      {/* Persistent Sidebar */}
      <aside className="w-full md:w-56 bg-zinc-900/80 p-4 border-b md:border-b-0 md:border-r border-zinc-800 space-y-3">
        <h2 className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
          Dashboard Nav
        </h2>
        <nav className="flex flex-col gap-1 text-sm">
          <Link href="/dashboard" className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
            Overview
          </Link>
          <Link href="/dashboard/settings" className="px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200">
            Settings
          </Link>
          <Link href="/dashboard/analytics" className="px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200">
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Dynamic Page Content */}
      <main className="flex-1 p-6 bg-zinc-950">
        {children}
      </main>
    </div>
  );
}`,
      explanation:
        "When switching between `/dashboard`, `/dashboard/settings`, and `/dashboard/analytics`, the sidebar remains mounted and never flashes.",
      outputPreview: "Two-column dashboard layout with persistent sidebar and dynamic inner page area.",
    },

    moreExamples: [
      {
        title: "layout.tsx vs template.tsx: The Critical Difference",
        description: "When you want state to reset and animations to re-trigger on every page navigation.",
        language: "tsx",
        filename: "src/app/template.tsx",
        code: `// src/app/template.tsx
// Unlike layout.tsx, a template.tsx creates a NEW instance on every navigation!

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fadeIn">
      {/* This component re-mounts on every route change */}
      {children}
    </div>
  );
}`,
        explanation:
          "`layout.tsx` preserves state and does not re-mount. `template.tsx` unmounts and re-mounts on navigation, making it ideal for page enter animations and `useEffect` logging.",
      },
    ],

    multipleWays: [
      {
        name: "Root Layout (Mandatory)",
        syntax: "src/app/layout.tsx",
        codeSnippet: `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
        howItWorks: "The topmost layout of the entire application. Must define `<html>` and `<body>` tags.",
        pros: ["Shared across 100% of routes", "Injects global fonts, themes, and analytics"],
        cons: ["Cannot be unmounted"],
        whenToUse: "Required in every Next.js App Router project.",
        isRecommended: true,
      },
      {
        name: "Nested Sub-Layouts",
        syntax: "src/app/admin/layout.tsx",
        codeSnippet: `export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell"><AdminBar />{children}</div>;
}`,
        howItWorks: "Wraps only the routes inside its folder (`/admin`, `/admin/users`, etc.).",
        pros: ["Isolates specialized UI to specific sections", "Avoids cluttering the root layout"],
        cons: ["Inherits all parent layouts above it"],
        whenToUse: "For dashboards, admin panels, documentation sidebars, and user settings.",
        isRecommended: true,
      },
      {
        name: "Template (template.tsx)",
        syntax: "src/app/template.tsx",
        codeSnippet: `export default function Template({ children }: { children: React.ReactNode }) {
  return <div key={Math.random()}>{children}</div>;
}`,
        howItWorks: "Re-instantiates its component and state on every navigation.",
        pros: ["Triggers CSS enter animations on each page", "Resets form inputs between pages"],
        cons: ["Loses state between page transitions"],
        whenToUse: "When you explicitly want state reset or enter/exit animations.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Default to `layout.tsx` 99% of the time. Use `template.tsx` only when you need fresh re-mounts.",
      scenarios: [
        {
          scenario: "You have a persistent media player or search bar that shouldn't reset",
          recommendedApproach: "Use `layout.tsx`",
          reason: "Layouts preserve state across page transitions.",
        },
        {
          scenario: "You need page transition animations (CSS fade-in) on every page click",
          recommendedApproach: "Use `template.tsx`",
          reason: "Templates re-mount on navigation, triggering CSS animations.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Defining <html> and <body> in a nested layout",
        badCode: `// ❌ BAD: src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}`,
        goodCode: `// ✅ GOOD: Only the Root Layout (src/app/layout.tsx) defines <html> and <body>
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-container">
      {children}
    </div>
  );
}`,
        whyItBreaks: "Nested layouts are inserted INSIDE the root layout's `<body>`. Adding additional `<html>` tags creates invalid HTML DOM nesting.",
        howToFix: "Only put `<html>` and `<body>` in `src/app/layout.tsx`.",
      },
    ],

    bestPractices: [
      {
        title: "Pass Server Data Down Seamlessly",
        rule: "Layouts can be asynchronous Server Components that fetch data (e.g. user profile or site configuration) once.",
        explanation: "Since layouts don't re-render on sub-page navigation, data fetched in a layout is reused efficiently.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-3",
        title: "Build a Two-Column Course Unit Layout",
        difficulty: "medium",
        estimatedMinutes: 10,
        prompt:
          "Create a nested layout component for `src/app/units/layout.tsx` that displays a top banner with an Amber accent badge and renders `{children}` underneath.",
        initialCode: `// src/app/units/layout.tsx
export default function UnitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add banner and wrap children
  return (
    <div>
      {children}
    </div>
  );
}`,
        expectedOutput: "A banner stating 'INT257 Syllabus Navigator' above the page children.",
        hints: ["Accept `{ children }: { children: React.ReactNode }`", "Style the container with Tailwind borders"],
        solutionCode: `export default function UnitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-zinc-900 border-l-4 border-amber-500 rounded-r-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase">INT257 Syllabus Navigator</span>
          <h2 className="text-base font-semibold text-zinc-100">Official Course Units & Topics</h2>
        </div>
        <span className="text-xs px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded font-mono">Units 1 - 6</span>
      </div>
      <div className="min-h-[300px]">
        {children}
      </div>
    </div>
  );
}`,
        solutionExplanation:
          "This layout will now automatically wrap every unit page (`/units/unit-1`, `/units/unit-2`, etc.) with the header banner.",
      },
    ],

    quizzes: [
      {
        id: "u1-q4",
        question: "What is the primary difference between layout.tsx and template.tsx in Next.js?",
        syllabusTopic: "Layouts vs Templates",
        options: [
          { id: "a", text: "layout.tsx is for CSS, template.tsx is for JavaScript", isCorrect: false, explanation: "Both are standard React components." },
          { id: "b", text: "layout.tsx preserves state and does not re-mount on navigation, while template.tsx re-mounts on every route change", isCorrect: true, explanation: "Correct! Layouts preserve state and don't re-render, whereas templates create a new DOM instance every time." },
          { id: "c", text: "template.tsx only works on mobile devices", isCorrect: false, explanation: "Templates work across all environments." },
          { id: "d", text: "layout.tsx can only be used once in the entire application", isCorrect: false, explanation: "Layouts can be nested in any folder." },
        ],
        conceptualExplanation:
          "`layout.tsx` is ideal for persistent navigation bars and sidebars. `template.tsx` is used when you need fresh component mounting, like page enter animations or resetting user form inputs.",
      },
    ],

    realWorldExample: {
      domain: "E-Commerce Customer Portal",
      description: "How an online store keeps the cart drawer and account header mounted while browsing through account orders, addresses, and wishlist.",
      code: {
        title: "Account Shell Layout",
        description: "Nested layout for /account routes.",
        language: "tsx",
        filename: "src/app/account/layout.tsx",
        code: `import Link from "next/link";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-6 p-6 max-w-5xl mx-auto">
      <nav className="space-y-1">
        <Link href="/account/orders" className="block px-4 py-2.5 rounded-lg bg-zinc-900 text-zinc-100 hover:border-zinc-700 border border-transparent">
          📦 My Orders
        </Link>
        <Link href="/account/addresses" className="block px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200">
          📍 Addresses
        </Link>
        <Link href="/account/security" className="block px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200">
          🔒 Security & Keys
        </Link>
      </nav>
      <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl">
        {children}
      </div>
    </div>
  );
}`,
      },
      keyTakeaway: "Nested layouts keep navigation fast and flicker-free by preserving the surrounding shell across sub-pages.",
    },

    combinedExample: {
      combinedTopics: ["Root Layout", "Nested Layout", "File-based Routing"],
      title: "Multi-Tier Layout Pipeline",
      description: "How Next.js composes the Root Layout, Admin Layout, and Page component into a single unified HTML tree.",
      code: {
        title: "Layout Composition Tree",
        description: "Visualizing the nested component rendering tree.",
        language: "typescript",
        filename: "Architecture Tree",
        code: `// Route: /admin/analytics
// Next.js automatically nests these files:

<RootLayout>                {/* src/app/layout.tsx (<html>, <body>, Global Nav) */}
  <AdminLayout>             {/* src/app/admin/layout.tsx (Admin Sidebar) */}
    <AnalyticsPage />       {/* src/app/admin/analytics/page.tsx (Page Content) */}
  </AdminLayout>
</RootLayout>`,
      },
      stepByStepFlow: [
        "Browser requests `/admin/analytics`",
        "Next.js renders `RootLayout`",
        "Inside RootLayout `{children}`, Next.js renders `AdminLayout`",
        "Inside AdminLayout `{children}`, Next.js renders `AnalyticsPage`",
      ],
    },
  },

  {
    id: "navigation-and-redirects",
    unitId: "unit-1",
    title: "Navigation, Links & Redirects",
    shortSummary: "Learn fast client-side transitions using next/link, programmatic navigation with useRouter, server-side redirect(), and automatic prefetching.",
    order: 4,
    tags: ["Navigation", "Link Component", "useRouter", "Redirects", "Prefetching"],

    simpleExplanation:
      "In standard HTML, you use `<a href='/about'>`. But when a user clicks a regular `<a>` tag, the browser does a FULL page reload: it unloads everything, flashes a white screen, and downloads the website all over again. Next.js provides the `<Link>` component. When a `<Link>` appears on screen, Next.js secretly pre-downloads the destination page in the background. When the student clicks it, the page change is INSTANTANEOUS with zero browser refresh!",

    whyNeeded:
      "Full page reloads feel sluggish, waste mobile battery, and consume excessive cellular data. `<Link>` enables Single Page Application (SPA) speed with multi-page server rendering architecture.",

    reactVsNext: {
      concept: "Client Navigation Between Pages",
      reactWay: {
        title: "React Router <Link>",
        code: `// React Router DOM
import { Link, useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/about">About</Link>
      <button onClick={() => navigate("/dashboard")}>Go Dashboard</button>
    </nav>
  );
}`,
        explanation:
          "In vanilla React, `<Link to='...'>` changes the browser history without a full reload, but it does NOT perform automatic background prefetching of server bundles.",
        drawbacks: [
          "No built-in prefetching of server-side data",
          "Requires `react-router-dom` dependency",
          "Programmatic navigation only works on client",
        ],
      },
      nextjsWay: {
        title: "Next.js <Link> & Server redirect()",
        code: `// Client Navigation:
import Link from "next/link";

export function NavBar() {
  return (
    <nav>
      {/* Automatically prefetches the /about page in the background! */}
      <Link href="/about">About</Link>
    </nav>
  );
}

// Server-Side Redirect (inside Server Components or Server Actions):
import { redirect } from "next/navigation";

export async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login"); // Immediately redirects before sending HTML to browser
  }
  return <h1>Hello {user.name}</h1>;
}`,
        explanation:
          "Next.js `<Link href='...'>` includes smart viewport prefetching. For server logic, `redirect()` halts execution and sends a 307/308 redirect header to the browser.",
        benefits: [
          "Instant zero-latency page transitions due to intelligent prefetching",
          "Clean `href` prop (uses standard web standards)",
          "Server-side `redirect()` prevents flashes of unauthorized content",
        ],
      },
      whyDifferent:
        "Next.js `<Link>` detects when a link enters the student's mobile screen and pre-loads the page bundle in the background, making clicks feel instantaneous.",
      mentalShiftSummary:
        "Replace `<a href='...'>` with `<Link href='...'>`. Use `useRouter()` for client events, and `redirect()` for server logic.",
    },

    basicExample: {
      title: "Interactive Navigation Bar with next/link",
      description: "A responsive navigation bar using Next.js Link component with active state styling.",
      language: "tsx",
      filename: "src/components/NavBar.tsx",
      code: `import Link from "next/link";

export function NavigationBar() {
  return (
    <header className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
      <Link href="/" className="font-bold text-zinc-100 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span>NextMastery</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link href="/units" className="text-zinc-300 hover:text-emerald-400 transition-colors">
          Syllabus
        </Link>
        <Link href="/projects" className="text-zinc-300 hover:text-emerald-400 transition-colors">
          Projects
        </Link>
        <Link href="/playground" className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all">
          Code Playground
        </Link>
      </nav>
    </header>
  );
}`,
      explanation:
        "When this navigation bar renders, Next.js automatically prefetches `/units`, `/projects`, and `/playground`.",
      outputPreview: "Navigation bar with logo, syllabus link, projects link, and styled playground button.",
    },

    moreExamples: [
      {
        title: "Programmatic Navigation with useRouter Hook",
        description: "Navigating to a new page after a button click or form event on the client.",
        language: "tsx",
        filename: "src/components/SearchBox.tsx",
        code: `"use client"; // useRouter requires a Client Component!

import { useState } from "react";
import { useRouter } from "next/navigation"; // Note: next/navigation, NOT next/router!

export function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(\`/search?q=\${encodeURIComponent(query)}\`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Search syllabus topics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-emerald-500"
      />
      <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-500">
        Search
      </button>
    </form>
  );
}`,
        explanation:
          "In App Router, import `useRouter` from `next/navigation`. Use `router.push('/path')` to navigate programmatically.",
      },
      {
        title: "Server-Side redirect() & permanentRedirect()",
        description: "Redirecting users directly on the server without rendering the page.",
        language: "tsx",
        filename: "src/app/old-syllabus/page.tsx",
        code: `import { permanentRedirect, redirect } from "next/navigation";

// src/app/old-syllabus/page.tsx
export default function OldSyllabusPage() {
  // Returns HTTP 308 Permanent Redirect for SEO crawlers:
  permanentRedirect("/units");
}`,
        explanation:
          "`permanentRedirect` triggers an HTTP 308 response, telling search engines to update their indexed URL.",
      },
    ],

    multipleWays: [
      {
        name: "next/link Component (Declarative)",
        syntax: "<Link href='/path'>Text</Link>",
        codeSnippet: `<Link href="/units/unit-1">Start Unit 1</Link>`,
        howItWorks: "Renders an HTML `<a>` tag with event interception and background prefetching.",
        pros: ["Best for SEO", "Accessible for screen readers", "Automatic prefetching"],
        cons: ["Requires user click"],
        whenToUse: "For all standard navigation links and menus.",
        isRecommended: true,
      },
      {
        name: "useRouter Hook (Imperative Client)",
        syntax: "const router = useRouter(); router.push('/path');",
        codeSnippet: `const router = useRouter();
router.push('/dashboard');`,
        howItWorks: "Programmatically triggers navigation using the browser History API.",
        pros: ["Can be called after async operations or form validation"],
        cons: ["Requires 'use client' directive", "Not crawlable by search engines"],
        whenToUse: "After a client event, timer, or interactive confirmation modal.",
      },
      {
        name: "Server redirect() (Imperative Server)",
        syntax: "redirect('/path');",
        codeSnippet: `import { redirect } from "next/navigation";
if (!isAuthorized) redirect("/forbidden");`,
        howItWorks: "Throws a special Next.js control-flow exception that returns a 307 redirect HTTP response.",
        pros: ["Works inside Server Components and Server Actions", "No client flash"],
        cons: ["Cannot be caught in a standard try/catch block"],
        whenToUse: "For server-side access control, post-action redirection, or URL aliasing.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Always use `<Link>` for clickable UI, `redirect()` for server logic, and `useRouter()` only for custom client event handlers.",
      scenarios: [
        {
          scenario: "You want a user to click a 'View Lesson' button",
          recommendedApproach: "Use `<Link href='/units/...'>`",
          reason: "It provides instant prefetching and semantic HTML `<a>` tags.",
        },
        {
          scenario: "A form was submitted via a Server Action and you want to redirect the user to the success page",
          recommendedApproach: "Call `redirect('/success')` inside the Server Action",
          reason: "The server immediately instructs the browser to load the new URL.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Importing useRouter from 'next/router' instead of 'next/navigation'",
        badCode: `// ❌ BAD in App Router:
import { useRouter } from "next/router"; // Throws: "NextRouter was not mounted" error!`,
        goodCode: `// ✅ GOOD in App Router:
import { useRouter } from "next/navigation";`,
        whyItBreaks: "`next/router` is for the legacy Pages Router. App Router uses `next/navigation`.",
        howToFix: "Always check your import statement and ensure it points to `next/navigation`.",
      },
      {
        mistakeTitle: "Wrapping redirect() in a try/catch block",
        badCode: `// ❌ BAD:
try {
  redirect("/dashboard");
} catch (error) {
  console.log("Error occurred", error); // Catches the redirect and BREAKS IT!
}`,
        goodCode: `// ✅ GOOD: Call redirect outside try/catch or re-throw
redirect("/dashboard");`,
        whyItBreaks: "`redirect()` works internally by throwing a `NEXT_REDIRECT` error. If you catch it, Next.js cannot perform the redirection.",
        howToFix: "Call `redirect()` outside of `try...catch` blocks.",
      },
    ],

    bestPractices: [
      {
        title: "Disable Prefetching on Infrequently Visited Links if Needed",
        rule: "You can pass `prefetch={false}` to `<Link>` if a page is huge or rarely visited.",
        explanation: "Saves network bandwidth on mobile devices with limited data plans.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-4",
        title: "Build a Quick Jump Selector with useRouter",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Create a Client Component dropdown selector that navigates to `/units/[selectedUnit]` whenever the student selects a different unit from the HTML `<select>` element.",
        initialCode: `// Make this a Client Component
import { useRouter } from "next/navigation";

export function UnitSelector() {
  const router = useRouter();

  // TODO: Handle dropdown change and navigate
  return (
    <select>
      <option value="unit-1">Unit 1: Fundamentals</option>
      <option value="unit-2">Unit 2: Rendering</option>
      <option value="unit-3">Unit 3: Server Actions</option>
    </select>
  );
}`,
        expectedOutput: "A styled select dropdown that pushes the browser to the chosen unit page on change.",
        hints: ["Add `'use client'` at the very top", "Add `onChange={(e) => router.push(\`/units/\${e.target.value}\`)}`"],
        solutionCode: `"use client";

import { useRouter } from "next/navigation";

export function UnitSelector() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
      <label htmlFor="unit-select" className="text-sm font-medium text-zinc-300">
        Jump to Unit:
      </label>
      <select
        id="unit-select"
        onChange={(e) => router.push(\`/units/\${e.target.value}\`)}
        className="px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
      >
        <option value="unit-1">Unit 1: App Router & Routing</option>
        <option value="unit-2">Unit 2: Rendering & Data Fetching</option>
        <option value="unit-3">Unit 3: Route Handlers & Server Actions</option>
        <option value="unit-4">Unit 4: Supabase CRUD & Auth Concepts</option>
        <option value="unit-5">Unit 5: SEO, Images & Deployment</option>
        <option value="unit-6">Unit 6: Advanced Architecture & Security</option>
      </select>
    </div>
  );
}`,
        solutionExplanation:
          "Using `router.push()` allows dynamic client-driven navigation triggered by standard browser inputs.",
      },
    ],

    quizzes: [
      {
        id: "u1-q5",
        question: "Why should you use Next.js <Link> instead of standard HTML <a href='...'>?",
        syllabusTopic: "Next.js Navigation",
        options: [
          { id: "a", text: "Because HTML <a> tags are deprecated by W3C", isCorrect: false, explanation: "<a> tags are standard HTML." },
          { id: "b", text: "<Link> enables client-side transitions and background prefetching without full page reload", isCorrect: true, explanation: "Correct! <Link> intercepts clicks and prefetches pages in the viewport for zero latency." },
          { id: "c", text: "<Link> forces the browser to download a new copy of React on every click", isCorrect: false, explanation: "It does the exact opposite: prevents downloading bundles again." },
          { id: "d", text: "<Link> can only navigate to external websites like google.com", isCorrect: false, explanation: "<Link> is specifically optimized for internal routes." },
        ],
        conceptualExplanation:
          "`next/link` prevents the default browser refresh, swaps out the inner page component smoothly, and prefetches linked route bundles in the background.",
      },
    ],

    realWorldExample: {
      domain: "Social Feed Pagination & Tab Navigation",
      description: "How high-traffic feeds navigate between Trending, Latest, and Following tabs with zero latency.",
      code: {
        title: "Tab Navigation Bar",
        description: "Prefetched tab links for instant switching.",
        language: "tsx",
        filename: "src/components/FeedTabs.tsx",
        code: `import Link from "next/link";

export function FeedTabs({ currentTab }: { currentTab: "trending" | "latest" | "bookmarks" }) {
  const tabs = [
    { id: "trending", label: "🔥 Trending", href: "/feed/trending" },
    { id: "latest", label: "⚡ Latest", href: "/feed/latest" },
    { id: "bookmarks", label: "🔖 Saved", href: "/feed/bookmarks" },
  ];

  return (
    <div className="flex border-b border-zinc-800">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={\`px-6 py-3 text-sm font-medium border-b-2 transition-colors \${
              isActive
                ? "border-emerald-500 text-emerald-400 font-semibold"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }\`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}`,
      },
      keyTakeaway: "Prefetched links ensure that when a user switches tabs, the content appears instantly without network delay.",
    },

    combinedExample: {
      combinedTopics: ["Link Prefetching", "Server Redirects", "Dynamic Routes"],
      title: "Course Enrolment Action with Instant Redirection",
      description: "Combining user selection with server-side validation and immediate redirect to course content.",
      code: {
        title: "Course Redirect Controller",
        description: "Server Action redirecting to dynamic lesson route.",
        language: "tsx",
        filename: "src/actions/enroll.ts",
        code: `"use server";

import { redirect } from "next/navigation";

export async function continueCourseAction(formData: FormData) {
  const unitId = formData.get("unitId") as string;
  const lessonId = formData.get("lessonId") as string;

  // Server-side redirect straight to the lesson page:
  redirect(\`/units/\${unitId}/lessons/\${lessonId}\`);
}`,
      },
      stepByStepFlow: [
        "Student clicks 'Continue Learning'",
        "Form submits to `continueCourseAction` Server Action",
        "Server processes student state and calls `redirect()`",
        "Browser loads `/units/unit-1/lessons/intro-and-project-structure` instantly",
      ],
    },
  },

  {
    id: "loading-and-error-ui",
    unitId: "unit-1",
    title: "Loading UI, Suspense & Error Boundaries",
    shortSummary: "Create instant streaming skeleton screens with loading.tsx and bulletproof error recovery with error.tsx, global-error.tsx, and not-found.tsx.",
    order: 5,
    tags: ["Loading UI", "Streaming", "Suspense", "Error Boundaries", "404 Not Found"],

    simpleExplanation:
      "When a website fetches data from a slow database, users usually hate staring at a blank frozen white screen. In Next.js, if you create a file named `loading.tsx` in any folder, Next.js automatically displays that loading skeleton the EXACT millisecond the user clicks the link, while the actual page data streams in over the network. If something crashes or fails, Next.js catches it with `error.tsx` instead of breaking your entire app.",

    whyNeeded:
      "Modern users on mobile phones abandon websites if they see a frozen white page. Built-in `loading.tsx` (using React Suspense) and `error.tsx` (using React Error Boundaries) allow you to build resilient, ultra-fast streaming web applications effortlessly.",

    reactVsNext: {
      concept: "Loading States & Error Handling",
      reactWay: {
        title: "Manual React State & Error Catching",
        code: `// Vanilla React manual loading and error handling:
export function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(d => { setData(d); setIsLoading(false); })
      .catch(err => { setError(err); setIsLoading(false); });
  }, []);

  if (isLoading) return <div className="skeleton">Loading dashboard...</div>;
  if (error) return <div className="error">Failed to load: {error.message}</div>;

  return <div>{data.title}</div>;
}`,
        explanation:
          "In vanilla React, every single component must manage its own `isLoading` and `error` state variables with multiple `if/else` checks.",
        drawbacks: [
          "Massive amounts of repetitive boilerplate code in every file",
          "If an error throws during rendering, the entire app crashes to a blank screen",
          "Loading state only appears AFTER client JavaScript downloads and executes",
        ],
      },
      nextjsWay: {
        title: "Next.js Automatic loading.tsx & error.tsx",
        code: `// 1. File: src/app/dashboard/loading.tsx (Appears instantly on click!)
export default function DashboardLoading() {
  return (
    <div className="space-y-4 animate-pulse p-6">
      <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
      <div className="h-32 w-full bg-zinc-800 rounded-xl" />
    </div>
  );
}

// 2. File: src/app/dashboard/error.tsx (Catches any runtime error!)
"use client"; // Error components MUST be Client Components

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 border border-rose-500/30 bg-rose-500/10 rounded-xl space-y-3">
      <h2 className="text-rose-400 font-bold">Something went wrong!</h2>
      <p className="text-sm text-zinc-300">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm">
        Try Again
      </button>
    </div>
  );
}`,
        explanation:
          "Next.js automatically wraps your `page.tsx` inside a `<Suspense fallback={<Loading />}>` and an `<ErrorBoundary fallback={<Error />}>`. Zero boilerplate in your page component!",
        benefits: [
          "Instant visual feedback on mobile (zero perceived latency)",
          "Clean page components: no `if (isLoading)` or `if (error)` clutter",
          "Isolated error blast radius: an error in one section does not crash the rest of the page",
          "Built-in `reset()` function allows user to retry without refreshing the whole browser",
        ],
      },
      whyDifferent:
        "Next.js leverages React Server Components Streaming and React Suspense at the file-system level, decoupling loading and error UI from page logic.",
      mentalShiftSummary:
        "Don't write `useState(isLoading)`. Simply create `loading.tsx` and `error.tsx` alongside `page.tsx`.",
    },

    basicExample: {
      title: "Skeleton Loading Screen",
      description: "A pulsating skeleton screen for a course module card.",
      language: "tsx",
      filename: "src/app/units/[unitId]/loading.tsx",
      code: `// src/app/units/[unitId]/loading.tsx
export default function UnitLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-zinc-800 rounded" />
        <div className="h-8 w-64 bg-zinc-800 rounded-lg" />
        <div className="h-4 w-96 bg-zinc-800/60 rounded" />
      </div>

      {/* Topics Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3">
            <div className="h-5 w-3/4 bg-zinc-800 rounded" />
            <div className="h-3 w-full bg-zinc-800/60 rounded" />
            <div className="h-3 w-2/3 bg-zinc-800/60 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}`,
      explanation:
        "When the student clicks on a unit, this skeleton renders immediately on the screen while the server prepares the unit content.",
      outputPreview: "Smooth dark-themed pulsating skeleton matching the exact layout of the unit page.",
    },

    moreExamples: [
      {
        title: "Custom 404 Not Found Page (not-found.tsx)",
        description: "Displaying a friendly 404 screen when a route or resource does not exist.",
        language: "tsx",
        filename: "src/app/not-found.tsx",
        code: `import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <span className="text-4xl font-mono font-bold text-amber-500">404</span>
      <h1 className="text-2xl font-bold text-zinc-100">Topic Not Found</h1>
      <p className="text-zinc-400 text-sm max-w-md">
        The syllabus topic or lesson you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/units"
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
      >
        Return to Syllabus
      </Link>
    </div>
  );
}`,
        explanation:
          "Placing `not-found.tsx` in `src/app/` handles all unmatched URLs or programmatic `notFound()` calls.",
      },
      {
        title: "Granular Streaming with <Suspense>",
        description: "Streaming slow parts of a page independently without delaying fast components.",
        language: "tsx",
        filename: "src/app/dashboard/page.tsx",
        code: `import { Suspense } from "react";

// Slow component (takes 2 seconds)
async function RecentActivity() {
  const activity = await fetchActivityFromDb();
  return <ul>{activity.map(a => <li key={a.id}>{a.text}</li>)}</ul>;
}

// Fast component (renders in 5ms)
function FastUserHeader() {
  return <h1>Welcome back, Ishika!</h1>;
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <FastUserHeader /> {/* Shows INSTANTLY */}

      {/* Streams in when ready: */}
      <Suspense fallback={<p className="text-zinc-500 animate-pulse">Loading live activity...</p>}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}`,
        explanation:
          "React Suspense allows parts of the page to stream to the browser as soon as they finish on the server.",
      },
    ],

    multipleWays: [
      {
        name: "Folder-Level loading.tsx (Automatic)",
        syntax: "src/app/units/loading.tsx",
        codeSnippet: `export default function Loading() {
  return <div className="spinner">Loading unit...</div>;
}`,
        howItWorks: "Next.js wraps the entire `page.tsx` in that folder in Suspense automatically.",
        pros: ["Zero manual Suspense code", "Applies to all sub-routes"],
        cons: ["Blocks the entire page until the slowest data fetch completes"],
        whenToUse: "When you want a clean, full-page skeleton for a whole route.",
        isRecommended: true,
      },
      {
        name: "Granular Component <Suspense> (Streaming)",
        syntax: "<Suspense fallback={<Skeleton />}><SlowComponent /></Suspense>",
        codeSnippet: `<Suspense fallback={<TableSkeleton />}>
  <SlowDatabaseTable />
</Suspense>`,
        howItWorks: "Wraps individual slow components, allowing fast components to render immediately.",
        pros: ["Fastest perceived performance", "Selective streaming"],
        cons: ["Requires wrapping specific JSX elements manually"],
        whenToUse: "When a page has fast UI (header, nav) and one slow data widget (analytics chart, external API).",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `loading.tsx` for route-level skeletons, and `<Suspense>` for independent slow widgets.",
      scenarios: [
        {
          scenario: "You want a skeleton screen when navigating between main syllabus units",
          recommendedApproach: "Create `src/app/units/[unitId]/loading.tsx`",
          reason: "Next.js activates it instantly upon route transition.",
        },
        {
          scenario: "Your page has an instant search bar and a slow AI recommendation box",
          recommendedApproach: "Render the search bar directly and wrap the AI box in `<Suspense>`",
          reason: "The user can immediately start searching without waiting for the AI data.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Forgetting 'use client' in error.tsx",
        badCode: `// ❌ BAD: src/app/error.tsx without 'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <div>Error: {error.message}</div>;
}`,
        goodCode: `// ✅ GOOD: src/app/error.tsx with 'use client'
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <div>Error: {error.message}</div>;
}`,
        whyItBreaks: "Error boundaries in React MUST be Client Components to catch rendering errors and handle user interaction (e.g. clicking the reset button).",
        howToFix: "Always write `\"use client\";` on the very first line of any `error.tsx` file.",
      },
    ],

    bestPractices: [
      {
        title: "Match Skeleton Geometry to the Real Page",
        rule: "Design `loading.tsx` skeletons to match the exact size, grid columns, and shape of your real page elements.",
        explanation: "Prevents Cumulative Layout Shift (CLS) when real content replaces the skeleton.",
      },
      {
        title: "Provide a Reset Action in error.tsx",
        rule: "Always include a button calling `reset()` so the user can re-try fetching data if a transient network glitch occurred.",
        explanation: "Greatly improves user satisfaction without forcing a full page reload.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-5",
        title: "Create a Resilient Error Boundary Component",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a complete `error.tsx` Client Component that displays an error banner with a Rose accent border, shows the error message, and includes a retry button calling `reset()`.",
        initialCode: `// src/app/units/error.tsx
// TODO: Add 'use client' and write the Error component
export default function UnitError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      {/* Display error and retry button */}
    </div>
  );
}`,
        expectedOutput: "A styled error card with a retry button.",
        hints: ["Must include `'use client'` at the top", "Use `<button onClick={() => reset()}>`"],
        solutionCode: `"use client";

export default function UnitError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 max-w-xl mx-auto bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <h2 className="text-lg font-bold text-rose-400">Failed to Load Unit Content</h2>
      </div>
      <p className="text-sm text-zinc-300 font-mono bg-zinc-950/60 p-3 rounded-lg border border-zinc-800">
        {error.message || "An unexpected error occurred while fetching lesson resources."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
}`,
        solutionExplanation:
          "`error.tsx` isolates the error to this route level. The global navbar and layout remain completely functional while the user retries.",
      },
    ],

    quizzes: [
      {
        id: "u1-q6",
        question: "Why must error.tsx always be a Client Component ('use client') in Next.js?",
        syllabusTopic: "Next.js Error Boundaries",
        options: [
          { id: "a", text: "Because Server Components cannot contain CSS", isCorrect: false, explanation: "Server Components can contain CSS." },
          { id: "b", text: "Because React Error Boundaries require client-side lifecycle and user recovery event handlers like reset()", isCorrect: true, explanation: "Correct! React error boundaries intercept client errors and need interactive event handlers." },
          { id: "c", text: "Because error.tsx only runs on mobile phones", isCorrect: false, explanation: "Error boundaries run across all platforms." },
          { id: "d", text: "To make the file download faster", isCorrect: false, explanation: "Client components actually include client JS." },
        ],
        conceptualExplanation:
          "React Error Boundaries rely on client-side state and event listeners to catch errors and execute recovery callbacks like `reset()`.",
      },
    ],

    realWorldExample: {
      domain: "Financial Stock Market Dashboard",
      description: "How high-frequency trading platforms stream real-time price tickers while isolating chart API failures.",
      code: {
        title: "Stock Watchlist with Suspense Boundaries",
        description: "Streaming real-time market data.",
        language: "tsx",
        filename: "src/app/stocks/page.tsx",
        code: `import { Suspense } from "react";

async function MarketTicker() {
  const prices = await fetchStockPrices(); // takes 1.5s
  return <div>S&P 500: {prices.sp500} | NASDAQ: {prices.nasdaq}</div>;
}

export default function StocksPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Portfolio Overview</h1>
      <Suspense fallback={<div className="h-10 bg-zinc-800 animate-pulse rounded" />}>
        <MarketTicker />
      </Suspense>
    </div>
  );
}`,
      },
      keyTakeaway: "Suspense boundaries allow high-priority UI to paint immediately while slow streaming components load progressively.",
    },

    combinedExample: {
      combinedTopics: ["loading.tsx", "error.tsx", "not-found.tsx", "App Router"],
      title: "Resilient Route Architecture",
      description: "How all 4 special files coordinate to provide a fault-tolerant user experience.",
      code: {
        title: "Full Route Structure",
        description: "Complete set of special files in a production route folder.",
        language: "typescript",
        filename: "src/app/lessons/[id]/",
        code: `src/app/lessons/[id]/
├── page.tsx          # Main lesson view (Server Component)
├── loading.tsx       # Instant animated skeleton fallback
├── error.tsx         # Catches and handles runtime crashes
└── not-found.tsx     # Custom 404 if lesson ID does not exist`,
      },
      stepByStepFlow: [
        "User clicks link -> Next.js displays `loading.tsx` instantly",
        "Server prepares data for `page.tsx`",
        "If data exists -> `page.tsx` replaces `loading.tsx` smoothly",
        "If ID is invalid -> `notFound()` renders `not-found.tsx`",
        "If database crashes -> `error.tsx` renders with retry button",
      ],
    },
  },
];
