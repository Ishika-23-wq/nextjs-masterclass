"use client";

import React from "react";

// Color palettes inspired by Zebra Mildliners and Studyblr aesthetic
export type MildlinerColor = "matcha" | "sakura" | "honey" | "sky" | "lavender" | "latte";

export const mildlinerStyles: Record<
  MildlinerColor,
  {
    bg: string;
    border: string;
    text: string;
    accent: string;
    washiBg: string;
    washiPattern: string;
    highlight: string;
  }
> = {
  matcha: {
    bg: "bg-[#edf6ee]",
    border: "border-[#bfe0c6]",
    text: "text-[#2e5939]",
    accent: "bg-[#5b9669]",
    washiBg: "rgba(163, 214, 175, 0.7)",
    washiPattern: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)",
    highlight: "linear-gradient(104deg, rgba(186, 230, 201, 0.7) 0%, rgba(186, 230, 201, 0.25) 100%)",
  },
  sakura: {
    bg: "bg-[#fdf0f4]",
    border: "border-[#f7c2d1]",
    text: "text-[#8a2d48]",
    accent: "bg-[#d46483]",
    washiBg: "rgba(247, 182, 200, 0.7)",
    washiPattern: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)",
    highlight: "linear-gradient(104deg, rgba(254, 205, 220, 0.7) 0%, rgba(254, 205, 220, 0.25) 100%)",
  },
  honey: {
    bg: "bg-[#fef9e8]",
    border: "border-[#fce29d]",
    text: "text-[#7a5005]",
    accent: "bg-[#d99723]",
    washiBg: "rgba(253, 226, 142, 0.75)",
    washiPattern: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)",
    highlight: "linear-gradient(104deg, rgba(254, 238, 160, 0.75) 0%, rgba(254, 238, 160, 0.3) 100%)",
  },
  sky: {
    bg: "bg-[#eef6fd]",
    border: "border-[#bcdcfa]",
    text: "text-[#1c4b78]",
    accent: "bg-[#457fb8]",
    washiBg: "rgba(178, 214, 247, 0.7)",
    washiPattern: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)",
    highlight: "linear-gradient(104deg, rgba(186, 221, 252, 0.7) 0%, rgba(186, 221, 252, 0.25) 100%)",
  },
  lavender: {
    bg: "bg-[#f6f1fc]",
    border: "border-[#ddc8f6]",
    text: "text-[#54337d]",
    accent: "bg-[#8b65bc]",
    washiBg: "rgba(216, 192, 245, 0.7)",
    washiPattern: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)",
    highlight: "linear-gradient(104deg, rgba(225, 204, 250, 0.7) 0%, rgba(225, 204, 250, 0.25) 100%)",
  },
  latte: {
    bg: "bg-[#f7f2ea]",
    border: "border-[#dfceba]",
    text: "text-[#59422a]",
    accent: "bg-[#8c7152]",
    washiBg: "rgba(218, 200, 178, 0.7)",
    washiPattern: "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)",
    highlight: "linear-gradient(104deg, rgba(228, 212, 193, 0.7) 0%, rgba(228, 212, 193, 0.25) 100%)",
  },
};

/**
 * Cute Washi Tape decorative element placed on top of cards
 */
export function WashiTape({
  color = "matcha",
  className = "",
  width = "w-28",
  tilt = "-rotate-1",
}: {
  color?: MildlinerColor;
  className?: string;
  width?: string;
  tilt?: string;
}) {
  const style = mildlinerStyles[color] || mildlinerStyles.matcha;

  return (
    <div
      className={`h-5 ${width} ${tilt} absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none rounded-xs shadow-xs backdrop-blur-xs opacity-90 transition-transform hover:scale-105 ${className}`}
      style={{
        backgroundColor: style.washiBg,
        backgroundImage: style.washiPattern,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Die-cut sticker badge with cute white border, slight tilt, and drop shadow
 */
export function StickerBadge({
  emoji,
  label,
  color = "matcha",
  tilt = "rotate-[-1.5deg]",
  className = "",
  size = "md",
}: {
  emoji?: string;
  label: string;
  color?: MildlinerColor;
  tilt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const style = mildlinerStyles[color] || mildlinerStyles.matcha;
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2.5 py-0.5 gap-1"
      : size === "lg"
      ? "text-sm px-4 py-1.5 gap-2"
      : "text-xs px-3 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center font-bold font-sans rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] select-none transition-transform hover:scale-105 hover:rotate-0 cursor-default ${style.bg} ${style.text} ${tilt} ${sizeClasses} ${className}`}
    >
      {emoji && <span className="text-sm shrink-0 leading-none">{emoji}</span>}
      <span className="font-semibold tracking-tight">{label}</span>
    </span>
  );
}

/**
 * Mildliner Pastel Highlighter for text/headings
 */
export function MildlinerText({
  children,
  color = "honey",
  className = "",
}: {
  children: React.ReactNode;
  color?: MildlinerColor;
  className?: string;
}) {
  const style = mildlinerStyles[color] || mildlinerStyles.honey;

  return (
    <span
      className={`inline-block px-1.5 py-0.5 rounded-sm font-inherit transition-all ${className}`}
      style={{
        background: style.highlight,
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}

/**
 * Cute Stationery Sticky Note component
 */
export function StickyNote({
  children,
  title,
  sticker = "📌",
  color = "honey",
  className = "",
  tilt = "rotate-[-0.8deg]",
}: {
  children: React.ReactNode;
  title?: string;
  sticker?: string;
  color?: MildlinerColor;
  className?: string;
  tilt?: string;
}) {
  const style = mildlinerStyles[color] || mildlinerStyles.honey;

  return (
    <div
      className={`relative p-5 rounded-3xl border ${style.border} ${style.bg} ${tilt} shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-transform hover:rotate-0 hover:shadow-md ${className}`}
    >
      {/* Top Washi Tape */}
      <WashiTape color={color} width="w-24" />

      {/* Pin / Sticker Header */}
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base select-none">{sticker}</span>
          <h4 className={`font-bold text-xs uppercase tracking-wider font-mono ${style.text}`}>
            {title}
          </h4>
        </div>
      )}

      <div className={`text-xs sm:text-sm leading-relaxed ${style.text}`}>
        {children}
      </div>
    </div>
  );
}

/**
 * Study Mascot / Cute Cartoon Badge
 */
export function StudyBuddyMascot({
  title = "Study with Me 🎧",
  mood = "Focused & Cozy",
  className = "",
}: {
  title?: string;
  mood?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-2.5 px-3.5 bg-white/95 rounded-2xl border border-[#e5ded6] shadow-[0_3px_10px_rgba(140,115,85,0.08)] select-none ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-[#edf6ee] border border-[#bfe0c6] flex items-center justify-center text-xl shadow-xs shrink-0 animate-bounce">
        🧸
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
          {title}
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </span>
        <span className="text-[10px] text-stone-500 font-mono">{mood}</span>
      </div>
    </div>
  );
}
