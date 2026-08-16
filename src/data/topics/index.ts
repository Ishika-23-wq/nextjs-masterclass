import { TopicContent } from "@/types";
import { unit1Topics } from "./unit1";
import { unit2Topics } from "./unit2";
import { unit3Topics } from "./unit3";
import { unit4Topics } from "./unit4";
import { unit5Topics } from "./unit5";
import { unit6Topics } from "./unit6";

export const allTopics: TopicContent[] = [
  ...unit1Topics,
  ...unit2Topics,
  ...unit3Topics,
  ...unit4Topics,
  ...unit5Topics,
  ...unit6Topics,
];

export function getTopicById(unitId: string, topicId: string): TopicContent | undefined {
  return allTopics.find((t) => t.unitId === unitId && t.id === topicId);
}

export function getTopicsByUnit(unitId: string): TopicContent[] {
  return allTopics.filter((t) => t.unitId === unitId).sort((a, b) => a.order - b.order);
}

export function getAdjacentTopics(unitId: string, topicId: string): {
  prevTopic?: { unitId: string; topicId: string; title: string };
  nextTopic?: { unitId: string; topicId: string; title: string };
} {
  const currentIndex = allTopics.findIndex((t) => t.unitId === unitId && t.id === topicId);
  if (currentIndex === -1) return {};

  const prev = currentIndex > 0 ? allTopics[currentIndex - 1] : undefined;
  const next = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : undefined;

  return {
    prevTopic: prev ? { unitId: prev.unitId, topicId: prev.id, title: prev.title } : undefined,
    nextTopic: next ? { unitId: next.unitId, topicId: next.id, title: next.title } : undefined,
  };
}

export function searchTopics(query: string): TopicContent[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  return allTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.shortSummary.toLowerCase().includes(q) ||
      t.simpleExplanation.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
