// client component

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLocation } from 'wouter'
import {
  BUSINESS_NAME,
  PHONE_NUMBER,
  getSiteVariantContent,
  getSiteVariantFromPath,
  getWhatsAppUrl,
  type SiteVariant,
} from '@/content/site'

const WA_HOME = `https://wa.me/351910093635?text=${encodeURIComponent('Olá CarpiMater! Gostava de pedir um orçamento.')}`
const WA_EMPREITEIROS = `https://wa.me/351919528638?text=${encodeURIComponent('Olá CarpiMater! Tenho interesse numa proposta de carpintaria para obra. Podemos conversar?')}`

// 3 service pills — Vinílico + Flutuante merged into "Pavimentos"
const ALL_SERVICE_PILLS: Array<{ label: string; href: string; key: string; preview: string }> = [
  { label: 'Cozinhas', href: '/cozinha', key: 'cozinha', preview: '/images/card-cozinhas.png' },
  { label: 'Pavimentos', href: '/pavimentos', key: 'pavimentos', preview: '/images/card-pavimentos.png' },
  { label: 'Construção & Obra', href: '/empreiteiros', key: 'empreiteiros', preview: '/images/card-obras.png' },
]

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false)
  const [hoveredPill, setHoveredPill] = useState<string | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const serviceDropdownRef = useRef<HTMLDivElement | null>(null)
  const [pathname] = useLocation()

  const isHomePage = pathname === '/'
  const isSobreNos = pathname === '/sobre-nos'
  const isEmpreiteiros = pathname.startsWith('/empreiteiros')
  const isPavimentosLanding = pathname === '/pavimentos'
  const isPavimentos =
    pathname.startsWith('/vinilico') ||
    pathname.startsWith('/flutuante') ||
    isPavimentosLanding
  const activeVariant: SiteVariant | null =
    isHomePage || isEmpreiteiros || isPavimentosLanding || isSobreNos
      ? null
      : getSiteVariantFromPath(pathname)
  const isKitchen = activeVariant === 'cozinha'
  const activeContent = activeVariant ? getSiteVariantContent(activeVariant) : null
  const basePath = isHomePage
    ? '/'
    : isEmpreiteiros
    ? '/empreiteiros'
    : isPavimentosLanding
    ? '/pavimentos'
    : isSobreNos
    ? '/sobre-nos'
    : `/${activeVariant}`
  const budgetSectionId = isKitchen ? 'final-cta' : 'simulador'

  // Which pill is active
  const activePillKey = isEmpreiteiros
    ? 'empreiteiros'
    : isPavimentos
    ? 'pavimentos'
    : !isHomePage && activeVariant
    ? (activeVariant as string) // 'cozinha'
    : null

  // Mobile chip label
  const activeChipLabel = isPavimentosLanding
    ? 'Pavimentos'
    : isPavimentos
    ? pathname.startsWith('/flutuante')
      ? 'Flutuante'
      : 'Vinílico'
    : activePillKey === 'empreiteiros'
    ? 'Construção & Obra'
    : activeContent?.subtitle ?? 'Serviços'

  const navLinks = isHomePage
    ? [
        { label: 'Início', sectionId: 'home-hero' },
        { label: 'Serviços', sectionId: 'home-servicos' },
        { label: 'Sobre Nós', sectionId: 'sobre-nos' },
      ]
    : isEmpreiteiros
    ? [
        { label: 'Serviços', sectionId: 'servicos' },
        { label: 'Projectos', sectionId: 'projectos' },
        { label: 'Sobre Nós', sectionId: 'sobre-nos' },
      ]
    : isPavimentosLanding
    ? [
        { label: 'Vinílico SPC', sectionId: '_vinilico' },
        { label: 'Flutuante', sectionId: '_flutuante' },
        { label: 'Sobre Nós', sectionId: 'sobre-nos' },
      ]
    : isSobreNos
    ? [
        { label: 'Início', sectionId: 'home-hero' },
        { label: 'Serviços', sectionId: 'home-servicos' },
      ]
    : [
        { label: 'Catálogo', sectionId: 'catalogo' },
        { label: 'FAQ', sectionId: 'faq' },
        { label: 'Sobre Nós', sectionId: 'sobre-nos' },
      ]

  const switchPills = ALL_SERVICE_PILLS.filter((p) => p.key !== activePillKey)

  const getSectionHref = (sectionId: string) => {
    if (sectionId === 'sobre-nos' || sectionId === 'sobre-nos-home') return '/sobre-nos'
    if (sectionId === '_vinilico') return '/vinilico'
    if (sectionId === '_flutuante') return '/flutuante'
    if (sectionId.startsWith('home-')) return `/#${sectionId}`
    return basePath === '/' ? `/#${sectionId}` : `${basePath}#${sectionId}`
  }

  const handleSectionClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // Don't handle "Sobre Nós" page links
    if (sectionId === 'sobre-nos' || sectionId === 'sobre-nos-home') return
    // Don't handle special pavimento links
    if (sectionId === '_vinilico' || sectionId === '_flutuante') return
    
    // Only prevent default if we're on the same page
    if (pathname === basePath && !sectionId.startsWith('home-')) {
      event.preventDefault()
      scrollToSection(sectionId)
    }
    // Handle home-* sections on homepage
    if (pathname === '/' && sectionId.startsWith('home-')) {
      event.preventDefault()
      scrollToSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (window.location.hash === '#sobre-nos') {
      setTimeout(() => scrollToSection('sobre-nos'), 100)
    }
  }, [pathname])

  useEffect(() => {
    const handleScrollClose = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScrollClose)
    return () => window.removeEventListener('scroll', handleScrollClose)
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
      if (
        isServiceDropdownOpen &&
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(e.target as Node)
      ) {
        setIsServiceDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen, isServiceDropdownOpen])

  const pillCls = (isActive: boolean) =>
    `flex items-center gap-1.5 rounded-xl px-3 py-1.5 border text-sm font-semibold transition-all ${
      isActive
        ? isScrolled
          ? 'border-primary bg-primary/12 text-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.18)]'
          : 'border-primary bg-primary/18 text-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.22)]'
        : isScrolled
        ? 'border-border/50 bg-transparent text-foreground/60 hover:text-foreground hover:bg-muted/60'
        : 'border-white/18 bg-white/5 text-white/55 hover:text-white hover:bg-white/10'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-secondary/95 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* ── Left: Logo + Pills ── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Logo → Home */}
            <a
              href="/"
              className={`flex items-center gap-3 rounded-xl px-2.5 py-1.5 border transition-colors ${
                isScrolled ? 'border-primary/40 bg-primary/10' : 'border-primary/45 bg-primary/16'
              }`}
            >
              <img
                src="/images/logo-carpimater.png"
                alt="Logotipo CarpiMater"
                className="w-10 h-10 rounded-lg object-cover bg-white"
              />
              <span className={`font-display font-bold text-lg ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                {BUSINESS_NAME}
              </span>
            </a>

            {/* Desktop pills — non-home pages */}
            {!isHomePage && (
              <>
                <div className="hidden lg:flex items-center gap-1.5">
                  {ALL_SERVICE_PILLS.map((pill) => {
                    const isActive = pill.key === activePillKey
                    return (
                      <div
                        key={pill.key}
                        className="relative"
                        onMouseEnter={() => setHoveredPill(pill.key)}
                        onMouseLeave={() => setHoveredPill(null)}
                      >
                        <a href={pill.href} className={pillCls(isActive)}>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                          {pill.label}
                        </a>
                        <AnimatePresence>
                          {hoveredPill === pill.key && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.97 }}
                              transition={{ duration: 0.18 }}
                              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-50 pointer-events-none"
                            >
                              <img src={pill.preview} alt={pill.label} className="w-full h-32 object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <p className="absolute bottom-2 left-3 text-xs font-bold text-white">{pill.label}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>

                {/* Mobile chip + dropdown */}
                <div ref={serviceDropdownRef} className="relative lg:hidden">
                  <button
                    type="button"
                    onClick={() => setIsServiceDropdownOpen((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 border transition-colors ${
                      isScrolled
                        ? 'border-border/60 bg-muted/50 hover:bg-muted'
                        : 'border-white/24 bg-white/8 hover:bg-white/14'
                    }`}
                  >
                    <span className={`text-xs font-semibold ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                      {activeChipLabel}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isServiceDropdownOpen ? 'rotate-180' : ''
                      } ${isScrolled ? 'text-foreground/60' : 'text-white/70'}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isServiceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 min-w-[200px] rounded-2xl border border-border bg-card shadow-xl overflow-hidden z-50"
                      >
                        <div className="p-1.5">
                          <p className="px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">
                            Outros serviços
                          </p>
                          {switchPills.map((pill) => (
                            <a
                              key={pill.key}
                              href={pill.href}
                              onClick={() => setIsServiceDropdownOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shrink-0" />
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {pill.label}
                              </span>
                            </a>
                          ))}
                          {/* On pavimentos pages, also show the other pavimento type */}
                          {isPavimentos && (
                            <a
                              href={pathname.startsWith('/flutuante') ? '/vinilico' : '/flutuante'}
                              onClick={() => setIsServiceDropdownOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group border-t border-border mt-1 pt-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shrink-0" />
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {pathname.startsWith('/flutuante') ? 'Pavimento Vinílico SPC' : 'Pavimento Flutuante'}
                              </span>
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* Desktop pills on Home (none active) */}
            {isHomePage && (
              <div className="hidden lg:flex items-center gap-1.5">
                {ALL_SERVICE_PILLS.map((pill) => (
                  <div
                    key={pill.key}
                    className="relative"
                    onMouseEnter={() => setHoveredPill(pill.key)}
                    onMouseLeave={() => setHoveredPill(null)}
                  >
                    <a href={pill.href} className={pillCls(false)}>
                      {pill.label}
                    </a>
                    <AnimatePresence>
                      {hoveredPill === pill.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-50 pointer-events-none"
                        >
                          <img src={pill.preview} alt={pill.label} className="w-full h-32 object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <p className="absolute bottom-2 left-3 text-xs font-bold text-white">{pill.label}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Phone + Nav + CTA + Mobile Btn ── */}
          <div className="flex items-center gap-3">

            {/* WhatsApp icon */}
            <button
              onClick={() => {
                window.open(`/whatsapp-redirect.html?url=${encodeURIComponent(WA_HOME)}`, '_blank')
              }}
              aria-label="WhatsApp"
              className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-full transition-colors cursor-pointer ${isScrolled ? 'text-foreground/60 hover:text-[#25D366]' : 'text-white/70 hover:text-[#25D366]'}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                // For "Sobre Nós", always use link to navigate to /sobre-nos
                if (link.sectionId === 'sobre-nos' || link.sectionId === 'sobre-nos-home') {
                  return (
                    <a
                      key={link.sectionId}
                      href="/sobre-nos"
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isScrolled ? 'text-foreground' : 'text-white/90'
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                }
                // For internal sections on same page, use button with scroll
                if (pathname === basePath) {
                  return (
                    <button
                      key={link.sectionId}
                      onClick={() => scrollToSection(link.sectionId)}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isScrolled ? 'text-foreground' : 'text-white/90'
                      }`}
                    >
                      {link.label}
                    </button>
                  )
                }
                // For external page navigation
                return (
                  <a
                    key={link.sectionId}
                    href={getSectionHref(link.sectionId)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isScrolled ? 'text-foreground' : 'text-white/90'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}

              {/* CTA */}
              {isHomePage ? (
                <a
                  href="/#home-contacto"
                  onClick={(e) => { e.preventDefault(); scrollToSection('home-contacto') }}
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Pedir Orçamento
                </a>
              ) : isEmpreiteiros ? (
                <a
                  href={WA_EMPREITEIROS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Pedir Orçamento
                </a>
              ) : isKitchen ? (
                <a
                  href={getWhatsAppUrl(undefined, activeVariant ?? 'cozinha')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Pedir Orçamento
                </a>
              ) : (
                <button
                  onClick={() => {
                    if (window.location.pathname === basePath) {
                      scrollToSection(budgetSectionId)
                      return
                    }
                    window.location.href = getSectionHref(budgetSectionId)
                  }}
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Pedir Orçamento
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => {
                  // For "Sobre Nós", always use link to navigate to /sobre-nos
                  if (link.sectionId === 'sobre-nos' || link.sectionId === 'sobre-nos-home') {
                    return (
                      <a
                        key={link.sectionId}
                        href="/sobre-nos"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isScrolled
                            ? 'text-foreground hover:bg-muted'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        {link.label}
                      </a>
                    )
                  }
                  // For internal sections on same page, use button with scroll
                  if (pathname === basePath) {
                    return (
                      <button
                        key={link.sectionId}
                        onClick={() => {
                          scrollToSection(link.sectionId)
                          setTimeout(() => setIsMobileMenuOpen(false), 50)
                        }}
                        className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isScrolled
                            ? 'text-foreground hover:bg-muted'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        {link.label}
                      </button>
                    )
                  }
                  // For external page navigation
                  return (
                    <a
                      key={link.sectionId}
                      href={getSectionHref(link.sectionId)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isScrolled
                          ? 'text-foreground hover:bg-muted'
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                })}

                <div className="pt-2 px-4">
                  {/* CTA */}
                  {isHomePage ? (
                    <a
                      href="/#home-contacto"
                      onClick={(e) => { e.preventDefault(); scrollToSection('home-contacto'); setIsMobileMenuOpen(false) }}
                      className="block w-full text-center bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Pedir Orçamento
                    </a>
                  ) : isEmpreiteiros ? (
                    <a
                      href={WA_EMPREITEIROS}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Pedir Orçamento
                    </a>
                  ) : isKitchen ? (
                    <a
                      href={getWhatsAppUrl(undefined, activeVariant ?? 'cozinha')}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Pedir Orçamento
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        if (window.location.pathname === basePath) scrollToSection(budgetSectionId)
                        else window.location.href = getSectionHref(budgetSectionId)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Pedir Orçamento
                    </button>
                  )}

                  {/* Switch links */}
                  <div className="mt-3 space-y-1.5">
                    {switchPills.map((pill) => (
                      <a
                        key={pill.key}
                        href={pill.href}
                        className={`block w-full text-center py-1 text-sm font-semibold underline underline-offset-4 decoration-2 transition-colors ${
                          isScrolled
                            ? 'text-foreground hover:text-primary'
                            : 'text-white hover:text-primary'
                        }`}
                      >
                        {pill.label}
                      </a>
                    ))}
                    {/* On pavimentos pages, show the other type */}
                    {isPavimentos && (
                      <a
                        href={pathname.startsWith('/flutuante') ? '/vinilico' : '/flutuante'}
                        className={`block w-full text-center py-1 text-sm font-semibold underline underline-offset-4 decoration-2 transition-colors ${
                          isScrolled
                            ? 'text-foreground hover:text-primary'
                            : 'text-white hover:text-primary'
                        }`}
                      >
                        {pathname.startsWith('/flutuante') ? 'Vinílico SPC' : 'Flutuante Tradicional'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
