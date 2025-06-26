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
    return <p>Erreur lors du chargement des régions.</p>;
  }

  const regionSlugs = regions.map((region) => region.slug);

  // Verificar que hay regiones antes de buscar ciudades
  if (regionSlugs.length === 0) {
    return <p>Aucune région trouvée pour la France.</p>;
  }

  const { data: cities, error: citiesError } = await supabase
    .from("cities")
    .select("*")
    .in("region_slug", regionSlugs);

  if (citiesError) {
    console.error("Erreur Supabase (cities):", citiesError.message);
    return <p>Erreur lors du chargement des villes.</p>;
  }

  const citySlugs = cities.map((city) => city.slug);

  if (citySlugs.length === 0) {
    return <p>Aucune ville trouvée pour les régions de France.</p>;
  }

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .in("city_slug", citySlugs);

  if (eventsError) {
    console.error("Erreur Supabase (events):", eventsError.message);
    return <p>Erreur lors du chargement des événements.</p>;
  }

  // Verificar que hay eventos
  if (!events || events.length === 0) {
    return (
      <main className="py-16 px-6 bg-gray-50">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">
            Choisissez une région
          </h2>
          <RegionList regions={regions} />
        </section>
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">
            Courses à pied en France
          </h2>
          <p>Aucun événement trouvé pour la France.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="py-16 px-6 bg-gray-50">
      {/* Sección de regiones */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">
          Choisissez une région
        </h2>
        <RegionList regions={regions} />
      </section>

      {/* Sección de eventos */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">
          Courses à pied en France
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((evt) => {
            const city = cities.find((c) => c.slug === evt.city_slug);
            return (
              <EventCard
                key={evt.id}
                event={evt}
                regionSlug={city?.region_slug || ""}
                city={{ slug: evt.city_slug }}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
