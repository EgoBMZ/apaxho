"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
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
            Política de Privacidad
          </h1>
          <p className="text-xs text-foreground/50">Última actualización: 16 de Julio, 2026</p>
          <hr className="border-[#1c0dcb]/10" />

          <div className="flex flex-col gap-6 text-sm leading-relaxed text-foreground/80">
            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">1. Información que Recopilamos</h2>
              <p>En Apaxho, nos tomamos muy en serio tu privacidad y la de tu pareja o amigo. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos la información en nuestra plataforma.</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li><strong>Información de Registro:</strong> Solo recopilamos los datos estrictamente necesarios para el funcionamiento del servicio (como nombres de usuario y códigos de vinculación).</li>
                <li><strong>Notas y Memorias:</strong> Las notas y flores plantadas en tu jardín digital se almacenan de forma segura para que tú y tu pareja puedan ver su historial compartido.</li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">2. Uso de la Información</h2>
              <p>Usamos tu información únicamente para mantener tu cuenta, conectar tu jardín con tu pareja y mostrar tu historial de notas y rachas. No compartimos, vendemos ni alquilamos tus datos personales a terceros con fines publicitarios.</p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">3. Seguridad de tus Datos</h2>
              <p>Implementamos medidas de seguridad técnicas para proteger tus datos de accesos no autorizados.</p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-[#1c0dcb]">4. Contacto</h2>
              <p>
                Si tienes alguna duda sobre esta Política de Privacidad, puedes contactarnos a través de la web personal de Diego (EGO):{" "}
                <a href="https://egobmz.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#1c0dcb] underline font-bold">
                  egobmz.vercel.app
                </a>{" "}
                o nuestras redes sociales.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
