import { supabase } from "@/lib/supabase";

export async function getSeoMetadata({
  slug,
  lang,
  fallback,
}: {
  slug: string;
  lang: "fr" | "en";
  fallback?: { title: string; description: string };
}) {
  const { data, error } = await supabase
    .from("seo_metadata")
    .select("*")
    .eq("page_slug", slug)
    .eq("lang", lang)
    .single();

  if (error || !data) {
    console.warn("No metadata found, using fallback:", slug, lang);
    return {
      title: fallback?.title || "Courses à Pied",
      description: fallback?.description || "",
    };
  }

  return {
    title: data.title,
    description: data.description,
  };
}
