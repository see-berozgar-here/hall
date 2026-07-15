# The Grand Royale — Luxury Wedding & Banquet Venue Demo

A premium React + Vite website demo for a luxury marriage hall, banquet venue, and event space. The project is designed for client presentation and includes a luxury landing page, venue sections, gallery, packages, booking flow, enquiry/WhatsApp experience, testimonials, FAQ, location, footer, and SEO foundation.

## Tech Stack

- React
- Vite
- JavaScript
- React Router
- CSS Modules + global design tokens

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, normally `http://localhost:5173/`. Local development now uses `/`, while production builds retain the GitHub Pages `/hall/` path.

## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├── animations/       Motion presets
├── components/       Reusable UI, SEO, layout, media, footer/header components
├── constants/        Site, route, and SEO configuration
├── data/             Gallery, packages, enquiry, footer, navigation data
├── hooks/            Reusable React hooks
├── layouts/          App layout shell
├── pages/            Page-level components
├── services/         Asset helpers
├── styles/           Global CSS, reset, tokens
└── utils/            Class names, schema, SEO, analytics helpers
```

## Customization Checklist

### Venue Branding

Edit `src/constants/site.js` to replace:

- Venue name
- Tagline
- Phone number
- WhatsApp number
- Email
- Address
- Social/demo URLs

### Images and Videos

Replace the demo hero artwork in `src/assets/hero-fallback.svg` and the visual styles in `src/pages/HomePage.module.css` with real, licensed venue media. Add an optimized hero video only after the real file is available; the current build intentionally avoids requesting a missing video.

Recommended media:

- Hero video
- Venue exterior
- Banquet hall
- Garden lawn
- Stage decoration
- Dining pavilion
- Bridal suite
- Drone/aerial images
- Real venue photography

### Packages and Booking

Edit:

- `src/data/packages.js`
- `src/data/enquiry.js`

Use real package names, inclusions, guest capacity, and terms before client launch.

### SEO and Local SEO

Edit:

- `src/constants/seo.js`
- `src/utils/schema.js`
- `public/robots.txt`
- `public/sitemap.xml`

Replace the demo domain `https://thegrandroyale.example.com` with the real domain.

### WhatsApp Number

Update `SITE.whatsapp` in `src/constants/site.js`. WhatsApp CTAs use this central value.

## Analytics Ready

Analytics helpers are available in `src/utils/analytics.js`. They are safe no-ops by default.

To enable demo tracking hooks for a real analytics setup, configure:

```text
VITE_ENABLE_ANALYTICS=true
```

Then connect Google Analytics/GTM in production as needed.

## Deployment Notes

### Netlify

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

### Vercel

Framework preset: Vite

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

### GitHub Pages

The project uses `/` during `npm run dev` and `/hall/` during `npm run build`. If the GitHub repository name changes, update the production value in `vite.config.js`.

Example:

```js
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'serve' && !isPreview ? '/' : '/your-repo-name/',
  plugins: [react()],
}));
```

Then run:

```bash
npm run build
```

Deploy the `dist` output using your preferred GitHub Pages workflow.

## Clean ZIP Rule

When sending or replacing this project, do not include:

- `node_modules`
- `dist`
- `.vite`
- cache folders
- `__MACOSX`
- `.DS_Store`

Always run `npm install` after extracting a clean source ZIP.
