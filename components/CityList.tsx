interface City {
  slug: string;
  name: string;
  region_slug: string;
}

interface Props {
  cities: City[];
  lang?: "fr" | "en"; // por defecto es francés
}

export default function CityList({ cities, lang = "fr" }: Props) {
  const discoverText = lang === "en" ? "Discover" : "Découvrir";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cities.map((city, index) => (
        <a
          key={city.slug}
          href={`/${lang}/france/${city.region_slug}/${city.slug}`}
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Card Content */}
          <div className="relative p-8 text-center">
            <div className="mb-6">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300 block">
                🏙️
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {city.name}
            </h3>

            <div className="flex items-center justify-center space-x-2 text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
              <span className="text-sm">{discoverText}</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* Hover Effect Border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </a>
      ))}
    </div>
  );
}
