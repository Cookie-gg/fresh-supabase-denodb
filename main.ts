/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import manifest from "./fresh.gen.ts";
import { start } from "$fresh/server.ts";

await start(manifest, {
  render: (ctx, render) => {
    ctx.lang = "ja";
    render();
  },
});
