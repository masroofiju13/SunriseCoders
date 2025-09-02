import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Users, Clock, DollarSign, Check } from "lucide-react";
import type { InsertCalculator } from "@shared/schema";

interface ServiceOption {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  monthlyPrice: number;
  annualSavings: number;
  benefits: string[];
  color: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "voice-agents",
    icon: Users,
    title: "AI Voice Agents",
    subtitle: "Replace 1-2 receptionist salaries",
    monthlyPrice: 497,
    annualSavings: 48000,
    benefits: [
      "24/7 call handling",
      "Never miss a lead",
      "Instant appointment booking",
      "Professional customer service"
    ],
    color: "bg-green-500"
  },
  {
    id: "content-automation",
    icon: TrendingUp,
    title: "Content Generation",
    subtitle: "Replace content creation team",
    monthlyPrice: 297,
    annualSavings: 36000,
    benefits: [
      "Unlimited content creation",
      "5x more leads generated",
      "Social media automation",
      "SEO-optimized content"
    ],
    color: "bg-yellow-500"
  },
  {
    id: "workflow-automation",
    icon: Clock,
    title: "Workflow Automation",
    subtitle: "Eliminate repetitive tasks",
    monthlyPrice: 397,
    annualSavings: 42000,
    benefits: [
      "Document processing",
      "Data entry automation",
      "Email management",
      "Report generation"
    ],
    color: "bg-blue-500"
  }
];

export default function CalculatorSection() {
  const [selectedService, setSelectedService] = useState<string>("voice-agents");
  const [companySize, setCompanySize] = useState<number>(50);
  const [currentSpending, setCurrentSpending] = useState<number>(5000);

  const { toast } = useToast();

  const calculatorMutation = useMutation({
    mutationFn: async (data: InsertCalculator) => {
      const response = await apiRequest("POST", "/api/calculator", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Calculation Saved",
        description: "Your savings calculation has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save calculation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const selectedOption = serviceOptions.find(option => option.id === selectedService) || serviceOptions[0];
  const monthlySavings = Math.max(0, currentSpending - selectedOption.monthlyPrice);
  const percentageSavings = currentSpending > 0 ? Math.round((monthlySavings / currentSpending) * 100) : 0;
  const annualSavings = monthlySavings * 12;

  return (
    <section className="pt-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Calculate Your <span className="text-green-400">AI Savings</span>
          </h2>
          <p className="text-gray-300 text-lg">See how much your business can save with AI automation</p>
        </div>

        {/* Simple Calculator Inputs */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm text-gray-300 mb-3">Your monthly spending on this process</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="number" 
                  value={currentSpending}
                  onChange={(e) => setCurrentSpending(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg pl-12 pr-4 py-4 text-lg focus:border-green-400 focus:outline-none"
                  placeholder="5,000"
                  data-testid="input-current-spending"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-3">Company size (employees)</label>
              <input 
                type="number" 
                value={companySize}
                onChange={(e) => setCompanySize(Number(e.target.value))}
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-4 text-lg focus:border-green-400 focus:outline-none"
                placeholder="50"
                data-testid="input-company-size"
              />
            </div>
          </div>
        </div>

        {/* Service Options Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {serviceOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedService === option.id;
            
            return (
              <div 
                key={option.id} 
                onClick={() => setSelectedService(option.id)}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isSelected ? 'transform scale-105' : 'hover:transform hover:scale-102'
                }`}
                data-testid={`card-service-option-${option.id}`}
              >
                <div className={`bg-gray-900 rounded-xl p-6 border-2 transition-colors ${
                  isSelected ? 'border-green-400' : 'border-gray-700 hover:border-gray-600'
                }`}>
                  <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="text-white text-xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{option.subtitle}</p>
                  
                  <div className="text-2xl font-bold text-green-400 mb-4">
                    ${option.monthlyPrice}/month
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-300">
                    {option.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="text-green-400 mr-2 w-4 h-4 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Savings Results */}
        <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl p-8 text-center">
          <div className="mb-6">
            <div className="text-5xl font-bold text-white mb-2" data-testid="text-monthly-savings">
              ${monthlySavings.toLocaleString()}
            </div>
            <div className="text-xl text-white/90">Monthly Savings</div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold" data-testid="text-percentage-savings">
                {percentageSavings}%
              </div>
              <div className="text-sm opacity-80">Cost Reduction</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold" data-testid="text-annual-savings">
                ${annualSavings.toLocaleString()}
              </div>
              <div className="text-sm opacity-80">Annual Savings</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">
                ${selectedOption.monthlyPrice}
              </div>
              <div className="text-sm opacity-80">AI Solution Cost</div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-white/70">
            <p>Based on typical business costs. Actual savings may vary depending on your specific requirements.</p>
          </div>
        </div>
      </div>
    </section>
  );
}