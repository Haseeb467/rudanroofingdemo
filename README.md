# Rudan Metal Roofing

A responsive React + Vite redesign based on the supplied cream, red, charcoal, and yellow visual reference. Uses Rudan's real project photography and content from https://www.rudanroofing.com/.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:5173. Build with `npm run build`; preview the build with `npm run preview`.

## Included

- Custom homepage, mobile navigation, project galleries, product search and category filters, FAQ accordions, service and blog indexes, contact and dealer inquiry pages.
- All 88 content URLs from the original site's 93-entry sitemap, plus service-area, full site-map, and roofing-guide routes. Original paths are retained. Five transaction/search/placeholder utility URLs are not recreated.
- 29 product pages, including original specifications and colour/size option lists; 13 articles; 5 project pages; 5 manufacturing service pages; 9 city pages; 4 categories and 11 subcategories.
- Original overview material is available under expandable information sections on redesigned listing/contact pages. Original homepage detail is available at `/roofing-guide`.
- Original videos link to YouTube. Product and project images are hosted locally, optimized as WebP; fonts are local.

## Inquiry forms

Forms validate name, email, phone, city/company, and project type, then prepare a `mailto:` draft addressed to `info@rudanroofing.com`. Visitors review and send it through their email app. No form is silently submitted, no lead is persisted, and no successful delivery is claimed. Connect a server-side email/CRM endpoint to replace this flow if direct website submissions are required.

This is a product catalogue, not a connected checkout. Original product prices and information are retained in the detail content; payment, live stock, and order processing are not connected.

## Content and migration

- `source/`: original HTML snapshots, original sitemap, unfiltered extraction, asset mapping, and original image files.
- `src/catalog.json`: lightweight route and catalogue metadata.
- `public/content/`: complete per-page structured content fetched on demand.
- `scripts/crawl.py`: downloads source sitemap pages.
- `scripts/prepare.py`: extracts/sanitizes content, variant options, and video links; prepares local WebP images and JSON.
- `scripts/assets.py`: optimizes feature photos and downloads fonts.

To refresh content, run these Python scripts in order. They require `requests`, `beautifulsoup4`, and `Pillow`. Review refreshed source information before publication. Website source content, including its wording and claims, is preserved rather than independently rewritten or certified.

## Checks

Run the development server, then `npm run check`. The Playwright smoke check uses installed Google Chrome headlessly. It checks routes, horizontal overflow, loaded images, browser errors, product search/filter, inquiry draft creation, mobile navigation, FAQ interaction, landscape layout, and reduced motion. Visual captures are saved under `source/`.

## Hosting

Deploy `dist/` to a static host with SPA fallback to `index.html`. `public/_redirects` includes the Netlify-compatible fallback. Equivalent rewrite configuration is required on other hosts. The sitemap retains the original production domain; change it if deploying under a different permanent domain. This project has not been published to the live Rudan website.
