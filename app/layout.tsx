import type { Metadata } from "next";
import { Space_Mono, Playpen_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const playpenSans = Playpen_Sans({
  variable: "--font-playpen-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apaxho - Tu espacio íntimo diario",
  description: "Conecta diariamente con tu persona favorita compartiendo notas de afecto y manteniendo su racha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceMono.variable} ${playpenSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
