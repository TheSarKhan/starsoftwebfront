import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KhanSoft — Azərbaycan biznesinin rəqəmsal xanlığı";
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
              <rect x="8" y="2" width="2" height="3" fill="#FFFFFF" />
              <rect x="14" y="2" width="2" height="3" fill="#FFFFFF" />
              <rect x="20" y="2" width="2" height="3" fill="#FFFFFF" />
              <rect x="8" y="27" width="2" height="3" fill="#FFFFFF" />
              <rect x="14" y="27" width="2" height="3" fill="#FFFFFF" />
              <rect x="20" y="27" width="2" height="3" fill="#FFFFFF" />
              <rect x="2" y="8" width="3" height="2" fill="#FFFFFF" />
              <rect x="2" y="14" width="3" height="2" fill="#FFFFFF" />
              <rect x="2" y="20" width="3" height="2" fill="#FFFFFF" />
              <rect x="27" y="8" width="3" height="2" fill="#FFFFFF" />
              <rect x="27" y="14" width="3" height="2" fill="#FFFFFF" />
              <rect x="27" y="20" width="3" height="2" fill="#FFFFFF" />
              <rect x="5" y="5" width="22" height="22" rx="2.5" stroke="#FFFFFF" strokeWidth="2" />
              <path
                d="M16 8 L23 10 L23 15 Q23 21 16 24 Q9 21 9 15 L9 10 Z"
                fill="#FFFFFF"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <rect x="13.2" y="13" width="1.6" height="9" fill="#B8893A" />
              <path d="M14.8 17.5 L19 13" stroke="#B8893A" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M14.8 17.5 L19 22" stroke="#B8893A" strokeWidth="1.6" strokeLinecap="round" />
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
            KhanSoft
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
            Biznesinizin texniki tərəfi{" "}
            <span style={{ color: "#B8893A" }}>artıq sizin dərdiniz deyil</span>.
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
            khansoft.az
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
            Daha az resursla, daha çox iş
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
