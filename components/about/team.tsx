// "use client";

// import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

// /**
//  * Team section — hover-reveal card pattern.
//  *
//  * Photo at base, bio + links slide up on hover.
//  * Mobile: always-visible bios (no hover).
//  *
//  * All content is placeholder — flagged with [PLACEHOLDER].
//  */

// const TEAM = [
//   {
//     name: "[FOUNDER NAME]",
//     role: "Founder & CEO",
//     bio: "[PLACEHOLDER — Short bio for the founder. Replace with real copy.]",
//     photo: null, // No photos yet — will show a placeholder
//   },
//   {
//     name: "[TEAM MEMBER NAME]",
//     role: "Head of Engineering",
//     bio: "[PLACEHOLDER — Short bio. Replace with real copy.]",
//     photo: null,
//   },
//   {
//     name: "[TEAM MEMBER NAME]",
//     role: "Design Director",
//     bio: "[PLACEHOLDER — Short bio. Replace with real copy.]",
//     photo: null,
//   },
//   {
//     name: "[TEAM MEMBER NAME]",
//     role: "Operations Lead",
//     bio: "[PLACEHOLDER — Short bio. Replace with real copy.]",
//     photo: null,
//   },
// ];

// function TeamCard({
//   name,
//   role,
//   bio,
//   photo,
// }: {
//   name: string;
//   role: string;
//   bio: string;
//   photo: string | null;
// }) {
//   return (
//     <div className="group relative overflow-hidden rounded-sm bg-charcoal-900">
//       {/* Photo / placeholder */}
//       <div className="relative aspect-[3/4] overflow-hidden">
//         {photo ? (
//           <img
//             src={photo}
//             alt={name}
//             className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-105"
//           />
//         ) : (
//           /* Placeholder — geometric pattern */
//           <div className="h-full w-full bg-charcoal-800 flex items-center justify-center">
//             <div className="w-16 h-16 border border-white/10 rounded-full" />
//           </div>
//         )}

//         {/* Bio overlay — slides up on hover (desktop), always visible (mobile) */}
//         <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/80 to-transparent p-6 pt-16 translate-y-[40%] transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-y-0 md:translate-y-[60%] md:group-hover:translate-y-0">
//           <p className="text-body-sm text-white/60 leading-relaxed">{bio}</p>
//         </div>
//       </div>

//       {/* Name + role */}
//       <div className="p-5">
//         <h3 className="text-heading-md text-white">{name}</h3>
//         <p className="text-body-sm text-copper-400 mt-1">{role}</p>
//       </div>
//     </div>
//   );
// }

// export function Team() {
//   return (
//     <section className="bg-ivory-100 py-24 md:py-32 lg:py-40">
//       <div className="container-site">
//         <Reveal className="mb-16 md:mb-20">
//           <p className="text-eyebrow text-copper-500 mb-4">Team</p>
//           <h2 className="text-display-md text-charcoal-900 max-w-2xl">
//             The people behind the warmth.
//           </h2>
//           <p className="text-body-lg text-charcoal-500 mt-4 max-w-xl">
//             {/* [PLACEHOLDER — replace with real team description] */}
//             A small, focused team of engineers, designers, and craftspeople
//             obsessed with invisible precision.
//           </p>
//         </Reveal>

//         <RevealGroup
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//           stagger={0.08}
//         >
//           {TEAM.map((member) => (
//             <RevealItem key={member.name}>
//               <TeamCard {...member} />
//             </RevealItem>
//           ))}
//         </RevealGroup>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Team roster — editorial index-card layout.
 *
 * No stock "hover overlay on a photo" pattern: each person is a numbered
 * row with a monogram plate (real photo drops in cleanly when available),
 * and the bio expands in place rather than sliding over the image.
 *
 * All content is placeholder — flagged with [PLACEHOLDER].
 */

const TEAM = [
  {
    name: "[FOUNDER NAME]",
    role: "Founder & CEO",
    bio: "[PLACEHOLDER — one or two sentences on what they actually did before ProWarm and why underfloor heating specifically.]",
    photo: null as string | null,
  },
  {
    name: "[TEAM MEMBER NAME]",
    role: "Head of Engineering",
    bio: "[PLACEHOLDER — one or two sentences on their engineering background.]",
    photo: null,
  },
  {
    name: "[TEAM MEMBER NAME]",
    role: "Design Director",
    bio: "[PLACEHOLDER — one or two sentences on their design background.]",
    photo: null,
  },
  {
    name: "[TEAM MEMBER NAME]",
    role: "Operations Lead",
    bio: "[PLACEHOLDER — one or two sentences on their ops background.]",
    photo: null,
  },
];

function initials(name: string) {
  return name
    .replace(/[[\]]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function TeamRow({
  index,
  name,
  role,
  bio,
  photo,
}: {
  index: number;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group border-t border-charcoal-900/10 last:border-b"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-6 py-6 text-left md:gap-10 md:py-8"
      >
        <span className="font-mono text-sm text-charcoal-400 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Monogram plate — swap for <img> the moment a real photo exists */}
        <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-charcoal-900 md:size-16">
          {photo ? (
            <img src={photo} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-lg text-copper-400">
              {initials(name)}
            </span>
          )}
        </span>

        <span className="flex flex-1 flex-col gap-0.5 md:flex-row md:items-baseline md:gap-4">
          <span className="font-display text-xl text-charcoal-900 md:text-2xl">
            {name}
          </span>
          <span className="text-sm text-copper-600">{role}</span>
        </span>

        <span
          aria-hidden
          className={cn(
            "size-8 shrink-0 rounded-full border border-charcoal-900/15 transition-transform duration-500",
            open && "rotate-45"
          )}
        >
          <span className="relative block h-full w-full">
            <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-charcoal-700" />
            <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-charcoal-700" />
          </span>
        </span>
      </button>

      {/* Clip-reveal bio — distinct from the fade+slide used elsewhere */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-quart,cubic-bezier(0.22,1,0.36,1))]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-lg pb-7 pl-[4.75rem] text-sm leading-relaxed text-charcoal-500 md:pl-[6.5rem] md:pb-9">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Team() {
  return (
    <section className="bg-ivory-100 py-24 md:py-32 lg:py-40">
      <div className="container-site">
        <Reveal className="mb-14 md:mb-16">
          <p className="text-eyebrow text-copper-500 mb-4">Team</p>
          <h2 className="text-display-md text-charcoal-900 max-w-2xl">
            The people who answer when your floor stops warming.
          </h2>
          <p className="text-body-lg text-charcoal-500 mt-4 max-w-xl">
            {/* [PLACEHOLDER — replace with real team description] */}
            Sixty of us, and the ones you'll actually talk to are here.
          </p>
        </Reveal>

        <RevealGroup stagger={0.06}>
          {TEAM.map((member, i) => (
            <RevealItem key={member.name}>
              <TeamRow index={i} {...member} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}