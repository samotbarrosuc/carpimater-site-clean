import { Factory, Truck, Clock3, BadgeCheck } from 'lucide-react'

export default function TrustBadges() {
  const badges = [
    { icon: Factory, text: 'Preços publicados na loja' },
    { icon: Truck, text: 'Portes grátis · Região Centro' },
    { icon: Clock3, text: 'Prazo indicado após confirmação de stock' },
    { icon: BadgeCheck, text: 'IVA incluído no preço' },
  ]

  return (
    <section className="border-y border-[#e1dbd2] bg-white py-5 sm:py-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-4 md:gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f7f3ea]"><badge.icon className="h-4 w-4 text-primary" /></span>
              <span className="text-[0.68rem] font-semibold leading-4 text-[#40505b] sm:text-xs">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
