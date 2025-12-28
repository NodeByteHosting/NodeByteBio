# Contributing to NodeByte Links

First off, thank you for considering contributing to NodeByte Links! 🎉

This document provides guidelines and information about contributing to this project. Following these guidelines helps communicate that you respect the time of the developers managing and developing this open source project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. By participating, you are expected to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR_USERNAME/links.nodebyte.host.git
   cd links.nodebyte.host
   ```
3. **Add the upstream remote**
   ```bash
   git remote add upstream https://github.com/NodeByteHosting/links.nodebyte.host.git
   ```
4. **Create a branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots, etc.)
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (OS, browser, Node version)

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:

- **A clear and descriptive title**
- **A detailed description** of the proposed feature
- **Explain why this feature would be useful**
- **Include mockups or examples** if applicable

### 🔧 Pull Requests

We actively welcome pull requests for:

- Bug fixes
- New features
- Documentation improvements
- Code refactoring
- New themes
- Accessibility improvements
- Performance optimizations

## Development Setup

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Run linting
bun lint

# Build for production
bun build
```

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── page.tsx           # Main page
│   └── layout.tsx         # Root layout
├── packages/
│   ├── core/              # Core utilities and hooks
│   └── ui/                # UI components
│       └── components/
│           ├── Layouts/   # Page layout components
│           │   └── Links/ # Link in Bio specific components
│           └── ui/        # Shared UI primitives
└── public/                # Static assets
```

## Pull Request Process

1. **Ensure your code follows the style guidelines**
2. **Update documentation** if you're changing functionality
3. **Add or update tests** if applicable
4. **Make sure all checks pass** (linting, build)
5. **Write a clear PR description** explaining your changes

### PR Title Format

Use conventional commit format for PR titles:

- `feat: add new glassmorphism theme`
- `fix: resolve status badge flickering`
- `docs: update README with new features`
- `style: improve mobile responsiveness`
- `refactor: simplify theme switching logic`
- `chore: update dependencies`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## How Has This Been Tested?
Describe testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project style guidelines
- [ ] I have performed a self-review
- [ ] I have added necessary documentation
- [ ] My changes generate no new warnings
```

## Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

### React/Next.js

- Use functional components with hooks
- Follow the App Router conventions
- Use `"use client"` directive only when necessary
- Keep components focused and reusable

### CSS/Tailwind

- Use Tailwind CSS utility classes
- Follow the existing theme system using CSS variables
- Ensure responsive design (mobile-first)
- Maintain dark/light mode compatibility

### File Naming

- React components: `PascalCase.tsx` (e.g., `LinkButton.tsx`)
- Utilities/hooks: `kebab-case.ts` (e.g., `use-toast.ts`)
- Config files: `kebab-case` (e.g., `tailwind.config.ts`)

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |
| `ci` | CI/CD changes |

### Examples

```bash
feat(themes): add cyberpunk theme variant
fix(status): handle null response from status API
docs(readme): add deployment instructions
style(links): improve hover animations
refactor(settings): extract theme section to separate component
```

## Questions?

Feel free to reach out:

- **Discord**: [discord.gg/nodebyte](https://discord.gg/nodebyte)
- **GitHub Issues**: For bugs and feature requests
- **Email**: support@nodebyte.host

---

Thank you for contributing! 🚀
