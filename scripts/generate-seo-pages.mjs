import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const siteUrl = 'https://carpimater.pt'
const outputDir = join(process.cwd(), 'dist')
const template = await readFile(join(outputDir, 'index.html'), 'utf8')

const pages = {
  loja: {
    title: 'Loja de Pavimentos Vinílicos e Rodapés | Preços Online',
    description: 'Compre pavimentos vinílicos SPC e rodapés PVC online, com preços publicados e IVA incluído. Entrega e aplicação em Coimbra, Aveiro, Leiria e região Centro.',
    type: 'CollectionPage',
  },
  pavimentos: {
    title: 'Pavimentos Vinílicos, Flutuantes e Madeira | Coimbra',
    description: 'Compare pavimentos vinílicos, flutuantes, laminados e soluções com acabamento de madeira. Loja online e aplicação profissional em Coimbra, Aveiro e Leiria.',
  },
  vinilico: {
    title: 'Pavimento Vinílico em Coimbra | Loja e Aplicação',
    description: 'Pavimento vinílico SPC com preços online, compra por caixas e aplicação profissional. Serviço em Coimbra, Aveiro, Leiria, Condeixa e Figueira da Foz.',
  },
  flutuante: {
    title: 'Pavimento Flutuante, Laminado e Madeira | Coimbra',
    description: 'Pavimentos flutuantes, laminados e com acabamento de madeira para salas e quartos. Fornecimento e aplicação em Coimbra, Aveiro, Leiria e arredores.',
  },
  rodapes: {
    title: 'Rodapés PVC em Coimbra | Preços e Compra Online',
    description: 'Rodapés PVC com preços publicados, vários acabamentos e compra online por barras. Entrega ou aplicação profissional em Coimbra, Aveiro, Leiria e arredores.',
    type: 'CollectionPage',
  },
  cozinha: {
    title: 'Cozinhas por Medida em Coimbra | Carpinteiros CarpiMater',
    description: 'Projeto, fabrico e montagem de cozinhas por medida por profissionais de carpintaria. Atuação regular em Coimbra, Aveiro, Leiria e na Região Centro.',
  },
  construcao: {
    title: 'Carpintaria para Obras em Coimbra e Região Centro',
    description: 'Carpinteiros para obras, remodelações e empreiteiros: pavimentos, cozinhas, roupeiros, portas e marcenaria em Coimbra, Aveiro, Leiria e arredores.',
  },
  contactos: {
    title: 'Pavimentos e Carpintaria em Coimbra | Contactos',
    description: 'Contacte a CarpiMater para comprar pavimentos e rodapés ou pedir aplicação e trabalhos de carpintaria em Coimbra, Aveiro, Leiria e arredores.',
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
        inLanguage: 'pt-PT',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#business` },
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
