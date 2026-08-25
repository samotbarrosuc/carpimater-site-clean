/**
 * NOMES DOS MATERIAIS DA LOJA
 *
 * Altere apenas o texto à direita de cada referência.
 * O nome será atualizado no catálogo, no carrinho, no checkout,
 * nos dados estruturados e no email da encomenda.
 */

/** Pavimentos vinílicos SPC. */
export const NOMES_VINILICOS = {
  'VIN-001': 'Carvalho Mel',
  'VIN-002': 'Carvalho Nogal',
  'VIN-003': 'Eucalipto',
  'VIN-004': 'Oliveira',
  'VIN-005': 'Tanzânia Almond',
  'VIN-006': 'Tanzânia Coconut',
  'VIN-007': 'Tanzânia Grey',
  'VIN-008': 'Tanzânia Natural',
  'VIN-009': 'Tanzânia Silver',
  'VIN-TAR-001': 'Tarkett (sob consulta)',
  'VIN-FOR-001': 'Forbo (sob consulta)',
} as const

/** Pavimentos flutuantes híbridos. */
export const NOMES_FLUTUANTES_HIBRIDOS = {
  'ZCU-NC95-PINGO': 'Pingo',
  'ZCU-NC95-TOTS': 'Tots',
  'ZCU-NC95-MOKA': 'Moka',
  'ZCU-NC115-ARQ': 'Arq',
  'ZCU-NC115-GRISACIO': 'Grisácio',
  'ZCU-NC115-TORRADO': 'Torrado',
  'ZCU-NC115-MEL': 'Mel',
} as const

/** Rodapés em PVC e madeira. */
export const NOMES_RODAPES = {
  'ROD-001': 'Branco Liso',
  'ROD-011': 'Rodapé em madeira',
  'ROD-002': 'Carvalho Mel',
  'ROD-003': 'Carvalho Nogal',
  'ROD-004': 'Eucalipto',
  'ROD-005': 'Oliveira',
  'ROD-006': 'Tanzânia Almond',
  'ROD-007': 'Tanzânia Coconut',
  'ROD-008': 'Tanzânia Grey',
  'ROD-009': 'Tanzânia Natural',
  'ROD-010': 'Tanzânia Silver',
} as const

export const NOMES_MATERIAIS_POR_REFERENCIA: Record<string, string> = {
  ...NOMES_VINILICOS,
  ...NOMES_FLUTUANTES_HIBRIDOS,
  ...NOMES_RODAPES,
}

export function getNomeMaterial(reference: string): string | undefined {
  return NOMES_MATERIAIS_POR_REFERENCIA[reference]
}
