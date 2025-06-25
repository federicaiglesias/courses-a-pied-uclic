import RegionList from "@/components/RegionList";

const regions = [
  { slug: "occitanie", name: "Occitanie" },
  { slug: "ile-de-france", name: "Île-de-France" },
  { slug: "auvergne", name: "Auvergne-Rhône-Alpes" },
];

export const metadata = {
  title: "Courses à pied en France",
  description:
    "Trouvez toutes les courses à pied organisées en France par région.",
};

export default function FrancePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Régions de France
      </h1>
      <RegionList regions={regions} />
    </main>
  );
}
