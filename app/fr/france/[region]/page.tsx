import { supabase } from "@/lib/supabase";
import CityList from "@/components/CityList";

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

  const { data: cities, error } = await supabase
    .from("cities")
    .select("*")
    .eq("region_slug", region);

  if (error) {
    console.error("Erreur Supabase:", error.message);
    return <p>Erreur lors du chargement des villes.</p>;
  }

  return (
    <section className="py-16 px-6 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-10">
        Villes de la région {region}
      </h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cities.map((city) => (
          <a
            key={city.slug}
            href={`/fr/france/${region}/${city.slug}`}
            className="bg-blue-50 border border-blue-100 rounded-xl p-6 hover:shadow-lg hover:scale-105 transition text-blue-800 font-medium"
          >
            {city.name}
          </a>
        ))}
      </div>
    </div>
  </section>
  
  );
}
