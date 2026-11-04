/* ============================================================================
   Satu-satunya sumber konten situs. Nggak ada database lagi: ubah teks di
   sini, deploy, selesai. Isinya harus jujur — jangan taruh proyek karangan.
   ========================================================================== */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zaidanikram.id";

/** Kunci sessionStorage untuk layar intro: sekali per sesi. */
export const INTRO_KEY = "zi-intro";

export const profile = {
  name: "Zaidan Ikram",
  nickname: "Kai",
  role: "Full-stack engineer",
  headline: "Full-stack engineer and CS student at BINUS University, available full-time for 12 months in 2027 through the BINUS Enrichment Program.",
  intro: "Computer Science student at BINUS University, with paid client and contract work since 2022.",
  location: "Jakarta, Indonesia",
  timezone: "Asia/Jakarta",
  email: "276kai@gmail.com",
  linkedin: "https://www.linkedin.com/in/zaidanikram/",
  github: "https://github.com/k41ts",
  instagram: "https://www.instagram.com/kai6v/",
  /** CV yang bisa diunduh. Ganti file di public/cv kalau CV-nya diperbarui. */
  cv: "/cv/ZaidanIkram_CV.pdf",
  /** Jenis kerja yang dicari: satu tahun penuh lewat BINUS Enrichment Program. */
  openTo: "Full-time for 12 months in 2027 · BINUS Enrichment Program",
  /** Versi pendek untuk chip di foto hero. */
  openToShort: "Full-time · 12 months · 2027",
  /** Potret studio dengan latar yang sudah dihapus, dipakai di hero. */
  photo: { src: "/img/zaidan-cutout.webp", alt: "Zaidan Ikram in a black blazer and grey shirt", width: 1000, height: 1350 },
  /** Foto aslinya, untuk JSON-LD dan tempat lain yang butuh latar. */
  portrait: "/img/zaidan-studio.jpg",
};

/** Angka singkat di hero. Semuanya bisa dicek dari proyek di bawah. */
export const heroStats = [
  { value: "10", label: "Products built" },
  { value: "15", label: "People led as Tech Lead" },
  { value: "12 mo", label: "Full-time in 2027" },
  { value: "2022", label: "Paid work since" },
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
  kind: "Personal project",
  when: "2026 to now",
  summary: "An influencer marketplace where brands pick creators by numbers they can check. A personal project, not launched.",
  points: [
    "Follower and engagement data pulled from Instagram and TikTok",
    "A campaign runs from brief to invoice in one record",
    "A printable performance report for every campaign",
    "The browser never reads a data table directly",
  ],
  role: "Sole developer",
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
  kind: "Freelance · UTBK tryout platform",
  when: "Mar 2026 to now",
  summary: "A UTBK tryout platform, rewritten from Laravel onto Next.js as a freelance job. Built so an answer cannot be lost; launching soon.",
  points: [
    "Autosave that keeps working while the tab is hidden, and a timer the server owns",
    "Closed an account takeover path left in the old app",
    "QRIS payments that are safe to repeat, verified against the amount we stored",
    "Scoring, pricing, and shuffling in pure modules covered by unit tests",
  ],
  role: "Full-stack engineer",
  team: "Built by a team of two",
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase Postgres", "Drizzle ORM", "Tailwind v4"],
  url: "https://passinglab.id",
  shots: [
    { src: "/work/passinglab/exam.png", alt: "PassingLab exam screen with a server timer, question navigator, and answer options", width: 1440, height: 900 },
    { src: "/work/passinglab/landing.png", alt: "PassingLab landing page offering a free UTBK demo", width: 1440, height: 900 },
    { src: "/work/passinglab/scoring.png", alt: "Score breakdown across the seven UTBK subtests with a total score ring", width: 1440, height: 900 },
  ],
};

/** Angka nyata dari PassingLab (lihat CV). Belum launching, jadi belum ada angka pengguna. */
export const passinglabStats = [
  { value: "1,604", label: "questions ready" },
  { value: "7", label: "UTBK subtests" },
  { value: "24", label: "database tables" },
  { value: "2", label: "engineers" },
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

export const shiki: Project = {
  slug: "shiki",
  name: "Shiki",
  kind: "Windows desktop app",
  when: "Oct 2026",
  summary: "A voice assistant for Windows. Hold a key, say it in everyday Indonesian, and it types, opens apps, plays music, or sends a file on WhatsApp.",
  points: [
    "Hold Ctrl+Win and talk: messy speech comes back as clean text, pasted where the cursor is",
    "Commands and routines like “tiap pagi jam 9 buka Unity dan Spotify”",
    "Finds a file and sends it on WhatsApp Web, and asks once before it sends",
    "An island at the top of the screen for chat, media, to-dos, stats, and apps",
  ],
  role: "Sole designer and developer",
  stack: ["Rust", "Tauri 2", "Gemini API", "Win32 API", "WebView2", "HTML", "CSS"],
  url: "https://github.com/k41ts/shiki",
  urlLabel: "View source",
  shots: [
    { src: "/work/shiki/chat.jpg", alt: "Shiki's island open on the Chat tab, setting a morning routine and playing a song on YouTube", width: 1440, height: 900 },
    { src: "/work/shiki/controls.jpg", alt: "Controls tab with Wi-Fi, Bluetooth, volume, and the song that is playing", width: 1440, height: 900 },
    { src: "/work/shiki/today.jpg", alt: "Today tab with the clock, this week, the next routine, a focus timer, and to-dos", width: 1440, height: 900 },
    { src: "/work/shiki/loadout.jpg", alt: "Loadout window where the mask, personality, voice, and abilities are chosen", width: 1440, height: 900 },
  ],
};

export const pokerizz: Project = {
  slug: "pokerizz",
  name: "Pokerizz",
  kind: "Multiplayer web game",
  when: "Oct 2026",
  summary: "Kartu Duel, a poker duel for two: play a combo, and the gap between the scores becomes damage. Online with friends, ranked, or against a bot.",
  points: [
    "Online rooms on Supabase Realtime: the host runs the game, so a guest never receives the other hand",
    "Ranked matchmaking falls back to a bot at your rank; the top bots simulate draws instead of peeking at the deck",
    "A seeded match effect and a Joker every three rounds change the scoring each game",
    "The game is a pure reducer covered by 50 unit tests, and every sound is synthesised with Web Audio",
  ],
  role: "Sole designer and developer",
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase Realtime", "Supabase Auth", "Motion", "Tailwind v4", "Vitest"],
  url: "https://pokerizz.vercel.app",
  shots: [
    { src: "/work/pokerizz/hand.jpg", alt: "A practice match against a bot, with a pair of queens picked from the hand", width: 740, height: 1601 },
    { src: "/work/pokerizz/reveal.jpg", alt: "The reveal: the bot's straight beats the pair and takes 45 HP", width: 740, height: 1601 },
    { src: "/work/pokerizz/joker.jpg", alt: "Picking a Joker after round three: Vampire, Shield, or Loyal Pair", width: 740, height: 1601 },
    { src: "/work/pokerizz/menu.jpg", alt: "Main menu with ranked matches, private rooms, practice, and the tutorial", width: 740, height: 1601 },
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

export const fundchainProject: Project = {
  slug: "fundchain",
  name: "FundChain",
  kind: "Fundraising platform",
  when: "2026",
  summary: "A BINUS student fundraising platform where every paid donation is hashed and notarised on Sepolia, so anyone can check that a record was not changed.",
  points: [
    "Each paid donation becomes a Keccak-256 hash, written on-chain by a relayer",
    "A proof page per donation recomputes the hash in the browser and compares it with the chain",
    "A record changed in the database after the fact is caught and the campaign is frozen",
    "I led the team as Tech Lead: the spec, the foundation, the sprints, and the code review",
  ],
  role: "Tech Lead and full-stack engineer",
  team: "BINUS team of 15, in four workstreams",
  stack: ["NestJS", "React", "Vite", "Supabase", "Prisma", "Solidity", "Hardhat", "Ethereum Sepolia", "Vercel"],
  url: "https://fundchain-web.vercel.app",
  shots: [
    { src: "/work/fundchain/proof.jpg", alt: "Donation proof page: canonical payload, stored hash, transaction hash, and the on-chain hash on Sepolia", width: 1440, height: 900 },
    { src: "/work/fundchain/donations.jpg", alt: "Campaign donations, each confirmed on-chain and verified against its hash", width: 1440, height: 900 },
    { src: "/work/fundchain/home.jpg", alt: "FundChain home inside BINUSMaya with funds raised, public campaigns, and donation integrity", width: 1440, height: 900 },
    { src: "/work/fundchain/campaign.jpg", alt: "A campaign page with its proposal, progress toward the target, and verified donations", width: 1440, height: 900 },
  ],
};

/** Semua proyek, urutan tampil di halaman Work. */
export const projects = [passinglab, fundchainProject, hakaikol, hakaitask, shiki, pokerizz, hakaimusic, kaicash, collatera, aegisescrow];

/** Riwayat kerja dan pendidikan, dari CV. */
export const experience = [
  { role: "Full Stack Engineer", org: "Creativin", type: "Contract", when: "Jul to Sep 2026", where: "Hybrid, Indonesia",
    text: "Features for creativin.id, a KOL marketplace: creator search, the campaign flow from invite to invoice, and creator stats." },
  { role: "Full Stack Software Engineer", org: "Self-employed", type: "Freelance", when: "Dec 2022 to now", where: "Remote, Jakarta",
    text: "A Laravel inventory system, product catalogue landing pages, and company profile sites for small businesses. Now: PassingLab." },
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
    tools: [["PostgreSQL", "HakaiKOL, PassingLab"], ["Supabase", "HakaiKOL, PassingLab, Pokerizz"], ["Firebase, Firestore", "KaiCash, HakaiMusic"], ["Room", "HakaiMusic"]] },
  { title: "Backend", text: "Business rules written so they can change.",
    tools: [["NestJS", "HakaiKOL"], ["Server Actions", "PassingLab"], ["Prisma, Drizzle", "HakaiKOL, PassingLab"], ["Laravel", "Freelance: inventory system"]] },
  { title: "Interface", text: "Screens people understand on first use.",
    tools: [["React", "HakaiKOL, PassingLab"], ["Next.js", "PassingLab, this site"], ["Vite", "HakaiKOL"], ["Tailwind", "HakaiKOL, PassingLab"]] },
  { title: "Mobile and desktop", text: "Android apps that work offline, and a Windows app that lives in the tray.",
    tools: [["Kotlin, Jetpack Compose", "HakaiMusic"], ["Media3, ExoPlayer", "HakaiMusic"], ["React Native, Expo", "KaiCash"], ["Rust, Tauri", "Shiki"]] },
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

/**
 * Studi kasus FundChain di /work/fundchain. Semua fakta dari repo FundChain:
 * README (tabel keputusan vs dokumen planning), packages/shared/canonical.ts,
 * DonationRegistry.sol, dan docs/blockchain/TAMPER-DEMO-RUNBOOK.md.
 */
export const fundchainCase = {
  title: "Proving a donation was not changed, with a team of 15",
  intro: "FundChain is a fundraising platform for BINUS students, built as a university project. I was the Tech Lead: I wrote the spec, built the foundation, and ran four workstreams on top of it.",
  problem: [
    "Student fundraisers ask people to trust a spreadsheet. If someone with database access edits a donation after it is paid, nobody outside can tell.",
    "The brief was to make that edit visible. Keeping the money on-chain was out of scope: payments stay in rupiah through a normal gateway, and the chain is only a proof layer.",
  ],
  constraints: [
    ["Team", "15 students across backend, blockchain, frontend and QA, most new to Solidity"],
    ["Time", "Six sprints, with a demo day at the end"],
    ["Spec", "27 planning docs written in parallel, with 19 places where they disagreed"],
    ["Budget", "Free tiers only: Vercel, Supabase, and the Sepolia testnet"],
    ["Privacy", "Anything written on a public chain stays there, so no names or emails"],
  ],
  /** Keputusan teknis, masing-masing dengan harga yang dibayar. */
  decisions: [
    { title: "One canonical hash, defined in one place",
      text: "Each paid donation becomes the string v1|donationId|pseudonym|amount|paidAtSeconds, hashed with Keccak-256. It lives in a shared package used by both the notarizer and the checker, so the two can never format it differently.",
      cost: "Fields are strict: whole rupiah only, a pseudonym like STU-00042 instead of a name, and the stored payment time instead of now(). The v1 prefix leaves room to change the format later." },
    { title: "A relayer that can only write once",
      text: "The contract has two roles. A cold admin wallet can revoke the relayer; the hot relayer on the backend is the only one allowed to notarize, and a second write to the same donation reverts.",
      cost: "A wrong hash can never be corrected on-chain. That is the point, but it means the hash format had to be settled before the first notarization." },
    { title: "An outbox table instead of Redis and BullMQ",
      text: "The plan called for Redis and BullMQ. Notarization jobs go into a blockchain_transactions table instead, and a worker polls it with retry, backoff, and a FAILED state.",
      cost: "Polling is slower than a queue, and on Vercel the worker only runs when a request or the daily cron wakes it. One less service to host for free and to explain to 15 people." },
    { title: "Freeze the campaign, not just flag the row",
      text: "The integrity checker recomputes every hash from the database and compares it with the chain. A mismatch marks the donation TAMPERED, freezes the campaign, writes an audit log, and blocks every disbursement.",
      cost: "One bad row stops a whole campaign until an admin looks at it. For a fundraiser, a false stop is cheaper than a quiet payout." },
  ],
  /** Cara kerja tim, dari Jira BFD. */
  process: [
    "Resolved the 19 spec conflicts in writing before any code: hash format, relayer role, webhook idempotency, and the rest.",
    "Built the monorepo myself (NestJS API, React web, Hardhat contract, Supabase) and had it live on Vercel and Sepolia by day two, so the team started from working code.",
    "Opened five epics in Jira, split 105 issues across four workstreams, each with one owner.",
    "Linked GitHub to Jira with BFD-key branch and PR names, and reviewed and merged the team's pull requests.",
  ],
  /** Hasil yang bisa dicek sendiri. */
  results: [
    "Web and API live on Vercel; donations notarized on Sepolia with an Etherscan link per donation",
    "A public proof page per donation that recomputes the hash in the browser",
    "The demo path runs end to end: pay, hash, notarize, edit the amount in the database, detect, freeze, refuse the payout",
    "Tests on the canonical hash, the contract (9 tests), the campaign state machine, the disbursement rules, and webhook signatures",
  ],
  /** Yang masih terbuka. Jujur lebih meyakinkan daripada sempurna. */
  open: [
    "Sign-in is a persona switcher for the demo. Microsoft SSO for BINUS is researched but not built.",
    "Payments run on a mock provider, with a Pakasir adapter ready. No real money has gone through it.",
    "On Vercel the automatic check runs once a day, so a tamper can sit unnoticed for hours unless an admin runs the check.",
    "It runs on Sepolia, a test network. Mainnet would need a funded relayer and a plan for gas.",
  ],
};

/** Angka di kartu Featured case beranda. Dari repo FundChain (test kontrak, keputusan di studi kasus). */
export const fundchainFeaturedStats = [
  { value: "1", label: "write per donation, on-chain" },
  { value: "9", label: "contract tests" },
  { value: "4", label: "decisions with trade-offs" },
  { value: "105", label: "Jira issues shipped" },
];

export const credits = "Product screenshots are from my own work. The 3D scene is drawn live with Three.js.";
