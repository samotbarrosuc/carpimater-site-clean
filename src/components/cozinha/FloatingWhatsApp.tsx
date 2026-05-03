"use client"

import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/content/site";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        className="px-3 py-2 rounded-lg text-xs font-semibold text-white shadow-lg whitespace-nowrap pointer-events-none"
        style={{ backgroundColor: "#3D2A28" }}
      >
        Fale connosco
      </motion.span>

      <a
        href={getWhatsAppUrl(undefined, "cozinha")}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Contactar via WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: "#25D366" }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <MessageCircle size={26} className="text-white relative z-10" />
      </a>
    </div>
  );
}
