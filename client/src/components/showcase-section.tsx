import { useState } from "react";
import ShowcaseModal from "@/components/ui/showcase-modal";

const showcaseItems = [
  {
    id: "medical",
    title: "AI Medical Assistant",
    description: "Advanced healthcare automation and patient interaction system.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Comprehensive AI-powered medical assistant that streamlines patient interactions, automates appointment scheduling, and provides 24/7 healthcare support."
  },
  {
    id: "inventory",
    title: "Smart Device Management",
    description: "Automated monitoring and management for connected devices.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Intelligent device management system that monitors, controls, and optimizes IoT devices across your business infrastructure."
  },
  {
    id: "lead",
    title: "AI Lead Generation",
    description: "Intelligent lead scoring and automated customer acquisition.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Advanced lead generation platform that identifies, scores, and nurtures prospects through intelligent automation and personalized outreach."
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    description: "Comprehensive automation for business processes and document management.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Complete workflow automation solution that digitizes and optimizes business processes, from document handling to approval workflows."
  },
  {
    id: "social",
    title: "Social Media AI",
    description: "Leverage AI innovation for social media management and content creation.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "AI-powered social media management platform that creates content, schedules posts, and analyzes engagement across all platforms."
  },
  {
    id: "baby",
    title: "AI Parenting Baby Product",
    description: "Intelligent solutions for family and parenting automation needs.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Smart parenting assistant that helps families manage schedules, track development milestones, and provide personalized care recommendations."
  }
];

export default function ShowcaseSection() {
  const [selectedItem, setSelectedItem] = useState<typeof showcaseItems[0] | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-yellow-400">Sunrise AI</span> in Action
          </h2>
          <p className="text-gray-300 text-lg">Explore our cutting-edge AI solutions and see how we transform businesses into intelligent enterprises.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item) => (
            <div 
              key={item.id}
              className="glassmorphism rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setSelectedItem(item)}
              data-testid={`card-showcase-${item.id}`}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                <div className="flex space-x-2">
                  <button 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex-1"
                    data-testid={`button-view-demo-${item.id}`}
                  >
                    View Demo
                  </button>
                  <button 
                    className="border border-purple-600 text-purple-400 px-4 py-2 rounded-lg text-sm"
                    data-testid={`button-learn-more-${item.id}`}
                  >
                    Learn
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ShowcaseModal 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </section>
  );
}
