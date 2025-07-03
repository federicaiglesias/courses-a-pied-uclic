import Link from "next/link";

export default async function NotFound({
  params,
}: {
  params: Promise<{ lang: "fr" | "en" }>;
}) {
  if (!params) {
    return null;
  }
  const { lang } = await params;
  const isFr = lang === "fr";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="inline-block text-8xl animate-bounce">🏃‍♂️</div>
        </div>

        <div className="mb-6">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
            404
          </h1>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {isFr ? "Page introuvable" : "Page not found"}
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {isFr
            ? "Oups ! Il semble que cette course n'existe pas ou que vous vous soyez égaré sur le parcours."
            : "Oops! It seems this race doesn't exist or you've gone off track."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-full hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>{isFr ? "Retour à l'accueil" : "Back to home"}</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
