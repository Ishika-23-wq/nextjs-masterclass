export type Difficulty = "very-easy" | "easy" | "medium" | "hard" | "combined";

export interface CodeExample {
  title: string;
  description: string;
  language: "typescript" | "tsx" | "javascript" | "jsx" | "css" | "json" | "bash" | "sql";
  filename?: string;
  code: string;
  explanation?: string;
  outputPreview?: string;
}

export interface ReactComparison {
  concept: string;
  reactWay: {
    title: string;
    code: string;
    explanation: string;
    drawbacks: string[];
  };
  nextjsWay: {
    title: string;
    code: string;
    explanation: string;
    benefits: string[];
  };
  whyDifferent: string;
  mentalShiftSummary: string;
}

export interface MultipleWayApproach {
  name: string;
  syntax: string;
  codeSnippet: string;
  howItWorks: string;
  pros: string[];
  cons: string[];
  whenToUse: string;
  isRecommended?: boolean;
}

export interface CommonMistake {
  mistakeTitle: string;
  badCode: string;
  goodCode: string;
  whyItBreaks: string;
  howToFix: string;
}

export interface PracticeExercise {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  prompt: string;
  initialCode: string;
  expectedOutput: string;
  hints: string[];
  solutionCode: string;
  solutionExplanation: string;
  testCases?: Array<{ name: string; expectedSubstring: string }>;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  conceptualExplanation: string;
  syllabusTopic: string;
}

export interface TopicContent {
  id: string;
  unitId: string;
  title: string;
  shortSummary: string;
  order: number;
  tags: string[];

  // 1. Simple explanation (Plain English for JS developers)
  simpleExplanation: string;

  // 2. Why it is needed (Real problems it solves)
  whyNeeded: string;

  // 3 & 4. React vs Next.js Approach
  reactVsNext: ReactComparison;

  // 5. Basic Code Example
  basicExample: CodeExample;

  // 6. Several More Examples
  moreExamples: CodeExample[];

  // 7. Multiple Ways to Perform the Same Task
  multipleWays: MultipleWayApproach[];

  // 8. When to Use Each Method (Decision guide)
  decisionGuide: {
    recommendationSummary: string;
    scenarios: Array<{ scenario: string; recommendedApproach: string; reason: string }>;
  };

  // 9. Common Mistakes
  commonMistakes: CommonMistake[];

  // 10. Best Practices
  bestPractices: Array<{ title: string; rule: string; explanation: string; codeExample?: string }>;

  // 11. Practice Exercises (Very Easy, Easy, Medium, Hard, Combined)
  exercises: PracticeExercise[];

  // 12. Quiz Questions
  quizzes: QuizQuestion[];

  // 13. Real-World Example
  realWorldExample: {
    domain: string; // e.g. "E-Commerce", "SaaS Dashboard", "Learning Platform"
    description: string;
    architectureDiagram?: string;
    code: CodeExample;
    keyTakeaway: string;
  };

  // 14. Combined Examples with previously learned topics
  combinedExample: {
    combinedTopics: string[];
    title: string;
    description: string;
    code: CodeExample;
    stepByStepFlow: string[];
  };
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  coreConcepts: string[];
  topics: Array<{
    id: string;
    title: string;
    summary: string;
    estimatedReadTime: string;
    level: "Beginner" | "Intermediate" | "Advanced";
  }>;
}

export interface ProjectStep {
  stepNumber: number;
  title: string;
  description: string;
  filename: string;
  code: string;
  explanation: string;
}

export interface GuidedProject {
  id: string;
  projectNumber: number;
  title: string;
  shortSummary?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Full-Stack Master";
  description: string;
  prerequisites: string[];
  techStack: string[];
  fileTree: string[];
  steps: ProjectStep[];
  interactiveDemoType: "website" | "blog" | "todo" | "student-portal" | "fullstack-supabase";
  keyTakeaways: string[];
  bonusChallenges: string[];
}

export interface BookmarkItem {
  id: string;
  type: "topic" | "snippet" | "project" | "exercise";
  title: string;
  unitId?: string;
  topicId?: string;
  href: string;
  snippetCode?: string;
  notes?: string;
  savedAt: string;
}
