// import type { Metadata, Viewport } from "next";
// import {
//   Google_Sans,
//   Inria_Serif,
//   Kaushan_Script,
//   Raleway,
// } from "next/font/google";
// import { Toaster } from "sonner";
// import "./globals.css";
// import { Footer } from "@/components/layout/footer";
// import { Navbar } from "@/components/layout/navbar";
// import { MotionProvider } from "@/components/providers/motion-provider";
// import { SmoothScroll } from "@/components/providers/smooth-scroll";
// import { ScrollProgress } from "@/components/motion/scroll-progress";
// import { siteConfig } from "@/lib/site";

// /* ------------------------------------------------------------------
//    WOWTHERM typography system

//    Inria Serif     → display / headings (editorial, architectural)
//    Google Sans     → body & UI (readable, modern)
//    Kaushan Script  → rare orange editorial accents only
//    Raleway         → secondary labels & technical micro-copy

//    Only the weights/styles actually used are loaded. Variable fonts
//    (Google Sans, Raleway) are loaded as single variable files.
//    ------------------------------------------------------------------ */

// const inriaSerif = Inria_Serif({
//   subsets: ["latin"],
//   weight: ["300", "400", "700"],
//   style: ["normal", "italic"],
//   variable: "--font-inria-serif",
//   display: "swap",
// });

// const googleSans = Google_Sans({
//   subsets: ["latin"],
//   variable: "--font-google-sans",
//   display: "swap",
// });

// const kaushanScript = Kaushan_Script({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-kaushan-script",
//   display: "swap",
// });

// const raleway = Raleway({
//   subsets: ["latin"],
//   variable: "--font-raleway",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   metadataBase: new URL(siteConfig.url),
//   title: {
//     default: `${siteConfig.name} — Premium Heating Technology`,
//     template: `%s · ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: [
//     "premium heating",
//     "underfloor heating",
//     "radiant floor heating",
//     "electric heating mats",
//     "hydronic heating",
//     "smart thermostat",
//     "luxury heating",
//     "architectural heating",
//   ],
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: siteConfig.url,
//     siteName: siteConfig.name,
//     title: `${siteConfig.name} — Premium Heating Technology`,
//     description: siteConfig.description,
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${siteConfig.name} — Premium Heating Technology`,
//     description: siteConfig.description,
//   },
// };

// export const viewport: Viewport = {
//   themeColor: "#1a1a1a",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html
//       lang="en"
//       className={`${inriaSerif.variable} ${googleSans.variable} ${kaushanScript.variable} ${raleway.variable}`}
//       data-scroll-behavior="smooth"
//     >
//       <body className="min-h-svh">
//         <MotionProvider>
//           <SmoothScroll />
//           <ScrollProgress />
//           <Navbar />
//           <main id="main">{children}</main>
//           <Footer />
//           <Toaster
//             position="bottom-right"
//             toastOptions={{
//               style: {
//                 background: "var(--color-charcoal-900)",
//                 border: "1px solid var(--color-charcoal-700)",
//                 color: "var(--color-ivory-100)",
//               },
//             }}
//           />
//         </MotionProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata, Viewport } from "next";
import {
  Inria_Serif,
  Kaushan_Script,
  Raleway,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { siteConfig } from "@/lib/site";

/* ------------------------------------------------------------------
   WOWTHERM typography system

   Inria Serif     → display / headings
   Raleway         → body / UI / secondary labels / technical copy
   Kaushan Script  → rare editorial accents

   Google Sans removed to avoid the Next.js font override warning.
   ------------------------------------------------------------------ */

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-inria-serif",
  display: "swap",
});

const kaushanScript = Kaushan_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kaushan-script",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} — Premium Heating Technology`,
    template: `%s · ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    "premium heating",
    "underfloor heating",
    "radiant floor heating",
    "electric heating mats",
    "hydronic heating",
    "smart thermostat",
    "luxury heating",
    "architectural heating",
  ],

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Premium Heating Technology`,
    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Premium Heating Technology`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inriaSerif.variable} ${kaushanScript.variable} ${raleway.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-svh">
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Navbar />

          <main id="main">{children}</main>

          <Footer />

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--color-charcoal-900)",
                border: "1px solid var(--color-charcoal-700)",
                color: "var(--color-ivory-100)",
              },
            }}
          />
        </MotionProvider>
      </body>
    </html>
  );
}