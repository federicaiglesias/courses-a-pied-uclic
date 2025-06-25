interface Region {
    slug: string;
    name: string;
  }
  
  interface Props {
    regions: Region[];
  }
  
  export default function RegionList({ regions }: Props) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {regions.map((region) => (
          <a
            key={region.slug}
            href={`/fr/france/${region.slug}`}
            className="block bg-white rounded shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold text-blue-700">{region.name}</h2>
          </a>
        ))}
      </div>
    );
  }
  