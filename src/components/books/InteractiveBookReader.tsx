import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { InteractiveWord } from "./InteractiveWord";
import { InteractiveFormula } from "./InteractiveFormula";
import { InteractiveDiagram } from "./InteractiveDiagram";

interface InteractiveBookReaderProps {
  bookId: string;
}

export const InteractiveBookReader = ({ bookId }: InteractiveBookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="space-y-4">
      <Card className="glass-effect shadow-card border-2 border-primary/20 animate-scale-in">
        <CardContent className="p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold gradient-text">
              Chapter 1: Introduction to Algebra
            </h1>

            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Algebra is a branch of{" "}
                <InteractiveWord
                  word="mathematics"
                  definition="The study of numbers, quantities, shapes, and patterns"
                  example="Mathematics helps us solve real-world problems"
                />
                {" "}that uses{" "}
                <InteractiveWord
                  word="symbols"
                  definition="Letters or characters that represent unknown values or variables"
                  example="In 'x + 5 = 10', x is a symbol representing the unknown number"
                />{" "}
                and letters to represent numbers and quantities in{" "}
                <InteractiveWord
                  word="equations"
                  definition="Mathematical statements showing that two expressions are equal"
                  example="2x + 3 = 11 is an equation"
                />
                .
              </p>

              <p className="mt-6">
                For example, consider this simple{" "}
                <InteractiveWord
                  word="equation"
                  definition="A mathematical statement with an equals sign"
                  example="x + 5 = 12"
                />
                :
              </p>

              <InteractiveFormula
                formula="x + 5 = 12"
                explanation="To solve this equation, we need to isolate x. Subtract 5 from both sides: x + 5 - 5 = 12 - 5, which simplifies to x = 7"
                steps={[
                  "Start with: x + 5 = 12",
                  "Subtract 5 from both sides: x + 5 - 5 = 12 - 5",
                  "Simplify: x = 7",
                  "Check: 7 + 5 = 12 ✓",
                ]}
              />

              <p className="mt-6">
                The relationship between{" "}
                <InteractiveWord
                  word="variables"
                  definition="Symbols that can represent different values"
                  example="In y = 2x + 3, both x and y are variables"
                />{" "}
                can be visualized using diagrams:
              </p>

              <InteractiveDiagram
                title="Number Line Visualization"
                description="Click to see how we solve x + 5 = 12 on a number line"
                content={
                  <div className="space-y-4">
                    <div className="bg-background/50 p-6 rounded-lg">
                      <div className="flex items-center justify-between relative">
                        <div className="absolute inset-0 h-1 bg-gradient-primary top-1/2 -translate-y-1/2 rounded-full"></div>
                        {[0, 5, 7, 10, 12, 15].map((num) => (
                          <div key={num} className="relative z-10 flex flex-col items-center">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                num === 7
                                  ? "bg-gradient-primary ring-4 ring-primary/30"
                                  : "bg-muted"
                              }`}
                            />
                            <span className="text-sm mt-2 font-medium">{num}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 space-y-2 text-sm">
                        <p className="font-medium">Step 1: Start at x (unknown)</p>
                        <p>Step 2: Add 5 to get 12</p>
                        <p className="text-primary font-semibold">
                          Solution: x must be at position 7!
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />

              <p className="mt-6">
                Another important concept is the{" "}
                <InteractiveWord
                  word="quadratic"
                  definition="An equation where the highest power of the variable is 2"
                  example="x² + 2x + 1 = 0 is a quadratic equation"
                />{" "}
                formula:
              </p>

              <InteractiveFormula
                formula="x = (-b ± √(b² - 4ac)) / 2a"
                explanation="The quadratic formula solves equations in the form ax² + bx + c = 0"
                steps={[
                  "Identify values of a, b, and c from your equation",
                  "Calculate the discriminant: b² - 4ac",
                  "Apply the formula to find two possible values of x",
                  "Simplify your answers",
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
