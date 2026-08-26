import { PRECO_FLUTUANTE_HIBRIDO_M2, PRECO_VINILICO_SPC_M2 } from '@/content/precos-materiais'

export type PavementSeoVariant = 'vinilico' | 'flutuante'

export interface PavementSeoContent {
  heading: string
  intro: string
  facts: Array<{ label: string; value: string }>
  details: Array<{ title: string; text: string; items?: string[] }>
  faqs: Array<{ question: string; answer: string }>
  storeHref: string
}

const formatPrice = (price: number) => price.toLocaleString('pt-PT', {
  minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  maximumFractionDigits: 2,
})

const vinylPrice = formatPrice(PRECO_VINILICO_SPC_M2)
const hybridPrice = formatPrice(PRECO_FLUTUANTE_HIBRIDO_M2)

export const PAVEMENT_SEO_CONTENT: Record<PavementSeoVariant, PavementSeoContent> = {
  vinilico: {
    heading: 'Pavimento vinílico SPC: preço e aplicação',
    intro: `A CarpiMater vende pavimento vinílico SPC a ${vinylPrice} €/m², com IVA incluído. Entregamos gratuitamente na Região Centro e prestamos também serviço de aplicação em Coimbra, Aveiro, Leiria e localidades próximas.`,
    facts: [
      { label: 'Pavimento vinílico SPC', value: `${vinylPrice} €/m², IVA incluído` },
      { label: 'Entrega', value: 'Gratuita na Região Centro' },
      { label: 'Aplicação', value: 'Estimativa separada antes de avançar' },
      { label: 'Garantia do fabricante', value: '25 anos' },
    ],
    details: [
      {
        title: 'Preço do material e da aplicação',
        text: `O material custa ${vinylPrice} €/m², com IVA incluído, e é vendido por caixas inteiras. A aplicação não está incluída neste preço: é apresentada numa estimativa separada, de acordo com a área e com as condições do pavimento existente.`,
      },
      {
        title: 'Aplicação sobre cerâmica',
        text: 'A aplicação sobre cerâmica pode ser possível quando a base está firme, limpa, seca e suficientemente regular. Antes da obra confirmamos o estado das juntas, desníveis e zonas soltas. Se for necessária preparação ou regularização, esse trabalho é indicado à parte.',
      },
      {
        title: 'Vantagens e limitações do SPC',
        text: 'O vinílico SPC é impermeável, fácil de limpar e adequado às diferentes divisões da casa. O resultado depende, no entanto, de uma base regular, das folgas corretas e de uma aplicação conforme as instruções do fabricante.',
      },
      {
        title: 'Rodapés, perfis e desperdício',
        text: 'A quantidade de pavimento pode incluir 10% adicionais para cortes e desperdícios. Rodapés, perfis e outros remates são escolhidos e calculados separadamente para que o cliente perceba cada parcela.',
      },
    ],
    faqs: [
      {
        question: 'Qual é o preço do pavimento vinílico SPC?',
        answer: `O preço publicado é ${vinylPrice} €/m², com IVA incluído. A compra é calculada por caixas inteiras de acordo com a área indicada.`,
      },
      {
        question: 'A entrega é gratuita em Coimbra, Aveiro e Leiria?',
        answer: 'A entrega regular é gratuita na Região Centro, incluindo Coimbra, Aveiro, Leiria e localidades próximas. Outras zonas dependem de contacto e disponibilidade.',
      },
      {
        question: 'A CarpiMater faz o assentamento do pavimento?',
        answer: 'Sim. O serviço de aplicação pode ser pedido com o material. A estimativa é apresentada separadamente e o valor final depende das condições encontradas em obra.',
      },
      {
        question: 'Quanto material devo encomendar?',
        answer: 'Indique a área real. A loja permite acrescentar 10% para cortes e desperdícios, uma margem normalmente recomendada para a aplicação.',
      },
    ],
    storeHref: '/loja?categoria=vinilico#catalogo-loja',
  },
  flutuante: {
    heading: 'Pavimento flutuante híbrido: fornecimento e aplicação',
    intro: `A CarpiMater vende pavimento flutuante híbrido AC5 a ${hybridPrice} €/m², com IVA incluído, resistência à água 100 h+ e garantia do fabricante de 25 anos. A entrega é gratuita na Região Centro e o serviço de aplicação pode ser pedido em separado.`,
    facts: [
      { label: 'Flutuante híbrido AC5', value: `${hybridPrice} €/m², IVA incluído` },
      { label: 'Resistência à água', value: '100 h+' },
      { label: 'Entrega', value: 'Gratuita na Região Centro' },
      { label: 'Garantia do fabricante', value: '25 anos' },
    ],
    details: [
      {
        title: 'Preço do material e da aplicação',
        text: `O flutuante híbrido custa ${hybridPrice} €/m², com IVA incluído, e é vendido por caixas inteiras. O serviço de aplicação é opcional e aparece numa estimativa separada do valor do material.`,
      },
      {
        title: 'Resistência à água 100 h+',
        text: 'A coleção tem classificação AC5 e resistência à água e aos salpicos durante 100 h+, segundo a informação do fabricante. Essa característica não dispensa a limpeza de derrames nem substitui as condições de instalação e manutenção.',
      },
      {
        title: 'Base e subpavimento',
        text: 'Antes de instalar confirmamos se o pavimento existente está firme, seco e regular. O subpavimento e qualquer preparação necessária são calculados de acordo com a área e com as condições encontradas.',
      },
      {
        title: 'Rodapés e remates',
        text: 'Pode escolher rodapés PVC na loja ou pedir rodapés em madeira sob consulta. Perfis, transições, cortes e outros remates são confirmados para cada obra.',
      },
    ],
    faqs: [
      {
        question: 'Qual é o preço do pavimento flutuante híbrido?',
        answer: `O preço publicado é ${hybridPrice} €/m², com IVA incluído. Pode consultar os acabamentos e calcular a quantidade na loja online.`,
      },
      {
        question: 'O pavimento flutuante híbrido é resistente à água?',
        answer: 'Sim. A coleção tem classificação AC5 e resistência à água e aos salpicos durante 100 h+, de acordo com a especificação do fabricante.',
      },
      {
        question: 'Qual é a garantia do pavimento?',
        answer: 'A garantia indicada pelo fabricante é de 25 anos, sujeita às condições de utilização e instalação do produto.',
      },
      {
        question: 'Fazem entrega e aplicação em Coimbra, Aveiro e Leiria?',
        answer: 'Sim. A entrega regular é gratuita na Região Centro e a aplicação pode ser solicitada em separado. Para outras zonas, é necessário confirmar previamente a disponibilidade.',
      },
    ],
    storeHref: '/loja?categoria=flutuante#catalogo-loja',
  },
}
