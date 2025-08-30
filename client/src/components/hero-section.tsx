import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";

export default function HeroSection() {
  const [language, setLanguage] = useState("EN");

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="top"
      className="hero-bg min-h-screen flex items-center justify-center relative geometric-pattern"
    >
      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI</span> Take Care of 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> Everything</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          <span className="text-green-400 font-semibold">Lower costs, save time,</span> and experience 
          <span className="text-purple-400 font-semibold"> life-changing efficiency.</span>
        </p>

        <button 
          className="gradient-button px-12 py-4 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform"
          onClick={scrollToBooking}
          data-testid="button-book-free-call-hero"
        >
          Book my Free Call
        </button>
      </div>

      {/* Language Selector */}
      <div className="absolute bottom-8 left-8">
        <button 
          className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center space-x-2"
          onClick={() => setLanguage(language === "EN" ? "ES" : "EN")}
          data-testid="button-language-selector"
        >
          <span>{language}</span>
          <ChevronDown className="text-xs" />
        </button>
      </div>

      {/* Floating CTA */}
      <div className="absolute bottom-8 right-8">
        <button 
          className="gradient-button px-6 py-3 rounded-full text-white font-semibold flex items-center space-x-2"
          onClick={scrollToBooking}
          data-testid="button-book-call-floating"
        >
          <Calendar className="w-4 h-4" />
          <span>Book my Free Call</span>
        </button>
      </div>
    </section>
  );
}
