# `@remix-run/spa` tries to hydrate a server-rendered `clientEntry`

Minimal reproduction for remix-run/remix.

## Run

```sh
npm install
npm start   # http://localhost:3000
```

Open the page and look at the browser console.

## What it does

- `server.js` server-renders the initial document with `renderToString()`. It contains one
  `clientEntry` (`src/island.js`), so the HTML carries a hydration marker and `rmx-data`.
- `src/entry.js` starts the browser side with `@remix-run/spa`'s `run(router)`. The router
  renders the same `clientEntry` again, client-side.

## Expected

No error. `run()` replaces the server-rendered document with the router's render
(`frames.top.reload()` right after the runtime is ready), so there is nothing to hydrate.

## Actual

```
[createFrame] Failed to load module for h…: Error: SPA responses cannot hydrate client entries
SPA ready
```

The page then shows the router's render, and the `clientEntry` works there — a component
rendered in the browser needs no hydrating. Only the boot-time attempt to hydrate the
server document's marker fails, through the `loadModule` that `run()` passes to the runtime:

```ts
loadModule() {
  throw new Error('SPA responses cannot hydrate client entries')
}
```

What reaches it is a marker from the initial server-rendered document, not an SPA response,
and its result is discarded by the reload that follows.

Versions: `@remix-run/spa@1.0.0`, `@remix-run/component@1.0.0`,
`@remix-run/fetch-router@1.0.0`, Chromium.
