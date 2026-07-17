"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f1f1f4] text-[#1c1c24] font-mono selection:bg-[#1c0dcb] selection:text-white p-6 md:p-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white border-2 border-[#1c0dcb]/20 rounded-3xl p-8 md:p-12 shadow-xl shadow-[#1c0dcb]/5 flex flex-col gap-8"
      >
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#1c0dcb] hover:underline group w-fit">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:-translate-x-1">
            <path d="M70,50 L30,50 M50,30 L30,50 L50,70" />
          </svg>
          Volver al inicio / Back to Home
        </Link>

        <div className="flex flex-col gap-6">
          <h1 className="font-doodle text-3xl md:text-4xl font-bold text-[#1c0dcb]">
            Términos de Servicio
          </h1>
          <p className="text-xs text-foreground/50">Última actualización: 16 de Julio, 2026</p>
          <hr className="border-[#1c0dcb]/10" />

          <div className="flex flex-col gap-6 text-sm leading-relaxed text-foreground/80">
            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">1. Uso de la Plataforma</h2>
              <p>Al utilizar la aplicación Apaxho, aceptas cumplir con los siguientes Términos de Servicio. Por favor, léelos con atención.</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>Apaxho es un espacio privado diseñado para parejas y amigos íntimos para compartir notas y recuerdos diarios.</li>
                <li>Te comprometes a usar la plataforma de manera respetuosa y a no subir contenido ofensivo o ilegal.</li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">2. Cuentas y Vinculación</h2>
              <p>Eres responsable de mantener la confidencialidad del código de invitación generado por tu cuenta. Solo puedes vincular tu jardín con una persona a la vez para mantener la esencia íntima del servicio.</p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">3. Modificaciones del Servicio</h2>
              <p>Nos reservamos el derecho de modificar o suspender de forma temporal o permanente el servicio en cualquier momento con el fin de mejorar la plataforma.</p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">4. Limitación de Responsabilidad</h2>
              <p>Apaxho no se hace responsable de pérdidas de datos por mal uso de la plataforma o fallos técnicos imprevistos.</p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">5. Contacto</h2>
              <p>
                Para cualquier duda general o aclaración legal, puedes contactar al desarrollador en{" "}
                <a href="https://egobmz.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#1c0dcb] underline font-bold">
                  egobmz.vercel.app
                </a>.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
