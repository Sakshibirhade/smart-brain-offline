import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AtomStructure = () => {
  const [selectedAtom, setSelectedAtom] = useState<"hydrogen" | "carbon" | "oxygen" | "sodium">("hydrogen");

  const atoms = {
    hydrogen: {
      name: "Hydrogen",
      symbol: "H",
      atomicNumber: 1,
      electrons: [1],
      neutrons: 0,
      protons: 1,
      color: "hsl(var(--primary))",
    },
    carbon: {
      name: "Carbon",
      symbol: "C",
      atomicNumber: 6,
      electrons: [2, 4],
      neutrons: 6,
      protons: 6,
      color: "#10B981",
    },
    oxygen: {
      name: "Oxygen",
      symbol: "O",
      atomicNumber: 8,
      electrons: [2, 6],
      neutrons: 8,
      protons: 8,
      color: "#3B82F6",
    },
    sodium: {
      name: "Sodium",
      symbol: "Na",
      atomicNumber: 11,
      electrons: [2, 8, 1],
      neutrons: 12,
      protons: 11,
      color: "#F59E0B",
    },
  };

  const atom = atoms[selectedAtom];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Atomic Structure Model</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(atoms).map((key) => (
          <Button
            key={key}
            variant={selectedAtom === key ? "default" : "outline"}
            onClick={() => setSelectedAtom(key as typeof selectedAtom)}
            className="capitalize"
          >
            {atoms[key as keyof typeof atoms].name}
          </Button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex items-center justify-center">
          <svg width="300" height="300" viewBox="-150 -150 300 300">
            {/* Nucleus */}
            <g>
              <circle cx="0" cy="0" r="20" fill={atom.color} opacity="0.8" />
              <text x="0" y="0" textAnchor="middle" dy=".3em" fill="white" fontSize="12" fontWeight="bold">
                {atom.symbol}
              </text>
              <text x="0" y="15" textAnchor="middle" fontSize="10" fill="white">
                {atom.protons}p+ {atom.neutrons}n
              </text>
            </g>

            {/* Electron shells */}
            {atom.electrons.map((electronCount, shellIndex) => {
              const radius = 40 + shellIndex * 35;
              return (
                <g key={shellIndex}>
                  {/* Orbit */}
                  <circle
                    cx="0"
                    cy="0"
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  
                  {/* Electrons */}
                  {Array.from({ length: electronCount }).map((_, electronIndex) => {
                    const angle = (electronIndex * 360) / electronCount;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);
                    return (
                      <circle
                        key={electronIndex}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#EF4444"
                        stroke="white"
                        strokeWidth="1"
                      >
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from={`${angle} 0 0`}
                          to={`${angle + 360} 0 0`}
                          dur={`${3 + shellIndex}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-2">{atom.name} ({atom.symbol})</h4>
            <p className="text-sm text-muted-foreground mb-4">Atomic Number: {atom.atomicNumber}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: atom.color }}></div>
              <span className="text-sm"><strong>Protons:</strong> {atom.protons}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-muted"></div>
              <span className="text-sm"><strong>Neutrons:</strong> {atom.neutrons}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-destructive"></div>
              <span className="text-sm"><strong>Electrons:</strong> {atom.electrons.reduce((a, b) => a + b, 0)}</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h5 className="font-semibold mb-2">Electron Configuration:</h5>
            <p className="text-sm">
              {atom.electrons.map((count, index) => `Shell ${index + 1}: ${count}`).join(", ")}
            </p>
            <p className="text-sm mt-2">
              <strong>Electronic configuration:</strong> {atom.electrons.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AtomStructure;
