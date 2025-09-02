import { Mic, Sparkles, Droplet, Brain, Check } from "lucide-react";

const services = [
  {
    id: "voice-agents",
    icon: Mic,
    iconColor: "bg-green-500",
    checkColor: "text-green-400",
    title: "AI Voice Agents",
    subtitle: "Convert more clients with AI Receptionists.",
    description: "We create advanced AI voice agents tailored to your business usecase.",
    features: [
      "Answer calls 24/7",
      "Qualify Leads",
      "Book appointments"
    ]
  },
  {
    id: "content-generation",
    icon: Sparkles,
    iconColor: "bg-yellow-500",
    checkColor: "text-yellow-400",
    title: "Content Generation",
    subtitle: "Repurpose your existing content.",
    description: "We generated over 700k views in 28 days using our in-house AI agent.",
    features: [
      "Get more content with no work",
      "Get more 5x leads",
      "Fully automated"
    ]
  },
  {
    id: "ai-apps-development",
    icon: Droplet,
    iconColor: "bg-blue-500",
    checkColor: "text-blue-400",
    title: "AI Apps Development",
    subtitle: "Get your idea built within 2-4 weeks.",
    description: "We've built over 15 AI apps, from chatbots to marketing tools.",
    features: [
      "Sleek designs",
      "Complete functionality",
      "Deployed online"
    ]
  },
  {
    id: "custom-solutions",
    icon: Brain,
    iconColor: "bg-purple-500",
    checkColor: "text-purple-400",
    title: "Custom AI Solutions",
    subtitle: "We deploy AI Solutions that deliver instant, reliable customer interactions 24/7.",
    description: "Build on enterprise-grade architecture, our solutions reduce support costs by up to 70% in the first month—no downtime, no mistakes, no limits.",
    features: [
      "AI Powered Web Platforms",
      "iOS & Android App Development",
      "Integration with Existing Business Systems"
    ]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="pt-8 pb-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-yellow-400">Our Services</span>
          </h2>
          <p className="text-gray-300 text-lg">We leverage state-of-the-art AI to help your business grow.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="service-card rounded-xl p-6" data-testid={`card-service-${service.id}`}>
                <div className={`w-12 h-12 ${service.iconColor} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{service.subtitle}</p>
                <p className="text-gray-400 text-sm mb-6">{service.description}</p>
                
                <ul className="space-y-2 text-sm text-gray-300">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className={`${service.checkColor} mr-2 w-4 h-4`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
