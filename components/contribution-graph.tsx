import type { Contributions } from "@/lib/github";

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;

export function ContributionGraph({ data }: { data: Contributions }) {
  const { weeks } = data;
  const first = new Date(weeks[0][0].date + "T00:00:00Z").getUTCDay();

  // Month labels above the first week that starts in a new month.
  const months: { x: number; label: string }[] = [];
  weeks.forEach((week, i) => {
    const d = new Date(week[0].date + "T00:00:00Z");
    const prev = i > 0 ? new Date(weeks[i - 1][0].date + "T00:00:00Z") : null;
    if (!prev || prev.getUTCMonth() !== d.getUTCMonth()) {
      months.push({ x: i * STEP, label: d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }) });
    }
  });
  // Drop a first label that would collide with the second.
  if (months.length > 1 && months[1].x - months[0].x < STEP * 3) months.shift();

  const width = weeks.length * STEP - GAP;
  const height = 16 + 7 * STEP - GAP;

  return (
    <svg className="graph" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${data.total} contributions in the last year`}>
      {months.map((m) => (
        <text key={m.x} x={m.x} y={10} className="graph-month">
          {m.label}
        </text>
      ))}
      {weeks.map((week, i) =>
        week.map((day, j) => {
          const row = i === 0 ? j + first : j;
          return (
            <rect
              key={day.date}
              x={i * STEP}
              y={16 + row * STEP}
              width={CELL}
              height={CELL}
              rx={2}
              className={`graph-l${day.level}`}
            />
          );
        }),
      )}
    </svg>
  );
}
