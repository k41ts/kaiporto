import type { Entry, Profile } from "@/lib/types";

/* ============================================================================
   FALLBACK, NOT THE SOURCE OF TRUTH.
   Real content lives in Supabase; this file is only used when the database
   cannot be read (or .env.local has not been filled in). That is exactly the
   moment a visitor is looking at the site, so keep everything here HONEST —
   never put invented projects in this file.
   ========================================================================== */

export const SITE_URL = "https://zaidanikram.id";

/** Bucket publik Supabase. Gambarnya bisa diakses tanpa kunci apa pun. */
const MEDIA = "https://donlnxtgrrhbqdsdaivi.supabase.co/storage/v1/object/public/media";

export const profile: Profile = {
  name: "Zaidan",
  fullName: "Zaidan Ikram",
  headline: "Software engineer and technical partner. I build digital products from zero to production.",
  bio: [
    "Call me Kai. I am a Computer Science student at BINUS University and a software engineer who enjoys turning ideas into digital products that solve real business problems.",
    "I enjoy the technical side of a product, but what interests me more is the business behind it. Choosing the right architecture, planning for growth, and building software that can still be maintained years later are the parts I genuinely like.",
    "I would rather work as a long-term technical partner than a pair of hands: involved from early planning through development, deployment, and the improvements that come after.",
  ],
  photo: "/zaidan.jpg",
  photoAlt: "Zaidan sitting at a cafe table with a wall of Japanese posters behind him",
  location: "Jakarta, Indonesia",
  available: true,
  availableLabel: "Open to working with founders and businesses",
  roles: [
    {
      key: "Role 01",
      title: "Software Engineer",
      description: "Full-stack web and mobile. Code that real people use and that survives after I hand it over.",
    },
    {
      key: "Role 02",
      title: "Technical Partner",
      description: "Helping founders pick a stack, weigh the cost, and decide what not to build.",
    },
    {
      key: "Role 03",
      title: "Full-Stack Developer",
      description: "Database schema, API, interface, deployment, and the monitoring that follows.",
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "React Native",
    "Laravel",
    "PostgreSQL",
    "Firebase",
    "System Design",
  ],
  email: "276kai@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/zaidanikram/" },
    { label: "Creativin", href: "https://creativin.id" },
  ],
  ghosts: [{ title: "In progress", eta: "Q4 2026" }],
};

export const entries: Entry[] = [
  {
    slug: "creativin",
    title: "Creativin — an influencer marketplace built on numbers you can verify",
    type: "build",
    summary:
      "A two-sided KOL marketplace with end-to-end campaign management: find creators, run the campaign, review drafts, close with an invoice. React, NestJS, and Supabase.",
    body: [
      "Brands pick influencers based on claims. Creators send rate cards full of numbers nobody can check. Creativin closes that gap: creators connect their Instagram and TikTok accounts through OAuth, and follower counts and engagement rates are pulled straight from the platforms.",
      "## The frontend never touches a data table",
      "The Supabase anon key ships inside the JavaScript bundle every visitor downloads. Here the frontend gets exactly two permissions — authentication and storage — and zero queries against data tables. All data access goes through NestJS as a BYPASSRLS role, with RLS still enabled on every table as a second layer.",
    ],
    pullquote: "The anon key sitting in the frontend bundle cannot read a single row from a data table.",
    device: "desktop",
    featured: true,
    year: 2026,
    role: "Full-stack engineer and technical partner",
    duration: "Ongoing",
    stack: ["TypeScript", "React", "Vite", "NestJS", "Prisma", "PostgreSQL", "Supabase", "Tailwind"],
    cover: {
      src: `${MEDIA}/1786895021459-c435zz.png`,
      alt: 'Creativin landing page with the headline "Ketemu creator yang cocok, bukan yang cuma ramai" and two creator cards showing match score, followers, and engagement rate',
    },
    gallery: [
      {
        src: `${MEDIA}/1786895038666-hev5aa.png`,
        alt: "Creator search page: eight creator cards in a grid, each showing niche, city, follower count, engagement rate, number of connected platforms, and starting rate",
      },
      {
        src: `${MEDIA}/1786895039833-mudevh.png`,
        alt: "Creator profile for Nadia Puspita showing 131 thousand followers and 4.8 percent engagement, with TikTok and Instagram accounts both marked Verified",
      },
    ],
    links: [{ label: "Site", href: "https://creativin.id" }],
    status: "published",
    order: 1,
    publishedAt: "2026-08-16",
  },
  {
    slug: "kaicash",
    title: "KaiCash — a money tracker that lets a parent look over your shoulder",
    type: "build",
    summary:
      "An Android personal finance app for tracking income and spending, with budgets, savings goals, and a pairing system for parental oversight. React Native (Expo) and Firebase.",
    body: [
      "There is no shortage of expense trackers. What makes KaiCash different is the feature most of them skip: you can pair your account with a parent so your spending can be supervised without anyone having to borrow anyone else phone.",
      "## Why Firebase",
      "Financial data has to update on both sides at once, the user and the parent watching. Firebase gives real-time sync without building a socket layer, and for an app this size that is a sensible trade.",
    ],
    device: "mobile",
    featured: false,
    year: 2026,
    role: "Sole designer and developer",
    duration: "Jun 2026 — ongoing",
    stack: ["React Native", "Expo", "Firebase", "TypeScript"],
    cover: {
      src: `${MEDIA}/1786953625256-8unu74.jpeg`,
      alt: "KaiCash home screen showing the current balance and recent transactions",
    },
    gallery: [
      { src: `${MEDIA}/1786953648496-8lxta9.jpeg`, alt: "Home screen with balance, daily spending summary, and quick access to recent records" },
      { src: `${MEDIA}/1786953648785-lx58vh.jpeg`, alt: "Add record screen where a transaction name, amount, and category are entered" },
      { src: `${MEDIA}/1786953649847-7bkc6f.jpeg`, alt: "Add record screen continued, with optional notes and a receipt photo attached" },
      { src: `${MEDIA}/1786953650057-pekqo5.jpeg`, alt: "Transaction history listing past records grouped by date" },
      { src: `${MEDIA}/1786953650268-bknf8n.jpeg`, alt: "Dashboard view combining spending analytics with the transaction history below it" },
      { src: `${MEDIA}/1786953650504-b80cq3.jpeg`, alt: "Account pairing screen used to link a parent account for spending oversight" },
      { src: `${MEDIA}/1786953650744-wznxpm.jpeg`, alt: "Settings screen with account, budget, and notification preferences" },
    ],
    links: [],
    status: "published",
    order: 2,
    publishedAt: "2026-08-17",
  },
];
