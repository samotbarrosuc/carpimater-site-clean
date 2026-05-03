/**
 * ============================================================
 * CATÁLOGO DE RODAPÉS
 * ============================================================
 *
 * Edite aqui toda a informação dos rodapés:
 *   - nome          → nome exibido no catálogo e no simulador
 *   - referencia    → referência interna (ex: ROD-001)
 *   - precoMl       → preço por metro linear SEM IVA
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
  /** Preço por metro linear (sem IVA) */
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
    nome: 'Branco Liso',
    referencia: 'ROD-001',
    precoMl: 3.12,
    cor: '#FFFFFF',
    imagem: '/images/produtos-rodape/rodape pvc branco liso.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Carvalho Mel',
    referencia: 'ROD-002',
    precoMl: 4.29,
    cor: '#C9A96E',
    // imagem: '/images/produtos-rodape/foto.jpg',   ← adicione quando tiver foto
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Carvalho Nogal',
    referencia: 'ROD-003',
    precoMl: 4.29,
    cor: '#8B8680',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Eucalipto',
    referencia: 'ROD-004',
    precoMl: 4.29,
    cor: '#B5935A',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Oliveira',
    referencia: 'ROD-005',
    precoMl: 4.29,
    cor: '#D4C4A0',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Tanzânia Almond',
    referencia: 'ROD-006',
    precoMl: 4.29,
    cor: '#E8D5B0',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Tanzânia Coconut',
    referencia: 'ROD-007',
    precoMl: 4.29,
    cor: '#3D2B1F',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Tanzânia Grey',
    referencia: 'ROD-008',
    precoMl: 4.29,
    cor: '#6B3A2A',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Tanzânia Natural',
    referencia: 'ROD-009',
    precoMl: 4.29,
    cor: '#B0ADB0',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
  {
    nome: 'Tanzânia Silver',
    referencia: 'ROD-010',
    precoMl: 4.29,
    cor: '#F5F0E8',
    // imagem: '/images/produtos-rodape/foto.jpg',
    material: 'PVC',
    espessura: '14mm',
    altura: '7 cm',
  },
]

export const RODAPES: RodapeProduto[] = RODAPES_EDITAVEIS.map((rodape, index) => ({
  id: index + 1,
  ...rodape,
}))

// ─── Funções utilitárias (não editar) ─────────────────────────────────────────

export function getRodapeById(id: number): RodapeProduto | undefined {
  return RODAPES.find(r => r.id === id)
}
