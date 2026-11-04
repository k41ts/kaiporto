# zaidanikram.id

Portfolio of Zaidan Ikram, full-stack engineer and Computer Science student at BINUS University.
Live at **[zaidanikram.id](https://zaidanikram.id)**.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # every page is prerendered as static HTML
```

## Pages

- `/`: hero, capabilities, the FundChain leadership walkthrough (Three.js), the featured case, experience, contact
- `/work`: every project with screenshots, what I did, and the stack
- `/work/fundchain`: case study with the problem, constraints, four decisions and their trade-offs, and what is still open
- Old URLs (`/about`, `/contact`, `/work/[slug]`, `/studio`) are redirected in `next.config.ts`

## How it is built

- **Next.js 15 App Router, React 19, TypeScript.** No CSS framework: one hand-written `app/globals.css`.
- **All content lives in [`content/site.ts`](content/site.ts).** There is no database or CMS: edit, deploy, done.
- **The FundChain scene** (`components/site/lead-sim.js`) is plain Three.js, loaded only on the homepage, and stays still on phones so the page scrolls normally.
- **Security headers** (CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are set in `next.config.ts`.
- **The CV** is LaTeX in [`cv/zaidan-ikram-cv.tex`](cv/zaidan-ikram-cv.tex), compiled with Tectonic and copied to `public/cv/ZaidanIkram_CV.pdf`:

  ```bash
  cd cv && tectonic zaidan-ikram-cv.tex && cp zaidan-ikram-cv.pdf ../public/cv/ZaidanIkram_CV.pdf
  ```

## Images

Product screenshots are from my own work. The portrait is a studio photo.
