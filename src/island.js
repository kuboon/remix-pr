import { clientEntry, createElement as h } from "@remix-run/component";

// Any client entry. It is rendered on the server into the initial document.
export const Island = clientEntry(
  "/island.js#Island",
  function Island() {
    return () => h("button", { type: "button" }, "I am a client entry");
  },
);
