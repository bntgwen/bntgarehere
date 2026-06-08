import { useState } from "react";

export function Contact() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formsubmit.co/ajax/wtterson011@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: "new message from bntangishere portfolio",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("failed to send");
      setSent(true);
      form.reset();
    } catch (err) {
      setError("couldn't send — try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32 sm:px-12 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-4 text-xs tracking-[0.5em] text-white/40">05 — contact</div>
        <h2 className="reveal max-w-4xl text-[clamp(2rem,7vw,6rem)] leading-[1.02] text-white"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 100 }}>
          let&apos;s build something quiet, together.
        </h2>

        <div className="mt-20 flex flex-wrap items-center gap-6">
          <button
            onClick={() => setOpen(true)}
            className="group relative overflow-hidden rounded-full border border-white/30 bg-white px-8 py-4 text-sm text-black transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(255,255,255,0.35)] sm:px-10 sm:py-5 sm:text-base"
            style={{ fontWeight: 400 }}
          >
            <span className="relative z-10 inline-flex items-center gap-3">
              contact me <i className="bi bi-arrow-up-right" />
            </span>
          </button>

          <div className="flex items-center gap-2">
            {[
              { icon: "bi-github", href: "https://github.com/bntangishere", label: "github" },
              { icon: "bi-instagram", href: "https://instagram.com/bntangishere", label: "instagram" },
              { icon: "bi-linkedin", href: "https://linkedin.com/in/bntangishere", label: "linkedin" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:scale-110 hover:border-white hover:text-white"
              >
                <i className={`bi ${s.icon} text-lg`} />
              </a>
            ))}
          </div>
        </div>

        <div className="reveal mt-32 border-t border-white/10 pt-10 text-xs text-white/40">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} bntangishere — all rights reserved.</span>
            <span>made quietly, with care.</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="fixed inset-0 z-[90] flex items-center justify-center p-4 transition-all duration-500"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backdropFilter: open ? "blur(20px)" : "blur(0)",
          background: open ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        }}
        onClick={() => setOpen(false)}
      >
        <div
          className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-black/85 p-8 transition-all duration-500 sm:p-10"
          style={{
            transform: open ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
            opacity: open ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-3 -right-3 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black text-white/80 transition-colors hover:bg-white hover:text-black"
            aria-label="close"
          >
            <i className="bi bi-x-lg text-sm" />
          </button>

          <h3 className="text-2xl text-white sm:text-3xl"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }}>
            say hello
          </h3>
          <p className="mt-2 text-sm text-white/50" style={{ fontWeight: 200 }}>
            i read every message — usually reply within a day.
          </p>

          {sent ? (
            <div className="mt-8 rounded-xl border border-white/15 bg-white/[0.03] p-6 text-center">
              <i className="bi bi-check2-circle text-3xl text-white" />
              <p className="mt-3 text-sm text-white/80" style={{ fontWeight: 200 }}>
                message sent. talk soon.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <input
                name="name"
                required
                placeholder="your name"
                className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="your email"
                className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="what's on your mind?"
                className="w-full resize-none rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
              />
              {error && <p className="text-xs text-red-300">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-white px-6 py-3 text-sm text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                style={{ fontWeight: 400 }}
              >
                {sending ? "sending..." : "send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
