import Link from "next/link";

interface LanguageSwitcherProps {
  lang: "fr" | "en";
  pathname: string;
}

export default function LanguageSwitcher({
  lang,
  pathname,
}: LanguageSwitcherProps) {
  return (
    <div className="flex items-center space-x-2">
      <Link
        href={pathname.replace(/^\/[a-z]{2}/, "/fr")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          lang === "fr"
            ? "text-white bg-white/20 backdrop-blur-sm"
            : "text-blue-200 hover:text-white hover:bg-white/10"
        }`}
      >
        FR
      </Link>
      <span className="text-blue-300">|</span>
      <Link
        href={pathname.replace(/^\/[a-z]{2}/, "/en")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          lang === "en"
            ? "text-white bg-white/20 backdrop-blur-sm"
            : "text-blue-200 hover:text-white hover:bg-white/10"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
