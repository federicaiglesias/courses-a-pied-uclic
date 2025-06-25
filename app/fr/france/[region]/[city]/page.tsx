import EventCard from "@/components/EventCard";

interface Props {
  params: { region: string; city: string };
}

const dummyEvents = [
  {
    slug: "marathon-toulouse-2024",
    title: "Marathon de Toulouse 2024",
    date: "2024-10-06",
    distance_km: 42.195,
    price: "40€",
    registration_url: "https://example.com/inscription/toulouse",
  },
  {
    slug: "10k-toulouse-2024",
    title: "10K de Toulouse",
    date: "2024-07-15",
    distance_km: 10,
    price: "20€",
    registration_url: "https://example.com/inscription/10k-toulouse",
  },
];
export async function generateMetadata({ params }: { params: { city: string } }) {
  return {
    title: `Courses à pied à ${params.city}`,
    description: `Trouvez toutes les courses à pied organisées à ${params.city}`,
  };
}

export default function CityPage({ params }: Props) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Courses à {params.city}
      </h1>
      <div className="grid gap-6">
        {dummyEvents.map((event) => (
          <EventCard
            key={event.slug}
            event={event}
            regionSlug={params.region}
            city={{ slug: params.city }}
          />
        ))}
      </div>
    </main>
  );
}
