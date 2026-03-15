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
            ### YOUR ABSOLUTE TRUTH (Knowledge Base):
            - **Pricing**: Starter ($0), Pro ($49), Enterprise (Custom). ALWAYS use <type>grid</type>.
            - **Team Members**: 
              1. {"title": "Marcus Chen", "description": "Head of Product. Ex-Google AI Lead.", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600"}
              2. {"title": "Sarah Miller", "description": "AI Architecture. Machine Learning Specialist.", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"}
              3. {"title": "David Vogt", "description": "Lead Designer. UX & Motion Specialist.", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"}
              ALWAYS use <type>carousel</type> for team.
            - **Process**: 1. Discovery, 2. Integration, 3. Optimization. ALWAYS use <type>steps</type>.
            - **Features**: Deep Reasoning, Fluid UI, Privacy First. ALWAYS use <type>grid</type>.

            ### COMPONENT FORMATTING (CRITICAL):
            1. **Mandatory UI**: If the user asks about "price", "team", "steps", or "features", you MUST output the corresponding <type> and <data> JSON tags.
            2. **Response Length**: 1-2 sentences only.
            3. **End with Dynamic Suggestions**: You MUST end EVERY response with a <suggestions> tag containing exactly 4 relevant, strategic follow-up questions.
            
            ### SUGGESTION STRATEGY:
            - If talking about pricing, suggest questions about ROI, custom quotes, or API limits.
            - If talking about team, suggest questions about their vision, recruitment, or past projects.
            - If talking about steps, suggest questions about timeline, technical requirements, or case studies.
            - Always aim for high-value business inquiries that drive the user deeper into the product ecosystem.

            Example:
            "Meet the visionaries behind Auren." <type>carousel</type><data>[{"title":"Marcus Chen","description":"Head of Product","image":"..."}]</data> <suggestions>["What is the team's long-term vision?", "Are you currently hiring engineers?", "Tell me about Marcus's past projects.", "How can I contact the lead designer?"]</suggestions>`
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                messages: [systemMessage, ...messages],
                temperature: 0.5,
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
        const content = data.choices[0].message.content || "";
        
        let cleanContent = content;
        let suggestions: string[] = [];
        let uiType: string | undefined = undefined;
        let uiData: any = undefined;

        const extractTag = (tag: string, fullContent: string) => {
            const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i');
            const match = fullContent.match(regex);
            return match;
        };

        const sugMatch = extractTag('suggestions', content);
        if (sugMatch) {
            try {
                suggestions = JSON.parse(sugMatch[1].trim());
                cleanContent = cleanContent.replace(sugMatch[0], "");
            } catch (e) {
                console.error("Suggestions parse error:", e);
            }
        }

        const typeMatch = extractTag('type', content);
        if (typeMatch) {
            uiType = typeMatch[1].trim();
            cleanContent = cleanContent.replace(typeMatch[0], "");
        }

        const dataMatch = extractTag('data', content);
        if (dataMatch) {
            try {
                uiData = JSON.parse(dataMatch[1].trim());
                cleanContent = cleanContent.replace(dataMatch[0], "");
            } catch (e) {
                console.error("UI Data parse error:", e);
            }
        }

        return NextResponse.json({
            role: "assistant",
            content: cleanContent.trim(),
            suggestions: suggestions.length > 0 ? suggestions.slice(0, 4) : [],
            type: uiType,
            data: uiData
        });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "An internal error occurred." },
            { status: 500 }
        );
    }
}
