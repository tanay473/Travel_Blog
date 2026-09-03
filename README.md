# ⛵ Vignette Voyages — Next-Gen Travel Platform

> **Vignette Voyages** is a modern, high-aesthetic travel publishing platform engineered with **iOS 18 Liquid Glassmorphism**, **Destination Community Hubs**, **Experience Specialty Ranking**, **Live Route Expense Analytics**, **User Ethics Moderation**, and **AI Semantic Tagging**.

---

## 🌟 Executive Key Highlights

### 1. 📊 Live Route Expense Comparisons & Community Math
- **Author vs. Community Budget Bar**: Compare author route expenditure (e.g., `₹40,000`) directly against live community traveler averages (e.g., `₹33,000`).
- **Anonymous 1-Click Spend Logger**: Readers can anonymously log what they actually spent on a route, instantly updating live community savings percentages and contributor statistics.

### 2. 🏝️ Destination Community Hubs
- **Hotspot Community Centers**: Dedicated community pages (`/destinations/:destination`) gathering localized travel logs, community discussions, and top-voted experience stories.
- **Unique Spot Highlights**: Automatic extraction of iconic local highlights (e.g., *"300-Year-Old Gion Tea House"*, *"Hanifaru Bay Manta Rays"*, *"72 Waterfalls Valley"*).

### 3. 🍱 Experience Specialty Ranking
- Filter and rank travel stories across three distinct travel experience pillars:
  - **🍱 Cuisine & Dining**: Street food crawls, market tasting tours, Kaiseki dinners, mountain chalets.
  - **🏨 Stays & Resorts**: Glass-floor overwater villas, desert riads, private onsens, cliffside eco-lodges.
  - **🏔️ Nature & Hiking**: Alpine glacier trails, northern lights, volcanic craters, turquoise lake canoeing.

### 4. 🍏 iOS 18 Liquid Glassmorphic Aesthetic
- **Sand & Warm Alabaster Palette**: Clean editorial canvas (`#fbf9f5` base, warm terracotta `#c2593f` & forest emerald `#137547` accents).
- **Specular Glass Icons**: Squircle app icons with top specular lighting, inner drop shadows, and spring-physics hover micro-interactions (`backdrop-filter: blur(20px) saturate(180%)`).
- **Immersive Video Hero Slider**: Interactive scene switcher with dynamic background motion.

### 5. 🚩 User Ethics & Moderation System
- Built-in post reporting dialog (`Report Ethics Violation`) and user ban enforcement system (`isBanned: true`), instantly suppressing unethical user content.

### 6. 📸 EXIF-Validated Proof of Travel
- **Automated GPS & Metadata Verification**: Parses photo EXIF headers for location coordinates (`latitude`/`longitude`), capture date, and camera device information to verify travelers physically visited the destination.
- **Proof Badging**: Displays a verified trust badge (`📸 Proof of Travel Verified • Trust Score 99%`) on story cards and article headers to prevent spam and maintain high platform authenticity.

### 7. 🤖 Automatic AI Story Tagging & SEO Microdata
- Integrated with `@google/genai` (Gemini Flash) for automated extraction of semantic topic tags, search keywords, meta snippets, and Schema.org JSON-LD structured microdata.

---

## 🏗️ Technical Architecture

```
Vignette Voyages Project/
├── travel-blog-backend/             # Node.js & Express API Engine (Port 5000)
│   ├── server.js                    # CORS setup & server bootstrapping
│   └── src/
│       ├── controllers/
│       │   └── postController.js    # EXIF Verification, Expense Math, Communities, Ranking, Moderation
│       ├── models/
│       │   ├── Post.js             # Mongoose schema (exifData, authorSpent, communityExpenses, experienceType)
│       │   └── User.js             # User moderation schema (isBanned, banReason, reports)
│       ├── routes/
│       │   └── posts.js            # API endpoints (/api/posts, /api/posts/verify-exif, /api/destinations)
│       └── services/
│           └── geminiService.js    # AI tagging & unique highlight extraction
│
└── travel-blog-frontend/            # React 18 Single Page Web Application (Port 3000)
    ├── src/
    │   ├── api/
    │   │   └── blogApi.jsx          # Client HTTP service module
    │   ├── Components/              # Header, Footer, BlogPostCard, Newsletter, LoadingSpinner
    │   ├── Pages/
    │   │   ├── HomePage.jsx                 # Video hero slider, Bento Grid, featured stories
    │   │   ├── DestinationsPage.jsx         # Bento Grid destination directory
    │   │   ├── DestinationCommunityPage.jsx # Destination community hub & experience filters
    │   │   ├── SingleBlogPostPage.jsx       # Article reader, EXIF Badge, Live Expense Math Card
    │   │   ├── CreatePostPage.jsx           # Story publishing, EXIF Metadata Parser, experience selector
    │   │   ├── BlogPostsPage.jsx            # Filterable story library
    │   │   ├── AboutPage.jsx                # Platform story & brand mission
    │   │   └── ContactPage.jsx              # Community contact portal
    │   └── styles/                      # Sand/Alabaster theme & iOS 18 glass CSS system
```

---

## ⚡ Quick Installation & Setup

### Prerequisites
- **Node.js**: v16+
- **npm**: v8+

### 1. Start the Backend API Server
```bash
cd travel-blog-backend
npm install
npm start
```
*The server will run on `http://localhost:5000`. If MongoDB is offline, it automatically operates with an in-memory fallback store populated with 18 sample stories.*

### 2. Start the Frontend Web Application
```bash
cd travel-blog-frontend
npm install
npm start
```
*The React application will open automatically at `http://localhost:3000`.*

---

## 🛠️ API Reference Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/posts` | Fetch all stories (supports `?category=`, `?tag=`, `?search=`) |
| `GET` | `/api/posts/:id` | Fetch single story with computed `expenseInsights` and `exifData` |
| `POST` | `/api/posts/verify-exif` | Parse & verify photo EXIF GPS coordinates and capture date |
| `POST` | `/api/posts/:id/expenses` | Anonymously log route spent amount & update community math |
| `GET` | `/api/destinations/:destination/community` | Fetch destination hub stories, top experiences, and highlights |
| `GET` | `/api/posts/experience-ranked` | Fetch stories ranked by experience type (`Cuisine`, `Stay`, `Nature`) |
| `POST` | `/api/posts/:id/report` | Report a story for ethics review |
| `POST` | `/api/users/:userId/ban` | Ban an unethical user and suppress their published content |

---

