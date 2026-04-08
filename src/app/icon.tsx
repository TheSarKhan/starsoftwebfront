import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          borderRadius: 6,
        }}
      >
        <svg width="25" height="25" viewBox="0 0 32 32" fill="none">
          <line x1="16" y1="5" x2="23.778" y2="23.778" stroke="#B8893A" strokeWidth="1.3" />
          <line x1="23.778" y1="8.222" x2="16" y2="27" stroke="#B8893A" strokeWidth="1.3" />
          <line x1="27" y1="16" x2="8.222" y2="23.778" stroke="#B8893A" strokeWidth="1.3" />
          <line x1="23.778" y1="23.778" x2="5" y2="16" stroke="#B8893A" strokeWidth="1.3" />
          <line x1="16" y1="27" x2="8.222" y2="8.222" stroke="#B8893A" strokeWidth="1.3" />
          <line x1="8.222" y1="23.778" x2="16" y2="5" stroke="#B8893A" strokeWidth="1.3" />
          <line x1="5" y1="16" x2="23.778" y2="8.222" stroke="#B8893A" strokeWidth="1.3" />
          <line x1="8.222" y1="8.222" x2="27" y2="16" stroke="#B8893A" strokeWidth="1.3" />
          <circle cx="16" cy="5" r="1.6" fill="#B8893A" />
          <circle cx="23.778" cy="8.222" r="1.6" fill="#B8893A" />
          <circle cx="27" cy="16" r="1.6" fill="#B8893A" />
          <circle cx="23.778" cy="23.778" r="1.6" fill="#B8893A" />
          <circle cx="16" cy="27" r="1.6" fill="#B8893A" />
          <circle cx="8.222" cy="23.778" r="1.6" fill="#B8893A" />
          <circle cx="5" cy="16" r="1.6" fill="#B8893A" />
          <circle cx="8.222" cy="8.222" r="1.6" fill="#B8893A" />
          <circle cx="16" cy="16" r="2" fill="#B8893A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
