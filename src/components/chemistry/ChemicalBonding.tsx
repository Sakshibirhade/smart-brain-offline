import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ChemicalBonding = () => {
  const [bondType, setBondType] = useState<"ionic" | "covalent" | "metallic">("covalent");

  const bondExamples = {
    ionic: {
      title: "Ionic Bonding",
      description: "Transfer of electrons from metal to non-metal",
      example: "Sodium Chloride (NaCl)",
      process: [
        "Na loses 1 electron → Na⁺ (cation)",
        "Cl gains 1 electron → Cl⁻ (anion)",
        "Electrostatic attraction forms ionic bond"
      ],
      properties: [
        "High melting and boiling points",
        "Conduct electricity when molten or dissolved",
        "Hard and brittle",
        "Form crystalline structures"
      ]
    },
    covalent: {
      title: "Covalent Bonding",
      description: "Sharing of electrons between non-metals",
      example: "Water (H₂O)",
      process: [
        "Oxygen needs 2 electrons to complete octet",
        "Each Hydrogen shares 1 electron",
        "2 covalent bonds formed (O-H bonds)"
      ],
      properties: [
        "Lower melting and boiling points",
        "Poor electrical conductors",
        "Can be soft (gases) or hard (diamond)",
        "Can exist as molecules or networks"
      ]
    },
    metallic: {
      title: "Metallic Bonding",
      description: "Sea of delocalized electrons around metal cations",
      example: "Copper (Cu)",
      process: [
        "Metal atoms lose valence electrons",
        "Forms positive metal ions (cations)",
        "Electrons move freely (electron sea)",
        "Strong electrostatic forces hold structure"
      ],
      properties: [
        "Good electrical and thermal conductivity",
        "Malleable and ductile",
        "Lustrous appearance",
        "High melting points (usually)"
      ]
    }
  };

  const bond = bondExamples[bondType];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Chemical Bonding</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={bondType === "covalent" ? "default" : "outline"}
          onClick={() => setBondType("covalent")}
        >
          Covalent
        </Button>
        <Button
          variant={bondType === "ionic" ? "default" : "outline"}
          onClick={() => setBondType("ionic")}
        >
          Ionic
        </Button>
        <Button
          variant={bondType === "metallic" ? "default" : "outline"}
          onClick={() => setBondType("metallic")}
        >
          Metallic
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg mb-2">{bond.title}</h4>
          <p className="text-muted-foreground">{bond.description}</p>
          <p className="mt-2"><strong>Example:</strong> {bond.example}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h5 className="font-semibold mb-3">Bond Formation Process:</h5>
            <ol className="space-y-2">
              {bond.process.map((step, index) => (
                <li key={index} className="flex gap-2">
                  <span className="font-semibold text-primary">{index + 1}.</span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex-1">
            <h5 className="font-semibold mb-3">Properties:</h5>
            <ul className="space-y-2">
              {bond.properties.map((property, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-sm">{property}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h5 className="font-semibold mb-2">Visual Representation:</h5>
          <div className="flex items-center justify-center p-6">
            {bondType === "covalent" && (
              <svg width="300" height="150" viewBox="0 0 300 150">
                <circle cx="80" cy="75" r="30" fill="#3B82F6" opacity="0.7" />
                <text x="80" y="80" textAnchor="middle" fill="white" fontWeight="bold">O</text>
                <circle cx="150" cy="50" r="20" fill="#EF4444" opacity="0.7" />
                <text x="150" y="55" textAnchor="middle" fill="white" fontSize="12">H</text>
                <circle cx="150" cy="100" r="20" fill="#EF4444" opacity="0.7" />
                <text x="150" y="105" textAnchor="middle" fill="white" fontSize="12">H</text>
                <line x1="105" y1="65" x2="135" y2="55" stroke="hsl(var(--foreground))" strokeWidth="3" />
                <line x1="105" y1="85" x2="135" y2="95" stroke="hsl(var(--foreground))" strokeWidth="3" />
                <text x="150" y="140" textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))">
                  Shared electrons
                </text>
              </svg>
            )}
            {bondType === "ionic" && (
              <svg width="300" height="150" viewBox="0 0 300 150">
                <circle cx="80" cy="75" r="30" fill="#F59E0B" opacity="0.7" />
                <text x="80" y="72" textAnchor="middle" fill="white" fontWeight="bold">Na</text>
                <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10">+</text>
                <circle cx="220" cy="75" r="30" fill="#10B981" opacity="0.7" />
                <text x="220" y="72" textAnchor="middle" fill="white" fontWeight="bold">Cl</text>
                <text x="220" y="85" textAnchor="middle" fill="white" fontSize="10">-</text>
                <path d="M 110 75 L 190 75" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="150" y="65" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
                  Electrostatic
                </text>
                <text x="150" y="95" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
                  attraction
                </text>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--foreground))" />
                  </marker>
                </defs>
              </svg>
            )}
            {bondType === "metallic" && (
              <svg width="300" height="150" viewBox="0 0 300 150">
                {[
                  [50, 40], [120, 40], [190, 40], [260, 40],
                  [50, 90], [120, 90], [190, 90], [260, 90],
                  [50, 140], [120, 140], [190, 140], [260, 140]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="15" fill="#C0C0C0" opacity="0.8" />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={Math.random() * 280 + 10}
                    cy={Math.random() * 130 + 10}
                    r="3"
                    fill="#EF4444"
                  >
                    <animate
                      attributeName="cx"
                      values={`${Math.random() * 280};${Math.random() * 280};${Math.random() * 280}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values={`${Math.random() * 130};${Math.random() * 130};${Math.random() * 130}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
                <text x="150" y="165" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
                  Delocalized electrons (red dots)
                </text>
              </svg>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChemicalBonding;
