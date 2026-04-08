"use client";

const bg = "#B8893A";
const fg = "#FFFFFF";

/* ════════════════════════════════════════════
   1. DIGITAL BUTA — buta + circuit nodes
   Buta forması, içərisi dövrə xətləri və nöqtələrlə dolu
   ════════════════════════════════════════════ */
function DigitalButa({ s, fgColor }: { s: number; fgColor: string }) {
  return (
    <svg width={s * 0.78} height={s * 0.78} viewBox="0 0 32 32" fill="none">
      {/* Buta outer shape */}
      <path
        d="M16 4 C22 5 25 10 24 16 C23 21 19 26 16 28 C13 26 9 21 8 16 C7 10 10 5 16 4 Z"
        stroke={fgColor}
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner circuit lines */}
      <line x1="16" y1="9" x2="16" y2="14" stroke={fgColor} strokeWidth="1.2" />
      <line x1="13" y1="14" x2="19" y2="14" stroke={fgColor} strokeWidth="1.2" />
      <line x1="13" y1="14" x2="13" y2="18" stroke={fgColor} strokeWidth="1.2" />
      <line x1="19" y1="14" x2="19" y2="18" stroke={fgColor} strokeWidth="1.2" />
      <line x1="13" y1="18" x2="19" y2="18" stroke={fgColor} strokeWidth="1.2" />
      <line x1="16" y1="18" x2="16" y2="22" stroke={fgColor} strokeWidth="1.2" />
      {/* Circuit nodes */}
      <circle cx="16" cy="9" r="1.3" fill={fgColor} />
      <circle cx="13" cy="14" r="1" fill={fgColor} />
      <circle cx="19" cy="14" r="1" fill={fgColor} />
      <circle cx="13" cy="18" r="1" fill={fgColor} />
      <circle cx="19" cy="18" r="1" fill={fgColor} />
      <circle cx="16" cy="22" r="1.3" fill={fgColor} />
    </svg>
  );
}

/* ════════════════════════════════════════════
   2. PIXEL STAR — 8-pointed star made of squares
   Bayraqdakı 8-guşəli ulduz, kvadrat piksellərdən
   ════════════════════════════════════════════ */
function PixelStar({ s, fgColor }: { s: number; fgColor: string }) {
  // Star formed from a grid of small squares
  const sq = (x: number, y: number) => (
    <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2" fill={fgColor} />
  );
  return (
    <svg width={s * 0.78} height={s * 0.78} viewBox="0 0 32 32" fill="none">
      {/* Top arm */}
      {sq(15, 4)}
      {sq(15, 6)}
      {sq(15, 8)}
      {/* Bottom arm */}
      {sq(15, 22)}
      {sq(15, 24)}
      {sq(15, 26)}
      {/* Left arm */}
      {sq(4, 15)}
      {sq(6, 15)}
      {sq(8, 15)}
      {/* Right arm */}
      {sq(22, 15)}
      {sq(24, 15)}
      {sq(26, 15)}
      {/* Diagonal arms */}
      {sq(8, 8)}
      {sq(10, 10)}
      {sq(22, 8)}
      {sq(20, 10)}
      {sq(8, 22)}
      {sq(10, 20)}
      {sq(22, 22)}
      {sq(20, 20)}
      {/* Center cluster */}
      {sq(13, 13)}
      {sq(15, 13)}
      {sq(17, 13)}
      {sq(13, 15)}
      {sq(15, 15)}
      {sq(17, 15)}
      {sq(13, 17)}
      {sq(15, 17)}
      {sq(17, 17)}
    </svg>
  );
}

/* ════════════════════════════════════════════
   3. ŞƏBƏKƏ — geometric lattice (Azerbaijani woodwork)
   Xan saraylarında pəncərə şəbəkəsi — həndəsi
   ════════════════════════════════════════════ */
function Shebeke({ s, fgColor }: { s: number; fgColor: string }) {
  return (
    <svg width={s * 0.78} height={s * 0.78} viewBox="0 0 32 32" fill="none">
      {/* Outer hexagon-ish frame */}
      <path
        d="M16 3 L26 9 L26 23 L16 29 L6 23 L6 9 Z"
        stroke={fgColor}
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner geometric pattern — interlocking lines */}
      <path
        d="M16 9 L21 12 L21 20 L16 23 L11 20 L11 12 Z"
        stroke={fgColor}
        strokeWidth="1.3"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Cross lines connecting outer to inner */}
      <line x1="16" y1="3" x2="16" y2="9" stroke={fgColor} strokeWidth="1.3" />
      <line x1="16" y1="23" x2="16" y2="29" stroke={fgColor} strokeWidth="1.3" />
      <line x1="6" y1="9" x2="11" y2="12" stroke={fgColor} strokeWidth="1.3" />
      <line x1="26" y1="9" x2="21" y2="12" stroke={fgColor} strokeWidth="1.3" />
      <line x1="6" y1="23" x2="11" y2="20" stroke={fgColor} strokeWidth="1.3" />
      <line x1="26" y1="23" x2="21" y2="20" stroke={fgColor} strokeWidth="1.3" />
      {/* Center dot */}
      <circle cx="16" cy="16" r="1.5" fill={fgColor} />
    </svg>
  );
}

/* ════════════════════════════════════════════
   4. KHAN MEDALLION — carpet medallion + tech grid
   Xalça meydalyonu, içərisində piksel/grid
   ════════════════════════════════════════════ */
function KhanMedallion({ s, fgColor }: { s: number; fgColor: string }) {
  return (
    <svg width={s * 0.78} height={s * 0.78} viewBox="0 0 32 32" fill="none">
      {/* Outer carpet medallion shape — diamond with notches */}
      <path
        d="M16 3 L20 8 L26 8 L26 14 L29 16 L26 18 L26 24 L20 24 L16 29 L12 24 L6 24 L6 18 L3 16 L6 14 L6 8 L12 8 Z"
        stroke={fgColor}
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner pixel grid (3x3) */}
      <rect x="13" y="13" width="2" height="2" fill={fgColor} />
      <rect x="16" y="13" width="2" height="2" fill={fgColor} />
      <rect x="19" y="13" width="0" height="0" fill={fgColor} />
      <rect x="13" y="16" width="2" height="2" fill={fgColor} />
      <rect x="16" y="16" width="2" height="2" fill={fgColor} />
      <rect x="19" y="16" width="2" height="2" fill={fgColor} />
      <rect x="13" y="19" width="0" height="0" fill={fgColor} />
      <rect x="16" y="19" width="2" height="2" fill={fgColor} />
      <rect x="19" y="19" width="2" height="2" fill={fgColor} />
    </svg>
  );
}

/* ════════════════════════════════════════════
   5. TUGHRA K — calligraphic monogram
   Xan möhürü stili — kalliqrafik K
   ════════════════════════════════════════════ */
function TughraK({ s, fgColor }: { s: number; fgColor: string }) {
  return (
    <svg width={s * 0.78} height={s * 0.78} viewBox="0 0 32 32" fill="none">
      {/* Decorative arches above (tughra style) */}
      <path
        d="M6 8 Q10 4 14 8 Q18 4 22 8 Q26 4 26 10"
        stroke={fgColor}
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Stylized K — bold vertical with curved arms */}
      <path
        d="M11 11 L11 26"
        stroke={fgColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M11 18 Q16 12 22 11"
        stroke={fgColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M11 18 Q16 22 22 26"
        stroke={fgColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom ornament line */}
      <line x1="6" y1="29" x2="26" y2="29" stroke={fgColor} strokeWidth="1.2" strokeLinecap="round" />
      {/* Small flourish dots */}
      <circle cx="9" cy="29" r="0.8" fill={fgColor} />
      <circle cx="23" cy="29" r="0.8" fill={fgColor} />
    </svg>
  );
}

/* ════════════════════════════════════════════
   6. NETWORK STAR — 8-point star as network nodes
   8-guşəli ulduz şəbəkə düyünləri kimi
   ════════════════════════════════════════════ */
function NetworkStar({ s, fgColor }: { s: number; fgColor: string }) {
  const cx = 16,
    cy = 16,
    r = 11;
  const points = Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  return (
    <svg width={s * 0.78} height={s * 0.78} viewBox="0 0 32 32" fill="none">
      {/* Connection lines forming 8-point star */}
      {points.map((p, i) => {
        const next = points[(i + 3) % 8]; // Connect to 3rd next for star shape
        return (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={next.x}
            y2={next.y}
            stroke={fgColor}
            strokeWidth="1.3"
          />
        );
      })}
      {/* Nodes */}
      {points.map((p, i) => (
        <circle key={`n${i}`} cx={p.x} cy={p.y} r="1.6" fill={fgColor} />
      ))}
      {/* Center node */}
      <circle cx={cx} cy={cy} r="2" fill={fgColor} />
    </svg>
  );
}

const variants = [
  { label: "1. Digital Buta — buta + dövrə xətləri", render: DigitalButa },
  { label: "2. Pixel Star — 8-guşəli ulduz piksellərdən", render: PixelStar },
  { label: "3. Şəbəkə — xan sarayları pəncərə naxışı", render: Shebeke },
  { label: "4. Khan Medallion — xalça meydalyonu + grid", render: KhanMedallion },
  { label: "5. Tughra K — xan möhürü stili kalliqrafik K", render: TughraK },
  { label: "6. Network Star — 8-guşəli ulduz şəbəkə kimi", render: NetworkStar },
];

const sizes = [36, 48, 64, 96, 128];

export default function BrandPreviewPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-ink mb-2">Texnologiya + Ənənə yanaşmaları</h1>
        <p className="text-slate text-sm mb-8">
          Çip və tac yox. Hər biri Azərbaycan ənənəsini texnologiya ilə birləşdirir.
        </p>

        <div className="space-y-8">
          {variants.map((v, vi) => {
            const Render = v.render;
            return (
              <div key={vi} className="bg-white rounded-xl border border-[var(--color-hairline)] p-6">
                <h3 className="text-[15px] font-bold text-ink mb-4">{v.label}</h3>
                <div className="flex items-end gap-6 flex-wrap">
                  {sizes.map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div
                        style={{
                          width: s,
                          height: s,
                          background: bg,
                          borderRadius: Math.round(s * 0.2),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Render s={s} fgColor={fg} />
                      </div>
                      <span className="text-[10px] text-slate">{s}px</span>
                    </div>
                  ))}
                  {/* Light theme */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        background: "#FFFFFF",
                        borderRadius: 13,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #e5e5e0",
                      }}
                    >
                      <Render s={64} fgColor="#B8893A" />
                    </div>
                    <span className="text-[10px] text-slate">light</span>
                  </div>
                  {/* Dark theme */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        background: "#1A1D26",
                        borderRadius: 13,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Render s={64} fgColor="#B8893A" />
                    </div>
                    <span className="text-[10px] text-slate">dark</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
