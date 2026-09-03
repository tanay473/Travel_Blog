# ✈️ Wanderlust Travel Blog Platform

A full-stack travel platform featuring **Destination Community Hubs**, **Experience Ranking** (Cuisine, Stay, Nature), **AI-Powered Story Tagging**, **User Ethics Moderation**, and a **Light Magazine Web Interface**.

---

## ✨ Features

- **🏝️ Destination Communities**: Dedicated community hubs for worldwide hotspots (Interlaken, Kyoto, Amalfi, Marrakech, Bali, Maldives, Santorini, Patagonia).
- **🍱 Experience Ranking**: Filter and rank travel stories by experience focus (`Cuisine 🍱`, `Stay 🏨`, `Nature 🏔️`) sorted by community engagement (likes & views).
- **📍 Unique Spot Highlights**: Smart extraction of iconic spots mentioned in stories (e.g. *"Lauterbrunnen 72 Waterfalls Valley"*, *"300-Year-Old Gion Tea House"*).
- **🎨 Premium Light UI**: Clean, responsive layout with warm neutral tones, frosted-glass card styling, and video hero motion.
- **🚩 User Ethics & Moderation**: Integrated post reporting system and account ban enforcement to protect community standards.
- **🤖 Backend AI Tagging**: Express API integrated with `@google/genai` (Gemini Flash) with automatic in-memory fallback for local development.

---

## 🏗️ System Architecture

```
Project Root/
├── travel-blog-backend/     # Node.js & Express API Server (Port 5000)
│   ├── server.js            # Entry point & CORS configuration
│   └── src/
│       ├── controllers/     # postController.js (Communities, Ranking, Moderation, Fallback)
│       ├── models/          # Post.js & User.js Mongoose Schemas
│       ├── routes/          # API Route endpoints (/api/destinations, /api/posts)
│       └── services/        # geminiService.js (AI Tag & Highlight Extraction)
└── travel-blog-frontend/    # React Single Page Application (Port 3000)
    ├── src/Pages/           # DestinationCommunityPage, HomePage, SingleBlogPostPage
    ├── src/styles/          # Light design system CSS files
    └── src/api/             # blogApi.jsx client module
```

---

## ⚡ Quick Start

### 1. Backend Server
```bash
cd travel-blog-backend
npm install
npm start
# Runs on http://localhost:5000
```

### 2. Frontend Web Application
```bash
cd travel-blog-frontend
npm install
npm start
# Runs on http://localhost:3000
```
