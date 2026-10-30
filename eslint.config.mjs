import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const restrict = (files, patterns, message) => ({
  files,
  rules: {
    "no-restricted-imports": ["error", { patterns: [{ group: patterns, message }] }],
  },
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Dependency direction (docs/architecture.md): app -> modules/<role> -> shared -> components, lib, hooks
  restrict(
    ["src/components/**", "src/lib/**", "src/hooks/**"],
    ["@/shared/*", "@/modules/*"],
    "components/, lib/, dan hooks/ tidak boleh mengimpor dari shared/ atau modules/.",
  ),
  restrict(["src/shared/**"], ["@/modules/*", "@/app/*"], "shared/ tidak boleh mengimpor dari modules/ atau app/."),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
