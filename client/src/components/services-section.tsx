import { Mic, Target, Settings, Brain, Check } from "lucide-react";

const services = [
  {
    id: "voice-agents",
    icon: Mic,
    iconColor: "bg-green-500",
    checkColor: "text-green-400",
    title: "AI-Powered Voice Agents",
    subtitle: "Get a 24/7 AI receptionist for your business.",
    description: "Smart voice agents that handle client calls, schedule appointments, and answer questions automatically.",
    features: [
      "Automated Call Handling",
      "Smart Scheduling",
      "FAQ Management",
      "Transcription Recording"
    ]
  },
  {
    id: "lead-generation",
    icon: Target,
    iconColor: "bg-yellow-500",
    checkColor: "text-yellow-400",
    title: "Lead Generation Automation",
    subtitle: "Get high-quality leads on autopilot.",
    description: "AI-powered systems that identify and engage potential clients around the clock.",
    features: [
      "AI Lead Scoring",
      "Personalized Outreach",
      "Smart Follow-Ups",
      "Business automation solutions - lead generation"
    ]
  },
  {
    id: "workflow-automation",
    icon: Settings,
    iconColor: "bg-blue-500",
    checkColor: "text-blue-400",
    title: "Workflow & Business Process Automation",
    subtitle: "Automate repetitive tasks, documents, and internal workflows.",
    description: "Custom solutions designed to eliminate manual work, reduce costs, and scale operations effortlessly.",
    features: [
      "Contract & document automation",
      "Billing & approval workflows",
      "Task and case management",
      "AI-powered tools for internal processes and customer interaction"
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
          <p className="text-gray-300 text-lg">Discover how our AI-powered solutions can transform your business.</p>
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
