import { TopicContent, SyllabusUnit, QuizQuestion, PracticeExercise } from "@/types";
import { allTopics as defaultTopics } from "@/data/topics";
import { syllabusUnits as defaultUnits } from "@/data/syllabus";
import { topicQnADatabase as defaultQnA, QnAItem } from "@/data/qna-data";
import { allCodingChallenges as defaultChallenges } from "@/data/exercises";

const CUSTOM_TOPICS_KEY = "nextmastery_admin_custom_topics";
const CUSTOM_QNA_KEY = "nextmastery_admin_custom_qna";
const CUSTOM_EXERCISES_KEY = "nextmastery_admin_custom_exercises";

// Helper to get custom topics stored by admin
export function getCustomTopics(): TopicContent[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CUSTOM_TOPICS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save a new admin topic
export function saveCustomTopic(topic: TopicContent): boolean {
  if (typeof window === "undefined") return false;
  try {
    const existing = getCustomTopics();
    const filtered = existing.filter((t) => !(t.unitId === topic.unitId && t.id === topic.id));
    const updated = [...filtered, topic];
    localStorage.setItem(CUSTOM_TOPICS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("admin_content_updated"));
    return true;
  } catch {
    return false;
  }
}

// Delete an admin topic
export function deleteCustomTopic(unitId: string, topicId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const existing = getCustomTopics();
    const updated = existing.filter((t) => !(t.unitId === unitId && t.id === topicId));
    localStorage.setItem(CUSTOM_TOPICS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("admin_content_updated"));
    return true;
  } catch {
    return false;
  }
}

// Get all topics (built-in + admin created)
export function getMergedTopics(): TopicContent[] {
  const custom = getCustomTopics();
  if (custom.length === 0) return defaultTopics;

  // Merge custom over default if matching
  const merged = [...defaultTopics];
  for (const c of custom) {
    const idx = merged.findIndex((t) => t.unitId === c.unitId && t.id === c.id);
    if (idx >= 0) {
      merged[idx] = c;
    } else {
      merged.push(c);
    }
  }
  return merged;
}

// Get Q&A items for a topic (built-in + admin added)
export function getTopicQnAItems(topicId: string): QnAItem[] {
  const defaultList = defaultQnA[topicId] || [];
  if (typeof window === "undefined") return defaultList;

  try {
    const customQnA = JSON.parse(localStorage.getItem(CUSTOM_QNA_KEY) || "{}");
    const adminList: QnAItem[] = customQnA[topicId] || [];
    return [...defaultList, ...adminList];
  } catch {
    return defaultList;
  }
}

// Save a new Q&A item for a topic
export function saveCustomQnAItem(topicId: string, item: QnAItem): boolean {
  if (typeof window === "undefined") return false;
  try {
    const customQnA = JSON.parse(localStorage.getItem(CUSTOM_QNA_KEY) || "{}");
    const currentList: QnAItem[] = customQnA[topicId] || [];
    customQnA[topicId] = [...currentList, item];
    localStorage.setItem(CUSTOM_QNA_KEY, JSON.stringify(customQnA));
    window.dispatchEvent(new Event("admin_content_updated"));
    return true;
  } catch {
    return false;
  }
}
