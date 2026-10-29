import { NextResponse } from "next/server";
import { allCards, builtInAnswer, systemPrompt, type Answer } from "@/lib/engine";
import * as P from "@/lib/profile";

export const runtime = "nodejs";
export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; text: string };

const knowledge = JSON.stringify({
  profile: P.profile,
  projects: P.projects,
  publications: P.publications.map((p) => ({ ...p, stage: P.publicationStages[p.stage] })),
  experience: P.experience,
  education: P.education,
  skills: P.skills,
  certifications: P.certifications,
});

// Best-effort rate limit (per server instance): 20 requests / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: Msg) => (m?.role === "user" || m?.role === "assistant") && typeof m?.text === "string")
      .slice(-10)
      .map((m: Msg) => ({ role: m.role, text: m.text.slice(0, 600) }));
  } catch {
    return NextResponse.json({ error: "Send JSON with a messages array." }, { status: 400 });
  }

  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return NextResponse.json({ error: "Ask a question first." }, { status: 400 });

  const key = process.env.GEMINI_API_KEY;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (!key || limited(ip)) return NextResponse.json(builtInAnswer(last.text));

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt(knowledge) }] },
        contents: messages.map((m) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] })),
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 400,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              reply: { type: "STRING" },
              cards: { type: "ARRAY", items: { type: "STRING", enum: allCards } },
            },
            required: ["reply", "cards"],
          },
        },
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`Gemini ${res.status}`);
    const data = await res.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(text ?? "{}");
    const answer: Answer = {
      reply: String(parsed.reply || "").trim() || builtInAnswer(last.text).reply,
      cards: (Array.isArray(parsed.cards) ? parsed.cards : []).filter((c: string) => (allCards as string[]).includes(c)).slice(0, 2),
      source: "ai",
    };
    return NextResponse.json(answer);
  } catch (err) {
    console.error("[chat] falling back to built-in answers:", err);
    return NextResponse.json(builtInAnswer(last.text));
  }
}
