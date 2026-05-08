import { ImageResponse } from "next/og";

export const alt = "こどもフラッシュカード";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#fff7ed",
          color: "#1f2937",
          fontFamily: "sans-serif",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 72px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 760,
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 700 }}>こどもフラッシュカード</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 30,
              lineHeight: 1.4,
            }}
          >
            <span>幼児向けのフラッシュカードアプリ</span>
            <span>難易度を3段階から選んで、絵を見て答えよう</span>
          </div>
          <div style={{ fontSize: 26, color: "#6b7280" }}>kids-flashcard.ikk-dev.jp</div>
        </div>
        <div style={{ fontSize: 220 }}>🍇</div>
      </div>
    ),
    size,
  );
}
