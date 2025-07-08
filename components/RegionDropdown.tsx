import Link from "next/link";
import { Region, City } from "@/types/types";

interface RegionDropdownProps {
  regions: Region[];
  cities: City[];
  lang: "fr" | "en";
  currentPath: string;
}

export default function RegionDropdown({
  regions,
  cities,
  lang,
  currentPath,
}: RegionDropdownProps) {
  const translations = {
    fr: {
      france: "France",
      explore: "Explorer",
      cities: "Villes",
      viewRegion: "Voir la région",
    },
    en: {
      france: "France",
      explore: "Explore",
      cities: "Cities",
      viewRegion: "View region",
    },
  };

  const t = translations[lang];

  // Group cities by region
  const citiesByRegion = cities.reduce((acc, city) => {
    if (!acc[city.region_slug]) {
      acc[city.region_slug] = [];
    }
    acc[city.region_slug].push(city);
    return acc;
  }, {} as Record<string, City[]>);

  // Debug logs
  console.log("RegionDropdown - Total cities:", cities.length);
  console.log(
    "RegionDropdown - Cities by region:",
    Object.keys(citiesByRegion).length
  );
  console.log("RegionDropdown - Sample cities:", cities.slice(0, 3));

  return (
    <div className="relative group">
      {/* Trigger button */}
      <button className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10 flex items-center space-x-1">
        <span>{t.france}</span>
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Mega dropdown menu */}
      <div className="absolute top-full left-0 mt-1 w-96 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 z-50">
        <div className="py-2">
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">{t.france}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {regions.length} {lang === "fr" ? "régions" : "regions"}
              {cities.length > 0 &&
                ` • ${cities.length} ${lang === "fr" ? "villes" : "cities"}`}
            </p>
          </div>

          {/* Regions and cities grid */}
          <div className="max-h-96 overflow-y-auto">
            {regions.map((region) => {
              const regionCities = citiesByRegion[region.slug] || [];
              return (
                <div
                  key={region.slug}
                  className="border-b border-gray-50 last:border-b-0"
                >
                  {/* Region header */}
                  <Link
                    href={`/${lang}/france/${region.slug}`}
                    className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <span>{region.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {regionCities.length}
                      </span>
                    </div>
                  </Link>

                  {/* Cities submenu */}
                  {regionCities.length > 0 ? (
                    <div className="ml-4 border-l-2 border-gray-100">
                      {regionCities.slice(0, 4).map((city) => (
                        <Link
                          key={city.slug}
                          href={`/${lang}/france/${region.slug}/${city.slug}`}
                          className="block px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                        >
                          {city.name}
                        </Link>
                      ))}

                      {/* Show more cities indicator */}
                      {regionCities.length > 4 && (
                        <div className="px-4 py-1">
                          <span className="text-xs text-gray-400">
                            +{regionCities.length - 4}{" "}
                            {lang === "fr" ? "autres villes" : "more cities"}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="ml-4 border-l-2 border-gray-100">
                      <div className="px-4 py-2">
                        <span className="text-xs text-gray-400">
                          {lang === "fr" ? "Aucune ville" : "No cities"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 rounded-b-lg">
            <Link
              href={`/${lang}/france`}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-150"
            >
              {t.explore} {t.france} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
