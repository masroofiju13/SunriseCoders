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
            2025 SmartProAI Solutions. All Rights Reserved.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href="#" 
              className="text-gray-400 hover:text-blue-400 transition-colors"
              data-testid="link-footer-linkedin"
            >
              <SiLinkedin className="text-xl" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-pink-400 transition-colors"
              data-testid="link-footer-instagram"
            >
              <SiInstagram className="text-xl" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-red-400 transition-colors"
              data-testid="link-footer-youtube"
            >
              <SiYoutube className="text-xl" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-blue-400 transition-colors"
              data-testid="link-footer-facebook"
            >
              <SiFacebook className="text-xl" />
            </a>
            <a 
              href="mailto:contact@smartproai.com" 
              className="text-gray-400 hover:text-green-400 transition-colors"
              data-testid="link-footer-email"
            >
              <Mail className="text-xl" />
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
