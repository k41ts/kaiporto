/* ============================================================================
   Satu-satunya sumber konten situs. Nggak ada database lagi: ubah teks di
   sini, deploy, selesai. Isinya harus jujur — jangan taruh proyek karangan.
   ========================================================================== */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zaidanikram.id";

export const profile = {
  name: "Zaidan Ikram",
  nickname: "Kai",
  katakana: "ザイダン・イクラム",
  role: "Full-stack engineer",
  headline: "Full-stack engineer and technical partner. I build software from the first plan to production.",
  intro: "Computer Science student at BINUS University, and a long-term technical partner for businesses.",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  email: "276kai@gmail.com",
  linkedin: "https://www.linkedin.com/in/zaidanikram/",
  nextOpening: "Q4 2026",
  photo: { src: "/zaidan.jpg", alt: "Zaidan at a cafe table with a wall of Japanese posters behind him" },
};

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
  shots: [],
};

/** Percakapan contoh dari HakaiTask, persis seperti di README-nya. */
export const hakaitaskChat: { from: "me" | "app"; text: string }[] = [
  { from: "me", text: "jadwalin rapat sama klien rabu jam 3" },
  { from: "app", text: "Oke — “Rapat sama klien”, Rab 12 Agu 15:00." },
  { from: "me", text: "rabu jam 4 gw kosong ga?" },
  { from: "app", text: "Rabu jam 16.00 kamu kosong, gak ada agenda di waktu itu." },
  { from: "me", text: "selesaiin rapat" },
  { from: "app", text: "“Rapat sama klien” ditandai selesai." },
  { from: "me", text: "ok makasih" },
  { from: "app", text: "Sama-sama." },
];

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
export const projects = [hakaikol, passinglab, hakaitask, hakaimusic, kaicash, collatera, aegisescrow];

/** Riwayat kerja dan pendidikan, dari CV. */
export const experience = [
  { role: "Full Stack Engineer", org: "CreativIn", type: "Contract", when: "Jul 2026 to now", where: "Hybrid, Indonesia",
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

export const kaicashFeatures = [
  { kanji: "予算", title: "Budgets and savings goals", text: "Set a monthly limit, watch it fill." },
  { kanji: "親子", title: "Parent pairing", text: "A pairing code links two phones, synced in real time." },
  { kanji: "領収書", title: "Receipt on every record", text: "Snap a photo when you add a transaction." },
];

/** Lapisan produk dan alat yang dipakai di tiap lapisan, beserta di mana dipakainya. */
export const loadout = [
  { kanji: "表", reading: "omote, the front", title: "Interface", text: "Screens people understand on first use.",
    tools: [["React", "HakaiKOL, PassingLab"], ["Next.js", "PassingLab, this site"], ["Vite", "HakaiKOL"], ["Tailwind", "HakaiKOL, PassingLab"]] },
  { kanji: "裏", reading: "ura, the back", title: "Backend", text: "Business rules written so they can change.",
    tools: [["NestJS", "HakaiKOL"], ["Server Actions", "PassingLab"], ["Prisma, Drizzle", "HakaiKOL, PassingLab"], ["Laravel", "Freelance work"]] },
  { kanji: "蔵", reading: "kura, the storehouse", title: "Data", text: "Schemas that survive growth, access that stays locked.",
    tools: [["PostgreSQL", "HakaiKOL, PassingLab"], ["Supabase", "HakaiKOL, PassingLab"], ["Firebase, Firestore", "KaiCash, HakaiMusic"], ["Room", "HakaiMusic"]] },
  { kanji: "携", reading: "kei, carried with you", title: "Mobile", text: "Android apps that work offline and sync in real time.",
    tools: [["Kotlin, Jetpack Compose", "HakaiMusic"], ["Media3, ExoPlayer", "HakaiMusic"], ["React Native, Expo", "KaiCash"]] },
  { kanji: "礎", reading: "ishizue, the foundation", title: "Architecture", text: "The shape of the system, chosen while change is still cheap.",
    tools: [["System design", "Every product"], ["Auth and row-level security", "HakaiKOL, PassingLab"], ["Payments", "PassingLab"], ["Offline-first sync", "HakaiMusic"]] },
] as const;

export const credits =
  "Mask images were generated with AI for this site. Oni photos from Pexels. Product screenshots are from my own work.";
