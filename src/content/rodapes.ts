import { PRECO_RODAPE_PVC_BRANCO_ML, PRECO_RODAPE_PVC_ML } from '@/content/precos-materiais'
import { NOMES_RODAPES } from '@/content/nomes-materiais'

/*  *//**
 * ============================================================
 * CATÁLOGO DE RODAPÉS
 * ============================================================
 *
 * Edite aqui toda a informação dos rodapés:
 *   - nome          → definido centralmente em nomes-materiais.ts
 *   - referencia    → referência interna (ex: ROD-001)
 *   - precoMl       → definido centralmente em precos-materiais.ts
 *   - cor           → cor hexadecimal do acabamento (ex: '#C9A96E')
 *   - imagem        → caminho da foto em /public/
 *                     Ex: '/images/produtos-rodape/foto.jpg'
 *                     Deixe undefined (ou a linha apagada) se ainda não tiver foto.
 *   - material      → tipo de material (ex: 'PVC', 'MDF')
 *   - espessura     → espessura (ex: '14mm', '12mm')
 *   - altura        → altura visível (ex: '7 cm', '10 cm')
 *
 * IMAGENS: coloque os ficheiros em  public/images/produtos-rodape/
 * ============================================================
 */

export interface RodapeProduto {
  id: number
  /** Nome do rodapé exibido no catálogo e no simulador */
  nome: string
  /** Referência interna */
  referencia: string
  /** Preço por metro linear (IVA incluído) */
  precoMl: number
  /** Cor hexadecimal para o swatch */
  cor: string
  /** Caminho da imagem (opcional) - Ex: '/images/produtos-rodape/foto.jpg' */
  imagem?: string
  /** Material (ex: 'PVC', 'MDF') */
  material: string
  /** Espessura (ex: '14mm') */
  espessura: string
  /** Altura visível (ex: '7 cm') */
  altura: string
  /** Produto apresentado apenas mediante consulta */
  sobConsulta?: boolean
}

/**
 * LISTA EDITÁVEL
 *
 * Não precisa de "id" em cada item.
 * O id é gerado automaticamente pela ordem da lista.
 */
interface RodapeEditavel extends Omit<RodapeProduto, 'id'> {}

const RODAPES_EDITAVEIS: RodapeEditavel[] = [
  {
    nome: NOMES_RODAPES['ROD-001'],
    referencia: 'ROD-001',
    precoMl: PRECO_RODAPE_PVC_BRANCO_ML,
    cor: '#FFFFFF',
    imagem: '/images/produtos-rodape/rodape pvc branco liso.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-011'],
    referencia: 'ROD-011',
    precoMl: 0,
    cor: '#B58A62',
    material: 'Madeira',
    espessura: 'Sob consulta',
    altura: 'Sob consulta',
    sobConsulta: true,
  },
  {
    nome: NOMES_RODAPES['ROD-002'],
    referencia: 'ROD-002',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#C9A96E',
    // imagem: '/images/produtos-rodape/foto.jpg',   ← adicione quando tiver foto
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-003'],
    referencia: 'ROD-003',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#8B8680',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-004'],
    referencia: 'ROD-004',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#B5935A',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-005'],
    referencia: 'ROD-005',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#D4C4A0',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-006'],
    referencia: 'ROD-006',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#E8D5B0',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-007'],
    referencia: 'ROD-007',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#3D2B1F',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-008'],
    referencia: 'ROD-008',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#6B3A2A',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-009'],
    referencia: 'ROD-009',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#B0ADB0',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: NOMES_RODAPES['ROD-010'],
    referencia: 'ROD-010',
    precoMl: PRECO_RODAPE_PVC_ML,
    cor: '#F5F0E8',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
]

export const RODAPES: RodapeProduto[] = RODAPES_EDITAVEIS.map((rodape) => ({
  id: Number(rodape.referencia.replace('ROD-', '')),
  ...rodape,
}))

// ─── Funções utilitárias (não editar) ─────────────────────────────────────────

export function getRodapeById(id: number): RodapeProduto | undefined {
  return RODAPES.find(r => r.id === id)
}
