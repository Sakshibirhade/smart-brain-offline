import { useState } from "react";
import { Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const HeartDiagram = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const heartParts = {
    rightAtrium: {
      name: "Right Atrium",
      description: "Receives deoxygenated blood from the body",
      color: "#3B82F6",
    },
    rightVentricle: {
      name: "Right Ventricle",
      description: "Pumps blood to the lungs for oxygenation",
      color: "#60A5FA",
    },
    leftAtrium: {
      name: "Left Atrium",
      description: "Receives oxygenated blood from the lungs",
      color: "#EF4444",
    },
    leftVentricle: {
      name: "Left Ventricle",
      description: "Pumps oxygenated blood to the entire body",
      color: "#DC2626",
    },
  };

  return (
    <div className="space-y-6">
      {/* Heart Diagram */}
      <div className="relative w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-muted/20 to-muted/40 rounded-2xl p-8 border-2 border-border">
        <div className="relative w-full h-full">
          {/* Left Side (Oxygenated - Red) */}
          <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col gap-2">
            {/* Left Atrium */}
            <div
              className="flex-1 cursor-pointer transition-all hover:scale-105 rounded-tl-2xl p-4 flex items-center justify-center border-2 border-white/20"
              style={{ backgroundColor: heartParts.leftAtrium.color }}
              onClick={() => setActiveSection("leftAtrium")}
            >
              <span className="text-white font-bold text-center text-sm">
                Left Atrium
              </span>
            </div>
            {/* Left Ventricle */}
            <div
              className="flex-[1.5] cursor-pointer transition-all hover:scale-105 rounded-bl-2xl p-4 flex items-center justify-center border-2 border-white/20"
              style={{ backgroundColor: heartParts.leftVentricle.color }}
              onClick={() => setActiveSection("leftVentricle")}
            >
              <span className="text-white font-bold text-center text-sm">
                Left Ventricle
              </span>
            </div>
          </div>

          {/* Right Side (Deoxygenated - Blue) */}
          <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col gap-2">
            {/* Right Atrium */}
            <div
              className="flex-1 cursor-pointer transition-all hover:scale-105 rounded-tr-2xl p-4 flex items-center justify-center border-2 border-white/20"
              style={{ backgroundColor: heartParts.rightAtrium.color }}
              onClick={() => setActiveSection("rightAtrium")}
            >
              <span className="text-white font-bold text-center text-sm">
                Right Atrium
              </span>
            </div>
            {/* Right Ventricle */}
            <div
              className="flex-[1.5] cursor-pointer transition-all hover:scale-105 rounded-br-2xl p-4 flex items-center justify-center border-2 border-white/20"
              style={{ backgroundColor: heartParts.rightVentricle.color }}
              onClick={() => setActiveSection("rightVentricle")}
            >
              <span className="text-white font-bold text-center text-sm">
                Right Ventricle
              </span>
            </div>
          </div>

          {/* Heartbeat Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Activity className="w-12 h-12 text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Info Panel */}
      {activeSection && (
        <Card className="glass-effect border-2 animate-scale-in" style={{ borderColor: heartParts[activeSection as keyof typeof heartParts].color }}>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: heartParts[activeSection as keyof typeof heartParts].color }}
                >
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: heartParts[activeSection as keyof typeof heartParts].color }}>
                  {heartParts[activeSection as keyof typeof heartParts].name}
                </h3>
              </div>
              <p className="text-muted-foreground text-lg">
                {heartParts[activeSection as keyof typeof heartParts].description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Heart Chambers
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(heartParts).map(([key, part]) => (
            <div
              key={key}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 cursor-pointer transition-all"
              onClick={() => setActiveSection(key)}
            >
              <div
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: part.color }}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{part.name}</p>
                {activeSection === key && (
                  <Badge variant="secondary" className="mt-1">Active</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blood Flow Info */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-red-500/10 border-2">
        <CardContent className="pt-6">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Blood Flow Path
          </h4>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Badge variant="outline" className="bg-blue-500/20">1</Badge>
              <span>Deoxygenated blood enters <strong>Right Atrium</strong></span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline" className="bg-blue-400/20">2</Badge>
              <span><strong>Right Ventricle</strong> pumps to lungs</span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline" className="bg-red-500/20">3</Badge>
              <span>Oxygenated blood enters <strong>Left Atrium</strong></span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline" className="bg-red-600/20">4</Badge>
              <span><strong>Left Ventricle</strong> pumps to body</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};
