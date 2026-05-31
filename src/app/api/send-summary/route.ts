import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface FormData {
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "no_key" }, { status: 503 });
  }

  let subject: string;
  let html: string;

  if (body.type === "chat") {
    const messages: Message[] = body.messages;
    const transcript = messages
      .map(
        (m) =>
          `<tr style="background:${m.role === "user" ? "#f9fafb" : "#ffffff"}">
            <td style="padding:10px 14px;font-weight:600;color:${m.role === "user" ? "#7c3aed" : "#0ea5e9"};white-space:nowrap;vertical-align:top;width:90px">${m.role === "user" ? "Visitor" : "Assistant"}</td>
            <td style="padding:10px 14px;color:#1e293b;line-height:1.6">${m.content}</td>
          </tr>`
      )
      .join("");

    subject = `New portfolio inquiry via AI chat — ${body.visitorName || "Anonymous"}`;
    html = `
      <div style="font-family:Inter,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
        <div style="background:linear-gradient(135deg,#7c3aed,#0ea5e9);padding:24px 28px">
          <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:700">New Inquiry — Portfolio Chat</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px">Someone reached out via your AI chat widget</p>
        </div>
        <div style="padding:24px 28px">
          <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;margin-bottom:24px">
            <tr style="background:#f8fafc">
              <td style="padding:10px 14px;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em">Name</td>
              <td style="padding:10px 14px;color:#1e293b">${body.visitorName || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em">Email</td>
              <td style="padding:10px 14px;color:#1e293b">${body.visitorEmail || "Not provided"}</td>
            </tr>
          </table>
          <h3 style="margin:0 0 12px;color:#1e293b;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Conversation Transcript</h3>
          <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0">
            ${transcript}
          </table>
        </div>
      </div>`;
  } else {
    const f: FormData = body.formData;
    subject = `New project inquiry: ${f.projectType} — ${f.name}`;
    html = `
      <div style="font-family:Inter,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
        <div style="background:linear-gradient(135deg,#7c3aed,#0ea5e9);padding:24px 28px">
          <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:700">New Project Inquiry</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px">Submitted via portfolio contact form</p>
        </div>
        <div style="padding:24px 28px">
          <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0">
            ${[
              ["Name", f.name],
              ["Email", f.email],
              ["Project Type", f.projectType],
              ["Description", f.description],
              ["Timeline", f.timeline],
              ["Budget", f.budget],
            ]
              .map(
                ([label, value], i) =>
                  `<tr style="background:${i % 2 === 0 ? "#f9fafb" : "#ffffff"}">
                    <td style="padding:10px 14px;font-weight:600;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;width:130px">${label}</td>
                    <td style="padding:10px 14px;color:#1e293b;line-height:1.6">${value}</td>
                  </tr>`
              )
              .join("")}
          </table>
        </div>
      </div>`;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: "jpranshu36@gmail.com",
      subject,
      html,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
