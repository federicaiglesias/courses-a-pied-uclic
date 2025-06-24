export const metadata = {
  title: "Courses à pied – Accueil",
  description: "Découvrez les courses à pied organisées dans différents pays.",
};

const countries = [
  { slug: "france", name: "France", code: "fr", emoji: "🇫🇷" },
  { slug: "belgique", name: "Belgique", code: "be", emoji: "🇧🇪" },
  { slug: "suisse", name: "Suisse", code: "ch", emoji: "🇨🇭" },
  { slug: "allemagne", name: "Allemagne", code: "de", emoji: "��" },
  { slug: "italie", name: "Italie", code: "it", emoji: "🇮🇹" },
  { slug: "espagne", name: "Espagne", code: "es", emoji: "🇪🇸" },
  { slug: "portugal", name: "Portugal", code: "pt", emoji: "🇵🇹" },
  { slug: "pays-bas", name: "Pays-Bas", code: "nl", emoji: "��" },
  { slug: "royaume-uni", name: "Royaume-Uni", code: "gb", emoji: "🇬🇧" },
  { slug: "irlande", name: "Irlande", code: "ie", emoji: "��" },
  // Ca va se faire avec la connection a la base de données (meme si au debut on aura juste la France)
  ];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          Bienvenue sur Courses à pied 🏃‍♀️
        </h1>
        <p className="text-gray-700 mb-6">
          Choisissez un pays pour découvrir les événements sportifs organisés.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {countries.map((country) => (
            <a
              key={country.slug}
              href={`/fr/${country.slug}`}
              className="bg-white rounded shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">
                {country.name}
              </h2>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
