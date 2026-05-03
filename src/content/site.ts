/**
 * ============================================================
 * INFORMAÇÕES DO NEGÓCIO / CONTACTOS
 * ============================================================
 *
 * Edite aqui os dados de contacto e textos gerais do site:
 *
 *   BUSINESS_NAME         → nome da empresa (exibido em todo o site)
 *   BUSINESS_SUBTITLE     → localização/subtítulo (ex: 'COIMBRA')
 *   WHATSAPP_NUMBER       → número WhatsApp em formato internacional sem '+' (ex: '351910093635')
 *   WHATSAPP_MESSAGE      → mensagem padrão pré-preenchida no WhatsApp
 *   PHONE_NUMBER          → número de telefone exibido no site (com formatação)
 *   EMAIL                 → email de contacto
 *   SERVICE_AREA_TEXT     → texto da área de serviço (rodapé e hero)
 *   COMPANY_DESCRIPTION   → descrição curta da empresa (rodapé)
 *   FOOTER_LEGAL_TEXT     → texto legal no rodapé da página
 * ============================================================
 */

/** Nome da empresa */
export const BUSINESS_NAME = 'CarpiMater'

export type SiteVariant = 'vinilico' | 'flutuante' | 'cozinha'

export interface SiteVariantContent {
  subtitle: string
  switchLabel: string
  whatsappMessage: string
  companyDescription: string
  materialSingular: string
  materialPlural: string
  materialTechnical: string
  supplierWarrantyLabel: string
  heroTitle: string
  heroStepOneText: string
  heroServiceLine: string
  catalogCtaLabel: string
  catalogHeaderLabel: string
  catalogPrimaryTitle: string
  projectAltPrefix: string
  quotePrefix: string
}

/** Conteúdo por sub-site */
export const SITE_VARIANT_CONTENT: Record<SiteVariant, SiteVariantContent> = {
  vinilico: {
    subtitle: 'Pavimento Vinílico',
    switchLabel: 'Pavimentos Vinílicos',
    whatsappMessage: 'Olá! Gostaria de saber mais sobre os vossos pavimentos vinílicos.',
    companyDescription:
      'Especialistas no fabrico de cozinhas e serviços de carpintaria por medida.',
    materialSingular: 'vinílico',
    materialPlural: 'vinílicos',
    materialTechnical: 'Vinílico SPC',
    supplierWarrantyLabel: '25 anos',
    heroTitle: 'Pavimentos Vinílicos e Flutuantes',
    heroStepOneText: 'Escolha o vinílico.',
    heroServiceLine: 'Fornecimento & Instalação',
    catalogCtaLabel: 'Ver catálogo de vinílicos',
    catalogHeaderLabel: 'Catálogo de pavimentos',
    catalogPrimaryTitle: 'Pavimento vinílico',
    projectAltPrefix: 'Projeto de pavimento',
    quotePrefix: 'VP',
  },
  flutuante: {
    subtitle: 'Pavimento Flutuante',
    switchLabel: 'Pavimentos Flutuantes',
    whatsappMessage: 'Olá! Gostaria de saber mais sobre os vossos pavimentos flutuantes.',
    companyDescription:
      'Especialistas em pavimentos flutuantes. Fornecimento e aplicação profissional com garantia de 20 anos.',
    materialSingular: 'flutuante',
    materialPlural: 'flutuantes',
    materialTechnical: 'Flutuante',
    supplierWarrantyLabel: '20 anos',
    heroTitle: 'Pavimentos Vinílicos e Flutuantes',
    heroStepOneText: 'Escolha o flutuante.',
    heroServiceLine: 'Fornecimento & Instalação',
    catalogCtaLabel: 'Ver catálogo de flutuantes',
    catalogHeaderLabel: 'Catálogo de pavimentos',
    catalogPrimaryTitle: 'Pavimento flutuante',
    projectAltPrefix: 'Projeto de pavimento',
    quotePrefix: 'FP',
  },
  cozinha: {
    subtitle: 'Cozinhas',
    switchLabel: 'Cozinhas',
    whatsappMessage:
      'Olá! Preciso de uma solução para a minha cozinha e gostaria de saber como avançar.',
    companyDescription:
      'Cozinhas por medida e soluções de cozinha com projeto personalizado, fabrico em Paços de Ferreira e montagem profissional com carpintaria parceira.',
    materialSingular: 'cozinha',
    materialPlural: 'cozinhas',
    materialTechnical: 'Mobiliário de cozinha por medida',
    supplierWarrantyLabel: 'Nacional',
    heroTitle: 'A Cozinha que Imaginou. Fabricada em Portugal.',
    heroStepOneText: 'Partilhe as suas ideias ou necessidades — visitamos e medimos gratuitamente.',
    heroServiceLine: 'Orçamento Gratuito em 48h',
    catalogCtaLabel: 'Pedir proposta por WhatsApp',
    catalogHeaderLabel: 'Cozinhas por medida',
    catalogPrimaryTitle: 'Cozinha por medida',
    projectAltPrefix: 'Projeto de cozinha',
    quotePrefix: 'CZ',
  },
}

/** Mensagens específicas do WhatsApp por variante e tipo */
export const WHATSAPP_MESSAGES = {
  cozinha: {
    repair: 'Olá! A minha cozinha está danificada/perigosa e preciso de uma solução. Podemos conversar?',
    new: 'Olá! Estou a construir uma casa nova e preciso de carpintaria para cozinhas e roupeiros. Podemos planejar?',
  },
  vinilico: {
    default: SITE_VARIANT_CONTENT.vinilico.whatsappMessage,
  },
  flutuante: {
    default: SITE_VARIANT_CONTENT.flutuante.whatsappMessage,
  },
}

/** Subtítulo/localização exibido abaixo do nome */
export const BUSINESS_SUBTITLE = SITE_VARIANT_CONTENT.vinilico.subtitle

/** Número de WhatsApp em formato internacional SEM '+' (ex: '351910093635') */
export const WHATSAPP_NUMBER = '351910093635'

/** Mensagem padrão pré-preenchida quando o cliente abre o WhatsApp */
export const WHATSAPP_MESSAGE = SITE_VARIANT_CONTENT.vinilico.whatsappMessage

/** Número de telefone exibido no site (com formatação legível) */
export const PHONE_NUMBER = '+351 910 093 635'

/** Email de contacto */
export const EMAIL = 'tomas.a.barros@hotmail.com'

/** Texto da área de serviço (exibido no hero e no rodapé) */
export const SERVICE_AREA_TEXT = 'Localizados em Coimbra, servimos clientes em toda a região centro, incluindo Coimbra, Leiria e Aveiro.'

/** Descrição curta da empresa (exibida no rodapé) */
export const COMPANY_DESCRIPTION = SITE_VARIANT_CONTENT.vinilico.companyDescription

/** Texto legal exibido no fundo do rodapé */
export const FOOTER_LEGAL_TEXT = 'Os preços apresentados não incluem IVA.'

export function getSiteVariantFromPath(pathname?: string | null): SiteVariant {
  if (!pathname) return 'vinilico'
  if (pathname.startsWith('/cozinha')) return 'cozinha'
  return pathname.startsWith('/flutuante') ? 'flutuante' : 'vinilico'
}

export function getSiteVariantContent(variant: SiteVariant): SiteVariantContent {
  return SITE_VARIANT_CONTENT[variant]
}

// ─── Funções utilitárias (não editar) ─────────────────────────────────────────

/** Abre o WhatsApp via página de redirect que se fecha automaticamente */
export function openWhatsApp(url: string): void {
  window.open(`/whatsapp-redirect.html?url=${encodeURIComponent(url)}`, '_blank')
}

/** Gera o URL do WhatsApp com a mensagem padrão */
export function getWhatsAppUrl(customMessage?: string, variant: SiteVariant = 'vinilico'): string {
  const fallbackMessage = SITE_VARIANT_CONTENT[variant].whatsappMessage
  const message = encodeURIComponent(customMessage || fallbackMessage)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
}

/** Gera o URL do WhatsApp com os dados do orçamento do cliente */
export function getWhatsAppUrlWithQuote(
  nome: string,
  produto: string,
  area: number,
  concelho: string,
  valorMin: number,
  valorMax: number
): string {
  const message =
    `Olá! Sou o/a ${nome} e gostaria de formalizar o meu pedido de orçamento:\n\n` +
    `Produto: ${produto}\n` +
    `Área: ${area} m²\n` +
    `Local: ${concelho}\n` +
    `Estimativa: ${valorMin.toFixed(2)}€ - ${valorMax.toFixed(2)}€\n\n` +
    `Aguardo o vosso contacto. Obrigado!`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
