import { createElement as h } from "@remix-run/component";
import { createRouter } from "@remix-run/fetch-router";
import { render, run } from "@remix-run/spa";

import { Island } from "./island.js";

const router = createRouter({ middleware: [render()] });
router.get("/", ({ render }) =>
  render(h("main", {}, h("p", {}, "rendered by the SPA router"), h(Island, {})))
);

const app = run(router);
await app.ready();
console.log("SPA ready");
