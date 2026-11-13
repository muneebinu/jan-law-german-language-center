# Jan Law German Language Center

The official website for **Jan Law German Language Center**, a German language teaching center in Dherai, Tehsil Kabal, Swat, Khyber Pakhtunkhwa, Pakistan.

- **Live website:** https://muneebinu.github.io/jan-law-german-language-center/
- **Repository:** https://github.com/muneebinu/jan-law-german-language-center
- **Organization:** Jan Law Students Consultant Ltd
- **Location:** Next to Zubair Hospital, opposite Dherai Ground, Dherai, Tehsil Kabal, Swat, Khyber Pakhtunkhwa, Pakistan.

<p align="center">
  <img src="assets/og-image.svg" alt="Jan Law German Language Center brand artwork" width="100%">
</p>

<p align="center">
  <a href="https://muneebinu.github.io/jan-law-german-language-center/">Visit the live website</a>
  ·
  <a href="https://github.com/muneebinu/jan-law-german-language-center">View source code</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-semantic-orange" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-responsive-blue" alt="Responsive CSS">
  <img src="https://img.shields.io/badge/JavaScript-vanilla-yellow" alt="Vanilla JavaScript">
  <img src="https://img.shields.io/badge/Hosting-GitHub%20Pages-222222" alt="GitHub Pages">
  <a href="https://github.com/muneebinu/jan-law-german-language-center/actions/workflows/quality.yml">
    <img src="https://github.com/muneebinu/jan-law-german-language-center/actions/workflows/quality.yml/badge.svg" alt="Website quality checks">
  </a>
</p>

## About the website

This is a lightweight, static website for people interested in learning German at Jan Law German Language Center. It explains the center's in-person A1, A2 and B1 courses, displays the published fees and estimated durations, introduces the instructor, answers common questions, and provides location and admission enquiry details.

The site retains its established Jan Law visual identity. The latest content and responsive cleanup keeps the existing colour palette, typography, logo and overall layout while making the course cards, curriculum section and mobile experience clearer.

## Website features

- Responsive page layout for mobile, tablet and desktop screens.
- Main sections for Home, About, Courses, Curriculum, Instructor, FAQs, Location, Admissions and Contact.
- Three course cards with fees, estimated durations and learning outcomes.
- Three expandable curriculum sections using native HTML `<details>` elements.
- Instructor profile with a locally hosted photograph and stated German level.
- Admission enquiry form with required-field and email validation.
- Course selection shortcuts that preselect the chosen level in the enquiry form.
- WhatsApp handoff to the instructor after the visitor reviews and sends the prepared message.
- Separate office and instructor WhatsApp contact links.
- Responsive mobile navigation that closes when a navigation link is selected or the Escape key is pressed.
- Floating WhatsApp shortcut on larger screens; it is hidden on small screens and while the admissions section is in view.
- Scroll-reveal effects with a reduced-motion fallback.
- Search and sharing metadata, canonical URL, Open Graph tags, and Schema.org structured data for the educational organization and FAQs.
- Custom favicon, web app manifest, sitemap, robots file and 404 page.
- No front-end framework, build step or runtime package dependencies.

## Courses and fees

The website currently publishes the following course information:

| Course | Fee | Estimated duration |
|---|---:|---|
| German A1 | PKR 35,000 | 1.5 months |
| German A2 | PKR 40,000 | 1.5 months |
| German B1 | PKR 50,000 | 2 to 2.5 months |

Durations are estimates. The center confirms fees and durations directly with students. If course details change, update the visible course cards, course preview and corresponding structured data together.

## Instructor

**Muneeb Ur Rehman**  
BS Computer Science  
German level: B2

The instructor section describes the teaching focus as German grammar, vocabulary, sentence formation, and practice in reading, listening, writing and speaking.

## Contact and admissions

- **Office WhatsApp:** [+92 346 6996640](https://wa.me/923466996640)
- **Instructor WhatsApp:** [+92 318 9150911](https://wa.me/923189150911)
- **Address:** Next to Zubair Hospital, opposite Dherai Ground, Dherai, Tehsil Kabal, Swat, Khyber Pakhtunkhwa, Pakistan.

### How the enquiry form works

1. A visitor enters their name, phone number and selected course, with optional additional details.
2. The browser validates the form fields.
3. The website prepares an enquiry message and opens WhatsApp with the instructor's number.
4. The visitor reviews the message and presses **Send** in WhatsApp.

The form does not submit information to a website server. Form details are not saved in a database or student management system by this website.

## Technology

| Technology | Use |
|---|---|
| HTML5 | Semantic page structure, course content, forms and metadata |
| CSS3 | Visual styling, responsive layouts, accessibility states and motion |
| Vanilla JavaScript | Mobile navigation, form validation, course selection and WhatsApp handoff |
| Node.js built-in test runner | Automated source and content tests |
| Playwright | Browser-based responsive review and screenshot capture in GitHub Actions |
| GitHub Actions | Automated quality checks and responsive review |
| GitHub Pages | Static website hosting |

The project is intentionally framework-free. There is no application build or compilation step. The automated test commands use Node.js and do not require installing third-party packages.

## Repository structure

```text
.
├── .github/
│   └── workflows/
│       ├── quality.yml              # Source and content checks
│       └── responsive-review.yml   # Browser review and screenshots
├── assets/
│   ├── css/
│   │   └── site.css                 # Main styles and responsive rules
│   ├── js/
│   │   └── site.js                  # Navigation and enquiry interactions
│   ├── muneeb.jpg                   # Locally hosted instructor photo
│   ├── favicon.svg
│   └── og-image.svg
├── scripts/
│   └── responsive-review.mjs        # Playwright responsive review
├── tests/
│   └── site.test.mjs                # Automated Node.js tests
├── 404.html                         # Custom not-found page
├── AGENTS.md                        # Project-specific development guidance
├── CONTRIBUTING.md                  # Contribution guidelines
├── DESIGN-SKILLS.md                 # Design resource notes
├── index.html                       # Main page and structured data
├── package.json                     # Project metadata and scripts
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md
```

## Run the website locally

You can serve the project with Python's built-in static web server:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

You can also use any other local static-file server. No package installation is needed just to view the website.

## Run the automated checks

Install **Node.js 18 or newer**. From the repository root, run:

Run the complete check, including JavaScript syntax validation and the test suite:

```bash
npm run check
```

Run only the test suite:

```bash
npm test
```

The tests cover:

- Essential HTML metadata and document structure.
- Separation of HTML, CSS and application JavaScript.
- Existence of local assets referenced by the pages.
- Valid organization and FAQ JSON-LD structured data.
- Consistency of the published A1, A2 and B1 fees.
- Office and instructor WhatsApp links.
- Responsive and reduced-motion implementation markers.
- Local instructor photo and course preview content.
- In-page navigation targets and selected content requirements.
- FAQ content consistency and the admission form's WhatsApp handoff messaging.
- The recent content cleanup, including equal course-card treatment and expandable curriculum sections.

## Responsive browser review

The **Responsive before-and-after review** GitHub Actions workflow runs on pushes to `main` and can also be started manually from the repository's Actions tab.

It installs Chromium and Playwright in the workflow environment, then checks the site at these viewport widths:

`320`, `360`, `390`, `430`, `620`, `768`, `900`, `1024`, `1280`, `1440` and `1600` pixels.

The workflow checks for horizontal overflow and verifies key mobile interactions, including opening and closing the navigation menu. It captures before-and-after screenshots of the Home, About, Courses, Curriculum, Instructor and FAQ sections at 390px and 1440px, as well as full-page screenshots.

Screenshots are uploaded as a GitHub Actions artifact named `jan-law-light-cleanup-before-after`. The workflow retains that artifact for 14 days. These are automated browser checks; they do not replace testing on physical phones and tablets.

## Deployment

The production website is published through **GitHub Pages**:

https://muneebinu.github.io/jan-law-german-language-center/

After changes are pushed to the configured publishing branch, GitHub Pages publishes the updated static site. Check the repository's **Actions** tab for workflow results and **Settings → Pages** for the Pages publishing configuration.

## Maintenance notes

- Keep the existing Jan Law branding and established visual design consistent when making changes.
- Preserve the published course fees, durations, phone numbers and address unless the center confirms an update.
- When changing a course fee, update all visible instances and the organization structured data in `index.html`.
- Keep the office and instructor WhatsApp destinations distinct and verify both links after editing.
- Do not add invented testimonials, teacher experience, qualifications, accreditations, exam-centre status, class schedules, opening hours, or visa and employment guarantees.
- Do not imply that the enquiry form stores or submits information to a website database. It prepares a WhatsApp message for the visitor to send.
- Check mobile and desktop layouts before publishing. Use the responsive review workflow for repeatable browser checks.
- Preserve keyboard navigation, visible focus states and reduced-motion support.

For additional development guidance, see [CONTRIBUTING.md](CONTRIBUTING.md), [AGENTS.md](AGENTS.md) and [DESIGN-SKILLS.md](DESIGN-SKILLS.md).

## License

No open-source license has been added to this repository. Unless the owner adds a license, the source code is not automatically available for reuse, redistribution or modification by others.
