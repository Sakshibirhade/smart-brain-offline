import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Flame, AlertTriangle, Droplet } from "lucide-react";

const ReactivitySeries = () => {
  const [selectedMetal, setSelectedMetal] = useState<string | null>(null);

  const metals = [
    {
      name: "Potassium",
      symbol: "K",
      reactivity: "Extremely High",
      color: "hsl(var(--destructive))",
      position: 1,
      reactions: [
        "Reacts violently with water producing hydrogen gas",
        "Catches fire spontaneously in air",
        "Must be stored under oil"
      ],
      displacement: "Can displace all metals below it from their compounds",
      extraction: "Extracted by electrolysis"
    },
    {
      name: "Sodium",
      symbol: "Na",
      reactivity: "Very High",
      color: "hsl(var(--destructive))",
      position: 2,
      reactions: [
        "Reacts vigorously with water producing hydrogen",
        "Burns with bright yellow flame in air",
        "Stored under oil"
      ],
      displacement: "Can displace metals below it",
      extraction: "Extracted by electrolysis"
    },
    {
      name: "Calcium",
      symbol: "Ca",
      reactivity: "High",
      color: "#FF6B6B",
      position: 3,
      reactions: [
        "Reacts readily with water",
        "Burns in air with red flame",
        "Forms calcium hydroxide with water"
      ],
      displacement: "Displaces less reactive metals",
      extraction: "Extracted by electrolysis"
    },
    {
      name: "Magnesium",
      symbol: "Mg",
      reactivity: "High",
      color: "#FF8C42",
      position: 4,
      reactions: [
        "Reacts slowly with cold water, rapidly with steam",
        "Burns with brilliant white light",
        "Used in flares and fireworks"
      ],
      displacement: "Displaces less reactive metals",
      extraction: "Extracted by electrolysis"
    },
    {
      name: "Aluminum",
      symbol: "Al",
      reactivity: "Moderate-High",
      color: "#FFA500",
      position: 5,
      reactions: [
        "Forms protective oxide layer",
        "Reacts with steam",
        "Resists corrosion due to oxide coating"
      ],
      displacement: "Can displace metals below it",
      extraction: "Extracted by electrolysis"
    },
    {
      name: "Zinc",
      symbol: "Zn",
      reactivity: "Moderate",
      color: "#FFD700",
      position: 6,
      reactions: [
        "Reacts with steam and acids",
        "Forms zinc oxide when heated",
        "Used in galvanizing steel"
      ],
      displacement: "Displaces Cu, Ag, Au from solutions",
      extraction: "Reduction with carbon (displacement)"
    },
    {
      name: "Iron",
      symbol: "Fe",
      reactivity: "Moderate",
      color: "#90EE90",
      position: 7,
      reactions: [
        "Rusts in moist air (slow oxidation)",
        "Reacts with steam when red hot",
        "Reacts with dilute acids"
      ],
      displacement: "Can displace less reactive metals",
      extraction: "Reduction with carbon in blast furnace"
    },
    {
      name: "Lead",
      symbol: "Pb",
      reactivity: "Low",
      color: "#87CEEB",
      position: 8,
      reactions: [
        "Resistant to corrosion",
        "Reacts slowly with acids",
        "Forms protective oxide layer"
      ],
      displacement: "Can displace copper and silver",
      extraction: "Reduction with carbon"
    },
    {
      name: "Copper",
      symbol: "Cu",
      reactivity: "Low",
      color: "#B0C4DE",
      position: 9,
      reactions: [
        "Does not react with water or steam",
        "Forms green patina (copper carbonate)",
        "Reacts with concentrated acids only"
      ],
      displacement: "Can displace silver and gold only",
      extraction: "Reduction with carbon or electrolysis"
    },
    {
      name: "Silver",
      symbol: "Ag",
      reactivity: "Very Low",
      color: "#E6E6FA",
      position: 10,
      reactions: [
        "Does not react with water or acids",
        "Tarnishes in air (forms silver sulfide)",
        "Very unreactive"
      ],
      displacement: "Can only displace gold",
      extraction: "Found naturally or extracted from ores"
    },
    {
      name: "Gold",
      symbol: "Au",
      reactivity: "Extremely Low",
      color: "#F0E6FF",
      position: 11,
      reactions: [
        "Does not react with air or water",
        "Does not react with acids",
        "Most unreactive metal"
      ],
      displacement: "Cannot displace any other metal",
      extraction: "Found in native (pure) state"
    }
  ];

  const DisplacementDiagram = () => {
    return (
      <Card className="bg-muted/30 border-2 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Displacement Reaction Principle
          </h4>
          
          <div className="space-y-6">
            <div className="bg-background/50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-3">General Rule:</p>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="destructive" className="text-xs">More Reactive Metal</Badge>
                <span className="text-2xl">+</span>
                <Badge variant="outline" className="text-xs">Compound of Less Reactive Metal</Badge>
                <span className="text-2xl">→</span>
                <Badge variant="secondary" className="text-xs">Compound of More Reactive Metal</Badge>
                <span className="text-2xl">+</span>
                <Badge variant="outline" className="text-xs">Less Reactive Metal</Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border-2 border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <h5 className="font-semibold text-sm">Reaction Occurs ✓</h5>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Example:</p>
                <p className="text-sm font-mono bg-background/50 p-2 rounded">
                  Zn + CuSO₄ → ZnSO₄ + Cu
                </p>
                <p className="text-xs mt-2">Zinc (more reactive) displaces copper</p>
              </div>

              <div className="bg-red-500/10 border-2 border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h5 className="font-semibold text-sm">No Reaction ✗</h5>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Example:</p>
                <p className="text-sm font-mono bg-background/50 p-2 rounded">
                  Cu + ZnSO₄ → No Reaction
                </p>
                <p className="text-xs mt-2">Copper (less reactive) cannot displace zinc</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ExtractionMethodsDiagram = () => {
    return (
      <Card className="bg-muted/30 border-2 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            Metal Extraction Methods
          </h4>

          <div className="space-y-4">
            <div className="bg-background/50 p-4 rounded-lg border-l-4 border-destructive">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <h5 className="font-semibold">Electrolysis</h5>
                <Badge variant="destructive" className="text-xs">High Reactivity</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Used for: K, Na, Ca, Mg, Al</p>
              <p className="text-xs">These metals are too reactive to be extracted by reduction with carbon. They require electrical energy to decompose their compounds.</p>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border-l-4 border-accent">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-accent" />
                <h5 className="font-semibold">Reduction with Carbon</h5>
                <Badge variant="secondary" className="text-xs">Moderate Reactivity</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Used for: Zn, Fe, Pb, Cu</p>
              <p className="text-xs">These metals can be extracted by heating their oxides with carbon (a reducing agent).</p>
              <p className="text-xs font-mono bg-background/50 p-2 rounded mt-2">
                Metal Oxide + Carbon → Metal + Carbon Dioxide
              </p>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border-l-4 border-primary">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-4 h-4 text-primary" />
                <h5 className="font-semibold">Found Naturally</h5>
                <Badge className="text-xs">Low Reactivity</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Examples: Ag, Au</p>
              <p className="text-xs">These metals are so unreactive that they occur in nature in their pure (native) state.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const selectedMetalData = metals.find(m => m.name === selectedMetal);

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-2 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Reactivity Series of Metals
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Click on any metal to see detailed information about its properties and reactions
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive"></div>
              <span className="text-xs">Most Reactive</span>
            </div>
            <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-destructive via-accent to-primary"></div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/30"></div>
              <span className="text-xs">Least Reactive</span>
            </div>
          </div>

          <div className="space-y-2">
            {metals.map((metal, index) => (
              <button
                key={metal.symbol}
                onClick={() => setSelectedMetal(metal.name)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 hover:scale-102 hover:shadow-glow ${
                  selectedMetal === metal.name
                    ? 'border-primary shadow-glow'
                    : 'border-border hover:border-primary/50'
                }`}
                style={{
                  backgroundColor: selectedMetal === metal.name ? metal.color + '40' : metal.color + '20',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2"
                        style={{ backgroundColor: metal.color, borderColor: 'hsl(var(--border))' }}
                      >
                        {index + 1}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">{metal.name}</div>
                        <div className="text-sm text-muted-foreground">{metal.symbol}</div>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {metal.reactivity}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedMetalData && (
        <Card className="glass-effect border-2 border-primary/30 shadow-glow animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold border-2"
                style={{ 
                  backgroundColor: selectedMetalData.color,
                  borderColor: 'hsl(var(--primary))'
                }}
              >
                {selectedMetalData.symbol}
              </div>
              <div>
                <h4 className="text-2xl font-bold">{selectedMetalData.name}</h4>
                <Badge variant="secondary">{selectedMetalData.reactivity} Reactivity</Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Chemical Reactions
                  </h5>
                  <ul className="space-y-2">
                    {selectedMetalData.reactions.map((reaction, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{reaction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 text-sm">Displacement Ability</h5>
                  <p className="text-sm">{selectedMetalData.displacement}</p>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  Extraction Method
                </h5>
                <p className="text-sm mb-4">{selectedMetalData.extraction}</p>
                
                <div className="bg-background/50 p-3 rounded-lg">
                  <p className="text-xs font-semibold mb-2">Position in Series:</p>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-primary">#{selectedMetalData.position}</div>
                    <div className="text-xs text-muted-foreground">out of {metals.length} metals</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <DisplacementDiagram />
      <ExtractionMethodsDiagram />

      <Card className="bg-primary/5 border-2 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-bold text-lg mb-4">Key Concepts to Remember</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>1. Order of Reactivity:</strong> Metals at the top are most reactive, those at bottom are least reactive</p>
              <p><strong>2. Displacement Reactions:</strong> More reactive metals displace less reactive metals from their compounds</p>
              <p><strong>3. Water Reactions:</strong> Reactivity decreases down the series - from violent to no reaction</p>
            </div>
            <div className="space-y-2">
              <p><strong>4. Extraction Methods:</strong> More reactive metals require more energy (electrolysis) for extraction</p>
              <p><strong>5. Corrosion:</strong> More reactive metals corrode faster in air and water</p>
              <p><strong>6. Mnemonic:</strong> <em>"Please Send Charlie's Monkeys And Zebras In Lead Cages Securely Guarded"</em></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReactivitySeries;
