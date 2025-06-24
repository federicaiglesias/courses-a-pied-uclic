// app/fr/france/page.tsx
import Link from "next/link";

const fakeRegions = [
  { slug: "occitanie", name: "Occitanie" },
  { slug: "ile-de-france", name: "Île-de-France" },
  { slug: "auvergne", name: "Auvergne-Rhône-Alpes" },
];

export const metadata = {
  title: "Courses à pied en France",
  description:
    "Trouvez toutes les courses à pied organisées en France par région.",
};

export default function FrancePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          Courses à pied en France
        </h1>
        <p className="text-gray-700 mb-6">
          Sélectionnez une région pour voir les événements disponibles :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {fakeRegions.map((region) => (
            <Link
              key={region.slug}
              href={`/fr/france/${region.slug}`}
              className="bg-white rounded shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-blue-700">
                {region.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
