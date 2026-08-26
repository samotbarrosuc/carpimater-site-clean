import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { getProdutosByVariant } from '@/content/vinil'
import { RODAPES } from '@/content/rodapes'
import { BUSINESS_NAME, EMAIL, PHONE_NUMBER } from '@/content/site'
import { PRECO_FLUTUANTE_HIBRIDO_M2, PRECO_VINILICO_SPC_M2 } from '@/content/precos-materiais'
import { PAVEMENT_SEO_CONTENT } from '@/content/pavement-seo'
import localServices from '@/content/local-services.json'
import kitchenFaqs from '@/content/kitchen-faq.json'

const SITE_URL = 'https://carpimater.pt'
const DEFAULT_IMAGE = `${SITE_URL}/images/pavimento-vinilico-sala-coimbra.png`
const BUSINESS_ID = `${SITE_URL}/#business`
const WEBSITE_ID = `${SITE_URL}/#website`

const formatMaterialPrice = (price: number) => price.toLocaleString('pt-PT', {
  minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  maximumFractionDigits: 2,
})
const VINYL_PRICE = formatMaterialPrice(PRECO_VINILICO_SPC_M2)
const HYBRID_PRICE = formatMaterialPrice(PRECO_FLUTUANTE_HIBRIDO_M2)

type SeoEntry = {
  title: string
  description: string
  searchTopics?: string[]
  image?: string
  imageAlt?: string
  index?: boolean
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'CheckoutPage'
  serviceType?: string
  faqs?: Array<{ question: string; answer: string }>
}

const LOCAL_SERVICE_SEO = Object.fromEntries(localServices.map((service) => [
  `/${service.slug}`,
  {
    title: service.metaTitle,
    description: service.metaDescription,
    searchTopics: service.searchTopics,
    serviceType: service.serviceType,
    faqs: service.faqs,
    image: `${SITE_URL}${service.image}`,
    imageAlt: service.imageAlt,
  } satisfies SeoEntry,
])) as Record<string, SeoEntry>

const SEO_BY_PATH: Record<string, SeoEntry> = {
  '/': {
    title: 'Carpintaria em Coimbra | Cozinhas e Pavimentos | CarpiMater',
    description: 'Carpintaria por medida em Coimbra. Cozinhas, roupeiros, pavimentos vinílicos e flutuantes, rodapés e montagem na Região Centro.',
    searchTopics: ['carpintaria em Coimbra', 'carpinteiro em Coimbra', 'carpintaria por medida Coimbra', 'cozinhas por medida Coimbra', 'pavimentos em Coimbra', 'roupeiros por medida Coimbra'],
  },
  '/loja': {
    title: 'Loja de Pavimentos Híbridos, Vinílicos e Rodapés | CarpiMater',
    description: 'Loja online de pavimentos vinílicos SPC, flutuante híbrido ZCUDO NextCore e rodapés PVC. Entrega e aplicação em Coimbra, Aveiro, Leiria e Região Centro.',
    searchTopics: ['loja de pavimentos online', 'pavimentos vinílicos SPC', 'pavimento flutuante híbrido ZCUDO', 'ZCUDO NextCore', 'pavimentos laminados resistentes à água', 'rodapés PVC', 'preços de pavimentos'],
    pageType: 'CollectionPage',
  },
  '/vinilico': {
    title: 'Pavimento Vinílico SPC em Coimbra | Venda e Aplicação',
    description: `Pavimento vinílico SPC a ${VINYL_PRICE} €/m², IVA incluído. Venda online, entrega gratuita na Região Centro e aplicação em Coimbra e arredores.`,
    searchTopics: ['pavimento vinílico Coimbra', 'pavimento vinílico SPC', 'aplicação de pavimento vinílico Coimbra', 'instalação de pavimento vinílico Coimbra', 'preço pavimento vinílico Coimbra'],
    serviceType: 'Venda e aplicação de pavimento vinílico SPC',
    faqs: PAVEMENT_SEO_CONTENT.vinilico.faqs,
  },
  '/flutuante': {
    title: 'Pavimento Flutuante em Coimbra | Venda e Aplicação',
    description: `Flutuante híbrido AC5 a ${HYBRID_PRICE} €/m², resistente à água 100 h+ e com garantia de 25 anos. Entrega gratuita e aplicação na Região Centro.`,
    searchTopics: ['pavimento flutuante Coimbra', 'pavimento flutuante híbrido', 'aplicação de pavimento flutuante Coimbra', 'instalação de chão flutuante Coimbra', 'pavimento AC5 resistente à água'],
    image: `${SITE_URL}/images/produtos-flutuante/pingo.webp`,
    imageAlt: 'Pavimento flutuante híbrido em acabamento de madeira',
    serviceType: 'Venda e aplicação de pavimento flutuante híbrido ZCUDO NextCore',
    faqs: PAVEMENT_SEO_CONTENT.flutuante.faqs,
  },
  '/rodapes': {
    title: 'Rodapés PVC em Coimbra | Preços, Venda e Aplicação',
    description: 'Rodapés PVC com preços publicados, compra online e serviço de aplicação em Coimbra e na Região Centro. Rodapés em madeira sob consulta.',
    searchTopics: ['rodapés PVC Coimbra', 'rodapé branco', 'comprar rodapés Coimbra', 'aplicação de rodapés Coimbra', 'rodapé em madeira Coimbra'],
    pageType: 'CollectionPage',
    serviceType: 'Venda e aplicação de rodapés PVC',
  },
  '/cozinha': {
    title: 'Cozinhas por Medida em Coimbra | Fabrico e Montagem',
    description: 'Cozinhas por medida em Coimbra: levantamento, proposta, fabrico e montagem. Materiais, ferragens, preço e prazo definidos por escrito.',
    searchTopics: ['cozinhas por medida Coimbra', 'fabrico de cozinhas Coimbra', 'montagem de cozinhas Coimbra', 'carpinteiro para cozinhas Coimbra'],
    serviceType: 'Projeto, fabrico e montagem de cozinhas por medida',
    faqs: kitchenFaqs,
  },
  '/construcao': {
    title: 'Carpintaria para Obras em Coimbra | Fornecimento e Montagem',
    description: 'Carpinteiros para obras, remodelações e empreiteiros: pavimentos, cozinhas, roupeiros, portas e marcenaria em Coimbra, Aveiro, Leiria e arredores.',
    searchTopics: ['carpintaria em Coimbra', 'carpinteiros para obras', 'carpintaria por medida', 'marcenaria', 'remodelações'],
    serviceType: 'Carpintaria para construção e remodelação',
  },
  '/contactos': {
    title: 'Pavimentos e Carpintaria em Coimbra | Contactos',
    description: 'Contacte a CarpiMater para comprar pavimentos e rodapés ou pedir aplicação e trabalhos de carpintaria em Coimbra, Aveiro, Leiria e arredores.',
    searchTopics: ['carpinteiro em Coimbra', 'loja de pavimentos', 'aplicação de pavimentos', 'rodapés PVC'],
    pageType: 'ContactPage',
  },
  '/encomenda': {
    title: 'Finalizar Encomenda | CarpiMater',
    description: 'Formulário para concluir a encomenda de pavimentos e rodapés CarpiMater.',
    pageType: 'CheckoutPage',
    index: false,
  },
  '/politica-de-privacidade': {
    title: 'Política de Privacidade | CarpiMater',
    description: 'Política de privacidade e proteção de dados da CarpiMater.',
    index: false,
  },
  '/termos-e-condicoes': {
    title: 'Termos e Condições de Venda | CarpiMater',
    description: 'Termos aplicáveis às encomendas de pavimentos e rodapés na loja online CarpiMater.',
    index: false,
  },
  ...LOCAL_SERVICE_SEO,
}

const placeNames = [
  'Coimbra',
  'Aveiro',
  'Leiria',
  'Condeixa-a-Nova',
  'Figueira da Foz',
  'Cantanhede',
  'Mealhada',
  'Lousã',
  'Pombal',
  'Marinha Grande',
]

const businessSchema = {
  '@type': ['OnlineStore', 'HomeAndConstructionBusiness'],
  '@id': BUSINESS_ID,
  name: BUSINESS_NAME,
  alternateName: 'CarpiMater Carpintaria e Pavimentos',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-carpimater-v2.png`,
  image: DEFAULT_IMAGE,
  description: 'Carpintaria por medida e loja de pavimentos vinílicos SPC, flutuante híbrido ZCUDO NextCore e rodapés PVC, com aplicação na Região Centro.',
  telephone: PHONE_NUMBER,
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coimbra',
    addressRegion: 'Coimbra',
    addressCountry: 'PT',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Região Centro, Portugal' },
    ...placeNames.map((name) => ({ '@type': 'City', name })),
  ],
  currenciesAccepted: 'EUR',
  paymentAccepted: ['MB WAY', 'Transferência bancária'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE_NUMBER,
    email: EMAIL,
    contactType: 'vendas e apoio ao cliente',
    areaServed: 'Região Centro, Portugal',
    availableLanguage: ['Português'],
  },
  knowsAbout: [
    'pavimento vinílico SPC',
    'pavimento flutuante',
    'pavimento flutuante híbrido ZCUDO NextCore',
    'pavimento laminado',
    'pavimento em madeira',
    'pavimento híbrido',
    'rodapé PVC',
    'rodapés em PVC',
    'aplicação de pavimentos',
    'loja online de pavimentos',
    'carpintaria por medida em Coimbra',
    'carpinteiros em Coimbra',
    'cozinhas por medida',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Materiais e serviços CarpiMater',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Pavimentos vinílicos SPC' },
      { '@type': 'OfferCatalog', name: 'Pavimento flutuante híbrido ZCUDO NextCore' },
      { '@type': 'OfferCatalog', name: 'Pavimentos laminados resistentes à água' },
      { '@type': 'OfferCatalog', name: 'Rodapés PVC' },
      { '@type': 'OfferCatalog', name: 'Aplicação de pavimentos e rodapés' },
      { '@type': 'OfferCatalog', name: 'Carpintaria por medida e cozinhas' },
    ],
  },
}

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).href
}

function productItemList() {
  const vinyl = getProdutosByVariant('vinilico').filter((product) => !product.sobConsulta && product.precoM2 > 0)
  const hybrid = getProdutosByVariant('flutuante')
  const items = [
    ...vinyl.map((product) => ({
      '@type': 'Product',
      '@id': `${SITE_URL}/loja#produto-${product.referencia.toLowerCase()}`,
      name: `Pavimento vinílico SPC ${product.nome}`,
      description: `Pavimento vinílico SPC ${product.nome}, disponível para compra online.`,
      sku: product.referencia,
      category: 'Pavimento vinílico SPC',
      ...(product.imagem ? { image: absoluteUrl(product.imagem) } : {}),
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/loja?categoria=vinilico#produto-${product.referencia.toLowerCase()}`,
        priceCurrency: 'EUR',
        price: product.precoM2.toFixed(2),
        itemCondition: 'https://schema.org/NewCondition',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: product.precoM2.toFixed(2),
          priceCurrency: 'EUR',
          unitCode: 'MTK',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MTK' },
        },
      },
    })),
    ...hybrid.map((product) => ({
      '@type': 'Product',
      '@id': `${SITE_URL}/loja#produto-${product.referencia.toLowerCase()}`,
      name: `Pavimento flutuante híbrido ZCUDO ${product.colecao} ${product.nome}`,
      description: `Pavimento flutuante híbrido ZCUDO NextCore ${product.nome}. ${product.formato || ''}`.trim(),
      sku: product.referencia,
      category: 'Pavimento flutuante híbrido',
      material: 'Carbon Core HDF com base acústica IXPE',
      color: product.nome,
      brand: { '@type': 'Brand', name: product.marca || 'ZCUDO' },
      ...(product.imagem ? { image: absoluteUrl(product.imagem) } : {}),
      url: `${SITE_URL}/loja?categoria=flutuante#produto-${product.referencia.toLowerCase()}`,
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/loja?categoria=flutuante#produto-${product.referencia.toLowerCase()}`,
        priceCurrency: 'EUR',
        price: product.precoM2.toFixed(2),
        itemCondition: 'https://schema.org/NewCondition',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: product.precoM2.toFixed(2),
          priceCurrency: 'EUR',
          unitCode: 'MTK',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MTK' },
        },
      },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Coleção', value: product.colecao },
        { '@type': 'PropertyValue', name: 'Formato', value: product.formato },
        { '@type': 'PropertyValue', name: 'Classe', value: 'AC5' },
        { '@type': 'PropertyValue', name: 'Resistência à água', value: '100 h+' },
        { '@type': 'PropertyValue', name: 'Garantia', value: product.garantia },
      ],
    })),
    ...RODAPES.map((product) => ({
      '@type': 'Product',
      '@id': `${SITE_URL}/loja#produto-${product.referencia.toLowerCase()}`,
      name: `Rodapé PVC ${product.nome}`,
      description: `Rodapé ${product.material} ${product.nome}, ${product.altura} de altura e ${product.espessura} de espessura.`,
      sku: product.referencia,
      category: 'Rodapé PVC',
      material: product.material,
      color: product.nome,
      ...(product.imagem ? { image: absoluteUrl(product.imagem) } : {}),
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/loja?categoria=rodape#produto-${product.referencia.toLowerCase()}`,
        priceCurrency: 'EUR',
        price: product.precoMl.toFixed(2),
        itemCondition: 'https://schema.org/NewCondition',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: product.precoMl.toFixed(2),
          priceCurrency: 'EUR',
          unitCode: 'MTR',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MTR' },
        },
      },
    })),
  ]

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/loja#catalogo`,
    name: 'Pavimentos vinílicos, flutuantes híbridos ZCUDO e rodapés',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item,
    })),
  }
}

function routeSchema(pathname: string, seo: SeoEntry, canonical: string) {
  const graph: Record<string, unknown>[] = []

  graph.push({
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS_NAME,
    alternateName: 'CarpiMater Pavimentos e Carpintaria',
    inLanguage: 'pt-PT',
    publisher: { '@id': BUSINESS_ID },
  })
  graph.push(businessSchema)

  const pageId = `${canonical}#webpage`
  const page: Record<string, unknown> = {
    '@type': seo.pageType || 'WebPage',
    '@id': pageId,
    url: canonical,
    name: seo.title,
    description: seo.description,
    inLanguage: 'pt-PT',
    isPartOf: { '@id': WEBSITE_ID },
    keywords: seo.searchTopics?.join(', '),
    about: [
      { '@id': BUSINESS_ID },
      ...(seo.searchTopics || []).map((name) => ({ '@type': 'Thing', name })),
    ],
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: seo.image || DEFAULT_IMAGE,
    },
  }

  if (pathname === '/loja') {
    const catalog = productItemList()
    page.mainEntity = { '@id': `${SITE_URL}/loja#catalogo` }
    graph.push(catalog)
  }
  if (seo.serviceType) page.mainEntity = { '@id': `${canonical}#service` }
  graph.push(page)

  if (pathname !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: seo.title.split('|')[0].trim(), item: canonical },
      ],
    })
  }

  if (seo.serviceType) {
    graph.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: seo.serviceType,
      serviceType: seo.serviceType,
      category: seo.searchTopics,
      provider: { '@id': BUSINESS_ID },
      areaServed: placeNames.map((name) => ({ '@type': 'City', name })),
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: canonical,
        servicePhone: PHONE_NUMBER,
      },
    })
  }

  if (seo.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: seo.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

export default function SeoManager() {
  const [location] = useLocation()
  const pathname = location.split('?')[0].replace(/\/$/, '') || '/'

  useEffect(() => {
    const seo = SEO_BY_PATH[pathname] || {
      title: 'Página não encontrada | CarpiMater',
      description: 'A página que procura não foi encontrada.',
      index: false,
    }
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    const image = seo.image || DEFAULT_IMAGE
    const robots = seo.index === false
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

    document.documentElement.lang = 'pt-PT'
    document.title = seo.title
    document.head.querySelector('meta[name="keywords"]')?.remove()
    setMeta('name', 'description', seo.description)
    setMeta('name', 'robots', robots)
    setMeta('name', 'googlebot', robots)
    setMeta('name', 'author', BUSINESS_NAME)
    setMeta('name', 'geo.region', 'PT-06')
    setMeta('name', 'geo.placename', 'Coimbra')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:locale', 'pt_PT')
    setMeta('property', 'og:site_name', BUSINESS_NAME)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:image:alt', seo.imageAlt || 'CarpiMater — pavimentos, rodapés e carpintaria')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', image)

    let canonicalElement = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalElement) {
      canonicalElement = document.createElement('link')
      canonicalElement.rel = 'canonical'
      document.head.appendChild(canonicalElement)
    }
    canonicalElement.href = canonical

    let structuredData = document.getElementById('seo-structured-data') as HTMLScriptElement | null
    if (!structuredData) {
      structuredData = document.createElement('script')
      structuredData.id = 'seo-structured-data'
      structuredData.type = 'application/ld+json'
      document.head.appendChild(structuredData)
    }
    structuredData.text = JSON.stringify(routeSchema(pathname, seo, canonical)).replace(/</g, '\\u003c')
  }, [pathname])

  return null
}
