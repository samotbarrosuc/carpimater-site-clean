import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const siteUrl = 'https://carpimater.pt'
const outputDir = join(process.cwd(), 'dist')
const template = await readFile(join(outputDir, 'index.html'), 'utf8')
const materialPricesSource = await readFile(join(process.cwd(), 'src/content/precos-materiais.ts'), 'utf8')
const localServices = JSON.parse(await readFile(join(process.cwd(), 'src/content/local-services.json'), 'utf8'))
const kitchenFaqs = JSON.parse(await readFile(join(process.cwd(), 'src/content/kitchen-faq.json'), 'utf8'))

function readMaterialPrice(name) {
  const match = materialPricesSource.match(new RegExp(`export const ${name} = (\\d+(?:\\.\\d+)?)`))
  if (!match) throw new Error(`Preço não encontrado: ${name}`)
  return Number(match[1])
}

function formatMaterialPrice(price) {
  return price.toLocaleString('pt-PT', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

const vinylPrice = formatMaterialPrice(readMaterialPrice('PRECO_VINILICO_SPC_M2'))
const hybridPrice = formatMaterialPrice(readMaterialPrice('PRECO_FLUTUANTE_HIBRIDO_M2'))
const whiteSkirtingPrice = formatMaterialPrice(readMaterialPrice('PRECO_RODAPE_PVC_BRANCO_ML'))
const colourSkirtingPrice = formatMaterialPrice(readMaterialPrice('PRECO_RODAPE_PVC_ML'))
const cityNames = ['Coimbra', 'Aveiro', 'Leiria', 'Condeixa-a-Nova', 'Figueira da Foz', 'Cantanhede', 'Mealhada', 'Lousã', 'Pombal', 'Marinha Grande']

const businessSchema = {
  '@type': ['OnlineStore', 'HomeAndConstructionBusiness'],
  '@id': `${siteUrl}/#business`,
  name: 'CarpiMater',
  alternateName: 'CarpiMater Carpintaria e Pavimentos',
  url: siteUrl,
  logo: `${siteUrl}/images/logo-carpimater-v2.png`,
  image: `${siteUrl}/images/pavimento-vinilico-sala-coimbra.png`,
  description: 'Loja online de pavimentos e rodapés com entrega gratuita na Região Centro. Serviço de aplicação de pavimentos e carpintaria por medida.',
  telephone: '+351 910 093 635',
  email: 'tomas.a.barros@hotmail.com',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Região Centro, Portugal' },
    ...cityNames.map((name) => ({ '@type': 'City', name })),
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+351 910 093 635',
    email: 'tomas.a.barros@hotmail.com',
    contactType: 'vendas e apoio ao cliente',
    areaServed: 'Região Centro, Portugal',
    availableLanguage: ['Português'],
  },
}

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'CarpiMater',
  alternateName: 'CarpiMater Pavimentos e Carpintaria',
  inLanguage: 'pt-PT',
  publisher: { '@id': `${siteUrl}/#business` },
}

const offerCatalog = {
  '@type': 'OfferCatalog',
  '@id': `${siteUrl}/loja#ofertas`,
  name: 'Pavimentos e rodapés com preços publicados',
  itemListElement: [
    {
      '@type': 'Offer',
      price: readMaterialPrice('PRECO_VINILICO_SPC_M2'),
      priceCurrency: 'EUR',
      url: `${siteUrl}/loja?categoria=vinilico`,
      itemOffered: { '@type': 'Product', name: 'Pavimento vinílico SPC', category: 'Pavimentos vinílicos' },
    },
    {
      '@type': 'Offer',
      price: readMaterialPrice('PRECO_FLUTUANTE_HIBRIDO_M2'),
      priceCurrency: 'EUR',
      url: `${siteUrl}/loja?categoria=flutuante`,
      itemOffered: { '@type': 'Product', name: 'Pavimento flutuante híbrido AC5', category: 'Pavimentos flutuantes' },
    },
    {
      '@type': 'AggregateOffer',
      lowPrice: readMaterialPrice('PRECO_RODAPE_PVC_BRANCO_ML'),
      highPrice: readMaterialPrice('PRECO_RODAPE_PVC_ML'),
      priceCurrency: 'EUR',
      url: `${siteUrl}/loja?categoria=rodape`,
      itemOffered: { '@type': 'Product', name: 'Rodapé PVC', category: 'Rodapés' },
    },
  ],
}

const pages = {
  loja: {
    title: 'Loja de Pavimentos com Transporte Gratuito | CarpiMater',
    description: 'Pavimentos vinílicos SPC, flutuante híbrido e rodapés PVC com preços online. Transporte gratuito em casa ou obra na Região Centro e aplicação disponível.',
    topics: ['loja de pavimentos online', 'pavimentos vinílicos SPC', 'pavimento flutuante híbrido ZCUDO', 'ZCUDO NextCore', 'pavimentos laminados resistentes à água', 'rodapés PVC', 'preços de pavimentos', 'transporte gratuito pavimentos'],
    type: 'CollectionPage',
    heading: 'Loja online de pavimentos e rodapés na Região Centro',
    intro: `Compre pavimento vinílico SPC a ${vinylPrice} €/m², flutuante híbrido AC5 a ${hybridPrice} €/m² e rodapés PVC desde ${whiteSkirtingPrice} €/m. Os preços incluem IVA e a entrega regular é gratuita na Região Centro.`,
    facts: [
      `Vinílico SPC: ${vinylPrice} €/m²`,
      `Flutuante híbrido AC5: ${hybridPrice} €/m²`,
      `Rodapés PVC: ${whiteSkirtingPrice} € a ${colourSkirtingPrice} €/m`,
      'Entrega gratuita na Região Centro',
      'Serviço de aplicação disponível em separado',
    ],
    links: [
      { href: '/vinilico', label: 'Pavimento vinílico SPC' },
      { href: '/flutuante', label: 'Pavimento flutuante híbrido' },
      { href: '/rodapes', label: 'Rodapés PVC' },
      { href: '/contactos', label: 'Contactar a CarpiMater' },
    ],
  },
  vinilico: {
    title: 'Pavimento Vinílico SPC | Venda e Aplicação',
    description: `Pavimento vinílico SPC a ${vinylPrice} €/m², IVA incluído. Transporte gratuito em casa ou obra na Região Centro e aplicação disponível.`,
    topics: ['pavimento vinílico Coimbra', 'pavimento vinílico SPC', 'aplicação de pavimento vinílico Coimbra', 'instalação de pavimento vinílico Coimbra', 'preço pavimento vinílico Coimbra'],
    serviceType: 'Venda e aplicação de pavimento vinílico SPC',
    heading: 'Pavimento vinílico SPC — fornecimento e aplicação',
    intro: `Pavimento vinílico SPC a ${vinylPrice} €/m², com IVA incluído. Entrega gratuita na Região Centro e serviço de aplicação e assentamento em Coimbra, Aveiro, Leiria e localidades próximas.`,
    facts: [`Preço: ${vinylPrice} €/m² com IVA`, 'Entrega gratuita na Região Centro', 'Garantia do fabricante: 25 anos', 'Aplicação com estimativa separada'],
    faqs: [
      { question: 'Qual é o preço do pavimento vinílico SPC?', answer: `O preço publicado é ${vinylPrice} €/m², com IVA incluído. A compra é calculada por caixas inteiras de acordo com a área indicada.` },
      { question: 'A entrega é gratuita em Coimbra, Aveiro e Leiria?', answer: 'A entrega regular é gratuita na Região Centro, incluindo Coimbra, Aveiro, Leiria e localidades próximas. Outras zonas dependem de contacto e disponibilidade.' },
      { question: 'A CarpiMater faz o assentamento do pavimento?', answer: 'Sim. O serviço de aplicação pode ser pedido com o material. A estimativa é apresentada separadamente e o valor final depende das condições encontradas em obra.' },
      { question: 'Quanto material devo encomendar?', answer: 'Indique a área real. A loja permite acrescentar 10% para cortes e desperdícios, uma margem normalmente recomendada para a aplicação.' },
    ],
    links: [{ href: '/loja?categoria=vinilico', label: 'Ver vinílicos na loja' }, { href: '/flutuante', label: 'Ver flutuante híbrido' }, { href: '/instalacao-rodapes-coimbra', label: 'Ver instalação de rodapés' }, { href: '/contactos', label: 'Pedir informação' }],
  },
  flutuante: {
    title: 'Pavimento Flutuante Híbrido | Venda e Aplicação',
    description: `Flutuante híbrido AC5 a ${hybridPrice} €/m², resistente à água 100 h+ e com garantia de 25 anos. Transporte gratuito e aplicação na Região Centro.`,
    topics: ['pavimento flutuante Coimbra', 'pavimento flutuante híbrido', 'aplicação de pavimento flutuante Coimbra', 'instalação de chão flutuante Coimbra', 'pavimento AC5 resistente à água'],
    serviceType: 'Venda e aplicação de pavimento flutuante híbrido AC5',
    heading: 'Pavimento flutuante híbrido — fornecimento e aplicação',
    intro: `Pavimento flutuante híbrido AC5 a ${hybridPrice} €/m², com IVA incluído, resistência à água 100 h+ e garantia do fabricante de 25 anos. Entrega gratuita na Região Centro e aplicação disponível.`,
    facts: [`Preço: ${hybridPrice} €/m² com IVA`, 'Resistência à água: 100 h+', 'Garantia do fabricante: 25 anos', 'Entrega gratuita na Região Centro'],
    faqs: [
      { question: 'Qual é o preço do pavimento flutuante híbrido?', answer: `O preço publicado é ${hybridPrice} €/m², com IVA incluído. Pode consultar os acabamentos e calcular a quantidade na loja online.` },
      { question: 'O pavimento flutuante híbrido é resistente à água?', answer: 'Sim. A coleção tem classificação AC5 e resistência à água e aos salpicos durante 100 h+, de acordo com a especificação do fabricante.' },
      { question: 'Qual é a garantia do pavimento?', answer: 'A garantia indicada pelo fabricante é de 25 anos, sujeita às condições de utilização e instalação do produto.' },
      { question: 'Fazem entrega e aplicação em Coimbra, Aveiro e Leiria?', answer: 'Sim. A entrega regular é gratuita na Região Centro e a aplicação pode ser solicitada em separado. Para outras zonas, é necessário confirmar previamente a disponibilidade.' },
    ],
    links: [{ href: '/loja?categoria=flutuante', label: 'Ver flutuantes na loja' }, { href: '/vinilico', label: 'Ver pavimento vinílico' }, { href: '/instalacao-rodapes-coimbra', label: 'Ver instalação de rodapés' }, { href: '/contactos', label: 'Pedir informação' }],
  },
  rodapes: {
    title: 'Rodapés PVC | Preços, Venda e Aplicação',
    description: 'Rodapés PVC com preços publicados, compra online e serviço de aplicação na Região Centro. Rodapés em madeira sob consulta.',
    topics: ['rodapés PVC Coimbra', 'rodapé branco', 'comprar rodapés Coimbra', 'aplicação de rodapés Coimbra', 'rodapé em madeira Coimbra'],
    type: 'CollectionPage',
    serviceType: 'Venda e aplicação de rodapés PVC',
    heading: 'Rodapés PVC — venda e aplicação',
    intro: `Rodapé PVC branco a ${whiteSkirtingPrice} €/m e restantes cores a ${colourSkirtingPrice} €/m, com IVA incluído. Entrega e aplicação disponíveis na Região Centro.`,
    facts: [`Rodapé branco: ${whiteSkirtingPrice} €/m`, `Rodapés com cor: ${colourSkirtingPrice} €/m`, 'Entrega gratuita na Região Centro'],
    links: [{ href: '/loja?categoria=rodape', label: 'Ver rodapés na loja' }, { href: '/instalacao-rodapes-coimbra', label: 'Instalação de rodapés' }, { href: '/contactos', label: 'Pedir informação' }],
  },
  cozinha: {
    title: 'Cozinhas por Medida | Fabrico e Montagem',
    description: 'Cozinhas por medida: levantamento, proposta, fabrico e montagem. Materiais, ferragens, preço e prazo definidos por escrito.',
    topics: ['cozinhas por medida Coimbra', 'fabrico de cozinhas Coimbra', 'montagem de cozinhas Coimbra', 'carpinteiro para cozinhas Coimbra'],
    serviceType: 'Projeto, fabrico e montagem de cozinhas por medida',
    heading: 'Cozinhas por medida',
    intro: 'A CarpiMater recolhe as medidas, prepara a proposta e coordena o fabrico e a montagem de cozinhas por medida na Região Centro.',
    facts: ['Levantamento de medidas', 'Proposta com materiais e preço', 'Fabrico por medida', 'Montagem em obra'],
    faqs: kitchenFaqs,
    links: [{ href: '/montagem-cozinhas-coimbra', label: 'Montagem de cozinhas' }, { href: '/roupeiros-por-medida-coimbra', label: 'Roupeiros por medida' }, { href: '/contactos', label: 'Pedir proposta' }, { href: '/construcao', label: 'Ver carpintaria para obras' }],
  },
  construcao: {
    title: 'Carpintaria para Obras | Fornecimento e Montagem',
    description: 'Carpinteiros para obras, remodelações e empreiteiros: pavimentos, cozinhas, roupeiros, portas e marcenaria na Região Centro.',
    topics: ['carpintaria em Coimbra', 'carpinteiros para obras', 'carpintaria por medida', 'marcenaria', 'remodelações'],
    serviceType: 'Carpintaria por medida para construção e remodelação',
    heading: 'Carpintaria para obras e remodelações',
    intro: 'Fornecimento e montagem de cozinhas, roupeiros, portas, pavimentos e outros trabalhos de carpintaria para particulares, empresas e empreiteiros na Região Centro.',
    facts: ['Levantamento em obra', 'Proposta de materiais e trabalhos', 'Fabrico por medida', 'Montagem em obra'],
    links: [{ href: '/cozinha', label: 'Ver cozinhas por medida' }, { href: '/montagem-cozinhas-coimbra', label: 'Montagem de cozinhas' }, { href: '/roupeiros-por-medida-coimbra', label: 'Roupeiros por medida' }, { href: '/instalacao-rodapes-coimbra', label: 'Instalação de rodapés' }, { href: '/contactos', label: 'Pedir informação' }],
  },
  contactos: {
    title: 'Pavimentos e Carpintaria | Contactos',
    description: 'Contacte a CarpiMater para comprar pavimentos e rodapés ou pedir aplicação e trabalhos de carpintaria na Região Centro.',
    topics: ['carpinteiro em Coimbra', 'loja de pavimentos', 'aplicação de pavimentos', 'rodapés PVC'],
    type: 'ContactPage',
    heading: 'Contactar a CarpiMater',
    intro: 'Contacte-nos para comprar pavimentos e rodapés, pedir aplicação ou solicitar trabalhos de carpintaria por medida na Região Centro.',
    facts: ['Telefone: 910 093 635', 'E-mail: tomas.a.barros@hotmail.com', 'Atuação regular na Região Centro'],
    links: [{ href: '/loja', label: 'Abrir a loja online' }, { href: '/vinilico', label: 'Ver pavimento vinílico' }, { href: '/flutuante', label: 'Ver flutuante híbrido' }],
  },
  encomenda: {
    title: 'Finalizar Encomenda | CarpiMater',
    description: 'Finalize com segurança a sua encomenda de pavimentos e rodapés CarpiMater.',
    type: 'CheckoutPage',
    index: false,
  },
  'politica-de-privacidade': {
    title: 'Política de Privacidade | CarpiMater',
    description: 'Política de privacidade e proteção de dados da CarpiMater.',
    index: false,
  },
  'termos-e-condicoes': {
    title: 'Termos e Condições de Venda | CarpiMater',
    description: 'Termos aplicáveis às encomendas de pavimentos e rodapés na loja online CarpiMater.',
    index: false,
  },
}

for (const service of localServices) {
  pages[service.slug] = {
    title: service.metaTitle,
    description: service.metaDescription,
    topics: service.searchTopics,
    serviceType: service.serviceType,
    heading: service.title,
    intro: service.intro,
    facts: service.highlights,
    faqs: service.faqs,
    links: service.relatedLinks,
    image: `${siteUrl}${service.image}`,
    imageAlt: service.imageAlt,
  }
}

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function escapeHtml(value) {
  return escapeAttribute(String(value)).replaceAll("'", '&#39;')
}

function renderStaticContent(page) {
  if (!page.heading) return ''

  const facts = page.facts?.length
    ? `<section><h2>Informação principal</h2><ul>${page.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')}</ul></section>`
    : ''
  const faqs = page.faqs?.length
    ? `<section><h2>Perguntas frequentes</h2>${page.faqs.map((faq) => `<article><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></article>`).join('')}</section>`
    : ''
  const links = page.links?.length
    ? `<nav aria-label="Ligações relacionadas"><h2>Ver também</h2><ul>${page.links.map((link) => `<li><a href="${escapeAttribute(link.href)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul></nav>`
    : ''

  return `<main data-static-seo-content style="max-width:72rem;margin:0 auto;padding:3rem 1.25rem;font-family:system-ui,sans-serif;color:#19242e;line-height:1.65"><header><a href="/" style="font-weight:800;color:#19242e">CarpiMater</a></header><h1 style="max-width:52rem;margin-top:2rem">${escapeHtml(page.heading)}</h1><p style="max-width:52rem">${escapeHtml(page.intro || page.description)}</p>${facts}${faqs}${links}</main>`
}

function replaceMeta(html, attribute, key, content) {
  const expression = new RegExp(`<meta ${attribute}="${key}" content="[^"]*" \\/>`)
  return html.replace(expression, `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`)
}

for (const [slug, page] of Object.entries(pages)) {
  const canonical = `${siteUrl}/${slug}`
  const robots = page.index === false
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const pageSchema = {
    '@type': page.type || 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: page.title,
    description: page.description,
    ...(page.topics ? {
      keywords: page.topics.join(', '),
      about: [
        { '@id': `${siteUrl}/#business` },
        ...page.topics.map((name) => ({ '@type': 'Thing', name })),
      ],
    } : { about: { '@id': `${siteUrl}/#business` } }),
    inLanguage: 'pt-PT',
    isPartOf: { '@id': `${siteUrl}/#website` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: page.image || `${siteUrl}/images/pavimento-vinilico-sala-coimbra.png`,
    },
    ...(slug === 'loja' ? { mainEntity: { '@id': `${siteUrl}/loja#ofertas` } } : {}),
    ...(page.serviceType ? { mainEntity: { '@id': `${canonical}#service` } } : {}),
  }
  const graph = [
    ...(page.index === false ? [] : [websiteSchema, businessSchema]),
    pageSchema,
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.title.split('|')[0].trim(), item: canonical },
      ],
    },
  ]

  if (slug === 'loja') graph.push(offerCatalog)
  if (page.serviceType) {
    graph.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: page.serviceType,
      serviceType: page.serviceType,
      provider: { '@id': `${siteUrl}/#business` },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Região Centro, Portugal' },
        ...cityNames.map((name) => ({ '@type': 'City', name })),
      ],
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: canonical,
        servicePhone: '+351 910 093 635',
      },
    })
  }
  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    })
  }
  const structuredData = { '@context': 'https://schema.org', '@graph': graph }

  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
  html = replaceMeta(html, 'name', 'description', page.description)
  html = replaceMeta(html, 'name', 'robots', robots)
  html = replaceMeta(html, 'name', 'googlebot', robots)
  html = replaceMeta(html, 'property', 'og:url', canonical)
  html = replaceMeta(html, 'property', 'og:title', page.title)
  html = replaceMeta(html, 'property', 'og:description', page.description)
  html = replaceMeta(html, 'property', 'og:image', page.image || `${siteUrl}/images/pavimento-vinilico-sala-coimbra.png`)
  html = replaceMeta(html, 'property', 'og:image:alt', page.imageAlt || 'CarpiMater — pavimentos, rodapés e carpintaria')
  html = replaceMeta(html, 'name', 'twitter:title', page.title)
  html = replaceMeta(html, 'name', 'twitter:description', page.description)
  html = replaceMeta(html, 'name', 'twitter:image', page.image || `${siteUrl}/images/pavimento-vinilico-sala-coimbra.png`)
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
  html = html.replace(
    /<script id="seo-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="seo-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`,
  )
  html = html.replace(
    /<div id="root">[\s\S]*?<\/body>/,
    `<div id="root">${renderStaticContent(page)}</div>\n  </body>`,
  )

  const pageDir = join(outputDir, slug)
  await mkdir(pageDir, { recursive: true })
  await writeFile(join(pageDir, 'index.html'), html)
  await writeFile(join(outputDir, `${slug}.html`), html)
}

console.log(`Generated ${Object.keys(pages).length} SEO route pages.`)
