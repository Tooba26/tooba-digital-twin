import { GraduationCap, Languages, MapPin } from "lucide-react";
import Orb from "../Orb";
import { FollowUp, Shell, type AskFn } from ".";
import { education, profile } from "@/lib/profile";

export default function AboutCard({ onAsk }: { onAsk: AskFn }) {
  return (
    <Shell>
      <div className="flex items-start gap-4">
        <Orb size={64} />
        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-tight">{profile.name}</h3>
          <p className="text-muted">{profile.title}</p>
        </div>
      </div>
      <p className="mt-5 text-[16px] leading-relaxed text-ink-2">{profile.bio}</p>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <Fact icon={<MapPin size={16} />} label="Based in" value={`${profile.location}, from ${profile.from}`} />
        <Fact icon={<GraduationCap size={16} />} label="Studied" value={`${education[0].degree}, AIT`} />
        <Fact icon={<Languages size={16} />} label="Speaks" value="English, Urdu, Arabic, Thai" />
      </dl>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {profile.interests.map((i) => (
          <span key={i} className="rounded-full bg-surface-2 px-3 py-1 text-[13px] text-ink-2">{i}</span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <FollowUp label="See my projects" onClick={() => onAsk("What projects are you most proud of?", ["projects"])} />
        <FollowUp label="What are you researching?" onClick={() => onAsk("What are you researching right now?", ["research"])} />
      </div>
    </Shell>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 p-3.5">
      <dt className="flex items-center gap-1.5 text-muted">{icon}{label}</dt>
      <dd className="mt-1 font-medium text-ink">{value}</dd>
    </div>
  );
}
