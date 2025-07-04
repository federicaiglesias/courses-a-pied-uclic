"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  lang: "fr" | "en";
  navigation: {
    home: string;
    france: string;
    contact: string;
    legal: string;
  };
}

export default function MobileMenu({ lang, navigation }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 transition-colors duration-200"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        {!isMenuOpen ? (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={`/${lang}`}
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {navigation.home}
            </Link>
            <Link
              href={`/${lang}/france`}
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {navigation.france}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {navigation.contact}
            </Link>
            <Link
              href={`/${lang}/mentions-legales`}
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {navigation.legal}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="px-3 py-2 border-t border-white/20 pt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-blue-200">Language:</span>
                <LanguageSwitcher lang={lang} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
