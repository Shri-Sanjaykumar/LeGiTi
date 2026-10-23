# LeGiTi (LEGITIFY)

> **Evidence-Grounded Recruitment, Internship & Employment Offer Forensic Trust Platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face-docTR_%26_ColPali-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.8_%26_2.0-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📖 Overview

**LeGiTi (LEGITIFY)** is an advanced, evidence-first cybersecurity and document forensic investigation platform designed to protect students, fresh graduates, and placement cells from fraudulent job offers, fake internships, corporate impersonation schemes, and predatory fee demands.

Unlike generic LLM wrappers that hallucinate opinions, LeGiTi implements a **deterministic 10-dimension forensic pipeline**:
1. It decomposes uploaded offer letters (PDF, images, text) into structured verifiable claims.
2. It validates claims against live statutory corporate registries (MCA21), ICANN RDAP domain infrastructure, and MX/SPF routing.
3. It interrogates live cybersecurity threat intelligence feeds (**VirusTotal v3**, **Google Safe Browsing v4**, and **AbuseIPDB v2**).
4. It enforces the **Zero-Fee International Labour Organization (ILO) Standard** — mathematically distinguishing genuine candidate compensation (salary, stipend, CTC) from predatory registration fees or caution deposits.
5. It cross-examines findings through an independent Google Gemini investigation layer and seals the final score with a Report Assertion Guard.

---

## 🔬 System Architecture

```
                    UPLOADED OFFER DOCUMENT (PDF / Image / Text)
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │                     DOCUMENT DECOMPOSITION PIPELINE                   │
    ├───────────────────────────────────┬───────────────────────────────────┤
    │  Vector PDF Extraction Worker     │  Mindee docTR / Unlimited-OCR     │
    │  (<50ms isolated worker process)  │  (Hugging Face deep image OCR)    │
    ├───────────────────────────────────┴───────────────────────────────────┤
    │  Visual Forensics & Signatory Differentiation (Signatures, Seals, Logo)│
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │                      STRUCTURED CLAIM EXTRACTION                      │
    │  (Roles, Stipend, Joining Date, Signatory, Selection Statement, Logo) │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────┴───────────────────────────────────┐
    │                  CONCURRENT MULTI-SOURCE INVESTIGATION                │
    ├───────────────────────────────────┬───────────────────────────────────┤
    │ 🏛️ MCA21 Corporate Registry       │ 🌐 ICANN RDAP & DNS MX Records    │
    │ 👤 Recruiter SPF / DMARC Routing  │ ⚡ VirusTotal, AbuseIPDB, SafeWeb │
    │ 🌎 Community Forums & Reviews     │ 🤖 Supervised ML Classifier       │
    │ 🧠 Hugging Face Models            │ ☁️ Upstash High-Performance Cache │
    └───────────────────────────────────┴───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │                        DUAL-RAG RETRIEVAL LAYER                       │
    │   Document RAG (SHA-256 Chunks) + External Evidence RAG (Live Data)   │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │            10-DIMENSION DETERMINISTIC SCORING (100% EXPLAINABLE)      │
    │                     LEGITIFY-SCORE-v2.0 (Weights = 1.0)               │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │             REPORT ASSERTION GUARD & CONTRADICTION ENGINE             │
    │       (Semantic Consistency Verification & Zero False-Positive Guard) │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
    ┌───────────────────────────────────────────────────────────────────────┐
    │               GEMINI DEEP WEB CROSS-EXAMINATION & SYNTHESIS           │
    │    (Evidence Interrogation, Multi-Signal Reasoning, Action Guidance)  │
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
                         26-SECTION AUDIT-GRADE REPORT
```

---

## 📐 10-Dimension Forensic Integrity Grid (LEGITIFY-SCORE-v2.0)

| Dimension | Default Weight | Forensic Analysis Objectives | Authoritative Sources |
|---|---|---|---|
| **1. Document Authenticity** | **10%** | Structural format, header emblems, tamper-evidence, formatting | Deep Learning OCR, Visual Forensics |
| **2. Company Legal Verification** | **15%** | Corporate Identity Number (CIN), active legal standing, RoC jurisdiction | Ministry of Corporate Affairs (MCA21) |
| **3. Domain Security** | **10%** | Domain age, RDAP/WHOIS registry, lookalike typosquatting distance | ICANN RDAP, Authoritative DNS |
| **4. Recruiter Authentication** | **10%** | Corporate domain alignment, public webmail detection, SPF/MX routing | Mail Routing Records, SMTP MX |
| **5. Financial / Fee Safety** | **20%** | Upfront registration charges, caution deposits, training fees, UPI IDs | Document Semantic Miner, Heuristics |
| **6. Certificate Verification** | **5%** | Verification of completion credentials against issuer registries | Certificate Authority & Issuer Lookups |
| **7. ML Fraud Model** | **10%** | Supervised statistical fraud risk score trained on Kaggle job scam corpus | Supervised Linear Classifier |
| **8. Threat Intelligence** | **5%** | Phishing indicators, malware hashes, suspicious redirect chains | VirusTotal v3, AbuseIPDB, Safe Browsing |
| **9. Community Evidence** | **5%** | Corroborating public complaint clusters, reviews, discussion threads | Reddit, LinkedIn, Consumer Complaints |
| **10. Cross-Source Consistency** | **10%** | Inter-evidence contradictions, multi-hop relation validation | Contradiction Engine & Graph Traversal |

---

## 🚀 Quickstart: Running Out-of-the-Box

Follow these simple steps whether you cloned the repository or extracted the downloaded ZIP file.

### Prerequisites
* **Node.js**: v18.0.0 or higher (v20+ recommended)
* **npm**: v9.0.0 or higher
* **Git** (optional if using ZIP)

---

### Step 1: Clone or Extract the Project

**Option A — Via Git Clone:**
```bash
git clone https://github.com/Shri-Sanjaykumar/LeGiTi.git
cd LeGiTi
```

**Option B — Via Downloaded ZIP:**
1. Download `LeGiTi-main.zip` from GitHub.
2. Extract the ZIP to your chosen folder.
3. Open a terminal (PowerShell, Command Prompt, or Bash) in that folder.

---

### Step 2: Install Dependencies

```bash
npm install
```
*This installs all required frontend and backend dependencies, including React 18, Vite, Express, Tsx, Lucide Icons, and OCR tooling.*

---

### Step 3: Setup Environment Variables

Copy the provided template to create your local `.env.local` file:

```bash
cp .env.example .env.local
```
*(On Windows Command Prompt, use `copy .env.example .env.local`)*

Open `.env.local` in your editor and add your API keys:
```env
PORT=3001
VITE_API_URL=http://localhost:3001

# Google Gemini API Key (Required for AI Investigation & Chat Copilot)
GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Supabase / Neon Database (Required for persisting scan reports & audit events)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Threat Intelligence APIs (Recommended for live internet lookups)
VIRUSTOTAL_API_KEY=your_virustotal_key
ABUSEIPDB_API_KEY=your_abuseipdb_key
SAFE_BROWSING_API_KEY=your_google_safe_browsing_key

# Hugging Face Credentials (Optional)
HF_TOKEN=your_hugging_face_token
```

---

### Step 4: Run the Development Server

Start both the backend API and frontend Vite server concurrently with a single command:

```bash
npm run dev
```

* **Frontend Dashboard**: Open [http://localhost:5173](http://localhost:5173) in your browser.
* **Backend API**: Running at [http://localhost:3001](http://localhost:3001).

---

### Step 5: Verify with Automated Tests & Ground Truth Audit

Verify that all engines, OCR pipelines, and scoring models are operating with 100% precision:

```bash
# Run the complete test suite (118 tests across 28 suites)
npm test

# Run the end-to-end ground truth accuracy audit
npm run audit

# Run full test suite and compile production build
npm run verify
```

---

## 🧪 Ground-Truth Benchmark Verification

LeGiTi has been audited against real-world test cases:

```
================================================================
       LEGITIFY RIGOROUS ACCURACY & GROUND TRUTH AUDIT
================================================================

1. REAL FAKE OFFER LETTER (Fee Demand Scam):
   • Input: Welcome Letter_Shri_Sanjaykumar_V_20260317_052819.pdf
   • Detected Company: Clinchsoft Technologies
   • Extracted Fee: ₹1577 via Online Payment Link
   • Trust Score: 1 / 100 (CRITICAL RISK → LIKELY SCAM)
   • Status: Confirmed Fee Trap Caught With Zero Delay

2. 100% GENUINE CORPORATE OFFER LETTER:
   • Input: Infosys Limited Systems Engineer Offer
   • Detected Company: Infosys Limited (CIN: L85110KA1981PLC013115)
   • Compensation: Rs. 4,50,000/- Per Annum (CTC)
   • Anti-Fraud Clause: Correctly identified as warning notice, NOT a fee demand
   • Trust Score: 87 / 100 (LOW RISK → LIKELY LEGITIMATE)
   • Status: Zero False Positives

3. BRAND IMPERSONATION SCAM:
   • Input: IndiGo Ground Staff selection claiming InterGlobe Aviation
   • Recruiter Email: indigo.careers.onboarding@gmail.com
   • Demanded Fee: ₹1,200 UPI interview slot booking
   • Trust Score: 1 / 100 (CRITICAL RISK → LIKELY SCAM)
   • Status: Flagged for Free Webmail + Upfront Fee Demand
================================================================
```

---

## 📁 Project Structure

```
LeGiTi/
├── api/                       # Vercel serverless function entrypoints
│   └── index.ts
├── fake offer letters/        # Reference real-world scam offer letter samples
├── scripts/                   # CLI verification & diagnostic scripts
│   ├── audit_accuracy.ts      # Automated ground-truth audit script
│   ├── diagnose_scoring.ts    # 10-dimension score breakdown inspector
│   └── parse_pdf.cjs          # Fast isolated vector PDF parser
├── src/
│   ├── app/                   # React frontend application
│   │   ├── components/        # UI components (ScanDropzone, Report, Chatbot)
│   │   ├── pages/             # Route pages (Candidate Dashboard, Admin SOC)
│   │   └── hooks/             # Custom React hooks
│   ├── lib/                   # Shared client utilities
│   │   ├── api.ts             # API client for backend communication
│   │   ├── supabase/          # Supabase client instance
│   │   └── forensics/         # Client-side validation helpers
│   ├── server/                # Express backend services
│   │   ├── __tests__/         # 118 automated tests (28 test suites)
│   │   ├── ml/                # Supervised ML model & feature extractor
│   │   ├── rules/             # Rule engine & individual forensic rules
│   │   ├── services/          # Core forensic service pipeline
│   │   │   ├── scanPipeline.ts         # Master 19-stage scan orchestrator
│   │   │   ├── scoringService.ts       # 10-dimension deterministic engine
│   │   │   ├── documentService.ts      # OCR & semantic clause extractor
│   │   │   ├── evidenceFusionEngine.ts # Dual-engine fusion & caps
│   │   │   ├── threatService.ts        # VirusTotal, AbuseIPDB, SafeBrowsing
│   │   │   ├── companyService.ts       # Statutory company registry lookup
│   │   │   ├── domainService.ts        # ICANN RDAP & DNS verification
│   │   │   ├── emailService.ts         # SPF, MX & lookalike domain checker
│   │   │   ├── huggingfaceService.ts   # Hugging Face deep learning models
│   │   │   └── reportAssertionGuard.ts # Semantic assertion validation
│   │   └── index.ts           # Express server entry point (Port 3001)
│   └── types/                 # TypeScript type definitions
├── test_docs/                 # Ground truth test files (PDF, images, text)
├── .env.example               # Complete environment variable template
├── package.json               # Dependencies and npm scripts
├── tsconfig.json              # TypeScript compiler configuration
└── vite.config.ts             # Vite bundler & development configuration
```

---

## 🛠️ Available NPM Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs both backend Express API (`:3001`) and frontend Vite (`:5173`) concurrently |
| `npm run server` | Starts only the backend Express API server |
| `npm run client` | Starts only the Vite frontend development server |
| `npm run build` | Compiles frontend for production into `dist/` |
| `npm test` | Runs all 118 backend unit & integration tests |
| `npm run audit` | Runs the 3-scenario accuracy audit against ground-truth files |
| `npm run verify` | Runs tests and compiles production build in one command |

---

## ⚖️ Statutory Notice & Responsible Disclosure

* **Advisory Platform**: LeGiTi provides algorithmic risk assessments based on available digital evidence. It serves as an investigative assistant and does not replace statutory law enforcement or legal counsel.
* **Fair Recruitment Standard**: Under the **International Labour Organization (ILO) General Principles and Operational Guidelines for Fair Recruitment**, no recruitment fees or related costs should be charged to or borne by workers or jobseekers.
* **National Helplines**: If you have fallen victim to financial fraud via fake employment offers in India, contact the **National Cybercrime Helpline at 1930** or report online at **[cybercrime.gov.in](https://cybercrime.gov.in)**.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
