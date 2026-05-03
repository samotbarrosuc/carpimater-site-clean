/**
 * ============================================================
 * TESTEMUNHOS DE CLIENTES
 * ============================================================
 *
 * Edite aqui os testemunhos exibidos em "O que dizem os clientes".
 *
 *   - name  → nome do cliente
 *   - city  → cidade/localidade do cliente
 *   - quote → texto do testemunho (sem aspas — são adicionadas automaticamente)
 *
 * Para ADICIONAR um testemunho: copie um objeto { name, city, quote } e edite.
 * Para REMOVER um testemunho:   apague o objeto inteiro.
 * ============================================================
 */

export interface Testemunho {
  /** Nome do cliente */
  name: string
  /** Cidade/localidade */
  city: string
  /** Texto do testemunho (sem aspas) */
  quote: string
  /** Data do testemunho, ex: "Jan 2025" */
  date?: string
  /** Fonte do testemunho, ex: "Google" */
  source?: string
}

export const TESTEMUNHOS: Testemunho[] = [
  {
    name: 'Maria Silva',
    city: 'Coimbra',
    quote: 'Ficou lindíssimo! O serviço foi rápido, limpo e muito profissional. Desde a simulação no site até à obra concluída foi uma semana. Recomendo a toda a gente.',
    date: 'Jan 2025',
    source: 'Google',
  },
  {
    name: 'João Fernandes',
    city: 'Condeixa-a-Nova',
    quote: 'Escolhi a cor online, deram-me o orçamento em horas e em dois dias estava tudo feito na minha sala e corredor. Excelente serviço e preço imbatível.',
    date: 'Mar 2025',
    source: 'Google',
  },
  {
    name: 'Ana Martins',
    city: 'Figueira da Foz',
    quote: 'Preço muito competitivo e o acabamento com os perfis à cor do chão ficou perfeito. Transformou completamente o meu apartamento sem partir nada.',
    date: 'Dez 2024',
    source: 'Google',
  },
]
