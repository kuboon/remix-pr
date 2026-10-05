import http from "node:http";
import * as esbuild from "esbuild";
import { createElement as h } from "@remix-run/component";
import { renderToString } from "@remix-run/component/server";

import { Island } from "./src/island.js";

// Bundle the two browser modules with a shared chunk, so the island and the SPA runtime share
// one copy of @remix-run/component. `/island.js` is the URL the client entry names.
const build = await esbuild.build({
  entryPoints: { entry: "src/entry.js", island: "src/island.js" },
  bundle: true,
  splitting: true,
  format: "esm",
  write: false,
  outdir: "/",
});
const files = new Map(build.outputFiles.map((f) => [f.path, f.text]));

// The initial document is server-rendered and contains a client entry, as any SSR'd page would.
const body = await renderToString(h("main", {}, h("p", {}, "rendered by the server"), h(Island, {})));
const html = `<!doctype html><html><head><meta charset="utf-8">
<script type="module" src="/entry.js"></script></head><body>${body}</body></html>`;

http.createServer((req, res) => {
  const js = files.get(req.url);
  if (js) {
    res.writeHead(200, { "content-type": "text/javascript" }).end(js);
  } else if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" }).end(html);
  } else {
    res.writeHead(404).end();
  }
}).listen(3000, () => console.log("http://localhost:3000 — open the browser console"));
