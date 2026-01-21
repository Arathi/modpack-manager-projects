import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "@rsbuild/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginReact } from "@rsbuild/plugin-react";

const HOME = process.env.HOME ?? process.env.USERPROFILE ?? "~";
const CERT_NAME = "modpack-manager.amcs.dev";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    title: "Modpack Manager",
  },
  server: {
    // ModPack ManaGer 3936
    host: "modpack-manager.amcs.dev",
    port: 3936,
    https: {
      key: readFileSync(resolve(HOME, "certs", `${CERT_NAME}-key.pem`)),
      cert: readFileSync(resolve(HOME, "certs", `${CERT_NAME}.pem`)),
    },
    proxy: {
      "/api/curseforge": {
        target: "https://api.curseforge.com",
        pathRewrite: { "^/api/curseforge": "" },
      },
      "/api/modrinth": {
        target: "https://api.modrinth.com/v2",
        pathRewrite: { "^/api/modrinth": "" },
      },
    },
  },
  plugins: [pluginReact(), pluginLess()],
});
