import { defineConfig } from "orval";

// Laravel (Scramble) serves the spec; set OPENAPI_URL to a file path or another URL to override.
const input = process.env.OPENAPI_URL ?? "http://localhost:8000/docs/api.json";

export default defineConfig({
  kirei: {
    input: { target: input },
    output: {
      mode: "tags-split",
      target: "src/lib/api/generated/endpoints.ts",
      schemas: "src/lib/api/generated/model",
      client: "fetch",
      clean: true,
      override: {
        mutator: { path: "src/lib/api/mutator.ts", name: "customFetch" },
      },
    },
  },
});
