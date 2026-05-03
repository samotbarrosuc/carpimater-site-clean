"use client"

import { MapPin, Phone, Mail } from "lucide-react";
import { EMAIL, PHONE_NUMBER } from "@/content/site";

const navLinks = [
  { label: "Porquê Nós", href: "#porque-nos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Galeria", href: "#galeria" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2a1e1c" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="lg:col-span-2">
            <span
              className="font-title font-black text-2xl block mb-3"
              style={{ color: "#C9880D" }}
            >
              CarpiMater
            </span>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(249,243,240,0.55)" }}
            >
              Carpintaria de excelência em Paços de Ferreira. Cozinhas por
              medida com qualidade superior e montagem incluída — tratamos de
              tudo.
            </p>
          </div>

          <div>
            <h3
              className="font-semibold text-sm mb-4 uppercase tracking-wide"
              style={{ color: "#C9880D" }}
            >
              Navegação
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors hover:text-[#C9880D]"
                    style={{ color: "rgba(249,243,240,0.55)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-sm mb-4 uppercase tracking-wide"
              style={{ color: "#C9880D" }}
            >
              Contactos
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} style={{ color: "#C9880D", marginTop: 2 }} />
                <span
                  className="text-sm"
                  style={{ color: "rgba(249,243,240,0.55)" }}
                >
                  Paços de Ferreira, Portugal
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} style={{ color: "#C9880D" }} />
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                  className="text-sm transition-colors hover:text-[#C9880D]"
                  style={{ color: "rgba(249,243,240,0.55)" }}
                >
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} style={{ color: "#C9880D" }} />
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm transition-colors hover:text-[#C9880D]"
                  style={{ color: "rgba(249,243,240,0.55)" }}
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(249,243,240,0.08)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(249,243,240,0.35)" }}
          >
            © 2025 CarpiMater. Todos os direitos reservados.
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(249,243,240,0.25)" }}
          >
            Fabricacao Portuguesa com Excelencia
          </p>
        </div>
      </div>
    </footer>
  );
}
