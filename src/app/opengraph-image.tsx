import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "StarSoft — Biznesinizin texniki tərəfi artıq sizin dərdiniz deyil";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #FAFAF7 0%, #FFFFFF 50%, #F4F4F0 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "20px",
              background: "#B8893A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="5" x2="23.778" y2="23.778" stroke="#FFFFFF" strokeWidth="1.3" />
              <line x1="23.778" y1="8.222" x2="16" y2="27" stroke="#FFFFFF" strokeWidth="1.3" />
              <line x1="27" y1="16" x2="8.222" y2="23.778" stroke="#FFFFFF" strokeWidth="1.3" />
              <line x1="23.778" y1="23.778" x2="5" y2="16" stroke="#FFFFFF" strokeWidth="1.3" />
              <line x1="16" y1="27" x2="8.222" y2="8.222" stroke="#FFFFFF" strokeWidth="1.3" />
              <line x1="8.222" y1="23.778" x2="16" y2="5" stroke="#FFFFFF" strokeWidth="1.3" />
              <line x1="5" y1="16" x2="23.778" y2="8.222" stroke="#FFFFFF" strokeWidth="1.3" />
              <line x1="8.222" y1="8.222" x2="27" y2="16" stroke="#FFFFFF" strokeWidth="1.3" />
              <circle cx="16" cy="5" r="1.6" fill="#FFFFFF" />
              <circle cx="23.778" cy="8.222" r="1.6" fill="#FFFFFF" />
              <circle cx="27" cy="16" r="1.6" fill="#FFFFFF" />
              <circle cx="23.778" cy="23.778" r="1.6" fill="#FFFFFF" />
              <circle cx="16" cy="27" r="1.6" fill="#FFFFFF" />
              <circle cx="8.222" cy="23.778" r="1.6" fill="#FFFFFF" />
              <circle cx="5" cy="16" r="1.6" fill="#FFFFFF" />
              <circle cx="8.222" cy="8.222" r="1.6" fill="#FFFFFF" />
              <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
            </svg>
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#0F1419",
              letterSpacing: "-0.02em",
            }}
          >
            StarSoft
          </div>
        </div>

        {/* Middle: tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#0F1419",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            Texnologiyanızı{" "}
            <span style={{ color: "#B8893A" }}>ulduzlara çatdırırıq</span>.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#5A6072",
              lineHeight: 1.4,
              maxWidth: "850px",
            }}
          >
            Web, mobil, kibertəhlükəsizlik, DevOps, avtomatlaşdırma, analitika —
            bir tərəfdaşdan, sabit qiymətə.
          </div>
        </div>

        {/* Bottom: domain + accent */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #E8E6DF",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              color: "#5A6072",
              fontWeight: 600,
            }}
          >
            starsoft.az
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#B8893A",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Biznesinizi parlat, texniki tərəfi bizə burax
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
