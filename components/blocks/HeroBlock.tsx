type Props = {
  title?: string;
  subtitle?: string;
};

export default function HeroBlock({ title, subtitle }: Props) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {title && (
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl text-blue-100">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
