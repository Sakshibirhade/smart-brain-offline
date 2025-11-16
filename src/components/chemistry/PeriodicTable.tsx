import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Element {
  symbol: string;
  name: string;
  number: number;
  group: number;
  period: number;
  category: string;
  mass: string;
  electrons: number[];
  state: string;
  electronConfig: string;
}

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const elements: Element[] = [
    // Period 1
    { symbol: "H", name: "Hydrogen", number: 1, group: 1, period: 1, category: "nonmetal", mass: "1.008", electrons: [1], state: "Gas", electronConfig: "1s¹" },
    { symbol: "He", name: "Helium", number: 2, group: 18, period: 1, category: "noble-gas", mass: "4.003", electrons: [2], state: "Gas", electronConfig: "1s²" },
    
    // Period 2
    { symbol: "Li", name: "Lithium", number: 3, group: 1, period: 2, category: "alkali", mass: "6.941", electrons: [2, 1], state: "Solid", electronConfig: "1s² 2s¹" },
    { symbol: "Be", name: "Beryllium", number: 4, group: 2, period: 2, category: "alkaline", mass: "9.012", electrons: [2, 2], state: "Solid", electronConfig: "1s² 2s²" },
    { symbol: "B", name: "Boron", number: 5, group: 13, period: 2, category: "metalloid", mass: "10.81", electrons: [2, 3], state: "Solid", electronConfig: "1s² 2s² 2p¹" },
    { symbol: "C", name: "Carbon", number: 6, group: 14, period: 2, category: "nonmetal", mass: "12.01", electrons: [2, 4], state: "Solid", electronConfig: "1s² 2s² 2p²" },
    { symbol: "N", name: "Nitrogen", number: 7, group: 15, period: 2, category: "nonmetal", mass: "14.01", electrons: [2, 5], state: "Gas", electronConfig: "1s² 2s² 2p³" },
    { symbol: "O", name: "Oxygen", number: 8, group: 16, period: 2, category: "nonmetal", mass: "16.00", electrons: [2, 6], state: "Gas", electronConfig: "1s² 2s² 2p⁴" },
    { symbol: "F", name: "Fluorine", number: 9, group: 17, period: 2, category: "halogen", mass: "19.00", electrons: [2, 7], state: "Gas", electronConfig: "1s² 2s² 2p⁵" },
    { symbol: "Ne", name: "Neon", number: 10, group: 18, period: 2, category: "noble-gas", mass: "20.18", electrons: [2, 8], state: "Gas", electronConfig: "1s² 2s² 2p⁶" },
    
    // Period 3
    { symbol: "Na", name: "Sodium", number: 11, group: 1, period: 3, category: "alkali", mass: "22.99", electrons: [2, 8, 1], state: "Solid", electronConfig: "[Ne] 3s¹" },
    { symbol: "Mg", name: "Magnesium", number: 12, group: 2, period: 3, category: "alkaline", mass: "24.31", electrons: [2, 8, 2], state: "Solid", electronConfig: "[Ne] 3s²" },
    { symbol: "Al", name: "Aluminum", number: 13, group: 13, period: 3, category: "metal", mass: "26.98", electrons: [2, 8, 3], state: "Solid", electronConfig: "[Ne] 3s² 3p¹" },
    { symbol: "Si", name: "Silicon", number: 14, group: 14, period: 3, category: "metalloid", mass: "28.09", electrons: [2, 8, 4], state: "Solid", electronConfig: "[Ne] 3s² 3p²" },
    { symbol: "P", name: "Phosphorus", number: 15, group: 15, period: 3, category: "nonmetal", mass: "30.97", electrons: [2, 8, 5], state: "Solid", electronConfig: "[Ne] 3s² 3p³" },
    { symbol: "S", name: "Sulfur", number: 16, group: 16, period: 3, category: "nonmetal", mass: "32.07", electrons: [2, 8, 6], state: "Solid", electronConfig: "[Ne] 3s² 3p⁴" },
    { symbol: "Cl", name: "Chlorine", number: 17, group: 17, period: 3, category: "halogen", mass: "35.45", electrons: [2, 8, 7], state: "Gas", electronConfig: "[Ne] 3s² 3p⁵" },
    { symbol: "Ar", name: "Argon", number: 18, group: 18, period: 3, category: "noble-gas", mass: "39.95", electrons: [2, 8, 8], state: "Gas", electronConfig: "[Ne] 3s² 3p⁶" },
    
    // Period 4
    { symbol: "K", name: "Potassium", number: 19, group: 1, period: 4, category: "alkali", mass: "39.10", electrons: [2, 8, 8, 1], state: "Solid", electronConfig: "[Ar] 4s¹" },
    { symbol: "Ca", name: "Calcium", number: 20, group: 2, period: 4, category: "alkaline", mass: "40.08", electrons: [2, 8, 8, 2], state: "Solid", electronConfig: "[Ar] 4s²" },
    { symbol: "Sc", name: "Scandium", number: 21, group: 3, period: 4, category: "transition", mass: "44.96", electrons: [2, 8, 9, 2], state: "Solid", electronConfig: "[Ar] 3d¹ 4s²" },
    { symbol: "Ti", name: "Titanium", number: 22, group: 4, period: 4, category: "transition", mass: "47.87", electrons: [2, 8, 10, 2], state: "Solid", electronConfig: "[Ar] 3d² 4s²" },
    { symbol: "V", name: "Vanadium", number: 23, group: 5, period: 4, category: "transition", mass: "50.94", electrons: [2, 8, 11, 2], state: "Solid", electronConfig: "[Ar] 3d³ 4s²" },
    { symbol: "Cr", name: "Chromium", number: 24, group: 6, period: 4, category: "transition", mass: "52.00", electrons: [2, 8, 13, 1], state: "Solid", electronConfig: "[Ar] 3d⁵ 4s¹" },
    { symbol: "Mn", name: "Manganese", number: 25, group: 7, period: 4, category: "transition", mass: "54.94", electrons: [2, 8, 13, 2], state: "Solid", electronConfig: "[Ar] 3d⁵ 4s²" },
    { symbol: "Fe", name: "Iron", number: 26, group: 8, period: 4, category: "transition", mass: "55.85", electrons: [2, 8, 14, 2], state: "Solid", electronConfig: "[Ar] 3d⁶ 4s²" },
    { symbol: "Co", name: "Cobalt", number: 27, group: 9, period: 4, category: "transition", mass: "58.93", electrons: [2, 8, 15, 2], state: "Solid", electronConfig: "[Ar] 3d⁷ 4s²" },
    { symbol: "Ni", name: "Nickel", number: 28, group: 10, period: 4, category: "transition", mass: "58.69", electrons: [2, 8, 16, 2], state: "Solid", electronConfig: "[Ar] 3d⁸ 4s²" },
    { symbol: "Cu", name: "Copper", number: 29, group: 11, period: 4, category: "transition", mass: "63.55", electrons: [2, 8, 18, 1], state: "Solid", electronConfig: "[Ar] 3d¹⁰ 4s¹" },
    { symbol: "Zn", name: "Zinc", number: 30, group: 12, period: 4, category: "transition", mass: "65.39", electrons: [2, 8, 18, 2], state: "Solid", electronConfig: "[Ar] 3d¹⁰ 4s²" },
    { symbol: "Ga", name: "Gallium", number: 31, group: 13, period: 4, category: "metal", mass: "69.72", electrons: [2, 8, 18, 3], state: "Solid", electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹" },
    { symbol: "Ge", name: "Germanium", number: 32, group: 14, period: 4, category: "metalloid", mass: "72.64", electrons: [2, 8, 18, 4], state: "Solid", electronConfig: "[Ar] 3d¹⁰ 4s² 4p²" },
    { symbol: "As", name: "Arsenic", number: 33, group: 15, period: 4, category: "metalloid", mass: "74.92", electrons: [2, 8, 18, 5], state: "Solid", electronConfig: "[Ar] 3d¹⁰ 4s² 4p³" },
    { symbol: "Se", name: "Selenium", number: 34, group: 16, period: 4, category: "nonmetal", mass: "78.96", electrons: [2, 8, 18, 6], state: "Solid", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴" },
    { symbol: "Br", name: "Bromine", number: 35, group: 17, period: 4, category: "halogen", mass: "79.90", electrons: [2, 8, 18, 7], state: "Liquid", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵" },
    { symbol: "Kr", name: "Krypton", number: 36, group: 18, period: 4, category: "noble-gas", mass: "83.80", electrons: [2, 8, 18, 8], state: "Gas", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶" },
    
    // Period 5 - Key elements
    { symbol: "Rb", name: "Rubidium", number: 37, group: 1, period: 5, category: "alkali", mass: "85.47", electrons: [2, 8, 18, 8, 1], state: "Solid", electronConfig: "[Kr] 5s¹" },
    { symbol: "Sr", name: "Strontium", number: 38, group: 2, period: 5, category: "alkaline", mass: "87.62", electrons: [2, 8, 18, 8, 2], state: "Solid", electronConfig: "[Kr] 5s²" },
    { symbol: "Ag", name: "Silver", number: 47, group: 11, period: 5, category: "transition", mass: "107.87", electrons: [2, 8, 18, 18, 1], state: "Solid", electronConfig: "[Kr] 4d¹⁰ 5s¹" },
    { symbol: "I", name: "Iodine", number: 53, group: 17, period: 5, category: "halogen", mass: "126.90", electrons: [2, 8, 18, 18, 7], state: "Solid", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵" },
    { symbol: "Xe", name: "Xenon", number: 54, group: 18, period: 5, category: "noble-gas", mass: "131.29", electrons: [2, 8, 18, 18, 8], state: "Gas", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶" },
    
    // Period 6 - Key elements
    { symbol: "Cs", name: "Cesium", number: 55, group: 1, period: 6, category: "alkali", mass: "132.91", electrons: [2, 8, 18, 18, 8, 1], state: "Solid", electronConfig: "[Xe] 6s¹" },
    { symbol: "Ba", name: "Barium", number: 56, group: 2, period: 6, category: "alkaline", mass: "137.33", electrons: [2, 8, 18, 18, 8, 2], state: "Solid", electronConfig: "[Xe] 6s²" },
    { symbol: "Pt", name: "Platinum", number: 78, group: 10, period: 6, category: "transition", mass: "195.08", electrons: [2, 8, 18, 32, 17, 1], state: "Solid", electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹" },
    { symbol: "Au", name: "Gold", number: 79, group: 11, period: 6, category: "transition", mass: "196.97", electrons: [2, 8, 18, 32, 18, 1], state: "Solid", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹" },
    { symbol: "Hg", name: "Mercury", number: 80, group: 12, period: 6, category: "transition", mass: "200.59", electrons: [2, 8, 18, 32, 18, 2], state: "Liquid", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²" },
    { symbol: "Pb", name: "Lead", number: 82, group: 14, period: 6, category: "metal", mass: "207.2", electrons: [2, 8, 18, 32, 18, 4], state: "Solid", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²" },
    { symbol: "Rn", name: "Radon", number: 86, group: 18, period: 6, category: "noble-gas", mass: "222", electrons: [2, 8, 18, 32, 18, 8], state: "Gas", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶" },
    
    // Period 7 - Key elements
    { symbol: "Fr", name: "Francium", number: 87, group: 1, period: 7, category: "alkali", mass: "223", electrons: [2, 8, 18, 32, 18, 8, 1], state: "Solid", electronConfig: "[Rn] 7s¹" },
    { symbol: "Ra", name: "Radium", number: 88, group: 2, period: 7, category: "alkaline", mass: "226", electrons: [2, 8, 18, 32, 18, 8, 2], state: "Solid", electronConfig: "[Rn] 7s²" },
  ];

  const categoryColors: Record<string, string> = {
    "alkali": "hsl(var(--chart-1))",
    "alkaline": "hsl(var(--chart-2))",
    "transition": "hsl(var(--chart-3))",
    "metal": "hsl(var(--chart-4))",
    "metalloid": "hsl(var(--chart-5))",
    "nonmetal": "hsl(var(--primary))",
    "halogen": "hsl(var(--accent))",
    "noble-gas": "hsl(var(--secondary))",
  };

  const ElectronShellDiagram = ({ electrons }: { electrons: number[] }) => {
    const shellRadii = [30, 50, 70, 90, 110, 130, 150];
    
    return (
      <svg width="320" height="320" viewBox="0 0 320 320" className="mx-auto">
        {/* Nucleus */}
        <circle cx="160" cy="160" r="20" fill="hsl(var(--primary))" opacity="0.8" />
        <text x="160" y="165" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="12" fontWeight="bold">
          +{electrons.reduce((a, b) => a + b, 0)}
        </text>
        
        {/* Electron shells */}
        {electrons.map((count, shellIndex) => {
          const radius = shellRadii[shellIndex];
          const angleStep = (2 * Math.PI) / count;
          
          return (
            <g key={shellIndex}>
              {/* Shell orbit */}
              <circle
                cx="160"
                cy="160"
                r={radius}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
              />
              
              {/* Electrons */}
              {Array.from({ length: count }).map((_, electronIndex) => {
                const angle = angleStep * electronIndex;
                const x = 160 + radius * Math.cos(angle);
                const y = 160 + radius * Math.sin(angle);
                
                return (
                  <circle
                    key={electronIndex}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="hsl(var(--accent))"
                    stroke="hsl(var(--accent-foreground))"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
          );
        })}
        
        {/* Shell labels */}
        {electrons.map((count, shellIndex) => {
          const radius = shellRadii[shellIndex];
          return (
            <text
              key={shellIndex}
              x="165"
              y={160 - radius - 8}
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
            >
              {count}e⁻
            </text>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-2 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Periodic Table of Elements
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Click on any element to see detailed information and electron shell diagram
          </p>
          
          <div className="mb-6 overflow-x-auto">
            <div className="inline-grid gap-1 min-w-max" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
              {Array.from({ length: 7 }).map((_, periodIndex) => (
                Array.from({ length: 18 }).map((_, groupIndex) => {
                  const period = periodIndex + 1;
                  const group = groupIndex + 1;
                  const element = elements.find(e => e.period === period && e.group === group);
                  
                  if (!element) {
                    return <div key={`${period}-${group}`} className="w-14 h-14 md:w-16 md:h-16"></div>;
                  }
                  
                  return (
                    <button
                      key={element.symbol}
                      onClick={() => setSelectedElement(element)}
                      className="w-14 h-14 md:w-16 md:h-16 border-2 rounded-lg text-xs flex flex-col items-center justify-center hover:scale-110 hover:shadow-glow transition-all duration-200 relative group"
                      style={{
                        backgroundColor: categoryColors[element.category],
                        borderColor: selectedElement?.symbol === element.symbol ? 'hsl(var(--primary))' : 'transparent',
                        opacity: selectedElement && selectedElement.symbol !== element.symbol ? 0.6 : 1,
                      }}
                    >
                      <div className="text-[8px] font-semibold opacity-70">{element.number}</div>
                      <div className="font-bold text-sm md:text-base text-foreground">{element.symbol}</div>
                      <div className="text-[7px] opacity-70 truncate w-full px-1 text-center">{element.name}</div>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg z-10 whitespace-nowrap">
                        <div className="font-semibold">{element.name}</div>
                        <div>Mass: {element.mass}</div>
                      </div>
                    </button>
                  );
                })
              ))}
            </div>
          </div>

          {/* Legend */}
          <div>
            <h5 className="font-semibold mb-3 text-sm">Element Categories:</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-border" style={{ backgroundColor: color }}></div>
                  <span className="capitalize">{category.replace("-", " ")}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Element Information */}
      {selectedElement && (
        <Card className="glass-effect border-2 border-primary/30 shadow-glow animate-fade-in">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Element Details */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-20 h-20 rounded-xl flex flex-col items-center justify-center border-2"
                    style={{ 
                      backgroundColor: categoryColors[selectedElement.category],
                      borderColor: 'hsl(var(--primary))'
                    }}
                  >
                    <div className="text-xs font-semibold opacity-70">{selectedElement.number}</div>
                    <div className="font-bold text-3xl text-foreground">{selectedElement.symbol}</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">{selectedElement.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedElement.category.replace("-", " ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Atomic Number</div>
                      <div className="text-lg font-bold">{selectedElement.number}</div>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Atomic Mass</div>
                      <div className="text-lg font-bold">{selectedElement.mass}</div>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Period</div>
                      <div className="text-lg font-bold">{selectedElement.period}</div>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground">Group</div>
                      <div className="text-lg font-bold">{selectedElement.group}</div>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">State at Room Temperature</div>
                    <div className="text-base font-semibold">{selectedElement.state}</div>
                  </div>

                  <div className="bg-background/50 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Electron Configuration</div>
                    <div className="text-sm font-mono">{selectedElement.electronConfig}</div>
                  </div>

                  <div className="bg-background/50 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Electrons per Shell</div>
                    <div className="text-sm font-semibold">{selectedElement.electrons.join(", ")}</div>
                  </div>
                </div>
              </div>

              {/* Electron Shell Diagram */}
              <div>
                <h5 className="font-semibold mb-3 text-center">Electron Shell Diagram</h5>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <ElectronShellDiagram electrons={selectedElement.electrons} />
                  <div className="mt-4 text-xs text-center text-muted-foreground">
                    <p>The diagram shows the distribution of electrons across energy levels.</p>
                    <p className="mt-1">Each orbit represents an electron shell, with electrons shown as colored dots.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Information */}
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h5 className="font-semibold mb-2 text-sm">Key Facts:</h5>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>• <strong>Atomic Number</strong>: Number of protons in the nucleus (also equals number of electrons in a neutral atom)</p>
                <p>• <strong>Atomic Mass</strong>: Average mass of the atom (protons + neutrons)</p>
                <p>• <strong>Electron Configuration</strong>: Shows how electrons are arranged in orbitals</p>
                <p>• <strong>Period</strong>: Horizontal row in the periodic table (indicates number of electron shells)</p>
                <p>• <strong>Group</strong>: Vertical column (elements in the same group have similar properties)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PeriodicTable;
