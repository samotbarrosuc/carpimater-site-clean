"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CompareSlider, pairs as beforeAfterPairs } from "@/components/cozinha/sections/BeforeAfter";

const kpis = [
  { value: "Paços de Ferreira", label: "Fabrico" },
  { value: "8 a 10 semanas", label: "Prazo de execução" },
  { value: "60% do valor total", label: "Adjudicação" },
];

export default function FabricoPrazoAdjudicacao() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="fabrico-prazo-adjudicacao" ref={ref} className="py-16 lg:py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
        </motion.div>

        <div className="grid gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4"
          >
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
              >
                <p className="text-[1.6rem] font-bold text-white">{kpi.value}</p>
                <p className="text-xs uppercase tracking-[0.18em] mt-3 text-slate-300">
                  {kpi.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[30px] border border-border/50 bg-white shadow-sm p-4 sm:p-5 lg:p-6"
          >
            <CompareSlider before={beforeAfterPairs[0].before} after={beforeAfterPairs[0].after} aspectRatio="16/9" />
            <p className="text-center text-xs text-muted-foreground mt-4 font-medium tracking-wide">
              Arraste o divisor — Antes & Depois
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
