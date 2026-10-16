/// <reference types="node" />
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import * as hb from "harfbuzzjs";
import { compress, decompress } from "wawoff2";

const require = createRequire(import.meta.url);

const HB_MEMORY_MODE_WRITABLE = 2;
const HB_SUBSET_SETS_LAYOUT_FEATURE_TAG = 6;
const HB_SUBSET_FLAGS_NO_LAYOUT_CLOSURE = 0x200;
// Material Symbols maps icon names to glyphs through these two features.
const LIGATURE_FEATURES = ["rlig", "rclt"];

interface SubsetWasm {
  memory: WebAssembly.Memory;
  _initialize(): void;
  malloc(size: number): number;
  free(ptr: number): void;
  hb_blob_create(data: number, length: number, mode: number, userData: number, destroy: number): number;
  hb_blob_destroy(blob: number): void;
  hb_blob_get_data(blob: number, length: number): number;
  hb_blob_get_length(blob: number): number;
  hb_face_create(blob: number, index: number): number;
  hb_face_destroy(face: number): void;
  hb_face_reference_blob(face: number): number;
  hb_set_add(set: number, value: number): void;
  hb_set_clear(set: number): void;
  hb_subset_input_create_or_fail(): number;
  hb_subset_input_destroy(input: number): void;
  hb_subset_input_get_flags(input: number): number;
  hb_subset_input_set_flags(input: number, flags: number): void;
  hb_subset_input_glyph_set(input: number): number;
  hb_subset_input_set(input: number, setType: number): number;
  hb_subset_input_unicode_set(input: number): number;
  hb_subset_or_fail(face: number, input: number): number;
}

let subsetWasm: Promise<SubsetWasm> | undefined;

async function instantiateSubsetWasm(): Promise<SubsetWasm> {
  const bytes = await readFile(require.resolve("harfbuzzjs/dist/harfbuzz-subset.wasm"));
  const { instance } = await WebAssembly.instantiate(bytes);
  const wasm = instance.exports as unknown as SubsetWasm;
  wasm._initialize();
  return wasm;
}

function loadSubsetWasm(): Promise<SubsetWasm> {
  subsetWasm ??= instantiateSubsetWasm();
  return subsetWasm;
}

function tag(name: string): number {
  return [...name].reduce((acc, ch) => (acc << 8) + ch.charCodeAt(0), 0);
}

/** Maps each candidate that is an icon ligature in the font to its glyph id. */
function findIconGlyphs(ttf: Uint8Array, candidates: Iterable<string>): Map<string, number> {
  const font = new hb.Font(new hb.Face(new hb.Blob(ttf)));
  const icons = new Map<string, number>();
  for (const name of candidates) {
    if (name.length < 2) continue;
    const buffer = new hb.Buffer();
    buffer.addText(name);
    buffer.guessSegmentProperties();
    hb.shape(font, buffer);
    const glyphs = buffer.getGlyphInfos();
    if (glyphs.length === 1) icons.set(name, glyphs[0].codepoint);
  }
  return icons;
}

/**
 * Keeps only the glyphs for `icons` and the ligatures that produce them. Layout closure is off:
 * with it on, keeping the letters a–z would pull in every icon in the font.
 */
async function subsetTtf(ttf: Uint8Array, icons: Map<string, number>): Promise<Uint8Array> {
  const wasm = await loadSubsetWasm();
  // Memory can grow while subsetting, which detaches older views.
  function heap() {
    return new Uint8Array(wasm.memory.buffer);
  }

  const input = wasm.hb_subset_input_create_or_fail();
  if (!input) throw new Error("hb_subset_input_create_or_fail failed");

  const fontPtr = wasm.malloc(ttf.byteLength);
  heap().set(ttf, fontPtr);
  const blob = wasm.hb_blob_create(fontPtr, ttf.byteLength, HB_MEMORY_MODE_WRITABLE, 0, 0);
  const face = wasm.hb_face_create(blob, 0);
  wasm.hb_blob_destroy(blob);

  try {
    const features = wasm.hb_subset_input_set(input, HB_SUBSET_SETS_LAYOUT_FEATURE_TAG);
    wasm.hb_set_clear(features);
    for (const feature of LIGATURE_FEATURES) wasm.hb_set_add(features, tag(feature));
    wasm.hb_subset_input_set_flags(
      input,
      wasm.hb_subset_input_get_flags(input) | HB_SUBSET_FLAGS_NO_LAYOUT_CLOSURE,
    );

    const unicodes = wasm.hb_subset_input_unicode_set(input);
    for (const ch of new Set([...icons.keys()].join(""))) wasm.hb_set_add(unicodes, ch.codePointAt(0)!);
    const glyphs = wasm.hb_subset_input_glyph_set(input);
    for (const gid of icons.values()) wasm.hb_set_add(glyphs, gid);

    const subset = wasm.hb_subset_or_fail(face, input);
    if (!subset) throw new Error("hb_subset_or_fail failed");
    const result = wasm.hb_face_reference_blob(subset);
    const offset = wasm.hb_blob_get_data(result, 0);
    const bytes = heap().slice(offset, offset + wasm.hb_blob_get_length(result));
    wasm.hb_blob_destroy(result);
    wasm.hb_face_destroy(subset);
    return bytes;
  } finally {
    wasm.hb_subset_input_destroy(input);
    wasm.hb_face_destroy(face);
    wasm.free(fontPtr);
  }
}

export interface IconFontSubset {
  woff2: Uint8Array;
  icons: string[];
}

/** Subsets a Material Symbols woff2 to whichever of `candidates` are icon names in it. */
export async function subsetIconFont(
  woff2: Uint8Array,
  candidates: Iterable<string>,
): Promise<IconFontSubset> {
  const ttf = await decompress(woff2);
  const icons = findIconGlyphs(ttf, candidates);
  const subset = await subsetTtf(ttf, icons);
  return { woff2: await compress(subset), icons: [...icons.keys()].sort() };
}
