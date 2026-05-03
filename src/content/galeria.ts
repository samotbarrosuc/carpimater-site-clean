import type { SiteVariant } from '@/content/site'
import {
  PROJECTOS_TERMINADOS_COZINHAS,
  type ProjectoTerminadoItem,
} from '@/content/projectos-terminados-cozinhas'
import { PROJECTOS_TERMINADOS_FLUTUANTE } from '@/content/projectos-terminados-flutuante'
import { PROJECTOS_TERMINADOS_VINIL } from '@/content/projectos-terminados-vinil'

/**
 * ============================================================
 * GALERIA DE TRABALHOS REALIZADOS
 * ============================================================
 *
 * Edite aqui as fotos exibidas na secção "Trabalhos realizados".
 *
 *   - image → caminho da imagem em /public/  (ex: '/images/gallery-7.png')
 *   - city  → nome da cidade/localidade exibido na foto
 *
 * Para ADICIONAR uma foto: copie um objeto { image, city } e edite.
 * Para REMOVER uma foto:   apague o objeto inteiro.
 *
 * IMAGENS: coloque os ficheiros em  public/images/
 * ============================================================
 */

export interface GalleryItem {
  /** Caminho da imagem (ex: '/images/gallery-1.png') */
  image: string
  /** Descrição exibida sobre a foto */
  description: string
}

export const GALLERY_ITEMS: GalleryItem[] = PROJECTOS_TERMINADOS_VINIL
export const GALLERY_ITEMS_FLUTUANTE: GalleryItem[] = PROJECTOS_TERMINADOS_FLUTUANTE
export const GALLERY_ITEMS_COZINHA: GalleryItem[] = PROJECTOS_TERMINADOS_COZINHAS

export function getGalleryItemsByVariant(variant: SiteVariant): GalleryItem[] {
  if (variant === 'cozinha') return GALLERY_ITEMS_COZINHA
  if (variant === 'flutuante') return GALLERY_ITEMS_FLUTUANTE
  return GALLERY_ITEMS
}
