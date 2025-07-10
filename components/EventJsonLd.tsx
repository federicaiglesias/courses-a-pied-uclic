import { Event } from "@/types/types";

interface EventJsonLdProps {
  event: Event;
  lang: "fr" | "en";
  region: string;
  city: string;
  description: string;
}

export default function EventJsonLd({
  event,
  lang,
  region,
  city,
  description,
}: EventJsonLdProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://courses-a-pied.com";
  const eventUrl = `${baseUrl}/${lang}/france/${region}/${city}/${event.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: city,
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: region,
        addressCountry: "FR",
      },
    },
    description: description || `${event.title} - Course à pied`,
    url: eventUrl,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: "Courses à Pied",
    },
    offers: {
      "@type": "Offer",
      price: event.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: event.registration_url,
    },
  };

  if (event.image_url) {
    (jsonLd as any).image = event.image_url;
  }

  if (event.distance_km) {
    jsonLd.description = `${jsonLd.description} - Distance: ${event.distance_km} km`;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
