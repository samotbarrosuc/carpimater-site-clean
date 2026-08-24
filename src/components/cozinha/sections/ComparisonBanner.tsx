import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const rows = [
  { label: "Levantamento de medidas", detail: "Conforme o espaço" },
  { label: "Desenho da cozinha", detail: "Adaptado ao pedido" },
  { label: "Materiais e ferragens", detail: "Indicados na proposta" },
  { label: "Fabrico", detail: "Após aprovação" },
  { label: "Transporte", detail: "Definido na proposta" },
  { label: "Montagem", detail: "Trabalhos discriminados" },
];

export default function ComparisonBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="border-y border-[#e4ded5] bg-[#f8f5ef] py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl text-left"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Condições do serviço
          </p>
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-4xl">
            O que fica definido na proposta
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#40505b]">
            Antes de avançar, confirmamos por escrito o trabalho, os materiais, o preço e o prazo previsto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="overflow-hidden rounded-[1.5rem] border border-[#ded8cf] bg-white shadow-[0_18px_45px_rgba(25,36,46,0.07)]"
        >
          <div className="grid grid-cols-3 bg-[#19242e] text-[0.62rem] font-bold uppercase tracking-[0.1em] sm:text-xs">
            <div className="px-3 py-4 text-left text-white/75 sm:px-5">
              Trabalho
            </div>
            <div className="px-2 py-4 text-center font-bold text-primary sm:px-5 sm:text-sm">
              Incluído
            </div>
            <div className="px-2 py-4 text-center text-white/45 sm:px-5">
              Como é definido
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.06 }}
              className={`grid grid-cols-3 items-center border-t border-[#ece7df] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fbfaf7]'}`}
            >
              <div className="px-3 py-4 text-xs font-semibold leading-5 text-[#19242e] sm:px-5">
                {row.label}
              </div>
              <div className="flex justify-center px-2 py-4 sm:px-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                  <Check size={13} className="text-primary" strokeWidth={3} />
                </span>
              </div>
              <div className="flex justify-center px-2 py-4 sm:px-5">
                <span className="text-center text-xs leading-5 text-[#40505b]">{row.detail}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
