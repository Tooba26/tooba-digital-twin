"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { Shell } from ".";
import { GithubIcon, LinkedinIcon } from "../Icons";
import { profile } from "@/lib/profile";

export default function ContactCard() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { key: "linkedin", label: "LinkedIn", icon: <LinkedinIcon size={17} />, href: profile.links.linkedin },
    { key: "github", label: "GitHub", icon: <GithubIcon size={17} />, href: profile.links.github },
    { key: "scholar", label: "Google Scholar", icon: <ArrowUpRight size={17} />, href: profile.links.scholar },
    { key: "cv", label: "CV", icon: <FileText size={17} />, href: profile.links.cv },
  ].filter((l) => l.href);

  return (
    <Shell>
      <p className="text-[13px] font-medium text-muted">Email</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-5 text-[15px] font-semibold text-bg transition-transform duration-200 active:scale-[0.98]"
        >
          <Mail size={17} />
          {profile.email}
        </a>
        <button
          onClick={copy}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink-2 transition-colors duration-200 hover:border-line-strong hover:text-ink"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "y" : "n"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-2"
            >
              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink-2 transition-colors duration-200 hover:border-line-strong hover:text-ink"
            >
              {l.icon}
              {l.label}
            </a>
          ))}
        </div>
      )}

      <p className="mt-5 text-sm text-muted">{profile.location} (UTC+7). Usually replies within a day or two.</p>
    </Shell>
  );
}
