/**
 * ================================================
 * FUNÇÕES DE CÁLCULO - CarpiMater
 * ================================================
 * 
 * Este ficheiro contém todas as fórmulas de cálculo de orçamento.
 * Os valores base são importados de /content/precos.ts
 * 
 * TODOS OS PREÇOS SÃO COM IVA INCLUÍDO
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
import {
  AREA_ROLO_MANTA_M2,
  LIMIAR_ROLO_COMPLETO_MANTA_M2,
  PRECO_RESTANTE_MANTA_M2,
} from '@/content/precos-materiais'

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

export interface UnderlayCalculation {
  areaM2: number
  total: number
  precoMedioM2: number
}

/**
 * Calcula a manta/sub-pavimento usando rolos de 50 m².
 * Até 50 m² é sempre cobrado um rolo. Acima disso, um restante inferior
 * a 30 m² é cobrado ao m²; a partir de 30 m² é cobrado outro rolo.
 */
export function calcUnderlay(areaM2: number, precoRolo: number): UnderlayCalculation {
  const area = Math.max(0, Number(areaM2) || 0)
  if (area === 0) return { areaM2: 0, total: 0, precoMedioM2: 0 }

  const rolosCompletos = Math.floor(area / AREA_ROLO_MANTA_M2)
  const restante = area - rolosCompletos * AREA_ROLO_MANTA_M2
  let total = rolosCompletos * precoRolo

  if (rolosCompletos === 0) {
    total = precoRolo
  } else if (restante > 0 && restante < LIMIAR_ROLO_COMPLETO_MANTA_M2) {
    total += restante * PRECO_RESTANTE_MANTA_M2
  } else if (restante >= LIMIAR_ROLO_COMPLETO_MANTA_M2) {
    total += precoRolo
  }

  return {
    areaM2: area,
    total,
    precoMedioM2: total / area,
  }
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
  const cargaDiaria = (Math.max(0, area) / M2_POR_DESLOCACAO) + (Math.max(0, rodape) / RODAPE_ML_POR_DESLOCACAO)
  return Math.ceil(cargaDiaria)
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

/** Mantém apenas algarismos e uma vírgula decimal nos campos de medidas. */
export function sanitizeQuantityInput(value: string): string {
  const normalized = value.replace(/\./g, ',').replace(/[^\d,]/g, '')
  const commaIndex = normalized.indexOf(',')
  if (commaIndex < 0) return normalized
  return normalized.slice(0, commaIndex + 1) + normalized.slice(commaIndex + 1).replace(/,/g, '')
}

/** Converte uma medida escrita no formato português para número. */
export function parseQuantityInput(value: string | number): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  const parsed = Number(value.replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : 0
}

/** Apresenta medidas com vírgula decimal, sem separador de milhares. */
export function formatQuantity(value: number, minimumFractionDigits = 0): string {
  return value.toLocaleString('pt-PT', {
    useGrouping: false,
    minimumFractionDigits,
    maximumFractionDigits: 2,
  })
}

export const FLOORING_BOX_AREA_M2 = 1.76
export const BASEBOARD_BAR_LENGTH_M = 2.25

export interface UnitPurchaseResult {
  requestedAmount: number
  amountWithWaste: number
  units: number
  suppliedAmount: number
  totalPrice: number
}

export function calcFlooringPurchase(areaM2: number, pricePerM2: number, includeWaste = true): UnitPurchaseResult {
  const requestedAmount = Math.max(0, Number(areaM2) || 0)
  const amountWithWaste = requestedAmount * (includeWaste ? 1.1 : 1)
  const units = Math.ceil(amountWithWaste / FLOORING_BOX_AREA_M2)
  return { requestedAmount, amountWithWaste, units, suppliedAmount: units * FLOORING_BOX_AREA_M2, totalPrice: units * FLOORING_BOX_AREA_M2 * pricePerM2 }
}

export function calcBaseboardPurchase(meters: number, pricePerMeter: number, includeWaste = true): UnitPurchaseResult {
  const requestedAmount = Math.max(0, Number(meters) || 0)
  const amountWithWaste = requestedAmount * (includeWaste ? 1.1 : 1)
  const units = Math.ceil(amountWithWaste / BASEBOARD_BAR_LENGTH_M)
  return { requestedAmount, amountWithWaste, units, suppliedAmount: units * BASEBOARD_BAR_LENGTH_M, totalPrice: units * BASEBOARD_BAR_LENGTH_M * pricePerMeter }
}
