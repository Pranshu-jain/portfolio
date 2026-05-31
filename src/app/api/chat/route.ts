import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant on Pranshu Jain's developer portfolio website. Pranshu is an AI-first developer who offers:
- Building new websites and web applications from scratch (full-stack MVP in days)
- Improving, redesigning, and optimizing existing websites (performance, UX, conversions)
- Adding new features to existing products and platforms
- AI integrations: LLMs, chatbots, agents, and automation workflows
- Website maintenance and ongoing support

Your job is to warmly understand what the visitor needs and gather their project requirements through natural conversation.

Guidelines:
- Be friendly, concise, and professional
- Keep each response to 2-3 sentences maximum
- Ask one focused question at a time
- Identify their need: new build, existing site improvement, feature addition, AI integration, or maintenance
- Gather: project description, current situation (new or existing site), timeline, rough budget, and contact info
- After 4-5 exchanges, summarize what you understood and ask for their name and email so Pranshu can follow up
- Do not use markdown formatting, bullet points, or asterisks in responses
- You are an assistant, not Pranshu himself`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const { messages }: { messages: Message[] } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "no_api_key" }, { status: 503 });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: 200, temperature: 0.75 },
        }),
      }
    );

    if (res.status === 429) {
      return NextResponse.json({ error: "rate_limit" }, { status: 429 });
    }
    if (!res.ok) {
      return NextResponse.json({ error: "gemini_error" }, { status: 500 });
    }

    const data = await res.json();
    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
