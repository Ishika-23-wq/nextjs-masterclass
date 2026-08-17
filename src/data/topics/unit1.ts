import { TopicContent } from "@/types";

export const unit1Topics: TopicContent[] = [
  {
    id: "intro-and-project-structure",
    unitId: "unit-1",
    title: "Next.js Introduction & Project Structure",
    shortSummary: "What is Next.js, why plain React has the blank-screen problem, and how folders inside app/ become rooms in your website treehouse.",
    order: 1,
    tags: ["Basics", "App Router", "Folder Structure", "JavaScript", "ELI10"],

    simpleExplanation:
      "Imagine you want to build a cool toy car. In plain React, someone dumps a big bucket of loose Lego bricks on your carpet — you have to build your own wheels, engine, steering wheel, and GPS navigation from scratch. Next.js is a pre-built Lego Race Car Kit! It comes with the engine (server rendering), GPS navigation (folder routing), and headlights (automatic speed boosts) already connected. In Next.js, every folder you create inside 'app/' automatically becomes a real webpage on the internet!",

    whyNeeded:
      "When you use plain React (like Create React App or Vite), your browser receives an empty HTML file with just `<div id='root'></div>`. The browser has to download megabytes of JavaScript before anything shows on screen, so users on slow phones stare at a blank white screen for 3 seconds! Next.js fixes this by pre-cooking the HTML on the server (like a chef in a restaurant kitchen) so the webpage appears instantly with zero blank screen waiting.",

    reactVsNext: {
      concept: "Creating Webpages & Project Setup",
      reactWay: {
        title: "Vanilla React with React Router",
        code: `// In vanilla React (Vite / CRA), you must install extra router packages
// and manually wire up URL paths:
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
          "In plain React, you have to install third-party libraries, write long route lists by hand, and manage everything inside client-side JavaScript.",
        drawbacks: [
          "Browser starts with an empty white screen (`<div id='root'></div>`)",
          "Google search engines struggle to read empty pages",
          "Routing code gets huge and messy as your app grows",
          "Requires a completely separate backend server for database tasks",
        ],
      },
      nextjsWay: {
        title: "Next.js App Router (Pure JavaScript)",
        code: `// In Next.js App Router, folders become webpages automatically!
// No router installation or switch statements needed:

// 1. File: app/page.js  -> Accessible at: http://localhost:3000/
export default function HomePage() {
  return <h1>🏠 Welcome to our Toy Store!</h1>;
}

// 2. File: app/about/page.js -> Accessible at: http://localhost:3000/about
export default function AboutPage() {
  return <h1>👋 About our Lego Builders</h1>;
}`,
        explanation:
          "In Next.js, you simply create a folder and drop a `page.js` inside it. That folder path instantly becomes a public URL!",
        benefits: [
          "Zero router setup or packages to install",
          "Webpages are pre-baked on the server for instant loading",
          "Frontend UI and backend server live together in one project",
          "Fast Refresh updates your screen in milliseconds when you hit Save",
        ],
      },
      whyDifferent:
        "Next.js moves the heavy work to the server and uses your folder names as URLs, so you write less boilerplate code and get faster websites.",
      mentalShiftSummary:
        "Stop thinking: 'I need to install react-router and map paths in App.jsx.' Think: 'I will make a folder and drop a page.js inside it.'",
    },

    basicExample: {
      title: "Your First Next.js Page in Plain JavaScript",
      description: "A clean Server Component in Next.js representing the home page.",
      language: "jsx",
      filename: "app/page.js",
      code: `// app/page.js (Pure JavaScript)
export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#10b981" }}>🚀 Welcome to NextMastery!</h1>
      <p>This webpage was baked fresh on the server before reaching your browser.</p>
      <div style={{ background: "#ecfdf5", padding: "12px", borderRadius: "8px" }}>
        📅 Academic Year: <strong>{currentYear}</strong>
      </div>
    </div>
  );
}`,
      explanation:
        "By default, this is a Server Component. It runs on the server, calculates `currentYear`, and sends ready-to-display HTML to the browser with zero client JavaScript bloat!",
      outputPreview: "🚀 Welcome to NextMastery! (with green badge showing current year)",
    },

    moreExamples: [
      {
        title: "The Treehouse Floor Plan (Folder Structure)",
        description: "Understanding how special magic file names work inside the project.",
        language: "bash",
        filename: "Folder Hierarchy",
        code: `my-fun-app/
├── app/                  🏠 THE HEART: All your webpages live here!
│   ├── layout.js         🖼️ Shared picture frame (navbar + footer)
│   ├── page.js           🌟 The Homepage ("/")
│   ├── loading.js        ⏳ The popcorn timer while data fetches
│   ├── error.js          🛡️ The circuit breaker if something crashes
│   ├── not-found.js      🛸 Custom 404 screen
│   ├── globals.css       🎨 Your paint bucket for styling
│   └── about/
│       └── page.js       👋 The About page ("/about")
├── public/               🧸 Toy Closet: Put puppy.png and stickers here
├── node_modules/         📦 Installed packages (never touch this)
├── package.json          📜 Recipe Book: Lists scripts and tools
└── .env.local            🔒 Secret Diary: Passwords and API keys`,
        explanation:
          "Special reserved file names like `page.js`, `layout.js`, and `loading.js` give you automatic superpowers without writing configuration files.",
      },
      {
        title: "Server vs Client Component (The Chef vs The DIY Station)",
        description: "When to keep code on the server vs when to add 'use client' for clicks.",
        language: "jsx",
        filename: "app/counter/page.js",
        code: `"use client"; // 👈 We tell Next.js: "This needs browser buttons and state!"
import { useState } from "react";

export default function CounterPage() {
  const [balloons, setBalloons] = useState(1);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎈 Balloons: {balloons}</h2>
      <button onClick={() => setBalloons(balloons + 1)}>
        ➕ Blow up another balloon!
      </button>
    </div>
  );
}`,
        explanation:
          "Because this component uses `useState` and `onClick`, we add `'use client'` at the very top. If a component just displays text without clicks, leave it as a Server Component!",
      },
    ],

    multipleWays: [
      {
        name: "App Router (Modern & Recommended)",
        syntax: "app/about/page.js",
        codeSnippet: `// Modern App Router (Next.js 14, 15, 16)
export default function Page() {
  return <h1>Modern App Router Page</h1>;
}`,
        howItWorks: "Uses the `app/` directory with Server Components by default, nested layouts, and streaming.",
        pros: ["Server Components by default", "Nested picture-frame layouts", "Automatic loading and error screens"],
        cons: ["Need to understand when to add 'use client'"],
        whenToUse: "Always use for all new projects, assignments, and tutorials.",
        isRecommended: true,
      },
      {
        name: "Legacy Pages Router (Older Next.js)",
        syntax: "pages/about.js",
        codeSnippet: `// Older Pages Router (Next.js 12 and older)
export default function About() {
  return <h1>Legacy Pages Router</h1>;
}`,
        howItWorks: "Uses the `pages/` directory where files directly mapped to routes and used getServerSideProps.",
        pros: ["Found in older YouTube videos pre-2023"],
        cons: ["No React Server Components", "Layouts are harder to manage", "Larger JavaScript downloads"],
        whenToUse: "Only when maintaining older legacy projects.",
        isRecommended: false,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Always use modern App Router (`app/` folder) with plain JavaScript or JSX.",
      scenarios: [
        {
          scenario: "You are creating a new project today",
          recommendedApproach: "App Router (`app/` folder)",
          reason: "It provides instant Server Components, faster speeds with Turbopack, and automatic routing.",
        },
        {
          scenario: "You need a button that increments a counter on click",
          recommendedApproach: "Add `'use client'` at the top of that file",
          reason: "Any interactive state (`useState`, `onClick`) requires running in the browser as a Client Component.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Naming the page file index.js or About.js instead of page.js",
        badCode: `// ❌ BAD: app/about/About.js or app/about/index.js
export default function About() {
  return <h1>About</h1>;
}`,
        goodCode: `// ✅ GOOD: app/about/page.js
export default function AboutPage() {
  return <h1>About</h1>;
}`,
        whyItBreaks: "In the App Router, Next.js only turns files named `page.js` (or `page.jsx`) into public URLs.",
        howToFix: "Always name your route file `page.js` inside its specific folder.",
      },
      {
        mistakeTitle: "Forgetting the 'default' export",
        badCode: `// ❌ BAD: Named export only
export function HomePage() {
  return <h1>Home</h1>;
}`,
        goodCode: `// ✅ GOOD: Default export is required for page.js
export default function HomePage() {
  return <h1>Home</h1>;
}`,
        whyItBreaks: "Next.js expects `export default function` from `page.js` as the main component to display.",
        howToFix: "Always write `export default function ...` on your page components.",
      },
    ],

    bestPractices: [
      {
        title: "Keep Components Organized",
        rule: "Place shared buttons and cards in `components/` and routes in `app/`.",
        explanation: "This keeps your `app/` folder clean and strictly focused on URLs and layouts.",
      },
      {
        title: "Use Server Components as the Default",
        rule: "Only add `'use client'` to components that actually need click handlers or `useState`.",
        explanation: "This keeps your web pages super fast and lightweight for mobile devices.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-1",
        title: "Create a Student Profile Server Page (JavaScript)",
        difficulty: "very-easy",
        estimatedMinutes: 5,
        prompt:
          "Write a default-exported React Server Component for `app/student/page.js` that displays a student name, roll number, and course badge.",
        initialCode: `// Write your Next.js Page component in plain JavaScript
export default function StudentPage() {
  // TODO: Return a JSX container with student details
  return (
    <div>
      {/* Add your heading and student info here */}
    </div>
  );
}`,
        expectedOutput: "A styled profile card displaying student name, course 'Next.js Masterclass', and academic status.",
        hints: ["Use `export default function`", "Return valid JSX elements like `<h1>` and `<p>`"],
        solutionCode: `export default function StudentPage() {
  const student = {
    name: "Alex Johnson",
    rollNumber: "INT257-2026-089",
    course: "Next.js Masterclass",
    status: "Active Student"
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #e4e4e7", borderRadius: "12px", maxWidth: "400px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{student.name}</h2>
        <span style={{ background: "#d1fae5", color: "#065f46", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>
          {student.status}
        </span>
      </div>
      <p>Roll No: {student.rollNumber}</p>
      <p>Course: {student.course}</p>
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
          { id: "a", text: "index.js", isCorrect: false, explanation: "index.js was used in older Pages Router, but App Router requires page.js." },
          { id: "b", text: "page.js (or page.jsx)", isCorrect: true, explanation: "Correct! Only folders containing a page.js file become publicly reachable routes." },
          { id: "c", text: "route.js", isCorrect: false, explanation: "route.js is used for backend API endpoints, not visual UI pages." },
          { id: "d", text: "view.js", isCorrect: false, explanation: "view.js is not a reserved Next.js filename." },
        ],
        conceptualExplanation:
          "In Next.js App Router, `page.js` defines the unique UI for a route. Other reserved filenames include `layout.js` (shared UI), `loading.js` (loading UI), and `error.js` (error circuit breaker).",
      },
      {
        id: "u1-q2",
        question: "Why does Next.js render HTML on the server compared to standard Create React App (CSR)?",
        syllabusTopic: "SSR vs CSR Mental Model",
        options: [
          { id: "a", text: "To prevent JavaScript from ever running in the browser", isCorrect: false, explanation: "JavaScript still runs on the client for interactivity (hydration)." },
          { id: "b", text: "To give instant first load and allow search engines like Google to read the content", isCorrect: true, explanation: "Correct! Pre-rendered HTML is ready immediately for users and Google crawlers." },
          { id: "c", text: "Because React cannot write HTML", isCorrect: false, explanation: "React always outputs DOM elements." },
          { id: "d", text: "To make CSS mandatory", isCorrect: false, explanation: "CSS styling is independent of rendering method." },
        ],
        conceptualExplanation:
          "Server-side rendering ensures that when a user requests a URL, the server sends complete HTML markup immediately, avoiding blank white screens.",
      },
    ],

    realWorldExample: {
      domain: "Online Toy Store Catalog",
      description: "How an online store structures its product catalog landing page using Next.js App Router in plain JavaScript.",
      code: {
        title: "Toy Store Catalog Landing Page",
        description: "Server Component rendering toy products into fast HTML.",
        language: "jsx",
        filename: "app/toys/page.js",
        code: `// app/toys/page.js (Pure JavaScript)
const TOYS = [
  { id: 1, name: "⚡ Lego Spaceship", category: "Building", price: "$29" },
  { id: 2, name: "🏎️ Turbo Race Car", category: "Vehicles", price: "$19" },
  { id: 3, name: "🧸 Fuzzy Teddy Bear", category: "Plush", price: "$15" },
];

export default function ToysPage() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>🧸 Toy Store Catalog</h1>
      <p>Browse our fun collection of toys!</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "16px" }}>
        {TOYS.map((toy) => (
          <div key={toy.id} style={{ border: "1px solid #e4e4e7", padding: "16px", borderRadius: "8px" }}>
            <h3>{toy.name}</h3>
            <p style={{ color: "#71717a", fontSize: "14px" }}>{toy.category}</p>
            <strong>{toy.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      keyTakeaway: "By using Next.js App Router, the entire catalog is rendered into fast HTML on the server before reaching the student's browser.",
    },

    combinedExample: {
      combinedTopics: ["App Router Structure", "JavaScript JSX", "Server Components"],
      title: "Course Overview Card with Live Stats",
      description: "Combining clean folder convention with plain JavaScript props and server-rendered badges.",
      code: {
        title: "Complete Server Page Component",
        description: "A production-ready Next.js page component in pure JavaScript.",
        language: "jsx",
        filename: "app/bootcamp-overview/page.js",
        code: `export default function BootcampOverviewPage() {
  const unitsCount = 6;
  const practicalProjects = 5;

  return (
    <div style={{ padding: "24px", background: "#fafafa", borderRadius: "12px", border: "1px solid #e4e4e7" }}>
      <span style={{ background: "#dcfce7", color: "#166534", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold" }}>
        🚀 NextMastery Bootcamp
      </span>
      <h1 style={{ marginTop: "12px" }}>Next.js Comprehensive Syllabus</h1>
      <p style={{ color: "#52525b" }}>
        Master modern Next.js from foundational App Router routing to full-stack applications.
      </p>
      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        <div style={{ background: "#fff", padding: "12px 20px", borderRadius: "8px", border: "1px solid #e4e4e7" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#d97706" }}>{unitsCount}</div>
          <div style={{ fontSize: "12px", color: "#71717a" }}>Core Units</div>
        </div>
        <div style={{ background: "#fff", padding: "12px 20px", borderRadius: "8px", border: "1px solid #e4e4e7" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981" }}>{practicalProjects}</div>
          <div style={{ fontSize: "12px", color: "#71717a" }}>Hands-on Projects</div>
        </div>
      </div>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Create folder `app/bootcamp-overview/`",
        "Add `page.js` with a default exported component",
        "Run `npm run dev` and navigate to `http://localhost:3000/bootcamp-overview`",
        "Observe instant server-rendered HTML delivery with zero white screen delay",
      ],
    },
  },

  {
    id: "file-based-routing",
    unitId: "unit-1",
    title: "File-Based & Dynamic Routing",
    shortSummary: "Turn folders into URLs, use dynamic name tags [slug] for 1,000s of pages, unwrap await params like a birthday gift, and organize files with Route Groups.",
    order: 2,
    tags: ["Dynamic Routes", "Slug Parameters", "Catch-All", "URL Mapping", "JavaScript"],

    simpleExplanation:
      "If your website has 500 Pokemon cards or 1,000 blog posts, you don't create 500 folders by hand! Instead, you create ONE folder named with square brackets like `[slug]` or `[id]`. Think of `[slug]` like a blank name tag slot on a mail sorting machine: whatever name is typed in the URL bar (e.g. `/pokemon/pikachu`) fills in the blank! In modern Next.js, `params` is like a wrapped gift box: you just write `await params` to open the box and get the value.",

    whyNeeded:
      "Real-world websites (e-commerce stores, social media profiles, video game leaderboards) have thousands of items that share the same layout but have different data. Dynamic routes let you write one single template file that handles all of them automatically.",

    reactVsNext: {
      concept: "Dynamic Route Parameters",
      reactWay: {
        title: "React Router useParams() Hook",
        code: `// React Router (Client-side only)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductDetail() {
  const { id } = useParams(); // Reads parameter in the browser
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
          "In vanilla React, URL parameters are read on the client browser. You have to display a loading spinner while fetching data inside `useEffect`.",
        drawbacks: [
          "Waterfall loading: component mounts -> shows spinner -> fetches data -> re-renders",
          "Google search bots see 'Loading product...' instead of the real product",
          "Requires lots of state and effect boilerplate code",
        ],
      },
      nextjsWay: {
        title: "Next.js Dynamic Route (Plain JavaScript)",
        code: `// File: app/products/[id]/page.js
// Next.js automatically handles /products/1, /products/42, /products/anything!

export default async function ProductPage({ params }) {
  // 👈 Modern 2026 rule: unwrap the params gift box with await!
  const { id } = await params;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ Product ID: {id}</h1>
      <p>This page was generated on the server for product #{id}!</p>
    </div>
  );
}`,
        explanation:
          "In Next.js, `params` is passed directly into your server page. You unwrap it with `await params` and render immediately without any `useEffect` or loading spinners!",
        benefits: [
          "One file handles infinite dynamic URLs",
          "Parameters are available directly on the server",
          "Instant HTML rendering for search engines and mobile users",
          "No client-side state or effect boilerplate",
        ],
      },
      whyDifferent:
        "Next.js resolves dynamic URL segments on the server before sending HTML to the client, eliminating loading spinners for basic route parameters.",
      mentalShiftSummary:
        "Stop thinking: 'I need to use useParams() inside useEffect.' Think: 'I will make a [folder] and await params in my async component.'",
    },

    basicExample: {
      title: "Creating a Dynamic Pokemon Card in Plain JavaScript",
      description: "A dynamic route matching `/pokemon/pikachu`, `/pokemon/charizard`, etc.",
      language: "jsx",
      filename: "app/pokemon/[name]/page.js",
      code: `// app/pokemon/[name]/page.js (Pure JavaScript)

export default async function PokemonPage({ params }) {
  // Unwrap the params Promise:
  const { name } = await params;

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <span style={{ fontSize: "12px", background: "#fef3c7", color: "#92400e", padding: "4px 8px", borderRadius: "4px" }}>
        ⚡ Pokedex Entry
      </span>
      <h1 style={{ marginTop: "8px", textTransform: "capitalize" }}>
        {name}
      </h1>
      <p>You are viewing the official profile page for <strong>{name}</strong>!</p>
    </div>
  );
}`,
      explanation:
        "When a user visits `/pokemon/pikachu`, `{ name }` equals `'pikachu'`. If they visit `/pokemon/mewtwo`, `{ name }` equals `'mewtwo'`!",
      outputPreview: "⚡ Pokedex Entry: Pikachu (with styled profile banner)",
    },

    moreExamples: [
      {
        title: "Catch-All Routes: Matching Any Folder Depth",
        description: "Using [...slug] to match /docs/math, /docs/math/algebra, /docs/math/algebra/lesson1.",
        language: "jsx",
        filename: "app/docs/[...slug]/page.js",
        code: `// app/docs/[...slug]/page.js (Pure JavaScript)
// Matches /docs/a, /docs/a/b, /docs/a/b/c (slug is an array!)

export default async function DocsPage({ params }) {
  const { slug } = await params; // e.g. ["math", "algebra", "lesson-1"]

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Documentation Section</h1>
      <p>Breadcrumb Path: <strong>{slug.join(" ➔ ")}</strong></p>
    </div>
  );
}`,
        explanation:
          "The three dots `[...slug]` mean: 'Catch all remaining parts of the URL and put them in a JavaScript array!'",
      },
      {
        title: "Route Groups: Invisible Invisibility Cloak Folders",
        description: "Organizing folders without changing the public URL.",
        language: "bash",
        filename: "Route Group Structure",
        code: `app/
├── (marketing)/
│   ├── about/
│   │   └── page.js       👉 http://localhost:3000/about  ((marketing) is skipped!)
│   └── contact/
│       └── page.js       👉 http://localhost:3000/contact
└── (shop)/
    └── toys/
        └── page.js       👉 http://localhost:3000/toys   ((shop) is skipped!)`,
        explanation:
          "Wrapping a folder name in parentheses `(name)` tells Next.js to ignore that folder name in the URL address.",
      },
    ],

    multipleWays: [
      {
        name: "Standard Dynamic Route [slug]",
        syntax: "app/blog/[slug]/page.js",
        codeSnippet: `// Matches /blog/post-1, /blog/post-2 (one segment only)
export default async function Page({ params }) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}`,
        howItWorks: "Captures a single URL segment into a string parameter.",
        pros: ["Simple and clean", "Matches 95% of real-world use cases like /users/[id]"],
        cons: ["Does not match multi-level nested paths like /blog/2026/jan/post-1"],
        whenToUse: "Use for blogs, user profiles, product detail pages.",
        isRecommended: true,
      },
      {
        name: "Catch-All Route [...slug]",
        syntax: "app/docs/[...slug]/page.js",
        codeSnippet: `// Matches /docs/a, /docs/a/b, /docs/a/b/c
export default async function Page({ params }) {
  const { slug } = await params; // Array of strings: ["a", "b", "c"]
  return <h1>Docs: {slug.join("/")}</h1>;
}`,
        howItWorks: "Captures all following path segments into a JavaScript array.",
        pros: ["Great for docs, multi-level categories, and file explorers"],
        cons: ["Requires handling an array instead of a single string"],
        whenToUse: "Use for multi-level documentation or nested wiki pages.",
        isRecommended: false,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `[id]` or `[slug]` for standard dynamic pages. Use `[...slug]` only for deep documentation trees.",
      scenarios: [
        {
          scenario: "You need a page for each user profile (e.g. `/users/ishika`)",
          recommendedApproach: "`app/users/[username]/page.js`",
          reason: "Each user has a single username identifier segment.",
        },
        {
          scenario: "You want to organize admin pages without putting '/admin-group/' in the URL",
          recommendedApproach: "Route Group `app/(admin)/dashboard/page.js`",
          reason: "Parentheses keep the URL clean at `/dashboard` while organizing files on your computer.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Forgetting to await params (2026 Gotcha!)",
        badCode: `// ❌ BAD: params.slug directly without await
export default function BlogPost({ params }) {
  // In modern Next.js, this triggers warnings or breaks because params is a Promise!
  return <h1>{params.slug}</h1>;
}`,
        goodCode: `// ✅ GOOD: Make the function async and await params
export default async function BlogPost({ params }) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}`,
        whyItBreaks: "In modern Next.js versions, `params` is an asynchronous Promise object.",
        howToFix: "Always write `const { slug } = await params;` inside an `async` component.",
      },
    ],

    bestPractices: [
      {
        title: "Always Await Dynamic Params",
        rule: "Treat `params` as a Promise and extract properties with `await`.",
        explanation: "This future-proofs your code and prevents runtime errors across Next.js versions.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-2",
        title: "Create a Superhero Profile Route (JavaScript)",
        difficulty: "easy",
        estimatedMinutes: 5,
        prompt:
          "Build a dynamic page component for `app/heroes/[heroName]/page.js` that awaits the parameter and prints '🦸 Superhero Profile: [heroName]'.",
        initialCode: `// app/heroes/[heroName]/page.js
export default async function HeroPage({ params }) {
  // TODO: unwrap params and return JSX
}`,
        expectedOutput: "A webpage that displays '🦸 Superhero Profile: batman' when visiting /heroes/batman.",
        hints: ["Make sure the function is `async`", "Write `const { heroName } = await params;`"],
        solutionCode: `// app/heroes/[heroName]/page.js
export default async function HeroPage({ params }) {
  const { heroName } = await params;

  return (
    <div style={{ padding: "24px" }}>
      <h1>🦸 Superhero Profile: {heroName}</h1>
      <p>Welcome to the secret headquarters of <strong>{heroName}</strong>!</p>
    </div>
  );
}`,
        solutionExplanation:
          "The async component unwraps `heroName` from the URL parameter Promise and renders it directly into HTML.",
      },
    ],

    quizzes: [
      {
        id: "u1-q3",
        question: "If you have a folder `app/games/[gameId]/page.js` and visit `/games/mario-kart`, what does `gameId` equal?",
        syllabusTopic: "Dynamic Route Parameters",
        options: [
          { id: "a", text: "[gameId]", isCorrect: false, explanation: "Square brackets are just the syntax for the wildcard folder." },
          { id: "b", text: "'mario-kart'", isCorrect: true, explanation: "Correct! Next.js extracts whatever value was in that segment of the URL." },
          { id: "c", text: "undefined", isCorrect: false, explanation: "Next.js automatically passes the matched URL value." },
          { id: "d", text: "null", isCorrect: false, explanation: "Next.js provides the string value from the URL." },
        ],
        conceptualExplanation:
          "The square bracket folder `[gameId]` captures the string from the URL path at that position and passes it inside `params`.",
      },
    ],

    realWorldExample: {
      domain: "Video Game Leaderboard",
      description: "How a gaming platform displays dynamic player cards in plain JavaScript.",
      code: {
        title: "Player Leaderboard Profile",
        description: "Dynamic route in plain JavaScript.",
        language: "jsx",
        filename: "app/players/[tag]/page.js",
        code: `// app/players/[tag]/page.js (Pure JavaScript)

export default async function PlayerProfile({ params }) {
  const { tag } = await params;

  return (
    <div style={{ padding: "20px", border: "2px solid #6366f1", borderRadius: "12px" }}>
      <h2>🎮 Player Tag: @{tag}</h2>
      <p>Rank: <strong>Diamond Tier</strong> • Score: <strong>9,450 pts</strong></p>
    </div>
  );
}`,
      },
      keyTakeaway: "One single file handles millions of gamer tags dynamically without duplicating code.",
    },

    combinedExample: {
      combinedTopics: ["Dynamic Routes", "Async Params", "Server Components"],
      title: "Dynamic Blog Article with Dynamic Slug",
      description: "Displaying article titles and read times using dynamic params in plain JavaScript.",
      code: {
        title: "Dynamic Blog Article Page",
        description: "Full working JavaScript component.",
        language: "jsx",
        filename: "app/articles/[slug]/page.js",
        code: `export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const readableTitle = slug.replace(/-/g, " ").toUpperCase();

  return (
    <article style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      <span style={{ color: "#10b981", fontWeight: "bold" }}>NextMastery Blog</span>
      <h1 style={{ marginTop: "8px" }}>{readableTitle}</h1>
      <p style={{ color: "#71717a" }}>Published in 2026 • 5 min read</p>
      <hr style={{ margin: "16px 0", borderColor: "#e4e4e7" }} />
      <p>You are reading the dynamic article for: <em>{slug}</em>.</p>
    </article>
  );
}`,
      },
      stepByStepFlow: [
        "Create folder `app/articles/[slug]/`",
        "Add `page.js` and await `params`",
        "Visit `http://localhost:3000/articles/learn-nextjs-fast`",
        "See 'LEARN NEXTJS FAST' rendered automatically",
      ],
    },
  },

  {
    id: "layouts-and-nested-routes",
    unitId: "unit-1",
    title: "Layouts, Templates & Nested Routes",
    shortSummary: "Keep your navbar and footer locked in place with picture-frame layouts, stack Russian nesting doll layouts, and prevent unnecessary re-renders.",
    order: 3,
    tags: ["Layouts", "Root Layout", "Nested Routes", "Children Prop", "JavaScript"],

    simpleExplanation:
      "When you flip pages in a comic book, you don't throw away the comic book cover. You only turn the inside page! A layout in Next.js is like an unbreakable picture frame 🖼️. The frame (your top navbar, sidebar, and footer) stays hung on the wall. When a user clicks from `/home` to `/about`, React does NOT rebuild the wooden frame — it only swaps the photo inside (`{children}`). This means zero screen flicker, faster page switches, and dropdown menus that don't close!",

    whyNeeded:
      "Without layouts, you would have to copy and paste `<Navbar />` and `<Footer />` into every single page. Every time a user clicked a link, the entire navbar would tear down and redraw, causing unpleasant visual flashes and resetting user scroll position.",

    reactVsNext: {
      concept: "Shared Navigation & Page Shells",
      reactWay: {
        title: "React Manual Wrapper Components",
        code: `// Vanilla React: You must manually wrap each page component:
function MainLayout({ children }) {
  return (
    <div>
      <nav>Navbar</nav>
      {children}
      <footer>Footer</footer>
    </div>
  );
}

// In Home.jsx:
export default function Home() {
  return <MainLayout><h1>Home Page</h1></MainLayout>;
}

// In About.jsx:
export default function About() {
  return <MainLayout><h1>About Page</h1></MainLayout>;
}`,
        explanation:
          "In plain React, you have to remember to wrap every page manually in `<MainLayout>`. During navigation, the layout often re-renders completely.",
        drawbacks: [
          "Easy to forget wrapping a page in the layout",
          "Layout re-renders on route changes, losing component state (like audio playing in a header)",
          "Complex nested layouts require lots of nested provider boilerplate",
        ],
      },
      nextjsWay: {
        title: "Next.js Automatic Layouts (Plain JavaScript)",
        code: `// app/layout.js (The Root Layout — wraps EVERY page automatically!)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ background: "#10b981", color: "#fff", padding: "16px" }}>
          🚀 My Site Navbar
        </nav>

        {/* The active page content is injected here! */}
        <main>{children}</main>

        <footer>© 2026 NextMastery</footer>
      </body>
    </html>
  );
}`,
        explanation:
          "In Next.js, just create `layout.js`. Next.js automatically wraps all pages inside that folder and subfolders with zero manual wrapping!",
        benefits: [
          "Never re-renders the navbar when navigating between pages",
          "Maintains state (e.g. open dropdowns or video playback)",
          "Layouts nest automatically like Russian dolls",
          "Zero manual imports on individual page files",
        ],
      },
      whyDifferent:
        "Next.js preserves layout state across client-side navigations using React Server Component boundaries and subtree reconciliation.",
      mentalShiftSummary:
        "Stop thinking: 'I have to import <Navbar> on every page.' Think: 'I put <Navbar> once in layout.js and Next.js frames everything.'",
    },

    basicExample: {
      title: "Creating the Root Layout in Plain JavaScript",
      description: "The mandatory root layout wrapping your entire application.",
      language: "jsx",
      filename: "app/layout.js",
      code: `// app/layout.js (Pure JavaScript)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <header style={{ background: "#18181b", color: "#fff", padding: "16px 24px" }}>
          <h2 style={{ margin: 0 }}>🎨 My Awesome App</h2>
        </header>

        <main style={{ padding: "24px", minHeight: "80vh" }}>
          {children} {/* 👈 The current page.js appears here! */}
        </main>

        <footer style={{ background: "#f4f4f5", padding: "16px", textAlign: "center" }}>
          <p>© 2026 Built with Next.js</p>
        </footer>
      </body>
    </html>
  );
}`,
      explanation:
        "`{children}` is the magic slot where `page.js` gets plugged in. When you switch pages, only `{children}` updates!",
      outputPreview: "Permanent dark top header + page body + light footer frame",
    },

    moreExamples: [
      {
        title: "Nested Dashboard Layout (Russian Dolls)",
        description: "Adding a sidebar layout that ONLY applies to /dashboard and its subpages.",
        language: "jsx",
        filename: "app/dashboard/layout.js",
        code: `// app/dashboard/layout.js (Pure JavaScript)
// This wraps /dashboard, /dashboard/settings, /dashboard/analytics!

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Sidebar only exists inside dashboard/ */}
      <aside style={{ width: "200px", background: "#f4f4f5", padding: "16px", borderRadius: "8px" }}>
        <h3>📊 Dashboard Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>📈 Analytics</li>
          <li>⚙️ Settings</li>
          <li>👥 Users</li>
        </ul>
      </aside>

      {/* Dashboard Page Content */}
      <section style={{ flex: 1 }}>
        {children}
      </section>
    </div>
  );
}`,
        explanation:
          "This dashboard layout is wrapped BY the root layout. Layouts nest naturally just like folders!",
      },
    ],

    multipleWays: [
      {
        name: "layout.js (Persistent Shell)",
        syntax: "app/layout.js",
        codeSnippet: `// Preserves state on navigation (does NOT re-render)
export default function Layout({ children }) {
  return <div className="frame">{children}</div>;
}`,
        howItWorks: "Maintains DOM structure and state when navigating between child pages.",
        pros: ["Maximum performance", "Preserves scroll position and input states"],
        cons: ["Does not trigger mount/unmount animations between page swaps"],
        whenToUse: "Use for 99% of headers, sidebars, and navbars.",
        isRecommended: true,
      },
      {
        name: "template.js (Remounting Shell)",
        syntax: "app/template.js",
        codeSnippet: `// Creates a fresh instance on EVERY page navigation
export default function Template({ children }) {
  return <div className="page-transition">{children}</div>;
}`,
        howItWorks: "Creates a brand new component instance and resets state on every navigation.",
        pros: ["Useful for enter/exit page animations or reset-on-navigation logic"],
        cons: ["Re-renders and loses component state"],
        whenToUse: "Only when you specifically need page entry animations.",
        isRecommended: false,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Always default to `layout.js`. Only use `template.js` if you are building page-enter transitions.",
      scenarios: [
        {
          scenario: "You want a navbar that stays visible and doesn't flicker",
          recommendedApproach: "`app/layout.js`",
          reason: "Layouts preserve DOM identity and state during navigation.",
        },
        {
          scenario: "You want a sidebar that only appears on `/dashboard` pages",
          recommendedApproach: "`app/dashboard/layout.js`",
          reason: "Nested layouts apply exclusively to their folder and children.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Forgetting to render {children} in layout.js",
        badCode: `// ❌ BAD: Forgot {children}!
export default function RootLayout() {
  return (
    <html>
      <body>
        <nav>My Navbar</nav>
        {/* Missing {children} -> Your pages will be invisible! */}
      </body>
    </html>
  );
}`,
        goodCode: `// ✅ GOOD: Always render {children}
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>My Navbar</nav>
        <main>{children}</main>
      </body>
    </html>
  );
}`,
        whyItBreaks: "Without `{children}`, Next.js has nowhere to inject the content of `page.js`.",
        howToFix: "Always accept `{ children }` in props and place it in your JSX.",
      },
    ],

    bestPractices: [
      {
        title: "Root Layout is Mandatory",
        rule: "`app/layout.js` MUST contain `<html>` and `<body>` tags.",
        explanation: "Next.js requires the root layout to define the HTML document shell.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-3",
        title: "Build a Game Room Layout (JavaScript)",
        difficulty: "easy",
        estimatedMinutes: 5,
        prompt:
          "Create `app/arcade/layout.js` with a glowing top banner '🕹️ Retro Arcade Zone' and render `{children}` below it.",
        initialCode: `// app/arcade/layout.js
export default function ArcadeLayout({ children }) {
  // TODO: Add banner and render children
}`,
        expectedOutput: "A shared banner for all pages under /arcade/*.",
        hints: ["Accept `{ children }` as a prop", "Return a container with the banner and `{children}`"],
        solutionCode: `// app/arcade/layout.js
export default function ArcadeLayout({ children }) {
  return (
    <div>
      <div style={{ background: "#7c3aed", color: "#fff", padding: "12px 20px", borderRadius: "8px", fontWeight: "bold" }}>
        🕹️ Retro Arcade Zone
      </div>
      <div style={{ marginTop: "16px" }}>
        {children}
      </div>
    </div>
  );
}`,
        solutionExplanation:
          "Any page inside `app/arcade/` will now automatically be wrapped by this purple arcade banner without re-rendering it.",
      },
    ],

    quizzes: [
      {
        id: "u1-q4",
        question: "What happens to the `<nav>` inside `app/layout.js` when a user navigates between `/` and `/about`?",
        syllabusTopic: "Layout Persistence",
        options: [
          { id: "a", text: "It is destroyed and completely rebuilt from scratch", isCorrect: false, explanation: "That was how old websites worked, but Next.js layouts do not re-render." },
          { id: "b", text: "It stays mounted and does NOT re-render; only {children} swaps", isCorrect: true, explanation: "Correct! Next.js preserves layout instances across navigations." },
          { id: "c", text: "It turns into an error", isCorrect: false, explanation: "Layouts are designed specifically to handle navigation smoothly." },
          { id: "d", text: "It only renders once per browser reboot", isCorrect: false, explanation: "It renders on the server and stays alive in the client." },
        ],
        conceptualExplanation:
          "Layouts in Next.js App Router do not re-render on navigation. This provides smooth transitions and preserves state like active inputs or playing media.",
      },
    ],

    realWorldExample: {
      domain: "School Learning Portal",
      description: "How a university student portal keeps the top navigation bar and user profile locked while switching between homework, grades, and calendar.",
      code: {
        title: "Student Portal Root Layout",
        description: "Persistent layout in plain JavaScript.",
        language: "jsx",
        filename: "app/layout.js",
        code: `// app/layout.js (Pure JavaScript)
export default function StudentPortalLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <header style={{ display: "flex", justifyContent: "space-between", padding: "16px 24px", background: "#059669", color: "#fff" }}>
          <strong>🎓 INT257 Student Portal</strong>
          <span>👤 Alex Johnson</span>
        </header>
        <div style={{ padding: "20px" }}>{children}</div>
      </body>
    </html>
  );
}`,
      },
      keyTakeaway: "Alex stays logged in and the green header never blinks as he clicks between lessons.",
    },

    combinedExample: {
      combinedTopics: ["Root Layout", "Nested Layouts", "Children Prop"],
      title: "Nested Department and Root Layouts",
      description: "Stacking layouts across multiple folder levels in plain JavaScript.",
      code: {
        title: "Nested Layout Demonstration",
        description: "Plain JavaScript layout component.",
        language: "jsx",
        filename: "app/courses/layout.js",
        code: `export default function CoursesLayout({ children }) {
  return (
    <div style={{ border: "2px dashed #10b981", padding: "16px", borderRadius: "10px" }}>
      <p style={{ margin: 0, color: "#065f46", fontWeight: "bold" }}>
        📚 Academic Courses Department Frame
      </p>
      <div style={{ marginTop: "12px" }}>{children}</div>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Root layout renders outer HTML and header",
        "Courses layout renders dashed green border",
        "Individual course page renders inside both frames",
      ],
    },
  },

  {
    id: "navigation-and-redirects",
    unitId: "unit-1",
    title: "Navigation, Links & Redirects",
    shortSummary: "Instant teleportation with <Link>, why regular <a> tags restart your game console, programmatic redirects with useRouter, and active tab highlights.",
    order: 4,
    tags: ["Navigation", "next/link", "useRouter", "usePathname", "JavaScript"],

    simpleExplanation:
      "How do users move between pages? If you use a regular old HTML `<a href='/about'>` tag, the browser destroys the entire webpage and reloads everything from scratch — like restarting your video game console just to walk into the next room 🐢. In Next.js, we use the magical `<Link>` component! `<Link>` is like stepping through a glowing teleportation portal ⚡: instant, seamless, and everything in memory stays alive!",

    whyNeeded:
      "Single-page speed requires client-side navigation. `<Link>` automatically prefetches linked pages in the background before the user even clicks, so when they do click, the new page appears in 0.01 seconds.",

    reactVsNext: {
      concept: "Client-Side Page Navigation",
      reactWay: {
        title: "React Router <Link> and useNavigate()",
        code: `// Vanilla React (react-router-dom):
import { Link, useNavigate } from "react-router-dom";

export function NavMenu() {
  const navigate = useNavigate();

  return (
    <div>
      <Link to="/about">About Us</Link>
      <button onClick={() => navigate("/dashboard")}>Go</button>
    </div>
  );
}`,
        explanation:
          "In vanilla React, you import from `react-router-dom` using `to='...'` and `useNavigate()`.",
        drawbacks: [
          "Requires external routing library installation",
          "No automatic background prefetching of upcoming pages",
          "Different prop names (`to` vs `href`)",
        ],
      },
      nextjsWay: {
        title: "Next.js <Link> and useRouter (Plain JavaScript)",
        code: `// In Next.js:
import Link from "next/link"; // 👈 Native built-in Link component!

export function NavMenu() {
  return (
    <nav style={{ display: "flex", gap: "16px" }}>
      {/* Uses standard href, prefetches automatically! */}
      <Link href="/">🏠 Home</Link>
      <Link href="/about">ℹ️ About</Link>
      <Link href="/toys/42">🧸 Toy #42</Link>
    </nav>
  );
}`,
        explanation:
          "Next.js provides `<Link>` from `next/link` with automatic prefetching and smooth client-side transitions.",
        benefits: [
          "Zero page reload flicker",
          "Automatic prefetching when link enters the user's screen",
          "Uses standard, familiar `href` attribute",
          "Accessible and SEO-friendly for screen readers and Google robots",
        ],
      },
      whyDifferent:
        "Next.js `<Link>` intercepts browser navigation and fetches only the RSC payload for the target route without downloading all HTML again.",
      mentalShiftSummary:
        "Stop thinking: 'I will write an <a> tag.' Think: 'I will import Link from next/link for instant teleportation.'",
    },

    basicExample: {
      title: "Building an Instant Navigation Bar in Plain JavaScript",
      description: "Using <Link> from next/link for lightning fast page switches.",
      language: "jsx",
      filename: "components/Navbar.js",
      code: `// components/Navbar.js (Pure JavaScript)
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "12px", padding: "12px", background: "#f4f4f5", borderRadius: "8px" }}>
      <Link href="/" style={{ textDecoration: "none", color: "#18181b", fontWeight: "bold" }}>
        🏠 Home
      </Link>
      <Link href="/about" style={{ textDecoration: "none", color: "#18181b", fontWeight: "bold" }}>
        👋 About
      </Link>
      <Link href="/pokemon/pikachu" style={{ textDecoration: "none", color: "#d97706", fontWeight: "bold" }}>
        ⚡ Pikachu
      </Link>
    </nav>
  );
}`,
      explanation:
        "When users hover over or see these links, Next.js prefetches the destination in the background for zero-wait clicks!",
      outputPreview: "Clean navigation bar with instant-click links",
    },

    moreExamples: [
      {
        title: "Navigating with Code (useRouter in Client Components)",
        description: "Teleporting users after a button click or form submit.",
        language: "jsx",
        filename: "components/LoginButton.js",
        code: `"use client"; // 👈 useRouter needs to run in the browser!
import { useRouter } from "next/navigation"; // 👈 Remember: next/navigation!

export default function LoginButton() {
  const router = useRouter();

  function handleLogin() {
    // 1. Check user login credentials...
    console.log("Logged in successfully!");
    // 2. Teleport to the dashboard:
    router.push("/dashboard");
  }

  return (
    <button onClick={handleLogin} style={{ padding: "8px 16px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
      🔑 Log In to Dashboard
    </button>
  );
}`,
        explanation:
          "Always import `useRouter` from `'next/navigation'` (modern App Router), NOT `'next/router'`!",
      },
      {
        title: "Active Tab Highlighting with usePathname",
        description: "Making the current page link glow with an active color.",
        language: "jsx",
        filename: "components/ActiveLink.js",
        code: `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveNav() {
  const pathname = usePathname(); // e.g. "/about"

  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link
        href="/about"
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          textDecoration: "none",
          background: pathname === "/about" ? "#10b981" : "#f4f4f5",
          color: pathname === "/about" ? "#ffffff" : "#18181b",
        }}
      >
        About
      </Link>
    </nav>
  );
}`,
        explanation:
          "`usePathname` reads the current URL in the browser so you can style active tabs easily.",
      },
    ],

    multipleWays: [
      {
        name: "<Link> Component (Declarative)",
        syntax: "import Link from 'next/link'",
        codeSnippet: `<Link href="/dashboard">Go to Dashboard</Link>`,
        howItWorks: "Standard anchor tag enhanced with client-side routing and prefetching.",
        pros: ["Best for accessibility & SEO", "Automatic prefetching"],
        cons: ["Only for user-clickable links"],
        whenToUse: "Use for 95% of all navigation on your website.",
        isRecommended: true,
      },
      {
        name: "useRouter().push (Programmatic)",
        syntax: "router.push('/dashboard')",
        codeSnippet: `const router = useRouter(); router.push('/dashboard');`,
        howItWorks: "Triggers client navigation from JavaScript functions.",
        pros: ["Can be triggered after async tasks like submitting a form or timer"],
        cons: ["Requires 'use client' and useRouter hook"],
        whenToUse: "Use after form submissions, button callbacks, or payment completion.",
        isRecommended: false,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `<Link>` for visual links. Use `router.push()` for button handlers.",
      scenarios: [
        {
          scenario: "You want a navbar link to the contact page",
          recommendedApproach: "`<Link href='/contact'>Contact</Link>`",
          reason: "It enables prefetching and works with right-click 'Open in New Tab'.",
        },
        {
          scenario: "You want to redirect the user after saving a blog post",
          recommendedApproach: "`router.push('/blog')` or `redirect('/blog')`",
          reason: "Navigation must happen programmatically after the save operation finishes.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using regular <a href> instead of Next.js <Link>",
        badCode: `// ❌ BAD: Forces a full browser page refresh!
<a href="/about">About Us</a>`,
        goodCode: `// ✅ GOOD: Smooth client-side transition!
import Link from "next/link";
<Link href="/about">About Us</Link>`,
        whyItBreaks: "Standard `<a>` tags cause the entire page to reload, destroying component state and causing a harsh screen flash.",
        howToFix: "Always import `Link` from `next/link`.",
      },
      {
        mistakeTitle: "Importing useRouter from 'next/router' instead of 'next/navigation'",
        badCode: `// ❌ BAD: Outdated Pages Router import (crashes in App Router!)
import { useRouter } from "next/router";`,
        goodCode: `// ✅ GOOD: App Router import
import { useRouter } from "next/navigation";`,
        whyItBreaks: "'next/router' is only for the legacy Pages Router and throws an error in App Router.",
        howToFix: "Always import navigation hooks from `next/navigation`.",
      },
    ],

    bestPractices: [
      {
        title: "Use Next.js Link for All Internal Links",
        rule: "Use `<Link href='...'>` for internal routes and `<a href='...'>` only for external websites.",
        explanation: "This preserves single-page application speed across your entire site.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-4",
        title: "Create a Navigation Bar with 3 Links (JavaScript)",
        difficulty: "very-easy",
        estimatedMinutes: 5,
        prompt:
          "Create a component that renders `<Link>` tags to `/`, `/games`, and `/leaderboard`.",
        initialCode: `// Write your Navbar component in plain JavaScript
import Link from "next/link";

export default function GameNavbar() {
  // TODO: Return nav container with 3 links
}`,
        expectedOutput: "A navigation bar with 3 clickable Next.js links.",
        hints: ["Import Link from 'next/link'", "Use href='/' for home"],
        solutionCode: `import Link from "next/link";

export default function GameNavbar() {
  return (
    <nav style={{ display: "flex", gap: "16px", padding: "12px", background: "#18181b" }}>
      <Link href="/" style={{ color: "#fff" }}>🏠 Home</Link>
      <Link href="/games" style={{ color: "#fff" }}>🎮 Games</Link>
      <Link href="/leaderboard" style={{ color: "#fbbf24" }}>🏆 Leaderboard</Link>
    </nav>
  );
}`,
        solutionExplanation:
          "The component uses Next.js Link for instant transitions between games, home, and leaderboard.",
      },
    ],

    quizzes: [
      {
        id: "u1-q5",
        question: "Where should you import `useRouter` from in modern Next.js App Router?",
        syllabusTopic: "App Router Navigation Hooks",
        options: [
          { id: "a", text: "next/router", isCorrect: false, explanation: "next/router is the old Pages Router import and will throw an error." },
          { id: "b", text: "next/navigation", isCorrect: true, explanation: "Correct! All App Router navigation hooks come from next/navigation." },
          { id: "c", text: "react-router-dom", isCorrect: false, explanation: "Next.js has its own built-in router." },
          { id: "d", text: "next/client", isCorrect: false, explanation: "There is no next/client package." },
        ],
        conceptualExplanation:
          "In the App Router, `useRouter`, `usePathname`, and `useSearchParams` are all imported from `next/navigation`.",
      },
    ],

    realWorldExample: {
      domain: "E-Commerce Checkout",
      description: "Redirecting a customer to their receipt page after placing an order.",
      code: {
        title: "Place Order Button",
        description: "Programmatic navigation in plain JavaScript.",
        language: "jsx",
        filename: "components/CheckoutButton.js",
        code: `"use client";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const router = useRouter();

  function handleOrder() {
    alert("🎉 Order placed!");
    router.push("/order-success");
  }

  return (
    <button onClick={handleOrder} style={{ padding: "12px 24px", background: "#10b981", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
      💳 Place Order Now
    </button>
  );
}`,
      },
      keyTakeaway: "Seamlessly teleports the shopper to the receipt screen without a full page refresh.",
    },

    combinedExample: {
      combinedTopics: ["next/link", "usePathname", "Navbar Layouts"],
      title: "Interactive Tabbed Navigation Menu",
      description: "Full active-state navigation bar in plain JavaScript.",
      code: {
        title: "Tabbed Navigation Component",
        description: "Plain JavaScript component.",
        language: "jsx",
        filename: "components/TabNav.js",
        code: `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabNav() {
  const pathname = usePathname();
  const tabs = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/projects", label: "Projects" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <nav style={{ display: "flex", gap: "8px", borderBottom: "1px solid #e4e4e7", paddingBottom: "8px" }}>
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
            background: pathname === tab.href ? "#10b981" : "transparent",
            color: pathname === tab.href ? "#ffffff" : "#71717a",
          }}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}`,
      },
      stepByStepFlow: [
        "User visits `/dashboard/projects`",
        "`usePathname()` detects current route",
        "Active tab lights up green instantly",
      ],
    },
  },

  {
    id: "loading-and-error-ui",
    unitId: "unit-1",
    title: "Loading UI, Suspense & Error Boundaries",
    shortSummary: "Show instant popcorn loading spinners with loading.js, catch bugs with superhero error.js circuit breakers, and craft custom 404 screens.",
    order: 5,
    tags: ["Loading UI", "Error Boundaries", "not-found.js", "Suspense", "JavaScript"],

    simpleExplanation:
      "What happens when data takes 2 seconds to download, or when a piece of code crashes? Next.js gives you built-in superhero files! `loading.js` is like the cheerful microwave popcorn timer 🍿: while food is cooking, it shows a friendly spinner so the user knows good things are coming. `error.js` is like the electrical fuse in your house 🛡️: if a toaster in the kitchen shorts out, only the kitchen fuse clicks off — your living room lights, TV, and navbar stay on!",

    whyNeeded:
      "In older React apps, if one small component threw an error, the entire screen turned into a horrible blank white crash. And handling loading states required writing `if (loading) return <Spinner />` in every single file. Next.js does both automatically just by naming your files `loading.js` and `error.js`.",

    reactVsNext: {
      concept: "Loading States & Error Handling",
      reactWay: {
        title: "Vanilla React Manual Spinners & Class Boundaries",
        code: `// Vanilla React: Manual loading state in every component
import { useState, useEffect } from "react";

export default function UserList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, []);

  if (loading) return <div>⏳ Loading users...</div>;
  if (error) return <div>🚨 Error loading users!</div>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
        explanation:
          "In vanilla React, you have to write `useState` for loading and error in every component, or write complex class-based `componentDidCatch` boundaries.",
        drawbacks: [
          "Massive amounts of repetitive boilerplate code",
          "One unhandled error crashes the entire application",
          "Loading spinners don't stream automatically from the server",
        ],
      },
      nextjsWay: {
        title: "Next.js Automatic loading.js & error.js (Plain JavaScript)",
        code: `// 1. File: app/dashboard/loading.js (Automatic Loading!)
export default function Loading() {
  return <p>⏳ Loading dashboard data... popping popcorn! 🍿</p>;
}

// 2. File: app/dashboard/error.js (Automatic Error Circuit Breaker!)
"use client"; // error.js MUST be a Client Component!

export default function ErrorBoundary({ error, reset }) {
  return (
    <div style={{ background: "#fee2e2", padding: "16px", borderRadius: "8px" }}>
      <h2>🚨 Something went wrong in the dashboard!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>🔄 Try Again</button>
    </div>
  );
}`,
        explanation:
          "Just by naming the files `loading.js` and `error.js`, Next.js automatically wraps your page in React Suspense and Error Boundaries!",
        benefits: [
          "Zero loading state boilerplate inside page.js",
          "Crashes are isolated to only the broken room/section",
          "The reset() button lets users retry without full page reload",
          "Navbar and sidebar stay alive and interactive",
        ],
      },
      whyDifferent:
        "Next.js automatically constructs nested React Suspense boundaries for `loading.js` and Error Boundaries for `error.js` at every folder level.",
      mentalShiftSummary:
        "Stop thinking: 'I need to write if (loading) in my page.' Think: 'I will create loading.js and let Next.js handle the spinner.'",
    },

    basicExample: {
      title: "Creating an Automatic Loading Spinner in Plain JavaScript",
      description: "Drop loading.js into any folder to get instant loading feedback.",
      language: "jsx",
      filename: "app/dashboard/loading.js",
      code: `// app/dashboard/loading.js (Pure JavaScript)
export default function DashboardLoading() {
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏳</div>
      <h3 style={{ color: "#10b981", margin: 0 }}>Preparing your Dashboard...</h3>
      <p style={{ color: "#71717a", fontSize: "14px" }}>Fetching latest stats from the server</p>
    </div>
  );
}`,
      explanation:
        "Next.js streams this loading UI to the browser instantly while the server page is busy fetching database records.",
      outputPreview: "Centered animated hourglass and friendly loading text",
    },

    moreExamples: [
      {
        title: "Bulletproof Error Boundary with Retry Button",
        description: "How error.js catches crashes and provides a reset button.",
        language: "jsx",
        filename: "app/dashboard/error.js",
        code: `"use client"; // 👈 error.js must be a Client Component!

export default function ErrorPage({ error, reset }) {
  return (
    <div style={{ padding: "24px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px" }}>
      <h3 style={{ color: "#991b1b", margin: "0 0 8px 0" }}>🚨 Section Crash Protected</h3>
      <p style={{ color: "#b91c1c", fontSize: "14px" }}>{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        style={{ marginTop: "12px", padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
      >
        🔄 Retry Room
      </button>
    </div>
  );
}`,
        explanation:
          "If any child component throws an error, this box shows up instead of a white crash screen. Clicking 'Retry Room' attempts to re-render the page.",
      },
      {
        title: "Custom 404 Page (not-found.js)",
        description: "Displaying a friendly outer space screen when a URL does not exist.",
        language: "jsx",
        filename: "app/not-found.js",
        code: `// app/not-found.js (Pure JavaScript)
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "48px", margin: 0 }}>🛸 404</h1>
      <h2>Lost in Outer Space!</h2>
      <p style={{ color: "#71717a" }}>We could not find the page you were searching for.</p>
      <Link href="/" style={{ display: "inline-block", marginTop: "16px", padding: "10px 20px", background: "#10b981", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" }}>
        🚀 Beam Me Home
      </Link>
    </div>
  );
}`,
        explanation:
          "Shown automatically whenever someone visits an invalid URL on your site.",
      },
    ],

    multipleWays: [
      {
        name: "loading.js (Automatic Suspense)",
        syntax: "app/loading.js",
        codeSnippet: `export default function Loading() { return <p>Loading...</p>; }`,
        howItWorks: "Automatically wraps page.js in React Suspense boundary on the server.",
        pros: ["Zero code inside page.js", "Instant streaming feedback to user"],
        cons: ["Applies to the entire page unless granular Suspense is used"],
        whenToUse: "Use for standard route-level loading screens.",
        isRecommended: true,
      },
      {
        name: "<Suspense fallback={...}> (Granular)",
        syntax: "import { Suspense } from 'react'",
        codeSnippet: `<Suspense fallback={<CardSkeleton />}><WeatherWidget /></Suspense>`,
        howItWorks: "Wraps a specific child component inside page.js.",
        pros: ["Allows rest of page to render while only one widget loads"],
        cons: ["Requires manual JSX wrapping"],
        whenToUse: "Use when one widget on a page is slow while the rest is fast.",
        isRecommended: false,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `loading.js` and `error.js` in your route folders for effortless, crash-proof user experiences.",
      scenarios: [
        {
          scenario: "You want a smooth loading spinner while fetching server data",
          recommendedApproach: "Create `loading.js` next to your `page.js`",
          reason: "Next.js streams it immediately while server renders.",
        },
        {
          scenario: "You want to catch runtime errors without crashing the navbar",
          recommendedApproach: "Create `error.js` marked with `'use client'`",
          reason: "It acts as a circuit breaker isolating the crash to that room.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Forgetting 'use client' at the top of error.js",
        badCode: `// ❌ BAD: Server Component error boundary (will throw an error!)
export default function Error({ error, reset }) {
  return <div>{error.message}</div>;
}`,
        goodCode: `// ✅ GOOD: error.js MUST have "use client"
"use client";
export default function Error({ error, reset }) {
  return <div>{error.message}</div>;
}`,
        whyItBreaks: "Error boundaries are a client-side React feature that must listen for errors in the browser.",
        howToFix: "Always put `'use client';` on the first line of `error.js`.",
      },
    ],

    bestPractices: [
      {
        title: "Always Provide a Reset Action in Error Boundaries",
        rule: "Include the `reset` prop function on a button inside `error.js`.",
        explanation: "This allows users to recover from transient network glitches without refreshing the entire browser.",
      },
    ],

    exercises: [
      {
        id: "u1-ex-5",
        title: "Create a Friendly Loading Screen (JavaScript)",
        difficulty: "very-easy",
        estimatedMinutes: 5,
        prompt:
          "Create a default exported component for `app/leaderboard/loading.js` displaying '🏆 Loading Top Champions...'.",
        initialCode: `// app/leaderboard/loading.js
export default function LeaderboardLoading() {
  // TODO: Return loading UI
}`,
        expectedOutput: "A styled loading state for the leaderboard.",
        hints: ["Export a default function", "Return JSX with friendly emoji"],
        solutionCode: `export default function LeaderboardLoading() {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>🏆 Loading Top Champions...</h2>
      <p style={{ color: "#71717a" }}>Fetching high scores from database</p>
    </div>
  );
}`,
        solutionExplanation:
          "Next.js shows this automatically whenever someone navigates to /leaderboard while data is loading.",
      },
    ],

    quizzes: [
      {
        id: "u1-q6",
        question: "Why does `error.js` require `'use client'` at the top of the file?",
        syllabusTopic: "Error Boundaries in Next.js",
        options: [
          { id: "a", text: "Because error boundaries must catch errors and manage interactive retries in the browser", isCorrect: true, explanation: "Correct! React error boundaries are client-side components." },
          { id: "b", text: "Because servers are not allowed to have errors", isCorrect: false, explanation: "Servers can have errors, but the recovery boundary runs on the client." },
          { id: "c", text: "To make CSS load faster", isCorrect: false, explanation: "CSS is unrelated to error boundaries." },
          { id: "d", text: "Because Next.js forbids Server Components in folders", isCorrect: false, explanation: "Server Components are default everywhere else." },
        ],
        conceptualExplanation:
          "React Error Boundaries must be Client Components so they can trap render errors in the browser DOM and execute interactive `reset()` functions.",
      },
    ],

    realWorldExample: {
      domain: "Live Stock & Crypto Market",
      description: "How a financial dashboard isolates a failed stock ticker without crashing the user's portfolio view.",
      code: {
        title: "Stock Ticker Error Boundary",
        description: "Error boundary in plain JavaScript.",
        language: "jsx",
        filename: "app/stocks/error.js",
        code: `"use client";
export default function StockError({ error, reset }) {
  return (
    <div style={{ background: "#fee2e2", padding: "16px", borderRadius: "8px" }}>
      <h4>⚠️ Live Market Feed Interrupted</h4>
      <p style={{ fontSize: "12px", color: "#991b1b" }}>{error.message}</p>
      <button onClick={() => reset()} style={{ padding: "6px 12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px" }}>
        Reconnect Feed
      </button>
    </div>
  );
}`,
      },
      keyTakeaway: "One bad stock feed does not bring down the entire trading screen.",
    },

    combinedExample: {
      combinedTopics: ["loading.js", "error.js", "App Router Isolation"],
      title: "Resilient Dashboard with Independent Error Zones",
      description: "Combining loading spinners, error circuit breakers, and page layouts in plain JavaScript.",
      code: {
        title: "Complete Error & Loading Flow",
        description: "Plain JavaScript layout and loading setup.",
        language: "jsx",
        filename: "app/dashboard/loading.js",
        code: `export default function ResilientLoading() {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <p style={{ color: "#10b981", fontWeight: "bold" }}>⚡ Streaming Dashboard Metrics...</p>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "User clicks /dashboard",
        "`loading.js` displays instantly (0.01s)",
        "Server streams final HTML data",
        "If a database error occurs, `error.js` catches it smoothly with a retry button",
      ],
    },
  },
];
