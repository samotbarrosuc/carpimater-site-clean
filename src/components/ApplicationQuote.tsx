import { useEffect, useMemo, useState } from 'react'
import { Calculator, Check, Info, MapPin, Pencil, Ruler, ShoppingBag, X } from 'lucide-react'
import { DISTRITOS, getConcelhosByDistrito, getTravelEntry } from '@/content/viagens'
import { calcEstimate, formatEur, formatQuantity, parseQuantityInput, sanitizeQuantityInput, type EstimateResult } from '@/lib/calculations'
import type { CartItem } from '@/lib/cart'

export interface ApplicationQuoteData {
  distrito: string
  concelho: string
  preferredDate?: string
  area: number
  rodape: number
  estimate: EstimateResult
  applicationTotal: number
}

function EditableApplicationAmount({
  label,
  value,
  materialAmount,
  suppliedAmount,
  unit,
  onChange,
  initiallyEditing = false,
}: {
  label: string
  value: number
  materialAmount: number
  suppliedAmount: number
  unit: 'm²' | 'm'
  onChange: (value: number) => void
  initiallyEditing?: boolean
}) {
  const [isEditing, setIsEditing] = useState(initiallyEditing)
  const [draft, setDraft] = useState(formatQuantity(value))

  const startEditing = () => {
    setDraft(formatQuantity(value))
    setIsEditing(true)
  }

  const save = () => {
    const nextValue = parseQuantityInput(draft)
    if (!Number.isFinite(nextValue) || nextValue <= 0) return
    onChange(nextValue)
    setIsEditing(false)
  }

  const adjustDraft = (delta: number) => {
    const nextValue = Math.max(0, Math.round((parseQuantityInput(draft) + delta) * 100) / 100)
    setDraft(formatQuantity(nextValue))
  }

  return (
    <div className="rounded-xl border border-[#ded8cf] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        {!isEditing && (
          <button type="button" onClick={startEditing} aria-label={`Editar ${label.toLowerCase()}`} title={`Editar ${label.toLowerCase()}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/25">
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2 flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <input type="text" inputMode="decimal" pattern="[0-9]*,?[0-9]*" value={draft} onChange={(event) => setDraft(sanitizeQuantityInput(event.target.value))} onKeyDown={(event) => { if (event.key === 'ArrowUp') { event.preventDefault(); adjustDraft(0.5) } if (event.key === 'ArrowDown') { event.preventDefault(); adjustDraft(-0.5) } if (event.key === 'Enter') { event.preventDefault(); save() } if (event.key === 'Escape') setIsEditing(false) }} className="w-full rounded-lg border border-primary bg-white py-2 pl-3 pr-10 font-display text-lg font-bold text-[#19242e] outline-none ring-2 ring-primary/10" />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-400">{unit}</span>
          </div>
          <button type="button" onClick={save} aria-label="Guardar valor" title="Guardar" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90"><Check className="h-4 w-4" /></button>
          <button type="button" onClick={() => setIsEditing(false)} aria-label="Cancelar edição" title="Cancelar" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"><X className="h-4 w-4" /></button>
        </div>
      ) : (
        <p className="mt-1 font-display text-xl font-bold text-[#19242e]">{formatQuantity(value, 2)} {unit}</p>
      )}

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {materialAmount <= 0
          ? `Valor apenas para aplicação. O rodapé não está incluído na encomenda de materiais.`
          : value !== materialAmount
          ? `Valor personalizado apenas para a aplicação. Material comprado: ${formatQuantity(materialAmount, 2)} ${unit}.`
          : `Material fornecido: ${formatQuantity(suppliedAmount, 2)} ${unit}, já considerando desperdício e embalagens inteiras.`}
      </p>
    </div>
  )
}

export default function ApplicationQuote({ items, onChange }: { items: CartItem[]; onChange: (quote: ApplicationQuoteData | null) => void }) {
  const [distrito, setDistrito] = useState('')
  const [concelho, setConcelho] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [areaOverride, setAreaOverride] = useState<number | null>(null)
  const [rodapeOverride, setRodapeOverride] = useState<number | null>(null)
  const [manualRodape, setManualRodape] = useState(false)

  const materialArea = useMemo(
    () => items.filter((item) => item.kind === 'flooring').reduce((total, item) => total + item.requestedAmount, 0),
    [items],
  )
  const flooringSupplied = useMemo(
    () => items.filter((item) => item.kind === 'flooring').reduce((total, item) => total + item.suppliedAmount, 0),
    [items],
  )
  const materialRodape = useMemo(
    () => items.filter((item) => item.kind === 'baseboard').reduce((total, item) => total + item.requestedAmount, 0),
    [items],
  )
  const baseboardSupplied = useMemo(
    () => items.filter((item) => item.kind === 'baseboard').reduce((total, item) => total + item.suppliedAmount, 0),
    [items],
  )
  const area = areaOverride ?? materialArea
  const rodape = materialRodape > 0 ? (rodapeOverride ?? materialRodape) : manualRodape ? (rodapeOverride ?? 10) : 0

  useEffect(() => {
    if (materialRodape > 0) {
      setManualRodape(false)
      setRodapeOverride(null)
    }
  }, [materialRodape])

  const concelhos = getConcelhosByDistrito(distrito)
  const travel = getTravelEntry(distrito, concelho)
  const estimate = useMemo(
    () => travel && (area > 0 || rodape > 0)
      ? calcEstimate(area, rodape, 0, 0, 0, travel.distance_km, travel.toll_eur, true)
      : null,
    [area, rodape, travel],
  )
  const applicationTotal = estimate
    ? estimate.custoMaoObra + estimate.custoMaoObraRodape + estimate.custoDeslocacaoKm + estimate.custoPortagens
    : 0

  useEffect(() => {
    onChange(estimate && travel ? { distrito, concelho, preferredDate: preferredDate.trim() || undefined, area, rodape, estimate, applicationTotal } : null)
  }, [applicationTotal, area, concelho, distrito, estimate, onChange, preferredDate, rodape, travel])

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-[#d8d0c4] bg-[#f8f5ef]">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm"><Calculator className="h-5 w-5" /></span>
          <div>
            <h3 className="font-display text-lg font-bold text-[#19242e]">Solicitar orçamento de aplicação</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">A área é calculada automaticamente a partir das quantidades-base que indicou ao adicionar os materiais.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {materialArea > 0 ? (
            <EditableApplicationAmount label="Área a pavimentar" value={area} materialAmount={materialArea} suppliedAmount={flooringSupplied} unit="m²" onChange={setAreaOverride} />
          ) : (
            <div className="rounded-xl border border-dashed border-[#ded8cf] bg-white/60 p-4 text-xs leading-5 text-slate-500">Não existem pavimentos no carrinho. A estimativa incluirá apenas a aplicação do rodapé.</div>
          )}
          {materialRodape > 0 ? (
            <EditableApplicationAmount label="Rodapé a aplicar" value={rodape} materialAmount={materialRodape} suppliedAmount={baseboardSupplied} unit="m" onChange={setRodapeOverride} />
          ) : manualRodape ? (
            <div className="space-y-2">
              <EditableApplicationAmount label="Rodapé a aplicar" value={rodape} materialAmount={0} suppliedAmount={0} unit="m" onChange={setRodapeOverride} initiallyEditing />
              <div className="flex flex-col gap-2 sm:flex-row">
                <button type="button" onClick={() => { setManualRodape(false); setRodapeOverride(null) }} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700">Remover da aplicação</button>
                <a href="/loja?categoria=rodape" className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-3 text-center text-xs font-bold text-primary transition-colors hover:bg-primary/10"><ShoppingBag className="h-3.5 w-3.5" />Adicionar ao carrinho</a>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#ded8cf] bg-white/60 p-4">
              <p className="text-xs leading-5 text-slate-500">Não existem rodapés no carrinho. Pode indicar apenas os metros a aplicar ou escolher o material na loja.</p>
              <div className="mt-3 flex flex-col gap-2">
                <button type="button" onClick={() => { setManualRodape(true); setRodapeOverride(10) }} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#19242e] px-3 text-xs font-bold text-white transition-colors hover:bg-primary"><Ruler className="h-3.5 w-3.5" />Adicionar rodapé</button>
                <a href="/loja?categoria=rodape" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-primary/25 bg-white px-3 text-center text-xs font-bold text-primary transition-colors hover:bg-primary/5"><ShoppingBag className="h-3.5 w-3.5" />Adicionar rodapé ao carrinho</a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-800">Distrito<select value={distrito} onChange={(event) => { setDistrito(event.target.value); setConcelho('') }} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-primary"><option value="">Escolha o distrito</option>{DISTRITOS.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label className="text-sm font-semibold text-slate-800">Concelho<select value={concelho} disabled={!distrito} onChange={(event) => setConcelho(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-primary disabled:bg-slate-100"><option value="">Escolha o concelho</option>{concelhos.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        </div>
        <label className="mt-4 block text-sm font-semibold text-slate-800">
          Para que data pretende o serviço? <span className="font-normal text-slate-400">(opcional)</span>
          <input type="text" value={preferredDate} maxLength={50} onChange={(event) => setPreferredDate(event.target.value)} placeholder="Ex.: setembro ou depois do dia 15" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-primary" />
          <span className="mt-1 block text-right text-[0.65rem] font-normal text-slate-400">{preferredDate.length}/50</span>
        </label>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          A aplicação regular abrange a Região Centro. Para uma obra noutra zona do país,{' '}
          <a href="/contactos" className="font-bold text-primary hover:underline">contacte-nos para confirmar disponibilidade</a>.
        </p>
      </div>

      {travel && estimate && (
        <div className="border-t border-[#d8d0c4] bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="section-kicker">Orçamento previsto de aplicação</p><p className="mt-1 text-xs text-slate-500">Não incluído no valor da encomenda de materiais</p></div>
            <strong className="font-display text-2xl text-primary">{formatEur(applicationTotal)}</strong>
          </div>
          <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-600">Aplicação do pavimento</dt><dd className="font-semibold text-[#19242e]">{formatEur(estimate.custoMaoObra)}</dd></div>
            {rodape > 0 && <div className="flex justify-between gap-4"><dt className="text-slate-600">Aplicação de rodapé</dt><dd className="font-semibold text-[#19242e]">{formatEur(estimate.custoMaoObraRodape)}</dd></div>}
            <div className="flex justify-between gap-4"><dt className="flex items-center gap-1.5 text-slate-600"><MapPin className="h-3.5 w-3.5 text-primary" />Deslocações</dt><dd className="font-semibold text-[#19242e]">{formatEur(estimate.custoDeslocacaoKm)}</dd></div>
            {estimate.custoPortagens > 0 && <div className="flex justify-between gap-4"><dt className="text-slate-600">Portagens</dt><dd className="font-semibold text-[#19242e]">{formatEur(estimate.custoPortagens)}</dd></div>}
          </dl>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-[#f8f5ef] p-3 text-[0.68rem] leading-5 text-slate-500"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />Este valor é apenas um orçamento previsto e não integra a fatura dos materiais. O valor final será confirmado pela equipa após verificar em obra o estado e as condições do pavimento atual.</p>
        </div>
      )}
    </div>
  )
}
