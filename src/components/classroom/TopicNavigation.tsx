"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, CheckCircle2, FileText, Check } from "lucide-react";
import { saveLocalBookmark, isTopicBookmarked, toggleTopicCompleted, getCompletedTopics, getTopicNote, saveTopicNote } from "@/lib/local-storage";

interface TopicNavigationProps {
  currentTopicId: string;
  currentUnitId: string;
  currentTitle: string;
  prevTopic?: { unitId: string; topicId: string; title: string };
  nextTopic?: { unitId: string; topicId: string; title: string };
}

export function TopicNavigation({
  currentTopicId,
  currentUnitId,
  currentTitle,
  prevTopic,
  nextTopic,
}: TopicNavigationProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [savedNoteStatus, setSavedNoteStatus] = useState(false);

  useEffect(() => {
    setBookmarked(isTopicBookmarked(currentTopicId));
    setCompleted(getCompletedTopics().includes(currentTopicId));
    setNoteContent(getTopicNote(currentTopicId));
  }, [currentTopicId]);

  const handleToggleBookmark = () => {
    const isNowSaved = saveLocalBookmark({
      id: currentTopicId,
      type: "topic",
      title: currentTitle,
      unitId: currentUnitId,
      topicId: currentTopicId,
      href: `/units/${currentUnitId}/${currentTopicId}`,
    });
    setBookmarked(isNowSaved);
  };

  const handleToggleCompleted = () => {
    const isNowDone = toggleTopicCompleted(currentTopicId);
    setCompleted(isNowDone);
  };

  const handleSaveNote = () => {
    saveTopicNote(currentTopicId, noteContent);
    setSavedNoteStatus(true);
    setTimeout(() => setSavedNoteStatus(false), 2000);
  };

  return (
    <div className="space-y-6 pt-6 border-t border-zinc-200">
      {/* Student Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-zinc-200 rounded-3xl shadow-xs">
        <div className="flex items-center gap-2">
          {/* Mark Completed */}
          <button
            onClick={handleToggleCompleted}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
              completed
                ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            <CheckCircle2 className={`h-4 w-4 ${completed ? "text-emerald-700" : "text-zinc-400"}`} />
            <span>{completed ? "Completed Topic ✓" : "Mark as Completed"}</span>
          </button>

          {/* Star Bookmark */}
          <button
            onClick={handleToggleBookmark}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
              bookmarked
                ? "bg-amber-100 border-amber-300 text-amber-800"
                : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            <Star className={`h-4 w-4 ${bookmarked ? "fill-amber-500 text-amber-600" : "text-zinc-400"}`} />
            <span>{bookmarked ? "Bookmarked" : "Save Lesson"}</span>
          </button>

          {/* Local Notes */}
          <button
            onClick={() => setNotesOpen(!notesOpen)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100 transition-all"
          >
            <FileText className="h-4 w-4 text-purple-700" />
            <span>{notesOpen ? "Hide Notes" : "Student Notes"}</span>
          </button>
        </div>

        <span className="text-xs text-zinc-500 font-mono">INT257 Syllabus Track</span>
      </div>

      {/* Local Student Notes Panel */}
      {notesOpen && (
        <div className="p-5 bg-white border border-purple-200 rounded-3xl space-y-3 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase font-mono text-purple-950 font-bold flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-700" />
              <span>Personal Notes (Stored Locally in Your Browser)</span>
            </h4>
            {savedNoteStatus && (
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Saved!
              </span>
            )}
          </div>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Type your study notes, key ideas, or question reminders here..."
            rows={4}
            className="w-full p-3 bg-purple-50/40 border border-purple-200 rounded-2xl text-xs text-zinc-900 focus:outline-none focus:border-purple-500 leading-relaxed font-sans"
          />
          <button
            onClick={handleSaveNote}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Save Notes
          </button>
        </div>
      )}

      {/* Previous / Next Lesson Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevTopic ? (
          <Link
            href={`/units/${prevTopic.unitId}/${prevTopic.topicId}`}
            className="p-5 bg-white border border-zinc-200 hover:border-emerald-300 rounded-3xl space-y-1 block group transition-all shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 group-hover:text-emerald-700 font-mono">
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous Lesson</span>
            </div>
            <p className="text-sm font-bold text-zinc-900 truncate">{prevTopic.title}</p>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextTopic ? (
          <Link
            href={`/units/${nextTopic.unitId}/${nextTopic.topicId}`}
            className="p-5 bg-white border border-zinc-200 hover:border-emerald-400 rounded-3xl space-y-1 text-right block group transition-all sm:col-start-2 shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-center justify-end gap-1.5 text-xs text-zinc-500 group-hover:text-emerald-700 font-mono">
              <span>Next Lesson</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
            <p className="text-sm font-bold text-zinc-900 truncate">{nextTopic.title}</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
