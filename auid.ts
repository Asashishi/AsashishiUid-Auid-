import { getRandomValues } from 'crypto';

class Auid {

    // 基础随机空间
    static #length8: number = 8;
    // 随机空间偏移
    static #oLength8: number = 32;

    // 数组化存储 避免频繁 gc
    static #fbArr8: string[] = new Array(Auid.#length8);
    static #buffer8: Uint8Array = new Uint8Array(Auid.#length8);
    static #offset8: Uint8Array = new Uint8Array(Auid.#oLength8);

    static #length10: number = 10;
    static #oLength10: number = 40;

    static #fbArr10: string[] = new Array(Auid.#length10);
    static #buffer10: Uint8Array = new Uint8Array(Auid.#length10);
    static #offset10: Uint8Array = new Uint8Array(Auid.#oLength10);

    // 兼容浏览器 跨语言可以考虑 ns % 1e9 来获取偏移
    static #gTimeOffsetB36(): string {
        // 启动时间到当前的差值 仅取 ns 偏移值(对浏览器环境有特殊兼容 精度不如 bun 或者 node 环境)
        // 36进制 每秒回拨 在单进程上理论碰撞概率为0 在多进程上进一步扩大随机熵
        if (typeof process !== 'undefined' && process.hrtime) 
            return process.hrtime()[1]!.toString(36).toUpperCase().padStart(6, '0');
        // 以微秒精度取偏移值
        const µs: number = ((performance.now() * 1000) | 0) % 1_000;
        // 简单随机 浏览器环境不用考虑随机安全性
        // 用于快速补足不满足 999_999_999 空间的部分
        const rn: number = (Math.random() * (1_000_000_000 - µs)) | 0;
        return (µs + rn).toString(36).toUpperCase().padStart(6, '0');
    }

    public static gen8(): string {
        getRandomValues(Auid.#buffer8);
        getRandomValues(Auid.#offset8);
        // ms 时间戳 36 进制
        const msB36: string = Date.now().toString(36).toUpperCase().padStart(9, '0');
        let oIdx: number = 0;
        for (let i: number = 0; i < Auid.#length8; i++) {
            const currOffset: number = Auid.#offset8[oIdx++]! + Auid.#offset8[oIdx++]! + Auid.#offset8[oIdx++]! + Auid.#offset8[oIdx++]!;
            // 拼接随机数 36进制 随机空间 1275^8 约 2^82 
            Auid.#fbArr8[i] = (Auid.#buffer8[i]! + currOffset).toString(36).toUpperCase().padStart(2, '0');
        }
        // Auid 随机空间 1275^8 约 2^82 32位字符 (9位时间戳(ms) + - + 6位时间偏移(ns) + 16位随机数)
        return msB36 + '-' + Auid.#gTimeOffsetB36() + Auid.#fbArr8.join('');
    }

    public static gen10(): string {
        getRandomValues(Auid.#buffer10);
        getRandomValues(Auid.#offset10);
        const msB36: string = Date.now().toString(36).toUpperCase().padStart(9, '0');
        let oIdx: number = 0;
        for (let i: number = 0; i < Auid.#length10; i++) {
            const currOffset: number = Auid.#offset10[oIdx++]! + Auid.#offset10[oIdx++]! + Auid.#offset10[oIdx++]! + Auid.#offset10[oIdx++]!;
            Auid.#fbArr10[i] = (Auid.#buffer10[i]! + currOffset).toString(36).toUpperCase().padStart(2, '0');
        }
        // Auid 随机空间 1275^10 约 2^103 36位字符 (9位时间戳(ms) + - + 6位时间偏移(ns) + 20位随机数)
        return msB36 + '-' + Auid.#gTimeOffsetB36() + Auid.#fbArr10.join('');
    }
};

export default Auid;
