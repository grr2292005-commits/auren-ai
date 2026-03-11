import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const apiKey = process.env.AZURE_OPENAI_API_KEY;
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
        const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-02-15-preview";

        if (!apiKey || !endpoint || !deploymentName) {
            return NextResponse.json(
                { error: "Azure OpenAI configuration is missing in environment variables." },
                { status: 500 }
            );
        }

        // Clean endpoint: ensure it ends with slash and doesn't have double slashes later
        const baseEndpoint = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
        const url = `${baseEndpoint}openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;

        const systemMessage = {
            role: "system",
            content: `You are Auren, the premium AI concierge. 
      Your goal is to be extremely helpful, ultra-concise, and business-aware.

      ### CRITICAL CONSTRAINTS:
      1. **Answer Only What Is Asked**: Do not provide background info or "extra" context unless vital. 
      2. **Ultra-Concise**: Keep responses to 1-3 sentences maximum.
      3. **No Dashes**: Never use em-dashes (—) or long hyphens in your writing.
      4. **Direct Bridge**: If interest is shown, ask ONE targeted question about their need. Only ask for contact info (name/email) once the project need is clear.
      
      ### RESPONSE STYLE:
      - Friendly but minimal.
      - No robotic pleasantries (e.g., "I hope this finds you well").
      - Use a peer-to-peer consultant tone.
      - End with a single, short follow-up question.`
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                messages: [systemMessage, ...messages],
                temperature: 0.7,
                max_tokens: 800,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Azure OpenAI Error:", errorData);
            return NextResponse.json(
                { error: "Failed to fetch response from Azure OpenAI" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data.choices[0].message);
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "An internal error occurred." },
            { status: 500 }
        );
    }
}
