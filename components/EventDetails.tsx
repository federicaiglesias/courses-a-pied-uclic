interface EventDetailsProps {
  event: {
    title: string;
    city: string;
    region: string;
    date: string;
    distance_km: number;
    price: string;
    registration_url: string;
    description: string;
  };
}
export default function EventDetails({ event }: EventDetailsProps) {
  const {
    title,
    city,
    region,
    date,
    distance_km,
    price,
    registration_url,
    description,
  } = event;

  return (
    <div className="bg-white rounded shadow-md p-6 space-y-4">
      <h1 className="text-3xl font-bold text-blue-800">{title}</h1>

      <div className="text-gray-600">
        📍 {city}, {region}
      </div>

      <div className="text-sm text-gray-500">
        📅 {new Date(date).toLocaleDateString("fr-FR")} – {distance_km} km
      </div>

      <div className="text-md font-semibold text-green-700">💰 {price}</div>

      <p className="text-gray-700">{description}</p>

      <a
        href={registration_url}
        target="_blank"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        S'inscrire
      </a>
    </div>
  );
}
