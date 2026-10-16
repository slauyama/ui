/// <reference types="node" />
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import type { MaterialSymbol } from "material-symbols";
import { subsetIconFont } from "./subsetFont";

export interface IconFontSubsetOptions {
  /** Icons to keep even when no string literal names them, e.g. names built at runtime. */
  include?: MaterialSymbol[];
}

const require = createRequire(import.meta.url);
const FONT_NAME = "material-symbols-rounded.woff2";
const FONT_URL = /url\(\s*(["']?)[^"')]*material-symbols-rounded[^"')]*\.woff2\1\s*\)/g;
const CSS_FILE = /\.(css|scss|sass|less|styl)$/;
const SCRIPT_FILE = /\.[cm]?[jt]sx?$/;
const STRING_LITERAL = /["'`]([a-z0-9_]{2,})["'`]/g;

function kb(bytes: number): string {
  return `${Math.round(bytes / 1024)} KB`;
}

async function findScripts(dir: string, skip: Set<string>): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".") || entry.name === "node_modules" || skip.has(path)) return [];
        return findScripts(path, skip);
      }
      return SCRIPT_FILE.test(entry.name) ? [path] : [];
    }),
  );
  return nested.flat();
}

async function collectStringLiterals(files: string[]): Promise<Set<string>> {
  const literals = new Set<string>();
  for (const file of files) {
    const code = await readFile(file, "utf-8");
    for (const [, literal] of code.matchAll(STRING_LITERAL)) literals.add(literal);
  }
  return literals;
}

/**
 * Production builds only: emits the Material Symbols font that @slauyama/ui/styles.css uses,
 * shrunk to the icons this app uses, and points the CSS at it. Every string literal in the
 * project's scripts and in @slauyama/ui is a candidate; the font decides which are icon names.
 */
export function iconFontSubset({ include = [] }: IconFontSubsetOptions = {}): Plugin {
  let root = process.cwd();
  let outDir = "";
  let fontRef: string | undefined;

  return {
    name: "slauyama-ui:icon-font-subset",
    apply: "build",

    configResolved(config) {
      root = config.root;
      outDir = join(config.root, config.build.outDir);
    },

    async buildStart() {
      const files = await findScripts(root, new Set([outDir]));
      files.push(fileURLToPath(new URL("./index.js", import.meta.url)));
      const candidates = await collectStringLiterals(files);
      for (const name of include) candidates.add(name);

      const full = await readFile(require.resolve(`material-symbols/${FONT_NAME}`));
      const { woff2, icons } = await subsetIconFont(full, candidates);
      fontRef = this.emitFile({ type: "asset", name: FONT_NAME, source: woff2 });
      this.info(`Material Symbols: kept ${icons.length} icons, ${kb(full.byteLength)} → ${kb(woff2.byteLength)}`);
    },

    transform(code, id) {
      if (!fontRef || !CSS_FILE.test(id.split("?")[0])) return;
      // Vite swaps this placeholder for the asset's final URL before hashing the CSS.
      const replaced = code.replace(FONT_URL, `url(__VITE_ASSET__${fontRef}__)`);
      return replaced === code ? undefined : { code: replaced, map: null };
    },
  };
}
