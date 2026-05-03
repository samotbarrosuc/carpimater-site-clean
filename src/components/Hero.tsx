// client component

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'wouter'
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { getSiteVariantContent, getSiteVariantFromPath, getWhatsAppUrl } from '@/content/site'
import { getGalleryItemsByVariant } from '@/content/galeria'
import { CompareSlider, pairs as beforeAfterPairs } from '@/components/cozinha/sections/BeforeAfter'

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default function Hero() {
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const isKitchen = siteVariant === 'cozinha'
  const siteContent = getSiteVariantContent(siteVariant)
  const galleryItems = getGalleryItemsByVariant(siteVariant)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const totalProjects = galleryItems.length

  const kitchenHeroImage = '/images/cozinha-1.png'
  const kitchenHeroImageSecondary = '/images/cozinha-4.png'

  const HERO_KPIS = isKitchen
    ? [
        { value: 'Paços de Ferreira', label: 'Fabrico' },
        { value: '8 a 10 semanas', label: 'Prazo de execução' },
        { value: '60% do valor total', label: 'Adjudicação' },
      ]
    : [
        { value: '24h', label: 'Tempo de resposta' },
        { value: siteContent.supplierWarrantyLabel, label: 'Garantia do fabricante' },
        { value: '5,0 ★', label: 'Avaliação no Google' },
      ]

  const goToPreviousProject = () => {
    setCurrentProjectIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1))
  }

  const goToNextProject = () => {
    setCurrentProjectIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (totalProjects <= 1) return

    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [totalProjects])

  return (
    <section
      id="hero"
      className={`relative min-h-[88vh] sm:min-h-screen bg-secondary flex items-center overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-20 ${
        isKitchen ? 'bg-[#1f2427]' : ''
      }`}
    >
      {isKitchen && (
        <img
          src={kitchenHeroImage}
          alt="Cozinha CarpiMater"
          className="absolute inset-0 w-full h-full object-cover block sm:hidden opacity-30"
        />
      )}
      {!isKitchen && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
            style={{ backgroundImage: 'url("/images/ChatGPT Image 31_03_2026, 18_59_26.png")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.97] via-secondary/80 to-secondary/32 sm:bg-gradient-to-r sm:from-secondary/[0.95] sm:via-secondary/72 sm:to-secondary/16" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(201,136,13,0.22),transparent_42%)]" />
          <div className="absolute inset-y-0 left-0 w-[54%] bg-gradient-to-r from-black/28 via-transparent to-transparent pointer-events-none" />
        </>
      )}
      {isKitchen && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1f2427_0%,#2a3034_35%,#15191c_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(236,156,72,0.22),transparent_38%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_76%,rgba(96,126,142,0.24),transparent_36%)]" />
        </>
      )}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-[1520px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.96fr)_minmax(540px,1.04fr)] gap-10 xl:gap-14 items-start lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-[900px] mx-auto lg:mx-0 lg:pr-5 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {isKitchen ? (
              /* ── COZINHA HERO HEADLINE ── */
              (<div className="mb-6">
                <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] xl:text-[3.5rem] font-display font-bold leading-[1.08] tracking-[-0.015em]">
                  <span className="block text-white"></span>
                  <span className="block text-primary">Cozinhas à medida</span>
                  <span className="block text-white">ao preço de Ikea.</span>
                </h1>
                <p className="text-white/65 text-sm sm:text-base max-w-xl leading-relaxed mt-4 mb-6">
                  Fabrico em Paços de Ferreira e montagem profissional incluída.<br />Qualidade superior à das grandes superfícies, a preços semelhantes.
                </p>
                <div className="w-full max-w-xl mx-auto mb-8 rounded-[1.75rem] overflow-hidden border border-white/10 bg-white/5 shadow-sm">
                  <CompareSlider before={beforeAfterPairs[0].before} after={beforeAfterPairs[0].after} aspectRatio="16/9" />
                </div>
                <p className="text-center text-xs text-white/60 mt-2">
                  Arraste o divisor para ver o antes e depois.
                </p>
              </div>)
            ) : (
              <h1 className="w-full max-w-[13ch] sm:max-w-[14ch] lg:max-w-none text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] xl:text-[3.5rem] 2xl:text-[4rem] font-display font-bold leading-[1.08] tracking-[-0.015em] mb-5">
                <span className="block text-white">{siteContent.heroTitle}</span>
                <span className="block text-primary text-[0.62em] sm:text-[0.56em] font-semibold tracking-[0.01em] mt-2">
                  {siteContent.heroServiceLine}
                </span>
              </h1>
            )}

            {!isKitchen && (
            <div className="w-full max-w-[760px]">
              <div className="text-sm sm:text-lg md:text-[1.3rem] text-white/90 leading-relaxed mb-3 text-left space-y-1">
                <p className="flex items-start gap-2">
                  <span className="shrink-0">①</span>
                  <span>{siteContent.heroStepOneText}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="shrink-0">②</span>
                  <span>Receba o orçamento em segundos.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="shrink-0">③</span>
                  <span>Avance com uma das nossas equipas especializadas.</span>
                </p>
              </div>
            </div>
            )}

            {isKitchen && (
              /* ── 3 CHECKMARKS antes do botão ── */
              (<div className="flex flex-col gap-2.5 mb-6">
                {[
                  { full: 'Orçamento gratuito. Resposta rápida.', short: 'Orçamento gratuito. Resposta rápida.' },
                  { full: 'Projecto detalhado e aprovado por si', short: 'Projecto aprovado por si' },
                  { full: 'Montagem profissional incluída', short: 'Montagem incluída' },
                ].map((item) => (
                  <div key={item.full} className="flex items-center gap-2.5 text-white/80">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm"><span className="sm:hidden">{item.short}</span><span className="hidden sm:inline">{item.full}</span></span>
                  </div>
                ))}
              </div>)
            )}

            <div className="w-full max-w-3xl mb-8">
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start lg:flex-nowrap">
                {isKitchen ? (
                  <a
                    href={getWhatsAppUrl(undefined, siteVariant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-3.5 rounded-full text-[0.95rem] font-bold whitespace-nowrap transition-all bg-primary text-white hover:bg-primary/90 shadow-[0_8px_30px_rgba(201,136,13,0.45)]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    Pedir Orçamento Gratuito
                  </a>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => { scrollToSection('catalogo') }}
                      className="w-full sm:w-auto inline-flex items-center justify-center min-h-[56px] px-7 lg:px-6 py-3 rounded-full text-[0.95rem] font-semibold whitespace-nowrap transition-all border border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                      Ver catálogo
                    </button>

                    <button
                      type="button"
                      onClick={() => { scrollToSection('simulador') }}
                      className="w-full sm:w-auto inline-flex items-center justify-center min-h-[56px] px-7 lg:px-6 py-3 rounded-full text-[0.95rem] font-semibold whitespace-nowrap transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_12px_30px_rgba(201,136,13,0.28)]"
                    >
                      Simular orçamento
                    </button>
                  </>
                )}
              </div>
            </div>

            {!isKitchen && (
              <p className="text-sm sm:text-base md:text-[1.05rem] text-white/62 leading-relaxed mb-8 max-w-[760px]">
                Tratamos de tudo por si. Sem complicações, sem surpresas.
              </p>
            )}
            {isKitchen && (
              <p className="text-xs sm:text-sm text-white/40 max-w-[760px] mt-2">
                Orçamento sem compromisso · Sem custos ocultos · Fabrico em Paços de Ferreira
              </p>
            )}
          </motion.div>

          {isKitchen && (
            <div className="lg:hidden grid grid-cols-1 gap-3 mt-8">
              <div className="relative w-full max-w-[400px] mx-auto overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.25)] h-[200px]">
                <img
                  src={kitchenHeroImage}
                  alt="Cozinha CarpiMater"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
              </div>
              <div className="relative w-full max-w-[400px] mx-auto overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.15)] h-[200px]">
                <img
                  src={kitchenHeroImageSecondary}
                  alt="Cozinha CarpiMater"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
              </div>
            </div>
          )}

          {isKitchen && (
            <div className="hidden lg:grid grid-cols-1 gap-4">
              <div className="relative w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_45px_110px_rgba(0,0,0,0.35)] h-[280px]">
                <img
                  src={kitchenHeroImage}
                  alt="Cozinha CarpiMater"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
              </div>
              <div className="relative w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_45px_110px_rgba(0,0,0,0.2)] h-[280px]">
                <img
                  src={kitchenHeroImageSecondary}
                  alt="Cozinha CarpiMater"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
              </div>
            </div>
          )}
          {!isKitchen && (
            <motion.aside
              initial={{ opacity: 0, x: 20, y: 18 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="relative w-full max-w-full mx-auto lg:mx-0 lg:justify-self-end lg:pt-2"
            >
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
                {HERO_KPIS.map((kpi) => (
                  <div key={kpi.label} className="rounded-xl border border-white/12 bg-white/[0.08] px-4 py-3.5 text-center">
                    <>
                      <p className="text-[1.35rem] sm:text-[1.55rem] font-bold text-white leading-none">{kpi.value}</p>
                      <p className="text-xs sm:text-sm text-white/72 mt-1.5">{kpi.label}</p>
                    </>
                  </div>
                ))}
              </div>

              <div className="rounded-[30px] border border-white/14 bg-white/[0.09] backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 h-56 sm:h-64 lg:h-[22rem]">
                  <img
                    src={galleryItems[currentProjectIndex]?.image}
                    alt={`${siteContent.projectAltPrefix} ${galleryItems[currentProjectIndex]?.description}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <p className="absolute left-4 bottom-3 text-sm text-white/90 font-medium">
                    {galleryItems[currentProjectIndex]?.description}
                  </p>

                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <button
                      type="button"
                      onClick={goToPreviousProject}
                      className="w-9 h-9 rounded-full border border-white/30 bg-black/35 text-white hover:bg-black/55 flex items-center justify-center transition-colors"
                      aria-label="Projeto anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <button
                      type="button"
                      onClick={goToNextProject}
                      className="w-9 h-9 rounded-full border border-white/30 bg-black/35 text-white hover:bg-black/55 flex items-center justify-center transition-colors"
                      aria-label="Projeto seguinte"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-center gap-2">
                  {galleryItems.map((item, index) => (
                    <button
                      key={`${item.image}-${index}`}
                      type="button"
                      onClick={() => setCurrentProjectIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        currentProjectIndex === index
                          ? 'w-6 bg-primary'
                          : 'w-2 bg-white/45 hover:bg-white/70'
                      }`}
                      aria-label={`Ir para projeto ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </div>
      </div>
      {/*
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 text-center"
      >
        <button
          type="button"
          onClick={() => { window.location.href = '/catalogo' }}
          className="flex flex-col items-center gap-2 text-white/58 hover:text-white/82 transition-colors"
        >
          <span className="text-xs tracking-wide">Ver vinílicos</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </button>
      </motion.div>
      */}
    </section>
  );
}