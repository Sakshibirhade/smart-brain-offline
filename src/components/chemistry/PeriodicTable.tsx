import { useState } from "react";
import { Card } from "@/components/ui/card";

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<any>(null);

  const elements = [
    // Period 1
    { symbol: "H", name: "Hydrogen", number: 1, group: 1, period: 1, category: "nonmetal" },
    { symbol: "He", name: "Helium", number: 2, group: 18, period: 1, category: "noble-gas" },
    
    // Period 2
    { symbol: "Li", name: "Lithium", number: 3, group: 1, period: 2, category: "alkali" },
    { symbol: "Be", name: "Beryllium", number: 4, group: 2, period: 2, category: "alkaline" },
    { symbol: "B", name: "Boron", number: 5, group: 13, period: 2, category: "metalloid" },
    { symbol: "C", name: "Carbon", number: 6, group: 14, period: 2, category: "nonmetal" },
    { symbol: "N", name: "Nitrogen", number: 7, group: 15, period: 2, category: "nonmetal" },
    { symbol: "O", name: "Oxygen", number: 8, group: 16, period: 2, category: "nonmetal" },
    { symbol: "F", name: "Fluorine", number: 9, group: 17, period: 2, category: "halogen" },
    { symbol: "Ne", name: "Neon", number: 10, group: 18, period: 2, category: "noble-gas" },
    
    // Period 3
    { symbol: "Na", name: "Sodium", number: 11, group: 1, period: 3, category: "alkali" },
    { symbol: "Mg", name: "Magnesium", number: 12, group: 2, period: 3, category: "alkaline" },
    { symbol: "Al", name: "Aluminum", number: 13, group: 13, period: 3, category: "metal" },
    { symbol: "Si", name: "Silicon", number: 14, group: 14, period: 3, category: "metalloid" },
    { symbol: "P", name: "Phosphorus", number: 15, group: 15, period: 3, category: "nonmetal" },
    { symbol: "S", name: "Sulfur", number: 16, group: 16, period: 3, category: "nonmetal" },
    { symbol: "Cl", name: "Chlorine", number: 17, group: 17, period: 3, category: "halogen" },
    { symbol: "Ar", name: "Argon", number: 18, group: 18, period: 3, category: "noble-gas" },
    
    // Add more key elements
    { symbol: "K", name: "Potassium", number: 19, group: 1, period: 4, category: "alkali" },
    { symbol: "Ca", name: "Calcium", number: 20, group: 2, period: 4, category: "alkaline" },
    { symbol: "Fe", name: "Iron", number: 26, group: 8, period: 4, category: "transition" },
    { symbol: "Cu", name: "Copper", number: 29, group: 11, period: 4, category: "transition" },
    { symbol: "Zn", name: "Zinc", number: 30, group: 12, period: 4, category: "transition" },
    { symbol: "Br", name: "Bromine", number: 35, group: 17, period: 4, category: "halogen" },
    { symbol: "Ag", name: "Silver", number: 47, group: 11, period: 5, category: "transition" },
    { symbol: "I", name: "Iodine", number: 53, group: 17, period: 5, category: "halogen" },
    { symbol: "Au", name: "Gold", number: 79, group: 11, period: 6, category: "transition" },
  ];

  const categoryColors: Record<string, string> = {
    "alkali": "#FF6B6B",
    "alkaline": "#FFA500",
    "transition": "#FFD700",
    "metal": "#C0C0C0",
    "metalloid": "#90EE90",
    "nonmetal": "#87CEEB",
    "halogen": "#DDA0DD",
    "noble-gas": "#E6E6FA",
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Periodic Table of Elements</h3>
      
      <div className="mb-6">
        <div className="grid grid-cols-18 gap-1 max-w-full overflow-x-auto">
          {Array.from({ length: 7 }).map((_, periodIndex) => (
            Array.from({ length: 18 }).map((_, groupIndex) => {
              const period = periodIndex + 1;
              const group = groupIndex + 1;
              const element = elements.find(e => e.period === period && e.group === group);
              
              if (!element) {
                return <div key={`${period}-${group}`} className="w-12 h-12"></div>;
              }
              
              return (
                <button
                  key={element.symbol}
                  onClick={() => setSelectedElement(element)}
                  className="w-12 h-12 border rounded text-xs flex flex-col items-center justify-center hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: categoryColors[element.category],
                    opacity: selectedElement?.symbol === element.symbol ? 1 : 0.9,
                  }}
                >
                  <div className="text-[8px] font-bold">{element.number}</div>
                  <div className="font-bold text-sm">{element.symbol}</div>
                </button>
              );
            })
          ))}
        </div>
      </div>

      {selectedElement && (
        <div className="p-4 border rounded-lg bg-muted/50">
          <h4 className="font-semibold text-lg mb-2">{selectedElement.name}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>Symbol:</strong> {selectedElement.symbol}</div>
            <div><strong>Atomic Number:</strong> {selectedElement.number}</div>
            <div><strong>Period:</strong> {selectedElement.period}</div>
            <div><strong>Group:</strong> {selectedElement.group}</div>
            <div className="col-span-2 capitalize">
              <strong>Category:</strong> {selectedElement.category.replace("-", " ")}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h5 className="font-semibold mb-2">Legend:</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
              <span className="capitalize">{category.replace("-", " ")}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PeriodicTable;
