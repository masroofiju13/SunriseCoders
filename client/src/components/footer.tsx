import { Mail } from "lucide-react";
import { SiLinkedin, SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-gray-400 mb-4 md:mb-0">
            2025 Sunrise AI Solutions. All Rights Reserved.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-3 mb-4 md:mb-0">
            <a 
              href="https://www.linkedin.com/in/masroof-amin-39894789/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300"
              data-testid="link-footer-linkedin"
            >
              <SiLinkedin className="text-lg text-white" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 hover:from-yellow-500 hover:via-red-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300"
              data-testid="link-footer-instagram"
            >
              <SiInstagram className="text-lg text-white" />
            </a>
            <a 
              href="https://www.youtube.com/@SunriseAISolutions" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-all duration-300"
              data-testid="link-footer-youtube"
            >
              <SiYoutube className="text-lg text-white" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300"
              data-testid="link-footer-facebook"
            >
              <SiFacebook className="text-lg text-white" />
            </a>
            <a 
              href="mailto:contact@sunriseai.com" 
              className="w-8 h-8 bg-gray-600 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300"
              data-testid="link-footer-email"
            >
              <Mail className="text-lg text-white" />
            </a>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">AI Solutions</a>
            <a href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">Our Services</a>
            <button onClick={scrollToTop} className="text-gray-400 hover:text-purple-400 transition-colors">On Top</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
