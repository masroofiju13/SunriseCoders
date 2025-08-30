import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    id: "1",
    question: "How quickly can we see results with AI automation?",
    answer: "Most clients see immediate improvements in efficiency within the first week of implementation, with full optimization typically achieved within 30 days."
  },
  {
    id: "2", 
    question: "What types of businesses benefit most from AI automation?",
    answer: "Any business with repetitive processes, customer service needs, or data management challenges can benefit significantly from AI automation."
  },
  {
    id: "3",
    question: "Is AI automation suitable for small and medium businesses?", 
    answer: "Absolutely! Our AI solutions are scalable and can be customized for businesses of all sizes, providing cost-effective automation regardless of company size."
  },
  {
    id: "4",
    question: "What support and maintenance do you provide after implementation?",
    answer: "We provide comprehensive 24/7 support, regular system updates, performance monitoring, and continuous optimization to ensure your AI solutions operate at peak efficiency."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleFAQ = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-purple-400">Frequently Asked Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="glassmorphism rounded-xl overflow-hidden">
              <button 
                className="w-full text-left p-6 flex items-center justify-between text-white hover:bg-purple-600/20 transition-colors"
                onClick={() => toggleFAQ(item.id)}
                data-testid={`button-faq-${item.id}`}
              >
                <span className="font-semibold">{item.question}</span>
                <ChevronDown 
                  className={`transition-transform ${
                    openItems.includes(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openItems.includes(item.id) && (
                <div className="p-6 pt-0 text-gray-300" data-testid={`text-faq-answer-${item.id}`}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
