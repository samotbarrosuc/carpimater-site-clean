import type { Produto } from '@/content/vinil'
import type { RodapeProduto } from '@/content/rodapes'
import { BASEBOARD_BAR_LENGTH_M, FLOORING_BOX_AREA_M2, calcBaseboardPurchase, calcFlooringPurchase } from '@/lib/calculations'

export type CartItemKind = 'flooring' | 'baseboard'
export interface CartItem {
  id: string
  kind: CartItemKind
  productId: number
  name: string
  reference: string
  image?: string
  unitPrice: number
  units: number
  includeWaste: boolean
  requestedAmount: number
  suppliedAmount: number
}

export function createFlooringCartItem(product: Produto, areaM2: number, includeWaste: boolean): CartItem {
  const result = calcFlooringPurchase(areaM2, product.precoM2, includeWaste)
  return { id: `flooring-${product.id}`, kind: 'flooring', productId: product.id, name: product.nome, reference: product.referencia, image: product.imagem, unitPrice: product.precoM2, units: result.units, includeWaste, requestedAmount: result.requestedAmount, suppliedAmount: result.suppliedAmount }
}

export function createBaseboardCartItem(product: RodapeProduto, meters: number, includeWaste: boolean): CartItem {
  const result = calcBaseboardPurchase(meters, product.precoMl, includeWaste)
  return { id: `baseboard-${product.id}`, kind: 'baseboard', productId: product.id, name: product.nome, reference: product.referencia, image: product.imagem, unitPrice: product.precoMl, units: result.units, includeWaste, requestedAmount: result.requestedAmount, suppliedAmount: result.suppliedAmount }
}

export function getCartItemPrice(item: CartItem): number {
  return item.units * (item.kind === 'flooring' ? FLOORING_BOX_AREA_M2 : BASEBOARD_BAR_LENGTH_M) * item.unitPrice
}

export function updateCartItemUnits(item: CartItem, units: number): CartItem {
  const nextUnits = Math.max(1, Math.floor(units))
  return { ...item, units: nextUnits, suppliedAmount: nextUnits * (item.kind === 'flooring' ? FLOORING_BOX_AREA_M2 : BASEBOARD_BAR_LENGTH_M) }
}