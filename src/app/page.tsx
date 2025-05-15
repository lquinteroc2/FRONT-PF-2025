import Header from "@/components/Header/Header";
import CallToAction from "@/components/Landing/call-to-action";
import Features from "@/components/Landing/features";
import Footer from "@/components/Landing/footer";
import Hero from "@/components/Landing/hero";
import HowItWorks from "@/components/Landing/how-it-works";
import Testimonials from "@/components/Landing/testimonials";
import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants";


export default function Home() {
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