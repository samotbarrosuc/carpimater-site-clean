/**
 * ================================================
 * FUNÇÕES DE CÁLCULO - CarpiMater
 * ================================================
 * 
 * Este ficheiro contém todas as fórmulas de cálculo de orçamento.
 * Os valores base são importados de /content/precos.ts
 * 
 * TODOS OS PREÇOS SÃO SEM IVA
 */

import {
  PRECO_MAO_OBRA_M2,
  PRECO_MAO_OBRA_RODAPE_ML,
  PRECO_RODAPE_ML,
  PRECO_PERFIL_UN,
  DESPERDICIO_MATERIAL,
  DESPERDICIO_RODAPE,
  CUSTO_KM,
  M2_POR_DESLOCACAO,
  RODAPE_ML_POR_DESLOCACAO,
  ESTIMATIVA_MIN_MULTIPLIER,
  ESTIMATIVA_MAX_MULTIPLIER,
} from '@/content/precos'

export interface EstimateResult {
  areaTotalM2: number
  materialNecessario: number
  rodapeNecessario: number
  numeroPerfis: number
  numeroDeslocacoes: number
  distanceKm: number
  custoMaterial: number
  custoMaoObra: number
  custoRodape: number
  custoMaoObraRodape: number
  custoPerfis: number
  custoDeslocacaoKm: number
  custoMaterialCliente: number
  custoRodapeCliente: number
  custoPerfisCliente: number
  custoPortagens: number
  totalBase: number
  valorMin: number
  valorMax: number
}

/**
 * Calcula o material necessário (com desperdício)
 */
export function calcMaterialNecessario(area: number): number {
  return area * DESPERDICIO_MATERIAL
}

/**
 * Calcula o rodapé necessário (com desperdício)
 */
export function calcRodapeNecessario(metros: number): number {
  return metros * DESPERDICIO_RODAPE
}

/**
 * Calcula o número de deslocações necessárias
 */
export function calcNumeroDeslocacoes(area: number, rodape: number): number {
  const deslocacoesArea = Math.ceil(area / M2_POR_DESLOCACAO)
  const deslocacoesRodape = Math.ceil(rodape / RODAPE_ML_POR_DESLOCACAO)
  return deslocacoesArea + deslocacoesRodape
}

/**
 * Calcula o custo de deslocação por km (ida e volta × nº deslocações)
 */
export function calcCustoDeslocacaoKm(distKm: number, nDeslocacoes: number): number {
  return distKm * CUSTO_KM * 2 * nDeslocacoes
}

/**
 * Calcula o custo de portagens (ida e volta × nº deslocações)
 */
export function calcCustoPortagens(tollEur: number, nDeslocacoes: number): number {
  return tollEur * 2 * nDeslocacoes
}

/**
 * Calcula o custo do material
 */
export function calcCustoMaterial(area: number, precoM2: number): number {
  const materialNecessario = calcMaterialNecessario(area)
  return materialNecessario * precoM2
}

/**
 * Calcula o custo da mão de obra
 */
export function calcCustoMaoObra(area: number): number {
  return area * PRECO_MAO_OBRA_M2
}

/**
 * Calcula o custo da mão de obra do rodapé
 */
export function calcCustoMaoObraRodape(metros: number): number {
  return metros * PRECO_MAO_OBRA_RODAPE_ML
}

/**
 * Calcula o custo do rodapé (material)
 */
export function calcCustoRodape(metros: number, precoMl: number = PRECO_RODAPE_ML): number {
  const rodapeNecessario = calcRodapeNecessario(metros)
  return rodapeNecessario * precoMl
}

/**
 * Calcula o custo dos perfis de transição
 */
export function calcCustoPerfis(nPortas: number): number {
  return nPortas * PRECO_PERFIL_UN
}

/**
 * Calcula a estimativa completa do orçamento
 */
export function calcEstimate(
  area: number,
  rodape: number,
  nPortas: number,
  precoM2: number,
  precoRodapeMl: number,
  distKm: number,
  tollEur: number,
  soMaoDeObra = false
): EstimateResult {
  const materialNecessario = calcMaterialNecessario(area)
  const rodapeNecessario = calcRodapeNecessario(rodape)
  const numeroDeslocacoes = calcNumeroDeslocacoes(area, rodape)
  
  const custoMaterialTotal = calcCustoMaterial(area, precoM2)
  const custoRodapeTotal = calcCustoRodape(rodape, precoRodapeMl)
  const custoPerfisTotal = calcCustoPerfis(nPortas)

  const custoMaterial = soMaoDeObra ? 0 : custoMaterialTotal
  const custoRodape = soMaoDeObra ? 0 : custoRodapeTotal
  const custoPerfis = soMaoDeObra ? 0 : custoPerfisTotal
  const custoMaoObra = calcCustoMaoObra(area)
  const custoMaoObraRodape = calcCustoMaoObraRodape(rodape)
  const custoDeslocacaoKm = calcCustoDeslocacaoKm(distKm, numeroDeslocacoes)
  const custoPortagens = calcCustoPortagens(tollEur, numeroDeslocacoes)
  
  const totalBase = custoMaterial + custoMaoObra + custoRodape + custoMaoObraRodape + custoPerfis + custoDeslocacaoKm + custoPortagens
  
  return {
    areaTotalM2: area,
    materialNecessario,
    rodapeNecessario,
    numeroPerfis: nPortas,
    numeroDeslocacoes,
    distanceKm: distKm,
    custoMaterial,
    custoMaoObra,
    custoRodape,
    custoMaoObraRodape,
    custoPerfis,
    custoDeslocacaoKm,
    custoPortagens,
    custoMaterialCliente: custoMaterialTotal,
    custoRodapeCliente: custoRodapeTotal,
    custoPerfisCliente: custoPerfisTotal,
    totalBase,
    valorMin: totalBase * ESTIMATIVA_MIN_MULTIPLIER,
    valorMax: totalBase * ESTIMATIVA_MAX_MULTIPLIER,
  }
}

/**
 * Formata um valor em euros (formato pt-PT)
 */
export function formatEur(value: number): string {
  return value.toLocaleString('pt-PT', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }) + ' €'
}
