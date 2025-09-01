import { Bot } from "lucide-react";
import { SiLinkedin, SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="text-2xl text-purple-400" />
              <span className="text-xl font-bold text-white">Sunrise AI</span>
            </div>
            <p className="text-gray-300 mb-4">Transforming businesses through intelligent automation and AI-powered solutions. Experience the future of efficient operations today.</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                data-testid="link-social-linkedin"
              >
                <SiLinkedin className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                data-testid="link-social-facebook"
              >
                <SiFacebook className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-purple-400 transition-colors">AI Voice Agents</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Lead Generation</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Workflow Automation</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Custom AI Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Sunrise AI Solutions. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                data-testid="link-footer-linkedin"
              >
                <SiLinkedin className="text-lg" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                data-testid="link-footer-instagram"
              >
                <SiInstagram className="text-lg" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                data-testid="link-footer-youtube"
              >
                <SiYoutube className="text-lg" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors"
                data-testid="link-footer-facebook"
              >
                <SiFacebook className="text-lg" />
              </a>
            </div>
            
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Solutions</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Our Services</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">On Top</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
