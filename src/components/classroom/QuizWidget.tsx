"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from "lucide-react";
import confetti from "canvas-confetti";
import { QuizQuestion } from "@/types";

interface QuizWidgetProps {
  questions: QuizQuestion[];
  topicTitle?: string;
}

export function QuizWidget({ questions, topicTitle = "Knowledge Check" }: QuizWidgetProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleCheckAnswer = (questionId: string) => {
    if (!selectedAnswers[questionId]) return;
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));

    const q = questions.find((item) => item.id === questionId);
    const chosen = q?.options.find((opt) => opt.id === selectedAnswers[questionId]);

    if (chosen?.isCorrect) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#059669", "#d97706", "#7c3aed"],
        });
      } catch {}
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted({});
  };

  const correctCount = questions.filter((q) => {
    const selected = selectedAnswers[q.id];
    const option = q.options.find((o) => o.id === selected);
    return submitted[q.id] && option?.isCorrect;
  }).length;

  const totalAnswered = Object.keys(submitted).length;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-6 shadow-xs">
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-600" />
          <h3 className="font-bold text-base text-zinc-900">{topicTitle}</h3>
        </div>

        <div className="flex items-center gap-3">
          {totalAnswered > 0 && (
            <span className="text-xs font-mono px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl font-bold">
              Score: <strong className="text-emerald-700">{correctCount}</strong> / {questions.length}
            </span>
          )}
          {totalAnswered > 0 && (
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 font-bold"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Question list */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isAnswerChecked = submitted[q.id];
          const chosenOptionId = selectedAnswers[q.id];

          return (
            <div key={q.id} className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-emerald-700 font-bold">
                  Question {qIndex + 1} of {questions.length}
                </span>
                <p className="font-bold text-sm text-zinc-900 leading-relaxed">{q.question}</p>
              </div>

              {/* Options */}
              <div className="grid gap-2">
                {q.options.map((option) => {
                  const isSelected = chosenOptionId === option.id;
                  let optionStyles = "bg-white border-zinc-200 text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50/30";

                  if (isSelected && !isAnswerChecked) {
                    optionStyles = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold";
                  } else if (isAnswerChecked) {
                    if (option.isCorrect) {
                      optionStyles = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                    } else if (isSelected && !option.isCorrect) {
                      optionStyles = "bg-rose-100 border-rose-400 text-rose-950 font-bold";
                    } else {
                      optionStyles = "bg-zinc-100/60 border-zinc-200 text-zinc-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(q.id, option.id)}
                      disabled={isAnswerChecked}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start justify-between gap-3 transition-all ${optionStyles}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 flex items-center justify-center text-xs font-mono uppercase shrink-0 mt-0.5 font-bold">
                          {option.id}
                        </span>
                        <span className="leading-relaxed font-sans">{option.text}</span>
                      </div>

                      {isAnswerChecked && (
                        <div>
                          {option.isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                          ) : isSelected ? (
                            <XCircle className="h-4 w-4 text-rose-700 shrink-0 mt-0.5" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit check button */}
              {!isAnswerChecked ? (
                <button
                  onClick={() => handleCheckAnswer(q.id)}
                  disabled={!chosenOptionId}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Check Answer
                </button>
              ) : (
                /* Explanation revealing */
                <div className="p-4 bg-white border border-zinc-200 rounded-2xl space-y-1.5 text-xs shadow-2xs">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                    <HelpCircle className="h-4 w-4 text-amber-600" />
                    <span>Concept Explanation</span>
                  </div>
                  <p className="text-zinc-700 leading-relaxed font-sans">{q.conceptualExplanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
