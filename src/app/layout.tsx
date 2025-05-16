import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProviderGoogle from "@/components/Login/AuthProviderGoogle";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/Header/Header";
import WrapperHeader from "@/components/ui/wrapperHeader";
import ClientFooter from "@/components/Navigation/ClientFooter";
import ClientNavbar from "@/components/Navigation/ClientNavbar";
import { AuthProvider } from "@/context/Auth";


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
        className={` ${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-gradient-to-b from-blue-50 to-neutro-ice`}
      >
        <AuthProviderGoogle session={session}>
      
        <ClientNavbar />
        <WrapperHeader>
        <Header />
        </WrapperHeader>
        {children}</AuthProviderGoogle>
        <ClientFooter />
        <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
