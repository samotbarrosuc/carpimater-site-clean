import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getWhatsAppUrl } from "@/content/site";
import { MessageCircle, Phone } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="final-cta" ref={ref} className="py-20 lg:py-28 relative overflow-hidden bg-secondary">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(240,91,19,0.10),transparent_55%)]" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          
          <h2 className="font-display font-bold mb-4 leading-snug text-white text-[clamp(1.5rem,3vw,2.2rem)]">
            Precisa de uma cozinha por medida?
          </h2>

          <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto text-white/55">
            Envie-nos as medidas, fotografias ou plantas do espaço. Entraremos em contacto para reunir a informação necessária.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href={getWhatsAppUrl(undefined, "cozinha")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(240,91,19,0.22)] transition hover:bg-primary/90"
            >
              <MessageCircle size={16} />
              Pedir orçamento por WhatsApp
            </a>
            <a
              href="tel:+351910093635"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/35 hover:text-white"
            >
              <Phone size={16} />
              Ligar
            </a>
          </div>

          <p className="text-xs text-white/28">
            Região Centro · Outras zonas sob consulta
          </p>
        </motion.div>
      </div>
    </section>
  );
}
