"use client";

import { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className = "",
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className={`rounded-2xl border border-[#333045] bg-[#211F2E] overflow-hidden font-mono text-xs sm:text-[13px] shadow-md ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1924] border-b border-[#333045] text-zinc-400">
        <div className="flex items-center gap-2.5">
          {/* Window dots */}
          <div className="flex items-center gap-1.5 opacity-80">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-zinc-600 text-xs">|</span>
          <div className="flex items-center gap-1.5">
            <FileCode className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs text-zinc-200 font-medium font-mono">{filename || language}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2d2a3e] hover:bg-[#39354f] text-zinc-200 hover:text-white transition-colors text-xs font-mono shadow-2xs active:scale-95 border border-[#3e3a54]"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code contents in #211F2E */}
      <div className="p-4 overflow-x-auto text-zinc-100 bg-[#211F2E]">
        <pre className="flex flex-col gap-0.5 !bg-[#211F2E]">
          {lines.map((line, idx) => (
            <div key={idx} className="flex leading-relaxed">
              {showLineNumbers && (
                <span className="w-8 select-none text-zinc-500 text-right pr-4 shrink-0 font-mono text-xs">
                  {idx + 1}
                </span>
              )}
              <code className="text-zinc-100 font-mono pr-4 whitespace-pre !bg-transparent !p-0 !border-0">
                {line}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
