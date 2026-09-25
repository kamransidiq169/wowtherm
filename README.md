This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load the WOWTHERM typography system — four font families, each with a distinct role:

- **Inria Serif** — Display / headings (hero, H1–H3, editorial statements, product & project titles). Dominant, editorial, architectural. Weight 400 by default; 300/700 and italic reserved for special moments.
- **Google Sans** — Body & UI (paragraphs, navigation, buttons, forms, footer). Functional, modern counterpoint to the serif.
- **Kaushan Script** — Rare orange editorial accents only (e.g. *“One <accent>warm floor</accent>”*). Never for paragraphs, navigation, buttons or technical copy. Applied via the `font-accent` utility (from the `--font-accent` token) paired with a copper text color.
- **Raleway** — Secondary supporting labels, eyebrows, technical micro-copy. Loaded via the `--font-mono` token (the legacy token name kept for the existing utility usage). Never competes with Google Sans.

Only the weights/styles actually used are loaded. Variable fonts (Google Sans, Raleway) are loaded as single variable files.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
