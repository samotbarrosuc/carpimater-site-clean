import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Droplets, House, Info, Layers3, MessageCircle, Minus, Plus, Ruler, ShoppingBag, Sparkles, Trash2, X } from 'lucide-react'
import { getProdutosByVariant, type Produto } from '@/content/vinil'
import { RODAPES, type RodapeProduto } from '@/content/rodapes'
import { BASEBOARD_BAR_LENGTH_M, FLOORING_BOX_AREA_M2, calcBaseboardPurchase, calcFlooringPurchase, formatEur, formatQuantity, parseQuantityInput, sanitizeQuantityInput } from '@/lib/calculations'
import { createBaseboardCartItem, createFlooringCartItem, getCartItemPrice } from '@/lib/cart'
import { useCart } from '@/context/CartContext'
import { getWhatsAppUrl } from '@/content/site'

type Choice = { kind: 'flooring'; product: Produto } | { kind: 'baseboard'; product: RodapeProduto }
type StoreCategory = 'all' | 'vinilico' | 'flutuante' | 'rodape'

let dialogScrollLocks = 0
let lockedScrollY = 0
let savedBodyStyles: Pick<CSSStyleDeclaration, 'position' | 'top' | 'left' | 'right' | 'width' | 'overflow'> | null = null
let savedHtmlOverflow = ''
let savedHtmlScrollBehavior = ''

function lockPageScroll() {
  if (dialogScrollLocks === 0) {
    lockedScrollY = window.scrollY
    savedBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    }
    savedHtmlOverflow = document.documentElement.style.overflow
    savedHtmlScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.scrollBehavior = 'auto'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${lockedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
  }
  dialogScrollLocks += 1

  return () => {
    dialogScrollLocks = Math.max(0, dialogScrollLocks - 1)
    if (dialogScrollLocks !== 0 || !savedBodyStyles) return
    const scrollY = lockedScrollY
    document.body.style.position = savedBodyStyles.position
    document.body.style.top = savedBodyStyles.top
    document.body.style.left = savedBodyStyles.left
    document.body.style.right = savedBodyStyles.right
    document.body.style.width = savedBodyStyles.width
    document.body.style.overflow = savedBodyStyles.overflow
    document.documentElement.style.overflow = savedHtmlOverflow
    window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
    document.documentElement.style.scrollBehavior = savedHtmlScrollBehavior
    savedBodyStyles = null
  }
}

function getVisibleViewportStyle(): CSSProperties {
  const viewport = window.visualViewport
  if (!viewport) return {}
  return {
    top: Math.round(viewport.offsetTop),
    left: Math.round(viewport.offsetLeft),
    width: Math.round(viewport.width),
    height: Math.round(viewport.height),
  }
}

function useDialogViewport(close: () => void, active = true) {
  const closeRef = useRef(close)
  closeRef.current = close
  const [viewportStyle, setViewportStyle] = useState<CSSProperties>(getVisibleViewportStyle)

  useEffect(() => {
    if (!active) return
    const releaseScroll = lockPageScroll()
    const updateViewport = () => setViewportStyle(getVisibleViewportStyle())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current()
    }
    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('keydown', onKeyDown)
    window.visualViewport?.addEventListener('resize', updateViewport)
    window.visualViewport?.addEventListener('scroll', updateViewport)
    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('keydown', onKeyDown)
      window.visualViewport?.removeEventListener('resize', updateViewport)
      window.visualViewport?.removeEventListener('scroll', updateViewport)
      releaseScroll()
    }
  }, [active])

  return viewportStyle
}

function ProductMedia({ image, color, name, kind }: { image?: string; color: string; name: string; kind: 'flooring' | 'baseboard' }) {
  if (image) {
    return <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#eee9e1]" aria-label={`Amostra de cor ${name}`}>
      <div
        className={`absolute shadow-[0_14px_24px_rgba(25,36,46,0.16)] ${kind === 'baseboard' ? 'inset-x-5 bottom-7 h-11 rounded-[3px]' : 'inset-5 rounded-lg'}`}
        style={{
          backgroundColor: color,
          backgroundImage: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,.22) 42%, transparent 65%), repeating-linear-gradient(0deg, rgba(25,36,46,.035) 0 1px, transparent 1px 8px)',
        }}
      />
      {kind === 'baseboard' && <div className="absolute inset-x-5 bottom-[26px] h-px bg-black/15" />}
    </div>
  )
}

function ProductInfoModal({ choice, close }: { choice: Choice; close: () => void }) {
  const flooring = choice.kind === 'flooring'
  const hybrid = flooring && choice.product.categoria === 'hibrido'
  const viewportStyle = useDialogViewport(close)

  return (
    <div className="fixed left-0 top-0 z-[80] flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#19242e]/65 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-sm sm:p-4" style={viewportStyle} role="dialog" aria-modal="true" aria-labelledby="product-info-title" onClick={close}>
      <div className="max-h-full w-full max-w-md touch-pan-y overflow-y-auto overscroll-contain rounded-2xl bg-white p-5 shadow-2xl [WebkitOverflowScrolling:touch] sm:p-6" onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-10 -mx-5 -mt-5 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 pb-4 pt-5 sm:-mx-6 sm:-mt-6 sm:px-6 sm:pt-6">
          <div>
            <p className="section-kicker">Informação do produto</p>
            <h2 id="product-info-title" className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-[#19242e]">{choice.product.nome}</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{choice.product.referencia}</p>
          </div>
          <button type="button" onClick={close} aria-label="Fechar informação" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"><X className="h-4 w-4" /></button>
        </div>

        {hybrid ? (
          <>
            <div className="mt-5 rounded-2xl border border-[#cfe4e5] bg-[#f0f8f8] p-4">
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-[#19242e]"><Layers3 className="h-4 w-4 text-[#239da7]" />Flutuante híbrido {choice.product.marca} {choice.product.colecao}<span className="rounded-full bg-primary px-2 py-0.5 text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-white">Novidade</span></div>
              <p className="mt-2 text-sm leading-6 text-slate-600">Pavimento laminado híbrido com núcleo HDF reforçado com carbono, textura de madeira e base acústica integrada. Adequado a cozinhas e casas de banho, com resistência à água e aos salpicos durante 100 h+.</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-[#e5ded5] bg-[#f7f3ea] p-4 text-sm">
              <div className="col-span-2"><dt className="text-xs text-slate-500">Formato da régua</dt><dd className="mt-1 font-bold text-[#19242e]">{choice.product.formato}</dd></div>
              <div><dt className="text-xs text-slate-500">Espessura total</dt><dd className="mt-1 font-bold text-[#19242e]">{choice.product.espessura}</dd></div>
              <div><dt className="text-xs text-slate-500">Garantia</dt><dd className="mt-1 font-bold text-[#19242e]">{choice.product.garantia}</dd></div>
            </dl>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.68rem] font-bold text-slate-600">
              <div className="rounded-xl border border-slate-200 p-3"><Droplets className="mx-auto mb-2 h-4 w-4 text-[#239da7]" />100 h+</div>
              <div className="rounded-xl border border-slate-200 p-3"><Layers3 className="mx-auto mb-2 h-4 w-4 text-[#239da7]" />Classe AC5</div>
              <div className="rounded-xl border border-slate-200 p-3"><Sparkles className="mx-auto mb-2 h-4 w-4 text-[#239da7]" />Fácil limpeza</div>
            </div>
            <ul className="mt-4 space-y-1.5 text-xs leading-5 text-slate-500">
              {choice.product.caracteristicas?.slice(2).map((feature) => <li key={feature}>• {feature}</li>)}
            </ul>
          </>
        ) : flooring ? (
          <>
            <div className="mt-5 rounded-2xl border border-[#e5ded5] bg-[#f7f3ea] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#19242e]"><Layers3 className="h-4 w-4 text-primary" />Pavimento vinílico SPC</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">Pavimento SPC impermeável, adequado a salas, quartos, cozinhas e casas de banho. É resistente ao uso diário e fácil de limpar.</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.68rem] font-bold text-slate-600">
              <div className="rounded-xl border border-slate-200 p-3"><House className="mx-auto mb-2 h-4 w-4 text-primary" />Toda a casa</div>
              <div className="rounded-xl border border-slate-200 p-3"><Droplets className="mx-auto mb-2 h-4 w-4 text-primary" />Impermeável</div>
              <div className="rounded-xl border border-slate-200 p-3"><Sparkles className="mx-auto mb-2 h-4 w-4 text-primary" />Fácil limpeza</div>
            </div>
          </>
        ) : (
          <>
            <p className="mt-5 text-sm leading-6 text-slate-600">Rodapé em PVC resistente à humidade e simples de limpar, pensado para proteger a base da parede e criar um acabamento uniforme.</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-[#e5ded5] bg-[#f7f3ea] p-4 text-sm">
              <div><dt className="text-xs text-slate-500">Material</dt><dd className="mt-1 font-bold text-[#19242e]">{choice.product.material}</dd></div>
              <div><dt className="text-xs text-slate-500">Altura</dt><dd className="mt-1 font-bold text-[#19242e]">{choice.product.altura}</dd></div>
              <div><dt className="text-xs text-slate-500">Espessura</dt><dd className="mt-1 font-bold text-[#19242e]">{choice.product.espessura}</dd></div>
              <div><dt className="text-xs text-slate-500">Comprimento</dt><dd className="mt-1 font-bold text-[#19242e]">{formatQuantity(BASEBOARD_BAR_LENGTH_M, 2)} m/barra</dd></div>
            </dl>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><Ruler className="h-4 w-4 shrink-0 text-primary" />Confirme as medidas antes de concluir a encomenda.</div>
          </>
        )}
      </div>
    </div>
  )
}

function PurchaseModal({ choice, close }: { choice: Choice; close: () => void }) {
  const [amount, setAmount] = useState('10')
  const [waste, setWaste] = useState(true)
  const { addItem } = useCart()
  const flooring = choice.kind === 'flooring'
  const price = flooring ? choice.product.precoM2 : choice.product.precoMl
  const numericAmount = parseQuantityInput(amount)
  const result = flooring ? calcFlooringPurchase(numericAmount, price, waste) : calcBaseboardPurchase(numericAmount, price, waste)
  const viewportStyle = useDialogViewport(close)

  const adjustAmount = (delta: number) => {
    const nextValue = Math.max(0, Math.round((parseQuantityInput(amount) + delta) * 100) / 100)
    setAmount(formatQuantity(nextValue))
  }

  const add = () => {
    if (result.units < 1) return
    addItem(flooring ? createFlooringCartItem(choice.product, numericAmount, waste) : createBaseboardCartItem(choice.product, numericAmount, waste))
    close()
  }

  return (
    <div className="fixed left-0 top-0 z-[70] flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#19242e]/72 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-sm sm:p-4" style={viewportStyle} role="dialog" aria-modal="true" aria-labelledby="purchase-title" onClick={close}>
      <div className="max-h-full w-full max-w-lg touch-pan-y overflow-y-auto overscroll-contain rounded-2xl bg-white p-5 shadow-2xl [WebkitOverflowScrolling:touch] sm:p-7" onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-10 -mx-5 -mt-5 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 pb-4 pt-5 sm:-mx-7 sm:-mt-7 sm:px-7 sm:pt-7">
          <div>
            <p className="section-kicker">{flooring ? 'Compra por caixas' : 'RODAPÉ - PVC'}</p>
            <h2 id="purchase-title" className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-[#19242e]">{choice.product.nome}</h2>
            <p className="mt-1 text-sm text-slate-500">{formatEur(price)}/{flooring ? 'm²' : 'm'} · IVA incluído</p>
          </div>
          <button type="button" onClick={close} aria-label="Fechar" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"><X className="h-4 w-4" /></button>
        </div>

        <label htmlFor="purchase-amount" className="mt-6 block text-sm font-semibold text-slate-800">Quantos {flooring ? 'm² precisa' : 'metros precisa'}?</label>
        <input
          id="purchase-amount"
          type="text"
          inputMode="decimal"
          pattern="[0-9]*,?[0-9]*"
          value={amount}
          onChange={(event) => setAmount(sanitizeQuantityInput(event.target.value))}
          onKeyDown={(event) => {
            if (event.key === 'ArrowUp') {
              event.preventDefault()
              adjustAmount(0.5)
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              adjustAmount(-0.5)
            }
          }}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-[#fbfaf7] px-4 py-3 text-lg outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        <p className="mt-1.5 text-xs leading-5 text-slate-400">Insira a quantidade que pretende</p>

        <label className="mt-4 flex cursor-pointer gap-3 rounded-xl border border-[#e4ded5] bg-[#f7f3ea] p-4 text-sm text-slate-700">
          <input type="checkbox" checked={waste} onChange={(event) => setWaste(event.target.checked)} className="mt-0.5 h-4 w-4 accent-orange-600" />
          <span><strong>Adicionar 10% para desperdícios</strong><span className="ml-2 text-xs font-bold text-primary">Recomendado</span><span className="mt-1 block text-xs leading-5 text-slate-500">A quantidade e o preço atualizam automaticamente.</span></span>
        </label>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-slate-500">Embalagens</p><p className="mt-1 text-lg font-bold text-[#19242e]">{result.units} {flooring ? 'caixas' : 'barras'}</p></div>
            <div><p className="text-xs text-slate-500">Total fornecido</p><p className="mt-1 text-lg font-bold text-[#19242e]">{formatQuantity(result.suppliedAmount, 2)} {flooring ? 'm²' : 'm'}</p></div>
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-slate-200 pt-4">
            <div><p className="text-xs text-slate-500">Total</p><p className="mt-1 text-2xl font-bold text-primary">{formatEur(result.totalPrice)}</p></div>
            <span className="pb-1 text-xs font-medium text-slate-400">IVA incluído</span>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 -mx-5 -mb-5 mt-5 border-t border-slate-100 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:-mx-7 sm:-mb-7 sm:px-7 sm:pb-7">
          <button type="button" onClick={add} disabled={result.units < 1} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#19242e] px-5 font-bold text-white transition hover:bg-[#f05b13] disabled:cursor-not-allowed disabled:opacity-50"><ShoppingBag className="h-4 w-4" />Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  )
}

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, changeUnits, subtotal } = useCart()
  const viewportStyle = useDialogViewport(() => setIsOpen(false), isOpen)

  if (!isOpen) return null

  return (
    <div className="fixed left-0 top-0 z-[60] h-[100dvh] w-full overflow-hidden bg-[#19242e]/55 backdrop-blur-sm" style={viewportStyle} onClick={() => setIsOpen(false)}>
      <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="absolute inset-y-0 right-0 flex h-full max-h-full w-full max-w-md flex-col overflow-hidden bg-[#fbfaf7] shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:p-5">
          <div><p className="section-kicker">A sua encomenda</p><h2 id="cart-title" className="mt-1 font-display text-2xl font-bold text-[#19242e]">Carrinho</h2></div>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Fechar carrinho" className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><X className="h-4 w-4" /></button>
        </header>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 [WebkitOverflowScrolling:touch] sm:p-5">
          {items.length === 0 ? (
            <div className="py-20 text-center"><ShoppingBag className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm text-slate-500">O carrinho está vazio.</p></div>
          ) : items.map((item) => (
            <div key={`${item.id}-${item.includeWaste}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">{item.image && <img src={item.image} alt="" className="h-full w-full object-cover" />}</div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#19242e]">{item.name}</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.kind === 'flooring' ? `${item.units} caixas · ${formatQuantity(FLOORING_BOX_AREA_M2, 2)} m²/caixa` : `${item.units} barras · ${formatQuantity(BASEBOARD_BAR_LENGTH_M, 2)} m/barra`}<br />Fornecido: {formatQuantity(item.suppliedAmount, 2)} {item.kind === 'flooring' ? 'm²' : 'm'}</p></div>
                <button type="button" onClick={() => removeItem(`${item.id}-${item.includeWaste}`)} aria-label={`Remover ${item.name}`} className="h-fit rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex items-center overflow-hidden rounded-lg border border-slate-200"><button type="button" onClick={() => changeUnits(`${item.id}-${item.includeWaste}`, item.units - 1)} aria-label="Diminuir quantidade" className="p-1.5 hover:bg-slate-50"><Minus className="h-3.5 w-3.5" /></button><span className="w-8 text-center text-sm font-bold">{item.units}</span><button type="button" onClick={() => changeUnits(`${item.id}-${item.includeWaste}`, item.units + 1)} aria-label="Aumentar quantidade" className="p-1.5 hover:bg-slate-50"><Plus className="h-3.5 w-3.5" /></button></div>
                <strong className="text-sm text-primary">{formatEur(getCartItemPrice(item))}</strong>
              </div>
            </div>
          ))}
        </div>
        <footer className="shrink-0 border-t border-slate-200 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:p-5"><div className="flex items-end justify-between"><span className="text-sm text-slate-500">Subtotal</span><span className="text-xl font-bold text-[#19242e]">{formatEur(subtotal)}</span></div><p className="mt-1 text-right text-xs text-slate-400">IVA incluído</p><a href="/encomenda" onClick={() => setIsOpen(false)} className="mt-3 block rounded-xl bg-primary px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#d94d0d] sm:mt-4 sm:py-3.5">Continuar encomenda</a></footer>
      </aside>
    </div>
  )
}

function FlooringCard({ product, onAdd, onInfo }: { product: Produto; onAdd: () => void; onInfo: () => void }) {
  const hybrid = product.categoria === 'hibrido'
  const floorLabel = hybrid ? `${product.marca} ${product.colecao}` : 'SPC vinílico'
  const consultationUrl = getWhatsAppUrl(`Olá! Gostaria de confirmar o stock do pavimento flutuante híbrido ZCUDO ${product.colecao}, acabamento ${product.nome}, anunciado a ${formatEur(product.precoM2)}/m².`, 'flutuante')

  return (
    <article id={`produto-${product.referencia.toLowerCase()}`} className="group min-w-0 scroll-mt-28 overflow-hidden rounded-2xl border border-[#e2ddd5] bg-white shadow-[0_1px_2px_rgba(25,36,46,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_14px_32px_rgba(25,36,46,0.09)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eee9e1]">
        <ProductMedia image={product.imagem} color={product.cor} name={product.nome} kind="flooring" />
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          <span className={`rounded-lg px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm ${hybrid ? 'bg-[#177d86]/92' : 'bg-[#19242e]/88'}`}>{hybrid ? 'Híbrido' : 'Vinílico'}</span>
          {hybrid && <span className="rounded-lg bg-primary px-2 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm">Novidade</span>}
        </div>
        <button type="button" onClick={onInfo} aria-label={`Ver informação de ${product.nome}`} className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[#19242e] shadow-md backdrop-blur-sm transition hover:bg-primary hover:text-white"><Info className="h-4 w-4" /></button>
      </div>
      <div className="p-3 sm:p-4">
        <p className="truncate text-[0.6rem] font-bold uppercase tracking-[0.14em] text-slate-400">{product.referencia} · {floorLabel}</p>
        <h3 className="mt-1.5 truncate font-display text-[0.95rem] font-bold text-[#19242e] sm:text-base">{product.nome}</h3>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          {product.sobConsulta ? (
            <>
              <div className="min-w-0"><strong className="block whitespace-nowrap text-sm text-[#19242e] sm:text-base">{formatEur(product.precoM2)}<span className="text-xs font-semibold text-slate-400">/m²</span></strong><span className="hidden text-[0.62rem] text-slate-400 sm:block">IVA incluído</span></div>
              <a href={consultationUrl} target="_blank" rel="noopener noreferrer" aria-label={`Confirmar stock de ${product.nome} por WhatsApp`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#177d86] text-white transition hover:bg-[#126a72] sm:w-auto sm:px-3"><MessageCircle className="h-4 w-4" /><span className="ml-1 hidden text-xs font-bold sm:inline">Confirmar stock</span></a>
            </>
          ) : (
            <>
              <div className="min-w-0"><strong className="block whitespace-nowrap text-sm text-[#19242e] sm:text-base">{formatEur(product.precoM2)}<span className="text-xs font-semibold text-slate-400">/m²</span></strong><span className="hidden text-[0.62rem] text-slate-400 sm:block">IVA incluído</span></div>
              <button type="button" onClick={onAdd} aria-label={`Adicionar ${product.nome}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f05b13] text-white transition hover:bg-[#d94d0d] sm:w-auto sm:px-3"><Plus className="h-4 w-4" /><span className="ml-1 hidden text-xs font-bold sm:inline">Adicionar</span></button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function BaseboardCard({ product, onAdd, onInfo }: { product: RodapeProduto; onAdd: () => void; onInfo: () => void }) {
  return (
    <article id={`produto-${product.referencia.toLowerCase()}`} className="group min-w-0 scroll-mt-28 overflow-hidden rounded-2xl border border-[#e2ddd5] bg-white shadow-[0_1px_2px_rgba(25,36,46,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_14px_32px_rgba(25,36,46,0.09)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eee9e1]">
        <ProductMedia image={product.imagem} color={product.cor} name={product.nome} kind="baseboard" />
        <span className="absolute left-2.5 top-2.5 rounded-lg bg-white/90 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#19242e] shadow-sm backdrop-blur-sm">Rodapé</span>
        <button type="button" onClick={onInfo} aria-label={`Ver informação de ${product.nome}`} className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[#19242e] shadow-md backdrop-blur-sm transition hover:bg-primary hover:text-white"><Info className="h-4 w-4" /></button>
      </div>
      <div className="p-3 sm:p-4">
        <p className="truncate text-[0.6rem] font-bold uppercase tracking-[0.14em] text-slate-400">{product.referencia} · {product.material}</p>
        <h3 className="mt-1.5 truncate font-display text-[0.95rem] font-bold text-[#19242e] sm:text-base">{product.nome}</h3>
        <p className="mt-1 hidden text-xs leading-[1.15rem] text-slate-500 sm:block">Altura: {product.altura}</p>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <div className="min-w-0"><strong className="block whitespace-nowrap text-sm text-[#19242e] sm:text-base">{formatEur(product.precoMl)}<span className="text-xs font-semibold text-slate-400">/m</span></strong><span className="hidden text-[0.62rem] text-slate-400 sm:block">IVA incluído</span></div>
          <button type="button" onClick={onAdd} aria-label={`Adicionar ${product.nome}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f05b13] text-white transition hover:bg-[#d94d0d] sm:w-auto sm:px-3"><Plus className="h-4 w-4" /><span className="ml-1 hidden text-xs font-bold sm:inline">Adicionar</span></button>
        </div>
      </div>
    </article>
  )
}

export default function StoreCatalog() {
  const getCategoryFromUrl = (): StoreCategory => {
    const value = new URLSearchParams(window.location.search).get('categoria')
    return value === 'rodape' || value === 'flutuante' || value === 'vinilico' ? value : 'all'
  }
  const [category, setCategory] = useState<StoreCategory>(getCategoryFromUrl)
  const [choice, setChoice] = useState<Choice | null>(null)
  const [infoChoice, setInfoChoice] = useState<Choice | null>(null)
  const { itemCount, setIsOpen } = useCart()
  const vinylProducts = getProdutosByVariant('vinilico')
  const hybridProducts = getProdutosByVariant('flutuante')
  const products = category === 'flutuante' ? hybridProducts : category === 'vinilico' ? vinylProducts : [...hybridProducts, ...vinylProducts]

  useEffect(() => {
    const updateCategory = () => setCategory(getCategoryFromUrl())
    window.addEventListener('popstate', updateCategory)
    return () => window.removeEventListener('popstate', updateCategory)
  }, [])

  const showFloors = category !== 'rodape'
  const showBases = category === 'all' || category === 'rodape'
  const isFlutuanteUnavailable = category === 'flutuante' && products.length === 0
  const tabs: Array<[StoreCategory, string]> = [['all', 'Todos'], ['vinilico', 'Vinílico SPC'], ['flutuante', 'Flutuante híbrido'], ['rodape', 'Rodapés']]

  return (
    <>
      <div className="-mx-4 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Categorias da loja">
        <div className="flex w-max gap-1 rounded-xl border border-[#ded8cf] bg-white p-1 shadow-sm">
          {tabs.map(([value, label]) => (
            <button key={value} type="button" role="tab" aria-selected={category === value} onClick={() => { setCategory(value); window.history.replaceState({}, '', value === 'all' ? '/loja' : `/loja?categoria=${value}`) }} className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition sm:text-sm ${category === value ? 'bg-[#19242e] text-white shadow-sm' : 'text-slate-500 hover:bg-[#f7f3ea] hover:text-[#19242e]'}`}>{label}{value === 'flutuante' && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[0.48rem] font-extrabold uppercase tracking-[0.08em] text-white">Novidade</span>}</button>
          ))}
        </div>
      </div>

      {isFlutuanteUnavailable ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[#cfc5b8] bg-white p-8 text-center sm:p-12"><p className="section-kicker">Disponibilidade sob consulta</p><h2 className="mt-3 font-display text-2xl font-bold text-[#19242e]">Estamos a atualizar o catálogo flutuante.</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">Fale connosco para confirmar modelos, preços e disponibilidade antes de encomendar.</p><a href="https://wa.me/351910093635?text=Ol%C3%A1!%20Gostaria%20de%20saber%20que%20pavimentos%20flutuantes%20est%C3%A3o%20dispon%C3%ADveis." target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white">Falar sobre flutuante</a></div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {showFloors && products.map((product) => <FlooringCard key={`floor-${product.referencia}`} product={product} onAdd={() => setChoice({ kind: 'flooring', product })} onInfo={() => setInfoChoice({ kind: 'flooring', product })} />)}
          {showBases && RODAPES.map((product) => <BaseboardCard key={`base-${product.id}`} product={product} onAdd={() => setChoice({ kind: 'baseboard', product })} onInfo={() => setInfoChoice({ kind: 'baseboard', product })} />)}
        </div>
      )}

      <button type="button" onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 z-40 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#19242e] px-3.5 text-sm font-bold text-white shadow-[0_14px_35px_rgba(25,36,46,0.25)] transition hover:bg-[#f05b13] sm:bottom-5 sm:right-5 sm:px-5"><ShoppingBag className="h-4 w-4" /><span className="hidden sm:inline">Carrinho</span><span className="rounded-md bg-white/12 px-1.5 py-0.5 text-xs">{itemCount}</span></button>
      {choice && <PurchaseModal choice={choice} close={() => setChoice(null)} />}
      {infoChoice && <ProductInfoModal choice={infoChoice} close={() => setInfoChoice(null)} />}
      <CartDrawer />
    </>
  )
}
