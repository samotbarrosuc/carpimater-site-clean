import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SimulatorProvider } from '@/context/SimulatorContext'
import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Política de Privacidade — CarpiMater'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Política de privacidade e protecção de dados da CarpiMater, em conformidade com o RGPD.')
  }, [])

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

              <p className="text-muted-foreground text-sm mb-8">Última actualização: Maio de 2025</p>

              <div className="prose prose-sm max-w-none space-y-8 text-foreground">

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">1. Responsável pelo tratamento</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A responsável pelo tratamento dos seus dados pessoais é a <strong>CarpiMater</strong>, com sede em Coimbra, Portugal.<br />
                    Contacto: <a href="mailto:samotbarros@hotmail.com" className="text-primary hover:underline">samotbarros@hotmail.com</a>
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
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Os dados recolhidos podem incluir: nome, número de telefone, endereço de e-mail e descrição da necessidade de serviço.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">3. Finalidade do tratamento</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">Os seus dados são utilizados exclusivamente para:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2">
                    <li>Responder a pedidos de contacto e orçamento</li>
                    <li>Prestação dos serviços contratados</li>
                    <li>Comunicações relacionadas com obras e projectos em curso</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Não utilizamos os seus dados para fins de marketing sem o seu consentimento explícito.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">4. Base legal</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    O tratamento dos dados tem como base legal o seu consentimento (Art. 6.º, n.º 1, al. a) do RGPD) e a execução de contrato ou diligências pré-contratuais (Art. 6.º, n.º 1, al. b) do RGPD).
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">5. Partilha de dados</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Os seus dados não são vendidos, cedidos ou partilhados com terceiros para fins comerciais. Podem ser partilhados com subcontratados directamente envolvidos na execução do serviço (ex: equipas de montagem), apenas na medida estritamente necessária.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-display font-bold mb-3">6. Retenção de dados</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Os dados são conservados pelo período necessário à prestação do serviço e cumprimento de obrigações legais. Dados de contacto de clientes são conservados por um máximo de 3 anos após a conclusão do serviço, salvo exigência legal em contrário.
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
                    Para exercer qualquer destes direitos, contacte-nos por e-mail: <a href="mailto:samotbarros@hotmail.com" className="text-primary hover:underline">samotbarros@hotmail.com</a>
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
