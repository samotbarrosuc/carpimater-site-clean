import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SimulatorProvider } from '@/context/SimulatorContext'
import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <SimulatorProvider>
      <main>
        <Navbar />
        <section className="pt-32 pb-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Legal</p>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Política de Privacidade</h1>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-8">Última atualização: 23 de agosto de 2026</p>

              <div className="prose prose-sm max-w-none space-y-8 text-foreground">

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">1. Responsável pelo tratamento</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A responsável pelo tratamento dos seus dados pessoais é a <strong>CarpiMater</strong>, com sede em Coimbra, Portugal.<br />
                    Contacto: <a href="mailto:tomas.a.barros@hotmail.com" className="text-primary hover:underline">tomas.a.barros@hotmail.com</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">2. Dados recolhidos</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Recolhemos apenas os dados que nos fornece voluntariamente quando:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2">
                    <li>Nos contacta por telefone, WhatsApp ou e-mail</li>
                    <li>Preenche o formulário de contacto no nosso site</li>
                    <li>Solicita um orçamento ou informações sobre os nossos serviços</li>
                    <li>Efetua uma encomenda ou solicita a aplicação dos materiais</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Os dados recolhidos podem incluir nome, telefone, email, distrito, concelho, freguesia, morada, detalhes da encomenda, observações e comprovativo de pagamento. O email, a freguesia e a morada são opcionais no formulário de encomenda.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">3. Finalidade do tratamento</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">Os seus dados são utilizados exclusivamente para:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2">
                    <li>Responder a pedidos de contacto e orçamento</li>
                    <li>Prestação dos serviços contratados</li>
                    <li>Comunicações relacionadas com obras e projectos em curso</li>
                    <li>Processar encomendas, confirmar pagamentos, stock, entrega e faturação</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Não utilizamos os seus dados para fins de marketing sem o seu consentimento explícito.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">4. Base legal</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O tratamento tem como base a execução do contrato ou diligências pré-contratuais, o cumprimento de obrigações legais, nomeadamente fiscais e contabilísticas, e, quando aplicável, o consentimento do titular (Art. 6.º do RGPD).
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">5. Partilha de dados</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Os seus dados não são vendidos ou cedidos para fins comerciais. Podem ser tratados por prestadores estritamente necessários ao funcionamento da loja e à execução da encomenda, nomeadamente alojamento do site, envio de email, transportadores, contabilidade e equipas de montagem, sujeitos às obrigações de proteção de dados aplicáveis.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">6. Retenção de dados</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Os dados são conservados pelo período necessário ao processamento da encomenda, defesa de direitos e cumprimento das obrigações fiscais, contabilísticas e legais aplicáveis. Os comprovativos e documentos associados não são mantidos por mais tempo do que o necessário para essas finalidades.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">7. Os seus direitos</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Nos termos do RGPD, tem direito a:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2">
                    <li>Aceder aos seus dados pessoais</li>
                    <li>Rectificar dados incorrectos ou incompletos</li>
                    <li>Solicitar o apagamento dos dados ("direito ao esquecimento")</li>
                    <li>Opor-se ao tratamento ou solicitar a sua limitação</li>
                    <li>Apresentar reclamação à CNPD (Comissão Nacional de Protecção de Dados)</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Para exercer qualquer destes direitos, contacte-nos por email: <a href="mailto:tomas.a.barros@hotmail.com" className="text-primary hover:underline">tomas.a.barros@hotmail.com</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">8. Segurança</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Adoptamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda ou destruição.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">9. Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Este site não utiliza cookies de rastreamento ou de terceiros para fins publicitários. Podem ser utilizados cookies funcionais essenciais ao funcionamento do site. Não recolhemos dados de navegação para análise de comportamento sem o seu consentimento.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">10. Alterações a esta política</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Reservamo-nos o direito de actualizar esta política periodicamente. A versão mais recente estará sempre disponível nesta página.
                  </p>
                </section>

              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </SimulatorProvider>
  )
}
