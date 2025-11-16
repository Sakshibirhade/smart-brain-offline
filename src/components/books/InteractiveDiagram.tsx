import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ZoomIn, Expand } from "lucide-react";
import { ReactNode } from "react";

interface InteractiveDiagramProps {
  title: string;
  description: string;
  content: ReactNode;
}

export const InteractiveDiagram = ({
  title,
  description,
  content,
}: InteractiveDiagramProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="my-6 p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl border-2 border-secondary/30 cursor-pointer hover:border-secondary hover:shadow-glow transition-all duration-300 card-hover animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                <ZoomIn className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            <Expand className="w-5 h-5 text-muted-foreground animate-pulse" />
          </div>
          <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border border-border/50">
            <div className="text-center space-y-2">
              <ZoomIn className="w-12 h-12 mx-auto text-muted-foreground animate-float" />
              <p className="text-sm text-muted-foreground font-medium">
                Click to expand and explore
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="glass-effect shadow-glow border-2 border-primary/30 max-w-4xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <ZoomIn className="w-6 h-6 text-primary-foreground" />
            </div>
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">{content}</div>
      </DialogContent>
    </Dialog>
  );
};
