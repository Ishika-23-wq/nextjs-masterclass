import { QuizQuestion } from "@/types";

export const allUnitQuizzes: Record<string, QuizQuestion[]> = {
  "unit-1": [
    {
      id: "u1-q-1",
      question: "Which file inside a folder in Next.js App Router exposes that folder as a public webpage route?",
      options: [
        { id: "a", text: "index.tsx", isCorrect: false, explanation: "index.tsx was used in legacy Pages Router, but App Router requires page.tsx." },
        { id: "b", text: "page.tsx", isCorrect: true, explanation: "Correct! Only folders containing a page.tsx file become publicly reachable routes." },
        { id: "c", text: "route.ts", isCorrect: false, explanation: "route.ts creates backend API endpoints, not UI pages." },
        { id: "d", text: "layout.tsx", isCorrect: false, explanation: "layout.tsx defines shared UI wrapper shells." },
      ],
      conceptualExplanation: "In Next.js App Router, `page.tsx` defines the unique UI for that route path.",
      syllabusTopic: "App Router Conventions",
    },
    {
      id: "u1-q-2",
      question: "Why should you use Next.js <Link> instead of standard HTML <a> tag?",
      options: [
        { id: "a", text: "It prevents full browser page reloads and automatically prefetches linked pages in the viewport", isCorrect: true, explanation: "Correct! <Link> intercepts clicks for SPA-speed transitions and preloads page chunks in background." },
        { id: "b", text: "HTML <a> tags are deprecated by W3C", isCorrect: false, explanation: "<a> tags are standard HTML." },
        { id: "c", text: "<Link> forces the browser to clear cookies", isCorrect: false, explanation: "No." },
        { id: "d", text: "<Link> only works on mobile devices", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "`next/link` provides instant client-side transitions and viewport prefetching.",
      syllabusTopic: "Navigation & Link",
    },
    {
      id: "u1-q-3",
      question: "What is the key difference between layout.tsx and template.tsx?",
      options: [
        { id: "a", text: "layout.tsx preserves component state across page changes, whereas template.tsx re-mounts on every route transition", isCorrect: true, explanation: "Correct! Layouts preserve state; templates instantiate a fresh DOM copy on navigation." },
        { id: "b", text: "template.tsx is only for CSS styling", isCorrect: false, explanation: "No." },
        { id: "c", text: "layout.tsx cannot contain buttons", isCorrect: false, explanation: "No." },
        { id: "d", text: "There is no difference", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "`layout.tsx` is for persistent navigation bars; `template.tsx` is for enter animations and resetting input state.",
      syllabusTopic: "Layouts vs Templates",
    },
  ],

  "unit-2": [
    {
      id: "u2-q-1",
      question: "Why are React Server Components (RSC) the default in Next.js App Router?",
      options: [
        { id: "a", text: "They send 0 KB of client JavaScript to the user's browser and can access databases directly", isCorrect: true, explanation: "Correct! Server Components execute on the server, producing fast HTML with zero client bundle impact." },
        { id: "b", text: "Because client components are illegal in JavaScript", isCorrect: false, explanation: "No." },
        { id: "c", text: "To disable HTML rendering", isCorrect: false, explanation: "No." },
        { id: "d", text: "Because React 19 removed the browser DOM", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "Server Components reduce client bundle size to zero for static and data-heavy components while providing direct secure database access.",
      syllabusTopic: "Server Components",
    },
    {
      id: "u2-q-2",
      question: "What does the directive 'use client' do at the top of a file?",
      options: [
        { id: "a", text: "It marks the component as a Client Component, allowing React hooks (useState, useEffect) and browser event listeners (onClick)", isCorrect: true, explanation: "Correct! 'use client' marks the boundary where React hydrates interactivity on the client." },
        { id: "b", text: "It makes the website run faster on the server", isCorrect: false, explanation: "Client components add client JS." },
        { id: "c", text: "It disables CSS styling", isCorrect: false, explanation: "No." },
        { id: "d", text: "It deletes the database", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "`'use client'` designates interactive client islands inside the Server Component tree.",
      syllabusTopic: "Client Components",
    },
    {
      id: "u2-q-3",
      question: "What is Incremental Static Regeneration (ISR)?",
      options: [
        { id: "a", text: "A method that serves cached static pages and periodically regenerates them in the background without rebuilding the entire site", isCorrect: true, explanation: "Correct! ISR provides static CDN speed with background revalidation." },
        { id: "b", text: "A tool that deletes your server every 60 seconds", isCorrect: false, explanation: "No." },
        { id: "c", text: "A client-side animation library", isCorrect: false, explanation: "No." },
        { id: "d", text: "A SQL query builder", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "ISR combines static page speed with background data updates (`next: { revalidate: 60 }`).",
      syllabusTopic: "Rendering Paradigms (ISR)",
    },
  ],

  "unit-3": [
    {
      id: "u3-q-1",
      question: "What is a Server Action in Next.js?",
      options: [
        { id: "a", text: "An asynchronous function marked with 'use server' that executes backend database logic directly when a form is submitted", isCorrect: true, explanation: "Correct! Server Actions act as type-safe RPCs connecting UI forms directly to server functions." },
        { id: "b", text: "A CSS animation keyframe", isCorrect: false, explanation: "No." },
        { id: "c", text: "A browser-only click sound effect", isCorrect: false, explanation: "No." },
        { id: "d", text: "A Node.js process killer", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "Server Actions allow mutating data without writing manual REST endpoints.",
      syllabusTopic: "Server Actions",
    },
    {
      id: "u3-q-2",
      question: "What does the React 19 useOptimistic hook do?",
      options: [
        { id: "a", text: "It updates the UI instantly in 0ms before the server responds, and automatically rolls back if the server fails", isCorrect: true, explanation: "Correct! useOptimistic provides instant perceived speed with automatic error recovery." },
        { id: "b", text: "It sends positive messages to students", isCorrect: false, explanation: "No." },
        { id: "c", text: "It doubles the server CPU clock speed", isCorrect: false, explanation: "No." },
        { id: "d", text: "It prevents forms from submitting", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "`useOptimistic` gives web apps the instantaneous feel of native mobile apps.",
      syllabusTopic: "Optimistic UI",
    },
  ],

  "unit-4": [
    {
      id: "u4-q-1",
      question: "Why should auth tokens be stored in httpOnly Cookies rather than localStorage in Next.js?",
      options: [
        { id: "a", text: "httpOnly cookies are immune to JavaScript XSS theft and can be read by Server Components and Middleware during SSR", isCorrect: true, explanation: "Correct! localStorage cannot be read by the server and is vulnerable to browser script theft." },
        { id: "b", text: "Because localStorage is banned in Europe", isCorrect: false, explanation: "No." },
        { id: "c", text: "To make the file download size smaller", isCorrect: false, explanation: "No." },
        { id: "d", text: "Because cookies are made of chocolate", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "`httpOnly` cookies provide security against XSS token theft and enable SSR authentication checks.",
      syllabusTopic: "Authentication Architecture",
    },
    {
      id: "u4-q-2",
      question: "What happens if an environment variable is NOT prefixed with NEXT_PUBLIC_?",
      options: [
        { id: "a", text: "It remains strictly on the server and is stripped from all client JavaScript bundles for security", isCorrect: true, explanation: "Correct! Server secrets (database passwords, private keys) are protected from browser exposure." },
        { id: "b", text: "It becomes visible to everyone on the internet", isCorrect: false, explanation: "NEXT_PUBLIC_ makes it public; no prefix keeps it private." },
        { id: "c", text: "The computer catches on fire", isCorrect: false, explanation: "No." },
        { id: "d", text: "Next.js refuses to build", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "Next.js enforces server-only variable isolation at compile time.",
      syllabusTopic: "Environment Variables",
    },
  ],

  "unit-5": [
    {
      id: "u5-q-1",
      question: "How does next/image prevent Cumulative Layout Shift (CLS)?",
      options: [
        { id: "a", text: "By requiring width and height (or fill) so the browser reserves exact DOM space before downloading the image", isCorrect: true, explanation: "Correct! Reserving aspect ratio space prevents the page layout from jumping." },
        { id: "b", text: "By turning images into text", isCorrect: false, explanation: "No." },
        { id: "c", text: "By deleting all images on mobile networks", isCorrect: false, explanation: "No." },
        { id: "d", text: "By blurring the entire website", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "Dimension reservation eliminates layout shifts during image loading.",
      syllabusTopic: "Image Optimization",
    },
  ],

  "unit-6": [
    {
      id: "u6-q-1",
      question: "What is an Intercepting Route in Next.js ((.)target)?",
      options: [
        { id: "a", text: "A convention that intercepts client-side navigation to display content in an overlay modal while preserving full standalone page rendering on direct visits", isCorrect: true, explanation: "Correct! Intercepting routes enable Instagram-style modal feeds with shareable URLs." },
        { id: "b", text: "A hacker attack that steals passwords", isCorrect: false, explanation: "No, it is a built-in Next.js UX feature." },
        { id: "c", text: "A tool that deletes 404 pages", isCorrect: false, explanation: "No." },
        { id: "d", text: "A CSS media query", isCorrect: false, explanation: "No." },
      ],
      conceptualExplanation: "Intercepting routes allow rich overlay modals with persistent shareable URLs and browser history support.",
      syllabusTopic: "Intercepting Routes",
    },
  ],
};
