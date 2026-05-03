/**
 * ============================================================
 * BENEFÍCIOS — SECÇÃO "PORQUÊ NÓS"
 * ============================================================
 *
 * Edite aqui os cartões exibidos na secção "Um serviço diferente".
 *
 *   - title       → título do cartão
 *   - description → texto principal (use \n para quebra de linha)
 *   - linkText    → (opcional) texto de um link inline na descrição
 *   - linkHref    → (opcional) destino do link (ex: '#simulador')
 *   - linkSuffix  → (opcional) texto que aparece depois do link
 *
 * NOTA: Os ícones de cada cartão são definidos no componente Benefits.tsx
 *       e seguem a mesma ordem desta lista.
 * ============================================================
 */

export interface BenefitData {
  /** Título do cartão */
  title: string
  /** Texto da descrição. Use \n para nova linha. */
  description: string
  /** Texto de um link opcional dentro da descrição */
  linkText?: string
  /** Destino do link (ex: '#simulador') */
  linkHref?: string
  /** Texto exibido depois do link */
  linkSuffix?: string
}

export const BENEFITS_DATA: BenefitData[] = [
  {
    title: 'Simplicidade.',
    description: 'Tratamos de todo o processo por si.\nFornecimento e aplicação num único serviço, sem complicações nem intermediários.',
  },
  {
    title: 'Transparência.',
    description: 'Preços que competem com os das grandes superfícies.',
    linkText: 'Simule já',
    linkHref: '#simulador',
    linkSuffix: 'e saiba quanto vai pagar, sem surpresas.',
  },
  {
    title: 'Qualidade.',
    description: 'Pavimentos certificados com garantia de 25 anos.\nSoluções duradouras, pensadas para o uso diário.',
  },
  {
    title: 'Liberdade de escolha.',
    description: 'Rodapés e perfis à sua escolha, na mesma cor ou em contraste.\nO design final é sempre decidido por si.',
  },
]
