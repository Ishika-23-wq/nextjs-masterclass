"use client";

import { useState } from "react";
import {
  KeyRound,
  Ticket,
  BookMarked,
  ShieldCheck,
  BadgeCheck,
  Crown,
  Stamp,
  Zap,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  Unlock,
  Sparkles,
} from "lucide-react";
import { WashiTape, StickerBadge, MildlinerText } from "@/components/ui/StudyStickers";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface AuthLevel {
  level: number;
  title: string;
  analogy: string;
  icon: any;
  color: "honey" | "matcha" | "sky" | "sakura" | "lavender";
  badge: string;
  tagline: string;
  diagram: {
    steps: Array<{
      actor: string;
      label: string;
      detail: string;
      icon: string;
      status: "success" | "danger" | "neutral" | "warning";
    }>;
    takeaway: string;
  };
  codeSnippet: string;
}

const authLevels: AuthLevel[] = [
  {
    level: 1,
    title: "Simple Login (If / Else)",
    analogy: "The Amnesiac Bouncer",
    icon: KeyRound,
    color: "sakura",
    badge: "The Memory Loss Flaw",
    tagline: "Checking passwords with if/else works for one second, then the browser forgets who you are!",
    diagram: {
      steps: [
        {
          actor: "User 👤",
          label: "Submit Password",
          detail: "Types password 'secret123' in login form",
          icon: "🔑",
          status: "neutral",
        },
        {
          actor: "Server ⚡",
          label: "if (password === 'secret123')",
          detail: "Matches credentials & returns 200 OK",
          icon: "✅",
          status: "success",
        },
        {
          actor: "Browser 🌐",
          label: "Clicks to /dashboard",
          detail: "Makes fresh HTTP GET request for next page",
          icon: "🧭",
          status: "neutral",
        },
        {
          actor: "HTTP Amnesia ❌",
          label: "Session Forgotten!",
          detail: "HTTP is stateless. Server has no memory of step 2!",
          icon: "🧠❌",
          status: "danger",
        },
      ],
      takeaway:
        "HTTP has no memory between requests. Without cookies or tokens, users must re-type their password on every single click!",
    },
    codeSnippet: `// ❌ Flawed Naive Approach:
if (password === "secret123") {
  // Allows user in once, but doesn't save any session!
  // Navigating to /profile will forget they ever logged in!
}`,
  },
  {
    level: 2,
    title: "Cookies as an ID Card",
    analogy: "Theme Park Wristband",
    icon: Ticket,
    color: "matcha",
    badge: "Native Browser ID",
    tagline: "A cookie is a waterproof wristband the browser wears and automatically shows on every ride!",
    diagram: {
      steps: [
        {
          actor: "Ticket Counter 🎟️",
          label: "Pay & Verify",
          detail: "User logs in with credentials",
          icon: "🎫",
          status: "neutral",
        },
        {
          actor: "Server Header ⚡",
          label: "Set-Cookie: id=wristband_42",
          detail: "Server fastens wristband on browser's arm",
          icon: "🏷️",
          status: "success",
        },
        {
          actor: "Browser Arm 🌐",
          label: "Carries Cookie Everywhere",
          detail: "Browser automatically attaches cookie on every request",
          icon: "💪",
          status: "success",
        },
        {
          actor: "Roller Coaster 🎢",
          label: "Instant VIP Entry",
          detail: "Server reads cookie header and opens page without asking for password again",
          icon: "✨",
          status: "success",
        },
      ],
      takeaway:
        "Cookies are stored by the browser and automatically sent in HTTP headers. The user never needs to re-login while moving from page to page.",
    },
    codeSnippet: `// Next.js Server Action / Route Handler:
import { cookies } from "next/headers";

export async function loginAction() {
  const cookieStore = await cookies();
  // Fasten wristband on browser arm (HttpOnly prevents JavaScript theft!)
  cookieStore.set("session_id", "wristband_42", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}`,
  },
  {
    level: 3,
    title: "Sessions & Storage",
    analogy: "The Office Master Register",
    icon: BookMarked,
    color: "honey",
    badge: "Server-Side Ledger",
    tagline: "The theme park office records wristband numbers in a master book. When you leave, they cross off your name!",
    diagram: {
      steps: [
        {
          actor: "Browser 🌐",
          label: "Presents Wristband #8491",
          detail: "Sends cookie header with session ID",
          icon: "🏷️",
          status: "neutral",
        },
        {
          actor: "Office Register 🏢",
          label: "Lookup in Database",
          detail: "SELECT * FROM sessions WHERE id = '8491'",
          icon: "📖",
          status: "neutral",
        },
        {
          actor: "Verification 🔍",
          label: "Record is Active: true",
          detail: "User is 'Rahul' (Student ID 2026)",
          icon: "✅",
          status: "success",
        },
        {
          actor: "Logout Button 🚪",
          label: "Cross Off Entry",
          detail: "DELETE FROM sessions: Session instantly killed on server!",
          icon: "🗑️",
          status: "warning",
        },
      ],
      takeaway:
        "A Session is the server's master record. Even if a user keeps their cookie, you can revoke access instantly from the database register.",
    },
    codeSnippet: `// Server Component verifies master register:
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  // Check master register
  const session = await db.sessions.findUnique({ where: { id: sessionId } });
  if (!session) redirect("/login");

  return <h1>Welcome back, {session.userName}!</h1>;
}`,
  },
  {
    level: 4,
    title: "Protected Routes & Guards",
    analogy: "The VIP Lounge Security Guard",
    icon: ShieldCheck,
    color: "sky",
    badge: "Server-Side Gatekeeping",
    tagline: "The security guard stops visitors at the VIP door and redirects unauthorized guests before they see a single room!",
    diagram: {
      steps: [
        {
          actor: "Visitor 👤",
          label: "Navigates to /dashboard",
          detail: "Requests private administrative screen",
          icon: "🚪",
          status: "neutral",
        },
        {
          actor: "Security Guard 💂",
          label: "Inspects Cookie on Server",
          detail: "Next.js runs check BEFORE transmitting any HTML",
          icon: "🛡️",
          status: "neutral",
        },
        {
          actor: "Guard Decision ⚖️",
          label: "Wristband Valid?",
          detail: "Does cookie contain an authenticated session?",
          icon: "❓",
          status: "warning",
        },
        {
          actor: "Result 🚀",
          label: "YES -> Render | NO -> redirect('/login')",
          detail: "Zero client-side flash. Private data never touches unauthenticated browsers!",
          icon: "🔒",
          status: "success",
        },
      ],
      takeaway:
        "In Next.js App Router, protected route checks run on the server. Unlike old client-side React, private HTML never flashes on screen.",
    },
    codeSnippet: `// src/app/dashboard/page.js (Protected Server Component)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Security guard check:
  if (!token) {
    redirect("/login"); // Instantly bounces intruder before HTML is built!
  }

  return <div>Top-Secret Admin Panel</div>;
}`,
  },
  {
    level: 5,
    title: "Authentication vs Authorization",
    analogy: "Student ID vs Lab Keycard Clearance",
    icon: BadgeCheck,
    color: "lavender",
    badge: "AuthN vs AuthZ",
    tagline: "Authentication asks 'Who are you?'. Authorization asks 'What are you allowed to touch?'.",
    diagram: {
      steps: [
        {
          actor: "Campus Gate 🏫",
          label: "Authentication (AuthN)",
          detail: "'Show your student ID card' -> Proves you are Rahul",
          icon: "🪪",
          status: "success",
        },
        {
          actor: "Identity Verified 👤",
          label: "Logged In as Rahul",
          detail: "Identity is 100% confirmed by college database",
          icon: "✅",
          status: "success",
        },
        {
          actor: "Lab Door 🔬",
          label: "Authorization (AuthZ)",
          detail: "'Swipe keycard' -> Rahul is allowed in Chemistry Lab",
          icon: "🔑",
          status: "success",
        },
        {
          actor: "Exam Vault 🛑",
          label: "Access Denied (403)",
          detail: "'Halt!' -> Rahul is NOT authorized in the Exam Paper Printing Room!",
          icon: "⛔",
          status: "danger",
        },
      ],
      takeaway:
        "Being logged in (AuthN) does not mean you have permission to edit everything (AuthZ). Always verify user permissions before performing actions.",
    },
    codeSnippet: `// AuthN: Confirms identity
const user = await getAuthenticatedUser(); // "Rahul"

// AuthZ: Confirms permissions
if (user.role !== "professor") {
  return Response.json({ error: "403 Forbidden: Only professors can edit grades" }, { status: 403 });
}`,
  },
  {
    level: 6,
    title: "Role-Based Access Control (RBAC)",
    analogy: "Admin vs Teacher vs Student",
    icon: Crown,
    color: "matcha",
    badge: "Permission Matrix",
    tagline: "Users are assigned distinct roles with specific superpowers and boundaries.",
    diagram: {
      steps: [
        {
          actor: "👑 Admin",
          label: "Full System Powers",
          detail: "Can delete courses, change roles, inspect server logs, and purge database",
          icon: "⚡",
          status: "success",
        },
        {
          actor: "👩‍🏫 Teacher",
          label: "Curriculum & Grades",
          detail: "Can publish quizzes, grade student submissions, and edit lesson content",
          icon: "📝",
          status: "success",
        },
        {
          actor: "🎓 Student",
          label: "Learning & Submissions",
          detail: "Can read lessons, submit assignments, and view own grades (Read-Only to others)",
          icon: "📖",
          status: "neutral",
        },
        {
          actor: "🛡️ Server Gate",
          label: "Strict Enforcement",
          detail: "Server checks user.role before every mutation or route render",
          icon: "🔒",
          status: "success",
        },
      ],
      takeaway:
        "RBAC groups permissions into clean roles. You check 'if (user.role === 'admin')' rather than manually checking every single user ID.",
    },
    codeSnippet: `// Pure JavaScript RBAC Check:
export function canDeleteCourse(user) {
  return user.role === "admin";
}

export function canGradeAssignment(user) {
  return user.role === "admin" || user.role === "teacher";
}`,
  },
  {
    level: 7,
    title: "JWT (JSON Web Token)",
    analogy: "The Royal Wax-Sealed Decree",
    icon: Stamp,
    color: "honey",
    badge: "Stateless Cryptography",
    tagline: "A tamper-proof digital ticket stamped with a secret royal wax seal. If someone alters it, the seal shatters!",
    diagram: {
      steps: [
        {
          actor: "Header (Red) 🔴",
          label: "Algorithm Type",
          detail: "{ 'alg': 'HS256', 'typ': 'JWT' }",
          icon: "📋",
          status: "neutral",
        },
        {
          actor: "Payload (Purple) 🟣",
          label: "User Claims",
          detail: "{ 'id': 101, 'name': 'Rahul', 'role': 'student' }",
          icon: "📦",
          status: "neutral",
        },
        {
          actor: "Wax Seal (Amber) 🔏",
          label: "Cryptographic Signature",
          detail: "HMACSHA256(header + payload, SERVER_SECRET)",
          icon: "🛡️",
          status: "success",
        },
        {
          actor: "Tamper Test ⚠️",
          label: "Hacker changes 'student' -> 'admin'",
          detail: "Wax seal no longer matches! Server rejects token instantly!",
          icon: "💥",
          status: "danger",
        },
      ],
      takeaway:
        "JWTs allow servers to verify user identity without querying a database on every request. The cryptographic signature guarantees the ticket was not forged.",
    },
    codeSnippet: `// Structure of a JWT Token:
// eyJhbGciOi... (Header: metadata)
// .eyJzdWIiOi... (Payload: user data)
// .SflKxwRJS... (Signature: cryptographic wax seal)

// If someone alters 1 character in the payload,
// jwt.verify() throws an error and rejects the request!`,
  },
  {
    level: 8,
    title: "Auth.js / NextAuth",
    analogy: "The Turnkey Security Fleet",
    icon: Zap,
    color: "sky",
    badge: "Production Ready",
    tagline: "A battle-tested pure JS library handling Google login, GitHub OAuth, password hashing, and sessions with zero stress!",
    diagram: {
      steps: [
        {
          actor: "User 👤",
          label: "Clicks 'Sign in with GitHub'",
          detail: "Redirects to GitHub's secure authorization screen",
          icon: "🌐",
          status: "neutral",
        },
        {
          actor: "GitHub OAuth 🐙",
          label: "User Grants Access",
          detail: "GitHub returns signed profile code to your callback URL",
          icon: "🔑",
          status: "success",
        },
        {
          actor: "Auth.js Engine ⚡",
          label: "Exchanges Code for Session",
          detail: "Signs secure HttpOnly cookie and saves session",
          icon: "⚙️",
          status: "success",
        },
        {
          actor: "App Router 🚀",
          label: "const session = await auth()",
          detail: "Access user profile anywhere in 1 line of pure JavaScript!",
          icon: "🎉",
          status: "success",
        },
      ],
      takeaway:
        "Auth.js handles encryption, OAuth tokens, and cookie rotation automatically so you don't have to build security infrastructure from scratch.",
    },
    codeSnippet: `// 1-Line Authentication in Next.js Server Component:
import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return <div>Welcome, {session.user.name}!</div>;
}`,
  },
];

export function AuthVisualRoadmap() {
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
  const current = authLevels[selectedLevelIndex];
  const IconComponent = current.icon;

  return (
    <div className="relative rounded-3xl border border-[#bfe0c6] bg-white p-6 sm:p-7 space-y-6 shadow-2xs hover:shadow-sm transition-shadow overflow-hidden">
      <WashiTape color="matcha" width="w-36" tilt="-rotate-1" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8e2d8] pb-4 pt-1">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-2xl bg-[#edf6ee] text-[#2e5939] flex items-center justify-center text-lg border border-[#bfe0c6] shadow-2xs">
            🗺️
          </span>
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2e5939] flex items-center gap-1.5">
              <span>🛡️</span> Interactive Security Blueprint
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Authentication in 8 Visual Levels: <span className="mildliner-green">Interactive Flowchart</span>
            </h2>
          </div>
        </div>
        <StickerBadge emoji="✨" label="Visual Diagrams" color="matcha" size="sm" tilt="rotate-1" />
      </div>

      {/* Level Selection Pill Bar */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-stone-500 font-bold flex items-center gap-1">
          <span>👆</span> Select a Level to View Its Visual Flowchart &amp; Diagram:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {authLevels.map((lvl, idx) => {
            const isSelected = selectedLevelIndex === idx;
            const LvlIcon = lvl.icon;

            return (
              <button
                key={lvl.level}
                onClick={() => setSelectedLevelIndex(idx)}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 group active:scale-95 ${
                  isSelected
                    ? "bg-[#2e5939] border-[#2e5939] text-white shadow-xs scale-[1.02]"
                    : "bg-[#FAF8F5] border-[#e8e2d8] text-stone-700 hover:bg-[#edf6ee] hover:border-[#bfe0c6]"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                    isSelected ? "bg-white/20 text-white" : "bg-white text-stone-700 border border-[#e5ded4]"
                  }`}
                >
                  L{lvl.level}
                </div>
                <span className="text-[11px] font-bold truncate max-w-full leading-tight">
                  {lvl.title.split("(")[0].trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Level Visual Presentation Card */}
      <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#e5ded4] space-y-6 animate-fadeIn">
        {/* Level Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5ded4] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#e2dcd2] text-[#2e5939] flex items-center justify-center shadow-2xs">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#edf6ee] text-[#2e5939] border border-[#bfe0c6]">
                  Level {current.level} of 8
                </span>
                <span className="text-xs font-mono font-bold text-stone-500">
                  Analogy: {current.analogy}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
                {current.title}
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white border border-[#dfd7cc] text-[#7a5005] font-bold shadow-2xs">
            🏷️ {current.badge}
          </span>
        </div>

        {/* Tagline Box */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#e5ded4] text-xs sm:text-sm text-stone-800 font-sans font-medium flex items-center gap-2 shadow-2xs">
          <span className="text-lg shrink-0">💡</span>
          <span>{current.tagline}</span>
        </div>

        {/* VISUAL FLOWCHART / DIAGRAM NODES */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-stone-700 flex items-center gap-1.5">
              <span>🗺️</span> Visual Step-by-Step Flowchart:
            </span>
            <span className="text-[11px] font-mono text-stone-500">
              Left to Right Request Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {current.diagram.steps.map((st, sIdx) => (
              <div
                key={sIdx}
                className={`p-4 rounded-2xl border space-y-2 relative transition-all shadow-2xs ${
                  st.status === "danger"
                    ? "bg-[#fdf0f4] border-[#f7c2d1] text-[#8a2d48]"
                    : st.status === "warning"
                    ? "bg-[#fef9e8] border-[#fce29d] text-[#7a5005]"
                    : st.status === "success"
                    ? "bg-[#edf6ee] border-[#bfe0c6] text-[#2e5939]"
                    : "bg-white border-[#e5ded4] text-stone-800"
                }`}
              >
                {/* Step Connector Arrow Indicator */}
                {sIdx < current.diagram.steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-[#ded7cb] items-center justify-center text-[10px] text-stone-500 z-10 shadow-2xs">
                    ➔
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold">{st.actor}</span>
                  <span className="text-base">{st.icon}</span>
                </div>

                <div className="font-bold text-xs sm:text-sm leading-snug">
                  {st.label}
                </div>

                <p className="text-[11px] opacity-90 leading-relaxed font-sans">
                  {st.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Takeaway Banner */}
        <div className="p-4 rounded-2xl bg-white border border-[#bfe0c6] space-y-1 text-xs shadow-2xs">
          <div className="font-mono font-bold text-[#2e5939] flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#2e5939]" />
            <span>Why This Architecture Works:</span>
          </div>
          <p className="text-stone-700 leading-relaxed font-sans pl-5">
            {current.diagram.takeaway}
          </p>
        </div>

        {/* Code Snippet in Warm Aesthetic Stationery */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase text-stone-600 font-bold flex items-center gap-1.5">
            <span>💻</span> Pure JavaScript Implementation Pattern:
          </span>
          <CodeBlock
            code={current.codeSnippet}
            language="javascript"
            filename={`level-${current.level}-auth.js`}
            showLineNumbers={false}
          />
        </div>
      </div>
    </div>
  );
}
