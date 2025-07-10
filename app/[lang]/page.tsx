import { headers } from "next/headers";
import { Country, SupabaseResponse } from "@/types/types";
import { supabase } from "@/lib/supabase";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { Metadata } from "next";

const translations = {
  fr: {
    error: {
      title: "Erreur de connexion",
      message:
        "Impossible de charger les données. Veuillez réessayer plus tard.",
    },
    hero: {
      title: {
        run: "Cours.",
        breathe: "Respire.",
        win: "Gagne.",
      },
      subtitle:
        "Découvrez et participez aux meilleures courses à pied à travers l'Europe.",
      subtitle2: "Des événements pour tous les niveaux, de débutant à expert.",
      stats: {
        events: "+500 événements",
        countries: "15 pays",
        levels: "Tous niveaux",
      },
    },
    countries: {
      title: "Explorez les événements par pays",
      description:
        "Choisissez votre destination et découvrez les courses à pied qui vous attendent. De la France à l'Espagne, en passant par l'Italie et bien plus encore.",
      discover: "Découvrir",
    },
    features: {
      title: "Pourquoi choisir Courses à Pied ?",
      description:
        "Notre plateforme vous offre tout ce dont vous avez besoin pour vivre votre passion de la course à pied.",
      search: {
        title: "Recherche Facile",
        description:
          "Trouvez rapidement les courses qui correspondent à vos critères : distance, date, localisation.",
      },
      interface: {
        title: "Interface Moderne",
        description:
          "Une expérience utilisateur intuitive et responsive, accessible sur tous vos appareils.",
      },
      quality: {
        title: "Événements Qualité",
        description:
          "Une sélection rigoureuse des meilleures courses à pied organisées en Europe.",
      },
    },
    cta: {
      title: "Prêt à commencer votre aventure ?",
      description:
        "Rejoignez des milliers de coureurs qui ont déjà trouvé leur prochaine course sur notre plateforme.",
      button: "Explorer les pays",
    },
  },
  en: {
    error: {
      title: "Connection Error",
      message: "Unable to load data. Please try again later.",
    },
    hero: {
      title: {
        run: "Run.",
        breathe: "Breathe.",
        win: "Win.",
      },
      subtitle:
        "Discover and participate in the best running events across Europe.",
      subtitle2: "Events for all levels, from beginner to expert.",
      stats: {
        events: "+500 events",
        countries: "15 countries",
        levels: "All levels",
      },
    },
    countries: {
      title: "Explore events by country",
      description:
        "Choose your destination and discover the running events waiting for you. From France to Spain, through Italy and much more.",
      discover: "Discover",
    },
    features: {
      title: "Why choose Courses à Pied?",
      description:
        "Our platform offers everything you need to live your passion for running.",
      search: {
        title: "Easy Search",
        description:
          "Quickly find races that match your criteria: distance, date, location.",
      },
      interface: {
        title: "Modern Interface",
        description:
          "An intuitive and responsive user experience, accessible on all your devices.",
      },
      quality: {
        title: "Quality Events",
        description:
          "A rigorous selection of the best running events organized in Europe.",
      },
    },
    cta: {
      title: "Ready to start your adventure?",
      description:
        "Join thousands of runners who have already found their next race on our platform.",
      button: "Explore countries",
    },
  },
};

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "fr" | "en" }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const metadata = await getSeoMetadata({
    slug: "home",
    lang,
    fallback: {
      title:
        lang === "fr"
          ? "Courses à Pied - Découvrez les meilleures courses à pied en Europe"
          : "Courses à Pied - Discover the best running events in Europe",
      description:
        lang === "fr"
          ? "Découvrez et participez aux meilleures courses à pied à travers l'Europe. Des événements pour tous les niveaux, de débutant à expert."
          : "Discover and participate in the best running events across Europe. Events for all levels, from beginner to expert.",
    },
  });

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: lang,
      alternateLocale: lang === "fr" ? "en" : "fr",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "fr" | "en" }>;
}) {
  if (!params) {
    return null;
  }
  const { lang } = await params;
  const t = translations[lang];

  const { data: countries, error }: SupabaseResponse<Country> = await supabase
    .from("countries")
    .select("*");

  if (error) {
    console.error("Erreur Supabase:", error.message);
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block text-6xl mb-4 animate-bounce">
              🏃‍♂️
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              {t.hero.title.run}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
              {t.hero.title.breathe}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              {t.hero.title.win}
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
              <span className="text-2xl">🎯</span>
              <span className="font-semibold">{t.hero.stats.events}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🌍</span>
              <span className="font-semibold">{t.hero.stats.countries}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🏆</span>
              <span className="font-semibold">{t.hero.stats.levels}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.countries.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.countries.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {countries?.map((country: Country, index: number) => (
              <a
                key={country.slug}
                href={`/${lang}/${country.slug}`}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 animate-fade-in"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative p-8 text-center">
                  <div className="mb-6">
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-300 block">
                      {country.emoji}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {country.name}
                  </h3>

                  <div className="flex items-center justify-center space-x-2 text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                    <span className="text-sm">{t.countries.discover}</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.features.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.features.search.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.search.description}
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.features.interface.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.interface.description}
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.features.quality.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.quality.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#countries"
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
