// client component

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/content/site'
import { useSimulator } from '@/context/SimulatorContext'

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { isPriceModalOpen } = useSimulator()
  const hideTooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMountedRef = useRef(false)

  const showTooltipTemporarily = () => {
    if (!isMountedRef.current) return

    setShowTooltip(true)

    if (hideTooltipTimeoutRef.current) {
      clearTimeout(hideTooltipTimeoutRef.current)
    }

    hideTooltipTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        setShowTooltip(false)
      }
    }, 3500)
  }

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current)
      }
    }
  }, [])

  // Auto-show tooltip every 22 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && !isPriceModalOpen) {
        showTooltipTemporarily()
      }
    }, 22000)

    // Show once on initial load after 3 seconds
    const initialTimeout = setTimeout(() => {
      if (!isPriceModalOpen) {
        showTooltipTemporarily()
      }
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
      if (hideTooltipTimeoutRef.current) {
        clearTimeout(hideTooltipTimeoutRef.current)
      }
    }
  }, [isHovered, isPriceModalOpen])

  // Don't render button when price modal or product modal is open
  if (isPriceModalOpen) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <AnimatePresence>
        {(showTooltip || isHovered) && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={`/whatsapp-redirect.html?url=${encodeURIComponent(getWhatsAppUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative block w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-black/10"
        aria-label="Contactar via WhatsApp"
      >
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-15" />
        
        {/* Icon */}
        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </a>
    </div>
  )
}
