import CallToAction from "@/components/Home/call-to-action";
import Features from "@/components/Home/features";
import Footer from "@/components/Home/footer";
import Hero from "@/components/Home/hero";
import HowItWorks from "@/components/Home/how-it-works";
import Testimonials from "@/components/Home/testimonials";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />S
      <Footer />
    </main>
  );
}