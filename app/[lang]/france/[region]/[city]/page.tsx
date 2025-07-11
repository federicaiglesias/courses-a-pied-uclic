import { supabase } from "@/lib/supabase";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import { Event, SupabaseResponse } from "@/types/types";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { fetchEventsWithTranslation } from "@/lib/fetchEvents";
import { Metadata } from "next";

// Translations object
const translations = {
  fr: {
    metadata: {
      title: "Courses à pied à {city}",
      description: "Trouvez toutes les courses à pied organisées à {city}",
    },
    error: {
      title: "Erreur de connexion",
      message:
        "Impossible de charger les événements. Veuillez réessayer plus tard.",
    },
    hero: {
      title: {
        city: "{city}",
        running: "Courses à pied",
      },
      subtitle: "Découvrez les meilleures courses à pied organisées à {city}.",
      subtitle2: "Une ville, des courses, des défis à relever.",
      stats: {
        events: "événements",
        region: "Région {region}",
        city: "Ville {city}",
      },
    },
    events: {
      title: "Courses à pied à {city}",
      description:
        "Découvrez notre sélection des meilleures courses à pied organisées à {city}.",
      noEvents: {
        title: "Aucun événement trouvé",
        message:
          "Il n'y a actuellement aucun événement de course à pied programmé à {city}.",
        stayInformed: {
          title: "Restez informé !",
          message:
            "Nous ajoutons régulièrement de nouveaux événements. Revenez bientôt !",
          button: "Retour à la région",
        },
      },
    },
    cta: {
      title: "Prêt à courir à {city} ?",
      description:
        "Rejoignez des milliers de coureurs qui participent aux meilleures courses de cette ville.",
      button: "Voir les événements",
    },
  },
  en: {
    metadata: {
      title: "Running events in {city}",
      description: "Find all running events organized in {city}",
    },
    error: {
      title: "Connection Error",
      message: "Unable to load events. Please try again later.",
    },
    hero: {
      title: {
        city: "{city}",
        running: "Running events",
      },
      subtitle: "Discover the best running events organized in {city}.",
      subtitle2: "One city, races, challenges to overcome.",
      stats: {
        events: "events",
        region: "{region} Region",
        city: "{city} City",
      },
    },
    events: {
      title: "Running events in {city}",
      description:
        "Discover our selection of the best running events organized in {city}.",
      noEvents: {
        title: "No events found",
        message: "There are currently no running events scheduled in {city}.",
        stayInformed: {
          title: "Stay informed!",
          message: "We regularly add new events. Come back soon!",
          button: "Back to region",
        },
      },
    },
    cta: {
      title: "Ready to run in {city}?",
      description:
        "Join thousands of runners who participate in the best races in this city.",
      button: "View events",
    },
  },
};

interface Props {
  params: Promise<{ region: string; city: string; lang: "fr" | "en" }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; city: string; lang: "fr" | "en" }>;
}): Promise<Metadata> {
  const { region, city, lang } = await params;

  const metadata = await getSeoMetadata({
    slug: `france-${region}-${city}`,
    lang,
    fallback: {
      title:
        lang === "fr"
          ? `Courses à pied à ${city}`
          : `Running events in ${city}`,
      description:
        lang === "fr"
          ? `Trouvez toutes les courses à pied organisées à ${city}`
          : `Find all running events organized in ${city}`,
    },
  });

  // Build canonical URL
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://courses-a-pied.com";
  const canonicalUrl = `${baseUrl}/${lang}/france/${region}/${city}`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${baseUrl}/fr/france/${region}/${city}`,
        en: `${baseUrl}/en/france/${region}/${city}`,
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

export default async function CityPage({ params, searchParams }: Props) {
  const { region, city, lang } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 20;
  const t = translations[lang];

  // Verificar si la ciudad existe y pertenece a la región, y obtener su nombre
  const { data: cityData, error: cityError } = await supabase
    .from("cities")
    .select("slug, region_slug, name")
    .eq("slug", city)
    .eq("region_slug", region)
    .single();

  if (cityError || !cityData) {
    // Si la ciudad no existe o no pertenece a la región, mostrar not-found
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            {lang === "fr" ? "Ville introuvable" : "City not found"}
          </h2>
          <p className="text-red-600">
            {lang === "fr"
              ? `La ville "${city}" n'existe pas dans la région "${region}".`
              : `The city "${city}" does not exist in the region "${region}".`}
          </p>
          <a
            href={`/${lang}/france/${region}`}
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            {lang === "fr" ? "Retour à la région" : "Back to region"}
          </a>
        </div>
      </div>
    );
  }

  // Get total count for pagination
  const { count: totalEvents } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("city_slug", city)
    .eq("is_published", true);

  const totalPages = Math.ceil((totalEvents || 0) / itemsPerPage);

  // Fetch events with translation
  let events: Event[] = [];
  try {
    events = await fetchEventsWithTranslation({
      lang,
      filters: {
        city_slug: city,
        is_published: true,
      },
      pagination: {
        page: currentPage,
        itemsPerPage,
      },
    });
  } catch (error) {
    console.error("Erreur Supabase:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            {t.error.title}
          </h2>
          <p className="text-red-600">{t.error.message}</p>
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
          <div className="mb-6">
            <span className="inline-block text-5xl mb-4">🏙️</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              {t.hero.title.city.replace("{city}", cityData?.name || city)}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
              {t.hero.title.running}
            </span>
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-blue-100 leading-relaxed">
            {t.hero.subtitle.replace("{city}", cityData?.name || city)}
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
              <span className="text-2xl">🗺️</span>
              <span className="font-semibold">
                {t.hero.stats.region.replace("{region}", region)}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🌟</span>
              <span className="font-semibold">
                {t.hero.stats.city.replace("{city}", cityData?.name || city)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {events && events.length > 0 ? (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.events.title.replace("{city}", cityData?.name || city)}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t.events.description.replace("{city}", cityData?.name || city)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {events.map((event: Event) => (
                <EventCard
                  key={event.slug}
                  event={event}
                  regionSlug={region}
                  city={{ slug: city }}
                  lang={lang}
                />
              ))}
            </div>

            {/* Pagination for events */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/${lang}/france/${region}/${city}`}
                lang={lang}
              />
            )}
          </div>
        </section>
      ) : (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-6xl mb-4 block">🏃‍♂️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t.events.noEvents.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t.events.noEvents.message.replace(
                "{city}",
                cityData?.name || city
              )}
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t.events.noEvents.stayInformed.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {t.events.noEvents.stayInformed.message}
              </p>
              <a
                href={`/${lang}/france/${region}`}
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
          <h2 className="text-4xl font-bold text-white mb-6">
            {t.cta.title.replace("{city}", cityData?.name || city)}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#events"
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
