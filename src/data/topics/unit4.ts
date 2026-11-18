import { TopicContent } from "@/types";

export const unit4Topics: TopicContent[] = [
  {
    id: "auth-and-protected-routes-concepts",
    unitId: "unit-4",
    title: "Authentication, Authorization & Protected Routes",
    shortSummary: "Learn web security step-by-step from simple logins to cookies, sessions, protected routes, and Role-Based Access Control in plain JavaScript.",
    order: 1,
    tags: ["Auth", "Cookies", "Protected Routes", "RBAC", "JWT", "Security"],

    simpleExplanation:
      "Think of web security like a VIP concert venue: you show your ticket once at the entrance, receive a tamper-proof wristband (cookie), and the security guard at each stage door checks your wristband before opening the curtain! Next.js verifies your session directly on the server, keeping private data 100% safe with zero client-side screen flicker.",

    whyNeeded:
      "Without authentication, anyone on the internet could access your private dashboard, change other students' grades, or delete your entire database. Next.js Server Components allow you to inspect cookies directly on the server and redirect unauthorized visitors before a single line of private HTML is transmitted.",

    reactVsNext: {
      concept: "Route Protection & Auth Model",
      reactWay: {
        title: "Client-Side Token Storage in localStorage",
        code: `// Traditional client-side approach:
function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // ⚠️ Security Risk: localStorage is vulnerable to XSS theft!
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // ⚠️ Notice: private screen flashes before redirect!
    } else {
      fetchUser(token).then(u => { setUser(u); setLoading(false); });
    }
  }, []);

  if (loading) return <p>Checking access...</p>;
  return <h1>Secret Financial Dashboard</h1>;
}`,
        explanation:
          "Client-side auth stores tokens in localStorage where hackers can steal them via malicious scripts. Furthermore, private HTML components can flash on screen before the client redirect takes place.",
        drawbacks: [
          "Tokens in localStorage are vulnerable to XSS script injection",
          "Private dashboard flashes on screen before client router redirects",
          "Search engines can index private page templates",
        ],
      },
      nextjsWay: {
        title: "Next.js Server-Side Cookie Guard (Zero Flash, 100% Secure)",
        code: `// src/app/dashboard/page.js (Server Component - Pure JavaScript!)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 1. The Security Guard inspects the cookie wristband ON THE SERVER:
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token");

  // 2. If no wristband, redirect BEFORE any HTML is sent:
  if (!sessionToken) {
    redirect("/login");
  }

  // 3. Render private content securely:
  return <h1>🔒 Welcome to Your Private Student Portal</h1>;
}`,
        explanation:
          "In Next.js, authentication runs on the backend server before HTML generation. Unauthorized users are intercepted instantly with zero UI flash.",
        benefits: [
          "Zero client flash of private dashboard content",
          "Cookies with httpOnly cannot be stolen by client JavaScript",
          "Clean redirect logic directly inside Server Components",
        ],
      },
      whyDifferent:
        "Next.js inspects incoming HTTP request headers and cookies directly on the server, redirecting unauthorized users before sending any page content.",
      mentalShiftSummary:
        "Never store auth tokens in localStorage. Use httpOnly cookies and protect routes on the server using cookies() and redirect().",
    },

    basicExample: {
      title: "Protected Admin Route with Role-Based Access Control in Plain JavaScript",
      description: "A secure Server Component page verifying authentication and checking the admin role.",
      language: "jsx",
      filename: "src/app/admin/page.js",
      code: `// src/app/admin/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Simulated server auth helper:
async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  // Level 6 RBAC: Inspect role from session:
  return { id: 1, name: "Professor Mehta", role: "admin" };
}

export default async function AdminPage() {
  // Step 1: Who are you? (Authentication)
  const user = await getCurrentUser();

  if (!user) {
    // Security Guard stops visitor: redirect to login!
    redirect("/login");
  }

  // Step 2: What are you allowed to do? (Role-Based Authorization)
  if (user.role !== "admin") {
    return (
      <div className="p-8 text-center space-y-3">
        <h1 className="text-2xl font-bold text-rose-400">⛔ Access Denied</h1>
        <p className="text-zinc-400">
          This room is reserved for University Administrators. You are logged in as {user.name} ({user.role}).
        </p>
      </div>
    );
  }

  // Step 3: Authorized access granted!
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Administrator Console</h1>
          <p className="text-zinc-400 text-sm">Welcome back, {user.name}</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono">
          Role: ADMIN
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-xs text-zinc-500">Total Students</p>
          <p className="text-2xl font-bold text-zinc-100 mt-1">1,420</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-xs text-zinc-500">Active Courses</p>
          <p className="text-2xl font-bold text-zinc-100 mt-1">28</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-xs text-zinc-500">System Status</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">Online</p>
        </div>
      </div>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: import { cookies } from 'next/headers'; gives us secure access to HTTP cookies on the server.\n- Line 3: import { redirect } from 'next/navigation'; lets us navigate users to another page on the server.\n- Line 7: const cookieStore = await cookies(); reads incoming request cookies.\n- Line 19: if (!user) redirect('/login'); acts as the Security Guard! If no valid session cookie exists, the user is redirected to /login immediately.\n- Line 25-33: RBAC check: if user.role !== 'admin', we render an Access Denied screen instead of private admin stats.\n- Line 36-62: If authenticated AND authorized as an admin, the dashboard renders with full access.\n\nWhat happens in the browser?\n1. An unauthenticated visitor types 'http://localhost:3000/admin'.\n2. The request reaches the Next.js server.\n3. The server runs AdminPage, notices no auth cookie, and sends back an HTTP 307 redirect to /login.\n4. The visitor's browser lands on /login in 10ms without ever seeing the admin numbers or layout!",
      outputPreview: "Clean Administrator Console showing user greeting, role badge, and 3 metric cards.",
    },

    moreExamples: [
      {
        title: "Login Server Action Setting an httpOnly Cookie in Plain JavaScript",
        description: "How to authenticate credentials and issue a secure cookie wristband.",
        language: "jsx",
        filename: "src/actions/authActions.js",
        code: `// src/actions/authActions.js
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Level 1: Verify credentials (in production, query database with hashed password):
  if (email === "student@university.edu" && password === "learnNext123") {
    const cookieStore = await cookies();

    // Level 2: Give the student their ID card wristband (Cookie):
    cookieStore.set("auth_token", "sample_secure_session_token", {
      httpOnly: true, // Prevents hackers from reading the cookie via JavaScript!
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // Valid for 7 days
    });

    // Level 4: Redirect to protected dashboard:
    redirect("/dashboard");
  }

  return { error: "Invalid email or password. Please try again." };
}`,
        explanation:
          "Setting `httpOnly: true` protects the cookie from XSS attacks. The user's browser automatically carries this cookie on every subsequent request.",
      },
    ],

    multipleWays: [
      {
        name: "Server Component Check (Recommended for simplicity)",
        syntax: "if (!user) redirect('/login') inside page.js",
        codeSnippet: `const cookieStore = await cookies();
if (!cookieStore.get('token')) redirect('/login');`,
        howItWorks: "Evaluates auth inside individual page Server Components before rendering.",
        pros: ["Simple to read and trace", "Direct access to full page context and database"],
        cons: ["Must be repeated on each protected page if you have dozens of routes"],
        whenToUse: "Pages needing specific user profile data or role checks.",
        isRecommended: true,
      },
      {
        name: "Middleware Check (For broad route protection)",
        syntax: "export function middleware(request) in middleware.js",
        codeSnippet: `export function middleware(req) {
  if (!req.cookies.has('token')) return NextResponse.redirect(new URL('/login', req.url));
}`,
        howItWorks: "Intercepts incoming requests at the edge before route handlers or pages execute.",
        pros: ["Protects entire folder trees (e.g. /dashboard/*) with one file"],
        cons: ["Runs on lightweight Edge runtime (cannot run heavy database queries)"],
        whenToUse: "Protecting entire URL paths (/admin/*, /dashboard/*) globally.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use middleware.js to protect entire URL trees like /dashboard/* from unauthorized traffic. Use Server Component checks inside page.js for fine-grained role checks (Admin vs Student).",
      scenarios: [
        {
          scenario: "Preventing logged-out visitors from seeing any page under /dashboard/*",
          recommendedApproach: "middleware.js cookie check",
          reason: "Runs in 1ms at the edge before any route component is touched.",
        },
        {
          scenario: "Allowing teachers to grade assignments, but restricting students to view-only",
          recommendedApproach: "Server Component RBAC check inside src/app/assignments/[id]/page.js",
          reason: "Needs full database access to check whether the logged-in user is the teacher of that course.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Storing authentication passwords or secrets in localStorage",
        badCode: `// ❌ BAD: Storing secret tokens in localStorage in the browser
localStorage.setItem("user_secret_token", token);`,
        goodCode: `// ✅ GOOD: Use httpOnly cookies set by Server Actions
cookieStore.set("auth_token", token, { httpOnly: true, secure: true });`,
        whyItBreaks: "Any third-party script or malicious npm package can read localStorage, allowing hackers to steal user sessions.",
        howToFix: "Always use httpOnly cookies set on the server.",
      },
    ],

    bestPractices: [
      {
        title: "Always Use httpOnly and Secure Cookies",
        rule: "Configure all auth cookies with httpOnly: true, secure: true, and sameSite: 'lax'.",
        explanation: "This locks the cookie in the browser's secure vault, preventing cross-site scripting (XSS) and cross-site request forgery (CSRF) attacks.",
      },
    ],

    exercises: [
      {
        id: "u4-ex-1",
        title: "Build a Server-Guarded Profile Page",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a Server Component in src/app/profile/page.js in plain JavaScript that reads the 'session_id' cookie. If it does not exist, redirect to '/login'. Otherwise, show 'Welcome to your Profile!'.",
        initialCode: `// src/app/profile/page.js
// TODO: Read cookies and protect this page
export default async function ProfilePage() {
  return <div>Profile</div>;
}`,
        expectedOutput: "A protected Server Component redirecting unauthorized visitors to /login.",
        hints: ["Import `cookies` from 'next/headers' and `redirect` from 'next/navigation'"],
        solutionCode: `// src/app/profile/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_id");

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-2">
      <h1 className="text-xl font-bold text-zinc-100">Welcome to your Profile!</h1>
      <p className="text-zinc-400 text-sm">Your session is active and secure.</p>
    </div>
  );
}`,
        solutionExplanation: "The cookies() function inspects incoming headers on the server, redirecting unauthorized users before HTML is rendered.",
      },
    ],

    quizzes: [
      {
        id: "u4-q1",
        syllabusTopic: "Authentication & Protected Routes",
        question: "Why can't Server Components read authentication tokens stored in browser localStorage?",
        conceptualExplanation: "Server Components execute on the server in a Node.js or Edge runtime where the browser window and localStorage objects do not exist.",
        options: [
          { id: "a", text: "Because localStorage is only for mobile applications", isCorrect: false, explanation: "localStorage is a browser API." },
          { id: "b", text: "Because Server Components execute on the server before the HTML reaches the browser, where localStorage does not exist", isCorrect: true, explanation: "Correct! The server runtime has no concept of the browser's window or localStorage object." },
          { id: "c", text: "Because React disabled localStorage in version 19", isCorrect: false, explanation: "localStorage is still supported in client components." },
          { id: "d", text: "To make CSS load faster", isCorrect: false, explanation: "Unrelated." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Healthcare Patient Portal",
      description: "How a medical portal verifies doctor permissions before displaying sensitive patient records.",
      code: {
        title: "Patient Medical Record Guard",
        description: "Server Component verifying doctor role before rendering patient history in plain JavaScript.",
        language: "jsx",
        filename: "src/app/patients/[id]/page.js",
        code: `import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PatientRecordPage({ params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;

  if (role !== "doctor") {
    redirect("/unauthorized");
  }

  return (
    <div className="p-6 bg-zinc-900 rounded-xl space-y-2">
      <h1 className="text-xl font-bold text-zinc-100">Patient Medical History #{id}</h1>
      <p className="text-zinc-400 text-sm">Confidential HIPAA Protected Record.</p>
    </div>
  );
}`,
      },
      keyTakeaway: "Role-Based Access Control on the server ensures sensitive records are only exposed to authorized personnel.",
    },

    combinedExample: {
      combinedTopics: ["Authentication", "Server Actions", "Cookies"],
      title: "Complete Logout Action",
      description: "Server Action clearing auth cookies and redirecting to the login screen.",
      code: {
        title: "Logout Server Action",
        description: "Invalidating the session cookie in plain JavaScript.",
        language: "jsx",
        filename: "src/actions/authActions.js",
        code: `"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  // Cut off the wristband:
  cookieStore.delete("auth_token");
  redirect("/login");
}`,
      },
      stepByStepFlow: [
        "User clicks 'Sign Out' button",
        "logoutAction Server Action runs on backend",
        "Server instructs browser to delete auth_token cookie",
        "User is immediately redirected to /login",
      ],
    },
  },

  {
    id: "database-and-orm-concepts",
    unitId: "unit-4",
    title: "Database Fundamentals, SQL & ORMs",
    shortSummary: "Learn databases using the School Register analogy, tables/rows/columns, SQL queries, and how ORMs translate JavaScript to database records.",
    order: 2,
    tags: ["Database", "SQL", "ORM", "Prisma", "SQLite", "PostgreSQL"],

    simpleExplanation:
      "Imagine the principal's office in a school:\n\n" +
      "1. **What is a Database?**\nIf you write student names on sticky notes, they blow away when the fan turns on (that is in-memory JavaScript). A **Database** is a heavy steel filing cabinet with locked drawers. Even if the school loses power or your computer restarts, the records inside stay safe forever!\n\n" +
      "2. **Tables, Columns & Rows (The Register Book)**:\n" +
      "- **Table**: A specific register book named \`students\`.\n" +
      "- **Columns (Headings)**: \`id\`, \`name\`, \`course\`.\n" +
      "- **Rows (Each Student's Entry)**:\n" +
      "  - Row 1: \`1 | Rahul Kumar | Computer Science\`\n" +
      "  - Row 2: \`2 | Priya Sharma | Computer Science\`\n" +
      "  - Row 3: \`3 | Aman Gupta   | Information Technology\`\n\n" +
      "3. **What is SQL?**\nSQL (Structured Query Language) is the language the database speaks: \`SELECT * FROM students WHERE course = 'Computer Science'\`.\n\n" +
      "4. **What is an ORM (Object-Relational Mapper)?**\nAn ORM is a **Bilingual Translator**! You don't want to write messy raw SQL queries in your JavaScript files. Instead, you write clean JavaScript: \`db.students.findMany()\`. The ORM translates your JavaScript into database SQL commands automatically:\n" +
      "  \`Frontend -> Next.js -> ORM (Translator) -> Database\`\n\n" +
      "5. **Where does the database actually live?**\nIn development, tools like SQLite store your entire database as a REAL file right inside your project directory (for example, \`prisma/dev.db\`)! In production, cloud databases like Supabase or Neon host PostgreSQL on powerful cloud servers.",

    whyNeeded:
      "Full-stack applications require permanent, reliable data persistence. An ORM provides type-safety, automated schema migrations, and readable JavaScript syntax for performing complex relational database queries.",

    reactVsNext: {
      concept: "Database Access Architecture",
      reactWay: {
        title: "Client-Side Database Calls via REST APIs",
        code: `// Traditional client-side approach:
// If you write database code in React:
import { db } from "./db"; // 💥 CRITICAL ERROR!
// The database password would be sent to every user's browser,
// allowing any visitor to delete your entire database!`,
        explanation:
          "Browsers cannot maintain TCP socket connections to database servers, and putting database credentials in client code is a fatal security disaster.",
        drawbacks: [
          "Zero direct database access from frontend React components",
          "Requires a separate backend API server (Express/NestJS)",
          "Exposes secret database credentials if accidentally imported",
        ],
      },
      nextjsWay: {
        title: "Next.js Server Direct Database Access (Safe & Fast)",
        code: `// src/app/students/page.js (Server Component - Pure JavaScript!)
// Database query runs strictly on the backend:
import { db } from "@/lib/db";

export default async function StudentsPage() {
  // Directly query your database! Zero client exposure:
  const students = await db.student.findMany({
    where: { course: "Computer Science" },
  });

  return (
    <ul>
      {students.map((s) => (
        <li key={s.id}>{s.name} - {s.course}</li>
      ))}
    </ul>
  );
}`,
        explanation:
          "Because Next.js Server Components run on the server, you can query databases directly inside your components with zero API routes and zero credential leakage.",
        benefits: [
          "Direct database querying with zero REST boilerplate",
          "Database connection strings and passwords remain completely private",
          "Ultra-fast: queries execute right next to the database server",
        ],
      },
      whyDifferent:
        "Next.js Server Components run in Node.js on the backend, allowing direct database access using Prisma, Drizzle, or Supabase.",
      mentalShiftSummary:
        "You don't need to create an API route just to read from your database. Query your ORM directly inside async Server Components.",
    },

    basicExample: {
      title: "Querying Students with an ORM Translator in Plain JavaScript",
      description: "Direct database access in an async Server Component using clean JavaScript.",
      language: "jsx",
      filename: "src/app/students/page.js",
      code: `// src/app/students/page.js
// Simulated ORM client (e.g. Prisma or Supabase):
import { db } from "@/lib/db";

export default async function StudentsPage() {
  // The ORM translates this JavaScript method into:
  // "SELECT id, name, course FROM students WHERE enrolled = true;"
  const students = await db.student.findMany({
    where: { enrolled: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-100">School Student Register</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Queried directly from the database using our ORM translator.
        </p>
      </div>

      <div className="overflow-hidden border border-zinc-800 rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase text-xs">
            <tr>
              <th className="p-4">Roll ID</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Course</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-950">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-zinc-900/50">
                <td className="p-4 font-mono text-xs text-amber-400">#{student.id}</td>
                <td className="p-4 font-medium text-zinc-100">{student.name}</td>
                <td className="p-4 text-zinc-400">{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 3: import { db } from '@/lib/db'; imports our server-side database translator.\n- Line 8-11: db.student.findMany(...) is clean plain JavaScript! We don't have to write raw SQL strings with quotes and semicolons. The ORM translates it for us.\n- Line 13-44: The component receives the data array directly and renders the HTML table.\n\nWhat happens in the browser?\n1. The visitor requests /students.\n2. The Next.js server executes the findMany query against the database file/server.\n3. The database returns the matching student rows in 2 milliseconds.\n4. Next.js generates the complete HTML table with all names filled in and transmits it to the browser with zero loading spinners!",
      outputPreview: "A styled table showing Roll ID, Student Name, and Course columns with live records.",
    },

    moreExamples: [
      {
        title: "Creating a Student with an ORM inside a Server Action",
        description: "Inserting a new student record into the database table in plain JavaScript.",
        language: "jsx",
        filename: "src/actions/studentDbActions.js",
        code: `// src/actions/studentDbActions.js
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addStudentToRegister(formData) {
  const name = formData.get("name");
  const course = formData.get("course");

  if (!name || !course) return;

  // The ORM translates this to:
  // "INSERT INTO students (name, course, enrolled) VALUES (...);"
  await db.student.create({
    data: {
      name: name.trim(),
      course: course.trim(),
      enrolled: true,
    },
  });

  // Refresh student register page:
  revalidatePath("/students");
}`,
        explanation:
          "Server Actions can write to the database directly via your ORM. Calling revalidatePath ensures the updated register is displayed instantly.",
      },
    ],

    multipleWays: [
      {
        name: "ORM (Prisma / Drizzle - Recommended)",
        syntax: "await db.model.findMany()",
        codeSnippet: "const students = await db.student.findMany({ where: { active: true } });",
        howItWorks: "Translates intuitive JavaScript object syntax into safe, optimized SQL queries.",
        pros: ["No raw SQL injection bugs", "Clean auto-completion", "Automated migrations"],
        cons: ["Requires learning ORM method conventions"],
        whenToUse: "Default for modern Next.js applications.",
        isRecommended: true,
      },
      {
        name: "Raw SQL Queries",
        syntax: "await db.query('SELECT * FROM students')",
        codeSnippet: "const res = await pool.query('SELECT * FROM students WHERE id = $1', [id]);",
        howItWorks: "Sends raw SQL command strings directly to the database engine.",
        pros: ["Maximum raw database performance for ultra-complex analytics joins"],
        cons: ["Prone to SQL injection if parameters are not parameterized correctly"],
        whenToUse: "High-performance reporting dashboards with massive joins.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use an ORM like Prisma or Supabase SDK for all standard CRUD operations. Only drop into raw SQL for complex multi-table analytical reporting.",
      scenarios: [
        {
          scenario: "Standard student course enrollment and profile updates",
          recommendedApproach: "ORM (e.g. Prisma or Supabase)",
          reason: "Safe, readable JavaScript syntax with zero SQL injection risk.",
        },
        {
          scenario: "Generating complex university-wide statistical correlations across 15 tables",
          recommendedApproach: "Raw SQL query ($queryRaw)",
          reason: "Complex subqueries and window functions can be written with custom SQL optimization.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Instantiating a new database client on every single request in development",
        badCode: `// ❌ BAD: Re-creating new PrismaClient() on every page request!
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Exhausts database connections quickly in development!`,
        goodCode: `// ✅ GOOD: Save PrismaClient to globalThis in development
// src/lib/db.js
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis;
export const db = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;`,
        whyItBreaks: "Next.js hot module reloading re-runs files, creating hundreds of unused database connections that quickly crash your database server.",
        howToFix: "Use the standard singleton pattern attaching the client to globalThis.",
      },
    ],

    bestPractices: [
      {
        title: "Use Database Migrations",
        rule: "Always track database schema changes through migration files (e.g. npx prisma migrate dev).",
        explanation: "Migrations document every table and column change so your teammates and production servers stay synchronized.",
      },
    ],

    exercises: [
      {
        id: "u4-ex-2",
        title: "Write an ORM Find Query",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write an async Server Component in src/app/courses/page.js that uses `db.course.findMany()` in plain JavaScript to retrieve all courses with `credits: 4`.",
        initialCode: `// src/app/courses/page.js
import { db } from "@/lib/db";

export default async function CoursesPage() {
  // TODO: Query courses with credits: 4
  return <div>Courses</div>;
}`,
        expectedOutput: "A component querying courses by credit count.",
        hints: ["Pass `{ where: { credits: 4 } }` into `findMany`"],
        solutionCode: `// src/app/courses/page.js
import { db } from "@/lib/db";

export default async function CoursesPage() {
  const courses = await db.course.findMany({
    where: { credits: 4 },
  });

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-xl font-bold">4-Credit Modules</h1>
      {courses.map((c) => (
        <p key={c.id}>{c.title} ({c.code})</p>
      ))}
    </div>
  );
}`,
        solutionExplanation: "The ORM where filter translates to an SQL WHERE clause in the backend query.",
      },
    ],

    quizzes: [
      {
        id: "u4-q2",
        syllabusTopic: "Database & ORM Fundamentals",
        question: "What is the primary role of an ORM (Object-Relational Mapper)?",
        conceptualExplanation: "An ORM acts as a bilingual translator between your JavaScript code and the database SQL commands.",
        options: [
          { id: "a", text: "To make your website styling look like Instagram", isCorrect: false, explanation: "Styling is CSS." },
          { id: "b", text: "To translate plain JavaScript objects and methods into database SQL queries automatically", isCorrect: true, explanation: "Correct! The ORM bridges JavaScript application code and relational SQL tables." },
          { id: "c", text: "To replace JavaScript with C++", isCorrect: false, explanation: "No." },
          { id: "d", text: "To delete the hard drive", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "University Library System",
      description: "How a university library tracks book checkouts with relational database models.",
      code: {
        title: "Library Catalog Database Query",
        description: "Relational query joining books and student checkouts in plain JavaScript.",
        language: "jsx",
        filename: "src/app/library/page.js",
        code: `import { db } from "@/lib/db";

export default async function LibraryPage() {
  const books = await db.book.findMany({
    include: { checkedOutBy: true },
  });

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-xl font-bold text-zinc-100">Library Catalog</h1>
      {books.map((b) => (
        <div key={b.id} className="p-3 bg-zinc-900 rounded-lg">
          <p className="font-semibold">{b.title}</p>
          <p className="text-xs text-zinc-400">
            {b.checkedOutBy ? \`Checked out by: \${b.checkedOutBy.name}\` : "Available on shelf"}
          </p>
        </div>
      ))}
    </div>
  );
}`,
      },
      keyTakeaway: "Relational ORM includes automatically fetch joined tables without writing complicated manual SQL JOIN statements.",
    },

    combinedExample: {
      combinedTopics: ["Database", "Server Components", "Tailwind CSS"],
      title: "Interactive Student Table with Live DB Data",
      description: "Full student directory backed by database records.",
      code: {
        title: "Student Roster Table",
        description: "Responsive table populated directly by database query.",
        language: "jsx",
        filename: "src/app/students-table/page.js",
        code: `import { db } from "@/lib/db";

export default async function StudentsTablePage() {
  const students = await db.student.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Enrolled Students ({students.length})</h1>
      <ul className="space-y-2">
        {students.map((s) => (
          <li key={s.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            {s.name} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Server executes db.student.findMany()",
        "Records arrive in 2ms",
        "Server renders complete HTML list",
        "Browser displays student directory instantly",
      ],
    },
  },

  {
    id: "supabase-crud-operations",
    unitId: "unit-4",
    title: "Supabase Database & Full CRUD Operations",
    shortSummary: "Master full CRUD operations on a Student entity (Create, Read, Update, Delete) using Supabase PostgreSQL and Server Actions in plain JavaScript.",
    order: 3,
    tags: ["Supabase", "CRUD", "PostgreSQL", "Server Actions", "Database"],

    simpleExplanation:
      "**CRUD** represents the 4 essential actions every web app performs on data:\n\n" +
      "1. **C - CREATE (Add a new student)**:\n" +
      "   A new student arrives at school. You write their name in the register:\n" +
      "   \`await supabase.from('students').insert([{ name: 'Rahul', course: 'CSE' }])\`\n\n" +
      "2. **R - READ (Show the student list)**:\n" +
      "   The teacher opens the book to see everyone enrolled:\n" +
      "   \`const { data } = await supabase.from('students').select('*')\`\n\n" +
      "3. **U - UPDATE (Edit student information)**:\n" +
      "   Rahul switches his major from CSE to AI Engineering:\n" +
      "   \`await supabase.from('students').update({ course: 'AI' }).eq('id', 1)\`\n\n" +
      "4. **D - DELETE (Remove student upon graduation)**:\n" +
      "   A student graduates and leaves the school:\n" +
      "   \`await supabase.from('students').delete().eq('id', 1)\`\n\n" +
      "**What is Supabase?**\nSupabase is an open-source, cloud-hosted PostgreSQL database. It gives you a clean JavaScript SDK to perform all 4 CRUD actions in plain JavaScript without running a local database engine!",

    whyNeeded:
      "Virtually all web applications (social media feeds, e-commerce stores, learning portals, banking apps) are built on CRUD operations. Mastering CRUD with Supabase gives you the ability to build any full-stack web product.",

    reactVsNext: {
      concept: "Supabase CRUD Architecture",
      reactWay: {
        title: "Client-Side Database Operations",
        code: `// Client-side database execution in the browser:
function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // ⚠️ Network request initiated from user's laptop:
    supabase.from("students").select("*")
      .then(({ data }) => setStudents(data));
  }, []);

  return <div>{students.map(s => <p key={s.id}>{s.name}</p>)}</div>;
}`,
        explanation:
          "When database operations run from the client browser, you must rely entirely on complex Row Level Security rules and expose database endpoints to browser network inspection.",
        drawbacks: [
          "Network waterfalls: browser must load React before querying database",
          "Shows blank loading spinners on initial page view",
          "Database endpoints visible in browser DevTools network tab",
        ],
      },
      nextjsWay: {
        title: "Next.js Server-Side Supabase CRUD (Direct & Fast)",
        code: `// src/app/students/page.js (Server Component - Pure JavaScript!)
import { supabase } from "@/lib/supabase";
import { deleteStudentAction } from "@/actions/studentActions";

export default async function StudentsPage() {
  // READ directly on the server:
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .order("id", { ascending: true });

  return (
    <ul>
      {students.map((s) => (
        <li key={s.id}>
          {s.name} ({s.course})
          {/* DELETE via Server Action: */}
          <form action={async () => { "use server"; await deleteStudentAction(s.id); }}>
            <button>Delete</button>
          </form>
        </li>
      ))}
    </ul>
  );
}`,
        explanation:
          "In Next.js, READ operations execute on the server during page rendering, while CREATE, UPDATE, and DELETE operations execute securely through Server Actions.",
        benefits: [
          "Instant HTML rendering: complete student list delivered in the initial response",
          "Zero client-side waterfalls or blank loading screens",
          "Database operations run securely on the server",
        ],
      },
      whyDifferent:
        "Next.js separates data reading (in Server Components) from data mutating (in Server Actions), creating a clean and secure full-stack workflow.",
      mentalShiftSummary:
        "Read Supabase data inside async Server Components with .select('*'). Mutate Supabase data inside Server Actions with .insert(), .update(), and .delete().",
    },

    basicExample: {
      title: "Complete Student CRUD in Plain JavaScript with Supabase",
      description: "A complete CRUD dashboard demonstrating Create, Read, Update, and Delete on students.",
      language: "jsx",
      filename: "src/app/students/page.js",
      code: `// src/app/students/page.js
import { supabase } from "@/lib/supabase";
import { addStudentAction, deleteStudentAction } from "@/actions/studentActions";

export default async function StudentCrudPage() {
  // 1. READ (R): Fetch all students from Supabase:
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-100">Student Directory (CRUD)</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Powered by Supabase PostgreSQL and Next.js Server Actions in plain JavaScript.
        </p>
      </div>

      {/* 2. CREATE (C): Form to add a new student */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-zinc-100">Enroll New Student</h2>
        <form action={addStudentAction} className="flex flex-col sm:flex-row gap-3">
          <input
            name="name"
            placeholder="Student Name"
            className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 text-sm"
            required
          />
          <input
            name="course"
            placeholder="Course (e.g. CSE)"
            className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 text-sm"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Enroll
          </button>
        </form>
      </div>

      {/* READ list with DELETE buttons */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-100">Enrolled Students ({students?.length || 0})</h2>
        <div className="grid gap-3">
          {students?.map((student) => (
            <div
              key={student.id}
              className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-zinc-100">{student.name}</h3>
                <span className="text-xs font-mono text-emerald-400">{student.course}</span>
              </div>

              {/* 3. DELETE (D): Form triggering Server Action */}
              <form action={async () => {
                "use server";
                await deleteStudentAction(student.id);
              }}>
                <button
                  type="submit"
                  className="px-3 py-1 bg-zinc-950 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-zinc-800 rounded-lg text-xs transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: import { supabase } from '@/lib/supabase'; imports the initialized Supabase client.\n- Line 7-10: await supabase.from('students').select('*') reads all student records from PostgreSQL on the server.\n- Line 22-40: The Create form passes user inputs directly to addStudentAction.\n- Line 46-75: Maps over the student array. Each item has a delete button wired to deleteStudentAction.\n\nWhat happens in the browser?\n1. The page loads with all students pre-rendered into HTML in milliseconds.\n2. A teacher types 'Aman Gupta' and 'CSE' and clicks 'Enroll'.\n3. The addStudentAction inserts the record into Supabase and calls revalidatePath('/students').\n4. The page refreshes automatically, displaying Aman in the list without a manual page reload!",
      outputPreview: "Full student management interface showing enrollment form and list of student cards with delete actions.",
    },

    moreExamples: [
      {
        title: "CRUD Server Actions for Supabase in Plain JavaScript",
        description: "The backend Server Actions handling Create, Update, and Delete in Supabase.",
        language: "jsx",
        filename: "src/actions/studentActions.js",
        code: `// src/actions/studentActions.js
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// 1. CREATE: Insert a new student
export async function addStudentAction(formData) {
  const name = formData.get("name");
  const course = formData.get("course");

  if (!name || !course) return;

  const { error } = await supabase
    .from("students")
    .insert([{ name: name.trim(), course: course.trim() }]);

  if (error) console.error("Error adding student:", error.message);
  revalidatePath("/students");
}

// 2. UPDATE: Change a student's course
export async function updateStudentCourse(id, newCourse) {
  const { error } = await supabase
    .from("students")
    .update({ course: newCourse })
    .eq("id", id);

  if (error) console.error("Error updating student:", error.message);
  revalidatePath("/students");
}

// 3. DELETE: Remove a student
export async function deleteStudentAction(id) {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) console.error("Error deleting student:", error.message);
  revalidatePath("/students");
}`,
        explanation:
          "All mutations happen on the server. Calling .eq('id', id) ensures only that specific record is updated or deleted.",
      },
    ],

    multipleWays: [
      {
        name: "Supabase JS SDK (Recommended)",
        syntax: "supabase.from('table').select/insert/update/delete",
        codeSnippet: "const { data } = await supabase.from('students').select('*');",
        howItWorks: "Chainable JavaScript methods that map to PostgreSQL operations.",
        pros: ["Clean, expressive syntax", "Automatic type formatting", "Built-in error reporting"],
        cons: ["Requires learning Supabase chain syntax (.select(), .eq(), .order())"],
        whenToUse: "Default for Supabase database applications.",
        isRecommended: true,
      },
      {
        name: "Direct Prisma over Supabase PostgreSQL",
        syntax: "prisma.student.findMany()",
        codeSnippet: "const students = await prisma.student.findMany();",
        howItWorks: "Using Prisma ORM connected to Supabase's PostgreSQL connection pooler.",
        pros: ["Shared schema across services", "Complex relation queries"],
        cons: ["Requires running Prisma migration CLI tools"],
        whenToUse: "Large enterprise teams with multi-table relational models.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use the Supabase JavaScript SDK inside Server Components for reads, and inside Server Actions for mutations.",
      scenarios: [
        {
          scenario: "Adding a new student to the database from a web form",
          recommendedApproach: "Server Action with supabase.from('students').insert()",
          reason: "Secures database mutations on the server and enables automatic cache revalidation.",
        },
        {
          scenario: "Displaying public course listings on the homepage",
          recommendedApproach: "Server Component with supabase.from('courses').select('*')",
          reason: "Delivers fast, pre-rendered HTML without client loading waterfalls.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Calling .delete() or .update() without an .eq() filter",
        badCode: `// ❌ DANGEROUS: Deletes every single row in the students table!
await supabase.from("students").delete();`,
        goodCode: `// ✅ SAFE: Specify the exact student ID to delete!
await supabase.from("students").delete().eq("id", studentId);`,
        whyItBreaks: "Without an .eq('id', ...) condition, an update or delete command targets ALL rows in the table.",
        howToFix: "Always append .eq('column', value) to identify the specific record to update or delete.",
      },
    ],

    bestPractices: [
      {
        title: "Always Call revalidatePath After Mutations",
        rule: "Immediately after a Supabase insert, update, or delete, call revalidatePath('/your-route').",
        explanation: "This forces Next.js to regenerate the cached page so users see the latest data immediately.",
      },
    ],

    exercises: [
      {
        id: "u4-ex-3",
        title: "Create a Supabase Insert Server Action",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a Server Action in src/actions/taskActions.js in plain JavaScript that inserts a new task into the 'tasks' Supabase table using `supabase.from('tasks').insert([{ title }])` and calls `revalidatePath('/tasks')`.",
        initialCode: `// src/actions/taskActions.js
"use server";

import { supabase } from "@/lib/supabase";

export async function addTask(formData) {
  // TODO: Insert into Supabase and revalidate
}`,
        expectedOutput: "A Server Action inserting a task into Supabase.",
        hints: ["Use `await supabase.from('tasks').insert([{ title }])` and `revalidatePath('/tasks')`"],
        solutionCode: `// src/actions/taskActions.js
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addTask(formData) {
  const title = formData.get("title");
  if (!title || title.trim() === "") return;

  await supabase.from("tasks").insert([{ title: title.trim(), completed: false }]);
  revalidatePath("/tasks");
}`,
        solutionExplanation: "The action reads form data, performs a Supabase insert, and invalidates the cache so the task appears instantly.",
      },
    ],

    quizzes: [
      {
        id: "u4-q3",
        syllabusTopic: "Supabase CRUD Operations",
        question: "What happens if you run `await supabase.from('students').delete()` without an `.eq()` condition?",
        conceptualExplanation: "Without a filter condition like .eq('id', id), an SQL delete command matches all rows in the table.",
        options: [
          { id: "a", text: "It deletes only the first student in the list", isCorrect: false, explanation: "SQL delete without a WHERE clause targets all rows." },
          { id: "b", text: "It attempts to delete all rows in the table (unless blocked by Row Level Security)", isCorrect: true, explanation: "Correct! Without a filter condition, delete commands target the entire table." },
          { id: "c", text: "It renames the database", isCorrect: false, explanation: "No." },
          { id: "d", text: "It downloads the database as a CSV", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "E-Commerce Product Catalog",
      description: "How an online store manages product inventory using Supabase CRUD operations.",
      code: {
        title: "Product Inventory Manager",
        description: "Supabase CRUD for updating product stock in plain JavaScript.",
        language: "jsx",
        filename: "src/actions/inventory.js",
        code: `"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateStock(productId, newStock) {
  const { error } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", productId);

  if (!error) revalidatePath("/inventory");
}`,
      },
      keyTakeaway: "Direct Supabase mutations in Server Actions keep inventory counts synchronized across all shoppers.",
    },

    combinedExample: {
      combinedTopics: ["Supabase", "Server Actions", "Optimistic UI"],
      title: "Interactive Task List with Supabase",
      description: "Todo list connected to real Supabase database tables with optimistic UI toggling.",
      code: {
        title: "Supabase Todo Dashboard",
        description: "Complete CRUD todo component in plain JavaScript.",
        language: "jsx",
        filename: "src/app/tasks/page.js",
        code: `import { supabase } from "@/lib/supabase";

export default async function TasksPage() {
  const { data: tasks } = await supabase.from("tasks").select("*");

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Tasks ({tasks?.length || 0})</h1>
      <ul className="space-y-2">
        {tasks?.map((t) => (
          <li key={t.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Server queries Supabase PostgreSQL table",
        "Fast server-rendered HTML sent to browser",
        "Form submission triggers Server Action mutation",
        "revalidatePath refreshes the list automatically",
      ],
    },
  },

  {
    id: "environment-variables-security",
    unitId: "unit-4",
    title: "Environment Variables & Secret Management",
    shortSummary: "Learn secret management using the Secret Diary analogy: keep passwords safe in .env.local, and understand why NEXT_PUBLIC_ is a public billboard.",
    order: 4,
    tags: ["Environment Variables", ".env.local", "NEXT_PUBLIC_", "Security", "process.env"],

    simpleExplanation:
      "Imagine you have two things:\n\n" +
      "1. **The Secret Diary (.env.local)**:\n" +
      "Under your bed, you keep a locked diary. In it, you write your secret database password, your Stripe payment secret key, and your admin PIN. You NEVER show this diary to strangers! In Next.js, \`.env.local\` is your secret diary. It stays strictly on the server and is NEVER sent to the user's browser!\n\n" +
      "2. **The Public Billboard (NEXT_PUBLIC_)**:\n" +
      "Out on the main street, you put up a giant advertising billboard that everyone can see. If you want everyone to know your school's name or public website URL, you write it on the billboard! In Next.js, any variable prefixed with \`NEXT_PUBLIC_\` (like \`NEXT_PUBLIC_APP_NAME\`) is baked into the client JavaScript for anyone to read!\n\n" +
      "**The Golden Rule**:\n" +
      "- \`DATABASE_URL\` -> NO prefix! Secret! Only backend code can see it.\n" +
      "- \`STRIPE_SECRET_KEY\` -> NO prefix! Secret! Only server actions can see it.\n" +
      "- \`NEXT_PUBLIC_STORE_NAME\` -> Public billboard! Safe for the browser to see.",

    whyNeeded:
      "Accidentally committing database passwords or private API keys to GitHub or client JavaScript bundles is the #1 way web applications get hacked. Next.js enforces a strict security boundary that automatically hides all standard environment variables from client code.",

    reactVsNext: {
      concept: "Environment Variable Security",
      reactWay: {
        title: "Vite / CRA (Everything is Public in Client Bundles)",
        code: `// In client-only bundles, environment variables are embedded into browser JS:
// .env
VITE_API_KEY=my_secret_key_123

// In your React app:
console.log(import.meta.env.VITE_API_KEY);
// ⚠️ Anyone can open Chrome DevTools, view the bundle, and steal your secret key!`,
        explanation:
          "In client-only architecture, there is no server runtime. Every variable you use is permanently embedded inside the client JavaScript downloaded by visitors.",
        drawbacks: [
          "Zero secret privacy: any visitor can inspect client bundles to find keys",
          "Cannot store database passwords or Stripe secret keys in the project",
          "Requires a separate backend just to protect sensitive credentials",
        ],
      },
      nextjsWay: {
        title: "Next.js Server-Private Environment Variables (Automatic Vault)",
        code: `// 1. .env.local (Never committed to GitHub!)
DATABASE_URL=postgres://admin:super_secret_password@db.com/mydb
STRIPE_SECRET_KEY=sk_live_9988776655
NEXT_PUBLIC_APP_NAME="University Learning Portal"

// 2. Server Component or Server Action (Can read secrets safely!):
export default async function Page() {
  console.log(process.env.DATABASE_URL); // ✅ Works! Safe on server.
}

// 3. Client Component ('use client'):
"use client";
export function Banner() {
  console.log(process.env.DATABASE_URL); // 🔒 Automatically undefined! Protected!
  console.log(process.env.NEXT_PUBLIC_APP_NAME); // ✅ Works! It is on the public billboard.
}`,
        explanation:
          "Next.js automatically strips all variables without the NEXT_PUBLIC_ prefix from client bundles, making it mathematically impossible for secret keys to leak to visitors.",
        benefits: [
          "Zero accidental secret leaks to the client browser",
          "Direct access to private secrets inside Server Components and Server Actions",
          "Automatic .env.local file exclusion in .gitignore",
        ],
      },
      whyDifferent:
        "Next.js separates the server build from the client bundle. Variables without NEXT_PUBLIC_ are never included in the browser output.",
      mentalShiftSummary:
        "Never add NEXT_PUBLIC_ to passwords, tokens, or database URLs. Only use NEXT_PUBLIC_ for public labels, analytics IDs, and public brand names.",
    },

    basicExample: {
      title: "Reading Server Secrets vs Public Variables in Plain JavaScript",
      description: "Demonstrating the security boundary between server-only secrets and public client variables.",
      language: "jsx",
      filename: "src/app/secret-check/page.js",
      code: `// src/app/secret-check/page.js
// This is a Server Component running on the backend:
export default async function SecretCheckPage() {
  // 1. Read private server secret (Secret Diary):
  const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/school";
  const isSecretAvailable = Boolean(process.env.DATABASE_URL || true);

  // 2. Read public client variable (Public Billboard):
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Next.js Masterclass";

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Environment Variables & Security</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Inspecting the security boundary between server secrets and public client variables.
        </p>
      </div>

      <div className="grid gap-4">
        {/* Server-Only Secret Card */}
        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <h2 className="font-semibold text-zinc-200">Server Environment (Secret Diary)</h2>
          </div>
          <p className="text-xs text-zinc-400">
            Variable: <code className="text-amber-400 font-mono">DATABASE_URL</code>
          </p>
          <div className="p-3 bg-zinc-950 rounded-xl text-xs font-mono text-zinc-300">
            Status: {isSecretAvailable ? "🔒 Securely loaded on server" : "Missing"}
          </div>
          <p className="text-xs text-zinc-500">
            This secret string is NEVER transmitted to client browsers.
          </p>
        </div>

        {/* Public Client Card */}
        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            <h2 className="font-semibold text-zinc-200">Public Environment (Public Billboard)</h2>
          </div>
          <p className="text-xs text-zinc-400">
            Variable: <code className="text-cyan-400 font-mono">NEXT_PUBLIC_APP_NAME</code>
          </p>
          <div className="p-3 bg-zinc-950 rounded-xl text-xs font-mono text-cyan-300">
            Value: {appName}
          </div>
          <p className="text-xs text-zinc-500">
            Prefixed with NEXT_PUBLIC_, so it is safe to display in client components.
          </p>
        </div>
      </div>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 5: process.env.DATABASE_URL reads the secret database connection string. Because this page is a Server Component, this code runs strictly on the backend.\n- Line 9: process.env.NEXT_PUBLIC_APP_NAME reads a public billboard variable.\n- Line 25-39: Displays confirmation that the server secret is active without printing raw passwords on the screen.\n- Line 42-56: Displays the public application name.\n\nWhat happens in the browser?\n1. The visitor views /secret-check.\n2. The server reads the secret, prepares the clean status UI, and sends HTML to the user.\n3. If the user inspects the page source code in Chrome DevTools, there is ZERO trace of the DATABASE_URL password!",
      outputPreview: "Status cards showing Server Environment (Secret loaded) and Public Environment (Portal Name).",
    },

    moreExamples: [
      {
        title: "Using Secrets inside Server Actions in Plain JavaScript",
        description: "Calling external payment APIs using server secrets in plain JavaScript.",
        language: "jsx",
        filename: "src/actions/paymentActions.js",
        code: `// src/actions/paymentActions.js
"use server";

export async function processPayment(amount) {
  // Read secret API key securely inside Server Action:
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Payment gateway is not configured on the server.");
  }

  // Communicate with Stripe API...
  console.log("Processing payment with server secret key...");
  return { success: true };
}`,
        explanation:
          "Server Actions can safely access all private process.env variables without any risk of them leaking to the client.",
      },
    ],

    multipleWays: [
      {
        name: ".env.local (Recommended for Local Dev)",
        syntax: "KEY=value in .env.local",
        codeSnippet: "DATABASE_URL=postgres://localhost:5432/mydb",
        howItWorks: "Local override file automatically ignored by git to protect developers' private keys.",
        pros: ["Never committed to GitHub", "Overrides all other .env files", "Default standard"],
        cons: ["Must be created manually on each developer's laptop"],
        whenToUse: "Local database URLs, private API keys, development flags.",
        isRecommended: true,
      },
      {
        name: "Hosting Provider Environment Variables",
        syntax: "Configured in Vercel / AWS / Docker Dashboard",
        codeSnippet: "Configured in Project Settings -> Environment Variables",
        howItWorks: "Injected securely by the cloud platform during production deployment.",
        pros: ["Zero files stored on disk", "Separate production and staging secrets"],
        cons: ["Requires dashboard configuration"],
        whenToUse: "Production deployments on Vercel, Railway, or AWS.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Store secrets without prefixes for backend code. Only use NEXT_PUBLIC_ for values that you are comfortable with every visitor seeing.",
      scenarios: [
        {
          scenario: "Database connection password and encryption keys",
          recommendedApproach: "DATABASE_URL (No prefix) in .env.local",
          reason: "Must remain strictly confidential to prevent database destruction.",
        },
        {
          scenario: "Google Analytics Tracking ID (e.g. G-XXXXX)",
          recommendedApproach: "NEXT_PUBLIC_GA_ID with prefix",
          reason: "Google Analytics must run in the user's browser, so the ID must be public.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Prefixing secret API keys with NEXT_PUBLIC_",
        badCode: `// ❌ FATAL SECURITY ERROR: Prefixing a secret key with NEXT_PUBLIC_!
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_live_9988776655`,
        goodCode: `// ✅ SECURE: Keep secret keys private without the prefix!
STRIPE_SECRET_KEY=sk_live_9988776655`,
        whyItBreaks: "Adding NEXT_PUBLIC_ instructs the Next.js compiler to bundle the secret key directly into the client JavaScript, allowing anyone in the world to steal it.",
        howToFix: "Remove the NEXT_PUBLIC_ prefix from all private tokens and passwords.",
      },
    ],

    bestPractices: [
      {
        title: "Always Include .env*.local in .gitignore",
        rule: "Ensure .env.local, .env.development.local, and .env.production.local are listed in .gitignore.",
        explanation: "This prevents accidental git commits of sensitive credentials to public GitHub repositories.",
      },
    ],

    exercises: [
      {
        id: "u4-ex-4",
        title: "Access a Secret in a Server Action",
        difficulty: "easy",
        estimatedMinutes: 5,
        prompt:
          "Write a Server Action in src/actions/apiKeyAction.js in plain JavaScript with 'use server' that checks if `process.env.API_KEY` exists. If not, throw an error 'API_KEY is not configured'.",
        initialCode: `// src/actions/apiKeyAction.js
"use server";

export async function checkApiKey() {
  // TODO: Check process.env.API_KEY
}`,
        expectedOutput: "A Server Action verifying environment variable presence.",
        hints: ["Inspect `process.env.API_KEY` with an if statement"],
        solutionCode: `// src/actions/apiKeyAction.js
"use server";

export async function checkApiKey() {
  const key = process.env.API_KEY;
  if (!key) {
    throw new Error("API_KEY is not configured on the server.");
  }
  return { configured: true };
}`,
        solutionExplanation: "Server Actions execute in Node.js where process.env is securely accessible.",
      },
    ],

    quizzes: [
      {
        id: "u4-q4",
        syllabusTopic: "Environment Variables & Security",
        question: "What happens if a Client Component ('use client') tries to read `process.env.DATABASE_URL` (without NEXT_PUBLIC_)?",
        conceptualExplanation: "Next.js automatically strips non-NEXT_PUBLIC_ variables from client JavaScript bundles, so the expression safely evaluates to undefined.",
        options: [
          { id: "a", text: "It returns the secret password to the browser", isCorrect: false, explanation: "Next.js specifically blocks non-NEXT_PUBLIC variables in client bundles." },
          { id: "b", text: "It returns undefined because Next.js strips server variables from client JavaScript bundles for security", isCorrect: true, explanation: "Correct! Without NEXT_PUBLIC_, the bundler strips the variable completely from client code." },
          { id: "c", text: "The computer shuts down", isCorrect: false, explanation: "No." },
          { id: "d", text: "It logs an error in the browser console and crashes React", isCorrect: false, explanation: "It simply evaluates to undefined." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Third-Party SMS Notification Gateway",
      description: "How a university notification service uses Twilio API keys securely on the server.",
      code: {
        title: "SMS Notification Sender",
        description: "Server Action accessing private SMS credentials in plain JavaScript.",
        language: "jsx",
        filename: "src/actions/sendAlert.js",
        code: `"use server";

export async function sendEmergencyAlert(message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  // Send SMS via Twilio API on the server...
  console.log("Dispatched alert using server credentials.");
  return { sent: true };
}`,
      },
      keyTakeaway: "Private communications credentials remain completely isolated on the server.",
    },

    combinedExample: {
      combinedTopics: ["Environment Variables", "Route Handlers", "Security"],
      title: "Protected Webhook Endpoint",
      description: "Route Handler validating incoming webhook signatures against server secrets.",
      code: {
        title: "Secure Webhook Verifier",
        description: "Route Handler checking secret authorization token in plain JavaScript.",
        language: "jsx",
        filename: "src/app/api/webhook/route.js",
        code: `export async function POST(request) {
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.WEBHOOK_SECRET;

  if (authHeader !== \`Bearer \${expectedSecret}\`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ success: true });
}`,
      },
      stepByStepFlow: [
        "External webhook sends POST with secret header",
        "Route Handler compares header against process.env.WEBHOOK_SECRET",
        "If signature matches, process payload",
        "If signature fails, reject with 401 Unauthorized",
      ],
    },
  },
];
