import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Factory, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    num: "01",
    title: "Medidas e necessidades",
    desc: "Recolhemos as medidas e a informação necessária sobre o espaço.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Desenho e proposta",
    desc: "Preparamos o desenho, os materiais, o preço e as condições do trabalho.",
  },
  {
    icon: Factory,
    num: "03",
    title: "Fabrico",
    desc: "O trabalho é fabricado de acordo com o projeto aprovado.",
  },
  {
    icon: CheckCircle2,
    num: "04",
    title: "Montagem",
    desc: "Transportamos e montamos os elementos previstos na proposta.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="como-funciona" ref={ref} className="border-y border-[#e4ded5] bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl text-left"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Processo
          </p>
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-4xl">
            Como funciona
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#40505b]">
            Do levantamento de medidas à montagem em obra.
          </p>
        </motion.div>

        <div className="relative">
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-[#ded8cf] bg-[#fbfaf7] p-6 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_16px_38px_rgba(25,36,46,0.08)]"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#19242e] text-white transition-colors group-hover:bg-primary">
                      <Icon size={18} />
                    </div>
                    <span className="font-display text-3xl font-bold text-[#19242e]/10">{step.num}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#19242e]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#40505b]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
