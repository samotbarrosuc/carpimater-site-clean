import { ShieldCheck, Clock3, MapPin, CheckCircle } from 'lucide-react'

export default function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, text: 'Instalação profissional' },
    { icon: CheckCircle, text: 'Materiais certificados' },
    { icon: Clock3, text: 'Orçamento rápido' },
    { icon: MapPin, text: 'Atuamos em Coimbra, Aveiro e Leiria' },
  ]

  return (
    <section className="py-12 bg-background border-b border-border/70">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-foreground">
              <badge.icon className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}