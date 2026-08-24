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
  const isEmpreiteiros = pathname.startsWith('/construcao')
  const isContactos = pathname.startsWith('/contactos')
  const isPrivacy = pathname.startsWith('/politica-de-privacidade')
  const isTerms = pathname.startsWith('/termos-e-condicoes')
  const siteVariant = getSiteVariantFromPath(pathname)
  const siteContent = getSiteVariantContent(siteVariant)
  const currentYear = new Date().getFullYear()

  const companyDesc = isEmpreiteiros
    ? 'Carpintaria técnica para empreiteiros, promotores e construtores. Pavimentos, cozinhas e marcenaria de obra, com fabrico em Paços de Ferreira.'
    : isContactos || isPrivacy || isTerms
    ? 'Pavimentos, cozinhas por medida e carpintaria em geral. Atuação regular na Região Centro; outras zonas sujeitas a confirmação prévia.'
    : siteContent.companyDescription

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200">
      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1.3fr] md:gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-carpimater-v2.png"
                alt="Logotipo CarpiMater"
                className="h-11 w-11 rounded-xl border border-slate-200 bg-white object-contain"
              />
              <span className="font-display font-bold text-2xl text-slate-900">{BUSINESS_NAME}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">{companyDesc}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Região Centro · Outras zonas sob consulta</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
              <a href="/termos-e-condicoes" className="transition-colors hover:text-primary">
                Termos e Condições
              </a>
              <a href="/politica-de-privacidade" className="transition-colors hover:text-primary">
                Política de Privacidade
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-900">Serviços</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'Loja de materiais', href: '/loja' },
                { label: 'Cozinhas à medida', href: '/cozinha' },
                { label: 'Flutuante híbrido ZCUDO NextCore', href: '/flutuante' },
                { label: 'Pavimento vinílico SPC', href: '/vinilico' },
                { label: 'Rodapés PVC', href: '/rodapes' },
                { label: 'Carpintaria para Obras', href: '/construcao' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-600 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="footer-contactos" style={{ scrollMarginTop: '6rem' }}>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-900">Contactos</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                {SERVICE_AREA_TEXT}
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {PHONE_NUMBER.replace('+351 ', '')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <MessageCircle className="w-4 h-4 shrink-0 text-[#25D366]" />
                <a
                  href={`/whatsapp-redirect.html?url=${encodeURIComponent(getWhatsAppUrl())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60">
            © {currentYear} {BUSINESS_NAME}. {FOOTER_LEGAL_TEXT}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/60">
            <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Livro de Reclamações
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
