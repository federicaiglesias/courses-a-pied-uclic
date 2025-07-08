import Link from "next/link";
import { headers } from "next/headers";
import { getNavigationLinks } from "@/lib/fetchNavigation";
import { supabase } from "@/lib/supabase";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import RegionDropdown from "./RegionDropdown";

interface HeaderProps {
  lang: "fr" | "en";
}

export default async function Header({ lang }: HeaderProps) {
  const links = await getNavigationLinks(lang, "header");
  const headersList = await headers();

  // Fetch regions and cities for the dropdown
  const { data: regions } = await supabase
    .from("regions")
    .select("*")
    .eq("country_slug", "france")
    .order("name", { ascending: true });

  // Get region slugs to fetch cities
  const regionSlugs = regions?.map((region) => region.slug) || [];

  // Try a simpler query first to see if there are any cities at all
  const { data: allCities, error: allCitiesError } = await supabase
    .from("cities")
    .select("*")
    .limit(10);

  console.log(
    "Header - All cities test:",
    allCities?.length || 0,
    allCitiesError
  );

  const { data: cities, error: citiesError } = await supabase
    .from("cities")
    .select("*")
    .in("region_slug", regionSlugs)
    .order("name", { ascending: true });

  // Debug logs
  console.log("Header - Regions found:", regions?.length || 0);
  console.log("Header - Cities found:", cities?.length || 0);
  console.log("Header - Region slugs:", regionSlugs);
  console.log("Header - Cities error:", citiesError);

  const navigation = {
    fr: {
      home: "Accueil",
      france: "France",
      contact: "Contact",
      legal: "Mentions Légales",
    },
    en: {
      home: "Home",
      france: "France",
      contact: "Contact",
      legal: "Legal Notice",
    },
  };

  const t = navigation[lang];
  const pathname = headersList.get("x-next-pathname") || "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-200 border border-white/30">
              🏃
            </div>
            <span className="text-xl font-bold text-white">Courses à Pied</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${lang}`}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
            >
              {t.home}
            </Link>
            <RegionDropdown
              regions={regions || []}
              cities={cities || []}
              lang={lang}
              currentPath={pathname}
            />
            <Link
              href={`/${lang}/contact`}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
            >
              {t.contact}
            </Link>
            <Link
              href={`/${lang}/mentions-legales`}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
            >
              {t.legal}
            </Link>
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher lang={lang} pathname={pathname} />
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            lang={lang}
            navigation={t}
            regions={regions || []}
            cities={cities || []}
          />
        </div>
      </div>
    </header>
  );
}
