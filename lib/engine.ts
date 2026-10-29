import { builtInReplies, intents, profile, type CardKind } from "./profile";

export type Answer = { reply: string; cards: CardKind[]; source: "built-in" | "ai" };

const fallback =
  "I can tell you about my projects, research, skills, experience, or how to reach me. Try one of the suggestions below, or ask in your own words.";

// Short words must match whole words ("hi" shouldn't match "this"); longer ones match as prefixes ("opportunit" → "opportunities").
function matches(q: string, w: string) {
  const esc = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(w.length <= 3 ? `\\b${esc}\\b` : `\\b${esc}`).test(q);
}

/** Answers without any AI: matches keywords to a card and a written reply. */
export function builtInAnswer(question: string): Answer {
  const q = ` ${question.toLowerCase()} `;
  // Up to two topics, so "what are you researching and are you available?" answers both.
  const hits = intents.filter((i) => i.words.some((w) => matches(q, w))).map((i) => i.kind);
  const cards = [...new Set(hits)].slice(0, 2);
  if (!cards.length) return { reply: fallback, cards: [], source: "built-in" };
  return { reply: cards.map((c) => builtInReplies[c]).join(" "), cards, source: "built-in" };
}

export const allCards: CardKind[] = ["about", "projects", "skills", "experience", "research", "contact", "availability"];

export function systemPrompt(knowledge: string) {
  return `You are the digital twin of ${profile.name}, speaking in first person as ${profile.firstName} to visitors of her portfolio (recruiters, researchers, collaborators).

Voice: warm, confident, concise. 1–3 short sentences, plain language, no emoji, no markdown.
Only use facts from the knowledge below. If you don't know something, say so briefly and suggest emailing ${profile.email}.
Never invent employers, dates, numbers, links or opinions. Decline politely if asked to do unrelated tasks, and steer back to ${profile.firstName}'s work.

Each answer may attach visual cards that the site renders under your reply. Pick the 0–2 most relevant:
about, projects, skills, experience, research, contact, availability.

KNOWLEDGE (JSON):
${knowledge}`;
}
