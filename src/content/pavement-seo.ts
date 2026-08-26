import { PRECO_FLUTUANTE_HIBRIDO_M2, PRECO_VINILICO_SPC_M2 } from '@/content/precos-materiais'

export type PavementSeoVariant = 'vinilico' | 'flutuante'

export interface PavementSeoContent {
  heading: string
  intro: string
  facts: Array<{ label: string; value: string }>
  faqs: Array<{ question: string; answer: string }>
}

const formatPrice = (price: number) => price.toLocaleString('pt-PT', {
  minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  maximumFractionDigits: 2,
})

const vinylPrice = formatPrice(PRECO_VINILICO_SPC_M2)
const hybridPrice = formatPrice(PRECO_FLUTUANTE_HIBRIDO_M2)

export const PAVEMENT_SEO_CONTENT: Record<PavementSeoVariant, PavementSeoContent> = {
  vinilico: {
    heading: 'Comprar pavimento vinílico na Região Centro',
    intro: `A CarpiMater vende pavimento vinílico SPC a ${vinylPrice} €/m², com IVA incluído. Entregamos gratuitamente na Região Centro e prestamos também serviço de aplicação e assentamento em Coimbra, Aveiro, Leiria e localidades próximas.`,
    facts: [
      { label: 'Pavimento vinílico SPC', value: `${vinylPrice} €/m², IVA incluído` },
      { label: 'Entrega', value: 'Gratuita na Região Centro' },
      { label: 'Aplicação', value: 'Estimativa separada antes de avançar' },
      { label: 'Garantia do fabricante', value: '25 anos' },
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
  },
  flutuante: {
    heading: 'Flutuante híbrido resistente à água na Região Centro',
    intro: `A CarpiMater vende pavimento flutuante híbrido AC5 a ${hybridPrice} €/m², com IVA incluído, resistência à água 100 h+ e garantia do fabricante de 25 anos. A entrega é gratuita na Região Centro e o serviço de aplicação pode ser pedido em separado.`,
    facts: [
      { label: 'Flutuante híbrido AC5', value: `${hybridPrice} €/m², IVA incluído` },
      { label: 'Resistência à água', value: '100 h+' },
      { label: 'Entrega', value: 'Gratuita na Região Centro' },
      { label: 'Garantia do fabricante', value: '25 anos' },
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
  },
}
