// client component

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useLocation } from 'wouter'
import { getSiteVariantFromPath } from '@/content/site'

import { TESTEMUNHOS } from '@/content/testemunhos'

export default function Testimonials() {
  const [pathname] = useLocation()
  const isKitchen = getSiteVariantFromPath(pathname) === 'cozinha'
  const testimonials = isKitchen
    ? TESTEMUNHOS.map((testimonial) => ({
        ...testimonial,
        quote: testimonial.quote
          .replace('Desde a simulação no site até à obra concluída foi uma semana.', 'Desde o briefing inicial até à montagem final correu tudo de forma clara e organizada.')
          .replace('Escolhi a cor online, deram-me o orçamento em horas e em dois dias estava tudo feito na minha sala e corredor.', 'A equipa ajudou no desenho da cozinha e apresentou uma proposta clara com acompanhamento próximo em todas as decisões.')
          .replace('Preço muito competitivo e o acabamento com os perfis à cor do chão ficou perfeito. Transformou completamente o meu apartamento sem partir nada.', 'Preço competitivo, excelente acabamento e muita atenção aos detalhes da casa e às nossas preferências.'),
      }))
    : TESTEMUNHOS

  return (
    <section className="py-14 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
            Clientes
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
            O que dizem os clientes
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {isKitchen
              ? 'Projetos de cozinha entregues com foco em funcionalidade e detalhe.'
              : 'Centenas de obras executadas no distrito de Coimbra.'}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span className="font-semibold text-foreground">5,0</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-muted-foreground">no Google</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-8 rounded-3xl shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-foreground/80 italic mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                {testimonial.source && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="text-[10px] text-muted-foreground/70">via {testimonial.source}{testimonial.date ? ` · ${testimonial.date}` : ''}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
