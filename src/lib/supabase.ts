import { createClient } from "@supabase/supabase-js";

// Supabase is used strictly for fetching educational content, code examples, exercises, and quizzes.
// No authentication, user signup/signin, or user account sessions are used in this application.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock-supabase.example.com";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-anon-key";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://mock-supabase.example.com"
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Educational Mock Database schema for interactive Supabase sandbox and classroom exercises
 */
export interface MockDatabase {
  posts: Array<{ id: number; title: string; slug: string; content: string; views: number; created_at: string; category: string }>;
  students: Array<{ id: number; name: string; course: string; grade: string; email: string }>;
  products: Array<{ id: number; name: string; price: number; stock: number; category: string }>;
  todos: Array<{ id: number; title: string; completed: boolean; priority: "low" | "medium" | "high" }>;
}

export const initialMockDb: MockDatabase = {
  posts: [
    { id: 1, title: "Mastering Next.js 15 & 16 App Router", slug: "mastering-app-router", content: "Understanding Server Components and file-based routing.", views: 1420, created_at: "2026-08-01", category: "Routing" },
    { id: 2, title: "Server Actions vs Route Handlers", slug: "server-actions-vs-route-handlers", content: "When to mutate data with server actions vs API endpoints.", views: 980, created_at: "2026-08-05", category: "Backend" },
    { id: 3, title: "Next.js Caching Deep Dive", slug: "nextjs-caching-deep-dive", content: "Request memoization, Data cache, and revalidation strategies.", views: 2310, created_at: "2026-08-10", category: "Performance" },
  ],
  students: [
    { id: 101, name: "Aarav Sharma", course: "INT257 - Next.js Fullstack", grade: "A+", email: "aarav@example.com" },
    { id: 102, name: "Priya Patel", course: "INT257 - Next.js Fullstack", grade: "A", email: "priya@example.com" },
    { id: 103, name: "Rohan Gupta", course: "INT257 - Next.js Fullstack", grade: "B+", email: "rohan@example.com" },
    { id: 104, name: "Ananya Iyer", course: "INT257 - Next.js Fullstack", grade: "A+", email: "ananya@example.com" },
  ],
  products: [
    { id: 1, name: "Mechanical Keyboard 75%", price: 89.99, stock: 14, category: "Hardware" },
    { id: 2, name: "4K IPS Monitor 27-inch", price: 299.99, stock: 8, category: "Displays" },
    { id: 3, name: "Ergonomic Desk Chair", price: 199.50, stock: 5, category: "Furniture" },
  ],
  todos: [
    { id: 1, title: "Learn App Router folder conventions", completed: true, priority: "high" },
    { id: 2, title: "Build a Server Action for form submission", completed: false, priority: "high" },
    { id: 3, title: "Connect Supabase table with Next.js", completed: false, priority: "medium" },
    { id: 4, title: "Implement ISR with revalidateTag", completed: false, priority: "low" },
  ],
};
