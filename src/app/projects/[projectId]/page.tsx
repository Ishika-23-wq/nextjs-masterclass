import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  FileCode,
  CheckCircle2,
  Sparkles,
  Trophy,
} from "lucide-react";
import { guidedProjects } from "@/data/projects";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { CodeSandbox } from "@/components/classroom/CodeSandbox";

interface ProjectDetailProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: ProjectDetailProps) {
  const { projectId } = await params;
  const project = guidedProjects.find((p) => p.id === projectId);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | INT257 Project Studio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { projectId } = await params;
  const project = guidedProjects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Top Back Navigation */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-emerald-700 font-bold transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to All Projects</span>
      </Link>

      {/* Project Banner Header */}
      <div className="p-8 rounded-3xl bg-white border border-zinc-200 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            Project #{project.projectNumber}
          </span>
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
            Level: {project.difficulty}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          {project.title}
        </h1>

        <p className="text-sm text-zinc-600 max-w-3xl leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Prerequisites and Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-zinc-700 uppercase font-bold">Prerequisites:</span>
            <ul className="list-disc list-inside text-zinc-600 space-y-0.5">
              {project.prerequisites.map((req, i) => <li key={i}>{req}</li>)}
            </ul>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-zinc-700 uppercase font-bold">Tech Stack:</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-2.5 py-0.5 bg-zinc-100 text-emerald-800 rounded-md font-mono border border-zinc-200 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* File Tree Architecture */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <FileCode className="h-5 w-5 text-amber-600" />
          <h2 className="text-lg font-bold text-zinc-900">Project File Architecture</h2>
        </div>
        <p className="text-xs text-zinc-600 font-sans">
          This project organizes code following Next.js App Router conventions:
        </p>
        <div className="p-4 rounded-2xl bg-zinc-50 font-mono text-xs text-zinc-900 space-y-1.5 overflow-x-auto border border-zinc-200">
          {project.fileTree.map((file, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-zinc-400">📄</span>
              <span className="font-bold text-emerald-900">{file}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Implementation Guide */}
      <div className="space-y-8">
        <div className="border-b border-zinc-200 pb-3">
          <h2 className="text-2xl font-bold text-zinc-900">Step-by-Step Implementation Guide</h2>
          <p className="text-xs text-zinc-600 mt-1">Follow along to build the project from scratch.</p>
        </div>

        <div className="space-y-8">
          {project.steps.map((step) => (
            <div key={step.stepNumber} className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono shadow-xs">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900">{step.title}</h3>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-500">{step.filename}</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 font-sans">{step.description}</p>

              <CodeBlock code={step.code} language="tsx" filename={step.filename} />

              <p className="text-xs text-zinc-700 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 leading-relaxed font-sans">
                <strong>Why this works:</strong> {step.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Live Sandbox */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <h2 className="text-2xl font-bold text-zinc-900">Live Interactive Project Sandbox</h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-600">
          Test, modify, and run this project's core component in real-time.
        </p>

        <CodeSandbox
          initialCode={project.steps[0]?.code || "// Next.js Component"}
          title={`${project.title} Runner`}
        />
      </div>

      {/* Key Takeaways & Bonus Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Key Architectural Takeaways</span>
          </div>
          <ul className="space-y-1.5 text-xs text-zinc-700">
            {project.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <Trophy className="h-4 w-4 text-amber-600" />
            <span>Bonus Coding Challenges</span>
          </div>
          <ul className="space-y-1.5 text-xs text-zinc-700">
            {project.bonusChallenges.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
