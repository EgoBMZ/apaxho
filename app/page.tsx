"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  InstagramIcon,
  TwitterIcon,
  TikTokIcon,
  StarIcon,
  HeartEyesEmojiIcon,
  CoffeeCup1Icon,
  Sun2Icon,
  FireIcon
} from "react-doodle-icons";
export default function Home() {
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLinked, setIsLinked] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullText = "Más de 52,218 memorias plantadas";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    setTypedText("");
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleGenerateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCode = "APX-";
    for (let i = 0; i < 3; i++) newCode += chars.charAt(Math.floor(Math.random() * chars.length));
    newCode += "-";
    for (let i = 0; i < 3; i++) newCode += chars.charAt(Math.floor(Math.random() * chars.length));
    setGeneratedCode(newCode);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length >= 6) {
      setIsLinked(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-mono selection:bg-royal-blue selection:text-white">
      {/* HEADER (Inspired by Image 2 layout) */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-royal-blue/10">
        <div className="flex items-center gap-2">
          {/* Logo Doodle (Inspired by Image 1 & 4 flower) */}
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-royal-blue">
            <path d="M50,85 C51,70 49,55 50,45" />
            <circle cx="50" cy="35" r="8" />
            <path d="M50,27 C50,15 62,25 56,31" />
            <path d="M58,35 C70,30 65,45 57,39" />
            <path d="M54,41 C58,53 46,49 48,42" />
            <path d="M46,39 C34,45 30,30 42,35" />
            <path d="M44,31 C38,20 50,15 50,27" />
          </svg>
          <span className="font-doodle text-2xl font-bold tracking-tight text-royal-blue lowercase">
            apaxho
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-royal-blue/70">
          <a href="#como-funciona" className="hover:text-royal-blue transition-colors">¿Cómo funciona?</a>
          <a href="#filosofia" className="hover:text-royal-blue transition-colors">Filosofía</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-bold text-royal-blue hover:underline">
            Entrar
          </button>
          <a
            href="#empezar"
            className="bg-royal-blue text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-royal-blue/20"
          >
            Empezar
          </a>
        </div>
      </header>

      {/* HERO SECTION (Inspired by Image 2 layout with colors of Image 1/4) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* Social Icons Sidebar (Inspired by Image 2 vertical layout) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex lg:col-span-1 flex-col gap-6 text-royal-blue/40 border-r border-royal-blue/10 py-8"
        >
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-royal-blue transition-colors p-2 hover:bg-royal-blue/5 rounded-lg w-fit" title="Instagram">
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-royal-blue transition-colors p-2 hover:bg-royal-blue/5 rounded-lg w-fit" title="Twitter / X">
            <TwitterIcon className="w-6 h-6" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-royal-blue transition-colors p-2 hover:bg-royal-blue/5 rounded-lg w-fit" title="TikTok">
            <TikTokIcon className="w-6 h-6" />
          </a>
        </motion.div>

        {/* Content Column */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          {/* Memories Planted Badge (Inspired by Image 1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-lavender/40 text-lavender-text px-4 py-2 rounded-full w-fit text-sm font-bold border border-lavender/60 min-h-[38px]"
          >
            <span className="animate-pulse">🌸</span>
            <span className="font-mono">
              {typedText}
              {typedText.length < fullText.length && (
                <span className="border-r-2 border-royal-blue/60 ml-0.5 animate-pulse">|</span>
              )}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-royal-blue font-mono tracking-tight"
          >
            Un apapacho diario para tu persona favorita.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-foreground/80 leading-relaxed max-w-xl"
          >
            Cultiva un jardín digital de recuerdos compartiendo notas, recordatorios y pequeños momentos del día. Vincula tu espacio con tu pareja, bestie o amigo, mantén la racha activa y ve cómo florece tu diario compartido.
          </motion.p>

          {/* Interactive Console / Coupling box (Inspired by user request details) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
            id="empezar" 
            className="bg-white/80 backdrop-blur-md border-2 border-royal-blue/20 rounded-2xl p-6 shadow-xl shadow-royal-blue/5 flex flex-col gap-6 max-w-xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isLinked ? (
                <motion.div
                  key="unlinked"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-royal-blue uppercase tracking-wider">
                      Paso 1: Conecta tu jardín
                    </h3>
                    <p className="text-sm text-foreground/70">
                      Genera tu código o introduce el código de invitación de tu pareja/amigo para enlazarse.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Code Generator */}
                    <div className="flex flex-col gap-3 p-4 bg-[#f8f8fa] rounded-xl border border-royal-blue/5">
                      <button
                        onClick={handleGenerateCode}
                        className="w-full bg-white hover:bg-royal-blue/5 border border-royal-blue/20 text-royal-blue text-sm font-bold py-2 px-4 rounded-lg transition-all active:scale-[0.98]"
                      >
                        Generar código nuevo
                      </button>
                      {generatedCode && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-between bg-white border border-royal-blue/10 rounded-lg p-2 mt-1"
                        >
                          <span className="font-mono text-xs font-bold text-royal-blue tracking-widest">{generatedCode}</span>
                          <button
                            onClick={handleCopy}
                            className="text-[10px] uppercase font-bold text-lavender-text hover:underline"
                          >
                            {copied ? "¡Copiado!" : "Copiar"}
                          </button>
                        </motion.div>
                      )}
                    </div>

                    {/* Code Connector */}
                    <form onSubmit={handleLink} className="flex flex-col gap-3 p-4 bg-[#f8f8fa] rounded-xl border border-royal-blue/5">
                      <input
                        type="text"
                        placeholder="Código de pareja"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-royal-blue/20 text-royal-blue placeholder-royal-blue/30 text-sm font-mono text-center font-bold py-2 px-4 rounded-lg outline-none focus:border-royal-blue"
                      />
                      <button
                        type="submit"
                        disabled={code.trim().length < 6}
                        className="w-full bg-royal-blue hover:bg-royal-blue/90 disabled:opacity-50 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-[0.98]"
                      >
                        Vincular Jardín
                      </button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="linked"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  className="text-center py-4 flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-lavender flex items-center justify-center text-2xl animate-bounce">
                    🌸
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-doodle text-xl font-bold text-royal-blue">
                      ¡Conexión establecida!
                    </h3>
                    <p className="text-sm text-foreground/70">
                      El jardín de @EgoBMZ & Sharon ha sido creado con éxito. ¡Listo para plantar la primera racha!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsLinked(false);
                      setCode("");
                    }}
                    className="text-xs text-royal-blue/60 hover:text-royal-blue hover:underline mt-2"
                  >
                    Volver a intentar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mockup Column (Inspired by Image 2 phone mockup & Image 4 layout/doodles) */}
        <div className="lg:col-span-5 flex justify-center relative">
          {/* Abstract background shapes and floating doodles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-lavender/30 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-royal-blue/5 rounded-full blur-2xl -z-10" />
          
          <motion.div 
            animate={{ y: [0, -12, 0], rotate: [12, 18, 12] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-8 -right-4 md:-right-12 text-royal-blue/20 -z-10"
          >
            <Sun2Icon size={56} />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0], rotate: [-12, -7, -12] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute bottom-16 -left-6 md:-left-16 text-royal-blue/20 -z-10"
          >
            <CoffeeCup1Icon size={64} />
          </motion.div>
          
          <motion.div 
            animate={{ scale: [1, 1.12, 1], rotate: [45, 60, 45] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute -top-12 left-1/4 text-royal-blue/20 -z-10"
          >
            <StarIcon size={42} />
          </motion.div>

          {/* Device Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.2 }}
            className="w-[310px] h-[620px] rounded-[50px] bg-slate-900 p-3.5 shadow-2xl border-4 border-slate-800/80 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-between px-4">
              <span className="w-1.5 h-1.5 bg-royal-blue rounded-full animate-pulse" />
              <span className="w-1 h-1 bg-white/20 rounded-full" />
            </div>

            {/* App Screen Content (Inspired by Image 4) */}
            <div className="w-full h-full rounded-[38px] bg-background p-5 pt-10 flex flex-col justify-between select-none relative">
              {/* App Status bar */}
              <div className="flex justify-between items-center text-[10px] font-bold text-royal-blue/60 px-2 pt-2">
                <span>16:31</span>
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-current">
                    <path d="M10,80 L20,80 L20,70 L10,70 Z M30,80 L40,80 L40,55 L30,55 Z M50,80 L60,80 L60,40 L50,40 Z M70,80 L80,80 L80,25 L70,25 Z" />
                  </svg>
                  <span>33%</span>
                </div>
              </div>

              {/* Garden Header */}
              <div className="flex justify-between items-start mt-6 px-2">
                <div className="flex flex-col">
                  <span className="font-doodle text-xl font-bold text-royal-blue leading-tight">
                    Ego & Sharon
                  </span>
                  <span className="font-doodle text-xl font-bold text-royal-blue mt-0.5 leading-none">
                    memories
                  </span>
                </div>
                {/* Hand-drawn flower logo as shown in reference 4 */}
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-royal-blue transform translate-y-[-2px]">
                  <path d="M50,85 C51,70 49,55 50,45" />
                  <circle cx="50" cy="35" r="8" />
                  <path d="M50,27 C50,15 62,25 56,31" />
                  <path d="M58,35 C70,30 65,45 57,39" />
                  <path d="M54,41 C58,53 46,49 48,42" />
                  <path d="M46,39 C34,45 30,30 42,35" />
                  <path d="M44,31 C38,20 50,15 50,27" />
                </svg>
              </div>

              {/* The Doodle Garden (Inspired by Image 4 garden) */}
              <div className="flex-1 my-4 bg-white/50 border border-royal-blue/5 rounded-3xl p-4 relative overflow-hidden grid grid-cols-4 gap-4 items-center justify-items-center">
                {/* Floating bees, flowers, mushrooms as SVGs in royal blue */}
                <motion.div 
                  animate={{ rotate: [-2, 2, -2] }} 
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: 5 }} 
                  whileTap={{ scale: 0.95 }}
                  className="text-royal-blue cursor-pointer"
                >
                  {/* Grass */}
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M30,85 C28,60 15,45 10,40 C20,50 30,70 33,85" />
                    <path d="M45,85 C45,55 35,35 25,30 C38,40 45,65 48,85" />
                  </svg>
                </motion.div>
                
                <motion.div 
                  animate={{ rotate: [1, -2, 1], y: [0, -2, 0] }} 
                  transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
                  whileHover={{ scale: 1.12, y: -4 }} 
                  whileTap={{ scale: 0.95 }}
                  className="text-royal-blue cursor-pointer col-span-2"
                >
                  {/* Flower 1 */}
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                    <path d="M50,85 C51,70 49,55 50,45" />
                    <circle cx="50" cy="35" r="7" />
                    <path d="M50,28 C50,18 58,25 54,30" />
                    <path d="M56,35 C64,32 60,42 54,38" />
                    <path d="M52,40 C54,48 46,45 48,40" />
                    <path d="M47,38 C39,42 37,32 44,35" />
                    <path d="M45,31 C40,24 48,20 50,28" />
                  </svg>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -4, 0], x: [0, 2, 0] }} 
                  transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                  whileHover={{ scale: 1.22, rotate: 10 }} 
                  whileTap={{ scale: 0.95 }}
                  className="text-royal-blue cursor-pointer"
                >
                  {/* Bee */}
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <ellipse cx="50" cy="50" rx="14" ry="9" />
                    <path d="M44,42 Q45,50 44,58" />
                    <path d="M50,41 Q51,50 50,59" />
                    <path d="M45,41 Q38,25 50,41" />
                  </svg>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: -6 }} 
                  whileTap={{ scale: 0.95 }}
                  className="text-royal-blue cursor-pointer"
                >
                  {/* Mushroom */}
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M30,55 C30,35 70,35 70,55 Z" />
                    <path d="M45,55 C45,72 46,75 46,78 C54,78 55,72 55,55" />
                    <circle cx="45" cy="46" r="3" />
                    <circle cx="55" cy="49" r="2.5" />
                  </svg>
                </motion.div>

                <motion.div 
                  animate={{ rotate: [-2, 1, -2], y: [0, -1, 0] }} 
                  transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
                  whileHover={{ scale: 1.12, y: -3 }} 
                  whileTap={{ scale: 0.95 }}
                  className="text-royal-blue cursor-pointer col-span-1"
                >
                  {/* Flower 2 */}
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
                    <path d="M50,85 C50,75 50,65 50,55" />
                    <circle cx="50" cy="45" r="8" />
                    <path d="M50,37 C50,30 55,34 53,38" />
                    <path d="M55,45 C62,45 58,48 55,47" />
                    <path d="M50,53 C50,60 45,56 47,52" />
                    <path d="M45,45 C38,45 42,42 45,43" />
                  </svg>
                </motion.div>

                <motion.div 
                  animate={{ rotate: [2, -2, 2] }} 
                  transition={{ repeat: Infinity, duration: 4.1, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: -5 }} 
                  whileTap={{ scale: 0.95 }}
                  className="text-royal-blue cursor-pointer"
                >
                  {/* Grass 2 */}
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M58,85 C60,50 70,30 80,25 C70,40 62,65 60,85" />
                    <path d="M72,85 C75,65 85,55 90,50 C82,60 76,75 74,85" />
                  </svg>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 4, 0], x: [0, -2, 0] }} 
                  transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
                  whileHover={{ scale: 1.22, rotate: -10 }} 
                  whileTap={{ scale: 0.95 }}
                  className="text-royal-blue cursor-pointer transform scale-x-[-1]"
                >
                  {/* Bee 2 */}
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <ellipse cx="50" cy="50" rx="14" ry="9" />
                    <path d="M44,42 Q45,50 44,58" />
                    <path d="M50,41 Q51,50 50,59" />
                    <path d="M45,41 Q38,25 50,41" />
                  </svg>
                </motion.div>

                {/* Dotted "Add" circle at bottom center */}
                <motion.div 
                  whileHover={{ scale: 1.08, borderStyle: "solid", borderColor: "#1c0dcb" }}
                  whileTap={{ scale: 0.95 }}
                  className="col-span-4 mt-auto mb-2 w-12 h-12 rounded-full border-2 border-dashed border-royal-blue/30 flex items-center justify-center text-royal-blue/50 hover:text-royal-blue cursor-pointer"
                >
                  <span className="text-xl font-bold">+</span>
                </motion.div>
              </div>

              {/* Bottom Nav Simulation */}
              <div className="flex justify-around items-center border-t border-royal-blue/10 pt-3 pb-2 text-royal-blue/50 text-[10px] font-bold">
                <span className="text-royal-blue underline decoration-2 underline-offset-4">Memories</span>
                <span>Diario</span>
                <span>Ajustes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* HOW IT WORKS SECTION (Inspired by Image 3 doodle/hand-drawn concepts) */}
      <section id="como-funciona" className="w-full max-w-7xl mx-auto px-6 py-20 border-t border-royal-blue/10">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="font-doodle text-3xl font-bold text-royal-blue">
            ¿Cómo se cultiva tu jardín?
          </h2>
          <p className="text-foreground/75 max-w-md">
            Un espacio libre de la saturación de las redes sociales convencionales. Tres simples pasos para conectar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-royal-blue/10 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-royal-blue/5 flex items-center justify-center text-royal-blue">
              {/* Linked loop SVG */}
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M30,50 C10,25 40,25 50,50 C60,75 90,75 70,50 C50,25 20,75 50,50 Z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-mono font-bold text-lg text-royal-blue">
                1. Enlázate
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Regístrate y vincula tu cuenta usando un código compartido. Un jardín único creado exclusivamente para ustedes dos.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-royal-blue/10 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-royal-blue/5 flex items-center justify-center text-royal-blue">
              {/* Pencil SVG */}
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <rect x="25" y="25" width="50" height="20" rx="3" transform="rotate(45, 50, 50)" />
                <path d="M68,32 L80,20 L68,20 Z" transform="rotate(45, 50, 50)" />
                <path d="M25,45 L20,40 L25,35 Z" fill="currentColor" transform="rotate(45, 50, 50)" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-mono font-bold text-lg text-royal-blue">
                2. Envía un Apapacho
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Escribe una nota recordando algo bonito del día, un detalle o un cumplido. Sin fotos perfectas, solo palabras reales.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="bg-white border-2 border-royal-blue/10 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-royal-blue/5 flex items-center justify-center text-royal-blue">
              {/* Flower SVG */}
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                <path d="M50,85 C51,70 49,55 50,45" />
                <circle cx="50" cy="35" r="8" />
                <path d="M50,27 C50,15 62,25 56,31" />
                <path d="M58,35 C70,30 65,45 57,39" />
                <path d="M54,41 C58,53 46,49 48,42" />
                <path d="M46,39 C34,45 30,30 42,35" />
                <path d="M44,31 C38,20 50,15 50,27" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-mono font-bold text-lg text-royal-blue">
                3. Ve Florecer
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Cada nota exitosa planta una flor o detalle en su jardín virtual. Si pasa un día sin nota, la racha se romperá.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section id="filosofia" className="w-full bg-white border-t border-b border-royal-blue/10 py-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-8">
          <div className="w-12 h-12 text-royal-blue">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="35" r="8" />
              <path d="M50,27 C50,15 62,25 56,31" />
              <path d="M58,35 C70,30 65,45 57,39" />
              <path d="M54,41 C58,53 46,49 48,42" />
              <path d="M46,39 C34,45 30,30 42,35" />
              <path d="M44,31 C38,20 50,15 50,27" />
            </svg>
          </div>
          
          <h2 className="font-doodle text-3xl font-bold text-royal-blue">
            "Every day matters"
          </h2>
          
          <p className="text-lg leading-relaxed text-foreground/80 max-w-2xl font-mono">
            Creamos Apaxho como un recordatorio diario de que la vida es demasiado corta para pasarla haciendo cosas que no nos entusiasman. Esperamos que cada vez que entres aquí con tu persona favorita, te recuerdes que cada día cuenta.
          </p>

          <span className="font-doodle text-2xl font-semibold text-royal-blue tracking-wide mt-4 block">
            Diego & Sharon ♡
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-royal-blue/10 text-xs text-royal-blue/50 font-bold">
        <span>© {new Date().getFullYear()} APAXHO. Hecho con amor.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Privacidad</a>
          <a href="#" className="hover:underline">Términos</a>
          <a href="#" className="hover:underline">Contacto</a>
        </div>
      </footer>
    </div>
  );
}
