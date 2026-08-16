"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Sparkles, Layers, ArrowRight } from "lucide-react";
import { allTopics, searchTopics } from "@/data/topics";
import { TopicContent } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TopicContent[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchTopics(query));
    } else {
      setResults(allTopics.slice(0, 5));
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fadeIn">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 bg-zinc-50 border-b border-zinc-200">
          <Search className="h-5 w-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 6 syllabus units, topics, Supabase, Server Actions..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base text-zinc-900 placeholder-zinc-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-200/80 text-zinc-600 hover:text-zinc-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] uppercase font-mono text-zinc-400 font-bold">
            {query.trim() ? `Found ${results.length} results` : "Popular Syllabus Topics"}
          </div>

          {results.length > 0 ? (
            results.map((topic) => (
              <Link
                key={`${topic.unitId}-${topic.id}`}
                href={`/units/${topic.unitId}/${topic.id}`}
                onClick={onClose}
                className="flex items-start justify-between p-3.5 rounded-2xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200 transition-all group"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                      {topic.unitId.toUpperCase()}
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                      {topic.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600 line-clamp-1">{topic.shortSummary}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-emerald-600 transition-colors shrink-0 mt-2" />
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-zinc-500 text-sm space-y-1">
              <p>No topics matching "{query}"</p>
              <p className="text-xs text-zinc-400">Try searching for 'Server Actions', 'SSR', 'Routing', or 'Supabase'.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 border-t border-zinc-200 text-[11px] text-zinc-500 font-mono">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-zinc-700">ESC</kbd> to exit</span>
          <span>INT257 Course Platform</span>
        </div>
      </div>
    </div>
  );
}
