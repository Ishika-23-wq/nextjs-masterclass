"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronRight, CheckCircle2, BookOpen, Mic, Sparkles } from "lucide-react";
import { syllabusUnits } from "@/data/syllabus";
import { getCompletedTopics } from "@/lib/local-storage";

interface TutorialSidebarProps {
  currentUnitId: string;
  currentTopicId: string;
}

export function TutorialSidebar({ currentUnitId, currentTopicId }: TutorialSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({
    [currentUnitId]: true,
  });
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    setCompletedTopics(getCompletedTopics());
    const handleUpdate = () => setCompletedTopics(getCompletedTopics());
    window.addEventListener("storage_completed_updated", handleUpdate);
    return () => window.removeEventListener("storage_completed_updated", handleUpdate);
  }, []);

  const toggleUnit = (unitId: string) => {
    setOpenUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  return (
    <aside className="relative w-full lg:w-[280px] shrink-0 bg-white border border-[#e5ded6] rounded-3xl p-4 sm:p-5 space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto shadow-2xs">
      {/* Top Decorative Washi Tape */}
      <div
        className="h-4 w-24 -rotate-1 absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none rounded-xs opacity-90 shadow-xs"
        style={{
          backgroundColor: "rgba(163, 214, 175, 0.7)",
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)",
        }}
        aria-hidden="true"
      />

      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-[#e8e2d8] pb-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-base">📖</span>
          <span className="font-bold text-xs uppercase tracking-wider text-stone-900 font-mono">
            Study Planner
          </span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#7a5005] px-2 py-0.5 rounded-full bg-[#fef9e8] border border-[#fce29d] shadow-2xs">
          INT257
        </span>
      </div>

      {/* Practice Quick Link Banner with Cute Lavender Study Journal Feel */}
      <Link
        href="/practice"
        className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#f6f1fc] to-[#fdf0f4] border border-[#ddc8f6] text-stone-800 hover:border-[#8b65bc] transition-all group shadow-2xs hover:scale-[1.01]"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#8b65bc] text-white flex items-center justify-center shadow-2xs text-sm">
            💻
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-stone-900 leading-tight">Practice Arena</div>
            <div className="text-[10px] text-[#8b65bc] font-mono font-bold">Sample Problems &amp; Solutions</div>
          </div>
        </div>
        <span className="text-xs text-[#8b65bc] font-bold group-hover:translate-x-0.5 transition-transform">→</span>
      </Link>

      {/* Quick Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter lessons..."
          className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 font-mono"
        />
      </div>

      {/* Unit Sections */}
      <div className="space-y-2.5">
        {syllabusUnits.map((unit) => {
          const isOpen = openUnits[unit.id] || searchQuery.trim().length > 0;
          const matchingTopics = unit.topics.filter(
            (t) =>
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.summary.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery.trim().length > 0 && matchingTopics.length === 0) {
            return null;
          }

          return (
            <div key={unit.id} className="space-y-1">
              {/* Unit Accordion Trigger */}
              <button
                onClick={() => toggleUnit(unit.id)}
                className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-zinc-800 hover:bg-zinc-100 transition-colors group"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-emerald-700 font-mono text-[11px]">{unit.badge}</span>
                  <span className="truncate text-zinc-900 text-xs font-bold">{unit.title.split("&")[0]}</span>
                </div>
                <div className="text-zinc-400 group-hover:text-zinc-700">
                  {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                </div>
              </button>

              {/* Topics List */}
              {isOpen && (
                <div className="pl-2 space-y-0.5 border-l border-zinc-200 ml-2">
                  {matchingTopics.map((topic, tIdx) => {
                    const isActive = unit.id === currentUnitId && topic.id === currentTopicId;
                    const isDone = completedTopics.includes(topic.id);

                    return (
                      <Link
                        key={topic.id}
                        href={`/units/${unit.id}/${topic.id}`}
                        className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? "bg-emerald-600 text-white font-bold shadow-xs"
                            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`font-mono text-[10px] w-4 shrink-0 ${
                              isActive ? "text-emerald-100" : "text-zinc-400"
                            }`}
                          >
                            {String(tIdx + 1).padStart(2, "0")}
                          </span>
                          <span className="truncate">{topic.title}</span>
                        </div>

                        {isDone && (
                          <CheckCircle2
                            className={`h-3.5 w-3.5 shrink-0 ml-1 ${
                              isActive ? "text-white" : "text-emerald-600"
                            }`}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
