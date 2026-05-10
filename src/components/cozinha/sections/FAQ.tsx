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
    q: "Os preços são competitivos em relação ao IKEA?",
    a: "Sim. Os nossos preços são semelhantes ou até mais baixos que as grandes superfícies — com uma qualidade de materiais e acabamentos muito superior. A longo prazo, a diferença nota-se claramente.",
  },
  {
    q: "Qual é o prazo habitual de entrega e montagem?",
    a: "Entre 8 a 10 semanas desde a aprovação final do projecto até à conclusão da montagem. Este prazo depende da complexidade e dimensão da cozinha. Cumprimos o que acordamos.",
  },
  {
    q: "Fazem projectos e montagem em todo o país?",
    a: "Fabricamos em Paços de Ferreira e fazemos montagem em toda a região centro — Coimbra, Leiria, Viseu, Aveiro, Porto e arredores. Também nos deslocamos a outras zonas do país consoante o projecto.",
  },
  {
    q: "A montagem está incluída no preço?",
    a: "Sim, a montagem está sempre incluída. A CarpiMater trata de tudo, do início ao fim — o cliente não precisa de contratar outra empresa nem de se preocupar com coordenação de trabalhos.",
  },
  {
    q: "Que tipo de materiais utilizam?",
    a: "Painéis de MDF e aglomerado de qualidade, acabamentos lacados ou em folha de madeira natural, ferragens de marcas europeias. Não utilizamos opções de baixo custo que comprometam o resultado.",
  },
  {
    q: "Fazem reparos e renovações em cozinhas existentes?",
    a: "Sim. Dispomos de carpinteiros especializados em renovações parciais, substituição de frentes e tampos, e reparações diversas. Se a sua cozinha tem problemas — contacte-nos.",
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
