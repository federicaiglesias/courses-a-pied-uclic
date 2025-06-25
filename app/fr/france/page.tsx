import { supabase } from "@/lib/supabase";
import RegionList from "@/components/RegionList";

export const metadata = {
  title: "Courses à pied en France",
  description:
    "Trouvez toutes les courses à pied organisées en France par région.",
};

export default async function FrancePage() {
  const { data: regions, error } = await supabase
    .from("regions")
    .select("*")
    .eq("country_slug", "france");


  if (error) {
    console.error("Erreur Supabase:", error.message);
    return <p>Erreur lors du chargement des régions.</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Régions de France
      </h1>
      <RegionList regions={regions || []} />
    </main>
  );
}
