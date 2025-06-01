"use client"

import CallToAction from "@/components/Landing/call-to-action";
import Features from "@/components/Landing/features";
import Footer from "@/components/Navigation/Footer/Footer";
import Hero from "@/components/Landing/hero";
import HowItWorks from "@/components/Landing/how-it-works";
import Testimonials from "@/components/Landing/testimonials";
import { useEffect } from "react";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";


export default function LandingView() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const User = user?.user
    const token = user?.token;

    if (User && token) {
      router.replace("/home"); 
    }
  }, [ user , router ]);

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}