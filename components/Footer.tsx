import Link from "next/link";

interface FooterProps {
  lang: "fr" | "en";
}

export default function Footer({ lang }: FooterProps) {
  const footerContent = {
    fr: {
      description:
        "Découvrez et participez aux meilleures courses à pied à travers l'Europe. Des événements pour tous les niveaux, de débutant à expert.",
      sections: {
        platform: "Plateforme",
        legal: "Légal",
        social: "Réseaux Sociaux",
        contact: "Contact",
      },
      links: {
        home: "Accueil",
        france: "France",
        contact: "Contact",
        legal: "Mentions Légales",
        privacy: "Politique de Confidentialité",
        terms: "Conditions d'Utilisation",
      },
      contact: {
        email: "contact@coursesapied.com",
        phone: "+33 1 23 45 67 89",
      },
      copyright: "© 2024 Courses à Pied. Tous droits réservés.",
      madeWith: "Fait avec ❤️ pour les coureurs",
    },
    en: {
      description:
        "Discover and participate in the best running events across Europe. Events for all levels, from beginner to expert.",
      sections: {
        platform: "Platform",
        legal: "Legal",
        social: "Social Media",
        contact: "Contact",
      },
      links: {
        home: "Home",
        france: "France",
        contact: "Contact",
        legal: "Legal Notice",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
      },
      contact: {
        email: "contact@coursesapied.com",
        phone: "+33 1 23 45 67 89",
      },
      copyright: "© 2024 Courses à Pied. All rights reserved.",
      madeWith: "Made with ❤️ for runners",
    },
  };

  const t = footerContent[lang];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                🏃
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Courses à Pied
              </span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              {t.description}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/coursesapied"
                className="text-blue-300 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/coursesapied"
                className="text-blue-300 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/coursesapied"
                className="text-blue-300 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-100">
              {t.sections.platform}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}`}
                  className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t.links.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/france`}
                  className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t.links.france}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-100">
              {t.sections.legal}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}/mentions-legales`}
                  className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t.links.legal}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/privacy`}
                  className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t.links.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/terms`}
                  className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t.links.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-100">
              {t.sections.contact}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${t.contact.phone}`}
                  className="text-blue-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {t.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-300 text-sm">{t.copyright}</div>
            <div className="text-blue-300 text-sm">{t.madeWith}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
