import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import PortfolioSection from "@/components/PortfolioSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Ensuring the theme is set properly, default to light as per New Genre
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen font-body text-ebon-depth bg-sky-canvas relative">
      <Navbar />
      <HeroSection />
      
      <div className="relative z-10">
        <ClientLogos />
        <Testimonials />
        <PortfolioSection />
        <TeamSection />
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
