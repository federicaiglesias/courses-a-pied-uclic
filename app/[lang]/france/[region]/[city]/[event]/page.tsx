import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { Event, SupabaseSingleResponse } from "@/types/types";
import { getSeoMetadata } from "@/lib/getSeoMetadata";

// Translations object
const translations = {
  fr: {
    metadata: {
      title: "Détail de la course",
      description: "Informations sur la course {title}.",
    },
    error: {
      title: "Événement introuvable",
      message:
        "L'événement que vous recherchez n'existe pas ou a été supprimé.",
    },
    hero: {
      subtitle:
        "Préparez-vous pour une course exceptionnelle dans un cadre magnifique.",
      stats: {
        location: "📍",
        distance: "📏",
        price: "💶",
      },
    },
    details: {
      title: "Détails de la course",
      subtitle: "Toutes les informations importantes pour votre participation",
      sections: {
        dateTime: {
          title: "Date et heure",
          icon: "📅",
        },
        location: {
          title: "Localisation",
          icon: "📍",
        },
        distance: {
          title: "Distance",
          icon: "📏",
          unit: "kilomètres",
        },
        price: {
          title: "Prix d'inscription",
          icon: "💶",
        },
        registration: {
          title: "Inscriptions ouvertes",
          icon: "✅",
          message:
            "Les inscriptions sont actuellement ouvertes pour cette course.",
          button: "S'inscrire maintenant",
        },
        important: {
          title: "Informations importantes",
          icon: "ℹ️",
          items: [
            "Arrivez 30 minutes avant le départ",
            "Apportez votre équipement de course",
            "Consultez la météo avant de partir",
          ],
        },
      },
    },
    cta: {
      title: "Prêt à relever le défi ?",
      description:
        "Rejoignez des centaines de coureurs pour cette course exceptionnelle à {city}.",
      buttons: {
        register: "S'inscrire à la course",
        otherEvents: "Voir d'autres courses",
      },
    },
  },
  en: {
    metadata: {
      title: "Race details",
      description: "Information about the race {title}.",
    },
    error: {
      title: "Event not found",
      message:
        "The event you are looking for does not exist or has been removed.",
    },
    hero: {
      subtitle: "Get ready for an exceptional race in a beautiful setting.",
      stats: {
        location: "📍",
        distance: "📏",
        price: "💶",
      },
    },
    details: {
      title: "Race details",
      subtitle: "All important information for your participation",
      sections: {
        dateTime: {
          title: "Date and time",
          icon: "📅",
        },
        location: {
          title: "Location",
          icon: "📍",
        },
        distance: {
          title: "Distance",
          icon: "📏",
          unit: "kilometers",
        },
        price: {
          title: "Registration fee",
          icon: "💶",
        },
        registration: {
          title: "Registration open",
          icon: "✅",
          message: "Registration is currently open for this race.",
          button: "Register now",
        },
        important: {
          title: "Important information",
          icon: "ℹ️",
          items: [
            "Arrive 30 minutes before the start",
            "Bring your running equipment",
            "Check the weather before leaving",
          ],
        },
      },
    },
    cta: {
      title: "Ready to take on the challenge?",
      description:
        "Join hundreds of runners for this exceptional race in {city}.",
      buttons: {
        register: "Register for the race",
        otherEvents: "See other races",
      },
    },
  },
};

interface Props {
  params: Promise<{
    region: string;
    city: string;
    event: string;
    lang: "fr" | "en";
  }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { region, city, event, lang } = await params;

  // Get event data for dynamic metadata
  const { data: eventData }: SupabaseSingleResponse<Event> = await supabase
    .from("events")
    .select("*")
    .eq("slug", event)
    .single();

  const metadata = await getSeoMetadata({
    slug: `france-${region}-${city}-${event}`,
    lang,
    fallback: {
      title:
        eventData?.title ||
        (lang === "fr" ? "Détail de la course" : "Race details"),
      description:
        lang === "fr"
          ? `Informations sur la course ${eventData?.title || ""} à ${city}.`
          : `Information about the race ${eventData?.title || ""} in ${city}.`,
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
};

export default async function EventDetails({ params }: Props) {
  const { region, city, event, lang } = await params;
  const t = translations[lang];

  // Verificar que el evento existe y pertenece a la ciudad correcta
  const { data: eventData, error }: SupabaseSingleResponse<Event> =
    await supabase
      .from("events")
      .select("*")
      .eq("slug", event)
      .eq("city_slug", city)
      .single();

  // Verificar que la ciudad pertenece a la región correcta
  const { data: cityData } = await supabase
    .from("cities")
    .select("region_slug")
    .eq("slug", city)
    .single();

  if (cityData?.region_slug !== region) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            {lang === "fr" ? "Événement introuvable" : "Event not found"}
          </h2>
          <p className="text-red-600">
            {lang === "fr"
              ? `L'événement "${event}" n'existe pas dans cette ville et région.`
              : `The event "${event}" does not exist in this city and region.`}
          </p>
          <a
            href={`/${lang}/france/${region}/${city}`}
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            {lang === "fr" ? "Retour à la ville" : "Back to city"}
          </a>
        </div>
      </div>
    );
  }

  if (error || !eventData) {
    console.error("Erreur Supabase:", error?.message);
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
            <span className="inline-block text-5xl mb-4">🏃‍♂️</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              {eventData.title}
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">{t.hero.stats.location}</span>
              <span className="font-semibold">{eventData.city_slug}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">{t.hero.stats.distance}</span>
              <span className="font-semibold">{eventData.distance_km} km</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">{t.hero.stats.price}</span>
              <span className="font-semibold">{eventData.price}</span>
            </div>
          </div>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">{t.details.title}</h2>
              <p className="text-blue-100">{t.details.subtitle}</p>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Primera fila: Fecha/Lugar | Precio/Distancia */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Col izquierda: Fecha y Lugar */}
                <div className="space-y-6">
                  {/* Fecha */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">
                        {t.details.sections.dateTime.icon}
                      </span>
                      {t.details.sections.dateTime.title}
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">
                      {eventData.date}
                    </p>
                  </div>
                  {/* Lugar */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">
                        {t.details.sections.location.icon}
                      </span>
                      {t.details.sections.location.title}
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">
                      {eventData.city_slug}
                    </p>
                  </div>
                </div>
                {/* Col derecha: Precio y Distancia */}
                <div className="space-y-6 mt-6 md:mt-0">
                  {/* Precio */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">
                        {t.details.sections.price.icon}
                      </span>
                      {t.details.sections.price.title}
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">
                      {eventData.price}
                    </p>
                  </div>
                  {/* Distancia */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">
                        {t.details.sections.distance.icon}
                      </span>
                      {t.details.sections.distance.title}
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">
                      {eventData.distance_km} {t.details.sections.distance.unit}
                    </p>
                  </div>
                </div>
              </div>
              {/* Segunda fila: Información importante | Registro */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Col izquierda: Información importante */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">
                      {t.details.sections.important.icon}
                    </span>
                    {t.details.sections.important.title}
                  </h3>
                  <ul className="text-blue-700 space-y-2">
                    {t.details.sections.important.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Col derecha: Registro */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">
                        {t.details.sections.registration.icon}
                      </span>
                      {t.details.sections.registration.title}
                    </h3>
                    <p className="text-green-700 mb-4">
                      {t.details.sections.registration.message}
                    </p>
                  </div>
                  <a
                    href={eventData.registration_url}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl mt-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{t.details.sections.registration.button}</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.cta.description.replace("{city}", eventData.city_slug || "")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={eventData.registration_url}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.cta.buttons.register}</span>
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
            <a
              href={`/${lang}/france/${eventData.city_slug || ""}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              <span>{t.cta.buttons.otherEvents}</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
