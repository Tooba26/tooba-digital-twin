"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Orb from "./Orb";
import { suggestionIcons } from "./Icons";
import { profile, suggestions, type CardKind } from "@/lib/profile";

export default function Landing({ onAsk }: { onAsk: (q: string, cards?: CardKind[]) => void }) {
  const reduce = useReducedMotion();
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <motion.section
      className="flex min-h-[calc(100dvh-4rem-12rem)] flex-col items-center justify-center pt-16 text-center sm:pt-14"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
    >
      <motion.div layoutId="orb" transition={{ type: "spring", stiffness: 260, damping: 30 }}>
        <Orb size={128} />
      </motion.div>

      {profile.availability.open && (
        <motion.button
          variants={item}
          onClick={() => onAsk("Are you open to new opportunities?", ["availability"])}
          className="mt-8 inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-[13px] font-medium text-ink-2 shadow-card transition-colors duration-200 hover:border-line-strong"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
          </span>
          {profile.availability.headline}
        </motion.button>
      )}

      <motion.h1 variants={item} className="serif mt-6 text-[clamp(2.6rem,7vw,4.4rem)] leading-[1.02] text-ink">
        Hi, I&apos;m {profile.firstName}&apos;s digital twin.
      </motion.h1>
      <motion.p variants={item} className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">
        Interview me about my AI research, the things I&apos;ve built, or how we could work together.
      </motion.p>

      <motion.ul
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        className="mt-10 grid w-full max-w-2xl gap-2.5 sm:grid-cols-2"
      >
        {suggestions.map((s) => {
          const Icon = suggestionIcons[s.icon];
          return (
            <motion.li key={s.q} variants={item}>
              <button
                onClick={() => onAsk(s.q, s.cards)}
                className="group flex min-h-14 w-full items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-left text-[15px] text-ink shadow-card transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong active:translate-y-0"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-2 transition-colors group-hover:text-ink">
                  <Icon size={17} />
                </span>
                <span className="flex-1">{s.q}</span>
                <ArrowUpRight size={16} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </button>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.section>
  );
}
