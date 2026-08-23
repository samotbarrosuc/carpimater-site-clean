import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getCartItemPrice, updateCartItemUnits, type CartItem } from '@/lib/cart'

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  changeUnits: (id: string, units: number) => void
  clear: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const STORAGE_KEY = 'carpimater-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) }, [items])

  const value = useMemo<CartContextValue>(() => ({
    items, isOpen, setIsOpen,
    addItem: (item) => {
      setItems((current) => {
        const existing = current.find((entry) => entry.id === item.id && entry.includeWaste === item.includeWaste)
        return existing ? current.map((entry) => {
          if (entry !== existing) return entry
          return {
            ...updateCartItemUnits(entry, entry.units + item.units),
            requestedAmount: entry.requestedAmount + item.requestedAmount,
          }
        }) : [...current, item]
      })
      setIsOpen(true)
    },
    removeItem: (id) => setItems((current) => current.filter((item) => `${item.id}-${item.includeWaste}` !== id)),
    changeUnits: (id, units) => setItems((current) => current.map((item) => `${item.id}-${item.includeWaste}` === id ? updateCartItemUnits(item, units) : item)),
    clear: () => setItems([]),
    itemCount: new Set(items.map((item) => item.id)).size,
    subtotal: items.reduce((total, item) => total + getCartItemPrice(item), 0),
  }), [items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
