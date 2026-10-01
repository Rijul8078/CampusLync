import { ImageResponse } from "next/og";
export const alt =
  "CampusLync — Student life, made easier. Study. Settle. Succeed.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f0f7f7",
        display: "flex",
        padding: "80px",
        flexDirection: "column",
        color: "#092b46",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
        Campus<span style={{ color: "#008b91" }}>Lync</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 82,
          fontWeight: 700,
          letterSpacing: "-4px",
        }}
      >
        <span>Student life,</span>
        <span style={{ color: "#008b91" }}>made easier.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 25,
        }}
      >
        <span>Study. Settle. Succeed.</span>
        <span>STUDY / CAREER / ACCOMMODATION</span>
      </div>
    </div>,
    size,
  );
}
