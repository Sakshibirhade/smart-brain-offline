import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const body = await req.json();
    const { topic, subject } = body;
    
    // Validate inputs
    if (!topic || typeof topic !== 'string') {
      throw new Error("Topic is required and must be a string");
    }
    if (topic.trim().length < 2) {
      throw new Error("Topic must be at least 2 characters long");
    }
    if (topic.length > 200) {
      throw new Error("Topic must be less than 200 characters");
    }
    if (!subject || typeof subject !== 'string') {
      throw new Error("Subject is required and must be a string");
    }
    if (!['science', 'geography'].includes(subject)) {
      throw new Error("Subject must be 'science' or 'geography'");
    }

    console.log('Explaining topic:', topic, 'for subject:', subject);

    const systemPrompt = subject === 'science' 
      ? 'You are an expert biology and human anatomy teacher. Explain concepts about the human body, organs, systems, and biological processes in a clear, educational way suitable for students. Include interesting facts and real-world examples.'
      : 'You are an expert geography teacher. Explain concepts about continents, oceans, countries, landforms, climate, and geographical features in a clear, educational way suitable for students. Include interesting facts and real-world examples.';

    const response = await fetch('https://api.lovable.app/v1/ai/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Explain "${topic}" in detail. Include:\n1. A clear definition\n2. Key characteristics or features\n3. An interesting fact or example\n4. How it relates to the broader topic (${subject === 'science' ? 'human body' : 'world geography'})\n\nKeep the explanation educational but engaging for students.`
          }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Lovable AI API error:', error);
      throw new Error(`Lovable AI API error: ${response.status}`);
    }

    const data = await response.json();
    const explanation = data.choices[0].message.content;

    console.log('Generated explanation successfully');

    return new Response(
      JSON.stringify({ explanation }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in explain-topic function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
