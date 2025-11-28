// @bun
// auid.ts
class Auid {
  static #bLength = 3;
  static #fbArrB = new Array(Auid.#bLength);
  static #bufferB = new Uint8Array(Auid.#bLength);
  static #length16 = 16;
  static #fbArr16 = new Array(Auid.#length16);
  static #buffer16 = new Uint8Array(Auid.#length16);
  static #length32 = 32;
  static #fbArr32 = new Array(Auid.#length32);
  static #buffer32 = new Uint8Array(Auid.#length32);
  static #gTimeOffsetB36() {
    if (typeof process !== "undefined" && process.hrtime)
      return process.hrtime()[1].toString(36).toUpperCase().padStart(6, "0");
    crypto.getRandomValues(Auid.#bufferB);
    const \u{b5}s = (performance.now() * 1000 | 0) % 1000;
    const \u{b5}sB36 = \u{b5}s.toString(36).toUpperCase().padStart(3, "0");
    for (let i = 0;i < Auid.#bLength; i++)
      Auid.#fbArrB[i] = (Auid.#bufferB[i] % 36).toString(36).toUpperCase();
    return \u{b5}sB36 + Auid.#fbArrB.join("");
  }
  static gen16() {
    crypto.getRandomValues(Auid.#buffer16);
    const msB36 = Date.now().toString(36).toUpperCase().padStart(9, "0");
    for (let i = 0;i < Auid.#length16; i++)
      Auid.#fbArr16[i] = (Auid.#buffer16[i] % 36).toString(36).toUpperCase();
    return msB36 + "-" + Auid.#gTimeOffsetB36() + Auid.#fbArr16.join("");
  }
  static gen32() {
    crypto.getRandomValues(Auid.#buffer32);
    const msB36 = Date.now().toString(36).toUpperCase().padStart(9, "0");
    for (let i = 0;i < Auid.#length32; i++)
      Auid.#fbArr32[i] = (Auid.#buffer32[i] % 36).toString(36).toUpperCase();
    return msB36 + "-" + Auid.#gTimeOffsetB36() + Auid.#fbArr32.join("");
  }
}
var auid_default = Auid;
export {
  auid_default as default
};
