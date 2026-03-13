"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Roami" width={100} height={36} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/faq" className="text-sm text-gray-600 hover:text-teal transition-colors">
            FAQ
          </Link>
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-teal transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="text-sm text-gray-600 hover:text-teal transition-colors">
            이용약관
          </Link>
          <a
            href="#waitlist"
            className="text-sm font-semibold text-white bg-teal hover:bg-teal-dark px-5 py-2 rounded-full transition-colors"
          >
            사전 등록
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          {menuOpen ? (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <Link
            href="/faq"
            className="block text-sm text-gray-600 hover:text-teal py-2"
            onClick={() => setMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/privacy"
            className="block text-sm text-gray-600 hover:text-teal py-2"
            onClick={() => setMenuOpen(false)}
          >
            개인정보처리방침
          </Link>
          <Link
            href="/terms"
            className="block text-sm text-gray-600 hover:text-teal py-2"
            onClick={() => setMenuOpen(false)}
          >
            이용약관
          </Link>
          <a
            href="#waitlist"
            className="block text-sm font-semibold text-white bg-teal hover:bg-teal-dark px-5 py-2.5 rounded-full text-center transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            사전 등록
          </a>
        </div>
      )}
    </header>
  );
}
