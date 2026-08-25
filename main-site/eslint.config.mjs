import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Native images are retained only for public paths that Next's optimizer cannot
      // address reliably (Unicode filenames) and for the existing SVG signature.
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["app/components/projectgallery.jsx"],
    rules: {
      // The lightbox intentionally binds the latest render callbacks to DOM listeners.
      "react-hooks/exhaustive-deps": "off",
    },
  },
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
