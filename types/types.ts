// === Countries ===
export type Country = {
  id: string;
  slug: string;
  code_iso: string;
  lat?: number;
  lng?: number;
  name: string;
  emoji?: string;
};

// === Regions ===
export type Region = {
  id: string;
  slug: string;
  name: string;
  country_id: string;
  country_slug: string;
  lat?: number;
  lng?: number;
};

export type RegionListProps = {
  regions: Region[];
  lang?: "fr" | "en";
};

// === Cities ===
export type City = {
  id: string;
  slug: string;
  name: string;
  region_id: string;
  region_slug: string;
  lat?: number;
  lng?: number;
};

export type CityListProps = {
  cities: City[];
  lang?: "fr" | "en";
};

// === Events ===
export type Event = {
  id: string;
  slug: string;
  title: string;
  date: string;
  distance_km: number;
  price: string;
  registration_url: string;
  image_url?: string;
  city_id: string;
  city_slug?: string;
  is_published: boolean;
  is_featured?: boolean;
  meta_id?: string;
  created_at?: string;
};

export type EventTranslation = {
  id: string;
  event_id: string;
  lang: "fr" | "en";
  title: string;
  description: string;
};

export type EventCardProps = {
  event: Event;
  regionSlug: string;
  city: Pick<City, "slug">;
  lang?: "fr" | "en";
};

export type EventDetail = {
  title: string;
  city: string;
  region: string;
  date: string;
  distance_km: number;
  price: string;
  registration_url: string;
  description: string;
};

export type EventDetailsProps = {
  event: EventDetail;
  lang?: "fr" | "en";
};

// === SEO Metadata ===
export type SeoMetadata = {
  id: string;
  lang: "fr" | "en";
  title: string;
  description: string;
};

// === Supabase Response Types ===
export type SupabaseResponse<T> = {
  data: T[] | null;
  error: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  } | null;
};

export type SupabaseSingleResponse<T> = {
  data: T | null;
  error: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  } | null;
};
export type PageBlock = {
  id: string;
  page_slug: string;
  type: "text" | "hero" | "list_events";
  order: number;
  markdown?: string;
  title?: string;
  subtitle?: string;
  content?: Record<string, any>;
};
