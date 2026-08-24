import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { getProdutosByVariant } from '@/content/vinil'
import { RODAPES } from '@/content/rodapes'
import { BUSINESS_NAME, EMAIL, PHONE_NUMBER } from '@/content/site'

const SITE_URL = 'https://carpimater.pt'
const DEFAULT_IMAGE = `${SITE_URL}/images/pavimento-vinilico-sala-coimbra.png`
const BUSINESS_ID = `${SITE_URL}/#business`
const WEBSITE_ID = `${SITE_URL}/#website`

type SeoEntry = {
  title: string
  description: string
  searchTopics?: string[]
  image?: string
  index?: boolean
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'CheckoutPage'
  serviceType?: string
}

const SEO_BY_PATH: Record<string, SeoEntry> = {
  '/': {
    title: 'CarpiMater | Carpintaria por medida em Coimbra',
    description: 'Carpintaria por medida e loja de pavimentos vinílicos SPC, flutuante híbrido ZCUDO NextCore e rodapés PVC, com aplicação em Coimbra e Região Centro.',
    searchTopics: ['carpintaria por medida em Coimbra', 'pavimentos em Coimbra', 'pavimento vinílico SPC', 'pavimento flutuante híbrido', 'ZCUDO NextCore', 'pavimento laminado resistente à água', 'rodapé PVC'],
  },
  '/loja': {
    title: 'Loja de Pavimentos Híbridos, Vinílicos e Rodapés | CarpiMater',
    description: 'Descubra pavimentos vinílicos SPC, flutuante híbrido ZCUDO NextCore e rodapés PVC. Entrega e aplicação em Coimbra, Aveiro, Leiria e Região Centro.',
    searchTopics: ['loja de pavimentos online', 'pavimentos vinílicos SPC', 'pavimento flutuante híbrido ZCUDO', 'ZCUDO NextCore', 'pavimentos laminados resistentes à água', 'rodapés PVC', 'preços de pavimentos'],
    pageType: 'CollectionPage',
  },
  '/vinilico': {
    title: 'Pavimento Vinílico em Coimbra | Loja e Aplicação',
    description: 'Pavimento vinílico SPC com preços online, compra por caixas e aplicação profissional. Serviço em Coimbra, Aveiro, Leiria, Condeixa e Figueira da Foz.',
    searchTopics: ['pavimento vinílico', 'pavimento vinílico SPC', 'pavimento impermeável', 'aplicação de pavimento vinílico em Coimbra'],
    serviceType: 'Venda e aplicação de pavimento vinílico SPC',
  },
  '/flutuante': {
    title: 'Flutuante Híbrido ZCUDO NextCore em Coimbra | CarpiMater',
    description: 'Pavimento flutuante híbrido ZCUDO NextCore AC5, resistente à água 100 h+, com base acústica. Fornecimento e aplicação em Coimbra, Aveiro e Leiria.',
    searchTopics: ['pavimento flutuante híbrido', 'ZCUDO NextCore', 'pavimento laminado híbrido', 'pavimento AC5', 'pavimento resistente à água', 'aplicação de pavimento em Coimbra'],
    image: `${SITE_URL}/images/produtos-flutuante/pingo.webp`,
    serviceType: 'Venda e aplicação de pavimento flutuante híbrido ZCUDO NextCore',
  },
  '/rodapes': {
    title: 'Rodapés PVC em Coimbra | Preços e Compra Online',
    description: 'Rodapés PVC com preços publicados, vários acabamentos e compra online por barras. Entrega ou aplicação profissional em Coimbra, Aveiro, Leiria e arredores.',
    searchTopics: ['rodapé', 'rodapés', 'rodapé PVC', 'rodapé branco', 'aplicação de rodapés em Coimbra'],
    pageType: 'CollectionPage',
    serviceType: 'Venda e aplicação de rodapés PVC',
  },
  '/cozinha': {
    title: 'Cozinhas por Medida em Coimbra | Carpinteiros CarpiMater',
    description: 'Projeto, fabrico e montagem de cozinhas por medida por profissionais de carpintaria. Atuação regular em Coimbra, Aveiro, Leiria e na Região Centro.',
    searchTopics: ['cozinhas por medida em Coimbra', 'carpinteiro em Coimbra', 'fabrico de cozinhas', 'montagem de cozinhas'],
    serviceType: 'Projeto, fabrico e montagem de cozinhas por medida',
  },
  '/construcao': {
    title: 'Carpintaria para Obras em Coimbra e Região Centro',
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
    description: 'Finalize com segurança a sua encomenda de pavimentos e rodapés CarpiMater.',
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
  description: 'Carpintaria por medida e loja de pavimentos vinílicos SPC, flutuante híbrido ZCUDO NextCore e rodapés PVC, com aplicação profissional na Região Centro.',
  telephone: PHONE_NUMBER,
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coimbra',
    addressRegion: 'Coimbra',
    addressCountry: 'PT',
  },
  areaServed: placeNames.map((name) => ({ '@type': 'City', name })),
  currenciesAccepted: 'EUR',
  paymentAccepted: ['MB WAY', 'Transferência bancária'],
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
      description: product.useCase || `Pavimento vinílico SPC ${product.nome}, disponível para compra online.`,
      sku: product.referencia,
      category: 'Pavimento vinílico SPC',
      brand: { '@type': 'Brand', name: BUSINESS_NAME },
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
      description: `${product.useCase || 'Pavimento flutuante híbrido ZCUDO NextCore.'} ${product.formato || ''}`.trim(),
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
      brand: { '@type': 'Brand', name: BUSINESS_NAME },
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
  const isBusinessPage = ['/', '/loja', '/contactos'].includes(pathname)

  if (pathname === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: BUSINESS_NAME,
      alternateName: 'CarpiMater Pavimentos e Carpintaria',
      inLanguage: 'pt-PT',
      publisher: { '@id': BUSINESS_ID },
    })
  }
  if (isBusinessPage) graph.push(businessSchema)

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
  }

  if (pathname === '/loja') {
    const catalog = productItemList()
    page.mainEntity = { '@id': `${SITE_URL}/loja#catalogo` }
    graph.push(catalog)
  }
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
    setMeta('property', 'og:image:alt', 'CarpiMater — pavimentos, rodapés e carpintaria')
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
