import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: "https://portafolio.chiletedevpath.com",
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  markdown: { syntaxHighlight: false },
  vite: { build: { sourcemap: false } },
  security: {
    csp: {
      scriptDirective: {
        resources: ["'self'", "https://challenges.cloudflare.com"],
      },
      styleDirective: { resources: ["'self'", "https://fonts.googleapis.com"] },
      directives: [
        "default-src 'self'",
        "base-uri 'none'",
        "object-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://challenges.cloudflare.com https://chiletedevpath-contacto.chiletedevpath.workers.dev",
        "frame-src 'self' https://challenges.cloudflare.com",
        "form-action 'self' https://chiletedevpath-contacto.chiletedevpath.workers.dev",
      ],
    },
  },
});
