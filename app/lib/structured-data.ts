import { SITE } from "./site";
import { MENU, TASTING_MENU } from "./menu";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.country,
};

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.fullName,
    description: SITE.tagline,
    url: SITE.url,
    image: `${SITE.url}/images/dining-room.jpg`,
    telephone: SITE.phone.display,
    email: SITE.email,
    priceRange: "₹₹",
    servesCuisine: ["Indian", "Italian", "Vegetarian"],
    address: POSTAL_ADDRESS,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    acceptsReservations: `${SITE.url}/reservations`,
    hasMenu: `${SITE.url}/menu`,
  };
}

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `Menu — ${SITE.fullName}`,
    url: `${SITE.url}/menu`,
    inLanguage: "en",
    hasMenuSection: MENU.map((section) => ({
      "@type": "MenuSection",
      name: section.name,
      description: section.note,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "INR",
        },
        suitableForDiet: item.vegan
          ? ["https://schema.org/VeganDiet", "https://schema.org/VegetarianDiet"]
          : ["https://schema.org/VegetarianDiet"],
      })),
    })),
    offers: {
      "@type": "Offer",
      name: TASTING_MENU.name,
      price: TASTING_MENU.price,
      priceCurrency: "INR",
    },
  };
}

/**
 * JSON.stringify does not escape characters that can close a script tag, so
 * anything embedded in a <script> needs `<` neutralised first.
 */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
