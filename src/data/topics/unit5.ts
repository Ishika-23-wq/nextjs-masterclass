import { TopicContent } from "@/types";

export const unit5Topics: TopicContent[] = [
  {
    id: "image-and-font-optimization",
    unitId: "unit-5",
    title: "Image & Font Optimization",
    shortSummary: "Master automatic WebP/AVIF image conversion, responsive sizes, blur placeholders with next/image, and zero-layout-shift fonts with next/font.",
    order: 1,
    tags: ["Image Optimization", "next/image", "next/font", "Core Web Vitals", "CLS"],

    simpleExplanation:
      "Images are usually the heaviest part of any website. If you upload a 5MB photo from an iPhone and display it using `<img src='photo.jpg'>`, a user on a mobile phone will waste 5MB of cellular data and the website will jerk around (Layout Shift) while the image loads. Next.js provides the `<Image>` component: it automatically resizes the photo on the server, converts it to modern WebP/AVIF format (reducing 5MB down to 80KB!), prevents layout shift, and only downloads the image when the student scrolls down to it (Lazy Loading). With `next/font`, Google Fonts are downloaded at build time and served locally with zero layout shift!",

    whyNeeded:
      "Large uncompressed images destroy your Google search ranking and cause high mobile bounce rates. `<Image>` and `next/font` ensure perfect Google Core Web Vitals (Largest Contentful Paint & Cumulative Layout Shift) automatically.",

    reactVsNext: {
      concept: "Image & Font Loading",
      reactWay: {
        title: "Standard HTML <img> and <link> Fonts",
        code: `// Traditional React HTML <img>:
<img src="/huge-banner.png" alt="Banner" />
// Issues:
// 1. Sends full 5MB PNG file even to small mobile screens
// 2. Causes Cumulative Layout Shift (CLS) as page jumps when image loads
// 3. Downloads images that are far off-screen immediately

// External Google Fonts in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet">
// Issues:
// Flashes unstyled text (FOUT) while browser reaches Google servers!`,
        explanation:
          "Standard HTML `<img>` tags do not perform automated responsive resizing or modern WebP format conversion. External Google font links require an extra network handshake that slows down First Contentful Paint.",
        drawbacks: [
          "Massive bandwidth consumption on mobile networks",
          "Jarring Cumulative Layout Shift (CLS) penalties",
          "External Google font tracking and slow DNS lookups",
        ],
      },
      nextjsWay: {
        title: "Next.js <Image> and next/font/google",
        code: `// 1. Image Optimization:
import Image from "next/image";

export function HeroBanner() {
  return (
    <Image
      src="/hero.jpg"
      alt="INT257 Course Hero"
      width={1200}
      height={600}
      priority // Loads immediately above-the-fold
      placeholder="blur" // Smooth blur-up transition
      blurDataURL="data:image/jpeg;base64,..."
      className="rounded-2xl"
    />
  );
}

// 2. Zero-Layout-Shift Font Optimization:
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html className={inter.className}><body>{children}</body></html>;
}`,
        explanation:
          "Next.js automatically serves appropriately sized modern WebP images per device screen and hosts Google Fonts locally with zero external network requests.",
        benefits: [
          "Up to 90% reduction in image payload size",
          "Zero Cumulative Layout Shift (CLS) because aspect ratios are reserved",
          "Native lazy loading for off-screen images",
          "Privacy-friendly, zero-latency local font serving",
        ],
      },
      whyDifferent:
        "Next.js has a built-in image optimization server engine (Sharp) and build-time font downloader that pre-optimizes assets before delivery.",
      mentalShiftSummary:
        "Replace all `<img src='...'>` with `<Image src='...' width={...} height={...} alt='...'>`. Load Google fonts via `next/font/google`.",
    },

    basicExample: {
      title: "Responsive Full-Width Image with Fill & Sizes",
      description: "Using the fill prop for responsive aspect ratios in dynamic cards.",
      language: "tsx",
      filename: "src/components/CourseCardImage.tsx",
      code: `import Image from "next/image";

export function CourseCardImage({ title, imageUrl }: { title: string; imageUrl: string }) {
  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}`,
      explanation:
        "When using `fill`, the image expands to fill its parent container. The `sizes` attribute tells Next.js which resolution to generate for mobile vs desktop screens.",
      outputPreview: "Responsive course banner that adjusts resolution based on screen width.",
    },

    moreExamples: [
      {
        title: "Allowing Remote Domain Images in next.config.ts",
        description: "Configuring security patterns for images hosted on Supabase Storage, Unsplash, or Cloudinary.",
        language: "typescript",
        filename: "next.config.ts",
        code: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;`,
        explanation:
          "Next.js requires explicit remote domain patterns to protect your server from optimizing malicious external URLs.",
      },
    ],

    multipleWays: [
      {
        name: "Static Local Image Import",
        syntax: "import logo from './logo.png'; <Image src={logo} alt='...' />",
        codeSnippet: `import logoImg from "@/public/logo.png";
<Image src={logoImg} alt="Logo" placeholder="blur" />`,
        howItWorks: "Next.js automatically infers width, height, and blurDataURL from the imported file.",
        pros: ["No manual width/height needed", "Automatic blur-up placeholder generated"],
        cons: ["Only works with local files in repo"],
        whenToUse: "For site logos, static icons, and brand graphics.",
        isRecommended: true,
      },
      {
        name: "Dynamic Remote Image with Width & Height",
        syntax: "<Image src='https://...' width={800} height={400} alt='...' />",
        codeSnippet: `<Image src={product.imageUrl} width={600} height={400} alt={product.name} />`,
        howItWorks: "Reserves space in DOM to prevent CLS and optimizes remote image via Next.js Sharp engine.",
        pros: ["Works with dynamic database images", "Generates WebP variants"],
        cons: ["Requires explicit width & height numbers or fill prop"],
        whenToUse: "For dynamic user avatars, blog thumbnails, and product pictures.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use local imports with `placeholder='blur'` for static assets. Use `fill` with `sizes` for responsive dynamic cards.",
      scenarios: [
        {
          scenario: "Displaying the logo in your navbar",
          recommendedApproach: "Local image import with `<Image src={logo} alt='...' />`",
          reason: "Width, height, and blur are handled automatically.",
        },
        {
          scenario: "Displaying user-uploaded course thumbnails in a responsive 3-column grid",
          recommendedApproach: "`<Image src={url} fill sizes='...' className='object-cover' />`",
          reason: "Adapts smoothly to dynamic card sizes on mobile and desktop.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using fill without relative/absolute positioning on the parent container",
        badCode: `// ❌ BAD: Parent has no positioning!
<div>
  <Image src="/photo.jpg" fill alt="Photo" /> {/* Expands to cover entire browser window! */}
</div>`,
        goodCode: `// ✅ GOOD: Parent container MUST have 'relative', 'fixed', or 'absolute' position and a defined height!
<div className="relative w-full h-64">
  <Image src="/photo.jpg" fill alt="Photo" />
</div>`,
        whyItBreaks: "`fill` sets `position: absolute; inset: 0;`. Without a relative parent, it fills the entire viewport.",
        howToFix: "Always add `relative` and a height class (e.g. `h-64`) to the parent wrapper.",
      },
    ],

    bestPractices: [
      {
        title: "Add priority to Largest Contentful Paint (LCP) Hero Images",
        rule: "Add `priority` to the main hero banner above the fold.",
        explanation: "Disables lazy loading and preloads the hero image immediately, drastically improving LCP scores.",
      },
    ],

    exercises: [
      {
        id: "u5-ex-1",
        title: "Build a Course Hero Component with next/image",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Create a Hero Banner component using `<Image>` from `next/image` with `width={1000}`, `height={400}`, `priority`, and responsive styling.",
        initialCode: `// TODO: Import Image from next/image
export function CourseHero() {
  return (
    <div>
      {/* Add optimized image */}
    </div>
  );
}`,
        expectedOutput: "A styled hero banner with Next.js image optimization and priority flag.",
        hints: ["Import `Image` from `'next/image'`", "Set `priority={true}`"],
        solutionCode: `import Image from "next/image";

export function CourseHero() {
  return (
    <div className="space-y-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
      <h1 className="text-2xl font-bold text-zinc-100">Next.js Masterclass</h1>
      <div className="relative w-full h-56 rounded-xl overflow-hidden border border-zinc-700">
        <Image
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
          alt="Coding workspace"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>
    </div>
  );
}`,
        solutionExplanation:
          "Using `priority` ensures the hero image loads immediately for top Google PageSpeed LCP performance.",
      },
    ],

    quizzes: [
      {
        id: "u5-q1",
        question: "How does the Next.js <Image> component prevent Cumulative Layout Shift (CLS)?",
        syllabusTopic: "Image Optimization",
        options: [
          { id: "a", text: "By converting images into text files", isCorrect: false, explanation: "Images remain visual media." },
          { id: "b", text: "By requiring width and height (or fill) so the browser reserves the exact pixel space before the image downloads", isCorrect: true, explanation: "Correct! Reserving aspect ratio space prevents the page from jumping when the image finishes loading." },
          { id: "c", text: "By blocking all JavaScript from executing", isCorrect: false, explanation: "No." },
          { id: "d", text: "By deleting the image on slow mobile connections", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "By requiring explicit aspect ratio dimensions, Next.js reserves the exact box in the DOM layout so surrounding content never jumps when the pixels arrive.",
      },
    ],

    realWorldExample: {
      domain: "High-Traffic News Media Publishing",
      description: "How news sites serve millions of mobile readers with instant hero photos and crystal-clear fonts.",
      code: {
        title: "Article Header with Local Font & Responsive Image",
        description: "Optimized article header.",
        language: "tsx",
        filename: "src/components/ArticleHeader.tsx",
        code: `import Image from "next/image";

export function ArticleHeader({ headline, heroUrl, date }: any) {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">{headline}</h1>
      <time className="text-xs text-zinc-400 font-mono">{date}</time>
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
        <Image src={heroUrl} alt={headline} fill priority className="object-cover" />
      </div>
    </article>
  );
}`,
      },
      keyTakeaway: "Responsive images with `aspect-video` ensure fluid mobile scaling across phones, tablets, and laptops.",
    },

    combinedExample: {
      combinedTopics: ["next/image", "next/font", "Dynamic Route"],
      title: "Optimized Dynamic Course Detail View",
      description: "Combining custom Google fonts, responsive image optimization, and dynamic route params.",
      code: {
        title: "Complete Optimized Page",
        description: "Production-ready page component with Image and Font integration.",
        language: "tsx",
        filename: "src/app/courses/[slug]/page.tsx",
        code: `import Image from "next/image";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-zinc-800">
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
          alt={slug}
          fill
          priority
          className="object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold text-zinc-100">Course: {slug.toUpperCase()}</h1>
      <p className="text-zinc-400 text-sm">Pre-rendered with 0 layout shift and automated WebP image delivery.</p>
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Browser requests course page",
        "Next.js serves HTML with locally embedded font definitions",
        "`next/image` generates tailored WebP version based on mobile screen width",
        "Page paints instantly with 0ms Cumulative Layout Shift",
      ],
    },
  },

  {
    id: "metadata-seo-sitemaps",
    unitId: "unit-5",
    title: "SEO, Dynamic Metadata & Sitemaps",
    shortSummary: "Generate static and dynamic SEO metadata, OpenGraph social share cards, automated sitemap.xml, and robots.txt.",
    order: 2,
    tags: ["SEO", "Metadata", "generateMetadata", "OpenGraph", "Sitemap", "Robots.txt"],

    simpleExplanation:
      "When someone shares a link to your website on WhatsApp, Twitter, or Discord, how does it show a pretty preview card with a title, description, and image? And how does Google understand what your page is about so it ranks #1? In Next.js, you export a `metadata` object or a `generateMetadata()` function from your `page.tsx` or `layout.tsx`. Next.js automatically injects standard `<title>`, `<meta>`, and OpenGraph tags into the HTML `<head>`. You can also create automated `sitemap.xml` and `robots.txt` files directly in TypeScript!",

    whyNeeded:
      "Without proper metadata and sitemaps, search engines cannot index your website, and links shared on social media look broken and untrustworthy.",

    reactVsNext: {
      concept: "SEO & Social Sharing Cards",
      reactWay: {
        title: "React Helmet (Client-Side Only)",
        code: `// React Helmet in Vite:
import { Helmet } from "react-helmet";

function Product() {
  return (
    <div>
      <Helmet>
        <title>Dynamic Title</title>
        <meta property="og:title" content="Dynamic Title" />
      </Helmet>
    </div>
  );
}`,
        explanation:
          "In vanilla React, `react-helmet` injects meta tags into the DOM on the client using JavaScript. But social media scrapers (Twitter, WhatsApp, Facebook) do NOT execute JavaScript—they only read raw server HTML. Thus, social preview cards in CSR React apps often fail completely.",
        drawbacks: [
          "Social media cards (WhatsApp, Twitter, LinkedIn) appear blank or broken",
          "Requires third-party library (`react-helmet`)",
          "Potential title flicker on page navigation",
        ],
      },
      nextjsWay: {
        title: "Next.js Server-Side Metadata API",
        code: `// 1. Static Metadata:
export const metadata = {
  title: "INT257 Next.js Masterclass",
  description: "Comprehensive tutorial platform for students.",
  openGraph: {
    title: "INT257 Next.js Masterclass",
    images: ["/og-banner.png"],
  },
};

// 2. Dynamic Metadata for dynamic routes:
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: \`\${post.title} | NextMastery\`,
    description: post.summary,
    openGraph: {
      title: post.title,
      images: [post.coverImage],
    },
  };
}`,
        explanation:
          "Next.js evaluates `metadata` and `generateMetadata()` on the server and embeds complete `<title>` and `<meta>` tags directly into the initial HTML document.",
        benefits: [
          "100% reliable social media share cards on WhatsApp, Twitter, and LinkedIn",
          "Google search crawlers read exact meta descriptions instantly",
          "Cascading metadata: child pages inherit and override parent layout metadata",
        ],
      },
      whyDifferent:
        "Next.js computes metadata on the server before sending HTML, guaranteeing scrapers receive complete OpenGraph tags.",
      mentalShiftSummary:
        "Export `export const metadata = { ... }` or `export async function generateMetadata() { ... }` from `page.tsx`.",
    },

    basicExample: {
      title: "Dynamic Metadata Generator for Course Topics",
      description: "Generating custom page titles and descriptions based on dynamic route params.",
      language: "tsx",
      filename: "src/app/units/[unitId]/page.tsx",
      code: `import type { Metadata } from "next";
import { syllabusUnits } from "@/data/syllabus";

interface PageProps {
  params: Promise<{ unitId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { unitId } = await params;
  const unit = syllabusUnits.find((u) => u.id === unitId);

  if (!unit) {
    return { title: "Unit Not Found | INT257" };
  }

  return {
    title: \`\${unit.title} (Unit \${unit.unitNumber}) | INT257\`,
    description: unit.description,
    openGraph: {
      title: unit.title,
      description: unit.tagline,
      type: "article",
    },
  };
}

export default async function UnitPage({ params }: PageProps) {
  const { unitId } = await params;
  return <div className="p-6"><h1>Viewing {unitId}</h1></div>;
}`,
      explanation:
        "Next.js runs `generateMetadata()` first, then streams the page HTML with dynamic `<title>` and OpenGraph tags in the `<head>`.",
      outputPreview: "HTML head populated with custom <title>Unit 2: Rendering Paradigms | INT257</title>.",
    },

    moreExamples: [
      {
        title: "Automated Dynamic Sitemap (sitemap.ts)",
        description: "Generating sitemap.xml in TypeScript for Google search indexing.",
        language: "typescript",
        filename: "src/app/sitemap.ts",
        code: `import { MetadataRoute } from "next";
import { syllabusUnits } from "@/data/syllabus";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nextjs-masterclass.edu";

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: \`\${baseUrl}/units\`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: \`\${baseUrl}/projects\`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const unitRoutes = syllabusUnits.map((u) => ({
    url: \`\${baseUrl}/units/\${u.id}\`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...unitRoutes];
}`,
        explanation:
          "Placing `sitemap.ts` in `src/app/` automatically serves an XML sitemap at `http://localhost:3000/sitemap.xml`.",
      },
    ],

    multipleWays: [
      {
        name: "Static Metadata Export",
        syntax: "export const metadata: Metadata = { ... }",
        codeSnippet: `export const metadata: Metadata = { title: "About Us" };`,
        howItWorks: "Evaluated at build time.",
        pros: ["Simple and fast"],
        cons: ["Cannot read dynamic URL parameters"],
        whenToUse: "For static pages (Home, About, Pricing, Contact).",
        isRecommended: true,
      },
      {
        name: "Dynamic generateMetadata() Function",
        syntax: "export async function generateMetadata({ params }) { ... }",
        codeSnippet: `export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: \`Post #\${id}\` };
}`,
        howItWorks: "Async function that fetches data and returns tailored metadata per URL.",
        pros: ["Dynamic titles, descriptions, and custom social share images per record"],
        cons: ["Requires async execution"],
        whenToUse: "For all dynamic routes (`[slug]`, `[id]`).",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use static `metadata` on static pages. Use `generateMetadata` on dynamic `[slug]` pages.",
      scenarios: [
        {
          scenario: "You want a default website title and favicon across all pages",
          recommendedApproach: "Define base `metadata` in `src/app/layout.tsx`",
          reason: "Child pages automatically inherit and extend root layout metadata.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Exporting both 'metadata' and 'generateMetadata' in the same file",
        badCode: `// ❌ BAD: Next.js throws an error!
export const metadata = { title: "Static" };
export async function generateMetadata() { return { title: "Dynamic" }; }`,
        goodCode: `// ✅ GOOD: Export ONE or the other, not both in the same file!
export async function generateMetadata() { return { title: "Dynamic" }; }`,
        whyItBreaks: "Next.js cannot determine which metadata source to prioritize.",
        howToFix: "Use `metadata` for static pages or `generateMetadata` for dynamic pages.",
      },
    ],

    bestPractices: [
      {
        title: "Use Title Templates for Consistent Branding",
        rule: "Configure `title: { template: '%s | INT257 NextMastery', default: 'INT257 NextMastery' }` in Root Layout.",
        explanation: "Allows child pages to simply export `title: 'Unit 1'` and get `Unit 1 | INT257 NextMastery` automatically.",
      },
    ],

    exercises: [
      {
        id: "u5-ex-2",
        title: "Create an OpenGraph Share Card Metadata Object",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a `Metadata` export for `src/app/projects/page.tsx` containing title, description, and an OpenGraph image configuration.",
        initialCode: `import type { Metadata } from "next";

// TODO: Export metadata with title, description, and openGraph
`,
        expectedOutput: "A typed Metadata export with OpenGraph attributes.",
        hints: ["Export `const metadata: Metadata = { ... }`", "Include `openGraph: { title: '...', images: [...] }`"],
        solutionCode: `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Next.js Projects | INT257",
  description: "Build 5 progressive full-stack projects from a simple blog to a full Supabase SaaS.",
  openGraph: {
    title: "5 Guided Next.js Projects - INT257 Masterclass",
    description: "Hands-on coding exercises and full-stack real-world applications.",
    url: "https://nextjs-masterclass.edu/projects",
    siteName: "NextMastery INT257",
    images: [
      {
        url: "https://nextjs-masterclass.edu/og-projects.png",
        width: 1200,
        height: 630,
        alt: "INT257 Guided Projects Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};`,
        solutionExplanation:
          "This metadata ensures links shared on social networks display high-resolution preview cards with titles and descriptions.",
      },
    ],

    quizzes: [
      {
        id: "u5-q2",
        question: "Why do social media preview cards (WhatsApp, Twitter, LinkedIn) require server-rendered OpenGraph metadata?",
        syllabusTopic: "OpenGraph SEO",
        options: [
          { id: "a", text: "Because social media scrapers do not run JavaScript and only read raw HTML from the server response", isCorrect: true, explanation: "Correct! Social scrapers perform a lightweight HTTP GET and parse the raw HTML <head>." },
          { id: "b", text: "Because Twitter only allows Python websites", isCorrect: false, explanation: "No." },
          { id: "c", text: "Because metadata files must be encrypted with RSA keys", isCorrect: false, explanation: "No." },
          { id: "d", text: "To make the server fan spin quieter", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "Social crawlers make lightweight curl-style HTTP requests without executing JavaScript. Server-rendered `<meta>` tags are required for preview generation.",
      },
    ],

    realWorldExample: {
      domain: "Viral Blog & Content Marketing",
      description: "How publications generate custom social share cards dynamically for every new article.",
      code: {
        title: "Dynamic Social Card Generator",
        description: "Dynamic OpenGraph generation.",
        language: "typescript",
        filename: "src/app/blog/[slug]/page.tsx",
        code: `export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  return {
    title: \`Article: \${slug}\`,
    openGraph: {
      images: [\`https://myblog.com/api/og?title=\${encodeURIComponent(slug)}\`],
    },
  };
}`,
      },
      keyTakeaway: "Dynamic OG image endpoints generate customized image graphics on the fly for every article URL.",
    },

    combinedExample: {
      combinedTopics: ["generateMetadata", "sitemap.ts", "Dynamic Route"],
      title: "Complete Search Engine Optimization Pipeline",
      description: "Combining dynamic metadata, XML sitemaps, and robots.txt.",
      code: {
        title: "SEO Architecture Map",
        description: "Complete SEO file setup in App Router.",
        language: "typescript",
        filename: "SEO File Tree",
        code: `src/app/
├── layout.tsx         # Base title template & site-wide metadata
├── sitemap.ts         # Dynamically builds /sitemap.xml
├── robots.ts          # Dynamically builds /robots.txt
└── units/[unitId]/
    └── page.tsx       # Exports generateMetadata() for dynamic lesson titles`,
      },
      stepByStepFlow: [
        "Google bot crawls `/robots.txt` and discovers `/sitemap.xml`",
        "Sitemap returns list of all unit URLs",
        "Google visits `/units/unit-1` and reads pre-rendered `<title>` and `<meta description>`",
        "User shares link on WhatsApp and sees rich OpenGraph banner",
      ],
    },
  },

  {
    id: "performance-and-code-splitting",
    unitId: "unit-5",
    title: "Code Splitting, Lazy Loading & Core Web Vitals",
    shortSummary: "Load heavy client components on-demand using next/dynamic, optimize Largest Contentful Paint (LCP), and track Core Web Vitals.",
    order: 3,
    tags: ["Performance", "Lazy Loading", "next/dynamic", "Core Web Vitals", "LCP", "INP", "CLS"],

    simpleExplanation:
      "Imagine your website has a heavy 3D interactive chart or rich text editor that takes 500KB of JavaScript. If a mobile student is just reading a text lesson, why should their phone download that heavy 3D chart right away? **Code Splitting & Lazy Loading** means breaking your code into small chunks and only downloading the heavy 3D chart when the user actually clicks 'Open Chart'. Next.js does this with the `next/dynamic` function. **Core Web Vitals** are Google's 3 speed metrics: LCP (how fast main content appears), INP (how responsive clicks feel), and CLS (how stable the visual layout is).",

    whyNeeded:
      "Websites that load in under 2 seconds have 3x higher conversion and retention rates than slow sites. Lazy loading heavy dependencies keeps initial mobile bundles tiny and responsive.",

    reactVsNext: {
      concept: "Dynamic Component Lazy Loading",
      reactWay: {
        title: "React.lazy() and Suspense",
        code: `// React standard lazy loading:
import React, { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function App() {
  return (
    <Suspense fallback={<p>Loading chart...</p>}>
      <HeavyChart />
    </Suspense>
  );
}`,
        explanation:
          "In vanilla React, `React.lazy()` works on the client, but it does not support disabling server-side rendering (SSR) for components that rely on browser-only `window` APIs (like Monaco code editors or Canvas charting libraries).",
        drawbacks: [
          "Fails if the third-party library uses `window` or `document` during SSR",
          "Requires manual Suspense wrappers everywhere",
        ],
      },
      nextjsWay: {
        title: "Next.js next/dynamic with ssr: false",
        code: `// Next.js dynamic import with SSR control:
import dynamic from "next/dynamic";

// Loads on client ONLY when needed, with zero SSR errors for window APIs!
const InteractiveCodeEditor = dynamic(
  () => import("@/components/CodeEditor"),
  {
    ssr: false, // Prevents window is not defined errors on server!
    loading: () => <div className="h-64 bg-zinc-900 animate-pulse rounded-xl" />
  }
);

export default function PlaygroundPage() {
  return (
    <div>
      <h1>Next.js Sandbox</h1>
      <InteractiveCodeEditor />
    </div>
  );
}`,
        explanation:
          "`next/dynamic` allows lazy loading components and provides `{ ssr: false }` to safely mount browser-only libraries without server crashes.",
        benefits: [
          "Eliminates 'window is not defined' crashes during SSR",
          "Reduces initial JavaScript bundle size significantly",
          "Built-in fallback loading placeholder support",
        ],
      },
      whyDifferent:
        "Next.js `next/dynamic` bridges server and client module loaders, allowing granular control over SSR hydration.",
      mentalShiftSummary:
        "For heavy libraries (charts, Monaco editor, confetti, canvas), use `const Comp = dynamic(() => import('...'), { ssr: false })`.",
    },

    basicExample: {
      title: "Lazy Loading a Heavy Code Editor with next/dynamic",
      description: "Importing a browser-only component on-demand.",
      language: "tsx",
      filename: "src/app/playground/page.tsx",
      code: `import dynamic from "next/dynamic";

// Lazy load the editor component:
const HeavyMonacoEditor = dynamic(
  () => import("@/components/playground/CodeEditor").then(mod => mod.CodeEditor),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-center text-zinc-500 font-mono text-sm">
        ⚡ Loading Interactive Code Playground...
      </div>
    ),
  }
);

export default function PlaygroundPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">TypeScript Live Sandbox</h1>
      <HeavyMonacoEditor />
    </div>
  );
}`,
      explanation:
        "The heavy code editor JavaScript is only downloaded when the student navigates to the playground, keeping the rest of the site fast.",
      outputPreview: "Playground page loading heavy editor on-demand with smooth placeholder.",
    },

    moreExamples: [
      {
        title: "Understanding Core Web Vitals (LCP, INP, CLS)",
        description: "The 3 critical metrics measured by Google Lighthouse and search rankings.",
        language: "typescript",
        filename: "Core Web Vitals Guide",
        code: `// 1. Largest Contentful Paint (LCP) -> Target: < 2.5 seconds
// Measures: How fast the main banner / heading renders on screen.
// Fix: Use next/image with 'priority', Server Components, and zero render-blocking CSS.

// 2. Interaction to Next Paint (INP) -> Target: < 200 milliseconds
// Measures: How quickly the UI updates after a user clicks or taps a button.
// Fix: Use useOptimistic(), useTransition(), and keep Client Components lightweight.

// 3. Cumulative Layout Shift (CLS) -> Target: < 0.1
// Measures: Visual stability (preventing buttons from jumping around as images load).
// Fix: Use next/image with width/height and next/font for zero-shift typography.`,
        explanation:
          "Optimizing these 3 metrics ensures your Next.js application achieves high performance scores.",
      },
    ],

    multipleWays: [
      {
        name: "next/dynamic (Recommended for Heavy Client Widgets)",
        syntax: "dynamic(() => import('./Widget'), { ssr: false })",
        codeSnippet: `const Chart = dynamic(() => import('./Chart'), { ssr: false });`,
        howItWorks: "Creates a separate JS chunk loaded on demand.",
        pros: ["Avoids SSR window errors", "Cuts initial page load time", "Custom loading skeleton"],
        cons: ["Requires client download on first view"],
        whenToUse: "For rich text editors, 3D maps, canvas charts, confetti animations.",
        isRecommended: true,
      },
    ],

    decisionGuide: {
      recommendationSummary: "Use standard imports for normal UI. Use `next/dynamic` for heavy third-party client packages (>50KB).",
      scenarios: [
        {
          scenario: "You are adding `canvas-confetti` when a student completes a quiz",
          recommendedApproach: "Dynamically import `canvas-confetti` inside the button click handler",
          reason: "Avoids bundling the confetti library into the initial page load.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Using next/dynamic inside a component render loop or function body",
        badCode: `// ❌ BAD: Re-creates the dynamic component on every single render!
export function MyPage() {
  const HeavyComp = dynamic(() => import('./Heavy'));
  return <HeavyComp />;
}`,
        goodCode: `// ✅ GOOD: Define dynamic imports at module root level (outside component function)
const HeavyComp = dynamic(() => import('./Heavy'));

export function MyPage() {
  return <HeavyComp />;
}`,
        whyItBreaks: "Calling `dynamic()` inside a function re-instantiates the component loader on every state change.",
        howToFix: "Always place `dynamic(...)` declarations at the top of your file outside components.",
      },
    ],

    bestPractices: [
      {
        title: "Analyze Bundle Size with Next Bundle Analyzer",
        rule: "Periodically run `@next/bundle-analyzer` to identify large unexpected npm dependencies.",
        explanation: "Ensures no multi-megabyte libraries accidentally slip into production.",
      },
    ],

    exercises: [
      {
        id: "u5-ex-3",
        title: "Configure Dynamic Import with Loading Fallback",
        difficulty: "easy",
        estimatedMinutes: 6,
        prompt:
          "Write a `next/dynamic` import for a component named `InteractiveQuizArena` with `ssr: false` and a pulsating skeleton loading indicator.",
        initialCode: `import dynamic from "next/dynamic";

// TODO: Define dynamic import with ssr: false and loading fallback
`,
        expectedOutput: "A lazy-loaded dynamic component definition.",
        hints: ["`dynamic(() => import('...'), { ssr: false, loading: () => (...) })`"],
        solutionCode: `import dynamic from "next/dynamic";

export const DynamicQuizArena = dynamic(
  () => import("@/components/classroom/QuizWidget").then((mod) => mod.QuizWidget),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse space-y-4">
        <div className="h-6 w-48 bg-zinc-800 rounded" />
        <div className="h-20 bg-zinc-800/60 rounded-xl" />
      </div>
    ),
  }
);`,
        solutionExplanation:
          "This dynamic import splits the quiz widget code into a separate bundle downloaded only when needed.",
      },
    ],

    quizzes: [
      {
        id: "u5-q3",
        question: "What problem does { ssr: false } solve in next/dynamic?",
        syllabusTopic: "Client-Side Lazy Loading",
        options: [
          { id: "a", text: "It prevents 'window is not defined' errors during server rendering for browser-only libraries like canvas or Monaco", isCorrect: true, explanation: "Correct! { ssr: false } skips server rendering and mounts the component strictly on the client where 'window' exists." },
          { id: "b", text: "It disables CSS styling", isCorrect: false, explanation: "CSS is unaffected." },
          { id: "c", text: "It deletes the database", isCorrect: false, explanation: "No." },
          { id: "d", text: "It speeds up TypeScript compilation", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "Many browser packages access `window` or `document` upon import. Disabling SSR with `{ ssr: false }` allows them to load cleanly in the browser without server crashes.",
      },
    ],

    realWorldExample: {
      domain: "Data Analytics & Financial Charting",
      description: "How platforms like TradingView load multi-megabyte WebGL charts on-demand without slowing down the initial news page.",
      code: {
        title: "Lazy Chart Loader",
        description: "Dynamic WebGL chart loader.",
        language: "tsx",
        filename: "src/components/StockDashboard.tsx",
        code: `import dynamic from "next/dynamic";

const WebGLCandlestickChart = dynamic(() => import("./WebGLChart"), {
  ssr: false,
  loading: () => <div className="h-96 bg-zinc-900 animate-pulse rounded-2xl flex items-center justify-center text-zinc-500">Loading Real-Time Chart...</div>
});

export function StockDashboard() {
  return <div><WebGLCandlestickChart /></div>;
}`,
      },
      keyTakeaway: "Lazy loading keeps initial page loads lightweight and lightning fast.",
    },

    combinedExample: {
      combinedTopics: ["next/dynamic", "Core Web Vitals", "Suspense"],
      title: "High-Performance Page Architecture",
      description: "Combining fast Server Component HTML with lazy-loaded client interactive widgets.",
      code: {
        title: "Fast Initial Paint Architecture",
        description: "Server header + dynamic lazy interactive widget.",
        language: "tsx",
        filename: "src/app/performance-demo/page.tsx",
        code: `import dynamic from "next/dynamic";

const InteractiveSimulator = dynamic(() => import("@/components/Simulator"), {
  ssr: false,
  loading: () => <div className="h-40 bg-zinc-900 animate-pulse rounded-xl" />
});

export default function PerformanceDemoPage() {
  return (
    <div className="space-y-6">
      {/* 1. Fast Server Component header paints in 5ms (Good LCP): */}
      <h1 className="text-3xl font-bold text-zinc-100">Next.js Performance Engine</h1>
      <p className="text-zinc-400">Zero layout shift and on-demand client bundle loading.</p>
      
      {/* 2. Heavy client widget loads in background: */}
      <InteractiveSimulator />
    </div>
  );
}`,
      },
      stepByStepFlow: [
        "Server streams main headline (LCP < 0.5s)",
        "Zero layout shift achieved with skeleton placeholder (CLS = 0)",
        "Heavy simulator module hydrates in background",
      ],
    },
  },

  {
    id: "production-build-and-deployment",
    unitId: "unit-5",
    title: "Production Build, Vercel & Docker Deployment",
    shortSummary: "Master npm run build output analysis, standalone Docker containerization, production environment variables, and zero-downtime deployment.",
    order: 4,
    tags: ["Production", "Build", "Deployment", "Vercel", "Docker", "Standalone"],

    simpleExplanation:
      "When you finish writing code, you don't run `npm run dev` in production (which is slow and meant for local development). Instead, you run `npm run build`. Next.js compiles your TypeScript, minifies your CSS, bundles your Server Components, and creates a hyper-optimized production build. Next.js can be deployed with one click to **Vercel** (global serverless & Edge network), or packaged inside a lightweight **Docker container** using `output: 'standalone'` to run on any cloud server (AWS, DigitalOcean, Google Cloud).",

    whyNeeded:
      "Running development servers in production causes high memory consumption, crashes under load, and exposes debugging symbols. Production builds ensure enterprise scalability and security.",

    reactVsNext: {
      concept: "Building & Deploying",
      reactWay: {
        title: "React Static Export (dist/ folder)",
        code: `// In Vite / React:
// npm run build produces a 'dist' folder with static index.html and JS.
// You must deploy to an S3 bucket or Nginx server.
// BUT: You cannot run backend APIs or Server Actions!`,
        explanation:
          "React static builds can only be hosted as client files. You need a separate Node.js server to host your backend APIs.",
        drawbacks: [
          "Dual hosting required for frontend and backend",
          "No built-in Edge serverless execution",
        ],
      },
      nextjsWay: {
        title: "Next.js Unified Full-Stack Production Build",
        code: `// 1. Running production build:
// npm run build
// Output displays detailed route classification:
// ○  (Static)   prerendered as static content
// ƒ  (Dynamic)  server-rendered on demand

// 2. Standalone Docker Output in next.config.ts:
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Bundles only minimal required node_modules!
};

export default nextConfig;`,
        explanation:
          "`next build` analyzes every route and creates optimized static HTML, serverless lambdas, and standalone Docker bundles.",
        benefits: [
          "One unified build command for frontend, backend, and API routes",
          "`output: 'standalone'` creates tiny Docker images (<100MB)",
          "Automatic route analysis indicating static vs dynamic pages",
        ],
      },
      whyDifferent:
        "Next.js builds a unified full-stack artifact capable of running on serverless edge functions or traditional Docker containers.",
      mentalShiftSummary:
        "Test production builds locally using `npm run build && npm run start` before deploying.",
    },

    basicExample: {
      title: "Production Dockerfile for Next.js Standalone",
      description: "A multi-stage production Dockerfile for containerized deployment.",
      language: "typescript",
      filename: "Dockerfile",
      code: `# Multi-stage Dockerfile for Next.js Standalone
FROM node:20-alpine AS base

# 1. Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2. Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Production runner (Ultra-lightweight!)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]`,
      explanation:
        "This multi-stage Docker build produces a tiny container that runs Next.js using native `node server.js` with maximum performance.",
      outputPreview: "Production-ready Docker container configuration ready for Kubernetes or Cloud Run.",
    },

    moreExamples: [
      {
        title: "Understanding Route Symbols in 'npm run build'",
        description: "How Next.js classifies your pages in terminal build output.",
        language: "typescript",
        filename: "Build Output Analysis",
        code: `Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         92.4 kB
├ ○ /_not-found                          1.1 kB         88.3 kB
├ ○ /units                               6.4 kB         93.6 kB
├ ƒ /units/[unitId]                      7.8 kB         95.0 kB
└ ƒ /api/students                        0 B            0 B

○ (Static)  prerendered as static HTML (SSG)
ƒ (Dynamic) server-rendered on demand (SSR)`,
        explanation:
          "Circles (`○`) mean the page is static and served instantly. Function symbols (`ƒ`) mean the page uses dynamic headers or cookies and runs on the server per request.",
      },
    ],

    multipleWays: [
      {
        name: "Vercel Platform (Zero-Config Serverless)",
        syntax: "git push origin main",
        codeSnippet: `// Connect GitHub repo to Vercel for instant automatic deployments`,
        howItWorks: "Automatically splits Next.js routes into Edge & Serverless lambdas across global CDNs.",
        pros: ["Zero infrastructure management", "Automatic preview URLs on pull requests", "Instant global Edge cache"],
        cons: ["Vendor ecosystem"],
        whenToUse: "For fastest deployment velocity and highest scalability.",
        isRecommended: true,
      },
      {
        name: "Docker / Self-Hosted Node.js (output: 'standalone')",
        syntax: "docker build -t my-next-app .",
        codeSnippet: `// next.config.ts: output: 'standalone'`,
        howItWorks: "Builds a standalone `server.js` that can run on any Linux VPS (AWS EC2, DigitalOcean, VPS).",
        pros: ["Total control over server infrastructure", "Runs anywhere Docker is supported"],
        cons: ["Requires managing server maintenance and SSL certificates"],
        whenToUse: "For private enterprise clouds or on-premise university servers.",
      },
    ],

    decisionGuide: {
      recommendationSummary: "Deploy to Vercel for instant serverless scale. Deploy via Docker `standalone` when self-hosting on your own cloud servers.",
      scenarios: [
        {
          scenario: "You want a free live URL to showcase your INT257 course project portfolio",
          recommendedApproach: "Vercel GitHub deployment",
          reason: "Takes 60 seconds with automatic HTTPS and continuous deployment.",
        },
      ],
    },

    commonMistakes: [
      {
        mistakeTitle: "Running 'npm run dev' on a production live server",
        badCode: `// ❌ BAD: Starting production with 'npm run dev'
// Consumes 5x more memory and compiles files on the fly!`,
        goodCode: `// ✅ GOOD: Build once, then start optimized production server
npm run build
npm run start`,
        whyItBreaks: "`next dev` includes hot module replacement, source maps, and development watchers that slow down performance and consume excessive memory.",
        howToFix: "Always use `npm run build && npm run start` for production.",
      },
    ],

    bestPractices: [
      {
        title: "Test Production Builds Before Pushing to Main",
        rule: "Run `npm run build` locally before opening a pull request.",
        explanation: "Catches TypeScript compiler errors and missing environment variables before they hit production.",
      },
    ],

    exercises: [
      {
        id: "u5-ex-4",
        title: "Configure Standalone Output in next.config.ts",
        difficulty: "easy",
        estimatedMinutes: 4,
        prompt:
          "Write a `next.config.ts` configuration object that enables `output: 'standalone'` for Docker builds.",
        initialCode: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: Add standalone output
};

export default nextConfig;`,
        expectedOutput: "A NextConfig object with output: 'standalone'.",
        hints: ["Add `output: 'standalone'`"],
        solutionCode: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;`,
        solutionExplanation:
          "`output: 'standalone'` tells Next.js to copy only the exact necessary node_modules into `.next/standalone`, drastically reducing container sizes.",
      },
    ],

    quizzes: [
      {
        id: "u5-q4",
        question: "Why should you never run 'next dev' on a production server?",
        syllabusTopic: "Production Builds",
        options: [
          { id: "a", text: "Because next dev includes heavy development watchers, lacks file minification, and uses excessive memory", isCorrect: true, explanation: "Correct! next dev is strictly for local editing. Production requires 'next build' and 'next start'." },
          { id: "b", text: "Because next dev deletes the database every 10 minutes", isCorrect: false, explanation: "No." },
          { id: "c", text: "Because next dev only runs on Windows 98", isCorrect: false, explanation: "No." },
          { id: "d", text: "Because TypeScript is forbidden in production", isCorrect: false, explanation: "No." },
        ],
        conceptualExplanation:
          "`next dev` is designed for instant code editing with hot-reloading. `next build` produces pre-compiled, minified, and secure production assets.",
      },
    ],

    realWorldExample: {
      domain: "Enterprise Multi-Region Cloud Deployment",
      description: "How companies deploy Next.js across multiple geographic regions with zero-downtime rolling updates.",
      code: {
        title: "Health Check API Route for Load Balancers",
        description: "API route for container health monitoring.",
        language: "typescript",
        filename: "src/app/api/health/route.ts",
        code: `import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}`,
      },
      keyTakeaway: "Load balancers ping `/api/health` to ensure containers are operational before routing live traffic.",
    },

    combinedExample: {
      combinedTopics: ["Production Build", "Health Checks", "Standalone Config"],
      title: "End-to-End Production Release Pipeline",
      description: "The complete journey from local code to live global deployment.",
      code: {
        title: "Production Pipeline Flow",
        description: "CI/CD pipeline steps.",
        language: "typescript",
        filename: "Deployment Pipeline",
        code: `// 1. Lint & Typecheck: npm run lint
// 2. Production Compile: npm run build
// 3. Automated Tests: npm test
// 4. Docker Containerization: docker build -t app:latest .
// 5. Zero-Downtime Rolling Release & Healthcheck verification`,
      },
      stepByStepFlow: [
        "Run `npm run build` -> Next.js generates static assets and server bundles",
        "Docker builds standalone image",
        "Server launches `node server.js`",
        "Application serves millions of users at sub-millisecond speeds",
      ],
    },
  },
];
