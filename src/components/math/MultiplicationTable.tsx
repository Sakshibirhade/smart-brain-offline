import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MultiplicationTable = () => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [highlightedCell, setHighlightedCell] = useState<{ row: number; col: number } | null>(null);

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-2 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Multiplication Tables
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Interactive multiplication table to help you learn and practice
          </p>

          {/* Table Selection */}
          <div className="mb-6">
            <h5 className="font-semibold mb-3">Select a table to highlight:</h5>
            <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  onClick={() => setSelectedNumber(selectedNumber === num ? null : num)}
                  variant={selectedNumber === num ? "default" : "outline"}
                  size="sm"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          {/* Multiplication Grid */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border-2 border-border bg-muted font-bold">×</th>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((col) => (
                      <th
                        key={col}
                        className={`p-2 border-2 border-border font-bold ${
                          selectedNumber === col ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((row) => (
                    <tr key={row}>
                      <th
                        className={`p-2 border-2 border-border font-bold ${
                          selectedNumber === row ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}
                      >
                        {row}
                      </th>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((col) => {
                        const product = row * col;
                        const isHighlighted = selectedNumber === row || selectedNumber === col;
                        const isBothSelected = selectedNumber === row && selectedNumber === col;
                        const isHovered = highlightedCell?.row === row && highlightedCell?.col === col;
                        
                        return (
                          <td
                            key={col}
                            onMouseEnter={() => setHighlightedCell({ row, col })}
                            onMouseLeave={() => setHighlightedCell(null)}
                            className={`p-2 border-2 border-border text-center font-semibold transition-all cursor-pointer ${
                              isBothSelected
                                ? 'bg-primary text-primary-foreground scale-110 shadow-lg'
                                : isHighlighted
                                ? 'bg-primary/30'
                                : isHovered
                                ? 'bg-accent/30'
                                : 'bg-background'
                            }`}
                          >
                            {product}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {highlightedCell && (
            <div className="mt-4 p-4 bg-accent/10 border-2 border-accent/30 rounded-lg text-center">
              <div className="text-lg font-semibold">
                {highlightedCell.row} × {highlightedCell.col} = {highlightedCell.row * highlightedCell.col}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedNumber && (
        <Card className="glass-effect border-2 border-primary/30 shadow-glow animate-fade-in">
          <CardContent className="p-6">
            <h4 className="text-xl font-bold mb-4">Table of {selectedNumber}</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <div
                  key={num}
                  className="p-3 bg-primary/10 border-2 border-primary/30 rounded-lg text-center"
                >
                  <div className="text-sm text-muted-foreground">
                    {selectedNumber} × {num}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {selectedNumber * num}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Tips */}
      <Card className="bg-primary/5 border-2 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-bold text-lg mb-4">Tips to Remember</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p>• <strong>Patterns:</strong> Notice how numbers increase by the same amount each time!</p>
              <p>• <strong>5's Table:</strong> Always ends in 0 or 5</p>
              <p>• <strong>9's Table:</strong> Digits always add up to 9 (18: 1+8=9)</p>
            </div>
            <div className="space-y-2">
              <p>• <strong>Commutative Property:</strong> 3×4 = 4×3 (order doesn't matter!)</p>
              <p>• <strong>2's Table:</strong> Just double the number</p>
              <p>• <strong>10's Table:</strong> Just add a zero!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiplicationTable;
