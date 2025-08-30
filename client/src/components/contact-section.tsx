import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Shield, Headphones, TrendingUp, Phone } from "lucide-react";
import type { InsertContact } from "@shared/schema";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your interest! We will contact you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Started with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Transformation</span>
          </h2>
          <p className="text-gray-300 text-lg">Ready to revolutionize your business? Let's discuss your AI automation needs.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glassmorphism rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Start Your AI Journey</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3" 
                  placeholder="Enter your full name"
                  data-testid="input-contact-name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Business Email *</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3" 
                  placeholder="your@company.com"
                  data-testid="input-contact-email"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Company Name</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3" 
                  placeholder="Your company name"
                  data-testid="input-contact-company"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3" 
                  placeholder="+1 (555) 000-0000"
                  data-testid="input-contact-phone"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">How can we help you?</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-input text-foreground border border-border rounded-lg px-4 py-3" 
                  placeholder="Tell us about your business needs and automation goals..."
                  data-testid="textarea-contact-message"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="gradient-button w-full py-3 px-6 rounded-lg text-white font-bold disabled:opacity-50"
                data-testid="button-submit-contact"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message & Book Consultation"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glassmorphism rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Sunrise AI?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Rocket className="text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Rapid Implementation</h4>
                    <p className="text-gray-300 text-sm">Get your AI solutions up and running in days, not months.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Enterprise Security</h4>
                    <p className="text-gray-300 text-sm">Bank-level security with complete data protection and compliance.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Headphones className="text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">24/7 Support</h4>
                    <p className="text-gray-300 text-sm">Round-the-clock technical support and system monitoring.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="text-pink-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Proven ROI</h4>
                    <p className="text-gray-300 text-sm">Average 70% cost reduction with measurable performance improvements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-8 text-center">
              <Phone className="text-4xl text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-2">Ready to Get Started?</h3>
              <p className="text-gray-300 mb-6">Book your free consultation and discover how AI can transform your business operations.</p>
              <button 
                className="gradient-button px-8 py-3 rounded-full text-white font-semibold"
                onClick={scrollToBooking}
                data-testid="button-schedule-call"
              >
                Schedule Free Strategy Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
