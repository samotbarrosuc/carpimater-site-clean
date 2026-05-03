// client component

import { createContext, useContext, useState, ReactNode } from 'react'

interface SimulatorContextType {
  selectedProductId: number | null
  setSelectedProductId: (id: number | null) => void
  selectedBaseboardId: number | null
  setSelectedBaseboardId: (id: number | null) => void
  isPriceModalOpen: boolean
  setIsPriceModalOpen: (open: boolean) => void
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined)

export function SimulatorProvider({ children }: { children: ReactNode }) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [selectedBaseboardId, setSelectedBaseboardId] = useState<number | null>(null)
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)

  return (
    <SimulatorContext.Provider
      value={{
        selectedProductId,
        setSelectedProductId,
        selectedBaseboardId,
        setSelectedBaseboardId,
        isPriceModalOpen,
        setIsPriceModalOpen,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  )
}

export function useSimulator() {
  const context = useContext(SimulatorContext)
  if (context === undefined) {
    throw new Error('useSimulator must be used within a SimulatorProvider')
  }
  return context
}
