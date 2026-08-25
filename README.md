
A static, dependency-free portfolio website for **Nazeef Khan**, DevOps Engineer.
Built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

## Project Structure

```text
portfolio/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
└── README.md
```

## Running Locally (no Docker)

Since this is a fully static site, you can open it directly:

```bash
open index.html          # macOS
xdg-open index.html      # Linux
```

Or serve it with any static file server, e.g.:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Running with Docker

```bash
git clone <repository-url>
cd portfolio
docker build -t nazeef-portfolio .
docker run -d -p 8080:80 nazeef-portfolio
```

Visit **http://localhost:8080** in your browser.

## Running with Docker Compose

```bash
docker-compose up -d --build
```

Visit **http://localhost:8080**.

Stop the container with:

```bash
docker-compose down
```

## Customization Notes

- **GitHub / LinkedIn / project links**: currently placeholder `#` links in `index.html`.
  Search for `link placeholder` comments to find and update them.
- **AWS credential verification link**: placeholder in the Certifications section —
  update with the real Credly/AWS verification URL once available.
- **Contact form**: this is a static site with no backend, so the form only validates
  input client-side (`js/script.js`) and shows a message that submission requires a
  backend or an email service. To make it functional, integrate
  [EmailJS](https://www.emailjs.com/) (client-side, no server needed) or point the
  form at a service like [Formspree](https://formspree.io/).
- **Images**: `assets/images/` and `assets/icons/` are provided as empty folders for
  any profile photo, screenshots, or custom icons you want to add later. The current
  design uses inline SVGs and CSS-driven visuals so it works without any images.

## Tech Notes

- No external JS/CSS frameworks — pure HTML/CSS/vanilla JS.
- Fonts loaded from Google Fonts (JetBrains Mono + Inter); swap to self-hosted fonts
  if you need a fully offline build.
- Nginx serves the site with gzip compression, long-lived caching for static assets,
  and a few baseline security headers (see `nginx.conf`).
