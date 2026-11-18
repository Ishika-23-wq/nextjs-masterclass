import { TopicContent } from "@/types";

export const unit5Topics: TopicContent[] = [
  {
    id: "image-and-font-optimization",
    unitId: "unit-5",
    title: "Image & Font Optimization (next/image, next/font)",
    shortSummary: "Learn image and font optimization using the Picture Frame analogy: auto-resizing, zero layout shift, WebP compression, and zero-flicker Google fonts.",
    order: 1,
    tags: ["next/image", "next/font", "Core Web Vitals", "CLS", "Optimization"],

    simpleExplanation:
      "Imagine you want to hang a photo on your wall:\n\n" +
      "1. **The Old HTML <img> Problem (The Heavy Picture Frame)**:\n" +
      "In standard HTML, you write `<img src='vacation.jpg'>`. Your mobile phone downloads a giant 12-Megabyte camera photo! Worse yet, before the image finishes downloading, the browser doesn't know how big it is. When the picture suddenly pops in 3 seconds later, the entire page jumps down, making the user click the wrong button! This annoying jumping is called **Cumulative Layout Shift (CLS)**.\n\n" +
      "2. **The Next.js Solution (<Image />)**:\n" +
      "Next.js automatically cuts the photo into the exact size of your phone screen! It converts it into modern **WebP** or **AVIF** format (up to 90% smaller!). And because you provide `width` and `height` (or `fill`), Next.js reserves the exact frame space so the webpage NEVER jumps!\n\n" +
      "3. **Zero-Layout-Shift Google Fonts (next/font)**:\n" +
      "Normally, custom fonts load from external Google servers, causing a flash of weird system fonts before switching. In Next.js, `next/font` downloads your font ONCE during `npm run build` and embeds it directly into your HTML. Zero extra network requests, zero flickering!",

    whyNeeded:
      "Unoptimized images and fonts account for over 70% of total website page weight. Using `next/image` and `next/font` can transform a slow 5-second website into a blazing-fast 0.5-second experience that achieves a perfect 100/100 Google Lighthouse score.",

    reactVsNext: {
      concept: "Asset Optimization Strategy",
      reactWay: {
        title: "Unoptimized Standard HTML <img> Tag",
        code: `// Traditional client-side approach:
export function HeroBanner() {
  return (
    <div>
      {/* ⚠️ Downloads full 10MB uncompressed file on mobile */}
      {/* ⚠️ Causes severe layout shift (jumping text) when loaded */}
      <img src="/hero-banner.png" alt="University Campus" />
    </div>
  );
}`,
        explanation:
          "Standard img tags do not perform automatic responsive resizing, format conversion (WebP/AVIF), or layout reservation.",
        drawbacks: [
          "Downloads full-resolution files regardless of user screen size",
          "Causes Cumulative Layout Shift (CLS) as images pop in",
          "External Google Fonts trigger layout shifts and privacy tracking",
        ],
      },
      nextjsWay: {
        title: "Next.js Built-In Optimization (next/image & next/font)",
        code: `// src/components/HeroBanner.js (Pure JavaScript!)
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function HeroBanner() {
  return (
    <div className={inter.className}>
      {/* Automatically serves WebP, resized for phone screen, zero jump! */}
      <Image
        src="/campus.jpg"
        alt="University Campus"
        width={800}
        height={450}
        priority // Preloads above-the-fold image for instant LCP!
        className="rounded-2xl shadow-lg"
      />
    </div>
  );
}`,
        explanation:
          "Next.js optimizes images on the fly via its built-in server image pipeline and self-hosts Google Fonts at build time.",
        benefits: [
          "Automatic modern WebP/AVIF compression (up to 90% smaller files)",
          "Zero layout shift: dimensions are reserved in advance",
          "Google fonts self-hosted with zero external network delay",
        ],
      },
      whyDifferent:
        "Next.js includes an automated image processing engine and build-time font optimizer, eliminating manual Photoshop resizing and external CDN hops.",
      mentalShiftSummary:
        "Replace every `<img>` tag with `import Image from 'next/image'`. Import fonts from `next/font/google` instead of pasting `<link>` tags in HTML.",
    },

    basicExample: {
      title: "Optimized Campus Card with Image and Custom Font in Plain JavaScript",
      description: "A complete card component using next/image and next/font in plain JavaScript.",
      language: "jsx",
      filename: "src/components/CampusCard.js",
      code: `// src/components/CampusCard.js
import Image from "next/image";
import { Roboto } from "next/font/google";

// Self-host Google Font at build time:
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export function CampusCard() {
  return (
    <div className={\`max-w-md p-4 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3 \${roboto.className}\`}>
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950">
        {/* next/image with responsive fill: */}
        <Image
          src="/images/campus-library.jpg"
          alt="Modern University Central Library"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-mono text-emerald-400">Campus Tour</span>
        <h3 className="text-lg font-bold text-zinc-100">Central Academic Library</h3>
        <p className="text-zinc-400 text-xs leading-relaxed">
          Open 24/7 with over 50,000 reference books, quiet study lounges, and modern computer labs.
        </p>
      </div>
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 2: import Image from 'next/image'; imports the Next.js smart image component.\n- Line 3: import { Roboto } from 'next/font/google'; downloads the Google font during build time.\n- Line 6-9: Configures font weights and subsets with zero external CDN delay.\n- Line 16-24: <Image fill ... /> tells Next.js to fill the parent container while sizes informs the browser what image size to fetch for mobile vs desktop!\n\nWhat happens in the browser?\n1. The visitor opens the page on a mobile device.\n2. Next.js serves a tiny 40KB WebP version of the image instead of the original 5MB photo.\n3. The aspect-video container reserves the exact space so the text never jumps down.\n4. The Roboto font displays immediately with zero flash of unstyled text!",
      outputPreview: "A campus card with an optimized photo and custom Roboto font with zero layout shift.",
    },

    moreExamples: [
      {
        title: "Responsive Full-Bleed Hero Image with Fill Property",
        description: "How to use the fill prop for responsive background images.",
        language: "jsx",
        filename: "src/components/HeroCover.js",
        code: `// src/components/HeroCover.js
import Image from "next/image";

export function HeroCover() {
  return (
    <div className="relative h-64 w-full rounded-2xl overflow-hidden">
      <Image
        src="/images/hero-background.jpg"
        alt="Graduation Ceremony"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-3xl font-extrabold text-white">Next.js Masterclass 2026</h1>
      </div>
    </div>
  );
}`,
        explanation:
          "When using `fill`, the parent container must have `position: relative` or `position: absolute`. This allows the image to stretch responsively across any screen width.",
      },
    ],

    multipleWays: [
      {
        name: "Fixed Dimensions (width & height)",
        syntax: "<Image src='/pic.png' width={400} height={300} alt='...' />",
        codeSnippet: "<Image src='/logo.png' width={120} height={40} alt='Logo' />",
        howItWorks: "Next.js computes exact aspect ratio and serves matching resolutions.",
        pros: ["Explicit pixel bounds", "Guaranteed zero layout shift"],
        cons: ["Requires knowing the exact pixel dimensions in advance"],
        whenToUse: "Avatars, icons, logos, fixed-dimension cards.",
        isRecommended: true,
      },
      {
        name: "Responsive Container (fill)",
        syntax: "<Image src='/pic.png' fill sizes='...' alt='...' />",
        codeSnippet: "<div className='relative h-60'><Image src='/hero.jpg' fill alt='Hero' /></div>",
        howItWorks: "Expands to match the size of its parent CSS container.",
        pros: ["Great for responsive full-width banners and flexible grids"],
        cons: ["Parent element must have position: relative or absolute"],
        whenToUse: "Hero banners, responsive gallery grids, background covers.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use width and height for logos, icons, and avatars. Use fill with a relative parent wrapper for responsive banners and card thumbnails.",
      scenarios: [
        {
          scenario: "Displaying a student profile avatar picture",
          recommendedApproach: "<Image width={48} height={48} className='rounded-full' />",
          reason: "Avatars have fixed dimensions that should never stretch.",
        },
        {
          scenario: "A responsive blog post cover photo spanning the full width of the phone",
          recommendedApproach: "<div className='relative aspect-video'><Image fill sizes='100vw' /></div>",
          reason: "Maintains a 16:9 aspect ratio across all phone, tablet, and laptop screen sizes.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using standard <img> instead of Next.js <Image>",
        badCode: `// ❌ BAD: Standard HTML image
<img src="/huge-camera-photo.jpg" alt="Campus" />`,
        goodCode: `// ✅ GOOD: Use next/image
import Image from "next/image";
<Image src="/huge-camera-photo.jpg" width={600} height={400} alt="Campus" />`,
        whyItBreaks: "Standard <img> tags bypass all Next.js optimization, downloading massive uncompressed files and hurting your Google SEO rankings.",
        howToFix: "Always import Image from 'next/image' and supply width, height, and alt attributes.",
      },
    ],

    bestPractices: [
      {
        title: "Always Add Descriptive alt Text",
        rule: "Every Image component must include a meaningful alt text describing the image.",
        explanation: "alt text ensures web accessibility for screen readers and helps search engines understand image contents for SEO.",
      },
    ],

    exercises: [
      {
        id: "u5-ex-1",
        title: "Build an Optimized Student Avatar",
        difficulty: "easy",
        estimatedMinutes: 5,
        prompt:
          "Write a component in src/components/Avatar.js in plain JavaScript using next/image that renders a 48x48 rounded avatar for '/images/student.png'.",
        initialCode: `// src/components/Avatar.js
// TODO: Use next/image to render 48x48 avatar
export function Avatar() {
  return <div>Avatar</div>;
}`,
        expectedOutput: "A functional 48x48 avatar component using next/image.",
        hints: ["Pass `width={48}` and `height={48}` and `className='rounded-full'`"],
        solutionCode: `// src/components/Avatar.js
import Image from "next/image";

export function Avatar() {
  return (
    <Image
      src="/images/student.png"
      alt="Student Profile Avatar"
      width={48}
      height={48}
      className="rounded-full border border-zinc-800"
    />
  );
}`,
        solutionExplanation: "Using next/image with fixed width and height reserves the 48px space and serves a compressed WebP format.",
      },
    ],

    quizzes: [
      {
        id: "u5-q1",
        syllabusTopic: "Image & Font Optimization",
        question: "How does next/image prevent Cumulative Layout Shift (CLS)?",
        conceptualExplanation: "By requiring width and height (or fill), the browser reserves the exact pixel space before the image bytes download, preventing page jumping.",
        options: [
          { id: "a", text: "By converting images into text files", isCorrect: false, explanation: "Images remain visual media." },
          { id: "b", text: "By requiring width and height (or fill) so the browser reserves the exact pixel space before the image downloads", isCorrect: true, explanation: "Correct! Reserving aspect ratio space prevents the page from jumping when the image finishes loading." },
          { id: "c", text: "By blocking all JavaScript from executing", isCorrect: false, explanation: "No." },
          { id: "d", text: "By deleting the image on slow mobile connections", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Online News & Magazine Portal",
      description: "How a high-traffic news platform delivers 1,000+ article photos with sub-second LCP speeds.",
      code: {
        title: "Breaking News Hero Header",
        description: "Priority image loading for above-the-fold news hero.",
        language: "jsx",
        filename: "src/components/NewsHero.js",
        code: `import Image from "next/image";

export function NewsHero({ article }) {
  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
      <Image
        src={article.coverUrl}
        alt={article.title}
        fill
        priority // Marks as top-priority for Largest Contentful Paint (LCP)
        sizes="(max-width: 1024px) 100vw, 800px"
        className="object-cover"
      />
    </div>
  );
}`,
      },
      keyTakeaway: "Adding the priority prop tells the browser to download hero images immediately, boosting LCP performance.",
    },

    combinedExample: {
      combinedTopics: ["next/image", "next/font", "Server Components"],
      title: "Course Card with Custom Typography",
      description: "Combining optimized images with Google fonts in a Server Component.",
      code: {
        title: "Course Showcase Card",
        description: "Optimized card with image and typography.",
        language: "jsx",
        filename: "src/components/CourseShowcase.js",
        code: `import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function CourseShowcase({ course }) {
  return (
    <div className={\`p-4 bg-zinc-900 rounded-xl space-y-3 \${inter.className}\`}>
      <Image src={course.thumbnail} alt={course.title} width={300} height={180} className="rounded-lg" />
      <h3 className="font-bold text-zinc-100">{course.title}</h3>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Google Font is inlined directly in HTML at build time",
        "next/image serves compressed WebP thumbnail",
        "Dimensions are reserved to eliminate layout shifts",
        "Visitor sees zero font flickering or page jumping",
      ],
    },
  },

  {
    id: "metadata-seo-sitemaps",
    unitId: "unit-5",
    title: "Metadata, SEO & Dynamic Social Cards",
    shortSummary: "Learn SEO using the Book Cover analogy: static metadata, dynamic generateMetadata, social media share cards, and sitemaps in plain JavaScript.",
    order: 2,
    tags: ["SEO", "Metadata", "generateMetadata", "OpenGraph", "Sitemap"],

    simpleExplanation:
      "Imagine walking into a massive library with 1,000,000 books:\n\n" +
      "1. **The Book Cover (Metadata)**:\n" +
      "If a book has a blank black cover with no title or author, nobody will ever open it! **Metadata** is the title, description, and author printed on the book cover. In Next.js, you simply export a `metadata` object from your `page.js` or `layout.js`, and Next.js automatically prints it into the HTML `<head>` for Google to find!\n\n" +
      "2. **Social Media Share Cards (OpenGraph)**:\n" +
      "When someone copies your link and pastes it into WhatsApp, Discord, or Twitter, how does the app know to show a picture, title, and summary? It reads your **OpenGraph (og:) tags**! Next.js lets you define OpenGraph titles and images with simple JavaScript objects.\n\n" +
      "3. **Dynamic Metadata (generateMetadata)**:\n" +
      "What if you have 10,000 blog posts? You don't write 10,000 metadata files! You export an `async function generateMetadata({ params })` that reads the post title from your database and creates a custom book cover for every single article automatically!\n\n" +
      "4. **The Library Index Map (sitemap.js)**:\n" +
      "A sitemap is a map of every single page on your website so Google's search crawlers can discover and index all your articles.",

    whyNeeded:
      "If Google cannot read your website's titles and descriptions, your project will remain invisible on the internet. Next.js provides a built-in server metadata system that ensures search engines and social platforms receive rich SEO previews on the very first HTTP request.",

    reactVsNext: {
      concept: "Search Engine Optimization (SEO)",
      reactWay: {
        title: "Client-Side Head Tag Injection",
        code: `// Traditional client-side approach:
// <title>My React App</title>
// Search engines see the exact same title on every page!
// Even with react-helmet:
import { Helmet } from "react-helmet";

function ArticlePage() {
  return (
    <div>
      {/* ⚠️ Runs in the browser AFTER JavaScript loads! */}
      {/* Social scrapers (WhatsApp, Twitter) NEVER see this! */}
      <Helmet>
        <title>Dynamic Article</title>
      </Helmet>
    </div>
  );
}`,
        explanation:
          "Social media crawlers (like WhatsApp and Twitter) do not execute client-side JavaScript. They read the initial raw HTML, which must be served pre-rendered from the server.",
        drawbacks: [
          "WhatsApp and Twitter preview cards fail or show blank placeholders",
          "Google search bots struggle to parse client-side meta tags",
          "Requires third-party packages like react-helmet",
        ],
      },
      nextjsWay: {
        title: "Next.js Native Server Metadata (Injected in Raw HTML)",
        code: `// src/app/blog/[slug]/page.js (Pure JavaScript!)
// 1. Dynamic metadata runs on the server:
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  return {
    title: \`\${post.title} | NextMastery\`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.coverImage],
    },
  };
}

// 2. Page Component:
export default async function BlogPostPage({ params }) {
  return <article>{/* Article content */}</article>;
}`,
        explanation:
          "Next.js evaluates `generateMetadata` on the server and injects full `<title>`, `<meta>`, and `<meta property='og:...'>` tags directly into the raw HTML `<head>`.",
        benefits: [
          "100% reliable WhatsApp, Twitter, and Discord preview cards",
          "Google search crawler indexes article titles on first pass",
          "Zero client JavaScript overhead",
        ],
      },
      whyDifferent:
        "Next.js renders metadata directly into the server HTML stream before transmitting the response to search engines.",
      mentalShiftSummary:
        "Delete react-helmet. Export `export const metadata = { ... }` or `export async function generateMetadata() { ... }` from page.js.",
    },

    basicExample: {
      title: "Dynamic Article Metadata in Plain JavaScript",
      description: "Generating custom SEO titles and social share cards dynamically based on route parameters.",
      language: "jsx",
      filename: "src/app/blog/[slug]/page.js",
      code: `// src/app/blog/[slug]/page.js

// 1. Dynamic SEO Metadata Generator in plain JavaScript:
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // In production, fetch article details from database or API:
  const article = {
    title: slug.replace(/-/g, " ").toUpperCase(),
    description: \`Comprehensive guide to mastering \${slug} in Next.js App Router.\`,
    author: "Ishika Verma",
  };

  return {
    title: \`\${article.title} - NextMastery\`,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      images: [
        {
          url: \`https://my-school.com/api/og?title=\${encodeURIComponent(article.title)}\`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

// 2. Main Page Component:
export default async function ArticlePage({ params }) {
  const { slug } = await params;

  return (
    <article className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-extrabold text-zinc-100 capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="text-zinc-400 leading-relaxed">
        This article has custom server-rendered metadata for Google search and social media share cards.
      </p>
    </article>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 4: export async function generateMetadata({ params }) tells Next.js to run this function on the server to prepare HTML <head> tags.\n- Line 5: const { slug } = await params; extracts the route parameter from the URL.\n- Line 14-30: Returns a standard metadata configuration object with title, description, and openGraph image specifications.\n- Line 34-47: Renders the actual article page.\n\nWhat happens in the browser?\n1. A student shares the link https://my-school.com/blog/javascript-basics on WhatsApp.\n2. WhatsApp's server crawler sends an HTTP GET request.\n3. Next.js runs generateMetadata, puts the title and image in the raw HTML <head>, and sends it back in 5ms.\n4. WhatsApp displays a beautiful rich preview card with the article's title, description, and cover photo!",
      outputPreview: "Renders article with title and paragraph, while injecting complete OpenGraph social tags into HTML <head>.",
    },

    moreExamples: [
      {
        title: "Automated Sitemap Generator (sitemap.js) in Plain JavaScript",
        description: "Creating an automated sitemap.xml listing all website pages for Google search crawlers.",
        language: "jsx",
        filename: "src/app/sitemap.js",
        code: `// src/app/sitemap.js
// Next.js automatically turns this into /sitemap.xml!

export default async function sitemap() {
  const baseUrl = "https://nextjs-masterclass.vercel.app";

  // Static core routes:
  const routes = ["", "/about", "/units", "/cheatsheet", "/projects"].map((route) => ({
    url: \`\${baseUrl}\${route}\`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}`,
        explanation:
          "Exporting a default function from `src/app/sitemap.js` automatically produces a valid XML sitemap at `/sitemap.xml` for Google and Bing search indexers.",
      },
    ],

    multipleWays: [
      {
        name: "Static Metadata Object (export const metadata)",
        syntax: "export const metadata = { title: '...', description: '...' }",
        codeSnippet: "export const metadata = { title: 'About Us | MySchool', description: 'Our history' };",
        howItWorks: "Evaluated once at build time for static routes.",
        pros: ["Simple string declarations", "Zero runtime database overhead"],
        cons: ["Cannot read dynamic URL params like [slug]"],
        whenToUse: "Home page, About page, Contact page, Terms of service.",
        isRecommended: true,
      },
      {
        name: "Dynamic Metadata Function (generateMetadata)",
        syntax: "export async function generateMetadata({ params })",
        codeSnippet: "export async function generateMetadata({ params }) { return { title: '...' }; }",
        howItWorks: "Runs asynchronously on the server to query database records based on route params.",
        pros: ["Fully customized titles and share cards for dynamic items"],
        cons: ["Requires an async function execution"],
        whenToUse: "Blog posts, course details, product pages, user profiles.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use `export const metadata` for static pages. Use `generateMetadata` for dynamic parameterized routes like `[slug]` or `[id]`.",
      scenarios: [
        {
          scenario: "University Home Page or Contact Page",
          recommendedApproach: "Static `export const metadata = { ... }`",
          reason: "Content never changes, so static metadata provides instant 0ms responses.",
        },
        {
          scenario: "Course page for INT257 showing the course title in the browser tab",
          recommendedApproach: "Dynamic `generateMetadata({ params })`",
          reason: "Needs to extract the course code from params and query the database for the course title.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Exporting metadata from a Client Component ('use client')",
        badCode: `// ❌ BAD: src/app/about/page.js
"use client"; // 💥 Error: You cannot export metadata from a Client Component!

export const metadata = { title: "About Us" };`,
        goodCode: `// ✅ GOOD: Keep page as Server Component, or extract client parts to child
// src/app/about/page.js (Server Component)
export const metadata = { title: "About Us" };
export default function AboutPage() { ... }`,
        whyItBreaks: "Metadata is strictly server-side. Next.js cannot inspect client-side JavaScript bundles to extract `<head>` metadata.",
        howToFix: "Only export `metadata` or `generateMetadata` from Server Components (without `'use client'`).",
      },
    ],

    bestPractices: [
      {
        title: "Use Title Templates in Root Layout",
        rule: "Configure title: { default: 'NextMastery', template: '%s | NextMastery' } in your root layout.js.",
        explanation: "This automatically appends your brand name to all child page titles with consistent formatting.",
      },
    ],

    exercises: [
      {
        id: "u5-ex-2",
        title: "Define Static Page Metadata",
        difficulty: "easy",
        estimatedMinutes: 5,
        prompt:
          "Write a static metadata export in src/app/contact/page.js in plain JavaScript containing a title 'Contact Support | University' and description 'Get in touch with campus staff.'.",
        initialCode: `// src/app/contact/page.js
// TODO: Export metadata object
export default function ContactPage() {
  return <h1>Contact Us</h1>;
}`,
        expectedOutput: "A page exporting a metadata configuration object.",
        hints: ["Export `const metadata = { title: '...', description: '...' }`"],
        solutionCode: `// src/app/contact/page.js
export const metadata = {
  title: "Contact Support | University",
  description: "Get in touch with campus staff.",
};

export default function ContactPage() {
  return <h1>Contact Us</h1>;
}`,
        solutionExplanation: "Next.js reads the exported metadata object and injects it into the HTML <head>.",
      },
    ],

    quizzes: [
      {
        id: "u5-q2",
        syllabusTopic: "Metadata & SEO",
        question: "Why do social media share cards (WhatsApp, Twitter) fail if you use client-side React Helmet instead of Next.js server metadata?",
        conceptualExplanation: "Social media web scrapers perform a fast HTTP GET request and do not execute client-side JavaScript. They require raw server-rendered meta tags.",
        options: [
          { id: "a", text: "Because social media scrapers do not run JavaScript and only read raw HTML from the server response", isCorrect: true, explanation: "Correct! Social scrapers perform a lightweight HTTP GET and parse the raw HTML <head>." },
          { id: "b", text: "Because Twitter only allows Python websites", isCorrect: false, explanation: "No." },
          { id: "c", text: "Because metadata files must be encrypted with RSA keys", isCorrect: false, explanation: "No." },
          { id: "d", text: "To make the server fan spin quieter", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Online Publishing Network",
      description: "How Medium or Substack generates dynamic social share preview cards for millions of articles.",
      code: {
        title: "Dynamic Social Share Card Generator",
        description: "Server-side OpenGraph metadata generation in plain JavaScript.",
        language: "jsx",
        filename: "src/app/articles/[id]/page.js",
        code: `export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: \`Article #\${id} Insights\`,
    openGraph: {
      title: \`Article #\${id} Insights\`,
      description: "Read top programming insights on NextMastery.",
      images: [\`/api/og?id=\${id}\`],
    },
  };
}`,
      },
      keyTakeaway: "Automated server metadata ensures every link shared on social media generates attractive, high-converting preview cards.",
    },

    combinedExample: {
      combinedTopics: ["Metadata", "Dynamic Routes", "Server Components"],
      title: "Course Catalog with Dynamic SEO",
      description: "Course detail page combining route params with dynamic OpenGraph metadata.",
      code: {
        title: "Dynamic Course Metadata",
        description: "Full SEO setup for course directory.",
        language: "jsx",
        filename: "src/app/courses/[code]/page.js",
        code: `export async function generateMetadata({ params }) {
  const { code } = await params;
  return {
    title: \`\${code} Course Syllabus\`,
    description: \`Official university academic curriculum for \${code}.\`,
  };
}

export default async function CourseDetailPage({ params }) {
  const { code } = await params;
  return <h1>Course Syllabus: {code}</h1>;
}`,
      },
      stepByStepFlow: [
        "User or Google bot visits /courses/INT257",
        "Next.js runs generateMetadata on the server",
        "Title and meta tags injected into HTML <head>",
        "Google search indexes the page with full curriculum details",
      ],
    },
  },

  {
    id: "performance-and-code-splitting",
    unitId: "unit-5",
    title: "Performance Optimization, Code Splitting & Core Web Vitals",
    shortSummary: "Learn web speed using the Day Trip Packing analogy: pack only what you need, use next/dynamic for heavy charts, and understand Core Web Vitals.",
    order: 3,
    tags: ["Performance", "next/dynamic", "Code Splitting", "Core Web Vitals", "Lighthouse"],

    simpleExplanation:
      "Imagine you are packing a backpack for a 2-hour afternoon walk in the park:\n\n" +
      "1. **The Overpacked Backpack Problem**:\n" +
      "If you pack a heavy winter ski jacket, scuba diving tanks, and a giant camping tent for a simple park walk, you will be exhausted and walk at 1 mile per hour! In web development, downloading a 500KB chart library or a 3D canvas viewer on a page that only shows text is overpacking!\n\n" +
      "2. **Code Splitting (Pack only what you need!)**:\n" +
      "Next.js automatically splits your JavaScript by page. When a user visits `/about`, they ONLY download the code for the About page. They don't download the code for the Dashboard or the Admin panel!\n\n" +
      "3. **Lazy Loading with next/dynamic**:\n" +
      "What if a page has a heavy pie chart that only appears when a user clicks 'View Analytics'? With `next/dynamic`, Next.js delays downloading the heavy chart until the user actually clicks the button!\n\n" +
      "4. **Core Web Vitals in 10-Year-Old Terms**:\n" +
      "- **LCP (Largest Contentful Paint)**: How fast does the main picture or headline show up? (Goal: under 2.5 seconds).\n" +
      "- **INP (Interaction to Next Paint)**: When I tap a button, does it react immediately? (Goal: under 200 milliseconds).\n" +
      "- **CLS (Cumulative Layout Shift)**: Does the page jump around while loading? (Goal: 0 jumps!).",

    whyNeeded:
      "Every additional 100ms of page load delay reduces e-commerce conversion rates by 7%. Google actively down-ranks slow websites that fail Core Web Vitals. Code splitting and lazy loading keep your JavaScript bundles feather-light.",

    reactVsNext: {
      concept: "Bundle Splitting & Lazy Loading",
      reactWay: {
        title: "Monolithic Single Client Bundle",
        code: `// In monolithic bundles without automatic route splitting:
// All routes and heavy libraries are bundled into one huge bundle.js!
import HeavyChart from "heavy-chart-library"; // 500 KB
import ComplexEditor from "monaco-editor";    // 2 MB

function App() {
  // Mobile users on slow 3G must download ALL 2.5 MB of code
  // even if they only want to read one paragraph of text on the Home page!
  return <HomePage />;
}`,
        explanation:
          "Without complex manual Webpack setup, single-page React apps bundle the entire codebase into monolithic JavaScript files.",
        drawbacks: [
          "Visitors download megabytes of unused code",
          "Slow initial load on mobile 4G connections",
          "Fails Google Core Web Vitals LCP thresholds",
        ],
      },
      nextjsWay: {
        title: "Next.js Automatic Route Splitting + next/dynamic",
        code: `// src/app/dashboard/page.js (Pure JavaScript!)
import dynamic from "next/dynamic";

// Lazy load the heavy chart component only when needed:
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <p className="text-zinc-500">Loading chart...</p>,
  ssr: false, // Disables server rendering if the library uses 'window'
});

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Fast Dashboard</h1>
      {/* Heavy 500KB chart code is downloaded in the background! */}
      <HeavyChart />
    </div>
  );
}`,
        explanation:
          "Next.js splits code per route by default, and `next/dynamic` provides one-line lazy loading for heavy client components.",
        benefits: [
          "Automatic per-page code splitting with zero configuration",
          "Lazy load heavy client libraries with `next/dynamic`",
          "SSR control: use `{ ssr: false }` for browser-only canvas or chart packages",
        ],
      },
      whyDifferent:
        "Next.js App Router uses Server Components by default (which contribute 0 KB to the client bundle) combined with automatic route-level code splitting.",
      mentalShiftSummary:
        "Don't import heavy charts or editors statically at the top of client files. Lazy load them with `dynamic(() => import(...))`.",
    },

    basicExample: {
      title: "Lazy Loading a Heavy Chart Component with next/dynamic",
      description: "Splitting a heavy analytics widget into an on-demand bundle in plain JavaScript.",
      language: "jsx",
      filename: "src/app/analytics/page.js",
      code: `// src/app/analytics/page.js
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// 1. Lazy load the heavy interactive chart widget:
const StudentGradeChart = dynamic(
  () => import("@/components/StudentGradeChart"),
  {
    loading: () => (
      <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 text-xs">
        ⏳ Loading Analytics Engine...
      </div>
    ),
    ssr: false, // Safe for libraries relying on browser window/canvas
  }
);

export default function AnalyticsPage() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-100">Performance & Analytics</h1>
        <p className="text-zinc-400 text-sm mt-1">
          The heavy chart library is not downloaded until you click the button below!
        </p>
      </div>

      {!showChart ? (
        <button
          onClick={() => setShowChart(true)}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          📊 Load Performance Chart
        </button>
      ) : (
        <div className="space-y-3">
          <StudentGradeChart />
          <button
            onClick={() => setShowChart(false)}
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            Hide Chart
          </button>
        </div>
      )}
    </div>
  );
}`,
      explanation:
        "Line-by-line explanation:\n- Line 4: import dynamic from 'next/dynamic'; imports Next.js lazy-loading tool.\n- Line 7-17: dynamic(() => import(...)) creates a lazy-loaded component. Notice { ssr: false } which ensures that browser-only libraries using window or canvas don't crash during server pre-rendering!\n- Line 10-14: loading: () => (...) provides an instant placeholder while the chunk downloads.\n- Line 30-36: The heavy JavaScript file is NOT downloaded when the page first opens! It is only fetched over the network the exact moment the student clicks 'Load Performance Chart'.\n\nWhat happens in the browser?\n1. The visitor opens /analytics. Initial download size is tiny (under 15KB).\n2. Page paints in 50ms with a perfect 100 Google Lighthouse speed score.\n3. When the user taps the button, Next.js quietly downloads the chart chunk and swaps it in seamlessly!",
      outputPreview: "A button that loads an on-demand analytics chart with a loading placeholder during the bundle download.",
    },

    moreExamples: [
      {
        title: "Lazy Loading a Client Modal with next/dynamic",
        description: "Deferring a registration dialog until the user clicks an 'Open' trigger in plain JavaScript.",
        language: "jsx",
        filename: "src/components/EnrollmentTrigger.js",
        code: `// src/components/EnrollmentTrigger.js
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const EnrollmentModal = dynamic(() => import("@/components/EnrollmentModal"));

export function EnrollmentTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm"
      >
        Enroll Now
      </button>

      {open && <EnrollmentModal onClose={() => setOpen(false)} />}
    </div>
  );
}`,
        explanation:
          "Modal dialogs with complex validation forms and animation libraries should always be dynamically imported so they don't slow down the main page load.",
      },
    ],

    multipleWays: [
      {
        name: "next/dynamic Lazy Loading (Recommended)",
        syntax: "const Comp = dynamic(() => import('./Comp'), { ssr: false })",
        codeSnippet: "const Map = dynamic(() => import('@/components/Map'), { ssr: false });",
        howItWorks: "Splits component into a separate bundle downloaded on demand.",
        pros: ["Supports ssr: false for browser-only packages", "Built-in loading fallback"],
        cons: ["Slight visual delay when the chunk downloads"],
        whenToUse: "Heavy charts, rich-text markdown editors, interactive 3D canvases, modals.",
        isRecommended: true,
      },
      {
        name: "React.lazy + Suspense",
        syntax: "const Comp = React.lazy(() => import('./Comp'))",
        codeSnippet: "const Comp = React.lazy(() => import('./Comp')); <Suspense fallback={<p>...</p>}><Comp /></Suspense>",
        howItWorks: "Standard React lazy loading mechanism.",
        pros: ["Native React feature"],
        cons: ["Does not support ssr: false for browser-only libraries"],
        whenToUse: "Pure client-side React setups without server pre-rendering constraints.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use next/dynamic with { ssr: false } for any third-party library that crashes on the server with 'window is not defined' (e.g. Chart.js, Leaflet maps, Monaco editor).",
      scenarios: [
        {
          scenario: "Interactive campus map powered by Leaflet.js (uses 'window')",
          recommendedApproach: "dynamic(() => import('@/components/Map'), { ssr: false })",
          reason: "Leaflet accesses the browser 'window' object, so server rendering would throw a fatal error.",
        },
        {
          scenario: "Standard text paragraph with student bio",
          recommendedApproach: "Server Component (Default)",
          reason: "Zero client bundle weight; no need for dynamic imports.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Importing heavy chart libraries at the top of every file statically",
        badCode: `// ❌ BAD: Static import of heavy 500KB chart library
import Chart from "chart.js/auto";`,
        goodCode: `// ✅ GOOD: Lazy load with next/dynamic
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("@/components/MyChart"), { ssr: false });`,
        whyItBreaks: "Forces every visitor to download hundreds of kilobytes of code even if they never look at the chart.",
        howToFix: "Use next/dynamic to defer loading until the component is actually rendered.",
      },
    ],

    bestPractices: [
      {
        title: "Audit with Lighthouse Regularly",
        rule: "Run Chrome DevTools Lighthouse audits to verify Core Web Vitals (LCP < 2.5s, CLS < 0.1).",
        explanation: "Frequent audits identify bundle bloat and layout shifts before they reach production.",
      },
    ],

    exercises: [
      {
        id: "u5-ex-3",
        title: "Lazy Load a Rich Text Editor",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a statement in src/components/EditorWrapper.js in plain JavaScript using `next/dynamic` that dynamically imports `@/components/RichTextEditor` with `{ ssr: false }`.",
        initialCode: `// src/components/EditorWrapper.js
// TODO: Dynamically import RichTextEditor
`,
        expectedOutput: "A dynamic component import with SSR disabled.",
        hints: ["Use `const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false })`"],
        solutionCode: `// src/components/EditorWrapper.js
import dynamic from "next/dynamic";

export const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor"),
  { ssr: false }
);`,
        solutionExplanation: "Disabling SSR prevents 'window is not defined' crashes during server pre-rendering.",
      },
    ],

    quizzes: [
      {
        id: "u5-q3",
        syllabusTopic: "Performance & Code Splitting",
        question: "Why would you pass `{ ssr: false }` to `next/dynamic`?",
        conceptualExplanation: "{ ssr: false } tells Next.js to skip server-side pre-rendering for components that require browser APIs like 'window' or 'document'.",
        options: [
          { id: "a", text: "It prevents 'window is not defined' errors during server rendering for browser-only libraries like canvas or Monaco", isCorrect: true, explanation: "Correct! { ssr: false } skips server rendering and mounts the component strictly on the client where 'window' exists." },
          { id: "b", text: "It disables CSS styling", isCorrect: false, explanation: "CSS is unaffected." },
          { id: "c", text: "It deletes the database", isCorrect: false, explanation: "No." },
          { id: "d", text: "It speeds up compilation", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Financial Stock Trading Platform",
      description: "How a trading dashboard defers heavy candlestick charts until the user selects a stock ticker.",
      code: {
        title: "On-Demand Candlestick Chart",
        description: "Lazy loaded trading chart in plain JavaScript.",
        language: "jsx",
        filename: "src/components/StockDashboard.js",
        code: `import dynamic from "next/dynamic";

const CandlestickChart = dynamic(
  () => import("@/components/CandlestickChart"),
  { ssr: false, loading: () => <p>Loading chart data...</p> }
);

export function StockDashboard({ ticker }) {
  return (
    <div>
      <h2>Ticker: {ticker}</h2>
      <CandlestickChart symbol={ticker} />
    </div>
  );
}`,
      },
      keyTakeaway: "Lazy loading heavy chart engines keeps the initial financial dashboard responsive and quick to load.",
    },

    combinedExample: {
      combinedTopics: ["next/dynamic", "Server Components", "Performance"],
      title: "Interactive Demo Sandbox with Dynamic Import",
      description: "Loading a browser code editor on demand inside a Server Component article.",
      code: {
        title: "Code Playground Loader",
        description: "Lazy loading code editor widget.",
        language: "jsx",
        filename: "src/components/PlaygroundLoader.js",
        code: `import dynamic from "next/dynamic";

const CodePlayground = dynamic(() => import("@/components/CodePlayground"), {
  ssr: false,
  loading: () => <div className="p-8 bg-zinc-900 rounded-xl">Loading IDE...</div>,
});

export function PlaygroundSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Interactive Sandbox</h2>
      <CodePlayground />
    </section>
  );
}`,
      },
      stepByStepFlow: [
        "Initial article HTML renders with 0 KB editor code",
        "next/dynamic downloads Monaco editor bundle in the background",
        "Placeholder is replaced seamlessly once chunk arrives",
        "Perfect 100/100 Lighthouse performance maintained",
      ],
    },
  },

  {
    id: "production-build-and-deployment",
    unitId: "unit-5",
    title: "Production Builds, Standalone Output & Deployment",
    shortSummary: "Learn production deployments using the Practice vs Championship analogy: npm run build, standalone output, and hosting on Vercel or Node.js.",
    order: 4,
    tags: ["Deployment", "npm run build", "Vercel", "Standalone", "Production"],

    simpleExplanation:
      "Imagine an Olympic soccer team:\n\n" +
      "1. **The Practice Session (\`npm run dev\`)**:\n" +
      "On the practice field, the coach constantly stops play, blows the whistle, writes notes on a whiteboard, and tests wild new formations. It is slow and noisy, but perfect for learning and fixing mistakes. That is `npm run dev`! It has debuggers, file watchers, and fast refresh enabled, but it is too slow and heavy for real spectators!\n\n" +
      "2. **Packing the Gear (\`npm run build\`)**:\n" +
      "Before the big game, the team washes the uniforms, packs only the essential cleats, compresses the playbook, and turns on all performance optimizers. Next.js creates optimized static HTML, compresses JavaScript, and checks every route for errors.\n\n" +
      "3. **The Big Championship Game (\`npm run start\` or Vercel)**:\n" +
      "In the packed stadium, there are no practice whistles. The game runs at maximum speed! Zero debug lag, instant CDN caching, and rock-solid stability!\n\n" +
      "**Where can you deploy?**\n" +
      "- **Vercel**: The creators of Next.js! Just connect your GitHub repo, and it deploys automatically to global Edge servers worldwide in 30 seconds.\n" +
      "- **Self-Hosted Node.js / Docker**: Using `output: 'standalone'` in your `next.config.js`, you can run your Next.js app on any Linux server, VPS, or Docker container with minimal memory!",

    whyNeeded:
      "Running `npm run dev` on a public production server is dangerous: it consumes 10x more memory, exposes debug information, and runs much slower. A compiled production build (`npm run build`) guarantees speed, security, and stability.",

    reactVsNext: {
      concept: "Build Output & Deployment",
      reactWay: {
        title: "Static Client-Only Build",
        code: `// Traditional client-side approach:
// npm run build creates a simple static folder:
// dist/
// ├── index.html
// └── bundle.js
// ⚠️ Cannot run Server Actions, cannot run Route Handlers,
// cannot do SSR or ISR! Must host backend separately!`,
        explanation:
          "Pure static client builds produce client assets that require a separate backend server for database tasks and API routes.",
        drawbacks: [
          "Static files only; zero server logic or API execution",
          "Cannot handle private cookies or server-side auth",
          "Requires double hosting: static hosting for frontend + server for backend",
        ],
      },
      nextjsWay: {
        title: "Next.js Full-Stack Production Build",
        code: `// In Next.js:
// npm run build creates the .next/ production distribution:
// ○  (Static)   - Rendered once at build time (0ms CDN delivery!)
// ƒ  (Dynamic)  - Rendered on demand on server (SSR / API / Actions!)
//
// To run locally in production mode:
// 1. npm run build
// 2. npm run start (Runs optimized production server!)`,
        explanation:
          "Next.js build analyzes every route and automatically categorizes it as Static (SSG) or Dynamic (SSR), creating an optimized multi-tier deployment bundle.",
        benefits: [
          "Unified full-stack build: pages, APIs, and actions compiled together",
          "Automatic route classification (Static vs Dynamic)",
          "Deploy anywhere: Vercel, Node.js server, Docker, AWS, or Railway",
        ],
      },
      whyDifferent:
        "Next.js builds a hybrid artifact containing both static assets for CDN distribution and serverless functions for dynamic execution.",
      mentalShiftSummary:
        "Never run `npm run dev` in production. Always test with `npm run build` followed by `npm run start` before deploying.",
    },

    basicExample: {
      title: "Configuring Standalone Docker Output in Plain JavaScript",
      description: "Enabling standalone output in next.config.js for minimal Docker and Node.js deployments.",
      language: "javascript",
      filename: "next.config.js",
      code: `// next.config.js (Plain JavaScript!)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Enable Standalone Output:
  // Next.js automatically bundles ONLY the required node_modules,
  // shrinking your Docker image from 1GB down to under 100MB!
  output: "standalone",

  // 2. Image Optimization Domains:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;`,
      explanation:
        "Line-by-line explanation:\n- Line 4: output: 'standalone' tells Next.js: 'Trace all imports and create a minimal self-contained server in .next/standalone.'\n- Line 9-16: Configures allowed image domains for secure next/image optimization.\n\nWhat happens during deployment?\n1. You run npm run build on your server or CI/CD pipeline.\n2. Next.js bundles your server components, actions, and dependencies into .next/standalone.\n3. You run `node .next/standalone/server.js`.\n4. Your full-stack Next.js application runs with minimal memory usage and zero external dependencies!",
      outputPreview: "Build output summary showing static (○) and dynamic (ƒ) routes generated successfully.",
    },

    moreExamples: [
      {
        title: "Standard Production Dockerfile for Next.js",
        description: "A production-grade multi-stage Dockerfile for hosting Next.js on any cloud server.",
        language: "bash",
        filename: "Dockerfile",
        code: `# 1. Install dependencies stage:
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2. Build application stage:
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Production runner stage (Under 100MB!):
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]`,
        explanation:
          "This multi-stage Docker build produces an ultra-lightweight production container by discarding unnecessary devDependencies and source files.",
      },
    ],

    multipleWays: [
      {
        name: "Vercel Zero-Config Deployment (Recommended)",
        syntax: "git push origin main (Connected to Vercel)",
        codeSnippet: "vercel deploy --prod",
        howItWorks: "Vercel automatically detects Next.js, optimizes assets, and distributes routes to global Edge CDN nodes.",
        pros: ["Zero server management", "Automatic preview URLs on pull requests", "Global Edge CDN"],
        cons: ["Vendor lock-in if using advanced proprietary features"],
        whenToUse: "Default recommendation for all Next.js applications.",
        isRecommended: true,
      },
      {
        name: "Self-Hosted Node.js / VPS",
        syntax: "npm run build && npm run start",
        codeSnippet: "node .next/standalone/server.js",
        howItWorks: "Runs as a standard long-lived Node.js HTTP server on Ubuntu / Docker.",
        pros: ["Total control over server infrastructure", "Fixed server cost"],
        cons: ["Requires manual SSL certificate renewal, Nginx reverse proxy, and server monitoring"],
        whenToUse: "Enterprise private clouds, on-premise university servers, strict compliance requirements.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Deploy to Vercel for instant automatic scaling and zero devops. Use standalone Docker containers for enterprise self-hosting.",
      scenarios: [
        {
          scenario: "Launching a modern student portal or startup MVP",
          recommendedApproach: "Vercel Git Integration",
          reason: "Connect GitHub repo once and get automatic preview deployments, SSL, and CDN.",
        },
        {
          scenario: "University internal intranet with strict on-premise firewall rules",
          recommendedApproach: "Standalone Docker container on local Linux server",
          reason: "Data never leaves the university campus network.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Running 'npm run dev' on a live production server",
        badCode: `// ❌ DANGEROUS: Running the dev server in production!
npm run dev`,
        goodCode: `// ✅ SECURE & FAST: Compile first, then run production server!
npm run build
npm run start`,
        whyItBreaks: "The dev server consumes gigabytes of memory, leaks source files, and does not minify JavaScript.",
        howToFix: "Always execute `npm run build` followed by `npm run start` in production environments.",
      },
    ],

    bestPractices: [
      {
        title: "Test Production Builds Locally",
        rule: "Always run npm run build and npm run start on your laptop before pushing to main.",
        explanation: "Catching build errors and broken imports locally prevents embarrassing deployment failures in production.",
      },
    ],

    exercises: [
      {
        id: "u5-ex-4",
        title: "Verify Production Build Output",
        difficulty: "easy",
        estimatedMinutes: 5,
        prompt:
          "What CLI command compiles your Next.js application into an optimized production bundle and checks for build errors?",
        initialCode: `// Enter the terminal command:
`,
        expectedOutput: "npm run build (or next build)",
        hints: ["Look inside package.json scripts"],
        solutionCode: `npm run build`,
        solutionExplanation: "npm run build runs 'next build', generating the .next production bundle and type-checking all pages.",
      },
    ],

    quizzes: [
      {
        id: "u5-q4",
        syllabusTopic: "Production Build & Deployment",
        question: "Why should you never run `npm run dev` on a public production server?",
        conceptualExplanation: "npm run dev is designed for local editing; it lacks minification, uses excessive memory, and runs much slower than compiled production builds.",
        options: [
          { id: "a", text: "Because next dev includes heavy development watchers, lacks file minification, and uses excessive memory", isCorrect: true, explanation: "Correct! next dev is strictly for local editing. Production requires 'next build' and 'next start'." },
          { id: "b", text: "Because next dev deletes the database every 10 minutes", isCorrect: false, explanation: "No." },
          { id: "c", text: "Because next dev only runs on Windows 98", isCorrect: false, explanation: "No." },
          { id: "d", text: "Because TypeScript is forbidden in production", isCorrect: false, explanation: "No." },
        ],
      },
    ],

    realWorldExample: {
      domain: "Global Learning Platform",
      description: "How an international education platform delivers pages worldwide with sub-second latency.",
      code: {
        title: "Production Deployment Checklist",
        description: "Essential steps before launching to live users in plain text.",
        language: "bash",
        filename: "deploy-checklist.sh",
        code: `# 1. Audit build for zero errors:
npm run build

# 2. Test production mode locally:
npm run start

# 3. Check environment variables in production dashboard:
echo "Verify DATABASE_URL and secrets are configured"`,
      },
      keyTakeaway: "Pre-deployment build verification eliminates downtime during student exam periods.",
    },

    combinedExample: {
      combinedTopics: ["Deployment", "Build Optimization", "next.config.js"],
      title: "Optimized Production Config",
      description: "Complete next.config.js ready for global production deployment.",
      code: {
        title: "Production Next Config",
        description: "Standalone output and asset compression configuration.",
        language: "javascript",
        filename: "next.config.js",
        code: `module.exports = {
  output: "standalone",
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};`,
      },
      stepByStepFlow: [
        "npm run build creates standalone bundle",
        "Images compressed to AVIF and WebP automatically",
        "Gzip and Brotli compression enabled for all static assets",
        "Deploy to Vercel or Docker in under 1 minute",
      ],
    },
  },
];
