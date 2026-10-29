"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import type { Message } from "./Twin";
import CardFor from "./cards";
import type { CardKind } from "@/lib/profile";

export const UserMessage = forwardRef<HTMLDivElement, { text: string }>(function UserMessage({ text }, ref) {
  return (
    <motion.div
      ref={ref}
      className="flex scroll-mt-24 justify-end"
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <p className="max-w-[85%] rounded-[22px] rounded-br-md bg-ink px-4 py-2.5 text-[16px] leading-relaxed text-bg">{text}</p>
    </motion.div>
  );
});

function TwinLabel() {
  return (
    <div className="mb-2 flex items-center gap-2 text-[13px] font-medium text-muted">
      <span
        className="h-3.5 w-3.5 rounded-full"
        style={{ background: "conic-gradient(var(--c-rose), var(--c-saffron), var(--c-jade), var(--c-indigo), var(--c-rose))" }}
        aria-hidden
      />
      {"Tooba's twin"}
    </div>
  );
}

export function ThinkingBubble() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} aria-label="Thinking">
      <TwinLabel />
      <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-3">
        <span className="dot h-1.5 w-1.5 rounded-full bg-ink" />
        <span className="dot h-1.5 w-1.5 rounded-full bg-ink" />
        <span className="dot h-1.5 w-1.5 rounded-full bg-ink" />
      </div>
    </motion.div>
  );
}

/** Reveals the reply word by word, like the twin is speaking. Screen readers get the full text at once. */
function StreamingText({ text, onDone }: { text: string; onDone: () => void }) {
  const reduce = useReducedMotion();
  const words = text.split(/(\s+)/);
  const [n, setN] = useState(reduce ? words.length : 0);

  useEffect(() => {
    if (reduce) { onDone(); return; }
    if (n >= words.length) { onDone(); return; }
    const t = setTimeout(() => setN((v) => v + 2), 28);
    return () => clearTimeout(t);
  }, [n, words.length, reduce, onDone]);

  return (
    <p className="serif text-[clamp(1.35rem,3.2vw,1.65rem)] leading-[1.32] text-ink">
      <span className="sr-only">{text}</span>
      <span aria-hidden>{words.slice(0, n).join("")}</span>
      {n < words.length && <span aria-hidden className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] animate-pulse bg-ink" />}
    </p>
  );
}

export function AssistantMessage({
  message,
  onAsk,
}: {
  message: Extract<Message, { role: "assistant" }>;
  onAsk: (q: string, cards?: CardKind[]) => void;
}) {
  const [done, setDone] = useState(false);
  const markDone = useState(() => () => setDone(true))[0];

  return (
    <div>
      <TwinLabel />
      <StreamingText text={message.text} onDone={markDone} />
      {done && message.cards.length > 0 && (
        <div className="mt-5 space-y-4">
          {message.cards.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <CardFor kind={c} onAsk={onAsk} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
