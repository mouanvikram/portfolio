import type { ReactNode } from "react";

/**
 * A highlighted phrase in the essay. Hovering (or focusing / tapping) it
 * reveals `children` in the margin, aligned with the line it sits on.
 * Pure CSS — no JavaScript needed.
 */
export function Note({ term, children }: { term: string; children: ReactNode }) {
  return (
    <span className="note" tabIndex={0}>
      <span className="note-term">{term}</span>
      <span className="note-card" role="tooltip">
        {children}
      </span>
    </span>
  );
}
