export const metadata = {
    title: "Running races in France",
    description: "Explore regions in France and find upcoming running events near you.",
  };
  
  const fakeRegions = [
    { slug: "occitanie", name: "Occitanie" },
    { slug: "ile-de-france", name: "Île-de-France" },
    { slug: "auvergne", name: "Auvergne-Rhône-Alpes" },
  ];
  
  export default function FrancePageEN() {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Running events in France
          </h1>
          <p className="text-gray-700 mb-6">
            Select a region to discover available races:
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fakeRegions.map((region) => (
              <a
                key={region.slug}
                href={`/en/france/${region.slug}`}
                className="bg-white rounded shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-blue-700">
                  {region.name}
                </h2>
              </a>
            ))}
          </div>
        </div>
      </main>
    );
  }
