import type { SiteVariant } from '@/content/site'

/**
 * ============================================================
 * PERGUNTAS FREQUENTES (FAQ)
 * ============================================================
 *
 * Edite aqui as perguntas e respostas da secção "Dúvidas Frequentes".
 *
 *   - question → texto da pergunta
 *   - answer   → texto da resposta
 *
 * Para ADICIONAR uma pergunta: copie um objeto { question, answer } e edite.
 * Para REMOVER uma pergunta:   apague o objeto inteiro.
 * ============================================================
 */

export interface FaqItem {
  /** Texto da pergunta */
  question: string
  /** Texto da resposta */
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    question: 'O orçamento é final?',
    answer: 'Não. A simulação apresenta uma estimativa com base nas medidas indicadas. O valor final da aplicação é confirmado depois de avaliarmos o local ou as fotografias enviadas.',
  },
  {
    question: 'Trabalham fora da Região Centro?',
    answer: 'A nossa área de atuação regular é a Região Centro. Para pedidos noutras zonas do país, contacte-nos primeiro para confirmarmos a disponibilidade e as condições do serviço.',
  },
  {
    question: 'O preço inclui a aplicação?',
    answer: 'Não. Os preços apresentados na loja referem-se apenas aos materiais e não incluem a aplicação. Na finalização da encomenda pode solicitar a aplicação e consultar uma estimativa separada desse serviço. O valor final é confirmado após avaliarmos as condições da obra.',
  },
  {
    question: 'É possível aplicar sobre cerâmica?',
    answer: 'Sim, se a cerâmica estiver firme, nivelada e sem peças soltas. Quando a base precisa de preparação ou nivelamento, esse trabalho é avaliado e orçamentado à parte.',
  },
  {
    question: 'O que acontece se o meu chão não estiver em condições?',
    answer: 'Pode ser necessário preparar ou nivelar a base antes da aplicação. Confirmamos esse trabalho e o respetivo custo depois de avaliar o local.',
  },
  {
    question: 'A visita técnica está incluída?',
    answer: 'Quando a visita técnica for necessária, combinamos consigo as condições antes da deslocação. A obra só avança depois da aprovação da proposta.',
  },
  {
    question: 'Os perfis de transição são da mesma cor do chão?',
    answer: 'Depende do modelo escolhido e da disponibilidade dos perfis. Confirmamos as opções de cor e acabamento antes da encomenda.',
  },
]

const FAQS_COZINHA: FaqItem[] = [
  {
    question: 'Fazem cozinhas novas e alterações a cozinhas existentes?',
    answer: 'Fazemos cozinhas por medida e analisamos alterações ou reparações em cozinhas existentes. Envie fotografias e uma descrição do trabalho.',
  },
  {
    question: 'Fazem cozinhas totalmente por medida?',
    answer: 'Sim. Cada cozinha é desenvolvida à medida, em conversa com o cliente, para adaptar distribuição, arrumação, acabamentos e ergonomia ao espaço real.',
  },
  {
    question: 'Onde é feito o fabrico?',
    answer: 'O fabrico é realizado em Paços de Ferreira, em articulação com carpintaria parceira, seguindo o desenho técnico desenvolvido por nós.',
  },
  {
    question: 'Como funciona o processo desde o primeiro contacto?',
    answer: 'Começamos com briefing e levantamento de necessidades, avançamos para desenho e proposta, validamos tecnicamente no local e seguimos para fabrico e montagem.',
  },
  {
    question: 'Como é definido o preço?',
    answer: 'O preço depende das medidas, materiais, ferragens e trabalhos de montagem. Esses elementos são indicados na proposta.',
  },
  {
    question: 'Qual é o valor da adjudicação?',
    answer: 'A adjudicação corresponde a 60% do valor acordado do projeto, permitindo iniciar produção e calendarização da montagem.',
  },
  {
    question: 'Qual é o prazo médio após adjudicação?',
    answer: 'O prazo após adjudicação é de até 3 meses, incluindo fabrico e entrega. Pode variar com a complexidade do projeto e agenda de montagem.',
  },
  {
    question: 'Têm em conta humidades e especificidades da casa?',
    answer: 'Sim. Durante o levantamento verificamos as condições visíveis do espaço e indicamos as soluções previstas na proposta.',
  },
]

export function getFaqsByVariant(variant: SiteVariant): FaqItem[] {
  if (variant === 'cozinha') return FAQS_COZINHA
  if (variant === 'vinilico') return FAQS

  return FAQS.map((faq) => ({
    ...faq,
    answer: faq.answer
      .replace(/pavimento vinílico/gi, 'pavimento flutuante híbrido')
      .replace(/vinílico/gi, 'flutuante híbrido')
      .replace(/vinílicos/gi, 'flutuantes híbridos'),
  }))
}
