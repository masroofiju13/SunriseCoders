import { useState } from "react";
import { Bot, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="text-2xl text-purple-400" />
          <span className="text-xl font-bold text-white">SmartPro AI Solutions</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('top')}
            className="text-white hover:text-purple-400 transition-colors"
            data-testid="link-top"
          >
            On Top
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-white hover:text-purple-400 transition-colors"
            data-testid="link-services"
          >
            Solutions
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-white hover:text-purple-400 transition-colors"
            data-testid="link-contact"
          >
            Contact Us
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="text-white hover:text-purple-400 transition-colors"
            data-testid="link-faq"
          >
            FAQ
          </button>
        </div>

        <button 
          className="gradient-button px-6 py-2 rounded-full text-white font-semibold hidden md:block"
          onClick={() => scrollToSection('booking')}
          data-testid="button-book-call-nav"
        >
          Book Your Free Strategy Call
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border">
          <div className="px-6 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('top')}
              className="block text-white hover:text-purple-400 transition-colors"
              data-testid="link-top-mobile"
            >
              On Top
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block text-white hover:text-purple-400 transition-colors"
              data-testid="link-services-mobile"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block text-white hover:text-purple-400 transition-colors"
              data-testid="link-contact-mobile"
            >
              Contact Us
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="block text-white hover:text-purple-400 transition-colors"
              data-testid="link-faq-mobile"
            >
              FAQ
            </button>
            <button 
              className="gradient-button w-full py-2 px-6 rounded-full text-white font-semibold"
              onClick={() => scrollToSection('booking')}
              data-testid="button-book-call-mobile"
            >
              Book Your Free Strategy Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
