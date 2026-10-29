"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { FileText, RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Orb from "./Orb";
import ThemeToggle from "./ThemeToggle";
import Composer from "./Composer";
import Landing from "./Landing";
import { AssistantMessage, ThinkingBubble, UserMessage } from "./Messages";
import { builtInAnswer, type Answer } from "@/lib/engine";
import { builtInReplies, profile, suggestions, type CardKind } from "@/lib/profile";

export type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text: string; cards: CardKind[]; source: Answer["source"] };

const uid = () => Math.random().toString(36).slice(2, 10);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Twin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const reduce = useReducedMotion();
  const params = useSearchParams();
  const askedFromUrl = useRef(false);
  const lastUserRef = useRef<HTMLDivElement>(null);
  const started = messages.length > 0;

  const ask = useCallback(
    async (question: string, presetCards?: CardKind[]) => {
      const q = question.trim();
      if (!q || thinking) return;
      const userMsg: Message = { id: uid(), role: "user", text: q };
      const history = [...messages, userMsg];
      setMessages(history);
      setThinking(true);

      let answer: Answer;
      const started = Date.now();
      if (presetCards) {
        // Suggested questions answer instantly from the built-in replies: no AI call needed.
        answer = { reply: builtInReplies[presetCards[0]], cards: presetCards, source: "built-in" };
      } else {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: history.map((m) => ({ role: m.role, text: m.text })) }),
          });
          if (!res.ok) throw new Error(String(res.status));
          answer = await res.json();
        } catch {
          answer = builtInAnswer(q);
        }
      }
      // Keep the thinking state on screen long enough to read as a response, not a flash.
      const elapsed = Date.now() - started;
      if (!reduce && elapsed < 650) await wait(650 - elapsed);

      setMessages((m) => [...m, { id: uid(), role: "assistant", text: answer.reply, cards: answer.cards, source: answer.source }]);
      setThinking(false);
    },
    [messages, thinking, reduce]
  );

  // Deep link: /?q=What+are+you+researching
  useEffect(() => {
    const q = params.get("q") || params.get("query");
    if (q && !askedFromUrl.current) {
      askedFromUrl.current = true;
      ask(q);
    }
  }, [params, ask]);

  // Bring the newest question to the top so the answer unfolds beneath it.
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.role === "user") {
      requestAnimationFrame(() =>
        lastUserRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
      );
    }
  }, [messages, reduce]);

  const reset = () => {
    setMessages([]);
    window.scrollTo({ top: 0 });
  };

  const lastUserId = [...messages].reverse().find((m) => m.role === "user")?.id;

  return (
    <LayoutGroup>
      <div className="relative min-h-dvh">
        <div className="dot-field pointer-events-none fixed inset-0 -z-0" aria-hidden />

        <header className="sticky top-0 z-40 border-b border-transparent bg-bg/90 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/80">
          <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <AnimatePresence>
                {started && (
                  <motion.div layoutId="orb" className="shrink-0" transition={{ type: "spring", stiffness: 260, damping: 30 }}>
                    <Orb size={36} thinking={thinking} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-[15px] font-semibold tracking-tight">{profile.name}</p>
                <p className="truncate text-[13px] text-muted">
                  {thinking ? "Thinking…" : started ? "Digital twin, answering as Tooba" : profile.title}
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {started && (
                <button
                  onClick={reset}
                  className="flex h-11 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors duration-200 hover:text-ink"
                  aria-label="Start a new conversation"
                >
                  <RotateCcw size={16} />
                  <span className="hidden sm:inline">New chat</span>
                </button>
              )}
              {profile.links.cv && (
                <a
                  href={profile.links.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors duration-200 hover:border-line-strong sm:flex"
                >
                  <FileText size={16} />
                  CV
                </a>
              )}
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="relative mx-auto max-w-3xl px-4 pb-56 sm:px-6">
          <AnimatePresence mode="wait">
            {!started ? (
              <Landing key="landing" onAsk={ask} />
            ) : (
              <motion.div
                key="thread"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 pt-8"
                role="log"
                aria-live="polite"
                aria-label="Conversation"
              >
                {messages.map((m) =>
                  m.role === "user" ? (
                    <UserMessage key={m.id} ref={m.id === lastUserId ? lastUserRef : undefined} text={m.text} />
                  ) : (
                    <AssistantMessage key={m.id} message={m} onAsk={ask} />
                  )
                )}
                {thinking && <ThinkingBubble />}
                {/* room so the latest question can scroll to the top */}
                <div className="h-[40vh]" aria-hidden />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Composer onAsk={ask} busy={thinking} started={started} quick={suggestions} />
      </div>
    </LayoutGroup>
  );
}
