import CityList from "@/components/CityList";

interface Props {
  params: { region: string };
}

const dummyCities: Record<string, Array<{ slug: string; name: string }>> = {
  occitanie: [
    { slug: "toulouse", name: "Toulouse" },
    { slug: "montpellier", name: "Montpellier" },
  ],
  "ile-de-france": [
    { slug: "paris", name: "Paris" },
    { slug: "versailles", name: "Versailles" },
  ],
  auvergne: [{ slug: "clermont-ferrand", name: "Clermont-Ferrand" }],
};

export async function generateMetadata({
  params,
}: {
  params: { region: string };
}) {
  return {
    title: `Courses à pied en ${params.region}`,
    description: `Trouvez toutes les courses à pied organisées en ${params.region}`,
  };
}

export default function RegionPage({ params }: Props) {
  const cities = dummyCities[params.region] || [];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Villes en {params.region}
      </h1>
      <CityList regionSlug={params.region} cities={cities} />
    </main>
  );
}
