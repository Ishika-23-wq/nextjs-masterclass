import { TopicContent } from "@/types";

export const unit6Topics: TopicContent[] = [
  {
    id: "parallel-and-intercepting-routes",
    unitId: "unit-6",
    title: "Parallel Routes & Intercepting Routes (@slots, (.)modals)",
    shortSummary: "ADVANCED TOPIC: Learn parallel routes using the Split-Screen TV analogy (@slots), default.js fallbacks, and Instagram-style photo popups with (.)modals.",
    order: 1,
    tags: ["Parallel Routes", "Intercepting Routes", "Slots", "Modal Feeds", "default.js", "Advanced"],

    simpleExplanation:
      "*(Note to students: This is an ADVANCED topic! Make sure you are comfortable with Units 1-4 before exploring this!)*\n\n" +
      "Imagine two cool features:\n\n" +
      "1. **Parallel Routes (@slots) - The Split-Screen TV**:\n" +
      "Imagine watching TV with Picture-in-Picture mode: the left side of the screen shows the soccer match (`@team`), and the right side shows live scores (`@analytics`). Both screens update independently inside the same living room (`layout.js`)! In Next.js, folders prefixed with `@` (like `@analytics` and `@team`) become parallel slots passed into your layout props!\n\n" +
      "2. **What is default.js? (The Fallback TV Standby Screen)**:\n" +
      "If a user refreshes their browser while browsing a sub-route on one side of the split screen, Next.js needs to know what to display on the other side! A `default.js` file is the standby screen that displays whenever Next.js cannot match that slot.\n\n" +
      "3. **Intercepting Routes ((.)photo) - The Instagram Photo Popup**:\n" +
      "When you browse Instagram and tap a photo in your feed, what happens?\n" +
      "- A popup modal opens over your feed without leaving the feed! (The URL changes to `/photo/123`, but your feed stays in the background).\n" +
      "- But if you copy that link and paste it into a brand new browser tab, it opens as a FULL standalone page!\n" +
      "- Next.js creates this with **Intercepting Routes** using folder notation like `(.)photo`!",

    whyNeeded:
      "Complex SaaS dashboards need multiple independent loading states on one screen without messy iframe hacks. Social apps and e-commerce stores need contextual modals that preserve the user's scroll position while still having shareable, bookmarkable URLs.",

    reactVsNext: {
      concept: "Split-Screen & Modal Routing",
      reactWay: {
        title: "State-Driven Modal Overlays",
        code: `// Traditional client-side approach:
function Feed() {
  const [activePhoto, setActivePhoto] = useState(null);
  // ⚠️ If the user copies the URL, modal state is lost!
  // If the user presses the browser 'Back' button, they leave the website!
  return (
    <div>
      <PhotoGrid onSelect={id => setActivePhoto(id)} />
      {activePhoto && <PhotoModal id={activePhoto} />}
    </div>
  );
}`,
        explanation:
          "State-driven modals do not update the browser URL bar cleanly, breaking back/forward browser history and shareable URLs.",
        drawbacks: [
          "Browser 'Back' button navigates away from the entire website instead of closing the modal",
          "Hard to share direct URLs with friends",
          "No independent parallel slot rendering",
        ],
      },
      nextjsWay: {
        title: "Next.js Parallel & Intercepting Routes (@slots & (.)modals)",
        code: `// 1. Parallel Slots in layout.js:
export default function DashboardLayout({ children, analytics, team }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>{children}</div>
      <div>{analytics}</div>
      <div>{team}</div>
    </div>
  );
}

// 2. Intercepting Route folder structure:
// app/feed/layout.js
// app/feed/@modal/(.)photo/[id]/page.js   <- Intercepts client clicks to show Modal!
// app/feed/photo/[id]/page.js             <- Full standalone page on direct URL visit or refresh!`,
        explanation:
          "Next.js handles URL history, modal presentation, and standalone page fallbacks natively through folder conventions.",
        benefits: [
          "Browser 'Back' button smoothly closes the modal",
          "URL can be shared or refreshed directly into a standalone page",
          "Independent streaming and loading states for parallel dashboard widgets",
        ],
      },
      whyDifferent:
        "Next.js connects modal dialogs and split layouts directly to the browser history and URL router.",
      mentalShiftSummary:
        "Folder `@slotName` creates a parallel slot prop in layout.js. Folder `(.)target` intercepts client transitions to that route.",
    },

    basicExample: {
      title: "Split-Screen Dashboard with Parallel Slots in Plain JavaScript",
      description: "A dashboard layout rendering children alongside parallel @analytics and @team slots.",
      language: "jsx",
      filename: "src/app/dashboard/layout.js",
      code: `// src/app/dashboard/layout.js
// Next.js automatically injects folders named @analytics and @team as props:
export default function DashboardLayout({ children, analytics, team }) {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <header className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-100">University Portal Dashboard</h1>
        <span className="text-xs font-mono text-amber-400">⚡ Advanced: Parallel Routes Architecture</span>
      </header>

      {/* Main children content */}
      <main className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
        {children}
      </main>

      {/* Parallel independent slots side-by-side: */}
      <div className="grid gap-6 sm:grid-cols-2">
        <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
            Real-Time Analytics
          </h2>
          {analytics}
        </section>

        <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
            Active Study Groups
          </h2>
          {team}
        </section>
      </div>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 3: export default function DashboardLayout({ children, analytics, team }) receives @analytics and @team folders as normal JavaScript props!\n- Line 12-14: Renders the standard page.js children content.\n- Line 17-31: Renders the two parallel slots in a 2-column grid. Each slot can have its own loading.js and error.js without affecting the other slot!\n\nWhat happens in the browser?\n1. The visitor opens /dashboard.\n2. Next.js renders the main children, the analytics slot, and the team slot simultaneously.\n3. If the team data is slow, only the team slot shows a loading spinner while the rest of the dashboard is fully interactive!",
      outputPreview: "A dashboard split into main content on top and two parallel widget slots below.",
    },

    moreExamples: [
      {
        title: "Standby Fallback Screen (default.js) in Plain JavaScript",
        description: "The fallback component rendered when Next.js cannot match a parallel slot on hard reload.",
        language: "jsx",
        filename: "src/app/dashboard/@analytics/default.js",
        code: `// src/app/dashboard/@analytics/default.js
// Rendered when visiting unmatched sub-routes on full page reload:
export default function AnalyticsDefault() {
  return (
    <div className="p-4 bg-zinc-950 rounded-xl text-xs text-zinc-500">
      Select an analytical report from the menu above.
    </div>
  );
}`,
        explanation:
          "Always create a default.js file inside every parallel `@slot` folder to prevent Next.js 404 errors during direct browser reloads.",
      },
    ],

    multipleWays: [
      {
        name: "Parallel Routes (@slots)",
        syntax: "src/app/dashboard/@analytics/page.js",
        codeSnippet: "export default function Layout({ children, slotA, slotB }) { return <div>{slotA}{slotB}</div>; }",
        howItWorks: "Independent slot components rendered concurrently inside a single parent layout.",
        pros: ["Independent streaming and error boundaries", "No state reset during navigation"],
        cons: ["Requires default.js for unmatched slots on hard reload"],
        whenToUse: "Split dashboards, multi-pane editors, side-by-side tabs.",
        isRecommended: true,
      },
      {
        name: "Intercepting Routes ((.)modals)",
        syntax: "src/app/@modal/(.)login/page.js",
        codeSnippet: "// (.)photo/[id]/page.js matches /photo/[id] on same level",
        howItWorks: "Intercepts client-side link transitions to display an overlay while keeping context.",
        pros: ["Shareable modal URLs", "Back button closes modal smoothly"],
        cons: ["More folder conventions to memorize ((.), (..), (..)(..), (...))"],
        whenToUse: "Photo galleries, login modals, shopping cart drawers.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use Parallel Routes (@slots) when multiple independent panels live on one dashboard. Use Intercepting Routes ((.)modal) for Instagram-style popup modals.",
      scenarios: [
        {
          scenario: "Photo gallery where clicking a photo opens an overlay, but refreshing opens a full page",
          recommendedApproach: "Intercepting route `src/app/feed/@modal/(.)photo/[id]/page.js`",
          reason: "Enables modal presentation during client navigation and standalone page presentation on direct URL entry.",
        },
        {
          scenario: "University analytics dashboard with 3 independent data feeds",
          recommendedApproach: "Parallel routes with @metrics, @logs, @traffic",
          reason: "Each panel streams independently with its own loading skeleton.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Forgetting to create default.js in parallel route slots",
        badCode: `// ❌ BAD: Missing default.js in @analytics slot
src/app/dashboard/@analytics/page.js (no default.js exists)`,
        goodCode: `// ✅ GOOD: Always add src/app/dashboard/@analytics/default.js
export default function Default() { return null; }`,
        whyItBreaks: "When a user refreshes their browser on a subpage like /dashboard/settings, Next.js throws a 404 because it has no fallback component for @analytics.",
        howToFix: "Always create a `default.js` file inside every parallel `@slot` folder.",
      },
    ],

    bestPractices: [
      {
        title: "Provide default.js in Every Slot",
        rule: "Always add a default.js file returning fallback UI or null inside all @slot folders.",
        explanation: "This prevents unexpected 404 errors during full browser page reloads.",
      },
    ],

    exercises: [
      {
        id: "u6-ex-1",
        title: "Create a Multi-Slot Dashboard Layout",
        difficulty: "medium",
        estimatedMinutes: 8,
        prompt:
          "Write a `DashboardLayout` component for `src/app/dashboard/layout.js` in plain JavaScript that accepts `children`, `stats`, and `activity` slots and arranges them in a responsive layout.",
        initialCode: `// src/app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  // TODO: Accept stats and activity slots
  return <div>{children}</div>;
}`,
        expectedOutput: "A layout component rendering children, stats, and activity slots.",
        hints: ["Destructure `{ children, stats, activity }` from props"],
        solutionCode: `// src/app/dashboard/layout.js
export default function DashboardLayout({ children, stats, activity }) {
  return (
    <div className="space-y-6">
      {children}
      <div className="grid grid-cols-2 gap-4">
        <div>{stats}</div>
        <div>{activity}</div>
      </div>
    </div>
  );
}`,
        solutionExplanation: "Parallel slots are delivered as props matching the folder names (@stats -> stats, @activity -> activity).",
      },
    ],

    quizzes: [
      {
        id: "u6-q1",
        syllabusTopic: "Parallel Routes default.js",
        question: "What is the purpose of default.js in Next.js Parallel Routes?",
        conceptualExplanation: "During full page reloads, Next.js renders default.js for parallel slots that do not have an active route match for the current URL.",
        options: [
          { id: "a", text: "It resets the user's password", isCorrect: false, explanation: "No." },
          { id: "b", text: "It serves as a fallback UI for a parallel slot when Next.js cannot recover the slot state during a hard page refresh", isCorrect: true, explanation: "Correct! default.js provides the fallback component for unmatched slots on direct page loads." },
          { id: "c", text: "It converts JavaScript into CSS", isCorrect: false, explanation: "No." },
          { id: "d", text: "It only works on Android", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Photo Sharing Social App",
      description: "How Instagram-style feeds render photo modals over feeds without discarding feed scroll position.",
      code: {
        title: "Photo Modal Intercepting Component",
        description: "Modal overlay intercepting photo route in plain JavaScript.",
        language: "jsx",
        filename: "src/app/@modal/(.)photo/[id]/page.js",
        code: `// src/app/@modal/(.)photo/[id]/page.js
export default async function PhotoModal({ params }) {
  const { id } = await params;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 p-6 rounded-2xl max-w-lg w-full space-y-3">
        <h2 className="text-xl font-bold">Photo #{id}</h2>
        <p className="text-zinc-400 text-sm">Modal overlay preserving background feed scroll!</p>
      </div>
    </div>
  );
}`,
      },
      keyTakeaway: "Intercepting routes enable modal overlays that maintain browser history and shareable URLs.",
    },

    combinedExample: {
      combinedTopics: ["Parallel Routes", "Intercepting Routes", "Modals"],
      title: "Complete Modal Feed Architecture",
      description: "Folder hierarchy demonstrating parallel slots and modal interception.",
      code: {
        title: "Modal Feed Folder Tree",
        description: "Folder structure in plain text.",
        language: "bash",
        filename: "FolderStructure",
        code: `src/app/feed/
├── layout.js                # Defines { children, modal } props
├── page.js                  # Main feed list of photos
├── photo/[id]/page.js       # Standalone photo page (direct URL / refresh)
└── @modal/
    ├── default.js           # Returns null when modal is closed
    └── (.)photo/[id]/page.js # Renders modal overlay on client link click`,
      },
      stepByStepFlow: [
        "User scrolls photo feed at /feed",
        "Clicks link to /feed/photo/5",
        "Next.js intercepts click and renders @modal/(.)photo/[id]/page.js as an overlay",
        "URL updates to /feed/photo/5 with zero background scroll reset",
        "Pressing browser 'Back' closes the modal smoothly",
      ],
    },
  },

  {
    id: "middleware-proxy-edge",
    unitId: "unit-6",
    title: "Middleware, Edge Runtime & Reverse Proxy",
    shortSummary: "ADVANCED TOPIC: Master middleware using the Security Gate analogy: intercept requests in 1ms at the edge, handle redirects, and use rewrite() proxying.",
    order: 2,
    tags: ["Middleware", "Edge", "rewrite()", "redirect()", "Security", "Advanced"],

    simpleExplanation:
      "*(Note to students: This is an ADVANCED topic!)*\n\n" +
      "Imagine the security booth at the entrance of a university campus:\n\n" +
      "1. **The Campus Security Gate (middleware.js)**:\n" +
      "Before any car drives onto campus to reach the classrooms or dining hall, it MUST stop at the entrance guard booth. The security officer checks your badge in **1 millisecond**! In Next.js, `middleware.js` is that gatekeeper. It runs BEFORE every single incoming request reaches your pages or APIs!\n\n" +
      "2. **redirect() vs rewrite() (The Important Difference!)**:\n" +
      "- **redirect() (Turn your car around!)**: The guard says: 'You are at the wrong gate! Drive over to Gate B.' Your car physically moves, and your phone's GPS address changes to `/login`. (HTTP 307 redirect, browser URL changes!).\n" +
      "- **rewrite() (The Secret Tunnel / Proxy)**: The guard says: 'Stay right there.' Behind the scenes, the guard brings the package from Building B and hands it to you while your car stays parked at Gate A! The browser's URL bar **NEVER changes**, but the server serves content from another location!\n\n" +
      "3. **What is the Edge Runtime?**\n" +
      "Standard servers live in one physical city (like Mumbai or Virginia). The **Edge Runtime** runs lightweight JavaScript on hundreds of mini-servers spread across the globe right next to where the user lives, providing near 0ms latency!",

    whyNeeded:
      "Middleware allows you to enforce authentication, inspect user geo-location, perform A/B test experiments, rewrite paths for multi-tenant SaaS subdomains, and block malicious bots globally before touching your database.",

    reactVsNext: {
      concept: "Global Request Interception",
      reactWay: {
        title: "Client-Side Route Redirection",
        code: `// Traditional client-side approach:
// There is NO middleware! The browser must download the whole page
// before JavaScript can check anything:
useEffect(() => {
  if (!user) navigate("/login"); // ⚠️ Page already downloaded and parsed!
}, []);`,
        explanation:
          "Client-side routing has no concept of a pre-flight request interceptor. Requests always reach the client before any code can run.",
        drawbacks: [
          "Zero ability to modify HTTP headers or cookies before response",
          "Cannot perform server-side reverse proxying",
          "Cannot intercept requests based on IP location or bot signatures",
        ],
      },
      nextjsWay: {
        title: "Next.js Edge Middleware (middleware.js)",
        code: `// middleware.js (Root of your project - Pure JavaScript!)
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  // 1. Guard check:
  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Add custom security header to all responses:
  const response = NextResponse.next();
  response.headers.set("X-Security-Gate", "Passed");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};`,
        explanation:
          "A single `middleware.js` file at the root of your project intercepts all matched routes globally in under 2 milliseconds.",
        benefits: [
          "Global protection with clean URL pattern matchers",
          "Blazing fast Edge execution (under 2ms TTFB)",
          "Inspects cookies, rewrites URLs, and sets custom headers seamlessly",
        ],
      },
      whyDifferent:
        "Next.js middleware runs on edge servers before routing resolution, acting as a programmable reverse proxy.",
      mentalShiftSummary:
        "Use `middleware.js` for fast global gatekeeping (auth redirects, geo-blocking, reverse proxying). Keep business logic in Server Actions.",
    },

    basicExample: {
      title: "Global Authentication Guard Middleware in Plain JavaScript",
      description: "Intercepting /admin and /dashboard routes globally to enforce authentication.",
      language: "javascript",
      filename: "middleware.js",
      code: `// middleware.js (Pure JavaScript!)
import { NextResponse } from "next/server";

export function middleware(request) {
  // Read session cookie:
  const sessionToken = request.cookies.get("auth_session")?.value;
  const { pathname } = request.nextUrl;

  // If unauthenticated and visiting a protected route:
  if (!sessionToken && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    // Redirect to login page:
    const loginUrl = new URL("/login", request.url);
    // Preserve where they were trying to go:
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request to proceed:
  return NextResponse.next();
}

// Only run middleware on dashboard, admin, and api routes:
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};`,
      explanation:
        "Line-by-line explanation:\n- Line 2: import { NextResponse } from 'next/server'; imports Next.js response helper tools.\n- Line 4: export function middleware(request) is the magic function that runs before incoming requests.\n- Line 6: request.cookies.get(...) reads the student's cookie wristband in 1 millisecond.\n- Line 10-16: If no cookie exists and the user is trying to enter /dashboard, the guard turns the car around with NextResponse.redirect(loginUrl).\n- Line 19: NextResponse.next() tells Next.js: 'All clear! Let them through to their page.'\n- Line 23-25: export const config = { matcher: [...] } restricts this check to only /dashboard and /admin routes so public images and CSS load instantly with zero delay!\n\nWhat happens in the browser?\n1. A logged-out user tries to access /dashboard/grades.\n2. Before the dashboard server component is even loaded, middleware.js intercepts the request at the edge.\n3. The user is redirected to /login?from=/dashboard/grades in under 2ms!\n4. Zero private HTML was generated or leaked!",
      outputPreview: "Unauthenticated visits to /dashboard immediately redirect to /login with URL callback parameter.",
    },

    moreExamples: [
      {
        title: "Reverse Proxy with NextResponse.rewrite() in Plain JavaScript",
        description: "Serving content from another internal route while keeping the user's browser URL intact.",
        language: "javascript",
        filename: "middleware.js",
        code: `// middleware.js (Pure JavaScript!)
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Multi-tenant subdomain rewrite:
  // If user visits /university, silently serve /campus/main without changing URL!
  if (pathname === "/university") {
    return NextResponse.rewrite(new URL("/campus/main", request.url));
  }

  return NextResponse.next();
}`,
        explanation:
          "Unlike `redirect()`, which changes the browser address bar, `rewrite()` keeps the URL unchanged while quietly serving HTML from another path behind the scenes.",
      },
    ],

    multipleWays: [
      {
        name: "NextResponse.redirect() (URL Changes)",
        syntax: "NextResponse.redirect(new URL('/login', req.url))",
        codeSnippet: "return NextResponse.redirect(new URL('/login', request.url));",
        howItWorks: "Sends an HTTP 307 or 308 redirect status to the browser.",
        pros: ["Browser address bar updates", "User clearly sees the new URL destination"],
        cons: ["Forces the browser to initiate a new network roundtrip"],
        whenToUse: "Unauthorized login redirects, permanent URL migrations.",
        isRecommended: true,
      },
      {
        name: "NextResponse.rewrite() (URL Stays Same)",
        syntax: "NextResponse.rewrite(new URL('/target', req.url))",
        codeSnippet: "return NextResponse.rewrite(new URL('/internal/feed', request.url));",
        howItWorks: "Acts as a reverse proxy: serves another route's content without updating the browser URL.",
        pros: ["Keeps clean, custom URLs", "Great for multi-tenant SaaS subdomains and A/B tests"],
        cons: ["Can be harder to debug if you lose track of internal paths"],
        whenToUse: "Custom domain mapping, multi-tenant subdomains, A/B testing variants.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use redirect() when the user should see their URL change (like navigating to /login). Use rewrite() when serving subdomains or internal proxy paths without changing the browser URL.",
      scenarios: [
        {
          scenario: "Logged-out visitor trying to access account billing",
          recommendedApproach: "NextResponse.redirect(new URL('/login', req.url))",
          reason: "User needs to know they are on the login screen.",
        },
        {
          scenario: "Serving university subdomains: student.portal.com vs admin.portal.com",
          recommendedApproach: "NextResponse.rewrite() based on hostname header",
          reason: "Keeps the clean custom domain in the browser address bar.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Running heavy database queries or Node.js fs modules inside middleware.js",
        badCode: `// ❌ BAD: Trying to query Prisma or read filesystem inside middleware.js
import { db } from "@/lib/db";
export async function middleware() {
  const user = await db.user.findFirst(); // 💥 Error: Edge runtime does not support TCP sockets!
}`,
        goodCode: `// ✅ GOOD: Keep middleware lightweight; inspect cookies and headers only
export function middleware(request) {
  const token = request.cookies.get("session");
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
}`,
        whyItBreaks: "Middleware runs on the lightweight Edge runtime, which lacks Node.js filesystem modules and heavy database connection drivers.",
        howToFix: "Only inspect cookies, headers, and URL paths in middleware. Run heavy database queries inside Server Components or Server Actions.",
      },
    ],

    bestPractices: [
      {
        title: "Always Use Explicit Matchers",
        rule: "Configure export const config = { matcher: [...] } to exclude static assets, favicon, and public images.",
        explanation: "This avoids wasting edge execution compute on static image files.",
      },
    ],

    exercises: [
      {
        id: "u6-ex-2",
        title: "Build a Custom Header Middleware",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a middleware function in middleware.js in plain JavaScript that adds a custom response header 'X-Campus-Region': 'Asia-South' to every request using `NextResponse.next()`.",
        initialCode: `// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // TODO: Add custom response header
  return NextResponse.next();
}`,
        expectedOutput: "Middleware adding a custom header to all outgoing responses.",
        hints: ["Create `const res = NextResponse.next();` and call `res.headers.set(...)`"],
        solutionCode: `// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();
  response.headers.set("X-Campus-Region", "Asia-South");
  return response;
}`,
        solutionExplanation: "NextResponse.next() continues request execution while allowing response header injection.",
      },
    ],

    quizzes: [
      {
        id: "u6-q2",
        syllabusTopic: "Middleware & Reverse Proxy",
        question: "What is the key difference between NextResponse.rewrite() and NextResponse.redirect()?",
        conceptualExplanation: "rewrite() serves alternate content internally without modifying the browser URL (reverse proxy), whereas redirect() sends an HTTP redirect that changes the browser URL.",
        options: [
          { id: "a", text: "rewrite() changes the rendered content internally without modifying the browser URL; redirect() instructs the browser to navigate to a new URL", isCorrect: true, explanation: "Correct! rewrite is a reverse proxy (URL stays same); redirect sends a 307/308 status (URL changes)." },
          { id: "b", text: "rewrite() is only for CSS files", isCorrect: false, explanation: "No." },
          { id: "c", text: "redirect() deletes the user's cookies", isCorrect: false, explanation: "No." },
          { id: "d", text: "They are 100% identical", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Global SaaS Subdomain Multi-Tenancy",
      description: "How platforms like Notion or Slack route custom team subdomains to appropriate accounts.",
      code: {
        title: "Subdomain Tenant Router",
        description: "Middleware routing subdomains to tenant folders in plain JavaScript.",
        language: "javascript",
        filename: "middleware.js",
        code: `import { NextResponse } from "next/server";

export function middleware(request) {
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // If visiting student.domain.com, rewrite to /tenants/student:
  if (subdomain && subdomain !== "www") {
    return NextResponse.rewrite(new URL(\`/tenants/\${subdomain}\`, request.url));
  }

  return NextResponse.next();
}`,
      },
      keyTakeaway: "Reverse proxy rewrites enable clean multi-tenant architectures without managing hundreds of individual DNS server records.",
    },

    combinedExample: {
      combinedTopics: ["Middleware", "Authentication", "Edge"],
      title: "Edge Security Gate with Route Filtering",
      description: "A complete production middleware securing /admin routes.",
      code: {
        title: "Production Gatekeeper",
        description: "Edge authentication check with matcher configuration.",
        language: "javascript",
        filename: "middleware.js",
        code: `import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth_token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};`,
      },
      stepByStepFlow: [
        "Incoming HTTP request hits Cloudflare / Vercel Edge node",
        "middleware.js executes in 1ms",
        "Checks for presence of auth_token cookie",
        "If missing, immediately redirects to /login",
      ],
    },
  },

  {
    id: "i18n-and-architecture",
    unitId: "unit-6",
    title: "Internationalization (i18n) & Feature Architecture",
    shortSummary: "ADVANCED TOPIC: Learn multi-language routing with dictionaries (/[lang]/page.js) and clean, scalable feature folder architecture in plain JavaScript.",
    order: 3,
    tags: ["i18n", "Localization", "Architecture", "Dictionaries", "Feature Folders", "Advanced"],

    simpleExplanation:
      "*(Note to students: This is an ADVANCED topic!)*\n\n" +
      "Imagine visiting an international airport:\n\n" +
      "1. **The Multilingual Tour Guide (i18n Dictionaries)**:\n" +
      "When travelers arrive from different countries, the airport doesn't rebuild the entire building for each language! The airport simply has signboards with translation dictionaries: English (\`en\`), Spanish (\`es\`), and Hindi (\`hi\`). In Next.js, we put our pages in an \`app/[lang]/\` folder! The server reads simple JSON dictionary files (\`en.json\`, \`hi.json\`) and renders the page in the visitor's preferred language with 0 KB client bundle penalty!\n\n" +
      "2. **Scalable Feature-Driven Architecture**:\n" +
      "When a project grows to 100+ files, dumping all components into one giant \`components/\` folder is like throwing all your clothes into one messy laundry pile! Instead, we organize code by **Features**:\n" +
      "  \`src/features/courses/\` (components, actions, hooks for courses)\n" +
      "  \`src/features/students/\` (components, actions, hooks for students)\n" +
      "  \`src/features/auth/\` (components, actions, hooks for auth)\n" +
      "Everything related to a feature lives in its own neat backpack!",

    whyNeeded:
      "Enterprise web applications serve users across multiple countries and languages. Server-side i18n dictionaries ensure 100% SEO indexing for each language while keeping client bundle sizes ultra-small.",

    reactVsNext: {
      concept: "Multi-Language & Architecture Strategy",
      reactWay: {
        title: "Client-Bundled Translation Dictionaries",
        code: `// Traditional client-side approach:
import i18n from "i18next";
// ⚠️ Mobile users download English, French, Japanese, and Hindi dictionaries
// even if they only read English! (Adds 300KB+ of unused JSON to phone bundle)`,
        explanation:
          "Traditional client-side i18n libraries download giant translation dictionaries into the user's browser, slowing down initial load time.",
        drawbacks: [
          "Users download translation bundles for languages they don't even speak",
          "Search engines cannot index localized URLs properly",
          "Messy monolithic folder structures",
        ],
      },
      nextjsWay: {
        title: "Next.js Server Dictionaries (0 KB Client Bundle)",
        code: `// src/app/[lang]/page.js (Pure JavaScript!)
// 1. Simple server translation dictionary loader:
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then(m => m.default),
  hi: () => import("@/dictionaries/hi.json").then(m => m.default),
};

export default async function LocalizedPage({ params }) {
  const { lang } = await params;
  // Load ONLY the dictionary for the requested language on the server:
  const dict = await dictionaries[lang]();

  return (
    <div>
      <h1>{dict.welcome}</h1>
      <p>{dict.description}</p>
    </div>
  );
}`,
        explanation:
          "Next.js loads the exact translation dictionary requested on the server, injecting translated text into the HTML with 0 KB extra client JavaScript.",
        benefits: [
          "Zero client bundle weight for translation libraries",
          "Each language gets its own indexed URL (e.g. /en/about vs /hi/about)",
          "Clean scalable feature-based folder organization",
        ],
      },
      whyDifferent:
        "Next.js handles internationalization on the server using dynamic route folders (`[lang]`) and dynamic JSON imports.",
      mentalShiftSummary:
        "Don't download heavy i18n libraries to the browser. Use `app/[lang]/` and load language dictionaries on the server.",
    },

    basicExample: {
      title: "Multilingual Course Page with Server Dictionaries in Plain JavaScript",
      description: "A complete localized Server Component loading dictionary phrases based on the [lang] route param.",
      language: "jsx",
      filename: "src/app/[lang]/courses/page.js",
      code: `// src/app/[lang]/courses/page.js

// Simple in-memory translation dictionaries:
const dictionaries = {
  en: {
    title: "University Courses",
    subtitle: "Explore our accredited degree programs.",
    exploreBtn: "Explore Syllabus",
  },
  es: {
    title: "Cursos Universitarios",
    subtitle: "Explora nuestros programas de grado acreditados.",
    exploreBtn: "Explorar Plan de Estudios",
  },
  hi: {
    title: "विश्वविद्यालय पाठ्यक्रम",
    subtitle: "हमारे मान्यता प्राप्त डिग्री कार्यक्रमों को देखें।",
    exploreBtn: "पाठ्यक्रम देखें",
  },
};

export default async function LocalizedCoursesPage({ params }) {
  const { lang = "en" } = await params;
  const dict = dictionaries[lang] || dictionaries.en;

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <span className="text-xs font-mono uppercase text-emerald-400">
          Language: {lang.toUpperCase()}
        </span>
        <h1 className="text-3xl font-extrabold text-zinc-100 mt-1">{dict.title}</h1>
        <p className="text-zinc-400 text-sm mt-1">{dict.subtitle}</p>
      </div>

      <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors">
        {dict.exploreBtn}
      </button>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 4-21: Plain JavaScript dictionary objects for English, Spanish, and Hindi.\n- Line 23: export default async function LocalizedCoursesPage({ params }) receives the [lang] folder parameter.\n- Line 25: const dict = dictionaries[lang] || dictionaries.en; selects the matching translation with an English fallback.\n- Line 28-40: Renders the pre-translated HTML directly on the server!\n\nWhat happens in the browser?\n1. A student navigates to /hi/courses.\n2. The server loads the Hindi dictionary and generates HTML with Hindi text.\n3. The browser receives translated HTML with ZERO translation library bytes downloaded to their phone!",
      outputPreview: "Clean course page rendered in the selected language with zero client bundle overhead.",
    },

    moreExamples: [
      {
        title: "Scalable Feature-Driven Folder Structure",
        description: "How to structure large-scale production Next.js repositories.",
        language: "bash",
        filename: "ProjectStructure",
        code: `my-enterprise-app/
├── src/
│   ├── app/                     # Routing Only (Thin wrappers!)
│   │   ├── [lang]/
│   │   │   ├── courses/page.js
│   │   │   └── students/page.js
│   ├── features/                # Domain-Driven Feature Modules:
│   │   ├── courses/
│   │   │   ├── components/CourseCard.js
│   │   │   ├── actions/courseActions.js
│   │   │   └── lib/queries.js
│   │   └── students/
│   │       ├── components/StudentTable.js
│   │       └── actions/studentActions.js
│   ├── components/ui/           # Shared generic UI (Button, Modal, Input)
│   └── lib/                     # Global utilities (db.js, supabase.js)`,
        explanation:
          "Keeping page.js files thin and placing business logic inside feature folders (`src/features/`) ensures maintainability as teams grow.",
      },
    ],

    multipleWays: [
      {
        name: "Route-Based i18n (/[lang]/page.js - Recommended)",
        syntax: "src/app/[lang]/page.js",
        codeSnippet: "export default async function Page({ params }) { const { lang } = await params; }",
        howItWorks: "Language code lives in the URL path, loading server dictionaries on demand.",
        pros: ["100% SEO friendly (Google indexes each language separately)", "0 KB client bundle"],
        cons: ["Requires wrapping top-level routes inside a [lang] directory"],
        whenToUse: "Global websites, marketing portals, multi-country documentation.",
        isRecommended: true,
      },
      {
        name: "Cookie-Based Localization",
        syntax: "cookies().get('preferred_language')",
        codeSnippet: "const lang = (await cookies()).get('lang')?.value || 'en';",
        howItWorks: "Inspects cookie to determine language without changing URL path.",
        pros: ["Clean URLs without /en/ or /es/ prefixes"],
        cons: ["Worse for SEO because search engines see only one default language at root URL"],
        whenToUse: "Internal private intranets and authenticated dashboards.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use route-based `app/[lang]/` for public websites needing multi-language SEO. Use feature-driven folder structures (`src/features/`) for projects with more than 15 pages.",
      scenarios: [
        {
          scenario: "Public university website serving international students in English, French, and Spanish",
          recommendedApproach: "app/[lang]/ with server dictionaries",
          reason: "Enables Google to index localized pages separately for optimal regional search rankings.",
        },
        {
          scenario: "Refactoring a messy 50-file React codebase",
          recommendedApproach: "Feature folders: src/features/{auth, courses, billing}",
          reason: "Groups related components, actions, and utilities together for easy maintenance.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Putting all database queries and business logic directly in page.js",
        badCode: `// ❌ BAD: 400 lines of SQL, form handlers, and raw styles jammed in page.js`,
        goodCode: `// ✅ GOOD: Keep page.js thin; extract logic to actions/ and components/
import { StudentTable } from "@/features/students/components/StudentTable";
export default async function Page() { return <StudentTable />; }`,
        whyItBreaks: "Fat page files are difficult to test, impossible to reuse, and lead to merge conflicts in team environments.",
        howToFix: "Keep `page.js` files under 40 lines. Delegate logic to dedicated feature modules.",
      },
    ],

    bestPractices: [
      {
        title: "Group by Feature, Not by File Type",
        rule: "Colocate components, actions, and tests inside feature folders (src/features/courses/) rather than dumping them into a global actions/ directory.",
        explanation: "Feature grouping makes deleting or refactoring entire features effortless.",
      },
    ],

    exercises: [
      {
        id: "u6-ex-3",
        title: "Build a Localized Welcome Header",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a Server Component in src/app/[lang]/welcome/page.js in plain JavaScript that reads `params.lang` and renders 'Welcome' if 'en' or 'Bienvenido' if 'es'.",
        initialCode: `// src/app/[lang]/welcome/page.js
export default async function WelcomePage({ params }) {
  // TODO: Check lang and render greeting
  return <h1>Greeting</h1>;
}`,
        expectedOutput: "A component returning localized greetings based on route parameter.",
        hints: ["Destructure `{ lang }` from `await params`"],
        solutionCode: `// src/app/[lang]/welcome/page.js
export default async function WelcomePage({ params }) {
  const { lang } = await params;
  const greeting = lang === "es" ? "Bienvenido" : "Welcome";

  return <h1 className="text-2xl font-bold">{greeting}</h1>;
}`,
        solutionExplanation: "The route param [lang] is read asynchronously on the server to select the greeting.",
      },
    ],

    quizzes: [
      {
        id: "u6-q3",
        syllabusTopic: "Internationalization (i18n)",
        question: "Why is server-side dictionary loading (app/[lang]/) superior to client-side i18n libraries?",
        conceptualExplanation: "Server dictionaries load only the requested language on the server, avoiding sending massive multi-language JSON bundles to the client while preserving perfect SEO.",
        options: [
          { id: "a", text: "It only downloads the active language on the server, resulting in 0 KB client i18n bundle size and complete SEO indexing", isCorrect: true, explanation: "Correct! Next.js loads the exact translation dictionary on the server and delivers pre-rendered HTML." },
          { id: "b", text: "Because English is the only language permitted on the web", isCorrect: false, explanation: "No." },
          { id: "c", text: "Because JSON files are encrypted by the browser", isCorrect: false, explanation: "No." },
          { id: "d", text: "To turn off the database", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Global Learning Management System",
      description: "How an educational portal serves 20 languages with zero client bundle overhead.",
      code: {
        title: "Localized Course Directory Page",
        description: "Server dictionary loading based on language param in plain JavaScript.",
        language: "jsx",
        filename: "src/app/[lang]/courses/page.js",
        code: `export default async function LocalizedCourseCatalog({ params }) {
  const { lang } = await params;
  const dictionary = await import(\`@/dictionaries/\${lang}.json\`).then(m => m.default);

  return (
    <div>
      <h1>{dictionary.catalogHeading}</h1>
      <p>{dictionary.catalogDescription}</p>
    </div>
  );
}`,
      },
      keyTakeaway: "Dynamic server dictionary imports load only the requested language for each visitor.",
    },

    combinedExample: {
      combinedTopics: ["i18n", "Metadata", "Layouts"],
      title: "Multilingual Layout with HTML Lang Attribute",
      description: "Root layout setting proper HTML lang attribute dynamically.",
      code: {
        title: "Localized HTML Shell",
        description: "Injecting params.lang into HTML tag in plain JavaScript.",
        language: "jsx",
        filename: "src/app/[lang]/layout.js",
        code: `export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className="bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}`,
      },
      stepByStepFlow: [
        "Visitor enters /es/courses",
        "Layout receives lang = 'es' from params",
        "HTML shell renders with <html lang='es'>",
        "Screen readers and search bots adapt instantly to Spanish",
      ],
    },
  },

  {
    id: "security-and-testing",
    unitId: "unit-6",
    title: "Security Hardening, Sanitization & Unit Testing",
    shortSummary: "ADVANCED TOPIC: Learn web security using the Castle Moat analogy: XSS auto-escaping in JSX, CSRF prevention, CSP headers, and unit testing in plain JavaScript.",
    order: 4,
    tags: ["Security", "XSS", "CSRF", "Testing", "Vitest", "Jest", "Advanced"],

    simpleExplanation:
      "*(Note to students: This is an ADVANCED topic!)*\n\n" +
      "Imagine protecting a royal medieval castle:\n\n" +
      "1. **The Castle Moat (XSS Defense)**:\n" +
      "Cross-Site Scripting (XSS) is when a malicious hacker tries to type `<script>stealPasswords()</script>` into a comment box. In Next.js JSX, the template engine acts like a **bulletproof glass shield**! If someone enters `<script>`, React automatically converts it into harmless text string `&lt;script&gt;` so the browser never runs the script! The only dangerous exception is if you mistakenly use `dangerouslySetInnerHTML`.\n\n" +
      "2. **The Guard Dog (CSRF Defense in Server Actions)**:\n" +
      "Cross-Site Request Forgery (CSRF) is when a hacker tricks you into clicking a link on an evil website that submits a form to your bank. Next.js Server Actions automatically inspect the `Origin` and `Host` headers to verify that the form was truly submitted from YOUR website!\n\n" +
      "3. **The Fire Drill (Unit Testing in Plain JavaScript)**:\n" +
      "Before an airplane flies with 300 passengers, engineers test every engine bolt in a lab. In web development, **Unit Testing** means writing simple JavaScript checks: 'If I calculate student grade for 95%, does it return A? If I pass empty string, does it return an error?'\n\n" +
      "Testing in plain JavaScript with tools like Vitest or Jest is as simple as writing:\n" +
      "`expect(calculateGrade(95)).toBe('A')`!",

    whyNeeded:
      "A single security vulnerability can compromise student records, expose credit cards, and cause catastrophic data theft. Automated testing guarantees that adding new features doesn't secretly break existing calculations.",

    reactVsNext: {
      concept: "Security Hardening & Testing",
      reactWay: {
        title: "Manual Server Security Headers",
        code: `// Traditional client-side approach:
// You must manually configure security headers on Nginx or Apache
// and manually wire up CSRF tokens for every fetch call:
fetch("/api/transfer", {
  headers: { "X-CSRF-Token": getCsrfToken() }, // ⚠️ Easy to forget!
});`,
        explanation:
          "Traditional frontend apps require manual CSRF token plumbing and custom server security configurations.",
        drawbacks: [
          "Easy to forget CSRF tokens on custom fetch requests",
          "No built-in security header helper in SPA bundlers",
          "Complicated test setup requiring jsdom configuration",
        ],
      },
      nextjsWay: {
        title: "Next.js Automated Security Hardening (Built-In Origin Verification)",
        code: `// 1. Next.js Server Actions have BUILT-IN CSRF protection!
// They automatically compare the incoming 'Origin' header against the 'Host' header.
// If an evil website tries to invoke your action, Next.js blocks it automatically!

// 2. Security Headers in next.config.js (Pure JavaScript!):
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" }, // Prevents clickjacking!
  { key: "X-Content-Type-Options", value: "nosniff" },
];`,
        explanation:
          "Next.js provides built-in origin verification for Server Actions, automatic JSX string escaping, and declarative HTTP security header configuration in next.config.js.",
        benefits: [
          "Automatic CSRF origin verification on all Server Actions",
          "JSX escapes strings automatically to prevent XSS",
          "Simple declarative security headers in next.config.js",
        ],
      },
      whyDifferent:
        "Next.js enforces security at both the compiler layer (JSX string escaping) and the server layer (HTTP header enforcement and CSRF origin checks).",
      mentalShiftSummary:
        "Never use `dangerouslySetInnerHTML` on untrusted user comments. Write automated unit tests for critical business functions using Vitest or Jest.",
    },

    basicExample: {
      title: "Unit Testing a Grade Calculation Function in Plain JavaScript",
      description: "Testing business logic with simple Vitest / Jest assertions in plain JavaScript.",
      language: "javascript",
      filename: "src/lib/grades.test.js",
      code: `// src/lib/grades.test.js
// 1. The pure JavaScript function we want to test:
export function calculateGrade(score) {
  if (typeof score !== "number" || isNaN(score)) return "INVALID";
  if (score < 0 || score > 100) return "OUT_OF_RANGE";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// 2. The automated test suite (Vitest or Jest syntax):
// Run with: npx vitest run
describe("calculateGrade() unit tests", () => {
  test("returns A for scores 90 and above", () => {
    expect(calculateGrade(95)).toBe("A");
    expect(calculateGrade(90)).toBe("A");
  });

  test("returns B for scores between 80 and 89", () => {
    expect(calculateGrade(85)).toBe("B");
    expect(calculateGrade(80)).toBe("B");
  });

  test("handles edge cases and invalid inputs gracefully", () => {
    expect(calculateGrade(-5)).toBe("OUT_OF_RANGE");
    expect(calculateGrade(105)).toBe("OUT_OF_RANGE");
    expect(calculateGrade("ninety")).toBe("INVALID");
    expect(calculateGrade(null)).toBe("INVALID");
  });
});`,
      explanation:
        "Line-by-line explanation:\n- Line 2-10: calculateGrade(score) is a pure JavaScript function that calculates letter grades from numbers.\n- Line 14: describe(...) groups our test cases together.\n- Line 15-18: test('returns A...') asserts that 95 and 90 correctly produce 'A'.\n- Line 25-30: Tests defensive edge cases: negative scores, scores above 100, and non-number types!\n\nWhat happens when you run tests?\n1. In your terminal, you type 'npx vitest run'.\n2. The test runner executes all assertions in 10 milliseconds.\n3. All green checkmarks appear, giving you 100% confidence that student grades will never be miscalculated in production!",
      outputPreview: "✓ calculateGrade() unit tests (3 tests passed) in 12ms.",
    },

    moreExamples: [
      {
        title: "Configuring Security Headers in next.config.js in Plain JavaScript",
        description: "Hardening HTTP headers to prevent Clickjacking and MIME sniffing.",
        language: "javascript",
        filename: "next.config.js",
        code: `// next.config.js (Pure JavaScript!)
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents your website from being embedded inside an evil iframe (Clickjacking defense):
          { key: "X-Frame-Options", value: "DENY" },
          // Prevents browsers from guessing file MIME types:
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer privacy:
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};`,
        explanation:
          "These headers instruct modern web browsers to strictly enforce security boundaries, preventing malicious websites from framing your pages.",
      },
    ],

    multipleWays: [
      {
        name: "Automated Unit Tests (Vitest / Jest - Recommended)",
        syntax: "expect(fn(input)).toBe(expected)",
        codeSnippet: "test('adds numbers', () => { expect(add(2, 3)).toBe(5); });",
        howItWorks: "Runs isolated JavaScript functions in milliseconds without launching a browser.",
        pros: ["Blazing fast (thousands of tests in 1s)", "Catch calculation bugs instantly"],
        cons: ["Does not test full browser DOM rendering"],
        whenToUse: "Form validators, grade calculators, price calculations, utility functions.",
        isRecommended: true,
      },
      {
        name: "End-to-End (E2E) Browser Tests (Playwright)",
        syntax: "await page.click('button'); await expect(page).toHaveText('Welcome')",
        codeSnippet: "await page.goto('/login'); await page.fill('#email', 'u@test.com');",
        howItWorks: "Launches an actual headless Chrome browser to click buttons like a real user.",
        pros: ["Tests full end-to-end user journeys"],
        cons: ["Slower execution time (seconds instead of milliseconds)"],
        whenToUse: "Critical user flows: login, checkout, registration.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use Vitest unit tests for business logic functions. Rely on Next.js built-in origin checks and JSX auto-escaping for day-to-day security.",
      scenarios: [
        {
          scenario: "Testing an algorithm that computes tuition fee discounts",
          recommendedApproach: "Unit test with Vitest (test/fees.test.js)",
          reason: "Financial calculations must have 100% test coverage with immediate feedback.",
        },
        {
          scenario: "Displaying user comments submitted in a discussion forum",
          recommendedApproach: "Standard JSX `{comment.text}`",
          reason: "React automatically escapes HTML entities, making XSS injection impossible.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using dangerouslySetInnerHTML on user-submitted text",
        badCode: `// ❌ CRITICAL SECURITY VULNERABILITY: XSS Injection!
<div dangerouslySetInnerHTML={{ __html: userComment }} />`,
        goodCode: `// ✅ SAFE: Let React auto-escape the user text!
<div>{userComment}</div>`,
        whyItBreaks: "dangerouslySetInnerHTML bypasses React's security moat and executes any script tags submitted by malicious visitors.",
        howToFix: "Always render text inside normal JSX curly braces `{text}`. If you must render HTML, sanitize it first with DOMPurify.",
      },
    ],

    bestPractices: [
      {
        title: "Never Disable Built-In CSRF Origin Checks",
        rule: "Keep Server Actions on their default configuration to enforce strict same-origin verification.",
        explanation: "Automatic origin verification prevents third-party websites from executing unauthorized mutations.",
      },
    ],

    exercises: [
      {
        id: "u6-ex-4",
        title: "Write a Test for an Email Validator",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a test assertion in plain JavaScript using `expect` that verifies `isValidEmail('student@university.edu')` returns `true` and `isValidEmail('invalid')` returns `false`.",
        initialCode: `// src/lib/email.test.js
// TODO: Write test assertions
`,
        expectedOutput: "A test checking valid and invalid email returns.",
        hints: ["Use `expect(isValidEmail('student@university.edu')).toBe(true)`"],
        solutionCode: `// src/lib/email.test.js
test("validates email correctly", () => {
  expect(isValidEmail("student@university.edu")).toBe(true);
  expect(isValidEmail("invalid-email")).toBe(false);
});`,
        solutionExplanation: "The assertions test positive and negative branches of the email validation utility.",
      },
    ],

    quizzes: [
      {
        id: "u6-q4",
        syllabusTopic: "Security Hardening (XSS, CSRF)",
        question: "How does React protect against Cross-Site Scripting (XSS) when rendering user input inside JSX curly braces `{userInput}`?",
        conceptualExplanation: "React automatically converts special characters like '<' and '>' into harmless HTML entities (&lt; &gt;) before inserting them into the DOM.",
        options: [
          { id: "a", text: "By auto-escaping strings rendered in JSX (e.g. converting '<script>' into '&lt;script&gt;') before inserting into the DOM", isCorrect: true, explanation: "Correct! React safely escapes all variable values rendered inside JSX curly braces." },
          { id: "b", text: "By turning off JavaScript on user laptops", isCorrect: false, explanation: "No." },
          { id: "c", text: "By requiring an antivirus subscription", isCorrect: false, explanation: "No." },
          { id: "d", text: "It does not protect against XSS", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Banking & Financial Services",
      description: "How financial platforms configure Content Security Policy (CSP) headers to prevent unauthorized script injection.",
      code: {
        title: "Content Security Policy Header",
        description: "Strict CSP header definition in next.config.js in plain JavaScript.",
        language: "javascript",
        filename: "next.config.js",
        code: `module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' https://trusted-cdn.com;",
          },
        ],
      },
    ];
  },
};`,
      },
      keyTakeaway: "Content Security Policy headers prevent browsers from loading unauthorized third-party scripts.",
    },

    combinedExample: {
      combinedTopics: ["Security", "Testing", "Server Actions"],
      title: "Hardened Student Enrollment Action with Tests",
      description: "Server Action with input sanitization and corresponding unit tests.",
      code: {
        title: "Sanitized Action and Test Suite",
        description: "Action validation and test in plain JavaScript.",
        language: "javascript",
        filename: "src/lib/sanitize.test.js",
        code: `export function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input.trim().replace(/<[^>]*>?/gm, "");
}

test("strips malicious HTML tags", () => {
  const dirty = "<script>alert(1)</script>Rahul";
  expect(sanitizeInput(dirty)).toBe("alert(1)Rahul");
});`,
      },
      stepByStepFlow: [
        "User submits input string",
        "sanitizeInput strips dangerous HTML markup",
        "Unit test verifies that tags are stripped cleanly",
        "Safe string is persisted to the database",
      ],
    },
  },
];
