"use client"

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import type { MouseEvent, TouchEvent, CSSProperties } from "react";

export const pairs = [
  {
    before: { src: "/images/antes-1.png" },
    after:  { src: "/images/depois-1.png" },
    title: "Renovação Total em Coimbra",
    desc: "Armários lacados a branco, tampo em quartzo e chão em vinílico SPC a imitar carvalho mel.",
  },
  {
    before: { src: "/images/antes-2.png" },
    after:  { src: "/images/depois-2.png" },
    title: "Transformação em Leiria",
    desc: "Novas frentes em lacado branco mate sem puxadores, tampo em quartzo branco e iluminação LED sob armários.",
  },
]

export function CompareSlider({ before, after, aspectRatio = "4/3" }: { before: { src: string }; after: { src: string }; aspectRatio?: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const clamp = (v: number) => Math.min(Math.max(v, 2), 98);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onHandleMouseDown = useCallback((e: MouseEvent) => { e.preventDefault(); setDragging(true); updatePos(e.clientX); }, [updatePos]);
  const onHandleTouchStart = useCallback((e: TouchEvent) => { e.stopPropagation(); setDragging(true); updatePos(e.touches[0].clientX); }, [updatePos]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updatePos(e.clientX);
    const onTouchMove = (e: TouchEvent) => updatePos(e.touches[0].clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updatePos]);

  const imgStyle: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", pointerEvents: "none", userSelect: "none", WebkitUserSelect: "none" };

  return (
    <div ref={containerRef} className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio, cursor: dragging ? "grabbing" : "default", touchAction: "pan-y" }}>
      <img src={after.src} alt="Depois" draggable={false} style={imgStyle} />
      <img src={before.src} alt="Antes" draggable={false} style={{ ...imgStyle, clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "2px", transform: "translateX(-50%)", backgroundColor: "#C9880D", pointerEvents: "none" }} />
      <div onMouseDown={onHandleMouseDown} onTouchStart={onHandleTouchStart} style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)", width: 44, height: 44, borderRadius: "50%", backgroundColor: "#C9880D", border: "2px solid #fff", boxShadow: "0 2px 12px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: dragging ? "grabbing" : "grab", pointerEvents: "auto", zIndex: 10, touchAction: "none" }}>
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M7 11L3 7v8l4-4z" fill="white" /><path d="M15 11l4-4v8l-4-4z" fill="white" /><rect x="10" y="3" width="2" height="16" rx="1" fill="white" /></svg>
      </div>
      <span style={{ position: "absolute", top: 10, left: 10, padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", backgroundColor: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.85)", pointerEvents: "none", opacity: pos > 12 ? 1 : 0, transition: "opacity 0.2s" }}>ANTES</span>
      <span style={{ position: "absolute", top: 10, right: 10, padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", backgroundColor: "rgba(201,136,13,0.55)", color: "#fff", pointerEvents: "none", opacity: pos < 88 ? 1 : 0, transition: "opacity 0.2s" }}>DEPOIS</span>
    </div>
  );
}

export default function BeforeAfter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 lg:py-24" style={{ backgroundColor: "#1a1208" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Transformações
          </p>
          <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-white">
            Antes & Depois
          </h2>
          <p className="mt-3 text-sm max-w-sm mx-auto" style={{ color: "rgba(249,243,240,0.5)" }}>
            Arraste o divisor para ver a transformação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pairs.map((pair, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="flex flex-col gap-3"
            >
              <CompareSlider before={pair.before} after={pair.after} />
              <div className="text-center px-2">
                <h3 className="font-semibold text-sm" style={{ color: "#C9880D" }}>
                  {pair.title}
                </h3>
                <p className="text-xs mt-1" style={{ color: "rgba(249,243,240,0.45)" }}>
                  {pair.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
