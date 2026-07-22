import type { GithubData } from "@/lib/types";

type Week = GithubData["commitActivity"][number];

type CommitActivityProps = {
  weeks: Week[];
  label: string;
};

const WIDTH = 520;
const HEIGHT = 72;
const PAD_Y = 4;

/** Stable float serialization across Node SSR and browser hydration. */
function px(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2);
}

export function CommitActivity({ weeks, label }: CommitActivityProps) {
  if (weeks.length === 0) return null;

  const max = Math.max(...weeks.map((w) => w.count), 1);
  const gap = 2;
  const barWidth = (WIDTH - gap * (weeks.length - 1)) / weeks.length;
  const innerHeight = HEIGHT - PAD_Y * 2;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full text-accent"
      role="img"
      aria-label={label}
    >
      {weeks.map((week, i) => {
        const rawH =
          week.count === 0
            ? 0
            : Math.max((week.count / max) * innerHeight, 2);
        const x = px(i * (barWidth + gap));
        const y =
          week.count === 0
            ? String(HEIGHT - PAD_Y - 1)
            : px(HEIGHT - PAD_Y - rawH);
        const width = px(barWidth);
        const height = week.count === 0 ? "1" : px(rawH);
        const tip = `${week.week}: ${week.count} ${
          week.count === 1 ? "commit" : "commits"
        }`;
        // Keep <title> on <g>, not inside <rect> — nested title caused React #418.
        return (
          <g key={week.week}>
            <title>{tip}</title>
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              rx="1"
              className={
                week.count === 0 ? "fill-fg/15" : "fill-current opacity-90"
              }
            />
          </g>
        );
      })}
    </svg>
  );
}
