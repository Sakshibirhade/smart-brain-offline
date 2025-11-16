import { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CellDiagram = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const cellParts = {
    nucleus: {
      name: "Nucleus",
      description: "Control center of the cell, contains DNA",
      color: "#8B5CF6",
    },
    mitochondria: {
      name: "Mitochondria",
      description: "Powerhouse of the cell, produces energy (ATP)",
      color: "#EF4444",
    },
    membrane: {
      name: "Cell Membrane",
      description: "Protective barrier that controls what enters/exits",
      color: "#3B82F6",
    },
    cytoplasm: {
      name: "Cytoplasm",
      description: "Gel-like substance filling the cell",
      color: "#10B981",
    },
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-square max-w-md mx-auto bg-muted/20 rounded-2xl p-8 border-2 border-border">
        {/* Cell Membrane */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="absolute inset-4 rounded-full border-4 cursor-pointer transition-all hover:scale-105"
                style={{
                  borderColor: cellParts.membrane.color,
                  backgroundColor: `${cellParts.membrane.color}10`,
                }}
                onClick={() => setSelectedPart("membrane")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{cellParts.membrane.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Cytoplasm */}
        <div
          className="absolute inset-8 rounded-full"
          style={{ backgroundColor: `${cellParts.cytoplasm.color}15` }}
        />

        {/* Nucleus */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full cursor-pointer transition-all hover:scale-110 shadow-glow flex items-center justify-center"
                style={{ backgroundColor: cellParts.nucleus.color }}
                onClick={() => setSelectedPart("nucleus")}
              >
                <Info className="w-6 h-6 text-white" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{cellParts.nucleus.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Mitochondria */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="absolute top-1/4 right-1/4 w-16 h-12 rounded-full cursor-pointer transition-all hover:scale-110 shadow-md"
                style={{ backgroundColor: cellParts.mitochondria.color }}
                onClick={() => setSelectedPart("mitochondria")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{cellParts.mitochondria.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="absolute bottom-1/3 left-1/4 w-14 h-10 rounded-full cursor-pointer transition-all hover:scale-110 shadow-md"
                style={{ backgroundColor: cellParts.mitochondria.color }}
                onClick={() => setSelectedPart("mitochondria")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{cellParts.mitochondria.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Info Panel */}
      {selectedPart && (
        <div className="glass-effect p-6 rounded-xl border-2 animate-scale-in" style={{ borderColor: cellParts[selectedPart as keyof typeof cellParts].color }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: cellParts[selectedPart as keyof typeof cellParts].color }}>
            {cellParts[selectedPart as keyof typeof cellParts].name}
          </h3>
          <p className="text-muted-foreground">
            {cellParts[selectedPart as keyof typeof cellParts].description}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(cellParts).map(([key, part]) => (
          <div
            key={key}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectedPart(key)}
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: part.color }}
            />
            <span className="text-sm font-medium">{part.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
