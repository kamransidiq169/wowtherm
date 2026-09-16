// export type ProductCategory =
//   | "electric"
//   | "hydronic"
//   | "thermostats"
//   | "insulation"
//   | "accessories";

// export interface Product {
//   slug: string;
//   name: string;
//   category: ProductCategory;
//   tagline: string;
//   description: string[];
//   features: string[];
//   specifications: { label: string; value: string }[];
//   applications: string[];
//   image: string;
//   gallery: string[];
//   featured?: boolean;
// }

// const u = (id: string, w = 1400) =>
//   `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

// export const categories: { value: ProductCategory | "all"; label: string }[] = [
//   { value: "all", label: "All systems" },
//   { value: "electric", label: "Electric heating" },
//   { value: "hydronic", label: "Water-based" },
//   { value: "thermostats", label: "Smart controls" },
//   { value: "insulation", label: "Insulation" },
//   { value: "accessories", label: "Accessories" },
// ];

// export const products: Product[] = [
//   {
//     slug: "stickymat-200",
//     name: "StickyMat 200W",
//     category: "electric",
//     tagline: "Self-adhesive electric mat for tile and stone floors",
//     description: [
//       "The StickyMat 200W is a self-adhesive electric heating mat engineered for the floors modern homes actually have — vitrified tile, marble, granite and stone. The twin-conductor cable is pre-spaced on an adhesive mesh, so it rolls out flat, sticks down without tape and tiles over directly with flexible adhesive.",
//       "At just 3mm thick, it adds virtually no height to the floor build-up, making it ideal for renovations where door thresholds and finished levels are fixed. Paired with a WowTherm thermostat, most bathrooms reach barefoot comfort in under 20 minutes.",
//     ],
//     features: [
//       "Self-adhesive mesh — no staples, no movement while tiling",
//       "3mm ultra-thin twin-conductor cable, zero EMF design",
//       "Warms tile and stone from cold in 15–25 minutes",
//       "IPX7-rated, safe for bathrooms and wet rooms",
//       "10-year full-replacement warranty",
//     ],
//     specifications: [
//       { label: "Output", value: "200 W/m²" },
//       { label: "Thickness", value: "3 mm" },
//       { label: "Cable type", value: "Twin-conductor, fluoropolymer insulated" },
//       { label: "Voltage", value: "230 V AC" },
//       { label: "Sizes", value: "1 m² to 12 m² mats" },
//       { label: "Floor finishes", value: "Tile, stone, marble, granite" },
//       { label: "Warranty", value: "10 years" },
//     ],
//     applications: ["Bathrooms", "Kitchens", "Living areas", "Hallways"],
//     image: u("photo-1631679706909-1844bbd07221"),
//     gallery: [
//       u("photo-1584622650111-993a426fbf0a"),
//       u("photo-1600566752355-35792bedcfea"),
//     ],
//     featured: true,
//   },
//   {
//     slug: "warmfoil-kit",
//     name: "WarmFoil Underlaminate",
//     category: "electric",
//     tagline: "Dry-fit foil heating for laminate and engineered wood",
//     description: [
//       "WarmFoil is a completely dry installation — no adhesive, no levelling compound, no waiting. The aluminium foil heater rolls out over insulation underlay, the laminate or engineered wood floor floats directly on top, and the room is heatable the same day.",
//       "The foil spreads heat evenly across the whole surface, eliminating the striping that cable systems can telegraph through thin floor finishes. Gentle, even warmth that engineered timber manufacturers approve.",
//     ],
//     features: [
//       "100% dry fit — floor down and warm in a single day",
//       "Even, stripe-free heat under thin floor finishes",
//       "Earthed aluminium construction for total safety",
//       "Compatible with click-lock laminate and engineered wood up to 18mm",
//       "10-year full-replacement warranty",
//     ],
//     specifications: [
//       { label: "Output", value: "140 W/m²" },
//       { label: "Thickness", value: "1 mm" },
//       { label: "Construction", value: "Earthed aluminium foil element" },
//       { label: "Voltage", value: "230 V AC" },
//       { label: "Floor finishes", value: "Laminate, engineered wood (floated)" },
//       { label: "Warranty", value: "10 years" },
//     ],
//     applications: ["Bedrooms", "Living rooms", "Studies", "Guest rooms"],
//     image: u("photo-1615873968403-89e068629265"),
//     gallery: [
//       u("photo-1586023492125-27b2c045efd7"),
//     ],
//     featured: true,
//   },
//   {
//     slug: "aquaboard-low-profile",
//     name: "AquaBoard Low-Profile",
//     category: "hydronic",
//     tagline: "Retrofit water-based heating at just 18mm height",
//     description: [
//       "AquaBoard brings water-based underfloor heating to existing homes without digging up the slab. Pre-routed gypsum panels accept 12mm PERT-AL-PERT pipe and build up just 18mm — thin enough to run through a renovation without rehanging every door.",
//       "Connected to a heat pump or gas boiler, AquaBoard delivers the lowest running costs of any system we offer, and its high thermal mass keeps rooms at temperature for hours after the heat source cycles off.",
//     ],
//     features: [
//       "Only 18mm build-up — genuinely retrofittable",
//       "Works with heat pumps at low flow temperatures (35°C)",
//       "Lowest running cost per m² of any WowTherm system",
//       "Pre-routed panels cut installation time by half",
//       "25-year warranty on pipework",
//     ],
//     specifications: [
//       { label: "Build-up height", value: "18 mm + floor finish" },
//       { label: "Pipe", value: "12 mm PERT-AL-PERT, 25-year warranty" },
//       { label: "Flow temperature", value: "35–55 °C" },
//       { label: "Heat source", value: "Heat pump, gas boiler or solar thermal" },
//       { label: "Floor finishes", value: "Tile, stone, engineered wood, vinyl" },
//       { label: "Warranty", value: "25 years (pipe), 10 years (panels)" },
//     ],
//     applications: ["Whole-home retrofits", "Renovations", "Heritage properties"],
//     image: u("photo-1600585154340-be6161a56a0c"),
//     gallery: [
//       u("photo-1600607687939-ce8a6c25118c"),
//     ],
//     featured: true,
//   },
//   {
//     slug: "sensewarm-pro",
//     name: "SenseWarm Pro",
//     category: "thermostats",
//     tagline: "App-controlled warmth that learns your routine",
//     description: [
//       "The SenseWarm Pro is the brain of a WowTherm floor. Its dual sensors read both air and floor temperature, protecting delicate wood finishes while holding the room exactly where you want it. The learning schedule notices when you actually use each room and quietly trims run-time you don't need.",
//       "Control everything from the SenseWarm app — per-room schedules, geofenced away mode, and monthly energy reports. Works with Alexa and Google Home.",
//     ],
//     features: [
//       "Dual air + floor sensing protects wooden floors",
//       "Self-learning schedule cuts run-time up to 25%",
//       "Energy reports via the SenseWarm app",
//       "Geofencing switches to eco mode when you leave",
//       "Alexa and Google Home compatible",
//     ],
//     specifications: [
//       { label: "Display", value: '3.5" colour touchscreen' },
//       { label: "Sensors", value: "Air + floor probe (supplied)" },
//       { label: "Max load", value: "16 A (3,600 W)" },
//       { label: "Connectivity", value: "2.4 GHz Wi-Fi" },
//       { label: "Compatibility", value: "All WowTherm electric systems" },
//       { label: "Warranty", value: "5 years" },
//     ],
//     applications: ["All heated spaces", "Smart home integration"],
//     image: u("photo-1585060544812-6b45742d762f"),
//     gallery: [
//       u("photo-1558002038-1055907df827"),
//     ],
//     featured: true,
//   },
//   {
//     slug: "thermabase-xps",
//     name: "ThermaBase XPS",
//     category: "insulation",
//     tagline: "The single biggest upgrade to running costs",
//     description: [
//       "Heat goes wherever it's easiest — and on an uninsulated slab, that's straight down into the ground. ThermaBase XPS boards sit between the subfloor and your heating system, reflecting warmth up into the room instead of losing it below.",
//       "On a cold concrete slab, 10mm of ThermaBase typically halves heat-up time and cuts running cost by up to 50%. It's the first line on every quotation we issue, because it's the best money you'll spend on the whole system.",
//     ],
//     features: [
//       "Halves heat-up times on concrete slabs",
//       "Cuts running costs by up to 50%",
//       "Cement-coated face tiles over directly",
//       "Waterproof — ideal for bathrooms and wet rooms",
//       "Compression strength 30 t/m²",
//     ],
//     specifications: [
//       { label: "Material", value: "Extruded polystyrene, cement-coated both faces" },
//       { label: "Thickness", value: "6 mm, 10 mm or 20 mm" },
//       { label: "Thermal conductivity", value: "0.032 W/mK" },
//       { label: "Board size", value: "1200 × 600 mm" },
//       { label: "Compressive strength", value: "300 kPa" },
//       { label: "Warranty", value: "Lifetime of the floor" },
//     ],
//     applications: ["Under any WowTherm system"],
//     image: u("photo-1560448204-e02f11c3d0e2"),
//     gallery: [],
//   },
//   {
//     slug: "aquaflow-manifold",
//     name: "AquaFlow Manifold",
//     category: "accessories",
//     tagline: "Precision flow control for every hydronic zone",
//     description: [
//       "The AquaFlow manifold is the distribution heart of a water-based system — nickel-plated brass with individual flow meters, isolation valves and thermometer gauges for every circuit, so each room gets exactly the flow its heat-loss demands.",
//       "Available in 2 to 12 port configurations with optional thermoelectric actuators for room-by-room smart zoning through SenseWarm controls.",
//     ],
//     features: [
//       "Nickel-plated brass, pressure-tested to 10 bar",
//       "Flow meters on every circuit for precise balancing",
//       "Accepts SenseWarm actuators for smart zoning",
//       "2–12 port configurations",
//       "Supplied with fill, drain and air-vent assemblies",
//     ],
//     specifications: [
//       { label: "Material", value: "Nickel-plated brass" },
//       { label: "Ports", value: "2–12 circuits" },
//       { label: "Max pressure", value: "10 bar (test), 6 bar (working)" },
//       { label: "Flow meters", value: "0–5 L/min per circuit" },
//       { label: "Connections", value: '1" primary, ¾" eurocone circuits' },
//       { label: "Warranty", value: "10 years" },
//     ],
//     applications: ["Hydronic heating systems"],
//     image: u("photo-1581094794329-c8112a89af12"),
//     gallery: [],
//   },
//     {
//     slug: "aquaflow-manifold",
//     name: "AquaFlow Manifold",
//     category: "accessories",
//     tagline: "Precision flow control for every hydronic zone",
//     description: [
//       "The AquaFlow manifold is the distribution heart of a water-based system — nickel-plated brass with individual flow meters, isolation valves and thermometer gauges for every circuit, so each room gets exactly the flow its heat-loss demands.",
//       "Available in 2 to 12 port configurations with optional thermoelectric actuators for room-by-room smart zoning through SenseWarm controls.",
//     ],
//     features: [
//       "Nickel-plated brass, pressure-tested to 10 bar",
//       "Flow meters on every circuit for precise balancing",
//       "Accepts SenseWarm actuators for smart zoning",
//       "2–12 port configurations",
//       "Supplied with fill, drain and air-vent assemblies",
//     ],
//     specifications: [
//       { label: "Material", value: "Nickel-plated brass" },
//       { label: "Ports", value: "2–12 circuits" },
//       { label: "Max pressure", value: "10 bar (test), 6 bar (working)" },
//       { label: "Flow meters", value: "0–5 L/min per circuit" },
//       { label: "Connections", value: '1" primary, ¾" eurocone circuits' },
//       { label: "Warranty", value: "10 years" },
//     ],
//     applications: ["Hydronic heating systems"],
//     image: u("photo-1581094794329-c8112a89af12"),
//     gallery: [],
//   },
  
// ];

// export function getProduct(slug: string): Product | undefined {
//   return products.find((p) => p.slug === slug);
// }

// export function getFeaturedProducts(): Product[] {
//   return products.filter((p) => p.featured);
// }

// export function getProductsByCategory(category: ProductCategory): Product[] {
//   return products.filter((p) => p.category === category);
// }

// export const categoryLabel = (value: ProductCategory): string =>
//   categories.find((c) => c.value === value)?.label ?? value;

export type ProductCategory =
  | "electric"
  | "hydronic"
  | "thermostats"
  | "insulation"
  | "accessories";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  applications: string[];
  image: string;
  gallery: string[];
  featured?: boolean;
}

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const categories: {
  value: ProductCategory | "all";
  label: string;
}[] = [
  { value: "all", label: "All systems" },
  { value: "electric", label: "Electric heating" },
  { value: "hydronic", label: "Water-based" },
  { value: "thermostats", label: "Smart controls" },
  { value: "insulation", label: "Insulation" },
  { value: "accessories", label: "Accessories" },
];

export const products: Product[] = [
  // ============================================================
  // 01 — STICKYMAT 200W
  // ============================================================
  {
    slug: "stickymat-200",
    name: "StickyMat 200W",
    category: "electric",
    tagline: "Self-adhesive electric mat for tile and stone floors",

    description: [
      "The StickyMat 200W is a self-adhesive electric heating mat engineered for the floors modern homes actually have — vitrified tile, marble, granite and stone. The twin-conductor cable is pre-spaced on an adhesive mesh, so it rolls out flat, sticks down without tape and tiles over directly with flexible adhesive.",

      "At just 3mm thick, it adds virtually no height to the floor build-up, making it ideal for renovations where door thresholds and finished levels are fixed. Paired with a WowTherm thermostat, most bathrooms reach barefoot comfort in under 20 minutes.",
    ],

    features: [
      "Self-adhesive mesh — no staples, no movement while tiling",
      "3mm ultra-thin twin-conductor cable, zero EMF design",
      "Warms tile and stone from cold in 15–25 minutes",
      "IPX7-rated, safe for bathrooms and wet rooms",
      "10-year full-replacement warranty",
    ],

    specifications: [
      { label: "Output", value: "200 W/m²" },
      { label: "Thickness", value: "3 mm" },
      {
        label: "Cable type",
        value: "Twin-conductor, fluoropolymer insulated",
      },
      { label: "Voltage", value: "230 V AC" },
      { label: "Sizes", value: "1 m² to 12 m² mats" },
      {
        label: "Floor finishes",
        value: "Tile, stone, marble, granite",
      },
      { label: "Warranty", value: "10 years" },
    ],

    applications: [
      "Bathrooms",
      "Kitchens",
      "Living areas",
      "Hallways",
    ],

    image: u("photo-1631679706909-1844bbd07221"),

    gallery: [
      u("photo-1584622650111-993a426fbf0a"),
      u("photo-1600566752355-35792bedcfea"),
    ],

    featured: true,
  },

  // ============================================================
  // 02 — WARMFOIL
  // ============================================================
  {
    slug: "warmfoil-kit",
    name: "WarmFoil Underlaminate",
    category: "electric",
    tagline: "Dry-fit foil heating for laminate and engineered wood",

    description: [
      "WarmFoil is a completely dry installation — no adhesive, no levelling compound, no waiting. The aluminium foil heater rolls out over insulation underlay, the laminate or engineered wood floor floats directly on top, and the room is heatable the same day.",

      "The foil spreads heat evenly across the whole surface, eliminating the striping that cable systems can telegraph through thin floor finishes. Gentle, even warmth that engineered timber manufacturers approve.",
    ],

    features: [
      "100% dry fit — floor down and warm in a single day",
      "Even, stripe-free heat under thin floor finishes",
      "Earthed aluminium construction for total safety",
      "Compatible with click-lock laminate and engineered wood up to 18mm",
      "10-year full-replacement warranty",
    ],

    specifications: [
      { label: "Output", value: "140 W/m²" },
      { label: "Thickness", value: "1 mm" },
      {
        label: "Construction",
        value: "Earthed aluminium foil element",
      },
      { label: "Voltage", value: "230 V AC" },
      {
        label: "Floor finishes",
        value: "Laminate, engineered wood (floated)",
      },
      { label: "Warranty", value: "10 years" },
    ],

    applications: [
      "Bedrooms",
      "Living rooms",
      "Studies",
      "Guest rooms",
    ],

    image: u("photo-1615873968403-89e068629265"),

    gallery: [
      u("photo-1586023492125-27b2c045efd7"),
    ],

    featured: true,
  },

  // ============================================================
  // 03 — AQUABOARD
  // ============================================================
  {
    slug: "aquaboard-low-profile",
    name: "AquaBoard Low-Profile",
    category: "hydronic",
    tagline: "Retrofit water-based heating at just 18mm height",

    description: [
      "AquaBoard brings water-based underfloor heating to existing homes without digging up the slab. Pre-routed gypsum panels accept 12mm PERT-AL-PERT pipe and build up just 18mm — thin enough to run through a renovation without rehanging every door.",

      "Connected to a heat pump or gas boiler, AquaBoard delivers the lowest running costs of any system we offer, and its high thermal mass keeps rooms at temperature for hours after the heat source cycles off.",
    ],

    features: [
      "Only 18mm build-up — genuinely retrofittable",
      "Works with heat pumps at low flow temperatures (35°C)",
      "Lowest running cost per m² of any WowTherm system",
      "Pre-routed panels cut installation time by half",
      "25-year warranty on pipework",
    ],

    specifications: [
      {
        label: "Build-up height",
        value: "18 mm + floor finish",
      },
      {
        label: "Pipe",
        value: "12 mm PERT-AL-PERT, 25-year warranty",
      },
      {
        label: "Flow temperature",
        value: "35–55 °C",
      },
      {
        label: "Heat source",
        value: "Heat pump, gas boiler or solar thermal",
      },
      {
        label: "Floor finishes",
        value: "Tile, stone, engineered wood, vinyl",
      },
      {
        label: "Warranty",
        value: "25 years (pipe), 10 years (panels)",
      },
    ],

    applications: [
      "Whole-home retrofits",
      "Renovations",
      "Heritage properties",
    ],

    image: u("photo-1600585154340-be6161a56a0c"),

    gallery: [
      u("photo-1600607687939-ce8a6c25118c"),
    ],

    featured: true,
  },

  // ============================================================
  // 04 — SENSEWARM PRO
  // ============================================================
  {
    slug: "sensewarm-pro",
    name: "SenseWarm Pro",
    category: "thermostats",
    tagline: "App-controlled warmth that learns your routine",

    description: [
      "The SenseWarm Pro is the brain of a WowTherm floor. Its dual sensors read both air and floor temperature, protecting delicate wood finishes while holding the room exactly where you want it. The learning schedule notices when you actually use each room and quietly trims run-time you don't need.",

      "Control everything from the SenseWarm app — per-room schedules, geofenced away mode, and monthly energy reports. Works with Alexa and Google Home.",
    ],

    features: [
      "Dual air + floor sensing protects wooden floors",
      "Self-learning schedule cuts run-time up to 25%",
      "Energy reports via the SenseWarm app",
      "Geofencing switches to eco mode when you leave",
      "Alexa and Google Home compatible",
    ],

    specifications: [
      {
        label: "Display",
        value: '3.5" colour touchscreen',
      },
      {
        label: "Sensors",
        value: "Air + floor probe (supplied)",
      },
      {
        label: "Max load",
        value: "16 A (3,600 W)",
      },
      {
        label: "Connectivity",
        value: "2.4 GHz Wi-Fi",
      },
      {
        label: "Compatibility",
        value: "All WowTherm electric systems",
      },
      {
        label: "Warranty",
        value: "5 years",
      },
    ],

    applications: [
      "All heated spaces",
      "Smart home integration",
    ],

    image: u("photo-1585060544812-6b45742d762f"),

    gallery: [
      u("photo-1558002038-1055907df827"),
    ],

    featured: true,
  },

  // ============================================================
  // 05 — THERMABASE XPS
  // ============================================================
  {
    slug: "thermabase-xps",
    name: "ThermaBase XPS",
    category: "insulation",
    tagline: "The single biggest upgrade to running costs",

    description: [
      "Heat goes wherever it's easiest — and on an uninsulated slab, that's straight down into the ground. ThermaBase XPS boards sit between the subfloor and your heating system, reflecting warmth up into the room instead of losing it below.",

      "On a cold concrete slab, 10mm of ThermaBase typically halves heat-up time and cuts running cost by up to 50%. It's the first line on every quotation we issue, because it's the best money you'll spend on the whole system.",
    ],

    features: [
      "Halves heat-up times on concrete slabs",
      "Cuts running costs by up to 50%",
      "Cement-coated face tiles over directly",
      "Waterproof — ideal for bathrooms and wet rooms",
      "Compression strength 30 t/m²",
    ],

    specifications: [
      {
        label: "Material",
        value:
          "Extruded polystyrene, cement-coated both faces",
      },
      {
        label: "Thickness",
        value: "6 mm, 10 mm or 20 mm",
      },
      {
        label: "Thermal conductivity",
        value: "0.032 W/mK",
      },
      {
        label: "Board size",
        value: "1200 × 600 mm",
      },
      {
        label: "Compressive strength",
        value: "300 kPa",
      },
      {
        label: "Warranty",
        value: "Lifetime of the floor",
      },
    ],

    applications: [
      "Under any WowTherm system",
    ],

    image: u("photo-1560448204-e02f11c3d0e2"),

    gallery: [],

    // IMPORTANT:
    // This makes ThermaBase appear in ProductShowcase
    // because getFeaturedProducts() filters for featured === true.
    featured: true,
  },

  // ============================================================
  // 06 — AQUAFLOW MANIFOLD
  // Additional product — NOT featured in the 5-card showcase
  // ============================================================
  {
    slug: "aquaflow-manifold",
    name: "AquaFlow Manifold",
    category: "accessories",
    tagline: "Precision flow control for every hydronic zone",

    description: [
      "The AquaFlow manifold is the distribution heart of a water-based system — nickel-plated brass with individual flow meters, isolation valves and thermometer gauges for every circuit, so each room gets exactly the flow its heat-loss demands.",

      "Available in 2 to 12 port configurations with optional thermoelectric actuators for room-by-room smart zoning through SenseWarm controls.",
    ],

    features: [
      "Nickel-plated brass, pressure-tested to 10 bar",
      "Flow meters on every circuit for precise balancing",
      "Accepts SenseWarm actuators for smart zoning",
      "2–12 port configurations",
      "Supplied with fill, drain and air-vent assemblies",
    ],

    specifications: [
      {
        label: "Material",
        value: "Nickel-plated brass",
      },
      {
        label: "Ports",
        value: "2–12 circuits",
      },
      {
        label: "Max pressure",
        value: "10 bar (test), 6 bar (working)",
      },
      {
        label: "Flow meters",
        value: "0–5 L/min per circuit",
      },
      {
        label: "Connections",
        value: '1" primary, ¾" eurocone circuits',
      },
      {
        label: "Warranty",
        value: "10 years",
      },
    ],

    applications: [
      "Hydronic heating systems",
    ],

    image: u("photo-1581094794329-c8112a89af12"),

    gallery: [],

    // Intentionally NOT featured.
    // It remains available on the products page.
    featured: false,
  },
];

// ============================================================
// PRODUCT HELPERS
// ============================================================

export function getProduct(
  slug: string
): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured === true);
}

export function getProductsByCategory(
  category: ProductCategory
): Product[] {
  return products.filter(
    (p) => p.category === category
  );
}

export const categoryLabel = (
  value: ProductCategory
): string =>
  categories.find((c) => c.value === value)?.label ?? value;