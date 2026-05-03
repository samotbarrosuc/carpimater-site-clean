"use client"

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";
import { getWhatsAppUrl } from "@/content/site";

const projects = [
  {
    src: "/images/cozinha-branca-lacada.jpg",
    title: "Cozinha Lacada a Branco",
    location: "Coimbra",
    category: "Lacado",
    year: "2025",
    desc: "Linha de armários lacados a branco brilhante, sem puxadores, com tampo em quartzo",
  },
  {
    src: "/images/cozinha-carvalho.jpg",
    title: "Folha de Carvalho Natural",
    location: "Leiria",
    category: "Carvalho",
    year: "2025",
    desc: "Laminado de carvalho com acabamento natural, tampo em pedra clara",
  },
  {
    src: "/images/cozinha-branca-2.jpg",
    title: "Lacado Branco Mate",
    location: "Porto",
    category: "Lacado",
    year: "2024",
    desc: "Cozinha sem puxadores em lacado branco mate, iluminação integrada",
  },
  {
    src: "/images/cozinha-faia.jpg",
    title: "Folha de Faia",
    location: "Aveiro",
    category: "Faia",
    year: "2025",
    desc: "Acabamento em folha de faia com base de armário em branco — combinação clássica",
  },
  {
    src: "/images/cozinha-gerada-branca.png",
    title: "Lacado Branco com Ilha",
    location: "Viseu",
    category: "Com Ilha",
    year: "2024",
    desc: "Projeto com ilha central em lacado branco, plano de trabalho em quartzo branco",
  },
  {
    src: "/images/cozinha-gerada-carvalho.png",
    title: "Carvalho e Branco",
    location: "Paços de Ferreira",
    category: "Misto",
    year: "2025",
    desc: "Combinação de laminado de carvalho com elementos lacados — moderno e atemporal",
  },
];

function GalleryCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.src}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Category + Year badges */}
        <span
          className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: "#C9880D" }}
        >
          {project.category}
        </span>
        <span className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {project.year}
        </span>

        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={getWhatsAppUrl(undefined, "cozinha")}
            target="_blank"
            rel="noreferrer"
            className="text-white font-bold px-5 py-3 rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg"
            style={{ backgroundColor: "#C9880D" }}
          >
            Projecto Similar
          </a>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-foreground mb-1">{project.title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <MapPin size={12} style={{ color: "#C9880D" }} />
          <span className="text-xs font-medium" style={{ color: "#C9880D" }}>
            {project.location}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{project.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="galeria"
      ref={ref}
      className="py-20 lg:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              color: "#C9880D",
              backgroundColor: "rgba(201,136,13,0.10)",
            }}
          >
            Portfolio
          </span>
          <h2
            className="font-title font-bold text-3xl lg:text-4xl"
            style={{ color: "#3D2A28" }}
          >
            Projectos Realizados
          </h2>
          <div
            className="w-16 h-1 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: "#C9880D" }}
          />
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "#7a5a57" }}
          >
            Cozinhas lacadas a branco, em folha de carvalho, faia e outras
            madeiras naturais — sempre por medida, sempre com montagem incluída.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <GalleryCard key={p.title} project={p} delay={i * 0.08} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={getWhatsAppUrl(undefined, "cozinha")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-full text-white transition-all hover:opacity-90 shadow-[0_6px_20px_rgba(201,136,13,0.35)]"
            style={{ backgroundColor: "#C9880D" }}
          >
            Quero um projecto similar
          </a>
        </div>
      </div>
    </section>
  );
}
