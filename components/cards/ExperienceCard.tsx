"use client";

import { motion } from "framer-motion";
import { FileText, GraduationCap } from "lucide-react";
import { Shell } from ".";
import { education, experience, profile } from "@/lib/profile";

export default function ExperienceCard() {
  return (
    <Shell>
      <ol className="relative space-y-6 pl-6">
        <motion.span
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-line-strong"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
        {experience.map((e, i) => (
          <motion.li
            key={e.org}
            className="relative"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.15 }}
          >
            <span className={`absolute -left-6 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${i === 0 ? "border-jade bg-jade" : "border-line-strong bg-surface"}`} aria-hidden />
            <p className="text-[13px] font-medium text-muted">{e.period} · {e.place}</p>
            <h4 className="mt-0.5 text-[17px] font-semibold tracking-tight">{e.org}</h4>
            <p className="text-[15px] text-ink-2">{e.role}</p>
            <ul className="mt-2 space-y-1 text-[14px] text-muted">
              {e.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </motion.li>
        ))}
      </ol>

      <div className="mt-6 grid gap-2.5 border-t border-line pt-5 sm:grid-cols-2">
        {education.map((ed) => (
          <div key={ed.degree} className="rounded-2xl bg-surface-2 p-4">
            <p className="flex items-center gap-1.5 text-[13px] text-muted"><GraduationCap size={15} />{ed.period}</p>
            <p className="mt-1 font-semibold leading-snug">{ed.degree}</p>
            <p className="text-[14px] text-ink-2">{ed.school}</p>
            <p className="mt-1.5 text-[13px] text-muted">{ed.note}</p>
          </div>
        ))}
      </div>

      {profile.links.cv && (
        <a href={profile.links.cv} target="_blank" rel="noreferrer" className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-bg">
          <FileText size={16} /> Download my CV
        </a>
      )}
    </Shell>
  );
}
