# ⛵ Vignette Voyages — Next-Gen Travel Platform

> **Vignette Voyages** is a modern editorial travel platform designed to bridge authentic storytelling, community-driven insights, and immersive visual design. It provides a transparent, verified space where travelers can document genuine journeys, discover regional cultures, and exchange realistic route insights through an elegant, tactile reading experience.

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

### 4. Liquid Glassmorphic Aesthetic
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
