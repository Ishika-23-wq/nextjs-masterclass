import { Compass, CheckCircle2 } from "lucide-react";
import { WashiTape, StickerBadge } from "@/components/ui/StudyStickers";

interface DecisionGuideProps {
  guide: {
    recommendationSummary: string;
    scenarios: Array<{ scenario: string; recommendedApproach: string; reason: string }>;
  };
}

export function DecisionGuideBox({ guide }: DecisionGuideProps) {
  if (!guide || !guide.scenarios || guide.scenarios.length === 0) return null;

  return (
    <div className="relative rounded-3xl border border-[#fce29d] bg-white p-6 sm:p-7 space-y-5 shadow-2xs hover:shadow-sm transition-shadow">
      <WashiTape color="honey" width="w-32" tilt="-rotate-1" />

      <div className="flex items-center justify-between border-b border-[#fce29d]/70 pb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🧭</span>
          <h3 className="font-bold text-base text-stone-900">Architectural Decision Guide</h3>
        </div>
        <StickerBadge emoji="💡" label="Cheat Sheet" color="honey" size="sm" tilt="rotate-1" />
      </div>

      <p className="text-xs sm:text-sm text-stone-800 bg-[#fef9e8] p-4 rounded-2xl border border-[#fce29d] font-sans">
        📌 <strong>Summary: </strong>{guide.recommendationSummary}
      </p>

      <div className="grid gap-3.5">
        {guide.scenarios.map((sc, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 bg-[#FAF8F5] border border-[#e8e2d8] rounded-2xl space-y-3 shadow-2xs hover:border-[#fce29d] transition-all"
          >
            {/* Visual Decision Flowchart Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e8e2d8] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#fef9e8] border border-[#fce29d] text-[11px] font-mono font-bold text-[#7a5005] flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-bold text-stone-900">
                  Scenario: {sc.scenario}
                </span>
              </div>
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <span className="text-[10px] font-mono text-stone-500 uppercase font-bold">Use:</span>
                <span className="text-xs font-mono font-bold text-[#2e5939] px-3 py-1 rounded-full bg-[#edf6ee] border border-[#bfe0c6] shadow-2xs flex items-center gap-1">
                  <span>✓</span> {sc.recommendedApproach}
                </span>
              </div>
            </div>

            {/* Decision Rationale */}
            <div className="text-xs text-stone-700 leading-relaxed font-sans flex items-start gap-2 bg-white p-3 rounded-xl border border-[#e8e2d8]">
              <span className="text-sm shrink-0">💡</span>
              <p>
                <strong>Architectural Rationale:</strong> {sc.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
