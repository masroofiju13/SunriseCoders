import { X } from "lucide-react";

interface ShowcaseModalProps {
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
    details: string;
  } | null;
  onClose: () => void;
}

export default function ShowcaseModal({ item, onClose }: ShowcaseModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glassmorphism rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            data-testid="button-close-modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-64 object-cover rounded-t-2xl" 
          />
          
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-gray-300 mb-4">{item.description}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{item.details}</p>
            
            <div className="flex space-x-4 mt-8">
              <button 
                className="gradient-button px-6 py-3 rounded-lg text-white font-semibold flex-1"
                data-testid={`button-get-started-${item.id}`}
              >
                Get Started
              </button>
              <button 
                className="border border-purple-600 text-purple-400 px-6 py-3 rounded-lg font-semibold"
                data-testid={`button-learn-more-modal-${item.id}`}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
