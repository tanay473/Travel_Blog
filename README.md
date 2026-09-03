# ⛵ Vignette Voyages

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_/_Express-339933?logo=nodedotjs)](https://nodejs.org/)
[![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-8E75B2?logo=google)](https://deepmind.google/technologies/gemini/)

> **Vignette Voyages** is a next-generation, high-aesthetic travel publishing and community platform designed to bridge authentic travel storytelling with interactive community intelligence. Built with an editorial design system, automated metadata validation, and data-driven route analytics, Vignette Voyages provides an immersive environment for explorers to discover, share, and verify global travel experiences.

---

## 🏛️ Platform Overview

Vignette Voyages transforms traditional travel blogging into an interactive, community-verified ecosystem. The platform emphasizes aesthetic excellence, data integrity, and authentic community insights to help travelers plan, compare, and share meaningful journeys across global destinations.

---

## 🌟 Core Pillars

### 1. 🌐 Global Destination Communities & Specialty Rankings
- **Dedicated Regional Hubs**: Centralized community centers connecting travelers across global destinations.
- **Experience Categorization**: Curated discovery organized into specialty travel pillars: **Cuisine & Dining**, **Stays & Accommodations**, and **Nature & Outdoor Exploration**.
- **Local Highlight Extractions**: Automated highlighting of iconic spots and hidden regional gems.

### 2. 💰 Community Route Budget Analytics
- **Live Spend Benchmarks**: Real-time financial insights comparing author expenditures with aggregated community averages.
- **Interactive Budget Submissions**: Anonymous community logging that continuously updates route savings metrics and traveler statistics.

### 3. 🛡️ Trust, Authenticity & Moderation
- **EXIF-Validated Proof of Travel**: Integrated image metadata parser that validates capture coordinates and timestamps to ensure authentic, on-the-ground reporting.
- **Community Governance**: Reporting framework and content moderation controls to maintain high platform standards and combat spam.

### 4. 🎨 Editorial Canvas & Glassmorphic Interface
- **Refined Color Palette**: Sand & Warm Alabaster visual theme designed for maximum editorial readability.
- **Modern Layout Architecture**: Bento Grid structural layouts, fluid micro-interactions, and responsive media showcases.

### 5. 🤖 Intelligent Content Enrichment
- **Automated Metadata Generation**: AI-assisted semantic tagging, search optimization keywords, and search crawler index formatting.
- **Structured Search Integration**: Built-in Schema.org JSON-LD microdata for search engine discoverability.

---

## 🏗️ System Architecture

```
Vignette Voyages Project
├── travel-blog-backend/             # Node.js & Express API Engine (Port 5000)
│   ├── server.js                    # Core application server
│   └── src/
│       ├── controllers/             # Business logic & data processing
│       ├── models/                  # Database schemas & data models
│       ├── routes/                  # RESTful API endpoints
│       └── services/                # External AI integration services
│
└── travel-blog-frontend/            # React 18 Web Application (Port 3000)
    ├── src/
    │   ├── api/                     # HTTP client service layer
    │   ├── Components/              # Reusable UI components & navigation
    │   ├── Pages/                   # Application routes & layout views
    │   └── styles/                  # Design tokens & glassmorphic system
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js** (v16.0 or higher)
- **npm** (v8.0 or higher)

### 1. Backend Service Setup
```bash
cd travel-blog-backend
npm install
npm start
```
*The backend API initializes on `http://localhost:5000`. If an external database connection is unavailable, the application operates seamlessly using an in-memory fallback dataset.*

### 2. Frontend Application Setup
```bash
cd travel-blog-frontend
npm install
npm start
```
*The web interface will launch automatically at `http://localhost:3000`.*

---

## 🛠️ API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/posts` | `GET` | Retrieve published travel stories with optional filtering |
| `/api/posts/:id` | `GET` | Retrieve detailed story data including route financial insights |
| `/api/posts/verify-exif` | `POST` | Parse and validate photo metadata for proof-of-travel authentication |
| `/api/posts/:id/expenses` | `POST` | Submit anonymous route expenditure data to update community averages |
| `/api/destinations/:destination/community` | `GET` | Retrieve destination hub stories, top experiences, and highlights |
| `/api/posts/experience-ranked` | `GET` | Retrieve stories categorized by travel experience specialty |
| `/api/posts/:id/report` | `POST` | Submit a report for content moderation review |

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
