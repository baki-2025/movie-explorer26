# MovieExplorer26 🎬

> A modern, responsive movie and TV show discovery platform built with **React 19**, **Vite**, and the **TVMaze REST API**.

![React](https://img.shields.io/badge/React-19.3.1-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3.5-646cff?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.18.4-ca4245?logo=react-router&logoColor=white)
![Oxlint](https://img.shields.io/badge/Oxlint-Clean-success?logo=oxc)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- **🔍 Smart Debounced Search**: Real-time searching with a 400ms debounce that queries the TVMaze API dynamically and provides instant feedback.
- **🎭 Genre Filter Chips**: Filter titles across 10+ genres including Drama, Action, Comedy, Science-Fiction, Thriller, Horror, Romance, Crime, Adventure, and Animation.
- **⚡ Flexible Sorting**: Sort shows effortlessly by:
  - ⭐ Top Rated (Highest to Lowest)
  - 🔤 Title (A - Z / Z - A)
  - 📅 Release Year (Newest to Oldest / Oldest to Newest)
- **❤️ Favorites & Watchlist**: Bookmark your favorite movies and TV shows with automatic persistent saving using browser `localStorage`.
- **🎬 Interactive Movie Details Modal**:
  - Full backdrop banner and cover artwork
  - Show status (Running / Ended)
  - Broadcast network / web channel
  - Schedule and air time
  - Formatted overview and storyline
  - Direct link to official site
  - Keyboard accessibility (Escape key to dismiss) and click-outside backdrop close
- **🔥 Trending Highlights on Landing Page**: Hero section with interactive metrics, ambient particle animations, and top-rated preview cards.
- **📱 100% Responsive Design**: Fluid grid layouts that adapt seamlessly from mobile screens to ultra-wide displays.
- **🎨 Glassmorphism & Design System**: Modern dark theme built with CSS custom properties, backdrop-filter blurs, and smooth micro-interactions.
- **🧹 Clean Code & Pure Components**: Zero Oxlint warnings and full compatibility with the React Compiler.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI library with concurrent features and hooks |
| **Vite 8** | Next-generation frontend build tool and dev server |
| **React Router 7** | Client-side routing (`/` and `/movies`) |
| **TVMaze REST API** | Free, open-source TV show and movie metadata API |
| **Modern CSS3** | Custom design tokens, CSS Grid, Flexbox, glassmorphism |
| **Oxlint** | High-performance linter ensuring pure React component patterns |

---

## 📂 Project Structure

```text
movie-explorer/
├── public/
│   ├── favicon.svg          # Custom brand favicon
│   └── icons.svg            # SVG symbol sprite
├── src/
│   ├── assets/              # Static assets & icons
│   ├── components/
│   │   ├── Footer.jsx       # Animated footer with social links & API credit
│   │   ├── Footer.css
│   │   ├── Loader.jsx       # Animated spinner component
│   │   ├── Loader.css
│   │   ├── MovieCard.jsx    # Movie card with poster, rating, & favorite button
│   │   ├── MovieCard.css
│   │   ├── MovieModal.jsx   # Detailed modal with full show metadata
│   │   ├── MovieModal.css
│   │   ├── Navbar.jsx       # Responsive header with mobile toggle & scroll effect
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── HomePage.jsx     # Landing page with hero, stats, and trending preview
│   │   ├── HomePage.css
│   │   ├── MoviesPage.jsx   # Discovery page with search, filters, sort, & grid
│   │   └── MoviesPage.css
│   ├── App.jsx              # Main application layout and route configuration
│   ├── App.css              # Layout utilities
│   ├── index.css            # Global CSS variables, reset, & typography
│   └── main.jsx             # React entry point with BrowserRouter
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/baki-2025/movie-explorer26.git
cd movie-explorer26
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### 5. Run Linter
```bash
npm run lint
```
Runs Oxlint across all project files to ensure code quality and React purity.

---

## 🌐 API Reference

MovieExplorer26 leverages the free and open [TVMaze API](https://www.tvmaze.com/api):
- **All Shows**: `GET https://api.tvmaze.com/shows`
- **Show Search**: `GET https://api.tvmaze.com/search/shows?q={query}`

---

## 📜 Git Commit History

This project was built incrementally across structured commits:

1. `chore: initial project setup with React 19, Vite, and routing configuration`
2. `feat: implement responsive navbar and modern footer components`
3. `feat: create landing page with dynamic hero section and trending preview`
4. `feat: build movie discovery grid with debounced search and loading state`
5. `feat: implement interactive movie details modal with rich metadata`
6. `feat: add genre filter, sort options, favorites watchlist, and documentation`

---

## 📄 License

This project is licensed under the MIT License.
Built with ❤️ by **Abdullah Baki**.
