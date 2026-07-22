const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Vue: "#41b883",
  SCSS: "#c6538c",
  Markdown: "#083fa1",
};

const PLACEHOLDER_WIDTH = 640;
const PLACEHOLDER_HEIGHT = 360;

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return h;
}

function hashToHue(hash: number): number {
  return hash % 360;
}

function languageColor(language: string | null): string {
  if (!language) return "#c4843a";
  return LANGUAGE_COLORS[language] ?? "#c4843a";
}

type ProjectPlaceholderProps = {
  name: string;
  language: string | null;
  className?: string;
};

export function ProjectPlaceholder({
  name,
  language,
  className,
}: ProjectPlaceholderProps) {
  const hash = hashName(name);
  const hue = hashToHue(hash);
  const hueB = (hue + 38 + (hash % 40)) % 360;
  const lang = languageColor(language);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        aspectRatio: `${PLACEHOLDER_WIDTH} / ${PLACEHOLDER_HEIGHT}`,
      }}
      role="img"
      aria-label={`${name} preview`}
    >
      <svg
        width={PLACEHOLDER_WIDTH}
        height={PLACEHOLDER_HEIGHT}
        viewBox={`0 0 ${PLACEHOLDER_WIDTH} ${PLACEHOLDER_HEIGHT}`}
        className="block h-auto w-full"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={`ph-${hash}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={`hsl(${hue} 42% 28%)`} />
            <stop offset="52%" stopColor={lang} stopOpacity={0.85} />
            <stop offset="100%" stopColor={`hsl(${hueB} 38% 22%)`} />
          </linearGradient>
        </defs>
        <rect
          width={PLACEHOLDER_WIDTH}
          height={PLACEHOLDER_HEIGHT}
          fill={`url(#ph-${hash})`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(245, 240, 232, 0.88)"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="28"
          letterSpacing="0.02em"
        >
          {name}
        </text>
      </svg>
    </div>
  );
}

export { PLACEHOLDER_WIDTH, PLACEHOLDER_HEIGHT };
