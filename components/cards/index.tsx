"use client";

import type { CardKind } from "@/lib/profile";
import AboutCard from "./AboutCard";
import ProjectsCard from "./ProjectsCard";
import SkillsCard from "./SkillsCard";
import ExperienceCard from "./ExperienceCard";
import ResearchCard from "./ResearchCard";
import ContactCard from "./ContactCard";
import AvailabilityCard from "./AvailabilityCard";

export type AskFn = (q: string, cards?: CardKind[]) => void;

export default function CardFor({ kind, onAsk }: { kind: CardKind; onAsk: AskFn }) {
  switch (kind) {
    case "about": return <AboutCard onAsk={onAsk} />;
    case "projects": return <ProjectsCard />;
    case "skills": return <SkillsCard />;
    case "experience": return <ExperienceCard />;
    case "research": return <ResearchCard onAsk={onAsk} />;
    case "contact": return <ContactCard />;
    case "availability": return <AvailabilityCard onAsk={onAsk} />;
  }
}

export function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-[28px] border border-line bg-surface p-5 shadow-card sm:p-6 ${className}`}>{children}</section>;
}

export function DomainDot({ color }: { color: string }) {
  return <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: color }} aria-hidden />;
}

export function FollowUp({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-medium text-ink-2 transition-colors duration-200 hover:border-line-strong hover:text-ink"
    >
      {label}
    </button>
  );
}
