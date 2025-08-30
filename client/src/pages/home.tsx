import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import CalculatorSection from "@/components/calculator-section";
import ShowcaseSection from "@/components/showcase-section";
import TransformSection from "@/components/transform-section";
import BookingSection from "@/components/booking-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <CalculatorSection />
      <ShowcaseSection />
      <TransformSection />
      <BookingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="gradient-button w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          data-testid="button-chat"
        >
          <MessageCircle className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
}
