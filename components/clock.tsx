"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: site.timeZone,
});

/** What I'm probably doing at a given local hour — shown on hover. */
function status(hour: number) {
  if (hour < 6) return "Probably asleep.";
  if (hour < 9) return "Morning. Coffee, then code.";
  if (hour < 13) return "Deep work hours.";
  if (hour < 14) return "Lunch break.";
  if (hour < 19) return "Shipping.";
  if (hour < 23) return "Side-project hours.";
  return "Late-night commits.";
}

/**
 * Live local time. Each digit is keyed by its value, so only the digits that
 * change remount and play the roll-in animation.
 */
export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const text = now ? format.format(now) : "--:--:--";

  return (
    <span className="clock" tabIndex={0}>
      <span className="clock-dot" aria-hidden />
      <time className="clock-time" aria-label={text} suppressHydrationWarning>
        {text.split("").map((ch, i) => (
          <span key={`${i}-${ch}`} className={ch === ":" ? "clock-sep" : "clock-digit"} aria-hidden>
            {ch}
          </span>
        ))}
      </time>
      {site.timeZoneLabel}
      {now && (
        <span className="clock-tip" role="tooltip">
          {status(Number(text.slice(0, 2)))}
        </span>
      )}
    </span>
  );
}
