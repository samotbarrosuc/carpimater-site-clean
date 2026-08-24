import { FormEvent, useState } from 'react'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { EMAIL, PHONE_NUMBER, SERVICE_AREA_TEXT, WHATSAPP_NUMBER } from '@/content/site'
import { CONTACT_MOBILE_ERROR, sanitizePortugueseMobile, validateContactDetails } from '@/lib/contact-validation'

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá CarpiMater! Gostaria de falar sobre o meu projeto.')}`

export default function ContactosPage() {
  const [form, setForm] = useState({ nome: '', contacto: '', mensagem: '' })
  const [status, setStatus] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)
    setShowWhatsAppFallback(false)

    const validationError = validateContactDetails(form.nome, form.contacto)
    if (validationError) {
      setStatus(validationError)
      return
    }

    setSending(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, nome: form.nome.trim() }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível enviar a mensagem.')
      setStatus('Mensagem enviada. Entraremos em contacto consigo em breve.')
      setForm({ nome: '', contacto: '', mensagem: '' })
    } catch {
      setStatus('Não foi possível enviar a mensagem. Contacte-nos através do WhatsApp.')
      setShowWhatsAppFallback(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#19242e]">
      <Navbar />
      <section className="bg-[#19242e] px-4 pb-12 pt-28 text-white sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="section-kicker">Contacto</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-[-0.035em] sm:text-6xl">Contacte a <span className="font-serif font-normal italic text-[#f08a45]">CarpiMater.</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">Envie-nos o seu pedido de carpintaria, materiais, entrega ou aplicação.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">Fale diretamente</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em]">Escolha como nos quer contactar.</h2>
          <div className="mt-8 space-y-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="clean-card flex items-center gap-3 rounded-xl p-4 font-semibold transition hover:border-[#25D366]/50"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25D366]/10"><MessageCircle className="h-4 w-4 text-[#25D366]" /></span><span>WhatsApp</span></a>
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="clean-card flex items-center gap-3 rounded-xl p-4 font-semibold transition hover:border-[#f05b13]/50"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7f3ea]"><Phone className="h-4 w-4 text-[#f05b13]" /></span><span>{PHONE_NUMBER.replace('+351 ', '')}</span></a>
            <a href={`mailto:${EMAIL}`} className="clean-card flex items-center gap-3 rounded-xl p-4 font-semibold transition hover:border-[#f05b13]/50"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7f3ea]"><Mail className="h-4 w-4 text-[#f05b13]" /></span><span>{EMAIL}</span></a>
          </div>
          <div className="mt-10 border-t border-[#d8ccbc] pt-6"><div className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[#f05b13]" /><div><h3 className="font-bold">Zona de atuação</h3><p className="mt-2 text-sm leading-6 text-[#40505b]">{SERVICE_AREA_TEXT}</p></div></div></div>
        </div>
        <form onSubmit={submit} className="clean-card rounded-2xl p-6 sm:p-9">
          <p className="section-kicker">Mensagem</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em]">Envie o seu pedido.</h2>
          <div className="mt-7 space-y-4">
            <label className="block text-sm font-semibold">Nome *<input name="nome" autoComplete="name" required minLength={2} value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} className="mt-2 w-full rounded-xl border border-[#d8ccbc] bg-[#f7f3ea] px-4 py-3 font-normal outline-none focus:border-[#f05b13]" /></label>
            <label className="block text-sm font-semibold">Telemóvel *<input name="telemovel" type="tel" inputMode="numeric" autoComplete="tel" required minLength={9} maxLength={9} pattern="9[0-9]{8}" title={CONTACT_MOBILE_ERROR} value={form.contacto} onChange={(event) => setForm({ ...form, contacto: sanitizePortugueseMobile(event.target.value) })} onInvalid={(event) => event.currentTarget.setCustomValidity(CONTACT_MOBILE_ERROR)} onInput={(event) => event.currentTarget.setCustomValidity('')} className="mt-2 w-full rounded-xl border border-[#d8ccbc] bg-[#f7f3ea] px-4 py-3 font-normal outline-none focus:border-[#f05b13]" /><span className="mt-1.5 hidden text-xs font-normal text-slate-500 sm:block">9 algarismos, começado por 9.</span></label>
            <label className="block text-sm font-semibold">Como podemos ajudar?<textarea value={form.mensagem} onChange={(event) => setForm({ ...form, mensagem: event.target.value })} rows={5} className="mt-2 w-full resize-none rounded-xl border border-[#d8ccbc] bg-[#f7f3ea] px-4 py-3 font-normal outline-none focus:border-[#f05b13]" /></label>
            <button type="submit" disabled={sending} className="w-full rounded-xl bg-[#f05b13] px-5 py-4 font-bold text-white transition hover:bg-[#d94d0d] disabled:cursor-not-allowed disabled:opacity-50">{sending ? 'A enviar...' : 'Enviar mensagem'}</button>
            {status && <p className={`text-sm ${status.startsWith('Mensagem') ? 'text-emerald-700' : 'text-red-600'}`}>{status}</p>}
            {showWhatsAppFallback && <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#25D366]/35 bg-[#25D366]/10 px-4 text-sm font-bold text-[#147a38] transition hover:bg-[#25D366]/15"><MessageCircle className="h-4 w-4" />Contactar via WhatsApp</a>}
          </div>
        </form>
      </section>
      <Footer />
    </main>
  )
}
