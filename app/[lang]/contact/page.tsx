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
    slug: "contact",
    lang,
    fallback: {
      title:
        lang === "fr" ? "Contact - Courses à Pied" : "Contact - Running Events",
      description:
        lang === "fr"
          ? "Contactez-nous pour toute question concernant les courses à pied en Europe."
          : "Contact us for any questions about running events in Europe.",
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: "fr" | "en" }>;
}) {
  const { lang } = await params;

  const { data } = await supabase
    .from("page_blocks")
    .select("*")
    .eq("page_slug", "contact")
    .order("order");

  const blocks = data as PageBlock[];
  console.log("BLOQUES DESDE SUPABASE", blocks);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageRenderer blocks={blocks} lang={lang} />
    </main>
  );
}
