"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowRight, BookOpen, Star } from "lucide-react";
import { getLocalBookmarks, saveLocalBookmark } from "@/lib/local-storage";
import { BookmarkItem } from "@/types";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    setBookmarks(getLocalBookmarks());
  }, []);

  const handleRemove = (item: BookmarkItem) => {
    saveLocalBookmark({
      id: item.id,
      type: item.type,
      title: item.title,
      href: item.href,
    });
    setBookmarks(getLocalBookmarks());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="font-mono text-xs text-amber-800 font-bold px-2.5 py-1 rounded-full bg-amber-100 border border-amber-200">
          &lt;saved-resources/&gt;
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Your Saved Topics & Notes
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Lessons you bookmark and notes you write are stored 100% locally in your browser memory. No login or user account required.
        </p>
      </div>

      {/* Bookmarks List */}
      {bookmarks.length > 0 ? (
        <div className="grid gap-4">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="p-5 bg-white border border-zinc-200 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-300 transition-all group shadow-xs hover:shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <h3 className="font-bold text-base text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    {b.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 font-mono">
                  Saved on {new Date(b.savedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRemove(b)}
                  className="p-2 text-zinc-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <Link
                  href={b.href}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Open Lesson</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-zinc-200 space-y-4 max-w-md mx-auto shadow-xs">
          <Bookmark className="h-10 w-10 text-zinc-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-900">No Saved Lessons Yet</h3>
            <p className="text-xs text-zinc-500">
              Click the <strong>Save Lesson</strong> button on any syllabus topic to bookmark it here.
            </p>
          </div>
          <Link
            href="/units"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-2xl transition-colors shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Explore Syllabus Lessons</span>
          </Link>
        </div>
      )}
    </div>
  );
}
