import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "index.ts", vite: "vite/index.ts" },
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion"],
  jsx: "react-jsx",
});
