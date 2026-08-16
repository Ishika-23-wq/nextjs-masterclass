import Link from "next/link";
import { FolderGit2, ArrowRight, CheckCircle2, Layers, Code2 } from "lucide-react";
import { guidedProjects } from "@/data/projects";

export const metadata = {
  title: "5 Guided Next.js Projects | INT257",
  description: "Progressively harder real-world full-stack projects with step-by-step code and live previews.",
};

export default function ProjectsIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="font-mono text-xs text-emerald-800 font-bold px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200">
          &lt;hands-on-portfolio/&gt;
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          5 Progressively Harder Projects
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          From your very first multi-page marketing website to a complete full-stack Supabase SaaS platform, build real-world applications step by step.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidedProjects.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-3xl bg-white border border-zinc-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-6 group shadow-xs hover:shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Project {project.projectNumber}
                </span>
                <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                  project.difficulty === "Beginner"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : project.difficulty === "Intermediate"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-purple-100 text-purple-800 border border-purple-200"
                }`}>
                  {project.difficulty}
                </span>
              </div>

              <h2 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                {project.title}
              </h2>

              <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 font-sans">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/projects/${project.id}`}
              className="w-full py-2.5 bg-zinc-100 hover:bg-emerald-600 text-zinc-800 hover:text-white rounded-2xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Build Project {project.projectNumber}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
