export type Day = { date: string; level: number };
export type Contributions = { total: number; weeks: Day[][] };

/**
 * Scrapes the public contribution calendar (the green grid on a GitHub profile)
 * at build time. Returns null if GitHub is unreachable so the build never fails.
 */
export async function getContributions(user: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const days: Day[] = [];
    for (const [td] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
      const date = td.match(/data-date="([\d-]+)"/)?.[1];
      const level = td.match(/data-level="(\d)"/)?.[1];
      if (date && level) days.push({ date, level: Number(level) });
    }
    if (!days.length) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));

    // Columns are weeks starting on Sunday, like GitHub's grid.
    const weeks: Day[][] = [];
    for (const day of days) {
      const weekday = new Date(day.date + "T00:00:00Z").getUTCDay();
      if (weekday === 0 || !weeks.length) weeks.push([]);
      weeks[weeks.length - 1].push(day);
    }

    const total = Number(html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1].replace(/,/g, "") ?? 0);
    return { total, weeks };
  } catch {
    return null;
  }
}
