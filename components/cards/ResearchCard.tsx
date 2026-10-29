"use client";

import { motion } from "framer-motion";
import { DomainDot, FollowUp, Shell, type AskFn } from ".";
import { domainMeta, publicationStages, publications } from "@/lib/profile";

export default function ResearchCard({ onAsk }: { onAsk: AskFn }) {
  const last = publicationStages.length - 1;
  return (
    <div className="space-y-3">
      {publications.map((p, idx) => {
        const color = domainMeta[p.domain].color;
        return (
          <Shell key={p.title}>
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-muted">
              <DomainDot color={color} />
              {domainMeta[p.domain].label}
              <span className="text-line-strong">/</span>
              {p.kind}
              <span className="ml-auto rounded-full bg-surface-2 px-2.5 py-1 text-[12px] text-ink-2">Working title</span>
            </div>
            <h4 className="serif mt-3 text-[1.6rem] leading-[1.15] text-ink">{p.title}</h4>

            <div className="mt-6" role="img" aria-label={`Current stage: ${publicationStages[p.stage]} (${p.stage + 1} of ${publicationStages.length})`}>
              <div className="relative h-1 rounded-full bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(p.stage / last) * 100}%` }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                {publicationStages.map((s, i) => (
                  <span key={s} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(i / last) * 100}%` }}>
                    {i === p.stage && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ background: color }}
                        animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    )}
                    <span
                      className="relative block h-3 w-3 rounded-full border-2"
                      style={{ background: i <= p.stage ? color : "var(--surface)", borderColor: i <= p.stage ? color : "var(--line-strong)" }}
                    />
                  </span>
                ))}
              </div>
              <div className="mt-3 grid text-[12px]" style={{ gridTemplateColumns: `repeat(${publicationStages.length}, 1fr)` }}>
                {publicationStages.map((s, i) => (
                  <span key={s} className={`${i === 0 ? "text-left" : i === last ? "text-right" : "text-center"} ${i === p.stage ? "font-semibold text-ink" : "text-muted"}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Shell>
        );
      })}
      <div className="flex flex-wrap gap-2 pt-1">
        <FollowUp label="Show the projects behind them" onClick={() => onAsk("What projects are you most proud of?", ["projects"])} />
        <FollowUp label="Collaborate on research" onClick={() => onAsk("How can I reach you?", ["contact"])} />
      </div>
    </div>
  );
}
