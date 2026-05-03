// client component

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLocation } from 'wouter'
import {
  Calculator,
  MapPin,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  MessageCircle,
} from 'lucide-react'
import { getProdutosByVariant, getProdutoById } from '@/content/vinil'
import { RODAPES, getRodapeById } from '@/content/rodapes'
import { DISTRITOS, getConcelhosByDistrito, getTravelEntry } from '@/content/viagens'
import { useSimulator } from '@/context/SimulatorContext'
import { calcEstimate, formatEur, EstimateResult } from '@/lib/calculations'
import { reportWebsiteError } from '@/lib/error-report'
import { WHATSAPP_NUMBER, getSiteVariantContent, getSiteVariantFromPath, getWhatsAppUrl } from '@/content/site'

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

// Form schemas
const step1Schema = z.object({
  distrito: z.string().min(1, 'Selecione o distrito'),
  concelho: z.string().min(1, 'Selecione o concelho'),
  freguesia: z.string().min(1, 'Indique a freguesia'),
  morada: z.string().optional(),
  area: z.coerce.number().min(0, 'Área mínima de 0 m²'),
  rodape: z.coerce.number().min(0, 'Valor inválido'),
  pavimentoAtual: z.string().min(1, 'Selecione o tipo de pavimento'),
  estadoPavimento: z.string().min(1, 'Selecione o estado'),
  portas: z.coerce.number().min(0).max(99, 'Máximo 99 portas'),
  rodapeProdutoId: z.coerce.number({
    invalid_type_error:
      'Se não pretende rodapé, por favor seleccione OFF, clicando no botão ON.',
  }).min(0, 'Selecione um rodapé válido.'),
  foto: z.any().optional(),
  produtoId: z.coerce.number({
    invalid_type_error:
      'Se não pretende este pavimento, por favor seleccione OFF, clicando no botão ON.',
  }).min(0, 'Selecione um pavimento'),
  includeVinilico: z.boolean().default(true),
  includeRodape: z.boolean().default(true),
  soMaoDeObra: z.boolean().default(false),
})

const step2Schema = z.object({
  nome: z.string().min(2, 'Nome muito curto'),
  telemovel: z.string().min(9, 'Telemóvel inválido'),
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>

const TIPOS_PAVIMENTO = [
  'Cerâmica/Mosaico',
  'Madeira maciça',
  'Flutuante antigo',
  'Cimento/Betonilha',
  'Outro',
]

const ESTADOS_PAVIMENTO = [
  'Está nivelado e pronto a aplicar',
  'Não sei avaliar',
  'Tem desníveis / peças soltas / humidade',
]

const PRECO_MAO_OBRA_CONSULTA_M2 = 10

// Input styling helpers
function inputCls(hasError: boolean): string {
  return `w-full px-4 py-4 rounded-xl border bg-background text-foreground transition-colors focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-destructive focus:ring-destructive/50'
      : 'border-input focus:border-primary focus:ring-primary/50'
  }`
}

function selectCls(hasError: boolean): string {
  return `${inputCls(hasError)} appearance-none cursor-pointer pr-10`
}

function disabledNeutralCls(disabled: boolean): string {
  return disabled
    ? 'opacity-45 cursor-not-allowed border-slate-200 bg-slate-50 text-slate-500'
    : ''
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1] || '')
      } else {
        reject(new Error('Falha ao converter ficheiro para base64'))
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function generateQuoteReference(prefix: string): string {
  const now = new Date()
  const y = now.getFullYear().toString().slice(-2)
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `${prefix}-${y}${m}${d}-${random}`
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.49 2 2 6.49 2 12c0 1.76.46 3.47 1.33 4.98L2 22l5.2-1.36A9.96 9.96 0 0 0 12 22c5.51 0 10-4.49 10-10S17.51 2 12 2Zm0 18c-1.52 0-3-.4-4.3-1.16l-.31-.18-3.09.81.83-3.01-.2-.31A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8Zm4.38-6.03c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.17-.71-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.1-.49.1-.1.24-.26.36-.39.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.8-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.56 4.07 3.59.57.25 1.02.4 1.37.51.58.18 1.11.15 1.53.09.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

export default function Simulator() {
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const isKitchen = siteVariant === 'cozinha'
  const siteContent = getSiteVariantContent(siteVariant)
  const produtos = getProdutosByVariant(siteVariant)
  const materialLabel = siteContent.materialSingular
  const materialLabelCap = `${materialLabel.charAt(0).toUpperCase()}${materialLabel.slice(1)}`
  const materialLabelPlural = siteContent.materialPlural
  const searchParams = new URLSearchParams(window.location.search)
  const {
    selectedProductId,
    setSelectedProductId,
    selectedBaseboardId,
    setSelectedBaseboardId,
    setIsPriceModalOpen,
  } = useSimulator()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [estimate, setEstimate] = useState<EstimateResult | null>(null)
  const [formData, setFormData] = useState<Step1Data | null>(null)
  const [leadData, setLeadData] = useState<Step2Data | null>(null)
  const [quoteReference, setQuoteReference] = useState<string | null>(null)
  const [soMaoDeObraMode, setSoMaoDeObraMode] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitWarning, setSubmitWarning] = useState<string | null>(null)

  // Step 1 form
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    watch: watch1,
    setValue: setValue1,
    getValues: getValues1,
    reset: reset1,
    resetField: resetField1,
    setError: setError1,
    clearErrors: clearErrors1,
    formState: { errors: errors1 },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    shouldUnregister: false,
    defaultValues: {
      produtoId: selectedProductId || undefined,
      rodapeProdutoId: selectedBaseboardId || undefined,
      includeVinilico: true,
      includeRodape: !isKitchen,
      soMaoDeObra: false,
    },
  })

  // Step 2 form
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  })

  const watchedDistrito = watch1('distrito')
  const watchedArea = watch1('area')
  const watchedIncludeVinilico = watch1('includeVinilico')
  const watchedIncludeRodape = watch1('includeRodape')
  const watchedProdutoIdRaw = watch1('produtoId')
  const watchedProdutoId = Number(watchedProdutoIdRaw)
  const watchedSelectedProduto = getProdutoById(watchedProdutoId, siteVariant)
  const watchedRodapeIdRaw = watch1('rodapeProdutoId')
  const watchedRodapeId = Number(watchedRodapeIdRaw)
  const watchedSelectedRodape = getRodapeById(watchedRodapeId)
  const isConsultaProdutoSelecionado = !!watchedSelectedProduto?.sobConsulta
  const bothMaterialsOff = !soMaoDeObraMode && !watchedIncludeVinilico && !watchedIncludeRodape
  const hasSyncedFromQueryRef = useRef(false)
  const step2TopRef = useRef<HTMLDivElement | null>(null)
  const step1FormRef = useRef<HTMLFormElement | null>(null)

  const isNavigableField = (element: Element): element is HTMLInputElement | HTMLSelectElement => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement)) {
      return false
    }

    if (element.disabled) return false
    if (element.getClientRects().length === 0) return false

    if (element instanceof HTMLInputElement) {
      const blockedInputTypes = new Set(['hidden', 'submit', 'button', 'reset', 'checkbox', 'radio', 'file'])
      if (blockedInputTypes.has(element.type)) return false
    }

    return true
  }

  const focusNextStep1Field = (currentField: HTMLInputElement | HTMLSelectElement): boolean => {
    const form = step1FormRef.current
    if (!form) return false

    const fields = Array.from(form.querySelectorAll('input, select')).filter(isNavigableField)
    const currentIndex = fields.indexOf(currentField)
    if (currentIndex < 0) return false

    const nextField = fields[currentIndex + 1]
    if (!nextField) return false

    nextField.focus({ preventScroll: true })
    nextField.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    return true
  }

  const handleStep1FormEnter = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== 'Enter') return
    if (event.nativeEvent.isComposing) return

    const target = event.target
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return
    if (!isNavigableField(target)) return

    const didMove = focusNextStep1Field(target)
    if (!didMove) return

    event.preventDefault()
  }

  const focusNextAfterSelectChange = (currentField: HTMLSelectElement) => {
    if (!currentField.value) return

    // Run after DOM updates so browser selection closes first and focus move is reliable.
    window.requestAnimationFrame(() => {
      focusNextStep1Field(currentField)
    })
  }

  const normalizeName = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()

  const whiteBaseboardName = normalizeName('Branco Liso')
  const recommendedRodape = watchedSelectedProduto
    ? RODAPES.find((r) => normalizeName(r.nome) === normalizeName(watchedSelectedProduto.nome)) ?? null
    : null
  const whiteRodape = RODAPES.find((r) => normalizeName(r.nome) === whiteBaseboardName) ?? null
  const isRodapeCompatível = !watchedSelectedProduto || !watchedSelectedRodape
    ? true
    : (() => {
        const selectedRodapeName = normalizeName(watchedSelectedRodape.nome)
        const selectedProdutoName = normalizeName(watchedSelectedProduto.nome)
        return selectedRodapeName === whiteBaseboardName || selectedRodapeName === selectedProdutoName
      })()

  const produtoField = register1('produtoId', { valueAsNumber: true })
  const rodapeField = register1('rodapeProdutoId', { valueAsNumber: true })

  const applySuggestedRodapeSelection = (rodapeId: number | null | undefined) => {
    if (!rodapeId) return
    setSelectedBaseboardId(rodapeId)
    setValue1('rodapeProdutoId', rodapeId)
    setValue1('includeRodape', true)
    clearErrors1('rodapeProdutoId')
  }

  const scrollToEstimateStart = () => {
    const element = step2TopRef.current ?? document.getElementById('simulador-estimativa-top')
    if (!element) return
    window.scrollTo({ top: getDocumentOffsetTop(element) - 92, behavior: 'smooth' })
  }

  const scheduleScrollToEstimateStart = (attempt = 0) => {
    const element = step2TopRef.current ?? document.getElementById('simulador-estimativa-top')
    if (element) {
      window.scrollTo({ top: getDocumentOffsetTop(element) - 92, behavior: 'smooth' })
      return
    }

    if (attempt >= 12) return
    setTimeout(() => scheduleScrollToEstimateStart(attempt + 1), 80)
  }

  const openVinilicoCatalogFromSimulator = () => {
    const currentProdutoId = Number(getValues1('produtoId'))
    const currentRodapeId = Number(getValues1('rodapeProdutoId'))

    if (Number.isFinite(currentProdutoId) && currentProdutoId > 0 && getProdutoById(currentProdutoId, siteVariant)) {
      setSelectedProductId(currentProdutoId)
    } else {
      setSelectedProductId(null)
    }

    if (Number.isFinite(currentRodapeId) && currentRodapeId > 0 && getRodapeById(currentRodapeId)) {
      setSelectedBaseboardId(currentRodapeId)
    } else {
      setSelectedBaseboardId(null)
    }

    scrollToSection('catalogo-vinilico')
  }

  const openRodapeCatalogFromSimulator = () => {
    const currentRodapeId = Number(getValues1('rodapeProdutoId'))
    if (Number.isFinite(currentRodapeId) && currentRodapeId > 0 && getRodapeById(currentRodapeId)) {
      setSelectedBaseboardId(currentRodapeId)
    } else {
      setSelectedBaseboardId(null)
    }
    scrollToSection('catalogo-rodapes')
  }

  useEffect(() => {
    if (hasSyncedFromQueryRef.current) return

    const produtoParam = Number(searchParams.get('produtoId'))
    const rodapeParam = Number(searchParams.get('rodapeProdutoId'))

    if (Number.isFinite(produtoParam) && produtoParam > 0 && getProdutoById(produtoParam, siteVariant)) {
      setSelectedProductId(produtoParam)
      setValue1('produtoId', produtoParam)
      setValue1('includeVinilico', true)
    }

    if (Number.isFinite(rodapeParam) && rodapeParam > 0 && getRodapeById(rodapeParam)) {
      setSelectedBaseboardId(rodapeParam)
      setValue1('rodapeProdutoId', rodapeParam)
      setValue1('includeRodape', true)
    }

    hasSyncedFromQueryRef.current = true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prevDistritoRef = useRef<string | undefined>(undefined)
  useEffect(() => {
    if (prevDistritoRef.current !== undefined && watchedDistrito !== prevDistritoRef.current) {
      setValue1('concelho', '')
    }
    prevDistritoRef.current = watchedDistrito
  }, [watchedDistrito, setValue1])

  useEffect(() => {
    if (watchedProdutoId === 0) {
      if (!soMaoDeObraMode) {
        setValue1('pavimentoAtual', 'N/A')
        setValue1('estadoPavimento', 'N/A')
        setValue1('area', 0)
        setValue1('portas', 0)
      }

      clearErrors1(['area', 'pavimentoAtual', 'estadoPavimento', 'portas'])
    } else {
      const currentPav = getValues1('pavimentoAtual')
      const currentEstado = getValues1('estadoPavimento')
      if (currentPav === 'N/A') setValue1('pavimentoAtual', '')
      if (currentEstado === 'N/A') setValue1('estadoPavimento', '')
    }
  }, [watchedProdutoId, soMaoDeObraMode, setValue1, getValues1, clearErrors1])

  const MAX_ATTACHMENT_MB = 10
  const MAX_ATTACHMENT_BYTES = MAX_ATTACHMENT_MB * 1024 * 1024

  const getTotalAttachmentBytes = (files: File[]) => files.reduce((sum, file) => sum + file.size, 0)

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)
    const newFiles = event.target.files ? Array.from(event.target.files) : []
    const combinedFiles = [...uploadedFiles, ...newFiles]
    const totalSize = getTotalAttachmentBytes(combinedFiles)

    if (totalSize > MAX_ATTACHMENT_BYTES) {
      setFileError(`O limite total é ${MAX_ATTACHMENT_MB} MB. Remova ficheiros ou escolha outros.`)
      return
    }

    setUploadedFiles(combinedFiles)
  }

  // Sync selected product from context
  useEffect(() => {
    if (selectedProductId) {
      setValue1('produtoId', selectedProductId)
      return
    }

    resetField1('produtoId', { defaultValue: undefined })
  }, [selectedProductId, setValue1, resetField1])

  useEffect(() => {
    if (selectedBaseboardId) {
      setValue1('rodapeProdutoId', selectedBaseboardId)
      return
    }

    resetField1('rodapeProdutoId', { defaultValue: undefined })
  }, [selectedBaseboardId, setValue1, resetField1])

  useEffect(() => {
    if (!isKitchen) return
    setValue1('includeRodape', false)
    setValue1('rodapeProdutoId', 0)
    setValue1('rodape', 0)
    clearErrors1(['rodapeProdutoId', 'rodape'])
    setSelectedBaseboardId(null)
  }, [isKitchen, setValue1, clearErrors1, setSelectedBaseboardId])

  useEffect(() => {
    setValue1('soMaoDeObra', soMaoDeObraMode)
    if (soMaoDeObraMode) {
      setValue1('includeVinilico', false)
      setValue1('includeRodape', false)
      setValue1('produtoId', 0)
      setValue1('rodapeProdutoId', 0)
      // pavimentoAtual e estadoPavimento ficam editáveis em modo mão de obra
    }
  }, [soMaoDeObraMode, setValue1])

  useEffect(() => {
    if (!soMaoDeObraMode && !watchedIncludeVinilico) {
      setValue1('produtoId', 0)
      setValue1('pavimentoAtual', 'N/A')
      setValue1('estadoPavimento', 'N/A')
      setValue1('area', 0)
      setValue1('portas', 0)
      clearErrors1(['produtoId', 'pavimentoAtual', 'estadoPavimento', 'area', 'portas'])
    } else if (!soMaoDeObraMode && watchedIncludeVinilico && watchedProdutoId === 0) {
      resetField1('produtoId', { defaultValue: undefined })
      clearErrors1('produtoId')
    }
  }, [watchedIncludeVinilico, watchedProdutoId, soMaoDeObraMode, setValue1, resetField1, clearErrors1])

  useEffect(() => {
    if (!soMaoDeObraMode && !watchedIncludeRodape) {
      setValue1('rodapeProdutoId', 0)
      setValue1('rodape', 0)
      clearErrors1(['rodapeProdutoId', 'rodape'])
    } else if (!soMaoDeObraMode && watchedIncludeRodape && Number(getValues1('rodapeProdutoId')) === 0) {
      resetField1('rodapeProdutoId', { defaultValue: undefined })
      clearErrors1('rodapeProdutoId')
    }
  }, [watchedIncludeRodape, soMaoDeObraMode, setValue1, getValues1, resetField1, clearErrors1])

  useEffect(() => {
    if (!isConsultaProdutoSelecionado) return
    setValue1('portas', 0)
    clearErrors1('portas')
  }, [isConsultaProdutoSelecionado, setValue1, clearErrors1])

  const concelhos = watchedDistrito ? getConcelhosByDistrito(watchedDistrito) : []

  const adjustNumericField = (field: 'area' | 'rodape' | 'portas', delta: number) => {
    const currentValue = Number(getValues1(field) || 0)
    let nextValue = currentValue + delta

    if (nextValue < 0) nextValue = 0
    if (field === 'portas' && nextValue > 99) nextValue = 99

    setValue1(field, nextValue)
    clearErrors1(field as any)
  }

  const clearStep1Form = () => {
    setUploadedFiles([])
    setFileError(null)
    setSubmitError(null)
    clearErrors1()
    setSelectedProductId(null)
    setSelectedBaseboardId(null)

    if (soMaoDeObraMode) {
      reset1({
        distrito: '',
        concelho: '',
        freguesia: '',
        morada: '',
        area: 0,
        rodape: 0,
        pavimentoAtual: '',
        estadoPavimento: '',
        portas: 0,
        rodapeProdutoId: 0,
        foto: undefined,
        produtoId: 0,
        includeVinilico: false,
        includeRodape: false,
        soMaoDeObra: true,
      })
    } else {
      reset1({
        distrito: '',
        concelho: '',
        freguesia: '',
        morada: '',
        area: 0,
        rodape: 0,
        pavimentoAtual: '',
        estadoPavimento: '',
        portas: 0,
        rodapeProdutoId: undefined,
        foto: undefined,
        produtoId: undefined,
        includeVinilico: true,
        includeRodape: true,
        soMaoDeObra: false,
      })
    }

    // Force-reset selection fields to avoid stale values in select inputs.
    resetField1('produtoId', { defaultValue: undefined })
    resetField1('rodapeProdutoId', { defaultValue: undefined })
    clearErrors1(['produtoId', 'rodapeProdutoId'])

    setTimeout(() => scrollToSection('simulador'), 80)
  }

  // Update modal state when step changes
  useEffect(() => {
    setIsPriceModalOpen(step !== 1)
  }, [step, setIsPriceModalOpen])

  // When opening the estimate step, move viewport to the start of the summary block.
  useEffect(() => {
    if (step !== 2 && step !== 3) return
    // Same behavior pattern used in catalog: delayed, retry-based smooth scroll.
    const timeout = setTimeout(() => {
      scheduleScrollToEstimateStart()
    }, 120)

    return () => clearTimeout(timeout)
  }, [step])

  // Handle Step 1 submit
  const onSubmitStep1 = (data: Step1Data) => {
    clearErrors1('root')
    const wantsVinilico = soMaoDeObraMode ? false : data.includeVinilico
    const wantsRodape = isKitchen ? false : (soMaoDeObraMode ? false : data.includeRodape)

    if (!soMaoDeObraMode && !wantsVinilico && !wantsRodape) {
      setError1('produtoId', { message: isKitchen ? `Ative ${materialLabelCap}.` : `Ative pelo menos ${materialLabelCap} ou Rodapé.` })
      return
    }

    if (soMaoDeObraMode) {
      data.produtoId = 0
      data.rodapeProdutoId = 0
      data.includeVinilico = false
      data.includeRodape = false
      data.soMaoDeObra = true
      // pavimentoAtual e estadoPavimento mantêm o valor que o utilizador escolheu
    }
    const produto = wantsVinilico ? getProdutoById(data.produtoId, siteVariant) : null
    const rodapeProduto = wantsRodape ? getRodapeById(data.rodapeProdutoId) : null
    const travel = getTravelEntry(data.distrito.trim(), data.concelho.trim())

    if (wantsVinilico && !produto) {
      setError1('produtoId', { message: `Seleccione um ${materialLabel} válido.` })
      return
    }
    if (wantsRodape && !rodapeProduto) {
      setError1('rodapeProdutoId', { message: 'Selecione um rodapé válido.' })
      return
    }
    if (!travel) {
      setError1('concelho', {
        message:
          'Não encontrámos dados de deslocação para esta combinação. Escolha outro concelho ou contacte-nos.',
      })
      return
    }

    const areaForEstimate = wantsVinilico ? data.area : 0
    const rodapeForEstimate = wantsRodape ? data.rodape : 0
    const portasForEstimate = wantsVinilico ? data.portas : 0

    const finalArea = soMaoDeObraMode ? data.area : areaForEstimate
    const finalRodape = soMaoDeObraMode ? data.rodape : rodapeForEstimate
    const finalPortas = soMaoDeObraMode ? data.portas : portasForEstimate

    let result = calcEstimate(
      finalArea,
      finalRodape,
      finalPortas,
      produto?.precoM2 ?? 0,
      rodapeProduto?.precoMl ?? 0,
      travel.distance_km,
      travel.toll_eur,
      data.soMaoDeObra
    )

    if (wantsVinilico && produto?.sobConsulta && !data.soMaoDeObra) {
      const custoMaoObraConsulta = finalArea * PRECO_MAO_OBRA_CONSULTA_M2
      result = {
        ...result,
        custoMaterial: 0,
        custoMaterialCliente: 0,
        custoMaoObra: custoMaoObraConsulta,
        totalBase: custoMaoObraConsulta,
        valorMin: custoMaoObraConsulta,
        valorMax: custoMaoObraConsulta,
      }
    }

    data.produtoId = wantsVinilico ? data.produtoId : 0
    data.rodapeProdutoId = wantsRodape ? data.rodapeProdutoId : 0
    data.area = finalArea
    data.rodape = finalRodape
    data.portas = finalPortas
    if (!wantsVinilico && !soMaoDeObraMode) {
      data.pavimentoAtual = 'N/A'
      data.estadoPavimento = 'N/A'
    }

    setEstimate(result)
    setFormData(data)

    const initialFiles: File[] = []
    if (data.foto) {
      if (data.foto instanceof FileList) {
        initialFiles.push(...Array.from(data.foto))
      } else if (Array.isArray(data.foto)) {
        initialFiles.push(...data.foto)
      } else if (data.foto instanceof File) {
        initialFiles.push(data.foto)
      }
    }
    setUploadedFiles(initialFiles)

    setStep(2)
    setTimeout(() => scheduleScrollToEstimateStart(), 120)
  }

  // Handle Step 2 submit — capta lead e envia email mesmo antes do clique no WhatsApp.
  const onSubmitStep2 = async (contact: Step2Data) => {
    if (!formData || !estimate) {
      setSubmitError('Dados da simulação em falta. Refaça o passo anterior.')
      return
    }

    const wantsVinilico = formData.soMaoDeObra ? false : formData.includeVinilico
    const wantsRodape = isKitchen ? false : (formData.soMaoDeObra ? false : formData.includeRodape)

    const produto = wantsVinilico ? getProdutoById(formData.produtoId, siteVariant) : null
    const rodapeProduto = wantsRodape ? getRodapeById(formData.rodapeProdutoId) : null

    if (wantsVinilico && !produto) {
      setSubmitError(`Produto inválido. Selecione novamente o ${materialLabel}.`)
      return
    }
    if (wantsRodape && !rodapeProduto) {
      setSubmitError('Rodapé inválido. Selecione novamente o rodapé.')
      return
    }

    const localQuoteReference = generateQuoteReference(siteContent.quotePrefix)
    setQuoteReference(localQuoteReference)
    setLeadData(contact)

    setSubmitError(null)
    setSubmitWarning(null)
    setIsSubmitting(true)
    try {
      const attachments = await Promise.all(
        uploadedFiles.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: await fileToBase64(file),
        }))
      )

      const res = await fetch('/api/simulacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            nome: contact.nome,
            telemovel: contact.telemovel,
          },
          comentarios:
            'Lead captada antes de prosseguir para o WhatsApp. Contactar cliente mesmo sem clique final.',
          step1: {
            produtoId: formData.produtoId,
            distrito: formData.distrito,
            concelho: formData.concelho,
            freguesia: formData.freguesia,
            morada: formData.morada,
            area: formData.area,
            rodape: formData.rodape,
            rodapeProdutoId: wantsRodape ? formData.rodapeProdutoId : 0,
            pavimentoAtual: formData.pavimentoAtual,
            estadoPavimento: formData.estadoPavimento,
            portas: formData.portas,
            soMaoDeObra: formData.soMaoDeObra,
          },
          estimate,
          produtoNome: produto?.nome ?? (formData.soMaoDeObra ? `Cliente fornece ${materialLabel}` : 'Não incluído'),
          produtoReferencia: produto?.referencia,
          rodapeNome: formData.soMaoDeObra ? 'Cliente fornece rodapé' : (rodapeProduto?.nome ?? 'Não incluído'),
          rodapeReferencia: rodapeProduto?.referencia,
          materialLabel: materialLabelCap,
          siteVariant,
          quoteReference: localQuoteReference,
          attachments,
        }),
      })
      const responseText = await res.text()
      let json: { error?: string; details?: unknown } = {}

      try {
        json = responseText ? JSON.parse(responseText) : {}
      } catch {
        json = {}
      }

      if (!res.ok) {
        const apiMessage =
          typeof json.error === 'string'
            ? json.error
            : responseText.trim()
            ? responseText.trim()
            : 'Não foi possível enviar o email automático.'

        reportWebsiteError({
          source: 'simulator.submit',
          message: apiMessage,
          context: {
            quoteReference: localQuoteReference,
            siteVariant,
            distrito: formData.distrito,
            concelho: formData.concelho,
            freguesia: formData.freguesia,
            endpoint: '/api/simulacao',
            status: res.status,
          },
        })

        setSubmitWarning(`Falha ao enviar lead por email: ${apiMessage}`)
      }
    } catch {
      const networkMessage = 'Erro de rede ao enviar email automático.'
      reportWebsiteError({
        source: 'simulator.submit',
        message: networkMessage,
        context: {
          quoteReference: localQuoteReference,
          siteVariant,
          distrito: formData.distrito,
          concelho: formData.concelho,
          freguesia: formData.freguesia,
          endpoint: '/api/simulacao',
        },
      })
      setSubmitWarning(`${networkMessage} Pode continuar para ver a estimativa detalhada.`)
    } finally {
      setIsSubmitting(false)
    }

    setStep(3)
  }

  const proceedToWhatsApp = () => {
    if (!formData || !estimate || !leadData) return

    const wantsVinilico = formData.soMaoDeObra ? false : formData.includeVinilico
    const wantsRodape = isKitchen ? false : (formData.soMaoDeObra ? false : formData.includeRodape)
    const produto = wantsVinilico ? getProdutoById(formData.produtoId, siteVariant) : null
    const rodapeProduto = wantsRodape ? getRodapeById(formData.rodapeProdutoId) : null
    const reference = quoteReference || generateQuoteReference(siteContent.quotePrefix)
    const local = `${formData.freguesia}, ${formData.concelho}, ${formData.distrito}`
    const morada = formData.morada?.trim() ? formData.morada.trim() : 'Não indicada'

    const whatsappMessage = [
      `Olá, gostaria de saber quando têm disponibilidade para realizar o serviço.`,
      '',
      `*Pedido de Orçamento*`,
      `*Referência:* ${reference}`,
      '',
      `*Cliente*`,
      `Nome: ${leadData.nome}`,
      `Telemóvel: ${leadData.telemovel}`,
      '',
      `*Obra*`,
      `Local: ${local}`,
      `Morada: ${morada}`,
      `Modo: ${formData.soMaoDeObra ? 'Apenas mão de obra' : 'Simulador completo'}`,
      `${isKitchen ? 'Estado atual da cozinha' : 'Pavimento atual'}: ${formData.pavimentoAtual}`,
      `${isKitchen ? 'Estado da cozinha' : 'Estado pavimento'}: ${formData.estadoPavimento}`,
      `Área: ${formData.area} m²`,
      ...(!isKitchen ? [`Rodapé: ${formData.rodape} m`] : []),
      `Perfis/portas: ${formData.portas} un`,
      '',
      `*Materiais selecionados*`,
      `${materialLabelCap}: ${produto ? `${produto.nome} (${produto.referencia})` : (formData.soMaoDeObra ? `Cliente fornece ${materialLabel}` : 'Não incluído')}`,
      ...(!isKitchen
        ? [`Rodapé: ${rodapeProduto ? `${rodapeProduto.nome} (${rodapeProduto.referencia})` : (formData.soMaoDeObra ? 'Cliente fornece rodapé' : 'Não incluído')}`]
        : []),
      '',
      `*Estimativa apresentada*`,
      produto?.sobConsulta && !formData.soMaoDeObra
        ? `${formatEur(estimate.custoMaoObra)} (mão de obra, material sob orçamento)`
        : `${formatEur(estimate.valorMin)} — ${formatEur(estimate.valorMax)} (sem IVA)`,
    ].join('\n')

    const webUrl = getWhatsAppUrl(whatsappMessage, siteVariant)
    const appUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(whatsappMessage)}`
    const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)

    if (!isMobileDevice) {
      window.open(`/whatsapp-redirect.html?url=${encodeURIComponent(webUrl)}`, '_blank')
      return
    }

    let didCleanup = false
    let fallbackTimer: number | null = null

    const cleanup = () => {
      if (didCleanup) return
      didCleanup = true
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer)
      }
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', onPageHide)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanup()
      }
    }

    const onPageHide = () => {
      cleanup()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', onPageHide)

    fallbackTimer = window.setTimeout(() => {
      cleanup()
      // If app did not open, fall back to WhatsApp web URL in same tab.
      window.location.replace(webUrl)
    }, 1600)

    // Try opening WhatsApp native app first.
    window.location.href = appUrl
  }

  // Reset simulator
  const resetSimulator = () => {
    setSoMaoDeObraMode(false)

    reset1({
      distrito: '',
      concelho: '',
      freguesia: '',
      morada: '',
      area: 0,
      rodape: 0,
      pavimentoAtual: '',
      estadoPavimento: '',
      portas: 0,
      rodapeProdutoId: undefined,
      foto: undefined,
      produtoId: undefined,
      includeVinilico: true,
      includeRodape: true,
      soMaoDeObra: false,
    })
    reset2()

    setStep(1)
    setEstimate(null)
    setFormData(null)
    setLeadData(null)
    setQuoteReference(null)
    setUploadedFiles([])
    setFileError(null)
    setSubmitError(null)
    setSubmitWarning(null)
    setSelectedProductId(null)
    setSelectedBaseboardId(null)
  }

  const selectedProduto = formData ? getProdutoById(formData.produtoId, siteVariant) : null
  const selectedRodape = formData ? getRodapeById(formData.rodapeProdutoId) : null

  return (
    <section id="simulador" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Simulador de Orçamento
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Preencha os dados abaixo e receba uma estimativa imediata — sem compromisso.
          </p>

          {step === 1 && (
            <div className={`mb-8 rounded-2xl border px-4 py-3 text-sm sm:text-base text-foreground ${
              soMaoDeObraMode
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-border bg-muted/40'
            }`}>
              {!soMaoDeObraMode ? (
                <p className="text-center leading-relaxed">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Simulador atual: Material + mão de obra
                  </span>
                  Já tem os materiais e precisa apenas da aplicação?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSoMaoDeObraMode(true)
                    }}
                    className="font-semibold text-primary hover:underline"
                  >
                    Simular mão-de-obra
                  </button>
                </p>
              ) : (
                <div className="text-center">
                  <p className="font-semibold text-emerald-800">
                    Simulador "apenas mão-de-obra" activo
                  </p>
                  <p className="text-emerald-700 mt-1">
                    Caso pretenda incluir materiais, volte ao simulador completo.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSoMaoDeObraMode(false)}
                    className="font-semibold text-primary hover:underline mt-2"
                  >
                    Voltar ao simulador completo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card */}
        <div className={`max-w-4xl mx-auto bg-card rounded-3xl shadow-xl border p-6 md:p-10 transition-colors ${
          soMaoDeObraMode
            ? 'border-emerald-300 bg-emerald-50/30'
            : 'border-border'
        }`}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                ref={step1FormRef}
                onSubmit={handleSubmit1(onSubmitStep1)}
                onKeyDown={handleStep1FormEnter}
                className="space-y-8"
              >
                <div className="flex justify-center -mt-1">
                  <button
                    type="button"
                    onClick={() => scrollToSection('catalogo')}
                    className="inline-flex items-center justify-center min-h-[50px] px-7 py-3 rounded-full text-[0.95rem] font-semibold whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_12px_30px_rgba(201,136,13,0.28)]"
                  >
                    Ver catálogos
                  </button>
                </div>

                <div className={`rounded-2xl border px-4 py-3 ${
                  soMaoDeObraMode
                    ? 'border-emerald-300 bg-emerald-100/70'
                    : 'border-primary/25 bg-primary/5'
                }`}>
                  {soMaoDeObraMode ? (
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-emerald-800">Está no simulador "apenas mão-de-obra"</p>
                        <p className="text-sm text-emerald-700">
                          Este modo ignora custo de {materialLabel}{isKitchen ? '' : ', rodapé'} e perfis no total final.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Está no simulador completo</p>
                        <p className="text-sm text-muted-foreground">
                          Inclui materiais + mão de obra no valor estimado.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fieldset 1 - Pavimento principal (sempre primeiro) */}
                <fieldset>
                  <legend className="text-lg font-semibold text-foreground mb-4 flex items-center justify-between gap-3">
                    <span>{soMaoDeObraMode ? 'Materiais:' : `${materialLabelCap} pretendido`}</span>
                    {!soMaoDeObraMode && (
                      <button
                        type="button"
                        onClick={() => setValue1('includeVinilico', !watchedIncludeVinilico)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          watchedIncludeVinilico
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-destructive/10 text-destructive border border-destructive/40'
                        }`}
                      >
                        {watchedIncludeVinilico ? 'ON' : 'OFF'}
                      </button>
                    )}
                  </legend>

                  {soMaoDeObraMode ? (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-foreground">
                      O cliente fornece o {materialLabel}{isKitchen ? '' : ', o rodapé'} e os perfis de transição.
                    </div>
                  ) : !watchedIncludeVinilico ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                      Pavimento {materialLabel} desativado neste orçamento.
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <select
                          name={produtoField.name}
                          ref={produtoField.ref}
                          onBlur={produtoField.onBlur}
                          value={Number.isFinite(watchedProdutoId) && watchedProdutoId > 0 ? String(watchedProdutoId) : ''}
                          onChange={(event) => {
                            produtoField.onChange(event)
                            const value = Number(event.target.value)
                            if (Number.isFinite(value) && value > 0) {
                              setSelectedProductId(value)
                            } else {
                              setSelectedProductId(null)
                            }

                            focusNextAfterSelectChange(event.currentTarget)
                          }}
                          className={selectCls(!!errors1.produtoId)}
                        >
                          <option value="">Selecione o pavimento...</option>
                          {produtos.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.nome} ({p.referencia})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors1.produtoId && (
                        <p className="text-sm text-destructive mt-1">{errors1.produtoId.message}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        Se ainda não escolheu o modelo no catálogo,{' '}
                        <button
                          type="button"
                          onClick={openVinilicoCatalogFromSimulator}
                          className="text-primary font-medium hover:underline"
                        >
                          veja os {materialLabelPlural} disponíveis
                        </button>
                        {' '}e selecione-o em seguida aqui em cima.
                      </p>
                    </>
                  )}
                </fieldset>

                {!soMaoDeObraMode && !isKitchen && (
                  <fieldset>
                    <legend className="text-lg font-semibold text-foreground mb-4 flex items-center justify-between gap-3">
                      <span>Rodapé pretendido</span>
                      <button
                        type="button"
                        onClick={() => setValue1('includeRodape', !watchedIncludeRodape)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          watchedIncludeRodape
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-destructive/10 text-destructive border border-destructive/40'
                        }`}
                      >
                        {watchedIncludeRodape ? 'ON' : 'OFF'}
                      </button>
                    </legend>
                    {watchedIncludeRodape ? (
                      <>
                        <div className="relative">
                          <select
                            name={rodapeField.name}
                            ref={rodapeField.ref}
                            onBlur={rodapeField.onBlur}
                            value={Number.isFinite(watchedRodapeId) && watchedRodapeId > 0 ? String(watchedRodapeId) : ''}
                            onChange={(event) => {
                              rodapeField.onChange(event)
                              const value = Number(event.target.value)
                              if (Number.isFinite(value) && value > 0) {
                                setSelectedBaseboardId(value)
                              } else {
                                setSelectedBaseboardId(null)
                              }

                              focusNextAfterSelectChange(event.currentTarget)
                            }}
                            className={selectCls(!!errors1.rodapeProdutoId)}
                          >
                            <option value="">Selecione o rodapé...</option>
                            {RODAPES.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.nome} ({r.referencia})
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        </div>
                        {errors1.rodapeProdutoId && (
                          <p className="text-sm text-destructive mt-1">{errors1.rodapeProdutoId.message}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                          Se ainda não escolheu o modelo no catálogo,{' '}
                          <button
                            type="button"
                            onClick={openRodapeCatalogFromSimulator}
                            className="text-primary font-medium hover:underline"
                          >
                            veja os rodapés disponíveis
                          </button>
                          {' '}e selecione-o em seguida aqui em cima.
                        </p>

                        {watchedIncludeVinilico && watchedSelectedProduto && watchedSelectedRodape && !isRodapeCompatível && (
                          <div className="mt-3 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-800">
                            Rodapé indicado para {watchedSelectedProduto.nome}:{' '}
                            {recommendedRodape ? (
                              <button
                                type="button"
                                onClick={() => applySuggestedRodapeSelection(recommendedRodape.id)}
                                className="font-semibold underline underline-offset-2 hover:text-emerald-900"
                              >
                                {recommendedRodape.nome} ({recommendedRodape.referencia})
                              </button>
                            ) : (
                              'Branco Liso'
                            )}
                            {' '}ou{' '}
                            <button
                              type="button"
                              onClick={() => applySuggestedRodapeSelection(whiteRodape?.id)}
                              className="font-semibold underline underline-offset-2 hover:text-emerald-900"
                            >
                              Branco Liso
                            </button>
                            .
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                        Rodapé desativado neste orçamento.
                      </div>
                    )}
                  </fieldset>
                )}

                {bothMaterialsOff && (
                  <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm sm:text-base">
                          Pretende apenas mão de obra para aplicação?{' '}
                          <button
                            type="button"
                            onClick={() => {
                              setSoMaoDeObraMode(true)
                            }}
                            className="font-semibold underline underline-offset-2 hover:text-destructive/80"
                          >
                            Simulador de apenas mão de obra
                          </button>
                        </p>
                        <p className="text-xs sm:text-sm mt-2 text-destructive/80">
                          Caso contrario, active algum dos tipos de material que pretende.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <hr className="border-border" />

                {/* Fieldset 2 - Location */}
                <fieldset id="simulador-localizacao">
                  <legend className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    Localização da obra
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Distrito */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Distrito *
                      </label>
                      <div className="relative">
                        <select
                          {...register1('distrito')}
                          className={selectCls(!!errors1.distrito)}
                        >
                          <option value="">Selecione o distrito...</option>
                          {DISTRITOS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors1.distrito && (
                        <p className="text-sm text-destructive mt-1">{errors1.distrito.message}</p>
                      )}
                    </div>

                    {/* Concelho */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Concelho *
                      </label>
                      <div className="relative">
                        <select
                          {...register1('concelho')}
                          disabled={!watchedDistrito}
                          className={`${selectCls(!!errors1.concelho)} ${disabledNeutralCls(!watchedDistrito)}`}
                        >
                          <option value="">
                            {watchedDistrito ? 'Selecione o concelho...' : 'Selecione primeiro o distrito'}
                          </option>
                          {concelhos.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors1.concelho && (
                        <p className="text-sm text-destructive mt-1">{errors1.concelho.message}</p>
                      )}
                    </div>

                    {/* Freguesia */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Freguesia *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Santa Clara"
                        {...register1('freguesia')}
                        className={inputCls(!!errors1.freguesia)}
                      />
                      {errors1.freguesia && (
                        <p className="text-sm text-destructive mt-1">{errors1.freguesia.message}</p>
                      )}
                    </div>

                    {/* Morada */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Morada completa
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Rua do Pinhal, 12, 3ºDto"
                        {...register1('morada')}
                        className={inputCls(false)}
                      />
                    </div>
                  </div>
                </fieldset>

                <hr className="border-border" />

                {/* Fieldset 3 - Project Data */}
                <fieldset>
                  <legend className="text-lg font-semibold text-foreground mb-4">
                    Dados da obra
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Area */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {isKitchen ? 'Área útil da cozinha (m²) *' : 'Área total a pavimentar (m²) *'}
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        step="1"
                        min="0"
                        placeholder="Ex: 45"
                        {...register1('area')}
                        disabled={!soMaoDeObraMode && !watchedIncludeVinilico}
                        className={`${inputCls(!!errors1.area)} ${disabledNeutralCls(!soMaoDeObraMode && !watchedIncludeVinilico)}`}
                      />
                      {(!soMaoDeObraMode && !watchedIncludeVinilico) && (
                        <p className="text-xs text-muted-foreground mt-1">Pavimento {materialLabel} desativado (OFF)</p>
                      )}
                      {errors1.area && (
                        <p className="text-sm text-destructive mt-1">{errors1.area.message}</p>
                      )}
                    </div>

                    {/* Rodape */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Metros de rodapé *
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        step="1"
                        min="0"
                        placeholder="Ex: 32"
                        {...register1('rodape')}
                        disabled={!soMaoDeObraMode && !watchedIncludeRodape}
                        className={`${inputCls(!!errors1.rodape)} ${disabledNeutralCls(!soMaoDeObraMode && !watchedIncludeRodape)}`}
                      />
                      {(!soMaoDeObraMode && !watchedIncludeRodape) && (
                        <p className="text-xs text-muted-foreground mt-1">Rodapé desativado (OFF)</p>
                      )}
                      
                      {errors1.rodape && (
                        <p className="text-sm text-destructive mt-1">{errors1.rodape.message}</p>
                      )}
                    </div>

                        {/* Tipo Pavimento — visível sempre, incluindo mão de obra */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Tipo de pavimento atual *
                          </label>
                          <div className="relative">
                            <select
                              {...register1('pavimentoAtual')}
                              disabled={!soMaoDeObraMode && !watchedIncludeVinilico}
                              className={`${selectCls(!!errors1.pavimentoAtual)} ${disabledNeutralCls(!soMaoDeObraMode && !watchedIncludeVinilico)}`}
                            >
                              {!soMaoDeObraMode && !watchedIncludeVinilico ? (
                                <option value="N/A">N/A</option>
                              ) : (
                                <>
                                  <option value="">Selecione...</option>
                                  {TIPOS_PAVIMENTO.map((t) => (
                                    <option key={t} value={t}>
                                      {t}
                                    </option>
                                  ))}
                                </>
                              )}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                          </div>
                          {errors1.pavimentoAtual && (
                            <p className="text-sm text-destructive mt-1">{errors1.pavimentoAtual.message}</p>
                          )}
                        </div>

                        {/* Estado Pavimento — visível sempre, incluindo mão de obra */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Estado do pavimento atual *
                          </label>
                          <div className="relative">
                            <select
                              {...register1('estadoPavimento')}
                              disabled={!soMaoDeObraMode && !watchedIncludeVinilico}
                              className={`${selectCls(!!errors1.estadoPavimento)} ${disabledNeutralCls(!soMaoDeObraMode && !watchedIncludeVinilico)}`}
                            >
                              {!soMaoDeObraMode && !watchedIncludeVinilico ? (
                                <option value="N/A">N/A</option>
                              ) : (
                                <>
                                  <option value="">Selecione...</option>
                                  {ESTADOS_PAVIMENTO.map((e) => (
                                    <option key={e} value={e}>
                                      {e}
                                    </option>
                                  ))}
                                </>
                              )}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                          </div>
                          {errors1.estadoPavimento && (
                            <p className="text-sm text-destructive mt-1">{errors1.estadoPavimento.message}</p>
                          )}
                        </div>


                    {/* Portas */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Portas / passagens {watchedArea ? `no espaço de ${watchedArea} m²` : ''} *
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min="0"
                        max="99"
                        placeholder="Ex: 3"
                        {...register1('portas')}
                        disabled={(!soMaoDeObraMode && !watchedIncludeVinilico) || isConsultaProdutoSelecionado}
                        className={`${inputCls(!!errors1.portas)} ${disabledNeutralCls((!soMaoDeObraMode && !watchedIncludeVinilico) || isConsultaProdutoSelecionado)}`}
                      />
                      {(!soMaoDeObraMode && !watchedIncludeVinilico) && (
                        <p className="text-xs text-muted-foreground mt-1">Pavimento {materialLabel} desativado (OFF)</p>
                      )}
                      {isConsultaProdutoSelecionado && (
                        <p className="text-xs text-muted-foreground mt-1">Perfis de transição não editáveis para produtos sob consulta.</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Onde poderá ser necessário perfil de transição.
                      </p>
                      {errors1.portas && (
                        <p className="text-sm text-destructive mt-1">{errors1.portas.message}</p>
                      )}
                    </div>

                    {/* Foto */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {isKitchen ? 'Foto da cozinha atual' : 'Foto do pavimento atual'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        {...register1('foto')}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary file:text-sm file:font-medium hover:file:bg-primary/20 cursor-pointer"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Actions */}
                <div>
                  <button
                    type="submit"
                    disabled={bothMaterialsOff}
                    className="group w-full bg-primary text-primary-foreground py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Ver a minha estimativa
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="mt-3 text-center">
                    <button
                      type="button"
                      onClick={clearStep1Form}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                    >
                      Limpar formulário
                    </button>
                  </div>
                </div>
              </motion.form>
            )}

            {/* STEP 2 - Lead capture before detailed estimate */}
            {step === 2 && estimate && formData && (
              <motion.div
                id="simulador-estimativa-top"
                ref={step2TopRef}
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-xl mx-auto"
              >
                <div className="bg-muted/50 rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-2">Antes de mostrar o orçamento detalhado</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Indique apenas nome e telemóvel para podermos acompanhar o seu pedido.
                  </p>

                  <form onSubmit={handleSubmit2(onSubmitStep2)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nome completo *</label>
                      <input
                        type="text"
                        placeholder="O seu nome"
                        {...register2('nome')}
                        className={inputCls(!!errors2.nome)}
                      />
                      {errors2.nome && <p className="text-sm text-destructive mt-1">{errors2.nome.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Telemóvel *</label>
                      <input
                        type="tel"
                        placeholder="900 000 000"
                        {...register2('telemovel')}
                        className={inputCls(!!errors2.telemovel)}
                      />
                      {errors2.telemovel && <p className="text-sm text-destructive mt-1">{errors2.telemovel.message}</p>}
                    </div>

                    {submitError && (
                      <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {submitWarning && (
                      <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                        {submitWarning}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'A guardar...' : 'Seguir para o orçamento detalhado'}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* STEP 3 - Estimate + WhatsApp CTA */}
            {step === 3 && estimate && formData && (
              <motion.div
                id="simulador-estimativa-top"
                ref={step2TopRef}
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Estimate Card */}
                <div className="bg-muted rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Resumo da Estimativa</h3>
                  
                  {/* Dados principais */}
                  <div className="flex flex-col gap-2.5 mb-5">
                    <div className="rounded-xl border border-border bg-background/70 px-3 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Local</p>
                      <p className="text-sm text-foreground leading-snug mt-0.5">
                        {formData.freguesia}, {formData.concelho}, {formData.distrito}
                      </p>
                    </div>

                    {!formData.soMaoDeObra && selectedProduto && (
                      <div className="rounded-xl border border-border bg-background/70 px-3 py-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{materialLabelCap}</p>
                        <p className="text-sm text-foreground leading-snug mt-0.5">
                          {selectedProduto.nome} ({selectedProduto.referencia})
                        </p>
                      </div>
                    )}

                    {!formData.soMaoDeObra && !isKitchen && (
                      <div className="rounded-xl border border-border bg-background/70 px-3 py-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rodapé</p>
                        <p className="text-sm text-foreground leading-snug mt-0.5">
                          {selectedRodape ? `${selectedRodape.nome} (${selectedRodape.referencia})` : 'Não definido'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm mb-6">
                    {formData.soMaoDeObra && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Materiais fornecidos pelo cliente</span>
                          <span className="text-foreground">Sim</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Área total a pavimentar</span>
                          <span className="text-foreground">{formData.area} m²</span>
                        </div>
                        {!isKitchen && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Metros totais de rodapé</span>
                            <span className="text-foreground">{formData.rodape} m</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <hr className="border-border mb-4" />

                  {/* Cost Breakdown */}
                  <div className="space-y-3 text-sm mb-6">
                    {!formData.soMaoDeObra && (
                      <div>
                        <p className="text-sm font-bold text-foreground">Materiais</p>
                        <div className="space-y-1 mt-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{materialLabelCap} ({estimate.materialNecessario.toFixed(0)} m²)</span>
                            <span className="text-foreground">
                              {selectedProduto?.sobConsulta ? 'Sob consulta' : formatEur(estimate.custoMaterial)}
                            </span>
                          </div>
                          {!isKitchen && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Rodapé ({estimate.rodapeNecessario.toFixed(0)} m)</span>
                              <span className="text-foreground">{formatEur(estimate.custoRodape)}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Perfis de transição ({estimate.numeroPerfis} un)</span>
                            <span className="text-foreground">{formatEur(estimate.custoPerfis)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-bold text-foreground">Mão de obra</p>
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isKitchen ? 'Montagem principal' : 'Assentamento vinil'}</span>
                          <span className="text-foreground">{formatEur(estimate.custoMaoObra)}</span>
                        </div>
                        {!isKitchen && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Aplicação de rodapé</span>
                            <span className="text-foreground">{formatEur(estimate.custoMaoObraRodape)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-foreground">Deslocações</p>
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Custos de transporte</span>
                          <span className="text-foreground">{formatEur(estimate.custoDeslocacaoKm + estimate.custoPortagens)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-border mb-4" />

                  {/* Total */}
                  <div className="bg-primary/10 rounded-xl p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Valor estimado</p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedProduto?.sobConsulta && !formData.soMaoDeObra
                        ? `${formatEur(estimate.custoMaoObra)} (material sob orçamento)`
                        : `${formatEur(estimate.valorMin)} — ${formatEur(estimate.valorMax)}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">(preço não inclui IVA)</p>
                  </div>

                  {/* Warning */}
                  {formData.estadoPavimento?.includes('desníveis') && (
                    <div className="flex items-start gap-3 bg-primary/10 border border-primary/30 rounded-xl p-4">
                      <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">
                        O estado do pavimento pode requerer preparação adicional. Este custo será avaliado presencialmente.
                      </p>
                    </div>
                  )}

                  {/* Reset button */}
                  <button
                    type="button"
                    onClick={resetSimulator}
                    className="w-full mt-4 border border-border py-3 rounded-full text-sm font-medium text-muted-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Refazer cálculo
                  </button>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-muted/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Orçamento detalhado pronto</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Já registámos os seus dados e o resumo da obra por email.
                  </p>
                    <div className="rounded-xl border border-border bg-background/70 p-4 mb-2">
                      <p className="text-sm font-semibold text-foreground mb-2">Anexos</p>

                      {uploadedFiles.length > 0 ? (
                        <div className="text-sm text-slate-700 mb-3">
                          <p className="text-sm text-foreground font-medium mb-1">
                            {uploadedFiles.length} ficheiro(s) anexado(s), total {(getTotalAttachmentBytes(uploadedFiles) / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <ul className="list-disc list-inside text-[0.9rem] max-h-32 overflow-auto ml-4">
                            {uploadedFiles.map((f, idx) => (
                              <li key={idx} className="text-foreground flex items-center justify-between gap-2">
                                <span>{f.name} — {(f.size / 1024 / 1024).toFixed(2)} MB</span>
                                <button
                                  type="button"
                                  onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== idx))}
                                  className="text-xs text-destructive hover:underline"
                                >
                                  Remover
                                </button>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-muted-foreground mt-1">
                            Pode adicionar mais ficheiros até um total de {MAX_ATTACHMENT_MB} MB.
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground mb-3">Nenhum ficheiro anexado ainda.</p>
                      )}

                      <label className="block">
                        <span className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground cursor-pointer hover:bg-primary/5 transition-colors text-sm font-medium">
                          Anexar ficheiros
                        </span>
                        <input
                          type="file"
                          multiple
                          onChange={handleAttachmentChange}
                          className="hidden"
                        />
                      </label>

                      {fileError && (
                        <p className="text-sm text-destructive mt-2">{fileError}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                        <p className="font-semibold">Lead registada</p>
                        <p className="mt-1">
                          {leadData ? `${leadData.nome} · ${leadData.telemovel}` : 'Dados guardados'}
                        </p>
                        {quoteReference && (
                          <p className="mt-1 text-emerald-800">Referência: {quoteReference}</p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={proceedToWhatsApp}
                        className="w-full bg-primary text-primary-foreground py-4 px-10 rounded-full font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-start gap-3"
                      >
                        <WhatsAppIcon className="w-5 h-5 text-[#25D366] shrink-0" />
                        <span className="flex-1 text-center">Prosseguir com o pedido directamente por whstapp.</span>
                      </button>

                      {submitWarning && (
                        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                          {submitWarning}
                        </div>
                      )}
                    </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
