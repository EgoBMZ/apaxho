"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
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
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15,50 C15,22 75,22 75,50 L15,50 Z" />
    <path d="M35,50 L35,80 C35,85 55,85 55,80 L55,50" />
    <circle cx="30" cy="35" r="4" fill="currentColor" />
    <circle cx="45" cy="28" r="5" fill="currentColor" />
    <circle cx="60" cy="38" r="4" fill="currentColor" />
  </svg>
);

const DoodleButterfly = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="50" y1="20" x2="50" y2="80" strokeWidth="6" />
    <path d="M50,35 C65,15 90,20 85,45 C80,60 65,55 50,65" />
    <path d="M50,35 C35,15 10,20 15,45 C20,60 35,55 50,65" />
    <path d="M50,65 C60,70 75,70 70,85 C65,95 55,85 50,75" />
    <path d="M50,65 C40,70 25,70 30,85 C35,95 45,85 50,75" />
  </svg>
);

const DoodlePencil = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 110 50" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="10,25 30,10 95,10 95,40 30,40" />
    <polygon points="10,25 30,10 30,40" fill="currentColor" fillOpacity="0.15" />
    <line x1="80" y1="10" x2="80" y2="40" />
    <circle cx="18" cy="25" r="3" fill="currentColor" />
  </svg>
);

const DoodleNote = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 90 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15,15 L60,15 L75,30 L75,85 L15,85 Z" />
    <path d="M60,15 L60,30 L75,30" />
    <line x1="28" y1="45" x2="62" y2="45" />
    <line x1="28" y1="58" x2="62" y2="58" />
    <line x1="28" y1="71" x2="48" y2="71" />
  </svg>
);

const DoodleWave = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,20 Q25,5 40,20 T70,20 T100,20" />
    <path d="M10,30 Q25,15 40,30 T70,30 T100,30" opacity="0.5" />
  </svg>
);

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

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", next ? "dark" : "light");
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Auto-playing interactive demo states
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [demoStep, setDemoStep] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: "50%", y: "50%" });
  const [cursorVisible, setCursorVisible] = useState(false);

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

  // Simulated Auto-play Walkthrough Demo State Machine
  useEffect(() => {
    if (!isDemoMode) return;

    let timer: any;
    
    const runStep = () => {
      switch (demoStep) {
        case 0:
          // Cursor appears and moves to "Generar código" button
          setCursorVisible(true);
          setCursorPos({ x: "25%", y: "45%" });
          timer = setTimeout(() => {
            setDemoStep(1);
          }, 1100);
          break;
        case 1:
          // Simulate clicking "Generar código" and reveal code
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          let c = "APX-";
          for (let i = 0; i < 3; i++) c += chars[Math.floor(Math.random() * chars.length)];
          c += "-";
          for (let i = 0; i < 3; i++) c += chars[Math.floor(Math.random() * chars.length)];
          setGeneratedCode(c);
          setCopied(false);
          
          timer = setTimeout(() => {
            setDemoStep(2);
          }, 800);
          break;
        case 2:
          // Move cursor to "Copiar" button and click
          setCursorPos({ x: "40%", y: "76%" });
          timer = setTimeout(() => {
            setCopied(true);
            setDemoStep(3);
          }, 1100);
          break;
        case 3:
          // Move to partner code input box
          setCursorPos({ x: "75%", y: "45%" });
          timer = setTimeout(() => {
            setDemoStep(4);
          }, 1100);
          break;
        case 4:
          // Type the code character by character into input
          const targetCode = "APX-782-901";
          let currentStr = "";
          let charIdx = 0;
          const typingInterval = setInterval(() => {
            currentStr += targetCode[charIdx];
            setCode(currentStr);
            charIdx++;
            if (charIdx >= targetCode.length) {
              clearInterval(typingInterval);
              setDemoStep(5);
            }
          }, 140);
          break;
        case 5:
          // Move to "Vincular Jardín" button
          setCursorPos({ x: "75%", y: "76%" });
          timer = setTimeout(() => {
            setDemoStep(6);
          }, 1100);
          break;
        case 6:
          // Trigger linking screen (fade fake cursor out)
          setCursorVisible(false);
          setIsLinking(true);
          timer = setTimeout(() => {
            setIsLinking(false);
            setIsLinked(true);
            setDemoStep(7);
          }, 2400);
          break;
        case 7:
          // Show successfully linked garden state for 5.5s then reset
          timer = setTimeout(() => {
            setCode("");
            setGeneratedCode("");
            setCopied(false);
            setIsLinked(false);
            setIsLinking(false);
            setDemoStep(0);
          }, 5500);
          break;
      }
    };

    runStep();

    return () => {
      clearTimeout(timer);
    };
  }, [demoStep, isDemoMode]);

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

  const handleLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (code.trim().length >= 6) {
      setIsLinking(true);
      setTimeout(() => { setIsLinking(false); setIsLinked(true); }, 2000);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-mono selection:bg-royal-blue selection:text-white relative transition-colors duration-300 ${
      isDarkMode ? "bg-zinc-950 text-zinc-100" : "bg-[#f1f1f4] text-[#1c1c24]"
    }`}>

      {/* ── Background Floating Doodles ── */}
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden style={{ zIndex: 0 }}>
        {BG_DOODLES.map((d, i) => (
          <motion.div
            key={i}
            className={`absolute ${d.pos} ${d.rot} transition-colors duration-300 ${
              isDarkMode ? "text-white/[0.04]" : "text-royal-blue/[0.13]"
            }`}
            animate={{ y: [0, -20, 0], x: [0, 8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: d.dur, delay: d.del, ease: "easeInOut" }}
          >
            {d.el}
          </motion.div>
        ))}
      </div>

      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-sm transition-colors duration-300 border-b ${
        isDarkMode ? "bg-zinc-950/90 border-zinc-800" : "bg-[#f1f1f4]/90 border-royal-blue/10"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, rotate: 12 }}
              className={`cursor-pointer shrink-0 transition-colors duration-300 ${
                isDarkMode ? "text-zinc-200" : "text-royal-blue"
              }`}
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
            <span className={`font-doodle text-3xl font-bold tracking-tight lowercase transition-colors duration-300 ${
              isDarkMode ? "text-zinc-200" : "text-royal-blue"
            }`}>apaxho</span>
          </div>

          {/* Nav */}
          <nav className={`hidden md:flex items-center gap-8 text-sm font-bold transition-colors duration-300 ${
            isDarkMode ? "text-zinc-400" : "text-royal-blue/60"
          }`}>
            <a href="#como-funciona" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-royal-blue"}`}>{t("navHowItWorks")}</a>
            <a href="#filosofia" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-royal-blue"}`}>{t("navPhilosophy")}</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl border-2 transition-all text-sm font-bold flex items-center justify-center shadow-sm h-10 w-10 ${
                isDarkMode 
                  ? "border-zinc-800 bg-zinc-900 text-yellow-400 hover:bg-zinc-800" 
                  : "border-royal-blue/25 bg-white text-royal-blue hover:bg-royal-blue/8"
              }`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </motion.button>

            {/* Language Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
              className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all shadow-sm h-10 ${
                isDarkMode 
                  ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800" 
                  : "border-royal-blue/25 bg-white text-royal-blue hover:bg-royal-blue/8 hover:border-royal-blue/50"
              }`}
            >
              <DoodleGlobe size={18} />
              <span>{locale.toUpperCase()}</span>
            </motion.button>
            
            {user ? (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="bg-royal-blue text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-royal-blue/20 transition-all whitespace-nowrap"
                >
                  {locale === "es" ? "Ir a mi Jardín 🌸" : "Go to my Garden 🌸"}
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/login"
                  className="bg-royal-blue text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-royal-blue/20 transition-all whitespace-nowrap"
                >
                  {t("navEnter")}
                </Link>
              </motion.div>
            )}
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
          className={`hidden lg:flex lg:col-span-1 flex-col gap-6 border-r pr-2 py-8 transition-colors duration-300 ${
            isDarkMode ? "text-zinc-400 border-zinc-800" : "text-royal-blue/50 border-royal-blue/10"
          }`}
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
              className={`p-2 rounded-xl w-fit transition-all ${
                isDarkMode ? "hover:bg-zinc-800 hover:text-white" : "hover:bg-royal-blue/8 hover:text-royal-blue"
              }`}
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
            className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full w-fit text-sm font-bold border transition-colors duration-300 ${
              isDarkMode 
                ? "bg-zinc-900/60 text-zinc-300 border-zinc-800" 
                : "bg-lavender/40 text-lavender-text border-lavender/60"
            }`}
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
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.25] font-mono tracking-tight pb-2 transition-colors duration-300 ${
              isDarkMode ? "text-zinc-100" : "text-royal-blue"
            }`}
          >
            {t("heroTitle")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-base md:text-lg leading-relaxed max-w-xl transition-colors duration-300 ${
              isDarkMode ? "text-zinc-400" : "text-foreground/75"
            }`}
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* Console / Coupling box */}
          <motion.div
            id="empezar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
            className={`border-2 rounded-2xl p-6 shadow-xl flex flex-col gap-6 max-w-xl min-h-[220px] justify-center relative overflow-hidden transition-all duration-300 ${
              isDarkMode 
                ? "bg-zinc-900 border-zinc-800 shadow-zinc-950/20" 
                : "bg-white/80 border-royal-blue/20 shadow-royal-blue/5"
            }`}
          >
            {/* Auto-play demo mode tag */}
            {isDemoMode && (
              <span className={`absolute top-2.5 right-3 text-[9px] uppercase tracking-wider font-bold select-none z-20 transition-colors ${
                isDarkMode ? "text-zinc-650" : "text-royal-blue/35"
              }`}>
                demo auto-play
              </span>
            )}

            {/* Fake cursor flower overlay (Demo mode only) */}
            {isDemoMode && cursorVisible && (
              <motion.div
                animate={{ left: cursorPos.x, top: cursorPos.y, opacity: cursorVisible ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute pointer-events-none z-30 text-royal-blue text-lg select-none"
                style={{ transform: "translate(-10px, -10px)" }}
              >
                🌸
              </motion.div>
            )}

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
                    <h3 className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                      isDarkMode ? "text-zinc-200" : "text-royal-blue"
                    }`}>{t("consoleStep1Title")}</h3>
                    <p className={`text-sm transition-colors ${isDarkMode ? "text-zinc-450" : "text-foreground/65"}`}>{t("consoleStep1Desc")}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Generar Código Panel */}
                    <div className={`flex flex-col gap-3 p-4 rounded-xl border transition-colors ${
                      isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-[#f8f8fa] border-royal-blue/5"
                    }`}>
                      <button 
                        type="button" 
                        onClick={() => {
                          setIsDemoMode(false);
                          setCursorVisible(false);
                          handleGenerateCode();
                        }}
                        className={`w-full text-sm font-bold py-2 px-4 rounded-lg transition-all active:scale-[0.97] border ${
                          isDarkMode 
                            ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                            : "bg-white border-royal-blue/20 text-royal-blue hover:bg-royal-blue/5"
                        }`}
                      >
                        {t("consoleBtnGenerate")}
                      </button>
                      {generatedCode && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }} 
                          animate={{ opacity: 1, scale: 1 }}
                          className={`flex items-center justify-between border rounded-lg px-3 py-2 ${
                            isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-royal-blue/10"
                          }`}
                        >
                          <span className="font-mono text-xs font-bold text-royal-blue tracking-widest">{generatedCode}</span>
                          <button 
                            type="button" 
                            onClick={() => {
                              setIsDemoMode(false);
                              setCursorVisible(false);
                              handleCopy();
                            }} 
                            className="text-[10px] uppercase font-bold text-lavender-text hover:underline ml-2 shrink-0"
                          >
                            {copied ? t("consoleBtnCopied") : t("consoleBtnCopy")}
                          </button>
                        </motion.div>
                      )}
                    </div>

                    {/* Vincular Código Form */}
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsDemoMode(false);
                        setCursorVisible(false);
                        handleLink(e);
                      }} 
                      className={`flex flex-col gap-3 p-4 rounded-xl border transition-colors ${
                        isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-[#f8f8fa] border-royal-blue/5"
                      }`}
                    >
                      <input 
                        type="text" 
                        placeholder={t("consolePlaceholder")} 
                        value={code}
                        onFocus={() => {
                          setIsDemoMode(false);
                          setCursorVisible(false);
                        }}
                        onChange={(e) => {
                          setIsDemoMode(false);
                          setCursorVisible(false);
                          setCode(e.target.value.toUpperCase());
                        }}
                        className={`w-full text-sm font-mono text-center font-bold py-2 px-4 rounded-lg outline-none border transition-colors ${
                          isDarkMode 
                            ? "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-650 focus:border-royal-blue" 
                            : "bg-white border-royal-blue/20 text-royal-blue placeholder-royal-blue/30 focus:border-royal-blue"
                        }`}
                      />
                      <button 
                        type="submit" 
                        disabled={code.trim().length < 6}
                        className="w-full bg-royal-blue hover:bg-royal-blue/90 disabled:opacity-40 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-[0.97]"
                      >
                        {t("consoleBtnLink")}
                      </button>
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
                  <button 
                    onClick={() => { 
                      setIsLinked(false); 
                      setCode(""); 
                      setIsDemoMode(false);
                      setCursorVisible(false);
                    }} 
                    className="text-xs text-royal-blue/50 hover:text-royal-blue hover:underline mt-1"
                  >
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

          {/* Phone Frame */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.2 }}
            className={`w-[300px] h-[610px] rounded-[48px] border-4 p-3.5 shadow-2xl relative overflow-hidden transition-colors duration-300 ${
              isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-slate-900 border-slate-800/80"
            }`}
          >
            {/* Notch / Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-between px-4">
              <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 bg-royal-blue rounded-full" />
              <span className="w-1 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Screen */}
            <div className={`w-full h-full rounded-[38px] p-5 pt-10 flex flex-col justify-between select-none relative overflow-hidden transition-colors duration-300 ${
              isDarkMode ? "bg-zinc-950 text-zinc-100" : "bg-background text-[#1c1c24]"
            }`}>
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
                  <span className={`font-doodle text-lg font-bold leading-tight transition-colors duration-300 ${
                    isDarkMode ? "text-zinc-200" : "text-royal-blue"
                  }`}>Diego & Sharon</span>
                  <span className="font-doodle text-xs font-bold text-royal-blue/70 leading-none lowercase tracking-wide">
                    {locale === "es" ? "el jardín" : "our garden"}
                  </span>
                </div>
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`w-7 h-7 transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-200" : "text-royal-blue"
                }`}>
                  <path d="M50,85 C51,70 49,55 50,45" /><circle cx="50" cy="35" r="8" />
                  <path d="M50,27 C50,15 62,25 56,31" /><path d="M58,35 C70,30 65,45 57,39" />
                  <path d="M54,41 C58,53 46,49 48,42" /><path d="M46,39 C34,45 30,30 42,35" />
                  <path d="M44,31 C38,20 50,15 50,27" />
                </svg>
              </div>

              {/* Garden Grid — doodles inspired by reference image 4 */}
              <div className={`flex-1 my-3 border-2 rounded-3xl p-4 relative overflow-hidden flex flex-col justify-between transition-colors duration-300 ${
                isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white/60 border-royal-blue/15"
              }`}>

                {/* Floating garden clouds */}
                <div className="absolute top-2 left-0 right-0 h-6 overflow-hidden pointer-events-none opacity-40">
                  <motion.svg
                    animate={{ x: [-20, 120, -20] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    viewBox="0 0 100 50"
                    className={`w-10 h-6 absolute left-2 transition-colors ${isDarkMode ? "text-zinc-650" : "text-royal-blue/40"}`}
                  >
                    <path d="M10,35 C10,20 30,10 45,20 C55,10 75,15 80,30 C90,30 95,40 80,45 L20,45 Z" fill="none" stroke="currentColor" strokeWidth="4" />
                  </motion.svg>
                  <motion.svg
                    animate={{ x: [120, -20, 120] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    viewBox="0 0 100 50"
                    className={`w-8 h-5 absolute right-4 top-1 transition-colors ${isDarkMode ? "text-zinc-650" : "text-royal-blue/40"}`}
                  >
                    <path d="M10,35 C10,20 30,10 45,20 C55,10 75,15 80,30 C90,30 95,40 80,45 L20,45 Z" fill="none" stroke="currentColor" strokeWidth="4" />
                  </motion.svg>
                </div>

                {/* Grass ground lines at the bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-10 pointer-events-none flex items-end transition-colors ${isDarkMode ? "text-zinc-800" : "text-royal-blue/20"}`}>
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
                      className={`cursor-pointer transition-colors ${isDarkMode ? "text-zinc-300 hover:text-white" : "text-royal-blue"} ${item.span === 2 ? "col-span-2" : ""}`}
                    >{item.el}</motion.div>
                  ))}
                </div>

                {/* Wooden Sign Post "Plantar / Plant" Add Button */}
                <motion.div
                  whileHover={{ scale: 1.06, rotate: [0, 1, -1, 0] }}
                  whileTap={{ scale: 0.96 }}
                  className={`w-full flex flex-col items-center cursor-pointer z-10 select-none pb-1 transition-colors ${
                    isDarkMode ? "text-zinc-300" : "text-royal-blue"
                  }`}
                >
                  <div className={`border-2 px-3 py-1 rounded-xl font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors ${
                    isDarkMode ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-750 text-zinc-200" : "bg-white border-royal-blue text-royal-blue hover:bg-royal-blue/5"
                  }`}>
                    <span className="text-sm font-bold">+</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider">{locale === "es" ? "Plantar" : "Plant"}</span>
                  </div>
                  <div className={`w-1 h-2 transition-colors ${isDarkMode ? "bg-zinc-700" : "bg-royal-blue"}`} />
                </motion.div>
              </div>

              {/* Bottom Nav */}
              <div className={`flex justify-around items-center border-t pt-3 pb-2 text-[10px] font-bold z-10 transition-colors duration-300 ${
                isDarkMode ? "border-zinc-800 text-zinc-500" : "border-royal-blue/10 text-royal-blue/50"
              }`}>
                <span className={`underline decoration-2 underline-offset-4 ${isDarkMode ? "text-zinc-200" : "text-royal-blue"}`}>{locale === "es" ? "Jardín" : "Garden"}</span>
                <span>{t("navDiary")}</span>
                <span>{t("navSettings")}</span>
              </div>
            </div>
          </motion.div>
        </div>

      </main>

      {/* ── SECTION: COMO FUNCIONA ── */}
      <section id="como-funciona" className="py-20 md:py-28 relative z-10 w-full max-w-7xl mx-auto px-6 border-t border-royal-blue/10">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold font-mono transition-colors duration-300 ${isDarkMode ? "text-zinc-100" : "text-royal-blue"}`}>{t("featuresTitle")}</h2>
          <p className={`text-sm md:text-base transition-colors duration-300 ${isDarkMode ? "text-zinc-400" : "text-foreground/70"}`}>{t("featuresSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: t("feature1Title"), desc: t("feature1Desc"), step: "01", icon: "🔗" },
            { title: t("feature2Title"), desc: t("feature2Desc"), step: "02", icon: "✏️" },
            { title: t("feature3Title"), desc: t("feature3Desc"), step: "03", icon: "🌸" }
          ].map((feat, index) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className={`border-2 rounded-3xl p-8 shadow-lg flex flex-col justify-between gap-6 relative group transition-all duration-300 ${
                isDarkMode 
                  ? "bg-zinc-900 border-zinc-800 shadow-zinc-950/20 text-zinc-100" 
                  : "bg-white/70 border-royal-blue/15 shadow-royal-blue/5 text-[#1c1c24]"
              }`}
            >
              <div className="absolute -top-5 -left-3 font-doodle text-5xl font-extrabold text-royal-blue/8 opacity-25 group-hover:opacity-40 transition-opacity">
                {feat.step}
              </div>
              <div className="text-3xl">{feat.icon}</div>
              <div className="flex flex-col gap-2">
                <h3 className={`font-doodle text-lg font-bold transition-colors ${isDarkMode ? "text-zinc-200" : "text-royal-blue"}`}>{feat.title}</h3>
                <p className={`text-xs md:text-sm font-mono leading-relaxed transition-colors ${isDarkMode ? "text-zinc-400" : "text-foreground/75"}`}>{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION: FILOSOFIA ── */}
      <section id="filosofia" className="py-20 md:py-28 relative z-10 w-full max-w-5xl mx-auto px-6 text-center border-t border-royal-blue/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`border-2 rounded-[40px] p-8 md:p-14 shadow-xl flex flex-col gap-6 items-center relative overflow-hidden transition-all duration-300 ${
            isDarkMode 
              ? "bg-zinc-900/50 border-zinc-850 shadow-zinc-950/20" 
              : "bg-lavender/30 border-royal-blue/20 shadow-royal-blue/5"
          }`}
        >
          <div className="absolute top-[8%] left-[8%] text-royal-blue/15 rotate-12"><StarIcon size={36} /></div>
          <div className="absolute bottom-[8%] right-[8%] text-royal-blue/15 -rotate-12"><HeartIcon size={36} /></div>

          <span className={`text-xs uppercase tracking-widest font-bold transition-colors ${isDarkMode ? "text-zinc-500" : "text-royal-blue/60"}`}>{t("philosophyTitle")}</span>
          <h2 className={`text-3xl md:text-4xl font-bold font-mono max-w-xl leading-snug transition-colors ${isDarkMode ? "text-zinc-200" : "text-royal-blue"}`}>
            {locale === "es" ? "Recordando que la vida es un instante" : "Remembering that life is a moment"}
          </h2>
          <p className={`text-xs md:text-sm font-mono leading-relaxed max-w-2xl transition-colors ${isDarkMode ? "text-zinc-400" : "text-foreground/75"}`}>
            {t("philosophyDesc")}
          </p>

          <div className="w-12 h-0.5 bg-royal-blue/25 my-2" />
          
          <motion.span
            animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className={`font-doodle text-2xl font-semibold tracking-wide transition-colors duration-300 ${
              isDarkMode ? "text-zinc-200" : "text-royal-blue"
            }`}
          >
            Diego &amp; Sharon ♡
          </motion.span>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`w-full border-t relative z-10 py-10 transition-colors duration-300 ${
        isDarkMode ? "bg-zinc-950/80 border-zinc-900" : "bg-white/70 border-royal-blue/10"
      }`}>
        <div className={`max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold transition-colors duration-300 ${
          isDarkMode ? "text-zinc-500" : "text-royal-blue/60"
        }`}>
          <div>
            © {new Date().getFullYear()} {t("footerMadeWith")}
          </div>

          <div className="flex gap-6">
            <Link href="/privacidad" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-royal-blue hover:underline"}`}>
              {t("footerPrivacy")}
            </Link>
            <Link href="/terminos" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-royal-blue hover:underline"}`}>
              {t("footerTerms")}
            </Link>
            <a href="https://egobmz.vercel.app" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-royal-blue hover:underline"}`}>
              {t("footerContact")}
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
