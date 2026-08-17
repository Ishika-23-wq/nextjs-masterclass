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
        code: `// app/actions.js
"use server"; // Secret keyword!

export async function addScore(formData) {
  const name = formData.get("playerName");
  console.log("Saving player score to DB:", name);
  return { success: true };
}`,
      },
    ],
  },
];
