"use client";

type Theme = "light" | "dark";

const current = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ??
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

const CELL = 40; // grid pitch, px
const GAP = 3; // inset per side, so cells read like GitHub's contribution squares
const STEPS = 24;
const SWEEP = 0.7; // share of the timeline spent sweeping left to right; the rest is per-cell jitter

const square = (x: number, y: number, inset: number) => {
  const s = CELL - inset * 2;
  return `M${x + inset} ${y + inset}h${s}v${s}h-${s}z`;
};

/**
 * Clip-path keyframes that reveal the new theme like a contribution graph filling
 * in: columns sweep left to right, cells within a column land at slightly random
 * times, and each cell pops in small before settling to full size. The last frame
 * is the whole viewport so no gaps remain.
 */
function gridFrames() {
  const cols = Math.ceil(innerWidth / CELL);
  const rows = Math.ceil(innerHeight / CELL);
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    return {
      x: col * CELL,
      y: Math.floor(i / cols) * CELL,
      at: (col / cols) * SWEEP + Math.random() * (1 - SWEEP) * 0.9, // when (0–1) this cell lands
    };
  });

  const frames = [`path("M0 0h0v0z")`];
  for (let s = 1; s < STEPS; s++) {
    const now = s / STEPS;
    let d = "";
    for (const c of cells) {
      if (c.at > now) continue;
      const fresh = now - c.at < 1 / STEPS;
      d += square(c.x, c.y, fresh ? CELL / 4 : GAP);
    }
    frames.push(`path("${d || "M0 0h0v0z"}")`);
  }
  frames.push(`path("M0 0H${innerWidth}V${innerHeight}H0z")`);
  return frames;
}

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = current() === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    document.startViewTransition(apply).ready.then(() => {
      root.animate({ clipPath: gridFrames() }, { duration: 720, easing: "linear", pseudoElement: "::view-transition-new(root)" });
    });
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <svg className="icon-sun" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}

/** Runs before first paint so a saved theme never flashes. */
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
