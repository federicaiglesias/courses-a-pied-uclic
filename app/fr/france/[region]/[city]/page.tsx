interface Props {
  params: { region: string; city: string };
}

export default function CityPage({ params }: Props) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-blue-800">
        Ville : {params.city}
      </h1>
      <p className="text-gray-700">Liste des courses à venir...</p>
    </main>
  );
}
