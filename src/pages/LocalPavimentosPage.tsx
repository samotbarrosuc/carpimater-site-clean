import { ChevronRight, Hammer, MapPin, ShoppingBag, Truck } from 'lucide-react'
import { useLocation } from 'wouter'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TRAVEL_DATA } from '@/content/viagens'
import {
  PRECO_FLUTUANTE_HIBRIDO_M2,
  PRECO_RODAPE_PVC_BRANCO_ML,
  PRECO_VINILICO_SPC_M2,
} from '@/content/precos-materiais'
import { formatEur } from '@/lib/calculations'

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const groupedLocations = TRAVEL_DATA.reduce<Record<string, typeof TRAVEL_DATA>>((groups, location) => {
  groups[location.distrito] = groups[location.distrito] || []
  groups[location.distrito].push(location)
  return groups
}, {})

function ShopActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <a
        href="/loja"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f05b13] px-6 text-sm font-bold text-white shadow-[0_14px_35px_rgba(240,91,19,0.22)] transition hover:bg-[#d94d0d]"
      >
        <ShoppingBag className="h-4 w-4" />
        Ver loja online
      </a>
      <a
        href="/contactos"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/10"
      >
        <Hammer className="h-4 w-4" />
        Pedir apoio
      </a>
    </div>
  )
}

function LocationLinks() {
  return (
    <section className="border-y border-[#ded8cf] bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="section-kicker">Zonas servidas</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Concelhos com entrega regular na Região Centro
          </h2>
          <p className="mt-4 leading-7 text-[#40505b]">
            Trabalhamos sobretudo nos distritos de Coimbra, Aveiro e Leiria. Para outras zonas, confirme connosco a disponibilidade.
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {Object.entries(groupedLocations).map(([district, locations]) => (
            <article key={district} className="rounded-3xl border border-[#ded8cf] bg-[#f8f5ef] p-5 sm:p-6">
              <h3 className="font-display text-2xl font-bold">{district}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {locations.map((location) => (
                  <a
                    key={location.concelho}
                    href={`/pavimentos-${slugify(location.concelho)}`}
                    className="rounded-full border border-[#ded8cf] bg-white px-3 py-1.5 text-xs font-bold text-[#40505b] transition hover:border-[#f05b13] hover:text-[#f05b13]"
                  >
                    {location.concelho}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function MaterialCards({ concelho }: { concelho?: string }) {
  const locationText = concelho ? ` para ${concelho}` : ''

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="section-kicker">Loja online</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
            Pavimentos e rodapés com preços publicados
          </h2>
          <p className="mt-4 leading-7 text-[#40505b]">
            Pode comprar apenas o material ou solicitar também aplicação. Os valores do material incluem IVA.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Flutuante híbrido',
              text: `AC5, resistente à água 100 h+ e disponível na loja online${locationText}.`,
              price: `${formatEur(PRECO_FLUTUANTE_HIBRIDO_M2)}/m²`,
              href: '/loja?categoria=flutuante',
            },
            {
              title: 'Vinílico SPC',
              text: `Pavimento vinílico impermeável para compra online${locationText}.`,
              price: `${formatEur(PRECO_VINILICO_SPC_M2)}/m²`,
              href: '/loja?categoria=vinilico',
            },
            {
              title: 'Rodapés',
              text: `Rodapé PVC branco e acabamentos com cor. Rodapé em madeira sob consulta.`,
              price: `desde ${formatEur(PRECO_RODAPE_PVC_BRANCO_ML)}/m`,
              href: '/loja?categoria=rodape',
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-[#ded8cf] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(25,36,46,0.08)]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f05b13]">{item.price}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#40505b]">{item.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#19242e] group-hover:text-[#f05b13]">
                Ver materiais
                <ChevronRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ZonasPavimentosPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#19242e]">
      <Navbar />

      <section className="bg-[#19242e] px-4 pb-16 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="section-kicker text-[#f08a45]">Pavimentos · Região Centro</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.03] tracking-[-0.035em] sm:text-6xl">
            Entrega gratuita de pavimentos na <span className="font-serif font-normal italic text-[#f08a45]">Região Centro.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
            Vendemos pavimento vinílico SPC, flutuante híbrido e rodapés. Pode comprar online, receber em casa ou em obra e pedir aplicação em separado.
          </p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
            <Truck className="h-4 w-4 text-[#f08a45]" />
            Transporte gratuito na Região Centro
          </div>
          <ShopActions />
        </div>
      </section>

      <MaterialCards />
      <LocationLinks />
      <Footer />
    </main>
  )
}

export function LocalPavimentosPage() {
  const [location] = useLocation()
  const slug = location.split('?')[0].replace('/pavimentos-', '').replace(/\/$/, '')
  const travelEntry = TRAVEL_DATA.find((entry) => slugify(entry.concelho) === slug)

  if (!travelEntry) {
    return <ZonasPavimentosPage />
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#19242e]">
      <Navbar />

      <section className="bg-[#19242e] px-4 pb-16 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="section-kicker text-[#f08a45]">Pavimentos · {travelEntry.distrito}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.03] tracking-[-0.035em] sm:text-6xl">
            Pavimentos em {travelEntry.concelho}. <span className="font-serif font-normal italic text-[#f08a45]">Compra online.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
            Vinílico SPC, flutuante híbrido e rodapés com preços publicados. Entrega regular gratuita na Região Centro e aplicação disponível mediante confirmação.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
              <Truck className="h-4 w-4 text-[#f08a45]" />
              Transporte gratuito para {travelEntry.concelho}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white">
              <MapPin className="h-4 w-4 text-[#f08a45]" />
              Distrito de {travelEntry.distrito}
            </span>
          </div>
          <ShopActions />
        </div>
      </section>

      <MaterialCards concelho={travelEntry.concelho} />
      <LocationLinks />
      <Footer />
    </main>
  )
}
