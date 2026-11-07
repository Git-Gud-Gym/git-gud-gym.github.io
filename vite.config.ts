import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/** Normalise SITE_BASE so it always starts and ends with "/". */
function resolveBase(raw: string | undefined): string {
  const value = (raw ?? "/").trim() || "/";
  const withLead = value.startsWith("/") ? value : `/${value}`;
  return withLead.endsWith("/") ? withLead : `${withLead}/`;
}

/**
 * GitHub Pages has no SPA fallback. Every known route gets its own copy of index.html so it is
 * served with HTTP 200 (indexable, link previews work); 404.html covers everything else.
 */
function spaFallback(): Plugin {
  let outDir = "dist";
  return {
    name: "spa-404-fallback",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const index = resolve(outDir, "index.html");
      const docs = readdirSync(resolve(__dirname, "src/docs"))
        .filter((f) => f.endsWith(".md"))
        .map((f) => `docs/${f.slice(0, -3)}`);
      for (const route of ["games", "docs", ...docs]) {
        mkdirSync(resolve(outDir, route), { recursive: true });
        copyFileSync(index, resolve(outDir, route, "index.html"));
      }
      copyFileSync(index, resolve(outDir, "404.html"));
    },
  };
}

export default defineConfig({
  base: resolveBase(process.env.SITE_BASE),
  plugins: [react(), spaFallback()],
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
