"use client"

import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/content/site";
import { MessageCircle, ChevronDown, ArrowRight } from "lucide-react";

const steps = [
  { num: "01", label: "Briefing" },
  { num: "02", label: "Projeto" },
  { num: "03", label: "Fabrico & Montagem" },
];

const kpis = [
  { value: "8–10", unit: "Semanas", desc: "Da consulta à entrega" },
  { value: "10", unit: "Anos", desc: "de garantia incluída" },
  { value: "100%", unit: "Incluído", desc: "Montagem profissional" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
      style={{
        background:
          "linear-gradient(135deg, #F9F3F0 0%, #F5E9DC 40%, #EDD9BF 70%, #E8CC9C 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(201,136,13,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span
            variants={item}
            className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{
              color: "#C9880D",
              borderColor: "rgba(201,136,13,0.3)",
              backgroundColor: "rgba(201,136,13,0.08)",
            }}
          >
            Carpintaria de Excelência — Paços de Ferreira
          </motion.span>

            <h1 className="font-title font-black leading-tight mb-6">
              Cozinhas por Medida
              <br />
              <span style={{ color: "#C9880D" }}>& Soluções Completas</span>
            </h1>

          <motion.p
            variants={item}
            className="text-lg lg:text-xl leading-relaxed mb-8 max-w-xl"
            style={{ color: "#5a3e3b" }}
          >
            Fabricamos na nossa fábrica em Paços de Ferreira e fazemos montagem
            em todo o país — com especial cobertura em Coimbra, Leiria, Viseu,
            Aveiro e região centro. Qualidade superior ao IKEA, a preços
            surpreendentemente competitivos.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold"
                  style={{ backgroundColor: "#3D2A28" }}
                >
                  <span
                    className="font-title font-bold text-xs"
                    style={{ color: "#C9880D" }}
                  >
                    {s.num}
                  </span>
                  {s.label}
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight size={16} style={{ color: "#C9880D" }} />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href={getWhatsAppUrl(undefined, "cozinha")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "#C9880D" }}
            >
              <MessageCircle size={20} />
              Pedir Orçamento Grátis
            </a>
            <a
              href="#galeria"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border-2 transition-all hover:bg-[#3D2A28] hover:text-white"
              style={{
                borderColor: "#3D2A28",
                color: "#3D2A28",
              }}
            >
              Ver Galeria de Projetos
              <ChevronDown size={18} />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-4 max-w-lg"
          >
            {kpis.map((k) => (
              <div
                key={k.value}
                className="text-center px-3 py-4 rounded-xl border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderColor: "rgba(201,136,13,0.25)",
                }}
              >
                <div
                  className="font-title font-black text-2xl leading-none"
                  style={{ color: "#C9880D" }}
                >
                  {k.value}
                </div>
                <div
                  className="font-title font-bold text-sm"
                  style={{ color: "#3D2A28" }}
                >
                  {k.unit}
                </div>
                <div className="text-xs mt-1" style={{ color: "#7a5a57" }}>
                  {k.desc}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: 60 }}
        >
          <path
            d="M0,60 L0,30 Q360,0 720,30 Q1080,60 1440,20 L1440,60 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
