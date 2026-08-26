import { Check, ChevronRight } from 'lucide-react'

const priceFactors = [
  'Medidas e configuração da cozinha',
  'Materiais e acabamentos escolhidos',
  'Ferragens, gavetas e acessórios',
  'Bancada, painéis, transporte e montagem',
]

const requestDetails = [
  'Planta ou medidas disponíveis',
  'Fotografias do espaço',
  'Localização da obra',
  'Materiais ou acabamentos pretendidos',
]

export default function KitchenSeoDetails() {
  return (
    <section className="border-y border-[#ded8cf] bg-white px-4 py-16 sm:py-20" aria-labelledby="cozinhas-coimbra-detalhes">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="section-kicker">Cozinhas por medida</p>
          <h2 id="cozinhas-coimbra-detalhes" className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Da primeira medida à montagem em obra</h2>
          <p className="mt-5 text-base leading-7 text-[#40505b]">Recolhemos a informação do espaço, definimos materiais e ferragens e apresentamos uma proposta com os trabalhos, o preço e o prazo previsto. O fabrico começa depois da aprovação das medidas e da proposta.</p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#ded8cf] bg-[#f8f5ef] p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold">De que depende o preço?</h3>
            <p className="mt-3 text-sm leading-6 text-[#40505b]">Não usamos um preço genérico por cozinha. O valor depende do projeto e dos elementos escolhidos.</p>
            <ul className="mt-5 space-y-3">
              {priceFactors.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#40505b]"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{item}</li>)}
            </ul>
          </article>
          <article className="rounded-2xl border border-[#ded8cf] bg-[#f8f5ef] p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold">O que enviar para começar</h3>
            <p className="mt-3 text-sm leading-6 text-[#40505b]">Pode iniciar o pedido sem ter o projeto fechado. Esta informação ajuda-nos a perceber o espaço e a preparar os passos seguintes.</p>
            <ul className="mt-5 space-y-3">
              {requestDetails.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#40505b]"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{item}</li>)}
            </ul>
          </article>
        </div>

        <nav aria-label="Serviços relacionados com cozinhas" className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#2b3b47] bg-[#19242e] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div><h2 className="font-display text-2xl font-bold">Já tem a cozinha ou precisa de outros móveis?</h2><p className="mt-2 text-sm leading-6 text-white/65">Consulte também os serviços específicos de montagem e de roupeiros por medida.</p></div>
          <div className="flex shrink-0 flex-col gap-2 text-sm font-bold text-[#f08a45]">
            <a href="/montagem-cozinhas-coimbra" className="inline-flex items-center gap-1">Montagem de cozinhas<ChevronRight className="h-4 w-4" /></a>
            <a href="/roupeiros-por-medida-coimbra" className="inline-flex items-center gap-1">Roupeiros por medida<ChevronRight className="h-4 w-4" /></a>
          </div>
        </nav>
      </div>
    </section>
  )
}
