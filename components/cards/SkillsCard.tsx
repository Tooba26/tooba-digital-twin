"use client";

import { motion } from "framer-motion";
import { Shell } from ".";
import { certifications, skills } from "@/lib/profile";

export default function SkillsCard() {
  return (
    <Shell>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((g, gi) => (
          <div key={g.group}>
            <h4 className="text-[13px] font-semibold text-muted">{g.group}</h4>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {g.items.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: gi * 0.08 + i * 0.025 }}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[14px] text-ink"
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-line pt-5">
        <h4 className="text-[13px] font-semibold text-muted">Certifications</h4>
        <ul className="mt-2 space-y-1.5 text-[14px] text-ink-2">
          {certifications.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>
    </Shell>
  );
}
