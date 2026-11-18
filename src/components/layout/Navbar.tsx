"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  Sparkles,
  Layers,
  FolderGit2,
  Bookmark,
  Search,
  Menu,
  X,
  FileText,
  Award,
  Trophy,
  Info,
  ArrowRight,
  ShieldAlert,
  Mic,
} from "lucide-react";
import { SearchModal } from "./SearchModal";
import { getLocalBookmarks } from "@/lib/local-storage";

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setBookmarkCount(getLocalBookmarks().length);
    };
    updateCount();
    window.addEventListener("storage_bookmarks_updated", updateCount);
    return () => window.removeEventListener("storage_bookmarks_updated", updateCount);
  }, []);

  const navLinks = [
    { href: "/units", label: "Tutorials", icon: BookOpen },
    { href: "/practice", label: "Practice Lab", icon: Trophy },
    { href: "/playground", label: "Playground", icon: Code2 },
    { href: "/projects", label: "Projects", icon: FolderGit2 },
    { href: "/reference", label: "Reference", icon: FileText },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#e8e2d8] bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Logo with Cute Study Aesthetic */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-zinc-900 group shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs border-2 border-white group-hover:scale-105 transition-transform">
              <span className="font-mono font-black text-sm">&lt;N/&gt;</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-stone-900 flex items-center gap-1.5">
                NextMastery
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#fef9e8] text-[#7a5005] border border-[#fce29d] shadow-2xs">
                  INT257
                </span>
                <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-[#edf6ee] text-[#2e5939] border border-[#bfe0c6] hidden lg:inline-flex items-center gap-1">
                  <span>🍵</span> Study Mode
                </span>
              </span>
              <span className="text-[10px] text-stone-500 tracking-wide font-mono hidden sm:inline flex items-center gap-1">
                <span>✨</span> Zero Auth • Study Aesthetic
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden 2xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#edf6ee] text-[#2e5939] border border-[#bfe0c6] shadow-2xs font-bold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-[#f5efe6]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-[#f5efe6] border border-[#e5ded6] text-stone-600 hover:text-stone-900 rounded-2xl text-xs transition-colors shadow-2xs"
              title="Search syllabus (Cmd + K)"
            >
              <Search className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline font-mono">Search</span>
              <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 bg-[#fef9e8] border border-[#fce29d] text-stone-600 rounded font-mono shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks Icon */}
            <Link
              href="/bookmarks"
              className="relative p-2 bg-white hover:bg-[#fdf0f4] border border-[#e5ded6] hover:border-[#f7c2d1] rounded-2xl text-stone-600 hover:text-[#8a2d48] transition-colors shadow-2xs"
              title="Saved topics and local notes"
            >
              <Bookmark className="h-4 w-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d46483] text-white text-[10px] font-bold flex items-center justify-center font-mono shadow-xs border border-white">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            {/* Fast Start Learning CTA */}
            <Link
              href="/units/unit-1/intro-and-project-structure"
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-[#5b9669] hover:bg-[#4a8057] text-white rounded-2xl text-xs font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#4a8057]"
            >
              <span>✏️ Start Studying</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 2xl:hidden bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl text-zinc-700"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="2xl:hidden border-t border-zinc-200 bg-white p-4 space-y-1.5 shadow-lg animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
