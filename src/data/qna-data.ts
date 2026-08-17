export interface QnAItem {
  question: string;
  shortAnswer: string;
  reactContrast?: string;
  codeSnippet?: string;
  tip?: string;
}

export const topicQnADatabase: Record<string, QnAItem[]> = {
  "intro-and-project-structure": [
    {
      question: "What is Next.js in simple words? (10-Year-Old Explanation)",
      shortAnswer:
        "React is like a bucket of loose Lego bricks — you have to build your own engine and wheels. Next.js is a pre-built Lego Race Car kit! It comes with the engine (server rendering), GPS navigation (folder routing), and headlights already connected.",
      reactContrast:
        "In plain React, you have to install React Router, Vite, and an external backend server by hand. In Next.js, everything lives together in one single project.",
      codeSnippet: `// app/page.js (Pure JavaScript)
export default function HomePage() {
  return <h1>🏎️ Welcome to our Next.js Race Car!</h1>;
}`,
      tip: "Everything in Next.js runs on the server by default (0 KB client bundle).",
    },
    {
      question: "How does routing work in Next.js App Router?",
      shortAnswer:
        "Routing is based on folders! Every folder inside `app/` is a room in your treehouse. When you add a `page.js` file inside that folder, that room becomes a publicly visitable webpage URL.",
      codeSnippet: `// File: app/about/page.js
// Maps directly to URL: http://localhost:3000/about

export default function AboutPage() {
  return <h1>👋 Meet our Lego Builders!</h1>;
}`,
      tip: "A folder without a page.js is private and cannot be visited by users.",
    },
    {
      question: "What is the difference between page.js and layout.js?",
      shortAnswer:
        "`page.js` is the photo inside the frame (the unique content of that page). `layout.js` is the permanent wooden picture frame (navbar and footer) that stays hung on the wall and never blinks when you change photos.",
      tip: "Layouts preserve user state (like an open dropdown menu) across page transitions.",
    },
  ],

  "file-based-routing": [
    {
      question: "How do I create dynamic URLs like /pokemon/pikachu or /toys/42?",
      shortAnswer:
        "Create a folder with square brackets around the name: `app/pokemon/[name]/page.js`. Next.js passes the name in as a gift box (`params`). You just unwrap it with `await params`!",
      codeSnippet: `// app/pokemon/[name]/page.js (Pure JavaScript)
export default async function PokemonPage({ params }) {
  // Unwrap the params gift box:
  const { name } = await params;
  return <h1>⚡ You caught: {name}!</h1>;
}`,
      reactContrast:
        "In React Router, you had to write `<Route path='/pokemon/:name' />` and use `useParams()`. In Next.js, the folder name IS the route!",
      tip: "In modern Next.js, always write 'await params' before reading properties.",
    },
    {
      question: "What is a catch-all route ([...slug])?",
      shortAnswer:
        "It's like a big net that catches every word in the URL! `app/docs/[...slug]/page.js` matches `/docs/math`, `/docs/math/algebra`, and `/docs/math/algebra/lesson1`. Inside your code, `slug` is a JavaScript array of strings.",
      codeSnippet: `// app/docs/[...slug]/page.js
export default async function DocsPage({ params }) {
  const { slug } = await params; // e.g. ["math", "algebra"]
  return <p>Section: {slug.join(" > ")}</p>;
}`,
    },
    {
      question: "What is a Route Group (folder with parentheses)?",
      shortAnswer:
        "Wrapping a folder name in parentheses like `(marketing)` is like wearing an invisibility cloak in Harry Potter. You see the folder in VS Code, but the browser URL completely ignores it!",
      tip: "`app/(marketing)/about/page.js` becomes `/about`, NOT `/marketing/about`.",
    },
  ],

  "file-based-routing-and-pages": [
    {
      question: "How do I create dynamic URLs like /pokemon/pikachu or /toys/42?",
      shortAnswer:
        "Create a folder with square brackets around the name: `app/pokemon/[name]/page.js`. Next.js passes the name in as a gift box (`params`). You just unwrap it with `await params`!",
      codeSnippet: `// app/pokemon/[name]/page.js (Pure JavaScript)
export default async function PokemonPage({ params }) {
  const { name } = await params;
  return <h1>⚡ You caught: {name}!</h1>;
}`,
      reactContrast:
        "In React Router, you had to write `<Route path='/pokemon/:name' />` and use `useParams()`. In Next.js, the folder name IS the route!",
      tip: "In modern Next.js, always write 'await params' before reading properties.",
    },
  ],

  "layouts-and-nested-routes": [
    {
      question: "Why don't layouts re-render when switching pages?",
      shortAnswer:
        "Layouts act like Russian nesting dolls (matryoshka) and picture frames. When you click a link, React only swaps out `{children}` (the inside photo), while keeping the navbar and footer mounted. This means zero flickering and super fast page switches!",
      codeSnippet: `// app/layout.js (Pure JavaScript)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>🚀 My Permanent Navbar</nav>
        <main>{children}</main>
      </body>
    </html>
  );
}`,
      tip: "Layouts nest automatically: a dashboard layout wraps inside the root layout.",
    },
    {
      question: "What is the difference between layout.js and template.js?",
      shortAnswer:
        "`layout.js` keeps the frame solid and never resets state. `template.js` tears down and rebuilds the frame on EVERY page click, which is only useful if you want enter/exit animations.",
      tip: "Use layout.js 99% of the time.",
    },
  ],

  "layouts-and-templates": [
    {
      question: "What is the difference between layout.js and template.js?",
      shortAnswer:
        "`layout.js` keeps the frame solid and never resets state. `template.js` tears down and rebuilds the frame on EVERY page click, which is only useful if you want enter/exit animations.",
      tip: "Use layout.js 99% of the time.",
    },
  ],

  "navigation-and-redirects": [
    {
      question: "Why should I use <Link> instead of regular <a> tags?",
      shortAnswer:
        "A regular `<a href>` tag is like restarting your video game console just to walk into the next room 🐢. Next.js `<Link>` is like stepping through a glowing teleportation portal ⚡ — instant, smooth, with zero full-page reload!",
      codeSnippet: `import Link from "next/link";

export function Navbar() {
  return <Link href="/games">🎮 Play Games</Link>;
}`,
      reactContrast:
        "HTML `<a href='...'>` causes a slow browser reload and destroys client memory state.",
      tip: "<Link> prefetches pages in the background automatically!",
    },
    {
      question: "How do I navigate programmatically from a button?",
      shortAnswer:
        "In Client Components, import `useRouter` from `'next/navigation'` (NOT the old 'next/router') and call `router.push('/dashboard')`!",
      codeSnippet: `"use client";
import { useRouter } from "next/navigation";

export function LoginBtn() {
  const router = useRouter();
  return <button onClick={() => router.push("/dashboard")}>Log In</button>;
}`,
    },
  ],

  "navigation-and-linking": [
    {
      question: "Why should I use <Link> instead of <a>?",
      shortAnswer:
        "A regular `<a href>` tag is like restarting your video game console just to walk into the next room 🐢. Next.js `<Link>` is like stepping through a glowing teleportation portal ⚡ — instant, smooth, with zero full-page reload!",
      codeSnippet: `import Link from "next/link";

export function Navbar() {
  return <Link href="/games">🎮 Play Games</Link>;
}`,
      reactContrast:
        "HTML `<a href='...'>` causes a slow browser reload and destroys client memory state.",
    },
  ],

  "loading-and-error-ui": [
    {
      question: "How do I show a loading spinner without useState?",
      shortAnswer:
        "Just drop a `loading.js` file into your folder! It works like a cheerful microwave popcorn timer 🍿: while server data is cooking, Next.js displays `loading.js` automatically with zero code inside your page.",
      codeSnippet: `// app/dashboard/loading.js (Pure JavaScript)
export default function Loading() {
  return <p>⏳ Loading your dashboard... popping popcorn! 🍿</p>;
}`,
    },
    {
      question: "Why MUST error.js have 'use client' at the very top?",
      shortAnswer:
        "`error.js` is like an electrical circuit breaker in your house 🛡️. If a toaster in the kitchen shorts out, only the kitchen fuse clicks off so the rest of the house stays on. Because the retry button (`reset()`) runs in the user's browser, `error.js` MUST be a Client Component.",
      codeSnippet: `"use client"; // Required!
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>🚨 Room Crash Caught!</h2>
      <button onClick={() => reset()}>🔄 Try Again</button>
    </div>
  );
}`,
    },
  ],

  "rendering-paradigms": [
    {
      question: "What are SSR, SSG, and ISR in simple bakery terms?",
      shortAnswer:
        "• SSG (Bakery Bread): Baked once in the morning, handed out to 1,000 customers instantly.\n• SSR (Fresh Pizza): Baked fresh every time a customer orders.\n• ISR (Fresh Batches): Pre-baked, but the bakery bakes a fresh batch every 60 seconds automatically.",
      tip: "Next.js automatically chooses SSG by default whenever you don't use dynamic cookies or headers.",
    },
  ],

  "server-vs-client-components": [
    {
      question: "What is the #1 rule of Server vs Client Components?",
      shortAnswer:
        "All components in Next.js are **Server Components by default** (cooked in the kitchen). You only add `'use client'` at the very top of a file if that component needs browser buttons (`onClick`), inputs (`onChange`), or scoreboard state (`useState`).",
      tip: "Keep Client Components small and at the leaves of your component tree.",
    },
  ],

  "data-fetching-strategies": [
    {
      question: "How do I fetch data in a Server Component?",
      shortAnswer:
        "Simply make your component function `async` and `await fetch(...)` or query your database directly! No `useEffect`, no `useState`, and no loading flags needed.",
      codeSnippet: `// Server Component in Pure JavaScript
export default async function ToysPage() {
  const res = await fetch("https://api.example.com/toys");
  const toys = await res.json();
  return <div>{toys.map(t => <p key={t.id}>{t.name}</p>)}</div>;
}`,
    },
  ],
};
