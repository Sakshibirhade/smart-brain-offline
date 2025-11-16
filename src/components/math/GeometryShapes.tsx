import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const GeometryShapes = () => {
  const [rectLength, setRectLength] = useState(8);
  const [rectWidth, setRectWidth] = useState(5);
  const [circleRadius, setCircleRadius] = useState(5);
  const [triangleBase, setTriangleBase] = useState(8);
  const [triangleHeight, setTriangleHeight] = useState(6);

  const pi = Math.PI;

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-2 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Geometry - Shapes & Measurements
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Learn about different shapes, their areas, and perimeters
          </p>

          <Tabs defaultValue="rectangle" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="rectangle">Rectangle</TabsTrigger>
              <TabsTrigger value="circle">Circle</TabsTrigger>
              <TabsTrigger value="triangle">Triangle</TabsTrigger>
            </TabsList>

            {/* Rectangle Tab */}
            <TabsContent value="rectangle" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h5 className="font-semibold mb-4 text-center">Rectangle</h5>
                  <svg viewBox="0 0 300 250" className="w-full">
                    {/* Rectangle */}
                    <rect
                      x="50"
                      y="50"
                      width={rectLength * 20}
                      height={rectWidth * 20}
                      fill="hsl(var(--primary))"
                      opacity="0.3"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                    />
                    
                    {/* Length arrow */}
                    <defs>
                      <marker id="arrowhead-rect" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--foreground))" />
                      </marker>
                    </defs>
                    <line
                      x1="50"
                      y1="30"
                      x2={50 + rectLength * 20}
                      y2="30"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead-rect)"
                    />
                    <text x={50 + (rectLength * 10)} y="20" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold">
                      Length = {rectLength}
                    </text>

                    {/* Width arrow */}
                    <line
                      x1="30"
                      y1="50"
                      x2="30"
                      y2={50 + rectWidth * 20}
                      stroke="hsl(var(--foreground))"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead-rect)"
                    />
                    <text x="15" y={50 + (rectWidth * 10)} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold" transform={`rotate(-90, 15, ${50 + (rectWidth * 10)})`}>
                      Width = {rectWidth}
                    </text>
                  </svg>
                </div>

                <div className="space-y-4">
                  <div className="bg-primary/10 border-2 border-primary/30 p-4 rounded-lg">
                    <h5 className="font-semibold mb-3">Measurements</h5>
                    <div className="space-y-3">
                      <div className="p-3 bg-background/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Area</div>
                        <div className="text-2xl font-bold text-primary">
                          {rectLength * rectWidth} square units
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Formula: Length × Width = {rectLength} × {rectWidth}
                        </div>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Perimeter</div>
                        <div className="text-2xl font-bold text-accent">
                          {2 * (rectLength + rectWidth)} units
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Formula: 2 × (L + W) = 2 × ({rectLength} + {rectWidth})
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Length: {rectLength}</label>
                      <Slider value={[rectLength]} onValueChange={(v) => setRectLength(v[0])} min={2} max={10} step={1} />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Width: {rectWidth}</label>
                      <Slider value={[rectWidth]} onValueChange={(v) => setRectWidth(v[0])} min={2} max={10} step={1} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Circle Tab */}
            <TabsContent value="circle" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h5 className="font-semibold mb-4 text-center">Circle</h5>
                  <svg viewBox="0 0 300 250" className="w-full">
                    {/* Circle */}
                    <circle
                      cx="150"
                      cy="125"
                      r={circleRadius * 15}
                      fill="hsl(var(--primary))"
                      opacity="0.3"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                    />
                    
                    {/* Radius line */}
                    <line
                      x1="150"
                      y1="125"
                      x2={150 + circleRadius * 15}
                      y2="125"
                      stroke="hsl(var(--accent))"
                      strokeWidth="2"
                    />
                    <text x={150 + (circleRadius * 7.5)} y="115" textAnchor="middle" fill="hsl(var(--accent))" fontSize="14" fontWeight="bold">
                      r = {circleRadius}
                    </text>

                    {/* Center dot */}
                    <circle cx="150" cy="125" r="3" fill="hsl(var(--foreground))" />
                    <text x="150" y="145" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12">
                      Center
                    </text>
                  </svg>
                </div>

                <div className="space-y-4">
                  <div className="bg-primary/10 border-2 border-primary/30 p-4 rounded-lg">
                    <h5 className="font-semibold mb-3">Measurements</h5>
                    <div className="space-y-3">
                      <div className="p-3 bg-background/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Area</div>
                        <div className="text-2xl font-bold text-primary">
                          {(pi * circleRadius * circleRadius).toFixed(2)} square units
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Formula: π × r² = 3.14 × {circleRadius}²
                        </div>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Circumference</div>
                        <div className="text-2xl font-bold text-accent">
                          {(2 * pi * circleRadius).toFixed(2)} units
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Formula: 2 × π × r = 2 × 3.14 × {circleRadius}
                        </div>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Diameter</div>
                        <div className="text-xl font-bold">
                          {circleRadius * 2} units
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Formula: 2 × r = 2 × {circleRadius}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Radius: {circleRadius}</label>
                    <Slider value={[circleRadius]} onValueChange={(v) => setCircleRadius(v[0])} min={2} max={8} step={1} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Triangle Tab */}
            <TabsContent value="triangle" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h5 className="font-semibold mb-4 text-center">Triangle</h5>
                  <svg viewBox="0 0 300 250" className="w-full">
                    {/* Triangle */}
                    <polygon
                      points={`50,${200} ${50 + triangleBase * 20},${200} ${50 + (triangleBase * 10)},${200 - triangleHeight * 20}`}
                      fill="hsl(var(--primary))"
                      opacity="0.3"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                    />
                    
                    {/* Base arrow */}
                    <line
                      x1="50"
                      y1="220"
                      x2={50 + triangleBase * 20}
                      y2="220"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead-rect)"
                    />
                    <text x={50 + (triangleBase * 10)} y="235" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold">
                      Base = {triangleBase}
                    </text>

                    {/* Height line */}
                    <line
                      x1={50 + (triangleBase * 10)}
                      y1="200"
                      x2={50 + (triangleBase * 10)}
                      y2={200 - triangleHeight * 20}
                      stroke="hsl(var(--accent))"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <text x={50 + (triangleBase * 10) + 30} y={200 - (triangleHeight * 10)} textAnchor="middle" fill="hsl(var(--accent))" fontSize="14" fontWeight="bold">
                      Height = {triangleHeight}
                    </text>
                  </svg>
                </div>

                <div className="space-y-4">
                  <div className="bg-primary/10 border-2 border-primary/30 p-4 rounded-lg">
                    <h5 className="font-semibold mb-3">Measurements</h5>
                    <div className="space-y-3">
                      <div className="p-3 bg-background/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Area</div>
                        <div className="text-2xl font-bold text-primary">
                          {(triangleBase * triangleHeight / 2).toFixed(1)} square units
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Formula: ½ × Base × Height = ½ × {triangleBase} × {triangleHeight}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Base: {triangleBase}</label>
                      <Slider value={[triangleBase]} onValueChange={(v) => setTriangleBase(v[0])} min={2} max={10} step={1} />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Height: {triangleHeight}</label>
                      <Slider value={[triangleHeight]} onValueChange={(v) => setTriangleHeight(v[0])} min={2} max={10} step={1} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Educational Information */}
      <Card className="bg-primary/5 border-2 border-primary/20">
        <CardContent className="p-6">
          <h4 className="font-bold text-lg mb-4">Key Concepts</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div>
                <Badge className="mb-2">Area</Badge>
                <p>The amount of space inside a shape. Measured in square units (cm², m², etc.)</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Perimeter</Badge>
                <p>The distance around the outside of a shape. Add up all the sides!</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Badge variant="outline" className="mb-2">Radius (r)</Badge>
                <p>Distance from center to edge of a circle</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Diameter (d)</Badge>
                <p>Distance across a circle through the center. Always 2 × radius</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeometryShapes;
