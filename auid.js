// @bun
// auid.ts
import { getRandomValues } from "crypto";

class Auid {
  static #length8 = 8;
  static #oLength8 = 32;
  static #fbArr8 = new Array(Auid.#length8);
  static #buffer8 = new Uint8Array(Auid.#length8);
  static #offset8 = new Uint8Array(Auid.#oLength8);
  static #length10 = 10;
  static #oLength10 = 40;
  static #fbArr10 = new Array(Auid.#length10);
  static #buffer10 = new Uint8Array(Auid.#length10);
  static #offset10 = new Uint8Array(Auid.#oLength10);
  static #gTimeOffsetB36() {
    if (typeof process !== "undefined" && process.hrtime)
      return process.hrtime()[1].toString(36).toUpperCase().padStart(6, "0");
    const \u{b5}s = (performance.now() | 0) % 1000;
    const rn = (Math.random() * (1e9 - \u{b5}s)) | 0;
    return (\u{b5}s + rn).toString(36).toUpperCase().padStart(6, "0");
  }
  static gen8() {
    getRandomValues(Auid.#buffer8);
    getRandomValues(Auid.#offset8);
    const msB36 = Date.now().toString(36).toUpperCase().padStart(9, "0");
    let oIdx = 0;
    for (let i = 0;i < Auid.#length8; i++) {
      const currOffset = Auid.#offset8[oIdx++] + Auid.#offset8[oIdx++] + Auid.#offset8[oIdx++] + Auid.#offset8[oIdx++];
      Auid.#fbArr8[i] = (Auid.#buffer8[i] + currOffset).toString(36).toUpperCase().padStart(2, "0");
    }
    return msB36 + "-" + Auid.#gTimeOffsetB36() + Auid.#fbArr8.join("");
  }
  static gen10() {
    getRandomValues(Auid.#buffer10);
    getRandomValues(Auid.#offset10);
    const msB36 = Date.now().toString(36).toUpperCase().padStart(9, "0");
    let oIdx = 0;
    for (let i = 0;i < Auid.#length10; i++) {
      const currOffset = Auid.#offset10[oIdx++] + Auid.#offset10[oIdx++] + Auid.#offset10[oIdx++] + Auid.#offset10[oIdx++];
      Auid.#fbArr10[i] = (Auid.#buffer10[i] + currOffset).toString(36).toUpperCase().padStart(2, "0");
    }
    return msB36 + "-" + Auid.#gTimeOffsetB36() + Auid.#fbArr10.join("");
  }
}
var auid_default = Auid;
export {
  auid_default as default
};
