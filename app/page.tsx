import Beliefs from "@/components/landing/Beliefs";
import Benefits from "@/components/landing/Benefits";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Nav from "@/components/landing/Nav";
import Pricing from "@/components/landing/Pricing";
import Reviews from "@/components/landing/Reviews";
import Stats from "@/components/landing/Stats";
import Ticker from "@/components/landing/Ticker";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "QR Menu – Le menu digital pour les restaurants de Dakar",
  description:
    "Vos clients scannent, voient votre menu, commandent. Réduisez l'attente et augmentez vos ventes avec QR Menu. 10 000 FCFA/mois.",
};

export default function Home() {
  return (
    <main className="min-h-screen font-sans antialiased">
      <Nav />
      <Hero />
      {/* <Ticker /> */}
      <Benefits />
      <Reviews />
      <HowItWorks />
      <Stats />
      <Beliefs />
      <Pricing />
      <Footer />
    </main>
  );
}
