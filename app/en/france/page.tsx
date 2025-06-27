import { supabase } from "@/lib/supabase";
import RegionList from "@/components/RegionList";
import EventCard from "@/components/EventCard";

export const metadata = {
  title: "Courses à pied en France",
  description:
    "Trouvez toutes les courses à pied organisées en France par région.",
};

export default async function FrancePage() {
  const { data: regions, error: regionsError } = await supabase
    .from("regions")
    .select("*")
    .eq("country_slug", "france");

  if (regionsError) {
    console.error("Erreur Supabase (regions):", regionsError.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            Connection error.
          </h2>
          <p className="text-red-600">
            Unable to load the regions. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const regionSlugs = regions.map((region) => region.slug);

  if (regionSlugs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-yellow-500 text-6xl mb-4">🏃‍♂️</div>
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">
            No regions found.
          </h2>
          <p className="text-yellow-600">
            No regions are available for France at the moment.
          </p>
        </div>
      </div>
    );
  }

  const { data: cities, error: citiesError } = await supabase
    .from("cities")
    .select("*")
    .in("region_slug", regionSlugs);

  if (citiesError) {
    console.error("Erreur Supabase (cities):", citiesError.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            No regions found.
          </h2>
          <p className="text-red-600">
            Unable to load the cities. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const citySlugs = cities.map((city) => city.slug);

  if (citySlugs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-yellow-500 text-6xl mb-4">🏃‍♂️</div>
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">
            No cities found. No cities found.
          </h2>
          <p className="text-yellow-600">
            No cities are available for the regions of France.
          </p>
        </div>
      </div>
    );
  }

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .in("city_slug", citySlugs);

  if (eventsError) {
    console.error("Erreur Supabase (events):", eventsError.message);
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            Connection error.
          </h2>
          <p className="text-red-600">
            Unable to load events. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Verificar que hay eventos
  if (!events || events.length === 0) {
    return (
      <main className="py-16 px-6 bg-gray-50">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">
            Choose a region.
          </h2>
          <RegionList regions={regions} lang="en" />
        </section>
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">
            Running races in France.
          </h2>
          <p>No events found for France.</p>
        </section>
      </main>
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
              Running races.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-200">
              in France
            </span>
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-blue-100 leading-relaxed">
            Discover the best running races organized across all regions of
            France.
            <span className="block mt-2 text-lg text-blue-200">
              From north to south, from east to west, find your next race.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🏃‍♂️</span>
              <span className="font-semibold">
                {events?.length || 0} events
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🏙️</span>
              <span className="font-semibold">
                {cities?.length || 0} cities
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">🗺️</span>
              <span className="font-semibold">
                {regions?.length || 0} regions
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
              Explore by region
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose a French region and discover all available running races.
            </p>
          </div>
          <RegionList regions={regions} lang="en" />
        </div>
      </section>

      {/* Events Section */}
      {events && events.length > 0 ? (
        <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                All races in France
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our selection of the best running races held across all
                of France.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {events.map((evt) => {
                const city = cities.find((c) => c.slug === evt.city_slug);
                return (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    regionSlug={city?.region_slug || ""}
                    city={{ slug: evt.city_slug }}
                    lang="en"
                  />
                );
              })}
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
              No events found
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              There are currently no running events scheduled in France.
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Stay informed!
              </h3>
              <p className="text-gray-600 mb-6">
                We regularly add new events. Check back soon!
              </p>
              <a
                href="/fr"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                <span>Back to Home</span>
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
            Ready to run in France?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of runners taking part in the best French races.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#regions"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Explore regions</span>
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
