import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Camera, Upload, Search } from "lucide-react";
import { InteractiveWord } from "./InteractiveWord";
import { InteractiveFormula } from "./InteractiveFormula";
import { InteractiveDiagram } from "./InteractiveDiagram";
import { toast } from "sonner";

interface InteractiveBookReaderProps {
  bookId: string;
}

export const InteractiveBookReader = ({ bookId }: InteractiveBookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalPages = 10;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        toast.success("Image uploaded! You can now analyze your math problem.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
    }
  };

  const getBookContent = () => {
    switch (bookId) {
      case "1": // Mathematics
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold gradient-text">
              Chapter 1: Introduction to Algebra
            </h1>
            
            {/* Scanner/Photo Upload Section */}
            <Card className="glass-effect border-2 border-primary/20 p-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Scan Your Math Problem</h3>
                <div className="flex gap-4">
                  <Button onClick={handleCameraClick} className="gap-2">
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </Button>
                  <Button onClick={handleCameraClick} variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload from Gallery
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {uploadedImage && (
                  <div className="mt-4">
                    <img src={uploadedImage} alt="Uploaded math problem" className="rounded-lg max-h-64 object-contain" />
                  </div>
                )}
              </div>
            </Card>

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
        );

      case "2": // Science - Human Body Systems
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold gradient-text">
              Chapter 1: The Human Digestive System
            </h1>
            
            {/* Search Bar for Science */}
            <div className="flex gap-2">
              <Input
                placeholder="Search about human body systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="gap-2">
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>

            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                The{" "}
                <InteractiveWord
                  word="digestive system"
                  definition="A system of organs that breaks down food into nutrients your body can use"
                  example="The digestive system includes the stomach, intestines, and liver"
                />
                {" "}is responsible for breaking down food into{" "}
                <InteractiveWord
                  word="nutrients"
                  definition="Substances that provide nourishment essential for growth and health"
                  example="Proteins, carbohydrates, and vitamins are nutrients"
                />
                {" "}that your body can absorb.
              </p>

              <p className="mt-6">
                The process begins in the{" "}
                <InteractiveWord
                  word="mouth"
                  definition="The opening through which food enters the body, where digestion begins"
                  example="Saliva in the mouth starts breaking down food"
                />
                {" "}where{" "}
                <InteractiveWord
                  word="saliva"
                  definition="A watery substance produced in the mouth that helps break down food"
                  example="Saliva contains enzymes that start digesting starches"
                />
                {" "}begins to break down food.
              </p>

              <InteractiveDiagram
                title="Digestive System Diagram"
                description="Click to explore the organs of the digestive system"
                content={
                  <div className="space-y-4">
                    <div className="bg-background/50 p-6 rounded-lg">
                      <div className="space-y-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">1. Mouth & Esophagus</h4>
                          <p className="text-sm mt-1">Food is chewed and swallowed, traveling down the esophagus</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">2. Stomach</h4>
                          <p className="text-sm mt-1">Acids and enzymes break down food into a liquid mixture</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">3. Small Intestine</h4>
                          <p className="text-sm mt-1">Nutrients are absorbed into the bloodstream</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">4. Large Intestine</h4>
                          <p className="text-sm mt-1">Water is absorbed and waste is prepared for elimination</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />

              <p className="mt-6">
                The{" "}
                <InteractiveWord
                  word="stomach"
                  definition="A muscular organ that mixes food with digestive juices"
                  example="The stomach produces acid to help digest proteins"
                />
                {" "}produces{" "}
                <InteractiveWord
                  word="gastric acid"
                  definition="A strong acid that helps break down food and kill harmful bacteria"
                  example="Gastric acid has a pH of about 1.5 to 3.5"
                />
                {" "}to help digest proteins and kill harmful bacteria.
              </p>
            </div>
          </div>
        );

      case "3": // Social Studies - World Geography
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold gradient-text">
              Chapter 1: Continents and Oceans
            </h1>
            
            {/* Search Bar for Geography */}
            <div className="flex gap-2">
              <Input
                placeholder="Search about world geography..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="gap-2">
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>

            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Earth is divided into seven{" "}
                <InteractiveWord
                  word="continents"
                  definition="Large continuous masses of land on Earth"
                  example="The seven continents are Asia, Africa, North America, South America, Antarctica, Europe, and Australia"
                />
                {" "}and five major{" "}
                <InteractiveWord
                  word="oceans"
                  definition="Vast bodies of salt water that cover most of Earth's surface"
                  example="The five oceans are Pacific, Atlantic, Indian, Arctic, and Southern"
                />
                .
              </p>

              <p className="mt-6">
                The largest continent is{" "}
                <InteractiveWord
                  word="Asia"
                  definition="The largest continent by both area and population"
                  example="Asia contains countries like China, India, and Japan"
                />
                , covering about 30% of Earth's land area.
              </p>

              <InteractiveDiagram
                title="World Continents Map"
                description="Click to explore the seven continents"
                content={
                  <div className="space-y-4">
                    <div className="bg-background/50 p-6 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">Asia</h4>
                          <p className="text-sm mt-1">Largest continent - 44.58 million km²</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">Africa</h4>
                          <p className="text-sm mt-1">Second largest - 30.37 million km²</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">North America</h4>
                          <p className="text-sm mt-1">Third largest - 24.71 million km²</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">South America</h4>
                          <p className="text-sm mt-1">Fourth largest - 17.84 million km²</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">Antarctica</h4>
                          <p className="text-sm mt-1">Coldest continent - 14.2 million km²</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">Europe</h4>
                          <p className="text-sm mt-1">Second smallest - 10.18 million km²</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg col-span-2">
                          <h4 className="font-semibold text-primary">Australia/Oceania</h4>
                          <p className="text-sm mt-1">Smallest continent - 8.6 million km²</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />

              <p className="mt-6">
                The{" "}
                <InteractiveWord
                  word="Pacific Ocean"
                  definition="The largest and deepest ocean on Earth"
                  example="The Pacific Ocean covers more area than all land on Earth combined"
                />
                {" "}is the largest ocean, covering more than 63 million square miles.
              </p>

              <p className="mt-6">
                The{" "}
                <InteractiveWord
                  word="equator"
                  definition="An imaginary line around Earth's middle, dividing it into Northern and Southern hemispheres"
                  example="Countries on the equator have tropical climates year-round"
                />
                {" "}divides Earth into the Northern and Southern{" "}
                <InteractiveWord
                  word="hemispheres"
                  definition="Half of a sphere, or half of Earth"
                  example="The Northern Hemisphere contains most of Earth's land"
                />
                .
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="glass-effect shadow-card border-2 border-primary/20 animate-scale-in">
        <CardContent className="p-8">
          <div className="max-w-3xl mx-auto">
            {getBookContent()}
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
