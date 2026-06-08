import { useEffect, useRef } from "react";

interface SplitProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({ text, className, style, delay = 0, as = "h2" }: SplitProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".split-char");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((c, i) => {
              c.style.transitionDelay = `${delay + i * 22}ms`;
              c.classList.add("in");
            });
          } else {
            chars.forEach((c) => {
              c.style.transitionDelay = `0ms`;
              c.classList.remove("in");
            });
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, text]);

  const Tag = as as keyof React.JSX.IntrinsicElements;
  const words = text.split(" ");

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} className="split-char">
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span className="split-char">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
