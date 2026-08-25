export type SpiceLevel = 1 | 2 | 3;

export type MenuItem = {
  name: string;
  description: string;
  /** Rupees. */
  price: number;
  vegan?: boolean;
  nuts?: boolean;
  spice?: SpiceLevel;
  /** Also shown on the home page as a signature dish. */
  signature?: boolean;
};

export type MenuSection = {
  id: string;
  name: string;
  italian: string;
  note: string;
  items: MenuItem[];
};

/** Rajkot eats vegetarian, so the whole kitchen does too. Stated once, at the
 *  top of the menu, rather than tagging every single line. */
export const KITCHEN_NOTE =
  "Everything on this menu is vegetarian. Ask and most of it can be made vegan — the kitchen would rather you told us than went without.";

export const TASTING_MENU = {
  name: "Il Cuore",
  price: 1850,
  courses: 7,
  description:
    "Seven courses, chosen that morning depending on what the tandoor and the market agree on. One table at a time, from 7 pm. Vegan version on request. Book a day ahead.",
};

export const MENU: MenuSection[] = [
  {
    id: "small-plates",
    name: "Small plates",
    italian: "piccoli piatti",
    note: "For the first twenty minutes, while the bread is still in the oven.",
    items: [
      {
        name: "Dahi ke kebab",
        description:
          "Yoghurt hung overnight until it forgets it was ever liquid, rolled in crushed cashew, fried until it barely holds together.",
        price: 340,
        nuts: true,
      },
      {
        name: "Burrata & tomato chaat",
        description:
          "Torn burrata, blistered cherry tomatoes, tamarind, a fistful of sev. Two countries arguing pleasantly on one plate.",
        price: 520,
      },
      {
        name: "Corn & water chestnut tikki",
        description:
          "Sweetcorn and singhara, green chilli, mint, griddled flat in ghee until the edges go lacy.",
        price: 320,
        spice: 2,
      },
      {
        name: "Bruschetta al pomodoro",
        description:
          "Sourdough from our own starter, charred over coal, rubbed with garlic and heavy with tomato and basil.",
        price: 290,
        vegan: true,
      },
      {
        name: "Tandoori broccoli",
        description:
          "Florets lacquered in hung curd and ajwain, almond skordalia underneath, chilli oil over the top.",
        price: 380,
        nuts: true,
        spice: 2,
      },
    ],
  },
  {
    id: "tandoor",
    name: "From the tandoor",
    italian: "dal forno",
    note: "One clay oven, lit at ten in the morning, not allowed to go out until close.",
    items: [
      {
        name: "Paneer tikka Cuore",
        description:
          "Our own paneer, set that morning. Four hours in hung curd, ajwain and Kashmiri chilli, then eight minutes over coal.",
        price: 460,
        spice: 2,
        signature: true,
      },
      {
        name: "Malai broccoli",
        description:
          "Cream, cheese and white pepper, barely coloured — the gentlest thing to ever come out of a tandoor.",
        price: 420,
      },
      {
        name: "Bharwan aloo",
        description:
          "Potatoes hollowed and packed with raisin, cashew and mint, sealed and roasted until the skin blisters.",
        price: 360,
        nuts: true,
      },
      {
        name: "Soya chaap masala",
        description:
          "Wound onto the skewer, twice-marinated, finished with a chilli butter that does not apologise.",
        price: 390,
        spice: 3,
      },
      {
        name: "Stuffed mushroom",
        description:
          "Button caps filled with walnut, cheddar and thyme, roasted until the filling catches at the edges.",
        price: 440,
        nuts: true,
      },
    ],
  },
  {
    id: "mains",
    name: "Mains",
    italian: "i secondi",
    note: "Ordered for the table, eaten off each other's plates. That is the intention.",
    items: [
      {
        name: "Dal Cuore",
        description:
          "Black urad over coal for eleven hours, tomato, cream, one curl of butter. The dish the restaurant is named for.",
        price: 420,
        signature: true,
      },
      {
        name: "Paneer lababdar",
        description:
          "Charred paneer folded into a tomato and cashew gravy, smoked with a coal dropped in at the last second.",
        price: 480,
        nuts: true,
        spice: 2,
      },
      {
        name: "Wild mushroom risotto",
        description:
          "Carnaroli, porcini stock, aged parmesan, thyme. Stirred for eighteen minutes by someone who counts.",
        price: 560,
        signature: true,
      },
      {
        name: "Margherita del forno",
        description:
          "Wood-fired in ninety seconds. Buffalo mozzarella, San Marzano, basil, and a crust that leopard-spots properly.",
        price: 490,
        signature: true,
      },
      {
        name: "Kaju curry",
        description:
          "Whole cashews in a coconut and poppy seed gravy, Saurashtra-style, sweeter and hotter than you expect.",
        price: 460,
        nuts: true,
        spice: 2,
      },
      {
        name: "Penne alla norma",
        description:
          "Aubergine collapsed into tomato, torn basil, salted ricotta. Ask and it comes without the cheese.",
        price: 470,
      },
      {
        name: "Undhiyu",
        description:
          "The winter one. Root vegetables and muthiya buried in a sealed pot with green garlic. December to February only.",
        price: 520,
        spice: 2,
      },
    ],
  },
  {
    id: "breads-rice",
    name: "Breads & rice",
    italian: "pane e riso",
    note: "Everything here arrives hot or it does not arrive.",
    items: [
      {
        name: "Laccha paratha",
        description: "Wound, rested, and slapped into the tandoor. Pulls apart in sheets.",
        price: 90,
      },
      {
        name: "Truffle naan",
        description: "Black truffle and butter, brushed on the second it comes off the wall.",
        price: 180,
      },
      {
        name: "Khameeri roti",
        description: "Naturally leavened overnight, thin, blistered, no dairy.",
        price: 80,
        vegan: true,
      },
      {
        name: "Hyderabadi biryani",
        description:
          "Sealed with dough and opened at the table. Long-grain rice, fried onion, mint, saffron milk.",
        price: 480,
        spice: 2,
      },
      {
        name: "Saffron pulao",
        description: "Quiet, buttery, and the right thing next to anything from the tandoor.",
        price: 260,
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    italian: "i dolci",
    note: "The lanterns are usually on by the time these come out.",
    items: [
      {
        name: "Kesar pista kulfi",
        description:
          "Milk reduced by half over four hours, saffron from Kashmir, crushed pistachio, dried rose.",
        price: 280,
        nuts: true,
        signature: true,
      },
      {
        name: "Tiramisu",
        description:
          "Made at four in the afternoon for the same evening. Mascarpone, our own cold brew, a lot of cocoa.",
        price: 320,
      },
      {
        name: "Gulab jamun & rabri",
        description: "Warm, soaked, sitting in cold thickened milk. Order one between two.",
        price: 300,
        nuts: true,
      },
      {
        name: "Dark chocolate & chilli tart",
        description:
          "Seventy per cent single-origin, a whisper of Kashmiri chilli, sea salt on top.",
        price: 340,
        spice: 1,
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    italian: "da bere",
    note: "No alcohol — Gujarat. We have got very good at everything else.",
    items: [
      {
        name: "Masala chai",
        description: "Boiled, not steeped. Ginger, green cardamom, and a full minute of patience.",
        price: 120,
      },
      {
        name: "Kokum & basil cooler",
        description: "Sharp, deep pink, and the only sensible answer to a Rajkot afternoon.",
        price: 180,
        vegan: true,
      },
      {
        name: "Cold brew",
        description: "Chikmagalur beans, eighteen hours in cold water, served over one big cube.",
        price: 200,
        vegan: true,
      },
      {
        name: "Filter coffee",
        description: "Decoction and hot milk, pulled between two tumblers until it foams.",
        price: 140,
      },
      {
        name: "Fresh lime soda",
        description: "Sweet, salted, or the argument in between.",
        price: 110,
        vegan: true,
      },
    ],
  },
];
