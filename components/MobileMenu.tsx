import Link from "next/link";
import { headers } from "next/headers";
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

export default async function MobileMenu({
  lang,
  navigation,
}: MobileMenuProps) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "/";
  return (
    <div className="md:hidden">
      {/* Toggle checkbox (invisible) */}
      <input type="checkbox" id="menu-toggle" className="peer hidden" />

      {/* Label acts as hamburger button */}
      <label
        htmlFor="menu-toggle"
        className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-200"
      >
        <svg
          className="h-6 w-6"
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
      </label>

      {/* Mobile menu content */}
      <div className="peer-checked:block hidden absolute top-full left-0 right-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 border-t border-white/20 z-40">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href={`/${lang}`}
            className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
          >
            {navigation.home}
          </Link>
          <Link
            href={`/${lang}/france`}
            className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
          >
            {navigation.france}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
          >
            {navigation.contact}
          </Link>
          <Link
            href={`/${lang}/mentions-legales`}
            className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
          >
            {navigation.legal}
          </Link>

          <div className="px-3 py-2 border-t border-white/20 pt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-blue-200">Language:</span>
              <LanguageSwitcher lang={lang} pathname={pathname} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
