type LanguageChartProps = {
  languages: Record<string, number>;
};

function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} KB`;
  return `${bytes} B`;
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const entries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

  if (total === 0 || entries.length === 0) {
    return null;
  }

  return (
    <ul className="flex list-none flex-col gap-3" role="list">
      {entries.map(([name, bytes], index) => {
        const pct = (bytes / total) * 100;
        return (
          <li key={name} className="min-w-0">
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate font-medium text-fg">{name}</span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                {pct.toFixed(1)}%
                <span className="sr-only"> ({formatBytes(bytes)})</span>
              </span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-fg/10"
              role="presentation"
            >
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
                style={{
                  width: `${pct}%`,
                  opacity: 1 - index * 0.08,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
