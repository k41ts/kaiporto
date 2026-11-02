/* ============================================================================
   Satu-satunya sumber konten situs. Nggak ada database lagi: ubah teks di
   sini, deploy, selesai. Isinya harus jujur — jangan taruh proyek karangan.
   ========================================================================== */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zaidanikram.id";

export const profile = {
  name: "Zaidan Ikram",
  nickname: "Kai",
  role: "Full-stack engineer",
  headline: "Full-stack engineer and technical partner. I build software from the first plan to production.",
  intro: "Computer Science student at BINUS University, and a long-term technical partner for businesses.",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  email: "276kai@gmail.com",
  linkedin: "https://www.linkedin.com/in/zaidanikram/",
  github: "https://github.com/k41ts",
  instagram: "https://www.instagram.com/kai6v/",
  /** CV yang bisa diunduh. Ganti file di public/cv kalau CV-nya diperbarui. */
  cv: "/cv/ZaidanIkram_CV.pdf",
  nextOpening: "Q4 2026",
  /** Jenis kerja yang dicari, bukan magang. */
  openTo: "Full-time work for one year, starting 2027",
  /** Versi pendek untuk chip di foto hero. */
  openToShort: "Full-time · 1 year · from 2027",
  /** Potret studio dengan latar yang sudah dihapus, dipakai di hero. */
  photo: { src: "/img/zaidan-cutout.webp", alt: "Zaidan Ikram in a black blazer and grey shirt", width: 1000, height: 1350 },
  /** Foto aslinya, untuk JSON-LD dan tempat lain yang butuh latar. */
  portrait: "/img/zaidan-studio.jpg",
};

/** Angka singkat di hero. Semuanya bisa dicek dari proyek di bawah. */
export const heroStats = [
  { value: "7", label: "Products shipped" },
  { value: "2022", label: "Building since" },
  { value: "1,604", label: "Exam questions live" },
  { value: "<24h", label: "Reply time" },
];

export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  when: string;
  summary: string;
  points: string[];
  role: string;
  stack: string[];
  url?: string;
  /** Label tombol tautan, kalau bukan situs (mis. kode sumber). */
  urlLabel?: string;
  /** Diisi kalau dikerjakan bareng orang lain: siapa timnya. */
  team?: string;
  shots: Shot[];
};

export const hakaikol: Project = {
  slug: "hakaikol",
  name: "HakaiKOL",
  kind: "Web platform",
  when: "2026 to now",
  summary: "An influencer marketplace where brands pick creators by numbers they can check.",
  points: [
    "Follower and engagement data pulled from Instagram and TikTok",
    "A campaign runs from brief to invoice in one record",
    "A printable performance report for every campaign",
    "The browser never reads a data table directly",
  ],
  role: "Full-stack engineer and technical partner",
  stack: ["React", "Vite", "NestJS", "Prisma", "PostgreSQL", "Supabase", "Tailwind"],
  url: "https://hakaikol.vercel.app",
  shots: [
    { src: "/work/hakaikol/landing.png", alt: "HakaiKOL landing page with a sample creator search panel", width: 1484, height: 873 },
    { src: "/work/hakaikol/cari-kol.png", alt: "Creator search filtered by niche, platform, followers, and engagement", width: 1438, height: 947 },
    { src: "/work/hakaikol/campaign-klien.png", alt: "Client view of a campaign with creators, deliverables, and timeline", width: 1383, height: 942 },
    { src: "/work/hakaikol/statistik.png", alt: "Creator statistics with follower growth and a per-post breakdown", width: 1385, height: 977 },
  ],
};

export const kaicash: Project = {
  slug: "kaicash",
  name: "KaiCash",
  kind: "Android app",
  when: "2026",
  summary: "A money tracker you can pair with a parent, so they can see your spending without borrowing your phone.",
  points: ["Budgets and savings goals", "Parent pairing, synced in real time", "A receipt photo on every record"],
  role: "Sole designer and developer",
  stack: ["React Native", "Expo", "Firebase", "TypeScript"],
  shots: [
    { src: "/work/kaicash/home.jpg", alt: "Home screen with the balance, weekly spending, and quick actions", width: 709, height: 1600 },
    { src: "/work/kaicash/add.jpg", alt: "Add record screen for a transaction name, amount, and category", width: 709, height: 1600 },
    { src: "/work/kaicash/history.jpg", alt: "Transaction history grouped by date", width: 709, height: 1600 },
    { src: "/work/kaicash/analytics.jpg", alt: "Spending analytics above the transaction history", width: 709, height: 1600 },
    { src: "/work/kaicash/pairing.jpg", alt: "Pairing screen that links a parent account", width: 709, height: 1600 },
  ],
};

export const passinglab: Project = {
  slug: "passinglab",
  name: "PassingLab",
  kind: "Paid tryout platform",
  when: "Mar 2026 to now",
  summary: "A paid UTBK tryout platform. I rewrote the live Laravel app onto Next.js, alone, without losing a single answer.",
  points: [
    "Autosave that keeps working while the tab is hidden, and a timer the server owns",
    "Closed an account takeover path left in the old app",
    "QRIS payments that are safe to repeat, verified against my own stored amount",
    "Scoring, pricing, and shuffling in pure modules covered by unit tests",
  ],
  role: "Sole full-stack engineer",
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase Postgres", "Drizzle ORM", "Tailwind v4"],
  url: "https://passinglab.id",
  shots: [
    { src: "/work/passinglab/exam.png", alt: "PassingLab exam screen with a server timer, question navigator, and answer options", width: 1440, height: 900 },
    { src: "/work/passinglab/landing.png", alt: "PassingLab landing page offering a free UTBK demo", width: 1440, height: 900 },
    { src: "/work/passinglab/scoring.png", alt: "Score breakdown across the seven UTBK subtests with a total score ring", width: 1440, height: 900 },
  ],
};

/** Angka nyata dari kode dan bank soal PassingLab (lihat CV). */
export const passinglabStats = [
  { value: "1,604", label: "questions" },
  { value: "7", label: "UTBK subtests" },
  { value: "24", label: "database tables" },
  { value: "~24k", label: "lines of TypeScript" },
];

export const hakaimusic: Project = {
  slug: "hakaimusic",
  name: "HakaiMusic",
  kind: "Native Android app",
  when: "2026 to now",
  summary: "A native Android music client that plays offline first and keeps lock screen controls through every engine swap.",
  points: [
    "Two playback engines behind one media session: ExoPlayer first, a headless WebView when no stream resolves",
    "Library, queue, history, and downloads live on the device; sign-in only adds sync",
    "Sync that assumes the connection will drop, with no duplicates on a retry",
  ],
  role: "Sole designer and developer",
  stack: ["Kotlin", "Jetpack Compose", "Media3", "ExoPlayer", "Room", "WorkManager", "Firestore"],
  url: "https://github.com/k41ts/hakaimusic",
  shots: [
    { src: "/work/hakaimusic/playing.jpg", alt: "Now playing screen with cover art, waveform, and playback controls", width: 709, height: 1600 },
    { src: "/work/hakaimusic/home.jpg", alt: "Home screen with recommendations and a top daily list", width: 709, height: 1600 },
    { src: "/work/hakaimusic/lockscreen.jpg", alt: "Lock screen media controls for the playing track", width: 709, height: 1600 },
    { src: "/work/hakaimusic/queue.jpg", alt: "Play queue with reorder and remove controls", width: 709, height: 1600 },
    { src: "/work/hakaimusic/downloads.jpg", alt: "Downloads saved on the device for offline playback", width: 709, height: 1600 },
  ],
};

export const hakaitask: Project = {
  slug: "hakaitask",
  name: "HakaiTask",
  kind: "Web app",
  when: "Aug 2026",
  summary: "A task manager you talk to in Indonesian, with no AI. A readable dictionary turns one sentence into a dated task.",
  points: [
    "Parses everyday Indonesian like “lusa jam 3an”, and asks instead of guessing when a sentence is unclear",
    "Offline first: every write lands on the device, and conflicts merge per field",
    "A pure TypeScript chat engine with no React or network, tested on its own",
    "A personal dictionary: teach it “clientan” once and it remembers",
  ],
  role: "Full-stack engineer",
  team: "Built by a team of two",
  stack: ["React", "Vite", "TypeScript", "Zustand", "Supabase", "Tailwind v4", "Turborepo"],
  url: "https://hakaitask.my.id",
  shots: [
    { src: "/work/hakaitask/chat.png", alt: "Chat view: asking for this week's agenda, checking a free slot and finishing a task", width: 820, height: 860 },
    { src: "/work/hakaitask/calendar.png", alt: "Month calendar with dots on days that have tasks", width: 820, height: 620 },
    { src: "/work/hakaitask/dashboard.png", alt: "Dashboard with the next task and what comes after it", width: 820, height: 520 },
  ],
};

export const collatera: Project = {
  slug: "collatera",
  name: "Collatera",
  kind: "Hackathon prototype",
  when: "Oct 2026",
  summary: "An on-chain promissory note that both sides sign and that is collected until it is paid, without anyone paying gas.",
  points: [
    "Gasless EIP-712 signatures, sent through a relayer",
    "A non-transferable ERC-721 token as the creditor’s right to collect",
    "Installments in a stablecoin, with automatic overdue status and reminders",
    "An integrity check that freezes a note if the database and the chain disagree",
  ],
  role: "Full-stack engineer",
  team: "Hackathon team of five",
  stack: ["Next.js", "Prisma", "Solidity", "Hardhat", "ethers v6", "Ethereum Sepolia"],
  url: "https://collatera-app.vercel.app",
  shots: [
    { src: "/work/collatera/hero.png", alt: "Collatera landing page: Utang jelas. Tagihan tercatat. Lunas tuntas.", width: 1440, height: 900 },
    { src: "/work/collatera/flow.png", alt: "How a note goes from draft to signed to paid, in four steps", width: 1440, height: 900 },
    { src: "/work/collatera/detail.png", alt: "The integrity check that catches data changed off-chain", width: 1440, height: 900 },
  ],
};

export const aegisescrow: Project = {
  slug: "escrow",
  name: "Freelance Escrow",
  kind: "University project",
  when: "Sep to Oct 2026",
  summary: "Freelance payments held by a smart contract: money unlocks per milestone, and a silent client cannot hold it hostage.",
  points: [
    "No withdraw, receive, or fallback function, so the client cannot pull funds back",
    "Anyone can trigger auto-release once the review period passes",
    "Proof of work stored on IPFS, with only its CID on-chain to save gas",
    "Disputes decided by an arbitrator, never by either side",
  ],
  role: "Full-stack engineer",
  team: "BINUS Prototyping Blockchain course, team of five",
  stack: ["Solidity 0.8.28", "Hardhat 3", "OpenZeppelin", "React", "Vite", "ethers v6", "IPFS"],
  url: "https://flescrow.vercel.app",
  shots: [
    { src: "/work/escrow/hero.png", alt: "Freelance Escrow landing page: the money is in the contract before work starts", width: 1440, height: 900 },
    { src: "/work/escrow/dashboard.png", alt: "Demo dashboard with unfunded, locked, and paid milestones", width: 1440, height: 1040 },
    { src: "/work/escrow/project.png", alt: "A contract with its milestones, value, and the three parties", width: 1440, height: 900 },
  ],
};

/** Semua proyek, urutan tampil di halaman Work. */
export const projects = [passinglab, hakaikol, hakaitask, hakaimusic, kaicash, collatera, aegisescrow];

/** Riwayat kerja dan pendidikan, dari CV. */
export const experience = [
  { role: "Full Stack Engineer", org: "CreativIn", type: "Contract", when: "Jul to Sep 2026", where: "Hybrid, Indonesia",
    text: "Client-facing web features end to end, schema to interface, plus architecture and data-model calls." },
  { role: "Full Stack Software Engineer", org: "Self-employed", type: "Freelance", when: "Dec 2022 to now", where: "Remote, Jakarta",
    text: "Laravel web apps and their backend structure, delivered from zero to production as a long-term partner." },
  { role: "IT Support Specialist", org: "Alchemist Law Office", type: "Part-time", when: "Sep 2024 to Sep 2025", where: "Jakarta",
    text: "Hardware, software, and network support, and the Excel workflows the office ran on." },
  { role: "Web Designer", org: "UTERO Indonesia", type: "Internship", when: "Dec 2022 to Mar 2023", where: "Malang, East Java",
    text: "Responsive web pages built from brand and layout requirements." },
];

export const education = [
  { school: "BINUS University", what: "Bachelor of Computer Science", when: "2024 to 2028 (expected)" },
  { school: "SMK Telekomunikasi Darul Ulum", what: "Software Engineering", when: "2021 to 2024" },
];

/** Lapisan produk dan alat yang dipakai di tiap lapisan, beserta di mana dipakainya. Architecture dapat kartu besar. */
export const loadout = [
  { title: "Architecture", text: "The shape of the system, chosen while change is still cheap.",
    tools: [["System design", "Every product"], ["Auth and row-level security", "HakaiKOL, PassingLab"], ["Payments", "PassingLab"], ["Offline-first sync", "HakaiMusic"]] },
  { title: "Data", text: "Schemas that survive growth, access that stays locked.",
    tools: [["PostgreSQL", "HakaiKOL, PassingLab"], ["Supabase", "HakaiKOL, PassingLab"], ["Firebase, Firestore", "KaiCash, HakaiMusic"], ["Room", "HakaiMusic"]] },
  { title: "Backend", text: "Business rules written so they can change.",
    tools: [["NestJS", "HakaiKOL"], ["Server Actions", "PassingLab"], ["Prisma, Drizzle", "HakaiKOL, PassingLab"], ["Laravel", "Freelance work"]] },
  { title: "Interface", text: "Screens people understand on first use.",
    tools: [["React", "HakaiKOL, PassingLab"], ["Next.js", "PassingLab, this site"], ["Vite", "HakaiKOL"], ["Tailwind", "HakaiKOL, PassingLab"]] },
  { title: "Mobile", text: "Android apps that work offline and sync in real time.",
    tools: [["Kotlin, Jetpack Compose", "HakaiMusic"], ["Media3, ExoPlayer", "HakaiMusic"], ["React Native, Expo", "KaiCash"]] },
] as const;

/**
 * FundChain: peran Tech Lead. Angka diambil dari repo Fundchainbinus/fundchain,
 * folder planning-nya, dan Jira project BFD (dicek November 2026).
 */
export const fundchain = {
  name: "FundChain",
  summary: "A BINUS fundraising platform where every paid donation is hashed onto Sepolia. I wrote the plan, built the base, and ran four workstreams on top of it.",
  repo: "https://github.com/Fundchainbinus/fundchain",
  url: "https://fundchain-web.vercel.app",
  steps: [
    { title: "Spec", caption: "27 planning docs, scattered, with 19 conflicts between them.",
      text: "Read 27 planning docs and found 19 places where they disagreed: hash format, relayer role, webhook idempotency. Decided each one before any code." },
    { title: "Foundation", caption: "Every decided doc becomes part of one body: API, web, contract, database.",
      text: "Built the base myself: NestJS API, React web, a Hardhat contract and Supabase in one monorepo, live on Vercel and Sepolia by day two." },
    { title: "Plan", caption: "It stands on its own feet and reaches out: five epics, four workstreams.",
      text: "Opened the five epics in Jira and set the scope for sprints 3 and 4." },
    { title: "Assign", caption: "15 people take over each limb. The strings come off.",
      text: "Split 105 issues across a team of 15, in four workstreams that each had an owner." },
    { title: "Review", caption: "Every pull request flows back into one core, reviewed and merged.",
      text: "Linked GitHub to Jira, set the BFD-key branch and PR rules, and reviewed and merged the team's pull requests." },
    { title: "Ship", caption: "It runs without the hands: web and API on Vercel, donations hashed onto Sepolia.",
      text: "Kept the demo path working end to end: pay, hash, notarize on Sepolia, tamper, freeze. Web and API live on Vercel." },
  ],
  /** Issue per epic dan jumlah orang per jalur, dari Jira BFD. */
  streams: [
    { name: "Backend", issues: 31, people: 4 },
    { name: "Blockchain", issues: 23, people: 4 },
    { name: "Frontend & UI", issues: 17, people: 4 },
    { name: "QA", issues: 20, people: 1 },
  ],
  stats: [
    { value: "15", label: "People led" },
    { value: "4", label: "Workstreams" },
    { value: "6", label: "Sprints" },
    { value: "105", label: "Jira issues" },
    { value: "27", label: "Planning docs" },
    { value: "19", label: "Spec conflicts resolved" },
  ],
};

export const credits = "Product screenshots are from my own work. The 3D scene is drawn live with Three.js.";
