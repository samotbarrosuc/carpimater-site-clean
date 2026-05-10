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
  const isEmpreiteiros = pathname.startsWith('/construção')
  const isPavimentos = pathname.startsWith('/vinilico') || pathname.startsWith('/flutuante')
  const siteVariant = getSiteVariantFromPath(pathname)
  const isKitchen = siteVariant === 'cozinha'
  const siteContent = getSiteVariantContent(siteVariant)
  const currentYear = new Date().getFullYear()
  const basePath = isEmpreiteiros ? '/construção' : `/${siteVariant}`

  const serviceLinks = isHomePage
    ? [
        { label: 'Pavimentos (Vinílico & Flutuante)', href: '/pavimentos' },
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Construção & Empreiteiros', href: '/construção' },
      ]
    : isEmpreiteiros
    ? [
        { label: 'Serviços de Carpintaria', href: '/construção#servicos' },
        { label: 'Galeria de Projectos', href: '/construção#projectos' },
        { label: 'Pavimentos', href: '/pavimentos' },
        { label: 'Cozinhas por Medida', href: '/cozinha' },
      ]
    : isPavimentos
    ? [
        { label: 'Catálogo de Pavimentos', href: `${basePath}#catalogo` },
        { label: 'Simulador de Orçamento', href: `${basePath}#simulador` },
        { label: 'Como Funciona', href: `${basePath}#como-funciona` },
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Construção & Empreiteiros', href: '/construção' },
      ]
    : isKitchen
    ? [
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Pedido de Proposta', href: getWhatsAppUrl(undefined, siteVariant) },
        { label: 'Como Funciona', href: `${basePath}#como-funciona` },
        { label: 'Pavimentos', href: '/pavimentos' },
        { label: 'Construção & Empreiteiros', href: '/construção' },
      ]
    : [
        { label: 'Catálogo de Pavimentos', href: `${basePath}#catalogo` },
        { label: 'Cozinhas por Medida', href: '/cozinha' },
        { label: 'Simulador de Orçamento', href: `${basePath}#simulador` },
        { label: 'Como Funciona', href: `${basePath}#como-funciona` },
        { label: 'Construção & Empreiteiros', href: '/construção' },
      ]

  const companyDesc = isEmpreiteiros
    ? 'Carpintaria técnica para empreiteiros, promotores e construtores. Pavimentos, cozinhas e marcenaria de obra, com fabrico em Paços de Ferreira.'
    : siteContent.companyDescription

  return (
    <footer
      className="bg-white text-slate-900 pt-16 pb-8 border-t border-slate-200"
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
              <span className="font-display font-bold text-xl text-slate-900">{BUSINESS_NAME}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{companyDesc}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Serviços</h4>
            <ul className="space-y-2">
              {[
                { label: 'Cozinhas à medida', href: '/cozinha' },
                { label: 'Pavimento flutuante', href: '/flutuante' },
                { label: 'Pavimento vinílico', href: '/vinilico' },
                { label: 'Carpintaria para Obras', href: '/construção' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('https://wa.me/') ? '_blank' : undefined}
                    rel={link.href.startsWith('https://wa.me/') ? 'noopener noreferrer' : undefined}
                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="footer-contactos" style={{ scrollMarginTop: '6rem' }}>
            <h4 className="font-bold text-slate-900 mb-4">Contactos</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                {SERVICE_AREA_TEXT}
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-slate-900 transition-colors">
                  {PHONE_NUMBER.replace('+351 ', '')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <a href={`mailto:${EMAIL}`} className="hover:text-slate-900 transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <MessageCircle className="w-4 h-4 shrink-0 text-[#25D366]" />
                <a
                  href={`/whatsapp-redirect.html?url=${encodeURIComponent(getWhatsAppUrl())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Páginas</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Cozinhas', href: '/cozinha' },
                  { label: 'Pavimentos', href: '/pavimentos' },
                  { label: 'Empreiteiros', href: '/construção' },
                ].map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="rounded-full border border-primary px-3 py-1 text-xs text-slate-600 hover:text-slate-900 hover:border-primary/80 transition-colors"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="border-t border-slate-800 pt-8 pb-6 mb-2">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-semibold mb-5 text-center">Marcas e parceiros de material</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {['Quick·Step', 'Egger', 'Tarkett', 'Kronoflooring', 'Blum', 'Häfele'].map((brand) => (
                <span key={brand} className="text-white/60 text-sm font-semibold tracking-wide hover:text-white/80 transition-colors cursor-default select-none">
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['Instalação certificada', 'Garantia de fabricante', 'Sem custos ocultos', 'Resposta em 24h'].map((badge) => (
              <span key={badge} className="text-[10px] border border-white/10 rounded-full px-3 py-1 text-white/60">
                {badge}
              </span>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-white/50">
              © {currentYear} {BUSINESS_NAME}. {FOOTER_LEGAL_TEXT}
            </p>
            <div className="flex items-center gap-4">
              <a href="/politica-de-privacidade" className="text-xs text-white/60 hover:text-white/80 transition-colors">
                Política de Privacidade
              </a>
              <span className="text-white/20 text-xs">·</span>
              <p className="text-xs text-white/60">
                Coimbra · Aveiro · Leiria
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
