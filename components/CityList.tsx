interface City {
    slug: string;
    name: string;
  }
  
  interface Props {
    regionSlug: string;
    cities: City[];
  }
  
  export default function CityList({ regionSlug, cities }: Props) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((city) => (
          <a
            key={city.slug}
            href={`/fr/france/${regionSlug}/${city.slug}`}
            className="block bg-white rounded shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold text-blue-700">{city.name}</h2>
          </a>
        ))}
      </div>
    );
  }
  