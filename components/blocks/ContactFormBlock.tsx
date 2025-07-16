export default function ContactFormBlock({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16 px-2">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
          {title && (
            <h2 className="text-3xl font-bold mb-2 text-gray-900">{title}</h2>
          )}
          {subtitle && <p className="text-lg mb-6 text-gray-700">{subtitle}</p>}
          <form className="space-y-6">
            <div>
              <label
                className="block text-gray-800 font-semibold mb-1"
                htmlFor="name"
              >
                Nom
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-800 font-semibold mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-800 font-semibold mb-1"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="message"
                name="message"
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
