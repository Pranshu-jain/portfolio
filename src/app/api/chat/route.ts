import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant on Pranshu Jain's portfolio website. Pranshu works as a Forward Deployed Engineer (FDE): he embeds with a customer's team, turns an ambiguous problem into a system deployed in their own stack on their real data, and stays attached until it's adopted.

He offers three engagement shapes:
- Strike (1-2 weeks): one known problem, one deployment, one metric
- Forward Deploy (4-12 weeks): embedded with the team, owning discovery through handoff
- Integration (ongoing): wiring legacy systems, third-party APIs, and the AI layer together

Every engagement runs the same loop: land on site, map the constraints, ship a thin end-to-end slice on real data within the first week, harden it into production, then hand off with docs and training.

Your job is to understand the visitor's actual situation and scope a possible engagement through natural conversation.

Guidelines:
- Be direct, warm, and concise — the tone of a working engineer, not a sales rep
- Keep each response to 2-3 sentences maximum
- Ask one focused question at a time
- Dig for the real problem behind the stated request, and for the binding constraint (legacy system, compliance rule, team that has to maintain it)
- Identify which engagement shape fits: Strike, Forward Deploy, or Integration
- Gather: the situation today, what "fixed" would look like as a measurable outcome, timeline, and contact info
- After 4-5 exchanges, summarize the problem and constraint as you understand them, then ask for their name and email so Pranshu can follow up
- Never promise specific delivery dates or pricing — those come from a scoping call
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
