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
import { Calendar } from "lucide-react";

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
          className="gradient-button px-4 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform text-white font-semibold"
          data-testid="button-book-call-floating"
        >
          <Calendar className="w-4 h-4" />
          <span>Book my Free Call</span>
        </button>
      </div>
    </div>
  );
}
