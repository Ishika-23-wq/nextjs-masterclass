import { GuidedProject } from "@/types";

export const guidedProjects: GuidedProject[] = [
  {
    id: "project-1-simple-website",
    projectNumber: 1,
    title: "Multi-Page Portfolio & Marketing Website",
    difficulty: "Beginner",
    description:
      "Build your very first multi-page Next.js website using plain JavaScript! Learn how the picture frame (Root Layout) holds your Navbar and Footer steady while your pages switch in a snap using teleportation (<Link>).",
    prerequisites: ["Unit 1: Fundamentals & App Router", "Basic HTML/CSS & JavaScript"],
    techStack: ["Next.js App Router", "JavaScript", "Tailwind CSS", "next/font"],
    fileTree: [
      "src/app/layout.js",
      "src/app/page.js",
      "src/app/about/page.js",
      "src/app/contact/page.js",
      "src/components/Navbar.js",
      "src/components/Footer.js",
    ],
    interactiveDemoType: "website",
    keyTakeaways: [
      "Mastered root layout and nested file-based routing without needing react-router-dom",
      "Used next/link for instant page transitions without full-page browser reloads",
      "Zero layout shift typography with next/font/google",
    ],
    bonusChallenges: [
      "Add a custom loading.js skeleton screen",
      "Add active link highlighting using the usePathname() hook",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Create the Root Layout Shell (The Picture Frame)",
        description: "Define the HTML shell, Google Font, and shared navigation inside layout.js.",
        filename: "src/app/layout.js",
        code: `import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alex Johnson | Full-Stack Developer",
  description: "Portfolio built with Next.js App Router and Tailwind CSS.",
};

// The Root Layout is like a photo frame:
// The border (Navbar + Footer) stays, while the photo (children) changes!
export default function RootLayout({ children }) {
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
          "The root layout wraps every single page in your application with the persistent Navbar and Footer. When users navigate between pages, the Navbar and Footer stay in place without flickering or re-rendering.",
      },
      {
        stepNumber: 2,
        title: "Build the Responsive Navbar Component",
        description: "Create an interactive navigation bar using next/link with active state highlighting.",
        filename: "src/components/Navbar.js",
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
          "We add 'use client' because we need the browser hook usePathname() to see which page is active. Clicking any Link teleports the user to that page instantly without reloading the entire website.",
      },
      {
        stepNumber: 3,
        title: "Create the Home Page",
        description: "Design a high-impact hero banner and skills showcase in page.js.",
        filename: "src/app/page.js",
        code: `import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12 py-10">
      <section className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Available for Hire
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl">
          Building full-stack web apps with Next.js & JavaScript.
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          I am a software engineer specializing in modern React, Next.js App Router, and full-stack web applications.
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
          "The home page is a pure Server Component written in plain JavaScript with zero client JavaScript overhead, giving mobile visitors instantaneous page rendering.",
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
      "Create a production-grade blogging platform using dynamic route folders (`app/blog/[slug]/page.js`), Incremental Static Regeneration (ISR), reading time calculation, and dynamic metadata generation in plain JavaScript.",
    prerequisites: ["Unit 1: Dynamic Routes", "Unit 2: SSG vs ISR", "Unit 5: Metadata & SEO"],
    techStack: ["Next.js App Router", "JavaScript", "ISR Caching", "Dynamic Metadata", "Tailwind CSS"],
    fileTree: [
      "src/app/blog/page.js",
      "src/app/blog/[slug]/page.js",
      "src/app/blog/[slug]/loading.js",
      "src/lib/posts.js",
      "src/components/ArticleCard.js",
    ],
    interactiveDemoType: "blog",
    keyTakeaways: [
      "Implemented dynamic parameter extraction with async params in plain JavaScript",
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
        filename: "src/app/blog/[slug]/page.js",
        code: `import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

// 1. Dynamic SEO Metadata Generation:
// Runs on the server to put the article's real title and description in the HTML <head>!
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

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
// [slug] acts like a name tag on the folder — whatever is in the URL arrives in params!
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound(); // Displays custom not-found.js with 404 status!
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
          "Next.js extracts whatever value was in the URL (like 'javascript-tips') and gives it to params.slug. The server gets the post, creates custom metadata for Google and social media cards, and renders clean HTML with zero client JavaScript delay.",
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
      "Build a modern Task & Study Planner using React Server Actions in plain JavaScript, `useOptimistic` for instantaneous 0ms checkbox toggling, and server-side cache revalidation.",
    prerequisites: ["Unit 3: Server Actions", "Unit 3: Forms & Optimistic UI"],
    techStack: ["Next.js Server Actions", "React useOptimistic", "JavaScript", "Tailwind CSS"],
    fileTree: [
      "src/app/todos/page.js",
      "src/actions/todoActions.js",
      "src/components/TodoList.js",
      "src/components/AddTodoForm.js",
      "src/components/SubmitButton.js",
    ],
    interactiveDemoType: "todo",
    keyTakeaways: [
      "Eliminated API route boilerplate by using direct Server Actions ('use server')",
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
        description: "Write clean JavaScript Server Actions for inserting, toggling, and deleting tasks.",
        filename: "src/actions/todoActions.js",
        code: `"use server";

import { revalidatePath } from "next/cache";

// In-memory data store for demonstration:
let tasks = [
  { id: 1, title: "Review Unit 1 App Router Conventions", completed: true },
  { id: 2, title: "Practice Server Actions with useOptimistic", completed: false },
];

export async function getTodosAction() {
  return tasks;
}

// Server Action to add a task:
export async function createTodoAction(formData) {
  const title = formData.get("title");
  if (!title || title.trim() === "") return;

  tasks.push({ id: Date.now(), title: title.trim(), completed: false });
  // revalidatePath tells Next.js: "Refresh the cache for /todos so everyone sees the new task!"
  revalidatePath("/todos");
}

// Server Action to toggle a task:
export async function toggleTodoAction(id, completed) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, completed } : t));
  revalidatePath("/todos");
}

// Server Action to delete a task:
export async function deleteTodoAction(id) {
  tasks = tasks.filter((t) => t.id !== id);
  revalidatePath("/todos");
}`,
        explanation:
          "All backend operations live in this clean module. The 'use server' directive at the very top tells Next.js that every function in this file is a secure backend function running on the server.",
      },
      {
        stepNumber: 2,
        title: "Build the Optimistic Task List Component",
        description: "Use React useOptimistic to update the screen in 0ms when checkboxes are clicked.",
        filename: "src/components/TodoList.js",
        code: `"use client";

import { useOptimistic } from "react";
import { toggleTodoAction, deleteTodoAction } from "@/actions/todoActions";

export function TodoList({ initialTodos }) {
  // useOptimistic takes (currentValue, updateFunction):
  // When you click, the UI updates IMMEDIATELY without waiting for the server!
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    initialTodos,
    (state, { id, completed }) =>
      state.map((t) => (t.id === id ? { ...t, completed } : t))
  );

  const handleToggle = async (id, currentStatus) => {
    const nextStatus = !currentStatus;
    // Step 1: Update UI instantly (0 milliseconds)
    setOptimisticTodos({ id, completed: nextStatus });
    // Step 2: Inform the server in the background
    await toggleTodoAction(id, nextStatus);
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
          "`useOptimistic` makes checkmarks flip instantly before the network call finishes. If the server call fails, React automatically rolls back to the previous state!",
      },
    ],
  },

  {
    id: "project-4-student-portal",
    projectNumber: 4,
    title: "Student Course Explorer & University Portal",
    shortSummary: "Build a multi-tier course management explorer with search filters, URL query parameters, and clean component architecture.",
    difficulty: "Advanced",
    description:
      "Architect a scalable University Course Explorer featuring URL-based query search filtering (`useSearchParams`), multi-tier layouts (`app/courses/layout.js`), and dynamic course filtering in plain JavaScript.",
    prerequisites: ["Unit 1: Layouts", "Unit 2: Data Fetching", "Unit 6: Advanced Architecture"],
    techStack: ["Next.js App Router", "JavaScript", "React Suspense", "URL SearchParams", "Tailwind CSS"],
    fileTree: [
      "src/app/courses/layout.js",
      "src/app/courses/page.js",
      "src/app/courses/[code]/page.js",
      "src/components/CourseSearch.js",
      "src/components/CourseListSkeleton.js",
      "src/actions/enrollActions.js",
    ],
    interactiveDemoType: "student-portal",
    keyTakeaways: [
      "Managed search query state in URL parameters for shareable, bookmarkable filtered views",
      "Server-rendered course directory filtering directly on the backend",
      "Implemented clean, modular JavaScript component structure",
    ],
    bonusChallenges: [
      "Add grade distribution charts with lazy-loaded dynamic imports (next/dynamic)",
      "Add a PDF syllabus download Route Handler endpoint (app/api/syllabus/route.js)",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "URL-Based Filtered Course Explorer Page",
        description: "Read search query parameters directly inside an async Server Component in plain JavaScript.",
        filename: "src/app/courses/page.js",
        code: `import Link from "next/link";
import { CourseSearch } from "@/components/CourseSearch";

const COURSES = [
  { code: "INT257", title: "Next.js Fullstack Masterclass", credits: 4, category: "Core" },
  { code: "INT219", title: "Front-End Engineering with React", credits: 3, category: "Elective" },
  { code: "CSE320", title: "Distributed Cloud Architecture", credits: 4, category: "Core" },
];

// In Next.js, searchParams comes directly into the page function:
export default async function CoursesDirectoryPage({ searchParams }) {
  const { q = "", category } = await searchParams;

  // Filter courses in plain JavaScript:
  const filtered = COURSES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(q.toLowerCase()) ||
      c.code.toLowerCase().includes(q.toLowerCase());
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
          "By reading `searchParams` on the server, the filtered results are rendered into fast HTML directly on the backend, creating shareable bookmark-friendly URLs without needing complex client-side useEffect state.",
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
      "The capstone project: build a complete full-stack inventory and student management platform combining Supabase PostgreSQL database tables, Row Level Security (RLS) policies, and CRUD Server Actions written in plain JavaScript.",
    prerequisites: ["Unit 4: Supabase CRUD", "Unit 3: Server Actions", "Unit 2: Server Components"],
    techStack: ["Next.js App Router", "Supabase PostgreSQL", "Server Actions", "JavaScript", "Tailwind CSS"],
    fileTree: [
      "src/app/inventory/page.js",
      "src/actions/inventoryActions.js",
      "src/lib/supabase.js",
      "src/components/CreateProductModal.js",
      "src/components/ProductGrid.js",
      "supabase/schema.sql",
    ],
    interactiveDemoType: "fullstack-supabase",
    keyTakeaways: [
      "Engineered PostgreSQL database schema with automated timestamps and checks",
      "Wired full CRUD operations (.select(), .insert(), .update(), .delete()) to Server Actions in JavaScript",
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
        code: `-- 1. Create Products Table (Like a structured school register):
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
        description: "Create plain JavaScript Server Actions that query and mutate the Supabase PostgreSQL table.",
        filename: "src/actions/inventoryActions.js",
        code: `"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Add a new product into the database:
export async function addProductAction(formData) {
  const name = formData.get("name");
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock") || 1);
  const category = formData.get("category") || "General";

  if (!name || isNaN(price) || price <= 0) {
    return { success: false, error: "Please enter a valid product name and price." };
  }

  // Supabase insert in plain JavaScript:
  const { error } = await supabase.from("products").insert([
    { name: name.trim(), price, stock, category }
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  // Refresh the page data automatically:
  revalidatePath("/inventory");
  return { success: true };
}

// Delete a product from the database:
export async function deleteProductAction(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/inventory");
}`,
        explanation:
          "These Server Actions execute securely on the server, ensuring direct communication with Supabase and instant UI cache synchronization without exposing secret database keys to the browser.",
      },
      {
        stepNumber: 3,
        title: "Server Component Dashboard with Live Data",
        description: "Fetch products from Supabase with graceful offline fallback and render responsive cards.",
        filename: "src/app/inventory/page.js",
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
