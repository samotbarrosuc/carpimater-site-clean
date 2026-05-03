// client component

import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { useLocation } from 'wouter'
import {
  BUSINESS_NAME,
  SERVICE_AREA_TEXT,
  PHONE_NUMBER,
  EMAIL,
  FOOTER_LEGAL_TEXT,
  getSiteVariantContent,
  getSiteVariantFromPath,
  getWhatsAppUrl,
} from '@/content/site'

export default function Footer() {
  const [pathname] = useLocation()
  const isHomePage = pathname === '/'
  const isEmpreiteiros = pathname.startsWith('/empreiteiros')
  const isPavimentos = pathname.startsWith('/vinilico') || pathname.startsWith('/flutuante')
  const siteVariant = getSiteVariantFromPath(pathname)
  const isKitchen = siteVariant === 'cozinha'
  const siteContent = getSiteVariantContent(siteVariant)
  const currentYear = new Date().getFullYear()
  const basePath = isEmpreiteiros ? '/empreiteiros' : `/${siteVariant}`

  const serviceLinks = isHomePage
    ? [
        { label: 'Pavimentos (Vinílico & Flutuante)', href: '/pavimentos' },
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Construção & Empreiteiros', href: '/empreiteiros' },
        { label: 'Sobre Nós', href: '/sobre-nos' },
      ]
    : isEmpreiteiros
    ? [
        { label: 'Serviços de Carpintaria', href: '/empreiteiros#servicos' },
        { label: 'Galeria de Projectos', href: '/empreiteiros#projectos' },
        { label: 'Pavimentos', href: '/pavimentos' },
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Sobre Nós', href: '/sobre-nos' },
      ]
    : isPavimentos
    ? [
        { label: 'Catálogo de Pavimentos', href: `${basePath}#catalogo` },
        { label: 'Simulador de Orçamento', href: `${basePath}#simulador` },
        { label: 'Como Funciona', href: `${basePath}#como-funciona` },
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Construção & Empreiteiros', href: '/empreiteiros' },
        { label: 'Sobre Nós', href: '/sobre-nos' },
      ]
    : isKitchen
    ? [
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Pedido de Proposta', href: getWhatsAppUrl(undefined, siteVariant) },
        { label: 'Como Funciona', href: `${basePath}#como-funciona` },
        { label: 'Pavimentos', href: '/pavimentos' },
        { label: 'Construção & Empreiteiros', href: '/empreiteiros' },
        { label: 'Sobre Nós', href: '/sobre-nos' },
      ]
    : [
        { label: 'Catálogo de Pavimentos', href: `${basePath}#catalogo` },
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Simulador de Orçamento', href: `${basePath}#simulador` },
        { label: 'Como Funciona', href: `${basePath}#como-funciona` },
        { label: 'Construção & Empreiteiros', href: '/empreiteiros' },
        { label: 'Sobre Nós', href: '/sobre-nos' },
      ]

  const companyDesc = isEmpreiteiros
    ? 'Carpintaria técnica para empreiteiros, promotores e construtores. Pavimentos, cozinhas e marcenaria de obra, com fabrico em Paços de Ferreira.'
    : siteContent.companyDescription

  return (
    <footer
      className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo-carpimater.png"
                alt="Logotipo CarpiMater"
                className="w-10 h-10 rounded-lg object-cover bg-white"
              />
              <span className="font-display font-bold text-xl text-white">{BUSINESS_NAME}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{companyDesc}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Serviços</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('https://wa.me/') ? '_blank' : undefined}
                    rel={link.href.startsWith('https://wa.me/') ? 'noopener noreferrer' : undefined}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contacto &amp; Zona</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                {SERVICE_AREA_TEXT}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                  {PHONE_NUMBER.replace('+351 ', '')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <MessageCircle className="w-4 h-4 shrink-0 text-[#25D366]" />
                <a
                  href={`/whatsapp-redirect.html?url=${encodeURIComponent(getWhatsAppUrl())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/40 mb-2">Páginas</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Cozinhas', href: '/cozinha' },
                  { label: 'Pavimentos', href: '/pavimentos' },
                  { label: 'Empreiteiros', href: '/empreiteiros' },
                ].map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/50 hover:text-white hover:border-white/30 transition-colors"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partners & Brands */}
        <div className="border-t border-white/8 pt-8 pb-6 mb-2">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/25 font-semibold mb-5 text-center">Marcas e parceiros de material</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {['Quick·Step', 'Egger', 'Tarkett', 'Kronoflooring', 'Blum', 'Häfele'].map((brand) => (
              <span key={brand} className="text-white/22 text-sm font-semibold tracking-wide hover:text-white/45 transition-colors cursor-default select-none">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['Instalação certificada', 'Garantia de fabricante', 'Sem custos ocultos', 'Resposta em 24h'].map((badge) => (
            <span key={badge} className="text-[10px] border border-white/10 rounded-full px-3 py-1 text-white/30">
              {badge}
            </span>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/40">
            © {currentYear} {BUSINESS_NAME}. {FOOTER_LEGAL_TEXT}
          </p>
          <div className="flex items-center gap-4">
            <a href="/politica-de-privacidade" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Política de Privacidade
            </a>
            <span className="text-white/15 text-xs">·</span>
            <p className="text-xs text-white/30">
              Coimbra · Aveiro · Leiria
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
