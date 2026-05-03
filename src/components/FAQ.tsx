import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLocation } from 'wouter'

import { getFaqsByVariant } from '@/content/faq'
import { getSiteVariantFromPath } from '@/content/site'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const faqs = getFaqsByVariant(siteVariant)

  return (
    <section id="faq" className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Dúvidas Frequentes
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-foreground">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="flex flex-col gap-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl border px-5 bg-white shadow-sm transition-colors ${
                  openIndex === index ? 'border-primary' : 'border-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between py-4 text-left hover:no-underline"
                >
                  <span className="font-medium text-sm text-foreground pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pb-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
