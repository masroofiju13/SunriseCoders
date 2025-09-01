import { useState } from "react";
import { Play } from "lucide-react";
import ShowcaseModal from "@/components/ui/showcase-modal";

const showcaseItems = [
  {
    id: "medical",
    title: "AI Medical Assistant",
    description: "Intelligent medical consultation system with symptom analysis and treatment recommendations",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Comprehensive AI-powered medical assistant that streamlines patient interactions, automates appointment scheduling, and provides 24/7 healthcare support.",
    demoUrl: "https://www.youtube.com/watch?si=u9OSiABGgrR2QPAV&v=oKNkyYYmRyc&feature=youtu.be",
    tags: ["AI/ML", "Healthcare", "NLP"]
  },
  {
    id: "inventory",
    title: "Smart Device Management",
    description: "Automated monitoring and management for connected devices.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Intelligent device management system that monitors, controls, and optimizes IoT devices across your business infrastructure.",
    demoUrl: "https://www.youtube.com/watch?si=u9OSiABGgrR2QPAV&v=oKNkyYYmRyc&feature=youtu.be"
  },
  {
    id: "lead",
    title: "AI Lead Generation",
    description: "Intelligent lead scoring and automated customer acquisition.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Advanced lead generation platform that identifies, scores, and nurtures prospects through intelligent automation and personalized outreach.",
    demoUrl: "https://www.youtube.com/watch?si=u9OSiABGgrR2QPAV&v=oKNkyYYmRyc&feature=youtu.be"
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    description: "Comprehensive automation for business processes and document management.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Complete workflow automation solution that digitizes and optimizes business processes, from document handling to approval workflows.",
    demoUrl: "https://www.youtube.com/watch?si=u9OSiABGgrR2QPAV&v=oKNkyYYmRyc&feature=youtu.be"
  },
  {
    id: "social",
    title: "Social Media AI",
    description: "Leverage AI innovation for social media management and content creation.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "AI-powered social media management platform that creates content, schedules posts, and analyzes engagement across all platforms.",
    demoUrl: "https://www.youtube.com/watch?si=u9OSiABGgrR2QPAV&v=oKNkyYYmRyc&feature=youtu.be"
  },
  {
    id: "baby",
    title: "AI Parenting Baby Product",
    description: "Intelligent solutions for family and parenting automation needs.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    details: "Smart parenting assistant that helps families manage schedules, track development milestones, and provide personalized care recommendations.",
    demoUrl: "https://www.youtube.com/watch?si=u9OSiABGgrR2QPAV&v=oKNkyYYmRyc&feature=youtu.be"
  }
];

export default function ShowcaseSection() {
  const [selectedItem, setSelectedItem] = useState<typeof showcaseItems[0] | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleViewDemo = (demoUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent modal from opening
    window.open(demoUrl, '_blank');
  };

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
              className="glassmorphism rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 relative group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              data-testid={`card-showcase-${item.id}`}
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover" 
                />
                
                {/* Hover Overlay */}
                {hoveredItem === item.id && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                    <button 
                      onClick={(e) => handleViewDemo(item.demoUrl, e)}
                      className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                
                {/* Tags - only show for medical item */}
                {item.id === "medical" && item.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex space-x-2">
                  <button 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex-1 hover:bg-purple-700 transition-colors"
                    onClick={(e) => handleViewDemo(item.demoUrl, e)}
                    data-testid={`button-view-demo-${item.id}`}
                  >
                    Watch Demo
                  </button>
                  <button 
                    className="border border-purple-600 text-purple-400 px-4 py-2 rounded-lg text-sm hover:bg-purple-600 hover:text-white transition-colors"
                    onClick={() => setSelectedItem(item)}
                    data-testid={`button-learn-more-${item.id}`}
                  >
                    Details
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