import ReactMarkdown from "react-markdown";

export default function TextBlock({ markdown }: { markdown: string }) {
  return (
    <section className="py-16 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-1000 prose-headings:font-bold prose-p:text-gray-900 prose-p:leading-relaxed prose-a:text-blue-700 prose-a:font-semibold hover:prose-a:text-blue-900 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:text-gray-900 prose-ol:text-slate-900">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}
