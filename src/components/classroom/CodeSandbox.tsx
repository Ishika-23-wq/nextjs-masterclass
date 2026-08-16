"use client";

import { useState } from "react";
import { Play, RotateCcw, Lightbulb, CheckCircle2, Terminal, Eye, Code2 } from "lucide-react";
import { executeNextJsSnippet, ExecutionResult } from "@/lib/code-runner";

interface CodeSandboxProps {
  initialCode: string;
  solutionCode?: string;
  hints?: string[];
  expectedOutput?: string;
  explanation?: string;
  title?: string;
}

export function CodeSandbox({
  initialCode,
  solutionCode,
  hints = [],
  expectedOutput,
  explanation,
  title = "Interactive Code Playground",
}: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<"code" | "output" | "logs">("code");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const execResult = executeNextJsSnippet(code);
      setResult(execResult);
      setIsRunning(false);
      setActiveTab("output");
    }, 400);
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult(null);
    setShowSolution(false);
    setActiveTab("code");
  };

  const handleToggleSolution = () => {
    if (!showSolution && solutionCode) {
      setCode(solutionCode);
      setShowSolution(true);
    } else {
      setCode(initialCode);
      setShowSolution(false);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-xs space-y-0">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-50 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-emerald-600" />
          <span className="font-bold text-xs sm:text-sm text-zinc-900">{title}</span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-zinc-200/80 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "code"
                ? "bg-white text-zinc-900 shadow-2xs font-bold"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "output"
                ? "bg-white text-emerald-800 shadow-2xs font-bold"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "logs"
                ? "bg-white text-amber-800 shadow-2xs font-bold"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Compiler Logs</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {hints.length > 0 && (
            <button
              onClick={() => {
                setShowHint(true);
                setCurrentHintIndex((prev) => (prev + 1) % hints.length);
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-colors shadow-2xs"
              title="Show a helpful hint"
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
              <span>Hint {hints.length > 1 ? `(${currentHintIndex + 1}/${hints.length})` : ""}</span>
            </button>
          )}

          {solutionCode && (
            <button
              onClick={handleToggleSolution}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors shadow-2xs ${
                showSolution
                  ? "bg-purple-100 border-purple-300 text-purple-900"
                  : "bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-700"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{showSolution ? "Hide Solution" : "View Solution"}</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 rounded-xl transition-colors shadow-2xs"
            title="Reset code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className={`h-3.5 w-3.5 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Compiling..." : "Run Code"}</span>
          </button>
        </div>
      </div>

      {/* Hint Alert Box */}
      {showHint && hints[currentHintIndex] && (
        <div className="p-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-600 shrink-0" />
            <span><strong>Hint:</strong> {hints[currentHintIndex]}</span>
          </div>
          <button onClick={() => setShowHint(false)} className="text-amber-700 hover:text-amber-950 text-xs font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* Tab Panels */}
      {activeTab === "code" && (
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            rows={12}
            className="w-full bg-[#211F2E] p-4 font-mono text-xs sm:text-[13px] text-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-y leading-relaxed font-normal border-t border-[#333045]"
          />
        </div>
      )}

      {activeTab === "output" && (
        <div className="p-5 bg-white min-h-[220px] space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <span className="text-xs font-mono uppercase text-zinc-500 font-bold">Simulated App Router Output</span>
            {result && (
              <span className="text-xs font-mono text-emerald-700 font-bold">
                Rendered in {result.executionTimeMs}ms
              </span>
            )}
          </div>

          {result ? (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-emerald-950">Server Render Simulation</span>
                </div>
                <div className="text-sm text-zinc-800 space-y-1">
                  <p className="text-emerald-800 font-mono text-xs font-bold">✓ Status 200 OK — Next.js Server Component</p>
                  <p className="text-xs text-zinc-600 pt-1 font-sans">
                    {result.renderedHtml || "Component compiled into static HTML payload with 0 hydration errors."}
                  </p>
                </div>
              </div>

              {expectedOutput && (
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs space-y-1">
                  <span className="text-zinc-500 font-mono font-bold">Expected Output:</span>
                  <p className="text-zinc-800 font-mono">{expectedOutput}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-400 text-xs font-mono">
              Press "Run Code" above to compile component and inspect server rendering.
            </div>
          )}
        </div>
      )}

      {activeTab === "logs" && (
        <div className="p-4 bg-[#211F2E] font-mono text-xs text-zinc-200 min-h-[220px] space-y-2 overflow-x-auto border-t border-[#333045]">
          <div className="text-zinc-400 border-b border-[#333045] pb-1">Next.js Turbopack Compiler Stream:</div>
          {result ? (
            result.logs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                <span className="text-zinc-500">[{new Date().toLocaleTimeString()}]</span>{" "}
                <span className={log.includes("[Error]") ? "text-rose-400 font-bold" : log.includes("✓") ? "text-emerald-400 font-bold" : "text-zinc-200"}>
                  {log}
                </span>
              </div>
            ))
          ) : (
            <p className="text-zinc-400">No compilation logs yet. Click 'Run Code' to execute.</p>
          )}
        </div>
      )}

      {/* Explanation Footer */}
      {explanation && (
        <div className="p-3.5 bg-zinc-50 border-t border-zinc-200 text-xs text-zinc-600">
          <strong className="text-zinc-900">How it works: </strong>
          {explanation}
        </div>
      )}
    </div>
  );
}
