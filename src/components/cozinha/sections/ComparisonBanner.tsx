import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const rows = [
  { label: "Projecto 100% Personalizado", carpi: true, grande: false },
  { label: "Materiais de Grau Profissional", carpi: true, grande: false },
  { label: "Montagem Incluída no Preço", carpi: true, grande: false },
  { label: "Carpinteiro Disponível Pós-Entrega", carpi: true, grande: false },
  { label: "Sem Custos Ocultos", carpi: true, grande: false },
  { label: "Preço Final Competitivo", carpi: true, grande: true },
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
            Comparação
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-foreground">
            CarpiMater vs. Grandes Superfícies
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto text-muted-foreground">
            Veja por si mesmo o que distingue uma cozinha por medida de uma solução standard.
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
              Critério
            </div>
            <div className="px-5 py-4 text-center font-bold text-sm text-primary">
              CarpiMater
            </div>
            <div className="px-5 py-4 text-center text-white/45">
              IKEA / Leroy Merlin
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
                {row.grande ? (
                  <span className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/8">
                    <Check size={13} className="text-primary" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full flex items-center justify-center bg-black/4">
                    <X size={13} className="text-muted-foreground/60" strokeWidth={3} />
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
