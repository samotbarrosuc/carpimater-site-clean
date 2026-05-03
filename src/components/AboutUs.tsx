// client component

import { useLocation } from 'wouter'
import { motion } from 'framer-motion'
import { getSiteVariantContent, getSiteVariantFromPath } from '@/content/site'

export default function AboutUs() {
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const isKitchen = siteVariant === 'cozinha'
  const siteContent = getSiteVariantContent(siteVariant)

  const ABOUT_POINTS = isKitchen
    ? [
        {
          title: 'Cozinhas por medida.',
          description:
            'Cada projeto nasce em conversa com o cliente para adaptar layout, arrumação e acabamentos ao uso real da casa.',
        },
        {
          title: 'Projeto + fabrico coordenados.',
          description:
            'Fazemos o desenho técnico e articulamos diretamente com carpintaria parceira para garantir execução fiel ao projeto.',
        },
        {
          title: 'Qualidade com foco técnico.',
          description:
            'Selecionamos soluções adequadas a cada espaço, incluindo zonas com humidade, para assegurar durabilidade e bom desempenho.',
        },
        {
          title: 'Preço competitivo.',
          description:
            'Propostas equilibradas face ao mercado, com transparência em materiais, mão de obra e fases de produção.',
        },
      ]
    : [
        {
          title: 'Materiais selecionados.',
          description:
            'Trabalhamos apenas com fornecedores estabelecidos no mercado há décadas. Cada material é escolhido por nós com critério — não existe linha económica na CarpiMater.',
        },
        {
          title: 'Preço abaixo da média.',
          description:
            'Sem intermediários desnecessários, os nossos preços são mais competitivos que a média do mercado. O transporte dos materiais é feito por nós e é gratuito. Orçamento claro, sem surpresas no final.',
        },
        {
          title: 'Feito à medida.',
          description:
            'Cada projeto é concebido ao gosto e às necessidades do cliente. Não vendemos soluções de prateleira — e o resultado, em qualidade e acabamento, nota-se à primeira vista.',
        },
        {
          title: 'Palavra cumprida.',
          description:
            'Entregamos em 3 meses após adjudicação — fabrico e entrega incluídos. Não é uma estimativa — é o prazo a que nos comprometemos e que cumprimos obra após obra. Prometemos apenas o que conseguimos fazer.',
        },
      ]

  return (
    <section id="sobre-nos" className="pt-32 pb-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute -top-24 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mb-10 text-left">
            <p className="text-2xl sm:text-3xl font-display font-bold text-primary mb-4">
              Sobre Nós
            </p>
            <div className="text-white/76 leading-relaxed space-y-3 mb-4">
              {isKitchen ? (
                <>
                  <p>
                    Desenvolvemos cozinhas por medida com produção em Paços de Ferreira.
                  </p>
                  <p>
                    O processo começa no briefing com o cliente, passa por desenho técnico feito por nós e segue para fabrico em carpintaria parceira, com acompanhamento até à montagem final.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Somos uma empresa sediada em Coimbra.
                  </p>
                  <p>
                    Iniciámos atividade na região da Bairrada e, com o crescimento sustentado do nosso trabalho, expandimos para os três distritos onde actuamos actualmente: Coimbra, Leiria e Aveiro.
                  </p>
                </>
              )}
            </div>
          {isKitchen && (
            <>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white mb-3">
                Porque escolher a CarpiMater
              </h2>
              <p className="text-white/70 font-bold mb-10">
                Serviço personalizado com execução técnica rigorosa.
              </p>
            </>
          )}
          </div>

          {isKitchen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ABOUT_POINTS.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/12 bg-white/[0.06] p-6"
                >
                  <p className="text-white font-bold text-xl leading-snug">{item.title}</p>
                  <p className="text-white/78 text-sm sm:text-base mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
