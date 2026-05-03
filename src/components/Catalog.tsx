// client component

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Info, X } from 'lucide-react'
import { useLocation } from 'wouter'
import { getProdutosByVariant, Produto } from '@/content/vinil'
import { RODAPES, RodapeProduto } from '@/content/rodapes'
import { getSiteVariantContent, getSiteVariantFromPath } from '@/content/site'
import { useSimulator } from '@/context/SimulatorContext'
import { formatEur } from '@/lib/calculations'

function getDocumentOffsetTop(element: HTMLElement): number {
  let top = 0
  let el: HTMLElement | null = element
  while (el) {
    top += el.offsetTop
    el = el.offsetParent as HTMLElement | null
  }
  return top
}

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    window.scrollTo({ top: getDocumentOffsetTop(element) - 100, behavior: 'smooth' })
  }
}

interface ProductCardProps {
  product: Produto
  isSelected: boolean
  onSelect: () => void
  onOpenInfo: (product: Produto) => void
  materialSingular: string
}

function ProductCard({ product, isSelected, onSelect, onOpenInfo, materialSingular }: ProductCardProps) {
  const borderColor = isSelected ? '#b45309' : '#e7e5e2'
  const shadowClass = isSelected 
    ? 'shadow-md shadow-amber-500/15 ring-1 ring-amber-500/40' 
    : 'hover:shadow-md hover:-translate-y-0.5'

  return (
    <div
      style={{ borderColor }}
      className={`text-left bg-card rounded-xl overflow-hidden border transition-all duration-200 ${shadowClass}`}
    >
      {/* Product Image/Color Swatch */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        {product.imagem ? (
          <img
            src={product.imagem}
            alt={product.nome}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: product.cor }}
          >
            {/* Wood grain texture overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  88deg,
                  transparent,
                  transparent 5px,
                  rgba(0,0,0,0.1) 5px,
                  rgba(0,0,0,0.1) 6px
                )`,
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20" />
          </div>
        )}

        {/* Selected badge */}
        {isSelected && (
          <div className="absolute top-2 left-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpenInfo(product)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/55 text-white hover:bg-black/70 transition-colors flex items-center justify-center"
          aria-label={`Informação sobre ${product.nome}`}
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
          {product.referencia}
        </p>
        <h3 className="font-semibold text-foreground text-sm sm:text-base">{product.nome}</h3>
        {product.useCase && <p className="text-xs text-muted-foreground mt-1">{product.useCase}</p>}
        {product.sobConsulta ? (
          <>
            <p className="text-sm text-primary font-semibold mt-1">Sob consulta</p>
            <p className="text-[11px] text-muted-foreground mt-1">Indique a referência na mensagem.</p>
          </>
        ) : (
          <p className="text-sm text-primary font-semibold mt-1">{formatEur(product.precoM2)}/m²</p>
        )}
        <button
          type="button"
          onClick={onSelect}
          className={`mt-3 w-full rounded-lg py-2 text-sm font-semibold transition-colors ${
            isSelected
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {isSelected ? 'Selecionado' : `Escolher este ${materialSingular}`}
        </button>
      </div>
    </div>
  )
}

interface BaseboardCardProps {
  baseboard: RodapeProduto
  isSelected: boolean
  isRecommended: boolean
  onSelect: () => void
  onOpenInfo: (baseboard: RodapeProduto) => void
}

function BaseboardCard({ baseboard, isSelected, isRecommended, onSelect, onOpenInfo }: BaseboardCardProps) {
  const borderColor = isRecommended ? '#16a34a' : (isSelected ? '#b45309' : '#e7e5e2')
  const shadowClass = isRecommended
    ? 'shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/35'
    : isSelected
    ? 'shadow-md shadow-amber-500/15 ring-1 ring-amber-500/40'
    : 'hover:shadow-md hover:-translate-y-0.5'

  return (
    <div
      style={{ borderColor }}
      className={`text-left bg-card rounded-xl overflow-hidden border transition-all duration-200 ${shadowClass}`}
    >
      <div className="relative h-32 sm:h-40 overflow-hidden bg-muted">
        {baseboard.imagem ? (
          <img
            src={baseboard.imagem}
            alt={baseboard.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-300" />
        )}

        {isRecommended && (
          <div className="absolute top-2 left-2 rounded-full bg-emerald-600 text-white text-[10px] font-semibold px-2.5 py-1">
            Indicado
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpenInfo(baseboard)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/55 text-white hover:bg-black/70 transition-colors flex items-center justify-center"
          aria-label={`Informação sobre ${baseboard.nome}`}
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
          {baseboard.referencia}
        </p>
        <h3 className="font-semibold text-foreground text-sm sm:text-base">{baseboard.nome}</h3>
        <p className="text-sm text-primary font-semibold mt-1">
          {formatEur(baseboard.precoMl)}/ml
        </p>
        <button
          type="button"
          onClick={onSelect}
          className={`mt-3 w-full rounded-lg py-2 text-sm font-semibold transition-colors ${
            isSelected
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {isSelected ? 'Selecionado' : 'Escolher este rodapé'}
        </button>
      </div>
    </div>
  )
}

interface BaseboardInfoModalProps {
  baseboard: RodapeProduto
  onClose: () => void
}

interface ProductInfoModalProps {
  product: Produto
  onClose: () => void
}

function ProductInfoModal({ product, onClose }: ProductInfoModalProps) {
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const siteContent = getSiteVariantContent(siteVariant)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
          aria-label="Fechar"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Informação técnica</p>
        <h4 className="text-xl font-bold text-foreground mb-4">{product.nome}</h4>

        <div className="space-y-2 text-sm text-foreground">
          <p><span className="font-semibold">Material:</span> {siteContent.materialTechnical}</p>
          <p><span className="font-semibold">Sistema:</span> {siteVariant === 'cozinha' ? 'Projeto por medida' : 'Uniclic'}</p>
          <p><span className="font-semibold">Garantia do fornecedor:</span> {siteContent.supplierWarrantyLabel}</p>
          {product.sobConsulta && (
            <p><span className="font-semibold">Preço:</span> Sob consulta (indique a referência na mensagem)</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function BaseboardInfoModal({ baseboard, onClose }: BaseboardInfoModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
          aria-label="Fechar"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Informação técnica</p>
        <h4 className="text-xl font-bold text-foreground mb-4">{baseboard.nome}</h4>

        <div className="space-y-2 text-sm text-foreground">
          <p><span className="font-semibold">Material:</span> {baseboard.material}</p>
          <p><span className="font-semibold">Espessura:</span> {baseboard.espessura}</p>
          <p><span className="font-semibold">Altura:</span> {baseboard.altura}</p>
          
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Catalog() {
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const siteContent = getSiteVariantContent(siteVariant)
  const produtos = getProdutosByVariant(siteVariant)
  const isKitchen = siteVariant === 'cozinha'
  const budgetSectionId = isKitchen ? 'final-cta' : 'simulador'
  const materialSingularCap = `${siteContent.materialSingular.charAt(0).toUpperCase()}${siteContent.materialSingular.slice(1)}`

  const {
    selectedProductId,
    setSelectedProductId,
    selectedBaseboardId,
    setSelectedBaseboardId,
    setIsPriceModalOpen,
  } = useSimulator()
  const [infoProduct, setInfoProduct] = useState<Produto | null>(null)
  const [infoBaseboard, setInfoBaseboard] = useState<RodapeProduto | null>(null)
  const [highlightBudgetCta, setHighlightBudgetCta] = useState(false)

  // Keep floating WhatsApp hidden while any product info popup is open.
  useEffect(() => {
    setIsPriceModalOpen(!!infoBaseboard || !!infoProduct)
  }, [infoBaseboard, infoProduct, setIsPriceModalOpen])

  const selectedProduct = produtos.find((p) => p.id === selectedProductId)
  const selectedBaseboard = RODAPES.find((r) => r.id === selectedBaseboardId)

  const normalizeName = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()

  const selectedProductName = selectedProduct ? normalizeName(selectedProduct.nome) : null
  const whiteBaseboardName = normalizeName('Branco Liso')
  const whiteBaseboard = RODAPES.find((r) => normalizeName(r.nome) === whiteBaseboardName) ?? null
  const recommendedBaseboard = selectedProductName
    ? RODAPES.find((r) => normalizeName(r.nome) === selectedProductName) ?? null
    : null

  const isBaseboardRecommendedForProduct = (product: Produto | null, baseboard: RodapeProduto | null) => {
    if (!product || !baseboard) return true
    const baseboardName = normalizeName(baseboard.nome)
    const productName = normalizeName(product.nome)
    return baseboardName === whiteBaseboardName || baseboardName === productName
  }

  const isSelectedBaseboardCompatible = isBaseboardRecommendedForProduct(
    selectedProduct ?? null,
    selectedBaseboard ?? null
  )

  const orderedBaseboards = [...RODAPES].sort((a, b) => {
    const aName = normalizeName(a.nome)
    const bName = normalizeName(b.nome)

    const aScore = aName === whiteBaseboardName ? 0 : (selectedProductName && aName === selectedProductName ? 1 : 2)
    const bScore = bName === whiteBaseboardName ? 0 : (selectedProductName && bName === selectedProductName ? 1 : 2)

    if (aScore !== bScore) return aScore - bScore
    return a.nome.localeCompare(b.nome, 'pt-PT')
  })

  const scrollToElement = (element: HTMLElement | null, offset = 88) => {
    if (!element) return
    window.scrollTo({ top: getDocumentOffsetTop(element) - offset, behavior: 'smooth' })
  }

  const scrollToRecommendedBaseboardNotice = () => {
    const selectedBlock = document.getElementById('catalogo-rodape-selecionado-topo')
    if (selectedBlock) {
      scrollToElement(selectedBlock)
      return
    }

    const notice = document.getElementById('catalogo-rodape-indicado-alerta')
    if (notice) {
      scrollToElement(notice)
      return
    }

    const fallback = document.getElementById('catalogo-rodapes')
    scrollToElement(fallback)
  }

  const applyRecommendedBaseboardSelection = (baseboardId: number | null | undefined) => {
    if (!baseboardId) return
    setSelectedBaseboardId(baseboardId)
  }

  const scrollToSimulator = () => {
    if (isKitchen) {
      scrollToSection('final-cta')
      return
    }

    if (selectedProductId || selectedBaseboardId) {
      const locationFieldset = document.getElementById('simulador-localizacao')
      // Keep a little extra breathing space from top for a cleaner visual start.
      scrollToElement(locationFieldset, 96)
      return
    }

    scrollToSection('simulador')
  }

  const handleSelectProduct = (product: Produto) => {
    setSelectedProductId(product.id)

    if (isKitchen) {
      setHighlightBudgetCta(true)
      setTimeout(() => {
        const target = document.getElementById('catalogo-resumo-orcamento')
        scrollToElement(target)
      }, 120)
      setTimeout(() => {
        setHighlightBudgetCta(false)
      }, 2600)
      return
    }

    // If a baseboard is already selected, jump straight to the final summary block.
    if (selectedBaseboardId) {
      const currentBaseboard = RODAPES.find((r) => r.id === selectedBaseboardId) ?? null
      const hasRecommendedPair = isBaseboardRecommendedForProduct(product, currentBaseboard)

      if (!hasRecommendedPair) {
        setHighlightBudgetCta(false)
        setTimeout(() => {
          scrollToRecommendedBaseboardNotice()
        }, 120)
        return
      }

      setHighlightBudgetCta(true)
      setTimeout(() => {
        const target = document.getElementById('catalogo-resumo-orcamento')
        scrollToElement(target)
      }, 120)
      setTimeout(() => {
        setHighlightBudgetCta(false)
      }, 2600)
      return
    }

    setTimeout(() => {
      const target = document.getElementById('catalogo-rodapes')
      scrollToElement(target)
    }, 120)
  }

  const handleSelectBaseboard = (baseboard: RodapeProduto) => {
    setSelectedBaseboardId(baseboard.id)

    // If there is no vinyl selected yet, guide user back up to pick one first.
    if (!selectedProductId) {
      setHighlightBudgetCta(false)
      setTimeout(() => {
        const target = document.getElementById('catalogo-vinilico')
        scrollToElement(target)
      }, 120)
      return
    }

    const currentProduct = produtos.find((p) => p.id === selectedProductId) ?? null
    const hasRecommendedPair = isBaseboardRecommendedForProduct(currentProduct, baseboard)

    if (!hasRecommendedPair) {
      setHighlightBudgetCta(false)
      setTimeout(() => {
        scrollToRecommendedBaseboardNotice()
      }, 120)
      return
    }

    setHighlightBudgetCta(true)
    setTimeout(() => {
      const target = document.getElementById('catalogo-resumo-orcamento')
      scrollToElement(target)
    }, 120)

    setTimeout(() => {
      setHighlightBudgetCta(false)
    }, 2600)
  }

  return (
    <section id="catalogo" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
            {siteContent.catalogHeaderLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Escolha o seu {siteContent.materialSingular}
          </h2>
          {!isKitchen && (
            <p className="text-sm text-muted-foreground">
              Já comprou o material noutro sítio e precisa apenas de aplicação?{' '}
              <button
                type="button"
                onClick={() => scrollToSection('simulador')}
                className="font-semibold text-primary hover:underline underline-offset-2"
              >
                Salte o catálogo — simule só mão de obra
              </button>
            </p>
          )}
        </div>

        <div className={`grid gap-4 mb-10 ${isKitchen ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
          <button
            type="button"
            onClick={() => scrollToSection('catalogo-vinilico')}
            className="group relative h-40 sm:h-44 lg:h-48 rounded-2xl overflow-hidden text-left"
          >
            <img
              src="/images/produtos-vinil/carvalho_mel_IMG_2897_optimized_2000-scaled-e1729769492932.jpeg"
              alt={siteContent.catalogPrimaryTitle}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative h-full p-5 sm:p-6 flex flex-col justify-end">
              <p className="text-white/80 text-[11px] uppercase tracking-widest mb-1">Catálogo</p>
              <h3 className="text-white text-xl sm:text-2xl font-bold">{siteContent.catalogPrimaryTitle}</h3>
            </div>
          </button>

          {!isKitchen && (
            <button
              type="button"
              onClick={() => scrollToSection('catalogo-rodapes')}
              className="group relative h-40 sm:h-44 lg:h-48 rounded-2xl overflow-hidden text-left"
            >
              <img
                src="/images/produtos-rodape/rodape pvc branco liso.jpg"
                alt="Rodapés"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative h-full p-5 sm:p-6 flex flex-col justify-end">
                <p className="text-white/80 text-[11px] uppercase tracking-widest mb-1">Catálogo</p>
                <h3 className="text-white text-xl sm:text-2xl font-bold">Rodapé</h3>
              </div>
            </button>
          )}
        </div>

        {/* Selected Product Notification */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-primary/10 border border-primary/25 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-primary"
                    style={{ backgroundColor: selectedProduct.cor }}
                  />
                  <span className="font-medium text-foreground">
                    {materialSingularCap} selecionado: {selectedProduct.nome} ({selectedProduct.referencia})
                  </span>
                </div>
                <button
                  onClick={() => scrollToSimulator()}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  {isKitchen ? 'Continuar para proposta' : 'Continuar para orçamento'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div id="catalogo-vinilico" className="mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">{siteContent.catalogPrimaryTitle}</h3>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-10">
          {produtos.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProductId === product.id}
              onSelect={() => handleSelectProduct(product)}
              onOpenInfo={(item) => setInfoProduct(item)}
              materialSingular={siteContent.materialSingular}
            />
          ))}
        </div>

        {/* Selected Baseboard Notification */}
        <AnimatePresence>
          {!isKitchen && selectedBaseboard && (
            <motion.div
              id="catalogo-rodape-selecionado-topo"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-primary/10 border border-primary/25 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-primary"
                    style={{ backgroundColor: selectedBaseboard.cor }}
                    aria-hidden="true"
                  >
                  </div>
                  <span className="font-medium text-foreground">
                    Rodapé selecionado: {selectedBaseboard.nome} ({selectedBaseboard.referencia})
                  </span>
                </div>
                <button
                  onClick={() => scrollToSimulator()}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Continuar para orçamento
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {selectedProduct && !isSelectedBaseboardCompatible && (
                <div
                  id="catalogo-rodape-indicado-alerta"
                  className="mt-3 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-800"
                >
                  Rodapé indicado para {selectedProduct.nome}:{' '}
                  {recommendedBaseboard ? (
                    <button
                      type="button"
                      onClick={() => applyRecommendedBaseboardSelection(recommendedBaseboard.id)}
                      className="font-semibold underline underline-offset-2 hover:text-emerald-900"
                    >
                      {recommendedBaseboard.nome} ({recommendedBaseboard.referencia})
                    </button>
                  ) : (
                    'Branco Liso'
                  )}
                  {' '}ou{' '}
                  <button
                    type="button"
                    onClick={() => applyRecommendedBaseboardSelection(whiteBaseboard?.id)}
                    className="font-semibold underline underline-offset-2 hover:text-emerald-900"
                  >
                    Branco Liso
                  </button>
                  .
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!isKitchen && (
          <div id="catalogo-rodapes" className="mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Rodapés</h3>
          </div>
        )}

        {!isKitchen && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
            {orderedBaseboards.map((baseboard) => (
              <BaseboardCard
                key={baseboard.id}
                baseboard={baseboard}
                isSelected={selectedBaseboardId === baseboard.id}
                isRecommended={
                  !!selectedProductName && normalizeName(baseboard.nome) === selectedProductName
                }
                onSelect={() => handleSelectBaseboard(baseboard)}
                onOpenInfo={(item) => setInfoBaseboard(item)}
              />
            ))}
          </div>
        )}

        {/* Bottom Summary + CTA */}
        <div id="catalogo-resumo-orcamento" className="mb-8 space-y-4">
          <div className="bg-primary/10 border border-primary/25 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full border-2 border-primary"
                style={{ backgroundColor: selectedProduct?.cor ?? '#f3f4f6' }}
                aria-hidden="true"
              />
              <span className="font-medium text-foreground">
                {materialSingularCap} selecionado:{' '}
                {selectedProduct
                  ? `${selectedProduct.nome} (${selectedProduct.referencia})`
                  : 'Ainda não selecionado'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedProductId(null)
                setTimeout(() => {
                  const target = document.getElementById('catalogo-vinilico')
                  scrollToElement(target)
                }, 80)
              }}
              disabled={!selectedProduct}
              className="text-xs sm:text-sm font-semibold text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
            >
              Limpar seleção
            </button>
          </div>

          {!isKitchen && (
            <div className="bg-primary/10 border border-primary/25 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full border-2 border-primary"
                  style={{ backgroundColor: selectedBaseboard?.cor ?? '#f3f4f6' }}
                  aria-hidden="true"
                />
                <span className="font-medium text-foreground">
                  Rodapé selecionado:{' '}
                  {selectedBaseboard
                    ? `${selectedBaseboard.nome} (${selectedBaseboard.referencia})`
                    : 'Ainda não selecionado'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedBaseboardId(null)
                  setTimeout(() => {
                    const target = document.getElementById('catalogo-rodapes')
                    scrollToElement(target)
                  }, 80)
                }}
                disabled={!selectedBaseboard}
                className="text-xs sm:text-sm font-semibold text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
              >
                Limpar seleção
              </button>

              {selectedProduct && selectedBaseboard && !isSelectedBaseboardCompatible && (
                <p className="w-full text-sm text-emerald-800 mt-1">
                  Indicado para {selectedProduct.nome}:{' '}
                  {recommendedBaseboard
                    ? `${recommendedBaseboard.nome} (${recommendedBaseboard.referencia})`
                    : 'Branco Liso'}
                  {' '}ou Branco Liso.
                </p>
              )}
            </div>
          )}

          <div className="text-center">
          <motion.button
            id="catalogo-calcular-orcamento"
            onClick={() => scrollToSimulator()}
            animate={highlightBudgetCta ? { scale: [1, 1.06, 1], y: [0, -4, 0] } : { scale: 1, y: 0 }}
            transition={highlightBudgetCta ? { duration: 0.45, repeat: 4 } : { duration: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            {isKitchen ? 'Avançar para a proposta' : 'Avançar para o orçamento'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {infoProduct && (
          <ProductInfoModal
            product={infoProduct}
            onClose={() => setInfoProduct(null)}
          />
        )}

      </AnimatePresence>

      <AnimatePresence>
        {!isKitchen && infoBaseboard && (
          <BaseboardInfoModal
            baseboard={infoBaseboard}
            onClose={() => setInfoBaseboard(null)}
          />
        )}
      </AnimatePresence>

    </section>
  )
}
