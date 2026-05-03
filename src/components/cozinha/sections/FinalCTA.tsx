import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getWhatsAppUrl } from "@/content/site";
import { MessageCircle, Phone } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="final-cta" ref={ref} className="py-20 lg:py-28 relative overflow-hidden bg-secondary">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,136,13,0.10),transparent_55%)]" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          
          <h2 className="font-display font-bold mb-4 leading-snug text-white text-[clamp(1.5rem,3vw,2.2rem)]">
            Pronto para começar o seu projecto?
          </h2>

          <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto text-white/55">
            Contacte-nos pelo WhatsApp ou por telefone. Analisamos o espaço
            e apresentamos uma proposta personalizada, sem qualquer custo.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href={getWhatsAppUrl(undefined, "cozinha")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-all shadow-[0_6px_20px_rgba(201,136,13,0.3)]"
            >
              <MessageCircle size={16} />
              Pedir Orçamento por WhatsApp
            </a>
            <a
              href="tel:+351910093635"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/20 text-white/70 hover:text-white hover:border-white/35 transition-all"
            >
              <Phone size={16} />
              Ligar Agora
            </a>
          </div>

          <p className="text-xs text-white/28">
            Sem compromisso · Resposta rápida · Fabricação em Portugal
          </p>
        </motion.div>
      </div>
    </section>
  );
}
