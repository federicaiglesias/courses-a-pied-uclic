import PageRenderer from "@/components/PageRenderer";
import { supabase } from "@/lib/supabase";
import type { PageBlock } from "@/types/types";

export default async function MentionsLegalesPage() {
  const { data } = await supabase
    .from("page_blocks")
    .select("*")
    .eq("page_slug", "mentions-legales")
    .order("order");

  const blocks = data as PageBlock[];
  console.log("Blocks desde Supabase:", blocks);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageRenderer blocks={blocks} lang="fr" />
    </main>
  );
}
