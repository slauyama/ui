declare module "wawoff2" {
  export function compress(ttf: Uint8Array): Promise<Uint8Array>;
  export function decompress(woff2: Uint8Array): Promise<Uint8Array>;
}
