interface Props {
    params: Promise<{ region: string }>;
  }
  
  export default async function RegionPage({ params }: Props) {
    const { region } = await params;
  
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-blue-800">Region : {region}</h1>
        <p className="text-gray-700">Region's races list</p>
      </main>
    );
  }
  