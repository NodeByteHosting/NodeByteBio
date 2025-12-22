# Changelog

All notable changes to the NodeByte Hosting website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2025-12-22

### Added

- **Authentication System**: NextAuth v5 integration with credentials provider
- **User Registration**: Registration form with email, username, password fields
- **User Login**: Login form with email/password authentication
- **User Menu**: Dropdown menu showing user info, panel link, admin link, and logout
- **Session Management**: Server-side and client-side session handling
- **Admin Dashboard**: Complete admin panel with Pterodactyl sync statistics
- **Admin Sync Page**: Detailed sync management with live terminal-style logging
- **Admin Users Page**: User management with search, filters, sorting, and pagination
- **Admin Servers Page**: Server listing with status indicators, resource display, and owner info
- **Admin Settings Page**: System configuration with connection testing (WIP alert for other features)
- **Admin Route Protection**: Middleware-based admin authentication checking database directly
- **Admin Panel Responsive**: Mobile-first design with slide-out drawer navigation
- **Admin User Controls**: Language selector, theme toggle, user menu, and back-to-site button in admin panel
- **Admin API Endpoints**: REST endpoints for users, servers, and settings management
- **Pterodactyl Sync Service**: Background sync of users, servers, nodes, locations, allocations, nests, eggs
- **Database Schema**: Prisma models for Users, Servers, Nodes, Locations, Allocations, Nests, Eggs, and more
- **Sync API Endpoints**: GET for stats, POST for triggering syncs with target selection
- **Layout Chrome Component**: Client-side component for conditional nav/footer visibility
- **Language Selector Improvements**: Search functionality, region grouping, ScrollArea for 30 languages
- **Currency Selector Improvements**: Country flag icons using country-flag-icons library
- **Knowledge Base System**: Complete documentation system with markdown support
- **KB Markdown Processing**: Uses remark/rehype pipeline with GFM, syntax highlighting, auto-linking headings
- **KB Categories**: Organized articles by category with metadata and icons
- **KB Article Cards**: Article previews with reading time, tags, and author info
- **KB Search**: Full-text search across all KB articles with relevance scoring
- **KB Table of Contents**: Sticky sidebar TOC with scroll spy highlighting
- **KB Sidebar Navigation**: Collapsible category navigation with article links
- **KB Breadcrumbs**: Navigation breadcrumbs for category and article pages
- **KB Previous/Next Navigation**: Article-to-article navigation within categories
- **KB Navigation Link**: Added Knowledge Base link to desktop and mobile navigation
- **Tailwind Typography**: Added `@tailwindcss/typography` plugin for prose styling
- **Getting Started Articles**: Introduction, Quick Start Guide, Game Panel Tutorial
- **Minecraft Guides**: Server Software selection guide, Installing Plugins guide
- **Rust Guides**: Getting Started with Rust, Oxide/uMod Installation guide
- **Billing Guides**: WHMCS Client Portal overview and account management
- **Syntax Highlighting**: Code block styling for documentation with hljs classes
- **Theme Toggle**: Categorized theme selector with Base, Cool Tones, Warm Tones, and Nature categories
- **Theme Swatches**: Color preview swatches for each theme option
- **Navigation Dropdowns**: Services and Resources dropdown menus with hover-to-open functionality
- **Animated Chevrons**: Chevron icons rotate based on dropdown open/closed state
- **Hero Stats**: Animated statistics cards displaying uptime, latency, and support availability
- **SLA Counter**: Animated number counter displaying 99.6% SLA guarantee
- **Features Highlights**: Feature cards now include detailed highlight lists with checkmark icons
- **About Stats Grid**: Statistics section showing SLA, latency, support hours, and server count
- **FAQ Search**: Search input for filtering FAQ questions
- **FAQ CTA Section**: "Still have questions?" section with contact and Discord buttons
- **Games Section Icons**: Dedicated icons for each game server type (Minecraft, Rust, Hytale, Coming Soon)
- **Games Feature Lists**: Each game card now displays key features with checkmark icons
- **Games Banner Images**: Minecraft and Rust cards now use banner images from public directory
- **Hytale Hosting**: Added Hytale game server hosting card to the games section
- **Footer Status Indicator**: Live status indicator linking to status page
- **Footer Link Categories**: Organized footer links with category icons
- **Contact Page Redesign**: Complete redesign with support channels, email grid, and social links
- **Contact Social Links**: Follow us section with X, GitHub, Discord, and Trustpilot links
- **Contact Discord Notice**: Important notice about Discord support limitations moved to prominent position
- **Dynamic Logo Component**: SVG logo that respects theme accent colors and light/dark mode
- **Currency System**: Multi-currency support with GBP as base currency (USD, EUR, CAD, AUD)
- **Currency Selector**: Global currency dropdown in navigation (desktop and mobile)
- **Price Component**: Auto-converting price display component using selected currency
- **Internationalization**: Added `next-intl` for multi-language support
- **Language Selector**: Global language dropdown with flag icons in navigation
- **Translation Files**: English, German, French, and Spanish translations
- **External Translations**: Support for loading translations from external GitHub repo
- **Crowdin Integration**: Configuration for community translation contributions
- **Dedicated Game Pages**: Individual pages for Minecraft, Rust, and Hytale hosting
- **Game Hero Component**: Reusable hero section for game pages with banners and features
- **Game Features Component**: Reusable features grid with icon mapping for server components
- **Game Pricing Component**: Reusable pricing cards with currency conversion
- **Game FAQ Component**: Reusable FAQ accordion for game-specific questions

### Changed
- **Packages**: Updated next.js to version `16.0.10` to address the latest CVE
- **Project Structure**: Reorganized codebase into `packages/` directory for better modularity
  - `packages/core/` - Shared hooks (`use-currency`, `use-locale`, `use-mobile`, `use-toast`) and utilities (`currency`, `translations`, `utils`)
  - `packages/i18n/` - Internationalization configuration and request handling
  - `packages/ui/` - All UI components, layouts, and shadcn/ui primitives
- **Navigation**: Replaced NavigationMenu with DropdownMenu components for improved reliability
- **Navigation Mobile**: Redesigned with accordion-style dropdowns (only one open at a time)
- **Navigation Settings**: Added Language, Currency, and Theme selectors to mobile menu
- **Layout Structure**: Moved Navigation and Footer to root layout for site-wide consistency
- **Layout Providers**: Added `CurrencyProvider`, `LocaleProvider`, and `NextIntlClientProvider`
- **Layout Chrome**: Nav/footer visibility now handled by client component using `usePathname()` for proper client-side navigation support
- **Translation Loading**: Changed from dynamic imports to static imports for all 30 locale files (bundler compatibility)
- **Admin Panel Layout**: Redesigned with responsive sidebar that becomes a drawer on mobile
- **Admin Dashboard**: Responsive stat cards with 2-column grid on mobile
- **Theme Toggle Layout**: Themes now displayed in organized grid layouts by category
- **Hero Section**: Complete redesign with gradient text, glassmorphism cards, and Trustpilot integration
- **Features Section**: Redesigned with badge header, gradient text, and enhanced card styling
- **About Section**: Redesigned with stats grid, value proposition cards, and gradient headers
- **FAQ Section**: Redesigned with animated accordions, search functionality, and cleaner single-column layout
- **Games Section**: Redesigned with banner images, feature lists, and consistent card heights
- **Contact Page**: Redesigned with gradient background, animated orbs, and organized support channels
- **Footer**: Complete redesign with two-section layout, categorized links, and dynamic Logo component
- **Footer Logo**: Now uses dynamic Logo component that respects theme colors
- **Card Styling**: Unified glassmorphism effect (`bg-card/30 backdrop-blur-sm border-border/50`) across all components
- **Button Styling**: Consistent rounded button styles with proper hover states
- **Section Spacing**: Standardized padding (`py-24 sm:py-32`) across all homepage sections
- **Pricing Display**: All prices now stored in GBP and auto-convert based on user's currency preference

### Fixed

- **Hydration Error**: Resolved React hydration mismatch in `layout.tsx` caused by `colorScheme` style attribute
- **Navigation Dropdowns**: Fixed dropdown content not loading and alignment issues
- **Theme Persistence**: Themes now properly persist across page reloads
- **Mobile Menu Bleed-through**: Fixed Discord button bleeding through mobile navigation overlay
- **Server Component Serialization**: Fixed icon props passing between Server and Client components using string-based icon mapping
- **i18n Client/Server Split**: Separated shared locale config from server-only request handling to prevent build errors
- **Translation System**: Fixed translations not switching languages due to wrong import path and dynamic import issues
- **Admin Nav/Footer Visibility**: Fixed nav/footer sometimes showing on admin pages or staying hidden after leaving admin

### Removed

- **HeroGraphic Sidebar**: Removed from FAQ section for cleaner layout
- **colorScheme Logic**: Removed from layout.tsx to prevent hydration errors
- **Inline Pricing Currency**: Removed currency selector from individual pricing sections (now global in nav)

## [3.0.0] - Initial Rewrite

Initial Next.js 15 website with App Router, shadcn/ui components, and multi-theme support.

---

[3.1.0]: https://github.com/NodeByteHosting/website/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/NodeByteHosting/website/releases/tag/v3.0.0
