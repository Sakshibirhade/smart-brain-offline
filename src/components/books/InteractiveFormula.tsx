import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calculator, CheckCircle } from "lucide-react";

interface InteractiveFormulaProps {
  formula: string;
  explanation: string;
  steps: string[];
}

export const InteractiveFormula = ({
  formula,
  explanation,
  steps,
}: InteractiveFormulaProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="my-6 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-primary/30 cursor-pointer hover:border-primary hover:shadow-glow transition-all duration-300 card-hover animate-fade-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Click to learn how to solve this
            </span>
          </div>
          <div className="font-mono text-2xl font-bold text-center py-4 gradient-text">
            {formula}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="glass-effect shadow-glow border-2 border-primary/30 max-w-2xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            Step-by-Step Solution
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="p-6 bg-muted/30 rounded-xl border border-border/50">
            <div className="font-mono text-3xl font-bold text-center mb-4 gradient-text">
              {formula}
            </div>
            <p className="text-center text-muted-foreground">{explanation}</p>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 bg-background/50 rounded-lg border border-border/30 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-md">
                    {index === steps.length - 1 ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                </div>
                <p className="flex-1 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
