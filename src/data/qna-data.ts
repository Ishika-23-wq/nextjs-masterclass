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
      question: "What is Next.js in simple words?",
      shortAnswer:
        "Next.js is a full-stack web framework built on top of React. It gives you automatic routing, server rendering, database actions, and image optimization out of the box with zero configuration.",
      reactContrast:
        "In vanilla React, you have to manually install and configure React Router, Vite/Webpack, and an external Node.js backend. In Next.js, everything is included in one unified project.",
      tip: "Everything in Next.js runs on the server by default (0 KB client bundle).",
    },
    {
      question: "How does routing work in Next.js App Router?",
      shortAnswer:
        "Routing is based on folders. Every folder inside `src/app/` represents a URL segment. When you add a `page.tsx` file inside a folder, that folder becomes a publicly visitable URL path.",
      codeSnippet: `// File: src/app/about/page.tsx
// Maps directly to URL: https://yoursite.com/about

export default function AboutPage() {
  return <h1>About Us</h1>;
}`,
      tip: "Folders without a page.tsx are private and cannot be visited by users.",
    },
    {
      question: "What is the difference between page.tsx and layout.tsx?",
      shortAnswer:
        "`page.tsx` is the unique content of a specific page. `layout.tsx` is the shared outer frame (like your Navbar and Footer) that stays mounted and does not re-render when switching pages.",
      tip: "Layouts preserve user state (like sidebar scroll position) across route transitions.",
    },
  ],

  "file-based-routing-and-pages": [
    {
      question: "How do I create dynamic URLs like /courses/101 or /courses/react?",
      shortAnswer:
        "Create a folder with square brackets around the name: `src/app/courses/[id]/page.tsx`. Next.js passes the route parameter inside the `params` Promise.",
      codeSnippet: `// src/app/courses/[id]/page.tsx
export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <h1>Viewing Course #{id}</h1>;
}`,
      reactContrast:
        "In React Router, you write `<Route path='/courses/:id' />` and use `useParams()`. In Next.js, the folder structure is your router.",
    },
    {
      question: "What is a catch-all route ([...slug])?",
      shortAnswer:
        "Catch-all routes match multiple URL segments in one file (e.g. `/docs/intro/getting-started/installation`). It gives you an array of slugs: `slug: ['intro', 'getting-started', 'installation']`.",
    },
  ],

  "layouts-and-templates": [
    {
      question: "What is the difference between layout.tsx and template.tsx?",
      shortAnswer:
        "`layout.tsx` persists across page navigations without re-rendering or resetting state. `template.tsx` creates a brand new instance on EVERY navigation, resetting all child component state and re-running entrance animations.",
      tip: "Use layout.tsx 95% of the time. Use template.tsx only when you need enter/exit animations.",
    },
  ],

  "navigation-and-linking": [
    {
      question: "Why should I use <Link> instead of <a>?",
      shortAnswer:
        "Next.js `<Link>` performs instant client-side page transitions without a full page reload and automatically prefetches the linked page in the background when the link scrolls into the user's viewport.",
      codeSnippet: `import Link from "next/link";

export function Navbar() {
  return <Link href="/courses">Explore Courses</Link>;
}`,
      reactContrast:
        "HTML `<a href='...'>` causes a slow browser reload and destroys client memory state.",
    },
    {
      question: "How do I navigate programmatically in code?",
      shortAnswer:
        "In Client Components, use `const router = useRouter()` from `'next/navigation'` and call `router.push('/target')`. In Server Components or Server Actions, call `redirect('/target')`.",
    },
  ],

  "loading-and-error-ui": [
    {
      question: "How do I show a loading spinner without useState?",
      shortAnswer:
        "Create a `loading.tsx` file in your route folder. Next.js automatically wraps your `page.tsx` in a React `<Suspense>` boundary and shows `loading.tsx` instantly while server data is being fetched.",
      codeSnippet: `// src/app/dashboard/loading.tsx
export default function Loading() {
  return <div className="animate-pulse h-40 bg-zinc-800 rounded-xl" />;
}`,
    },
    {
      question: "Why MUST error.tsx have 'use client' at the top?",
      shortAnswer:
        "`error.tsx` is a React Error Boundary. React Error Boundaries must execute in the browser to catch runtime rendering errors and provide recovery mechanisms like `reset()` without crashing the entire app.",
    },
  ],

  "rendering-paradigms": [
    {
      question: "What are SSR, SSG, and ISR in simple terms?",
      shortAnswer:
        "• SSG (Static): HTML is generated once at build time (fastest, 0ms response).\n• SSR (Dynamic): HTML is generated on the server on EVERY user request.\n• ISR (Incremental Static): Static HTML that re-generates automatically in the background every X seconds.",
      tip: "Next.js automatically chooses SSG by default whenever you don't use dynamic request headers or cookies.",
    },
    {
      question: "How do I enable ISR for a page?",
      shortAnswer:
        "Add `{ next: { revalidate: 60 } }` to your fetch request, or export `export const revalidate = 60;` from your page file.",
    },
  ],

  "server-vs-client-components": [
    {
      question: "What is the #1 rule of Server vs Client Components?",
      shortAnswer:
        "All components in Next.js App Router are **Server Components by default**. You only add `'use client'` at the very top of a file if that component uses browser state (`useState`), effects (`useEffect`), or user event listeners (`onClick`, `onChange`).",
      tip: "Keep Client Components small and push them to the leaves of your component tree.",
    },
    {
      question: "Can a Server Component import a Client Component?",
      shortAnswer:
        "YES! A Server Component can import and render a Client Component freely. You can also pass Server Components as `children` into Client Components.",
    },
  ],

  "data-fetching-strategies": [
    {
      question: "How do I fetch data in a Server Component?",
      shortAnswer:
        "Simply make your component function `async` and `await fetch(...)` or query your database directly! No `useEffect`, no `useState`, and no loading flags needed.",
      codeSnippet: `// Server Component: direct async/await!
export default async function Courses() {
  const res = await fetch("https://api.example.com/courses");
  const courses = await res.json();
  return <ul>{courses.map((c: any) => <li key={c.id}>{c.title}</li>)}</ul>;
}`,
      reactContrast:
        "In React, you needed `const [data, setData] = useState([])` and a `useEffect(() => { fetch().then(...) }, [])` hook.",
    },
  ],

  "caching-and-revalidation": [
    {
      question: "How do I clear the cache when data changes?",
      shortAnswer:
        "Inside your Server Action, call `revalidatePath('/courses')` to update that page's cache for all users, or use `revalidateTag('courses-tag')`.",
    },
  ],

  "route-handlers-rest-apis": [
    {
      question: "What is a Route Handler in Next.js?",
      shortAnswer:
        "A Route Handler is a backend REST API endpoint created by exporting functions named `GET`, `POST`, `PUT`, `DELETE` from a `route.ts` file.",
      codeSnippet: `// src/app/api/students/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ students: ["Ishika", "Rahul", "Aarav"] });
}`,
    },
  ],

  "server-actions-mutations": [
    {
      question: "What is a Server Action and why is it better than API routes?",
      shortAnswer:
        "A Server Action is a secure async backend function marked with `'use server'` that can be called directly from an HTML `<form action={myAction}>` or button click with zero boilerplate API endpoints.",
      codeSnippet: `async function addStudentAction(formData: FormData) {
  "use server";
  const name = formData.get("name");
  await db.students.create({ name });
  revalidatePath("/students");
}`,
      tip: "Works even if JavaScript fails to load on slow mobile connections (progressive enhancement)!",
    },
  ],

  "forms-validation-uploads": [
    {
      question: "How do I validate form data safely?",
      shortAnswer:
        "Use Zod to parse `Object.fromEntries(formData)` inside your Server Action before saving to the database. If validation fails, return structured errors to the form.",
    },
  ],

  "optimistic-ui-mutations": [
    {
      question: "What is Optimistic UI?",
      shortAnswer:
        "Optimistic UI updates the screen instantly (in 0 milliseconds) assuming the server request will succeed. If the server request fails, React automatically rolls the UI back to the previous state.",
      tip: "Use the React 19 `useOptimistic()` hook wrapped in `useTransition()`.",
    },
  ],

  "auth-and-protected-routes-concepts": [
    {
      question: "How do protected routes work in Next.js?",
      shortAnswer:
        "We use `middleware.ts` running at the Edge to check for a secure HTTP-Only cookie. If the cookie is missing or invalid, the middleware immediately redirects the user before the page even renders.",
    },
  ],

  "database-and-orm-concepts": [
    {
      question: "Can I query a database directly in Next.js without creating a separate Express server?",
      shortAnswer:
        "YES! Because Server Components and Server Actions execute on the server, you can import your database client (Supabase, Prisma, Drizzle) and run queries directly inside your UI files.",
    },
  ],

  "supabase-crud-operations": [
    {
      question: "How do I perform CRUD operations with Supabase in Next.js?",
      shortAnswer:
        "• CREATE: `await supabase.from('table').insert([{ ... }])`\n• READ: `await supabase.from('table').select('*')`\n• UPDATE: `await supabase.from('table').update({ ... }).eq('id', id)`\n• DELETE: `await supabase.from('table').delete().eq('id', id)`",
    },
  ],

  "environment-variables-security": [
    {
      question: "What is the difference between secret env vars and NEXT_PUBLIC_*?",
      shortAnswer:
        "Variables without a prefix (e.g. `DATABASE_URL`) are strictly private and ONLY accessible on the server. Variables prefixed with `NEXT_PUBLIC_` are baked into the browser JavaScript bundle and visible to anyone inspecting the page.",
      tip: "NEVER put database passwords, service role keys, or private API secrets in NEXT_PUBLIC_*.",
    },
  ],

  "image-and-font-optimization": [
    {
      question: "Why should I never use standard <img> in Next.js?",
      shortAnswer:
        "`next/image` automatically converts PNG/JPEGs into modern WebP/AVIF formats, resizes images based on screen width, prevents Cumulative Layout Shift (CLS), and lazily loads images outside the viewport.",
    },
  ],

  "metadata-seo-sitemaps": [
    {
      question: "How do I set the page title and meta description?",
      shortAnswer:
        "Export a static `metadata` object from `page.tsx` or `layout.tsx`, or export an async `generateMetadata({ params })` function for dynamic route titles.",
    },
  ],

  "performance-and-code-splitting": [
    {
      question: "How do I lazy load a heavy component?",
      shortAnswer:
        "Use `next/dynamic`: `const HeavyChart = dynamic(() => import('@/components/Chart'), { ssr: false, loading: () => <p>Loading chart...</p> });`.",
    },
  ],

  "production-build-and-deployment": [
    {
      question: "How do I create a production build of Next.js?",
      shortAnswer:
        "Run `npm run build` (which runs `next build`). This type-checks TypeScript, compiles Server Components with Turbopack, pre-renders static pages, and produces an optimized `.next` output directory.",
    },
  ],

  "parallel-and-intercepting-routes": [
    {
      question: "What is an Intercepting Route ((.)photo)?",
      shortAnswer:
        "It intercepts a link click to render that route inside a modal over the current page (like Instagram's photo feed), while still giving it a unique shareable URL that loads as a full page on refresh.",
    },
  ],

  "middleware-proxy-edge": [
    {
      question: "What does middleware.ts do?",
      shortAnswer:
        "`middleware.ts` runs on every single incoming HTTP request before routing takes place. It is used for authentication checks, URL redirects, proxy rewrites, and security headers.",
    },
  ],

  "i18n-and-architecture": [
    {
      question: "How does Internationalization (i18n) work in App Router?",
      shortAnswer:
        "Use a subpath pattern like `src/app/[lang]/page.tsx` combined with a dictionary loader that dynamically imports JSON translations based on the `lang` parameter.",
    },
  ],

  "security-and-testing": [
    {
      question: "How do I protect against XSS and CSRF in Next.js?",
      shortAnswer:
        "React automatically escapes HTML strings to prevent XSS. Next.js Server Actions have built-in CSRF protection by validating the Origin header on every POST request.",
    },
  ],
};
