import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wind, Activity } from "lucide-react";

export const RespiratorySystem = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "exhale">("inhale");

  const respiratoryParts = {
    nose: {
      name: "Nose & Nasal Cavity",
      function: "Filters, warms, and humidifies incoming air",
      color: "#8B5CF6",
    },
    trachea: {
      name: "Trachea (Windpipe)",
      function: "Carries air from throat to bronchi; protected by cartilage rings",
      color: "#3B82F6",
    },
    bronchi: {
      name: "Bronchi",
      function: "Two main tubes that branch from trachea into each lung",
      color: "#06B6D4",
    },
    lungs: {
      name: "Lungs",
      function: "Main organs of respiration; exchange oxygen and carbon dioxide",
      color: "#EF4444",
    },
    alveoli: {
      name: "Alveoli",
      function: "Tiny air sacs where gas exchange occurs with blood",
      color: "#F59E0B",
    },
    diaphragm: {
      name: "Diaphragm",
      function: "Muscle that contracts to allow inhalation and relaxes for exhalation",
      color: "#10B981",
    },
  };

  return (
    <div className="space-y-6">
      {/* Breathing Animation Control */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Wind className={`w-8 h-8 ${breathPhase === "inhale" ? "text-blue-500" : "text-green-500"}`} />
              <div>
                <h4 className="font-bold">Breathing Phase</h4>
                <p className="text-sm text-muted-foreground">
                  {breathPhase === "inhale" ? "Oxygen In" : "Carbon Dioxide Out"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={breathPhase === "inhale" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setBreathPhase("inhale")}
              >
                Inhale
              </Badge>
              <Badge
                variant={breathPhase === "exhale" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setBreathPhase("exhale")}
              >
                Exhale
              </Badge>
            </div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm">
              {breathPhase === "inhale" ? (
                <span>
                  <strong className="text-blue-500">Inhalation:</strong> Diaphragm contracts and moves down, chest cavity expands, air rushes in
                </span>
              ) : (
                <span>
                  <strong className="text-green-500">Exhalation:</strong> Diaphragm relaxes and moves up, chest cavity decreases, air is pushed out
                </span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Respiratory System Diagram */}
      <div className="relative h-96 bg-gradient-to-b from-muted/20 to-muted/40 rounded-2xl p-8 border-2 border-border">
        <div className="relative h-full max-w-sm mx-auto">
          {/* Nose/Nasal Cavity */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-12 rounded-t-full cursor-pointer transition-all hover:scale-110"
            style={{ backgroundColor: respiratoryParts.nose.color }}
            onClick={() => setSelectedPart("nose")}
          >
            <p className="text-white text-xs text-center mt-2 font-bold">Nose</p>
          </div>

          {/* Trachea */}
          <div
            className="absolute top-16 left-1/2 -translate-x-1/2 w-8 h-24 cursor-pointer transition-all hover:scale-110 rounded-lg"
            style={{ backgroundColor: respiratoryParts.trachea.color }}
            onClick={() => setSelectedPart("trachea")}
          />

          {/* Bronchi */}
          <div className="absolute top-36 left-1/2 -translate-x-1/2 w-32 h-2">
            <div
              className="absolute left-0 w-16 h-16 cursor-pointer transition-all hover:scale-110 rounded-lg"
              style={{
                backgroundColor: respiratoryParts.bronchi.color,
                transform: "rotate(-30deg) translateY(8px)",
              }}
              onClick={() => setSelectedPart("bronchi")}
            />
            <div
              className="absolute right-0 w-16 h-16 cursor-pointer transition-all hover:scale-110 rounded-lg"
              style={{
                backgroundColor: respiratoryParts.bronchi.color,
                transform: "rotate(30deg) translateY(8px)",
              }}
              onClick={() => setSelectedPart("bronchi")}
            />
          </div>

          {/* Lungs */}
          <div className="absolute top-44 left-1/2 -translate-x-1/2 w-48 flex justify-between gap-2">
            <div
              className={`w-20 h-32 rounded-3xl cursor-pointer transition-all ${
                breathPhase === "inhale" ? "scale-105" : "scale-95"
              } hover:scale-110`}
              style={{ backgroundColor: respiratoryParts.lungs.color }}
              onClick={() => setSelectedPart("lungs")}
            >
              <p className="text-white text-xs text-center mt-12 font-bold">Left Lung</p>
            </div>
            <div
              className={`w-20 h-32 rounded-3xl cursor-pointer transition-all ${
                breathPhase === "inhale" ? "scale-105" : "scale-95"
              } hover:scale-110`}
              style={{ backgroundColor: respiratoryParts.lungs.color }}
              onClick={() => setSelectedPart("lungs")}
            >
              <p className="text-white text-xs text-center mt-12 font-bold">Right Lung</p>
            </div>
          </div>

          {/* Diaphragm */}
          <div
            className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-40 h-6 rounded-full cursor-pointer transition-all hover:scale-110 ${
              breathPhase === "inhale" ? "translate-y-2" : "-translate-y-2"
            }`}
            style={{ backgroundColor: respiratoryParts.diaphragm.color }}
            onClick={() => setSelectedPart("diaphragm")}
          >
            <p className="text-white text-xs text-center font-bold">Diaphragm</p>
          </div>
        </div>
      </div>

      {/* Selected Part Info */}
      {selectedPart && (
        <Card className="glass-effect border-2 animate-scale-in" style={{ borderColor: respiratoryParts[selectedPart as keyof typeof respiratoryParts].color }}>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: respiratoryParts[selectedPart as keyof typeof respiratoryParts].color }}
                >
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: respiratoryParts[selectedPart as keyof typeof respiratoryParts].color }}>
                  {respiratoryParts[selectedPart as keyof typeof respiratoryParts].name}
                </h3>
              </div>
              <p className="text-muted-foreground text-lg">
                {respiratoryParts[selectedPart as keyof typeof respiratoryParts].function}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Respiratory Parts List */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Respiratory System Parts
        </h4>
        <div className="grid gap-2">
          {Object.entries(respiratoryParts).map(([key, part]) => (
            <div
              key={key}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 cursor-pointer transition-all"
              onClick={() => setSelectedPart(key)}
            >
              <div
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: part.color }}
              />
              <div className="flex-1">
                <p className="font-medium">{part.name}</p>
                <p className="text-xs text-muted-foreground">{part.function}</p>
              </div>
              {selectedPart === key && (
                <Badge variant="secondary">Selected</Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gas Exchange Info */}
      <Card className="bg-gradient-to-r from-red-500/10 to-blue-500/10 border-2">
        <CardContent className="pt-6">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Gas Exchange Process
          </h4>
          <div className="space-y-3">
            <div className="bg-background/50 p-3 rounded-lg">
              <p className="font-semibold text-sm mb-1 text-blue-500">Oxygen (O₂)</p>
              <p className="text-xs text-muted-foreground">
                Moves from alveoli → blood → body cells for energy production
              </p>
            </div>
            <div className="bg-background/50 p-3 rounded-lg">
              <p className="font-semibold text-sm mb-1 text-green-500">Carbon Dioxide (CO₂)</p>
              <p className="text-xs text-muted-foreground">
                Waste product moves from body cells → blood → alveoli → exhaled
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
