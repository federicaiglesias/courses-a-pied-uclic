interface Event {
    slug: string;
    title: string;
    date: string;
    distance_km: number;
    price: string;
    registration_url: string;
  }
  
  export default function EventCard({ event }: { event: Event }) {
    return (
      <div className="bg-white rounded shadow-md p-4 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-blue-800 mb-1">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          📅 {new Date(event.date).toLocaleDateString("fr-FR")} – {event.distance_km} km
        </p>
        <p className="text-gray-700 font-medium mb-4">{event.price}</p>
        <a
          href={event.registration_url}
          target="_blank"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          S'inscrire
        </a>
      </div>
    );
  }
  