"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  InstagramIcon,
  TwitterIcon,
  TikTokIcon,
  StarIcon,
  HeartIcon,
  GlobeIcon,
  FireIcon,
  GiftIcon,
  MusicIcon,
  CandyIcon,
  RocketIcon,
  CrownIcon,
  BalloonIcon,
  CakeIcon,
  DiamondIcon,
  IceCreamIcon,
  PopsicleIcon,
  CoffeeCup1Icon,
  Sun2Icon,
} from "react-doodle-icons";
import { translations } from "./translations";

/* ─── Custom Inline Hand-Drawn Icons for Globe and Social Links ─── */
const DoodleGlobe = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
    <circle cx="50" cy="50" r="40" />
    <path d="M10,50 Q50,65 90,50" />
    <path d="M10,50 Q50,35 90,50" />
    <path d="M50,10 Q65,50 50,90" />
    <path d="M50,10 Q35,50 50,90" />
  </svg>
);

const DoodleInstagram = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible animate-pulse">
    <rect x="15" y="15" width="70" height="70" rx="20" />
    <circle cx="50" cy="50" r="18" />
    <circle cx="72" cy="28" r="5" fill="currentColor" />
  </svg>
);

const DoodleGithub = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
    <path d="M50,10 C28,10 10,28 10,50 C10,68 22,83 38,88 C38,89 38,85 38,81 C27,83 25,76 25,76 C23,72 20,71 20,71 C17,69 20,69 20,69 C23,69 25,73 25,73 C28,77 32,76 34,75 C34,73 35,71 36,70 C27,69 18,65 18,50 C18,46 20,42 22,39 C22,38 20,34 22,29 C22,29 25,28 32,33 C35,32 38,32 41,32 C44,32 47,32 50,33 C57,28 60,29 60,29 C62,34 60,38 60,39 C62,42 64,46 64,50 C64,65 55,69 46,70 C47,71 48,74 48,78 C48,83 48,87 48,88 C64,83 76,68 76,50 C76,28 58,10 50,10 Z" />
  </svg>
);

const DoodleLinkedin = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
    <rect x="15" y="15" width="70" height="70" rx="15" />
    <line x1="35" y1="45" x2="35" y2="70" />
    <circle cx="35" cy="33" r="5" fill="currentColor" />
    <path d="M50,70 L50,55 C50,48 54,45 59,45 C64,45 67,48 67,55 L67,70" />
    <line x1="50" y1="45" x2="50" y2="70" />
  </svg>
);

const DoodleWeb = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
    <path d="M15,45 L50,15 L85,45 M25,40 L25,85 L75,85 L75,40" />
    <rect x="42" y="55" width="16" height="30" rx="3" />
  </svg>
);

/* ─── Inline SVG doodles inspired by reference image 3 (bold sketch style) ─── */
const DoodlePineapple = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 140" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="50" cy="90" rx="28" ry="38" />
    <path d="M50,52 C50,25 35,10 50,5 C65,10 50,25 50,52" />
    <path d="M42,48 C30,30 38,15 50,8" />
    <path d="M58,48 C70,30 62,15 50,8" />
    <path d="M50,48 C50,22 50,8 50,5" />
    <line x1="30" y1="75" x2="70" y2="75" />
    <line x1="28" y1="88" x2="72" y2="88" />
    <line x1="30" y1="100" x2="70" y2="100" />
    <line x1="50" y1="56" x2="50" y2="125" />
    <line x1="36" y1="60" x2="36" y2="118" />
    <line x1="64" y1="60" x2="64" y2="118" />
  </svg>
);

const DoodleSkull = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 110" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20,60 C15,30 30,10 50,10 C70,10 85,30 80,60 C80,72 72,80 64,82 L64,95 L36,95 L36,82 C28,80 20,72 20,60 Z" />
    <circle cx="37" cy="52" r="9" />
    <circle cx="63" cy="52" r="9" />
    <line x1="44" y1="82" x2="56" y2="82" />
    <line x1="44" y1="90" x2="56" y2="90" />
    <line x1="50" y1="65" x2="50" y2="80" />
  </svg>
);

const DoodleFox = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 130 90" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5,20 L30,45 L20,60 C35,70 55,65 65,50 C75,65 95,70 110,60 L100,45 L125,20 L90,38 C80,25 70,20 65,20 C60,20 50,25 40,38 Z" />
    <circle cx="50" cy="48" r="4" />
    <circle cx="80" cy="48" r="4" />
    <path d="M60,55 Q65,60 70,55" />
    <path d="M95,75 C110,80 120,70 115,60" strokeWidth="4" />
  </svg>
);

const DoodleTiger = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="55" r="35" />
    <path d="M32,25 L20,5 L38,30" />
    <path d="M68,25 L80,5 L62,30" />
    <circle cx="38" cy="50" r="7" />
    <circle cx="62" cy="50" r="7" />
    <path d="M42,65 Q50,72 58,65" />
    <path d="M25,60 L10,65" />
    <path d="M25,68 L8,72" />
    <path d="M75,60 L90,65" />
    <path d="M75,68 L92,72" />
    <path d="M38,40 C36,32 40,28 44,32" strokeWidth="3" />
    <path d="M62,40 C64,32 60,28 56,32" strokeWidth="3" />
  </svg>
);

const DoodleHand = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 90 110" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20,80 L20,40 C20,35 25,32 30,35 L30,55" />
    <path d="M30,38 L30,25 C30,20 35,18 40,22 L40,50" />
    <path d="M40,25 L40,15 C40,10 45,9 50,12 L50,48" />
    <path d="M50,18 L50,12 C50,8 55,7 58,10 L60,45" />
    <path d="M20,75 C15,82 16,95 25,100 L65,100 C72,100 75,92 72,85 L60,45 C58,40 50,40 50,48 L50,55 L40,55 L40,50 L30,50 L30,55 L20,55" />
  </svg>
);

const DoodleRose = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 110" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40,55 C40,40 38,30 40,22" />
    <path d="M40,55 C28,95 28,105 28,105 L52,105 C52,105 52,95 40,55" />
    <circle cx="40" cy="22" r="14" />
    <path d="M40,8 C40,8 50,12 52,20 C52,20 44,16 40,22" />
    <path d="M52,20 C60,20 58,30 52,30 C52,30 52,24 40,22" />
    <path d="M48,32 C50,40 42,40 40,36 C40,36 46,34 40,22" />
    <path d="M32,32 C28,36 32,44 38,40 C38,40 36,36 40,22" />
    <path d="M28,22 C28,14 36,10 40,8" />
    <path d="M28,75 C22,72 20,68 24,64" strokeWidth="3" />
    <path d="M24,64 L20,58" strokeWidth="3" />
  </svg>
);

const DoodleMushroom = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 90 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15,55 C12,30 28,12 45,12 C62,12 78,30 75,55 Z" />
    <path d="M32,55 C32,75 33,78 33,82 C50,82 57,75 57,55" />
    <circle cx="38" cy="35" r="5" />
    <circle cx="55" cy="42" r="4" />
    <circle cx="52" cy="28" r="3" />
  </svg>
);

const DoodleWave = ({ size = 50 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 120 50" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5,25 C20,10 30,40 45,25 C60,10 70,40 85,25 C100,10 110,35 115,25" />
  </svg>
);

const DoodleNote = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="5" width="60" height="80" rx="6" />
    <line x1="22" y1="28" x2="58" y2="28" />
    <line x1="22" y1="42" x2="58" y2="42" />
    <line x1="22" y1="56" x2="44" y2="56" />
    <path d="M55,65 L68,55 L60,75 Z" />
  </svg>
);

const DoodleButterfly = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 110 80" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M55,40 C55,40 30,20 10,28 C5,30 8,45 20,42 C35,38 50,48 55,40" />
    <path d="M55,40 C55,40 80,20 100,28 C105,30 102,45 90,42 C75,38 60,48 55,40" />
    <path d="M55,40 C55,40 38,55 20,58 C10,60 8,72 20,70 C38,67 52,55 55,40" />
    <path d="M55,40 C55,40 72,55 90,58 C100,60 102,72 90,70 C72,67 58,55 55,40" />
    <ellipse cx="55" cy="40" rx="4" ry="10" />
    <path d="M52,22 C50,15 58,15 56,22" strokeWidth="3" />
  </svg>
);

const DoodlePencil = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 120" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8,100 L8,20 C8,15 32,15 32,20 L32,100 Z" />
    <path d="M8,100 L20,115 L32,100" />
    <line x1="8" y1="25" x2="32" y2="25" />
  </svg>
);

/* ─── Floating background doodle data ─── */
const BG_DOODLES = [
  // Left column
  { el: <DoodlePineapple size={72} />, pos: "top-[5%] left-[1%]", rot: "rotate-12", dur: 8, del: 0 },
  { el: <DoodleFox size={80} />, pos: "top-[40%] left-[0%]", rot: "rotate-6", dur: 9, del: 0.5 },
  { el: <DoodleMushroom size={64} />, pos: "top-[72%] left-[1%]", rot: "-rotate-12", dur: 6.5, del: 2.5 },
  { el: <CrownIcon size={52} />, pos: "top-[22%] left-[2%]", rot: "-rotate-6", dur: 7, del: 1.8 },
  { el: <DoodleNote size={56} />, pos: "top-[58%] left-[1.5%]", rot: "rotate-6", dur: 8.2, del: 1.2 },
  { el: <DiamondIcon size={44} />, pos: "top-[88%] left-[4%]", rot: "-rotate-12", dur: 7, del: 1.4 },
  // Right column
  { el: <DoodleSkull size={64} />, pos: "top-[8%] right-[1%]", rot: "-rotate-12", dur: 7, del: 1.5 },
  { el: <DoodleTiger size={72} />, pos: "top-[38%] right-[0%]", rot: "-rotate-6", dur: 7.5, del: 2 },
  { el: <DoodleButterfly size={76} />, pos: "top-[64%] right-[0.5%]", rot: "rotate-6", dur: 7.2, del: 0.8 },
  { el: <DoodleRose size={60} />, pos: "top-[22%] right-[2%]", rot: "rotate-12", dur: 8.5, del: 1 },
  { el: <DoodleHand size={60} />, pos: "top-[85%] right-[2%]", rot: "rotate-8", dur: 9, del: 0.3 },
  { el: <StarIcon size={48} />, pos: "top-[52%] right-[2%]", rot: "rotate-12", dur: 6, del: 1.8 },
  // Top & bottom accents
  { el: <DoodlePencil size={52} />, pos: "top-[1%] right-[38%]", rot: "rotate-45", dur: 8, del: 0.6 },
  { el: <DoodleWave size={80} />, pos: "top-[95%] left-[30%]", rot: "-rotate-3", dur: 7, del: 1.0 },
  { el: <HeartIcon size={44} />, pos: "top-[2%] left-[38%]", rot: "-rotate-12", dur: 6.5, del: 0.4 },
];

export default function Home() {
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLinked, setIsLinked] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [copied, setCopied] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if device is desktop / fine pointer
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea, .cursor-pointer");
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isMobile) {
      document.body.classList.add("custom-cursor-active");
    } else {
      document.body.classList.remove("custom-cursor-active");
    }
    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isMobile]);

  const [locale, setLocale] = useState<"es" | "en">("es");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLang = navigator.language || "";
      setLocale(userLang.toLowerCase().startsWith("en") ? "en" : "es");
    }
  }, []);

  const t = (key: keyof typeof translations.es) =>
    translations[locale]?.[key] ?? translations["es"][key];

  const fullText = t("heroBadge");
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    setTypedText("");
    const interval = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [fullText]);

  const handleGenerateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let c = "APX-";
    for (let i = 0; i < 3; i++) c += chars[Math.floor(Math.random() * chars.length)];
    c += "-";
    for (let i = 0; i < 3; i++) c += chars[Math.floor(Math.random() * chars.length)];
    setGeneratedCode(c);
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
      setIsLinking(true);
      setTimeout(() => { setIsLinking(false); setIsLinked(true); }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-mono selection:bg-royal-blue selection:text-white relative">

      {/* ── Background Floating Doodles ── */}
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden style={{ zIndex: 0 }}>
        {BG_DOODLES.map((d, i) => (
          <motion.div
            key={i}
            className={`absolute text-royal-blue/[0.13] ${d.pos} ${d.rot}`}
            animate={{ y: [0, -20, 0], x: [0, 8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: d.dur, delay: d.del, ease: "easeInOut" }}
          >
            {d.el}
          </motion.div>
        ))}
      </div>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/90 border-b border-royal-blue/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, rotate: 12 }}
              className="text-royal-blue cursor-pointer shrink-0"
            >
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
                <path d="M50,85 C51,70 49,55 50,45" />
                <circle cx="50" cy="35" r="8" />
                <path d="M50,27 C50,15 62,25 56,31" />
                <path d="M58,35 C70,30 65,45 57,39" />
                <path d="M54,41 C58,53 46,49 48,42" />
                <path d="M46,39 C34,45 30,30 42,35" />
                <path d="M44,31 C38,20 50,15 50,27" />
              </svg>
            </motion.div>
            <span className="font-doodle text-3xl font-bold tracking-tight text-royal-blue lowercase">apaxho</span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-royal-blue/60">
            <a href="#como-funciona" className="hover:text-royal-blue transition-colors">{t("navHowItWorks")}</a>
            <a href="#filosofia" className="hover:text-royal-blue transition-colors">{t("navPhilosophy")}</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
              className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-sm font-bold text-royal-blue border-2 border-royal-blue/25 hover:bg-royal-blue/8 hover:border-royal-blue/50 transition-all shadow-sm"
            >
              <DoodleGlobe size={18} />
              <span>{locale.toUpperCase()}</span>
            </motion.button>
            <button className="text-sm font-bold text-royal-blue/70 hover:text-royal-blue hover:underline transition-colors">
              {t("navEnter")}
            </button>
            <motion.a
              href="#empezar"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-royal-blue text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-royal-blue/20 transition-all whitespace-nowrap"
            >
              {t("navStart")}
            </motion.a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Social sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:flex lg:col-span-1 flex-col gap-6 text-royal-blue/50 border-r border-royal-blue/10 pr-2 py-8"
        >
          {[
            { href: "https://egobmz.vercel.app", icon: <DoodleWeb size={28} />, label: "Web Personal" },
            { href: "https://www.linkedin.com/in/egobmz/", icon: <DoodleLinkedin size={28} />, label: "LinkedIn" },
            { href: "https://github.com/EgoBMZ", icon: <DoodleGithub size={28} />, label: "GitHub" },
            { href: "https://instagram.com/egobmz", icon: <DoodleInstagram size={28} />, label: "Instagram" },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              whileHover={{ scale: 1.25, x: 5 }}
              className="p-2 rounded-xl hover:bg-royal-blue/8 hover:text-royal-blue w-fit transition-all"
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Content */}
        <div className="lg:col-span-6 flex flex-col gap-8 min-w-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-lavender/40 text-lavender-text px-4 py-2.5 rounded-full w-fit text-sm font-bold border border-lavender/60"
          >
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="shrink-0">🌸</motion.span>
            <span className="font-mono whitespace-nowrap">
              {typedText}
              {typedText.length < fullText.length && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="border-r-2 border-royal-blue/60 ml-0.5 inline-block h-[1em] align-middle"
                />
              )}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.25] text-royal-blue font-mono tracking-tight pb-2"
          >
            {t("heroTitle")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-foreground/75 leading-relaxed max-w-xl"
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* Console / Coupling box */}
          <motion.div
            id="empezar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md border-2 border-royal-blue/20 rounded-2xl p-6 shadow-xl shadow-royal-blue/5 flex flex-col gap-6 max-w-xl min-h-[220px] justify-center"
          >
            <AnimatePresence mode="wait">
              {isLinking ? (
                <motion.div
                  key="linking"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-6 gap-6"
                >
                  <span className="text-xs uppercase tracking-widest font-bold text-royal-blue/60 animate-pulse">
                    {t("consoleLinkingTitle")}
                  </span>
                  <div className="flex items-center gap-10 relative h-16 w-full justify-center">
                    <motion.div
                      animate={{ x: [0, 8, -4, 46] }}
                      transition={{ duration: 2, times: [0, 0.4, 0.7, 1], ease: "easeInOut" }}
                      className="w-12 h-12 rounded-full border-2 border-royal-blue bg-[#f1f1f4] flex items-center justify-center font-doodle text-royal-blue font-bold text-lg shadow-md z-10"
                    >E</motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 0.9, 1.8, 0] }}
                      transition={{ duration: 2, times: [0, 0.4, 0.7, 0.9, 1], ease: "easeInOut" }}
                      className="text-royal-blue z-20"
                    >
                      <HeartIcon size={32} />
                    </motion.div>
                    <motion.div
                      animate={{ x: [0, -8, 4, -46] }}
                      transition={{ duration: 2, times: [0, 0.4, 0.7, 1], ease: "easeInOut" }}
                      className="w-12 h-12 rounded-full border-2 border-royal-blue bg-[#f1f1f4] flex items-center justify-center font-doodle text-royal-blue font-bold text-lg shadow-md z-10"
                    >S</motion.div>
                  </div>
                  <p className="text-xs text-foreground/55 italic font-mono text-center">{t("consoleLinkingDesc")}</p>
                </motion.div>
              ) : !isLinked ? (
                <motion.div
                  key="unlinked"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-royal-blue uppercase tracking-wider">{t("consoleStep1Title")}</h3>
                    <p className="text-sm text-foreground/65">{t("consoleStep1Desc")}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3 p-4 bg-[#f8f8fa] rounded-xl border border-royal-blue/5">
                      <button type="button" onClick={handleGenerateCode}
                        className="w-full bg-white hover:bg-royal-blue/5 border border-royal-blue/20 text-royal-blue text-sm font-bold py-2 px-4 rounded-lg transition-all active:scale-[0.97]"
                      >{t("consoleBtnGenerate")}</button>
                      {generatedCode && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-between bg-white border border-royal-blue/10 rounded-lg px-3 py-2"
                        >
                          <span className="font-mono text-xs font-bold text-royal-blue tracking-widest">{generatedCode}</span>
                          <button type="button" onClick={handleCopy} className="text-[10px] uppercase font-bold text-lavender-text hover:underline ml-2 shrink-0">
                            {copied ? t("consoleBtnCopied") : t("consoleBtnCopy")}
                          </button>
                        </motion.div>
                      )}
                    </div>
                    <form onSubmit={handleLink} className="flex flex-col gap-3 p-4 bg-[#f8f8fa] rounded-xl border border-royal-blue/5">
                      <input type="text" placeholder={t("consolePlaceholder")} value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-royal-blue/20 text-royal-blue placeholder-royal-blue/30 text-sm font-mono text-center font-bold py-2 px-4 rounded-lg outline-none focus:border-royal-blue transition-colors"
                      />
                      <button type="submit" disabled={code.trim().length < 6}
                        className="w-full bg-royal-blue hover:bg-royal-blue/90 disabled:opacity-40 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-[0.97]"
                      >{t("consoleBtnLink")}</button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="linked"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  className="text-center py-4 flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-lavender flex items-center justify-center relative overflow-visible">
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.1 }} className="text-royal-blue">
                      <HeartIcon size={32} />
                    </motion.div>
                    {[{ y: [-8, -28], x: [0, 0], d: 0 }, { y: [-8, -22], x: [8, 18], d: 0.4 }, { y: [-8, -24], x: [-8, -18], d: 0.8 }].map((p, i) => (
                      <motion.span key={i} animate={{ y: p.y, x: p.x, opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.4, delay: p.d }} className="absolute text-[11px] pointer-events-none">❤️</motion.span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-doodle text-xl font-bold text-royal-blue">{t("consoleSuccessTitle")}</h3>
                    <p className="text-sm text-foreground/65">{t("consoleSuccessDesc")}</p>
                  </div>
                  <button onClick={() => { setIsLinked(false); setCode(""); }} className="text-xs text-royal-blue/50 hover:text-royal-blue hover:underline mt-1">
                    {t("consoleBtnTryAgain")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Phone Mockup ── */}
        <div className="lg:col-span-5 flex justify-center relative">
          {/* Glows */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-lavender/30 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-royal-blue/5 rounded-full blur-2xl -z-10" />

          {/* Floating mini doodles around phone */}
          {[
            { el: <HeartIcon size={22} />, pos: "top-16 left-8", dur: 5, del: 0, rot: -15 },
            { el: <StarIcon size={20} />, pos: "bottom-8 right-10", dur: 6, del: 1.2, rot: 20 },
            { el: <DoodleRose size={28} />, pos: "-top-8 right-8", dur: 7, del: 0.4, rot: 10 },
          ].map((d, i) => (
            <motion.div key={i}
              className={`absolute ${d.pos} text-royal-blue/25 -z-10`}
              style={{ rotate: d.rot }}
              animate={{ y: [0, -10, 0], rotate: [d.rot, d.rot + 8, d.rot] }}
              transition={{ repeat: Infinity, duration: d.dur, delay: d.del, ease: "easeInOut" }}
            >{d.el}</motion.div>
          ))}

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.2 }}
            className="w-[300px] h-[610px] rounded-[48px] bg-slate-900 p-3.5 shadow-2xl border-4 border-slate-800/80 relative overflow-hidden"
          >
            {/* Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-between px-4">
              <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 bg-royal-blue rounded-full" />
              <span className="w-1 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Screen */}
            <div className="w-full h-full rounded-[38px] bg-background p-5 pt-10 flex flex-col justify-between select-none relative overflow-hidden">
              {/* Status bar */}
              <div className="flex justify-between items-center text-[10px] font-bold text-royal-blue/55 px-1 pt-1">
                <span>16:31</span>
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-current"><path d="M10,80 L20,80 L20,68 L10,68 Z M30,80 L40,80 L40,52 L30,52 Z M50,80 L60,80 L60,38 L50,38 Z M70,80 L80,80 L80,22 L70,22 Z" /></svg>
                  <span>33%</span>
                </div>
              </div>

              {/* Header inside phone */}
              <div className="flex justify-between items-start mt-5 px-1 relative z-10">
                <div className="flex flex-col">
                  <span className="font-doodle text-lg font-bold text-royal-blue leading-tight">Ego & Sharon</span>
                  <span className="font-doodle text-xs font-bold text-royal-blue/70 leading-none lowercase tracking-wide">
                    {locale === "es" ? "el jardín" : "our garden"}
                  </span>
                </div>
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-royal-blue">
                  <path d="M50,85 C51,70 49,55 50,45" /><circle cx="50" cy="35" r="8" />
                  <path d="M50,27 C50,15 62,25 56,31" /><path d="M58,35 C70,30 65,45 57,39" />
                  <path d="M54,41 C58,53 46,49 48,42" /><path d="M46,39 C34,45 30,30 42,35" />
                  <path d="M44,31 C38,20 50,15 50,27" />
                </svg>
              </div>

              {/* Garden Grid — doodles inspired by reference image 4 */}
              <div className="flex-1 my-3 bg-white/60 border-2 border-royal-blue/15 rounded-3xl p-4 relative overflow-hidden flex flex-col justify-between">

                {/* Floating garden clouds */}
                <div className="absolute top-2 left-0 right-0 h-6 overflow-hidden pointer-events-none opacity-40">
                  <motion.svg
                    animate={{ x: [-20, 120, -20] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    viewBox="0 0 100 50"
                    className="w-10 h-6 text-royal-blue/40 absolute left-2"
                  >
                    <path d="M10,35 C10,20 30,10 45,20 C55,10 75,15 80,30 C90,30 95,40 80,45 L20,45 Z" fill="none" stroke="currentColor" strokeWidth="4" />
                  </motion.svg>
                  <motion.svg
                    animate={{ x: [120, -20, 120] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    viewBox="0 0 100 50"
                    className="w-8 h-5 text-royal-blue/40 absolute right-4 top-1"
                  >
                    <path d="M10,35 C10,20 30,10 45,20 C55,10 75,15 80,30 C90,30 95,40 80,45 L20,45 Z" fill="none" stroke="currentColor" strokeWidth="4" />
                  </motion.svg>
                </div>

                {/* Grass ground lines at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none text-royal-blue/20 flex items-end">
                  <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full fill-none stroke-current" strokeWidth="2.5">
                    <path d="M0,20 C10,12 15,18 20,20 C30,15 35,18 40,20 C50,12 55,15 60,20 C70,14 75,18 80,20 C90,12 95,15 100,20" />
                  </svg>
                </div>

                {/* The organic garden composition */}
                <div className="grid grid-cols-4 gap-3 items-center justify-items-center content-center flex-1 z-10 pt-4">
                  {[
                    { el: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M30,85 C28,60 15,45 10,40 C20,50 30,70 33,85" /><path d="M45,85 C45,55 35,35 25,30 C38,40 45,65 48,85" /></svg>, dur: 4.5, del: 0, span: 1 },
                    { el: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11"><path d="M50,85 C51,70 49,55 50,45" /><circle cx="50" cy="35" r="7" /><path d="M50,28 C50,18 58,25 54,30" /><path d="M56,35 C64,32 60,42 54,38" /><path d="M52,40 C54,48 46,45 48,40" /><path d="M47,38 C39,42 37,32 44,35" /><path d="M45,31 C40,24 48,20 50,28" /></svg>, dur: 5.2, del: 0.4, span: 2 },
                    { el: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><ellipse cx="50" cy="50" rx="14" ry="9" /><path d="M44,42 Q45,50 44,58" /><path d="M50,41 Q51,50 50,59" /><path d="M45,41 Q38,25 50,41" /></svg>, dur: 3.2, del: 1, span: 1 },
                    { el: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M30,55 C30,35 70,35 70,55 Z" /><path d="M45,55 C45,72 46,75 46,78 C54,78 55,72 55,55" /><circle cx="45" cy="46" r="3" /><circle cx="55" cy="49" r="2.5" /></svg>, dur: 4.8, del: 0.6, span: 1 },
                    { el: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M50,85 C50,75 50,65 50,55" /><circle cx="50" cy="45" r="8" /><path d="M50,37 C50,30 55,34 53,38" /><path d="M55,45 C62,45 58,48 55,47" /><path d="M50,53 C50,60 45,56 47,52" /><path d="M45,45 C38,45 42,42 45,43" /></svg>, dur: 4.6, del: 0.2, span: 1 },
                    { el: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M58,85 C60,50 70,30 80,25 C70,40 62,65 60,85" /><path d="M72,85 C75,65 85,55 90,50 C82,60 76,75 74,85" /></svg>, dur: 4.1, del: 1.4, span: 1 },
                    { el: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 scale-x-[-1]"><ellipse cx="50" cy="50" rx="14" ry="9" /><path d="M44,42 Q45,50 44,58" /><path d="M50,41 Q51,50 50,59" /><path d="M45,41 Q38,25 50,41" /></svg>, dur: 3.6, del: 0.8, span: 1 },
                  ].map((item, i) => (
                    <motion.div key={i}
                      animate={{ rotate: i % 2 === 0 ? [-2, 2, -2] : [1, -2, 1], y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: item.dur, delay: item.del, ease: "easeInOut" }}
                      whileHover={{ scale: 1.18 }} whileTap={{ scale: 0.92 }}
                      className={`text-royal-blue cursor-pointer ${item.span === 2 ? "col-span-2" : ""}`}
                    >{item.el}</motion.div>
                  ))}
                </div>

                {/* Wooden Sign Post "Plantar / Plant" Add Button */}
                <motion.div
                  whileHover={{ scale: 1.06, rotate: [0, 1, -1, 0] }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full flex flex-col items-center cursor-pointer text-royal-blue z-10 select-none pb-1"
                >
                  <div className="border-2 border-royal-blue px-3 py-1 rounded-xl bg-white font-bold text-xs shadow-sm flex items-center gap-1.5 hover:bg-royal-blue/5 transition-colors">
                    <span className="text-sm font-bold">+</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider">{locale === "es" ? "Plantar" : "Plant"}</span>
                  </div>
                  <div className="w-1 h-2 bg-royal-blue" />
                </motion.div>
              </div>

              {/* Bottom Nav */}
              <div className="flex justify-around items-center border-t border-royal-blue/10 pt-3 pb-2 text-royal-blue/50 text-[10px] font-bold z-10">
                <span className="text-royal-blue underline decoration-2 underline-offset-4">{locale === "es" ? "Jardín" : "Garden"}</span>
                <span>{t("navDiary")}</span>
                <span>{t("navSettings")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ── HOW IT WORKS ── */}
      <section id="como-funciona" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-royal-blue/10">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-doodle text-3xl md:text-4xl font-bold text-royal-blue"
          >{t("featuresTitle")}</motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 max-w-md text-base"
          >{t("featuresSubtitle")}</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><path d="M30,50 C10,25 40,25 50,50 C60,75 90,75 70,50 C50,25 20,75 50,50 Z" /></svg>,
              title: t("feature1Title"), desc: t("feature1Desc"), delay: 0.1,
            },
            {
              icon: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><rect x="25" y="25" width="50" height="20" rx="3" transform="rotate(45 50 50)" /><path d="M68,32 L80,20 L68,20 Z" transform="rotate(45 50 50)" /><path d="M25,45 L20,40 L25,35 Z" fill="currentColor" transform="rotate(45 50 50)" /></svg>,
              title: t("feature2Title"), desc: t("feature2Desc"), delay: 0.2,
            },
            {
              icon: <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><path d="M50,85 C51,70 49,55 50,45" /><circle cx="50" cy="35" r="8" /><path d="M50,27 C50,15 62,25 56,31" /><path d="M58,35 C70,30 65,45 57,39" /><path d="M54,41 C58,53 46,49 48,42" /><path d="M46,39 C34,45 30,30 42,35" /><path d="M44,31 C38,20 50,15 50,27" /></svg>,
              title: t("feature3Title"), desc: t("feature3Desc"), delay: 0.3,
            },
          ].map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: card.delay }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(28,13,203,0.08)" }}
              className="bg-white border-2 border-royal-blue/10 rounded-2xl p-8 shadow-md transition-all duration-300 flex flex-col items-center text-center gap-6"
            >
              <motion.div
                animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, delay: i * 0.8, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-royal-blue/5 flex items-center justify-center text-royal-blue"
              >{card.icon}</motion.div>
              <div className="flex flex-col gap-2">
                <h3 className="font-mono font-bold text-lg text-royal-blue">{card.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section id="filosofia" className="w-full bg-white border-t border-b border-royal-blue/10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-8"
        >
          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4 }} className="w-14 h-14 text-royal-blue">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <circle cx="50" cy="35" r="8" />
              <path d="M50,27 C50,15 62,25 56,31" />
              <path d="M58,35 C70,30 65,45 57,39" />
              <path d="M54,41 C58,53 46,49 48,42" />
              <path d="M46,39 C34,45 30,30 42,35" />
              <path d="M44,31 C38,20 50,15 50,27" />
            </svg>
          </motion.div>
          <h2 className="font-doodle text-3xl md:text-4xl font-bold text-royal-blue">
            &ldquo;{t("philosophyTitle")}&rdquo;
          </h2>
          <p className="text-lg leading-relaxed text-foreground/75 max-w-2xl font-mono">
            {t("philosophyDesc")}
          </p>
          <motion.span
            animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="font-doodle text-2xl font-semibold text-royal-blue tracking-wide"
          >
            Diego &amp; Sharon ♡
          </motion.span>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-royal-blue/10 text-xs text-royal-blue/50 font-bold relative z-20">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span>© {new Date().getFullYear()} {t("footerMadeWith")}</span>
          {/* Mobile socials (visible on md and below, hidden on lg because sidebar has them) */}
          <div className="flex gap-4 lg:hidden mt-1">
            <a href="https://egobmz.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-royal-blue transition-colors">Web</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/egobmz/" target="_blank" rel="noopener noreferrer" className="hover:text-royal-blue transition-colors">LinkedIn</a>
            <span>•</span>
            <a href="https://github.com/EgoBMZ" target="_blank" rel="noopener noreferrer" className="hover:text-royal-blue transition-colors">GitHub</a>
            <span>•</span>
            <a href="https://instagram.com/egobmz" target="_blank" rel="noopener noreferrer" className="hover:text-royal-blue transition-colors">Instagram</a>
          </div>
        </div>

        <div className="flex gap-6">
          <Link href="/privacidad" className="hover:text-royal-blue hover:underline transition-colors">
            {t("footerPrivacy")}
          </Link>
          <Link href="/terminos" className="hover:text-royal-blue hover:underline transition-colors">
            {t("footerTerms")}
          </Link>
          <a href="https://egobmz.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-royal-blue hover:underline transition-colors">
            {t("footerContact")}
          </a>
        </div>
      </footer>

      {/* ── Global Custom Cursor Styles ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (pointer: fine) {
          .custom-cursor-active, .custom-cursor-active * {
            cursor: none !important;
          }
        }
      `}} />

      {/* ── Custom Cursor Follower ── */}
      {!isMobile && (
        <motion.div
          className="fixed pointer-events-none z-50 text-royal-blue shrink-0 mix-blend-multiply"
          animate={{
            x: mousePos.x - (isHovered ? 24 : 16),
            y: mousePos.y - (isHovered ? 24 : 16),
            scale: isHovered ? 1.5 : 1,
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
        >
          {isHovered ? (
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
              <path d="M50,85 C51,70 49,55 50,45" />
              <circle cx="50" cy="35" r="8" className="fill-royal-blue/20" />
              <path d="M50,27 C50,15 62,25 56,31" />
              <path d="M58,35 C70,30 65,45 57,39" />
              <path d="M54,41 C58,53 46,49 48,42" />
              <path d="M46,39 C34,45 30,30 42,35" />
              <path d="M44,31 C38,20 50,15 50,27" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
              <path d="M50,85 C50,60 50,45 50,35" />
              <path d="M50,55 C35,45 30,30 50,35" />
              <path d="M50,45 C65,35 70,20 50,25" />
              <circle cx="50" cy="35" r="4.5" fill="currentColor" />
            </svg>
          )}
        </motion.div>
      )}
    </div>
  );
}
