# Elsayed Ashraf — Portfolio Website

A modern, dark-themed portfolio built with pure HTML5, CSS3, and Vanilla JavaScript.
Designed for Data Engineering & ML Engineering roles.

---

## 🗂️ Folder Structure

```
portfolio/
├── index.html              ← Main HTML file
├── README.md               ← This file
└── assets/
    ├── css/
    │   └── style.css       ← All styles (dark/light theme, responsive)
    ├── js/
    │   └── script.js       ← Animations, interactions, counters
    └── images/             ← Add your own images/screenshots here
        └── (empty — add project screenshots here)
```

> **Important:** Place your CV PDF at `assets/Elsayed_Ashraf_CV.pdf` for the download button to work.

---

## 🚀 Deploy on GitHub Pages

### Step 1 — Create a GitHub repository

```bash
# Suggested repository name:
elsayedashraf05.github.io

# This will give you the URL: https://elsayedashraf05.github.io
```

### Step 2 — Initialize git and push

```bash
cd portfolio
git init
git add .
git commit -m "🚀 Initial portfolio launch"
git branch -M main
git remote add origin https://github.com/elsayedashraf05/elsayedashraf05.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save**
5. Wait 1-2 minutes, then visit: `https://elsayedashraf05.github.io`

---

## 📁 Add Your CV

1. Export your CV as a PDF
2. Name it: `Elsayed_Ashraf_CV.pdf`
3. Place it in: `assets/Elsayed_Ashraf_CV.pdf`
4. The "Download CV" button in the navbar and hero will work automatically

---

## 🖼️ Add Project Screenshots (Optional)

To add real screenshots to your project cards:

1. Take a screenshot of your project (e.g. Streamlit app)
2. Save as PNG/WebP in `assets/images/`
3. In `index.html`, find the relevant `project-visual` div
4. Add an `<img>` tag inside it

---

## 🎨 Customization

### Change accent color
In `assets/css/style.css`, find:
```css
--accent: #00d4ff;
```
Change to your preferred color (e.g., `#00ff88` for green, `#7c3aed` for purple).

### Add/remove sections
Each section has a clear `<!-- ===== SECTION ===== -->` comment in `index.html`.

### Update project GitHub links
Search for `https://github.com/elsayedashraf05` in `index.html` and replace with your specific repo URLs.

---

## ✅ Feature Checklist

- [x] Dark/light theme toggle (saved to localStorage)
- [x] Fully responsive (mobile-first)
- [x] Sticky navbar with active section highlight
- [x] Smooth scroll animations (Intersection Observer)
- [x] Animated skill progress bars
- [x] Animated counters in hero stats
- [x] Hamburger menu for mobile
- [x] Contact form with mailto
- [x] Back to top button
- [x] SEO meta tags + OpenGraph + JSON-LD structured data
- [x] Accessible (ARIA labels, keyboard navigation, reduced motion)
- [x] Mouse parallax on hero glows

---

## 💡 Suggested Future Improvements

1. **Add a blog** — Document your ML learning journey on Dev.to and link it
2. **GitHub API integration** — Fetch real star counts from your repos dynamically
3. **Project screenshots** — Add real visuals from your Streamlit app and projects
4. **Formspree integration** — Replace mailto with Formspree for a real contact form backend
5. **Analytics** — Add Plausible or simple Google Analytics to track visitors
6. **CV auto-update** — Link to a Google Drive hosted PDF for always-current CV
7. **Dark mode OS preference detection** — Auto-detect `prefers-color-scheme`

---

## 🌐 Suggested Domain

```
elsayedashraf.dev          ← Recommended (.dev is perfect for engineers)
sayed.engineer             ← Alternative
elsayedashraf05.github.io  ← Free, always available
```

---

## 📬 Contact

Built for **Elsayed Ashraf Ramadan Bakry**
- Email: sayedworkacc@gmail.com
- GitHub: github.com/elsayedashraf05
- LinkedIn: linkedin.com/in/elsayed-ashraf-bakry