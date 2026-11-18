import { QuizQuestion } from "@/types";

export const allUnitQuizzes: Record<string, QuizQuestion[]> = {
  "unit-1": [
    {
      id: "u1-q-1",
      question: "Which file inside an app/ folder in Next.js exposes that folder as a public webpage route?",
      options: [
        { id: "a", text: "index.js", isCorrect: false, explanation: "index.js was used in the older Pages Router. App Router requires page.js." },
        { id: "b", text: "page.js", isCorrect: true, explanation: "Correct! Only folders containing a page.js file become publicly visitable webpage URLs." },
        { id: "c", text: "route.js", isCorrect: false, explanation: "route.js creates backend API endpoints, not visual UI pages." },
        { id: "d", text: "layout.js", isCorrect: false, explanation: "layout.js defines the permanent picture frame around pages, not the page itself." },
      ],
      conceptualExplanation: "In the Next.js App Router, `page.js` defines the unique webpage content for that route address.",
      syllabusTopic: "App Router Conventions",
    },
    {
      id: "u1-q-2",
      question: "Why should you use the Next.js <Link> component instead of a standard HTML <a> tag?",
      options: [
        { id: "a", text: "It prevents full browser page reloads and automatically prefetches linked pages in the background", isCorrect: true, explanation: "Correct! <Link> works like a teleportation portal: it swaps content instantly with zero white-screen reloading." },
        { id: "b", text: "HTML <a> tags are forbidden in JavaScript", isCorrect: false, explanation: "<a> tags are standard HTML, but cause slow full-page reloads." },
        { id: "c", text: "<Link> automatically deletes browser cookies", isCorrect: false, explanation: "Link navigation preserves user cookies and memory." },
        { id: "d", text: "<Link> only works on mobile phones", isCorrect: false, explanation: "Link works across all web browsers and devices." },
      ],
      conceptualExplanation: "`next/link` provides instant client-side transitions and background prefetching.",
      syllabusTopic: "Navigation & Link",
    },
    {
      id: "u1-q-3",
      question: "What is the key difference between layout.js and template.js?",
      options: [
        { id: "a", text: "layout.js stays mounted and preserves component state, whereas template.js re-mounts on every route transition", isCorrect: true, explanation: "Correct! Layouts keep the picture frame mounted; templates create a fresh copy on every click." },
        { id: "b", text: "template.js is only for CSS styles", isCorrect: false, explanation: "template.js is a component file, not a stylesheet." },
        { id: "c", text: "layout.js cannot have buttons or links", isCorrect: false, explanation: "Layouts can have fully interactive navbars and buttons." },
        { id: "d", text: "There is no difference between them", isCorrect: false, explanation: "Layouts preserve state, while templates re-mount." },
      ],
      conceptualExplanation: "`layout.js` is ideal for persistent navigation bars; `template.js` is used when you need enter animations or to reset state on page change.",
      syllabusTopic: "Layouts vs Templates",
    },
  ],

  "unit-2": [
    {
      id: "u2-q-1",
      question: "Why are React Server Components (RSC) the default in Next.js?",
      options: [
        { id: "a", text: "They run on the server, send 0 KB of JavaScript to the browser, and display instantly with zero blank screen", isCorrect: true, explanation: "Correct! The server prepares the HTML (like a restaurant kitchen) so phones don't have to download heavy code." },
        { id: "b", text: "Because JavaScript in the browser is deprecated", isCorrect: false, explanation: "Browser JavaScript is still used for interactive client components." },
        { id: "c", text: "To prevent React from rendering HTML", isCorrect: false, explanation: "Server Components produce clean, complete HTML." },
        { id: "d", text: "Because CSS only works on the server", isCorrect: false, explanation: "CSS styles work identically in both." },
      ],
      conceptualExplanation: "Server Components minimize client bundle size to zero and give instant first load speeds.",
      syllabusTopic: "Server Components",
    },
    {
      id: "u2-q-2",
      question: "When MUST you add 'use client' at the top of a component file?",
      options: [
        { id: "a", text: "When the component uses browser events (onClick) or React state hooks (useState, useEffect)", isCorrect: true, explanation: "Correct! 'use client' tells Next.js: 'This is an interactive island that needs browser state and event handlers!'" },
        { id: "b", text: "On every single file in the app/ folder", isCorrect: false, explanation: "Server Components should remain the default for data and display." },
        { id: "c", text: "Only when connecting to a backend database", isCorrect: false, explanation: "Database connections belong strictly on the server!" },
        { id: "d", text: "Only when writing CSS styles", isCorrect: false, explanation: "Styles work in both server and client components." },
      ],
      conceptualExplanation: "`'use client'` marks interactive client islands like buttons, accordions, and form inputs.",
      syllabusTopic: "Client Components",
    },
    {
      id: "u2-q-3",
      question: "What is Incremental Static Regeneration (ISR)?",
      options: [
        { id: "a", text: "Next.js reuses the cached static page and refreshes it in the background after a set number of seconds", isCorrect: true, explanation: "Correct! ISR gives you the speed of pre-baked static bread with automated fresh batches (e.g. every 60s)." },
        { id: "b", text: "A tool that deletes your database every minute", isCorrect: false, explanation: "ISR is a page caching and revalidation strategy." },
        { id: "c", text: "A client-side animation library", isCorrect: false, explanation: "ISR runs strictly on the Next.js server." },
        { id: "d", text: "A browser-only storage feature", isCorrect: false, explanation: "ISR is server-side caching." },
      ],
      conceptualExplanation: "ISR combines static speed with periodic background updates using `{ next: { revalidate: 60 } }`.",
      syllabusTopic: "Rendering Paradigms (ISR)",
    },
  ],

  "unit-3": [
    {
      id: "u3-q-1",
      question: "What is a Server Action in Next.js?",
      options: [
        { id: "a", text: "An asynchronous function marked with 'use server' that lets forms talk directly to backend code without creating separate API routes", isCorrect: true, explanation: "Correct! Server Actions act like a direct walkie-talkie between your HTML form and backend database logic." },
        { id: "b", text: "A CSS animation keyframe", isCorrect: false, explanation: "Server Actions are backend JavaScript functions." },
        { id: "c", text: "A browser audio sound effect", isCorrect: false, explanation: "No." },
        { id: "d", text: "A tool that restarts the computer", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "Server Actions let you handle form submissions and database mutations with zero boilerplate API endpoints.",
      syllabusTopic: "Server Actions",
    },
    {
      id: "u3-q-2",
      question: "How does Optimistic UI improve the student experience in web applications?",
      options: [
        { id: "a", text: "It updates the UI immediately (e.g. like count 10 -> 11) before the server responds, and rolls back if an error occurs", isCorrect: true, explanation: "Correct! The user feels 0ms lag, and useOptimistic restores previous state if the network request fails." },
        { id: "b", text: "It sends positive affirmations to users", isCorrect: false, explanation: "Optimistic UI is a perceived performance pattern." },
        { id: "c", text: "It doubles server internet bandwidth", isCorrect: false, explanation: "It only affects the client update timing." },
        { id: "d", text: "It turns off database security", isCorrect: false, explanation: "Security remains intact on the server." },
      ],
      conceptualExplanation: "`useOptimistic` makes web interfaces feel instantaneous like native mobile applications.",
      syllabusTopic: "Optimistic UI",
    },
    {
      id: "u3-q-3",
      question: "Where do you write REST API endpoints in the Next.js App Router?",
      options: [
        { id: "a", text: "Inside an app/api/.../route.js file using exported GET or POST functions", isCorrect: true, explanation: "Correct! route.js files handle raw HTTP requests and return standard Response.json()." },
        { id: "b", text: "Inside page.js alongside React JSX", isCorrect: false, explanation: "page.js is for UI; route.js is for API endpoints. They cannot share the same folder." },
        { id: "c", text: "In an external Python server only", isCorrect: false, explanation: "Next.js can run full backend APIs natively." },
        { id: "d", text: "Inside layout.js", isCorrect: false, explanation: "Layouts only handle UI shells." },
      ],
      conceptualExplanation: "Route Handlers in `app/api/.../route.js` act as backend waiters serving JSON data.",
      syllabusTopic: "Route Handlers",
    },
  ],

  "unit-4": [
    {
      id: "u4-q-1",
      question: "Why are httpOnly cookies preferred over localStorage for storing login tokens in Next.js?",
      options: [
        { id: "a", text: "They cannot be stolen by evil browser scripts (XSS) and are automatically sent to the server on every request", isCorrect: true, explanation: "Correct! httpOnly cookies are protected ID cards that Server Components can read to protect pages." },
        { id: "b", text: "Because localStorage is illegal on the internet", isCorrect: false, explanation: "localStorage exists, but cannot be read by the server and is vulnerable to XSS theft." },
        { id: "c", text: "Because cookies make web pages load 100x faster", isCorrect: false, explanation: "The main benefit is security and server accessibility." },
        { id: "d", text: "Cookies only work on laptops, not phones", isCorrect: false, explanation: "Cookies work universally across all devices." },
      ],
      conceptualExplanation: "`httpOnly` cookies provide security against script theft and allow Server Components to verify login sessions before rendering.",
      syllabusTopic: "Authentication Architecture",
    },
    {
      id: "u4-q-2",
      question: "What is an ORM (like Prisma) in simple terms?",
      options: [
        { id: "a", text: "A friendly translator that lets you talk to the database using normal JavaScript objects instead of raw SQL queries", isCorrect: true, explanation: "Correct! The ORM translates db.student.findMany() into SQL queries automatically." },
        { id: "b", text: "A physical hard drive you plug into the computer", isCorrect: false, explanation: "An ORM is a software library." },
        { id: "c", text: "A CSS framework for buttons", isCorrect: false, explanation: "ORMs handle database communication." },
        { id: "d", text: "A replacement for JavaScript", isCorrect: false, explanation: "ORMs are written in and for JavaScript." },
      ],
      conceptualExplanation: "An ORM acts as a translator between JavaScript code and the database tables.",
      syllabusTopic: "Database & ORM Concepts",
    },
    {
      id: "u4-q-3",
      question: "What is the security rule for environment variables in Next.js?",
      options: [
        { id: "a", text: "Variables WITHOUT 'NEXT_PUBLIC_' stay secret on the server; variables WITH 'NEXT_PUBLIC_' are sent to the browser", isCorrect: true, explanation: "Correct! Keep database passwords and private keys without NEXT_PUBLIC_ so they never leak to users." },
        { id: "b", text: "All environment variables are visible to the entire public internet", isCorrect: false, explanation: "Server secrets are strictly kept on the server." },
        { id: "c", text: "Environment variables only work in development mode", isCorrect: false, explanation: "They are essential in production deployment." },
        { id: "d", text: "You must never use environment variables", isCorrect: false, explanation: "Environment variables are the standard way to protect passwords." },
      ],
      conceptualExplanation: "Next.js isolates server secrets from client code unless explicitly marked with `NEXT_PUBLIC_`.",
      syllabusTopic: "Environment Variables",
    },
  ],

  "unit-5": [
    {
      id: "u5-q-1",
      question: "How does the next/image component prevent annoying Cumulative Layout Shift (CLS)?",
      options: [
        { id: "a", text: "By reserving the exact width and height on screen before the image file finishes downloading", isCorrect: true, explanation: "Correct! Reserving space means surrounding text doesn't jump around when the picture appears." },
        { id: "b", text: "By deleting all images on mobile networks", isCorrect: false, explanation: "Images are optimized and compressed, never deleted." },
        { id: "c", text: "By turning images into plain text", isCorrect: false, explanation: "Images remain high quality visual graphics." },
        { id: "d", text: "By freezing the user's browser screen", isCorrect: false, explanation: "It makes the page smoother and faster." },
      ],
      conceptualExplanation: "Explicit dimensions prevent layout shift and modern WebP compression saves bandwidth.",
      syllabusTopic: "Image Optimization",
    },
    {
      id: "u5-q-2",
      question: "Why is generateMetadata() useful for dynamic pages like app/blog/[id]/page.js?",
      options: [
        { id: "a", text: "It creates custom Google titles and social share cards tailored to each specific blog post", isCorrect: true, explanation: "Correct! When someone shares a link on WhatsApp or Twitter, generateMetadata provides the exact post title and preview." },
        { id: "b", text: "It makes the server computer run twice as fast", isCorrect: false, explanation: "It sets HTML <head> metadata for search engines and social apps." },
        { id: "c", text: "It deletes duplicate blog posts", isCorrect: false, explanation: "It is strictly for SEO and social metadata." },
        { id: "d", text: "It prevents users from bookmarking pages", isCorrect: false, explanation: "It actually makes bookmarks show nice titles." },
      ],
      conceptualExplanation: "Dynamic metadata creates accurate search engine tags and rich social media share previews.",
      syllabusTopic: "SEO & Metadata",
    },
  ],

  "unit-6": [
    {
      id: "u6-q-1",
      question: "What does Next.js middleware.js do?",
      options: [
        { id: "a", text: "It acts like a security guard at the airport entrance, inspecting requests before they reach any webpage", isCorrect: true, explanation: "Correct! Middleware can check auth cookies and redirect unauthorized users before rendering even begins." },
        { id: "b", text: "It formats CSS stylesheets", isCorrect: false, explanation: "Middleware handles HTTP request interception." },
        { id: "c", text: "It only runs when the computer shuts down", isCorrect: false, explanation: "Middleware runs on every incoming request." },
        { id: "d", text: "It is an external database server", isCorrect: false, explanation: "Middleware is a JavaScript file in your Next.js project." },
      ],
      conceptualExplanation: "`middleware.js` intercepts requests globally at the edge before route handling.",
      syllabusTopic: "Middleware & Edge",
    },
    {
      id: "u6-q-2",
      question: "What is an Intercepting Route in Next.js (like (.)photo)?",
      options: [
        { id: "a", text: "It shows content in an overlay modal when clicked inside the app, but opens a full webpage if refreshed or shared", isCorrect: true, explanation: "Correct! This creates Instagram-style modal feeds with shareable direct URLs." },
        { id: "b", text: "A virus that hijacks the user's browser", isCorrect: false, explanation: "It is a built-in Next.js routing convention." },
        { id: "c", text: "A tool that deletes 404 pages", isCorrect: false, explanation: "No." },
        { id: "d", text: "A CSS property for rotating photos", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "Intercepting routes combine overlay modal convenience with shareable standalone URLs.",
      syllabusTopic: "Intercepting Routes",
    },
  ],
};
