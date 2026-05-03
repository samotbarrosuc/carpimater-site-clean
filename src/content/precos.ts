/**
 * ============================================================
 * PREÇOS E MARGENS DO SIMULADOR
 * ============================================================
 *
 * Edite aqui todos os valores usados no cálculo do orçamento.
 * TODOS OS VALORES SÃO SEM IVA.
 *
 *   MÃO DE OBRA
 *     PRECO_MAO_OBRA_M2          → custo de aplicação por m²
 *     PRECO_MAO_OBRA_RODAPE_ML   → custo de aplicação de rodapé por metro linear
 *
 *   MATERIAIS (preço base — o preço real de cada produto está em vinil.ts e rodapes.ts)
 *     PRECO_RODAPE_ML            → preço base do rodapé por metro linear
 *     PRECO_PERFIL_UN            → preço de cada perfil de transição (porta)
 *
 *   DESPERDÍCIO
 *     DESPERDICIO_MATERIAL       → 1.10 = +10% de material extra para cortes/perdas
 *     DESPERDICIO_RODAPE         → 1.10 = +10% de rodapé extra
 *
 *   DESLOCAÇÃO
 *     CUSTO_KM                   → custo por km (ida + volta)
 *     M2_POR_DESLOCACAO          → m² máximos por viagem (define nº de deslocações)
 *     RODAPE_ML_POR_DESLOCACAO   → metros de rodapé máximos por viagem
 *
 *   MARGEM DA ESTIMATIVA
 *     ESTIMATIVA_MIN_MULTIPLIER  → 0.98 = valor mínimo 2% abaixo do base
 *     ESTIMATIVA_MAX_MULTIPLIER  → 1.02 = valor máximo 2% acima do base
 * ============================================================
 */

// ── Mão de obra ────────────────────────────────────────────────────────────────

/** Custo de aplicação por m² (sem IVA) */
export const PRECO_MAO_OBRA_M2 = 9

/** Custo de aplicação do rodapé por metro linear (sem IVA) */
export const PRECO_MAO_OBRA_RODAPE_ML = 3.2

// ── Materiais ──────────────────────────────────────────────────────────────────

/** Preço base do rodapé por metro linear (sem IVA) */
export const PRECO_RODAPE_ML = 3.09

/** Preço de cada perfil de transição por unidade (sem IVA) */
export const PRECO_PERFIL_UN = 15

// ── Desperdício ────────────────────────────────────────────────────────────────

/** Fator de desperdício do material (1.10 = 10% extra para cortes/perdas) */
export const DESPERDICIO_MATERIAL = 1.10

/** Fator de desperdício do rodapé (1.10 = 10% extra) */
export const DESPERDICIO_RODAPE = 1.10

// ── Deslocação ─────────────────────────────────────────────────────────────────

/** Custo por km de deslocação (ida + volta) */
export const CUSTO_KM = 0.22

/** Área máxima (m²) transportada por viagem — define o número de deslocações */
export const M2_POR_DESLOCACAO = 15

/** Metros lineares de rodapé máximos por viagem */
export const RODAPE_ML_POR_DESLOCACAO = 50

// ── Margem da estimativa ───────────────────────────────────────────────────────

/** Multiplicador mínimo da estimativa (0.98 = -2% do valor base) */
export const ESTIMATIVA_MIN_MULTIPLIER = 0.98

/** Multiplicador máximo da estimativa (1.02 = +2% do valor base) */
export const ESTIMATIVA_MAX_MULTIPLIER = 1.02
