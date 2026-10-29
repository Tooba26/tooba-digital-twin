"use client";

import { profile } from "@/lib/profile";

/** The twin's presence: an aurora ring around the avatar that speeds up while thinking. */
export default function Orb({ size, thinking = false }: { size: number; thinking?: boolean }) {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="orb shrink-0"
      data-state={thinking ? "thinking" : "idle"}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="orb__aura" />
      <div className="orb__ring" />
      <div className="orb__core">
        {profile.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatar} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="serif select-none text-ink" style={{ fontSize: size * 0.36, lineHeight: 1 }}>
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
