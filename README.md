# Saikiran - Personal Developer Portfolio

A modern, fast, responsive developer portfolio crafted with **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed for a clean, authentic presentation for placements, internships, and professional opportunities.

---

## 🚀 Quick Setup & Customization Guide

All customization areas in `index.html` are explicitly marked with `<!-- CUSTOMIZATION [1-7] -->` comments for quick one-click edits.

### 1. Profile Photo
- Put your photo inside this folder and name it `profile.jpg`.
- In `index.html`, locate `<!-- CUSTOMIZATION 1: PHOTO -->` in the Hero section and uncomment the `<img>` tag or replace the inner placeholder div.

### 2. Resume
- Place your PDF resume in this folder (e.g. `resume.pdf`).
- In `index.html`, search for `<!-- CUSTOMIZATION 2: RESUME LINK -->` and change `href="#"` to `href="resume.pdf"`.

### 3. GitHub Profile Link
- Search for `<!-- CUSTOMIZATION 3: GITHUB LINK -->` and replace `href="#"` with your GitHub profile URL (e.g. `https://github.com/yourusername`).

### 4. LinkedIn Profile Link
- Search for `<!-- CUSTOMIZATION 4: LINKEDIN LINK -->` and replace `href="#"` with your LinkedIn URL (e.g. `https://linkedin.com/in/yourusername`).

### 5. Email Address
- Search for `<!-- CUSTOMIZATION 5: EMAIL -->` and replace `your.email@example.com` with your actual email address (e.g. `mailto:saikiran@example.com`).
- Also update `const recipientEmail = 'your.email@example.com';` in `script.js` line 167 so the contact form redirects to your inbox.

### 6. Project Live Demo Links
- Search for `<!-- CUSTOMIZATION 6: PROJECT LIVE DEMO LINK -->` on each project card and replace `href="#"` with your live deployment URL (Vercel, Render, etc.).

### 7. Project GitHub Repository Links
- Search for `<!-- CUSTOMIZATION 7: PROJECT GITHUB LINK -->` on each project card and replace `href="#"` with your specific GitHub repository URL.

---

## 📁 Project Structure

```text
port-final/
├── index.html       # Complete semantic structure & content
├── style.css        # Clean CSS design system & responsive media queries
├── script.js        # Vanilla JS interactions (nav, scroll, form, back-to-top)
└── README.md        # Customization guide
```

---

## 🛠️ Features
- **Zero Heavy Frameworks**: Pure HTML5, CSS3, and modern Vanilla JS.
- **Modern Responsive Design**: Fluid typography, responsive grids, and dedicated mobile drawer navigation.
- **Accessible & SEO Ready**: Semantic HTML tags, WCAG AA contrast ratios, and Open Graph metadata.
- **Performance Optimized**: Font Awesome 6 CDN & Google Fonts display swap.
- **Respects Reduced Motion**: Gracefully disables animations if user has `prefers-reduced-motion` enabled.
