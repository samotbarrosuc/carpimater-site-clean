import type { SiteVariant } from '@/content/site'

/**
 * ============================================================
 * CATÁLOGO DE PAVIMENTOS VINÍLICOS
 * ============================================================
 *
 * Edite aqui toda a informação dos pavimentos vinílicos:
 *   - nome          → nome exibido no site
 *   - referencia    → referência interna (ex: VIN-001)
 *   - precoM2       → preço por m² SEM IVA
 *   - cor           → cor hexadecimal do swatch (ex: '#C9A96E')
 *   - imagem        → caminho da foto em /public/
 *                     Ex: '/images/produtos-vinil/foto.jpg'
 *                     Deixe undefined se ainda não tiver foto.
 *
 * IMAGENS: coloque os ficheiros em  public/images/produtos-vinil/
 * ============================================================
 */

export interface Produto {
  id: number
  /** Nome do produto exibido no catálogo e no simulador */
  nome: string
  /** Referência interna */
  referencia: string
  /** Preço por m² (sem IVA) */
  precoM2: number
  /** Cor hexadecimal para o swatch */
  cor: string
  /** Caminho da imagem (opcional) - Ex: '/images/produtos-vinil/foto.jpg' */
  imagem?: string
  /** Quando true, o preço é sob consulta */
  sobConsulta?: boolean
  /** Caso de uso ideal */
  useCase?: string
}

/**
 * LISTA EDITÁVEL
 *
 * Não precisa de "id" em cada item.
 * O id é gerado automaticamente pela ordem da lista.
 */
interface ProdutoEditavel extends Omit<Produto, 'id'> {}

const VINILICO_EDITAVEIS: ProdutoEditavel[] = [
  {
    nome: 'Carvalho Mel',
    referencia: 'VIN-001',
    precoM2: 17.80,
    cor: '#C9A96E',
    imagem: '/images/produtos-vinil/carvalho_mel_IMG_2897_optimized_2000-scaled-e1729769492932.jpeg',
    useCase: 'Ideal para salas de estar modernas',
  },
  {
    nome: 'Carvalho Nogal',
    referencia: 'VIN-002',
    precoM2: 17.80,
    cor: '#8B8680',
    imagem: '/images/produtos-vinil/carvalho_nogal_PHOTO-2023-06-13-01-28-00-e1729769602770.jpg',
    useCase: 'Perfeito para ambientes elegantes',
  },
  {
    nome: 'Eucalipto',
    referencia: 'VIN-003',
    precoM2: 17.80,
    cor: '#B5935A',
    imagem: '/images/produtos-vinil/eucalipto_PHOTO-2023-11-21-08-25-04-e1729769679644.jpg',
    useCase: 'Ideal para cozinhas e áreas de serviço',
  },
  {
    nome: 'Oliveira',
    referencia: 'VIN-004',
    precoM2: 17.80,
    cor: '#D4C4A0',
    imagem: '/images/produtos-vinil/oliveira_PHOTO-2023-06-13-01-26-58-e1729769780755.jpg',
  },
  {
    nome: 'Tanzânia Almond',
    referencia: 'VIN-005',
    precoM2: 17.80,
    cor: '#E8D5B0',
    imagem: '/images/produtos-vinil/Tanzania_Almond_optimized_2000-scaled.jpg',
  },
  {
    nome: 'Tanzânia Coconut',
    referencia: 'VIN-006',
    precoM2: 17.80,
    cor: '#3D2B1F',
    imagem: '/images/produtos-vinil/tanzania_coconut_IMG_2899_optimized_2000-scaled.jpeg',
  },
  {
    nome: 'Tanzânia Grey',
    referencia: 'VIN-007',
    precoM2: 17.80,
    cor: '#6B3A2A',
    imagem: '/images/produtos-vinil/tanzania_grey_IMG_2902_optimized_2000-scaled.jpeg',
  },
  {
    nome: 'Tanzânia Natural',
    referencia: 'VIN-008',
    precoM2: 17.80,
    cor: '#B0ADB0',
    imagem: '/images/produtos-vinil/Tanzania_Natural_1_optimized_2000-scaled.jpg',
  },
  {
    nome: 'Tanzânia Silver',
    referencia: 'VIN-009',
    precoM2: 17.80,
    cor: '#F5F0E8',
    imagem: '/images/produtos-vinil/tanzania_silver.jpeg',
  },
 /*  {
    nome: 'Tarkett (sob consulta)',
    referencia: 'VIN-TAR-001',
    precoM2: 0,
    cor: '#C7B299',
    sobConsulta: true,
  },
  {
    nome: 'Forbo (sob consulta)',
    referencia: 'VIN-FOR-001',
    precoM2: 0,
    cor: '#9FA7AD',
    sobConsulta: true,
  }, */
]

/**
 * Produtos do sub-site de pavimento flutuante.
 *
 * Pode editar nomes, referências, preços e imagens aqui,
 * no mesmo ficheiro onde já gere os produtos vinílicos.
 */
const FLUTUANTE_EDITAVEIS: ProdutoEditavel[] = [
  ...VINILICO_EDITAVEIS,
]

const COZINHA_EDITAVEIS: ProdutoEditavel[] = [
  {
    nome: 'Cozinha Linear Moderna',
    referencia: 'COZ-001',
    precoM2: 420.00,
    cor: '#A78E75',
  },
  {
    nome: 'Cozinha em L com Ilha',
    referencia: 'COZ-002',
    precoM2: 560.00,
    cor: '#6F7C83',
  },
  {
    nome: 'Cozinha Minimal Branca',
    referencia: 'COZ-003',
    precoM2: 490.00,
    cor: '#E8E7E1',
  },
  {
    nome: 'Cozinha Madeira Natural',
    referencia: 'COZ-004',
    precoM2: 610.00,
    cor: '#8A6C4C',
  },
  {
    nome: 'Cozinha Premium Escura',
    referencia: 'COZ-005',
    precoM2: 690.00,
    cor: '#2E3135',
  },
]

function mapEditableProducts(produtos: ProdutoEditavel[]): Produto[] {
  return produtos.map((produto, index) => ({
    id: index + 1,
    ...produto,
  }))
}

export const PRODUTOS_POR_VARIANTE: Record<SiteVariant, Produto[]> = {
  vinilico: mapEditableProducts(VINILICO_EDITAVEIS),
  flutuante: mapEditableProducts(FLUTUANTE_EDITAVEIS),
  cozinha: mapEditableProducts(COZINHA_EDITAVEIS),
}

export const PRODUTOS: Produto[] = PRODUTOS_POR_VARIANTE.vinilico

export function getProdutosByVariant(variant: SiteVariant = 'vinilico'): Produto[] {
  return PRODUTOS_POR_VARIANTE[variant]
}

export function getProdutoById(id: number, variant: SiteVariant = 'vinilico'): Produto | undefined {
  return PRODUTOS_POR_VARIANTE[variant].find((p) => p.id === id)
}

export function getProdutosOrdenadosPorPreco(variant: SiteVariant = 'vinilico'): Produto[] {
  return [...PRODUTOS_POR_VARIANTE[variant]].sort((a, b) => a.precoM2 - b.precoM2)
}

export const PRODUTOS_VINILICO_EDITAVEIS = VINILICO_EDITAVEIS

export const PRODUTOS_FLUTUANTE_EDITAVEIS = FLUTUANTE_EDITAVEIS

export const PRODUTOS_COZINHA_EDITAVEIS = COZINHA_EDITAVEIS

// ─── Funções utilitárias (não editar) ─────────────────────────────────────────
