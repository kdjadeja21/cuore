import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { SITE } from "./lib/site";
import { jsonLd, restaurantSchema } from "./lib/structured-data";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} — ${SITE.address.locality}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Cuore means heart. A 35-foot-high dining room of sculpted plaster, woven lanterns and hand-drawn pattern — by Masala Diaries, Rajkot. Open daily, 11 AM to 11 PM.",
  openGraph: {
    type: "website",
    siteName: SITE.fullName,
    title: `${SITE.fullName} — ${SITE.address.locality}`,
    description: `Dining that begins in the heart. Restaurant & banquets, ${SITE.address.street}, ${SITE.address.locality}.`,
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
      <body className="grain bg-parchment text-ink">
        {/* Anything the animations hide must come back if the scripts never run */}
        <noscript>
          <style>{`.gsap-vis-hidden { visibility: visible; }`}</style>
        </noscript>

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Nav />
        <main id="main">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(restaurantSchema()) }}
        />
      </body>
    </html>
  );
}
