import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

const exploreLinks = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

const productLinks = [
  { href: "/products?category=electric", label: "Electric heating" },
  { href: "/products?category=hydronic", label: "Water-based systems" },
  { href: "/products?category=thermostats", label: "Smart controls" },
  { href: "/products?category=insulation", label: "Insulation" },
];

const socials = [
  { href: siteConfig.social.instagram, label: "Instagram" },
  { href: siteConfig.social.facebook, label: "Facebook" },
  { href: siteConfig.social.linkedin, label: "LinkedIn" },
  { href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-950 text-white">
      <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link
            href="/"
            className="flex items-center"
            aria-label={`${siteConfig.name} home`}
          >
            <span className="font-display text-xl font-semibold tracking-tight">
              WOW<span className="text-copper-400">THERM</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
            {siteConfig.tagline} Premium heating systems designed for modern
            homes, hospitality spaces and architectural interiors.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-copper-400" aria-hidden />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-copper-400" aria-hidden />
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-copper-400" aria-hidden />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <nav aria-label="Explore" className="lg:col-span-2">
          <h2 className="text-eyebrow text-white/40">Explore</h2>
          <ul className="mt-5 space-y-3">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Products */}
        <nav aria-label="Products" className="lg:col-span-3">
          <h2 className="text-eyebrow text-white/40">Products</h2>
          <ul className="mt-5 space-y-3">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <div className="lg:col-span-3">
          <h2 className="text-eyebrow text-white/40">Connect</h2>
          <p className="mt-5 text-sm text-white/50">
            Project inquiries, partnerships, and press.
          </p>
          <ul className="mt-4 flex gap-3">
            {socials.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-copper-400 hover:text-copper-400"
                >
                  <span className="text-xs font-medium">{label.slice(0, 2)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>10-year warranty on every heating system we install.</p>
        </div>
      </div>
    </footer>
  );
}
