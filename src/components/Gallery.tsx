const images = [
  { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?w=1200&q=80", h: "medium" },
  { src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80", h: "medium" },
];

const hMap = { tall: "h-[480px]", medium: "h-[340px]", short: "h-[240px]" } as const;

const gear = {
  hardware: ["macbook pro 16″ m3", "apple studio display", "leica q3", "moog matriarch", "wacom intuos pro"],
  software: ["figma", "vs code", "blender", "ableton live", "adobe lightroom"],
};

export function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">04 — gallery & gear</div>
        <h2 className="reveal max-w-3xl text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}>
          fragments of taste.
        </h2>

        <div className="mt-20 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {images.map((img, i) => (
            <div
              key={i}
              className={`reveal mb-6 break-inside-avoid overflow-hidden rounded-xl border border-white/10 ${hMap[img.h as keyof typeof hMap]}`}
            >
              <img
                src={img.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-32 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="reveal">
            <div className="mb-6 text-[10px] tracking-[0.4em] text-white/40">hardware</div>
            <ul className="space-y-3 text-2xl text-white/85 sm:text-3xl"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}>
              {gear.hardware.map((g) => <li key={g} className="border-b border-white/10 pb-3">{g}</li>)}
            </ul>
          </div>
          <div className="reveal">
            <div className="mb-6 text-[10px] tracking-[0.4em] text-white/40">software</div>
            <ul className="space-y-3 text-2xl text-white/85 sm:text-3xl"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}>
              {gear.software.map((g) => <li key={g} className="border-b border-white/10 pb-3">{g}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
