import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from '@/content/kitchen-faq.json'

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" ref={ref} className="bg-[#f8f5ef] py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl text-left"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            FAQ
          </p>
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-4xl">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="grid gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-[#ded8cf] bg-white px-5 shadow-sm transition data-[state=open]:border-primary data-[state=open]:shadow-[0_12px_30px_rgba(25,36,46,0.07)] sm:px-6"
              >
                <AccordionTrigger className="py-5 text-left text-sm font-bold text-[#19242e] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-[#40505b]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
