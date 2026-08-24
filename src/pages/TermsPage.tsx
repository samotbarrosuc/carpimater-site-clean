import { FileText, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BUSINESS_NAME, EMAIL, PHONE_NUMBER } from '@/content/site'

const sectionClass = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#19242e]">
      <Navbar />
      <section className="px-4 pb-20 pt-32 sm:pt-36">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileText className="h-5 w-5" /></span>
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Informação legal</p><h1 className="font-display text-3xl font-bold sm:text-4xl">Termos e Condições de Venda</h1></div>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">Estes termos regulam as encomendas de materiais efetuadas na loja online CarpiMater. Leia-os antes de concluir a compra.</p>
            <p className="mt-2 text-xs text-slate-400">Versão 2026-08-24 · Última atualização: 24 de agosto de 2026</p>
          </header>

          <div className="space-y-5 text-sm leading-7 text-slate-600">
            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">1. Identificação e contactos</h2>
              <p className="mt-3">A loja online é explorada sob a marca <strong>{BUSINESS_NAME}</strong>, com sede em Coimbra, Portugal.</p>
              <p>Telefone: <a className="font-semibold text-primary hover:underline" href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}>{PHONE_NUMBER}</a> · Email: <a className="font-semibold text-primary hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">2. Produtos, preços e encomenda</h2>
              <p className="mt-3">As características essenciais, acabamento, unidade de venda e preço de cada produto são apresentados na loja. Os preços estão expressos em euros e incluem IVA à taxa legal em vigor.</p>
              <p className="mt-3">A encomenda é efetuada por caixas inteiras de pavimento ou barras inteiras de rodapé. A indicação de metros quadrados ou metros lineares permite calcular a quantidade a fornecer; prevalece sempre a quantidade de caixas ou barras constante do resumo final.</p>
              <p className="mt-3">O envio do formulário confirma a receção do pedido, mas a disponibilidade do material fica sujeita a confirmação pela CarpiMater. O comprovativo de pagamento é opcional. O contrato fica definitivamente confirmado após validação do pagamento e do stock.</p>
            </section>

            <section className="rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
              <div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><h2 className="font-display text-xl font-bold text-[#19242e]">3. Disponibilidade e rutura de stock</h2><p className="mt-3">As indicações de disponibilidade são atualizadas com regularidade, mas podem existir diferenças temporárias entre o stock apresentado e o stock efetivamente disponível no momento da confirmação.</p><p className="mt-3">Se, depois do pagamento, um produto estiver indisponível para entrega dentro do prazo indicado, a CarpiMater informará o cliente logo que tenha conhecimento. O cliente pode aceitar expressamente uma nova data de entrega ou cancelar a encomenda.</p><p className="mt-3"><strong>Se a encomenda for cancelada por rutura de stock, a CarpiMater devolverá integralmente o montante pago, através do mesmo meio de pagamento sempre que possível, no máximo até ao 10.º dia útil seguinte ao pagamento.</strong> Um produto alternativo só será fornecido com o consentimento expresso do cliente.</p></div></div>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">4. Pagamento, confirmação e fatura</h2>
              <p className="mt-3">Os meios de pagamento disponíveis são MB Way e transferência bancária. A encomenda só é processada após confirmação do pagamento. O envio do comprovativo pode facilitar essa confirmação, mas não é obrigatório. A CarpiMater emitirá o documento fiscal legalmente aplicável à transmissão dos bens.</p>
              <p className="mt-3">A estimativa de aplicação apresentada no checkout é meramente indicativa, não integra o preço pago pelos materiais e não constitui adjudicação do serviço. A aplicação é confirmada separadamente depois de avaliadas as condições da obra.</p>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">5. Entrega</h2>
              <p className="mt-3">O prazo indicado na loja é de até 10 dias úteis após confirmação de stock e pagamento, salvo acordo diferente comunicado ao cliente. A entrega regular e gratuita abrange a Região Centro. Outras zonas do país dependem de contacto prévio, disponibilidade e confirmação das respetivas condições.</p>
              <p className="mt-3">O cliente deve fornecer os dados necessários e assegurar o acesso ao local de descarga. No momento da entrega deve verificar o estado exterior da mercadoria e registar no documento do transportador qualquer dano visível, sem prejuízo dos direitos legais relativos a defeitos ou falta de conformidade.</p>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">6. Livre resolução e devoluções</h2>
              <p className="mt-3">Nos contratos celebrados à distância, o consumidor dispõe, em regra, de 14 dias seguidos a contar do dia seguinte à receção dos bens para comunicar a livre resolução, sem necessidade de indicar motivo. A comunicação pode ser enviada para <a className="font-semibold text-primary hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
              <p className="mt-3">Depois de comunicar a resolução, o consumidor deve devolver os bens dentro do prazo legal, completos e devidamente protegidos. O consumidor suporta o custo direto da devolução. Tratando-se de caixas e barras volumosas que normalmente não podem ser devolvidas por correio, o transporte deve ser previamente combinado ou contratado diretamente pelo consumidor.</p>
              <p className="mt-3">A CarpiMater reembolsa os pagamentos abrangidos dentro do prazo legal, podendo reter o reembolso até receber os bens ou prova do seu envio. Pode ser deduzida a depreciação resultante de manuseamento que exceda o necessário para verificar a natureza, características e funcionamento dos bens.</p>
              <p className="mt-3">O direito de livre resolução não se aplica nos casos legalmente excluídos, nomeadamente a bens produzidos segundo especificações do cliente ou manifestamente personalizados.</p>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">7. Modelo de comunicação de livre resolução</h2>
              <p className="mt-3">Pode copiar e enviar o texto seguinte:</p>
              <div className="mt-3 rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-600">“À CarpiMater: comunico que resolvo o contrato relativo à compra de [produto], encomendado em [data] e recebido em [data]. Nome: [nome]. Morada: [morada]. Referência da encomenda: [referência]. Data: [data].”</div>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">8. Garantia legal e reclamações</h2>
              <p className="mt-3">Os bens móveis beneficiam da garantia legal de conformidade em vigor, atualmente de três anos para bens novos, sem prejuízo de garantias comerciais adicionais do fabricante. Em caso de falta de conformidade, contacte a CarpiMater pelos meios indicados nesta página.</p>
              <p className="mt-3">O consumidor pode utilizar o <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Livro de Reclamações Eletrónico</a>.</p>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">9. Resolução alternativa de litígios</h2>
              <p className="mt-3">Em caso de litígio de consumo, o consumidor pode recorrer à entidade de resolução alternativa competente. Para a Região de Coimbra: <a href="https://cacrc.pt/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Centro de Arbitragem de Conflitos de Consumo da Região de Coimbra (CACRC)</a>. Para zonas não abrangidas por outro centro: <a href="https://www.cniacc.pt/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Centro Nacional de Informação e Arbitragem de Conflitos de Consumo (CNIACC)</a>.</p>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#19242e]">10. Dados pessoais e lei aplicável</h2>
              <p className="mt-3">Os dados da encomenda são tratados nos termos da <a href="/politica-de-privacidade" className="font-semibold text-primary hover:underline">Política de Privacidade</a>. Estes termos são regidos pela lei portuguesa, sem prejuízo das normas imperativas de proteção do consumidor aplicáveis.</p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
