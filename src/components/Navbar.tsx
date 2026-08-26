import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { useLocation } from 'wouter'
import { BUSINESS_NAME, getWhatsAppUrl } from '@/content/site'

interface ServiceLink {
  label: string
  description: string
  href: string
}

interface ServiceGroup extends ServiceLink {
  children?: ServiceLink[]
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    label: 'Pavimentos',
    description: 'Materiais, entrega e aplicação',
    href: '/loja',
    children: [
      { label: 'Pavimento vinílico', description: 'Modelos, preços e aplicação', href: '/vinilico' },
      { label: 'Flutuante híbrido', description: 'Modelos, preços e aplicação', href: '/flutuante' },
      { label: 'Rodapés', description: 'PVC e madeira', href: '/instalacao-rodapes-coimbra' },
    ],
  },
  {
    label: 'Cozinhas por medida',
    description: 'Projeto, fabrico e montagem',
    href: '/cozinha',
    children: [
      { label: 'Montagem de cozinhas', description: 'Serviço adicional em Coimbra e Região Centro', href: '/montagem-cozinhas-coimbra' },
    ],
  },
  {
    label: 'Roupeiros por medida',
    description: 'Fabrico e montagem',
    href: '/roupeiros-por-medida-coimbra',
  },
  {
    label: 'Obras e Reabilitação',
    description: 'Portas, móveis, escadas, etc...',
    href: '/construcao',
  },
]

const MAIN_LINKS = [
  { label: 'Contactos', href: '/contactos' },
]

export default function Navbar() {
  const [pathname, setLocation] = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement | null>(null)

  const isStore = pathname.startsWith('/loja')
  const isCheckout = pathname.startsWith('/encomenda')
  const isKitchen = pathname.startsWith('/cozinha')
  const isConstruction = pathname.startsWith('/construcao')

  useEffect(() => {
    setIsMobileOpen(false)
    setIsServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setIsServicesOpen(false)
    }
    document.addEventListener('mousedown', closeDropdown)
    return () => document.removeEventListener('mousedown', closeDropdown)
  }, [])

  useEffect(() => {
    const previous = document.body.style.overflow
    if (isMobileOpen) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isMobileOpen])

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/') || href.startsWith('/whatsapp-redirect')) return
    event.preventDefault()
    setLocation(href)
    setIsMobileOpen(false)
    setIsServicesOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const cta = isStore || isCheckout
    ? { label: isCheckout ? 'Continuar na loja' : 'Ver encomenda', href: isCheckout ? '/loja' : '/encomenda', external: false }
    : isKitchen || isConstruction
      ? { label: 'Pedir orçamento', href: getWhatsAppUrl(undefined, isKitchen ? 'cozinha' : undefined), external: true }
      : { label: 'Pedir orçamento', href: '/contactos', external: false }

  const linkClass = (href: string) => {
    const active = pathname === href || (href !== '/' && pathname.startsWith(href))
    return `relative py-2 text-sm font-semibold transition-colors ${active ? 'text-white' : 'text-white/66 hover:text-white'}`
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#19242e]/96 text-white shadow-[0_8px_30px_rgba(10,20,28,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <a href="/" onClick={(event) => navigate(event, '/')} className="flex shrink-0 items-center gap-2.5" aria-label={`${BUSINESS_NAME} — página inicial`}>
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
              <img src="/images/logo-carpimater-v2.png" alt="" className="h-9 w-9 object-contain" />
            </span>
            <span className="hidden font-display text-xl font-bold tracking-[-0.025em] min-[390px]:inline">
              Carpi<span className="text-[#f08a45]">Mater</span>
            </span>
          </a>
          <span className="h-7 w-px bg-white/15" aria-hidden="true" />
          <a
            href="/loja"
            onClick={(event) => navigate(event, '/loja')}
            aria-label="Abrir a loja CarpiMater"
            className={`flex h-11 min-w-[106px] items-center justify-center gap-2.5 rounded-xl px-4 text-sm font-extrabold uppercase tracking-[0.07em] shadow-[0_7px_20px_rgba(0,0,0,0.14)] transition sm:min-w-[128px] sm:px-6 ${isStore || isCheckout ? 'bg-[#f05b13] text-white' : 'bg-white text-[#19242e] hover:bg-[#f7f3ea] hover:shadow-[0_9px_24px_rgba(0,0,0,0.18)]'}`}
          >
            <ShoppingBag className={`h-4 w-4 ${isStore || isCheckout ? 'text-white' : 'text-[#f05b13]'}`} />
            <span>Loja</span>
          </a>
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              onClick={() => setIsServicesOpen((open) => !open)}
              className="flex items-center gap-1.5 py-2 text-sm font-semibold text-white/66 transition-colors hover:text-white"
              aria-expanded={isServicesOpen}
            >
              Serviços
              <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isServicesOpen && (
              <div className="absolute left-1/2 top-full mt-3 max-h-[calc(100vh-7rem)] w-[410px] -translate-x-1/2 overflow-y-auto rounded-[1.35rem] border border-[#ded8cf] bg-white p-3 text-[#19242e] shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
                
                <div className="space-y-2">
                  {SERVICE_GROUPS.map((group) => (
                    <section key={group.href} className="rounded-2xl border border-[#ebe6de] bg-[#fbfaf7] p-2">
                      <a href={group.href} onClick={(event) => navigate(event, group.href)} className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-white">
                        <span className="block text-[0.93rem] font-extrabold leading-tight text-[#19242e] group-hover:text-[#d94d0d]">{group.label}</span>
                        <span className="mt-1 block text-[0.7rem] leading-4 text-slate-500">{group.description}</span>
                      </a>
                      {group.children && (
                        <div className="mt-1 border-t border-[#e7e1d8] pt-1">
                          {group.children.map((item) => (
                            <a key={item.href} href={item.href} onClick={(event) => navigate(event, item.href)} className="group/child relative block rounded-xl py-2 pl-5 pr-2 transition-colors hover:bg-white">
                              <span className="absolute left-2.5 top-[0.92rem] h-1.5 w-1.5 rounded-full bg-[#d8c7b3] transition-colors group-hover/child:bg-[#f05b13]" aria-hidden="true" />
                              <span className="block text-xs font-bold leading-4 text-[#40505b] group-hover/child:text-[#19242e]">{item.label}</span>
                              <span className="mt-0.5 block text-[0.65rem] leading-4 text-slate-400">{item.description}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            )}
          </div>

          {MAIN_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)} className={linkClass(link.href)}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={cta.href}
            onClick={cta.external ? undefined : (event) => navigate(event, cta.href)}
            target={cta.external ? '_blank' : undefined}
            rel={cta.external ? 'noopener noreferrer' : undefined}
            className="hidden min-h-11 items-center justify-center gap-2 rounded-xl bg-[#f05b13] px-5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(240,91,19,0.22)] transition hover:bg-[#d94d0d] sm:inline-flex"
          >
            {isStore || isCheckout ? <ShoppingBag className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
            {cta.label}
          </a>
          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
            aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-x-0 top-[76px] h-[calc(100dvh-76px)] overflow-y-auto border-t border-white/10 bg-[#19242e] px-4 pb-8 pt-5 lg:hidden">
          <a href="/loja" onClick={(event) => navigate(event, '/loja')} className="mb-5 flex items-center justify-between rounded-2xl bg-white p-4 text-[#19242e] shadow-sm">
            <span><span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary">Loja CarpiMater</span><span className="mt-1 block font-display text-lg font-bold">Pavimentos e rodapés</span></span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ea] text-primary"><ShoppingBag className="h-5 w-5" /></span>
          </a>
          <p className="px-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">Serviços</p>
          <div className="mt-3 space-y-2.5">
            {SERVICE_GROUPS.map((group) => (
              <section key={group.href} className="rounded-2xl border border-white/10 bg-white/[0.035] p-1.5">
                <a href={group.href} onClick={(event) => navigate(event, group.href)} className="block rounded-xl px-3 py-3 hover:bg-white/7">
                  <span className="block text-[0.94rem] font-extrabold leading-tight text-white">{group.label}</span>
                  <span className="mt-1 block text-[0.7rem] leading-4 text-white/45">{group.description}</span>
                </a>
                {group.children && (
                  <div className="mx-2 border-t border-white/10 py-1">
                    {group.children.map((item) => (
                      <a key={item.href} href={item.href} onClick={(event) => navigate(event, item.href)} className="relative block rounded-lg py-2.5 pl-5 pr-2 hover:bg-white/7">
                        <span className="absolute left-2 top-[0.95rem] h-1.5 w-1.5 rounded-full bg-white/25" aria-hidden="true" />
                        <span className="block text-xs font-bold leading-4 text-white/78">{item.label}</span>
                        <span className="mt-0.5 block text-[0.65rem] leading-4 text-white/38">{item.description}</span>
                      </a>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
          <div className="my-4 h-px bg-white/10" />
          {MAIN_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)} className="flex items-center rounded-xl px-3 py-3.5 text-sm font-semibold text-white/80 hover:bg-white/7 hover:text-white">
              {link.label}
            </a>
          ))}
          <a
            href={cta.href}
            onClick={cta.external ? () => setIsMobileOpen(false) : (event) => navigate(event, cta.href)}
            target={cta.external ? '_blank' : undefined}
            rel={cta.external ? 'noopener noreferrer' : undefined}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#f05b13] px-5 text-sm font-bold text-white"
          >
            {isStore || isCheckout ? <ShoppingBag className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
            {cta.label}
          </a>
        </div>
      )}
    </nav>
  )
}
