"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DomainDot } from ".";
import { domainMeta, projects, type Domain, type Project } from "@/lib/profile";

const filters: ("all" | Domain)[] = ["all", "edtech", "vision", "language", "product"];

export default function ProjectsCard() {
  const [filter, setFilter] = useState<"all" | Domain>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const list = filter === "all" ? projects : projects.filter((p) => p.domain === filter);

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="no-scrollbar -mx-4 mb-3 flex items-center gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => { setFilter(f); track.current?.scrollTo({ left: 0 }); }}
            className={`relative flex h-9 shrink-0 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium transition-colors duration-200 ${
              filter === f ? "text-bg" : "text-ink-2 hover:text-ink"
            }`}
          >
            {filter === f && (
              <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="relative flex items-center gap-2">
              {f !== "all" && <DomainDot color={domainMeta[f].color} />}
              {f === "all" ? "All" : domainMeta[f].label}
            </span>
          </button>
        ))}
        <div className="ml-auto hidden gap-1.5 sm:flex">
          <ArrowBtn label="Previous projects" onClick={() => scrollBy(-1)}><ChevronLeft size={18} /></ArrowBtn>
          <ArrowBtn label="Next projects" onClick={() => scrollBy(1)}><ChevronRight size={18} /></ArrowBtn>
        </div>
      </div>

      <div ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.button
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.04 } }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={() => setOpen(p)}
              className="group relative flex h-[280px] w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border border-line bg-surface p-5 text-left shadow-card transition-[border-color] duration-200 hover:border-line-strong sm:w-[300px]"
              aria-label={`${p.title}: open details`}
            >
              <ProjectArt domain={p.domain} seed={i} />
              <div className="relative mt-auto">
                <div className="flex items-center gap-2 text-[12px] font-medium text-muted">
                  <DomainDot color={domainMeta[p.domain].color} />
                  {domainMeta[p.domain].label}
                  <span className="text-line-strong">/</span>
                  {p.year}
                </div>
                <h4 className="mt-2 text-[19px] font-semibold leading-snug tracking-tight text-ink">{p.title}</h4>
                <p className="mt-1 text-sm leading-snug text-muted">{p.oneLiner}</p>
              </div>
              {p.metric && (
                <span className="serif absolute right-5 top-4 text-[2.4rem] leading-none text-ink">{p.metric.value}</span>
              )}
              {p.status && !p.metric && (
                <span className="absolute right-4 top-4 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-ink-2">{p.status}</span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </div>
  );
}

function ArrowBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label={label} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink-2 transition-colors hover:border-line-strong hover:text-ink">
      {children}
    </button>
  );
}

/** Generated cover art per domain: no stock images, each card gets its own composition. */
function ProjectArt({ domain, seed }: { domain: Domain; seed: number }) {
  const c = domainMeta[domain].color;
  const r = (n: number) => ((Math.sin(seed * 91.7 + n * 13.3) + 1) / 2);
  return (
    <svg className="pointer-events-none absolute inset-x-0 top-0 h-[60%] w-full" viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id={`g-${domain}-${seed}`} cx={0.3 + r(1) * 0.4} cy="0.2" r="0.9">
          <stop offset="0" stopColor={c} stopOpacity="0.32" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="170" fill={`url(#g-${domain}-${seed})`} />
      {domain === "vision" &&
        Array.from({ length: 18 }).map((_, i) => (
          <ellipse key={i} cx={30 + (i % 6) * 48 + r(i) * 8} cy={30 + Math.floor(i / 6) * 42} rx="11" ry="14" fill="none" stroke={c} strokeOpacity={i === 8 ? 1 : 0.35} strokeWidth="1.5" transform={`rotate(${(r(i + 3) - 0.5) * 50} ${30 + (i % 6) * 48} ${30 + Math.floor(i / 6) * 42})`} />
        ))}
      {domain === "language" &&
        Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x={20} y={22 + i * 18} width={80 + r(i) * 180} height="6" rx="3" fill={c} fillOpacity={0.18 + (i % 3) * 0.14} />
        ))}
      {domain === "edtech" &&
        Array.from({ length: 4 }).map((_, i) => (
          <g key={i}>
            <rect x={24 + i * 66} y={40 + (i % 2) * 18} width="54" height="70" rx="10" fill="none" stroke={c} strokeOpacity="0.5" strokeWidth="1.5" />
            <rect x={32 + i * 66} y={52 + (i % 2) * 18} width={20 + r(i) * 18} height="5" rx="2.5" fill={c} fillOpacity="0.6" />
          </g>
        ))}
      {domain === "product" && (
        <polyline
          points={Array.from({ length: 12 }).map((_, i) => `${16 + i * 25},${110 - r(i) * 70}`).join(" ")}
          fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" strokeOpacity="0.8"
        />
      )}
    </svg>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]);

  useEffect(() => {
    if (!project) return;
    const prev = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [project, onKey]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="relative max-h-[88dvh] w-full max-w-xl overflow-y-auto rounded-t-[30px] bg-surface p-6 shadow-float sm:rounded-[30px] sm:p-8"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-surface-2 text-ink-2 transition-colors hover:text-ink"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 text-[13px] font-medium text-muted">
              <DomainDot color={domainMeta[project.domain].color} />
              {domainMeta[project.domain].label}
              <span className="text-line-strong">/</span>
              {project.year}
            </div>
            <h3 id="project-title" className="serif mt-3 pr-10 text-[2.2rem] leading-[1.05] text-ink">{project.title}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{project.description}</p>

            {project.metric && (
              <div className="mt-5 flex items-baseline gap-2 rounded-2xl bg-surface-2 p-4">
                <span className="serif text-4xl leading-none text-ink">{project.metric.value}</span>
                <span className="text-sm text-muted">{project.metric.label}</span>
              </div>
            )}

            <ul className="mt-5 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: domainMeta[project.domain].color }} />
                  {h}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-2">{s}</li>
              ))}
            </ul>

            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-bg">
                View project <ArrowUpRight size={16} />
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
