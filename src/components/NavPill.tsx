import { useEffect, useRef, useState } from "react";

const items = [
  { id: "home", label: "home", icon: "bi-house" },
  { id: "welcome", label: "about", icon: "bi-person" },
  { id: "projects", label: "projects", icon: "bi-tools" },
  { id: "certificates", label: "certs", icon: "bi-award" },
  { id: "gallery", label: "gallery", icon: "bi-images" },
  { id: "contact", label: "contact", icon: "bi-envelope" },
];

export function NavPill() {
  const [show, setShow] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // magnetic effect
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const onMove = (e: MouseEvent) => {
      const r = pill.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 180) {
        const f = (1 - dist / 180) * 10;
        pill.style.transform = `translate(calc(-50% + ${(dx / dist) * f}px), ${(dy / dist) * f * 0.4}px)`;
      } else {
        pill.style.transform = "translate(-50%, 0)";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={pillRef}
      className="fixed bottom-6 left-1/2 z-50 transition-all duration-500 ease-out"
      style={{
        transform: "translate(-50%, 0)",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        translate: show ? "0 0" : "0 30px",
      }}
    >
      <nav className="glass flex items-center gap-1 rounded-full px-2 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.6)] sm:px-3">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => go(it.id)}
            className="group flex items-center gap-2 rounded-full px-3 py-2 text-xs text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white sm:px-4"
            aria-label={it.label}
          >
            <i className={`bi ${it.icon} text-sm`} />
            <span className="hidden sm:inline" style={{ fontWeight: 200 }}>
              {it.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
