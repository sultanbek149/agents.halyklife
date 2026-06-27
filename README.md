# agents-new — Кабинет агента Halyk Life

Новый фронтенд кабинета страхового агента Halyk Life, который в будущем заменит проект `../agents`.

- **Каркас (структура экранов)** — из мокапа `Кабинет агента Halyk Life.dc.html`.
- **UI-kit / логотип / дизайн-стиль** — из существующего проекта `../agents` (зелёный Halyk `#2aa65c`, Noto Sans).
- **Данные** — сверены с бэкендом `../agent-service` (Go/Fiber, база `/v1`, конверт `{ success, data, message }`).

## Стек

- **Turborepo** — монорепозиторий (`apps/*`, `packages/*`)
- **Nuxt 3/4** (SPA, `ssr: false`)
- **shadcn-vue** (preset `a3d3dM7U`, Tailwind v4, reka-vega)
- **pnpm**

## Структура

```
agents-new/
├─ apps/
│  └─ web/            # Nuxt-приложение кабинета
├─ turbo.json
├─ pnpm-workspace.yaml
└─ package.json
```

## Запуск

```bash
pnpm install
pnpm dev            # turbo run dev → Nuxt dev-server (порт 3100)
```

API-базу можно задать через `apps/web/.env`:

```
NUXT_PUBLIC_API_BASE=https://test-gateway.halyklife.kz/agent
```
