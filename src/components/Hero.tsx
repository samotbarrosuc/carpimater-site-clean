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
        { value: 'Loja online', label: 'Preços publicados' },
        { value: siteContent.supplierWarrantyLabel, label: 'Garantia do fabricante' },
        { value: 'Região Centro', label: 'Entrega e aplicação' },
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
      className={`relative flex items-center overflow-hidden ${
        isKitchen
          ? 'min-h-0 bg-[#f8f5ef] pb-16 pt-28 sm:pb-20 sm:pt-32'
          : 'min-h-[88vh] bg-secondary pb-12 pt-28 sm:min-h-screen sm:pb-20 sm:pt-32 lg:pb-20 lg:pt-32'
      }`}
    >
      {!isKitchen && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
            style={{ backgroundImage: 'url("/images/pavimento-vinilico-sala-coimbra.png")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.97] via-secondary/80 to-secondary/32 sm:bg-gradient-to-r sm:from-secondary/[0.95] sm:via-secondary/72 sm:to-secondary/16" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(240,91,19,0.22),transparent_42%)]" />
          <div className="absolute inset-y-0 left-0 w-[54%] bg-gradient-to-r from-black/28 via-transparent to-transparent pointer-events-none" />
        </>
      )}
      {isKitchen && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8f5ef_0%,#f3eee6_55%,#fff_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(240,91,19,0.10),transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_78%,rgba(25,36,46,0.07),transparent_34%)]" />
        </>
      )}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className={`mx-auto grid grid-cols-1 items-start gap-10 lg:items-center xl:gap-14 ${isKitchen ? 'max-w-7xl lg:grid-cols-[minmax(0,0.9fr)_minmax(500px,1.1fr)]' : 'max-w-[1520px] lg:grid-cols-[minmax(0,0.96fr)_minmax(540px,1.04fr)]'}`}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className={`mx-auto flex max-w-[900px] flex-col lg:mx-0 lg:pr-5 ${isKitchen ? 'items-start text-left' : 'items-center text-center lg:items-start lg:text-left'}`}
          >
            {isKitchen ? (
              /* ── COZINHA HERO HEADLINE ── */
              (<div className="mb-6">
                <h1 className="font-display text-[2.65rem] font-bold leading-[0.98] tracking-[-0.04em] sm:text-[3.25rem] lg:text-[3.65rem]">
                  <span className="block text-primary">Cozinhas por medida</span>
                  <span className="block text-[#19242e]">em Coimbra.</span>
                </h1>
                <p className="mb-6 mt-5 max-w-xl text-sm leading-7 text-[#40505b] sm:text-base">
                  Levantamento, proposta, fabrico e montagem adaptados ao espaço.
                </p>
                <div className="mx-auto mb-5 w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-[#d8d0c4] bg-[#19242e] p-2 shadow-[0_20px_55px_rgba(25,36,46,0.13)]">
                  <CompareSlider before={beforeAfterPairs[0].before} after={beforeAfterPairs[0].after} aspectRatio="16/9" />
                </div>
                <p className="mt-2 text-left text-xs text-[#40505b]/65">
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
                <p>{siteContent.heroStepOneText}</p>
              </div>
            </div>
            )}

            {isKitchen && (
              /* ── 3 CHECKMARKS antes do botão ── */
              (<div className="flex flex-col gap-2.5 mb-6">
                {[
                  { full: 'Levantamento de medidas e proposta', short: 'Medidas e proposta' },
                  { full: 'Projeto adaptado ao espaço', short: 'Projeto por medida' },
                  { full: 'Fabrico e montagem em obra', short: 'Fabrico e montagem' },
                ].map((item) => (
                  <div key={item.full} className="flex items-center gap-2.5 text-[#40505b]">
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
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-primary px-7 text-[0.9rem] font-bold text-white shadow-[0_8px_24px_rgba(240,91,19,0.24)] transition hover:bg-primary/90 sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    Pedir orçamento
                  </a>
                ) : (
                  <a
                    href={`/loja?categoria=${siteVariant}`}
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-7 text-[0.9rem] font-bold text-primary-foreground shadow-[0_8px_24px_rgba(240,91,19,0.22)] transition hover:bg-primary/90 sm:w-auto"
                  >
                    Ver {siteVariant === 'vinilico' ? 'vinílicos' : 'flutuantes híbridos'} na loja
                    <ChevronRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {!isKitchen && (
              <p className="text-sm sm:text-base md:text-[1.05rem] text-white/62 leading-relaxed mb-8 max-w-[760px]">
                Se precisar de aplicação, pode pedi-la juntamente com o material.
              </p>
            )}
            {isKitchen && (
              <p className="mt-2 max-w-[760px] text-xs text-[#40505b]/60 sm:text-sm">
                Região Centro · Outras zonas sujeitas a confirmação de disponibilidade
              </p>
            )}
          </motion.div>

          {isKitchen && (
            <div className="mt-2 grid grid-cols-2 gap-3 lg:hidden">
              <div className="relative mx-auto h-[150px] w-full overflow-hidden rounded-[1.25rem] border border-[#d8d0c4] shadow-[0_18px_45px_rgba(25,36,46,0.11)] sm:h-[210px]">
                <img
                  src={kitchenHeroImage}
                  alt="Cozinha branca por medida com ilha e armários altos"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
              </div>
              <div className="relative mx-auto h-[150px] w-full overflow-hidden rounded-[1.25rem] border border-[#d8d0c4] shadow-[0_18px_45px_rgba(25,36,46,0.09)] sm:h-[210px]">
                <img
                  src={kitchenHeroImageSecondary}
                  alt="Cozinha por medida com acabamento em madeira"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
              </div>
            </div>
          )}

          {isKitchen && (
            <div className="hidden grid-cols-1 gap-4 lg:grid">
              <div className="relative h-[285px] w-full max-w-[560px] overflow-hidden rounded-[1.75rem] border border-[#d8d0c4] shadow-[0_28px_70px_rgba(25,36,46,0.14)]">
                <img
                  src={kitchenHeroImage}
                  alt="Cozinha branca por medida com ilha e armários altos"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
              </div>
              <div className="relative ml-auto h-[235px] w-[84%] max-w-[480px] overflow-hidden rounded-[1.75rem] border border-[#d8d0c4] shadow-[0_22px_55px_rgba(25,36,46,0.11)]">
                <img
                  src={kitchenHeroImageSecondary}
                  alt="Cozinha por medida com acabamento em madeira"
                  decoding="async"
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

              <div className="rounded-2xl border border-white/12 bg-white/[0.07] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-3">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 h-56 sm:h-64 lg:h-[22rem]">
                  <img
                    src={galleryItems[currentProjectIndex]?.image}
                    alt={`${siteContent.projectAltPrefix} ${galleryItems[currentProjectIndex]?.description}`}
                    fetchPriority="high"
                    decoding="async"
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
