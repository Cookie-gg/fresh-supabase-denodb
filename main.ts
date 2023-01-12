/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import manifest from "./fresh.gen.ts";
import { start } from "$fresh/server.ts";
import { emotionPlugin } from "~/libs/emotion.ts";

await start(manifest, {
  plugins: [emotionPlugin()],
  render: (ctx, render) => {
    ctx.lang = "ja";
    render();
  },
});
