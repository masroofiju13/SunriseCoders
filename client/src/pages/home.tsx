import { useState } from "react";
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
import { Calendar, ChevronDown } from "lucide-react";

export default function Home() {
  const [language, setLanguage] = useState("EN");

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
      <Footer />
      
      {/* Floating Language Selector */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-5 py-3 rounded-full flex items-center space-x-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white font-bold text-base min-w-[80px]"
          onClick={() => setLanguage(language === "EN" ? "ES" : "EN")}
          data-testid="button-language-selector-floating"
        >
          <span>{language}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 px-6 py-3 rounded-full flex items-center space-x-3 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white font-bold text-base min-w-[200px]"
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          data-testid="button-book-call-floating"
        >
          <Calendar className="w-5 h-5" />
          <span>Book my Free Call</span>
        </button>
      </div>
    </div>
  );
}
