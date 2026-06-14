import { useRef, useCallback } from "react";
import {
  Camera, Moon, Headphones, Mountain, PenTool, Sliders,
  FileCode2, Atom, Globe, Layers, Palette, Server,
  Terminal, Database, Paintbrush, Box, Cuboid, Activity,
  type LucideIcon,
} from "lucide-react";
import { SplitText } from "./SplitText";

interface HobbyItem {
  label: string;
  meta: string;
  icon: LucideIcon;
}

const hobbies: HobbyItem[] = [
  { label: "shooting film", meta: "photography", icon: Camera },
  { label: "late-night code", meta: "development", icon: Moon },
  { label: "lo-fi playlists", meta: "music", icon: Headphones },
  { label: "weekend hikes", meta: "nature", icon: Mountain },
  { label: "writing essays", meta: "prose", icon: PenTool },
  { label: "tinkering with synths", meta: "sound", icon: Sliders },
];

interface TechItem {
  label: string;
  meta: string;
  icon: LucideIcon;
}

const tech: TechItem[] = [
  { label: "typescript", meta: "language", icon: FileCode2 },
  { label: "react", meta: "framework", icon: Atom },
  { label: "next.js", meta: "framework", icon: Globe },
  { label: "tanstack", meta: "data", icon: Layers },
  { label: "tailwind", meta: "styling", icon: Palette },
  { label: "node", meta: "runtime", icon: Server },
  { label: "python", meta: "language", icon: Terminal },
  { label: "postgres", meta: "database", icon: Database },
  { label: "figma", meta: "design", icon: Paintbrush },
  { label: "webgl", meta: "graphics", icon: Box },
  { label: "blender", meta: "3d", icon: Cuboid },
  { label: "framer motion", meta: "animation", icon: Activity },
];

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} className={`card-item ${className}`}>
      <div className="card-glow" />
      {children}
    </div>
  );
}

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
            <div className="card-grid grid-cols-1 sm:grid-cols-2">
              {hobbies.map((h) => {
                const Icon = h.icon;
                return (
                  <GlowCard key={h.label}>
                    <div className="card-icon">
                      <Icon size={20} strokeWidth={1.5} className="text-white/70" />
                    </div>
                    <div className="card-label">{h.label}</div>
                    <div className="card-meta">{h.meta}</div>
                  </GlowCard>
                );
              })}
            </div>
          </div>
        </div>

        <div className="reveal mt-32">
          <div className="mb-8 text-[10px] tracking-[0.4em] text-white/40">stack</div>
          <div className="card-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {tech.map((t) => {
              const Icon = t.icon;
              return (
                <GlowCard key={t.label}>
                  <div className="card-icon">
                    <Icon size={20} strokeWidth={1.5} className="text-white/70" />
                  </div>
                  <div className="card-label">{t.label}</div>
                  <div className="card-meta">{t.meta}</div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
