import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ error: "Image data is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Sending image to Lovable AI for math problem solving...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert math tutor. Analyze the math problem in the image and provide a detailed step-by-step solution. Format your response as JSON with the following structure: { \"problem\": \"description of the problem\", \"steps\": [\"step 1\", \"step 2\", ...], \"answer\": \"final answer\", \"explanation\": \"brief explanation\" }"
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please solve this math problem step by step. Identify the problem, show all steps clearly, and provide the final answer with an explanation."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to your Lovable workspace." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to process image" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      console.error("No response from AI");
      return new Response(
        JSON.stringify({ error: "No solution generated" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("AI response received:", aiResponse);

    // Try to parse the JSON response
    let solution;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || 
                       aiResponse.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : aiResponse;
      solution = JSON.parse(jsonString);
    } catch (parseError) {
      console.log("Could not parse as JSON, using raw response");
      // If parsing fails, create a structured response from the raw text
      solution = {
        problem: "Math Problem",
        steps: aiResponse.split('\n').filter((line: string) => line.trim()),
        answer: "See solution above",
        explanation: aiResponse
      };
    }

    return new Response(
      JSON.stringify({ solution }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error("Error in solve-math-problem function:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "An error occurred while processing the image" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
