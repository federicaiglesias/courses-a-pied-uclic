import { supabase } from "@/lib/supabase";
import { Event } from "@/types/types";

/**
 * Formats a date string to a readable format in the specified language
 * @param dateString - Date string in ISO format
 * @param lang - Language code
 * @returns Formatted date string
 */
export function formatEventDate(dateString: string, lang: "fr" | "en"): string {
  const date = new Date(dateString);

  if (lang === "fr") {
    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } else {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }
}

/**
 * Fetches events with translation support and fallback
 * @param options - Configuration options for fetching events
 * @returns Array of events with applied translations
 */
export async function fetchEventsWithTranslation({
  lang,
  filters = {},
  pagination = null,
  orderBy = "date",
  orderDirection = "asc" as "asc" | "desc",
}: {
  lang: "fr" | "en";
  filters?: {
    city_slug?: string;
    region_slug?: string;
    is_featured?: boolean;
    is_published?: boolean;
    [key: string]: any;
  };
  pagination?: {
    page: number;
    itemsPerPage: number;
  } | null;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}) {
  // Build the query
  let query = supabase.from("events").select("*, event_i18n(*)");

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query = query.eq(key, value);
    }
  });

  // Order by featured first, then by the specified order
  query = query
    .order("is_featured", { ascending: false }) // Featured events first
    .order(orderBy, { ascending: orderDirection === "asc" });

  // Apply pagination if provided
  if (pagination) {
    const offset = (pagination.page - 1) * pagination.itemsPerPage;
    query = query.range(offset, offset + pagination.itemsPerPage - 1);
  }

  const { data: eventsData, error } = await query;

  if (error) {
    console.error("Error fetching events:", error);
    throw error;
  }

  // Apply translation with fallback
  const events = (eventsData || []).map((event: any) => {
    const i18n = event.event_i18n?.find((i: any) => i.lang === lang);
    return {
      ...event,
      title: i18n?.title || event.title,
      description: i18n?.description || event.description || "",
    };
  });

  return events;
}

/**
 * Fetches a single event with translation support and fallback
 * @param slug - Event slug
 * @param lang - Language code
 * @param filters - Additional filters
 * @returns Event with applied translations or null if not found
 */
export async function fetchEventWithTranslation({
  slug,
  lang,
  filters = {},
}: {
  slug: string;
  lang: "fr" | "en";
  filters?: {
    city_slug?: string;
    [key: string]: any;
  };
}) {
  // Build the query
  let query = supabase
    .from("events")
    .select("*, event_i18n(*)")
    .eq("slug", slug);

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query = query.eq(key, value);
    }
  });

  const { data: eventData, error } = await query.single();

  if (error || !eventData) {
    return null;
  }

  // Apply translation with fallback
  const event = {
    ...eventData,
    title:
      eventData.event_i18n?.find((i: any) => i.lang === lang)?.title ||
      eventData.title,
    description:
      eventData.event_i18n?.find((i: any) => i.lang === lang)?.description ||
      eventData.description ||
      "",
  };

  return event;
}
