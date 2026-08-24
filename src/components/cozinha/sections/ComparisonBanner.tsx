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
    <section ref={ref} className="py-16 lg:py-24 bg-muted/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Condições do serviço
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-foreground">
            O que fica definido na proposta
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto text-muted-foreground">
            Antes de avançar, confirmamos por escrito o trabalho, os materiais, o preço e o prazo previsto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl overflow-hidden shadow-sm border border-primary/12"
        >
          <div className="grid grid-cols-3 text-xs font-semibold bg-secondary">
            <div className="px-5 py-4 text-left text-white/80">
              Trabalho
            </div>
            <div className="px-5 py-4 text-center font-bold text-sm text-primary">
              Incluído
            </div>
            <div className="px-5 py-4 text-center text-white/45">
              Como é definido
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.06 }}
              className={`grid grid-cols-3 border-t border-border/40 items-center ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}
            >
              <div className="px-5 py-3.5 text-xs font-medium text-foreground">
                {row.label}
              </div>
              <div className="px-5 py-3.5 flex justify-center">
                <span className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/10">
                  <Check size={13} className="text-primary" strokeWidth={3} />
                </span>
              </div>
              <div className="px-5 py-3.5 flex justify-center">
                <span className="text-center text-xs text-muted-foreground">{row.detail}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
