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

/** Live local time. Renders a fixed-width placeholder on the server so nothing shifts on hydrate. */
export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="clock">
      <span className="clock-dot" aria-hidden />
      <time suppressHydrationWarning>{now ? format.format(now) : "--:--:--"}</time> {site.timeZoneLabel}
    </span>
  );
}
