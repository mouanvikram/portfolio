"use client";

import type { ReactNode } from "react";
import { useAnchor } from "./use-anchor";

/** Footer link with a preview card that rises out of it on hover / focus. */
export function Pop({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const { anchor, card, place } = useAnchor<HTMLSpanElement, HTMLSpanElement>("center", ".footer");

  return (
    <span ref={anchor} className="pop" onPointerEnter={place} onFocus={place}>
      <a className="link" href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
      <span ref={card} className="pop-card">
        {children}
      </span>
    </span>
  );
}
