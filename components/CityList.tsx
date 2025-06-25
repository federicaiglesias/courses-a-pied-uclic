interface City {
  slug: string;
  name: string;
  region_slug: string;
}

interface Props {
  cities: City[];
}

export default function CityList({ cities }: Props) {
  return (
    <ul className="space-y-2">
      {cities.map((city) => (
        <li key={city.slug}>
          <a
            href={`/fr/france/${city.region_slug}/${city.slug}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {city.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
