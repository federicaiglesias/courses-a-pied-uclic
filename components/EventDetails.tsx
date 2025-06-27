interface EventDetailsProps {
  event: {
    title: string;
    city: string;
    region: string;
    date: string;
    distance_km: number;
    price: string;
    registration_url: string;
    description: string;
  };
  lang?: "fr" | "en";
}

export default function EventDetails({
  event,
  lang = "fr",
}: EventDetailsProps) {
  const {
    title,
    city,
    region,
    date,
    distance_km,
    price,
    registration_url,
    description,
  } = event;

  const t = {
    date: lang === "en" ? "Date & Time" : "Date et heure",
    location: lang === "en" ? "Location" : "Localisation",
    distance: lang === "en" ? "Distance" : "Distance",
    priceLabel: lang === "en" ? "Registration Price" : "Prix d'inscription",
    registrationOpen:
      lang === "en" ? "Registration Open" : "Inscriptions ouvertes",
    registrationText:
      lang === "en"
        ? "Registrations are currently open for this race."
        : "Les inscriptions sont actuellement ouvertes pour cette course.",
    registerBtn: lang === "en" ? "Register now" : "S'inscrire maintenant",
    info: lang === "en" ? "Important Information" : "Informations importantes",
    tips:
      lang === "en"
        ? [
            "Arrive 30 minutes before the start",
            "Bring your running gear",
            "Check the weather forecast",
          ]
        : [
            "Arrivez 30 minutes avant le départ",
            "Apportez votre équipement de course",
            "Consultez la météo avant de partir",
          ],
    description: lang === "en" ? "Description" : "Description",
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center space-x-2 text-blue-100">
          <span className="text-xl">📍</span>
          <span className="font-medium">
            {city}, {region}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">📅</span>
                {t.date}
              </h3>
              <p className="text-gray-700 text-lg font-medium">
                {new Date(date).toLocaleDateString(
                  lang === "en" ? "en-GB" : "fr-FR",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">📍</span>
                {t.location}
              </h3>
              <p className="text-gray-700 text-lg font-medium">
                {city}, {region}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">📏</span>
                {t.distance}
              </h3>
              <p className="text-gray-700 text-lg font-medium">
                {distance_km} km
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">💶</span>
                {t.priceLabel}
              </h3>
              <p className="text-gray-700 text-lg font-medium">{price}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">✅</span>
                {t.registrationOpen}
              </h3>
              <p className="text-green-700 mb-4">{t.registrationText}</p>
              <a
                href={registration_url}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{t.registerBtn}</span>
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">ℹ️</span>
                {t.info}
              </h3>
              <ul className="text-blue-700 space-y-2">
                {t.tips.map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {description && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">📝</span>
              {t.description}
            </h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
