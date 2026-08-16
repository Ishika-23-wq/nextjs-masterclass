export interface DetailedReactComparison {
  id: string;
  category: string;
  reactWay: {
    title: string;
    code: string;
    description: string;
    drawbacks: string[];
  };
  nextjsWay: {
    title: string;
    code: string;
    description: string;
    advantages: string[];
  };
  whyDifferent: string;
  keyTakeaway: string;
}

export const detailedReactComparisons: DetailedReactComparison[] = [
  {
    id: "routing",
    category: "Routing & Navigation",
    reactWay: {
      title: "React Router (Client-Side History Mapping)",
      code: `// In React (Vite / CRA), you must install react-router-dom:
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <nav><Link to="/courses">Courses</Link></nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}`,
      description:
        "Routing is entirely client-side. The browser receives an empty `<div id='root'></div>` and parses JavaScript before knowing which component to display.",
      drawbacks: [
        "Requires third-party library (`react-router-dom`)",
        "Zero server pre-rendering for search crawlers",
        "Large router config file that becomes unwieldy in large teams",
        "No automatic background prefetching of server bundles",
      ],
    },
    nextjsWay: {
      title: "Next.js App Router (File-System Routing)",
      code: `// In Next.js, folders determine the URL automatically:
// src/app/page.tsx                  -> http://localhost:3000/
// src/app/courses/page.tsx          -> http://localhost:3000/courses
// src/app/courses/[id]/page.tsx     -> http://localhost:3000/courses/101

import Link from "next/link";

export default function Nav() {
  // <Link> automatically prefetches linked pages in the background!
  return <Link href="/courses">Courses</Link>;
}`,
      description:
        "Every folder containing `page.tsx` is automatically a route. Layouts (`layout.tsx`), loading skeletons (`loading.tsx`), and error boundaries (`error.tsx`) are colocated directly in the folder.",
      advantages: [
        "Zero router configuration code",
        "HTML is rendered on the server for instant page delivery",
        "Background viewport prefetching makes clicks instant",
        "Automatic code splitting: users download only what they view",
      ],
    },
    whyDifferent:
      "Next.js connects the file system directly to the server rendering pipeline, turning directories into fast server-rendered routes without client router boilerplate.",
    keyTakeaway: "Stop writing `<Route path='...'>`. Simply create a folder and add `page.tsx`.",
  },

  {
    id: "components",
    category: "Components Architecture",
    reactWay: {
      title: "All Components Run on the Client",
      code: `// Traditional React: 100% of component code is downloaded to browser
export function StudentCard({ student }) {
  // Even if this is static text, its 15KB JS bundle is downloaded,
  // parsed, and executed by the student's mobile phone CPU.
  return <div className="card"><h3>{student.name}</h3></div>;
}`,
      description:
        "Every React component is included in the client JavaScript bundle, even if it has zero interactive buttons or state.",
      drawbacks: [
        "Heavy client bundle sizes slow down low-end mobile phones",
        "Higher battery and memory usage on mobile devices",
        "Risk of leaking secret tokens if referenced in components",
      ],
    },
    nextjsWay: {
      title: "Server Components (Default) + Client Islands",
      code: `// 1. Server Component (Default - 0 KB Client JS sent!):
export default async function StudentCard({ student }) {
  return (
    <div className="card">
      <h3>{student.name}</h3>
      {/* 2. Small Interactive Client Island: */}
      <BookmarkButton studentId={student.id} />
    </div>
  );
}`,
      description:
        "Next.js renders 80%+ of components into static HTML on the server. Client JavaScript is only downloaded for interactive leaf components marked with `'use client'`.",
      advantages: [
        "0 KB JavaScript sent to browser for static and data components",
        "Direct access to databases, filesystem, and server secrets",
        "Fastest possible First Contentful Paint (FCP)",
      ],
    },
    whyDifferent:
      "Next.js splits execution: data-heavy components stay on the server while small interactive widgets run in the browser.",
    keyTakeaway: "Default to Server Components; add `'use client'` only to small buttons and form inputs.",
  },

  {
    id: "data-fetching",
    category: "Data Fetching",
    reactWay: {
      title: "Client-Side useEffect Waterfalls",
      code: `// React useEffect fetching:
function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => { setCourses(data); setLoading(false); });
  }, []);

  if (loading) return <p>Loading courses...</p>;
  return <ul>{courses.map(c => <li key={c.id}>{c.title}</li>)}</ul>;
}`,
      description:
        "Data is requested only AFTER the browser downloads the HTML, downloads the JavaScript bundle, mounts the component, and triggers the `useEffect` hook.",
      drawbacks: [
        "Network waterfall: slow 3-step delay before data appears",
        "Search engine crawlers see 'Loading courses...' instead of real content",
        "Excessive boilerplate state management in every file",
      ],
    },
    nextjsWay: {
      title: "Direct async/await in Server Components",
      code: `// Next.js: Clean, direct async/await!
export default async function CourseList() {
  // Runs on server before HTML is sent:
  const res = await fetch("https://api.university.com/courses", {
    next: { revalidate: 60 } // Automatic ISR caching!
  });
  const courses = await res.json();

  return (
    <ul>
      {courses.map((c: any) => (
        <li key={c.id}>{c.title}</li>
      ))}
    </ul>
  );
}`,
      description:
        "Data is fetched directly inside the component function on the server. The client receives fully populated HTML with zero client loading delay.",
      advantages: [
        "Zero network waterfalls: HTML arrives with complete data",
        "100% SEO indexable by Google",
        "Clean, readable code with zero `useEffect` or loading flags",
      ],
    },
    whyDifferent:
      "Server Components execute in Node.js where native `await` is supported inside React component functions.",
    keyTakeaway: "Delete `useEffect` and `useState` for data fetching. Just write `async function Page()` and `await fetch()`.",
  },

  {
    id: "rendering",
    category: "Rendering Paradigms",
    reactWay: {
      title: "Client-Side Rendering (CSR) Exclusively",
      code: `// Vanilla React renders exclusively in the user's browser:
// 1. Server returns: <div id="root"></div>
// 2. Browser downloads 2MB bundle.js
// 3. React mounts and paints DOM pixels`,
      description:
        "React by itself only knows how to run in browser memory. It cannot generate static HTML files at build time or render on demand on a server without custom Express architecture.",
      drawbacks: [
        "Slow First Contentful Paint (FCP) on 3G/4G mobile networks",
        "Poor SEO performance",
        "High client CPU consumption",
      ],
    },
    nextjsWay: {
      title: "Unified Hybrid Rendering (SSR, SSG, ISR, CSR)",
      code: `// 1. SSG: Default static HTML build (0ms response)
// 2. ISR: fetch('...', { next: { revalidate: 60 } })
// 3. SSR: export const dynamic = 'force-dynamic'
// 4. CSR: 'use client' + browser hooks`,
      description:
        "Next.js lets you choose the perfect rendering strategy for every individual page in your application.",
      advantages: [
        "Static CDN speed for blogs and marketing pages",
        "Real-time dynamic SSR for dashboards and user profiles",
        "Background ISR updates without full site rebuilds",
      ],
    },
    whyDifferent:
      "Next.js combines static generation, server rendering, and client hydration into a single compiler.",
    keyTakeaway: "Use SSG for static pages, ISR for catalogs, and SSR for live private user data.",
  },

  {
    id: "apis",
    category: "Backend & REST APIs",
    reactWay: {
      title: "Separate Express.js Node Server Required",
      code: `// In React, you must build and deploy a separate server.js:
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Must configure CORS!

app.get('/api/students', (req, res) => res.json([...]));
app.listen(5000);`,
      description:
        "React cannot run backend logic. You must deploy and maintain two separate servers (e.g. Vite on port 3000 and Express on port 5000).",
      drawbacks: [
        "Complex CORS configuration and security errors",
        "Dual deployment and hosting costs",
        "Cannot easily share TypeScript types between frontend and backend",
      ],
    },
    nextjsWay: {
      title: "Built-in Route Handlers (app/api/.../route.ts)",
      code: `// src/app/api/students/route.ts
// Runs on the exact same domain: http://localhost:3000/api/students
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json([{ id: 1, name: "Ishika", course: "INT257" }]);
}`,
      description:
        "Route Handlers allow writing backend REST API endpoints in TypeScript directly inside the Next.js project.",
      advantages: [
        "Zero CORS errors: frontend and backend share the exact same domain",
        "Shared TypeScript interfaces across UI and APIs",
        "Single-command unified deployment",
      ],
    },
    whyDifferent:
      "Next.js is a full-stack framework with built-in serverless and Edge API execution.",
    keyTakeaway: "Write backend endpoints in `src/app/api/.../route.ts` with standard Web `NextResponse.json()`.",
  },

  {
    id: "forms",
    category: "Forms & Mutations",
    reactWay: {
      title: "Manual onSubmit + fetch + State Handling",
      code: `// Traditional React form:
function Form() {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify({ name })
    });
  };
  return <form onSubmit={handleSubmit}><input onChange={e => setName(e.target.value)} /></form>;
}`,
      description:
        "Forms require manual event prevention, state tracking for every input field, and manual POST requests.",
      drawbacks: [
        "High boilerplate code",
        "Does not work if JavaScript fails to load on slow mobile devices",
        "Manual error and pending state wiring",
      ],
    },
    nextjsWay: {
      title: "Server Actions (<form action={myServerAction}>)",
      code: `// Next.js: Direct Server Action!
import { revalidatePath } from "next/cache";

async function addStudent(formData: FormData) {
  "use server"; // Runs strictly on the server!
  const name = formData.get("name");
  await db.insert({ name });
  revalidatePath("/students"); // Refreshes page data automatically!
}

export default function Form() {
  return (
    <form action={addStudent}>
      <input name="name" required />
      <button type="submit">Submit</button>
    </form>
  );
}`,
      description:
        "Server Actions connect native HTML form submissions directly to backend functions with automatic serialization and cache revalidation.",
      advantages: [
        "Zero API endpoints required",
        "Progressive enhancement: works even before JavaScript downloads",
        "Instant UI cache synchronization with `revalidatePath`",
      ],
    },
    whyDifferent:
      "Next.js Server Actions act as type-safe RPCs connecting frontend DOM elements directly to backend database logic.",
    keyTakeaway: "Pass `'use server'` functions directly to `<form action={...}>`.",
  },

  {
    id: "images",
    category: "Image Optimization",
    reactWay: {
      title: "Standard HTML <img> Tag",
      code: `// React standard <img>:
<img src="/photo.jpg" alt="Photo" />
// Sends uncompressed 5MB image to all devices,
// causing Cumulative Layout Shift (CLS) when it loads.`,
      description:
        "The browser downloads the raw unoptimized file at full size, wasting bandwidth on mobile phones.",
      drawbacks: [
        "No automatic WebP/AVIF compression",
        "Causes layout jumps (CLS penalties)",
        "No automatic responsive resizing for mobile vs desktop",
      ],
    },
    nextjsWay: {
      title: "Next.js <Image> Component",
      code: `import Image from "next/image";

<Image
  src="/photo.jpg"
  alt="Course Photo"
  width={800}
  height={400}
  priority // Fast load for above-the-fold hero
  placeholder="blur" // Smooth blur placeholder
/>`,
      description:
        "Next.js automatically compresses images into modern WebP format on the server, resizes them per device screen, and reserves DOM space to prevent layout shifts.",
      advantages: [
        "Up to 90% smaller file sizes",
        "Zero Cumulative Layout Shift (CLS = 0)",
        "Automatic lazy loading for off-screen images",
      ],
    },
    whyDifferent:
      "Next.js includes a server-side image processing pipeline (Sharp) that converts and resizes media on the fly.",
    keyTakeaway: "Replace `<img src='...'>` with `<Image width={...} height={...}>` from `next/image`.",
  },

  {
    id: "seo",
    category: "Search Engine Optimization (SEO)",
    reactWay: {
      title: "Client-Side React Helmet",
      code: `// React Helmet:
<Helmet>
  <title>Course Detail</title>
  <meta property="og:image" content="/banner.jpg" />
</Helmet>`,
      description:
        "Meta tags are injected via JavaScript. Social media scrapers (Twitter, WhatsApp, LinkedIn) do NOT execute JavaScript, so social share cards appear blank or broken.",
      drawbacks: [
        "Social share cards fail on WhatsApp, Twitter, and Facebook",
        "Search engine indexing delays",
      ],
    },
    nextjsWay: {
      title: "Next.js Server-Side Metadata API",
      code: `// 1. Static Metadata:
export const metadata = {
  title: "INT257 Next.js Masterclass",
  description: "Official interactive tutorial platform",
  openGraph: { images: ["/og-image.png"] }
};

// 2. Dynamic Metadata:
export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: \`Lesson #\${id} | INT257\` };
}`,
      description:
        "Metadata is evaluated on the server and embedded directly into the initial HTML document `<head>`.",
      advantages: [
        "100% reliable social media share cards across WhatsApp, Twitter, and Discord",
        "Instant Google search crawler indexing",
        "Dynamic titles based on database records",
      ],
    },
    whyDifferent:
      "Next.js evaluates metadata on the server before transmitting the HTML document to the user or crawler.",
    keyTakeaway: "Export `metadata` or `generateMetadata()` from `page.tsx` or `layout.tsx`.",
  },
];
