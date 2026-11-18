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

// Attractive Mildliner-inspired syntax highlighter for Pure JS / JSX / Next.js
function highlightSyntaxLine(line: string) {
  if (!line) return " ";

  const trimmed = line.trim();
  // Full line comment
  if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
    return <span className="text-stone-400 italic">{line}</span>;
  }

  // Tokenize line by regex matching syntax constructs
  const tokenRegex = /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z0-9_.-]+|\b(?:import|export|from|default|const|let|var|function|return|async|await|if|else|try|catch|throw|new|typeof|switch|case|while|for|of|in|yield)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|\b[A-Z][A-Za-z0-9_]*\b|\b(?:useState|useEffect|useRouter|usePathname|useSearchParams|useActionState|useOptimistic|cookies|headers|redirect|notFound|revalidatePath|revalidateTag)\b)/g;

  const parts = line.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    if (part.startsWith("//")) {
      return (
        <span key={index} className="text-stone-400 italic">
          {part}
        </span>
      );
    }
    if (
      (part.startsWith('"') && part.endsWith('"')) ||
      (part.startsWith("'") && part.endsWith("'")) ||
      (part.startsWith("`") && part.endsWith("`"))
    ) {
      return (
        <span key={index} className="text-[#15803d] font-medium">
          {part}
        </span>
      );
    }
    if (
      /^(import|export|from|default|const|let|var|function|return|async|await|if|else|try|catch|throw|new|typeof|switch|case|while|for|of|in|yield)$/.test(
        part
      )
    ) {
      return (
        <span key={index} className="text-[#5850ec] font-bold">
          {part}
        </span>
      );
    }
    if (/^(true|false|null|undefined)$/.test(part)) {
      return (
        <span key={index} className="text-[#b45309] font-bold">
          {part}
        </span>
      );
    }
    if (/^\d+(\.\d+)?$/.test(part)) {
      return (
        <span key={index} className="text-[#d97706] font-medium">
          {part}
        </span>
      );
    }
    if (/^<\/?/.test(part)) {
      return (
        <span key={index} className="text-[#be185d] font-bold">
          {part}
        </span>
      );
    }
    if (
      /^(useState|useEffect|useRouter|usePathname|useSearchParams|useActionState|useOptimistic|cookies|headers|redirect|notFound|revalidatePath|revalidateTag)$/.test(
        part
      )
    ) {
      return (
        <span key={index} className="text-[#7c3aed] font-bold">
          {part}
        </span>
      );
    }
    if (/^[A-Z][A-Za-z0-9_]*$/.test(part)) {
      return (
        <span key={index} className="text-[#6d28d9] font-semibold">
          {part}
        </span>
      );
    }

    return (
      <span key={index} className="text-[#292524]">
        {part}
      </span>
    );
  });
}

export function CodeBlock({
  code,
  language = "javascript",
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
    <div
      className={`rounded-2xl border border-[#e5ded4] bg-[#FAF8F5] overflow-hidden font-mono text-xs sm:text-[13px] shadow-xs ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F2ECE2] border-b border-[#e5ded4] text-stone-600">
        <div className="flex items-center gap-2.5">
          {/* Pastel candy window dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff7b72] border border-[#ff7b72]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f1c40f] border border-[#f1c40f]/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#2ecc71] border border-[#2ecc71]/40" />
          </div>
          <span className="text-stone-300 text-xs">|</span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 border border-[#dfd7cc] shadow-2xs">
            <FileCode className="h-3 w-3 text-emerald-600" />
            <span className="text-xs text-stone-700 font-semibold font-mono tracking-tight">
              {filename || language}
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all text-xs font-mono shadow-2xs active:scale-95 border ${
            copied
              ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
              : "bg-white hover:bg-[#FAF7F2] text-stone-700 hover:text-stone-900 border-[#dfd7cc]"
          }`}
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-stone-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Contents in Warm Linen Cream */}
      <div className="p-4 overflow-x-auto bg-[#FCFBF9] selection:bg-emerald-100">
        <pre className="flex flex-col gap-0.5 !bg-transparent text-stone-800">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className="flex leading-relaxed hover:bg-[#F5F0E6]/50 rounded px-1 -mx-1 transition-colors"
            >
              {showLineNumbers && (
                <span className="w-8 select-none text-stone-400 text-right pr-3.5 mr-3 shrink-0 font-mono text-xs border-r border-[#ece5da]">
                  {idx + 1}
                </span>
              )}
              <code className="text-stone-800 font-mono pr-4 whitespace-pre !bg-transparent !p-0 !border-0 flex-1">
                {highlightSyntaxLine(line)}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
