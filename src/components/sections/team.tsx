import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/section-header";
import { teamCommitments, teamDisciplines, teamIntro, teamRoles } from "@/content/home";
import { leadership, type TeamMember } from "@/content/team";

function TeamPod() {
  return (
    <div data-reveal className="relative">
      {/* Connectors behind the cards */}
      <div aria-hidden="true" className="absolute inset-0 hidden sm:block">
        <div className="absolute top-1/2 right-[12%] left-[12%] h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />
        <div className="absolute top-[12%] bottom-[12%] left-1/2 w-px bg-gradient-to-b from-transparent via-brand-violet/50 to-transparent" />
      </div>

      <ul className="relative grid gap-4 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-14">
        {teamRoles.map((role, i) => (
          <li
            key={role.title}
            style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            className="rounded-2xl border border-line bg-surface/90 p-5 backdrop-blur sm:p-6"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-lg border border-line-strong bg-white/[0.03] text-brand-sky">
              <Icon name={role.icon} className="size-[1.0625rem]" />
            </span>
            <h3 className="mt-4 font-semibold tracking-[-0.02em] text-fg">{role.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{role.body}</p>
          </li>
        ))}
      </ul>

      {/* Centre node */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
      >
        <div className="relative flex size-[5.5rem] items-center justify-center rounded-full border border-brand-blue/40 bg-canvas text-center shadow-[0_0_40px_-6px_rgb(79_125_255/0.55)]">
          <span className="absolute inset-1.5 rounded-full border border-dashed border-white/10" />
          <span className="font-mono text-[10px] leading-tight tracking-wide text-fg uppercase">
            Your
            <br />
            project
          </span>
        </div>
      </div>
    </div>
  );
}

function LeaderCard({ person }: { person: TeamMember }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-line bg-surface/70 p-5">
      {person.photo ? (
        <Image
          src={person.photo.src}
          alt={person.photo.alt}
          width={64}
          height={64}
          className="size-16 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-elevated text-lg font-semibold text-fg"
        >
          {person.name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </span>
      )}
      <div className="min-w-0">
        <h3 className="font-semibold text-fg">{person.name}</h3>
        <p className="text-sm text-brand-sky">{person.role}</p>
        {person.bio ? <p className="mt-2 text-sm leading-relaxed text-muted">{person.bio}</p> : null}
        {person.linkedin ? (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-fg hover:text-white"
          >
            LinkedIn
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        ) : null}
      </div>
    </li>
  );
}

export function Team({ index }: { index: string }) {
  return (
    <section id="team" aria-labelledby="team-heading" className="relative py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeader
              index={index}
              eyebrow={teamIntro.eyebrow}
              title={teamIntro.title}
              description={teamIntro.description}
              headingId="team-heading"
            />
            <ul data-reveal className="mt-8 space-y-3">
              {teamCommitments.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-fg/90">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-sky" />
                  {item}
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-8">
              <p className="eyebrow text-subtle">Across the bench</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {teamDisciplines.map((d) => (
                  <li
                    key={d}
                    className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[0.6875rem] text-muted"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <TeamPod />
          </div>
        </div>

        {leadership.length > 0 ? (
          <div data-reveal className="mt-16">
            <h3 className="eyebrow text-subtle">Leadership</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((person) => (
                <LeaderCard key={person.name} person={person} />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
