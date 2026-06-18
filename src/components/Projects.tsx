import { useEffect, useState } from "react";
import { WordReveal } from "./WordReveal";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
}

const fallback: Repo[] = [
  { id: 1, name: "lumen-ui", description: "a minimalist react component library tuned for dark interfaces.", html_url: "#", homepage: "#", stargazers_count: 124, language: "typescript" },
  { id: 2, name: "driftscroll", description: "physics-based smooth scroll primitives for the modern web.", html_url: "#", homepage: "#", stargazers_count: 87, language: "typescript" },
  { id: 3, name: "noir-press", description: "a quiet, typography-first publishing platform.", html_url: "#", homepage: null, stargazers_count: 56, language: "react" },
  { id: 4, name: "glow-shader", description: "gpu-accelerated gloss & glow effects, shipped as a tiny module.", html_url: "#", homepage: "#", stargazers_count: 211, language: "glsl" },
];

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>(fallback);

  useEffect(() => {
    fetch("https://api.github.com/users/bntangishere/repos?sort=updated&per_page=6")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setRepos(data.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="projects" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">02 — projects</div>
        <WordReveal
          as="h2"
          text="things i've made, broken, and remade."
          className="block max-w-3xl text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
        />

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-white/10 md:grid-cols-2">
          {repos.map((r, i) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              className="reveal group relative block bg-black p-8 transition-colors duration-500 hover:bg-white/[0.03] sm:p-12"
              style={{ minHeight: 260 }}
            >
              <div className="flex items-start justify-between text-xs text-white/40">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{r.language ?? "—"}</span>
              </div>
              <h3 className="mt-12 text-2xl text-white sm:text-3xl"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }}>
                {r.name.toLowerCase()}
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/60 sm:text-base" style={{ fontWeight: 200 }}>
                {r.description ?? "no description provided."}
              </p>
              <div className="mt-8 flex items-center gap-6 text-xs text-white/70">
                <span className="inline-flex items-center gap-2">
                  <i className="bi bi-star" /> {r.stargazers_count}
                </span>
                {r.homepage && (
                  <span className="inline-flex items-center gap-2 border-b border-white/20 pb-0.5 transition-colors group-hover:border-white">
                    live demo <i className="bi bi-arrow-up-right" />
                  </span>
                )}
              </div>

              {/* hover gloss */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at 50% 100%, rgba(180,210,255,0.08), transparent 60%)",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
