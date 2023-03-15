# Website Preview

Scrap website for meta data and capture a website screenshot. Rich user interface to make any kind of web-site preview and screenshots online for free with no limits.

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
  "name": "GitHub",
  "origin": "https://github.com",
  "domain": "github.com",
  "title": "GitHub: Let’s build from here · GitHub",
  "description": "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, power your CI/CD and DevOps workflows, and secure code before you commit it.",
  "image": "https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png",
  "favicon": "https://github.githubassets.com/favicons/favicon.svg",
  "pathname": "/"
}
```

## Screenshot

Generate a full web-page screenshot for desktop, tablet or mobile

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
  "screenshot": "/screenshots/desktop.github.com.png"
}
```
