import type { CSSProperties, ReactNode } from "react";

/*
 * Duotone icons: the primary layer uses currentColor at full strength, the
 * secondary layer (class "b") the same colour at low opacity. Hovering a chip
 * swaps currentColor from grey to the tool's brand colour.
 */
const I = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="tech-icon">
    {children}
  </svg>
);
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const F = { fill: "currentColor" } as const;
const TXT = { fill: "currentColor", fontSize: 8.5, fontWeight: 800, textAnchor: "middle", fontFamily: "ui-sans-serif, system-ui, sans-serif" } as const;

const tools: { name: string; brand: string; icon: ReactNode }[][] = [
  [
    {
      name: "TypeScript",
      brand: "#3178c6",
      icon: <I><rect className="b" x="3" y="3" width="18" height="18" rx="4" {...F} /><text x="12" y="16" {...TXT}>TS</text></I>,
    },
    {
      name: "Bun",
      brand: "#d9825b",
      icon: <I><ellipse className="b" cx="12" cy="13" rx="9" ry="7" {...F} /><ellipse cx="12" cy="13" rx="9" ry="7" {...S} /><circle cx="9.5" cy="12.5" r="1" {...F} /><circle cx="14.5" cy="12.5" r="1" {...F} /><path d="M10.5 15.2q1.5 1.2 3 0" {...S} strokeWidth={1.4} /></I>,
    },
    {
      name: "Express",
      brand: "currentColor",
      icon: <I><rect className="b" x="3" y="3" width="18" height="18" rx="4" {...F} /><text x="12" y="15.5" {...TXT}>ex</text></I>,
    },
    {
      name: "PostgreSQL",
      brand: "#336791",
      icon: <I><path className="b" d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" {...F} /><ellipse cx="12" cy="6" rx="8" ry="3" {...S} /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" {...S} /></I>,
    },
    {
      name: "Prisma",
      brand: "#5a67d8",
      icon: <I><path className="b" d="M12 3 20 19l-11 2z" {...F} /><path d="M12 3 20 19l-11 2zM12 3 9 21" {...S} /></I>,
    },
    {
      name: "Redis",
      brand: "#dc382d",
      icon: <I><path className="b" d="m4 12 8 3.5 8-3.5M4 16l8 3.5 8-3.5" {...S} strokeWidth={2.4} /><path d="M12 4.5 20 8l-8 3.5L4 8z" {...F} /></I>,
    },
  ],
  [
    {
      name: "Zod",
      brand: "#3068b7",
      icon: <I><path className="b" d="m12 3 9 9-9 9-9-9z" {...F} /><path d="M8.5 9h7l-7 6h7" {...S} /></I>,
    },
    {
      name: "Socket.IO",
      brand: "currentColor",
      icon: <I><circle className="b" cx="12" cy="12" r="9" {...F} /><circle cx="12" cy="12" r="9" {...S} /><path d="m13 6-5 7h4l-1 5 5-7h-4z" {...F} /></I>,
    },
    {
      name: "WebRTC",
      brand: "#e8483a",
      icon: <I><rect className="b" x="3" y="7" width="12" height="10" rx="2.5" {...F} /><rect x="3" y="7" width="12" height="10" rx="2.5" {...S} /><path d="m15 11 6-3.5v9L15 13z" {...F} /></I>,
    },
    {
      name: "React",
      brand: "#149eca",
      icon: <I><g className="b" {...S}><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></g><circle cx="12" cy="12" r="2.2" {...F} /></I>,
    },
    {
      name: "Tailwind",
      brand: "#0ea5e9",
      icon: <I><path className="b" d="M3 16c1.5-3 3.5-4 6-3s3.5 3 6 3 4.5-1 6-3" {...S} strokeWidth={2.4} /><path d="M3 10c1.5-3 3.5-4 6-3s3.5 3 6 3 4.5-1 6-3" {...S} strokeWidth={2.4} /></I>,
    },
    {
      name: "Docker",
      brand: "#2496ed",
      icon: <I><g className="b" {...F}><rect x="5" y="9" width="3" height="3" rx=".5" /><rect x="9" y="9" width="3" height="3" rx=".5" /><rect x="13" y="9" width="3" height="3" rx=".5" /><rect x="9" y="5" width="3" height="3" rx=".5" /></g><path d="M2.5 13.5h18c0 4-3.8 6.5-9 6.5s-9-2.5-9-6.5z" {...F} /></I>,
    },
  ],
  [
    {
      name: "AWS",
      brand: "#ff9900",
      icon: <I><rect className="b" x="2" y="3" width="20" height="18" rx="4" {...F} /><text x="12" y="12.5" {...TXT}>aws</text><path d="M6 15.5q6 3.5 12 0M16 14.6l2.1.9-.7 2.1" {...S} strokeWidth={1.5} /></I>,
    },
    {
      name: "EC2",
      brand: "#ed7100",
      icon: <I><rect className="b" x="6" y="6" width="12" height="12" rx="2" {...F} /><rect x="6" y="6" width="12" height="12" rx="2" {...S} /><rect x="9.5" y="9.5" width="5" height="5" rx="1" {...F} /><path d="M9.5 2.5V6M14.5 2.5V6M9.5 18v3.5M14.5 18v3.5M2.5 9.5H6M2.5 14.5H6M18 9.5h3.5M18 14.5h3.5" {...S} /></I>,
    },
    {
      name: "S3",
      brand: "#7aa116",
      icon: <I><path className="b" d="M4 6.5 6 19c.2 1.3 2.8 2.3 6 2.3s5.8-1 6-2.3l2-12.5" {...F} /><ellipse cx="12" cy="6.5" rx="8" ry="3" {...S} /><path d="M4 6.5 6 19c.2 1.3 2.8 2.3 6 2.3s5.8-1 6-2.3l2-12.5" {...S} /></I>,
    },
  ],
];

export function TechStack() {
  let i = 0;
  return (
    <div className="tech" aria-label="Tech stack">
      {tools.map((row, r) => (
        <ul key={r} className="tech-row">
          {row.map((t) => (
            <li key={t.name} className="tech-chip" style={{ "--brand": t.brand, "--i": i++ } as CSSProperties}>
              {t.icon}
              {t.name}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
