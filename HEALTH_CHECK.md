# Health Check — Car Rental Website

## Issues Found & Fixed

### 1. Vercel 404 on `/` (Production)

**Issue**: The homepage at `/` returned 404 after deployment to Vercel.

**Root Cause**: The homepage was defined inside a route group `app/(public)/page.tsx`. Next.js 16 on Vercel does not register `/` from inside a route group when a top-level `app/layout.tsx` exists. The route group's layout wrapper overrides the implicit root behavior, and Vercel's router fails to match `/` to a route inside `(public)`.

**Fix**: Moved the homepage from `app/(public)/page.tsx` to `app/page.tsx` (root level). Embedded `Header`, `Footer`, and `WhatsAppButton` directly into the homepage since it is no longer wrapped by `(public)/layout.tsx`.

**Files changed**:
- `src/app/page.tsx` — moved from route group, added layout elements
- `src/app/(public)/page.tsx` — deleted

---

### 2. Dev Server Hangs After 2 Requests (Development)

**Issue**: The `next dev` server would successfully serve 2 HTTP requests, then hang on all subsequent requests indefinitely. This affected all routes, including minimal ones with no Supabase or network calls.

**Root Cause**: `experimental.serverComponentsHmrCache: false` was set in `next.config.mjs`. This configuration option was deprecated/removed in Next.js 16. The dev server log showed `⨯ serverComponentsHmrCache` (error indicator). The invalid config option corrupted the Turbopack compiler state after the second compilation, causing it to enter a deadlock on subsequent requests.

**Diagnostic Journey**:
1. Initially suspected Supabase query timeouts (incorrect — Supabase responded fine from PowerShell tests)
2. Ruled out `undici` (Node.js native fetch) by implementing a custom `nodeFetch` using `https.request` (still hung)
3. Ruled out application code by testing a minimal `<h1>Hello</h1>` page with no imports (still hung)
4. Ruled out `serverComponentsHmrCache` was the actual cause by removing it and confirming 20/20 requests pass with both Turbopack and Webpack modes
5. The EPIPE error in `next-development.log` confirmed the dev server was in a broken state

**Fix**: Removed `serverComponentsHmrCache: false` from `next.config.mjs`. Cleaned `.next/dev` cache.

**Files changed**:
- `next.config.mjs` — removed deprecated `serverComponentsHmrCache` config

**Verification**: 20 sequential requests with Turbopack default mode all succeed (~22-32ms each).

---

### 3. TypeScript Type Errors (Build)

**Issue**: Production build failed with TypeScript errors in `calendar.ts`, `settings.ts`, and `server.ts`.

**Root Causes**:
- `safeQuery()` in `calendar.ts` used `() => supabase.queryChain` which returns a `PostgrestFilterBuilder` (thenable but not a `Promise`), but the type signature expected `() => Promise<T>`
- `queryWithTimeout()` in `server.ts` had the same `Promise<T>` vs thenable mismatch
- `nodeFetch()` in `server.ts` had an unreachable `else` branch typed as `never`

**Fixes**:
- Changed `queryWithTimeout<T>` parameter type from `Promise<T>` to `PromiseLike<T>`
- Added `async/await` to `safeQuery` callbacks to wrap Supabase thenables in real Promises
- Changed `input.toString()` to `String(input)` in the unreachable else branch

**Files changed**:
- `src/lib/calendar.ts` — made arrow functions `async`
- `src/lib/supabase/server.ts` — `Promise<T>` → `PromiseLike<T>`, `input.toString()` → `String(input)`
- `src/proxy.ts` — `input.toString()` → `String(input)` (same pattern)

---

### 4. Debug Artifacts Left in Codebase

**Issue**: Temporary debugging files and routes remained in the project.

**Items removed**:
- `src/app/test-fetch/` — debugging route for HTTP fetch tests
- `src/app/health/route.ts` — temporary health check endpoint
- `src/proxy.ts.bak` — backup of an older proxy version

---

## Recommendations

1. **Run `supabase/seed_cars.sql`** in your Supabase project to populate sample car data. The dynamic routes (`/cars/[slug]`) return 404 until cars exist in the database.

2. **Enable fs cache for Turbopack** to speed up dev restarts:
   ```js
   // next.config.mjs
   experimental: {
     turbopackFileSystemCacheForDev: true,
   }
   ```

3. **Add `cacheLife` profiles** if you want to use caching APIs (`cacheLife`, `cacheTag` are stable in Next.js 16).

4. **Set up ESLint** with `npm run lint` (uses ESLint CLI directly, not `next lint` which was removed in v16).

5. **Add proper error monitoring** — the `console.error`/`console.warn` calls in server actions and calendar are basic; consider a service like Sentry for production.

6. **Connection pooling for nodeFetch** — the custom `nodeFetch` creates a new TCP connection per request. For production, either:
   - Add an `Agent` with `keepAlive: true` to reuse connections
   - Or revert to built-in `fetch` now that the dev server hang is fixed

7. **Seed the database** before using the admin panel — create an admin user via Supabase dashboard and run the seed SQL.
