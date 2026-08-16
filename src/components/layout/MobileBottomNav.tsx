"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Trophy, Award, Code2, FileText } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const bottomNavItems = [
    { href: "/units", label: "Tutorials", icon: BookOpen },
    { href: "/practice", label: "Practice", icon: Trophy },
    { href: "/quiz-arena", label: "Quiz", icon: Award },
    { href: "/playground", label: "Playground", icon: Code2 },
    { href: "/reference", label: "Reference", icon: FileText },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-zinc-200/90 backdrop-blur-lg px-2 py-1.5 flex items-center justify-around shadow-lg">
      {bottomNavItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isActive ? "text-emerald-700 font-bold" : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
