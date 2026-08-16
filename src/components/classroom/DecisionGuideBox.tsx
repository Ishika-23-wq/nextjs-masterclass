import { Compass, CheckCircle2 } from "lucide-react";

interface DecisionGuideProps {
  guide: {
    recommendationSummary: string;
    scenarios: Array<{ scenario: string; recommendedApproach: string; reason: string }>;
  };
}

export function DecisionGuideBox({ guide }: DecisionGuideProps) {
  if (!guide || !guide.scenarios || guide.scenarios.length === 0) return null;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 space-y-5 shadow-xs">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
        <Compass className="h-5 w-5 text-emerald-600" />
        <h3 className="font-bold text-base text-zinc-900">Architectural Decision Guide</h3>
      </div>

      <p className="text-xs sm:text-sm text-zinc-800 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
        📌 <strong>Summary: </strong>{guide.recommendationSummary}
      </p>

      <div className="grid gap-3">
        {guide.scenarios.map((sc, idx) => (
          <div key={idx} className="p-4 bg-zinc-50 border border-zinc-200/90 rounded-2xl space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-zinc-900">Scenario: {sc.scenario}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-mono">Recommendation:</span>
              <span className="text-xs font-mono font-bold text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                {sc.recommendedApproach}
              </span>
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed">
              <strong>Rationale:</strong> {sc.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
