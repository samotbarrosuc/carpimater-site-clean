import type { SiteVariant } from '@/content/site'

/**
 * ============================================================
 * COMO FUNCIONA — PASSOS DO PROCESSO
 * ============================================================
 *
 * Edite aqui os passos exibidos na secção "Como funciona".
 *
 *   - number      → número do passo (exibido no crachá)
 *   - title       → título curto do passo
 *   - description → descrição do passo
 *
 * NOTA: A ordem dos objetos nesta lista define a ordem de exibição.
 *       Os ícones de cada passo são definidos no componente HowItWorks.tsx.
 * ============================================================
 */

export interface StepData {
  /** Número exibido no crachá do passo (ex: '1', '2') */
  number: string
  /** Título curto */
  title: string
  /** Descrição do passo */
  description: string
}

export const STEPS_DATA: StepData[] = [
  {
    number: '1',
    title: 'Seleccione o pavimento',
    description: 'Selecione o modelo e a tonalidade do seu novo pavimento no nosso catálogo.',
  },
  {
    number: '2',
    title: 'Indique as medidas',
    description: 'Preencha as medidas e outros dados no nosso simulador online.',
  },
  {
    number: '3',
    title: 'Receba o orçamento',
    description: 'Obtenha um valor imediato estimado para o fornecimento e/ou aplicação.',
  },
  {
    number: '4',
    title: 'Aguarde-nos para breve',
    description: 'Depois de confirmado, iniciamos a obra, em data a agendar com o cliente.',
  },
]

const STEPS_DATA_COZINHA: StepData[] = [
  {
    number: '1',
    title: 'Briefing com o cliente',
    description: 'Recolhemos necessidades, gostos, orçamento e condicionantes do espaço (incluindo humidades).',
  },
  {
    number: '2',
    title: 'Desenho e proposta',
    description: 'Criamos o desenho técnico e apresentamos uma proposta competitiva e ajustada ao projeto.',
  },
  {
    number: '3',
    title: 'Adjudicação e produção',
    description: 'Com adjudicação de 60%, avançamos para fabrico em Paços de Ferreira com carpintaria parceira.',
  },
  {
    number: '4',
    title: 'Montagem final',
    description: 'Instalamos a cozinha e finalizamos detalhes. Prazo após adjudicação: até 3 meses, fabrico e entrega incluídos.',
  },
]

export function getStepsByVariant(variant: SiteVariant): StepData[] {
  if (variant === 'cozinha') return STEPS_DATA_COZINHA
  return STEPS_DATA
}
