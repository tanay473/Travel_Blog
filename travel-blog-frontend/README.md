# 🌍 Wanderlust Travel Blog — Modern Web Frontend

A modern, responsive travel magazine web application featuring destination community hubs, experience-based story ranking (Cuisine 🍱, Stay 🏨, Nature 🏔️), unique spot extraction, and an ethics reporting system.

---

## 🌟 Key Highlights & Features

- **🎨 Premium Light Aesthetic**: Elegant, clean typography with soft neutral tones, magazine-style glassmorphism cards, and fluid micro-animations.
- **🏝️ Destination Community Hubs**: Dedicated community pages (`/destinations/:name`) grouping real travel stories, local highlights, and vibrant community discussions.
- **✨ Experience Ranking Filters**: Dynamic sorting and filtering of travel stories by experience focus:
  - **🍱 Cuisine**: Food tours, street markets, local dining, traditional dishes.
  - **🏨 Stay**: Luxury resorts, traditional ryokans, desert riads, overwater villas.
  - **🏔️ Nature**: Alpine hiking, waterfalls, coastal trails, northern lights, glaciers.
- **📍 Unique Spot Highlights**: Auto-extracted viral and iconic destination highlights (e.g., *"Hanifaru Bay Manta Rays"*, *"300-Year-Old Gion Tea House"*).
- **🚩 Ethics & Community Moderation**: Built-in user reporting modal (`Report Ethics Violation`) and user ban suppression system to maintain high community standards.
- **📱 Dynamic Video Hero**: Full-bleed ambient motion background hero section with live search capability.

---

## 🛠️ Project Structure

```
travel-blog-frontend/
├── public/                  # Index HTML, PWA manifests, icons
└── src/
    ├── api/
    │   └── blogApi.jsx      # API client for backend communication
    ├── Components/
    │   ├── BlogPostCard.jsx # Article card with category & experience tags
    │   ├── Footer.jsx       # Global footer navigation
    │   ├── Header.jsx       # Navigation bar with responsive mobile menu
    │   ├── LoadingSpinner.jsx
    │   └── NewsletterSignup.jsx
    ├── Pages/
    │   ├── AboutPage.jsx
    │   ├── BlogPostsPage.jsx
    │   ├── ContactPage.jsx
    │   ├── CreatePostPage.jsx             # Story publishing with tag suggestions
    │   ├── DestinationCommunityPage.jsx   # Destination community hub & experience filters
    │   ├── DestinationsPage.jsx           # Global hotspot directory
    │   ├── HomePage.jsx                   # Video hero, search, & featured stories
    │   └── SingleBlogPostPage.jsx         # Full article view, author contact, & report modal
    └── styles/              # Light-theme CSS design system and page modules
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```
The application will open automatically at `http://localhost:3000`.

---

## 🛠️ Technology Stack
- **Framework**: React 18, React Router v6
- **Styling**: Vanilla CSS3, Design Tokens, Glassmorphism, FontAwesome Icons
- **HTTP Client**: Axios & Fetch API
