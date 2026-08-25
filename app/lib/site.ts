/**
 * Every brand fact the site states more than once. Anything that appears in
 * the nav, the footer, a page body and the structured data at the same time
 * lives here so the four copies cannot drift apart.
 */
export const SITE = {
  name: "cuore",
  fullName: "Cuore by Masala Diaries",
  parent: "by masala diaries",
  tagline: "Dining that begins in the heart.",
  marquee: "dal cuore · from the heart · ",
  url: "https://cuorerajkot.in",

  address: {
    street: "Near 150 Ft Ring Road",
    locality: "Rajkot",
    region: "Gujarat",
    country: "IN",
  },

  hours: {
    label: "Open daily",
    display: "11 am – 11 pm",
    opens: "11:00",
    closes: "23:00",
  },

  phone: {
    display: "+91 90990 31031",
    href: "tel:+919099031031",
  },

  email: "hello@cuorerajkot.in",

  directionsUrl: "https://share.google/XkVfOSEDBZnbFkhmu",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Cuore+by+Masala+Diaries,+150+Ft+Ring+Road,+Rajkot,+Gujarat&output=embed",
  instagramUrl: "https://www.instagram.com/explore/locations/cuore-rajkot/",

  /** Parties above this go through the banquet team rather than the online form. */
  maxTableParty: 10,
  banquetCapacity: 400,
  diningCovers: 180,
} as const;

export const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
] as const;
