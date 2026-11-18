"use client";

import { useState } from "react";
import { Code2, Database } from "lucide-react";
import { CodeSandbox } from "@/components/classroom/CodeSandbox";
import { SupabaseRunner } from "@/components/classroom/SupabaseRunner";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";

const SNIPPET_PRESETS = [
  {
    id: "posts-isr",
    title: "1. Data Fetching + ISR (posts/page.js)",
    code: `// app/posts/page.js (Pure JavaScript)
export const revalidate = 20; // Revalidate every 20 seconds

export default async function Posts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const currentTime = new Date().toLocaleTimeString();
  const data = await response.json();

  return (
    <div className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <h1 className="text-xl font-bold text-zinc-900">Live Posts (ISR)</h1>
        <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
          Cached at: {currentTime}
        </span>
      </div>
      <ul className="space-y-2">
        {data.slice(0, 5).map((item) => (
          <li key={item.id} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-sm text-zinc-800">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  },
  {
    id: "student-actions",
    title: "2. Server Action Mutation (actions.js)",
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

  return { success: "Student added successfully", total: students.length };
}

// app/mutation-data/page.js
export default function MutationData() {
  return (
    <form action={addStudent} className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-3 shadow-xs">
      <h2 className="text-base font-bold text-zinc-900">Enroll New Student</h2>
      <input name="name" placeholder="Enter student name" required className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm" />
      <input name="course" placeholder="Enter course (e.g. NextJS)" required className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm" />
      <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold">
        Add Student
      </button>
    </form>
  );
}`,
  },
  {
    id: "student-api",
    title: "3. REST API Handler (api/students/[id]/route.js)",
    code: `// app/api/students/[id]/route.js (Pure JavaScript)
export async function GET(request, { params }) {
  const { id } = await params;
  return Response.json({
    message: "Student Found",
    studentId: id
  });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  return Response.json({
    message: "Student Updated",
    studentId: id,
    studentData: body
  });
}`,
  },
  {
    id: "optimistic-counter",
    title: "4. Optimistic UI Updates (counter-ui/page.js)",
    code: `// app/counter-ui/page.js (Pure JavaScript)
"use client";

import { useState, useOptimistic, startTransition } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  const [optimisticCount, addOptimistic] = useOptimistic(
    count,
    (currentCount, amount) => currentCount + amount
  );

  async function increase() {
    // 1. Immediately update UI (0ms delay!)
    startTransition(() => {
      addOptimistic(1);
    });

    // 2. Simulated server delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Update actual state
    setCount(count + 1);
  }

  return (
    <div className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-4 shadow-xs">
      <h3 className="text-sm font-bold text-zinc-500 uppercase font-mono">Optimistic Counter</h3>
      <h1 className="text-4xl font-extrabold text-zinc-900">{optimisticCount}</h1>
      <button
        onClick={increase}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
      >
        ➕ Increment Count
      </button>
    </div>
  );
}`,
  },
  {
    id: "file-upload",
    title: "5. Form Validation & Upload (student-form/page.js)",
    code: `// app/student-form/page.js (Pure JavaScript)
"use client";

import { useActionState } from "react";

// Server action for file validation
async function uploadFileAction(previousState, formData) {
  const file = formData.get("file");
  if (!file || file.size === 0) {
    return { error: "Please select a file", success: "" };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "File must be less than 5 MB", success: "" };
  }
  return { success: \`File "\${file.name}" received successfully!\`, error: "" };
}

export default function StudentForm() {
  const [state, formAction] = useActionState(uploadFileAction, { error: "", success: "" });

  return (
    <div className="p-6 bg-white border border-zinc-200 rounded-3xl space-y-4 shadow-xs">
      <h1 className="text-lg font-bold text-zinc-900">Student File Upload</h1>
      <form action={formAction} className="space-y-3">
        <input type="file" name="file" className="block w-full text-xs text-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
        <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold">
          Upload File
        </button>
      </form>
      {state.error && <p className="text-xs text-rose-600 font-bold">{state.error}</p>}
      {state.success && <p className="text-xs text-emerald-600 font-bold">{state.success}</p>}
    </div>
  );
}`,
  },
];

export default function PlaygroundPage() {
  const [selectedSnippet, setSelectedSnippet] = useState(SNIPPET_PRESETS[0]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header with Cute Study Stickers */}
      <div className="space-y-4 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <StickerBadge emoji="💻" label="Interactive Sandbox" color="matcha" size="sm" tilt="rotate-[-1deg]" />
          <StickerBadge emoji="✨" label="Live Pure JS" color="honey" size="sm" tilt="rotate-[1deg]" />
          <StickerBadge emoji="🧸" label="Student Playground" color="sakura" size="sm" tilt="rotate-[-2deg]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Next.js Live Code <span className="mildliner-green">Sandbox</span>
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed font-sans">
          Write, edit, and compile Next.js Server Components, Server Actions, and Supabase client calls directly in your browser with real-time feedback.
        </p>
      </div>

      {/* Snippet Preset Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-zinc-500 font-medium">Preset Templates:</span>
        {SNIPPET_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setSelectedSnippet(preset)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
              selectedSnippet.id === preset.id
                ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Standalone Code Sandbox */}
      <CodeSandbox
        key={selectedSnippet.id}
        initialCode={selectedSnippet.code}
        title={`Sandbox: ${selectedSnippet.title}`}
      />

      {/* Supabase Sandbox */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-emerald-600" />
          <h2 className="text-2xl font-bold text-zinc-900">Live Supabase Database Explorer</h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600">
          Query simulated student records and test database mutations in real time.
        </p>
        <SupabaseRunner />
      </div>
    </div>
  );
}
