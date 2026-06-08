import { SplitText } from "./SplitText";

const tech = [
  "typescript", "react", "next.js", "tanstack", "tailwind", "node",
  "python", "postgres", "figma", "webgl", "blender", "framer motion",
];

const hobbies = [
  "shooting film", "late-night code", "lo-fi playlists",
  "weekend hikes", "writing essays", "tinkering with synths",
];

export function Welcome() {
  return (
    <section id="welcome" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">01 — welcome</div>

        <SplitText
          as="h2"
          text="a designer who codes, a developer who draws."
          className="block max-w-4xl text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
        />

        <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="reveal md:col-span-5 md:col-start-2">
            <div className="mb-6 text-[10px] tracking-[0.4em] text-white/40">about</div>
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl" style={{ fontWeight: 200 }}>
              i build quiet, considered interfaces. by day, i ship products with care.
              by night, i sketch, write, and chase the kind of details no one notices —
              but everyone feels.
            </p>
          </div>

          <div className="reveal md:col-span-4 md:col-start-9">
            <div className="mb-6 text-[10px] tracking-[0.4em] text-white/40">hobbies</div>
            <ul className="space-y-3 text-white/70" style={{ fontWeight: 200 }}>
              {hobbies.map((h) => (
                <li key={h} className="border-b border-white/10 pb-3 text-base">
                  — {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal mt-32">
          <div className="mb-8 text-[10px] tracking-[0.4em] text-white/40">stack</div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[clamp(1.2rem,3vw,2.4rem)] text-white/90"
               style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}>
            {tech.map((t, i) => (
              <span key={t} className="opacity-90 transition-opacity hover:opacity-100"
                    style={{ transitionDelay: `${i * 30}ms` }}>
                {t}
                {i < tech.length - 1 && <span className="ml-8 text-white/20">/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
