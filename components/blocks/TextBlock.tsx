import ReactMarkdown from 'react-markdown'

export default function TextBlock({ markdown }: { markdown: string }) {
  return (
    <section className="prose mx-auto px-4 py-12">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  )
}
