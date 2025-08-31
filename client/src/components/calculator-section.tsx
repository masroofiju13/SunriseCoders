import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertCalculator } from "@shared/schema";

type ProcessType = "workflow" | "document" | "customer" | "sales" | "custom";

interface ProcessConfig {
  id: ProcessType;
  name: string;
  aiCost: number;
  features: string[];
  efficiency: number;
}

const processConfigs: Record<ProcessType, ProcessConfig> = {
  workflow: {
    id: "workflow",
    name: "Workflow Automation",
    aiCost: 330,
    features: [
      "Advanced AI tools and systems",
      "Automated processes and workflows", 
      "24/7 operation without downtime",
      "Reduced need for manual intervention"
    ],
    efficiency: 0.84
  },
  document: {
    id: "document", 
    name: "Document/Data Processing",
    aiCost: 264,
    features: [
      "Pay only for actual automated work",
      "Unlimited scaling capability",
      "100% process consistency",
      "24/7 availability, no fatigue"
    ],
    efficiency: 0.87
  },
  customer: {
    id: "customer",
    name: "Customer Support Automation", 
    aiCost: 396,
    features: [
      "Pay only for actual automated work",
      "Unlimited scaling capability", 
      "100% process consistency",
      "24/7 availability, no fatigue"
    ],
    efficiency: 0.80
  },
  sales: {
    id: "sales",
    name: "Sales/Lead Automation",
    aiCost: 495,
    features: [
      "Pay only for actual automated work",
      "Unlimited scaling capability",
      "100% process consistency", 
      "24/7 availability, no fatigue"
    ],
    efficiency: 0.75
  },
  custom: {
    id: "custom",
    name: "Custom Project",
    aiCost: 450,
    features: [
      "Tailored AI solutions",
      "Custom integration capabilities",
      "Scalable architecture",
      "Ongoing support and optimization"
    ],
    efficiency: 0.78
  }
};

export default function CalculatorSection() {
  const [selectedProcess, setSelectedProcess] = useState<ProcessType>("workflow");
  const [laborCost, setLaborCost] = useState(2000);
  const [tasksPerDay, setTasksPerDay] = useState(250);
  const [completionRate, setCompletionRate] = useState(30);
  const [taskDuration, setTaskDuration] = useState(2);
  const [workingDays, setWorkingDays] = useState(22);
  
  const [results, setResults] = useState({
    currentCost: 2000,
    aiCost: 330,
    monthlySavings: 1670,
    percentageSavings: 84,
    annualSavings: 20040
  });

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

  useEffect(() => {
    const config = processConfigs[selectedProcess];
    const currentCost = laborCost + (tasksPerDay * workingDays * 0.5);
    const aiCost = config.aiCost;
    const monthlySavings = currentCost - aiCost;
    const percentageSavings = Math.round((monthlySavings / currentCost) * 100);
    const annualSavings = monthlySavings * 12;

    const newResults = {
      currentCost,
      aiCost,
      monthlySavings,
      percentageSavings,
      annualSavings
    };

    setResults(newResults);

    // Auto-save calculation
    calculatorMutation.mutate({
      laborCost,
      operationalCost: tasksPerDay,
      workingDays,
      monthlySavings,
      annualSavings
    });
  }, [selectedProcess, laborCost, tasksPerDay, completionRate, taskDuration, workingDays]);

  const currentConfig = processConfigs[selectedProcess];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Estimate Your Savings with <span className="text-green-400">AI Automation</span>
          </h2>
        </div>

        <div className="calculator-display rounded-2xl p-8 glassmorphism">
          {/* Process Type Selection */}
          <div className="text-center mb-8">
            <h3 className="text-white text-lg mb-4">Select Process Type</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {Object.values(processConfigs).map((config) => (
                <button
                  key={config.id}
                  onClick={() => setSelectedProcess(config.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedProcess === config.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  data-testid={`button-process-${config.id}`}
                >
                  {config.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Calculate Your Costs */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Calculate Your Costs</h3>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">Monthly Human Labor Cost ($)</label>
                <input 
                  type="number" 
                  value={laborCost}
                  onChange={(e) => setLaborCost(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  data-testid="input-labor-cost"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Tasks per Day</label>
                <input 
                  type="number" 
                  value={tasksPerDay}
                  onChange={(e) => setTasksPerDay(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  data-testid="input-tasks-per-day"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Completion Rate (%)</label>
                <input 
                  type="number" 
                  value={completionRate}
                  onChange={(e) => setCompletionRate(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  data-testid="input-completion-rate"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Avg. Task Duration (min)</label>
                <input 
                  type="number" 
                  value={taskDuration}
                  onChange={(e) => setTaskDuration(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  data-testid="input-task-duration"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Working Days per Month</label>
                <input 
                  type="number" 
                  value={workingDays}
                  onChange={(e) => setWorkingDays(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-3"
                  data-testid="input-working-days"
                />
              </div>
            </div>

            {/* Your Potential Savings */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Your Potential Savings</h3>
              
              <div className="space-y-4">
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-400" data-testid="text-current-cost">
                    ${results.currentCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">per month</div>
                  <ul className="text-xs text-gray-400 mt-2 space-y-1">
                    <li>• Fixed monthly cost regardless of task volume</li>
                    <li>• Limited scalability</li>
                    <li>• Variable quality and process adherence</li>
                    <li>• Human fatigue and turnover</li>
                  </ul>
                </div>

                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400" data-testid="text-ai-cost">
                    ${results.aiCost}
                  </div>
                  <div className="text-sm text-gray-300">per month</div>
                  <ul className="text-xs text-gray-400 mt-2 space-y-1">
                    {currentConfig.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2" data-testid="text-monthly-savings">
              ${results.monthlySavings.toLocaleString()} <span className="text-lg">Absolute Savings</span>
            </div>
            <div className="text-lg text-white mb-1">
              <span className="font-bold" data-testid="text-percentage-savings">{results.percentageSavings}%</span> Cost Reduction
            </div>
            <div className="text-sm text-white/80 mb-4">
              Annual Savings: <span className="font-bold" data-testid="text-annual-savings">${results.annualSavings.toLocaleString()}</span>
            </div>
            
            <div className="text-xs text-white/70 space-y-1">
              <p>Calculation assumptions: This calculator provides only a rough estimate for typical business processes. Actual savings may vary depending on your specific case.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-xs">
                <p>• {Math.round(laborCost/22)} tasks per day • {workingDays} working days per month • ${Math.round(laborCost/(tasksPerDay * workingDays))} / working days per month</p>
                <p>• {completionRate}% completion rate (%) • {Math.round(tasksPerDay/24)} tasks per day completion rate (%) / working days per month</p>
                <p>• Total AI minutes: {Math.round(tasksPerDay * taskDuration)} / working days per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}