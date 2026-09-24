"use client";

import { useCallback, useRef } from "react";

/**
 * Positions an absolutely-positioned card relative to its anchor (the hovered
 * item): aligned to the anchor's start or centre, clamped inside the nearest
 * `boundsSelector` element, with `--ox` set so the card scales out of the anchor.
 */
export function useAnchor<A extends HTMLElement, C extends HTMLElement>(align: "start" | "center", boundsSelector: string) {
  const anchor = useRef<A>(null);
  const card = useRef<C>(null);

  const place = useCallback(() => {
    const a = anchor.current;
    const c = card.current;
    if (!a || !c) return;

    const bounds = (a.closest(boundsSelector) ?? document.body).getBoundingClientRect();
    const box = a.getBoundingClientRect();
    const width = c.offsetWidth;

    const min = bounds.left - box.left;
    const max = Math.max(min, bounds.right - box.left - width);
    const left = Math.min(Math.max(align === "center" ? (box.width - width) / 2 : 0, min), max);

    c.style.left = `${left}px`;
    c.style.setProperty("--ox", `${box.width / 2 - left}px`);
  }, [align, boundsSelector]);

  return { anchor, card, place };
}
