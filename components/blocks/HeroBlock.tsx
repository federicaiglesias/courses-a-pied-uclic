type Props = {
  title?: string;
  subtitle?: string;
};

export default function HeroBlock({ title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-6 text-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Icon/Emoji */}
        <div className="mb-8">
          <span className="inline-block text-6xl mb-4 animate-bounce">⚖️</span>
        </div>

        {title && (
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

      </div>
    </section>
  );
}
