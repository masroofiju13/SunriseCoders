import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

    </section>
  );
}
