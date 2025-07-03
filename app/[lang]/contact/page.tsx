import PageRenderer from "@/components/PageRenderer"
import { supabase } from "@/lib/supabase"
import type { PageBlock } from "@/types/types"

export default async function ContactPage() {
  const { data } = await supabase
    .from("page_blocks")
    .select("*")
    .eq("page_slug", "contact")
    .order("order")

  const blocks = data as PageBlock[]
  console.log("BLOQUES DESDE SUPABASE", blocks)

  return (
    <main className="min-h-screen bg-slate-50">
      <PageRenderer blocks={blocks} lang="fr" />
    </main>
  )
}
