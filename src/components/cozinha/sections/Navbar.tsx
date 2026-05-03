"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/content/site";

const BRAND_COLOR = "#C9880D";
const TEXT_COLOR = "#3D2A28";

const PAGE_LINKS = [
  { label: "Porquê Nós", href: "#porque-nos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Galeria", href: "#galeria" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

const SERVICE_PILLS = [
  { label: "Vinílico", href: "/vinilico" },
  { label: "Flutuante", href: "/flutuante" },
  { label: "Cozinhas", href: "/cozinha", active: true },
  { label: "Construção", href: "/construção" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/97 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-3">

          {/* ── Logo → Home ── */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 border border-[#C9880D]/30 bg-[#C9880D]/8 hover:bg-[#C9880D]/15 transition-colors"
            >
              <img
                src="/images/logo-carpimater.png"
                alt="Logotipo CarpiMater"
                className="w-9 h-9 rounded-lg object-cover bg-white"
              />
              <div>
                <span className="font-bold text-base leading-tight block" style={{ color: BRAND_COLOR }}>
                  CarpiMater
                </span>
                <span className="text-[10px] font-bold tracking-[0.14em] block" style={{ color: TEXT_COLOR, opacity: 0.55 }}>
                  HOME
                </span>
              </div>
            </a>

            {/* ── Service pills (desktop) ── */}
            <div className="hidden lg:flex items-center gap-1">
              {SERVICE_PILLS.map((pill) => (
                <a
                  key={pill.href}
                  href={pill.href}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 border text-xs font-semibold transition-all ${
                    pill.active
                      ? "border-[#C9880D] bg-[#C9880D]/12 text-[#C9880D] shadow-[0_0_0_2px_rgba(201,136,13,0.15)]"
                      : "border-black/12 bg-white/50 text-[#3D2A28]/55 hover:text-[#3D2A28] hover:bg-white/80"
                  }`}
                >
                  {pill.active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9880D] shrink-0" />
                  )}
                  {pill.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Desktop nav links + CTA ── */}
          <nav className="hidden lg:flex items-center gap-6">
            {PAGE_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-colors hover:text-[#C9880D]"
                style={{ color: TEXT_COLOR }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={getWhatsAppUrl(undefined, "cozinha")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              <MessageCircle size={16} />
              Orçamento Grátis
            </a>
          </nav>

          {/* ── Mobile menu button ── */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} color={TEXT_COLOR} /> : <Menu size={22} color={TEXT_COLOR} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">

              {/* Service pills in mobile */}
              <div className="flex flex-wrap gap-1.5 pb-3 mb-2 border-b border-gray-100">
                {SERVICE_PILLS.map((pill) => (
                  <a
                    key={pill.href}
                    href={pill.href}
                    className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                      pill.active
                        ? "border-[#C9880D] bg-[#C9880D]/12 text-[#C9880D]"
                        : "border-black/12 text-[#3D2A28]/55 hover:text-[#3D2A28]"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {pill.label}
                  </a>
                ))}
              </div>

              {PAGE_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="py-2.5 px-2 text-sm font-medium text-[#3D2A28] hover:text-[#C9880D] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}

              <a
                href={getWhatsAppUrl(undefined, "cozinha")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: BRAND_COLOR }}
                onClick={() => setOpen(false)}
              >
                <MessageCircle size={16} />
                Pedir Orçamento Grátis
              </a>

              <a
                href="/"
                className="mt-1 text-center text-xs font-semibold text-[#3D2A28]/50 hover:text-[#C9880D] transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                ← Voltar ao início
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
