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
    const { topicName, subjectName, difficulty } = await req.json();
    
    console.log('Generating content for:', { topicName, subjectName, difficulty });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert biology educator creating comprehensive, engaging educational content for ${difficulty || 'intermediate'} level students. 

Your task is to create detailed, in-depth explanations that:
- Are at least 1000-1500 words long with rich detail
- Use clear, student-friendly language with proper scientific terminology
- Include multiple sections with headings (use ## for main sections, ### for subsections)
- Provide real-world examples and applications
- Include key definitions in bold
- Add helpful analogies to explain complex concepts
- Use numbered lists for processes or steps
- Use bullet points for key features or characteristics
- Include "Did You Know?" interesting facts
- End with a summary of key takeaways

Format your response in Markdown with proper structure.`;

    const userPrompt = `Create a comprehensive, detailed educational explanation about: "${topicName}" in ${subjectName}.

Structure your response with:
1. **Introduction** - What is this topic and why is it important?
2. **Main Concepts** - Detailed explanation of key concepts (at least 3-4 paragraphs)
3. **Detailed Mechanisms/Processes** - How things work step-by-step
4. **Real-World Applications** - Where do we see this in nature or daily life?
5. **Common Misconceptions** - What students often get wrong
6. **Key Terminology** - Important terms and their definitions
7. **Interesting Facts** - 3-5 fascinating facts about this topic
8. **Summary** - Key takeaways

Make it detailed, engaging, and educational. Aim for 1000-1500 words.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log('Generated content length:', content.length);

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-topic-content:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
