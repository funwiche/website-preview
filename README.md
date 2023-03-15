# Website Preview

Scrap website for meta data and capture a website screenshot.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
# yarn
yarn dev

# npm
npm run dev
```

## Meta Tags Preview

Preview how your webpage will look on Google, Facebook, Twitter and more!

## Screenshot

Generate a full web-page screenshot for desktop, tablet or mobile

```javascript
fetch("/api/meta", {
  method: "POST",
  body: {
    url: "https://github.com",
  },
})
  .then((res) => res.json())
  .then((json) => console.log(json));
```

#### Results

```json
{
  "name": "GoDaddy",
  "origin": "https://godaddy.com",
  "domain": "godaddy.com",
  "title": "Noms de domaine, Sites Web, Outils de marketing en ligne et d’hébergement - GoDaddy FR",
  "description": "Votre solution tout en un pour évoluer en ligne. Commencez un essai gratuit pour créer un site Web magnifique, acheter un nom de domaine, un hébergement rapide, un marketing en ligne et un support technique primé.",
  "image": "https://img1.wsimg.com/cdn/Image/All/All/2/en-US/be0a3335-75ef-4e1a-b8c7-12a82706ce4d/og-godaddy.jpg",
  "favicon": "https://godaddy.com//img6.wsimg.com/ux/favicon/favicon-16x16.png",
  "pathname": "/"
}
```

#### Example code

```javascript
fetch("/api/meta", {
  method: "POST",
  body: {
    url: "https://github.com",
    device: "desktop", // (desktop, tablet, mobile)
    fullPage: false, // (true, false)
  },
})
  .then((res) => res.json())
  .then((json) => console.log(json));
```

#### Results

```json
{
  "image": "/screenshots/github.com.png"
}
```
