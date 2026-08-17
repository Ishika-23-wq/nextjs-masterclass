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
    { href: "/bootcamp", label: "4-Hr Bootcamp", icon: Mic },
    { href: "/practice", label: "Practice", icon: Trophy },
    { href: "/quiz-arena", label: "Quiz", icon: Award },
    { href: "/playground", label: "Playground", icon: Code2 },
    { href: "/reference", label: "Reference", icon: FileText },
    // { href: "/react-vs-next", label: "React vs Next", icon: Sparkles },
    // { href: "/different-ways", label: "Different Ways", icon: Layers },
    // { href: "/projects", label: "Projects", icon: FolderGit2 },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-zinc-900 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
              <span className="font-mono font-extrabold text-sm">&lt;N/&gt;</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-zinc-900 flex items-center gap-1.5">
                NextMastery
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  INT257
                </span>
              </span>
              <span className="text-[10px] text-zinc-500 tracking-wide font-mono hidden sm:inline">
                Zero Auth • Free Access
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden 2xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
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
              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-600 hover:text-zinc-900 rounded-xl text-xs transition-colors"
              title="Search syllabus (Cmd + K)"
            >
              <Search className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline font-mono">Search</span>
              <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 bg-white border border-zinc-200 text-zinc-500 rounded font-mono shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks Icon */}
            <Link
              href="/bookmarks"
              className="relative p-2 bg-zinc-100 hover:bg-amber-50 border border-zinc-200 hover:border-amber-300 rounded-xl text-zinc-600 hover:text-amber-700 transition-colors"
              title="Saved topics and local notes"
            >
              <Bookmark className="h-4 w-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center font-mono shadow-xs">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            {/* Fast Start Learning CTA */}
            <Link
              href="/units/unit-1/intro-and-project-structure"
              className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Learning</span>
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
