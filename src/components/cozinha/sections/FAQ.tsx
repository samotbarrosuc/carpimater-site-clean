import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Como é definido o preço?",
    a: "O preço depende das medidas, dos materiais, das ferragens e da montagem. Esses elementos são discriminados na proposta.",
  },
  {
    q: "Qual é o prazo habitual de entrega e montagem?",
    a: "O prazo habitual é de 8 a 10 semanas após a aprovação do projeto. Pode variar conforme a dimensão, os materiais e a agenda de montagem.",
  },
  {
    q: "Fazem projetos e montagem fora da Região Centro?",
    a: "A montagem regular abrange a Região Centro. Para projetos noutras zonas do país, contacte-nos primeiro para confirmarmos disponibilidade.",
  },
  {
    q: "A montagem está incluída no preço?",
    a: "A proposta indica se o transporte e a montagem estão incluídos e quais os trabalhos abrangidos.",
  },
  {
    q: "Que tipo de materiais utilizam?",
    a: "Trabalhamos com MDF, aglomerado, acabamentos lacados ou em folha de madeira e diferentes ferragens. A escolha é registada na proposta.",
  },
  {
    q: "Fazem reparos e renovações em cozinhas existentes?",
    a: "Sim, conforme o trabalho. Envie fotografias e uma descrição para confirmarmos se fazemos a reparação ou renovação pretendida.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" ref={ref} className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            FAQ
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-foreground">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border px-5 bg-white shadow-sm data-[state=open]:border-primary"
              >
                <AccordionTrigger className="font-medium text-sm text-left py-4 hover:no-underline text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed pb-4 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
