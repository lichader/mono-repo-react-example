# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Lint
pnpm lint

# Format
pnpm format

# Type check (all packages)
pnpm typecheck

# Clean all build artifacts and node_modules
pnpm clean
```

There are no tests configured yet.

## Architecture

This is a **pnpm workspaces monorepo** with two workspace roots:

- `ui-platform/*` — platform-level packages
- `domains/*` — feature domain packages

### Packages

| Package | Name | Purpose |
|---|---|---|
| `ui-platform/App` | `@rpeng/app` | Vite entry point; composes all domain routes into the React Router tree |
| `ui-platform/Shared` | `@rpeng/shared` | Shared React components and hooks consumed by domain packages |
| `domains/billing` | `@rpeng/billing` | Billing feature; exports `billingRoutes` |
| `domains/inventory` | `@rpeng/inventory` | Inventory feature; exports `inventoryRoutes` |

### Routing pattern

Domain packages export a `RouteObject[]` array (e.g. `billingRoutes`, `inventoryRoutes`). `ui-platform/App/src/main.tsx` imports these and spreads them as children of the root `App` layout route. To add a new domain:

1. Create a new package under `domains/` with its own `routes.tsx` exporting a `RouteObject[]`.
2. Import and spread the routes in `main.tsx`.

### Stack

- React 19, React Router v7, Vite 6
- TypeScript strict mode (`tsconfig.base.json` is extended by all packages)
- ESLint (flat config) with TypeScript, React, react-hooks, and react-refresh plugins
- Prettier for formatting
