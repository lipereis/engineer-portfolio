type ExtensionPreviewProps = {
  label: string;
  labels: {
    asin: string;
    sales: string;
    gross: string;
    commission: string;
    net: string;
  };
  alt: string;
};

const SAMPLE_METRICS = {
  asin: "B0AMZSCOPE",
  sales: "1,200",
  gross: "R$ 119.988",
  commission: "R$ 14.399",
  net: "R$ 105.589",
} as const;

export function ExtensionPreview({
  label,
  labels,
  alt,
}: ExtensionPreviewProps) {
  const metrics = [
    [labels.sales, SAMPLE_METRICS.sales],
    [labels.gross, SAMPLE_METRICS.gross],
    [labels.commission, SAMPLE_METRICS.commission],
    [labels.net, SAMPLE_METRICS.net],
  ] as const;

  return (
    <div className="relative" aria-label={alt} role="img">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg/90 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold tracking-wide text-fg">
              AmzScope
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-4 rounded-xl border border-border/60 bg-fg/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {labels.asin}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold text-accent">
              {SAMPLE_METRICS.asin}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-2.5">
            {metrics.map(([metric, value]) => (
              <div
                key={metric}
                className="rounded-xl border border-border/60 bg-fg/[0.03] p-3"
              >
                <dt className="text-[10px] leading-snug text-muted-foreground">
                  {metric}
                </dt>
                <dd className="mt-1 text-sm font-semibold tracking-tight text-fg">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
