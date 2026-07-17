"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import { 
  doc, 
  onSnapshot, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc,
  Timestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import { translations } from "../translations";
import Cropper from "react-easy-crop";
import { 
  HeartIcon, 
  StarIcon, 
  GlobeIcon, 
  CrownIcon,
  DiamondIcon,
  CakeIcon,
  Sun2Icon,
  FireIcon
} from "react-doodle-icons";

// ─── Custom Globe Icon for Uniform Language Button ───
const DoodleGlobe = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
    <circle cx="50" cy="50" r="40" />
    <path d="M10,50 Q50,65 90,50" />
    <path d="M10,50 Q50,35 90,50" />
    <path d="M50,10 Q65,50 50,90" />
    <path d="M50,10 Q35,50 50,90" />
  </svg>
);

// ─── Custom Flower SVGs (Doodle Style) ───
const PinkDaisy = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="overflow-visible text-pink-500 animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '2.5s' }}>
    <path d="M50,110 L50,55 M50,75 C40,75 35,70 38,65 M50,85 C60,85 65,80 62,75" stroke="#4ade80" />
    <path d="M50,40 C50,25 45,25 50,40 C55,25 50,25 50,40" fill="#f472b6" />
    <path d="M50,40 C35,40 35,35 50,40 C35,40 35,45 50,40" fill="#f472b6" />
    <path d="M50,40 C65,40 65,35 50,40 C65,40 65,45 50,40" fill="#f472b6" />
    <path d="M50,40 C50,55 45,55 50,40 C55,55 50,55 50,40" fill="#f472b6" />
    <circle cx="50" cy="40" r="8" fill="#facc15" />
  </svg>
);

const PurpleLavender = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="overflow-visible text-purple-500 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.8s' }}>
    <path d="M50,110 L50,40" stroke="#4ade80" />
    <ellipse cx="50" cy="40" rx="8" ry="12" fill="#c084fc" />
    <ellipse cx="50" cy="55" rx="9" ry="12" fill="#c084fc" />
    <ellipse cx="50" cy="70" rx="8" ry="10" fill="#c084fc" />
  </svg>
);

const YellowSunflower = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="overflow-visible text-yellow-500 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
    <path d="M50,110 L50,50 M50,75 C40,75 30,68 33,63" stroke="#4ade80" />
    <path d="M50,40 L40,25 L50,40 L60,25 L50,40 L65,35 L50,40 L65,45 L50,40 L55,55 L50,40 L45,55 L50,40 L35,45 L50,40 L35,35 Z" fill="#facc15" stroke="currentColor" />
    <circle cx="50" cy="40" r="10" fill="#713f12" />
  </svg>
);

const TulipOrange = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" className="overflow-visible text-orange-500 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.2s' }}>
    <path d="M50,110 L50,60 M50,85 C62,85 62,80 62,80" stroke="#4ade80" />
    <path d="M50,60 C35,60 30,35 50,30 C70,35 65,60 50,60 Z" fill="#fb923c" />
    <path d="M50,60 C42,60 40,40 50,35 C60,40 58,60 50,60 Z" fill="#f97316" />
  </svg>
);

// Positions in the virtual garden (relative coordinates)
const GARDEN_POSITIONS = [
  { left: "12%", bottom: "6%" },
  { left: "26%", bottom: "14%" },
  { left: "40%", bottom: "8%" },
  { left: "54%", bottom: "16%" },
  { left: "68%", bottom: "10%" },
  { left: "82%", bottom: "12%" },
  { left: "18%", bottom: "18%" },
  { left: "48%", bottom: "20%" },
  { left: "62%", bottom: "22%" },
  { left: "76%", bottom: "18%" }
];

// Helper to calculate daily streak based on both users planting a note each day
const calculateStreak = (notesList: any[], myUid: string, partnerUid: string) => {
  if (notesList.length === 0) return 0;

  const daysMap: { [dateStr: string]: { me: boolean; partner: boolean } } = {};

  notesList.forEach((note) => {
    if (!note.createdAt) return;
    const date = note.createdAt.toDate ? note.createdAt.toDate() : new Date(note.createdAt);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    if (!daysMap[dateStr]) {
      daysMap[dateStr] = { me: false, partner: false };
    }

    if (note.senderId === myUid) {
      daysMap[dateStr].me = true;
    } else if (note.senderId === partnerUid) {
      daysMap[dateStr].partner = true;
    }
  });

  const sortedDays = Object.keys(daysMap).sort((a, b) => b.localeCompare(a));
  if (sortedDays.length === 0) return 0;

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, '0')}-${String(yesterdayDate.getDate()).padStart(2, '0')}`;

  if (sortedDays[0] !== todayStr && sortedDays[0] !== yesterdayStr) {
    return 0;
  }

  let streak = 0;
  for (let i = 0; i < sortedDays.length; i++) {
    const dayStr = sortedDays[i];
    const dayData = daysMap[dayStr];

    if (dayData.me && dayData.partner) {
      streak++;
    } else {
      if (dayStr === todayStr) {
        continue;
      }
      break;
    }
  }

  return streak;
};

// HTML5 Canvas helper to crop image in-browser (Safeguarded from race conditions)
const getCroppedImg = (imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("No canvas context"));
        return;
      }

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], "cropped_image.jpg", { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg", 0.85);
    };
    image.onerror = (err) => reject(err);
    image.src = imageSrc; // Set src after defining events to prevent load racing
  });
};

export default function DashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [partnerProfile, setPartnerProfile] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState<"es" | "en">("es");
  
  // Theme Toggle Mode
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

  // Modals & inputs state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [linkingCode, setLinkingCode] = useState("");
  const [linkingError, setLinkingError] = useState("");
  const [linkingSuccess, setLinkingSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Settings Panel State
  const [showSettings, setShowSettings] = useState(false);
  const [newName, setNewName] = useState("");
  const [partnerAlias, setPartnerAlias] = useState("");
  const [showUnlinkConfirm, setShowUnlinkConfirm] = useState(false);
  const [unlinkingLoading, setUnlinkingLoading] = useState(false);

  // Lightbox State
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  // Custom Delete Modal State
  const [noteIdToDelete, setNoteIdToDelete] = useState<string | null>(null);

  // Note Inline Editing State
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteContent, setEditingNoteContent] = useState("");

  // Note-planting states
  const [noteContent, setNoteContent] = useState("");
  const [flowerType, setFlowerType] = useState<"pink" | "lavender" | "yellow" | "orange">("pink");
  
  // Photo Cropping States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const [plantingLoading, setPlantingLoading] = useState(false);
  const [plantingSuccess, setPlantingSuccess] = useState(false);

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
    });

    return () => unsubscribe();
  }, [router]);

  // Subscribe to own profile in Firestore
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Subscribe to partner's profile
  useEffect(() => {
    if (!userProfile?.partnerUid) {
      setPartnerProfile(null);
      return;
    }

    const partnerRef = doc(db, "users", userProfile.partnerUid);
    const unsubscribe = onSnapshot(partnerRef, (docSnap) => {
      if (docSnap.exists()) {
        setPartnerProfile(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, [userProfile]);

  // Subscribe to notes (Real-time Garden updates)
  useEffect(() => {
    if (!user || !userProfile?.partnerUid) {
      setNotes([]);
      return;
    }

    const notesRef = collection(db, "notes");
    
    // Query 1: Notes sent to me
    const qReceived = query(notesRef, where("receiverId", "==", user.uid));
    
    // Query 2: Notes sent by me
    const qSent = query(notesRef, where("senderId", "==", user.uid));

    let receivedNotes: any[] = [];
    let sentNotes: any[] = [];

    const updateCombinedNotes = () => {
      const combined = [...receivedNotes, ...sentNotes];
      
      // Filter client-side to only keep notes exchanged with this specific partner
      const filtered = combined.filter(
        (n) =>
          (n.senderId === user.uid && n.receiverId === userProfile.partnerUid) ||
          (n.senderId === userProfile.partnerUid && n.receiverId === user.uid)
      );

      // Deduplicate by ID
      const uniqueNotes = Array.from(new Map(filtered.map(item => [item.id, item])).values());

      // Sort client-side by date ascending
      uniqueNotes.sort((a, b) => {
        const tA = a.createdAt?.seconds || 0;
        const tB = b.createdAt?.seconds || 0;
        return tA - tB;
      });

      setNotes(uniqueNotes);
    };

    const unsubReceived = onSnapshot(qReceived, (snapshot) => {
      receivedNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateCombinedNotes();
    }, (err) => {
      console.error("qReceived error:", err);
    });

    const unsubSent = onSnapshot(qSent, (snapshot) => {
      sentNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateCombinedNotes();
    }, (err) => {
      console.error("qSent error:", err);
    });

    return () => {
      unsubReceived();
      unsubSent();
    };
  }, [user, userProfile]);

  // Mark received notes as seen automatically when they enter the dashboard
  useEffect(() => {
    if (!user || notes.length === 0) return;

    notes.forEach(async (note) => {
      if (note.receiverId === user.uid && !note.seen) {
        try {
          await updateDoc(doc(db, "notes", note.id), { seen: true });
        } catch (err) {
          console.error("Error marking note as seen:", err);
        }
      }
    });
  }, [notes, user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleCopyCode = () => {
    if (userProfile?.partnerCode) {
      navigator.clipboard.writeText(userProfile.partnerCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLinkPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinkingError("");
    const enteredCode = linkingCode.trim().toUpperCase();

    if (!enteredCode) return;

    if (userProfile?.partnerUid) {
      setLinkingError(locale === "es" ? "Ya estás vinculado con alguien." : "You are already linked with someone.");
      return;
    }

    if (enteredCode === userProfile?.partnerCode) {
      setLinkingError(locale === "es" ? "No puedes vincularte contigo mismo." : "You cannot link with yourself.");
      return;
    }

    try {
      const q = query(collection(db, "users"), where("partnerCode", "==", enteredCode));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setLinkingError(locale === "es" ? "Código no encontrado. Verifica de nuevo." : "Code not found. Please verify.");
        return;
      }

      const partnerDoc = querySnapshot.docs[0];
      const partnerData = partnerDoc.data();

      if (partnerData.partnerUid) {
        setLinkingError(locale === "es" ? "Ese usuario ya está vinculado con otra persona." : "That user is already linked with someone else.");
        return;
      }

      // Perform updates
      await updateDoc(doc(db, "users", user!.uid), {
        partnerUid: partnerDoc.id
      });
      await updateDoc(doc(db, "users", partnerDoc.id), {
        partnerUid: user!.uid
      });

      setLinkingSuccess(true);
      setLinkingCode("");
      setTimeout(() => {
        setLinkingSuccess(false);
      }, 4000);
    } catch (err) {
      console.error(err);
      setLinkingError(locale === "es" ? "Error al realizar el vínculo." : "Error linking accounts.");
    }
  };

  // Image Selection Handler (Loads into Cropper Modal)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setShowCropModal(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setPlantingLoading(true);
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      setSelectedFile(croppedFile);
      setPreviewUrl(URL.createObjectURL(croppedFile));
      setShowCropModal(false);
    } catch (err) {
      console.error("Error cropping image:", err);
    } finally {
      setPlantingLoading(false);
    }
  };

  const handleCropCancel = () => {
    setImageSrc(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowCropModal(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePlantNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() || plantingLoading || !userProfile?.partnerUid) return;

    setPlantingLoading(true);
    let imageUrl = "";

    try {
      // 1. Upload cropped photo to Storage if selected
      if (selectedFile) {
        const fileRef = ref(storage, `notes-images/${user!.uid}/${Date.now()}_cropped.jpg`);
        const uploadSnapshot = await uploadBytes(fileRef, selectedFile);
        imageUrl = await getDownloadURL(uploadSnapshot.ref);
      }

      // 2. Compute expiration time (24 hours from now)
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // 3. Save note to Firestore
      await addDoc(collection(db, "notes"), {
        senderId: user!.uid,
        receiverId: userProfile.partnerUid,
        content: noteContent.trim(),
        colorTheme: flowerType,
        imageUrl: imageUrl,
        expiresAt: expiresAt,
        createdAt: Timestamp.now()
      });

      setNoteContent("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setImageSrc(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setPlantingSuccess(true);
      setTimeout(() => setPlantingSuccess(false), 3000);
    } catch (err) {
      console.error("Error planting note:", err);
    } finally {
      setPlantingLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      // Save my displayName
      await updateDoc(doc(db, "users", user.uid), {
        displayName: newName.trim()
      });
      // Save partner displayName mutually since rules allow partner edits
      if (userProfile?.partnerUid && partnerAlias.trim()) {
        await updateDoc(doc(db, "users", userProfile.partnerUid), {
          displayName: partnerAlias.trim()
        });
      }
      setShowSettings(false);
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  const handleUnlink = async () => {
    if (!user || !userProfile?.partnerUid || unlinkingLoading) return;
    setUnlinkingLoading(true);
    try {
      const partnerId = userProfile.partnerUid;
      await updateDoc(doc(db, "users", user.uid), { partnerUid: "" });
      await updateDoc(doc(db, "users", partnerId), { partnerUid: "" });
      setShowUnlinkConfirm(false);
      setShowSettings(false);
    } catch (err) {
      console.error("Error unlinking:", err);
    } finally {
      setUnlinkingLoading(false);
    }
  };

  // Update note content function
  const handleUpdateNote = async (noteId: string) => {
    if (!editingNoteContent.trim()) return;
    try {
      await updateDoc(doc(db, "notes", noteId), {
        content: editingNoteContent.trim()
      });
      setEditingNoteId(null);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  const checkSentToday = (notesList: any[], targetUid: string) => {
    const todayStr = new Date().toDateString();
    return notesList.some((n) => {
      if (n.senderId !== targetUid) return false;
      const noteDate = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
      return noteDate.toDateString() === todayStr;
    });
  };

  const meSentToday = user ? checkSentToday(notes, user.uid) : false;
  const partnerSentToday = userProfile?.partnerUid ? checkSentToday(notes, userProfile.partnerUid) : false;
  const streakCount = user && userProfile?.partnerUid ? calculateStreak(notes, user.uid, userProfile.partnerUid) : 0;
  
  // Happy garden state if both users sent notes today
  const isGardenHappy = meSentToday && partnerSentToday;
  const partnerName = partnerProfile?.displayName || "...";

  // Identify editable last sent note
  const mySentNotes = notes.filter((n) => n.senderId === user?.uid);
  const lastSentNoteId = mySentNotes.length > 0 ? mySentNotes[mySentNotes.length - 1].id : null;

  const t = (key: keyof typeof translations.es) =>
    translations[locale]?.[key] ?? translations["es"][key];

  // Dynamic Garden Background based on Dark Mode & Garden happiness
  const gardenBg = isDarkMode
    ? (isGardenHappy 
        ? "linear-gradient(to bottom, #09090b, #0f172a, #111827)" // Starry night
        : "linear-gradient(to bottom, #18181b, #1e1b4b, #27272a)") // Gray night
    : (isGardenHappy 
        ? "linear-gradient(to bottom, #bdecff, #dcfce7)" // Sunny day
        : "linear-gradient(to bottom, #cbd5e1, #cbd5e1)"); // Gray day

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
    <div className={`min-h-screen font-mono selection:bg-[#1c0dcb] selection:text-white p-6 md:p-10 relative overflow-hidden flex flex-col items-center justify-between transition-colors duration-300 ${
      isDarkMode ? "bg-zinc-950 text-zinc-100" : "bg-[#f1f1f4] text-[#1c1c24]"
    }`}>
      
      {/* Decorative Doodles Background */}
      <div className={`fixed inset-0 pointer-events-none select-none transition-opacity duration-300 ${
        isDarkMode ? "opacity-[0.03] text-white" : "opacity-[0.06] text-black"
      }`} aria-hidden>
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
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={`w-9 h-9 transition-colors duration-300 ${
            isDarkMode ? "text-zinc-200" : "text-[#1c0dcb]"
          }`}>
            <path d="M50,85 C51,70 49,55 50,45" /><circle cx="50" cy="35" r="8" />
            <path d="M50,27 C50,15 62,25 56,31" /><path d="M58,35 C70,30 65,45 57,39" />
            <path d="M54,41 C58,53 46,49 48,42" /><path d="M46,39 C34,45 30,30 42,35" />
            <path d="M44,31 C38,20 50,15 50,27" />
          </svg>
          <span className={`font-doodle text-2xl font-bold tracking-tight lowercase transition-colors duration-300 ${
            isDarkMode ? "text-zinc-200" : "text-[#1c0dcb]"
          }`}>apaxho</span>
        </Link>

        <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-xl border-2 transition-all text-sm font-bold flex items-center justify-center shadow-sm h-10 w-10 ${
              isDarkMode 
                ? "border-zinc-800 bg-zinc-900 text-yellow-400 hover:bg-zinc-800" 
                : "border-[#1c0dcb]/25 bg-white text-[#1c0dcb] hover:bg-[#1c0dcb]/8"
            }`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </motion.button>

          {/* Language Toggle Button (Styled identically to landing page) */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all shadow-sm h-10 shrink-0 ${
              isDarkMode 
                ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800" 
                : "border-[#1c0dcb]/25 bg-white text-[#1c0dcb] hover:bg-[#1c0dcb]/8 hover:border-[#1c0dcb]/50"
            }`}
          >
            <DoodleGlobe size={18} />
            <span>{locale.toUpperCase()}</span>
          </motion.button>
          
          {userProfile && (
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setNewName(userProfile.displayName || "");
                setPartnerAlias(partnerName);
                setShowSettings(true);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 border rounded-xl text-xs font-bold transition-all h-10 shrink-0 ${
                isDarkMode 
                  ? "border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800" 
                  : "border-[#1c0dcb]/20 bg-white/55 text-[#1c0dcb] hover:bg-[#1c0dcb]/5"
              }`}
            >
              <span>⚙️ {locale === "es" ? "Ajustes" : "Settings"}</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowLogoutConfirm(true)}
            className="bg-[#1c0dcb] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-[#1c0dcb]/20 transition-all hover:bg-[#1c0dcb]/90 h-10 shrink-0"
          >
            {locale === "es" ? "Salir" : "Logout"}
          </motion.button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-1 w-full max-w-5xl flex flex-col justify-center items-center gap-8 py-8 z-10">
        
        {/* VINCULADO STATE / SHARED GARDEN */}
        {userProfile?.partnerUid ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Notes & Plant Form */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full">
              
              {/* Plant Cuddle Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border-2 rounded-3xl p-6 shadow-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-zinc-900 border-zinc-800 shadow-zinc-950/20" 
                    : "bg-white border-[#1c0dcb]/20 shadow-[#1c0dcb]/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🌸</span>
                  <h3 className={`font-doodle text-base font-bold transition-colors ${
                    isDarkMode ? "text-zinc-200" : "text-[#1c0dcb]"
                  }`}>
                    {locale === "es" ? "Plantar un Apapacho" : "Plant a Cuddle"}
                  </h3>
                </div>

                <form onSubmit={handlePlantNote} className="flex flex-col gap-4">
                  <textarea
                    required
                    placeholder={locale === "es" ? "Escribe algo bonito para hoy..." : "Write something nice for today..."}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    maxLength={140}
                    className={`w-full h-24 outline-none rounded-2xl p-4 text-xs font-mono resize-none transition-colors border ${
                      isDarkMode 
                        ? "bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-550 focus:border-[#1c0dcb]" 
                        : "bg-[#f8f8fa] border-[#1c0dcb]/15 focus:border-[#1c0dcb] text-[#1c1c24]"
                    }`}
                  />

                  {/* Photo selector input (Professional Crop Tool Integration) */}
                  <div className="flex flex-col gap-1.5">
                    <label className={`text-[10px] uppercase tracking-wider font-bold transition-colors ${
                      isDarkMode ? "text-zinc-400" : "text-[#1c0dcb]/70"
                    }`}>
                      {locale === "es" ? "Añadir Foto (Expiración de 24h)" : "Add Photo (24h Expiration)"}
                    </label>
                    <div className="flex items-center gap-3">
                      <label className={`cursor-pointer border px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        isDarkMode 
                          ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-750 text-zinc-300"
                          : "bg-[#1c0dcb]/5 hover:bg-[#1c0dcb]/10 border-[#1c0dcb]/15 text-[#1c0dcb]"
                      }`}>
                        <svg viewBox="0 0 100 100" className="w-4 h-4 fill-none stroke-current" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="15" y="25" width="70" height="55" rx="10" />
                          <circle cx="50" cy="52" r="15" />
                          <path d="M35,25 L43,15 L57,15 L65,25 Z" />
                        </svg>
                        <span>{previewUrl ? (locale === "es" ? "Cambiar Foto" : "Change Photo") : (locale === "es" ? "Examinar..." : "Browse...")}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={onFileChange}
                          className="hidden" 
                        />
                      </label>
                    </div>

                    {/* Pre-upload Cropped Image Preview */}
                    {previewUrl && (
                      <div className="relative mt-2 rounded-2xl overflow-hidden border border-[#1c0dcb]/20 max-w-[120px] aspect-square shadow-sm group">
                        <img src={previewUrl} alt="Cropped Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                            setImageSrc(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors shadow shadow-red-600/35 text-[9px] font-bold z-10"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Flower & Note Theme Selector */}
                  <div className="flex flex-col gap-2">
                    <span className={`text-[10px] uppercase tracking-wider font-bold transition-colors ${
                      isDarkMode ? "text-zinc-400" : "text-[#1c0dcb]/70"
                    }`}>
                      {locale === "es" ? "Selecciona Flor y Color" : "Select Flower & Color"}
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { type: "pink", emoji: "🌸", label: locale === "es" ? "Rosa" : "Pink" },
                        { type: "lavender", emoji: "🪻", label: locale === "es" ? "Lavanda" : "Lavender" },
                        { type: "yellow", emoji: "🌻", label: locale === "es" ? "Amarillo" : "Yellow" },
                        { type: "orange", emoji: "🌷", label: locale === "es" ? "Naranja" : "Orange" }
                      ].map((item) => (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => setFlowerType(item.type as any)}
                          className={`flex flex-col items-center p-2 rounded-xl border-2 text-[10px] font-bold transition-all ${
                            flowerType === item.type
                              ? "border-[#1c0dcb] bg-[#1c0dcb]/5 text-[#1c0dcb]"
                              : "border-[#1c0dcb]/10 bg-transparent hover:border-[#1c0dcb]/30"
                          }`}
                        >
                          <span className="text-lg">{item.emoji}</span>
                          <span className="mt-1">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={plantingLoading}
                    type="submit"
                    className="w-full bg-[#1c0dcb] text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-[#1c0dcb]/20 flex items-center justify-center gap-2 mt-1 disabled:opacity-50"
                  >
                    {plantingLoading ? "..." : (locale === "es" ? "Plantar Nota 🌿" : "Plant Note 🌿")}
                  </motion.button>
                </form>

                {/* Floating success banner */}
                <AnimatePresence>
                  {plantingSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold py-2 px-3 rounded-xl text-center"
                    >
                      {locale === "es" ? "¡Flor plantada con éxito en su jardín! 🌸" : "Flower planted successfully in your garden! 🌸"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Memory Diary (Notes feed) */}
              <div className="flex flex-col gap-3">
                <h3 className={`text-xs uppercase tracking-widest font-bold px-2 flex justify-between transition-colors ${
                  isDarkMode ? "text-zinc-400" : "text-[#1c0dcb]/70"
                }`}>
                  <span>{locale === "es" ? "Historial de Apapachos" : "Cuddle History"}</span>
                  <span className={`lowercase text-[10px] font-bold ${isDarkMode ? "text-zinc-400" : "text-[#1c0dcb]"}`}>{notes.length} {locale === "es" ? "notas" : "notes"}</span>
                </h3>
                <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
                  {notes.length === 0 ? (
                    <div className={`text-center py-8 text-xs border-2 border-dashed rounded-2xl transition-colors ${
                      isDarkMode ? "border-zinc-800 bg-zinc-900/30 text-zinc-500" : "text-[#1c1c24]/50 border-[#1c0dcb]/10 bg-white/20"
                    }`}>
                      {locale === "es" ? "Aún no hay notas compartidas." : "No shared notes yet."}
                    </div>
                  ) : (
                    [...notes].reverse().map((note) => {
                      const isMe = note.senderId === user?.uid;
                      const dateStr = note.createdAt?.toDate 
                        ? note.createdAt.toDate().toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { month: "short", day: "numeric" })
                        : "";
                      
                      // Check if image has expired
                      const isExpired = note.imageUrl && note.expiresAt && (
                        note.expiresAt.toDate 
                          ? Date.now() > note.expiresAt.toDate().getTime()
                          : Date.now() > new Date(note.expiresAt).getTime()
                      );

                      // Theme classes mapped to the flower selection
                      let themeClass = isDarkMode 
                        ? "bg-zinc-900 border-zinc-800 text-zinc-100" 
                        : "bg-[#f0effd] border-[#1c0dcb]/15 text-[#1c1c24]";
                      
                      if (note.colorTheme === "pink") {
                        themeClass = isDarkMode 
                          ? "bg-pink-950/20 border-pink-900/50 text-pink-200" 
                          : "bg-[#ffeef3] border-pink-300 text-pink-900";
                      } else if (note.colorTheme === "yellow") {
                        themeClass = isDarkMode 
                          ? "bg-yellow-950/20 border-yellow-900/50 text-yellow-200" 
                          : "bg-[#fefce8] border-yellow-200 text-yellow-900";
                      } else if (note.colorTheme === "orange") {
                        themeClass = isDarkMode 
                          ? "bg-orange-950/20 border-orange-900/50 text-orange-200" 
                          : "bg-[#fff7ed] border-orange-200 text-orange-900";
                      }

                      const isEditable = note.id === lastSentNoteId && !note.seen;

                      return (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          key={note.id}
                          className={`p-4 rounded-2xl border text-xs leading-relaxed flex flex-col gap-1.5 shadow-sm transition-transform hover:scale-[1.01] ${themeClass} ${
                            isMe ? "self-end w-[85%]" : "self-start w-[85%]"
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] font-bold opacity-60">
                            <span>{isMe ? (locale === "es" ? "Tú" : "You") : partnerName}</span>
                            <span>{dateStr}</span>
                          </div>

                          {/* TEXT EDITING MODE */}
                          {editingNoteId === note.id ? (
                            <div className="flex flex-col gap-2 mt-1">
                              <textarea
                                value={editingNoteContent}
                                onChange={(e) => setEditingNoteContent(e.target.value)}
                                className={`w-full h-16 rounded-xl p-2 text-xs font-mono outline-none resize-none border ${
                                  isDarkMode 
                                    ? "bg-zinc-800 border-zinc-700 text-white" 
                                    : "bg-white/80 border-black/10 text-neutral-800"
                                }`}
                              />
                              <div className="flex gap-2 justify-end">
                                <button 
                                  type="button" 
                                  onClick={() => setEditingNoteId(null)}
                                  className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-[10px] font-bold text-black"
                                >
                                  {locale === "es" ? "Cancelar" : "Cancel"}
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => handleUpdateNote(note.id)}
                                  className="px-2.5 py-1 bg-[#1c0dcb] text-white rounded-lg text-[10px] font-bold"
                                >
                                  {locale === "es" ? "Guardar" : "Save"}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="font-mono">{note.content}</p>
                          )}

                          {/* PHOTO RENDERING WITH AUTO-DESTRUCT & FULLSCREEN PREVIEW */}
                          {note.imageUrl && (
                            <div className="mt-1 flex justify-center">
                              {isExpired ? (
                                <div className={`border border-dashed rounded-xl p-2.5 text-center text-[10px] opacity-60 w-full font-mono ${
                                  isDarkMode ? "border-zinc-800 bg-zinc-950/40" : "border-black/10 bg-black/5"
                                }`}>
                                  ⏳ {locale === "es" ? "Foto autodestruida tras 24h" : "Photo expired after 24h"}
                                </div>
                              ) : (
                                <img 
                                  src={note.imageUrl} 
                                  alt="Apapacho" 
                                  onClick={() => setSelectedLightboxImage(note.imageUrl)}
                                  className="rounded-xl border border-black/5 aspect-square object-cover w-full max-w-[200px] mx-auto shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                                />
                              )}
                            </div>
                          )}

                          {/* FOOTER & NOTE MANAGEMENT BUTTONS (Only if last note and not seen yet) */}
                          <div className="flex justify-between items-center mt-1 border-t border-black/5 pt-1.5">
                            <span className="text-right text-xs opacity-75">
                              {note.colorTheme === "pink" && "🌸"}
                              {note.colorTheme === "lavender" && "🪻"}
                              {note.colorTheme === "yellow" && "🌻"}
                              {note.colorTheme === "orange" && "🌷"}
                            </span>

                            {isEditable && editingNoteId !== note.id && (
                              <div className="flex gap-2">
                                <button 
                                  type="button"
                                  onClick={() => {
                                    setEditingNoteId(note.id);
                                    setEditingNoteContent(note.content);
                                  }}
                                  className="text-[10px] font-bold text-[#1c0dcb] hover:underline flex items-center gap-0.5"
                                >
                                  ✏️ {locale === "es" ? "Editar" : "Edit"}
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => setNoteIdToDelete(note.id)}
                                  className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-0.5"
                                >
                                  🗑️ {locale === "es" ? "Eliminar" : "Delete"}
                                </button>
                              </div>
                            )}

                            {note.seen && isMe && (
                              <span className="text-[9px] font-bold text-green-600 bg-green-50/70 px-1.5 py-0.5 rounded-md self-end opacity-75">
                                ✓ {locale === "es" ? "Visto" : "Seen"}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Shared Garden canvas */}
            <div className="lg:col-span-7 flex flex-col gap-4 w-full">
              
              {/* Garden Header */}
              <div className={`border-2 rounded-3xl p-5 shadow-lg flex flex-col gap-3 relative transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-zinc-900 border-zinc-800 shadow-zinc-950/20" 
                  : "bg-white border-[#1c0dcb]/25 shadow-[#1c0dcb]/5"
              }`}>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${
                      isDarkMode ? "bg-zinc-850" : "bg-[#1c0dcb]/5"
                    }`}>
                      {isGardenHappy ? "🌸" : "☁️"}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-doodle text-sm md:text-base font-bold flex items-center gap-1.5 flex-wrap transition-colors ${
                        isDarkMode ? "text-zinc-200" : "text-royal-blue"
                      }`}>
                        <span>{locale === "es" ? "Jardín de" : "Garden of"} {userProfile?.displayName} &amp; {partnerName}</span>
                      </h3>
                      <p className={`text-[10px] font-bold lowercase transition-colors ${
                        isDarkMode ? "text-zinc-500" : "text-[#1c1c24]/50"
                      }`}>
                        {isGardenHappy 
                          ? (locale === "es" ? "¡jardín soleado y brillante! ☀️" : "sunny and bright garden! ☀️")
                          : (locale === "es" ? "jardín gris, esperando apapachos... ☁️" : "cloudy garden, awaiting cuddles... ☁️")
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-2xl text-[11px] font-bold shadow-inner transition-colors ${
                      isDarkMode 
                        ? "bg-zinc-800 border-zinc-700 text-zinc-300" 
                        : "bg-[#e0dffc] border-royal-blue/10 text-[#1c0dcb]"
                    }`}>
                      <FireIcon size={18} className="text-orange-500 animate-pulse" />
                      <span>{streakCount} {locale === "es" ? "Racha" : "Streak"}</span>
                    </div>
                  </div>
                </div>

                {/* COMPACT DAILY GOAL STATUS WIDGET */}
                <div className="border-t border-[#1c0dcb]/10 pt-2 flex items-center gap-3 text-[11px] font-bold font-mono">
                  <span className="text-[#1c1c24]/40 uppercase tracking-wider text-[9px]">{locale === "es" ? "Hoy:" : "Today:"}</span>
                  <span className={`px-2 py-0.5 rounded-full border ${meSentToday ? "bg-green-50 border-green-200 text-green-700" : "bg-orange-50 border-orange-200 text-orange-700"}`}>
                    {locale === "es" ? "Tú" : "You"} {meSentToday ? "✅" : "⏳"}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full border ${partnerSentToday ? "bg-green-50 border-green-200 text-green-700" : "bg-orange-50 border-orange-200 text-orange-700"}`}>
                    {partnerName} {partnerSentToday ? "✅" : "⏳"}
                  </span>
                </div>

              </div>

              {/* The Virtual Garden Canvas with Dynamic Weather Filter */}
              <div 
                className={`relative w-full h-[450px] border-2 rounded-[36px] overflow-hidden shadow-inner transition-all duration-1000 ${
                  isDarkMode ? "border-zinc-800" : "border-[#1c0dcb]/25"
                }`}
                style={{ 
                  filter: isGardenHappy ? "none" : "grayscale(0.65) brightness(0.92)",
                  background: gardenBg
                }}
              >
                
                {/* Grass & Wavy Ground SVG */}
                <div className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none z-0">
                  <svg viewBox="0 0 1000 300" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,150 Q250,110 500,150 T1000,150 L1000,300 L0,300 Z" fill={isDarkMode ? "#064e3b" : "#bbf7d0"} className="transition-colors duration-1000" />
                    <path d="M0,200 Q300,180 600,210 T1000,190 L1000,300 L0,300 Z" fill={isDarkMode ? "#065f46" : "#86efac"} className="transition-colors duration-1000" />
                  </svg>
                </div>

                {/* Glowing Stars (Only in Happy Night Mode) */}
                {isDarkMode && isGardenHappy && (
                  <>
                    <div className="absolute top-[8%] left-[10%] text-yellow-300/40 animate-pulse"><StarIcon size={12} /></div>
                    <div className="absolute top-[18%] right-[25%] text-yellow-300/30 animate-pulse" style={{ animationDelay: "1s" }}><StarIcon size={14} /></div>
                    <div className="absolute top-[12%] right-[10%] text-yellow-200/50 animate-pulse" style={{ animationDelay: "0.5s" }}><StarIcon size={10} /></div>
                  </>
                )}

                {/* Floating Clouds with varying speeds and opacities */}
                <motion.div 
                  animate={{ x: ["-10%", "110%"] }}
                  transition={{ repeat: Infinity, duration: isGardenHappy ? 40 : 25, ease: "linear" }}
                  className="absolute top-[10%] left-0 pointer-events-none select-none z-0"
                  style={{ opacity: isGardenHappy ? 0.45 : 0.7 }}
                >
                  <svg width="100" height="50" viewBox="0 0 100 50" fill={isGardenHappy ? (isDarkMode ? "#1e293b" : "white") : "#94a3b8"} className="transition-colors duration-1000">
                    <path d="M20,40 C10,40 5,30 15,25 C10,15 30,10 40,20 C50,10 70,15 70,25 C80,25 85,35 75,40 Z" />
                  </svg>
                </motion.div>

                <motion.div 
                  animate={{ x: ["110%", "-10%"] }}
                  transition={{ repeat: Infinity, duration: isGardenHappy ? 55 : 35, ease: "linear" }}
                  className="absolute top-[25%] left-0 pointer-events-none select-none z-0"
                  style={{ opacity: isGardenHappy ? 0.35 : 0.6 }}
                >
                  <svg width="80" height="40" viewBox="0 0 100 50" fill={isGardenHappy ? (isDarkMode ? "#1e293b" : "white") : "#94a3b8"} className="transition-colors duration-1000">
                    <path d="M20,40 C10,40 5,30 15,25 C10,15 30,10 40,20 C50,10 70,15 70,25 C80,25 85,35 75,40 Z" />
                  </svg>
                </motion.div>

                {/* Flowers container (populates dynamically based on notes) */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <AnimatePresence>
                    {notes.map((note, index) => {
                      const pos = GARDEN_POSITIONS[index % GARDEN_POSITIONS.length];
                      
                      // Check if image has expired
                      const isExpired = note.imageUrl && note.expiresAt && (
                        note.expiresAt.toDate 
                          ? Date.now() > note.expiresAt.toDate().getTime()
                          : Date.now() > new Date(note.expiresAt).getTime()
                      );

                      return (
                        <motion.div
                          key={note.id}
                          initial={{ scale: 0, y: 30 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0, y: 30 }}
                          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }}
                          style={{ 
                            position: "absolute",
                            left: pos.left,
                            bottom: pos.bottom
                          }}
                          className="origin-bottom transform -translate-x-1/2 pointer-events-auto cursor-help group text-[#1c0dcb]"
                        >
                          {/* Flower rendering */}
                          {note.colorTheme === "pink" && <PinkDaisy size={54} />}
                          {note.colorTheme === "lavender" && <PurpleLavender size={54} />}
                          {note.colorTheme === "yellow" && <YellowSunflower size={54} />}
                          {note.colorTheme === "orange" && <TulipOrange size={54} />}

                          {/* Hover Tooltip showing Note details and Photo preview */}
                          <div className={`absolute bottom-[105%] left-1/2 transform -translate-x-1/2 border-2 px-3.5 py-2.5 rounded-2xl text-[10px] font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-normal w-44 leading-normal pointer-events-none z-30 select-none ${
                            isDarkMode 
                              ? "bg-zinc-900 border-zinc-700 text-zinc-100" 
                              : "bg-white/95 border-royal-blue/20 text-royal-blue"
                          }`}>
                            <div className="font-sans border-b border-royal-blue/10 pb-1 mb-1 flex justify-between">
                              <span>{note.senderId === user?.uid ? (locale === "es" ? "Tú" : "You") : partnerName}</span>
                            </div>
                            <p className={`font-mono normal-case mb-1 ${isDarkMode ? "text-zinc-200" : "text-[#1c1c24]"}`}>{note.content}</p>
                            
                            {note.imageUrl && (
                              <div className="mt-1">
                                {isExpired ? (
                                  <span className="text-[9px] text-red-500 font-sans italic block">⏳ {locale === "es" ? "Foto expirada" : "Photo expired"}</span>
                                ) : (
                                  <img 
                                    src={note.imageUrl} 
                                    alt="Preview" 
                                    onClick={() => setSelectedLightboxImage(note.imageUrl)}
                                    className="w-full max-h-16 object-cover rounded-lg border border-black/5 cursor-pointer hover:brightness-90 transition-all"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Empty State Help Text */}
                {notes.length === 0 && (
                  <div className={`absolute inset-0 flex items-center justify-center p-8 text-center text-xs font-bold z-10 leading-relaxed max-w-sm mx-auto ${
                    isDarkMode ? "text-zinc-650" : "text-[#1c0dcb]/50"
                  }`}>
                    {locale === "es"
                      ? "🌱 Tu jardín está listo. ¡Planta tu primer apapacho a la izquierda para ver florecer tu diario!"
                      : "🌱 Your garden is ready. Plant your first cuddle on the left to watch your diary bloom!"
                    }
                  </div>
                )}

              </div>
            </div>

          </div>
        ) : (
          /* NO VINCULADO STATE / PAIR LINKING SCREEN */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-md border-2 rounded-3xl p-8 shadow-xl flex flex-col gap-6 transition-colors duration-300 ${
              isDarkMode 
                ? "bg-zinc-900 border-zinc-800 shadow-zinc-950/20" 
                : "bg-white border-[#1c0dcb]/20 shadow-[#1c0dcb]/5"
            }`}
          >
            {/* Header Title */}
            <div className="text-center flex flex-col gap-2">
              <span className="text-3xl animate-bounce">🌸</span>
              <h2 className={`font-doodle text-xl font-bold transition-colors ${
                isDarkMode ? "text-zinc-200" : "text-[#1c0dcb]"
              }`}>
                {locale === "es" ? "Conecta tu Jardín" : "Connect your Garden"}
              </h2>
              <p className={`text-xs max-w-xs mx-auto leading-relaxed transition-colors ${
                isDarkMode ? "text-zinc-400" : "text-[#1c1c24]/60"
              }`}>
                {locale === "es"
                  ? "Para empezar a compartir notas, debes vincular tu cuenta con tu persona favorita."
                  : "To start sharing notes, you must link your account with your favorite person."
                }
              </p>
            </div>

            <hr className="border-[#1c0dcb]/10" />

            {/* 1. Share own code */}
            <div className="flex flex-col gap-2">
              <label className={`text-[11px] uppercase tracking-wider font-bold transition-colors ${
                isDarkMode ? "text-zinc-400" : "text-[#1c0dcb]/70"
              }`}>
                {locale === "es" ? "Tu Código de Invitación" : "Your Invitation Code"}
              </label>
              
              <div className="flex gap-2">
                <div className={`flex-1 border rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-center tracking-widest shadow-inner ${
                  isDarkMode ? "bg-zinc-850 border-zinc-700 text-zinc-100" : "bg-[#f8f8fa] border-[#1c0dcb]/15 text-[#1c1c24]"
                }`}>
                  {userProfile?.partnerCode || "..."}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyCode}
                  className={`border px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isDarkMode 
                      ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750" 
                      : "bg-[#1c0dcb]/10 hover:bg-[#1c0dcb]/15 text-[#1c0dcb] border-[#1c0dcb]/10"
                  }`}
                >
                  {copied ? (locale === "es" ? "¡Copiado!" : "Copied!") : (locale === "es" ? "Copiar" : "Copy")}
                </motion.button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center my-1">
              <div className="flex-grow border-t border-[#1c1c24]/10"></div>
              <span className={`text-[10px] uppercase tracking-widest px-3 font-bold ${
                isDarkMode ? "text-zinc-500" : "text-[#1c1c24]/40"
              }`}>
                {locale === "es" ? "o introduce el de tu pareja" : "or enter your partner's"}
              </span>
              <div className="flex-grow border-t border-[#1c1c24]/10"></div>
            </div>

            {/* 2. Enter partner's code */}
            <form onSubmit={handleLinkPartner} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={`text-[11px] uppercase tracking-wider font-bold transition-colors ${
                  isDarkMode ? "text-zinc-400" : "text-[#1c0dcb]/70"
                }`}>
                  {locale === "es" ? "Código de tu Pareja" : "Partner's Code"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="APX-XXX-XXX"
                  value={linkingCode}
                  onChange={(e) => setLinkingCode(e.target.value)}
                  className={`w-full text-sm font-bold text-center tracking-widest uppercase transition-colors outline-none border rounded-xl px-4 py-3 ${
                    isDarkMode 
                      ? "bg-zinc-850 border-zinc-700 text-white focus:border-[#1c0dcb] placeholder-zinc-600" 
                      : "bg-[#f8f8fa] border-[#1c0dcb]/15 focus:border-[#1c0dcb] text-royal-blue placeholder-royal-blue/30"
                  }`}
                />
              </div>

              {linkingError && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold p-3 rounded-xl">
                  {linkingError}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#1c0dcb] text-white py-3.5 rounded-xl font-bold text-xs shadow-md shadow-[#1c0dcb]/20 hover:bg-[#1c0dcb]/90 transition-colors"
              >
                {locale === "es" ? "Vincular Jardín 🌸" : "Link Garden 🌸"}
              </motion.button>
            </form>
          </motion.div>
        )}

      </main>

      {/* FOOTER */}
      <footer className={`text-center text-[10px] font-bold z-10 mt-6 transition-colors ${
        isDarkMode ? "text-zinc-500" : "text-[#1c0dcb]/50"
      }`}>
        <span>© {new Date().getFullYear()} APAXHO. {t("footerMadeWith")}</span>
      </footer>

      {/* FULLSCREEN LIGHTBOX PREVIEW MODAL */}
      <AnimatePresence>
        {selectedLightboxImage && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedLightboxImage(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 font-bold text-sm shadow transition-all z-[70] flex items-center justify-center w-10 h-10"
              >
                ✕
              </button>

              <motion.img 
                src={selectedLightboxImage} 
                alt="Fullscreen Preview" 
                className="max-w-full max-h-[85vh] rounded-3xl border-2 border-white/10 shadow-2xl object-contain"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PHOTO CROPPING MODAL (Professional Custom Overlay) */}
      <AnimatePresence>
        {showCropModal && imageSrc && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border-2 rounded-3xl p-6 max-w-md w-full shadow-2xl relative flex flex-col gap-4 text-xs font-mono transition-colors ${
                isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-[#1c0dcb]/25 text-[#1c1c24]"
              }`}
            >
              <div className="flex justify-between items-center border-b border-[#1c0dcb]/10 pb-2">
                <h3 className="font-doodle text-sm font-bold text-[#1c0dcb]">
                  ✂️ {locale === "es" ? "Ajustar y Recortar Foto" : "Crop and Adjust Photo"}
                </h3>
                <button onClick={handleCropCancel} className="font-bold text-[#1c0dcb] hover:underline">
                  X
                </button>
              </div>

              {/* Crop Area Container */}
              <div className="relative w-full h-72 bg-neutral-950 rounded-2xl overflow-hidden shadow-inner border border-[#1c0dcb]/10">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-[#1c0dcb]">
                <span>🔍 {locale === "es" ? "Zoom:" : "Zoom:"}</span>
                <input 
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-grow h-1.5 rounded-lg bg-[#1c0dcb]/10 accent-[#1c0dcb] cursor-pointer"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-2 border-t border-[#1c0dcb]/10 pt-3">
                <button
                  type="button"
                  onClick={handleCropCancel}
                  className="flex-1 py-2.5 border-2 border-[#1c0dcb]/15 rounded-xl font-bold hover:bg-[#1c0dcb]/5 transition-all"
                >
                  {locale === "es" ? "Cancelar" : "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={handleCropConfirm}
                  className="flex-1 py-2.5 bg-[#1c0dcb] text-white rounded-xl font-bold shadow-md shadow-[#1c0dcb]/20 hover:bg-[#1c0dcb]/90 transition-all"
                >
                  {locale === "es" ? "Recortar Foto ✂️" : "Crop Photo ✂️"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ELIMINAR NOTA CONFIRM MODAL (Custom, doesn't close by itself) */}
      <AnimatePresence>
        {noteIdToDelete && (
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`border-2 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative flex flex-col gap-6 font-mono text-xs transition-colors ${
                isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-[#1c0dcb]/20 text-[#1c1c24]"
              }`}
            >
              <div className="text-center flex flex-col gap-2">
                <span className="text-3xl animate-bounce">🗑️</span>
                <h3 className="font-doodle text-base font-bold text-red-600">
                  {locale === "es" ? "¿Eliminar esta Nota?" : "Delete this Note?"}
                </h3>
                <p className={`text-[11px] leading-relaxed transition-colors ${
                  isDarkMode ? "text-zinc-400" : "text-[#1c1c24]/75"
                }`}>
                  {locale === "es" 
                    ? "Esta acción eliminará la flor de tu jardín y el mensaje del historial permanentemente."
                    : "This will permanently remove the flower from your garden and the note from your history."}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setNoteIdToDelete(null)}
                  className="flex-1 py-3 border-2 border-[#1c0dcb]/15 rounded-xl font-bold text-xs hover:bg-[#1c0dcb]/5 transition-colors"
                >
                  {locale === "es" ? "Cancelar" : "Cancel"}
                </button>
                <button
                  onClick={async () => {
                    try {
                      await deleteDoc(doc(db, "notes", noteIdToDelete));
                    } catch (err) {
                      console.error("Error deleting note:", err);
                    } finally {
                      setNoteIdToDelete(null);
                    }
                  }}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-xs shadow-md shadow-red-600/20 hover:bg-red-700 transition-colors"
                >
                  {locale === "es" ? "Sí, eliminar" : "Yes, delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SETTINGS / AJUSTES MODAL */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`border-2 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative flex flex-col gap-5 text-xs font-mono transition-colors ${
                isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-[#1c0dcb]/25 text-[#1c1c24]"
              }`}
            >
              <div className="flex justify-between items-center border-b border-[#1c0dcb]/10 pb-3">
                <h3 className="font-doodle text-base font-bold text-[#1c0dcb]">
                  ⚙️ {locale === "es" ? "Ajustes de Jardín" : "Garden Settings"}
                </h3>
                <button 
                  onClick={() => {
                    setShowSettings(false);
                    setShowUnlinkConfirm(false);
                  }}
                  className="font-bold text-[#1c0dcb] hover:underline"
                >
                  X
                </button>
              </div>

              {!showUnlinkConfirm ? (
                // EDIT PROFILE FORM
                <form onSubmit={handleSaveSettings} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={`text-[11px] uppercase tracking-wider font-bold transition-colors ${
                      isDarkMode ? "text-zinc-400" : "text-[#1c0dcb]/70"
                    }`}>
                      {locale === "es" ? "Mi Nombre" : "My Name"}
                    </label>
                    <input 
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Diego"
                      className={`w-full border outline-none rounded-xl px-4 py-2.5 ${
                        isDarkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-[#f8f8fa] border-[#1c0dcb]/15"
                      }`}
                    />
                  </div>

                  {userProfile?.partnerUid && (
                    <div className="flex flex-col gap-1.5">
                      <label className={`text-[11px] uppercase tracking-wider font-bold transition-colors ${
                        isDarkMode ? "text-zinc-400" : "text-[#1c0dcb]/70"
                      }`}>
                        {locale === "es" ? "Apodo de mi Pareja" : "Partner's Nickname"}
                      </label>
                      <input 
                        type="text"
                        value={partnerAlias}
                        onChange={(e) => setPartnerAlias(e.target.value)}
                        placeholder="Sharon"
                        className={`w-full border outline-none rounded-xl px-4 py-2.5 ${
                          isDarkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-[#f8f8fa] border-[#1c0dcb]/15"
                        }`}
                      />
                    </div>
                  )}

                  <div className="flex gap-3 mt-2 pt-2 border-t border-[#1c0dcb]/10">
                    {userProfile?.partnerUid && (
                      <button
                        type="button"
                        onClick={() => setShowUnlinkConfirm(true)}
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-xl font-bold text-[11px] transition-colors"
                      >
                        💔 {locale === "es" ? "Desvincular" : "Unlink"}
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      className="flex-1 bg-[#1c0dcb] text-white py-3 rounded-xl font-bold text-[11px] shadow-md shadow-[#1c0dcb]/20 hover:bg-[#1c0dcb]/90 transition-colors"
                    >
                      {locale === "es" ? "Guardar Cambios" : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                // UNLINK CONFIRMATION DIALOG
                <div className="flex flex-col gap-4 text-center py-2">
                  <span className="text-3xl">💔</span>
                  <h4 className="font-bold text-red-600 text-sm">
                    {locale === "es" ? "¿Desvincular Jardín?" : "Unlink Garden?"}
                  </h4>
                  <p className={`text-[11px] leading-relaxed px-2 transition-colors ${
                    isDarkMode ? "text-zinc-400" : "text-[#1c1c24]/75"
                  }`}>
                    {locale === "es"
                      ? "Si te desvinculas, se romperá la conexión del jardín y las notas guardadas no se mostrarán más. Tendrán que volver a enlazarse con sus códigos."
                      : "If you unlink, the garden connection will be severed, and saved notes will no longer be visible. You will need to link again using your codes."}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setShowUnlinkConfirm(false)}
                      disabled={unlinkingLoading}
                      className="flex-grow py-3 border-2 border-[#1c0dcb]/15 rounded-xl font-bold text-[11px] hover:bg-[#1c0dcb]/5 transition-colors"
                    >
                      {locale === "es" ? "Atrás" : "Back"}
                    </button>
                    <button
                      onClick={handleUnlink}
                      disabled={unlinkingLoading}
                      className="flex-grow py-3 bg-red-600 text-white rounded-xl font-bold text-[11px] shadow-md shadow-red-600/20 hover:bg-red-700 transition-colors"
                    >
                      {unlinkingLoading ? "..." : (locale === "es" ? "Sí, desvincular" : "Yes, unlink")}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CERRAR SESION CONFIRM MODAL */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`border-2 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative flex flex-col gap-6 transition-colors ${
                isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-[#1c0dcb]/20 text-[#1c1c24]"
              }`}
            >
              <div className="text-center flex flex-col gap-2">
                <span className="text-3xl animate-pulse">🌸</span>
                <h3 className="font-doodle text-lg font-bold text-[#1c0dcb]">
                  {locale === "es" ? "¿Cerrar Sesión?" : "Log Out?"}
                </h3>
                <p className={`text-xs leading-relaxed transition-colors ${
                  isDarkMode ? "text-zinc-400" : "text-[#1c1c24]/75"
                }`}>
                  {locale === "es" 
                    ? "¿De verdad quieres salir de tu jardín de Apaxho?"
                    : "Are you sure you want to leave your Apaxho garden?"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 border-2 border-[#1c0dcb]/15 rounded-xl font-bold text-xs hover:bg-[#1c0dcb]/5 transition-colors"
                >
                  {locale === "es" ? "Cancelar" : "Cancel"}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-[#1c0dcb] text-white rounded-xl font-bold text-xs shadow-md shadow-[#1c0dcb]/20 hover:bg-[#1c0dcb]/90 transition-colors"
                >
                  {locale === "es" ? "Sí, salir" : "Yes, exit"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN LINK SUCCESS OVERLAY */}
      <AnimatePresence>
        {linkingSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#f1f1f4] z-50 flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="text-center flex flex-col items-center gap-6"
            >
              <div className="flex gap-4 items-center">
                <motion.span animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="text-5xl">🌸</motion.span>
                <motion.span animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="text-5xl">❤️</motion.span>
                <motion.span animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="text-5xl">🌻</motion.span>
              </div>

              <h2 className="font-doodle text-2xl md:text-3xl font-bold text-[#1c0dcb] lowercase">
                {locale === "es" ? "¡jardín vinculado!" : "garden connected!"}
              </h2>
              
              <p className="text-xs text-[#1c1c24]/75 max-w-sm leading-relaxed">
                {locale === "es" 
                  ? "Las estrellas se han alineado. Tu jardín compartido está listo para florecer junto a tu persona favorita."
                  : "The stars have aligned. Your shared garden is ready to bloom alongside your favorite person."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
