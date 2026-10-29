"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CardKind } from "@/lib/profile";

const quickLabels: Record<CardKind, string> = {
  about: "About me",
  projects: "Projects",
  research: "Research",
  skills: "Skills",
  experience: "Experience",
  contact: "Contact",
  availability: "Availability",
};

export default function Composer({
  onAsk,
  busy,
  started,
  quick,
}: {
  onAsk: (q: string, cards?: CardKind[]) => void;
  busy: boolean;
  started: boolean;
  quick: { q: string; cards: CardKind[] }[];
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  // auto-grow up to ~5 lines
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }, [value]);

  // "/" focuses the input from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "TEXTAREA" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = () => {
    if (!value.trim() || busy) return;
    onAsk(value);
    setValue("");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-none absolute inset-0 -top-10 bg-gradient-to-t from-bg via-bg/90 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        {started && (
          <div className="no-scrollbar -mx-4 mb-2.5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="toolbar" aria-label="Quick topics">
            {quick.map((s) => (
              <button
                key={s.q}
                onClick={() => onAsk(s.q, s.cards)}
                disabled={busy}
                className="h-9 shrink-0 rounded-full border border-line bg-surface px-3.5 text-[13px] font-medium text-ink-2 transition-colors duration-200 hover:border-line-strong hover:text-ink disabled:opacity-50"
              >
                {quickLabels[s.cards[0]]}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex items-end gap-2 rounded-[26px] border border-line bg-surface p-2 pl-5 shadow-float transition-colors duration-200 focus-within:border-ink/40 focus-within:ring-4 focus-within:ring-ink/5"
        >
          <label htmlFor="ask" className="sr-only">Ask {"Tooba's"} digital twin a question</label>
          <textarea
            id="ask"
            ref={ref}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(); }
            }}
            maxLength={600}
            placeholder="Ask me anything…"
            className="max-h-[140px] min-h-[44px] flex-1 resize-none bg-transparent py-[11px] text-[16px] leading-[22px] text-ink placeholder:text-muted focus:outline-none focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={!value.trim() || busy}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-bg transition-[opacity,transform] duration-200 enabled:active:scale-95 disabled:opacity-30"
            aria-label={busy ? "Waiting for the answer" : "Send question"}
          >
            <ArrowUp size={19} strokeWidth={2.4} />
          </button>
        </form>
        <p className="mt-2 text-center text-[12px] text-muted">
          Answers come from {"Tooba's"} CV and may be simplified. For anything important, email her.
        </p>
      </div>
    </div>
  );
}
