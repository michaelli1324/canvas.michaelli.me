import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "canvas.michaelli.me",
  description: "Create and share art on a real-time collaborative canvas",
  keywords: [
    "collaborative",
    "canvas",
    "real-time",
    "art",
    "pixel art",
    "place",
  ],
  authors: [{ name: "Michael" }],
  openGraph: {
    title: "Collaborative Canvas",
    description: "Create and share art on a real-time collaborative canvas",
    url: "https://canvas.michaelli.me",
    siteName: "Collaborative Canvas",
    images: [
      {
        url: "https://canvas.michaelli.me/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collaborative Canvas",
    description: "Create and share art on a real-time collaborative canvas",
    images: ["https://canvas.michaelli.me/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
