"use client";

import type { ReactNode } from "react";
import { useAnchor } from "./use-anchor";

/**
 * A highlighted phrase in the essay. Hovering (or focusing / tapping) it opens
 * `children` in a card just below the phrase, growing out of it.
 */
export function Note({ term, children }: { term: string; children: ReactNode }) {
  const { anchor, card, place } = useAnchor<HTMLSpanElement, HTMLSpanElement>("start", ".essay");

  return (
    <span ref={anchor} className="note" tabIndex={0} onPointerEnter={place} onFocus={place}>
      <span className="note-term">{term}</span>
      <span ref={card} className="note-card" role="tooltip">
        {children}
      </span>
    </span>
  );
}
