import type { GithubData } from "@/lib/types";

type Week = GithubData["commitActivity"][number];

type CommitActivityProps = {
  weeks: Week[];
};

const WIDTH = 520;
const HEIGHT = 72;
const PAD_Y = 4;

export function CommitActivity({ weeks }: CommitActivityProps) {
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
      aria-label="Weekly commit activity over the past year"
    >
      {weeks.map((week, i) => {
        const h =
          week.count === 0 ? 0 : Math.max((week.count / max) * innerHeight, 2);
        const x = i * (barWidth + gap);
        const y = HEIGHT - PAD_Y - h;
        return (
          <rect
            key={week.week}
            x={x}
            y={week.count === 0 ? HEIGHT - PAD_Y - 1 : y}
            width={barWidth}
            height={week.count === 0 ? 1 : h}
            rx={1}
            className={
              week.count === 0 ? "fill-fg/15" : "fill-current opacity-90"
            }
          >
            <title>
              {week.week}: {week.count}{" "}
              {week.count === 1 ? "commit" : "commits"}
            </title>
          </rect>
        );
      })}
    </svg>
  );
}
