import { supabase } from "@/lib/supabase";
import { Event, SupabaseSingleResponse } from "@/types/types";

interface Props {
  params: Promise<{ region: string; city: string; event: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { event } = await params;

  const { data: eventData }: SupabaseSingleResponse<Event> = await supabase
    .from("events")
    .select("*")
    .eq("slug", event)
    .single();

  return {
    title: eventData?.title || "Détail de la course",
    description: `Informations sur la course ${eventData?.title || "à venir"}.`,
  };
};

export default async function EventDetails({ params }: Props) {
  const { event } = await params;

  const { data: eventData, error }: SupabaseSingleResponse<Event> =
    await supabase.from("events").select("*").eq("slug", event).single();

  if (error || !eventData) {
    console.error("Erreur Supabase:", error?.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            Événement introuvable
          </h2>
          <p className="text-red-600">
            L'événement que vous recherchez n'existe pas ou a été supprimé.
          </p>
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
              <span className="text-2xl">📍</span>
              <span className="font-semibold">{eventData.city_slug}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">📏</span>
              <span className="font-semibold">{eventData.distance_km} km</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">💶</span>
              <span className="font-semibold">{eventData.price}</span>
            </div>
          </div>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Préparez-vous pour une course exceptionnelle dans un cadre
            magnifique.
          </p>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Détails de la course</h2>
              <p className="text-blue-100">
                Toutes les informations importantes pour votre participation
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Event Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">📅</span>
                      Date et heure
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">
                      {eventData.date}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">📍</span>
                      Localisation
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">
                      {eventData.city_slug}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">📏</span>
                      Distance
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">
                      {eventData.distance_km} kilomètres
                    </p>
                  </div>
                </div>

                {/* Right Column - Registration Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">💶</span>
                      Prix d'inscription
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">
                      {eventData.price}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">✅</span>
                      Inscriptions ouvertes
                    </h3>
                    <p className="text-green-700 mb-4">
                      Les inscriptions sont actuellement ouvertes pour cette
                      course.
                    </p>
                    <a
                      href={eventData.registration_url}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>S'inscrire maintenant</span>
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

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">ℹ️</span>
                      Informations importantes
                    </h3>
                    <ul className="text-blue-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Arrivez 30 minutes avant le départ
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Apportez votre équipement de course
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Consultez la météo avant de partir
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à relever le défi ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines de coureurs pour cette course exceptionnelle
            à {eventData.city_slug}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={eventData.registration_url}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>S'inscrire à la course</span>
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
              href={`/fr/france/${eventData.city_slug}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              <span>Voir d'autres courses</span>
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
