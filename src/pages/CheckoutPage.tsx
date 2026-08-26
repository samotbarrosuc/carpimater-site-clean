import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import { ArrowLeft, CheckCircle2, CreditCard, MessageCircle, ReceiptText, Smartphone, Upload } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { formatEur, formatQuantity } from '@/lib/calculations'
import { getCartItemPrice } from '@/lib/cart'
import ApplicationQuote, { type ApplicationQuoteData } from '@/components/ApplicationQuote'
import { EMAIL, PHONE_NUMBER, getWhatsAppUrl } from '@/content/site'
import { DISTRITOS_COM_OUTRO, OUTRO_DISTRITO, getConcelhosByDistrito } from '@/content/viagens'

type PaymentMethod = 'mbway' | 'iban'
const BANK_IBAN = 'PT50 0018 0003 5127 2706 0200 6'
const MAX_PROOF_SIZE_BYTES = 3 * 1024 * 1024
const TERMS_VERSION = '2026-08-24'
const MOBILE_PATTERN = /^9\d{8}$/

type FieldErrors = Record<string, string>

const FIELD_LABELS: Record<string, string> = {
  nome: 'Nome completo',
  telefone: 'Telefone',
  distrito: 'Distrito',
  concelho: 'Concelho',
  email: 'Email',
  comprovativo: 'Comprovativo de pagamento',
  applicationQuote: 'Orçamento de aplicação',
  termsAccepted: 'Termos e Condições',
  termsAcceptedCheckbox: 'Termos e Condições',
}

const SERVER_FIELD_MESSAGES: Record<string, string> = {
  nome: 'Introduza o seu nome.',
  telefone: 'Introduza um telemóvel português válido, com 9 algarismos e começado por 9.',
  email: 'Introduza um email válido ou deixe o campo em branco.',
  distrito: 'Escolha o distrito.',
  concelho: 'Escolha ou escreva o concelho.',
  items: 'O carrinho está vazio. Volte à loja e escolha pelo menos um material.',
  applicationQuote: 'Preencha a zona da obra para calcular o orçamento previsto de aplicação.',
  termsAccepted: 'Aceite os Termos e Condições para concluir a encomenda.',
  comprovativo: 'O comprovativo deve ser um PDF ou uma imagem JPG/PNG com no máximo 3 MB.',
}

function getProofContentType(selectedFile: File) {
  if (['application/pdf', 'image/jpeg', 'image/png'].includes(selectedFile.type)) return selectedFile.type
  const extension = selectedFile.name.split('.').pop()?.toLowerCase()
  if (extension === 'pdf') return 'application/pdf'
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg'
  if (extension === 'png') return 'image/png'
  return ''
}

function getFieldErrorSummary(errors: FieldErrors) {
  const first = Object.entries(errors)[0]
  if (!first) return ''
  const [field, message] = first
  return `${FIELD_LABELS[field] || 'Campo'}: ${message}`
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-xs font-semibold leading-5 text-red-600"><span className="mr-1 text-red-600">*</span>{message}</p>
}

function MaterialSummary({ items, subtotal }: { items: ReturnType<typeof useCart>['items']; subtotal: number }) {
  return (
    <section className="mt-7 overflow-hidden rounded-2xl border border-[#d8d0c4] bg-white shadow-[0_10px_30px_rgba(25,36,46,0.06)]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ea] text-primary"><ReceiptText className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Antes de continuar</p><h2 className="font-display text-xl font-bold text-[#19242e]">Resumo da encomenda</h2></div></div>
        <span className="rounded-lg bg-[#19242e] px-3 py-2 text-xs font-bold text-white">Valor a pagar</span>
      </header>
      <div className="divide-y divide-slate-100 px-5 sm:px-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.includeWaste}`} className="flex items-start justify-between gap-4 py-4">
            <div className="min-w-0"><p className="truncate text-sm font-bold text-[#19242e]">{item.name}</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.units} {item.kind === 'flooring' ? 'caixas' : 'barras'} · {formatQuantity(item.suppliedAmount, 2)} {item.kind === 'flooring' ? 'm²' : 'm'} fornecidos{item.includeWaste ? ' · com desperdício' : ''}</p></div>
            <strong className="shrink-0 text-sm text-[#19242e]">{formatEur(getCartItemPrice(item))}</strong>
          </div>
        ))}
      </div>
      <footer className="bg-[#19242e] px-5 py-5 text-white sm:px-6">
        <div className="flex items-center justify-between gap-4"><div><p className="text-xs text-white/55">Total dos materiais</p><p className="mt-1 text-xs text-emerald-300">Transporte gratuito · IVA incluído</p></div><strong className="font-display text-2xl text-[#f08a45]">{formatEur(subtotal)}</strong></div>
      </footer>
    </section>
  )
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const successRef = useRef<HTMLDivElement | null>(null)
  const [delivery, setDelivery] = useState<'material' | 'installation'>('material')
  const [payment, setPayment] = useState<PaymentMethod>('mbway')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [applicationQuote, setApplicationQuote] = useState<ApplicationQuoteData | null>(null)
  const [distrito, setDistrito] = useState('')
  const [concelho, setConcelho] = useState('')
  const [reference, setReference] = useState('')
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [termsAccepted, setTermsAccepted] = useState(false)
  const isOutroDistrito = distrito === OUTRO_DISTRITO
  const concelhos = isOutroDistrito ? [] : getConcelhosByDistrito(distrito)

  const clearFieldError = useCallback((field: string) => {
    setFormError('')
    setFieldErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }, [])

  const scrollToField = useCallback((field: string) => {
    requestAnimationFrame(() => {
      const element = document.querySelector<HTMLElement>(`[name="${field}"], [data-error-field="${field}"]`)
      if (!element) return
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      if ('focus' in element && typeof element.focus === 'function') {
        element.focus({ preventScroll: true })
      }
    })
  }, [])

  useEffect(() => {
    if (status !== 'success') return
    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }, [status])

  const controlClass = (field: string, extra = '') =>
    `w-full rounded-xl border px-4 py-3 text-base font-normal outline-none transition focus:border-primary ${
      fieldErrors[field] ? 'border-red-400 bg-red-50/40 ring-2 ring-red-100' : 'border-slate-300 bg-white'
    } ${extra}`

  const updateApplicationQuote = useCallback((quote: ApplicationQuoteData | null) => {
    setApplicationQuote(quote)
    if (quote) {
      setDistrito(quote.distrito)
      setConcelho(quote.concelho)
    }
  }, [])

  const fileToBase64 = (selectedFile: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result.split(',')[1] || '' : '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(selectedFile)
  })

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const nextErrors: FieldErrors = {}
    const nome = String(form.get('nome') || '').trim()
    const telefone = String(form.get('telefone') || '').trim()
    const email = String(form.get('email') || '').trim()
    const formDistrito = String(form.get('distrito') || '').trim()
    const formConcelho = String(form.get('concelho') || '').trim()

    const proofContentType = file ? getProofContentType(file) : ''
    if (nome.length < 2) nextErrors.nome = 'Introduza o seu nome.'
    if (!MOBILE_PATTERN.test(telefone)) nextErrors.telefone = 'Introduza um telemóvel português válido, com 9 algarismos e começado por 9.'
    if (!formDistrito) nextErrors.distrito = 'Escolha o distrito.'
    if (!formConcelho) nextErrors.concelho = 'Escolha ou escreva o concelho.'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Introduza um email válido ou deixe o campo em branco.'
    if (file && !proofContentType) {
      nextErrors.comprovativo = 'O comprovativo tem de ser um PDF ou uma imagem JPG/PNG.'
    }
    if (file && file.size > MAX_PROOF_SIZE_BYTES) {
      nextErrors.comprovativo = 'O comprovativo não pode ultrapassar 3 MB. Escolha um ficheiro mais pequeno.'
    }
    if (delivery === 'installation' && !applicationQuote) {
      nextErrors.applicationQuote = 'Preencha a zona da obra para calcular o orçamento previsto de aplicação.'
    }
    if (!termsAccepted) {
      nextErrors.termsAcceptedCheckbox = 'Aceite os Termos e Condições para concluir a encomenda.'
    }
    const firstInvalidField = Object.keys(nextErrors)[0]
    if (firstInvalidField) {
      setFieldErrors(nextErrors)
      setFormError(getFieldErrorSummary(nextErrors))
      setStatus('idle')
      scrollToField(firstInvalidField)
      return
    }
    if (!items.length || (delivery === 'installation' && !applicationQuote)) return
    setFormError('')
    setFieldErrors({})
    setStatus('sending')
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const ref = `CM-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    try {
      const comprovativo = file
        ? { name: file.name, type: proofContentType, size: file.size, base64: await fileToBase64(file) }
        : undefined
      const payload = Object.fromEntries(form.entries())
      const response = await fetch('/api/encomenda', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, items, subtotal, delivery, paymentMethod: payment, reference: ref, applicationQuote, comprovativo, termsAccepted, termsVersion: TERMS_VERSION }) })
      const responseData = await response.json().catch(() => null)
      if (!response.ok) {
        const serverFieldErrors = responseData?.details?.fieldErrors as FieldErrors | undefined
        if (serverFieldErrors && Object.keys(serverFieldErrors).length) {
          const normalizedErrors: FieldErrors = Object.fromEntries(Object.entries(serverFieldErrors).map(([key, value]) => {
            const field = key === 'termsAccepted' ? 'termsAcceptedCheckbox' : key
            return [field, SERVER_FIELD_MESSAGES[key] || (Array.isArray(value) ? value[0] : String(value))]
          }) as Array<[string, string]>)
          setFieldErrors(normalizedErrors)
          setFormError(getFieldErrorSummary(normalizedErrors))
          setStatus('idle')
          scrollToField(Object.keys(normalizedErrors)[0])
          return
        }
        throw new Error(responseData?.error || 'Não foi possível enviar a encomenda. Tente novamente.')
      }
      setReference(ref)
      setStatus('success')
      clear()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Não foi possível enviar a encomenda. Tente novamente.')
      setStatus('error')
      scrollToField('formError')
    }
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-[#f7f1e8] text-slate-950">
        <Navbar />
        <section className="mx-auto max-w-2xl px-4 pb-24 pt-40">
          <div ref={successRef} className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
            <h1 className="mt-6 text-4xl font-display font-bold">Pedido recebido</h1>
            {reference && <p className="mt-4 inline-block rounded-full bg-slate-100 px-4 py-2 font-mono text-sm font-bold text-slate-700">Referência: {reference}</p>}
            <p className="mt-5 leading-7 text-slate-600">Recebemos o pedido. Vamos verificar o pagamento, o stock e os dados de entrega antes do envio.</p>
            <div className="mt-6 space-y-2 rounded-2xl bg-emerald-50 p-5 text-left text-sm leading-6 text-emerald-900">
              <p className="font-bold text-emerald-700">O que acontece a seguir</p>
              <p>1. Confirmamos o stock e o pagamento.</p>
              <p>2. Ligamos ou enviamos mensagem para validar a morada e a entrega.</p>
              <p>3. Confirmamos consigo a data prevista de entrega.</p>
              <p>4. A fatura será enviada por email.</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/loja" className="inline-block rounded-xl bg-primary px-6 py-4 font-bold text-white">Voltar à loja</Link>
              <a href={getWhatsAppUrl(`Olá! Acabei de fazer a encomenda ${reference}. Gostaria de confirmar os detalhes.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-4 font-bold text-slate-700 hover:border-primary hover:text-primary"><MessageCircle className="h-5 w-5" />Falar no WhatsApp</a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] text-slate-950">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-32">
        <Link href="/loja" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary"><ArrowLeft className="h-4 w-4" />Voltar à loja</Link>
        <div className="mt-6 max-w-4xl">
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Finalizar encomenda</p>
            <h1 className="mt-2 text-4xl font-display font-bold">Finalize a sua encomenda</h1>
            {!items.length ? (
              <p className="mt-6 rounded-2xl bg-white p-6 text-slate-600">O carrinho está vazio. <Link href="/loja" className="font-bold text-primary">Escolher materiais</Link></p>
            ) : (
              <>
              <MaterialSummary items={items} subtotal={subtotal} />
              {formError && (
                <p data-error-field="formError" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
                  {formError}
                </p>
              )}
              <form onSubmit={submit} noValidate className="mt-6 space-y-6">
                <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-lg font-bold">1. Como pretende avançar?</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">{[['material', 'Só material', 'Recebe o material e faz a aplicação por sua conta.'], ['installation', 'Solicitar aplicação', 'Peça também um orçamento previsto para aplicação pela nossa equipa.']].map(([value, label, hint]) => <label key={value} className={`cursor-pointer rounded-xl border p-4 transition-colors ${delivery === value ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`}><input type="radio" name="tipo" value={value} checked={delivery === value} onChange={() => { setDelivery(value as typeof delivery); clearFieldError('applicationQuote'); if (value === 'material') setApplicationQuote(null) }} className="mr-2 accent-orange-600" /><span className="font-semibold">{label}</span><span className="mt-1 block pl-6 text-xs leading-5 text-slate-500">{hint}</span></label>)}</div>
                  {delivery === 'installation' && <div className="mt-4" data-error-field="applicationQuote"><ApplicationQuote items={items} onChange={(quote) => { clearFieldError('applicationQuote'); updateApplicationQuote(quote) }} /><FieldError message={fieldErrors.applicationQuote} /></div>}
                </section>

                <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-lg font-bold">2. Como quer pagar?</h2>
                  <p className="mt-1 text-sm text-slate-500">Paga apenas o material. A aplicação é uma estimativa e não é cobrada agora.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className={`cursor-pointer rounded-xl border p-4 transition-colors ${payment === 'mbway' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`}><input type="radio" name="paymentMethod" value="mbway" checked={payment === 'mbway'} onChange={() => setPayment('mbway')} className="mr-2 accent-orange-600" /><span className="font-semibold">MB Way</span><span className="mt-1 block pl-6 text-xs leading-5 text-slate-500">Envie o valor para o número indicado.</span></label>
                    <label className={`cursor-pointer rounded-xl border p-4 transition-colors ${payment === 'iban' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`}><input type="radio" name="paymentMethod" value="iban" checked={payment === 'iban'} onChange={() => setPayment('iban')} className="mr-2 accent-orange-600" /><span className="font-semibold">Transferência bancária</span><span className="mt-1 block pl-6 text-xs leading-5 text-slate-500">Transfira o valor para o IBAN indicado.</span></label>
                  </div>
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Dados de pagamento</p>
                    {payment === 'mbway' ? (
                      <div className="mt-3">
                        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900"><Smartphone className="h-4 w-4" />MB Way: <span className="font-mono">{PHONE_NUMBER}</span></p>
                        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-emerald-800">
                          <li>Abra a app MB Way e escolha <strong>Enviar dinheiro</strong>.</li>
                          <li>Envie {formatEur(subtotal)} (IVA inc.) para <strong>{PHONE_NUMBER}</strong> (Tomás Barros).</li>
                          <li>No descritivo, escreva o <strong>seu nome e a sua localidade</strong>.</li>
                          <li>Se quiser, pode anexar o comprovativo no passo 4.</li>
                        </ol>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900"><CreditCard className="h-4 w-4" />IBAN: <span className="font-mono">{BANK_IBAN}</span></p>
                        <p className="mt-2 text-sm leading-6 text-emerald-800">Transfira {formatEur(subtotal)} (IVA inc.) para o IBAN indicado. Pode anexar o comprovativo no passo 4.</p>
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-200 pt-3"><span className="text-sm text-emerald-800">Valor a pagar</span><span className="text-lg font-bold text-emerald-700">{formatEur(subtotal)} <span className="text-xs font-semibold text-emerald-600">(IVA inc.)</span></span></div>
                    <p className="mt-2 text-xs leading-5 text-emerald-800">Transporte gratuito na Região Centro. Para entregas noutras zonas do país, <a href="/contactos" className="font-bold underline underline-offset-2">contacte-nos primeiro</a> para confirmarmos disponibilidade e condições.</p>
                    <p className="mt-2 text-xs leading-5 text-emerald-800">A fatura será enviada por email após confirmação da encomenda.</p>
                  </div>
                </section>

                <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-lg font-bold">3. Os seus dados</h2>
                  <p className="mt-1 text-sm text-slate-500">Indique o contacto e a zona de entrega. Os campos assinalados são obrigatórios.</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold"><span className="mb-2 block">Nome completo <span className="text-primary">*</span></span><input name="nome" type="text" autoComplete="name" onChange={() => clearFieldError('nome')} aria-invalid={!!fieldErrors.nome} className={controlClass('nome')} /><FieldError message={fieldErrors.nome} /></label>
                    <label className="block text-sm font-semibold"><span className="mb-2 block">Telefone <span className="text-primary">*</span></span><input name="telefone" type="tel" inputMode="numeric" maxLength={9} autoComplete="tel" onChange={(event) => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 9); clearFieldError('telefone') }} aria-invalid={!!fieldErrors.telefone} className={controlClass('telefone')} /><FieldError message={fieldErrors.telefone} /></label>
                    <label className="block text-sm font-semibold"><span className="mb-2 block">Distrito <span className="text-primary">*</span></span><select name="distrito" value={distrito} onChange={(event) => { setDistrito(event.target.value); setConcelho(''); clearFieldError('distrito'); clearFieldError('concelho') }} aria-invalid={!!fieldErrors.distrito} className={controlClass('distrito')}><option value="">Escolha o distrito</option>{DISTRITOS_COM_OUTRO.map((item) => <option key={item} value={item}>{item}</option>)}</select><FieldError message={fieldErrors.distrito} /></label>
                    <label className="block text-sm font-semibold"><span className="mb-2 block">Concelho <span className="text-primary">*</span></span>{isOutroDistrito ? <input name="concelho" type="text" value={concelho} onChange={(event) => { setConcelho(event.target.value); clearFieldError('concelho') }} placeholder="Escreva o concelho" autoComplete="address-level2" aria-invalid={!!fieldErrors.concelho} className={controlClass('concelho')} /> : <select name="concelho" value={concelho} disabled={!distrito} onChange={(event) => { setConcelho(event.target.value); clearFieldError('concelho') }} aria-invalid={!!fieldErrors.concelho} className={controlClass('concelho', 'disabled:bg-slate-100 disabled:text-slate-400')}><option value="">Escolha o concelho</option>{concelhos.map((item) => <option key={item} value={item}>{item}</option>)}</select>}<FieldError message={fieldErrors.concelho} /></label>
                    <label className="block text-sm font-semibold"><span className="mb-2 block">Freguesia <span className="font-normal text-slate-400">(opcional)</span></span><input name="freguesia" type="text" autoComplete="address-level3" className={controlClass('freguesia')} /></label>
                    <label className="block text-sm font-semibold"><span className="mb-2 block">Morada <span className="font-normal text-slate-400">(opcional)</span></span><input name="morada" type="text" autoComplete="street-address" className={controlClass('morada')} /></label>
                    <label className="block text-sm font-semibold sm:col-span-2"><span className="mb-2 block">Email <span className="font-normal text-slate-400">(opcional)</span></span><input name="email" type="email" inputMode="email" autoComplete="email" onChange={() => clearFieldError('email')} aria-invalid={!!fieldErrors.email} className={controlClass('email')} /><FieldError message={fieldErrors.email} /><span className="mt-1.5 block text-xs font-normal leading-5 text-slate-500">A fatura será enviada por email após confirmação da encomenda.</span></label>
                  </div>
                  <label className="mt-4 block text-sm font-semibold"><span className="mb-2 block">Observações (opcional)</span><textarea name="observacoes" rows={3} className={controlClass('observacoes')} placeholder="Alguma nota sobre a entrega ou o pedido?" /></label>
                </section>

                <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-lg font-bold">4. Comprovativo de pagamento <span className="font-normal text-slate-400">(opcional)</span></h2>
                  <p className="mt-1 text-sm text-slate-500">Se quiser, pode anexar o comprovativo {payment === 'mbway' ? 'da app MB Way' : 'da transferência'}.</p>
                  <label data-error-field="comprovativo" className={`mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 text-sm font-semibold hover:border-primary ${fieldErrors.comprovativo ? 'border-red-400 bg-red-50/40 ring-2 ring-red-100' : 'border-slate-300'}`}><Upload className="h-5 w-5 text-primary" />{file ? file.name : 'Escolher ficheiro (PDF, JPG ou PNG · máximo 3 MB)'}<input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => { setFile(event.target.files?.[0] || null); setFormError(''); clearFieldError('comprovativo') }} className="sr-only" /></label>
                  <FieldError message={fieldErrors.comprovativo} />
                  {status === 'error' && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                      <p className="font-semibold">Não foi possível enviar o pedido. Tente novamente.</p>
                      <p className="mt-1">Se o problema continuar, pode enviar o comprovativo diretamente por <a href={`mailto:${EMAIL}?subject=Comprovativo de encomenda`} className="font-bold underline">email</a> ou <a href={getWhatsAppUrl('Olá! Quero enviar o comprovativo de pagamento da minha encomenda.')} target="_blank" rel="noopener noreferrer" className="font-bold underline">WhatsApp</a>.</p>
                    </div>
                  )}
                  <label className={`mt-5 flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 text-slate-700 ${fieldErrors.termsAcceptedCheckbox ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50'}`}>
                    <input name="termsAcceptedCheckbox" type="checkbox" checked={termsAccepted} onChange={(event) => { setTermsAccepted(event.target.checked); clearFieldError('termsAcceptedCheckbox') }} className="mt-1 h-4 w-4 shrink-0 accent-orange-600" />
                    <span>Li e aceito os <a href="/termos-e-condicoes" target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline underline-offset-2">Termos e Condições</a> para concluir a compra.</span>
                  </label>
                  <FieldError message={fieldErrors.termsAcceptedCheckbox} />
                  <button type="submit" disabled={status === 'sending'} className="mt-4 w-full rounded-xl bg-primary px-5 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{status === 'sending' ? 'A enviar...' : 'Confirmar encomenda de materiais'}</button>
                  <p className="mt-3 text-center text-xs text-slate-400">Ao confirmar, enviamos o seu pedido para a equipa CarpiMater. A fatura será enviada por email.</p>
                </section>
              </form>
              </>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
