import { TopicContent } from "@/types";

export const unit4Topics: TopicContent[] = [
  {
    id: "auth-and-protected-routes-concepts",
    unitId: "unit-4",
    title: "Authentication Architecture & Protected Routes",
    shortSummary: "Understand how authentication works in Next.js: Cookies vs JWTs, session strategies, middleware route guards, and Role-Based Access Control (RBAC).",
    order: 1,
    tags: ["Auth Concepts", "JWT", "Cookies", "Protected Routes", "RBAC", "Middleware"],

    simpleExplanation:
      "When a user logs into a website, how does the server remember who they are when they click to the next page? In web development, HTTP is stateless. The server sends back a small encrypted 'badge' (called a **Cookie** or **JWT Token**) that the browser stores securely. Every time the user visits a new page (like `/dashboard`), Next.js checks this badge on the server or in `middleware.ts`. If the badge is missing or expired, Next.js redirects them away to `/login` before rendering any private data. Role-Based Access Control (RBAC) means checking if the user is a 'Student', 'Teacher', or 'Admin' before granting access to specific buttons.",

    whyNeeded:
      "Without authentication architecture, private user data (grades, billing records, medical files) would be exposed to anyone who guesses a URL. Learning how cookies, sessions, middleware guards, and RBAC work is essential for building real-world software.",

    reactVsNext: {
      concept: "Protected Routes Architecture",
      reactWay: {
        title: "Client-Side Route Guard (Vite / CRA)",
        code: `// Traditional React Client-Side Protection:
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // Insecure: prone to XSS attacks!

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}`,
        explanation:
          "In vanilla React, route protection happens on the client using `localStorage`. The entire JavaScript bundle and HTML shell are still downloaded by unauthorized users.",
        drawbacks: [
          "`localStorage` is vulnerable to Cross-Site Scripting (XSS) token theft",
          "Unauthorized users briefly see a flash of private UI before the client redirect fires",
          "Search engine crawlers might index placeholder protected pages",
        ],
      },
      nextjsWay: {
        title: "Next.js Server-Side Middleware Guard",
        code: `// File: src/middleware.ts
// Runs at the Edge BEFORE any page or API route renders!

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Read httpOnly cookie (100% immune to JavaScript XSS theft!):
  const sessionToken = request.cookies.get("session_token")?.value;

  // If visiting /dashboard without a valid session, redirect immediately:
  if (request.nextUrl.pathname.startsWith("/dashboard") && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};`,
        explanation:
          "Next.js `middleware.ts` intercepts the HTTP request before it reaches the page. If unauthorized, the server responds with a redirect header immediately. Zero private HTML or JavaScript is ever transmitted.",
        benefits: [
          "`httpOnly` cookies prevent client JavaScript from stealing auth tokens",
          "Zero flash of unauthorized content (FOUC)",
          "Centralized route protection in a single file",
        ],
      },
      whyDifferent:
        "Next.js enforces route protection on the server and Edge before rendering, whereas React does it after the browser has already downloaded the page.",
      mentalShiftSummary:
        "Protect routes in `middleware.ts` using `httpOnly` cookies, not in client `useEffect` hooks with `localStorage`.",
    },

    basicExample: {
      title: "Role-Based Access Control (RBAC) Check in a Server Component",
      description: "Checking user role on the server before rendering admin controls.",
      language: "tsx",
      filename: "src/app/admin/page.tsx",
      code: `// src/app/admin/page.tsx
import { redirect } from "next/navigation";

// Conceptual helper to inspect user session on server:
async function getSessionUser() {
  // In a real app, this reads cookies and validates the session:
  return { id: "u1", name: "Professor Mehta", role: "admin" };
}

export default async function AdminPage() {
  const user = await getSessionUser();

  // Enforce RBAC on the server:
  if (!user || user.role !== "admin") {
    redirect("/unauthorized"); // Instantly redirects non-admins!
  }

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs px-2.5 py-1 bg-rose-500/20 text-rose-400 rounded font-mono">
          Admin Portal
        </span>
        <span className="text-xs text-zinc-400">Authenticated as: {user.name}</span>
      </div>
      <h1 className="text-2xl font-bold text-zinc-100">Course Management Console</h1>
      <p className="text-zinc-400 text-sm">
        You have full administrative privileges to edit syllabus modules and review grades.
      </p>
    </div>
  );
}`,
      explanation:
        "The server checks `user.role === 'admin'`. If unauthorized, it terminates execution and redirects before generating any HTML.",
      outputPreview: "Admin console card displaying user badge and permissions banner.",
    },

    moreExamples: [
      {
        title: "Cookies vs JWT Comparison",
        description: "Understanding the two main session storage patterns in modern web engineering.",
        language: "typescript",
        filename: "Auth Conceptual Comparison",
        code: `// 1. Session ID Cookie (Stateful):
// Browser Cookie: session_id=abc-123-xyz
// Server checks Redis / PostgreSQL: SELECT * FROM sessions WHERE id = 'abc-123-xyz';
// Pros: Can instantly revoke a user's session by deleting the database row.
// Cons: Requires database lookup on every request.

// 2. JSON Web Token (JWT) Cookie (Stateless):
// Browser Cookie: jwt=eyJhbGciOi... (contains encrypted { userId: 101, role: 'student', exp: 1735689600 })
// Server verifies token signature with a secret key without querying database.
// Pros: Ultra-fast, zero database lookups needed at Edge.
// Cons: Harder to invalidate before expiration time.`,
        explanation:
          "Both patterns use secure `httpOnly` cookies in Next.js to safeguard user identities against browser script injection.",
      },
    ],

    multipleWays: [
      {
        name: "Middleware Route Guard (Recommended for Route Protection)",
        syntax: "middleware.ts with request.cookies",
        codeSnippet: `export function middleware(req: NextRequest) {
  if (!req.cookies.get('token')) return NextResponse.redirect(new URL('/login', req.url));
}`,
        howItWorks: "Runs before request reaches pages.",
        pros: ["Blocks unauthorized requests before page rendering begins", "Protects entire route subtrees with matchers"],
        cons: ["Runs on Edge runtime (limited Node APIs)"],
        whenToUse: "For guarding `/dashboard/*`, `/settings/*`, and `/admin/*` routes.",
        isRecommended: true,
      },
      {
        name: "Server Component Direct Guard",
        syntax: "if (!user) redirect('/login'); inside page.tsx",
        codeSnippet: `export default async function Page() {
  const user = await getUser();
  if (!user) redirect('/login');
  return <div>Welcome</div>;
}`,
        howItWorks: "Evaluated during server rendering of that specific page.",
        pros: ["Full access to Node.js database clients (Prisma, Supabase)", "Fine-grained permissions check"],
        cons: ["Runs per-page rather than globally across route folders"],
        whenToUse: "For page-level data authorization and role checks.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `middleware.ts` for fast binary checks ('Is user logged in?'). Use Server Component checks for role permissions ('Is user an Admin?').",
      scenarios: [
        {
          scenario: "You want to prevent any non-logged-in user from visiting `/dashboard/*`",
          recommendedApproach: "`middleware.ts` matcher checking for auth cookie",
          reason: "Fastest response with zero database compute.",
        },
        {
          scenario: "Checking if a user owns a specific student assignment ID before rendering the edit page",
          recommendedApproach: "Server Component check inside `src/app/assignments/[id]/edit/page.tsx`",
          reason: "Requires querying the database to verify document ownership.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Storing auth tokens in localStorage or sessionStorage in Next.js",
        badCode: `// ❌ BAD: Storing tokens in client localStorage
localStorage.setItem("authToken", token); // Server cannot read this during SSR!`,
        goodCode: `// ✅ GOOD: Store tokens in httpOnly Cookies
// Sent automatically to both server components and middleware on every request!`,
        whyItBreaks: "Server Components and `middleware.ts` run on the server and have ZERO access to browser `localStorage`.",
        howToFix: "Always store session tokens in `httpOnly` secure cookies.",
      },
    ],

    bestPractices: [
      {
        title: "Always Set httpOnly and Secure Flags on Auth Cookies",
        rule: "Configure cookies with `httpOnly: true`, `secure: true`, and `sameSite: 'lax'`.",
        explanation: "Prevents malicious JavaScript from reading the cookie and protects against CSRF attacks.",
      },
    ],

    exercises: [
      {
        id: "u4-ex-1",
        title: "Write a Route Protection Middleware Matcher",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a `middleware.ts` function that checks for a cookie named `auth_token`. If missing on any `/portal/*` path, redirect the visitor to `/login`.",
        initialCode: `// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TODO: Check auth_token and redirect if missing
  return NextResponse.next();
}

export const config = {
  // TODO: Define matcher for /portal routes
};`,
        expectedOutput: "A functional Next.js middleware intercepting /portal routes and redirecting unauthorized users.",
        hints: ["Use `request.cookies.get('auth_token')?.value`", "Use `NextResponse.redirect(new URL('/login', request.url))`"],
        solutionCode: `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/portal")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};`,
        solutionExplanation:
          "This middleware intercepts every request matching `/portal/:path*` at the Edge, ensuring zero unauthorized access.",
      },
    ],

    quizzes: [
      {
        id: "u4-q1",
        question: "Why can't Server Components in Next.js read tokens stored in browser localStorage?",
        syllabusTopic: "Auth Storage Concepts",
        options: [
          { id: "a", text: "Because localStorage is only for mobile applications", isCorrect: false, explanation: "localStorage is a browser API." },
          { id: "b", text: "Because Server Components execute on the server before the HTML reaches the browser, where localStorage does not exist", isCorrect: true, explanation: "Correct! The server runtime has no concept of the browser's window or localStorage object." },
          { id: "c", text: "Because React disabled localStorage in version 19", isCorrect: false, explanation: "localStorage is still supported in client components." },
          { id: "d", text: "To make CSS load faster", isCorrect: false, explanation: "Unrelated." },
        ],
        conceptualExplanation:
          "Server Components execute in a server environment (Node.js or Edge) where browser-only globals like `window` and `localStorage` do not exist. Cookies, however, are sent in HTTP headers on every request.",
      },
    ],

    realWorldExample: {
      domain: "Healthcare Patient Portal",
      description: "How patient medical record systems enforce HIPAA-compliant multi-tier RBAC for Doctors, Nurses, and Patients.",
      code: {
        title: "Medical Record Permission Guard",
        description: "RBAC verification in Server Component.",
        language: "tsx",
        filename: "src/app/patients/[id]/page.tsx",
        code: `export default async function PatientRecord({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAuthenticatedStaff();

  if (!user || (user.role !== "doctor" && user.role !== "specialist")) {
    return <div className="p-4 bg-rose-500/20 text-rose-300">Access Denied: Doctor clearance required.</div>;
  }

  return <div>Viewing Medical Chart for Patient #{id}</div>;
}`,
      },
      keyTakeaway: "Server-side role verification guarantees that sensitive records cannot be accessed through client-side spoofing.",
    },

    combinedExample: {
      combinedTopics: ["Middleware Protection", "Role Validation", "Server Redirect"],
      title: "Complete Two-Tier Authentication Architecture",
      description: "Middleware handles broad authentication; Server Components handle fine-grained RBAC permissions.",
      code: {
        title: "Two-Tier Auth Flow",
        description: "Architecture flow diagram.",
        language: "typescript",
        filename: "Auth Pipeline",
        code: `// Tier 1: Middleware (Edge)
// Checks if user is logged in -> If NO, redirects to /login

// Tier 2: Server Component (Node.js)
// Checks if user has specific permissions for requested resource -> If NO, renders 403 Forbidden`,
      },
      stepByStepFlow: [
        "User visits `/admin/grades`",
        "Middleware checks cookie: valid token exists -> allows request to proceed",
        "Page component loads user role: role === 'student' (not 'admin')",
        "Page calls `redirect('/forbidden')`",
      ],
    },
  },

  {
    id: "database-and-orm-concepts",
    unitId: "unit-4",
    title: "Databases, ORMs & Supabase Architecture",
    shortSummary: "Master relational vs non-relational databases, SQL vs ORMs (Prisma, Drizzle), and the Supabase PostgreSQL platform architecture.",
    order: 2,
    tags: ["Databases", "SQL", "PostgreSQL", "Supabase", "ORM", "Prisma"],

    simpleExplanation:
      "A database is a specialized software that safely stores and organizes your application's data (users, blog posts, comments) permanently on disk. **PostgreSQL** is the world's most popular open-source relational database that stores data in structured tables with rows and columns. **Supabase** is an open-source platform that gives you a hosted PostgreSQL database, instant auto-generated APIs, real-time subscriptions, and file storage in one easy package. An **ORM (Object-Relational Mapper)** like Prisma or Drizzle allows you to query your database using clean TypeScript code instead of writing raw SQL strings.",

    whyNeeded:
      "Writing raw SQL queries directly inside web apps can be prone to syntax typos and SQL Injection vulnerabilities. Understanding how Supabase and ORMs structure database tables, relations (one-to-many, many-to-many), and foreign keys is the bedrock of full-stack engineering.",

    reactVsNext: {
      concept: "Connecting to a Database",
      reactWay: {
        title: "React Cannot Connect to Databases Directly",
        code: `// ❌ IMPOSSIBLE in vanilla React:
// If you import a database client inside a React component in the browser,
// your secret database passwords would be sent to every user!
import { Client } from "pg"; // FATAL SECURITY RISK IN BROWSER!

export function StudentList() {
  // Browser CANNOT connect directly to PostgreSQL!
  return <div>Cannot query DB from browser</div>;
}`,
        explanation:
          "In vanilla React (client-side), you can NEVER connect directly to a database because your database connection string and password would be exposed to the public.",
        drawbacks: [
          "Requires building and deploying a separate Express backend server",
          "High latency: Browser -> Express API -> Database -> Express API -> Browser",
        ],
      },
      nextjsWay: {
        title: "Next.js Direct Server-Side Database Access",
        code: `// File: src/app/students/page.tsx (Server Component)
// Runs securely on the server with zero client credential leaks!

import { supabase } from "@/lib/supabase";

export default async function StudentsPage() {
  // Query Supabase PostgreSQL directly inside the component:
  const { data: students, error } = await supabase
    .from("students")
    .select("id, name, course, grade")
    .order("name", { ascending: true });

  if (error) return <p>Failed to load students.</p>;

  return (
    <ul className="space-y-2">
      {students.map((s) => (
        <li key={s.id} className="p-3 bg-zinc-900 rounded-lg">
          {s.name} - {s.course} ({s.grade})
        </li>
      ))}
    </ul>
  );
}`,
        explanation:
          "Because Next.js Server Components run on the server, you can query Supabase or PostgreSQL directly with 0ms server-to-db latency and zero credential leaks.",
        benefits: [
          "Direct, secure database queries with zero intermediate Express API server needed",
          "Full TypeScript autocomplete for database column names",
          "Ultra-fast query execution right in the server datacenter",
        ],
      },
      whyDifferent:
        "Next.js Server Components run in a secure Node.js environment where backend database drivers (PostgreSQL, Supabase client, Prisma) operate natively.",
      mentalShiftSummary:
        "Query Supabase directly inside your async Server Components or Server Actions. No middleman API needed!",
    },

    basicExample: {
      title: "Querying Supabase Table in a Server Component",
      description: "Fetching posts from a Supabase PostgreSQL table with error handling.",
      language: "tsx",
      filename: "src/app/posts/page.tsx",
      code: `import { supabase, initialMockDb } from "@/lib/supabase";

interface Post {
  id: number;
  title: string;
  category: string;
  views: number;
}

export default async function PostsPage() {
  // Query Supabase table:
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // Graceful fallback to rich mock data if Supabase credentials are not connected:
  const posts: Post[] = data && data.length > 0 ? data : initialMockDb.posts;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Database Posts</h1>
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-zinc-200">{post.title}</h2>
              <span className="text-xs text-amber-400 font-mono">{post.category}</span>
            </div>
            <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded font-mono">
              👁 {post.views}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      explanation:
        "The Supabase query `.from('posts').select('*')` returns typed data from PostgreSQL on the server.",
      outputPreview: "Rendered list of database posts with views and categories.",
    },

    moreExamples: [
      {
        title: "Relational Foreign Keys (SQL vs Supabase)",
        description: "Joining students with courses using foreign key relationships.",
        language: "sql",
        filename: "Schema Definition (PostgreSQL)",
        code: `-- Creating relational tables with a foreign key:
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`,
        explanation:
          "Foreign keys (`REFERENCES courses(id)`) ensure relational integrity, preventing orphan enrollment records if a course is deleted.",
      },
    ],

    multipleWays: [
      {
        name: "Supabase Client SDK (Recommended for Supabase)",
        syntax: "supabase.from('table').select()",
        codeSnippet: `const { data } = await supabase.from('students').select('*');`,
        howItWorks: "Uses PostgREST under the hood to translate JavaScript calls into optimized PostgreSQL queries.",
        pros: ["No schema compilation step needed", "Built-in Row Level Security", "Instant real-time features"],
        cons: ["Requires learning Supabase SDK syntax"],
        whenToUse: "When using Supabase as your primary backend.",
        isRecommended: true,
      },
      {
        name: "Prisma / Drizzle ORM",
        syntax: "await db.student.findMany()",
        codeSnippet: `const students = await prisma.student.findMany();`,
        howItWorks: "Type-safe ORM connecting to raw PostgreSQL/MySQL databases via connection pooler.",
        pros: ["100% type-safe schema definitions", "Auto-generated database migrations"],
        cons: ["Requires running migration CLI tools"],
        whenToUse: "For enterprise apps managing complex multi-table SQL schemas.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use Supabase SDK for quick full-stack apps with built-in auth, storage, and database. Use Prisma/Drizzle for custom PostgreSQL setups.",
      scenarios: [
        {
          scenario: "You want a serverless PostgreSQL database with zero setup and instant web dashboard",
          recommendedApproach: "Supabase with `@supabase/supabase-js`",
          reason: "Instant free database with auto-generated APIs and simple client library.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Exposing the Supabase Service Role Key to the client",
        badCode: `// ❌ FATAL SECURITY FLAW:
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=eyJh... // Anyone can bypass RLS and delete your whole database!`,
        goodCode: `// ✅ GOOD: Use NEXT_PUBLIC_SUPABASE_ANON_KEY on the client; keep SERVICE_ROLE_KEY server-only!`,
        whyItBreaks: "The service role key bypasses all Row Level Security policies. If prefixed with `NEXT_PUBLIC_`, it is sent to all browser visitors.",
        howToFix: "Only use the `anon` key in public code. Keep `service_role` strictly in server-only files.",
      },
    ],

    bestPractices: [
      {
        title: "Enable Row Level Security (RLS) on Every Supabase Table",
        rule: "Always run `ALTER TABLE tableName ENABLE ROW LEVEL SECURITY;`.",
        explanation: "Ensures users can only read or modify rows they are authorized to touch.",
      },
    ],

    exercises: [
      {
        id: "u4-ex-2",
        title: "Query Supabase Products with Filtering",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write an async Server Component that queries the `'products'` table from Supabase, filters for products where `price <= 100`, and renders them.",
        initialCode: `import { supabase, initialMockDb } from "@/lib/supabase";

export default async function BudgetProductsPage() {
  // TODO: Query products where price is <= 100
  return (
    <div>
      {/* Render products */}
    </div>
  );
}`,
        expectedOutput: "A list of affordable products filtered by price from Supabase.",
        hints: ["Use `.from('products').select('*').lte('price', 100)`"],
        solutionCode: `import { supabase, initialMockDb } from "@/lib/supabase";

export default async function BudgetProductsPage() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .lte("price", 100);

  const products = data && data.length > 0 ? data : initialMockDb.products.filter(p => p.price <= 100);

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
      <h1 className="text-xl font-bold text-zinc-100">Budget Hardware Items</h1>
      <div className="grid gap-3">
        {products.map((p) => (
          <div key={p.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex justify-between items-center">
            <span className="font-medium text-zinc-200">{p.name}</span>
            <span className="text-emerald-400 font-mono font-bold">\${p.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        solutionExplanation:
          "The `.lte('price', 100)` filter is translated into SQL (`WHERE price <= 100`) and executed inside the PostgreSQL database engine.",
      },
    ],

    quizzes: [
      {
        id: "u4-q2",
        question: "What is the primary underlying database engine that powers Supabase?",
        syllabusTopic: "Supabase Architecture",
        options: [
          { id: "a", text: "MongoDB", isCorrect: false, explanation: "MongoDB is a document NoSQL store." },
          { id: "b", text: "PostgreSQL", isCorrect: true, explanation: "Correct! Supabase is built directly on top of open-source PostgreSQL." },
          { id: "c", text: "SQLite in browser memory", isCorrect: false, explanation: "Supabase is a cloud relational database." },
          { id: "d", text: "Microsoft Excel", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "Supabase provides an enterprise-grade PostgreSQL database with PostgREST, Auth, and Storage layers built on top.",
      },
    ],

    realWorldExample: {
      domain: "Online Course Registration & Enrollment System",
      description: "How universities query relational databases to verify prerequisite courses before allowing student enrollment.",
      code: {
        title: "Prerequisite Course Query",
        description: "Checking student completed credits.",
        language: "typescript",
        filename: "src/lib/prerequisites.ts",
        code: `export async function verifyPrerequisites(studentId: string, courseCode: string) {
  const { data: student } = await supabase
    .from("students")
    .select("id, completed_courses")
    .eq("id", studentId)
    .single();

  return student?.completed_courses?.includes("INT219");
}`,
      },
      keyTakeaway: "Relational queries ensure rigorous business logic checks occur on the server before mutating data.",
    },

    combinedExample: {
      combinedTopics: ["Supabase Query", "Server Component", "TypeScript Types"],
      title: "Complete Server-Rendered Database Grid",
      description: "Fetching students and rendering a responsive data table.",
      code: {
        title: "Typed Supabase Table Component",
        description: "Server Component with typed query results.",
        language: "tsx",
        filename: "src/app/students-table/page.tsx",
        code: `import { supabase, initialMockDb } from "@/lib/supabase";

export default async function StudentsTable() {
  const { data } = await supabase.from("students").select("*");
  const students = data && data.length > 0 ? data : initialMockDb.students;

  return (
    <div className="overflow-x-auto border border-zinc-800 rounded-xl">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="bg-zinc-900 text-xs uppercase font-mono text-zinc-400 border-b border-zinc-800">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Course</th>
            <th className="p-3">Grade</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 bg-zinc-950">
          {students.map((s) => (
            <tr key={s.id}>
              <td className="p-3 font-mono text-zinc-500">#{s.id}</td>
              <td className="p-3 font-medium text-zinc-100">{s.name}</td>
              <td className="p-3 text-zinc-400">{s.course}</td>
              <td className="p-3 font-bold text-emerald-400">{s.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Server queries Supabase PostgreSQL",
        "Constructs clean HTML table",
        "Transmits 0 KB client JavaScript bundle to browser",
      ],
    },
  },

  {
    id: "supabase-crud-operations",
    unitId: "unit-4",
    title: "Full CRUD Operations with Supabase",
    shortSummary: "Perform Create, Read, Update, and Delete operations on Supabase PostgreSQL tables using Server Actions and Server Components.",
    order: 3,
    tags: ["CRUD", "Supabase", "Insert", "Update", "Delete", "PostgreSQL"],

    simpleExplanation:
      "**CRUD** stands for the 4 fundamental operations of any database application: **Create** (adding new records), **Read** (fetching and viewing records), **Update** (modifying existing records), and **Delete** (removing records). In Next.js with Supabase, you do: `.insert()` to create, `.select()` to read, `.update()` to edit, and `.delete()` to remove. When combined with Server Actions and `revalidatePath()`, full CRUD operations require zero API boilerplate!",

    whyNeeded:
      "Virtually all modern web applications (e-commerce carts, task managers, blogs, social networks, school portals) are fundamentally CRUD applications. Mastering CRUD operations in Next.js is essential for building real-world projects.",

    reactVsNext: {
      concept: "Executing Database CRUD",
      reactWay: {
        title: "React -> REST API -> Express -> SQL",
        code: `// Traditional React requires 4 separate API endpoints in Express:
// 1. app.get('/api/todos')
// 2. app.post('/api/todos')
// 3. app.put('/api/todos/:id')
// 4. app.delete('/api/todos/:id')
// Plus 4 manual fetch() calls in the React frontend!`,
        explanation:
          "In vanilla React, you have to write dozens of lines of route handlers in Express and corresponding `fetch` wrapper functions in React.",
        drawbacks: [
          "High maintenance burden with 4 distinct API endpoints",
          "Duplicate validation logic",
        ],
      },
      nextjsWay: {
        title: "Next.js + Supabase Direct CRUD Actions",
        code: `// Direct Server Actions using Supabase SDK:
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// CREATE:
export async function createTodo(title: string) {
  await supabase.from("todos").insert([{ title, completed: false }]);
  revalidatePath("/todos");
}

// UPDATE:
export async function updateTodo(id: number, completed: boolean) {
  await supabase.from("todos").update({ completed }).eq("id", id);
  revalidatePath("/todos");
}

// DELETE:
export async function deleteTodo(id: number) {
  await supabase.from("todos").delete().eq("id", id);
  revalidatePath("/todos");
}`,
        explanation:
          "Server Actions call the Supabase client directly and purge the cache with `revalidatePath()`. The UI updates instantly.",
        benefits: [
          "Zero manual API endpoints to configure",
          "One single function per CRUD operation",
          "Direct integration with form actions and optimistic UI",
        ],
      },
      whyDifferent:
        "Next.js lets you call Supabase functions directly on the server without creating boilerplate REST controllers.",
      mentalShiftSummary:
        "Write 1 Server Action per database mutation. Call `revalidatePath()` after `.insert()`, `.update()`, or `.delete()`.",
    },

    basicExample: {
      title: "Interactive Supabase Task Manager (Full CRUD)",
      description: "Creating, toggling, and deleting tasks with Supabase in Next.js.",
      language: "tsx",
      filename: "src/actions/todoCrud.ts",
      code: `"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// 1. CREATE: Insert a new task
export async function addTodoAction(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title) return;

  await supabase.from("todos").insert([{ title, completed: false, priority: "medium" }]);
  revalidatePath("/todos");
}

// 2. UPDATE: Toggle task completion
export async function toggleTodoAction(id: number, completed: boolean) {
  await supabase.from("todos").update({ completed }).eq("id", id);
  revalidatePath("/todos");
}

// 3. DELETE: Remove a task
export async function deleteTodoAction(id: number) {
  await supabase.from("todos").delete().eq("id", id);
  revalidatePath("/todos");
}`,
      explanation:
        "Each action performs a single clean database mutation via Supabase and immediately invalidates the page cache.",
      outputPreview: "Full CRUD actions ready to power any interactive task management UI.",
    },

    moreExamples: [
      {
        title: "Supabase Row Level Security (RLS) SQL Policies",
        description: "Enforcing security rules at the PostgreSQL database level.",
        language: "sql",
        filename: "RLS Policies Example",
        code: `-- Enable RLS on the table:
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Allow public to read tasks:
CREATE POLICY "Public Read Tasks" ON todos
  FOR SELECT USING (true);

-- Allow authenticated users to only delete their own tasks:
CREATE POLICY "Users Delete Own Tasks" ON todos
  FOR DELETE USING (auth.uid() = user_id);`,
        explanation:
          "RLS policies act as security guardrails directly inside PostgreSQL, ensuring no user can tamper with someone else's data even if client code is modified.",
      },
    ],

    multipleWays: [
      {
        name: "Direct Supabase Server Actions (Recommended)",
        syntax: "supabase.from('table').insert/update/delete inside 'use server'",
        codeSnippet: `export async function deleteItem(id) {
  await supabase.from('items').delete().eq('id', id);
  revalidatePath('/items');
}`,
        howItWorks: "Executes inside Next.js Server Action.",
        pros: ["Instant UI refresh", "Zero API routes", "Type safety"],
        cons: ["Requires server environment"],
        whenToUse: "For all application forms, delete buttons, and inline toggles.",
        isRecommended: true,
      },
      {
        name: "Route Handlers (REST API)",
        syntax: "export async function DELETE(req) { ... }",
        codeSnippet: `export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await supabase.from('items').delete().eq('id', id);
  return NextResponse.json({ success: true });
}`,
        howItWorks: "Standard HTTP endpoint.",
        pros: ["Callable by third-party services and mobile apps"],
        cons: ["Requires client fetch call + manual UI state refresh"],
        whenToUse: "When building APIs for native mobile apps.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use Server Actions for all your website's CRUD operations. Use Route Handlers when building public API endpoints.",
      scenarios: [
        {
          scenario: "Adding a 'Delete' button next to a student record",
          recommendedApproach: "Server Action calling `supabase.from('students').delete().eq('id', id)`",
          reason: "Simple button action with automatic table revalidation.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Forgetting the .eq('id', id) filter on UPDATE or DELETE",
        badCode: `// ❌ DISASTER: Deletes EVERY ROW in the entire database table!
await supabase.from("todos").delete();`,
        goodCode: `// ✅ GOOD: Always specify which exact row to delete
await supabase.from("todos").delete().eq("id", targetId);`,
        whyItBreaks: "Without a filter like `.eq('id', id)`, SQL executes `DELETE FROM todos;`, wiping out all records in the table.",
        howToFix: "Always verify that your `.update()` and `.delete()` statements contain an `.eq()` condition.",
      },
    ],

    bestPractices: [
      {
        title: "Always Handle the { error } Object Returned by Supabase",
        rule: "Check `const { data, error } = await supabase...; if (error) throw error;`.",
        explanation: "Prevents silent database write failures.",
      },
    ],

    exercises: [
      {
        id: "u4-ex-3",
        title: "Write a Supabase Insert Action with Revalidation",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a Server Action `createProductAction` that accepts `name` and `price`, inserts them into the `'products'` table in Supabase, and revalidates `/products`.",
        initialCode: `// src/actions/createProduct.ts
export async function createProductAction(name: string, price: number) {
  // TODO: Add 'use server', insert into Supabase, and revalidate
}`,
        expectedOutput: "A functional Server Action adding items to Supabase.",
        hints: ["Add `'use server';`", "Call `await supabase.from('products').insert([{ name, price }]);`"],
        solutionCode: `"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createProductAction(name: string, price: number) {
  if (!name || price <= 0) {
    return { success: false, error: "Invalid product name or price." };
  }

  const { error } = await supabase.from("products").insert([
    { name: name.trim(), price, stock: 10, category: "General" }
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/products");
  return { success: true };
}`,
        solutionExplanation:
          "This Server Action validates input, inserts a new row into Supabase PostgreSQL, and triggers a cache purge to display the new product.",
      },
    ],

    quizzes: [
      {
        id: "u4-q3",
        question: "What happens if you run supabase.from('students').delete() without an .eq() filter?",
        syllabusTopic: "Supabase CRUD Safety",
        options: [
          { id: "a", text: "It deletes only the first student in the list", isCorrect: false, explanation: "No, SQL delete without a WHERE clause targets all rows." },
          { id: "b", text: "It attempts to delete all rows in the table (unless blocked by RLS policies)", isCorrect: true, explanation: "Correct! Without a filter condition, delete commands match the entire table." },
          { id: "c", text: "It renames the database", isCorrect: false, explanation: "No." },
          { id: "d", text: "It downloads the database as a CSV", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "In SQL and Supabase, omitting a `.eq()` filter condition causes the operation to apply globally to all rows.",
      },
    ],

    realWorldExample: {
      domain: "Course Enrollment & Waitlist System",
      description: "How universities insert student course selections into database tables with atomic constraints.",
      code: {
        title: "Course Enrollment Mutation",
        description: "Insert enrollment record with duplicate prevention.",
        language: "typescript",
        filename: "src/actions/enroll.ts",
        code: `"use server";

export async function enrollStudentInCourse(studentId: number, courseId: string) {
  const { data, error } = await supabase.from("enrollments").insert([
    { student_id: studentId, course_code: courseId }
  ]);

  if (error) return { error: "Already enrolled in this course!" };
  revalidatePath("/my-courses");
  return { success: true };
}`,
      },
      keyTakeaway: "Database constraints (such as UNIQUE keys on student_id + course_code) prevent accidental double enrollment.",
    },

    combinedExample: {
      combinedTopics: ["Supabase CRUD", "Server Actions", "Optimistic UI"],
      title: "Interactive Full-Stack Task Board",
      description: "Combining Supabase database mutations with instant optimistic feedback.",
      code: {
        title: "Full Task Board Architecture",
        description: "Server Component fetching tasks + Client Component with optimistic toggles.",
        language: "tsx",
        filename: "src/app/tasks/page.tsx",
        code: `import { supabase, initialMockDb } from "@/lib/supabase";
import { toggleTodoAction, deleteTodoAction } from "@/actions/todoCrud";

export default async function TasksPage() {
  const { data } = await supabase.from("todos").select("*");
  const todos = data && data.length > 0 ? data : initialMockDb.todos;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">My Study Tasks</h1>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex justify-between items-center p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
            <span className={todo.completed ? "line-through text-zinc-500" : "text-zinc-200"}>
              {todo.title}
            </span>
            <form action={async () => {
              "use server";
              await deleteTodoAction(todo.id);
            }}>
              <button type="submit" className="text-xs text-rose-400 hover:underline">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Server Component queries tasks from Supabase",
        "Renders instant HTML list",
        "User clicks Delete -> Server Action executes `.delete().eq('id', id)`",
        "Table updates automatically with zero page reload",
      ],
    },
  },

  {
    id: "environment-variables-security",
    unitId: "unit-4",
    title: "Environment Variables & Secure Configuration",
    shortSummary: "Master server-only secrets (.env.local), client-safe NEXT_PUBLIC_ variables, and how to prevent dangerous credential leaks.",
    order: 4,
    tags: ["Environment Variables", "Security", ".env.local", "NEXT_PUBLIC_", "API Keys"],

    simpleExplanation:
      "When building full-stack apps, you have secret keys that must NEVER be shared with the public (like database passwords, Stripe secret keys, and admin tokens). Next.js uses `.env.local` files to store these secrets. By default, every environment variable in Next.js is **Server-Only**—it only exists on the server and is never sent to the browser. If you explicitly want an environment variable to be visible in the user's browser (like a public Google Maps key or Supabase public URL), you must prefix its name with `NEXT_PUBLIC_`.",

    whyNeeded:
      "Leaking private database keys or API credentials on GitHub or in client JavaScript bundles can lead to catastrophic data theft, server takeovers, and massive unauthorized cloud bills. Next.js provides built-in compile-time security to keep your secrets locked on the server.",

    reactVsNext: {
      concept: "Environment Variable Security",
      reactWay: {
        title: "React Vite / CRA (VITE_ / REACT_APP_)",
        code: `// In Vite or CRA, all VITE_* variables are bundled into the client JS!
// File: .env
VITE_DATABASE_PASSWORD=secret123 // EXPOSED IN BROWSER BUNDLE!

// If a developer writes:
console.log(import.meta.env.VITE_DATABASE_PASSWORD);
// Any user can inspect DevTools Network tab and steal the password!`,
        explanation:
          "In vanilla React, all environment variables with `VITE_` or `REACT_APP_` prefixes are baked directly into the public client JavaScript files.",
        drawbacks: [
          "Zero server-side secret isolation (everything goes to the client)",
          "Cannot store true database secrets safely in frontend-only apps",
        ],
      },
      nextjsWay: {
        title: "Next.js Compile-Time Secret Isolation",
        code: `// File: .env.local

# 1. SERVER-ONLY SECRET (100% safe, never bundled into client JS):
DATABASE_URL=postgresql://postgres:mySecretPassword@db.supabase.co:5432/postgres
SUPABASE_SERVICE_ROLE_KEY=eyJh...secret...

# 2. CLIENT-ACCESSIBLE PUBLIC VARIABLE (Safe for public tokens only):
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...public-anon-key...`,
        explanation:
          "Next.js automatically strips non-`NEXT_PUBLIC_` variables from any Client Component bundles at build time, completely preventing secret leaks.",
        benefits: [
          "Server secrets remain exclusively in backend memory",
          "Explicit `NEXT_PUBLIC_` opt-in makes accidental leaks near impossible",
          "Automatic environment switching (`.env.local` for dev, `.env.production` for live deployment)",
        ],
      },
      whyDifferent:
        "Next.js enforces strict compile-time dead-code elimination and environment boundaries between server and client code.",
      mentalShiftSummary:
        "Secret backend keys (Database passwords, Stripe secret keys) -> NO prefix. Public keys (Mapbox token, Supabase anon URL) -> prefix with `NEXT_PUBLIC_`.",
    },

    basicExample: {
      title: "Reading Server Secrets Safely",
      description: "Accessing sensitive environment variables inside a Server Component or Server Action.",
      language: "typescript",
      filename: "src/lib/databaseConfig.ts",
      code: `// src/lib/databaseConfig.ts
// This file runs on the server only:

export function getDatabaseConnection() {
  const dbUrl = process.env.DATABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!dbUrl) {
    console.warn("DATABASE_URL is not set in .env.local; using fallback.");
  }

  return {
    url: dbUrl || "postgresql://localhost:5432/int257",
    isAdmin: Boolean(serviceKey),
  };
}`,
      explanation:
        "`process.env.DATABASE_URL` is accessible inside Server Components, Route Handlers, and Server Actions, but is completely undefined in client browser bundles.",
      outputPreview: "Safe server-side configuration loader with fallback warning.",
    },

    moreExamples: [
      {
        title: "Using 'server-only' Package for Bulletproof Protection",
        description: "Throwing a build error if a secret server module is ever accidentally imported into a Client Component.",
        language: "typescript",
        filename: "src/lib/secrets.ts",
        code: `import "server-only"; // Guarantees this file can NEVER be imported into a Client Component!

export const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY!;

export async function executeAdminMigration() {
  console.log("Running migration with admin credentials...");
}`,
        explanation:
          "Importing `'server-only'` tells the Next.js compiler to immediately throw a build error if any Client Component tries to import this file.",
      },
    ],

    multipleWays: [
      {
        name: "Standard Server-Only Variable (Recommended for secrets)",
        syntax: "process.env.SECRET_KEY in server files",
        codeSnippet: `const key = process.env.STRIPE_SECRET_KEY;`,
        howItWorks: "Available in Server Components, Route Handlers, and Server Actions.",
        pros: ["100% secure", "Never sent to browser"],
        cons: ["Returns `undefined` if accessed in a Client Component"],
        whenToUse: "For database credentials, private API keys, payment secrets.",
        isRecommended: true,
      },
      {
        name: "Public Client Variable (NEXT_PUBLIC_*)",
        syntax: "process.env.NEXT_PUBLIC_KEY in any file",
        codeSnippet: `const url = process.env.NEXT_PUBLIC_SUPABASE_URL;`,
        howItWorks: "Replaced inline with its value by the Next.js bundler at build time.",
        pros: ["Accessible in both Client and Server Components"],
        cons: ["Visible to anyone inspecting browser source code in DevTools"],
        whenToUse: "For public API endpoints, analytics IDs (e.g. Google Analytics tracking ID).",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Never prefix database or private keys with `NEXT_PUBLIC_`. Use `'server-only'` for sensitive helper libraries.",
      scenarios: [
        {
          scenario: "You have a Supabase service role key that allows bypassing all security rules",
          recommendedApproach: "Name it `SUPABASE_SERVICE_ROLE_KEY` (no prefix) in `.env.local`",
          reason: "Must remain strictly on the server.",
        },
        {
          scenario: "You need the Supabase Project URL in a client search component",
          recommendedApproach: "Name it `NEXT_PUBLIC_SUPABASE_URL`",
          reason: "The project URL is a public endpoint designed for client communication.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Committing .env.local to Git / GitHub repository",
        badCode: `// ❌ DANGEROUS: git add .env.local && git commit -m "add env file"
// Pushes your private database passwords to public GitHub!`,
        goodCode: `// ✅ GOOD: Add .env.local to .gitignore
# .gitignore
.env*.local
.env`,
        whyItBreaks: "Bots scan GitHub 24/7 for database passwords and cloud credentials.",
        howToFix: "Ensure `.env.local` is listed in your `.gitignore` file, and share `.env.example` with dummy values instead.",
      },
    ],

    bestPractices: [
      {
        title: "Maintain a .env.example Template",
        rule: "Create a `.env.example` file with placeholder values (e.g. `DATABASE_URL=your_postgres_url_here`).",
        explanation: "Helps teammates and students know which variables are required without exposing actual secrets.",
      },
    ],

    exercises: [
      {
        id: "u4-ex-4",
        title: "Create a Secure Supabase Config Helper",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a TypeScript helper function `getSupabaseConfig()` that returns `{ url, anonKey, isConfigured }` by safely reading `NEXT_PUBLIC_` environment variables.",
        initialCode: `export function getSupabaseConfig() {
  // TODO: Read NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
}`,
        expectedOutput: "A config object containing public Supabase credentials.",
        hints: ["Check `process.env.NEXT_PUBLIC_SUPABASE_URL`", "Set `isConfigured: Boolean(...)`"],
        solutionCode: `export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock-supabase.example.com";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-anon-key";

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://mock-supabase.example.com"
  );

  return { url, anonKey, isConfigured };
}`,
        solutionExplanation:
          "This helper safely reads client-safe environment variables with fallback support for offline development.",
      },
    ],

    quizzes: [
      {
        id: "u4-q4",
        question: "What happens if you try to read process.env.DATABASE_PASSWORD inside a Client Component ('use client')?",
        syllabusTopic: "Environment Variable Security",
        options: [
          { id: "a", text: "It returns the secret password to the user", isCorrect: false, explanation: "Next.js specifically blocks non-NEXT_PUBLIC variables in client bundles." },
          { id: "b", text: "It returns undefined because Next.js strips server variables from client JavaScript bundles for security", isCorrect: true, explanation: "Correct! Without NEXT_PUBLIC_, the bundler strips the variable completely from client code." },
          { id: "c", text: "The computer shuts down", isCorrect: false, explanation: "No." },
          { id: "d", text: "It logs an error in the browser console and crashes React", isCorrect: false, explanation: "It simply evaluates to undefined." },
        ],
        conceptualExplanation:
          "Next.js strictly prevents server-only environment variables from being bundled into client code. They evaluate to `undefined` on the client.",
      },
    ],

    realWorldExample: {
      domain: "AI LLM Provider API Key Management",
      description: "How companies call OpenAI / Anthropic / Gemini APIs on the server without letting users steal their paid API keys.",
      code: {
        title: "Secure AI Proxy Route",
        description: "Server Route Handler using secret AI key.",
        language: "typescript",
        filename: "src/app/api/ai/route.ts",
        code: `import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  // process.env.GEMINI_API_KEY is 100% hidden on the server:
  const aiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
    method: "POST",
    headers: { "x-goog-api-key": process.env.GEMINI_API_KEY! },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  }).then(r => r.json());

  return NextResponse.json(aiResponse);
}`,
      },
      keyTakeaway: "By proxying AI calls through a server Route Handler, paid API keys are never exposed in browser network inspection tools.",
    },

    combinedExample: {
      combinedTopics: ["Environment Variables", "Supabase Client", "Server Actions"],
      title: "Secure Full-Stack Database Architecture",
      description: "How public and private keys coordinate in a real application.",
      code: {
        title: "Environment Variable Architecture",
        description: "Visualizing server vs client environment separation.",
        language: "typescript",
        filename: "Architecture Configuration",
        code: `// .env.local
DATABASE_URL=postgresql://...       # Read only by Server Components & Server Actions
NEXT_PUBLIC_SUPABASE_URL=https://... # Read by Browser & Server for public data queries`,
      },
      stepByStepFlow: [
        "Store secrets in `.env.local`",
        "Access public endpoints in Client Components via `NEXT_PUBLIC_*`",
        "Access private credentials inside Server Actions and Route Handlers",
        "Deploy to Vercel/Docker with environment variables configured in dashboard",
      ],
    },
  },
];
