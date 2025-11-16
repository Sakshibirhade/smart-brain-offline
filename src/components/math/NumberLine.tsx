import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, Minus } from "lucide-react";

const NumberLine = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [operation, setOperation] = useState<"add" | "subtract" | null>(null);
  const [operand, setOperand] = useState(0);

  const range = { min: -10, max: 10 };

  const resetOperation = () => {
    setOperation(null);
    setOperand(0);
  };

  const performOperation = () => {
    if (operation === "add") {
      setSelectedNumber(Math.min(range.max, selectedNumber + operand));
    } else if (operation === "subtract") {
      setSelectedNumber(Math.max(range.min, selectedNumber - operand));
    }
    resetOperation();
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-2 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Interactive Number Line
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Learn about numbers, addition, and subtraction visually
          </p>

          {/* Number Line Visualization */}
          <div className="bg-muted/30 p-6 rounded-lg mb-6">
            <svg viewBox="-50 -100 1100 200" className="w-full h-32">
              {/* Main line */}
              <line x1="0" y1="0" x2="1000" y2="0" stroke="hsl(var(--border))" strokeWidth="3" />
              
              {/* Tick marks and numbers */}
              {Array.from({ length: range.max - range.min + 1 }, (_, i) => {
                const num = range.min + i;
                const x = ((num - range.min) / (range.max - range.min)) * 1000;
                const isSelected = num === selectedNumber;
                const isZero = num === 0;
                
                return (
                  <g key={num}>
                    <line
                      x1={x}
                      y1="-15"
                      x2={x}
                      y2="15"
                      stroke={isZero ? "hsl(var(--primary))" : "hsl(var(--border))"}
                      strokeWidth={isZero ? "3" : "2"}
                    />
                    <text
                      x={x}
                      y="40"
                      textAnchor="middle"
                      fill={isSelected ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                      fontSize={isSelected ? "20" : "14"}
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {num}
                    </text>
                    {isSelected && (
                      <circle
                        cx={x}
                        cy="0"
                        r="12"
                        fill="hsl(var(--primary))"
                        opacity="0.8"
                      />
                    )}
                  </g>
                );
              })}
              
              {/* Operation arrow */}
              {operation && operand !== 0 && (
                <g>
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--accent))" />
                    </marker>
                  </defs>
                  <line
                    x1={((selectedNumber - range.min) / (range.max - range.min)) * 1000}
                    y1="-40"
                    x2={((selectedNumber + (operation === "add" ? operand : -operand) - range.min) / (range.max - range.min)) * 1000}
                    y2="-40"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                  />
                  <text
                    x={(((selectedNumber + selectedNumber + (operation === "add" ? operand : -operand)) / 2) - range.min) / (range.max - range.min) * 1000}
                    y="-50"
                    textAnchor="middle"
                    fill="hsl(var(--accent))"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {operation === "add" ? "+" : "-"}{Math.abs(operand)}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Current Value Display */}
          <div className="bg-primary/10 border-2 border-primary/30 p-4 rounded-lg mb-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Current Number</div>
              <div className="text-4xl font-bold text-primary">{selectedNumber}</div>
              {operation && (
                <div className="mt-2 text-lg">
                  {selectedNumber} {operation === "add" ? "+" : "-"} {operand} = {operation === "add" ? selectedNumber + operand : selectedNumber - operand}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Select a number:</label>
              <Slider
                value={[selectedNumber]}
                onValueChange={(value) => setSelectedNumber(value[0])}
                min={range.min}
                max={range.max}
                step={1}
                className="mb-2"
              />
            </div>

            {!operation && (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setOperation("add")}
                  className="gap-2"
                  variant="default"
                >
                  <Plus className="w-4 h-4" />
                  Add Numbers
                </Button>
                <Button
                  onClick={() => setOperation("subtract")}
                  className="gap-2"
                  variant="secondary"
                >
                  <Minus className="w-4 h-4" />
                  Subtract Numbers
                </Button>
              </div>
            )}

            {operation && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    How much to {operation === "add" ? "add" : "subtract"}?
                  </label>
                  <Slider
                    value={[operand]}
                    onValueChange={(value) => setOperand(value[0])}
                    min={0}
                    max={10}
                    step={1}
                  />
                  <div className="text-center mt-2 text-lg font-semibold">{operand}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={performOperation} disabled={operand === 0}>
                    Calculate
                  </Button>
                  <Button onClick={resetOperation} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Educational Information */}
      <Card className="bg-primary/5 border-2 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-bold text-lg mb-4">Understanding Numbers</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <Badge className="mb-2">Positive Numbers</Badge>
                <p className="text-sm">Numbers greater than zero (0, 1, 2, 3...). They are on the right side of zero.</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Negative Numbers</Badge>
                <p className="text-sm">Numbers less than zero (-1, -2, -3...). They are on the left side of zero.</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Zero</Badge>
                <p className="text-sm">The middle point. It's neither positive nor negative.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Plus className="w-4 h-4 text-primary" />
                  <span className="font-semibold">Addition</span>
                </div>
                <p className="text-sm">Moving to the RIGHT on the number line. Example: 3 + 2 = 5</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Minus className="w-4 h-4 text-primary" />
                  <span className="font-semibold">Subtraction</span>
                </div>
                <p className="text-sm">Moving to the LEFT on the number line. Example: 5 - 2 = 3</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberLine;
