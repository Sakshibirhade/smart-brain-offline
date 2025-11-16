import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

const FractionVisualizer = () => {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(4);

  const simplifyFraction = (num: number, den: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(num, den);
    return { num: num / divisor, den: den / divisor };
  };

  const simplified = simplifyFraction(numerator, denominator);
  const percentage = ((numerator / denominator) * 100).toFixed(1);
  const decimal = (numerator / denominator).toFixed(3);

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-2 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Fraction Visualizer
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Understand fractions with visual representations
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Visual Representations */}
            <div className="space-y-6">
              {/* Circle/Pie Chart */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h5 className="font-semibold mb-3 text-center">Pie Chart</h5>
                <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
                  <circle cx="100" cy="100" r="80" fill="hsl(var(--muted))" />
                  {Array.from({ length: numerator }, (_, i) => {
                    const angle = (360 / denominator) * i;
                    const nextAngle = (360 / denominator) * (i + 1);
                    const x1 = 100 + 80 * Math.cos((angle - 90) * Math.PI / 180);
                    const y1 = 100 + 80 * Math.sin((angle - 90) * Math.PI / 180);
                    const x2 = 100 + 80 * Math.cos((nextAngle - 90) * Math.PI / 180);
                    const y2 = 100 + 80 * Math.sin((nextAngle - 90) * Math.PI / 180);
                    const largeArc = nextAngle - angle > 180 ? 1 : 0;
                    
                    return (
                      <path
                        key={i}
                        d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill="hsl(var(--primary))"
                        opacity="0.8"
                      />
                    );
                  })}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
                  {Array.from({ length: denominator }, (_, i) => {
                    const angle = (360 / denominator) * i;
                    const x = 100 + 85 * Math.cos((angle - 90) * Math.PI / 180);
                    const y = 100 + 85 * Math.sin((angle - 90) * Math.PI / 180);
                    return (
                      <line
                        key={i}
                        x1="100"
                        y1="100"
                        x2={x}
                        y2={y}
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Rectangle/Bar */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h5 className="font-semibold mb-3 text-center">Bar Model</h5>
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(denominator, 12)}, 1fr)` }}>
                  {Array.from({ length: denominator }, (_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded border-2 transition-colors"
                      style={{
                        backgroundColor: i < numerator ? "hsl(var(--primary))" : "hsl(var(--muted))",
                        borderColor: "hsl(var(--border))"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Controls and Information */}
            <div className="space-y-6">
              <div className="bg-primary/10 border-2 border-primary/30 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-sm text-muted-foreground mb-2">Fraction</div>
                  <div className="text-5xl font-bold">
                    <span className="text-primary">{numerator}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-primary">{denominator}</span>
                  </div>
                </div>

                {simplified.num !== numerator && (
                  <div className="text-center mb-4 p-3 bg-accent/10 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Simplified</div>
                    <div className="text-2xl font-bold text-accent">
                      {simplified.num}/{simplified.den}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Decimal</div>
                    <div className="font-bold">{decimal}</div>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Percentage</div>
                    <div className="font-bold">{percentage}%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Numerator (parts shaded): {numerator}
                  </label>
                  <Slider
                    value={[numerator]}
                    onValueChange={(value) => setNumerator(Math.min(value[0], denominator))}
                    min={0}
                    max={denominator}
                    step={1}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Denominator (total parts): {denominator}
                  </label>
                  <Slider
                    value={[denominator]}
                    onValueChange={(value) => {
                      setDenominator(value[0]);
                      if (numerator > value[0]) setNumerator(value[0]);
                    }}
                    min={1}
                    max={12}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Information */}
      <Card className="bg-primary/5 border-2 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-bold text-lg mb-4">Understanding Fractions</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <Badge className="mb-2">Numerator</Badge>
              <p><strong>Top number:</strong> Shows how many parts we have</p>
              <p className="text-muted-foreground">In 3/4, the numerator is 3</p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">Denominator</Badge>
              <p><strong>Bottom number:</strong> Shows total equal parts</p>
              <p className="text-muted-foreground">In 3/4, the denominator is 4</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">Meaning</Badge>
              <p><strong>What it means:</strong> 3/4 means "3 out of 4 parts"</p>
              <p className="text-muted-foreground">Like eating 3 slices of a 4-slice pizza</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <h5 className="font-semibold mb-2">Special Fractions</h5>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>• <strong>1/2 = 0.5 = 50%</strong> → One half</div>
              <div>• <strong>1/4 = 0.25 = 25%</strong> → One quarter</div>
              <div>• <strong>3/4 = 0.75 = 75%</strong> → Three quarters</div>
              <div>• <strong>1/3 = 0.333... = 33.3%</strong> → One third</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FractionVisualizer;
