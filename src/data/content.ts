// All site copy lives here. Sourced from Assets/portfolio-content.md
// (CV + GitHub, gathered 2026-11-22).

export const profile = {
  first: "Tanim",
  last: "Ahmed",
  fullName: "Tanim Ahmed",
  location: "Dhaka, Bangladesh",
  email: "tanimahmedshad@gmail.com",
  bio: "Backend and AI engineer in Dhaka. I build production APIs, retrieval pipelines and detection models — and I reason about them from first principles.",
  roles: [
    "backendEngineer",
    "aiBuilder",
    "problemSolver",
    "systemDesigner",
    "firstPrinciples",
    "competitiveProgrammer",
    "ownershipMindset",
  ],
  currently: {
    title: "Junior Software Engineer",
    org: "Sugarclass",
    detail: "Course content · video & web-build pipelines",
    since: "Oct 2026 — Present",
  },
  focus: [
    "TypeScript",
    "Node.js",
    "React",
    "Python",
    "C++",
    "SQL",
    "RAG",
    "Full Stack development",
    "AI Native development",
  ],
  links: [
    { label: "GitHub", handle: "@OG-Tanim", href: "https://github.com/OG-Tanim" },
    {
      label: "LinkedIn",
      handle: "tanim-ahmed",
      href: "https://www.linkedin.com/in/tanim-ahmed-b810b91a0/",
    },
    {
      label: "Codeforces",
      handle: "OG-Tanim",
      href: "https://codeforces.com/profile/OG-Tanim",
    },
    { label: "X", handle: "@OG_Tanim", href: "https://x.com/OG_Tanim" },
  ],
};

export type Visual =
  | "admission"
  | "fraud"
  | "rag"
  | "visdrone"
  | "crm"
  | "slm"
  | "doomsday";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  blurb: string;
  stack: string[];
  visual: Visual;
  repo: string;
  live?: string;
  year: string;
  role: string;
  metrics?: { value: string; label: string }[];
  problem: string;
  approach: { title: string; body: string }[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "school-admission",
    title: "School Admission System",
    subtitle: "Concurrency-safe seat allocation",
    blurb:
      "Admissions where two parents can't take the last seat at the same moment. Seats are held for a limited time, then confirmed or released — enforced with PostgreSQL row locks.",
    stack: [".NET Core", "EF Core", "C#", "PostgreSQL", "React", "Vite", "Docker"],
    visual: "admission",
    repo: "https://github.com/OG-Tanim/school-admission-system",
    year: "2026",
    role: "Full-stack · sole developer",
    metrics: [
      { value: "1", label: "command to run the whole stack" },
      { value: "4", label: "seat states: total, held, confirmed, available" },
    ],
    problem:
      "Admission day is a burst of parents applying for the same few seats at once. A naive read-then-write lets two requests both see “1 available” and both succeed.",
    approach: [
      {
        title: "Hold, then confirm",
        body: "Applying places a time-limited hold on a seat. Holds expire on their own, so abandoned applications return seats to the pool without anyone cleaning up.",
      },
      {
        title: "Row locking, not hope",
        body: "Seat allocation runs inside a transaction that locks the class row, so concurrent holds are serialized by PostgreSQL instead of racing in application code.",
      },
      {
        title: "Shippable by default",
        body: "Docker multi-stage builds, EF Core migrations on startup and working defaults in docker-compose mean `docker compose up` is the entire setup.",
      },
      {
        title: "Many backends, one truth",
        body: "Extra backend containers can share the same database or point at their own, and the UI can switch between them — a quick way to prove the locking holds across processes.",
      },
    ],
    highlights: [
      "Total / held / confirmed / available tracked per class",
      "Configurable hold duration",
      "Health checks and startup migrations",
      "Persistent Postgres volume",
    ],
  },
  {
    slug: "the-eye",
    title: "The-Eye",
    subtitle: "Adaptive multi-agent fraud detection",
    blurb:
      "Six specialist agents — transactions, behavior, geography, graph, time and communications — vote through a cost-aware orchestrator that retrains when fraudsters change tactics.",
    stack: ["Python", "Isolation Forest", "Graph analysis", "LLM NLP", "Drift detection"],
    visual: "fraud",
    repo: "https://github.com/OG-Tanim/Reply-AI-Contest-Fraudulent-Transaction-Detector-",
    year: "2026",
    role: "Reply AI Challenge 2026",
    metrics: [
      { value: "6", label: "specialist agents" },
      { value: "6", label: "layer architecture" },
    ],
    problem:
      "Fraud in the challenge evolves level by level: new merchants, new hours, new regions, new amounts. A single static model trained on yesterday's pattern misses today's.",
    approach: [
      {
        title: "One expert per dimension",
        body: "Transaction anomaly (Isolation Forest), behavioral baselines, geospatial impossible-travel, graph centrality for money-mule rings, temporal bursts, and an LLM reading SMS and email for phishing signals.",
      },
      {
        title: "Cost-aware fusion",
        body: "A meta-orchestrator combines agent scores with weighted voting and asymmetric penalties — a missed fraud costs more than a false alarm — and tunes thresholds per level.",
      },
      {
        title: "Adapt when the ground shifts",
        body: "DDM/ADWIN drift detection triggers per-agent retraining, and a memory bank stores past patterns for few-shot recognition across levels.",
      },
    ],
    highlights: [
      "Features: amount z-scores, recipient novelty, velocity, GPS-to-transaction distance",
      "Communications agent catches social engineering before the transfer",
      "Precision–recall threshold optimization on output",
    ],
  },
  {
    slug: "contextual-rag",
    title: "Contextual RAG",
    subtitle: "Hybrid search, fusion & reranking",
    blurb:
      "A retrieval pipeline built from first principles: structure-aware chunking, LLM-written chunk context, semantic + BM25 search fused with RRF, cross-encoder reranking and HyDE.",
    stack: ["Python", "ChromaDB", "Rank-BM25", "Sentence-Transformers", "Ollama"],
    visual: "rag",
    repo: "https://github.com/OG-Tanim/RAG-form-First-Principles",
    year: "2026",
    role: "Research build",
    metrics: [
      { value: "2", label: "retrievers fused with Reciprocal Rank Fusion" },
      { value: "5", label: "stages between question and answer" },
    ],
    problem:
      "Plain vector search loses exact terms like error codes, and fixed-size chunks split instructions from their prerequisites — both feed the model the wrong context.",
    approach: [
      {
        title: "Chunk by structure",
        body: "Documents split on their real Markdown hierarchy, so steps stay with the section that explains them. Each chunk gets a two-sentence situational context written by an LLM before embedding.",
      },
      {
        title: "Search two ways",
        body: "Semantic search in ChromaDB (all-MiniLM-L6-v2) finds meaning; BM25 finds exact terms. Reciprocal Rank Fusion rewards documents both agree on.",
      },
      {
        title: "Rerank, then expand",
        body: "A cross-encoder rescores the top candidates against the query. HyDE drafts a hypothetical answer first, giving vague questions a better search template.",
      },
    ],
    highlights: [
      "Runs locally with Ollama or via OpenRouter",
      "Built on a Kaggle technical-support dataset",
    ],
  },
  {
    slug: "visdrone",
    title: "VisDrone Detection",
    subtitle: "Humans & cars from drone footage",
    blurb:
      "Ultralytics YOLO26s fine-tuned on VisDrone with a custom pipeline: 10 classes remapped to 2, integrity checks, imbalance weighting and heavy augmentation.",
    stack: ["PyTorch", "Ultralytics YOLO26s", "OpenCV", "NumPy"],
    visual: "visdrone",
    repo: "https://github.com/OG-Tanim/VisDrone-Human-Car-Detection",
    year: "2026",
    role: "Model training",
    metrics: [
      { value: "0.654", label: "mAP@0.5 (vs 0.374 for the 10-class model)" },
      { value: "0.374", label: "mAP@0.5:0.95 (vs 0.218)" },
      { value: "276K", label: "labelled objects across 6,471 images" },
    ],
    problem:
      "Drone footage is full of tiny, dense, overlapping objects. A general 10-class detector spreads its capacity thin when the job is just “people” and “vehicles”.",
    approach: [
      {
        title: "Ask a narrower question",
        body: "Pedestrian + people became Human; car + van became Car; everything else was dropped. Then an integrity pass removed orphaned files, corrupt images and empty labels.",
      },
      {
        title: "Train for small things",
        body: "Mosaic, MixUp, Copy-Paste, vertical flips and HSV jitter; class-imbalance weighting for 106K humans vs 170K cars; 50 epochs at 640px with early stopping.",
      },
      {
        title: "Ship inference",
        body: "One script predicts on images, video, URLs or a webcam, with a live human and car count overlay.",
      },
    ],
    highlights: [
      "mAP@0.5 up from 0.374 to 0.654",
      "Exploratory and training notebooks included",
    ],
  },
  {
    slug: "biai-crm",
    title: "BIAI CRM",
    subtitle: "Enquiry pipeline with AI on a leash",
    blurb:
      "An internal CRM for an AI-training company: WhatsApp, Facebook, web and phone enquiries on one record. The AI proposes fields and drafts replies — it never sets a status or invents a price.",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Neon", "LLM APIs"],
    visual: "crm",
    repo: "https://github.com/OG-Tanim/BIAI-CRM",
    year: "2026",
    role: "Client project",
    metrics: [
      { value: "5", label: "pipeline stages" },
      { value: "48h", label: "follow-up clock" },
    ],
    problem:
      "Enquiries arrived on four channels and lived in people's heads. Leads went cold because nobody knew who had replied, or when.",
    approach: [
      {
        title: "Capture without retyping",
        body: "Paste a message; “Read message” proposes name, company, phone, channel and intent. Every field stays editable and the original is stored byte for byte.",
      },
      {
        title: "Guardrails on the AI",
        body: "Drafted replies use {{placeholder}} tokens wherever a price, date or policy is unknown, and copying one that still has a token asks for confirmation. Status changes are always human.",
      },
      {
        title: "Numbers the model can't touch",
        body: "The weekly summary is written by the model around placeholders; the server fills every number from the database.",
      },
    ],
    highlights: [
      "Kanban: New → Contacted → Interested → Paid → Lost",
      "Follow-ups queue for leads waiting 48h+",
      "Separate testing and production database branches",
    ],
  },
  {
    slug: "mini-slm",
    title: "Mini SLM",
    subtitle: "A modern language model, from scratch",
    blurb:
      "A ~1.9M-parameter transformer in PyTorch with the parts modern LLMs use: RMSNorm, rotary embeddings, grouped-query attention and SwiGLU.",
    stack: ["PyTorch", "Python", "NumPy"],
    visual: "slm",
    repo: "https://github.com/OG-Tanim/Basic-Mordern-SLM",
    year: "2026",
    role: "Learning build",
    metrics: [
      { value: "1.9M", label: "parameters" },
      { value: "4", label: "transformer blocks" },
    ],
    problem:
      "Using LLM APIs is easy; knowing why they're built the way they are is not. The fastest way to understand the architecture is to write it.",
    approach: [
      {
        title: "Modern blocks",
        body: "RMSNorm instead of LayerNorm, RoPE for position, grouped-query attention to save memory, SwiGLU feed-forward, and weight tying on the output head.",
      },
      {
        title: "Three ways to run it",
        body: "A modular package (model, data, train, generate), a single-file script, and a Colab notebook — trained on Shakespeare.",
      },
    ],
    highlights: ["~7.6 MB in float32", "Temperature-controlled generation CLI"],
  },
  {
    slug: "doomsday-ready",
    title: "Doomsday Ready",
    subtitle: "Graphs and bundles for movie night",
    blurb:
      "Plan an MCU rewatch before Avengers: Doomsday and book the watch party. A prerequisite graph gives a valid watch order; a solver finds the fewest seat bundles that fit your group exactly.",
    stack: ["Express 5", "TypeScript", "SQLite", "React 19", "Vitest", "Docker"],
    visual: "doomsday",
    repo: "https://github.com/OG-Tanim/doomsday-ready",
    year: "2026",
    role: "Full-stack",
    metrics: [
      { value: "10,000", label: "group size the solver is tested at" },
    ],
    problem:
      "Two small algorithm problems inside a real app: order movies so every prerequisite comes first, and seat a group using only fixed-size bundles.",
    approach: [
      {
        title: "Graph, not list",
        body: "Movies and prerequisites form a graph. Saving a cycle is rejected and leaves data unchanged; the rewatch order is a topological walk with watched counts and remaining runtime.",
      },
      {
        title: "Exact seating",
        body: "The booking quote returns the fewest bundles that seat the group exactly — or says it can't be done.",
      },
      {
        title: "Tested like it matters",
        body: "Every row of the brief's expected results, plus edge cases, Unicode duplicate names, payload limits and a speed check at the largest inputs.",
      },
    ],
    highlights: ["Consistent { error, message } API errors", "One-command Docker Compose"],
  },
];

export const experience: {
  when: string;
  title: string;
  org: string;
  href?: string;
  place: string;
  current: boolean;
  points: string[];
  stack: string[];
}[] = [
  {
    when: "Oct 2026 – Present",
    title: "Junior Software Engineer",
    org: "Sugarclass",
    href: "https://www.sugarclass.com/",
    place: "Online learning platform",
    current: true,
    points: [
      "Help generate course content for the platform.",
      "Debug the content-generation process end to end.",
      "Fine-tune the video-generation and web-build pipelines.",
    ],
    stack: ["AI content generation", "Video pipeline", "Web build"],
  },
  {
    when: "Sept 2025",
    title: "Backend Developer",
    org: "Freelance · platform project",
    place: "Remote",
    current: false,
    points: [
      "Delivered an end-to-end backend of production-grade REST APIs with modular architecture and industry-standard security.",
      "Implemented scalability-focused business logic and integrated it with the frontend team, with robust error handling throughout.",
      "Wrote unit tests and ran full API testing in Postman across standard and edge cases.",
    ],
    stack: ["Node.js", "TypeScript", "Express", "MongoDB"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C++", "TypeScript", "Python", "SQL", "Shell Script"] },
  {
    group: "Backend",
    items: ["Node.js", "Express", "REST", "WebSocket", "Webhooks", "Microservices"],
  },
  { group: "Frontend", items: ["React", "Tailwind CSS", "State management"] },
  {
    group: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Drizzle", "Mongoose", "AWS / GCP storage"],
  },
  { group: "Security", items: ["JWT", "OAuth 2.0", "Validation", "Rate limiting"] },
  {
    group: "AI / ML",
    items: ["PyTorch", "RAG", "LLM APIs", "Local LLMs", "Agents", "Fine-tuning", "YOLO"],
  },
  {
    group: "Tooling",
    items: ["Docker", "Compose", "GitHub Actions", "Postman", "Bash", "Git"],
  },
];

export const lab = [
  {
    name: "PageIndex RAG",
    note: "RAG over the DeepSeek-R1 paper using a document tree instead of chunks",
    stack: "Python · LLM APIs",
    href: "https://github.com/OG-Tanim/PageIndex-RAG",
  },
  {
    name: "Recursive Language Model",
    note: "Implementing the MIT CSAIL RLM paper to see how it works",
    stack: "Python",
    href: "https://github.com/OG-Tanim/Sample_RLM",
  },
  {
    name: "Coding Agent",
    note: "An agent loop for coding tasks — work in progress",
    stack: "TypeScript",
    href: "https://github.com/OG-Tanim/Coding-Agent",
  },
  {
    name: "Cloud Storage Backend",
    note: "Files, nested folders, passcode locks, share links, OAuth",
    stack: "Express · MongoDB",
    href: "https://github.com/OG-Tanim/Node.js-CloudStorageBackend",
  },
  {
    name: "Vibecommerce Backend",
    note: "Role-based e-commerce API with refresh-token sessions",
    stack: "Express · Prisma · Postgres",
    href: "https://github.com/OG-Tanim/Vibecommerce-backend",
  },
  {
    name: "Chess",
    note: "Chess in the browser",
    stack: "TypeScript",
    href: "https://github.com/OG-Tanim/Chess.com",
  },
  {
    name: "React reconciliation, by hand",
    note: "State diffing and minimal DOM updates in plain JavaScript",
    stack: "JavaScript",
    href: "https://github.com/OG-Tanim/react-diffing-and-reconciliation",
  },
  {
    name: "Competitive programming",
    note: "Contest solutions",
    stack: "C++",
    href: "https://github.com/OG-Tanim/CP",
  },
];

// Codeforces rating history (fetched 2026-11-22 from the public API).
export const codeforces = {
  handle: "OG-Tanim",
  href: "https://codeforces.com/profile/OG-Tanim",
  rank: "Pupil",
  current: 1245,
  max: 1348,
  history: [388, 623, 801, 938, 966, 1056, 1050, 1320, 1225, 1262, 1324, 1296, 1348, 1245],
};

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "BRAC University",
  place: "Bangladesh",
  when: "January 2020 – November 2025",
  coursework: ["Data Structures and Algorithms", "Artificial Intelligence", "Machine Learning", "Database Systems"],
  thesis: {
    title: "Rare respiratory disease detection from chest X-rays",
    body: "Investigated methods to improve rare respiratory disease detection using an imbalanced multiclass, multilabel chest X-ray dataset, applying supervised learning and few-shot learning techniques.",
    tags: ["Supervised learning", "Few-shot learning", "Multilabel classification", "Class imbalance"],
  },
};

export const competencies = [
  {
    title: "Analytical & Problem-Solving",
    body: "Logical reasoning, quantitative analysis, structured problem-solving and evidence-based decision-making.",
  },
  {
    title: "Ownership & Accountability",
    body: "Taking responsibility for assigned tasks, maintaining quality standards and following problems through to resolution.",
  },
  {
    title: "Technology & Digital Adaptability",
    body: "Understanding of digital systems, data management, automation and emerging AI technologies.",
  },
  {
    title: "Research & Critical Thinking",
    body: "Evaluating information, identifying patterns, investigating complex problems and developing practical solutions.",
  },
  {
    title: "Collaboration",
    body: "Working with cross-functional team members, communicating technical requirements and coordinating implementation.",
  },
  {
    title: "Continuous Learning",
    body: "Independently learning unfamiliar concepts, adapting to new environments and putting new knowledge to work quickly.",
  },
];

export const sections = [
  { id: "intro", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "lab", label: "Lab" },
  { id: "contests", label: "Contests" },
  { id: "education", label: "Education" },
  { id: "strengths", label: "Strengths" },
  { id: "connect", label: "Connect" },
] as const;
