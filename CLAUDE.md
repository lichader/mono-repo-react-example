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

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch
```

Tests use Vitest with `@testing-library/react` and jsdom. Test files are co-located with source (`*.test.ts` / `*.test.tsx`).

## Architecture

This is a **modular monolith** using **pnpm workspaces**, following Domain-Driven Design (DDD) principles. Each domain is a bounded context with strict boundaries enforced by lint rules.

### Workspace layout

- `ui-platform/*` — platform-level packages (shell app, shared kernel)
- `domains/*` — feature domain packages (one per team/bounded context)

### Packages

| Package | Name | Role |
|---|---|---|
| `ui-platform/App` | `@rpeng/app` | Shell app — composes domain manifests into the router and renders the nav |
| `ui-platform/Shared` | `@rpeng/shared` | Shared kernel — domain-agnostic UI primitives, auth, and platform types |
| `domains/billing` | `@rpeng/billing` | Billing bounded context |
| `domains/inventory` | `@rpeng/inventory` | Inventory bounded context |

### Domain manifest pattern

Each domain exports a `DomainManifest` (defined in `@rpeng/shared`) containing its routes and nav items. The shell app consumes these via a single registry file.

**To add a new domain:**
1. Create `domains/<name>/` with `package.json`, `tsconfig.json`, and `src/` containing `index.ts`, `manifest.ts`, `routes.tsx`, `paths.ts`
2. Export the manifest and path builders from `index.ts`
3. Add one import + one array entry in `ui-platform/App/src/domains.ts`
4. Add `"@rpeng/<name>": "workspace:*"` to `ui-platform/App/package.json`, run `pnpm install`

No other files need to change. The shell renders nav items and routes automatically from the registry.

### Domain public API convention

A domain's `index.ts` should only export:
1. **Domain manifest** (required) — the `DomainManifest` object consumed by the app shell

Never export: React components, hooks, utilities, path builders, or types. Domains are fully encapsulated — only the shell consumes their exports.

### Cross-domain communication rules

All cross-domain interaction is **URL-driven**. Domains cannot import from other domains (enforced by lint).

| Pattern | Mechanism |
|---|---|
| Navigate to another domain | Use URL strings directly: `<Link to="/cart/checkout">` |
| Reference another domain's data | Anti-Corruption Layer: own types, denormalised backend APIs. Never call another domain's API |
| Embed another domain's UI | Not allowed. Navigate to the other domain's page instead |

### Shared kernel (`@rpeng/shared`) discipline

`@rpeng/shared` must only contain domain-agnostic infrastructure. Fitness test: **"Would this make sense in a completely different product?"** If no, it belongs in a domain.

Contents: UI primitives (Button, etc.), generic hooks (useLocalStorage, etc.), platform types (DomainManifest, NavItem), auth infrastructure (AuthProvider, useAuth, usePermission).

### Auth and permissions

`AuthProvider` in `@rpeng/shared` provides user context. Permissions are domain-scoped strings (e.g., `billing:create-invoice`, `inventory:manage-warehouses`). Use `useAuth()`, `useRequireAuth()`, or `usePermission(key)` hooks.

### Boundary enforcement (lint rules)

Three lint rules enforce the architecture:

1. **`boundaries/dependencies`** — Shared cannot import from domains or app. Domains can only import from shared (not from other domains). App can import from everything.
2. **`import/no-relative-packages`** — No relative path imports between packages.
3. **`no-restricted-imports`** — No deep imports into packages (e.g., `@rpeng/billing/src/...`). Must use the barrel `index.ts`.

### Stack

- React 19, React Router v7, Vite 6
- TypeScript strict mode (`tsconfig.base.json` is extended by all packages)
- ESLint (flat config) with boundaries, import, TypeScript, React plugins
- Prettier for formatting
