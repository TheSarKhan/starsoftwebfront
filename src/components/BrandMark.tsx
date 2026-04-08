type Theme = "gold-bg" | "gold-on-light";

export default function BrandMark({
  theme = "gold-on-light",
  size = 64,
  radius,
}: {
  theme?: Theme;
  size?: number;
  radius?: number;
}) {
  const bg = theme === "gold-bg" ? "#B8893A" : "#FFFFFF";
  const fg = theme === "gold-bg" ? "#FFFFFF" : "#B8893A";
  const r = radius ?? Math.round(size * 0.2);

  const cx = 16,
    cy = 16,
    rr = 11;
  const points = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
    return { x: cx + rr * Math.cos(angle), y: cy + rr * Math.sin(angle) };
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        background: bg,
        borderRadius: r,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size * 0.78} height={size * 0.78} viewBox="0 0 32 32" fill="none">
        {points.map((p, i) => {
          const next = points[(i + 3) % 8];
          return (
            <line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke={fg}
              strokeWidth="1.3"
            />
          );
        })}
        {points.map((p, i) => (
          <circle key={`n${i}`} cx={p.x} cy={p.y} r="1.6" fill={fg} />
        ))}
        <circle cx={cx} cy={cy} r="2" fill={fg} />
      </svg>
    </div>
  );
}
