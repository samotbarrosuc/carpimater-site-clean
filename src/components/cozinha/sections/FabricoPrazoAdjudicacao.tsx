"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const kpis = [
  { value: "Paços de Ferreira", label: "Fabrico" },
  { value: "8 a 10 semanas", label: "Prazo de execução" },
  { value: "60% do valor total", label: "Adjudicação" },
];

export default function FabricoPrazoAdjudicacao() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="fabrico-prazo-adjudicacao" ref={ref} className="bg-[#f8f5ef] py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="hidden"
        >
        </motion.div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[#2c3b46] bg-[#19242e] shadow-[0_18px_45px_rgba(25,36,46,0.13)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid sm:grid-cols-3"
          >
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="flex min-h-[128px] flex-col items-center justify-center border-b border-white/10 p-6 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <p className="font-display text-xl font-bold text-white sm:text-[1.45rem]">{kpi.value}</p>
                <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/45">
                  {kpi.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
