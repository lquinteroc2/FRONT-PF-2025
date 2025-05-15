import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProviderGoogle from "@/components/Login/AuthProviderGoogle";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Landing/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Séntia - Tu red de bienestar emocional local",
  description:
    "Plataforma donde puedes registrar tu estado emocional, encontrar recursos de salud mental y conectar con grupos de apoyo cercanos.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <AuthProviderGoogle session={session}>
        <Navbar />
        {children}</AuthProviderGoogle>
        <Footer/>
        <Toaster />
      </body>
    </html>
  );
}
