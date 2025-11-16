import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DigestiveSystem = () => {
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);

  const organs = {
    mouth: {
      name: "Mouth",
      function: "Mechanical breakdown and initial digestion with saliva",
      color: "#F59E0B",
      position: "top-0 left-1/2 -translate-x-1/2",
    },
    esophagus: {
      name: "Esophagus",
      function: "Transport food to stomach via peristalsis",
      color: "#EC4899",
      position: "top-12 left-1/2 -translate-x-1/2",
    },
    stomach: {
      name: "Stomach",
      function: "Chemical digestion with acids and enzymes",
      color: "#EF4444",
      position: "top-24 left-1/2 -translate-x-1/2",
    },
    smallIntestine: {
      name: "Small Intestine",
      function: "Nutrient absorption into bloodstream",
      color: "#10B981",
      position: "top-40 left-1/2 -translate-x-1/2",
    },
    largeIntestine: {
      name: "Large Intestine",
      function: "Water absorption and waste formation",
      color: "#3B82F6",
      position: "bottom-12 left-1/2 -translate-x-1/2",
    },
  };

  return (
    <div className="space-y-6">
      {/* Visualization */}
      <div className="relative h-96 bg-gradient-to-b from-muted/20 to-muted/40 rounded-2xl p-8 border-2 border-border">
        <div className="relative h-full max-w-xs mx-auto">
          {Object.entries(organs).map(([key, organ]) => (
            <div
              key={key}
              className={`absolute ${organ.position} cursor-pointer transition-all hover:scale-110`}
              onClick={() => setActiveOrgan(key)}
            >
              <div
                className="w-16 h-12 rounded-lg shadow-glow flex items-center justify-center animate-pulse-slow"
                style={{ backgroundColor: organ.color }}
              >
                <span className="text-white text-xs font-bold text-center px-1">
                  {organ.name.split(" ")[0]}
                </span>
              </div>
            </div>
          ))}

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            <line x1="50%" y1="8%" x2="50%" y2="92%" stroke="#94A3B8" strokeWidth="3" strokeDasharray="5,5" />
          </svg>
        </div>
      </div>

      {/* Active Organ Info */}
      {activeOrgan && (
        <Card className="glass-effect border-2 animate-scale-in" style={{ borderColor: organs[activeOrgan as keyof typeof organs].color }}>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: organs[activeOrgan as keyof typeof organs].color }}
                >
                  <span className="text-white font-bold text-lg">
                    {organs[activeOrgan as keyof typeof organs].name[0]}
                  </span>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: organs[activeOrgan as keyof typeof organs].color }}>
                  {organs[activeOrgan as keyof typeof organs].name}
                </h3>
              </div>
              <p className="text-muted-foreground text-lg">
                {organs[activeOrgan as keyof typeof organs].function}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Organ List */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Digestive System Parts
        </h4>
        <div className="grid gap-2">
          {Object.entries(organs).map(([key, organ]) => (
            <div
              key={key}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 cursor-pointer transition-all"
              onClick={() => setActiveOrgan(key)}
            >
              <div
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: organ.color }}
              />
              <div className="flex-1">
                <p className="font-medium">{organ.name}</p>
                <p className="text-xs text-muted-foreground">{organ.function}</p>
              </div>
              {activeOrgan === key && (
                <Badge variant="secondary">Selected</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
