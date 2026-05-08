import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "こどもフラッシュカード";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image() {
  const imagePath = path.join(process.cwd(), "app", "ogp-grapes.png");
  const imageBuffer = await readFile(imagePath);
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");
  const imageSrc = `data:image/png;base64,${imageBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        <img
          src={imageSrc}
          alt="ぶどうのイラスト"
          style={{
            width: "630px",
            height: "630px",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size,
  );
}
