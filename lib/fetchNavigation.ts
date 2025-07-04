import { supabase } from "@/lib/supabase";

export async function getNavigationLinks(
  lang: "fr" | "en",
  position: "header" | "footer"
) {
  const { data, error } = await supabase
    .from("site_navigation")
    .select("*")
    .eq("lang", lang)
    .eq("position", position)
    .order("order");

  if (error) {
    console.error("Erreur navigation:", error.message);
    return [];
  }

  return data;
}
