import Link from "next/link";
import { Region, City } from "@/types/types";

interface MobileRegionMenuProps {
  regions: Region[];
  cities: City[];
  lang: "fr" | "en";
}

export default function MobileRegionMenu({
  regions,
  cities,
  lang,
}: MobileRegionMenuProps) {
  const translations = {
    fr: {
      france: "France",
      regions: "Régions",
      cities: "Villes",
      viewAll: "Voir toutes les régions",
      viewRegion: "Voir la région",
    },
    en: {
      france: "France",
      regions: "Regions",
      cities: "Cities",
      viewAll: "View all regions",
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

  return (
    <div className="space-y-1">
      {/* France main link */}
      <Link
        href={`/${lang}/france`}
        className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-blue-100 hover:text-white hover:bg-white/10"
      >
        {t.france}
      </Link>

      {/* Regions and cities submenu */}
      <div className="ml-4 space-y-1">
        <div className="px-3 py-1">
          <span className="text-xs text-blue-200 font-medium uppercase tracking-wide">
            {t.regions} & {t.cities}
          </span>
        </div>

        {regions.slice(0, 4).map((region) => {
          const regionCities = citiesByRegion[region.slug] || [];
          return (
            <div key={region.slug} className="space-y-1">
              {/* Region link */}
              <Link
                href={`/${lang}/france/${region.slug}`}
                className="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-blue-200 hover:text-white hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <span>{region.name}</span>
                  <span className="text-xs text-blue-300 bg-white/10 px-2 py-1 rounded-full">
                    {regionCities.length}
                  </span>
                </div>
              </Link>

              {/* Cities submenu */}
              {regionCities.length > 0 && (
                <div className="ml-4 space-y-1">
                  {regionCities.slice(0, 3).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${lang}/france/${region.slug}/${city.slug}`}
                      className="block px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 text-blue-300 hover:text-white hover:bg-white/10"
                    >
                      {city.name}
                    </Link>
                  ))}

                  {/* Show more cities indicator */}
                  {regionCities.length > 3 && (
                    <div className="px-3 py-1">
                      <span className="text-xs text-blue-400">
                        +{regionCities.length - 3}{" "}
                        {lang === "fr" ? "autres" : "more"}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Show "View all" if there are more than 4 regions */}
        {regions.length > 4 && (
          <Link
            href={`/${lang}/france`}
            className="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-blue-300 hover:text-white hover:bg-white/10 border-t border-white/10 mt-2 pt-2"
          >
            {t.viewAll} ({regions.length} {t.regions})
          </Link>
        )}
      </div>
    </div>
  );
}
