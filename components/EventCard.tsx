interface Event {
  slug: string;
  title: string;
  date: string;
  distance_km: number;
  price: string;
  registration_url: string;
}

interface EventCardProps {
  event: Event;
  regionSlug: string;
  city: {
    slug: string;
  };
  lang?: "fr" | "en";
}

export default function EventCard({
  event,
  regionSlug,
  city,
  lang = "fr",
}: EventCardProps) {
  const detailLabel = lang === "en" ? "See details" : "Voir détails";
  const registerLabel = lang === "en" ? "Register" : "S'inscrire";

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Card Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {event.title}
          </h3>
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-gray-600">
            <span className="text-xl">📅</span>
            <span className="font-medium">{event.date}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <span className="text-xl">📏</span>
            <span className="font-medium">{event.distance_km} km</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <span className="text-xl">💶</span>
            <span className="font-medium">{event.price}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`/${lang}/france/${regionSlug}/${city.slug}/${event.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <span>{detailLabel}</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </a>

          {event.registration_url && (
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <span>{registerLabel}</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
}
