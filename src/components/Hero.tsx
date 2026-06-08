import { useEffect, useRef } from "react";

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let rx = 0, ry = 0, tx = 0, ty = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      tx = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30));
      ty = Math.max(-1, Math.min(1, (e.beta ?? 0) / 45));
    };

    const tick = () => {
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      orbRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i + 1) * 18;
        el.style.setProperty("--mx", `${rx * depth}px`);
        el.style.setProperty("--my", `${ry * depth}px`);
      });
      const title = wrap.querySelector<HTMLElement>("[data-hero-title]");
      if (title) {
        title.style.transform = `translate3d(${rx * -8}px, ${ry * -8}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener("mousemove", onMove);
    window.addEventListener("deviceorientation", onOrient);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  const setOrb = (i: number) => (el: HTMLDivElement | null) => {
    if (el) orbRefs.current[i] = el;
  };

  return (
    <section
      ref={wrapRef}
      id="home"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Gloss orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={setOrb(0)}
          className="gloss-orb"
          style={{
            width: "55vmin",
            height: "55vmin",
            left: "20%",
            top: "25%",
            background: "radial-gradient(circle, rgba(120,180,255,0.85), rgba(80,120,255,0.2) 55%, transparent 70%)",
            transform: "translate(var(--mx,0), var(--my,0))",
            animation: "glossDrift 14s ease-in-out infinite",
          }}
        />
        <div
          ref={setOrb(1)}
          className="gloss-orb"
          style={{
            width: "45vmin",
            height: "45vmin",
            right: "15%",
            top: "30%",
            background: "radial-gradient(circle, rgba(255,150,220,0.7), rgba(190,90,255,0.15) 55%, transparent 70%)",
            transform: "translate(var(--mx,0), var(--my,0))",
            animation: "glossDrift2 18s ease-in-out infinite",
          }}
        />
        <div
          ref={setOrb(2)}
          className="gloss-orb"
          style={{
            width: "60vmin",
            height: "60vmin",
            left: "35%",
            bottom: "10%",
            background: "radial-gradient(circle, rgba(140,255,220,0.55), rgba(60,200,255,0.15) 55%, transparent 70%)",
            transform: "translate(var(--mx,0), var(--my,0))",
            animation: "glossDrift3 22s ease-in-out infinite",
          }}
        />
        <div
          ref={setOrb(3)}
          className="gloss-orb"
          style={{
            width: "35vmin",
            height: "35vmin",
            left: "50%",
            top: "50%",
            transform: "translate(calc(-50% + var(--mx,0)), calc(-50% + var(--my,0)))",
            background: "radial-gradient(circle, rgba(255,255,255,0.85), rgba(255,255,255,0.1) 55%, transparent 70%)",
            animation: "glossDrift 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Title */}
      <div className="relative z-10 px-6 text-center" data-hero-title>
        <p
          className="mb-6 text-xs tracking-[0.5em] text-white/50"
          style={{ fontWeight: 200 }}
        >
          bntangishere
        </p>
        <h1
          className="text-[clamp(2.4rem,9vw,8rem)] leading-[1.02] text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}
        >
          nice to meet you
        </h1>
        <p className="mx-auto mt-8 max-w-md text-sm text-white/60 sm:text-base" style={{ fontWeight: 200 }}>
          a quiet corner of the internet for design, code, and curiosity.
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/40">
        scroll
      </div>
    </section>
  );
}
