import { supabase } from "@/lib/supabase";
import CityList from "@/components/CityList";
import EventCard from "@/components/EventCard";

interface Props {
  params: Promise<{ region: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  return {
    title: `Courses à pied en ${region}`,
    description: `Trouvez toutes les courses à pied organisées en ${region}`,
  };
}

export default async function RegionPage({ params }: Props) {
  const { region } = await params;

  const { data: cities, error: citiesError } = await supabase
    .from("cities")
    .select("*")
    .eq("region_slug", region);

  if (citiesError) {
    console.error("Erreur Supabase (cities):", citiesError.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            Erreur de connexion
          </h2>
          <p className="text-red-600">
            Impossible de charger les villes. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    );
  }

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .in(
      "city_slug",
      cities.map((city) => city.slug)
    );

  if (eventsError) {
    console.error("Erreur Supabase (events):", eventsError.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            Erreur de connexion
          </h2>
          <p className="text-red-600">
            Impossible de charger les événements. Veuillez réessayer plus tard.
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
            <span className="inline-block text-5xl mb-4">🗺️</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              {region}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
              Courses à pied
            </span>
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-blue-100 leading-relaxed">
            Découvrez les meilleures courses à pied organisées dans la région{" "}
            {region}.
            <span className="block mt-2 text-lg text-blue-200">
              Explorez les villes et trouvez votre prochaine course.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🏃‍♂️</span>
              <span className="font-semibold">
                {events?.length || 0} événements
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🏙️</span>
              <span className="font-semibold">
                {cities?.length || 0} villes
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🌟</span>
              <span className="font-semibold">Région {region}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Villes de la région {region}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explorez les villes de cette région et découvrez toutes les
              courses à pied disponibles.
            </p>
          </div>
          <CityList cities={cities} />
        </div>
      </section>

      {/* Events Section */}
      {events && events.length > 0 ? (
        <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Courses à pied en {region}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Découvrez notre sélection des meilleures courses à pied
                organisées dans la région {region}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {events.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  regionSlug={region}
                  city={{ slug: evt.city_slug }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-6xl mb-4 block">🏃‍♂️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Aucun événement trouvé
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Il n'y a actuellement aucun événement de course à pied programmé
              dans la région {region}.
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Restez informé !
              </h3>
              <p className="text-gray-600 mb-6">
                Nous ajoutons régulièrement de nouveaux événements. Revenez
                bientôt !
              </p>
              <a
                href="/fr/france"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                <span>Retour à la France</span>
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
            Prêt à courir en {region} ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de coureurs qui participent aux meilleures
            courses de cette région.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#cities"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Explorer les villes</span>
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
