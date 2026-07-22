import type { GithubData } from "@/lib/types";

type Day = GithubData["contributionWeeks"][number];

type ContributionCalendarProps = {
  days: Day[];
  lessLabel: string;
  moreLabel: string;
};

const LEVEL_CLASS: Record<Day["level"], string> = {
  0: "bg-fg/[0.06]",
  1: "bg-accent/25",
  2: "bg-accent/45",
  3: "bg-accent/70",
  4: "bg-accent",
};

function chunkWeeks(days: Day[]): Day[][] {
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function formatDayTitle(day: Day): string {
  const label = new Date(`${day.date}T12:00:00Z`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const n = day.count;
  const contrib = n === 1 ? "1 contribution" : `${n} contributions`;
  return `${contrib} on ${label}`;
}

export function ContributionCalendar({
  days,
  lessLabel,
  moreLabel,
}: ContributionCalendarProps) {
  const weeks = chunkWeeks(days);

  return (
    <div className="min-w-0">
      <div className="overflow-x-auto pb-1">
        <div
          className="inline-grid grid-flow-col gap-[3px]"
          style={{ gridTemplateRows: "repeat(7, 11px)" }}
          role="img"
          aria-label="Contribution calendar"
        >
          {weeks.map((week, wi) =>
            week.map((day, di) => (
              <span
                key={day.date}
                title={formatDayTitle(day)}
                className={`size-[11px] rounded-[2px] ${LEVEL_CLASS[day.level]}`}
                style={{ gridRow: di + 1, gridColumn: wi + 1 }}
              />
            )),
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
        <span>{lessLabel}</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span
            key={level}
            className={`size-[11px] rounded-[2px] ${LEVEL_CLASS[level]}`}
            aria-hidden
          />
        ))}
        <span>{moreLabel}</span>
      </div>
    </div>
  );
}
