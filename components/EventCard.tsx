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
}

export default function EventCard({ event, regionSlug, city }: EventCardProps) {
  return (
    <div className="bg-white border border-blue-100 rounded-xl p-6 shadow hover:shadow-md transition-all">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">
        {event.title}
      </h3>

      <div className="text-gray-600 space-y-1 mb-4">
        <p>📅 {event.date}</p>
        <p>📏 {event.distance_km} km</p>
        <p>💶 {event.price} €</p>
      </div>
      <a
        href={`/fr/france/${regionSlug}/${city.slug}/${event.slug}`}
        rel="noopener noreferrer"
        className="inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Voir détails
      </a>
      {event.registration_url && (
        <a
          href={event.registration_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          S'inscrire
        </a>
      )}
    </div>
  );
}
