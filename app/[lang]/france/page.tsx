import { supabase } from "@/lib/supabase";
import RegionList from "@/components/RegionList";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import { Region, City, Event, SupabaseResponse } from "@/types/types";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { fetchEventsWithTranslation } from "@/lib/fetchEvents";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    lang: "fr" | "en";
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

const translations = {
  fr: {
    metadata: {
      title: "Courses à pied en France",
      description:
        "Trouvez toutes les courses à pied organisées en France par région.",
    },
    error: {
      title: "Erreur de connexion",
      regionsMessage:
        "Impossible de charger les régions. Veuillez réessayer plus tard.",
      citiesMessage:
        "Impossible de charger les villes. Veuillez réessayer plus tard.",
      eventsMessage:
        "Impossible de charger les événements. Veuillez réessayer plus tard.",
    },
    noData: {
      regions: {
        title: "Aucune région trouvée",
        message:
          "Aucune région n'est disponible pour la France pour le moment.",
      },
      cities: {
        title: "Aucune ville trouvée",
        message: "Aucune ville n'est disponible pour les régions de France.",
      },
    },
    hero: {
      title: {
        running: "Courses à pied",
        inFrance: "en France",
      },
      subtitle:
        "Découvrez les meilleures courses à pied organisées dans toutes les régions de France.",
      subtitle2:
        "Du nord au sud, de l'est à l'ouest, trouvez votre prochaine course.",
      stats: {
        events: "événements",
        cities: "villes",
        regions: "régions",
      },
    },
    regions: {
      title: "Explorez par région",
      description:
        "Choisissez une région française et découvrez toutes les courses à pied disponibles.",
    },
    events: {
      title: "Toutes les courses en France",
      description:
        "Découvrez notre sélection des meilleures courses à pied organisées dans toute la France.",
      noEvents: {
        title: "Aucun événement trouvé",
        message:
          "Il n'y a actuellement aucun événement de course à pied programmé en France.",
        stayInformed: {
          title: "Restez informé !",
          message:
            "Nous ajoutons régulièrement de nouveaux événements. Revenez bientôt !",
          button: "Retour à l'accueil",
        },
      },
    },
    cta: {
      title: "Prêt à courir en France ?",
      description:
        "Rejoignez des milliers de coureurs qui participent aux meilleures courses françaises.",
      button: "Explorer les régions",
    },
  },
  en: {
    metadata: {
      title: "Running events in France",
      description: "Find all running events organized in France by region.",
    },
    error: {
      title: "Connection Error",
      regionsMessage: "Unable to load regions. Please try again later.",
      citiesMessage: "Unable to load cities. Please try again later.",
      eventsMessage: "Unable to load events. Please try again later.",
    },
    noData: {
      regions: {
        title: "No regions found",
        message: "No regions are available for France at the moment.",
      },
      cities: {
        title: "No cities found",
        message: "No cities are available for French regions.",
      },
    },
    hero: {
      title: {
        running: "Running events",
        inFrance: "in France",
      },
      subtitle:
        "Discover the best running events organized in all regions of France.",
      subtitle2: "From north to south, from east to west, find your next race.",
      stats: {
        events: "events",
        cities: "cities",
        regions: "regions",
      },
    },
    regions: {
      title: "Explore by region",
      description:
        "Choose a French region and discover all available running events.",
    },
    events: {
      title: "All races in France",
      description:
        "Discover our selection of the best running events organized throughout France.",
      noEvents: {
        title: "No events found",
        message: "There are currently no running events scheduled in France.",
        stayInformed: {
          title: "Stay informed!",
          message: "We regularly add new events. Come back soon!",
          button: "Back to home",
        },
      },
    },
    cta: {
      title: "Ready to run in France?",
      description:
        "Join thousands of runners who participate in the best French races.",
      button: "Explore regions",
    },
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = await getSeoMetadata({
    slug: "france",
    lang,
    fallback: {
      title:
        lang === "fr" ? "Courses à pied en France" : "Running events in France",
      description:
        lang === "fr"
          ? "Trouvez toutes les courses à pied organisées en France par région."
          : "Find all running events organized in France by region.",
    },
  });

  // Build canonical URL
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://courses-a-pied.com";
  const canonicalUrl = `${baseUrl}/${lang}/france`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${baseUrl}/fr/france`,
        en: `${baseUrl}/en/france`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: lang,
      alternateLocale: lang === "fr" ? "en" : "fr",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function FrancePage({ params, searchParams }: PageProps) {
  if (!params) {
    return null;
  }
  const { lang } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 20;
  const t = translations[lang];

  const { data: regions, error: regionsError }: SupabaseResponse<Region> =
    await supabase.from("regions").select("*").eq("country_slug", "france");

  if (regionsError) {
    console.error("Erreur Supabase (regions):", regionsError.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            {t.error.title}
          </h2>
          <p className="text-red-600">{t.error.regionsMessage}</p>
        </div>
      </div>
    );
  }

  const regionSlugs: string[] =
    regions?.map((region: Region) => region.slug) || [];
  if (regionSlugs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-yellow-500 text-6xl mb-4">🏃‍♂️</div>
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">
            {t.noData.regions.title}
          </h2>
          <p className="text-yellow-600">{t.noData.regions.message}</p>
        </div>
      </div>
    );
  }
  const { data: cities, error: citiesError }: SupabaseResponse<City> =
    await supabase.from("cities").select("*").in("region_slug", regionSlugs);

  if (citiesError) {
    console.error("Erreur Supabase (cities):", citiesError.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            {t.error.title}
          </h2>
          <p className="text-red-600">{t.error.citiesMessage}</p>
        </div>
      </div>
    );
  }

  const citySlugs: string[] = cities?.map((city: City) => city.slug) || [];

  if (citySlugs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-yellow-500 text-6xl mb-4">🏃‍♂️</div>
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">
            {t.noData.cities.title}
          </h2>
          <p className="text-yellow-600">{t.noData.cities.message}</p>
        </div>
      </div>
    );
  }
  // Get total count for pagination
  const { count: totalEvents } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .in("city_slug", citySlugs);

  const totalPages = Math.ceil((totalEvents || 0) / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  // Fetch events with translation
  let events: Event[] = [];
  try {
    events = await fetchEventsWithTranslation({
      lang,
      filters: {
        is_published: true,
      },
      pagination: {
        page: currentPage,
        itemsPerPage,
      },
    });

    // Filter events by city slugs
    events = events.filter((event) =>
      citySlugs.includes(event.city_slug || "")
    );
  } catch (error) {
    console.error("Erreur Supabase (events):", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            {t.error.title}
          </h2>
          <p className="text-red-600">{t.error.eventsMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              {t.hero.title.running}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200">
              {t.hero.title.inFrance}
            </span>
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-blue-100 leading-relaxed">
            {t.hero.subtitle}
            <span className="block mt-2 text-lg text-blue-200">
              {t.hero.subtitle2}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🏃‍♂️</span>
              <span className="font-semibold">
                {events?.length || 0} {t.hero.stats.events}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🏙️</span>
              <span className="font-semibold">
                {cities?.length || 0} {t.hero.stats.cities}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🗺️</span>
              <span className="font-semibold">
                {regions?.length || 0} {t.hero.stats.regions}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.regions.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.regions.description}
            </p>
          </div>
          <RegionList regions={regions || []} lang={lang} />
        </div>
      </section>

      {/* Events Section */}
      {events && events.length > 0 ? (
        <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.events.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t.events.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {events.map((evt: Event) => {
                const city: City | undefined = cities?.find(
                  (c: City) => c.slug === evt.city_slug
                );
                return (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    regionSlug={city?.region_slug || ""}
                    city={{ slug: evt.city_slug || "" }}
                    lang={lang}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/${lang}/france`}
                lang={lang}
              />
            )}
          </div>
        </section>
      ) : (
        <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-6xl mb-4 block">🏃‍♂️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t.events.noEvents.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t.events.noEvents.message}
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t.events.noEvents.stayInformed.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {t.events.noEvents.stayInformed.message}
              </p>
              <a
                href={`/${lang}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                <span>{t.events.noEvents.stayInformed.button}</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#regions"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <span>{t.cta.button}</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
