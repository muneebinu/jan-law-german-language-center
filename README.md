# Jan Law German Language Center

Official website for Jan Law German Language Center, located in **Dherai, Tehsil Kabal, Swat, Khyber Pakhtunkhwa, Pakistan**.

**Landmark:** Next to Zubair Hospital, opposite Dherai Ground.

Website: https://muneebinu.github.io/jan-law-german-language-center/

## Project structure

The website keeps content, presentation and browser behaviour in separate files.

```text
.
├── index.html              # Page content, metadata and structured data
├── assets/
│   ├── css/
│   │   └── site.css        # Design system, layout and responsive styles
│   ├── js/
│   │   └── site.js         # Navigation, form validation and interactions
│   ├── jan-law-original-logo.b64
│   └── ...                 # Images, icons and other static assets
├── 404.html
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

### Where to make changes

- **Page text, headings, course information and SEO:** edit `index.html`.
- **Colours, typography, spacing, layouts and mobile styles:** edit `assets/css/site.css`.
- **Menu, admissions form, WhatsApp message and interactive behaviour:** edit `assets/js/site.js`.
- **Images and brand assets:** place them in `assets/` and reference them with relative paths.

The JavaScript is loaded with `defer`, so the page markup can be parsed before the interactions initialise. The structured data remains in the HTML for search engines.

## Course information

| Course | Fee | Estimated duration |
|---|---:|---|
| German A1 | PKR 35,000 | 1.5 months |
| German A2 | PKR 40,000 | 1.5 months |
| German B1 | PKR 50,000 | 2 to 2.5 months |

Durations are estimates and may vary by learner.

## Contact

- Office WhatsApp: **+92 346 6996640**
- Instructor, Muneeb Ur Rehman: **+92 318 9150911**
- Location: Dherai, Tehsil Kabal, Swat, Khyber Pakhtunkhwa, Pakistan.

The website currently does not link to social media accounts.

## GitHub Pages

Repository Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.

## Before publishing updates

1. Keep the HTML, CSS and JavaScript in their separate files.
2. Use relative paths for local assets so GitHub Pages can resolve them.
3. Check the desktop and mobile layouts after visual changes.
4. Test the admissions form and WhatsApp handoff after changing form fields or phone numbers.
5. Keep course fees, contact information and location consistent across the site.
6. Do not publish unverified claims about accreditation, certificates, visa outcomes or job guarantees.
