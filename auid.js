// @bun
// auid.ts
class Auid {
  static #length8 = 16;
  static #fbArr8 = new Array(Auid.#length8);
  static #buffer8 = new Uint8Array(Auid.#length8);
  static #length10 = 32;
  static #fbArr10 = new Array(Auid.#length10);
  static #buffer10 = new Uint8Array(Auid.#length10);
  static #bLength = 3;
  static #fbArrB = new Array(Auid.#bLength);
  static #bufferB = new Uint8Array(Auid.#bLength);
  static #gTimeOffsetB36() {
    if (typeof process !== "undefined" && process.hrtime)
      return process.hrtime()[1].toString(36).toUpperCase().padStart(6, "0");
    crypto.getRandomValues(Auid.#bufferB);
    const \u{b5}s = (performance.now() * 1000 | 0) % 1000;
    const \u{b5}sB36 = \u{b5}s.toString(36).toUpperCase().padStart(3, "0");
    for (let i = 0;i < Auid.#bLength; i++)
      Auid.#fbArrB[i] = (Math.min(Auid.#bufferB[i], 251) % 36).toString(36).toUpperCase();
    return \u{b5}sB36 + Auid.#fbArrB.join("");
  }
  static gen16() {
    crypto.getRandomValues(Auid.#buffer8);
    const msB36 = Date.now().toString(36).toUpperCase().padStart(9, "0");
    for (let i = 0;i < Auid.#length8; i++)
      Auid.#fbArr8[i] = (Math.min(Auid.#buffer8[i], 251) % 36).toString(36).toUpperCase();
    return msB36 + "-" + Auid.#gTimeOffsetB36() + Auid.#fbArr8.join("");
  }
  static gen32() {
    crypto.getRandomValues(Auid.#buffer10);
    const msB36 = Date.now().toString(36).toUpperCase().padStart(9, "0");
    for (let i = 0;i < Auid.#length10; i++)
      Auid.#fbArr10[i] = (Math.min(Auid.#buffer10[i], 251) % 36).toString(36).toUpperCase();
    return msB36 + "-" + Auid.#gTimeOffsetB36() + Auid.#fbArr10.join("");
  }
}
var auid_default = Auid;
export {
  auid_default as default
};

