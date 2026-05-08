import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "こどもフラッシュカード",
  description:
    "幼児向けのフラッシュカードアプリ。難易度を3段階から選んで、絵を見て答えよう。",
  metadataBase: new URL("https://kids-flashcard.ikk-dev.jp"),
  openGraph: {
    type: "website",
    url: "https://kids-flashcard.ikk-dev.jp",
    title: "こどもフラッシュカード",
    description:
      "幼児向けのフラッシュカードアプリ。難易度を3段階から選んで、絵を見て答えよう。",
    siteName: "こどもフラッシュカード",
    locale: "ja_JP",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "こどもフラッシュカード",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "こどもフラッシュカード",
    description:
      "幼児向けのフラッシュカードアプリ。難易度を3段階から選んで、絵を見て答えよう。",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fff7ed",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
