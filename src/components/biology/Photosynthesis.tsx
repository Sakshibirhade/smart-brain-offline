import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Droplets, Wind, Leaf } from "lucide-react";

export const Photosynthesis = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Light Absorption",
      description: "Chlorophyll in chloroplasts absorbs sunlight energy",
      icon: Sun,
      color: "#F59E0B",
      input: "Sunlight",
    },
    {
      id: 2,
      title: "Water Splitting",
      description: "Water molecules are split into hydrogen and oxygen",
      icon: Droplets,
      color: "#3B82F6",
      input: "H₂O (Water)",
    },
    {
      id: 3,
      title: "Carbon Dioxide Fixation",
      description: "CO₂ from air is captured and used in the process",
      icon: Wind,
      color: "#8B5CF6",
      input: "CO₂ (Carbon Dioxide)",
    },
    {
      id: 4,
      title: "Glucose Production",
      description: "Energy is stored as glucose (sugar) for the plant",
      icon: Leaf,
      color: "#10B981",
      output: "C₆H₁₂O₆ (Glucose) + O₂ (Oxygen)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Process Flow */}
      <div className="relative bg-gradient-to-br from-green-500/10 via-yellow-500/10 to-blue-500/10 rounded-2xl p-8 border-2 border-border">
        <h3 className="text-center font-bold text-xl mb-6 gradient-text">
          6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                <Card
                  className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                    activeStep === step.id ? "shadow-glow" : ""
                  }`}
                  style={{
                    borderColor: activeStep === step.id ? step.color : "transparent",
                  }}
                  onClick={() => setActiveStep(step.id)}
                >
                  <CardContent className="pt-6 space-y-3">
                    <div
                      className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center animate-pulse-slow"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        Step {step.id}
                      </Badge>
                      <h4 className="font-bold text-sm">{step.title}</h4>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-primary text-2xl">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Step Details */}
      {activeStep && (
        <Card className="glass-effect border-2 animate-scale-in" style={{ borderColor: steps[activeStep - 1].color }}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: steps[activeStep - 1].color }}
                >
                  {(() => {
                    const Icon = steps[activeStep - 1].icon;
                    return <Icon className="w-7 h-7 text-white" />;
                  })()}
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Step {activeStep}</Badge>
                  <h3 className="text-xl font-bold" style={{ color: steps[activeStep - 1].color }}>
                    {steps[activeStep - 1].title}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground text-lg">
                {steps[activeStep - 1].description}
              </p>
              {steps[activeStep - 1].input && (
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Input:</p>
                  <p className="font-semibold">{steps[activeStep - 1].input}</p>
                </div>
              )}
              {steps[activeStep - 1].output && (
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Output:</p>
                  <p className="font-semibold">{steps[activeStep - 1].output}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chloroplast Diagram */}
      <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-lg">Where Does It Happen?</h4>
          </div>
          <p className="text-muted-foreground mb-4">
            Photosynthesis occurs in <strong>chloroplasts</strong>, specifically in structures called <strong>thylakoids</strong> and the <strong>stroma</strong>.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background/50 p-3 rounded-lg">
              <p className="font-semibold text-sm mb-1">Light Reactions</p>
              <p className="text-xs text-muted-foreground">Occur in thylakoid membranes</p>
            </div>
            <div className="bg-background/50 p-3 rounded-lg">
              <p className="font-semibold text-sm mb-1">Dark Reactions (Calvin Cycle)</p>
              <p className="text-xs text-muted-foreground">Occur in the stroma</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Facts */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
        <CardContent className="pt-6">
          <h4 className="font-bold mb-3">Photosynthesis Facts</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Badge variant="outline">1</Badge>
              <span>Plants produce oxygen as a byproduct - essential for life!</span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline">2</Badge>
              <span>Chlorophyll makes plants green and captures light energy</span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline">3</Badge>
              <span>This process is the basis of most food chains on Earth</span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline">4</Badge>
              <span>Photosynthesis removes CO₂ from the atmosphere</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
