"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { translations } from "../translations";
import { 
  HeartIcon, 
  StarIcon, 
  GlobeIcon 
} from "react-doodle-icons";

const generatePartnerCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "APX-";
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += "-";
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState<"es" | "en">("es");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLang = navigator.language || "";
      setLocale(userLang.toLowerCase().startsWith("en") ? "en" : "es");
    }
  }, []);

  const t = (key: keyof typeof translations.es) =>
    translations[locale]?.[key] ?? translations["es"][key];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with Display Name
      await updateProfile(userCredential.user, { displayName });
      
      // Create user document in Firestore
      const partnerCode = generatePartnerCode();
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: displayName,
        email: email,
        partnerCode: partnerCode,
        partnerUid: ""
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || t("authErrorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (providerName: "google" | "facebook") => {
    setError("");
    setLoading(true);
    try {
      const provider = providerName === "google" 
        ? new GoogleAuthProvider() 
        : new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Ensure user document exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        const partnerCode = generatePartnerCode();
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName || user.email?.split("@")[0] || "User",
          email: user.email || "",
          partnerCode: partnerCode,
          partnerUid: ""
        });
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || t("authErrorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-[#1c1c24] flex flex-col font-mono selection:bg-[#1c0dcb] selection:text-white relative items-center justify-center p-6 overflow-hidden">
      
      {/* Decorative background doodles */}
      <div className="fixed inset-0 pointer-events-none select-none opacity-10" aria-hidden>
        <div className="absolute top-[10%] left-[8%] rotate-12"><StarIcon size={64} /></div>
        <div className="absolute bottom-[12%] right-[10%] -rotate-12"><HeartIcon size={72} /></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border-2 border-[#1c0dcb]/20 rounded-3xl p-8 shadow-xl shadow-[#1c0dcb]/5 flex flex-col gap-6 relative z-10"
      >
        {/* Header/Back link */}
        <div className="flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1c0dcb] hover:underline group">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5">
              <path d="M70,50 L30,50 M50,30 L30,50 L50,70" />
            </svg>
            {t("authBackToHome")}
          </Link>
          
          <button 
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="flex items-center gap-1 px-2.5 py-1.5 border border-[#1c0dcb]/15 rounded-lg text-xs font-bold text-[#1c0dcb]/70 hover:bg-[#1c0dcb]/5 transition-all"
          >
            <GlobeIcon className="w-3 h-3" />
            <span>{locale.toUpperCase()}</span>
          </button>
        </div>

        {/* Logo and Titles */}
        <div className="text-center flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-[#1c0dcb]">
              <path d="M50,85 C51,70 49,55 50,45" /><circle cx="50" cy="35" r="8" />
              <path d="M50,27 C50,15 62,25 56,31" /><path d="M58,35 C70,30 65,45 57,39" />
              <path d="M54,41 C58,53 46,49 48,42" /><path d="M46,39 C34,45 30,30 42,35" />
              <path d="M44,31 C38,20 50,15 50,27" />
            </svg>
            <span className="font-doodle text-2xl font-bold tracking-tight text-[#1c0dcb] lowercase">apaxho</span>
          </div>
          <h1 className="font-doodle text-xl font-bold text-[#1c0dcb]">{t("authRegisterTitle")}</h1>
          <p className="text-xs text-[#1c1c24]/60 max-w-xs mx-auto leading-relaxed">{t("authRegisterSubtitle")}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold p-3.5 rounded-xl">
            {error}
          </div>
        )}

        {/* Register form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider font-bold text-[#1c0dcb]/70">{t("authLabelName")}</label>
            <input 
              type="text" 
              required
              disabled={loading}
              placeholder="Diego / Sharon"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-[#f8f8fa] border border-[#1c0dcb]/15 focus:border-[#1c0dcb] outline-none rounded-xl px-4 py-2.5 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider font-bold text-[#1c0dcb]/70">{t("authLabelEmail")}</label>
            <input 
              type="email" 
              required
              disabled={loading}
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f8f8fa] border border-[#1c0dcb]/15 focus:border-[#1c0dcb] outline-none rounded-xl px-4 py-2.5 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider font-bold text-[#1c0dcb]/70">{t("authLabelPassword")}</label>
            <input 
              type="password" 
              required
              disabled={loading}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f8f8fa] border border-[#1c0dcb]/15 focus:border-[#1c0dcb] outline-none rounded-xl px-4 py-2.5 text-sm transition-colors"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-[#1c0dcb] text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-[#1c0dcb]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? "..." : t("authBtnRegister")}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-1">
          <div className="flex-grow border-t border-[#1c1c24]/10"></div>
          <span className="text-[10px] text-[#1c1c24]/40 uppercase tracking-widest px-3 font-bold">{t("authOrDivider")}</span>
          <div className="flex-grow border-t border-[#1c1c24]/10"></div>
        </div>

        {/* Social logins */}
        <div className="grid grid-cols-2 gap-3.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="button"
            onClick={() => handleProviderLogin("google")}
            className="flex items-center justify-center gap-2 border border-[#1c0dcb]/20 bg-white hover:bg-[#1c0dcb]/5 py-2.5 rounded-xl text-xs font-bold text-royal-blue transition-colors disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.527a5.99 5.99 0 0 1 5.99-5.99c1.47 0 2.8.528 3.84 1.51l3.062-3.062C18.99 3.125 16.63 2 13.99 2 8.16 2 3.44 6.72 3.44 12.55s4.72 10.55 10.55 10.55c5.99 0 10.24-4.215 10.24-10.236 0-.64-.075-1.125-.2-1.58H12.24Z"/></svg>
            Google
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="button"
            onClick={() => handleProviderLogin("facebook")}
            className="flex items-center justify-center gap-2 border border-[#1c0dcb]/20 bg-white hover:bg-[#1c0dcb]/5 py-2.5 rounded-xl text-xs font-bold text-[#1c0dcb] transition-colors disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8Z"/></svg>
            Facebook
          </motion.button>
        </div>

        {/* Login redirection */}
        <p className="text-center text-xs text-[#1c1c24]/55 mt-2">
          {t("authHaveAccount")}{" "}
          <Link href="/login" className="text-[#1c0dcb] font-bold hover:underline">
            {t("authBtnLogin")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
