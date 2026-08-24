import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getWhatsAppUrl } from "@/content/site";
import { MessageCircle, Phone } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="final-cta" ref={ref} className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:py-20">

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#2b3b47] bg-[#19242e] px-6 py-14 text-center shadow-[0_24px_65px_rgba(25,36,46,0.15)] sm:px-10 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(240,91,19,0.13),transparent_58%)]" />
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
          className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/35 hover:bg-white/[0.07] hover:text-white"
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
