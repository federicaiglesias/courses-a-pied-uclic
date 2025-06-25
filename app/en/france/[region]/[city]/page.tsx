interface Props {
  params: { region: string; city: string };
}

export default function CityPage({ params }: Props) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-blue-800">City : {params.city}</h1>
      <p className="text-gray-700">City's races list...</p>
    </main>
  );
}
