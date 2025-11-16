import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sparkles } from "lucide-react";

interface InteractiveWordProps {
  word: string;
  definition: string;
  example?: string;
}

export const InteractiveWord = ({
  word,
  definition,
  example,
}: InteractiveWordProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span className="relative inline-block cursor-pointer group">
          <span className="relative z-10 text-primary font-medium border-b-2 border-primary/30 hover:border-primary transition-all duration-200">
            {word}
          </span>
          <Sparkles className="w-3 h-3 inline-block ml-1 text-primary animate-pulse" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="glass-effect shadow-glow border-2 border-primary/30 w-80 animate-scale-in">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <h4 className="font-semibold text-lg capitalize">{word}</h4>
          </div>
          <p className="text-sm text-foreground">{definition}</p>
          {example && (
            <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Example:
              </p>
              <p className="text-sm italic">{example}</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
