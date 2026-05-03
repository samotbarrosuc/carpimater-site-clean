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
    answer: 'Não. A simulação automática é uma estimativa precisa baseada nas medidas fornecidas. O orçamento final é fechado apenas após validação presencial do local ou análise detalhada de fotografias.',
  },
  {
    question: 'Trabalham em todo o distrito de Coimbra?',
    answer: 'Sim, prestamos serviço exclusivamente e em todos os concelhos do distrito de Coimbra, bem como em concelhos limítrofes dos distritos de Aveiro e Leiria. Consulte o simulador para verificar a cobertura na sua zona.',
  },
  {
    question: 'O preço inclui a aplicação?',
    answer: 'Sim. Todos os nossos preços e estimativas incluem o fornecimento do material (pavimento, rodapés, perfis) e a mão de obra de aplicação profissional.',
  },
  {
    question: 'É possível aplicar sobre cerâmica?',
    answer: 'Sim, nalguns casos. O pavimento vinílico (SPC) rígido pode ser aplicado directamente sobre cerâmica desde que a superfície esteja em bom estado, nivelada e sem peças soltas. Muitas vezes isto não é possível, e terá que se proceder previamente ao nivelamento do piso, com autonivelante. Este serviço é orçamentado à parte. Avaliamos sempre o estado da base antes de iniciar.',
  },
  {
    question: 'O que acontece se o meu chão não estiver em condições?',
    answer: 'Nesse caso, poderá ser necessária uma preparação prévia da base, como nivelamento com argamassa autonivelante. Este serviço tem um custo adicional que será incluído no orçamento final após avaliação presencial.',
  },
  {
    question: 'A visita técnica está incluída?',
    answer: 'Sim, a visita técnica para tirar medidas exatas e avaliar a base é totalmente gratuita e sem compromisso. Só avançamos para obra após a sua aprovação do orçamento final.',
  },
  {
    question: 'Os perfis de transição são da mesma cor do chão?',
    answer: 'Sim! Um dos nossos diferenciais é oferecermos perfis de transição exatamente na mesma cor e textura do pavimento escolhido, garantindo um acabamento premium em cada passagem de porta.',
  },
]

const FAQS_COZINHA: FaqItem[] = [
  {
    question: 'A CarpiMater faz cozinhas novas e também resolve questões de cozinhas existentes?',
    answer: 'Sim. Fazemos cozinhas por medida e oferecemos soluções para cozinhas já existentes, com carpinteiros especializados que trabalham para o seu conforto e segurança.',
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
    question: 'Têm preços competitivos?',
    answer: 'Sim. Trabalhamos com preços competitivos face ao mercado, mantendo um padrão de qualidade elevado em materiais e execução.',
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
    answer: 'Sim. O projeto técnico considera condições do espaço, incluindo humidades, ventilação e utilização diária, para garantir durabilidade e bom desempenho.',
  },
]

export function getFaqsByVariant(variant: SiteVariant): FaqItem[] {
  if (variant === 'cozinha') return FAQS_COZINHA
  if (variant === 'vinilico') return FAQS

  return FAQS.map((faq) => ({
    ...faq,
    answer: faq.answer
      .replace(/pavimento vinílico/gi, 'pavimento flutuante')
      .replace(/vinílico/gi, 'flutuante')
      .replace(/vinílicos/gi, 'flutuantes')
      .replace(/25 anos/gi, '20 anos'),
  }))
}
