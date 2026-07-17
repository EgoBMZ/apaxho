"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { translations } from "../translations";
import { 
  HeartIcon, 
  StarIcon, 
  GlobeIcon, 
  CrownIcon,
  DiamondIcon,
  CakeIcon,
  Sun2Icon
} from "react-doodle-icons";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState<"es" | "en">("es");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLang = navigator.language || "";
      setLocale(userLang.toLowerCase().startsWith("en") ? "en" : "es");
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const t = (key: keyof typeof translations.es) =>
    translations[locale]?.[key] ?? translations["es"][key];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f1f4] flex items-center justify-center font-mono text-[#1c0dcb]">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-10 h-10 border-4 border-[#1c0dcb] border-t-transparent rounded-full"
          />
          <span className="text-xs uppercase tracking-wider font-bold animate-pulse">Cargando Jardín... / Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-[#1c1c24] font-mono selection:bg-[#1c0dcb] selection:text-white p-6 md:p-12 relative overflow-hidden flex flex-col items-center justify-between">
      
      {/* Decorative doodles */}
      <div className="fixed inset-0 pointer-events-none select-none opacity-[0.08]" aria-hidden>
        <div className="absolute top-[8%] left-[5%] rotate-12"><Sun2Icon size={70} /></div>
        <div className="absolute top-[45%] left-[2%] -rotate-45"><CrownIcon size={56} /></div>
        <div className="absolute bottom-[8%] left-[6%] rotate-6"><CakeIcon size={64} /></div>
        <div className="absolute top-[12%] right-[5%] -rotate-12"><StarIcon size={64} /></div>
        <div className="absolute top-[50%] right-[3%] rotate-45"><HeartIcon size={72} /></div>
        <div className="absolute bottom-[10%] right-[6%] -rotate-12"><DiamondIcon size={60} /></div>
      </div>

      {/* HEADER */}
      <header className="w-full max-w-5xl flex items-center justify-between gap-4 z-10">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-[#1c0dcb]">
            <path d="M50,85 C51,70 49,55 50,45" /><circle cx="50" cy="35" r="8" />
            <path d="M50,27 C50,15 62,25 56,31" /><path d="M58,35 C70,30 65,45 57,39" />
            <path d="M54,41 C58,53 46,49 48,42" /><path d="M46,39 C34,45 30,30 42,35" />
            <path d="M44,31 C38,20 50,15 50,27" />
          </svg>
          <span className="font-doodle text-2xl font-bold tracking-tight text-[#1c0dcb] lowercase">apaxho</span>
        </Link>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#1c0dcb]/20 rounded-xl text-xs font-bold text-[#1c0dcb] hover:bg-[#1c0dcb]/5 transition-all"
          >
            <GlobeIcon className="w-3.5 h-3.5" />
            <span>{locale.toUpperCase()}</span>
          </button>
          
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogout}
            className="bg-[#1c0dcb] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-[#1c0dcb]/20 transition-all"
          >
            {locale === "es" ? "Salir" : "Logout"}
          </motion.button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-xl flex flex-col justify-center gap-8 py-10 z-10">
        
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border-2 border-[#1c0dcb]/20 rounded-3xl p-8 shadow-xl shadow-[#1c0dcb]/5 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-2xl">🌸</motion.span>
            <h2 className="font-doodle text-xl md:text-2xl font-bold text-[#1c0dcb]">
              {locale === "es" ? "¡Hola," : "Hello,"} {user?.displayName || "User"}!
            </h2>
          </div>
          
          <p className="text-sm text-foreground/80 leading-relaxed">
            {locale === "es" 
              ? "Bienvenido a tu panel de control de Apaxho. Este es el comienzo de tu jardín compartido. En los siguientes pasos podrás vincular tu cuenta con tu pareja, enviar notas y revivir recuerdos diarios."
              : "Welcome to your Apaxho dashboard. This is the beginning of your shared garden. In the next steps, you can link your account with your partner, send daily notes, and relive memories."
            }
          </p>

          <hr className="border-[#1c0dcb]/10" />

          {/* Space / Garden info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1c0dcb]/70">
              {locale === "es" ? "Estado de tu cuenta" : "Account Status"}
            </h3>
            <div className="bg-[#f8f8fa] border border-[#1c0dcb]/10 rounded-2xl p-4 flex flex-col gap-2.5 text-xs text-[#1c1c24]/80">
              <div className="flex justify-between">
                <span className="font-bold text-[#1c1c24]/50">{locale === "es" ? "Correo:" : "Email:"}</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#1c1c24]/50">{locale === "es" ? "Rol / Vínculo:" : "Role / Partner:"}</span>
                <span className="text-royal-blue font-bold">
                  {locale === "es" ? "Jardín Individual (Pendiente de vincular)" : "Single Garden (Pending link)"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Future setup helper */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-2 border-dashed border-[#1c0dcb]/25 bg-white/40 backdrop-blur-sm rounded-3xl p-6 text-center text-xs text-[#1c1c24]/60 leading-relaxed"
        >
          {locale === "es"
            ? "💡 Estamos preparando la base de datos de vinculación en tiempo real para enlazar tu jardín con Sharon/Diego mediante código. ¡Vuelve pronto!"
            : "💡 We are preparing the real-time pairing database to link your garden with Sharon/Diego via code. Check back soon!"
          }
        </motion.div>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-[10px] text-[#1c0dcb]/50 font-bold z-10 mt-6">
        <span>© {new Date().getFullYear()} APAXHO. {t("footerMadeWith")}</span>
      </footer>
    </div>
  );
}
