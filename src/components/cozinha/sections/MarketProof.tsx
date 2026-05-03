import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Gem, Wrench } from "lucide-react";

const cards = [
  {
    icon: MapPin,
    title: "Fabrico Próprio",
    desc: "Produzimos em Paços de Ferreira, sem intermediários. Preço directo de fábrica.",
  },
  {
    icon: Clock,
    title: "Prazos Cumpridos",
    desc: "Planificamos cada fase antes de começar. O prazo acordado é o prazo de entrega.",
  },
  {
    icon: Gem,
    title: "Materiais de Qualidade",
    desc: "Materiais de grau profissional em cada projecto. Ferragens e tampos que superam as grandes superfícies.",
  },
  {
    icon: Wrench,
    title: "Montagem Incluída",
    desc: "As nossas equipas instalam tudo. Do centro ao norte do país, sem custos adicionais.",
  },
];

export default function MarketProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="porque-nos" ref={ref} className="py-16 lg:py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Porquê CarpiMater
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-white">
            O que nos distingue
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5 flex flex-col gap-3.5 hover:border-primary/25 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-primary/14">
                  <Icon size={17} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/45">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
