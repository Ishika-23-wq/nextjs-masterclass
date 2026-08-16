import { TopicContent } from "@/types";

export const unit3Topics: TopicContent[] = [
  {
    id: "route-handlers-rest-apis",
    unitId: "unit-3",
    title: "Route Handlers & RESTful APIs",
    shortSummary: "Build complete backend REST APIs in TypeScript using NextRequest and NextResponse with GET, POST, PUT, PATCH, and DELETE methods.",
    order: 1,
    tags: ["Route Handlers", "REST API", "HTTP Methods", "NextRequest", "NextResponse"],

    simpleExplanation:
      "When building a web app, you often need backend API endpoints that send and receive JSON data (e.g. for a mobile app or a third-party webhook). In Next.js, instead of creating a separate Express/Node.js server on port 5000, you simply create a file named `route.ts` inside the `app/api/` folder. Next.js lets you export standard JavaScript functions named `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` that handle HTTP requests effortlessly.",

    whyNeeded:
      "Having frontend and backend in separate repositories causes CORS (Cross-Origin Resource Sharing) headaches, duplicated TypeScript types, complex deployment coordination, and slow development velocity. Route Handlers allow your Next.js application to act as a complete, robust backend server.",

    reactVsNext: {
      concept: "Building REST APIs",
      reactWay: {
        title: "Separate Express.js Node Server",
        code: `// In React, you must setup a completely separate server.js:
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/students', (req, res) => {
  res.json([{ id: 1, name: "Ishika" }]);
});

app.listen(5000, () => console.log("Server on port 5000"));`,
        explanation:
          "With vanilla React, you need to manage two servers: port 3000 for React Vite, and port 5000 for Express. You must configure CORS headers and manage dual deployments.",
        drawbacks: [
          "Requires maintaining two distinct servers and deployment pipelines",
          "CORS security configuration issues",
          "Cannot share TypeScript interfaces directly between frontend and backend",
        ],
      },
      nextjsWay: {
        title: "Next.js Route Handlers (app/api/.../route.ts)",
        code: `// File: src/app/api/students/route.ts
// Handles http://localhost:3000/api/students

import { NextRequest, NextResponse } from "next/server";

const students = [{ id: 1, name: "Ishika", course: "INT257" }];

export async function GET(request: NextRequest) {
  // Read search query params: /api/students?course=INT257
  const course = request.nextUrl.searchParams.get("course");
  const filtered = course ? students.filter(s => s.course === course) : students;

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newStudent = { id: Date.now(), ...body };
  students.push(newStudent);

  return NextResponse.json(newStudent, { status: 201 });
}`,
        explanation:
          "In Next.js, `route.ts` files automatically serve standard Web standard `Request` and `Response` objects on the same domain with zero CORS setup.",
        benefits: [
          "Zero CORS issues: frontend and backend share the exact same origin",
          "Unified TypeScript types shared seamlessly across UI and APIs",
          "One-click deployment for both frontend and backend",
          "Supports streaming responses, cookies, and HTTP headers",
        ],
      },
      whyDifferent:
        "Next.js Route Handlers run on Web standard `Request` and `Response` APIs (identical to standard browser `fetch` and Edge workers).",
      mentalShiftSummary:
        "Folder name = API path. Export `GET`, `POST`, `PUT`, `DELETE` functions from `route.ts`.",
    },

    basicExample: {
      title: "CRUD Route Handler with Dynamic Parameters",
      description: "A complete Route Handler managing single student records by ID.",
      language: "typescript",
      filename: "src/app/api/students/[id]/route.ts",
      code: `// src/app/api/students/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/students/101
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  return NextResponse.json({
    id,
    name: "Alex Johnson",
    course: "INT257",
    status: "Active"
  });
}

// DELETE /api/students/101
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  // Perform database deletion logic here...
  return NextResponse.json({ message: \`Student #\${id} successfully deleted\` });
}`,
      explanation:
        "Like pages, Route Handlers support dynamic parameters in folder names (`[id]`). `NextResponse.json()` sends clean JSON with proper Content-Type headers.",
      outputPreview: `JSON Response: { "id": "101", "name": "Alex Johnson", "course": "INT257", "status": "Active" }`,
    },

    moreExamples: [
      {
        title: "Handling Cookies and Custom Headers in Route Handlers",
        description: "Reading and setting HTTP cookies securely.",
        language: "typescript",
        filename: "src/app/api/auth-demo/route.ts",
        code: `import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "dark";

  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  return NextResponse.json({
    preferredTheme: theme,
    clientBrowser: userAgent,
    timestamp: new Date().toISOString()
  });
}`,
        explanation:
          "`cookies()` and `headers()` helpers from `next/headers` allow direct inspection of HTTP metadata.",
      },
    ],

    multipleWays: [
      {
        name: "Route Handlers (app/api/.../route.ts)",
        syntax: "export async function GET/POST/PUT/DELETE(req) { ... }",
        codeSnippet: `export async function GET(request: NextRequest) {
  return NextResponse.json({ ok: true });
}`,
        howItWorks: "Standard REST API endpoints callable by any external client (mobile app, webhooks).",
        pros: ["External clients can call it", "Full control over HTTP headers and status codes", "Standard REST"],
        cons: ["Requires writing manual JSON serialization and client fetch calls"],
        whenToUse: "For public APIs, webhooks, mobile app backends, or third-party integrations.",
        isRecommended: true,
      },
      {
        name: "Server Actions ('use server')",
        syntax: "async function myAction() { 'use server'; ... }",
        codeSnippet: `"use server";
export async function saveRecord(data) { ... }`,
        howItWorks: "Direct RPC (Remote Procedure Call) functions callable directly from React forms.",
        pros: ["No API endpoint needed", "Automatic TypeScript typing", "Seamless form mutation & revalidation"],
        cons: ["Only callable from your own Next.js UI"],
        whenToUse: "For all internal UI form submissions and data mutations.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use Server Actions for your own website's forms and buttons. Use Route Handlers for external REST clients and webhooks.",
      scenarios: [
        {
          scenario: "You are building a form for students to submit an assignment on your site",
          recommendedApproach: "Server Action",
          reason: "Zero API boilerplate, automatic pending states, and instant cache revalidation.",
        },
        {
          scenario: "Stripe or GitHub needs to send a webhook POST event to your site",
          recommendedApproach: "Route Handler `app/api/webhooks/stripe/route.ts`",
          reason: "Webhooks require standard HTTP REST endpoints with raw payload verification.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Having both page.tsx and route.ts in the same folder",
        badCode: `// ❌ BAD: src/app/dashboard/page.tsx AND src/app/dashboard/route.ts in the same directory!`,
        goodCode: `// ✅ GOOD: Keep pages in src/app/dashboard/page.tsx and APIs in src/app/api/dashboard/route.ts`,
        whyItBreaks: "Next.js cannot determine whether a URL should render a UI page or return an API response. It will cause a build conflict.",
        howToFix: "Always place Route Handlers inside a separate folder like `src/app/api/...`.",
      },
    ],

    bestPractices: [
      {
        title: "Always Return Explicit HTTP Status Codes",
        rule: "Use `NextResponse.json(data, { status: 201 })` for creations, `400` for bad requests, and `404` for missing entities.",
        explanation: "Ensures standard REST API compliance for client consumers.",
      },
    ],

    exercises: [
      {
        id: "u3-ex-1",
        title: "Create a POST Route Handler with JSON Body Parsing",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a `POST` handler for `src/app/api/todos/route.ts` that reads `{ title: string }` from the request body, validates it, and returns the created todo with status 201.",
        initialCode: `import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: Read JSON body, validate title, and return NextResponse
}`,
        expectedOutput: "A functional POST endpoint returning 201 Created on valid input and 400 Bad Request on empty title.",
        hints: ["Use `const body = await request.json();`", "Return `NextResponse.json({ error: '...' }, { status: 400 })` if missing"],
        solutionCode: `import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || typeof body.title !== "string" || body.title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required and must be a valid string." },
        { status: 400 }
      );
    }

    const newTodo = {
      id: Date.now(),
      title: body.title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}`,
        solutionExplanation:
          "This handler parses the JSON payload, guards against bad user input with HTTP 400, and returns the created resource with HTTP 201.",
      },
    ],

    quizzes: [
      {
        id: "u3-q1",
        question: "Which file convention in Next.js App Router creates a backend API endpoint?",
        syllabusTopic: "Route Handlers",
        options: [
          { id: "a", text: "api.tsx", isCorrect: false, explanation: "api.tsx is not a reserved Next.js file." },
          { id: "b", text: "route.ts (or route.js)", isCorrect: true, explanation: "Correct! route.ts files define backend Route Handlers." },
          { id: "c", text: "server.ts", isCorrect: false, explanation: "server.ts is not an App Router route convention." },
          { id: "d", text: "handler.js", isCorrect: false, explanation: "handler.js is not recognized by App Router." },
        ],
        conceptualExplanation:
          "`route.ts` is the reserved filename in App Router for creating HTTP API endpoints. It replaces the old `pages/api` structure from Pages Router.",
      },
    ],

    realWorldExample: {
      domain: "Payment Gateway Webhook Verification",
      description: "How production apps handle automated webhook notifications from payment processors like Stripe.",
      code: {
        title: "Secure Webhook Receiver",
        description: "POST route verifying signature and updating order status.",
        language: "typescript",
        filename: "src/app/api/webhooks/payment/route.ts",
        code: `import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-signature");

  if (!signature || signature !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized signature" }, { status: 401 });
  }

  const event = await request.json();
  console.log("Processed payment event:", event.type);

  return NextResponse.json({ received: true }, { status: 200 });
}`,
      },
      keyTakeaway: "Route Handlers provide raw header access and status control necessary for secure webhook verification.",
    },

    combinedExample: {
      combinedTopics: ["Route Handlers", "Dynamic URLs", "HTTP Status"],
      title: "Full REST Student API Endpoint",
      description: "GET, POST, and DELETE in a single route module.",
      code: {
        title: "Multi-Method Route Handler",
        description: "Clean REST handler with TypeScript types.",
        language: "typescript",
        filename: "src/app/api/courses/route.ts",
        code: `import { NextRequest, NextResponse } from "next/server";

let courses = [
  { id: "INT257", name: "Next.js Fullstack", credits: 4 }
];

export async function GET() {
  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  courses.push(body);
  return NextResponse.json(body, { status: 201 });
}`,
      },
      stepByStepFlow: [
        "Client sends `GET /api/courses` -> Returns course array",
        "Client sends `POST /api/courses` with JSON -> Appends course and returns 201 Created",
      ],
    },
  },

  {
    id: "server-actions-mutations",
    unitId: "unit-3",
    title: "Server Actions & Backend Mutations",
    shortSummary: "Execute asynchronous backend functions directly from your UI forms with the 'use server' directive and zero API boilerplate.",
    order: 2,
    tags: ["Server Actions", "use server", "Mutations", "RPC", "Security"],

    simpleExplanation:
      "In traditional web development, if you want to submit a form, you have to: (1) create an API endpoint `/api/submit`, (2) write `e.preventDefault()`, (3) call `fetch('/api/submit', { method: 'POST', body: ... })`, (4) parse JSON, (5) trigger a re-render. Next.js **Server Actions** change everything! You write a standard asynchronous JavaScript function with `'use server'` at the top. You can pass that function directly to `<form action={myFunction}>`. Next.js handles the network communication, security tokens, and cache revalidation automatically behind the scenes!",

    whyNeeded:
      "Server Actions eliminate thousands of lines of useless API plumbing code. They work even before JavaScript has loaded in the student's browser (Progressive Enhancement) and provide instant server-side mutation capabilities.",

    reactVsNext: {
      concept: "Submitting Data & Mutating State",
      reactWay: {
        title: "Traditional React Form Submission",
        code: `// Traditional React requires manual API fetch plumbing:
function AddStudentForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop native HTML submission
    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    alert("Saved!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}`,
        explanation:
          "In vanilla React, every form submission requires manual `e.preventDefault()`, state synchronization, manual `fetch()` setup, and error catching.",
        drawbacks: [
          "Dozens of lines of repetitive plumbing",
          "If client JavaScript fails or loads slowly, the form does nothing",
          "Requires a separate API route",
        ],
      },
      nextjsWay: {
        title: "Next.js Server Actions (<form action={action}>)",
        code: `// Next.js: Direct Server Function attached to native form!
import { revalidatePath } from "next/cache";

// Server Action function:
async function createStudent(formData: FormData) {
  "use server"; // Runs strictly on the server!
  const name = formData.get("name") as string;

  await db.students.create({ name });
  revalidatePath("/students"); // Updates the UI immediately
}

export default function StudentFormPage() {
  return (
    <form action={createStudent} className="space-y-3">
      <input name="name" placeholder="Student Name" required />
      <button type="submit">Add Student</button>
    </form>
  );
}`,
        explanation:
          "The form action points directly to a secure backend function. Next.js creates the POST request and updates the UI automatically.",
        benefits: [
          "Zero API endpoints to write or maintain",
          "Progressive Enhancement: works even if JavaScript is still downloading on mobile",
          "End-to-end TypeScript type inference",
          "Direct integration with `revalidatePath` and `revalidateTag`",
        ],
      },
      whyDifferent:
        "Next.js Server Actions act as Remote Procedure Calls (RPC), seamlessly bridging frontend user gestures to backend database logic without API boilerplate.",
      mentalShiftSummary:
        "Don't build `/api/items` for internal forms. Write an `async function myAction(formData)` with `'use server'`.",
    },

    basicExample: {
      title: "Simple Server Action Form",
      description: "Submitting a feedback message directly to a backend action.",
      language: "tsx",
      filename: "src/app/feedback/page.tsx",
      code: `// src/app/feedback/page.tsx
import { revalidatePath } from "next/cache";

export default function FeedbackPage() {
  async function submitFeedbackAction(formData: FormData) {
    "use server";

    const feedback = formData.get("feedback") as string;
    const studentName = formData.get("studentName") as string;

    console.log("Saving feedback on server:", { studentName, feedback });
    // Save to database...

    revalidatePath("/feedback");
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
      <h1 className="text-xl font-bold text-zinc-100">Submit Course Feedback</h1>
      
      <form action={submitFeedbackAction} className="space-y-3">
        <input
          name="studentName"
          placeholder="Your Name"
          required
          className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
        />
        <textarea
          name="feedback"
          placeholder="What did you learn in Unit 3?"
          required
          rows={3}
          className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
}`,
      explanation:
        "The `'use server'` directive makes `submitFeedbackAction` run exclusively on the server. The client simply submits the form payload.",
      outputPreview: "A styled dark-mode form with inputs for name and feedback that submits seamlessly to the server.",
    },

    moreExamples: [
      {
        title: "Separate Actions File for Clean Architecture",
        description: "Organizing Server Actions in a dedicated file so they can be reused across multiple components.",
        language: "typescript",
        filename: "src/actions/studentActions.ts",
        code: `"use server"; // Marks ALL exported functions in this file as Server Actions!

import { revalidatePath } from "next/cache";

export async function enrollStudentAction(courseId: string, studentName: string) {
  // Database insert...
  console.log(\`Enrolled \${studentName} into course \${courseId}\`);
  revalidatePath(\`/courses/\${courseId}\`);
  return { success: true };
}`,
        explanation:
          "Placing `'use server'` at the very top of a file makes all functions exported from that file callable as Server Actions from both Server and Client Components.",
      },
    ],

    multipleWays: [
      {
        name: "Inline Server Action in Server Component",
        syntax: "async function actionName() { 'use server'; ... }",
        codeSnippet: `export default function Page() {
  async function myAction() {
    "use server";
    // Server logic
  }
  return <form action={myAction}>...</form>;
}`,
        howItWorks: "Defined directly inside the Server Component body.",
        pros: ["Quick and colocated with the UI"],
        cons: ["Cannot be imported by Client Components"],
        whenToUse: "For single-page quick forms.",
      },
      {
        name: "Dedicated Server Actions Module (Recommended)",
        syntax: "actions/myActions.ts with 'use server' at top",
        codeSnippet: `// src/actions/postActions.ts
"use server";
export async function createPost(formData: FormData) { ... }`,
        howItWorks: "Exported functions can be imported into ANY component (Server or Client).",
        pros: ["Clean separation of concerns", "Reusable across multiple pages and Client Components", "Highly testable"],
        cons: ["Requires an extra file"],
        whenToUse: "For all production full-stack applications.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use dedicated `src/actions/*.ts` files for clean, reusable backend mutations.",
      scenarios: [
        {
          scenario: "You need to invoke a backend mutation from an interactive Client Component button",
          recommendedApproach: "Import from `src/actions/*.ts` and call `await myAction()` in your `onClick`",
          reason: "Client Components cannot define inline Server Actions; they must import them from an external file.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Defining an inline Server Action inside a Client Component",
        badCode: `// ❌ BAD: src/components/MyClientComponent.tsx
"use client";

export function MyComponent() {
  async function myAction() {
    "use server"; // COMPILE ERROR: Cannot define Server Action inside Client Component!
  }
  return <form action={myAction}>...</form>;
}`,
        goodCode: `// ✅ GOOD: Define in a separate actions.ts file and import it
// File 1: src/actions/todo.ts ('use server'; export async function myAction() { ... })
// File 2: src/components/MyClientComponent.tsx ('use client'; import { myAction } from '@/actions/todo')`,
        whyItBreaks: "The Next.js compiler cannot inline server code inside a file marked with `'use client'`.",
        howToFix: "Move Server Actions into a dedicated `src/actions/` file.",
      },
    ],

    bestPractices: [
      {
        title: "Always Validate Input Inside the Server Action",
        rule: "Never trust user-supplied `FormData` without server-side type and string validation.",
        explanation: "Client-side validation can be bypassed; server validation is non-negotiable for security.",
      },
    ],

    exercises: [
      {
        id: "u3-ex-2",
        title: "Build a Course Enrollment Server Action",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a Server Action `enrollCourseAction` that accepts `formData`, extracts `courseCode` and `email`, checks that `email` contains an '@', and triggers `revalidatePath('/courses')`.",
        initialCode: `// src/actions/enroll.ts
export async function enrollCourseAction(formData: FormData) {
  // TODO: Add 'use server', validate fields, and revalidate
}`,
        expectedOutput: "A validated Server Action returning a success or error object.",
        hints: ["Add `'use server';`", "Use `formData.get('courseCode')` and `formData.get('email')`"],
        solutionCode: `"use server";

import { revalidatePath } from "next/cache";

export async function enrollCourseAction(formData: FormData) {
  const courseCode = formData.get("courseCode") as string;
  const email = formData.get("email") as string;

  if (!courseCode || !email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid course code and email address." };
  }

  // Simulated database insert...
  console.log(\`Successfully enrolled \${email} into \${courseCode}\`);

  revalidatePath("/courses");
  return { success: true, message: "Enrollment complete!" };
}`,
        solutionExplanation:
          "Server Actions can return plain JavaScript objects back to the caller for feedback while automatically refreshing server caches.",
      },
    ],

    quizzes: [
      {
        id: "u3-q2",
        question: "What does the 'use server' directive do in Next.js?",
        syllabusTopic: "Server Actions",
        options: [
          { id: "a", text: "It restarts the computer server", isCorrect: false, explanation: "Directives modify function execution context." },
          { id: "b", text: "It designates an asynchronous function as a Server Action that runs strictly on the backend", isCorrect: true, explanation: "Correct! 'use server' tells Next.js to expose the function as a secure backend RPC endpoint." },
          { id: "c", text: "It prevents users from viewing images", isCorrect: false, explanation: "Server actions are for backend mutations." },
          { id: "d", text: "It forces the entire page to render in Internet Explorer", isCorrect: false, explanation: "Unrelated." },
        ],
        conceptualExplanation:
          "`'use server'` marks callable server entry points, allowing client forms and buttons to execute server-side database logic securely.",
      },
    ],

    realWorldExample: {
      domain: "Real-Time Job Application Portal",
      description: "How companies receive resumes and candidate submissions directly via Server Actions with zero external API services.",
      code: {
        title: "Candidate Application Action",
        description: "Server Action processing application data.",
        language: "typescript",
        filename: "src/actions/apply.ts",
        code: `"use server";

export async function applyForJob(formData: FormData) {
  const applicant = {
    name: formData.get("fullName"),
    role: formData.get("role"),
    portfolioUrl: formData.get("portfolioUrl"),
  };

  // Insert candidate into database:
  await db.applications.create({ data: applicant });

  return { status: "submitted", applicationNumber: "APP-" + Date.now() };
}`,
      },
      keyTakeaway: "Server Actions make form submission workflows straightforward and type-safe from end to end.",
    },

    combinedExample: {
      combinedTopics: ["Server Actions", "revalidatePath", "TypeScript"],
      title: "Interactive Course Review Form",
      description: "Submitting student reviews with instant server-side mutation and list refresh.",
      code: {
        title: "Complete Form & Server Action",
        description: "Server Component with inline Server Action.",
        language: "tsx",
        filename: "src/app/reviews/page.tsx",
        code: `import { revalidatePath } from "next/cache";

const reviews: Array<{ id: number; author: string; comment: string; rating: number }> = [
  { id: 1, author: "Priya", comment: "Unit 2 rendering concepts were explained so clearly!", rating: 5 }
];

export default function ReviewsPage() {
  async function addReviewAction(formData: FormData) {
    "use server";
    const author = formData.get("author") as string;
    const comment = formData.get("comment") as string;
    const rating = Number(formData.get("rating") || 5);

    reviews.push({ id: Date.now(), author, comment, rating });
    revalidatePath("/reviews");
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-zinc-100">Student Course Reviews</h1>
      
      <form action={addReviewAction} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
        <input name="author" placeholder="Your name" required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" />
        <textarea name="comment" placeholder="Your review..." required className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" />
        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">Post Review</button>
      </form>

      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl">
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-200">{r.author}</span>
              <span className="text-amber-400 font-mono">{"★".repeat(r.rating)}</span>
            </div>
            <p className="text-zinc-400 text-sm mt-1">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Student fills out the review form",
        "Form submits to `addReviewAction` Server Action",
        "Review is appended to database on the server",
        "`revalidatePath('/reviews')` triggers immediate UI update with new review",
      ],
    },
  },

  {
    id: "forms-validation-uploads",
    unitId: "unit-3",
    title: "Forms, Zod Validation & File Uploads",
    shortSummary: "Master form state handling with useActionState, pending indicators with useFormStatus, Zod schema validation, and server-side file uploads.",
    order: 3,
    tags: ["Forms", "useActionState", "useFormStatus", "Zod Validation", "File Uploads"],

    simpleExplanation:
      "When users submit a form, two things are crucial: (1) giving feedback while the server is working (e.g. showing a loading spinner on the submit button so they don't click 10 times), and (2) strictly validating that the data is correct (e.g. checking that an email is real and a password is at least 8 characters). Next.js and React 19 provide two powerful hooks: `useActionState` (to manage form errors and response messages) and `useFormStatus` (to disable the submit button while pending).",

    whyNeeded:
      "Bad validation leads to SQL injection, crashed databases, and security vulnerabilities. Poor loading states cause duplicate submissions and frustrated users. Combining Zod schema validation with React form hooks creates bulletproof, accessible forms.",

    reactVsNext: {
      concept: "Form Pending & Validation State",
      reactWay: {
        title: "Manual React State Management",
        code: `// Traditional React form:
function SignupForm() {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});

  const handleForm = async (e) => {
    e.preventDefault();
    setIsPending(true);
    // Manual validation and fetch...
    setIsPending(false);
  };

  return (
    <form onSubmit={handleForm}>
      <button disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}`,
        explanation:
          "In vanilla React, developers manually create `isPending` state flags and error objects for every single form in the application.",
        drawbacks: [
          "Button states must be manually wired with multiple useState hooks",
          "Validation code duplicated on client and backend",
          "No built-in progressive enhancement",
        ],
      },
      nextjsWay: {
        title: "React 19 useActionState & useFormStatus",
        code: `// Next.js & React 19: Clean hook integration!
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerStudentAction } from "@/actions/students";

function SubmitButton() {
  const { pending } = useFormStatus(); // Automatically knows if the parent form is pending!
  return (
    <button type="submit" disabled={pending} className="disabled:opacity-50">
      {pending ? "Registering..." : "Register Student"}
    </button>
  );
}

export function StudentRegistrationForm() {
  // state contains server validation errors or success message:
  const [state, formAction] = useActionState(registerStudentAction, null);

  return (
    <form action={formAction}>
      <input name="email" required />
      {state?.errors?.email && <p className="text-rose-400">{state.errors.email}</p>}
      <SubmitButton />
    </form>
  );
}`,
        explanation:
          "`useActionState` manages server responses and validation errors, while `useFormStatus` automatically detects whether the form is currently submitting.",
        benefits: [
          "Zero manual `isPending` state handling",
          "Automatic access to pending status anywhere in the form hierarchy",
          "Type-safe validation errors returned directly from server Zod schemas",
        ],
      },
      whyDifferent:
        "`useFormStatus` uses React DOM context to track form lifecycle automatically without prop drilling.",
      mentalShiftSummary:
        "Use `useActionState(action, initialState)` for form responses, and `useFormStatus()` inside custom submit buttons.",
    },

    basicExample: {
      title: "Interactive Form with Pending State (useFormStatus)",
      description: "A reusable submit button with automatic loading spinner.",
      language: "tsx",
      filename: "src/components/SubmitButton.tsx",
      code: `"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Save Changes" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl text-sm font-medium transition-all"
    >
      {pending ? (
        <>
          <span className="h-4 w-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}`,
      explanation:
        "Because `SubmitButton` uses `useFormStatus()`, it automatically disables itself and shows a spinner whenever its parent `<form>` is submitting.",
      outputPreview: "Button that smoothly transitions into an animated spinner while submitting.",
    },

    moreExamples: [
      {
        title: "Server-Side Zod Validation Example",
        description: "Validating user inputs with Zod schemas inside a Server Action.",
        language: "typescript",
        filename: "src/actions/validationExample.ts",
        code: `"use server";

// Validation schema:
interface FormDataState {
  success?: boolean;
  errors?: { name?: string[]; email?: string[] };
}

export async function validateUserAction(prevState: any, formData: FormData): Promise<FormDataState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const errors: { name?: string[]; email?: string[] } = {};

  if (!name || name.trim().length < 3) {
    errors.name = ["Name must be at least 3 characters long."];
  }
  if (!email || !email.includes("@")) {
    errors.email = ["Please enter a valid academic email."];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Database insert...
  return { success: true };
}`,
        explanation:
          "Returning a structured error object allows the client component to highlight exact input fields that failed validation.",
      },
      {
        title: "Server-Side File Upload Handling",
        description: "Handling binary file uploads (e.g. PDF assignments or images) in Server Actions.",
        language: "typescript",
        filename: "src/actions/uploadAction.ts",
        code: `"use server";

export async function uploadAssignmentAction(formData: FormData) {
  const file = formData.get("assignmentPdf") as File;

  if (!file || file.size === 0) {
    return { error: "No file was selected for upload." };
  }

  // Read file as ArrayBuffer on the server:
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  console.log(\`Received file "\${file.name}" with size \${file.size} bytes.\`);
  // Upload buffer to Supabase Storage or S3...

  return { success: true, filename: file.name };
}`,
        explanation:
          "`FormData` automatically handles `File` objects. The server converts them into buffers for storage in cloud providers.",
      },
    ],

    multipleWays: [
      {
        name: "React 19 useActionState (Modern Standard)",
        syntax: "const [state, formAction, isPending] = useActionState(action, null)",
        codeSnippet: `const [state, formAction] = useActionState(myAction, null);
return <form action={formAction}>...</form>;`,
        howItWorks: "Binds server response and form action into React component state.",
        pros: ["Official React 19 standard", "Progressive enhancement compatible", "Built-in pending state"],
        cons: ["Requires 'use client' wrapper"],
        whenToUse: "For all modern form development in Next.js 15 & 16.",
        isRecommended: true,
      },
      {
        name: "Native HTML <form action={action}>",
        syntax: "<form action={myServerAction}>",
        codeSnippet: `<form action={myAction}><input name="query" /><button>Go</button></form>`,
        howItWorks: "Pure Server Component form with zero client JavaScript.",
        pros: ["0 KB client bundle size", "Works even if JavaScript is completely disabled"],
        cons: ["Cannot display client-side validation errors dynamically without full page re-render"],
        whenToUse: "For simple search bars or non-interactive mutation buttons.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `useActionState` + `useFormStatus` for interactive forms with feedback. Use simple `<form action={...}>` for basic buttons.",
      scenarios: [
        {
          scenario: "Registration form with field-by-field error messages",
          recommendedApproach: "`useActionState` with server-side validation object",
          reason: "Allows displaying specific error labels right under invalid input boxes.",
        },
        {
          scenario: "A simple 'Delete Post' button inside a table",
          recommendedApproach: "Native `<form action={deleteAction}><button>Delete</button></form>`",
          reason: "Zero client JS overhead.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Placing useFormStatus in the same component that defines the <form>",
        badCode: `// ❌ BAD: useFormStatus cannot read its own component's form!
export function MyForm() {
  const { pending } = useFormStatus(); // Always returns false!
  return <form action={myAction}><button disabled={pending}>Submit</button></form>;
}`,
        goodCode: `// ✅ GOOD: Put useFormStatus in a CHILD component inside the form
function SubmitButton() {
  const { pending } = useFormStatus(); // Works!
  return <button disabled={pending}>Submit</button>;
}

export function MyForm() {
  return <form action={myAction}><SubmitButton /></form>;
}`,
        whyItBreaks: "`useFormStatus` uses React Context and must be rendered as a *descendant* (child) of the `<form>` tag.",
        howToFix: "Extract your `<button>` into a separate component like `<SubmitButton />`.",
      },
    ],

    bestPractices: [
      {
        title: "Sanitize and Limit File Upload Sizes",
        rule: "Always check `file.size` and MIME type (`file.type`) on the server before processing.",
        explanation: "Prevents denial-of-service attacks caused by malicious users uploading multi-gigabyte files.",
      },
    ],

    exercises: [
      {
        id: "u3-ex-3",
        title: "Build a Validated Student Registration Form",
        difficulty: "medium",
        estimatedMinutes: 10,
        prompt:
          "Create a Client Component form using `useActionState` that displays validation error messages returned by a Server Action.",
        initialCode: `// TODO: Build interactive form with useActionState
"use client";

import { useActionState } from "react";

export function StudentForm() {
  // TODO: Setup useActionState and render form with error messages
  return (
    <form>
      {/* Add inputs */}
    </form>
  );
}`,
        expectedOutput: "A responsive form with field-specific red error messages.",
        hints: ["`const [state, formAction] = useActionState(myAction, null);`", "Check `{state?.errors?.fieldName}` in JSX"],
        solutionCode: `"use client";

import { useActionState } from "react";

async function mockRegisterAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  if (!name || name.length < 3) {
    return { error: "Name must be at least 3 characters long." };
  }
  return { success: true, message: \`Registered \${name} successfully!\` };
}

export function StudentForm() {
  const [state, formAction, isPending] = useActionState(mockRegisterAction, null);

  return (
    <div className="p-6 max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
      <h2 className="text-lg font-bold text-zinc-100">Student Enrollment</h2>

      <form action={formAction} className="space-y-3">
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
          <input
            name="name"
            placeholder="e.g. Ishika Sharma"
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {state?.error && (
          <p className="text-xs text-rose-400 font-medium">{state.error}</p>
        )}

        {state?.success && (
          <p className="text-xs text-emerald-400 font-medium">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-all"
        >
          {isPending ? "Validating..." : "Enroll Now"}
        </button>
      </form>
    </div>
  );
}`,
        solutionExplanation:
          "`useActionState` binds the server validation result into local component state, allowing seamless instant error display.",
      },
    ],

    quizzes: [
      {
        id: "u3-q3",
        question: "Why must useFormStatus be called in a child component rather than the component rendering the <form> itself?",
        syllabusTopic: "useFormStatus Context Rule",
        options: [
          { id: "a", text: "Because React hooks are forbidden inside forms", isCorrect: false, explanation: "Hooks can be used inside components." },
          { id: "b", text: "Because useFormStatus reads form context provided by the parent <form> wrapper", isCorrect: true, explanation: "Correct! The parent <form> creates the React context that child components inspect." },
          { id: "c", text: "To make the button render in green", isCorrect: false, explanation: "CSS is unrelated." },
          { id: "d", text: "Because forms only run in Web Workers", isCorrect: false, explanation: "Forms run in the main DOM tree." },
        ],
        conceptualExplanation:
          "`useFormStatus` is a Context consumer. It searches upwards in the component tree for the nearest `<form>` element to read its pending state.",
      },
    ],

    realWorldExample: {
      domain: "University Assignment Submission Portal",
      description: "How universities accept student PDF reports and source code archives securely with instant upload progress.",
      code: {
        title: "Assignment Submission Box",
        description: "File upload form with validation.",
        language: "tsx",
        filename: "src/components/AssignmentUpload.tsx",
        code: `"use client";

import { useActionState } from "react";
import { SubmitButton } from "./SubmitButton";

async function submitAssignment(prev: any, formData: FormData) {
  const file = formData.get("projectZip") as File;
  if (!file || file.size > 10 * 1024 * 1024) {
    return { error: "File must be under 10MB." };
  }
  return { success: true };
}

export function AssignmentUpload() {
  const [state, formAction] = useActionState(submitAssignment, null);

  return (
    <form action={formAction} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
      <input type="file" name="projectZip" accept=".zip,.pdf" required className="text-sm text-zinc-400" />
      {state?.error && <p className="text-xs text-rose-400">{state.error}</p>}
      <SubmitButton label="Upload Project" />
    </form>
  );
}`,
      },
      keyTakeaway: "Combine file size validation with `useFormStatus` for a professional, glitch-free file upload workflow.",
    },

    combinedExample: {
      combinedTopics: ["useActionState", "useFormStatus", "Zod Validation", "revalidatePath"],
      title: "End-to-End Course Creation Pipeline",
      description: "Combining schema validation, pending indicators, and instant cache revalidation.",
      code: {
        title: "Full Course Form Module",
        description: "Complete production-ready form component.",
        language: "tsx",
        filename: "src/components/CreateCourseModal.tsx",
        code: `"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SaveBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">
      {pending ? "Saving Course..." : "Create Course"}
    </button>
  );
}

export function CreateCourseModal() {
  const [state, formAction] = useActionState(async (prev: any, formData: FormData) => {
    // Simulated server action...
    return { success: true };
  }, null);

  return (
    <form action={formAction} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
      <input name="code" placeholder="Course Code (e.g. INT257)" required className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100" />
      <SaveBtn />
    </form>
  );
}`,
      },
      stepByStepFlow: [
        "User fills out course form",
        "Clicks 'Create Course' -> `useFormStatus` turns button into 'Saving Course...'",
        "Server Action validates data",
        "Returns success and updates table",
      ],
    },
  },

  {
    id: "optimistic-ui-mutations",
    unitId: "unit-3",
    title: "Optimistic UI with useOptimistic",
    shortSummary: "Learn how to update user interface state immediately before the server responds, providing instant app-like speed with automatic rollback on errors.",
    order: 4,
    tags: ["Optimistic UI", "useOptimistic", "Perceived Performance", "React 19"],

    simpleExplanation:
      "When you 'Like' a photo on Instagram or Twitter, the heart turns red INSTANTLY in 0 milliseconds. The app doesn't freeze or show a loading spinner waiting for a database in California to respond. This is called **Optimistic UI**: the app assumes the server request will succeed and updates the screen immediately. If the server fails (e.g. network drops), Next.js automatically rolls back to the previous state with zero hassle!",

    whyNeeded:
      "Mobile network latency can take 500ms to 2000ms. Waiting for server confirmation on every small toggle or like makes an app feel sluggish and unresponsive. `useOptimistic` makes web applications feel as instantaneous as native iOS/Android apps.",

    reactVsNext: {
      concept: "Optimistic State Management",
      reactWay: {
        title: "Manual Optimistic State & Rollback",
        code: `// In traditional React, you must manage two sets of state manually:
function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [previousLikes, setPreviousLikes] = useState(initialLikes);

  const handleLike = async () => {
    setPreviousLikes(likes);
    setLikes(likes + 1); // 1. Optimistic update

    try {
      await fetch('/api/like', { method: 'POST' });
    } catch (err) {
      setLikes(previousLikes); // 2. Manual rollback on error!
      alert("Failed to like post.");
    }
  };
}`,
        explanation:
          "In vanilla React, developers must manually save snapshots of previous state and write complex rollback logic in `catch` blocks.",
        drawbacks: [
          "Prone to race conditions and synchronization bugs",
          "High boilerplate code for simple state changes",
          "Messy state management across multiple list items",
        ],
      },
      nextjsWay: {
        title: "React 19 useOptimistic Hook",
        code: `// Next.js & React 19: Built-in useOptimistic!
"use client";

import { useOptimistic } from "react";
import { toggleTodoAction } from "@/actions/todos";

export function TodoItem({ todo }: { todo: { id: number; title: string; completed: boolean } }) {
  // 1. Hook manages current server state vs temporary optimistic state:
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (current, update: boolean) => ({ ...current, completed: update })
  );

  const handleToggle = async () => {
    // 2. Instantly updates the UI:
    setOptimisticTodo(!optimisticTodo.completed);
    // 3. Executes the Server Action in the background:
    await toggleTodoAction(todo.id, !optimisticTodo.completed);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={optimisticTodo.completed}
        onChange={handleToggle}
      />
      <span className={optimisticTodo.completed ? "line-through text-zinc-500" : "text-zinc-100"}>
        {optimisticTodo.title}
      </span>
    </div>
  );
}`,
        explanation:
          "`useOptimistic` updates the UI instantly during the Server Action. If the Server Action rejects, React automatically discards the optimistic state and reverts to the real server data.",
        benefits: [
          "Zero-latency 0ms instant UI response",
          "Automatic rollback without manual catch blocks",
          "Seamless coordination with Server Actions and `revalidatePath`",
        ],
      },
      whyDifferent:
        "`useOptimistic` is deeply integrated with React Transitions and Server Actions, providing declarative optimistic rendering with built-in rollback.",
      mentalShiftSummary:
        "Pass real server state to `useOptimistic()`. Trigger the optimistic update right before `await serverAction()`.",
    },

    basicExample: {
      title: "Optimistic Todo Item Toggle",
      description: "Toggling a todo item's completion status with 0ms visual feedback.",
      language: "tsx",
      filename: "src/components/OptimisticTodo.tsx",
      code: `"use client";

import { useOptimistic } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function OptimisticTodo({
  todo,
  onToggleServer,
}: {
  todo: Todo;
  onToggleServer: (id: number, nextStatus: boolean) => Promise<void>;
}) {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (state, nextStatus: boolean) => ({ ...state, completed: nextStatus })
  );

  const handleToggle = async () => {
    const nextVal = !optimisticTodo.completed;
    setOptimisticTodo(nextVal); // 0ms Instant UI update
    await onToggleServer(todo.id, nextVal); // Server sync
  };

  return (
    <div
      onClick={handleToggle}
      className={\`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all \${
        optimisticTodo.completed
          ? "bg-zinc-950/60 border-zinc-800 text-zinc-500"
          : "bg-zinc-900 border-zinc-700 text-zinc-100 hover:border-emerald-500/50"
      }\`}
    >
      <div className="flex items-center gap-3">
        <div
          className={\`w-5 h-5 rounded-md flex items-center justify-center border text-xs \${
            optimisticTodo.completed
              ? "bg-emerald-600 border-emerald-600 text-white"
              : "border-zinc-600"
          }\`}
        >
          {optimisticTodo.completed && "✓"}
        </div>
        <span className={optimisticTodo.completed ? "line-through" : ""}>
          {optimisticTodo.title}
        </span>
      </div>
      <span className="text-xs font-mono text-zinc-500">
        {optimisticTodo.completed ? "Done" : "Pending"}
      </span>
    </div>
  );
}`,
      explanation:
        "The checkbox toggles the exact millisecond the student clicks, while the network request executes in the background.",
      outputPreview: "Smooth interactive checklist that ticks instantly with green checkmark.",
    },

    moreExamples: [
      {
        title: "Optimistic Chat / Comment Stream",
        description: "Displaying a newly sent message in a chat feed immediately while the server saves it.",
        language: "tsx",
        filename: "src/components/OptimisticChat.tsx",
        code: `"use client";

import { useOptimistic, useRef } from "react";

interface Message {
  id: string;
  text: string;
  sending?: boolean;
}

export function OptimisticChat({
  messages,
  sendMessageAction,
}: {
  messages: Message[];
  sendMessageAction: (text: string) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newText: string) => [
      ...state,
      { id: "temp-" + Date.now(), text: newText, sending: true }
    ]
  );

  async function handleSubmit(formData: FormData) {
    const text = formData.get("message") as string;
    formRef.current?.reset();

    // 1. Immediately append to chat:
    addOptimisticMessage(text);
    // 2. Server save:
    await sendMessageAction(text);
  }

  return (
    <div className="space-y-4 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {optimisticMessages.map((m) => (
          <div
            key={m.id}
            className={\`p-3 rounded-lg text-sm max-w-[80%] \${
              m.sending
                ? "bg-zinc-800/60 text-zinc-400 italic border border-zinc-700/50 ml-auto"
                : "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 ml-auto"
            }\`}
          >
            <p>{m.text}</p>
            {m.sending && <span className="text-[10px] text-amber-400">Sending...</span>}
          </div>
        ))}
      </div>

      <form ref={formRef} action={handleSubmit} className="flex gap-2">
        <input name="message" required placeholder="Type a message..." className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100" />
        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">Send</button>
      </form>
    </div>
  );
}`,
        explanation:
          "The sent message appears in the list with an italic 'Sending...' badge immediately, turning solid once the server finishes saving.",
      },
    ],

    multipleWays: [
      {
        name: "useOptimistic Hook (Recommended)",
        syntax: "const [optState, setOpt] = useOptimistic(state, updateFn)",
        codeSnippet: `const [optLikes, addOptLike] = useOptimistic(likes, (c, val) => c + val);`,
        howItWorks: "Temporary state that lasts only for the duration of the current async action.",
        pros: ["Auto rollback on failure", "Zero custom state sync logic", "Works with Server Actions"],
        cons: ["Requires 'use client'"],
        whenToUse: "For all user actions requiring instant feedback: likes, upvotes, task toggles, chat messages.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `useOptimistic` for high-frequency user actions (likes, toggles, bookmarks, comments).",
      scenarios: [
        {
          scenario: "Marking a syllabus lesson as 'Completed'",
          recommendedApproach: "`useOptimistic` checklist toggle",
          reason: "Students expect the checkbox to tick immediately without waiting for server response.",
        },
        {
          scenario: "Submitting a payment transaction",
          recommendedApproach: "Standard pending button (no optimistic state)",
          reason: "Financial transactions must verify card funds before showing success.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using useOptimistic outside of an async transition or Server Action",
        badCode: `// ❌ BAD: Calling optimistic setter in a synchronous function
function handleClick() {
  setOptimisticValue(10); // Resets immediately because no pending action is active!
}`,
        goodCode: `// ✅ GOOD: Call optimistic setter inside an async action or startTransition
async function handleAction() {
  setOptimisticValue(10);
  await serverMutation();
}`,
        whyItBreaks: "`useOptimistic` only retains its temporary value while an async action is pending.",
        howToFix: "Always call the optimistic setter right before `await`ing your Server Action.",
      },
    ],

    bestPractices: [
      {
        title: "Clearly Indicate Pending Optimistic Items",
        rule: "Add visual cues (e.g. lower opacity or a subtle 'Saving...' indicator) to items currently in optimistic state.",
        explanation: "Helps users understand that the item is currently synchronizing with the cloud.",
      },
    ],

    exercises: [
      {
        id: "u3-ex-4",
        title: "Build an Optimistic Upvote Widget",
        difficulty: "medium",
        estimatedMinutes: 8,
        prompt:
          "Create a Client Component `UpvoteButton` using `useOptimistic` that increments the upvote counter immediately when clicked.",
        initialCode: `// TODO: Build Optimistic Upvote Button
"use client";

import { useOptimistic } from "react";

export function UpvoteButton({ initialVotes }: { initialVotes: number }) {
  // TODO: Implement useOptimistic
  return (
    <button>
      ▲ 0
    </button>
  );
}`,
        expectedOutput: "A button incrementing its counter immediately on click.",
        hints: ["`const [votes, addVote] = useOptimistic(initialVotes, (state, amount: number) => state + amount);`"],
        solutionCode: `"use client";

import { useOptimistic, useTransition } from "react";

export function UpvoteButton({ initialVotes = 0 }: { initialVotes?: number }) {
  const [isPending, startTransition] = useTransition();
  const [votes, addVote] = useOptimistic(
    initialVotes,
    (current, amount: number) => current + amount
  );

  const handleUpvote = () => {
    startTransition(async () => {
      addVote(1); // 0ms Optimistic bump
      // Simulated server delay:
      await new Promise((r) => setTimeout(r, 800));
    });
  };

  return (
    <button
      onClick={handleUpvote}
      className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-emerald-500/50 text-zinc-100 rounded-lg text-sm font-medium transition-all active:scale-95"
    >
      <span className="text-emerald-400">▲</span>
      <span>{votes}</span>
    </button>
  );
}`,
        solutionExplanation:
          "`useOptimistic` increments the vote count the exact millisecond the student clicks, creating a fluid native app feeling.",
      },
    ],

    quizzes: [
      {
        id: "u3-q4",
        question: "What happens if a Server Action fails after useOptimistic has already updated the screen?",
        syllabusTopic: "useOptimistic Error Rollback",
        options: [
          { id: "a", text: "The website crashes with a blue screen", isCorrect: false, explanation: "React catches the transition rejection." },
          { id: "b", text: "React automatically reverts the UI back to the previous server state without extra code", isCorrect: true, explanation: "Correct! When the async transition fails, React automatically discards the optimistic update." },
          { id: "c", text: "The student's browser is locked", isCorrect: false, explanation: "No." },
          { id: "d", text: "The database is deleted", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "`useOptimistic` is built with automatic rollbacks. If the server throws an error, React immediately restores the real server state.",
      },
    ],

    realWorldExample: {
      domain: "Collaborative Project Management Board",
      description: "How tools like Linear, Jira, or Trello move tasks across columns instantly before the backend finishes updating.",
      code: {
        title: "Kanban Card Status Changer",
        description: "Optimistic column shifting.",
        language: "tsx",
        filename: "src/components/KanbanCard.tsx",
        code: `"use client";

import { useOptimistic } from "react";

export function KanbanCard({ task, moveTaskAction }: any) {
  const [optStatus, setOptStatus] = useOptimistic(task.status, (_, next) => next);

  const moveToDone = async () => {
    setOptStatus("done");
    await moveTaskAction(task.id, "done");
  };

  return (
    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
      <p className="text-sm font-medium">{task.title}</p>
      <button onClick={moveToDone} className="text-xs text-emerald-400 mt-2">
        Status: {optStatus}
      </button>
    </div>
  );
}`,
      },
      keyTakeaway: "Optimistic UI eliminates lag in interactive productivity applications.",
    },

    combinedExample: {
      combinedTopics: ["useOptimistic", "Server Actions", "revalidatePath"],
      title: "Optimistic Task Completion with Cache Sync",
      description: "Combining instant UI toggling with server-side database mutation.",
      code: {
        title: "Complete Optimistic Checklist Component",
        description: "Full optimistic component with Server Action.",
        language: "tsx",
        filename: "src/components/Checklist.tsx",
        code: `"use client";

import { useOptimistic } from "react";

export function SyllabusChecklist({ items, toggleAction }: any) {
  const [optItems, setOpt] = useOptimistic(items, (state: any[], { id, done }) =>
    state.map(item => item.id === id ? { ...item, completed: done } : item)
  );

  return (
    <div className="space-y-2">
      {optItems.map(item => (
        <div
          key={item.id}
          onClick={async () => {
            setOpt({ id: item.id, done: !item.completed });
            await toggleAction(item.id, !item.completed);
          }}
          className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl cursor-pointer flex items-center justify-between"
        >
          <span className={item.completed ? "line-through text-zinc-500" : "text-zinc-200"}>{item.title}</span>
          <span className="text-emerald-400">{item.completed ? "✓" : "○"}</span>
        </div>
      ))}
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "User clicks task item",
        "`setOpt` strikes through text in 0 milliseconds",
        "`toggleAction` sends mutation to server in background",
        "Server updates database and page cache",
      ],
    },
  },
];
