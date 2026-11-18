import { TopicContent } from "@/types";

export const unit3Topics: TopicContent[] = [
  {
    id: "route-handlers-rest-apis",
    unitId: "unit-3",
    title: "Route Handlers & REST APIs (route.js)",
    shortSummary: "Build custom backend APIs using the Waiter analogy, Web standard Request/Response, and clean route.js endpoints in plain JavaScript.",
    order: 1,
    tags: ["Route Handlers", "REST API", "route.js", "GET", "POST", "JSON"],

    simpleExplanation:
      "Imagine you visit a restaurant:\n\n1. **You (The Browser)** sit at a dining table.\n2. **The Waiter (route.js)** approaches your table with a notepad.\n3. You say: 'Can I see the list of students?' That is a **GET request**.\n4. The Waiter walks into the kitchen, gets the list, and brings back a tray with JSON data (`Response.json([...])`).\n5. If you say: 'Please enroll me in the course!' and hand the waiter your student registration card, that is a **POST request**.\n\nIn Next.js, any file named `route.js` inside your `app/` folder acts as your restaurant waiter! It handles GET, POST, PUT, and DELETE requests from web browsers, mobile apps, or other servers.",

    whyNeeded:
      "Sometimes you need to build backend endpoints for external mobile apps, third-party payment webhooks (like Stripe), or automated scripts that need pure JSON instead of HTML pages. Route Handlers give you a built-in Node.js API server inside Next.js without needing Express.js or a separate backend repository.",

    reactVsNext: {
      concept: "Backend API Creation",
      reactWay: {
        title: "Separate Backend Server Architecture",
        code: `// Traditional client-side approach:
// You must maintain a separate Express.js server:
// server.js (Separate project & separate server running on port 5000):
const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/students", (req, res) => {
  res.json([{ id: 1, name: "Rahul Kumar" }]);
});

app.listen(5000, () => console.log("Backend running on port 5000"));`,
        explanation:
          "Without Next.js Route Handlers, you need two separate repositories, two servers, two deployments, and complicated CORS configuration just to create a single API endpoint.",
        drawbacks: [
          "Requires managing two separate projects and servers",
          "CORS (Cross-Origin Resource Sharing) headaches when frontend talks to port 5000",
          "Double the hosting cost and deployment complexity",
        ],
      },
      nextjsWay: {
        title: "Next.js Built-In Route Handlers (app/api/.../route.js)",
        code: `// app/api/students/route.js (Pure JavaScript!)
// Accessible immediately at: http://localhost:3000/api/students

let students = [
  { id: 1, name: "Rahul Kumar", course: "Computer Science" },
  { id: 2, name: "Priya Sharma", course: "Information Technology" },
];

// 1. Handles GET requests (The Waiter brings data):
export async function GET() {
  return Response.json(students);
}

// 2. Handles POST requests (The Waiter takes an order):
export async function POST(request) {
  const body = await request.json();
  const newStudent = { id: Date.now(), name: body.name, course: body.course };
  students.push(newStudent);

  return Response.json(newStudent, { status: 201 });
}`,
        explanation:
          "In Next.js, dropping a `route.js` file into any folder under `app/` instantly turns that folder into a secure, serverless API endpoint with zero CORS issues.",
        benefits: [
          "No Express.js or extra server needed",
          "Uses standard Web Request and Response objects",
          "Shares the exact same domain and port (zero CORS configuration)",
        ],
      },
      whyDifferent:
        "Next.js is a full-stack framework. You can build both HTML user interfaces (`page.js`) and backend REST APIs (`route.js`) in the same unified tree.",
      mentalShiftSummary:
        "Don't build a separate Node.js Express server for simple APIs. Create `app/api/your-feature/route.js` and export async GET or POST functions.",
    },

    basicExample: {
      title: "Students REST API Endpoint in Plain JavaScript",
      description: "A complete Route Handler managing student records with GET and POST methods.",
      language: "jsx",
      filename: "src/app/api/students/route.js",
      code: `// src/app/api/students/route.js
// In-memory student register:
let students = [
  { id: 1, name: "Aman Gupta", course: "Fullstack Next.js" },
  { id: 2, name: "Sneha Patel", course: "Frontend Engineering" },
];

// 1. GET: Return all students as a JSON list:
export async function GET() {
  return Response.json({
    success: true,
    count: students.length,
    data: students,
  });
}

// 2. POST: Add a new student to our register:
export async function POST(request) {
  // Read JSON body sent by the caller:
  const body = await request.json();

  // Simple validation in plain JavaScript:
  if (!body.name || !body.course) {
    return Response.json(
      { success: false, error: "Please provide both student name and course." },
      { status: 400 }
    );
  }

  const newStudent = {
    id: Date.now(),
    name: body.name.trim(),
    course: body.course.trim(),
  };

  students.push(newStudent);

  return Response.json(
    { success: true, message: "Student registered successfully!", student: newStudent },
    { status: 201 }
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 3: let students = [...] defines our in-memory data list.\n- Line 9: export async function GET() handles incoming HTTP GET requests when someone visits /api/students.\n- Line 10: Response.json(...) returns the data formatted as JSON with a 200 OK status code.\n- Line 18: export async function POST(request) handles incoming HTTP POST requests when someone sends new data.\n- Line 20: await request.json() reads the incoming request body.\n- Line 23-28: Plain JavaScript if statement to validate that name and course were provided.\n- Line 37-40: Returns a 201 Created HTTP response with the newly created student record.\n\nWhat happens in the browser?\n1. A client app sends a POST request with { name: 'Rohan', course: 'React' } to /api/students.\n2. The Next.js server wakes up the POST function in route.js.\n3. The waiter inspects the payload, adds Rohan to the register, and sends back a 201 Created JSON response.\n4. The client app receives the confirmation in under 15ms!",
      outputPreview: `{"success":true,"count":2,"data":[{"id":1,"name":"Aman Gupta","course":"Fullstack Next.js"},{"id":2,"name":"Sneha Patel","course":"Frontend Engineering"}]}`,
    },

    moreExamples: [
      {
        title: "Dynamic Route Handlers with URL Parameters (app/api/students/[id]/route.js)",
        description: "How to extract URL params (like student ID) inside a Route Handler in plain JavaScript.",
        language: "jsx",
        filename: "src/app/api/students/[id]/route.js",
        code: `// src/app/api/students/[id]/route.js
let students = [
  { id: 1, name: "Aman Gupta", course: "Fullstack Next.js" },
  { id: 2, name: "Sneha Patel", course: "Frontend Engineering" },
];

export async function GET(request, { params }) {
  // Extract id from the URL parameters:
  const { id } = await params;
  const student = students.find((s) => s.id === Number(id));

  if (!student) {
    return Response.json({ error: "Student not found" }, { status: 404 });
  }

  return Response.json(student);
}

// Update student by ID:
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const student = students.find((s) => s.id === Number(id));

  if (!student) {
    return Response.json({ error: "Student not found" }, { status: 404 });
  }

  student.name = body.name || student.name;
  student.course = body.course || student.course;

  return Response.json({
    message: "Student Updated Successfully",
    studentId: id,
    studentData: student
  });
}`,
        explanation:
          "In Next.js, the second argument to your handler function receives { params }. Reading await params gives you the dynamic [id] from the URL, allowing clean GET, PUT, PATCH, and DELETE operations.",
      },
      {
        title: "Reading Query Search Parameters (const { searchParams } = new URL(request.url))",
        description: "How to read query strings like /api/students?course=NextJS in Route Handlers.",
        language: "jsx",
        filename: "src/app/api/students/route.js",
        code: `// src/app/api/students/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const course = searchParams.get("course");
  const name = searchParams.get("name");

  return Response.json({
    message: "Filter Applied",
    courseFilter: course,
    nameFilter: name,
  });
}`,
        explanation:
          "Use standard Web API new URL(request.url) to extract searchParams with .get('key') easily.",
      },
    ],

    multipleWays: [
      {
        name: "Route Handlers (route.js)",
        syntax: "export async function GET(request) / POST(request)",
        codeSnippet: "export async function GET() { return Response.json({ message: 'Hello' }); }",
        howItWorks: "Standard HTTP REST API endpoint returning pure JSON or streams.",
        pros: ["Great for external mobile apps, third-party webhooks, public APIs", "Direct HTTP status code control"],
        cons: ["Requires client fetch calls and manual serialization for internal UI"],
        whenToUse: "Stripe webhooks, external mobile apps, public developer APIs.",
        isRecommended: true,
      },
      {
        name: "Server Actions ('use server')",
        syntax: "'use server'; export async function myAction(formData)",
        codeSnippet: `"use server"; export async function saveUser(formData) { /* direct call */ }`,
        howItWorks: "Direct Remote Procedure Call (RPC) from UI button/form to backend function.",
        pros: ["No API endpoint URLs or fetch calls needed", "Works seamlessly with HTML forms"],
        cons: ["Designed for internal UI; not suitable for external webhooks"],
        whenToUse: "Form submissions, button clicks, database mutations inside your website.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use Server Actions for all internal UI form submissions and button clicks. Use Route Handlers when you need public REST endpoints or third-party webhooks.",
      scenarios: [
        {
          scenario: "A user submits a form on your website to update their bio",
          recommendedApproach: "Server Action ('use server')",
          reason: "Zero API route boilerplate, direct type-safe form binding, and automatic cache revalidation.",
        },
        {
          scenario: "Receiving payment notification webhooks from Stripe or Razorpay",
          recommendedApproach: "Route Handler (app/api/webhooks/stripe/route.js)",
          reason: "Stripe sends standard HTTP POST requests from their servers and requires raw request signature verification.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Placing page.js and route.js in the same folder",
        badCode: `// ❌ BAD: Putting both page.js and route.js in src/app/dashboard/!
src/app/dashboard/page.js
src/app/dashboard/route.js // Conflict! Next.js will throw an error!`,
        goodCode: `// ✅ GOOD: Keep pages in app/dashboard/page.js and APIs in app/api/dashboard/route.js`,
        whyItBreaks: "A route cannot be both an HTML webpage and a raw JSON endpoint at the same URL pathname.",
        howToFix: "Move all API handlers into an api/ subfolder, such as src/app/api/dashboard/route.js.",
      },
    ],

    bestPractices: [
      {
        title: "Always Return Response.json()",
        rule: "Use standard Response.json() with appropriate HTTP status codes (200, 201, 400, 404).",
        explanation: "This follows modern Web standards and ensures consistent error handling across all clients.",
      },
    ],

    exercises: [
      {
        id: "u3-ex-1",
        title: "Build a Health Check API Endpoint",
        difficulty: "easy",
        estimatedMinutes: 5,
        prompt:
          "Create a Route Handler in src/app/api/health/route.js in plain JavaScript that exports a GET function returning { status: 'healthy', timestamp: Date.now() }.",
        initialCode: `// src/app/api/health/route.js
// TODO: Export async GET handler
export async function GET() {
  // Return JSON response
}`,
        expectedOutput: "A functional GET API returning a JSON health status.",
        hints: ["Use Response.json({ status: 'healthy', timestamp: Date.now() })"],
        solutionCode: `// src/app/api/health/route.js
export async function GET() {
  return Response.json({
    status: "healthy",
    timestamp: Date.now(),
  });
}`,
        solutionExplanation: "The GET function is automatically recognized by Next.js as an HTTP GET endpoint at /api/health.",
      },
    ],

    quizzes: [
      {
        id: "u3-q1",
        syllabusTopic: "Route Handlers (route.js)",
        question: "Which file name is reserved by Next.js App Router to create backend REST API endpoints?",
        conceptualExplanation: "In Next.js App Router, backend API routes must be named route.js (or route.jsx).",
        options: [
          { id: "a", text: "api.js", isCorrect: false, explanation: "api.js is not recognized as a route endpoint in App Router." },
          { id: "b", text: "route.js", isCorrect: true, explanation: "Correct! Files named route.js define backend Route Handlers." },
          { id: "c", text: "server.js", isCorrect: false, explanation: "server.js is not an App Router routing convention." },
          { id: "d", text: "handler.js", isCorrect: false, explanation: "handler.js is not recognized by App Router." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Payment Gateway Integration",
      description: "How an e-commerce platform receives webhook notifications from Stripe to verify orders.",
      code: {
        title: "Stripe Webhook Listener",
        description: "Route Handler processing incoming payment events in plain JavaScript.",
        language: "jsx",
        filename: "src/app/api/webhooks/stripe/route.js",
        code: `export async function POST(request) {
  const payload = await request.text();
  // Verify signature and fulfill student course enrollment...

  return Response.json({ received: true }, { status: 200 });
}`,
      },
      keyTakeaway: "Route Handlers allow external third-party services to communicate directly with your Next.js backend.",
    },

    combinedExample: {
      combinedTopics: ["Route Handlers", "Server Actions", "Data Fetching"],
      title: "Public API with Internal Dashboard",
      description: "Providing a public API for mobile apps while using Server Actions for website forms.",
      code: {
        title: "Course Registration API",
        description: "Shared database mutations accessible via REST and Server Actions.",
        language: "jsx",
        filename: "src/app/api/courses/route.js",
        code: `let courses = [
  { code: "INT257", title: "Next.js Fullstack Masterclass", credits: 4 }
];

export async function GET() {
  return Response.json(courses);
}`,
      },
      stepByStepFlow: [
        "Mobile app requests GET /api/courses",
        "Route Handler returns JSON course list",
        "Website users view identical data pre-rendered by Server Components",
      ],
    },
  },

  {
    id: "server-actions-mutations",
    unitId: "unit-3",
    title: "Server Actions & Server-Side Mutations",
    shortSummary: "Learn Server Actions using the Walkie-Talkie analogy: speak into 'use server' to run secure backend functions directly from your UI.",
    order: 2,
    tags: ["Server Actions", "use server", "Mutations", "Forms", "revalidatePath"],

    simpleExplanation:
      "Imagine you have a **Walkie-Talkie**:\n\nTraditionally, whenever a user clicked a button to save data, you had to:\n1. Create a whole new API route file (`/api/add-task`).\n2. Write a manual `fetch('/api/add-task', { method: 'POST', body: JSON.stringify(...) })`.\n3. Parse JSON, check status codes, handle network errors.\n\nWith Next.js **Server Actions**, you just press the button on your walkie-talkie and speak directly to the backend! By simply adding `'use server'` at the top of a function, Next.js magically connects your frontend button directly to your backend server function. No API routes, no fetch calls, and no URL endpoints to remember!",

    whyNeeded:
      "Server Actions eliminate 80% of backend glue code. You can update a database, send an email, or write to a file directly from a form submission or button click, with automatic security and zero API boilerplate.",

    reactVsNext: {
      concept: "Triggering Backend Operations",
      reactWay: {
        title: "Manual REST Endpoint & Client Glue Code",
        code: `// Traditional client-side approach:
// 1. You write an API endpoint on a separate backend
// 2. In your React component, you write:
function AddTodo() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setLoading(false);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={loading}>Add</button>
    </form>
  );
}`,
        explanation:
          "Traditional API mutations require manual state tracking, event prevention, fetch calls, headers, and payload serialization just to save one string.",
        drawbacks: [
          "Dozens of lines of repetitive fetch and state boilerplate",
          "Breaks if the user disables JavaScript in their browser",
          "Requires maintaining separate API endpoint URLs",
        ],
      },
      nextjsWay: {
        title: "Next.js Server Actions ('use server' Walkie-Talkie)",
        code: `// 1. Backend Server Action in plain JavaScript:
// src/actions/todoActions.js
"use server";

import { revalidatePath } from "next/cache";

export async function addTodoAction(formData) {
  const text = formData.get("text");
  // Save directly to database...
  console.log("Saved to database:", text);

  // Automatically refresh the UI:
  revalidatePath("/todos");
}

// 2. Frontend Form:
// Works even with ZERO client JavaScript!
import { addTodoAction } from "@/actions/todoActions";

export default function TodoPage() {
  return (
    <form action={addTodoAction}>
      <input name="text" placeholder="Buy milk" />
      <button type="submit">Add Task</button>
    </form>
  );
}`,
        explanation:
          "With Next.js Server Actions, passing your server function to `<form action={addTodoAction}>` wires everything up automatically. It works natively with HTML forms and refreshes data instantly.",
        benefits: [
          "Zero API endpoint routes or fetch calls needed",
          "Works with standard HTML forms (even with JavaScript disabled)",
          "Automatic CSRF protection built in",
        ],
      },
      whyDifferent:
        "Server Actions create a secure RPC (Remote Procedure Call) tunnel behind the scenes, allowing functions defined on the server to be called directly by frontend UI elements.",
      mentalShiftSummary:
        "Don't write a fetch call for form submissions. Create a function with 'use server' and pass it to the form's action attribute.",
    },

    basicExample: {
      title: "Task Creator with Server Action in Plain JavaScript",
      description: "A complete Server Action reading formData, updating state, and revalidating the page.",
      language: "jsx",
      filename: "src/actions/taskActions.js",
      code: `// src/actions/taskActions.js
"use server"; // 1. The Walkie-Talkie switch: runs strictly on the backend!

import { revalidatePath } from "next/cache";

// In-memory task list:
let tasks = [
  { id: 1, title: "Review Unit 1 App Router" },
  { id: 2, title: "Practice Server Actions" },
];

export async function getTasks() {
  return tasks;
}

// 2. Server Action to add a task:
export async function addTaskAction(formData) {
  const title = formData.get("title");

  // Validate in plain JavaScript:
  if (!title || title.trim() === "") {
    return { success: false, error: "Task title cannot be empty." };
  }

  // Add new task:
  tasks.push({
    id: Date.now(),
    title: title.trim(),
  });

  // Revalidate the page so everyone sees the updated list:
  revalidatePath("/tasks");
  return { success: true };
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: 'use server'; tells Next.js: 'Every function in this file is a backend function. Never expose its inner code to the browser!'\n- Line 4: import { revalidatePath } from 'next/cache'; imports the cache refresher.\n- Line 16: export async function addTaskAction(formData) receives the submitted form data automatically.\n- Line 17: formData.get('title') extracts the input value by its name attribute.\n- Line 20-22: Plain JavaScript validation check.\n- Line 25-28: Inserts the new task into our data store.\n- Line 31: revalidatePath('/tasks') purges the cached page so the new task appears immediately!\n\nWhat happens in the browser?\n1. The user types 'Study Unit 3' into the input box and clicks 'Add Task'.\n2. The browser invokes the Server Action over a secure POST connection.\n3. Next.js executes addTaskAction on the server, adds the task, and refreshes the cache.\n4. The browser screen updates in milliseconds with the new task displayed!",
      outputPreview: "Form submission seamlessly adds an item to the task list and refreshes the page.",
    },

    moreExamples: [
      {
        title: "Calling Server Actions from Client Component Event Handlers",
        description: "Invoking a Server Action from an onClick button handler inside a Client Component.",
        language: "jsx",
        filename: "src/components/DeleteButton.js",
        code: `// src/components/DeleteButton.js
"use client";

import { deleteTaskAction } from "@/actions/taskActions";

export function DeleteButton({ taskId }) {
  async function handleDelete() {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTaskAction(taskId);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 rounded-lg text-xs"
    >
      Delete
    </button>
  );
}`,
        explanation:
          "Even inside a Client Component with 'use client', you can import a Server Action and call it like a regular async JavaScript function!",
      },
      {
        title: "Form Mutation with Validation (app/actions.js)",
        description: "Standard classroom Server Action reading formData, validating inputs, and returning feedback objects.",
        language: "jsx",
        filename: "app/actions.js",
        code: `// app/actions.js (Pure JavaScript)
"use server";

let students = [
  { id: 1, name: "Riya", course: "React" },
  { id: 2, name: "Rahul", course: "NextJS" }
];

export async function addStudent(formData) {
  const name = formData.get("name");
  const course = formData.get("course");

  if (!name || !course) {
    return { error: "Name and course are required" };
  }

  students.push({
    id: students.length + 1,
    name: name,
    course: course
  });

  return { success: "Student added successfully" };
}`,
        explanation:
          "The Server Action receives the submitted formData directly, validates fields on the backend, and returns a clean response object to the caller.",
      },
    ],

    multipleWays: [
      {
        name: "Form action attribute (Recommended)",
        syntax: "<form action={myServerAction}>",
        codeSnippet: "<form action={addStudent}><input name='name'/><button>Submit</button></form>",
        howItWorks: "Standard HTML form submission handled natively by Next.js on the server.",
        pros: ["Simplest code", "Progressive enhancement: works even before client JavaScript finishes loading"],
        cons: ["Requires wrapping inputs in a <form> element"],
        whenToUse: "Add, edit, contact, and registration forms.",
        isRecommended: true,
      },
      {
        name: "Event handler invocation (onClick / custom)",
        syntax: "await myServerAction(id)",
        codeSnippet: "<button onClick={() => deleteStudent(student.id)}>Delete</button>",
        howItWorks: "Called inside a Client Component function like a standard async function.",
        pros: ["Flexible for custom button clicks, drag-and-drop, sliders"],
        cons: ["Requires 'use client' wrapper"],
        whenToUse: "Quick action buttons (delete, bookmark, like, archive).",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use <form action={action}> for all forms. Use event handler invocation inside Client Components for quick single-click actions like deleting or toggling.",
      scenarios: [
        {
          scenario: "Submitting a student registration form with 5 fields",
          recommendedApproach: "<form action={registerStudent}>",
          reason: "formData bundles all 5 inputs automatically with progressive enhancement.",
        },
        {
          scenario: "Clicking a small trash can icon to delete an item from a table",
          recommendedApproach: "onClick={() => deleteItem(id)} inside Client Component",
          reason: "Clean and intuitive for single-item actions without needing a separate form tag.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Defining a Server Action inside a Client Component without a separate file",
        badCode: `// ❌ BAD: src/components/MyButton.js
"use client";

// Cannot declare 'use server' directly inside a 'use client' file:
async function myAction() {
  "use server"; // 💥 Error!
}`,
        goodCode: `// ✅ GOOD: Keep Server Actions in a separate file (e.g. src/actions/taskActions.js)
// File 1: src/actions/taskActions.js ('use server'; export async function myAction() { ... })
// File 2: src/components/MyButton.js ('use client'; import { myAction } from '@/actions/taskActions')`,
        whyItBreaks: "A single JavaScript file cannot be both client-side and server-side simultaneously.",
        howToFix: "Always place shared Server Actions in a dedicated src/actions/ directory with 'use server' at the top of the file.",
      },
    ],

    bestPractices: [
      {
        title: "Always Validate on the Server",
        rule: "Never trust client input; validate all formData fields inside the Server Action.",
        explanation: "Malicious users can bypass client browser validation, but server validation cannot be bypassed.",
      },
    ],

    exercises: [
      {
        id: "u3-ex-2",
        title: "Create a Student Enrollment Action",
        difficulty: "easy",
        estimatedMinutes: 8,
        prompt:
          "Write a Server Action in src/actions/enrollActions.js in plain JavaScript with 'use server' that reads 'studentName' from formData, logs it, and calls revalidatePath('/students').",
        initialCode: `// src/actions/enrollActions.js
// TODO: Add 'use server' and build action
export async function enrollStudent(formData) {
  // Extract studentName and revalidate
}`,
        expectedOutput: "A functional Server Action that processes form submissions and refreshes the cache.",
        hints: ["Add 'use server'; as line 1 and import revalidatePath from 'next/cache'"],
        solutionCode: `// src/actions/enrollActions.js
"use server";

import { revalidatePath } from "next/cache";

export async function enrollStudent(formData) {
  const studentName = formData.get("studentName");
  if (!studentName || studentName.trim() === "") return;

  console.log("Enrolling student:", studentName);
  revalidatePath("/students");
}`,
        solutionExplanation: "The Server Action executes on the server, extracts the student name, and purges the /students cache.",
      },
    ],

    quizzes: [
      {
        id: "u3-q2",
        syllabusTopic: "Server Actions ('use server')",
        question: "What does the 'use server' directive at the top of a file do?",
        conceptualExplanation: "'use server' designates all exported async functions in the file as Server Actions running strictly on the backend.",
        options: [
          { id: "a", text: "It restarts your laptop computer", isCorrect: false, explanation: "Directives configure the JavaScript execution environment." },
          { id: "b", text: "It designates exported asynchronous functions as Server Actions that run strictly on the backend", isCorrect: true, explanation: "Correct! 'use server' marks functions as secure backend RPC endpoints." },
          { id: "c", text: "It prevents users from viewing images", isCorrect: false, explanation: "Server actions are for backend mutations." },
          { id: "d", text: "It forces the entire page to render in Internet Explorer", isCorrect: false, explanation: "Unrelated." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Course Enrollment System",
      description: "How a university student portal manages course registration using direct Server Actions.",
      code: {
        title: "Course Registration Handler",
        description: "Server Action registering a student for a module in plain JavaScript.",
        language: "jsx",
        filename: "src/actions/courseRegistration.js",
        code: `"use server";

import { revalidatePath } from "next/cache";

export async function enrollInCourse(courseCode) {
  // Insert enrollment into database...
  console.log("Enrolled in course:", courseCode);
  revalidatePath("/my-courses");
}`,
      },
      keyTakeaway: "Server Actions streamline database updates by eliminating the need to write custom REST API routes.",
    },

    combinedExample: {
      combinedTopics: ["Server Actions", "Forms", "Server Components"],
      title: "Interactive Feedback Form",
      description: "A complete Server Component page featuring an inline form and Server Action.",
      code: {
        title: "Course Feedback Page",
        description: "Full feedback submission loop with zero client JavaScript.",
        language: "jsx",
        filename: "src/app/feedback/page.js",
        code: `import { submitFeedback } from "@/actions/feedbackActions";

export default function FeedbackPage() {
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold text-zinc-100">Course Feedback</h1>
      <form action={submitFeedback} className="space-y-3">
        <textarea
          name="comment"
          placeholder="Share your feedback..."
          className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm"
          rows={3}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Student fills in feedback comment",
        "Clicks 'Send Feedback'",
        "submitFeedback Server Action saves comment to database",
        "Page smoothly updates without full page refresh",
      ],
    },
  },

  {
    id: "forms-validation-uploads",
    unitId: "unit-3",
    title: "Forms, Validation & Pending States",
    shortSummary: "Learn form handling using the School Admission Inspector analogy, useActionState, useFormStatus pending spinners, and clean JavaScript validation.",
    order: 3,
    tags: ["Forms", "useActionState", "useFormStatus", "Validation", "FormData"],

    simpleExplanation:
      "Imagine you want to submit a **School Admission Form**:\n\n1. **The Form (HTML <form>)**: The physical sheet of paper where you write your name, email, and age.\n2. **The Inspector (Server Action Validation)**: The strict school officer who reads your paper. They check:\n   - Did you write your name? If no: 'Please enter your name!'\n   - Is your age greater than 5? If no: 'You must be at least 5 years old!'\n   - Is your email valid? If no: 'Please enter a valid email address!'\n3. **The Stamp (useActionState)**: If the inspector finds an error, they stamp 'REJECTED: Age too low' and hand the form back with the error message displayed.\n4. **The Popcorn Timer (useFormStatus)**: While the inspector is checking your form in the back office, the submit button shows a little spinning wheel ('Submitting...') so you don't click it 5 times!",

    whyNeeded:
      "Without proper form handling and validation, users can submit blank records, break your database, or double-click submit buttons while waiting. React 19 and Next.js provide built-in hooks (`useActionState` and `useFormStatus`) to handle validation errors and loading spinners cleanly without third-party libraries.",

    reactVsNext: {
      concept: "Form Submission & Validation",
      reactWay: {
        title: "Manual Form State Tracking",
        code: `// Manual form tracking requiring multiple useState hooks:
function StudentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name) { setError("Name required"); return; }
    setLoading(true);
    // fetch...
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      {error && <p>{error}</p>}
      <button disabled={loading}>{loading ? "Saving..." : "Save"}</button>
    </form>
  );
}`,
        explanation:
          "Managing individual useState variables for every single input field, error message, and loading flag leads to hundreds of lines of fragile boilerplate.",
        drawbacks: [
          "State management becomes tangled with multiple fields",
          "Every keystroke triggers a component re-render",
          "No native pending state hook without custom wrapper",
        ],
      },
      nextjsWay: {
        title: "Next.js + React useActionState & useFormStatus (Clean JavaScript)",
        code: `// File 1: Server Action with plain JavaScript validation:
// src/actions/studentActions.js
"use server";

export async function createStudentAction(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  // Pure JavaScript validation:
  if (!name || name.trim().length < 3) {
    return { success: false, error: "Name must be at least 3 characters long." };
  }
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Save to database...
  return { success: true, message: "Student registered successfully!" };
}

// File 2: Clean Client Form Component
// src/components/StudentForm.js
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createStudentAction } from "@/actions/studentActions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="px-4 py-2 bg-emerald-600 rounded">
      {pending ? "Registering Student..." : "Register Student"}
    </button>
  );
}

export function StudentForm() {
  const [state, formAction] = useActionState(createStudentAction, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && <p className="text-rose-400 text-sm">{state.error}</p>}
      {state?.success && <p className="text-emerald-400 text-sm">{state.message}</p>}
      <input name="name" placeholder="Full Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <SubmitButton />
    </form>
  );
}`,
        explanation:
          "useActionState holds the returned validation message, while useFormStatus automatically knows when the form is submitting without any manual useState flags!",
        benefits: [
          "Eliminates 5+ useState hooks per form",
          "Automatic pending spinner via useFormStatus",
          "Clean server-side validation in plain JavaScript",
        ],
      },
      whyDifferent:
        "React and Next.js built form submission directly into the component model using native FormData and React Context.",
      mentalShiftSummary:
        "Don't track input state with useState. Let the browser collect inputs in FormData, validate in your Server Action, and inspect pending state with useFormStatus.",
    },

    basicExample: {
      title: "Interactive Student Form with Pending Spinner in Plain JavaScript",
      description: "A complete form featuring useActionState, useFormStatus, and server validation.",
      language: "jsx",
      filename: "src/components/StudentForm.js",
      code: `// src/components/StudentForm.js
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerStudentAction } from "@/actions/studentActions";

// 1. Submit button component reads form pending status:
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <span className="animate-spin">⏳</span>
          <span>Registering Student...</span>
        </>
      ) : (
        <span>Register Student</span>
      )}
    </button>
  );
}

// 2. Main Form Component:
export function StudentForm() {
  // useActionState connects our Server Action with the form response:
  const [state, formAction] = useActionState(registerStudentAction, null);

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
      <h2 className="text-xl font-bold text-zinc-100">Student Admission</h2>

      {/* Show error or success messages from the server: */}
      {state?.error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs">
          ⚠️ {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs">
          ✅ {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-3">
        <div>
          <label className="text-xs text-zinc-400 font-medium">Student Name</label>
          <input
            name="name"
            placeholder="e.g. Rahul Verma"
            className="w-full mt-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 font-medium">Course</label>
          <input
            name="course"
            placeholder="e.g. Computer Science"
            className="w-full mt-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-emerald-500"
            required
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: 'use client'; is required because we are using React interactive form hooks.\n- Line 8: function SubmitButton() is separated into its own component. Why? Because useFormStatus MUST be called inside a child component rendered within the <form> tags!\n- Line 9: const { pending } = useFormStatus(); automatically turns true while the server action is running and false when done.\n- Line 27: const [state, formAction] = useActionState(registerStudentAction, null); passes the initial state (null) and gives us the formAction handler.\n- Line 34-43: Displays error banner or success banner based on what the server returned.\n- Line 45: <form action={formAction}> binds the submission to our action.\n\nWhat happens in the browser?\n1. The student types their name and clicks 'Register Student'.\n2. The button instantly changes to '⏳ Registering Student...' and disables itself to prevent duplicate submissions.\n3. The server validates the data. If an error is returned, the button resets and the red error banner appears.\n4. If valid, the green success banner appears in real time!",
      outputPreview: "A styled admission form showing pending spinner during submission and validation alerts.",
    },

    moreExamples: [
      {
        title: "Server Action with Input Validation in Plain JavaScript",
        description: "The backend Server Action supporting the student registration form.",
        language: "jsx",
        filename: "src/actions/studentActions.js",
        code: `// src/actions/studentActions.js
"use server";

import { revalidatePath } from "next/cache";

export async function registerStudentAction(prevState, formData) {
  const name = formData.get("name");
  const course = formData.get("course");

  // Step 1: Validate name
  if (!name || name.trim().length < 3) {
    return { success: false, error: "Student name must be at least 3 characters long." };
  }

  // Step 2: Validate course
  if (!course || course.trim().length < 2) {
    return { success: false, error: "Please enter a valid course name." };
  }

  // Step 3: Simulate database insertion
  console.log("Successfully registered:", { name: name.trim(), course: course.trim() });

  revalidatePath("/students");
  return { success: true, message: \`\${name.trim()} enrolled successfully in \${course.trim()}!\` };
}`,
        explanation:
          "Notice how prevState is accepted as the first argument when used with useActionState. Plain JavaScript if statements provide clear, beginner-friendly validation.",
      },
      {
        title: "File Upload with Validation (app/student-form/page.js & actions.js)",
        description: "Handling file uploads, checking file sizes (< 5 MB), and displaying upload feedback with useActionState.",
        language: "jsx",
        filename: "app/student-form/page.js",
        code: `// app/actions.js (Server Action)
"use server";

export async function uploadFile(previousState, formData) {
  const file = formData.get("file");

  if (!file || file.size === 0) {
    return { error: "Please select a file", success: "" };
  }

  // 5 MB size limit validation (5 * 1024 * 1024 bytes)
  if (file.size > 5 * 1024 * 1024) {
    return { error: "File must be less than 5 MB", success: "" };
  }

  console.log("File received:", file.name, "Type:", file.type, "Size:", file.size);
  return { success: \`File "\${file.name}" uploaded successfully!\`, error: "" };
}

// app/student-form/page.js (Client Form Component)
"use client";
import { useActionState } from "react";
import { uploadFile } from "../actions";

const initialState = { error: "", success: "" };

export default function StudentForm() {
  const [state, formAction] = useActionState(uploadFile, initialState);

  return (
    <div>
      <h1>File Upload</h1>
      <form action={formAction}>
        <input type="file" name="file" />
        <br /><br />
        <button type="submit">Upload File</button>
      </form>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.success && <p style={{ color: "green" }}>{state.success}</p>}
    </div>
  );
}`,
        explanation:
          "The file input is read via formData.get('file') on the server. You can validate file.size, file.type, and file.name securely on the backend before saving.",
      },
    ],

    multipleWays: [
      {
        name: "useActionState + useFormStatus (Recommended)",
        syntax: "const [state, formAction] = useActionState(action, initialState)",
        codeSnippet: "const [state, formAction] = useActionState(myAction, null);",
        howItWorks: "Standard React 19 pattern for form handling and server response binding.",
        pros: ["Cleanest state management", "Zero client state boilerplate", "Works with Server Actions"],
        cons: ["Requires separating the submit button into a child component for useFormStatus"],
        whenToUse: "Registration forms, checkout flows, settings pages.",
        isRecommended: true,
      },
      {
        name: "Standard <form action={action}> (Simplest)",
        syntax: "<form action={myServerAction}>",
        codeSnippet: "<form action={addTodo}><input name='todo'/><button>Save</button></form>",
        howItWorks: "Native HTML form submission without custom error state hooks.",
        pros: ["Under 5 lines of code", "Zero client hooks"],
        cons: ["Cannot display custom inline validation messages without URL redirects"],
        whenToUse: "Simple forms that redirect immediately on success (like a search bar).",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use useActionState when you need to show error messages (like 'Password too short'). Use plain <form action> when the form simply saves and redirects.",
      scenarios: [
        {
          scenario: "User sign-up form with password and email validation",
          recommendedApproach: "useActionState + useFormStatus",
          reason: "Enables inline validation errors and pending spinners.",
        },
        {
          scenario: "Search bar that navigates to /search?q=query",
          recommendedApproach: "Plain <form action='/search'>",
          reason: "Simple GET form navigation doesn't need server mutation state.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Calling useFormStatus inside the same component that renders the <form>",
        badCode: `// ❌ BAD: useFormStatus called in the parent component!
export function MyForm() {
  const { pending } = useFormStatus(); // 💥 pending will ALWAYS be false!
  return (
    <form action={myAction}>
      <button disabled={pending}>Submit</button>
    </form>
  );
}`,
        goodCode: `// ✅ GOOD: Call useFormStatus inside a CHILD component of the form!
function SubmitButton() {
  const { pending } = useFormStatus(); // Works!
  return <button disabled={pending}>Submit</button>;
}

export function MyForm() {
  return (
    <form action={myAction}>
      <SubmitButton />
    </form>
  );
}`,
        whyItBreaks: "useFormStatus relies on React Context provided by the parent <form>. A component cannot read context from a <form> rendered inside its own return statement.",
        howToFix: "Extract the submit button into its own small child component inside the form.",
      },
    ],

    bestPractices: [
      {
        title: "Separate Submit Buttons",
        rule: "Always extract your form's submit button into a dedicated <SubmitButton /> component.",
        explanation: "This allows useFormStatus to correctly read the form's pending state.",
      },
    ],

    exercises: [
      {
        id: "u3-ex-3",
        title: "Build a Validated Feedback Form",
        difficulty: "medium",
        estimatedMinutes: 10,
        prompt:
          "Write a Server Action in src/actions/reviewActions.js in plain JavaScript that checks if 'rating' is between 1 and 5 and 'comment' is at least 10 characters long. Return an object with { success: false, error: '...' } if invalid.",
        initialCode: `// src/actions/reviewActions.js
"use server";

export async function submitReview(prevState, formData) {
  // Validate rating (1-5) and comment (min 10 chars)
}`,
        expectedOutput: "A validated Server Action returning error messages on invalid input.",
        hints: ["Number(formData.get('rating')) to check number ranges"],
        solutionCode: `// src/actions/reviewActions.js
"use server";

export async function submitReview(prevState, formData) {
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment");

  if (isNaN(rating) || rating < 1 || rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5 stars." };
  }

  if (!comment || comment.trim().length < 10) {
    return { success: false, error: "Comment must be at least 10 characters long." };
  }

  return { success: true, message: "Thank you for your review!" };
}`,
        solutionExplanation: "The action validates input bounds in plain JavaScript and returns descriptive error objects for useActionState.",
      },
    ],

    quizzes: [
      {
        id: "u3-q3",
        syllabusTopic: "Forms & Pending States (useActionState, useFormStatus)",
        question: "Why must useFormStatus be called in a child component inside the <form> rather than in the form component itself?",
        conceptualExplanation: "useFormStatus reads React Context provided by the parent <form>, which is only available to nested child components.",
        options: [
          { id: "a", text: "Because React hooks are forbidden inside forms", isCorrect: false, explanation: "Hooks can be used inside form components." },
          { id: "b", text: "Because useFormStatus reads form context provided by the parent <form> wrapper", isCorrect: true, explanation: "Correct! The parent <form> creates the React context that child components inspect." },
          { id: "c", text: "To make the button render in green", isCorrect: false, explanation: "CSS is unrelated." },
          { id: "d", text: "Because forms only run in Web Workers", isCorrect: false, explanation: "Forms run in the main DOM tree." },
        ],
      },
    ],

    realWorldExample: {
      domain: "University Assignment Submission Portal",
      description: "How a university portal manages assignment submissions with file checks and loading spinners.",
      code: {
        title: "Assignment Submission Form",
        description: "Student assignment submission with validation.",
        language: "jsx",
        filename: "src/components/AssignmentUpload.js",
        code: `"use client";

import { useActionState } from "react";
import { uploadAssignmentAction } from "@/actions/assignmentActions";

export function AssignmentUpload() {
  const [state, formAction] = useActionState(uploadAssignmentAction, null);

  return (
    <form action={formAction} className="p-6 bg-zinc-900 rounded-xl space-y-4">
      {state?.error && <p className="text-rose-400 text-xs">{state.error}</p>}
      <input type="text" name="studentId" placeholder="Student ID" required />
      <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
        Submit Assignment
      </button>
    </form>
  );
}`,
      },
      keyTakeaway: "Clear pending states and validation feedback give students immediate reassurance that assignments were received.",
    },

    combinedExample: {
      combinedTopics: ["Forms", "Server Actions", "Validation"],
      title: "Course Creation Modal with Error Handling",
      description: "A complete course creation form featuring useActionState.",
      code: {
        title: "Create Course Modal Form",
        description: "Form with inline error display in plain JavaScript.",
        language: "jsx",
        filename: "src/components/CreateCourseForm.js",
        code: `"use client";

import { useActionState } from "react";
import { createCourseAction } from "@/actions/courseActions";

export function CreateCourseForm() {
  const [state, formAction] = useActionState(createCourseAction, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && <p className="text-rose-400 text-sm">{state.error}</p>}
      <input name="code" placeholder="e.g. INT257" required />
      <input name="title" placeholder="Course Title" required />
      <button type="submit">Create Course</button>
    </form>
  );
}`,
      },
      stepByStepFlow: [
        "Teacher enters course code and title",
        "Submits form",
        "Server action validates unique code and minimum title length",
        "On success, revalidates course catalog and closes modal",
      ],
    },
  },

  {
    id: "optimistic-ui-mutations",
    unitId: "unit-3",
    title: "Optimistic UI Updates (useOptimistic)",
    shortSummary: "Learn optimistic UI using the Social Media Heart analogy: tap heart -> turns red instantly (0ms) -> syncs with server -> auto-rollback if error.",
    order: 4,
    tags: ["Optimistic UI", "useOptimistic", "Like Button", "0ms Latency", "React 19"],

    simpleExplanation:
      "Imagine you are browsing Instagram or Twitter:\n\nWhen you tap the **Heart (Like)** button on a post, what happens?\n\nDoes your phone freeze for 2 seconds while a radio signal flies to a satellite in space, talks to a server in California, and waits for a response?\n\n**NO!** The heart turns bright red **IMMEDIATELY (in 0 milliseconds!)**.\n\nYour app makes an **Optimistic Guess**: 'I bet this like will succeed! Let me show the user the red heart and increment the counter right now so they feel happy and fast.'\n\nIn the background, your phone quietly sends the message to the server:\n- **If the server says YES (Success)**: The heart stays red! Awesome!\n- **If the server says NO (Network crashed)**: React **automatically rolls back** the heart to empty and sets the counter back to the previous number!\n\nThis is **Optimistic UI**, and React provides a magical hook called `useOptimistic` to do this in plain JavaScript!",

    whyNeeded:
      "On mobile networks with 300ms latency, waiting for the server before updating checkboxes or like buttons makes an app feel sluggish and broken. Optimistic UI gives your web app the instantaneous 0ms responsiveness of native iOS and Android apps.",

    reactVsNext: {
      concept: "UI Mutation Responsiveness",
      reactWay: {
        title: "Pessimistic UI (Slow, Waits for Server)",
        code: `// Pessimistic update waiting for the complete network roundtrip:
function LikeButton() {
  const [likes, setLikes] = useState(10);
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    setLoading(true);
    // User stares at a spinner for 2 seconds:
    const res = await fetch("/api/like", { method: "POST" });
    const data = await res.json();
    setLikes(data.likes);
    setLoading(false);
  }

  return (
    <button onClick={handleLike} disabled={loading}>
      {loading ? "Saving..." : \`❤️ \${likes}\`}
    </button>
  );
}`,
        explanation:
          "Pessimistic UI assumes the worst: it makes the user wait for the network roundtrip before showing any feedback on screen.",
        drawbacks: [
          "Feels slow and clunky on mobile connections",
          "Shows annoying loading spinners for simple button clicks",
          "Users might double-click or get frustrated",
        ],
      },
      nextjsWay: {
        title: "Optimistic UI with React useOptimistic (0ms Instant Reaction!)",
        code: `// Clean plain JavaScript with useOptimistic:
"use client";

import { useOptimistic } from "react";
import { likePostAction } from "@/actions/postActions";

export function LikeButton({ initialLikes = 10 }) {
  // useOptimistic takes (currentValue, updateFunction):
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (current, amount) => current + amount
  );

  async function handleLike() {
    // 1. Instantly flips the count to 11 in 0ms!
    setOptimisticLikes(1);

    // 2. Syncs with backend server in the background:
    await likePostAction();
    // If the server fails, React automatically rolls back to 10!
  }

  return (
    <button onClick={handleLike} className="px-4 py-2 bg-zinc-900 rounded-xl">
      ❤️ {optimisticLikes} Likes
    </button>
  );
}`,
        explanation:
          "useOptimistic updates the screen in 0 milliseconds. If the server action throws an error or the network drops, React automatically discards the optimistic update and rolls back to the previous server state.",
        benefits: [
          "Instantaneous 0ms user feedback on clicks",
          "Automatic rollback on failure (zero custom rollback logic)",
          "Creates mobile-app-grade fluid user experience",
        ],
      },
      whyDifferent:
        "React integrates optimistic state directly into concurrent rendering transitions, ensuring seamless synchronization between client assumptions and server truth.",
      mentalShiftSummary:
        "Don't make users wait for the server on small toggles. Update the UI optimistically first with useOptimistic, then let the server catch up.",
    },

    basicExample: {
      title: "Optimistic Like Counter (10 -> 11 -> Server -> Rollback)",
      description: "A complete Like counter demonstrating instant 0ms update and server synchronization in plain JavaScript.",
      language: "jsx",
      filename: "src/components/OptimisticLikeButton.js",
      code: `// src/components/OptimisticLikeButton.js
"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLikeAction } from "@/actions/likeActions";

export function OptimisticLikeButton({ postId, initialLikes = 10, initialLiked = false }) {
  // useTransition coordinates the optimistic update with the server action:
  const [isPending, startTransition] = useTransition();

  // useOptimistic takes (currentServerState, updateFunction):
  const [optimisticState, setOptimisticState] = useOptimistic(
    { likes: initialLikes, liked: initialLiked },
    (state, change) => ({
      likes: state.liked ? state.likes - 1 : state.likes + 1,
      liked: !state.liked,
    })
  );

  function handleToggleLike() {
    // Wrap in startTransition for instant UI flip:
    startTransition(async () => {
      // 1. Instant 0ms local state flip:
      setOptimisticState(!optimisticState.liked);

      // 2. Background server call:
      try {
        await toggleLikeAction(postId, !optimisticState.liked);
      } catch (err) {
        console.error("Like failed on server, rolling back automatically!");
        // React automatically reverts optimisticState back to server state!
      }
    });
  }

  return (
    <button
      onClick={handleToggleLike}
      className={\`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all \${
        optimisticState.liked
          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
          : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700"
      }\`}
    >
      <span>{optimisticState.liked ? "❤️" : "🤍"}</span>
      <span>{optimisticState.likes} Likes</span>
    </button>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: 'use client'; is needed because button clicks and React hooks run in the browser.\n- Line 4: import { useOptimistic, useTransition } from 'react'; imports React's optimistic update tools.\n- Line 8: const [isPending, startTransition] = useTransition(); allows us to trigger an asynchronous transition.\n- Line 11-17: useOptimistic creates an optimistic state. The second argument is a pure JavaScript function that calculates the new state (e.g. 10 -> 11).\n- Line 22: setOptimisticState(...) updates the screen IMMEDIATELY in 0 milliseconds.\n- Line 25: await toggleLikeAction(...) sends the update to the server in the background.\n- Line 27-29: If the server throws an error, React automatically cancels the optimistic change and restores the original value (10)!\n\nWhat happens in the browser?\n1. The button shows '🤍 10 Likes'.\n2. The student clicks the button.\n3. In 0 milliseconds (faster than the blink of an eye), the heart turns red and displays '❤️ 11 Likes'.\n4. The server finishes updating in the background without disturbing the user.\n5. If the user's internet was disconnected, React smoothly flips back to '🤍 10 Likes'!",
      outputPreview: "A like button that flips instantly from 10 to 11 on click with zero delay.",
    },

    moreExamples: [
      {
        title: "Optimistic Checklist Task Toggler in Plain JavaScript",
        description: "Checking off a todo item instantly while syncing with the backend in the background.",
        language: "jsx",
        filename: "src/components/OptimisticTodoList.js",
        code: `// src/components/OptimisticTodoList.js
"use client";

import { useOptimistic, useTransition } from "react";
import { toggleTodoAction } from "@/actions/todoActions";

export function OptimisticTodoList({ initialTodos }) {
  const [, startTransition] = useTransition();

  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    initialTodos,
    (todos, { id, completed }) =>
      todos.map((t) => (t.id === id ? { ...t, completed } : t))
  );

  function handleCheck(id, currentStatus) {
    const nextStatus = !currentStatus;
    startTransition(async () => {
      // 0ms instant checkbox toggle:
      setOptimisticTodos({ id, completed: nextStatus });
      // Background server synchronization:
      await toggleTodoAction(id, nextStatus);
    });
  }

  return (
    <ul className="space-y-2">
      {optimisticTodos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => handleCheck(todo.id, todo.completed)}
          className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3 cursor-pointer select-none"
        >
          <span className={todo.completed ? "text-emerald-400" : "text-zinc-600"}>
            {todo.completed ? "✅" : "⬜"}
          </span>
          <span className={todo.completed ? "line-through text-zinc-500" : "text-zinc-200"}>
            {todo.title}
          </span>
        </li>
      ))}
    </ul>
  );
}`,
        explanation:
          "The checkbox flips checkmark state instantaneously. Even on high-latency mobile networks, the UI feels native and immediate.",
      },
    ],

    multipleWays: [
      {
        name: "useOptimistic Hook (Recommended)",
        syntax: "const [optimisticState, setOptimisticState] = useOptimistic(state, updateFn)",
        codeSnippet: "const [optLikes, setOptLikes] = useOptimistic(likes, (c, v) => c + v);",
        howItWorks: "Native React 19 hook that handles temporary optimistic state and automatic rollback on failure.",
        pros: ["0ms latency", "Automatic rollback on error", "Zero custom manual cache revert code"],
        cons: ["Requires useTransition or Server Action context"],
        whenToUse: "Like buttons, bookmark toggles, todo checkmarks, voting widgets.",
        isRecommended: true,
      },
      {
        name: "Manual useState Optimistic Management",
        syntax: "useState + try/catch rollback",
        codeSnippet: "setLikes(likes + 1); try { await save(); } catch { setLikes(likes); }",
        howItWorks: "Manually saving the old state and catching errors to restore it.",
        pros: ["Familiar standard pattern"],
        cons: ["Prone to race conditions and messy boilerplate code"],
        whenToUse: "Legacy React 18 applications.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use useOptimistic for rapid binary toggles (like, bookmark, complete) and fast message sending. Use standard Server Actions for heavy destructive operations (like deleting an entire account).",
      scenarios: [
        {
          scenario: "Toggling a course bookmark or upvoting a forum answer",
          recommendedApproach: "useOptimistic",
          reason: "Users expect immediate 0ms visual feedback on likes and bookmarks.",
        },
        {
          scenario: "Purchasing a course with credit card or deleting an account",
          recommendedApproach: "Standard Server Action with loading spinner (Pessimistic)",
          reason: "Financial transactions and irreversible deletions must be verified by the server first.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Calling setOptimistic outside of a transition or Server Action",
        badCode: `// ❌ BAD: Calling setOptimistic in a plain event handler without startTransition
function handleLike() {
  setOptimisticLikes(1); // 💥 Error: An optimistic update was performed outside a transition!
  await likeAction();
}`,
        goodCode: `// ✅ GOOD: Wrap inside startTransition or a form action!
function handleLike() {
  startTransition(async () => {
    setOptimisticLikes(1);
    await likeAction();
  });
}`,
        whyItBreaks: "React requires optimistic updates to be registered within a concurrent transition so it knows how to rollback if the async task fails.",
        howToFix: "Wrap the call inside startTransition(async () => { ... }).",
      },
    ],

    bestPractices: [
      {
        title: "Use for Instant User Feedback",
        rule: "Apply optimistic updates to user actions with high success probability (likes, stars, checkmarks).",
        explanation: "Optimistic UI transforms web apps to feel as fast and responsive as native mobile apps.",
      },
    ],

    exercises: [
      {
        id: "u3-ex-4",
        title: "Build an Optimistic Bookmark Star",
        difficulty: "medium",
        estimatedMinutes: 8,
        prompt:
          "Write a Client Component in src/components/BookmarkStar.js in plain JavaScript using useOptimistic that toggles a boolean 'isBookmarked' state instantly from false to true when clicked.",
        initialCode: `// src/components/BookmarkStar.js
"use client";

import { useOptimistic, useTransition } from "react";

export function BookmarkStar({ initialBookmarked = false }) {
  // TODO: Implement useOptimistic star toggle
  return <button>Bookmark</button>;
}`,
        expectedOutput: "A button that toggles between bookmarked star states with 0ms delay.",
        hints: ["Use useOptimistic(initialBookmarked, (curr) => !curr) and startTransition"],
        solutionCode: `// src/components/BookmarkStar.js
"use client";

import { useOptimistic, useTransition } from "react";

export function BookmarkStar({ initialBookmarked = false }) {
  const [, startTransition] = useTransition();
  const [optimisticBookmarked, setOptimisticBookmarked] = useOptimistic(
    initialBookmarked,
    (current) => !current
  );

  function handleToggle() {
    startTransition(async () => {
      setOptimisticBookmarked(!optimisticBookmarked);
      // Simulate server delay:
      await new Promise((r) => setTimeout(r, 500));
    });
  }

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm"
    >
      {optimisticBookmarked ? "★ Saved" : "☆ Save"}
    </button>
  );
}`,
        solutionExplanation: "useOptimistic flips the star display in 0ms while the server sync runs in the background.",
      },
    ],

    quizzes: [
      {
        id: "u3-q4",
        syllabusTopic: "Optimistic UI (useOptimistic)",
        question: "What happens if a backend Server Action fails during an optimistic update?",
        conceptualExplanation: "When an async transition fails or rejects, React automatically discards the optimistic update and reverts to the server state.",
        options: [
          { id: "a", text: "The website crashes with a blue screen", isCorrect: false, explanation: "React catches the rejection gracefully." },
          { id: "b", text: "React automatically reverts the UI back to the previous server state without extra code", isCorrect: true, explanation: "Correct! When the async transition fails, React automatically rolls back the optimistic change." },
          { id: "c", text: "The student's browser is permanently locked", isCorrect: false, explanation: "No." },
          { id: "d", text: "The entire database is deleted", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Interactive Kanban Board",
      description: "How task management tools like Trello or Linear move cards between columns in 0ms.",
      code: {
        title: "Optimistic Kanban Card Mover",
        description: "Moving a card from 'Todo' to 'Done' instantaneously in plain JavaScript.",
        language: "jsx",
        filename: "src/components/KanbanCard.js",
        code: `"use client";

import { useOptimistic, useTransition } from "react";
import { moveCardAction } from "@/actions/kanbanActions";

export function KanbanCard({ card }) {
  const [, startTransition] = useTransition();
  const [optStatus, setOptStatus] = useOptimistic(card.status, (_, next) => next);

  function handleMove(nextStatus) {
    startTransition(async () => {
      setOptStatus(nextStatus);
      await moveCardAction(card.id, nextStatus);
    });
  }

  return (
    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
      <p>{card.title}</p>
      <button onClick={() => handleMove("done")}>Mark Done ({optStatus})</button>
    </div>
  );
}`,
      },
      keyTakeaway: "Optimistic card movements give web apps the smooth 60fps fluidity of native desktop apps.",
    },

    combinedExample: {
      combinedTopics: ["Optimistic UI", "Server Actions", "Client Components"],
      title: "Interactive Study Checklist",
      description: "Checklist combining useOptimistic and Server Actions with auto-rollback.",
      code: {
        title: "Study Checklist Component",
        description: "0ms checklist toggling in plain JavaScript.",
        language: "jsx",
        filename: "src/components/Checklist.js",
        code: `"use client";

import { useOptimistic, useTransition } from "react";
import { toggleTopicAction } from "@/actions/studyActions";

export function Checklist({ topics }) {
  const [, startTransition] = useTransition();
  const [optTopics, setOptTopics] = useOptimistic(
    topics,
    (list, { id, done }) => list.map(t => t.id === id ? { ...t, done } : t)
  );

  function toggleTopic(id, done) {
    startTransition(async () => {
      setOptTopics({ id, done });
      await toggleTopicAction(id, done);
    });
  }

  return (
    <div className="space-y-2">
      {optTopics.map(t => (
        <div key={t.id} onClick={() => toggleTopic(t.id, !t.done)} className="cursor-pointer">
          {t.done ? "✅" : "⬜"} {t.name}
        </div>
      ))}
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "User clicks topic checkbox",
        "0ms: checkmark flips to green tick",
        "Background: Server Action saves completion to database",
        "If connection fails: checkmark flips back automatically",
      ],
    },
  },
];
