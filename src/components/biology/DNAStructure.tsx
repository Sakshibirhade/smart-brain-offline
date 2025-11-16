import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DNAStructure = () => {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);

  const basePairs = {
    adenine: {
      name: "Adenine (A)",
      pair: "Thymine (T)",
      description: "Pairs with Thymine through 2 hydrogen bonds",
      color: "#3B82F6",
      pairColor: "#10B981",
    },
    thymine: {
      name: "Thymine (T)",
      pair: "Adenine (A)",
      description: "Pairs with Adenine through 2 hydrogen bonds",
      color: "#10B981",
      pairColor: "#3B82F6",
    },
    guanine: {
      name: "Guanine (G)",
      pair: "Cytosine (C)",
      description: "Pairs with Cytosine through 3 hydrogen bonds",
      color: "#F59E0B",
      pairColor: "#EF4444",
    },
    cytosine: {
      name: "Cytosine (C)",
      pair: "Guanine (G)",
      description: "Pairs with Guanine through 3 hydrogen bonds",
      color: "#EF4444",
      pairColor: "#F59E0B",
    },
  };

  return (
    <div className="space-y-6">
      {/* DNA Double Helix Visualization */}
      <div className="relative w-full h-96 bg-gradient-to-b from-muted/20 to-muted/40 rounded-2xl p-8 border-2 border-border overflow-hidden">
        <div className="relative h-full flex items-center justify-center">
          {/* Left Strand */}
          <div className="absolute left-1/4 top-0 bottom-0 w-3 bg-gradient-to-b from-primary/60 via-primary to-primary/60 rounded-full" />
          
          {/* Right Strand */}
          <div className="absolute right-1/4 top-0 bottom-0 w-3 bg-gradient-to-b from-primary/60 via-primary to-primary/60 rounded-full" />
          
          {/* Base Pairs */}
          <div className="absolute inset-0 flex flex-col justify-around py-8">
            {/* A-T Pair */}
            <div className="flex items-center justify-center gap-4 px-12">
              <div
                className="w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center font-bold text-white shadow-glow"
                style={{ backgroundColor: basePairs.adenine.color }}
                onClick={() => setSelectedBase("adenine")}
              >
                A
              </div>
              <div className="flex-1 h-1 border-t-2 border-dashed border-muted-foreground/50" />
              <div
                className="w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center font-bold text-white shadow-glow"
                style={{ backgroundColor: basePairs.thymine.color }}
                onClick={() => setSelectedBase("thymine")}
              >
                T
              </div>
            </div>

            {/* G-C Pair */}
            <div className="flex items-center justify-center gap-4 px-12">
              <div
                className="w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center font-bold text-white shadow-glow"
                style={{ backgroundColor: basePairs.guanine.color }}
                onClick={() => setSelectedBase("guanine")}
              >
                G
              </div>
              <div className="flex-1 h-1 border-t-2 border-dashed border-muted-foreground/50" />
              <div
                className="w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center font-bold text-white shadow-glow"
                style={{ backgroundColor: basePairs.cytosine.color }}
                onClick={() => setSelectedBase("cytosine")}
              >
                C
              </div>
            </div>

            {/* T-A Pair */}
            <div className="flex items-center justify-center gap-4 px-12">
              <div
                className="w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center font-bold text-white shadow-glow"
                style={{ backgroundColor: basePairs.thymine.color }}
                onClick={() => setSelectedBase("thymine")}
              >
                T
              </div>
              <div className="flex-1 h-1 border-t-2 border-dashed border-muted-foreground/50" />
              <div
                className="w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center font-bold text-white shadow-glow"
                style={{ backgroundColor: basePairs.adenine.color }}
                onClick={() => setSelectedBase("adenine")}
              >
                A
              </div>
            </div>

            {/* C-G Pair */}
            <div className="flex items-center justify-center gap-4 px-12">
              <div
                className="w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center font-bold text-white shadow-glow"
                style={{ backgroundColor: basePairs.cytosine.color }}
                onClick={() => setSelectedBase("cytosine")}
              >
                C
              </div>
              <div className="flex-1 h-1 border-t-2 border-dashed border-muted-foreground/50" />
              <div
                className="w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center font-bold text-white shadow-glow"
                style={{ backgroundColor: basePairs.guanine.color }}
                onClick={() => setSelectedBase("guanine")}
              >
                G
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      {selectedBase && (
        <Card className="glass-effect border-2 animate-scale-in" style={{ borderColor: basePairs[selectedBase as keyof typeof basePairs].color }}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                  style={{ backgroundColor: basePairs[selectedBase as keyof typeof basePairs].color }}
                >
                  {basePairs[selectedBase as keyof typeof basePairs].name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold" style={{ color: basePairs[selectedBase as keyof typeof basePairs].color }}>
                  {basePairs[selectedBase as keyof typeof basePairs].name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Pairs with</Badge>
                <span className="font-semibold" style={{ color: basePairs[selectedBase as keyof typeof basePairs].pairColor }}>
                  {basePairs[selectedBase as keyof typeof basePairs].pair}
                </span>
              </div>
              <p className="text-muted-foreground text-lg">
                {basePairs[selectedBase as keyof typeof basePairs].description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* DNA Facts */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
        <CardContent className="pt-6">
          <h4 className="font-bold mb-3 text-lg">DNA Structure Facts</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Badge variant="outline">1</Badge>
              <span>DNA is a double helix structure discovered by Watson & Crick</span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline">2</Badge>
              <span>The backbone is made of sugar-phosphate groups</span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline">3</Badge>
              <span>Base pairs always follow: A-T and G-C pairing rules</span>
            </li>
            <li className="flex gap-2">
              <Badge variant="outline">4</Badge>
              <span>DNA carries genetic information in all living organisms</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(basePairs).map(([key, base]) => (
          <div
            key={key}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 cursor-pointer transition-all"
            onClick={() => setSelectedBase(key)}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: base.color }}
            >
              {base.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{base.name}</p>
              {selectedBase === key && (
                <Badge variant="secondary" className="mt-1">Selected</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
