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
    <section id="porque-nos" ref={ref} className="bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl text-left"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Serviço de carpintaria
          </p>
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-4xl">
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
                className="group flex min-h-[205px] flex-col gap-5 rounded-2xl border border-[#ded8cf] bg-[#fbfaf7] p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_16px_38px_rgba(25,36,46,0.08)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#19242e] text-white transition-colors group-hover:bg-primary">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold leading-snug text-[#19242e]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#40505b]">
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
