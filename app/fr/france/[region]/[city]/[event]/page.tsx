import EventDetails from "@/components/EventDetails";

interface Props {
  params: {
    region: string;
    city: string;
    event: string;
  };
}

export const generateMetadata = async ({ params }: Props) => {
  return {
    title: `Événement : ${params.event}`,
    description: `Découvrez tous les détails de l'événement ${params.event} à ${params.city}.`,
  };
};

export default async function EventPage({ params }: Props) {
  const dummyEvent = {
    title: "Marathon de Toulouse 2024",
    city: params.city,
    region: params.region,
    date: "2024-10-06",
    distance_km: 42.195,
    price: "40€",
    description:
      "Participez au célèbre marathon de Toulouse et courez à travers les rues historiques de la ville rose.",
    registration_url: "https://example.com/inscription/toulouse-marathon",
  };
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <EventDetails event={dummyEvent} />
      </div>
    </main>
  );
}
