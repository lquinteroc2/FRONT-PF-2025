import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProviderGoogle from "@/components/Login/AuthProviderGoogle";
import { getServerSession, Session } from "next-auth";
import ClientFooter from "@/components/Navigation/ClientFooter";
import ClientNavbar from "@/components/Navigation/ClientNavbar";
import { AuthProvider } from "@/context/Auth";
import ClientLayoutWrapper from "@/components/Navigation/ClientLayoutWrapper";
import { authOptions } from "@/lib/authOptions";
import GlobalChatbot from "@/components/Navigation/ChatBotGeminiAI";
import CookieBanner from "@/components/Cookies-Banner/cookie-banner";


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
       <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </head>
      <body
        className={` ${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}
      >  
        <AuthProvider>
        <AuthProviderGoogle session={session}>
          <ClientNavbar />
          <ClientLayoutWrapper>
       <main className="flex-grow flex flex-col ">
        {children}
       </main>
       <CookieBanner />
          <GlobalChatbot />
          </ClientLayoutWrapper>
        </AuthProviderGoogle>
        <ClientFooter />
        <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
