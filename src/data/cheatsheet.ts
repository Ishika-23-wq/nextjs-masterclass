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
    title: "1. App Router Magic Files (JavaScript)",
    category: "Routing & Project Structure",
    snippets: [
      {
        title: "page.js (The Main Stage)",
        description: "Defines the visible webpage for that folder URL.",
        language: "jsx",
        code: `// app/about/page.js
export default function AboutPage() {
  return <h1>👋 Welcome to our About Page!</h1>;
}`,
      },
      {
        title: "layout.js (The Picture Frame)",
        description: "The unbreakable picture frame wrapping pages without re-rendering.",
        language: "jsx",
        code: `// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>🚀 My Permanent Navbar</nav>
        <main>{children}</main>
        <footer>© 2026 NextMastery</footer>
      </body>
    </html>
  );
}`,
      },
      {
        title: "loading.js (The Popcorn Timer)",
        description: "Automatic loading spinner shown while server data is cooking.",
        language: "jsx",
        code: `// app/dashboard/loading.js
export default function Loading() {
  return <p>⏳ Loading data... popping fresh popcorn! 🍿</p>;
}`,
      },
      {
        title: "error.js (The Circuit Breaker)",
        description: "Catches bugs and crashes so the rest of the website stays alive. Must have 'use client'!",
        language: "jsx",
        code: `"use client"; // Required!

export default function ErrorBoundary({ error, reset }) {
  return (
    <div style={{ background: "#fee2e2", padding: "16px" }}>
      <p style={{ color: "#991b1b" }}>🚨 {error.message}</p>
      <button onClick={() => reset()}>🔄 Try Again</button>
    </div>
  );
}`,
      },
      {
        title: "not-found.js (Outer Space 404)",
        description: "Friendly screen shown when someone visits a missing URL.",
        language: "jsx",
        code: `import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🛸 404 - Lost in Outer Space!</h1>
      <Link href="/">🚀 Beam Me Back Home</Link>
    </div>
  );
}`,
      },
    ],
  },

  {
    title: "2. Dynamic & Nested Routes",
    category: "Routing & URLs",
    snippets: [
      {
        title: "Dynamic Route [slug]",
        description: "One single file handling thousands of dynamic items.",
        language: "jsx",
        code: `// app/pokemon/[name]/page.js
export default async function PokemonPage({ params }) {
  // Unwrap the params gift box:
  const { name } = await params;
  return <h1>⚡ Pokemon: {name}</h1>;
}`,
      },
      {
        title: "Catch-All Route [...slug]",
        description: "Captures all subfolder segments into a JavaScript array.",
        language: "jsx",
        code: `// app/docs/[...slug]/page.js
export default async function DocsPage({ params }) {
  const { slug } = await params; // Array of strings e.g. ["math", "algebra"]
  return <p>Section: {slug.join(" > ")}</p>;
}`,
      },
      {
        title: "Route Groups (Invisible Folders)",
        description: "Folders in parentheses (folderName) are skipped in the browser URL.",
        language: "bash",
        code: `app/(marketing)/about/page.js   ->  /about   ((marketing) is invisible!)
app/(shop)/toys/page.js          ->  /toys`,
      },
    ],
  },

  {
    title: "3. Navigation & Teleportation",
    category: "Client Navigation",
    snippets: [
      {
        title: "<Link> Component (Instant Teleport)",
        description: "Instant client-side transition without full page reloading.",
        language: "jsx",
        code: `import Link from "next/link";

export function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "12px" }}>
      <Link href="/">🏠 Home</Link>
      <Link href="/about">ℹ️ About</Link>
    </nav>
  );
}`,
      },
      {
        title: "useRouter().push (Programmatic Navigation)",
        description: "Navigate users from button clicks or form submits.",
        language: "jsx",
        code: `"use client";
import { useRouter } from "next/navigation"; // 👈 Remember: next/navigation!

export function LoginButton() {
  const router = useRouter();
  return <button onClick={() => router.push("/dashboard")}>🔑 Log In</button>;
}`,
      },
      {
        title: "Active Tab with usePathname",
        description: "Highlight the active page in your navbar.",
        language: "jsx",
        code: `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavTab({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} style={{ fontWeight: isActive ? "bold" : "normal" }}>
      {label}
    </Link>
  );
}`,
      },
    ],
  },

  {
    title: "4. Data Fetching & Bakery Paradigms",
    category: "Rendering & Fetch",
    snippets: [
      {
        title: "Server Component Direct Fetch (SSG / Static)",
        description: "Pre-baked morning bread: fast and cached by default.",
        language: "jsx",
        code: `export default async function ToysPage() {
  const res = await fetch("https://api.example.com/toys");
  const toys = await res.json();
  return <div>{toys.map(t => <p key={t.id}>{t.name}</p>)}</div>;
}`,
      },
      {
        title: "Time-Based Revalidation (ISR)",
        description: "Bakes a fresh batch automatically every 60 seconds.",
        language: "javascript",
        code: `const res = await fetch("https://api.example.com/scores", {
  next: { revalidate: 60 } // Re-bake every 60 seconds
});`,
      },
      {
        title: "Dynamic Server Rendering (Fresh Pizza SSR)",
        description: "Cooks the meal fresh on every request.",
        language: "javascript",
        code: `const res = await fetch("https://api.example.com/live-stock", {
  cache: "no-store"
});`,
      },
    ],
  },

  {
    title: "5. Server Actions (The Secret Walkie-Talkie)",
    category: "Full-Stack Mutations",
    snippets: [
      {
        title: "Server Action Function",
        description: "Talk directly to the backend database from a button or form with no API routes.",
        language: "javascript",
        code: `// app/actions.js (Pure JavaScript)
"use server"; // Secret keyword!

export async function addScore(formData) {
  const name = formData.get("playerName");
  console.log("Saving player score to DB:", name);
  return { success: true };
}`,
      },
      {
        title: "useOptimistic (0ms Instant UI)",
        description: "Show the new number or like immediately, then sync with server.",
        language: "jsx",
        code: `"use client";
import { useOptimistic, useTransition } from "react";

export function LikeButton({ initialLikes = 10 }) {
  const [isPending, startTransition] = useTransition();
  const [likes, addLike] = useOptimistic(initialLikes, (curr, amount) => curr + amount);

  const handleLike = () => {
    startTransition(async () => {
      addLike(1); // 0ms instant!
      await saveLikeToServer();
    });
  };

  return <button onClick={handleLike}>❤️ {likes}</button>;
}`,
      },
    ],
  },

  {
    title: "6. Authentication & Protected Routes (The Security Guard)",
    category: "Security & Sessions",
    snippets: [
      {
        title: "Protected Route Guard in page.js",
        description: "Check cookie or session before displaying the private room.",
        language: "jsx",
        code: `// app/dashboard/page.js (Pure JavaScript)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  // Security guard check:
  if (!token) {
    redirect("/login");
  }

  return <h1>🛡️ Private Dashboard: Welcome back!</h1>;
}`,
      },
    ],
  },

  {
    title: "7. Database & CRUD (The School Register)",
    category: "Database & ORM",
    snippets: [
      {
        title: "CRUD Operations (Create, Read, Update, Delete)",
        description: "Connecting JavaScript to your database via ORM or client.",
        language: "javascript",
        code: `// 1. CREATE: Add student
await db.student.create({ data: { name: "Rahul", course: "CSE" } });

// 2. READ: Get students
const students = await db.student.findMany();

// 3. UPDATE: Edit student
await db.student.update({ where: { id: 1 }, data: { course: "IT" } });

// 4. DELETE: Delete student
await db.student.delete({ where: { id: 1 } });`,
      },
    ],
  },

  {
    title: "8. Images, SEO & Middleware",
    category: "Performance & Headers",
    snippets: [
      {
        title: "Optimized <Image /> Component",
        description: "Zero layout shift and automatic WebP image compression.",
        language: "jsx",
        code: `import Image from "next/image";

export function Hero() {
  return (
    <Image
      src="/hero.png"
      width={600}
      height={300}
      alt="Fun hero banner"
      priority // Loads immediately without delay
    />
  );
}`,
      },
      {
        title: "Dynamic Metadata (SEO Social Card)",
        description: "Give every page a custom Google title and WhatsApp share preview.",
        language: "javascript",
        code: `// app/blog/[id]/page.js (Pure JavaScript)
export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: \`Blog Post #\${id} | NextMastery\`,
    description: "Read our fun beginner guide!",
  };
}`,
      },
      {
        title: "middleware.js (The Airport Checkpoint)",
        description: "Inspect every visitor before they reach any room.",
        language: "javascript",
        code: `// middleware.js (Pure JavaScript, at project root)
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth_token");

  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}`,
      },
    ],
  },
];
