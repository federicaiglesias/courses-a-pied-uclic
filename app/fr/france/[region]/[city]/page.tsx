import { supabase } from "@/lib/supabase";
import EventCard from "@/components/EventCard";

interface Props {
  params: Promise<{ region: string; city: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { city } = await params;
  return {
    title: `Courses à ${city}`,
    description: `Découvrez toutes les courses à pied organisées à ${city}.`,
  };
};

export default async function CityPage({ params }: Props) {
  const { region, city } = await params;

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("city_slug", city);

  if (error) {
    console.error("Erreur Supabase:", error.message);
    return <p>Erreur lors du chargement des événements.</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Courses à {city}
      </h1>

      <div className="grid gap-6">
        {events?.length ? (
          events.map((event) => (
            <EventCard
              key={event.slug}
              event={event}
              regionSlug={region}
              city={{ slug: city }}
            />
          ))
        ) : (
          <p>Aucun événement trouvé pour cette ville.</p>
        )}
      </div>
    </main>
  );
}
