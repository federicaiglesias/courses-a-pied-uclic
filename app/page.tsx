import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Courses à pied – Accueil",
  description: "Découvrez les courses à pied organisées par pays.",
};

export default async function CountryPage() {
  const { data: countries, error } = await supabase
    .from("countries")
    .select("*");

  if (error) {
    console.error("Erreur Supabase:", error.message);
    return <p>Erreur lors du chargement des pays.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Choisissez un pays
        </h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {countries?.map((country) => (
            <li key={country.slug}>
              <a
                href={`/fr/${country.slug}`}
                className="block bg-white rounded shadow-md p-6 hover:shadow-lg transition"
              >
                <span className="text-lg font-semibold text-blue-700">
                  {country.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

