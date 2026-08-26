import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const siteUrl = 'https://carpimater.pt'
const outputDir = join(process.cwd(), 'dist')
const template = await readFile(join(outputDir, 'index.html'), 'utf8')
const materialPricesSource = await readFile(join(process.cwd(), 'src/content/precos-materiais.ts'), 'utf8')

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

const pages = {
  loja: {
    title: 'Loja de Pavimentos Híbridos, Vinílicos e Rodapés | CarpiMater',
    description: 'Descubra pavimentos vinílicos SPC, flutuante híbrido ZCUDO NextCore e rodapés PVC. Entrega e aplicação em Coimbra, Aveiro, Leiria e Região Centro.',
    topics: ['loja de pavimentos online', 'pavimentos vinílicos SPC', 'pavimento flutuante híbrido ZCUDO', 'ZCUDO NextCore', 'pavimentos laminados resistentes à água', 'rodapés PVC', 'preços de pavimentos'],
    type: 'CollectionPage',
  },
  vinilico: {
    title: `Pavimento Vinílico SPC a ${vinylPrice} €/m² em Coimbra | CarpiMater`,
    description: `Vinílico SPC a ${vinylPrice} €/m², IVA incluído. Entrega gratuita na Região Centro e aplicação disponível. Encomende online e veja também flutuante híbrido.`,
    topics: ['pavimento vinílico', 'pavimento vinílico SPC', 'pavimento impermeável', 'aplicação de pavimento vinílico em Coimbra'],
  },
  flutuante: {
    title: `Pavimento Flutuante Híbrido a ${hybridPrice} €/m² | Coimbra`,
    description: `Flutuante híbrido AC5 a ${hybridPrice} €/m², resistente à água 100 h+ e com garantia de 25 anos. Entrega gratuita na Região Centro e serviço de aplicação.`,
    topics: ['pavimento flutuante híbrido', 'ZCUDO NextCore', 'pavimento laminado híbrido', 'pavimento AC5', 'pavimento resistente à água', 'aplicação de pavimento em Coimbra'],
  },
  rodapes: {
    title: 'Rodapés PVC em Coimbra | Preços e Compra Online',
    description: 'Rodapés PVC com preços publicados, vários acabamentos e compra online por barras. Entrega ou aplicação profissional em Coimbra, Aveiro, Leiria e arredores.',
    topics: ['rodapé', 'rodapés', 'rodapé PVC', 'rodapé branco', 'aplicação de rodapés em Coimbra'],
    type: 'CollectionPage',
  },
  cozinha: {
    title: 'Cozinhas por Medida em Coimbra | Carpinteiros CarpiMater',
    description: 'Projeto, fabrico e montagem de cozinhas por medida por profissionais de carpintaria. Atuação regular em Coimbra, Aveiro, Leiria e na Região Centro.',
    topics: ['cozinhas por medida em Coimbra', 'carpinteiro em Coimbra', 'fabrico de cozinhas', 'montagem de cozinhas'],
  },
  construcao: {
    title: 'Carpintaria para Obras em Coimbra e Região Centro',
    description: 'Carpinteiros para obras, remodelações e empreiteiros: pavimentos, cozinhas, roupeiros, portas e marcenaria em Coimbra, Aveiro, Leiria e arredores.',
    topics: ['carpintaria em Coimbra', 'carpinteiros para obras', 'carpintaria por medida', 'marcenaria', 'remodelações'],
  },
  contactos: {
    title: 'Pavimentos e Carpintaria em Coimbra | Contactos',
    description: 'Contacte a CarpiMater para comprar pavimentos e rodapés ou pedir aplicação e trabalhos de carpintaria em Coimbra, Aveiro, Leiria e arredores.',
    topics: ['carpinteiro em Coimbra', 'loja de pavimentos', 'aplicação de pavimentos', 'rodapés PVC'],
    type: 'ContactPage',
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

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
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
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: page.title.split('|')[0].trim(), item: canonical },
        ],
      },
    ],
  }

  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
  html = replaceMeta(html, 'name', 'description', page.description)
  html = replaceMeta(html, 'name', 'robots', robots)
  html = replaceMeta(html, 'name', 'googlebot', robots)
  html = replaceMeta(html, 'property', 'og:url', canonical)
  html = replaceMeta(html, 'property', 'og:title', page.title)
  html = replaceMeta(html, 'property', 'og:description', page.description)
  html = replaceMeta(html, 'name', 'twitter:title', page.title)
  html = replaceMeta(html, 'name', 'twitter:description', page.description)
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
  html = html.replace(
    /<script id="seo-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="seo-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`,
  )

  const pageDir = join(outputDir, slug)
  await mkdir(pageDir, { recursive: true })
  await writeFile(join(pageDir, 'index.html'), html)
  await writeFile(join(outputDir, `${slug}.html`), html)
}

console.log(`Generated ${Object.keys(pages).length} SEO route pages.`)
