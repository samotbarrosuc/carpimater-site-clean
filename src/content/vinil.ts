import type { SiteVariant } from '@/content/site'
import { PRECO_FLUTUANTE_HIBRIDO_M2 } from '@/content/precos-materiais'
import { NOMES_FLUTUANTES_HIBRIDOS, NOMES_VINILICOS } from '@/content/nomes-materiais'

/**
 * ============================================================
 * CATÁLOGO DE PAVIMENTOS VINÍLICOS
 * ============================================================
 *
 * Edite aqui toda a informação dos pavimentos vinílicos:
 *   - nome          → definido centralmente em nomes-materiais.ts
 *   - referencia    → referência interna (ex: VIN-001)
 *   - precoM2       → preço por m² (IVA incluído)
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
  /** Preço por m² (IVA incluído) */
  precoM2: number
  /** Cor hexadecimal para o swatch */
  cor: string
  /** Caminho da imagem (opcional) - Ex: '/images/produtos-vinil/foto.jpg' */
  imagem?: string
  /** Quando true, o preço é sob consulta */
  sobConsulta?: boolean
  /** Caso de uso ideal */
  useCase?: string
  /** Família do pavimento, usada nos cartões e nas fichas técnicas */
  categoria?: 'vinilico' | 'hibrido'
  /** Marca e coleção comercial */
  marca?: string
  colecao?: string
  /** Medidas e dados técnicos apresentados ao cliente */
  formato?: string
  espessura?: string
  garantia?: string
  caracteristicas?: string[]
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
    nome: NOMES_VINILICOS['VIN-001'],
    referencia: 'VIN-001',
    precoM2: 21.50,
    cor: '#C9A96E',
    imagem: '/images/produtos-vinil/carvalho_mel_IMG_2897_optimized_2000-scaled-e1729769492932.jpeg',
    useCase: 'Ideal para salas de estar modernas',
  },
  {
    nome: NOMES_VINILICOS['VIN-002'],
    referencia: 'VIN-002',
    precoM2: 21.50,
    cor: '#8B8680',
    imagem: '/images/produtos-vinil/carvalho_nogal_PHOTO-2023-06-13-01-28-00-e1729769602770.jpg',
    useCase: 'Perfeito para ambientes elegantes',
  },
  {
    nome: NOMES_VINILICOS['VIN-003'],
    referencia: 'VIN-003',
    precoM2: 21.50,
    cor: '#B5935A',
    imagem: '/images/produtos-vinil/eucalipto_PHOTO-2023-11-21-08-25-04-e1729769679644.jpg',
    useCase: 'Ideal para cozinhas e áreas de serviço',
  },
  {
    nome: NOMES_VINILICOS['VIN-004'],
    referencia: 'VIN-004',
    precoM2: 21.50,
    cor: '#D4C4A0',
    imagem: '/images/produtos-vinil/oliveira_PHOTO-2023-06-13-01-26-58-e1729769780755.jpg',
  },
  {
    nome: NOMES_VINILICOS['VIN-005'],
    referencia: 'VIN-005',
    precoM2: 21.50,
    cor: '#E8D5B0',
    imagem: '/images/produtos-vinil/Tanzania_Almond_optimized_2000-scaled.jpg',
  },
  {
    nome: NOMES_VINILICOS['VIN-006'],
    referencia: 'VIN-006',
    precoM2: 21.50,
    cor: '#3D2B1F',
    imagem: '/images/produtos-vinil/tanzania_coconut_IMG_2899_optimized_2000-scaled.jpeg',
  },
  {
    nome: NOMES_VINILICOS['VIN-007'],
    referencia: 'VIN-007',
    precoM2: 21.50,
    cor: '#6B3A2A',
    imagem: '/images/produtos-vinil/tanzania_grey_IMG_2902_optimized_2000-scaled.jpeg',
  },
  {
    nome: NOMES_VINILICOS['VIN-008'],
    referencia: 'VIN-008',
    precoM2: 21.50,
    cor: '#B0ADB0',
    imagem: '/images/produtos-vinil/Tanzania_Natural_1_optimized_2000-scaled.jpg',
  },
  {
    nome: NOMES_VINILICOS['VIN-009'],
    referencia: 'VIN-009',
    precoM2: 21.50,
    cor: '#F5F0E8',
    imagem: '/images/produtos-vinil/tanzania_silver.jpeg',
  },
  /*  {
    nome: NOMES_VINILICOS['VIN-TAR-001'],
    referencia: 'VIN-TAR-001',
    precoM2: 0,
    cor: '#C7B299',
    sobConsulta: true,
  },
  {
    nome: NOMES_VINILICOS['VIN-FOR-001'],
    referencia: 'VIN-FOR-001',
    precoM2: 0,
    cor: '#9FA7AD',
    sobConsulta: true,
  }, */
]

/**
 * Produtos do sub-site de pavimento flutuante.
 *
 * Pode editar referências, dados técnicos e imagens aqui.
 * Os nomes são geridos em nomes-materiais.ts.
 */
const NEXTCORE_FEATURES = [
  'Classe de utilização AC5',
  'Resistência à água e salpicos 100 h+',
  'Base acústica IXPE de 1,5 mm integrada',
  'Superfície antibacteriana e solução eco friendly',
  'Textura Real Wood, relevo autêntico e poro sincronizado',
  'Sistema de encaixe Unilin com ZCUDO Shield',
  'Biselado nos quatro lados',
  'Compatível com cozinhas e casas de banho',
]

const FLUTUANTE_EDITAVEIS: ProdutoEditavel[] = [
  {
    nome: NOMES_FLUTUANTES_HIBRIDOS['ZCU-NC95-PINGO'],
    referencia: 'ZCU-NC95-PINGO',
    precoM2: PRECO_FLUTUANTE_HIBRIDO_M2,
    cor: '#c9b9a1',
    imagem: '/images/produtos-flutuante/pingo.webp',
    sobConsulta: false,
    categoria: 'hibrido',
    marca: 'ZCUDO',
    colecao: 'NextCore 9,5',
    formato: '1215 × 197 × 8 mm + base IXPE de 1,5 mm',
    espessura: '9,5 mm',
    garantia: '25 anos',
    caracteristicas: NEXTCORE_FEATURES,
    useCase: 'Tom claro e sereno para espaços luminosos.',
  },
  {
    nome: NOMES_FLUTUANTES_HIBRIDOS['ZCU-NC95-TOTS'],
    referencia: 'ZCU-NC95-TOTS',
    precoM2: PRECO_FLUTUANTE_HIBRIDO_M2,
    cor: '#b98251',
    imagem: '/images/produtos-flutuante/tots.webp',
    sobConsulta: false,
    categoria: 'hibrido',
    marca: 'ZCUDO',
    colecao: 'NextCore 9,5',
    formato: '1215 × 197 × 8 mm + base IXPE de 1,5 mm',
    espessura: '9,5 mm',
    garantia: '25 anos',
    caracteristicas: NEXTCORE_FEATURES,
    useCase: 'Carvalho quente com um desenho natural e equilibrado.',
  },
  {
    nome: NOMES_FLUTUANTES_HIBRIDOS['ZCU-NC95-MOKA'],
    referencia: 'ZCU-NC95-MOKA',
    precoM2: PRECO_FLUTUANTE_HIBRIDO_M2,
    cor: '#8c654f',
    imagem: '/images/produtos-flutuante/moka.webp',
    sobConsulta: false,
    categoria: 'hibrido',
    marca: 'ZCUDO',
    colecao: 'NextCore 9,5',
    formato: '1215 × 197 × 8 mm + base IXPE de 1,5 mm',
    espessura: '9,5 mm',
    garantia: '25 anos',
    caracteristicas: NEXTCORE_FEATURES,
    useCase: 'Madeira média, acolhedora e fácil de combinar.',
  },
  {
    nome: NOMES_FLUTUANTES_HIBRIDOS['ZCU-NC115-ARQ'],
    referencia: 'ZCU-NC115-ARQ',
    precoM2: PRECO_FLUTUANTE_HIBRIDO_M2,
    cor: '#d2b28e',
    imagem: '/images/produtos-flutuante/arq.webp',
    sobConsulta: false,
    categoria: 'hibrido',
    marca: 'ZCUDO',
    colecao: 'NextCore 11,5',
    formato: '1845 × 197 × 10 mm + base IXPE de 1,5 mm',
    espessura: '11,5 mm',
    garantia: '25 anos',
    caracteristicas: NEXTCORE_FEATURES,
    useCase: 'Régua longa e clara para ampliar visualmente a divisão.',
  },
  {
    nome: NOMES_FLUTUANTES_HIBRIDOS['ZCU-NC115-GRISACIO'],
    referencia: 'ZCU-NC115-GRISACIO',
    precoM2: PRECO_FLUTUANTE_HIBRIDO_M2,
    cor: '#b9ad99',
    imagem: '/images/produtos-flutuante/grisacio.webp',
    sobConsulta: false,
    categoria: 'hibrido',
    marca: 'ZCUDO',
    colecao: 'NextCore 11,5',
    formato: '1845 × 197 × 10 mm + base IXPE de 1,5 mm',
    espessura: '11,5 mm',
    garantia: '25 anos',
    caracteristicas: NEXTCORE_FEATURES,
    useCase: 'Carvalho acinzentado para interiores contemporâneos.',
  },
  {
    nome: NOMES_FLUTUANTES_HIBRIDOS['ZCU-NC115-TORRADO'],
    referencia: 'ZCU-NC115-TORRADO',
    precoM2: PRECO_FLUTUANTE_HIBRIDO_M2,
    cor: '#6f4933',
    imagem: '/images/produtos-flutuante/torrado.webp',
    sobConsulta: false,
    categoria: 'hibrido',
    marca: 'ZCUDO',
    colecao: 'NextCore 11,5',
    formato: '1845 × 197 × 10 mm + base IXPE de 1,5 mm',
    espessura: '11,5 mm',
    garantia: '25 anos',
    caracteristicas: NEXTCORE_FEATURES,
    useCase: 'Tom escuro e marcado para ambientes com personalidade.',
  },
  {
    nome: NOMES_FLUTUANTES_HIBRIDOS['ZCU-NC115-MEL'],
    referencia: 'ZCU-NC115-MEL',
    precoM2: PRECO_FLUTUANTE_HIBRIDO_M2,
    cor: '#ad7544',
    imagem: '/images/produtos-flutuante/mel.webp',
    sobConsulta: false,
    categoria: 'hibrido',
    marca: 'ZCUDO',
    colecao: 'NextCore 11,5',
    formato: '1845 × 197 × 10 mm + base IXPE de 1,5 mm',
    espessura: '11,5 mm',
    garantia: '25 anos',
    caracteristicas: NEXTCORE_FEATURES,
    useCase: 'Tom mel luminoso para uma atmosfera acolhedora.',
  },
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
