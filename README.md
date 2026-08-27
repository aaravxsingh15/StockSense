# StockSense

**Predict demand. Prevent stock-outs. Optimize inventory.**

StockSense is a multi-tenant demand-intelligence and inventory-optimization SaaS for retail and quick-commerce operators. The current product slice includes a polished operations command center, deterministic persisted-data-ready intelligence engine, demand forecasts, inventory risk, reorder recommendations, live alerts, store health, REST health/summary/refresh endpoints, and a normalized PostgreSQL schema.

## Architecture

- Next.js App Router + React + TypeScript
- Route Handlers for public REST endpoints; Server Components for initial reads
- PostgreSQL and Prisma schema with organization-scoped entities and indexes
- Recharts visualization and responsive custom design system
- Open-Meteo is the designated weather provider; operational quick-commerce records are simulated for demonstration and never presented as proprietary data

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The dashboard runs in deterministic demo mode when `DATABASE_URL` is absent. Configure a PostgreSQL URL and run `npx prisma migrate dev` before enabling persistence-backed services.

## API

- `GET /api/health`
- `GET /api/dashboard/summary`
- `POST /api/refresh`

## Inventory logic

`recommended reorder = max(0, predicted demand + safety stock - available inventory)`

Risk is derived from forecast coverage, not assigned randomly. Forecast demo series use controlled deterministic variation, so browser refreshes do not invent unrelated datasets.

## Security and SaaS model

The schema places `organizationId` on operational records and models membership roles (`OWNER`, `ADMIN`, `MANAGER`, `ANALYST`). Production route handlers must resolve organization membership from an authenticated server session rather than accept an organization ID from the browser. Secrets belong in Vercel environment variables and are never exposed through `NEXT_PUBLIC_*` variables.

## Deployment

Import the GitHub repository into Vercel, set `DATABASE_URL` and `SESSION_SECRET`, then deploy. No production endpoint depends on localhost.

## Current limitations

This first deployable product slice does not yet include credential authentication, onboarding, CSV ingestion, scheduled weather ingestion, trained model artifacts, or full CRUD screens. Those require a provisioned PostgreSQL database and authentication provider. The repository deliberately documents that boundary instead of presenting non-functional controls as complete.
