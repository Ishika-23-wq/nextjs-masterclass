export interface QnAItem {
  question: string;
  shortAnswer: string;
  codeSnippet?: string;
  tip?: string;
}

export const topicQnADatabase: Record<string, QnAItem[]> = {
  "intro-and-project-structure": [
    {
      question: "What is Next.js in simple words? (10-Year-Old Explanation)",
      shortAnswer:
        "Next.js is a powerful, production-ready web framework! Think of it like a pre-built Lego Race Car kit: it comes with the engine (server rendering), GPS navigation (folder routing), and headlights already connected, so you can build blazing fast websites without complex setup.",
      codeSnippet: `// app/page.js (Pure JavaScript)
export default function HomePage() {
  return <h1>🏎️ Welcome to our Next.js Race Car!</h1>;
}`,
      tip: "Everything in Next.js runs on the server by default (0 KB client bundle).",
    },
    {
      question: "How does routing work in Next.js App Router?",
      shortAnswer:
        "Routing is based on folders! Every folder inside \`app/\` is a room in your treehouse. When you add a \`page.js\` file inside that folder, that room becomes a publicly visitable webpage URL.",
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
        "\`page.js\` is the photo inside the frame (the unique content of that page). \`layout.js\` is the permanent wooden picture frame (navbar and footer) that stays hung on the wall and never blinks when you change photos.",
      tip: "Layouts preserve user state (like an open dropdown menu) across page transitions.",
    },
  ],

  "file-based-routing": [
    {
      question: "How do I create dynamic URLs like /pokemon/pikachu or /toys/42?",
      shortAnswer:
        "Create a folder with square brackets around the name: \`app/pokemon/[name]/page.js\`. Next.js passes the name in as a gift box (\`params\`). You just unwrap it with \`await params\`!",
      codeSnippet: `// app/pokemon/[name]/page.js (Pure JavaScript)
export default async function PokemonPage({ params }) {
  // Unwrap the params gift box:
  const { name } = await params;
  return <h1>⚡ You caught: {name}!</h1>;
}`,
      tip: "In modern Next.js, always write 'await params' before reading properties.",
    },
    {
      question: "What is a catch-all route ([...slug])?",
      shortAnswer:
        "It's like a big net that catches every word in the URL! \`app/docs/[...slug]/page.js\` matches \`/docs/math\`, \`/docs/math/algebra\`, and \`/docs/math/algebra/lesson1\`. Inside your code, \`slug\` is a JavaScript array of strings.",
      codeSnippet: `// app/docs/[...slug]/page.js
export default async function DocsPage({ params }) {
  const { slug } = await params; // e.g. ["math", "algebra"]
  return <p>Section: {slug.join(" > ")}</p>;
}`,
    },
    {
      question: "What is a Route Group (folder with parentheses)?",
      shortAnswer:
        "Wrapping a folder name in parentheses like \`(marketing)\` is like wearing an invisibility cloak in Harry Potter. You see the folder in VS Code, but the browser URL completely ignores it!",
      tip: "\`app/(marketing)/about/page.js\` becomes \`/about\`, NOT \`/marketing/about\`.",
    },
  ],

  "file-based-routing-and-pages": [
    {
      question: "How do I create dynamic URLs like /pokemon/pikachu or /toys/42?",
      shortAnswer:
        "Create a folder with square brackets around the name: \`app/pokemon/[name]/page.js\`. Next.js passes the name in as a gift box (\`params\`). You just unwrap it with \`await params\`!",
      codeSnippet: `// app/pokemon/[name]/page.js (Pure JavaScript)
export default async function PokemonPage({ params }) {
  const { name } = await params;
  return <h1>⚡ You caught: {name}!</h1>;
}`,
      tip: "In modern Next.js, always write 'await params' before reading properties.",
    },
  ],

  "layouts-and-nested-routes": [
    {
      question: "Why don't layouts re-render when switching pages?",
      shortAnswer:
        "Layouts act like Russian nesting dolls (matryoshka) and picture frames. When you click a link, React only swaps out \`{children}\` (the inside photo), while keeping the navbar and footer mounted. This means zero flickering and super fast page switches!",
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
        "\`layout.js\` keeps the frame solid and never resets state. \`template.js\` tears down and rebuilds the frame on EVERY page click, which is only useful if you want enter/exit animations.",
      tip: "Use layout.js 99% of the time.",
    },
  ],

  "layouts-and-templates": [
    {
      question: "What is the difference between layout.js and template.js?",
      shortAnswer:
        "\`layout.js\` keeps the frame solid and never resets state. \`template.js\` tears down and rebuilds the frame on EVERY page click, which is only useful if you want enter/exit animations.",
      tip: "Use layout.js 99% of the time.",
    },
  ],

  "navigation-and-redirects": [
    {
      question: "Why should I use <Link> instead of regular <a> tags?",
      shortAnswer:
        "A regular \`<a>\` tag causes a full browser page refresh. Next.js \`<Link>\` is like stepping through a glowing teleportation portal ⚡ — instant, smooth, with zero page reload!",
      codeSnippet: `import Link from "next/link";

export function Navbar() {
  return <Link href="/games">🎮 Play Games</Link>;
}`,
      tip: "<Link> prefetches pages in the background automatically!",
    },
    {
      question: "How do I navigate programmatically from a button?",
      shortAnswer:
        "In Client Components, import \`useRouter\` from \`'next/navigation'\` and call \`router.push('/dashboard')\`!",
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
        "A regular \`<a>\` tag causes a full browser page reload. Next.js \`<Link>\` performs instant client-side navigation with zero reloading!",
      codeSnippet: `import Link from "next/link";

export function Navbar() {
  return <Link href="/games">🎮 Play Games</Link>;
}`,
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
export default async function TechnologyBlog() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
  const posts = await response.json();
  return (
    <div>
      <h1>Technology Blog</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}`,
      tip: "Data is pre-fetched on the server so the browser receives ready-to-display HTML.",
    },
  ],

  "caching-and-revalidation": [
    {
      question: "How does time-based revalidation (ISR) work with fetch?",
      shortAnswer:
        "Pass `{ next: { revalidate: 60 } }` to fetch. Next.js saves the result and refreshes it in the background after 60 seconds.",
      codeSnippet: `const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  next: { revalidate: 60 }
});
const posts = await response.json();`,
      tip: "Next.js can reuse the fetched result and refresh it after 60 seconds automatically.",
    },
    {
      question: "How do I clear cached data on demand?",
      shortAnswer:
        "Inside a Server Action, call `revalidatePath('/blog')`. Next.js instantly purges the stale cache and generates a fresh copy.",
    },
  ],

  "route-handlers-rest-apis": [
    {
      question: "What is an API Route Handler in Next.js?",
      shortAnswer:
        "Think of an API as a waiter in a restaurant 🍽️. Your frontend user orders data from the menu, the waiter brings the request to the kitchen (database), and delivers JSON food back to the table.",
      codeSnippet: `// app/api/students/route.js (Pure JavaScript)
import { NextResponse } from "next/server";

export async function GET() {
  const students = [
    { id: 1, name: "Rahul", course: "CSE" },
    { id: 2, name: "Priya", course: "CSE" }
  ];
  return NextResponse.json(students);
}`,
      tip: "Route Handlers must live inside route.js files, never page.js.",
    },
  ],

  "server-actions-mutations": [
    {
      question: "What is a Server Action and why is it better than old API routes?",
      shortAnswer:
        "A Server Action is like a direct walkie-talkie 📻 between your button or form and the server. You don't have to write an extra API route, fetch call, or URL endpoint!",
      codeSnippet: `// app/actions.js (Pure JavaScript)
"use server";

export async function addStudentAction(formData) {
  const name = formData.get("name");
  console.log("Adding student to school register:", name);
  return { success: true };
}`,
    },
  ],

  "forms-validation-uploads": [
    {
      question: "How do I validate a form simply in JavaScript?",
      shortAnswer:
        "Read values from `formData.get('field')`, then use standard if/else checks. If invalid, return a helpful error object to the user.",
      codeSnippet: `export async function registerAction(prevState, formData) {
  "use server";
  const name = formData.get("name");
  if (!name || name.trim().length < 3) {
    return { error: "Name must be at least 3 letters long!" };
  }
  return { success: true };
}`,
    },
  ],

  "optimistic-ui-mutations": [
    {
      question: "How does Optimistic UI work for a Like button?",
      shortAnswer:
        "1. Student clicks Like button (count is 10).\n2. UI instantly displays 11 in 0ms.\n3. Request goes to the server in the background.\n4. If success: keep 11. If failure: automatically roll back to 10!",
      codeSnippet: `const [likes, addLike] = useOptimistic(10, (curr, amt) => curr + amt);`,
      tip: "The user never has to wait for a loading spinner on like buttons or checkboxes.",
    },
  ],

  "auth-and-protected-routes-concepts": [
    {
      question: "What is the difference between a Cookie and a Session?",
      shortAnswer:
        "A **Cookie** is a small ID card stored in the student's browser 🪪. A **Session** is the teacher's notebook on the server listing who is currently in the classroom. When you show your ID card (cookie), the server checks its notebook (session) to let you in!",
      tip: "httpOnly cookies cannot be stolen by evil browser scripts.",
    },
    {
      question: "How do Protected Routes work in Next.js?",
      shortAnswer:
        "User visits `/dashboard` -> Next.js checks: Is user logged in? -> YES: Display dashboard. NO: Teleport user to `/login`!",
      codeSnippet: `// app/dashboard/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = await cookies();
  if (!cookieStore.get("session")) {
    redirect("/login");
  }
  return <h1>Welcome to your private dashboard!</h1>;
}`,
    },
  ],

  "database-and-orm-concepts": [
    {
      question: "What is a Database and what is an ORM?",
      shortAnswer:
        "A **Database** is a digital school register storing tables of students (id | name | course). An **ORM** (Object-Relational Mapper) is a friendly translator: it lets you write simple JavaScript objects (`db.student.findMany()`) instead of memorizing complex SQL commands!",
      tip: "In SQLite, your entire database lives right inside a single file: `prisma/dev.db`.",
    },
  ],

  "supabase-crud-operations": [
    {
      question: "What is CRUD in plain words?",
      shortAnswer:
        "• CREATE: Add a new student\n• READ: Show the list of students\n• UPDATE: Edit a student's course\n• DELETE: Remove a student from the register",
      codeSnippet: `// Pure JavaScript CRUD:
// CREATE:
await db.student.create({ name: "Rahul", course: "CSE" });
// READ:
const students = await db.student.findMany();
// UPDATE:
await db.student.update(1, { course: "IT" });
// DELETE:
await db.student.delete(1);`,
    },
  ],

  "environment-variables-security": [
    {
      question: "What is .env.local?",
      shortAnswer:
        "`.env.local` is your secret diary 🔒! Put your database passwords and API keys here. Never push this file to public GitHub.",
      tip: "Variables with NEXT_PUBLIC_ can be seen in browser inspect. Variables without it stay locked on the server.",
    },
  ],

  "image-and-font-optimization": [
    {
      question: "Why should I use next/image instead of <img>?",
      shortAnswer:
        "Regular `<img>` downloads heavy raw files that cause layout jumping. `<Image>` compresses images to WebP, resizes them for small phones, and reserves space so the screen never jumps!",
    },
  ],

  "metadata-seo-sitemaps": [
    {
      question: "How do I set the page title in Next.js?",
      shortAnswer:
        "Export a `metadata` object from your `page.js` or `layout.js`!",
      codeSnippet: `// app/page.js
export const metadata = {
  title: "Next.js Masterclass for Beginners",
  description: "Learn Next.js step-by-step in plain JavaScript!"
};`,
    },
  ],

  "performance-and-code-splitting": [
    {
      question: "What is Code Splitting in simple terms?",
      shortAnswer:
        "Instead of forcing users to download a heavy 100-page book all at once, Next.js gives them only Page 1! Other pages are downloaded only when the student walks into those rooms.",
    },
  ],

  "production-build-and-deployment": [
    {
      question: "What does `npm run build` do?",
      shortAnswer:
        "`npm run build` is like baking all your morning bread 🍞: Next.js checks your code, pre-renders all static pages into HTML, and optimizes everything into a lightning-fast production bundle.",
    },
  ],

  "parallel-and-intercepting-routes": [
    {
      question: "[ADVANCED] What are Parallel Routes?",
      shortAnswer:
        "Parallel Routes let you render two or more pages simultaneously in the exact same view (like a 2-player split-screen video game dashboard) using named slots like `@team` and `@analytics`.",
    },
    {
      question: "[ADVANCED] What are Intercepting Routes?",
      shortAnswer:
        "Like viewing an Instagram photo in a popup modal while keeping your place in the feed, but if you refresh or send the link to a friend, it loads as a full page!",
    },
  ],

  "middleware-proxy-edge": [
    {
      question: "[ADVANCED] What is Middleware?",
      shortAnswer:
        "`middleware.js` is a checkpoint security guard standing at the front door. Before any visitor reaches any page or route, the guard checks their credentials (cookies) and decides whether to let them in or redirect them.",
    },
  ],

  "i18n-and-architecture": [
    {
      question: "[ADVANCED] How does simple Internationalization (i18n) work?",
      shortAnswer:
        "Store your words in simple JavaScript dictionaries (`{ en: { welcome: 'Hello' }, es: { welcome: 'Hola' } }`) and load the right dictionary based on the URL parameter `/en` or `/es`.",
    },
  ],

  "security-and-testing": [
    {
      question: "[ADVANCED] What is XSS in simple words?",
      shortAnswer:
        "XSS (Cross-Site Scripting) is when a sneaky user types evil `<script>` code into an input box hoping your website runs it. Next.js protects you automatically by escaping text in JSX!",
    },
  ],
};
