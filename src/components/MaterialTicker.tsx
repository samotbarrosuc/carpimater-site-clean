import { ChevronRight, Truck } from 'lucide-react'
import { getProdutosByVariant } from '@/content/vinil'
import { RODAPES } from '@/content/rodapes'
import { formatEur } from '@/lib/calculations'

interface TickerMaterial {
  id: string
  name: string
  price: number
  unit: 'm²' | 'm'
  image?: string
  color: string
  href: string
}

const MATERIALS: TickerMaterial[] = [
  ...getProdutosByVariant('vinilico').map((product) => ({
    id: `vinyl-${product.id}`,
    name: product.nome,
    price: product.precoM2,
    unit: 'm²' as const,
    image: product.imagem,
    color: product.cor,
    href: '/loja?categoria=vinilico',
  })),
  ...getProdutosByVariant('flutuante').map((product) => ({
    id: `hybrid-${product.id}`,
    name: `ZCUDO ${product.nome}`,
    price: product.precoM2,
    unit: 'm²' as const,
    image: product.imagem,
    color: product.cor,
    href: '/loja?categoria=flutuante',
  })),
  ...RODAPES.map((product) => ({
    id: `baseboard-${product.id}`,
    name: `Rodapé ${product.nome}`,
    price: product.precoMl,
    unit: 'm' as const,
    image: product.imagem,
    color: product.cor,
    href: '/loja?categoria=rodape',
  })),
]

function MaterialIcon({ material, duplicate = false }: { material: TickerMaterial; duplicate?: boolean }) {
  return (
    <a
      href={material.href}
      aria-label={duplicate ? undefined : `${material.name}, ${material.price > 0 ? `${formatEur(material.price)} por ${material.unit}` : 'preço sob consulta'}. Abrir na loja.`}
      tabIndex={duplicate ? -1 : 0}
      className="flex h-12 w-12 shrink-0 items-center overflow-hidden rounded-xl border border-[#ddd6cc] bg-white p-1 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-md focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-11 sm:w-[190px] sm:pr-3"
    >
      <span className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-black/5 bg-[#eee9e1] sm:h-9 sm:w-9">
        {material.image ? (
          <img src={material.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <span
            className="block h-full w-full"
            style={{
              backgroundColor: material.color,
              backgroundImage: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,.3) 45%, transparent 70%), repeating-linear-gradient(0deg, rgba(25,36,46,.04) 0 1px, transparent 1px 6px)',
            }}
          />
        )}
      </span>
      <span className="ml-2 hidden min-w-0 whitespace-nowrap sm:block">
        <span className="block max-w-[128px] truncate text-xs font-bold text-[#19242e]">{material.name}</span>
        <span className="mt-0.5 block text-[0.65rem] font-semibold text-primary">{material.price > 0 ? `${formatEur(material.price)}/${material.unit}` : 'Preço sob consulta'}</span>
      </span>
    </a>
  )
}

export default function MaterialTicker() {
  return (
    <section className="material-marquee border-b border-[#ded8cf] bg-[#eee7dc]" aria-label="Materiais disponíveis na loja">
      <div className="mx-auto flex max-w-[1600px] flex-col sm:flex-row sm:items-stretch">
        <a href="/loja" className="group/promo relative z-10 hidden shrink-0 items-center gap-3 border-r border-[#e1c9a9] bg-[#fff9ef] px-6 py-3 text-[#19242e] transition-colors hover:bg-white sm:flex" aria-label="Ir para a loja — portes grátis na Região Centro">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f05b13] text-white shadow-[0_6px_16px_rgba(240,91,19,0.2)]"><Truck className="h-4 w-4" /></span>
          <div>
            <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-[#c54d14]">Entregas da loja</p>
            <p className="mt-0.5 text-xs text-[#40505b] sm:text-sm"><strong className="font-extrabold text-[#19242e]">Portes grátis</strong><span className="font-semibold text-[#8b5a35]"> — Região Centro</span></p>
          </div>
          <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-[#f05b13] transition-transform group-hover/promo:translate-x-0.5 sm:ml-1" />
        </a>

        <div className="min-w-0 flex-1 overflow-hidden py-2 sm:py-3">
          <div className="material-marquee-track flex w-max" style={{ animation: 'material-marquee 52s linear infinite', animationPlayState: 'running' }}>
            {[0, 1, 2].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-2 pr-2 sm:gap-3 sm:pr-3" aria-hidden={copy > 0 ? 'true' : undefined}>
                {MATERIALS.map((material) => <MaterialIcon key={`${copy}-${material.id}`} material={material} duplicate={copy > 0} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
