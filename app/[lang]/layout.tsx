import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "fr" | "en" }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Header lang={lang} />
      <div className=" min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
      </div>
    </>
  );
}
