import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const PHScale = () => {
  const [pH, setpH] = useState([7]);

  const substances = [
    { name: "Battery Acid", pH: 0, category: "Strong Acid" },
    { name: "Lemon Juice", pH: 2, category: "Acid" },
    { name: "Vinegar", pH: 3, category: "Acid" },
    { name: "Orange Juice", pH: 4, category: "Weak Acid" },
    { name: "Coffee", pH: 5, category: "Weak Acid" },
    { name: "Milk", pH: 6.5, category: "Weak Acid" },
    { name: "Pure Water", pH: 7, category: "Neutral" },
    { name: "Sea Water", pH: 8, category: "Weak Base" },
    { name: "Baking Soda", pH: 9, category: "Base" },
    { name: "Milk of Magnesia", pH: 10.5, category: "Base" },
    { name: "Ammonia", pH: 11.5, category: "Strong Base" },
    { name: "Bleach", pH: 12.5, category: "Strong Base" },
    { name: "Drain Cleaner", pH: 14, category: "Strong Base" },
  ];

  const getpHColor = (value: number) => {
    if (value < 3) return "#DC2626";
    if (value < 5) return "#F97316";
    if (value < 6.5) return "#FBBF24";
    if (value === 7) return "#10B981";
    if (value < 9) return "#3B82F6";
    if (value < 11) return "#6366F1";
    return "#8B5CF6";
  };

  const getpHDescription = (value: number) => {
    if (value < 3) return "Strong Acid";
    if (value < 6) return "Weak Acid";
    if (value < 7.5) return "Neutral";
    if (value < 10) return "Weak Base";
    return "Strong Base";
  };

  const currentpH = pH[0];
  const nearbySubstances = substances.filter(s => Math.abs(s.pH - currentpH) <= 1.5);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">pH Scale Interactive Model</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">pH Value: {currentpH}</span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ 
              backgroundColor: getpHColor(currentpH),
              color: "white"
            }}>
              {getpHDescription(currentpH)}
            </span>
          </div>
          
          <Slider value={pH} onValueChange={setpH} min={0} max={14} step={0.5} className="mb-2" />
          
          <div className="h-8 rounded-lg overflow-hidden flex">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: getpHColor(i) }} />
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0 (Acidic)</span>
            <span>7 (Neutral)</span>
            <span>14 (Basic)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h5 className="font-semibold mb-3">Common Substances Near pH {currentpH}:</h5>
            {nearbySubstances.length > 0 ? (
              <ul className="space-y-2">
                {nearbySubstances.map((substance, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <span>{substance.name}</span>
                    <span className="text-muted-foreground">pH {substance.pH}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Move the slider to find substances</p>
            )}
          </div>

          <div className="p-4 border rounded-lg">
            <h5 className="font-semibold mb-3">pH Properties:</h5>
            <div className="space-y-2 text-sm">
              {currentpH < 7 && (
                <>
                  <p><strong>Type:</strong> Acidic solution</p>
                  <p><strong>H⁺ ions:</strong> High concentration</p>
                  <p><strong>Litmus:</strong> Turns blue litmus red</p>
                </>
              )}
              {currentpH === 7 && (
                <>
                  <p><strong>Type:</strong> Neutral solution</p>
                  <p><strong>H⁺ = OH⁻:</strong> Equal concentrations</p>
                </>
              )}
              {currentpH > 7 && (
                <>
                  <p><strong>Type:</strong> Basic solution</p>
                  <p><strong>OH⁻ ions:</strong> High concentration</p>
                  <p><strong>Litmus:</strong> Turns red litmus blue</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PHScale;
