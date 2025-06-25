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
    <main className="p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Villes de la region {region}
      </h1>
      <CityList cities={cities || []} />
    </main>
  );
}
