import { PAVEMENT_SEO_CONTENT, type PavementSeoVariant } from '@/content/pavement-seo'

export default function PavementSeoFacts({ variant }: { variant: PavementSeoVariant }) {
  const content = PAVEMENT_SEO_CONTENT[variant]

  return (
    <section className="border-t border-[#ded8cf] bg-[#f8f5ef] px-4 py-16 sm:py-20" aria-labelledby={`${variant}-regional-heading`}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="section-kicker">Preços, entrega e aplicação</p>
          <h2 id={`${variant}-regional-heading`} className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">{content.intro}</p>
        </div>

        <dl className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.facts.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-[#ded8cf] bg-white p-5 shadow-[0_8px_24px_rgba(25,36,46,0.04)]">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{fact.label}</dt>
              <dd className="mt-2 text-sm font-semibold leading-6 text-[#19242e]">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-[#19242e] sm:text-3xl">Perguntas frequentes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-[#ded8cf] bg-white p-6">
                <h3 className="font-display text-lg font-bold text-[#19242e]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
