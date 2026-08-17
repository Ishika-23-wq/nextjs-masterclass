export interface BootcampHour {
  hourNumber: number;
  timeRange: string;
  title: string;
  subtitle: string;
  badge: string;
  sections: BootcampSection[];
}

export interface BootcampSection {
  id: string;
  timeRange: string;
  title: string;
  durationMinutes: number;
  spokenScript: string;
  analogies: Array<{
    title: string;
    emoji: string;
    description: string;
  }>;
  codeBlocks: Array<{
    title: string;
    filename?: string;
    code: string;
    language: "jsx" | "javascript" | "bash";
    explanation: string;
  }>;
  checkInQuestions: Array<{
    question: string;
    answer: string;
    why: string;
  }>;
  interactiveExercise?: {
    title: string;
    duration: string;
    prompt: string;
    starterCode: string;
    solutionCode: string;
  };
  keyTakeaways: string[];
}

export const bootcampCurriculum: BootcampHour[] = [
  {
    hourNumber: 1,
    timeRange: "0:00 – 1:00",
    title: "Foundations: React Refresher & Why Next.js?",
    subtitle: "The 4 Lego Rules of React, The Blank Screen Problem, and Next.js Superpowers",
    badge: "Hour 1",
    sections: [
      {
        id: "welcome-and-agenda",
        timeRange: "0:00–0:05",
        title: "Welcome & Today's 4-Hour Roadmap",
        durationMinutes: 5,
        spokenScript:
          "Good day everyone! Welcome to our 4-hour Next.js adventure. If you are brand new to React or still learning JavaScript, you are in the exact right place! In the first 20 minutes, I will give you the 4 simple Lego-brick rules of React. After that, we jump straight into Next.js: what it is, why every major tech company uses it, how folders become webpages, and how to build super fast apps in plain JavaScript!",
        analogies: [
          {
            title: "The Treehouse Blueprint",
            emoji: "🏡",
            description:
              "Think of today like building a treehouse. First we inspect our hammer and nails (React), then we install pre-made walls and a roof (Next.js), and finally we paint all the rooms and connect secret staircases (Routing)!",
          },
        ],
        codeBlocks: [],
        checkInQuestions: [
          {
            question: "Do I need to be a React master before learning Next.js?",
            answer: "Nope! You only need 4 basic ideas: Components, Props, State, and Server vs Client.",
            why: "Next.js builds on top of React, so learning them together is actually the easiest and fastest way to understand modern web development.",
          },
        ],
        keyTakeaways: [
          "Every Next.js page is secretly just a friendly React component.",
          "We will use plain JavaScript (JSX) so there are no confusing extra steps.",
          "By the end of Hour 4, you will build and connect multi-page web applications effortlessly.",
        ],
      },
      {
        id: "react-just-enough",
        timeRange: "0:05–0:25",
        title: "React — The 4 Magic Lego Rules",
        durationMinutes: 20,
        spokenScript:
          "Next.js is built on top of React. Every single page in Next.js is secretly a React component. So before we touch Next.js, let's make sure four foundational ideas are rock solid in your mind: 1. Components are cookie cutters, 2. Props are custom toppings, 3. State is a video game score counter, and 4. Server vs Client is the chef in the kitchen vs the dining table!",
        analogies: [
          {
            title: "Rule 1: Component as a Cookie Cutter",
            emoji: "🍪",
            description:
              "You design the cookie shape once (a JavaScript function that returns JSX), and then you can stamp out 100 identical yummy cookies on your screen!",
          },
          {
            title: "Rule 2: Props as Custom Toppings",
            emoji: "🍨",
            description:
              "Props are like toppings you choose on an ice cream cone. The cone is the same template, but Aditi gets sprinkles and Rohan gets chocolate chips!",
          },
          {
            title: "Rule 3: State as a Video Game Scoreboard",
            emoji: "🎮",
            description:
              "When Mario collects a gold coin, the number changes from 0 to 1 and the screen updates instantly. You don't erase the TV with an eraser — React redraws it automatically!",
          },
          {
            title: "Rule 4: Server Kitchen vs Dining Table",
            emoji: "👨‍🍳",
            description:
              "A Server Component is like the chef cooking food in the kitchen and handing you the finished plate. A Client Component is a DIY station where the browser has to push buttons and do the work.",
          },
        ],
        codeBlocks: [
          {
            title: "1. A Component is just a function returning JSX",
            filename: "Cookie.jsx",
            language: "jsx",
            code: `// Rule 1: A function that returns HTML-looking code (JSX)
export function Cookie() {
  return <h1>🍪 Yummy Chocolate Cookie!</h1>;
}`,
            explanation:
              "JSX looks like HTML, but it is supercharged JavaScript. It lets you write visual UI right inside regular functions.",
          },
          {
            title: "2. Props — Passing Custom Toppings into a Component",
            filename: "IceCream.jsx",
            language: "jsx",
            code: `// Rule 2: Props are inputs that customize our component
export function IceCream({ flavor, topping }) {
  return (
    <div>
      <h2>🍨 {flavor} Ice Cream</h2>
      <p>With extra {topping} on top!</p>
    </div>
  );
}

// How we stamp them out:
// <IceCream flavor="Vanilla" topping="Rainbow Sprinkles" />
// <IceCream flavor="Chocolate" topping="Choco Chips" />`,
            explanation:
              "Props are like function arguments. You give different inputs, and the component renders customized output!",
          },
          {
            title: "3. State — The Coin Scoreboard that Updates the Screen",
            filename: "CoinCounter.jsx",
            language: "jsx",
            code: `"use client"; // Tells Next.js: this runs in the browser for clicks!
import { useState } from "react";

export function CoinCounter() {
  // 'coins' is the current score, 'setCoins' changes the score
  const [coins, setCoins] = useState(0);

  return (
    <button onClick={() => setCoins(coins + 1)}>
      🪙 Coins Collected: {coins}
    </button>
  );
}`,
            explanation:
              "useState is a React Hook. Whenever you call setCoins, React automatically redraws the button with the new coin count.",
          },
        ],
        checkInQuestions: [
          {
            question: "What will show on screen if I render <IceCream flavor='Mango' topping='Cherries' />?",
            answer: "🍨 Mango Ice Cream with extra Cherries on top!",
            why: "Props plug directly into the JSX template placeholders {flavor} and {topping}.",
          },
          {
            question: "If a component only shows static text and has no clicks or state, should it be a Server or Client Component?",
            answer: "A Server Component! Leave it as default (no 'use client' needed).",
            why: "Server Components are baked in the kitchen, sending lightweight HTML with zero extra JavaScript weight to the browser.",
          },
        ],
        keyTakeaways: [
          "Components = reusable UI functions.",
          "Props = data passed in to customize UI.",
          "State = live data that re-renders the screen when it changes.",
          "Next.js components are Server Components by default unless you add 'use client'.",
        ],
      },
      {
        id: "intro-to-nextjs",
        timeRange: "0:25–0:40",
        title: "Introduction to Next.js & Why It Exists",
        durationMinutes: 15,
        spokenScript:
          "Now, what actually is Next.js? React is a UI library, but Next.js is a complete full-stack framework. If React is a bucket of loose Lego bricks where you have to build your own engine and wheels, Next.js is a complete Race Car Kit with everything built in. Let's see the big problem plain React had: the dreaded blank white screen!",
        analogies: [
          {
            title: "Loose Bricks vs Pre-Built Race Car",
            emoji: "🏎️",
            description:
              "In plain React (Vite / CRA), you have to wire up routing, SEO, and servers by hand. Next.js comes with the engine, GPS navigation, headlights, and sound system already connected!",
          },
          {
            title: "The Blank White Screen Waiter",
            emoji: "⏳",
            description:
              "In old SPAs, the waiter brings an empty plate and a cookbook to your table and tells you to cook your own dinner. Next.js cooks the dinner in the kitchen and delivers hot food immediately!",
          },
        ],
        codeBlocks: [
          {
            title: "How Next.js Solves the Plain React Problem",
            filename: "ComparisonOverview.js",
            language: "javascript",
            code: `// Plain React (Vite / CRA):
// 1. Browser downloads empty HTML (<div id="root"></div>)
// 2. Browser downloads 2MB of JavaScript bundle
// 3. User stares at blank white screen...
// 4. Finally JavaScript executes and builds the UI.

// Next.js App Router:
// 1. Server pre-bakes the full HTML page instantly.
// 2. User sees real text and images in 0.2 seconds!
// 3. Perfect SEO for Google search robots.`,
            explanation:
              "By moving the initial work to the server, Next.js makes websites load blazing fast on slow mobile phones.",
          },
        ],
        checkInQuestions: [
          {
            question: "Why do search engines like Google love Next.js websites more than old React SPAs?",
            answer: "Because Next.js sends real, readable HTML directly from the server!",
            why: "In old SPAs, Google crawlers saw an empty `<div id='root'></div>` before JavaScript ran. Next.js gives complete HTML immediately.",
          },
        ],
        keyTakeaways: [
          "Next.js gives you automatic file-based routing, server rendering, image compression, and full-stack capabilities.",
          "Used by Netflix, Twitch, TikTok, Nike, Notion, and modern tech teams worldwide.",
        ],
      },
      {
        id: "features-and-trends",
        timeRange: "0:40–1:00",
        title: "Next.js Superpowers & Modern Industry Trends",
        durationMinutes: 20,
        spokenScript:
          "Let's look at the superpowers Next.js gives you. First is rendering strategies: SSR is fresh pizza baked per order, SSG is pre-baked morning bread, and ISR is baking fresh batches every few minutes. Second is Server Actions: functions that let your buttons talk directly to the server like a secret walkie-talkie with no separate API endpoint needed!",
        analogies: [
          {
            title: "The Bakery Rendering Guide",
            emoji: "🥖",
            description:
              "SSR = Fresh pizza made on request. SSG = Pre-baked cookies made once in the morning. ISR = A bakery that bakes a fresh batch every 60 seconds automatically.",
          },
          {
            title: "The Secret Walkie-Talkie (Server Actions)",
            emoji: "📻",
            description:
              "Instead of writing a formal letter and waiting for the postman (API route), you push a button on your walkie-talkie and talk straight to the kitchen!",
          },
        ],
        codeBlocks: [
          {
            title: "Server Actions in Action",
            filename: "app/actions.js",
            language: "javascript",
            code: `"use server"; // Secret keyword: this code ONLY runs on the server!

export async function savePlayerScore(formData) {
  const playerName = formData.get("playerName");
  const score = formData.get("score");
  
  console.log("Saving to database secretly:", playerName, score);
  return { success: true, message: \`Saved score for \${playerName}!\` };
}`,
            explanation:
              "With Server Actions, you don't have to build an Express server or write fetch('/api/save') boilerplate. Just call the function!",
          },
        ],
        checkInQuestions: [
          {
            question: "If a blog post about dinosaurs never changes, which rendering strategy should we use: SSR (fresh pizza) or SSG (pre-baked)?",
            answer: "SSG (Static Site Generation / pre-baked)! Bake it once at build time.",
            why: "Static pages load instantly and can be served to millions of readers simultaneously without making the server sweat.",
          },
        ],
        keyTakeaways: [
          "App Router is the standard and recommended way to build every new project.",
          "Turbopack is a super-fast Rust bundler that replaces slow old Webpack.",
          "Dynamic route params are now asynchronous: always write `await params`!",
        ],
      },
    ],
  },
  {
    hourNumber: 2,
    timeRange: "1:00 – 2:00",
    title: "Project Structure, App Router & Dev Workflow",
    subtitle: "The Treehouse Rooms, Magic Reserved File Names, and Fast Refresh",
    badge: "Hour 2",
    sections: [
      {
        id: "project-structure",
        timeRange: "1:00–1:15",
        title: "Inside the Project Treehouse",
        durationMinutes: 15,
        spokenScript:
          "Let's create a real Next.js project right now in our terminal and peek inside the folders. Think of the app folder as the floor plan of a treehouse. Every folder you create becomes a room, and the public folder is your toy closet where you store images and sticker icons.",
        analogies: [
          {
            title: "The Treehouse Floor Plan",
            emoji: "🛖",
            description:
              "The `app/` folder is your treehouse. Every subfolder you add is a new room with its own door. The `public/` folder is your sticker box for pictures and icons.",
          },
        ],
        codeBlocks: [
          {
            title: "Starting a New Next.js Project",
            filename: "Terminal",
            language: "bash",
            code: `# Create a brand new Next.js project
npx create-next-app@latest my-fun-app

# Move inside the project folder
cd my-fun-app

# Start the lightning-fast development server!
npm run dev`,
            explanation:
              "This sets up your project and starts local development at http://localhost:3000.",
          },
          {
            title: "The Folder Blueprint",
            filename: "Project Structure",
            language: "bash",
            code: `my-fun-app/
├── app/                  🏠 THE HEART: All your webpages live here!
│   ├── layout.js         🖼️ Shared picture frame (navbar + footer)
│   ├── page.js           🌟 The Homepage ("/")
│   └── globals.css       🎨 Global colors and styles
├── public/               🧸 Toy Closet: Put puppy.png and logo.svg here
├── node_modules/         📦 Installed packages (never touch this)
├── package.json          📜 Recipe Book: Lists scripts and tools
└── .env.local            🔒 Secret Diary: Passwords and database keys`,
            explanation:
              "Next.js watches the app/ directory. Whatever you put in app/ turns into real web routes!",
          },
        ],
        checkInQuestions: [
          {
            question: "If I create a folder named `app/games/` and put a `page.js` inside it, what URL address does that become?",
            answer: "http://localhost:3000/games",
            why: "Folder names inside app/ map 1-to-1 directly to the URL in the browser address bar!",
          },
        ],
        keyTakeaways: [
          "The `app/` folder holds all your routes and pages.",
          "`public/` holds raw static files like images and favicons.",
          "Never commit `.env.local` with your secret keys to GitHub!",
        ],
      },
      {
        id: "app-router-mental-model",
        timeRange: "1:15–1:35",
        title: "App Router: The 5 Magic Reserved Files",
        durationMinutes: 20,
        spokenScript:
          "In Next.js, file names are not random. Next.js listens for specific magic file names inside each folder. Memorize these five: page.js makes a route visible, layout.js wraps it in a permanent frame, loading.js shows an instant hourglass, error.js catches bugs like a circuit breaker, and not-found.js shows a cute 404 screen!",
        analogies: [
          {
            title: "The Hotel Room Analogy",
            emoji: "🏨",
            description:
              "page.js is what is inside the room. layout.js is the hallway and corridor outside. loading.js is the 'Room being cleaned' sign. error.js is the emergency fire sprinkler!",
          },
        ],
        codeBlocks: [
          {
            title: "The 5 Magic Files Matrix",
            filename: "MagicFiles.js",
            language: "javascript",
            code: `// Special Reserved File Names in App Router:
// 1. page.js        -> Defines the visible UI for this specific URL
// 2. layout.js      -> Shared UI wrapper that stays mounted across clicks
// 3. loading.js     -> Automatic loading spinner while data is fetching
// 4. error.js       -> Automatic error boundary fallback if page crashes
// 5. not-found.js   -> Custom 404 UI when a page doesn't exist`,
            explanation:
              "You don't have to write complex router configs. Just name your files with these exact spellings!",
          },
        ],
        checkInQuestions: [
          {
            question: "If I need a form with an input box that updates as the user types (using useState), do I need 'use client' at the top?",
            answer: "Yes! Any interactive feature (useState, onClick, onChange) requires 'use client'.",
            why: "Because buttons and typing live in the user's browser, so the component must run as a Client Component.",
          },
        ],
        keyTakeaways: [
          "Special filenames give superpowers automatically without extra libraries.",
          "Every component in `app/` is a Server Component unless marked with `'use client'`.",
        ],
      },
      {
        id: "dev-workflow",
        timeRange: "1:35–1:50",
        title: "The Lightning-Fast Dev Workflow",
        durationMinutes: 15,
        spokenScript:
          "Let's talk about the daily loop of coding. You create a folder, add a page.js, hit Save, and Turbopack updates the browser in less than a blink without losing what you typed in your form! That is called Fast Refresh.",
        analogies: [
          {
            title: "The Magic Mirror Tailor",
            emoji: "🪞",
            description:
              "You adjust a button on a jacket, and the mirror instantly shows the new jacket without having to sew a whole new suit from scratch every time!",
          },
        ],
        codeBlocks: [
          {
            title: "The 4 Core Terminal Commands",
            filename: "Commands.bash",
            language: "bash",
            code: `npm run dev     # 🚀 Starts your local playground with Turbopack (localhost:3000)
npm run build   # 📦 Builds an ultra-fast production version for deployment
npm run start   # 🌐 Tests the production build on your machine
npm run lint    # 🔍 Checks your code for silly mistakes and typos`,
            explanation:
              "During daily development, you almost always just run 'npm run dev'.",
          },
        ],
        checkInQuestions: [
          {
            question: "What happens when you press Command+S / Ctrl+S in Next.js?",
            answer: "Fast Refresh instantly updates only what changed in your browser!",
            why: "Turbopack re-evaluates the single modified file in milliseconds and swaps it in place without resetting your state.",
          },
        ],
        keyTakeaways: [
          "`npm run dev` gives you instant hot reload.",
          "Secrets go in `.env.local`. Use prefix `NEXT_PUBLIC_` only if the browser needs it.",
        ],
      },
      {
        id: "break-time",
        timeRange: "1:50–2:00",
        title: "☕ 10-Minute Juice / Stretch Break",
        durationMinutes: 10,
        spokenScript:
          "Awesome work on Hour 1 & 2! Take 10 minutes to grab a snack, drink some water, and stretch your legs. In Hour 3, we dive deep into Routing and Dynamic URLs!",
        analogies: [],
        codeBlocks: [],
        checkInQuestions: [],
        keyTakeaways: ["Hydrate and rest your eyes before the live coding adventure!"],
      },
    ],
  },
  {
    hourNumber: 3,
    timeRange: "2:00 – 3:00",
    title: "Routing & Navigation (Part 1)",
    subtitle: "File-Based Routes, Dynamic Name Tags [slug], and Nested Org Charts",
    badge: "Hour 3",
    sections: [
      {
        id: "file-based-routing",
        timeRange: "2:00–2:20",
        title: "File-Based Routing: Folders are Webpages",
        durationMinutes: 20,
        spokenScript:
          "Welcome back! Now we explore Routing — the part of Next.js you will touch every single day. The core rule is delightfully simple: every folder inside app/ that contains a page.js becomes a URL address on the internet.",
        analogies: [
          {
            title: "The Filing Cabinet",
            emoji: "🗄️",
            description:
              "If you have a drawer labeled 'Invoices' and a folder inside labeled '2026', that's the exact path to find it. In Next.js, the URL bar IS the folder path!",
          },
        ],
        codeBlocks: [
          {
            title: "Folder to URL Mapping",
            filename: "RoutingTable.js",
            language: "javascript",
            code: `// Folder on your computer          ->  Web Address in Browser
// app/page.js                      ->  http://localhost:3000/
// app/about/page.js                ->  http://localhost:3000/about
// app/contact/page.js              ->  http://localhost:3000/contact
// app/blog/page.js                 ->  http://localhost:3000/blog`,
            explanation:
              "Create a folder, put page.js inside, and you have a brand new working webpage!",
          },
          {
            title: "Example: Creating the About Page in Pure JavaScript",
            filename: "app/about/page.js",
            language: "jsx",
            code: `// app/about/page.js
export default function AboutPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>👋 About Our Super Cool Team</h1>
      <p>We build full-stack web applications with Next.js and JavaScript!</p>
    </div>
  );
}`,
            explanation:
              "Save this file, open http://localhost:3000/about, and your new page appears immediately.",
          },
        ],
        checkInQuestions: [
          {
            question: "If I create a folder `app/services/` with a helper file `Button.js` but NO `page.js`, will `/services` work in the browser?",
            answer: "No, it shows 404 Not Found!",
            why: "A folder MUST contain a `page.js` to become a publicly visitable URL. Helper components don't become URLs.",
          },
        ],
        interactiveExercise: {
          title: "Mini Challenge: Build 3 Routes in 3 Minutes",
          duration: "5 min",
          prompt: "Create three folders with page.js files: /team, /team/careers, and /pricing.",
          starterCode: `// Create:
// 1. app/team/page.js
// 2. app/team/careers/page.js
// 3. app/pricing/page.js`,
          solutionCode: `// app/team/page.js
export default function Team() { return <h1>Meet the Team</h1>; }

// app/team/careers/page.js
export default function Careers() { return <h1>We are Hiring!</h1>; }

// app/pricing/page.js
export default function Pricing() { return <h1>Plans & Pricing</h1>; }`,
        },
        keyTakeaways: [
          "Folders inside `app/` define the URL path.",
          "Only `page.js` makes a folder publicly accessible.",
        ],
      },
      {
        id: "dynamic-routes",
        timeRange: "2:20–2:40",
        title: "Dynamic Routes: The Magic Name Tag [slug]",
        durationMinutes: 20,
        spokenScript:
          "Static routes like /about are easy. But what if you are building an online store with 10,000 toys, or a blog with 500 articles? You cannot make 500 folders by hand! That is what Dynamic Routes solve. We wrap the folder name in square brackets like [id] or [slug].",
        analogies: [
          {
            title: "The Blank Name Tag Slot",
            emoji: "🏷️",
            description:
              "Think of [slug] like a mail sorting machine with a slot labeled 'ANY NAME GOES HERE'. One machine, infinite letters — it just reads whatever name is typed on each envelope!",
          },
          {
            title: "Unwrapping the Present (await params)",
            emoji: "🎁",
            description:
              "In modern Next.js, `params` is like a wrapped gift box (a Promise). You write `await params` to open the box and pull out the slug or id inside!",
          },
        ],
        codeBlocks: [
          {
            title: "Dynamic Route in Plain JavaScript",
            filename: "app/blog/[slug]/page.js",
            language: "jsx",
            code: `// app/blog/[slug]/page.js

// This single file handles:
// /blog/hello-world
// /blog/nextjs-tips
// /blog/how-to-bake-cookies

export default async function BlogPost({ params }) {
  // 👈 2026 rule: params is a Promise, so we await it!
  const { slug } = await params;

  return (
    <div style={{ padding: "24px" }}>
      <h1>📖 Article: {slug}</h1>
      <p>Welcome! You are reading the dynamic page for: <strong>{slug}</strong></p>
    </div>
  );
}`,
            explanation:
              "Whatever you type after /blog/ in the URL replaces {slug} on the screen automatically!",
          },
        ],
        checkInQuestions: [
          {
            question: "If I create `app/toys/[id]/page.js` and visit `/toys/42`, what will `id` be?",
            answer: "42",
            why: "The value in the URL matching the [id] folder segment is passed directly into the params object.",
          },
        ],
        interactiveExercise: {
          title: "Mini Challenge: User Profile Route",
          duration: "5 min",
          prompt: "Build app/users/[username]/page.js that displays 'Welcome back, [username]!'. Test it with your own name in the URL.",
          starterCode: `// app/users/[username]/page.js
export default async function UserProfile({ params }) {
  // TODO: unwrap params and show username!
}`,
          solutionCode: `// app/users/[username]/page.js
export default async function UserProfile({ params }) {
  const { username } = await params;
  return <h1>👋 Welcome back, {username}!</h1>;
}`,
        },
        keyTakeaways: [
          "`[paramName]` creates a dynamic variable in the URL.",
          "Always `await params` in Server Components before reading properties.",
        ],
      },
      {
        id: "nested-routes-and-groups",
        timeRange: "2:40–3:00",
        title: "Nested Routes & The Invisibility Cloak (Route Groups)",
        durationMinutes: 20,
        spokenScript:
          "Routes can nest inside each other just like folders nest in a computer. And if you want to organize your files into neat categories without changing the public URL, you can put parentheses around a folder like (marketing). That is a Route Group!",
        analogies: [
          {
            title: "The School Org Chart",
            emoji: "🏫",
            description:
              "`dashboard/settings` and `dashboard/analytics` are sibling rooms on the same floor under the big `dashboard/` roof.",
          },
          {
            title: "The Invisibility Cloak (Route Groups)",
            emoji: "🪄",
            description:
              "Putting parentheses `(name)` around a folder is like an invisibility cloak. You see it in VS Code, but the browser URL completely ignores it!",
          },
        ],
        codeBlocks: [
          {
            title: "Nested Route Structure",
            filename: "NestedStructure.js",
            language: "javascript",
            code: `app/
└── dashboard/
    ├── page.js          ->  /dashboard
    ├── settings/
    │   └── page.js      ->  /dashboard/settings
    └── analytics/
        └── page.js      ->  /dashboard/analytics`,
            explanation:
              "Folders inside folders create clean nested URLs naturally.",
          },
          {
            title: "Route Groups: Organizing without changing URLs",
            filename: "RouteGroups.js",
            language: "javascript",
            code: `app/
├── (marketing)/
│   ├── about/page.js    ->  /about    (NOT /marketing/about!)
│   └── contact/page.js  ->  /contact
└── (shop)/
    └── toys/page.js     ->  /toys     (NOT /shop/toys!)`,
            explanation:
              "Parentheses `(folder)` tell Next.js: 'Keep this folder organized for me, but skip it in the URL address.'",
          },
        ],
        checkInQuestions: [
          {
            question: "What URL address does `app/(marketing)/about/page.js` produce?",
            answer: "/about",
            why: "Because `(marketing)` has parentheses, Next.js ignores it in the final URL path.",
          },
        ],
        keyTakeaways: [
          "Nested folders create nested paths like `/dashboard/settings`.",
          "Route groups `(folder)` let you organize files without polluting the URL.",
        ],
      },
    ],
  },
  {
    hourNumber: 4,
    timeRange: "3:00 – 4:00",
    title: "Layouts, Navigation & Super Resilient UI",
    subtitle: "The Picture Frame, Instant Teleporting with <Link>, and Safety Circuit Breakers",
    badge: "Hour 4",
    sections: [
      {
        id: "layouts",
        timeRange: "3:00–3:15",
        title: "Layouts: The Unbreakable Picture Frame",
        durationMinutes: 15,
        spokenScript:
          "Layouts solve a real problem: your top navigation bar and footer should never flicker or reload every single time someone clicks a link. A layout stays mounted on the screen, and only the inner page content swaps inside {children}!",
        analogies: [
          {
            title: "The Photo Frame & Swappable Photos",
            emoji: "🖼️",
            description:
              "The frame (navbar, sidebar, footer) stays hung on the wall. When you switch pages, you just slide in a new photo inside ({children}) without rebuilding the wooden frame!",
          },
          {
            title: "Russian Nesting Dolls (Matryoshka)",
            emoji: "🪆",
            description:
              "Layouts stack! The Root Layout wraps everything, and the Dashboard Layout wraps only dashboard pages inside the root layout.",
          },
        ],
        codeBlocks: [
          {
            title: "The Root Layout in Plain JavaScript",
            filename: "app/layout.js",
            language: "jsx",
            code: `// app/layout.js (Required: wraps EVERY page on your site)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {/* Navigation stays visible forever across all pages */}
        <nav style={{ background: "#10b981", color: "#fff", padding: "16px" }}>
          <strong>🚀 NextMastery Portal</strong>
        </nav>

        {/* The active page content is injected right here! */}
        <main style={{ padding: "20px" }}>
          {children}
        </main>

        <footer style={{ background: "#f4f4f5", padding: "16px", textAlign: "center" }}>
          <p>© 2026 Built with Next.js & JavaScript</p>
        </footer>
      </body>
    </html>
  );
}`,
            explanation:
              "When you navigate between / and /about, the nav and footer NEVER re-render. Only {children} swaps!",
          },
        ],
        checkInQuestions: [
          {
            question: "If I add a sidebar in `app/dashboard/layout.js`, will that sidebar appear on `/about`?",
            answer: "No!",
            why: "A layout only wraps pages inside its own folder and subfolders, never sibling folders like /about.",
          },
        ],
        keyTakeaways: [
          "`app/layout.js` is required and wraps every page.",
          "Layouts do not re-render on navigation, preserving open dropdowns, audio playing, and scroll state.",
        ],
      },
      {
        id: "navigation",
        timeRange: "3:15–3:30",
        title: "Navigation: Instant Teleportation with <Link>",
        durationMinutes: 15,
        spokenScript:
          "How do users move between pages? If you use regular HTML <a> tags, the entire browser resets, causing a harsh flash. In Next.js, we use <Link> from 'next/link' for instant client-side teleportation!",
        analogies: [
          {
            title: "Console Restart vs Teleport Portal",
            emoji: "⚡",
            description:
              "An `<a>` tag is like restarting your game console just to enter another room. `<Link>` is like stepping through a glowing teleportation portal — instant and frictionless!",
          },
        ],
        codeBlocks: [
          {
            title: "Comparing <a> vs Next.js <Link>",
            filename: "Navbar.jsx",
            language: "jsx",
            code: `import Link from "next/link";

export function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "12px" }}>
      {/* ❌ Don't use <a href="/about"> (forces slow full-page reload) */}
      
      {/* ✅ Use <Link> for instant teleportation! */}
      <Link href="/">🏠 Home</Link>
      <Link href="/about">ℹ️ About</Link>
      <Link href="/blog/hello-world">📖 Blog</Link>
    </nav>
  );
}`,
            explanation:
              "Next.js automatically prefetches linked pages in the background so transitions are instant!",
          },
          {
            title: "Programmatic Navigation with useRouter",
            filename: "LoginButton.jsx",
            language: "jsx",
            code: `"use client"; // useRouter needs browser access!
import { useRouter } from "next/navigation"; // 👈 Remember: next/navigation!

export function LoginButton() {
  const router = useRouter();

  function handleLogin() {
    // Perform authentication logic here...
    // Teleport user to dashboard:
    router.push("/dashboard");
  }

  return <button onClick={handleLogin}>🔑 Log In</button>;
}`,
            explanation:
              "Always import useRouter from 'next/navigation' (App Router), NOT the older 'next/router'!",
          },
        ],
        checkInQuestions: [
          {
            question: "Why should we use `<Link href='/about'>` instead of `<a href='/about'>`?",
            answer: "Because `<Link>` performs instant client-side navigation without reloading the entire page!",
            why: "It keeps JavaScript memory alive, avoids screen flashes, and prefetches the target page in advance.",
          },
        ],
        keyTakeaways: [
          "Always use `Link` from `'next/link'` for clickable links.",
          "Use `useRouter` from `'next/navigation'` for code-driven redirects.",
        ],
      },
      {
        id: "loading-and-error-ui",
        timeRange: "3:30–3:50",
        title: "Loading UI & Error Circuit Breakers",
        durationMinutes: 20,
        spokenScript:
          "What happens when data is slow to fetch, or when a piece of code crashes? Next.js gives you automatic loading and error screens just by creating loading.js and error.js files in the folder!",
        analogies: [
          {
            title: "The Popcorn Timer (loading.js)",
            emoji: "🍿",
            description:
              "While your popcorn is popping in the microwave, the microwave displays a cheerful countdown timer so you know food is coming!",
          },
          {
            title: "The House Circuit Breaker (error.js)",
            emoji: "🛡️",
            description:
              "If the toaster shorts out in the kitchen, only the kitchen fuse clicks off. The rest of the house lights and TV stay on!",
          },
        ],
        codeBlocks: [
          {
            title: "Automatic Loading UI",
            filename: "app/dashboard/loading.js",
            language: "jsx",
            code: `// app/dashboard/loading.js
export default function DashboardLoading() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>⏳ Loading your dashboard... popping fresh popcorn! 🍿</h2>
    </div>
  );
}`,
            explanation:
              "Next.js shows this automatically while the server fetches dashboard data!",
          },
          {
            title: "Automatic Error Boundary Fallback",
            filename: "app/dashboard/error.js",
            language: "jsx",
            code: `"use client"; // error.js MUST be a Client Component!

export default function DashboardError({ error, reset }) {
  return (
    <div style={{ padding: "20px", background: "#fee2e2", borderRadius: "10px" }}>
      <h2>🚨 Oops! Something broke in this section.</h2>
      <p style={{ color: "#b91c1c" }}>{error.message}</p>
      {/* reset() tries to re-render the page without full refresh */}
      <button onClick={() => reset()} style={{ padding: "8px 16px", cursor: "pointer" }}>
        🔄 Try Again
      </button>
    </div>
  );
}`,
            explanation:
              "If an error throws inside dashboard, this fallback appears without crashing the header, footer, or rest of the app.",
          },
          {
            title: "Custom 404 Page",
            filename: "app/not-found.js",
            language: "jsx",
            code: `import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🛸 404 - Lost in Outer Space!</h1>
      <p>We searched every galaxy, but could not find this page.</p>
      <Link href="/" style={{ color: "#10b981", fontWeight: "bold" }}>
        🚀 Beam me back home
      </Link>
    </div>
  );
}`,
            explanation:
              "Shows up whenever someone visits a URL that doesn't match any page.js.",
          },
        ],
        checkInQuestions: [
          {
            question: "Why does `error.js` require `'use client'` at the top?",
            answer: "Because error boundaries are a client-side React feature that needs to catch runtime crashes in the browser!",
            why: "The `reset()` retry button must execute interactively inside the user's browser.",
          },
        ],
        keyTakeaways: [
          "`loading.js` shows instant streaming feedback.",
          "`error.js` isolates crashes so one broken widget doesn't destroy the whole site.",
          "`not-found.js` gives visitors a friendly way back home.",
        ],
      },
      {
        id: "wrap-up-and-homework",
        timeRange: "3:50–4:00",
        title: "Wrap-Up, 2026 Recap & 4 Fun Homework Challenges",
        durationMinutes: 10,
        spokenScript:
          "Give yourselves a massive round of applause! In just 4 hours, you have mastered the mental model of Next.js: Server Components by default, folder-based routing, dynamic variables with await params, shared layouts, instant teleportation links, and built-in error shields. Here are 4 fun homework challenges to practice tonight!",
        analogies: [
          {
            title: "The Master Builder Badge",
            emoji: "🏆",
            description:
              "You now possess the blueprints to build production-grade web apps. Every complex web app is just these 5 magic files connected together!",
          },
        ],
        codeBlocks: [],
        checkInQuestions: [
          {
            question: "What are the 5 special reserved filenames in Next.js App Router?",
            answer: "page.js, layout.js, loading.js, error.js, and not-found.js!",
            why: "These 5 files give you 90% of everything you need to build any web application.",
          },
        ],
        keyTakeaways: [
          "Challenge 1: Build `/superheroes/[name]/page.js` displaying custom superhero profiles.",
          "Challenge 2: Add a custom layout with a banner for the superhero database.",
          "Challenge 3: Create a `loading.js` with an animated emoji.",
          "Challenge 4: Deliberately throw an error (`throw new Error('Kaboom!')`) to watch `error.js` catch it live!",
        ],
      },
    ],
  },
];
