import { GuidedProject } from "@/types";

export const guidedProjects: GuidedProject[] = [
  {
    id: "project-1-simple-website",
    projectNumber: 1,
    title: "Multi-Page Portfolio & Marketing Website",
    difficulty: "Beginner",
    description:
      "Build your very first multi-page Next.js App Router website featuring shared layouts, active navigation states, mobile responsive drawer, and zero-layout-shift Google fonts.",
    prerequisites: ["Unit 1: Fundamentals & App Router", "Basic HTML/CSS & JavaScript"],
    techStack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "next/font"],
    fileTree: [
      "src/app/layout.tsx",
      "src/app/page.tsx",
      "src/app/about/page.tsx",
      "src/app/contact/page.tsx",
      "src/components/Navbar.tsx",
      "src/components/Footer.tsx",
    ],
    interactiveDemoType: "website",
    keyTakeaways: [
      "Mastered root layout and nested file-based routing without react-router-dom",
      "Used next/link for instant viewport prefetching",
      "Zero layout shift typography with next/font/google",
    ],
    bonusChallenges: [
      "Add a custom loading.tsx skeleton screen",
      "Add active link highlighting using usePathname() hook",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Create the Root Layout Shell",
        description: "Define the HTML shell, Google Font, and shared navigation inside layout.tsx.",
        filename: "src/app/layout.tsx",
        code: `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex Johnson | Full-Stack Developer",
  description: "Portfolio built with Next.js App Router and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 max-w-5xl w-full mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}`,
        explanation:
          "The root layout wraps every single page in your application with the persistent Navbar and Footer without re-mounting on page transitions.",
      },
      {
        stepNumber: 2,
        title: "Build the Responsive Navbar Component",
        description: "Create an interactive navigation bar using next/link with active state highlighting.",
        filename: "src/components/Navbar.tsx",
        code: `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-zinc-100 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span>Alex.dev</span>
        </Link>
        <nav className="flex gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={\`px-3 py-1.5 rounded-lg text-sm transition-colors \${
                  isActive
                    ? "bg-zinc-800 text-emerald-400 font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }\`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}`,
        explanation:
          "Using `usePathname()` lets us highlight the active navigation item dynamically without resetting page state.",
      },
      {
        stepNumber: 3,
        title: "Create the Home Page",
        description: "Design a high-impact hero banner and skills showcase in page.tsx.",
        filename: "src/app/page.tsx",
        code: `import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12 py-10">
      <section className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Available for Hire
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
          Building full-stack web apps with Next.js & Supabase.
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          I am a software engineer specializing in modern React frameworks, TypeScript architecture, and serverless databases.
        </p>
        <div className="flex gap-3 pt-2">
          <Link href="/about" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors">
            Explore My Work
          </Link>
          <Link href="/contact" className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-xl text-sm font-medium transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}`,
        explanation:
          "The home page is a pure Server Component with zero client JavaScript overhead, giving mobile visitors instantaneous page rendering.",
      },
    ],
  },

  {
    id: "project-2-dynamic-blog",
    projectNumber: 2,
    title: "Dynamic Blog with ISR & Markdown Caching",
    shortSummary: "Build a dynamic publishing platform with [slug] routes, ISR 60-second revalidation, and dynamic OpenGraph social share cards.",
    difficulty: "Intermediate",
    description:
      "Create a production-grade blogging platform using dynamic route parameters (`app/blog/[slug]/page.tsx`), Incremental Static Regeneration (ISR), automated reading time calculation, and dynamic metadata generation.",
    prerequisites: ["Unit 1: Dynamic Routes", "Unit 2: SSG vs ISR", "Unit 5: Metadata & SEO"],
    techStack: ["Next.js App Router", "TypeScript", "ISR Caching", "Dynamic Metadata", "Tailwind CSS"],
    fileTree: [
      "src/app/blog/page.tsx",
      "src/app/blog/[slug]/page.tsx",
      "src/app/blog/[slug]/loading.tsx",
      "src/lib/posts.ts",
      "src/components/ArticleCard.tsx",
    ],
    interactiveDemoType: "blog",
    keyTakeaways: [
      "Implemented dynamic parameter extraction with async params",
      "Configured ISR background revalidation with next: { revalidate: 60 }",
      "Generated dynamic SEO metadata and OpenGraph tags per post",
    ],
    bonusChallenges: [
      "Add a category filter using URL searchParams (?category=frontend)",
      "Trigger notFound() when an invalid slug is requested",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Define the Dynamic Post Route with generateMetadata",
        description: "Create the async Server Component extracting [slug] from route params and fetching article data.",
        filename: "src/app/blog/[slug]/page.tsx",
        code: `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// 1. Dynamic SEO Metadata Generation:
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: \`\${post.title} | NextMastery Blog\`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

// 2. Main Article Server Component:
export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound(); // Displays custom not-found.tsx with 404 status!
  }

  return (
    <article className="max-w-2xl mx-auto py-10 space-y-6">
      <div className="space-y-2 border-b border-zinc-800 pb-6">
        <span className="text-xs font-mono uppercase text-amber-400">{post.category}</span>
        <h1 className="text-3xl font-extrabold text-zinc-100">{post.title}</h1>
        <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
          <time>{post.publishedAt}</time>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
        <p>{post.content}</p>
      </div>
    </article>
  );
}`,
        explanation:
          "Next.js executes `generateMetadata` on the server first, then streams the article with full SEO tags and zero client-side waterfall delay.",
      },
    ],
  },

  {
    id: "project-3-task-manager",
    projectNumber: 3,
    title: "Task Application with Server Actions & Optimistic UI",
    shortSummary: "Build a high-performance todo app with 0ms optimistic checklist toggling, pending state indicators, and server mutations.",
    difficulty: "Intermediate",
    description:
      "Build a modern Task & Study Planner using React 19 Server Actions, `useOptimistic` for instantaneous 0ms checkbox toggling, `useFormStatus` for loading spinners, and server-side cache revalidation.",
    prerequisites: ["Unit 3: Server Actions", "Unit 3: Forms & Optimistic UI"],
    techStack: ["Next.js Server Actions", "React 19 useOptimistic", "useFormStatus", "TypeScript", "Tailwind CSS"],
    fileTree: [
      "src/app/todos/page.tsx",
      "src/actions/todoActions.ts",
      "src/components/TodoList.tsx",
      "src/components/AddTodoForm.tsx",
      "src/components/SubmitButton.tsx",
    ],
    interactiveDemoType: "todo",
    keyTakeaways: [
      "Eliminated API route boilerplate by using direct Server Actions",
      "Created instant 0ms optimistic UI updates with automatic rollback on error",
      "Built accessible pending indicators with useFormStatus",
    ],
    bonusChallenges: [
      "Add priority tags (Low, Medium, High) with colored badges",
      "Add a clear all completed tasks bulk Server Action",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Create the Backend Server Actions",
        description: "Write type-safe Server Actions for inserting, toggling, and deleting tasks.",
        filename: "src/actions/todoActions.ts",
        code: `"use server";

import { revalidatePath } from "next/cache";

// In-memory or database store:
let tasks = [
  { id: 1, title: "Review Unit 1 App Router Conventions", completed: true },
  { id: 2, title: "Practice Server Actions with useOptimistic", completed: false },
];

export async function getTodosAction() {
  return tasks;
}

export async function createTodoAction(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title || title.trim() === "") return;

  tasks.push({ id: Date.now(), title: title.trim(), completed: false });
  revalidatePath("/todos");
}

export async function toggleTodoAction(id: number, completed: boolean) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed } : t);
  revalidatePath("/todos");
}

export async function deleteTodoAction(id: number) {
  tasks = tasks.filter(t => t.id !== id);
  revalidatePath("/todos");
}`,
        explanation:
          "All backend operations live in this clean module. Calling `revalidatePath('/todos')` automatically updates connected client screens.",
      },
      {
        stepNumber: 2,
        title: "Build the Optimistic Task List Component",
        description: "Use React 19 useOptimistic to update the screen in 0ms when checkboxes are tapped.",
        filename: "src/components/TodoList.tsx",
        code: `"use client";

import { useOptimistic } from "react";
import { toggleTodoAction, deleteTodoAction } from "@/actions/todoActions";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    initialTodos,
    (state, { id, completed }: { id: number; completed: boolean }) =>
      state.map((t) => (t.id === id ? { ...t, completed } : t))
  );

  const handleToggle = async (id: number, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setOptimisticTodos({ id, completed: nextStatus }); // 0ms Instant UI flip!
    await toggleTodoAction(id, nextStatus); // Server sync
  };

  return (
    <div className="space-y-2">
      {optimisticTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
        >
          <div
            onClick={() => handleToggle(todo.id, todo.completed)}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div
              className={\`w-5 h-5 rounded flex items-center justify-center border text-xs \${
                todo.completed
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "border-zinc-700 bg-zinc-950"
              }\`}
            >
              {todo.completed && "✓"}
            </div>
            <span className={todo.completed ? "line-through text-zinc-500" : "text-zinc-200"}>
              {todo.title}
            </span>
          </div>

          <button
            onClick={() => deleteTodoAction(todo.id)}
            className="text-xs text-zinc-500 hover:text-rose-400 transition-colors"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}`,
        explanation:
          "`useOptimistic` makes checkmarks flip instantly before the network call completes, delivering a fluid mobile app user experience.",
      },
    ],
  },

  {
    id: "project-4-student-portal",
    projectNumber: 4,
    title: "Student Course Explorer & University Portal",
    shortSummary: "Build a multi-tier course management explorer with search filters, parallel route slots, and streaming Suspense skeletons.",
    difficulty: "Advanced",
    description:
      "Architect a scalable University Course Explorer featuring URL-based query search filtering (`useSearchParams`), multi-tier nested layouts (`app/courses/layout.tsx`), streaming Suspense boundaries, and dynamic course registration.",
    prerequisites: ["Unit 1: Layouts", "Unit 2: Data Fetching", "Unit 6: Advanced Architecture"],
    techStack: ["Next.js App Router", "TypeScript", "React Suspense Streaming", "URL SearchParams", "Tailwind CSS"],
    fileTree: [
      "src/app/courses/layout.tsx",
      "src/app/courses/page.tsx",
      "src/app/courses/[code]/page.tsx",
      "src/components/CourseSearch.tsx",
      "src/components/CourseListSkeleton.tsx",
      "src/actions/enrollActions.ts",
    ],
    interactiveDemoType: "student-portal",
    keyTakeaways: [
      "Managed search query state in URL parameters for shareable filtered views",
      "Streamed heavy course statistics independently with React Suspense",
      "Implemented clean feature-driven architecture",
    ],
    bonusChallenges: [
      "Add grade distribution charts with lazy-loaded dynamic imports (next/dynamic)",
      "Add a PDF syllabus download Route Handler endpoint",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "URL-Based Filtered Course Explorer Page",
        description: "Read search query parameters directly inside an async Server Component.",
        filename: "src/app/courses/page.tsx",
        code: `import { Suspense } from "react";
import Link from "next/link";
import { CourseSearch } from "@/components/CourseSearch";

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

const COURSES = [
  { code: "INT257", title: "Next.js Fullstack Masterclass", credits: 4, category: "Core" },
  { code: "INT219", title: "Front-End Engineering", credits: 3, category: "Elective" },
  { code: "CSE320", title: "Distributed Cloud Architecture", credits: 4, category: "Core" },
];

export default async function CoursesDirectoryPage({ searchParams }: PageProps) {
  const { q = "", category } = await searchParams;

  const filtered = COURSES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(q.toLowerCase()) || c.code.toLowerCase().includes(q.toLowerCase());
    const matchesCategory = !category || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Academic Modules</h1>
          <p className="text-zinc-400 text-sm">Showing {filtered.length} approved courses.</p>
        </div>
        <CourseSearch initialQuery={q} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <Link
            key={course.code}
            href={\`/courses/\${course.code}\`}
            className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all space-y-2 block group"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                {course.code}
              </span>
              <span className="text-xs text-zinc-500">{course.credits} Credits</span>
            </div>
            <h2 className="text-base font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">
              {course.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}`,
        explanation:
          "By reading `searchParams` on the server, the filtered results are rendered into fast HTML directly on the backend, creating shareable bookmark-friendly URLs.",
      },
    ],
  },

  {
    id: "project-5-fullstack-supabase",
    projectNumber: 5,
    title: "Full-Stack Next.js + Supabase CRUD SaaS Platform",
    shortSummary: "Build a complete full-stack SaaS database platform with PostgreSQL tables, Row Level Security, Server Actions, and real-time data sync.",
    difficulty: "Full-Stack Master",
    description:
      "The capstone project: build a complete full-stack inventory and student management SaaS platform combining Supabase PostgreSQL database tables, Row Level Security (RLS) policies, multi-method CRUD Server Actions, Zod validation, and offline database fallback.",
    prerequisites: ["Unit 4: Supabase CRUD", "Unit 3: Server Actions", "Unit 2: Server Components"],
    techStack: ["Next.js App Router", "Supabase PostgreSQL", "Server Actions", "TypeScript", "Tailwind CSS"],
    fileTree: [
      "src/app/inventory/page.tsx",
      "src/actions/inventoryActions.ts",
      "src/lib/supabase.ts",
      "src/components/CreateProductModal.tsx",
      "src/components/ProductGrid.tsx",
      "supabase/schema.sql",
    ],
    interactiveDemoType: "fullstack-supabase",
    keyTakeaways: [
      "Engineered PostgreSQL database schema with automated timestamps and checks",
      "Wired full CRUD operations (.select(), .insert(), .update(), .delete()) to Server Actions",
      "Enforced Row Level Security (RLS) policies at the PostgreSQL database layer",
    ],
    bonusChallenges: [
      "Add pagination with Supabase .range(start, end)",
      "Add real-time database subscriptions with supabase.channel()",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Create PostgreSQL Database Schema & RLS Policies",
        description: "Define the relational schema in SQL with Row Level Security enabled.",
        filename: "supabase/schema.sql",
        code: `-- 1. Create Products Table:
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock INT NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS):
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Policy:
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  USING (true);

-- 4. Insert Initial Seed Data:
INSERT INTO products (name, price, stock, category) VALUES
  ('Mechanical Keyboard 75%', 89.99, 14, 'Hardware'),
  ('4K IPS Monitor 27-inch', 299.99, 8, 'Displays'),
  ('Ergonomic Desk Chair', 199.50, 5, 'Furniture');`,
        explanation:
          "Executing this SQL in your Supabase dashboard creates the persistent relational table and enforces database security policies.",
      },
      {
        stepNumber: 2,
        title: "Build Server Actions for Supabase Mutations",
        description: "Create type-safe Server Actions that query and mutate the Supabase PostgreSQL table.",
        filename: "src/actions/inventoryActions.ts",
        code: `"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock") || 1);
  const category = (formData.get("category") as string) || "General";

  if (!name || isNaN(price) || price <= 0) {
    return { success: false, error: "Please enter a valid product name and price." };
  }

  const { error } = await supabase.from("products").insert([
    { name: name.trim(), price, stock, category }
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/inventory");
  return { success: true };
}

export async function deleteProductAction(id: number) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/inventory");
}`,
        explanation:
          "These Server Actions execute securely on the server, ensuring direct communication with Supabase and instant UI cache synchronization.",
      },
      {
        stepNumber: 3,
        title: "Server Component Dashboard with Live Data",
        description: "Fetch products from Supabase with graceful offline fallback and render responsive cards.",
        filename: "src/app/inventory/page.tsx",
        code: `import { supabase, initialMockDb } from "@/lib/supabase";
import { deleteProductAction } from "@/actions/inventoryActions";
import { CreateProductModal } from "@/components/CreateProductModal";

export default async function InventoryPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  // Use live data or graceful mock fallback for offline sandbox mode:
  const products = data && data.length > 0 ? data : initialMockDb.products;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Store Inventory & Stock</h1>
          <p className="text-zinc-400 text-sm">Powered by Next.js Server Actions & Supabase PostgreSQL.</p>
        </div>
        <CreateProductModal />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{product.category}</span>
                <span className="text-emerald-400 font-mono font-bold text-lg">\${product.price}</span>
              </div>
              <h2 className="text-base font-semibold text-zinc-100 mt-2">{product.name}</h2>
              <p className="text-xs text-zinc-500 mt-1">Stock Level: {product.stock} units</p>
            </div>

            <form action={async () => {
              "use server";
              await deleteProductAction(product.id);
            }}>
              <button type="submit" className="w-full py-1.5 bg-zinc-950 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/30 rounded-lg text-xs font-medium transition-colors">
                Remove Item
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        explanation:
          "The complete full-stack inventory application runs seamlessly with pre-rendered server speed, instant database mutations, and graceful offline fallback.",
      },
    ],
  },
];
