import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{ region: string; city: string; event: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { event } = await params;

  const { data: eventData } = await supabase
    .from("events")
    .select("*")
    .eq("slug", event)
    .single();

  return {
    title: eventData?.title || "Détail de la course",
    description: `Informations sur la course ${eventData?.title || "à venir"}.`,
  };
};

export default async function EventDetails({ params }: Props) {
  const { event } = await params;

  const { data: eventData, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", event)
    .single();

  if (error || !eventData) {
    console.error("Erreur Supabase:", error?.message);
    return <p>Événement introuvable.</p>;
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        {eventData.title}
      </h1>
      <p className="text-gray-700 mb-2">
        📍 {eventData.city_slug} — {eventData.distance_km} km
      </p>
      <p className="text-gray-600 mb-4">📅 {eventData.date}</p>
      <p className="mb-6">💶 Prix : {eventData.price} </p>
      <a
        href={eventData.registration_url}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        target="_blank"
      >
        S&apos;inscrire
      </a>
    </main>
  );
}
