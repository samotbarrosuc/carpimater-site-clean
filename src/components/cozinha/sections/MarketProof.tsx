import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Gem, Wrench } from "lucide-react";

const cards = [
  {
    icon: MapPin,
    title: "Projeto por medida",
    desc: "A distribuição e as dimensões são definidas para o espaço existente.",
  },
  {
    icon: Clock,
    title: "Prazo definido",
    desc: "O prazo previsto é indicado na proposta e confirmado antes do fabrico.",
  },
  {
    icon: Gem,
    title: "Materiais identificados",
    desc: "Os materiais, acabamentos e ferragens ficam descritos na proposta.",
  },
  {
    icon: Wrench,
    title: "Montagem em obra",
    desc: "Fazemos a montagem na Região Centro. Para outras zonas, confirme a disponibilidade.",
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
            Serviço de carpintaria
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-white">
            O que está incluído
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
