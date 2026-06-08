import { useState } from "react";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
}

const certs: Cert[] = [
  {
    id: "c1",
    title: "advanced front-end engineering",
    issuer: "frontend masters",
    year: "2024",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1600&q=80",
  },
  {
    id: "c2",
    title: "interaction design specialization",
    issuer: "uc san diego",
    year: "2023",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80",
  },
  {
    id: "c3",
    title: "creative coding with webgl",
    issuer: "school of motion",
    year: "2024",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80",
  },
  {
    id: "c4",
    title: "design systems in practice",
    issuer: "smashing magazine",
    year: "2025",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&q=80",
  },
];

export function Certificates() {
  const [open, setOpen] = useState<Cert | null>(null);

  return (
    <section id="certificates" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">03 — certificates</div>
        <h2 className="reveal max-w-3xl text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}>
          proof, for the curious.
        </h2>

        <ul className="mt-20 divide-y divide-white/10 border-y border-white/10">
          {certs.map((c, i) => (
            <li
              key={c.id}
              className="reveal group flex flex-wrap items-center justify-between gap-6 py-8 transition-colors duration-500 hover:bg-white/[0.02]"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-xs text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-xl text-white sm:text-2xl"
                       style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }}>
                    {c.title}
                  </div>
                  <div className="mt-1 text-xs text-white/50" style={{ fontWeight: 200 }}>
                    {c.issuer} · {c.year}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(c)}
                className="group/btn flex items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-xs text-white/80 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                show <i className="bi bi-arrow-up-right transition-transform group-hover/btn:rotate-45" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4 transition-all duration-500"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backdropFilter: open ? "blur(16px)" : "blur(0px)",
          background: open ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        }}
        onClick={() => setOpen(null)}
      >
        <div
          className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-black/80 p-2 transition-all duration-500"
          style={{
            transform: open ? "scale(1)" : "scale(0.94)",
            opacity: open ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute -top-3 -right-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black text-white/80 transition-colors hover:bg-white hover:text-black"
            aria-label="close"
          >
            <i className="bi bi-x-lg text-sm" />
          </button>
          {open && (
            <div>
              <img
                src={open.image}
                alt={open.title}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
              <div className="px-4 py-5">
                <div className="text-lg text-white" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }}>
                  {open.title}
                </div>
                <div className="text-xs text-white/50">{open.issuer} · {open.year}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
