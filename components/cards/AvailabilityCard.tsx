import { FollowUp, Shell, type AskFn } from ".";
import { profile } from "@/lib/profile";

const focus = ["AI engineering", "LLM applications", "Computer vision", "Frontend for AI products"];

export default function AvailabilityCard({ onAsk }: { onAsk: AskFn }) {
  const a = profile.availability;
  return (
    <Shell className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
        style={{ background: "conic-gradient(var(--c-rose), var(--c-saffron), var(--c-jade), var(--c-indigo), var(--c-rose))" }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${a.open ? "bg-jade" : "bg-line-strong"}`} />
          <span className="text-[13px] font-semibold text-ink-2">{a.open ? "Available" : "Not looking right now"}</span>
        </div>
        <h4 className="serif mt-3 text-[1.75rem] leading-[1.15] text-ink">{a.headline}</h4>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{a.detail}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {focus.map((f) => (
            <li key={f} className="rounded-full bg-surface-2 px-3 py-1.5 text-[13px] text-ink">{f}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <FollowUp label="Get in touch" onClick={() => onAsk("How can I reach you?", ["contact"])} />
          <FollowUp label="See my experience" onClick={() => onAsk("Where have you worked?", ["experience"])} />
        </div>
      </div>
    </Shell>
  );
}
