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
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Cours. Respire. Gagne.
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          Trouvez facilement des courses à pied dans toute l'Europe.
        </p>
      </section>

      {/* Section pays */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-10 text-center">
            Explorez les événements par pays
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {countries?.map((country) => (
              <a
                key={country.slug}
                href={`/fr/${country.slug}`}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all p-6 flex flex-col items-center text-center"
              >
                <span className="text-5xl mb-4">{country.emoji}</span>
                <h3 className="text-xl font-semibold text-blue-700">
                  {country.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sección opcional (puede quedar vacía o ser placeholder) */}
      {/* <section className="py-12 px-6 bg-white text-center text-gray-600">
        <p>Bientôt : filtres, favoris, et plus encore !</p>
      </section> */}
    </main>
  );
}
