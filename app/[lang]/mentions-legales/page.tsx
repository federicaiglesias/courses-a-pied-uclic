import PageRenderer from "@/components/PageRenderer";
import { supabase } from "@/lib/supabase";
import type { PageBlock } from "@/types/types";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "fr" | "en" }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const metadata = await getSeoMetadata({
    slug: "mentions-legales",
    lang,
    fallback: {
      title:
        lang === "fr"
          ? "Mentions Légales - Courses à Pied"
          : "Legal Notice - Running Events",
      description:
        lang === "fr"
          ? "Mentions légales et conditions d'utilisation de la plateforme Courses à Pied."
          : "Legal notice and terms of use for the Courses à Pied platform.",
    },
  });

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      locale: lang,
      alternateLocale: lang === "fr" ? "en" : "fr",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ lang: "fr" | "en" }>;
}) {
  const { lang } = await params;

  const { data } = await supabase
    .from("page_blocks")
    .select("*")
    .eq("page_slug", "mentions-legales")
    .order("order");

  const blocks = data as PageBlock[];
  console.log("Blocks desde Supabase:", blocks);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageRenderer blocks={blocks} lang={lang} />
    </main>
  );
}
