# NodeByte Links

A modern, stylish "Link in Bio" website for NodeByte Hosting your one stop hub for quick links, FAQs, and social connections.

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## ✨ Features

### 🔗 Link in Bio
- Clean, modern interface for all your important links
- Quick access to main website, game hosting, client area, and more
- Categorized sections for easy navigation
- External link indicators

### 🎨 Customizable Themes
- **16+ built-in themes** including Dark, Light, Ocean, Forest, Rose, and more
- Seasonal themes (Christmas, New Year)
- Special themes (Stranger Things inspired)
- Theme persistence via cookies

### ⚙️ User Settings Modal
- **Theme Selection** — Browse and switch themes with visual previews
- **Layout Options** — Choose link styles (Default, Rounded, Pill, Minimal, Glassmorphism)
- **Size Controls** — Compact, Default, or Large link sizes
- **Typography** — Font family selection and size scaling (80-120%)
- **Accessibility** — Reduce motion option, toggle descriptions/icons
- All settings saved to localStorage

### 📊 Live Status Integration
- Real-time status indicator on profile avatar
- Fetches from [nodebytestat.us](https://nodebytestat.us)
- Shows operational status, incidents, and maintenance
- Auto-refreshes every 60 seconds

### 🌐 Social Links
- Discord, Twitter/X, GitHub, Trustpilot, Email
- Hover animations and tooltips
- Easy to customize

### ❓ FAQ Section
- Expandable accordion for common questions
- Smooth animations
- Easy to update content

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) (recommended)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NodeByteHosting/links.nodebyte.host.git
   cd links.nodebyte.host
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS |
| [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management |
| [Lucide React](https://lucide.dev/) | Beautiful icons |
| [Bun](https://bun.sh/) | Fast JavaScript runtime & package manager |

## 📁 Project Structure

```
links.nodebyte.host/
├── app/
│   ├── api/
│   │   └── status/          # Status API proxy
│   ├── page.tsx             # Main Link in Bio page
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles & themes
├── packages/
│   ├── core/
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # Utility functions
│   └── ui/
│       └── components/
│           ├── Layouts/
│           │   └── Links/   # Link in Bio components
│           ├── Static/      # Navigation & Footer
│           └── ui/          # Shared UI components
├── public/                  # Static assets
└── ...config files
```

## 🎨 Customization

### Adding New Links

Edit the `quickLinks` and `resourceLinks` arrays in [app/page.tsx](app/page.tsx):

```tsx
const quickLinks = [
  {
    href: "https://example.com",
    title: "My New Link",
    description: "Description here",
    icon: SomeIcon,
    external: true,
    featured: false, // Set true for highlighted style
  },
  // ...
]
```

### Adding New Themes

Add theme definitions in [app/globals.css](app/globals.css):

```css
.mytheme {
  --background: 0 0% 10%;
  --foreground: 0 0% 98%;
  --primary: 200 100% 50%;
  /* ... other variables */
}
```

Then register in the theme toggle component.

### Updating FAQ

Edit the `faqs` array in [packages/ui/components/Layouts/Links/links-faq.tsx](packages/ui/components/Layouts/Links/links-faq.tsx).

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server with Turbopack |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 🔒 Security

For security concerns, please see our [Security Policy](SECURITY.md).

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0** — see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [nodebyte.host](https://nodebyte.host)
- **Status**: [nodebytestat.us](https://nodebytestat.us)
- **Discord**: [discord.gg/nodebyte](https://discord.gg/nodebyte)
- **Twitter**: [@NodeByteHosting](https://twitter.com/NodeByteHosting)
- **GitHub**: [NodeByteHosting](https://github.com/NodeByteHosting)

---

<p align="center">
  Made with ❤️ by <a href="https://nodebyte.host">NodeByte Hosting</a>
</p>
