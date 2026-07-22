import Link from "next/link";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-28 sm:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-start gap-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          404
        </p>
        <h1
          id="not-found-heading"
          className="font-display text-4xl tracking-tight text-fg sm:text-5xl"
        >
          Page not found
        </h1>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          This route doesn&apos;t exist on the portfolio. Head back home to
          explore projects, experience, and contact.
        </p>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
