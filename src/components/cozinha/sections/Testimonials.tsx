"use client"

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria S.",
    location: "Coimbra",
    rating: 5,
    text: "A CarpiMater superou todas as expectativas. A cozinha ficou exatamente como eu tinha imaginado, com uma qualidade que não se compara ao IKEA. O preço foi uma surpresa muito agradável.",
  },
  {
    name: "João F.",
    location: "Leiria",
    rating: 5,
    text: "Desde o primeiro contacto até à montagem final, foram sempre profissionais, pontuais e atentos aos detalhes. Em 9 semanas tínhamos uma cozinha nova, completamente montada. Um serviço exemplar.",
  },
  {
    name: "Ana P.",
    location: "Viseu",
    rating: 5,
    text: "Tínhamos um problema numa cozinha antiga e a CarpiMater resolveu tudo em tempo recorde. Vieram a Viseu sem qualquer problema. Serviço excelente, preço justo, qualidade que se vê e se sente.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="#C9880D" stroke="#C9880D" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p
            className="text-xs uppercase tracking-[0.22em] font-semibold mb-3"
            style={{ color: "#C9880D" }}
          >
            Depoimentos
          </p>
          <h2
            className="font-display font-bold text-2xl lg:text-[1.75rem]"
            style={{ color: "#3D2A28" }}
          >
            O que dizem os nossos clientes
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl p-6 border flex flex-col gap-4"
              style={{
                borderColor: "rgba(201,136,13,0.15)",
                borderTopWidth: "2px",
                borderTopColor: "#C9880D",
              }}
            >
              <StarRating count={t.rating} />
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#5a3e3b" }}>
                "{t.text}"
              </p>
              <div className="pt-3 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                    style={{ backgroundColor: "#3D2A28" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#3D2A28" }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "#7a5a57" }}>
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
