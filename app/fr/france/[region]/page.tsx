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
    return <p>Erreur lors du chargement des villes.</p>;
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
    return <p>Erreur lors du chargement des événements.</p>;
  }

  return (
    <>
      {/* Sección de ciudades */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">
            Villes de la région {region}
          </h2>
          <CityList cities={cities} />
        </div>
      </section>

      {/* Sección de eventos */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">
            Courses à pied en {region}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
    </>
  );
}
