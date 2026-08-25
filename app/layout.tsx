import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuore by Masala Diaries — Rajkot",
  description:
    "Cuore means heart. A 35-foot-high dining room of sculpted plaster, woven lanterns and hand-drawn pattern — by Masala Diaries, Rajkot. Open daily, 11 AM to 11 PM.",
  openGraph: {
    title: "Cuore by Masala Diaries — Rajkot",
    description:
      "Dining that begins in the heart. Restaurant & banquets, near 150 Ft Ring Road, Rajkot.",
    images: ["/images/dining-room.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#241c10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} antialiased`}
    >
      <body className="grain bg-parchment text-ink">{children}</body>
    </html>
  );
}
