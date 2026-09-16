export const siteConfig = {
  name: "WowTherm",
  url: "https://wowtherm.com",
  tagline: "Comfort, engineered into every surface.",
  description:
    "WowTherm designs and installs premium heating systems for modern homes, hospitality spaces and architectural interiors. Invisible warmth, precise control, architectural integrity.",
  email: "hello@wowtherm.com",
  phone: "+91 98110 40040",
  address: "Design District, Lower Parel, Mumbai 400013",
  mapQuery: "Design District, Lower Parel, Mumbai",
  social: {
    instagram: "https://instagram.com/wowtherm",
    facebook: "https://facebook.com/wowtherm",
    linkedin: "https://linkedin.com/company/wowtherm",
    youtube: "https://youtube.com/@wowtherm",
  },
} as const;

export const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Technology" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const;

export const stats = [
  { value: 12500, suffix: "+", label: "Installations", note: "Homes, villas and hotels" },
  { value: 320000, suffix: "+", label: "Sq ft warmed", note: "From Kashmir chalets to Mumbai penthouses" },
  { value: 40, suffix: "%", label: "Lower running costs", note: "Versus conventional space heating" },
  { value: 98, suffix: "%", label: "Recommend us", note: "Post-installation survey, 2025" },
] as const;

export const partners = [
  "Prestige Group",
  "Sobha Realty",
  "DLF Homes",
  "Godrej Properties",
  "Brigade Group",
  "Oberoi Realty",
  "Tata Housing",
  "L&T Realty",
] as const;

export const testimonials = [
  {
    quote:
      "The warmth is immediate and even — no cold spots, no noise, no visible hardware. Our architect specified WowTherm and it transformed the entire living experience.",
    name: "Meera Chandran",
    role: "Homeowner, New Delhi",
    project: "Luxury Residence",
  },
  {
    quote:
      "As an architect, I specify radiant floors on most premium projects now. WowTherm submits full heat-loss calculations and CAD layouts before installation begins. Their precision is unmatched.",
    name: "Kabir Sethi",
    role: "Principal Architect, Studio Terra",
    project: "Commercial Complex, Bengaluru",
  },
  {
    quote:
      "Our boutique hotel runs WowTherm across 22 rooms. Guests notice the warmth the moment they walk in barefoot — no radiators, no noise, no dry air. Two winters in, zero callouts.",
    name: "Anjali Thakur",
    role: "Owner, Cedar House",
    project: "Hospitality, Manali",
  },
  {
    quote:
      "The smart thermostat schedule means the bathroom floor is warm at 6 a.m. and off by 9. Installation was tidy, the crew explained everything, and support actually picks up the phone.",
    name: "Rohit Banerjee",
    role: "Homeowner, Gurugram",
    project: "Residential Villa",
  },
  {
    quote:
      "We retrofitted heating under engineered oak in a 40-year-old home. WowTherm's low-profile system added barely 18mm. The whole family lives on the floor again in winter.",
    name: "Farah Wani",
    role: "Homeowner, Srinagar",
    project: "Heritage Renovation",
  },
] as const;

export const solutions = [
  {
    slug: "residential",
    title: "Residential",
    subtitle: "Luxury homes & villas",
    description: "Invisible heating systems that transform how families experience their homes. Warm floors, quiet comfort, zero visual impact.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    subtitle: "Hotels & resorts",
    description: "Guest comfort that speaks for itself. Premium heating for lobbies, suites, spas and common areas that elevates the guest experience.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "commercial",
    title: "Commercial",
    subtitle: "Offices & retail",
    description: "Energy-efficient heating for commercial spaces that reduces running costs while maintaining comfortable, productive environments.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "wellness",
    title: "Wellness & Spa",
    subtitle: "Thermal experiences",
    description: "Precision temperature control for wellness spaces. Heated floors in treatment rooms, pools, saunas and relaxation areas.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1400&auto=format&fit=crop&q=80",
  },
] as const;
