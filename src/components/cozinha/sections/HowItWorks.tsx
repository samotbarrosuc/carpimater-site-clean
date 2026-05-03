import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Factory, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    num: "01",
    title: "Consulta & Briefing",
    desc: "Ouvimos as suas necessidades, visitamos o espaço e medimos com rigor. Sem compromisso.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Projecto Personalizado",
    desc: "Criamos um projecto detalhado à sua medida. Aprovação só quando estiver satisfeito.",
  },
  {
    icon: Factory,
    num: "03",
    title: "Fabrico em Paços de Ferreira",
    desc: "Produzimos na nossa fábrica com materiais de qualidade e controlo rigoroso em cada fase.",
  },
  {
    icon: CheckCircle2,
    num: "04",
    title: "Montagem Profissional",
    desc: "A nossa equipa instala tudo com precisão. A cozinha chega pronta a usar.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="como-funciona" ref={ref} className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Processo
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-foreground">
            Como funciona
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto text-muted-foreground">
            Tratamos de tudo — do primeiro contacto à última dobradiça.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="hidden lg:block absolute top-9 h-px"
            style={{
              background: "linear-gradient(to right, transparent 5%, rgba(201,136,13,0.3) 25%, rgba(201,136,13,0.3) 75%, transparent 95%)",
              left: "12.5%",
              width: "75%",
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center mb-5 bg-secondary">
                    <Icon size={24} className="text-primary" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white bg-primary">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
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
