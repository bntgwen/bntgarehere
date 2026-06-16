import { useRef, useCallback } from "react";
import { Monitor, Laptop, Camera, AudioLines, Pen, type LucideIcon } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?w=1200&q=80", h: "medium" },
  { src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80", h: "medium" },
];



interface GearItem {
  label: string;
  meta: string;
  icon: LucideIcon;
  img: string;
}

const hardware: GearItem[] = [
  { label: "macbook pro 16″ m3", meta: "primary machine", icon: Laptop, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=600&q=80" },
  { label: "apple studio display", meta: "5k retina", icon: Monitor, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80" },
  { label: "leica q3", meta: "compact camera", icon: Camera, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80" },
  { label: "moog matriarch", meta: "analog synth", icon: AudioLines, img: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&q=80" },
  { label: "wacom intuos pro", meta: "pen tablet", icon: Pen, img: "https://images.unsplash.com/photo-1585792180666-f7347f49048d?w=600&q=80" },
];

const software: GearItem[] = [
  { label: "figma", meta: "interface design", icon: Pen, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80" },
  { label: "vs code", meta: "code editor", icon: Laptop, img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80" },
  { label: "blender", meta: "3d creation", icon: Monitor, img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80" },
  { label: "ableton live", meta: "music production", icon: AudioLines, img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80" },
  { label: "adobe lightroom", meta: "photo editing", icon: Camera, img: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80" },
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

export function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">04 — gallery & gear</div>
        <h2 className="reveal max-w-3xl text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}>
          fragments of taste.
        </h2>

        <div className="mt-20 grid grid-cols-6 auto-rows-[90px] gap-3 sm:gap-4">
          {[
            { i: 0, cls: "col-span-4 row-span-5", rot: "-1deg", ty: "0px" },
            { i: 1, cls: "col-span-2 row-span-3 mt-8", rot: "1.5deg", ty: "20px" },
            { i: 2, cls: "col-span-2 row-span-4", rot: "-0.5deg", ty: "-10px" },
            { i: 3, cls: "col-span-3 row-span-3", rot: "0.8deg", ty: "30px" },
            { i: 4, cls: "col-span-3 row-span-4 -mt-6", rot: "-1.2deg", ty: "-15px" },
            { i: 5, cls: "col-span-3 row-span-3", rot: "0.6deg", ty: "10px" },
          ].map((spec) => {
            const img = images[spec.i];
            return (
              <div
                key={spec.i}
                className={`reveal group relative overflow-hidden rounded-xl border border-white/10 ${spec.cls}`}
                style={{ transform: `rotate(${spec.rot}) translateY(${spec.ty})` }}
              >
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

        <div className="mt-32 space-y-24">
          {[
            { title: "hardware", items: hardware, spans: ["sm:col-span-3", "sm:col-span-2", "sm:col-span-2", "sm:col-span-3", "sm:col-span-5"] },
            { title: "software", items: software, spans: ["sm:col-span-2", "sm:col-span-3", "sm:col-span-3", "sm:col-span-2", "sm:col-span-5"] },
          ].map((group) => (
            <div key={group.title} className="reveal">
              <div className="mb-6 text-[10px] tracking-[0.4em] text-white/40">{group.title}</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                {group.items.map((g, idx) => {
                  const Icon = g.icon;
                  const offset = idx % 2 === 0 ? "sm:translate-y-4" : "sm:-translate-y-2";
                  return (
                    <GlowCard key={g.label} className={`${group.spans[idx] ?? "sm:col-span-2"} ${offset}`}>
                      <div className="mb-4 overflow-hidden rounded-lg border border-white/10">
                        <img
                          src={g.img}
                          alt={g.label}
                          loading="lazy"
                          className="h-28 w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                        />
                      </div>
                      <div className="card-icon">
                        <Icon size={20} strokeWidth={1.5} className="text-white/70" />
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
