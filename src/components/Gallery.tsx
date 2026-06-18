import { useRef, useCallback } from "react";
import { Monitor, Laptop, Camera, AudioLines, Pen, type LucideIcon } from "lucide-react";
import { WordReveal } from "./WordReveal";

interface GalleryImg { src: string; ratio: string; }

// pinterest-like: a mix of tall, wide, square, big, small
const images: GalleryImg[] = [
  { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80", ratio: "3/4" },   // tall
  { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80", ratio: "4/3" },   // wide
  { src: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?w=1200&q=80", ratio: "1/1" },   // square small
  { src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80", ratio: "2/3" },   // tall
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80", ratio: "16/9" },  // very wide
  { src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80", ratio: "1/1" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80", ratio: "3/5" },   // very tall
  { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&q=80", ratio: "5/4" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80", ratio: "4/5" },
  { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80", ratio: "16/10" },
  { src: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=1200&q=80", ratio: "2/3" },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&q=80", ratio: "1/1" },
];

interface GearItem { label: string; meta: string; icon: LucideIcon; }

const hardware: GearItem[] = [
  { label: "macbook pro 16″ m3", meta: "primary machine", icon: Laptop },
  { label: "apple studio display", meta: "5k retina", icon: Monitor },
  { label: "leica q3", meta: "compact camera", icon: Camera },
  { label: "moog matriarch", meta: "analog synth", icon: AudioLines },
  { label: "wacom intuos pro", meta: "pen tablet", icon: Pen },
];

const software: GearItem[] = [
  { label: "figma", meta: "interface design", icon: Pen },
  { label: "vs code", meta: "code editor", icon: Laptop },
  { label: "blender", meta: "3d creation", icon: Monitor },
  { label: "ableton live", meta: "music production", icon: AudioLines },
  { label: "adobe lightroom", meta: "photo editing", icon: Camera },
];

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} className={`card-item ${className}`}>
      <div className="card-glow" />
      {children}
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">04 — gallery & gear</div>
        <WordReveal
          as="h2"
          text="fragments of taste."
          className="block max-w-3xl text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
        />

        <div className="mt-20 columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:_balance]">
          {images.map((img, i) => (
            <div
              key={i}
              className="reveal group relative mb-4 inline-block w-full overflow-hidden border border-white/10 break-inside-avoid"
            >
              <div style={{ aspectRatio: img.ratio }} className="w-full overflow-hidden">
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  className="block h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="mt-32 space-y-20">
          {[
            { title: "hardware", items: hardware },
            { title: "software", items: software },
          ].map((group) => (
            <div key={group.title} className="reveal">
              <div className="mb-6 text-[10px] tracking-[0.4em] text-white/40">{group.title}</div>
              <div className="grid grid-cols-1 gap-px border border-white/10 sm:grid-cols-2 lg:grid-cols-3 bg-white/10">
                {group.items.map((g) => {
                  const Icon = g.icon;
                  return (
                    <GlowCard key={g.label} className="border-0">
                      <div className="card-icon">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <div className="card-label">{g.label}</div>
                      <div className="card-meta">{g.meta}</div>
                    </GlowCard>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
