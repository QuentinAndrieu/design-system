import { defineConfig } from "tsup";

// Builds the JS/TS entry only. CSS ships as raw files copied to dist/ by the
// build script — tokens need no compilation, which is the whole point.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom"],
});
