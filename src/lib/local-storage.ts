import { BookmarkItem } from "@/types";

const BOOKMARKS_KEY = "nextjs_int257_bookmarks";
const COMPLETED_TOPICS_KEY = "nextjs_int257_completed_topics";
const NOTES_KEY = "nextjs_int257_notes";

export function getLocalBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalBookmark(item: Omit<BookmarkItem, "savedAt">): boolean {
  if (typeof window === "undefined") return false;
  try {
    const existing = getLocalBookmarks();
    const isAlreadySaved = existing.some((b) => b.id === item.id);

    let updated: BookmarkItem[];
    if (isAlreadySaved) {
      updated = existing.filter((b) => b.id !== item.id);
    } else {
      updated = [...existing, { ...item, savedAt: new Date().toISOString() }];
    }

    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage_bookmarks_updated"));
    return !isAlreadySaved;
  } catch {
    return false;
  }
}

export function isTopicBookmarked(id: string): boolean {
  if (typeof window === "undefined") return false;
  const bookmarks = getLocalBookmarks();
  return bookmarks.some((b) => b.id === id);
}

export function getCompletedTopics(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(COMPLETED_TOPICS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleTopicCompleted(topicId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const completed = getCompletedTopics();
    const isCompleted = completed.includes(topicId);
    const updated = isCompleted
      ? completed.filter((id) => id !== topicId)
      : [...completed, topicId];

    localStorage.setItem(COMPLETED_TOPICS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage_completed_updated"));
    return !isCompleted;
  } catch {
    return false;
  }
}

export function getTopicNote(topicId: string): string {
  if (typeof window === "undefined") return "";
  try {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
    return notes[topicId] || "";
  } catch {
    return "";
  }
}

export function saveTopicNote(topicId: string, noteText: string): void {
  if (typeof window === "undefined") return;
  try {
    const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
    notes[topicId] = noteText;
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch {}
}
